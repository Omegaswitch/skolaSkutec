// Checks api/news.js with GitHub stubbed: sign-in, file checks, cleaning of the text, the committed article.
//   node tests/news.test.js
const assert = require("assert");
process.env.NEWS_USERS = "Lenka:tajne-heslo-1\nPetr:jine-heslo-2";
process.env.NEWS_SECRET = "test-secret";
process.env.GITHUB_TOKEN = "test-token";
const handler = require("../api/news.js");

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
  if (u.pathname.endsWith("/git/trees")) { commits.push(body.tree); return json(201, { sha: "n".repeat(40) }); }
  if (u.pathname.endsWith("/git/commits")) return json(201, { sha: "d".repeat(40) });
  if (u.pathname.endsWith("/git/refs/heads/main")) return json(200, {});
  throw new Error("unexpected " + url);
};

function call(method, body, cookie) {
  return new Promise((done) => {
    const headers = { host: "www.gymskutec.cz", origin: "https://www.gymskutec.cz", ...(cookie ? { cookie } : {}) };
    const res = { statusCode: 200, h: {}, setHeader(k, v) { this.h[k.toLowerCase()] = v; }, end(s) { done({ status: this.statusCode, body: JSON.parse(s || "{}"), cookie: this.h["set-cookie"] }); } };
    handler({ method, headers, body }, res);
  });
}

(async () => {
  const { sanitise, slugify } = handler;
  assert.strictEqual(sanitise('<p onclick="x()">A <b>B</b><script>evil()</script></p>'), "<p>A <strong>B</strong></p>");
  assert.strictEqual(sanitise('<p><a href="javascript:alert(1)">x</a> <a href="https://a.cz/" target="_blank">y</a></p>'), '<p>x <a href="https://a.cz/">y</a></p>');
  assert.strictEqual(sanitise('<h1 style="font-size:90px">T</h1><p><img src="data:x"><img src="/media/2026/10/a-1.webp" onerror="x"></p>'), '<h2>T</h2><p><img src="/media/2026/10/a-1.webp" alt=""></p>');
  assert.strictEqual(sanitise("<p>1 < 2 &amp; 3&nbsp;4</p><p></p><p><br></p>"), "<p>1 &lt; 2 &amp; 3 4</p>");
  assert.match(sanitise("<ul><li>a<li>b</ul><p>c"), /<\/ul><p>c<\/p>$/);  // unclosed tags are closed
  assert.strictEqual(slugify("Koncert duchovní hudby – říjen 2026!"), "koncert-duchovni-hudby-rijen-2026");

  assert.strictEqual((await call("GET", null)).body.user, null);
  assert.strictEqual((await call("POST", { action: "publish", title: "x" })).status, 401);
  assert.strictEqual((await call("POST", { action: "login", name: "Lenka", password: "spatne" })).status, 401);
  const ok = await call("POST", { action: "login", name: "lenka", password: "tajne-heslo-1" });
  assert.strictEqual(ok.status, 200);
  assert.match(ok.cookie, /HttpOnly; Secure; SameSite=Strict/);
  const cookie = ok.cookie.split(";")[0];
  assert.strictEqual((await call("GET", null, cookie)).body.user, "Lenka");
  assert.strictEqual((await call("GET", null, cookie.replace(/.$/, "x"))).body.user, null);  // tampered cookie

  // files: declared type must match the content, size is capped
  const pdf = Buffer.from("%PDF-1.4 test").toString("base64");
  assert.strictEqual((await call("POST", { action: "upload", name: "a.pdf", type: "image/jpeg", data: pdf }, cookie)).status, 400);
  assert.strictEqual((await call("POST", { action: "upload", name: "x.svg", type: "image/svg+xml", data: pdf }, cookie)).status, 400);
  assert.strictEqual((await call("POST", { action: "upload", name: "big.pdf", type: "application/pdf", data: Buffer.alloc(3.2 * 1024 * 1024, 0x25).toString("base64") }, cookie)).status, 413);
  const up = await call("POST", { action: "upload", name: "Program koncertu.pdf", type: "application/pdf", data: pdf }, cookie);
  assert.strictEqual(up.status, 200);
  assert.match(up.body.path, /^static\/media\/\d{4}\/\d{2}\/program-koncertu-[0-9a-f]{8}\.pdf$/);

  // publish: one commit with the article and its files; a taken slug gets a number
  existing = new Set(["content/news/2026/11/02/koncert-v-listopadu.html"]);
  const pub = await call("POST", { action: "publish", title: "Koncert v listopadu", date: "2026-11-02T10:30", categories: ["souteze", "bogus"],
    body: '<h2>Program</h2><p>Hraje <strong>varhaník</strong>.<script>x()</script></p>', files: [{ ...up.body, role: "attachment", label: "Program <b>koncertu</b>" }] }, cookie);
  assert.strictEqual(pub.status, 200);
  assert.strictEqual(pub.body.url, "/2026/11/02/koncert-v-listopadu-2/");
  const tree = commits.at(-1);
  const article = tree.find((f) => f.path === "content/news/2026/11/02/koncert-v-listopadu-2.html");
  assert.ok(tree.some((f) => f.path === up.body.path && f.sha === up.body.sha));
  const meta = JSON.parse(article.content.split("---\n")[1]);
  assert.deepStrictEqual(meta.categories, ["souteze"]);
  assert.strictEqual(meta.author, "Lenka");
  assert.strictEqual(meta.excerpt, "Program Hraje varhaník.");
  assert.ok(!article.content.includes("script"));
  assert.ok(article.content.includes(`<p class="file"><a href="${up.body.url}">Program &lt;b&gt;koncertu&lt;/b&gt;</a> (PDF)</p>`));
  assert.strictEqual((await call("POST", { action: "publish", title: "", date: "2026-11-02T10:30", body: "<p>x</p>" }, cookie)).status, 400);

  // edit: the address stays, earlier fields are kept, files already on the site are kept by address
  stored["content/news/2026/10/08/koncert.html"] = `---\n${JSON.stringify({ title: "Koncert", url: "/2026/10/08/koncert/", wp_id: 7, date: "2026-10-08T14:28",
    categories: ["souteze"], image: "/media/2018/06/koncert.jpg", excerpt: "Starý", status: "existing", imported: true }, null, 1)}\n---\n<p>Starý text.</p>\n<p class="file"><a href="/media/2026/10/program.pdf">Program</a> (PDF)</p>\n`;
  const loaded = await call("POST", { action: "load", path: "content/news/2026/10/08/koncert.html" }, cookie);
  assert.strictEqual(loaded.status, 200);
  assert.strictEqual(loaded.body.body, "<p>Starý text.</p>");
  assert.deepStrictEqual(loaded.body.attachments, [{ url: "/media/2026/10/program.pdf", label: "Program", ext: "PDF" }]);
  assert.strictEqual(loaded.body.editable, true);
  const upd = await call("POST", { action: "publish", path: "content/news/2026/10/08/koncert.html", title: "Koncert – nový čas", date: "2026-10-08T18:00",
    categories: ["souteze"], body: "<p>Nový text.</p>", files: [{ url: "/media/2018/06/koncert.jpg", role: "image" }, { url: "/media/2026/10/program.pdf", role: "attachment", label: "Program", ext: "PDF" }] }, cookie);
  assert.strictEqual(upd.status, 200);
  assert.strictEqual(upd.body.url, "/2026/10/08/koncert/");
  const edited = commits.at(-1);
  assert.strictEqual(edited.length, 1);  // only the article; no new files
  const em = JSON.parse(edited[0].content.split("---\n")[1]);
  assert.strictEqual(em.wp_id, 7); assert.strictEqual(em.editedBy, "Lenka"); assert.strictEqual(em.status, undefined); assert.strictEqual(em.title, "Koncert – nový čas");
  assert.ok(edited[0].content.includes('<p>Nový text.</p>\n<p class="file"><a href="/media/2026/10/program.pdf">Program</a> (PDF)</p>'));
  assert.strictEqual((await call("POST", { action: "publish", path: "../../etc/passwd", title: "x", date: "2026-10-08T18:00", body: "<p>x</p>" }, cookie)).status, 400);
  assert.strictEqual((await call("POST", { action: "publish", path: "content/news/2026/10/08/koncert.html", title: "x", date: "2026-10-08T18:00", body: "<p>x</p>",
    files: [{ url: "javascript:alert(1)", role: "attachment" }] }, cookie)).status, 400);

  // an older post with a captioned photo: its text is kept exactly, whatever the browser sends
  stored["content/news/2018/09/14/stary.html"] = `---\n${JSON.stringify({ title: "Starý", url: "/2018/09/14/stary/", date: "2018-09-14T10:00", categories: ["akce"] })}\n---\n<figure><img src="/media/2018/09/a.jpg" alt=""><figcaption>Popisek</figcaption></figure>\n`;
  assert.strictEqual((await call("POST", { action: "load", path: "content/news/2018/09/14/stary.html" }, cookie)).body.editable, false);
  await call("POST", { action: "publish", path: "content/news/2018/09/14/stary.html", title: "Starý (opraveno)", date: "2018-09-14T10:00", body: "", categories: ["akce"] }, cookie);
  assert.ok(commits.at(-1)[0].content.includes("<figcaption>Popisek</figcaption>"));

  // delete: one commit removing the file
  const del = await call("POST", { action: "delete", path: "content/news/2026/10/08/koncert.html" }, cookie);
  assert.strictEqual(del.status, 200);
  assert.deepStrictEqual(commits.at(-1), [{ path: "content/news/2026/10/08/koncert.html", mode: "100644", type: "blob", sha: null }]);
  assert.strictEqual((await call("POST", { action: "delete", path: "content/news/2026/10/08/nic.html" }, cookie)).status, 404);
  assert.strictEqual((await call("POST", { action: "delete", path: "content/news/2026/10/08/koncert.html" })).status, 401);  // signed out

  // cross-site requests are refused
  const evil = await new Promise((done) => handler({ method: "POST", headers: { host: "www.gymskutec.cz", origin: "https://evil.example" }, body: {} },
    { statusCode: 200, setHeader() {}, end() { done(this.statusCode); } }));
  assert.strictEqual(evil, 403);
  console.log("news api ok");
})().catch((e) => { console.error(e); process.exit(1); });
