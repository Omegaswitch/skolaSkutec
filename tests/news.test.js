// Checks api/news.js with GitHub stubbed: sign-in and roles, file checks, cleaning of the text, the committed
// article, drafts and scheduling, pinning, events, and what an editor may not do. Runs on every Order of Malta site.
//   node tests/news.test.js
const assert = require("assert");
process.env.NEWS_USERS = "Lenka:tajne-heslo-1:admin\nPetr:jine-heslo-2\nOta:treti:heslo";  // a password may hold a colon
process.env.NEWS_SECRET = "test-secret";
process.env.GITHUB_TOKEN = "test-token";
const SITE = require("../content/site.json");
const handler = require("../api/news.js");
const HOST = new URL(SITE.baseUrl).host;
const CAT = Object.keys(SITE.newsCategories)[0];

const commits = [];
let existing = new Set();
const stored = {};  // files the stubbed repository returns by path
global.fetch = async (url, opts = {}) => {
  const u = new URL(url), body = opts.body ? JSON.parse(opts.body) : null;
  const json = (status, data) => ({ ok: status < 300, status, json: async () => data });
  if (u.pathname.includes("/contents/")) {
    const p = decodeURIComponent(u.pathname.split("/contents/")[1]);
    if (stored[p]) return json(200, { content: Buffer.from(stored[p]).toString("base64") });
    return existing.has(p) ? json(200, {}) : json(404, {});
  }
  if (u.pathname.endsWith("/git/blobs")) return json(201, { sha: "a".repeat(40) });
  if (u.pathname.endsWith("/git/ref/heads/main")) return json(200, { object: { sha: "c".repeat(40) } });
  if (/\/git\/commits\/c+$/.test(u.pathname)) return json(200, { tree: { sha: "t".repeat(40) } });
  if (u.pathname.endsWith("/git/trees")) {
    commits.push(body.tree);
    for (const f of body.tree) if (f.content != null) stored[f.path] = f.content; else if (f.sha === null) delete stored[f.path];  // the stub keeps the repository's state
    return json(201, { sha: "n".repeat(40) });
  }
  if (u.pathname.endsWith("/git/commits")) return json(201, { sha: "d".repeat(40) });
  if (u.pathname.endsWith("/git/refs/heads/main")) return json(200, {});
  throw new Error("unexpected " + url);
};

function call(method, body, cookie) {
  return new Promise((done) => {
    const headers = { host: HOST, origin: `https://${HOST}`, ...(cookie ? { cookie } : {}) };
    const res = { statusCode: 200, h: {}, setHeader(k, v) { this.h[k.toLowerCase()] = v; }, end(s) { done({ status: this.statusCode, body: JSON.parse(s || "{}"), cookie: this.h["set-cookie"] }); } };
    handler({ method, headers, body }, res);
  });
}
const meta = (doc) => JSON.parse(doc.split("---\n")[1]);
const lastCommit = () => commits[commits.length - 1];

(async () => {
  const { sanitise, slugify, users } = handler;
  assert.strictEqual(sanitise('<p onclick="x()">A <b>B</b><script>evil()</script></p>'), "<p>A <strong>B</strong></p>");
  assert.strictEqual(sanitise('<p><a href="javascript:alert(1)">x</a> <a href="https://a.cz/" target="_blank">y</a></p>'), '<p>x <a href="https://a.cz/">y</a></p>');
  assert.strictEqual(sanitise('<h1 style="font-size:90px">T</h1><p><img src="data:x"><img src="/media/2026/10/a-1.webp" onerror="x"></p>'), '<h2>T</h2><p><img src="/media/2026/10/a-1.webp" alt=""></p>');
  assert.strictEqual(sanitise("<p>1 < 2 &amp; 3&nbsp;4</p><p></p><p><br></p>"), "<p>1 &lt; 2 &amp; 3 4</p>");
  assert.match(sanitise("<ul><li>a<li>b</ul><p>c"), /<\/ul><p>c<\/p>$/);  // unclosed tags are closed
  assert.strictEqual(slugify("Koncert duchovní hudby – říjen 2026!"), "koncert-duchovni-hudby-rijen-2026");
  assert.deepStrictEqual(users(), { Lenka: { password: "tajne-heslo-1", role: "admin" }, Petr: { password: "jine-heslo-2", role: "editor" }, Ota: { password: "treti:heslo", role: "editor" } });

  // ---- sign-in
  const info = await call("GET", null);
  assert.strictEqual(info.body.user, null);
  assert.strictEqual(info.body.features.pin, false);  // nobody signed in: no pinning
  assert.strictEqual((await call("POST", { action: "login", name: "Lenka", password: "spatne" })).status, 401);
  assert.strictEqual((await call("POST", { action: "publish" })).status, 401);
  const admin = await call("POST", { action: "login", name: "lenka", password: "tajne-heslo-1" });
  assert.strictEqual(admin.status, 200);
  assert.strictEqual(admin.body.role, "admin");
  assert.match(admin.cookie, /HttpOnly; Secure; SameSite=Strict/);
  const A = admin.cookie.split(";")[0];
  const editor = await call("POST", { action: "login", name: "Petr", password: "jine-heslo-2" });
  assert.strictEqual(editor.body.role, "editor");
  const E = editor.cookie.split(";")[0];
  assert.strictEqual((await call("GET", null, E)).body.features.pin, false);  // an editor is not offered pinning
  assert.strictEqual((await call("POST", { action: "publish" }, "news_session=Lenka|9999999999999|forged")).status, 401);

  // ---- uploads: the content must be what it claims
  const png = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47]), Buffer.alloc(20)]).toString("base64");
  const up = await call("POST", { action: "upload", name: "Moje fotka.png", type: "image/png", data: png }, E);
  assert.strictEqual(up.status, 200);
  assert.match(up.body.path, /^static\/media\/\d{4}\/\d{2}\/moje-fotka-[0-9a-f]{8}\.png$/);
  assert.strictEqual((await call("POST", { action: "upload", name: "x.pdf", type: "application/pdf", data: png }, E)).status, 400);
  assert.strictEqual((await call("POST", { action: "upload", name: "x.exe", type: "application/octet-stream", data: png }, E)).status, 400);

  // ---- a new post by the editor
  existing = new Set(["content/news/2026/11/02/koncert-v-listopadu.html"]);
  const pub = await call("POST", { action: "publish", title: "Koncert v listopadu", date: "2026-11-02T10:30", categories: [CAT, "bogus"],
    body: '<p>Přijďte <b>všichni</b>.</p><p><img src="blob:x"><img src="/media/2026/10/a-1.webp"></p><script>x</script>', excerpt: "  Krátce  ",
    files: [{ sha: up.body.sha, path: up.body.path, url: up.body.url, role: "image" }, { sha: "b".repeat(40), path: "static/media/2026/10/program-1a2b3c4d.pdf", role: "attachment", label: "Program <PDF>", ext: "pdf" }],
    pinned: true }, E);
  assert.strictEqual(pub.status, 200, JSON.stringify(pub.body));
  assert.strictEqual(pub.body.url, "/2026/11/02/koncert-v-listopadu-2/");  // the slug was taken
  const tree = lastCommit();
  const doc = tree.find((f) => f.path === "content/news/2026/11/02/koncert-v-listopadu-2.html").content;
  const m = meta(doc);
  assert.deepStrictEqual(m.categories, [CAT]);
  assert.strictEqual(m.author, "Petr");
  assert.strictEqual(m.pinned, undefined);  // an editor cannot pin
  assert.strictEqual(m.draft, undefined);
  assert.strictEqual(m.image, up.body.url);
  assert.strictEqual(m.excerpt, "Krátce");
  assert.match(doc, /<p>Přijďte <strong>všichni<\/strong>\.<\/p>\n<p><img src="\/media\/2026\/10\/a-1\.webp" alt=""><\/p>\n<p class="file"><a href="\/media\/2026\/10\/program-1a2b3c4d\.pdf">Program &lt;PDF&gt;<\/a> \(PDF\)<\/p>/);
  assert.ok(tree.some((f) => f.path === up.body.path && f.sha === up.body.sha));
  assert.strictEqual((await call("POST", { action: "publish", title: "x", date: "2026-11-02T10:30", body: "<p>a</p>", files: [{ url: "https://evil/x.png", role: "image" }] }, E)).status, 400);
  assert.strictEqual((await call("POST", { action: "publish", title: "x", date: "2026-11-02T10:30", body: "<p>a</p>", files: [{ sha: "zz", path: "../../etc/passwd", role: "image" }] }, E)).status, 400);
  assert.strictEqual((await call("POST", { action: "publish", title: "x", date: "2026-11-02", body: "<p>a</p>" }, E)).status, 400);  // date without time

  // ---- a draft and a scheduled post
  const draft = await call("POST", { action: "publish", title: "Rozepsané", date: "2026-11-03T08:00", body: "<p>Ještě ne.</p>", draft: true }, E);
  assert.strictEqual(draft.body.draft, true);
  assert.strictEqual(meta(lastCommit()[0].content).draft, true);
  const future = await call("POST", { action: "publish", title: "Za rok", date: "2099-01-01T08:00", body: "<p>Až za rok.</p>" }, E);
  assert.strictEqual(future.body.scheduled, true);
  assert.strictEqual(meta(lastCommit()[0].content).draft, undefined);

  // ---- editing: an editor only their own, an admin anything; the admin can pin
  const path = "content/news/2026/11/02/koncert-v-listopadu-2.html";
  const loaded = await call("POST", { action: "load", path }, A);
  assert.strictEqual(loaded.status, 200);
  assert.strictEqual(loaded.body.mayChange, true);
  assert.strictEqual(loaded.body.pinned, false);
  const otherEditor = await call("POST", { action: "login", name: "Ota", password: "treti:heslo" });
  const O = otherEditor.cookie.split(";")[0];
  assert.strictEqual((await call("POST", { action: "load", path }, O)).body.mayChange, false);
  assert.strictEqual((await call("POST", { action: "publish", path, title: "Ukradeno", date: "2026-11-02T10:30", body: "<p>x</p>" }, O)).status, 403);
  assert.strictEqual((await call("POST", { action: "delete", path }, O)).status, 403);
  const pinned = await call("POST", { action: "publish", path, title: "Koncert v listopadu (připnuto)", date: "2026-11-02T10:30", body: "<p>Nový text.</p>",
    categories: [CAT], files: [{ url: up.body.url, role: "image" }], pinned: true }, A);
  assert.strictEqual(pinned.status, 200);
  assert.strictEqual(pinned.body.url, "/2026/11/02/koncert-v-listopadu-2/");  // the address never changes
  let pm = meta(lastCommit()[0].content);
  assert.strictEqual(pm.pinned, true);
  assert.strictEqual(pm.author, "Petr");  // the author stays
  assert.strictEqual(pm.editedBy, "Lenka");
  // the editor's later save keeps the admin's pin
  await call("POST", { action: "publish", path, title: "Koncert v listopadu (upraveno)", date: "2026-11-02T10:30", body: "<p>Ještě novější.</p>", categories: [CAT], pinned: false }, E);
  pm = meta(lastCommit()[0].content);
  assert.strictEqual(pm.pinned, true);
  assert.strictEqual(pm.title, "Koncert v listopadu (upraveno)");
  // an imported post (no author) stays editable by any editor, and loses its "unreviewed" status when saved
  stored["content/news/2018/09/14/stary.html"] = `---\n${JSON.stringify({ title: "Starý", url: "/2018/09/14/stary/", date: "2018-09-14T10:00", categories: [CAT], image: "/media/2018/06/koncert.jpg", excerpt: "Starý", status: "existing", imported: true }, null, 1)}\n---\n<p>Starý text.</p>\n<figure><img src="/media/2018/06/koncert.jpg"><figcaption>Popisek</figcaption></figure>\n`;
  const old = await call("POST", { action: "load", path: "content/news/2018/09/14/stary.html" }, O);
  assert.strictEqual(old.body.editable, false);
  assert.strictEqual(old.body.mayChange, true);
  await call("POST", { action: "publish", path: "content/news/2018/09/14/stary.html", title: "Starý (opraveno)", date: "2018-09-14T10:00", body: "", categories: [CAT], files: [{ url: "/media/2018/06/koncert.jpg", role: "image" }] }, O);
  const om = meta(lastCommit()[0].content);
  assert.strictEqual(om.status, undefined);
  assert.strictEqual(om.editedBy, "Ota");
  assert.match(lastCommit()[0].content, /<figcaption>Popisek<\/figcaption>/);  // the old text is kept as it was

  // ---- deleting: the author or an admin
  assert.strictEqual((await call("POST", { action: "delete", path: "../../.env" }, A)).status, 400);
  assert.strictEqual((await call("POST", { action: "delete", path: "content/news/2026/11/02/nic.html" }, A)).status, 404);
  const del = await call("POST", { action: "delete", path }, E);
  assert.strictEqual(del.status, 200);
  assert.deepStrictEqual(lastCommit(), [{ path, mode: "100644", type: "blob", sha: null }]);

  // ---- events (where the site has a calendar)
  const features = (await call("GET", null, A)).body.features;
  if (features.events) {
    assert.deepStrictEqual((await call("POST", { action: "events" }, E)).body.events, []);
    const ev = await call("POST", { action: "event", title: "Den otevřených dveří", start: "2027-01-20 16:00", end: "2027-01-20 18:00", place: "Aula", description: "<p>Přijďte.</p><script>x</script>" }, E);
    assert.strictEqual(ev.status, 200, JSON.stringify(ev.body));
    assert.strictEqual(ev.body.url, "/udalost/den-otevrenych-dveri-2027-01-20/");
    let list = JSON.parse(stored["content/events.json"]);
    assert.deepStrictEqual(list, [{ author: "Petr", title: "Den otevřených dveří", start: "2027-01-20 16:00", end: "2027-01-20 18:00", allDay: false, url: ev.body.url, description: "<p>Přijďte.</p>", place: "Aula" }]);
    assert.strictEqual((await call("POST", { action: "event", title: "x", start: "2027-01-20 16:00", end: "2027-01-19 18:00" }, E)).status, 400);  // ends before it starts
    assert.strictEqual((await call("POST", { action: "event", title: "x", start: "zítra" }, E)).status, 400);
    const ev2 = await call("POST", { action: "event", title: "Den otevřených dveří", start: "2027-01-20 10:00", end: "2027-01-20 12:00" }, A);
    assert.strictEqual(ev2.body.url, "/udalost/den-otevrenych-dveri-2027-01-20-2/");  // a second one on the same day keeps its own address
    assert.strictEqual((await call("POST", { action: "event", url: ev.body.url, title: "Cizí", start: "2027-01-20 16:00" }, O)).status, 403);
    assert.strictEqual((await call("POST", { action: "event-delete", url: ev.body.url }, O)).status, 403);
    const upd = await call("POST", { action: "event", url: ev.body.url, title: "Den otevřených dveří (změna)", start: "2027-01-21 00:00", end: "2027-01-21 23:59", allDay: true }, A);
    assert.strictEqual(upd.body.url, ev.body.url);
    list = JSON.parse(stored["content/events.json"]);
    assert.strictEqual(list.length, 2);
    assert.deepStrictEqual(list.map((e) => e.start), ["2027-01-20 10:00", "2027-01-21 00:00"]);  // kept sorted
    assert.strictEqual(list[1].editedBy, "Lenka");
    assert.strictEqual(list[1].place, undefined);
    assert.strictEqual((await call("POST", { action: "event-delete", url: ev.body.url }, E)).status, 200);
    assert.strictEqual(JSON.parse(stored["content/events.json"]).length, 1);
    assert.strictEqual((await call("POST", { action: "event-delete", url: "/udalost/neni/" }, A)).status, 404);
  } else {
    assert.strictEqual((await call("POST", { action: "events" }, A)).status, 400);
  }

  // ---- no cross-site posts, no publishing without configuration
  const evil = await new Promise((done) => handler({ method: "POST", headers: { host: HOST, origin: "https://evil.example" }, body: {} },
    { statusCode: 200, setHeader() {}, end(s) { done({ status: this.statusCode, body: JSON.parse(s) }); } }));
  assert.strictEqual(evil.status, 403);
  process.env.GITHUB_TOKEN = "";
  assert.strictEqual((await call("POST", { action: "login", name: "Lenka", password: "tajne-heslo-1" })).status, 503);
  console.log("news ok");
})().catch((e) => { console.error(e); process.exit(1); });
