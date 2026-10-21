// Publishing from /pridat-aktualitu/ without GitHub: staff sign in with a password, upload files one by one
// (each request stays under Vercel's 4.5 MB body limit) and publish. An article is committed to the main branch
// as content/news/YYYY/MM/DD/slug.html, its files to static/media/YYYY/MM/, events to content/events.json;
// Vercel then rebuilds the site. The same file runs on every Order of Malta site (only the three constants below differ).
//
// Env: NEWS_USERS   one "Name:password" or "Name:password:admin" per line (or separated by ";"), one per co-worker;
//                   without ":admin" the person is an editor (writes and edits their own posts and events)
//      NEWS_SECRET  long random string that signs the sign-in cookie
//      GITHUB_TOKEN fine-grained token, this repository only, Contents: read and write
//      GITHUB_REPO  owner/name (default below), GITHUB_BRANCH (default main)
//      optional: RESEND_API_KEY, NEWS_NOTIFY (who is emailed about each change), MAIL_FROM
const crypto = require("crypto");
const SITE = require("../content/site.json");

const DEFAULT_REPO = "Omegaswitch/skolaSkutec";
const DEFAULT_CATEGORY = "akce";
const FEATURES = {"events": true, "pin": true};  // events: the calendar of events; pin: a notice pinned to the home page

const COOKIE = "news_session";
const SESSION_HOURS = 12;
const MAX_FILE = 3 * 1024 * 1024; // after the browser has shrunk photos; base64 in JSON keeps the request under 4.5 MB
const MAX_TEXT = 200000;
const TYPES = { "application/pdf": "pdf", "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
const MAGIC = [[[0x25, 0x50, 0x44, 0x46], "application/pdf"], [[0xff, 0xd8, 0xff], "image/jpeg"],
  [[0x89, 0x50, 0x4e, 0x47], "image/png"], [[0x52, 0x49, 0x46, 0x46], "image/webp"]];
const HIDDEN_CATEGORIES = ["news_malteser_international", "nezarazene_import"];
const CATEGORIES = Object.keys(SITE.newsCategories).filter((c) => !HIDDEN_CATEGORIES.includes(c));

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const env = (k, d = "") => process.env[k] || d;
const ROLES = ["editor", "admin"];

// ---------------------------------------------------------------- sign-in and roles

function users() {
  const out = {};
  for (const line of env("NEWS_USERS").split(/[\n;]/)) {
    const i = line.indexOf(":");
    if (i <= 0) continue;
    let password = line.slice(i + 1).trim(), role = "editor";
    const m = password.match(/^(.*):(editor|admin)$/);
    if (m) { password = m[1]; role = m[2]; }
    if (password) out[line.slice(0, i).trim()] = { password, role };
  }
  return out;
}
const roleOf = (name) => (users()[name] || {}).role || "editor";

const same = (a, b) => {
  const x = crypto.createHash("sha256").update(String(a)).digest(), y = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
};
const sign = (v) => crypto.createHmac("sha256", env("NEWS_SECRET")).update(v).digest("base64url");

function session(req) {
  const m = (req.headers.cookie || "").match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!m || !env("NEWS_SECRET")) return null;
  const [name, exp, mac] = decodeURIComponent(m[1]).split("|");
  if (!name || !mac || !same(mac, sign(`${name}|${exp}`)) || Date.now() > Number(exp)) return null;
  return name in users() ? name : null;  // removing someone from NEWS_USERS signs them out
}

function setCookie(res, value, maxAge) {
  res.setHeader("Set-Cookie", `${COOKIE}=${encodeURIComponent(value)}; Path=/api/news; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`);
}

const failures = new Map(); // per instance: a few wrong passwords slow the next attempt down
async function throttle(ip) {
  const n = failures.get(ip) || 0;
  if (n) await new Promise((r) => setTimeout(r, Math.min(8000, 500 * 2 ** n)));
}

// An editor may change what they wrote (or what nobody signed: imported posts); an admin may change anything.
const mayChange = (user, meta) => roleOf(user) === "admin" || !meta.author || meta.author === user || meta.editedBy === user;

// ---------------------------------------------------------------- content

const ALLOWED = new Set(["p", "br", "h2", "h3", "strong", "em", "u", "s", "a", "ul", "ol", "li", "blockquote", "img"]);
const RENAME = { b: "strong", i: "em", h1: "h2", h4: "h3", strike: "s", del: "s" };
const VOID = new Set(["br", "img"]);

function safeHref(v) {
  v = v.trim();
  return /^(https?:\/\/|mailto:|\/(?!\/))/i.test(v) ? v : null;
}

// Rebuilds every tag from an allowlist; anything else becomes text or disappears. The editor sends semantic
// HTML (headings, bold, lists, links, quotes, photos uploaded to /media/), so nothing legitimate is lost.
function sanitise(html) {
  html = String(html).replace(/<!--[\s\S]*?-->/g, "").replace(/<(script|style|iframe|object|svg|math)\b[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/&nbsp;| /g, " ");
  let out = "";
  const open = [];
  for (const part of html.split(/(<\/?[a-zA-Z][^<>]*>)/)) {
    const m = part.match(/^<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^<>]*)>$/);
    if (!m) { out += part.replace(/</g, "&lt;").replace(/>/g, "&gt;"); continue; }
    const closing = !!m[1];
    const name = RENAME[m[2].toLowerCase()] || m[2].toLowerCase();
    if (!ALLOWED.has(name)) continue;
    if (closing) {
      const i = open.lastIndexOf(name);
      if (i < 0) continue;
      while (open.length > i) out += `</${open.pop()}>`;
      continue;
    }
    const attr = (k) => { const a = m[3].match(new RegExp(`\\s${k}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i")); return a ? (a[2] ?? a[3] ?? a[4]) : null; };
    let tag = name;
    if (name === "a") {
      const href = safeHref(attr("href") || "");
      if (!href) continue;
      tag += ` href="${esc(href)}"`;
    } else if (name === "img") {
      const src = attr("src") || "";
      if (!MEDIA_URL.test(src)) continue;  // only photos uploaded through the form
      tag += ` src="${esc(src)}" alt="${esc(attr("alt") || "")}"`;
    }
    out += `<${tag}>`;
    if (!VOID.has(name)) open.push(name);
  }
  while (open.length) out += `</${open.pop()}>`;
  return out.replace(/<(p|h2|h3|li|blockquote|strong|em|u|s)>\s*<\/\1>/g, "").replace(/<p><br><\/p>/g, "").trim();
}

const plain = (html) => html.replace(/<\/?(p|h2|h3|li|ul|ol|blockquote|br)\b[^>]*>/g, " ").replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const excerptOf = (text) => (text.length <= 180 ? text : text.slice(0, text.lastIndexOf(" ", 180)) + "…");
const oneLine = (s, max) => String(s || "").replace(/\s+/g, " ").trim().slice(0, max);

function slugify(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70).replace(/-$/, "") || "aktualita";
}

function sniff(buf) {
  for (const [sig, type] of MAGIC) if (sig.every((b, i) => buf[i] === b)) return type === "image/webp" && buf.toString("ascii", 8, 12) !== "WEBP" ? null : type;
  return null;
}

// ---------------------------------------------------------------- GitHub

async function gh(path, opts = {}) {
  const r = await fetch(`https://api.github.com/repos/${env("GITHUB_REPO", DEFAULT_REPO)}${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${env("GITHUB_TOKEN")}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "order-of-malta-news", ...(opts.body ? { "Content-Type": "application/json" } : {}) },
  });
  if (r.status === 404 && opts.allow404) return null;
  if (!r.ok) throw Object.assign(new Error(`GitHub ${r.status} ${path}`), { status: r.status });
  return r.json();
}

const contentsPath = (path) => `/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${env("GITHUB_BRANCH", "main")}`;

async function exists(path) {
  return !!(await gh(contentsPath(path), { allow404: true }));
}

async function readFile(path) {
  const r = await gh(contentsPath(path), { allow404: true });
  return r ? Buffer.from(r.content, "base64").toString("utf8") : null;
}

async function commit(files, message, author) {
  // files: [{path, content} | {path, sha} | {path, delete}]; one commit on top of the branch, retried once if someone else pushed meanwhile
  const branch = env("GITHUB_BRANCH", "main");
  for (let attempt = 0; ; attempt++) {
    const ref = await gh(`/git/ref/heads/${branch}`);
    const head = await gh(`/git/commits/${ref.object.sha}`);
    const tree = await gh("/git/trees", { method: "POST", body: JSON.stringify({ base_tree: head.tree.sha,
      tree: files.map((f) => ({ path: f.path, mode: "100644", type: "blob", ...(f.delete ? { sha: null } : f.sha ? { sha: f.sha } : { content: f.content }) })) }) });
    const c = await gh("/git/commits", { method: "POST", body: JSON.stringify({ message, tree: tree.sha, parents: [ref.object.sha],
      author: { name: author, email: `aktuality@${new URL(SITE.baseUrl).host.replace(/^www\./, "")}` } }) });
    try {
      return await gh(`/git/refs/heads/${branch}`, { method: "PATCH", body: JSON.stringify({ sha: c.sha }) });
    } catch (e) {
      if (attempt || e.status !== 422) throw e;
    }
  }
}

async function notify(subject, html) {
  if (!env("RESEND_API_KEY") || !env("NEWS_NOTIFY")) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${env("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env("MAIL_FROM", `Aktuality <aktuality@${new URL(SITE.baseUrl).host.replace(/^www\./, "")}>`), to: env("NEWS_NOTIFY").split(/[,;\s]+/).filter(Boolean), subject, html }),
  }).catch(() => {});  // a failed notice never blocks publishing
}

// ---------------------------------------------------------------- files

async function upload(body) {
  const type = TYPES[body.type] ? body.type : null;
  const buf = Buffer.from(String(body.data || ""), "base64");
  if (!type || !buf.length) return [400, { error: "type" }];
  if (buf.length > MAX_FILE) return [413, { error: "size" }];
  if (sniff(buf) !== type) return [400, { error: "type" }];  // the content must match the declared type
  const now = new Date(), y = now.getFullYear(), m = String(now.getMonth() + 1).padStart(2, "0");
  const stem = slugify(String(body.name || "").replace(/\.[^.]*$/, "")).slice(0, 50);
  const path = `static/media/${y}/${m}/${stem}-${crypto.randomBytes(4).toString("hex")}.${TYPES[type]}`;  // never the uploader's own name alone
  const blob = await gh("/git/blobs", { method: "POST", body: JSON.stringify({ content: buf.toString("base64"), encoding: "base64" }) });
  return [200, { sha: blob.sha, path, url: path.replace(/^static/, ""), size: buf.length, type }];
}

// ---------------------------------------------------------------- news

const NEWS_PATH = /^content\/news\/\d{4}\/\d{2}\/\d{2}\/[a-z0-9-]+\.html$/;
const MEDIA_URL = /^\/media\/[A-Za-z0-9\/._%-]+$/;
const FILE_P = /\n?<p class="file"><a href="([^"]+)">([^<]*)<\/a> \(([A-Z0-9]+)\)<\/p>/g;
// older imported posts may hold captions, dividers or tables the editor cannot reproduce; their text is kept as it is
const editable = (html) => !/<(figure|figcaption|table|hr|h4|h5|div|iframe|video)\b/i.test(html);

async function readNews(path) {
  const text = await readFile(path);
  if (text == null) return null;
  const [, meta, body] = text.split("---\n");
  const attachments = [];
  const content = (body || "").replace(FILE_P, (_, url, label, ext) => { attachments.push({ url, label, ext }); return ""; }).trim();
  return { meta: JSON.parse(meta), body: content, attachments };
}

async function load(body, user) {
  if (!NEWS_PATH.test(body.path || "")) return [400, { error: "path" }];
  const n = await readNews(body.path);
  if (!n) return [404, { error: "gone" }];
  const m = n.meta;
  return [200, { path: body.path, title: m.title, date: String(m.date || "").slice(0, 16), categories: m.categories || [], excerpt: m.excerpt || "",
    image: m.image || null, url: m.url, author: m.author || null, draft: !!m.draft, pinned: !!m.pinned, body: n.body, attachments: n.attachments,
    editable: editable(n.body), mayChange: mayChange(user, m) }];
}

async function remove(body, user) {
  if (!NEWS_PATH.test(body.path || "")) return [400, { error: "path" }];
  const n = await readNews(body.path);
  if (!n) return [404, { error: "gone" }];
  if (!mayChange(user, n.meta)) return [403, { error: "forbidden" }];
  await commit([{ path: body.path, delete: true }], `Smazána aktualita: ${n.meta.title} (${user})`, user);
  await notify(`Smazaná aktualita: ${n.meta.title}`, `<p>${esc(user)} smazal(a) aktualitu <b>${esc(n.meta.title)}</b> (${esc(n.meta.url)}).</p>`);
  return [200, { url: n.meta.url }];
}

// a new post, or (with body.path) changes to an existing one, which keeps its address
async function publish(body, user) {
  const editing = body.path != null;
  if (editing && !NEWS_PATH.test(body.path)) return [400, { error: "path" }];
  const old = editing ? await readNews(body.path) : null;
  if (editing && !old) return [404, { error: "gone" }];
  if (editing && !mayChange(user, old.meta)) return [403, { error: "forbidden" }];
  const keep = editing && !editable(old.body);
  const title = oneLine(body.title, 200);
  const html = keep ? old.body : sanitise(String(body.body || "").slice(0, MAX_TEXT));
  const date = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(body.date || "") ? body.date : null;
  const cats = (Array.isArray(body.categories) ? body.categories : []).filter((c) => c in SITE.newsCategories);
  const files = (Array.isArray(body.files) ? body.files : []).slice(0, 30);
  if (!title || !plain(html) || !date) return [400, { error: "missing" }];
  // new uploads come with the blob made by "upload"; files already on the site only by their address
  const bad = (f) => !["image", "attachment", "inline"].includes(f.role) || (f.sha
    ? !/^[0-9a-f]{40}$/.test(f.sha) || !/^static\/media\/\d{4}\/\d{2}\/[a-z0-9-]+\.(pdf|jpg|png|webp)$/.test(f.path || "")
    : !MEDIA_URL.test(f.url || ""));
  if (files.some(bad)) return [400, { error: "files" }];

  const media = files.map((f) => ({ ...f, url: f.sha ? f.path.replace(/^static/, "") : f.url }));
  const image = media.find((f) => f.role === "image");
  const attachments = media.filter((f) => f.role === "attachment").map((f) =>
    `<p class="file"><a href="${esc(f.url)}">${esc(oneLine(f.label || "Stáhnout", 120) || "Stáhnout")}</a> (${(f.ext || f.url.split(".").pop()).toUpperCase().replace(/[^A-Z0-9]/g, "")})</p>`).join("\n");
  const added = media.filter((f) => f.sha && (f.role !== "inline" || html.includes(f.url)));

  let path, url;
  if (editing) {
    path = body.path; url = old.meta.url;
  } else {
    const [d] = date.split("T"), [Y, M, D] = d.split("-");
    let slug = slugify(title), n = 1;
    while (await exists(`content/news/${Y}/${M}/${D}/${slug}${n > 1 ? `-${n}` : ""}.html`)) n++;
    if (n > 1) slug += `-${n}`;
    path = `content/news/${Y}/${M}/${D}/${slug}.html`; url = `/${Y}/${M}/${D}/${slug}/`;
  }
  const excerpt = oneLine(body.excerpt, 300) || excerptOf(plain(html));
  const meta = { ...(old ? old.meta : {}), title, url, date, categories: cats.length ? cats : [DEFAULT_CATEGORY],
    image: image ? image.url : null, excerpt, author: (old && old.meta.author) || user, imported: false };
  // a draft is kept in the repository but not built; a future date is built once it has come (scheduled)
  if (body.draft) meta.draft = true; else delete meta.draft;
  // pinning a notice to the home page is the admins' call; an editor's save keeps whatever an admin set
  if (FEATURES.pin && roleOf(user) === "admin" && body.pinned != null) { if (body.pinned) meta.pinned = true; else delete meta.pinned; }
  if (editing) { meta.editedBy = user; delete meta.status; }  // edited by staff: no longer an unreviewed import
  const text = keep ? html : html.replace(/<\/(p|h2|h3|ul|ol|blockquote)>/g, "</$1>\n").trim();
  const doc = `---\n${JSON.stringify(meta, null, 1)}\n---\n${text}${attachments ? "\n" + attachments : ""}\n`;

  const what = meta.draft ? "Koncept aktuality" : date > localNow() ? "Naplánována aktualita" : editing ? "Upravena aktualita" : "Aktualita";
  await commit([{ path, content: doc }, ...added.map((f) => ({ path: f.path, sha: f.sha }))], `${what}: ${title} (${user})`, user);
  if (!meta.draft) await notify(`${editing ? "Upravená" : "Nová"} aktualita: ${title}`,
    `<p>${esc(user)} ${editing ? "upravil(a)" : "zveřejnil(a)"} aktualitu <b>${esc(title)}</b>.</p><p><a href="${SITE.baseUrl}${url}">${SITE.baseUrl}${url}</a> (na webu asi za minutu${date > localNow() ? ", po uvedeném datu" : ""})</p>`);
  return [200, { url, path, draft: !!meta.draft, scheduled: date.slice(0, 10) > localNow().slice(0, 10) }];
}

// Prague time as "YYYY-MM-DDTHH:MM", the same form the editor sends (it fills in the device's local time)
function localNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Prague", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(new Date()).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

// ---------------------------------------------------------------- events (content/events.json)

const EVENTS_PATH = "content/events.json";
const WHEN = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

async function readEvents() {
  const text = await readFile(EVENTS_PATH);
  const list = text ? JSON.parse(text) : [];
  return Array.isArray(list) ? list : [];
}

const eventSlug = (title, start) => `${slugify(title).slice(0, 60)}-${start.slice(0, 10)}`;

async function listEvents() {
  return [200, { events: (await readEvents()).map((e) => ({ ...e, description: e.description || "" })) }];
}

async function saveEvent(body, user) {
  const title = oneLine(body.title, 200);
  const start = WHEN.test(body.start || "") ? body.start : null;
  const end = WHEN.test(body.end || "") ? body.end : start;
  const place = oneLine(body.place, 120);
  const description = sanitise(String(body.description || "").slice(0, 20000));
  if (!title || !start || end < start) return [400, { error: "missing" }];
  const list = await readEvents();
  const i = body.url ? list.findIndex((e) => e.url === body.url) : -1;
  if (body.url && i < 0) return [404, { error: "gone" }];
  if (i >= 0 && !mayChange(user, list[i])) return [403, { error: "forbidden" }];
  let url = i >= 0 ? list[i].url : `/udalost/${eventSlug(title, start)}/`;
  for (let n = 2; i < 0 && list.some((e) => e.url === url); n++) url = `/udalost/${eventSlug(title, start)}-${n}/`;
  const event = { ...(i >= 0 ? list[i] : { author: user }), title, start, end, allDay: !!body.allDay, url, description, ...(place ? { place } : {}) };
  if (!place) delete event.place;
  if (i >= 0) { event.editedBy = user; list[i] = event; } else list.push(event);
  list.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));
  await commit([{ path: EVENTS_PATH, content: JSON.stringify(list, null, 1) + "\n" }], `${i >= 0 ? "Upravena událost" : "Událost"}: ${title} (${user})`, user);
  await notify(`${i >= 0 ? "Upravená" : "Nová"} událost: ${title}`, `<p>${esc(user)} ${i >= 0 ? "upravil(a)" : "přidal(a)"} událost <b>${esc(title)}</b> (${esc(start)}).</p>`);
  return [200, { url, event }];
}

async function removeEvent(body, user) {
  const list = await readEvents();
  const i = list.findIndex((e) => e.url === body.url);
  if (i < 0) return [404, { error: "gone" }];
  if (!mayChange(user, list[i])) return [403, { error: "forbidden" }];
  const [gone] = list.splice(i, 1);
  await commit([{ path: EVENTS_PATH, content: JSON.stringify(list, null, 1) + "\n" }], `Smazána událost: ${gone.title} (${user})`, user);
  await notify(`Smazaná událost: ${gone.title}`, `<p>${esc(user)} smazal(a) událost <b>${esc(gone.title)}</b> (${esc(gone.start)}).</p>`);
  return [200, { url: gone.url }];
}

// ---------------------------------------------------------------- handler

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;  // Vercel parses JSON bodies
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); } catch { return {}; }
}

module.exports = async (req, res) => {
  const send = (status, data) => { res.statusCode = status; res.setHeader("Content-Type", "application/json; charset=utf-8"); res.setHeader("Cache-Control", "no-store"); res.end(JSON.stringify(data)); };
  const info = (user) => ({ user, role: user ? roleOf(user) : null, categories: CATEGORIES.map((c) => [c, SITE.newsCategories[c]]), allCategories: SITE.newsCategories,
    defaultCategory: DEFAULT_CATEGORY, features: { events: !!FEATURES.events, pin: !!FEATURES.pin && !!user && roleOf(user) === "admin" } });
  if (req.method === "GET") return send(200, info(session(req)));
  if (req.method !== "POST") { res.setHeader("Allow", "GET, POST"); return send(405, { error: "method" }); }
  const origin = req.headers.origin;
  if (origin && new URL(origin).host !== req.headers.host) return send(403, { error: "origin" });  // with SameSite=Strict: no cross-site posts
  if (!env("NEWS_SECRET") || !env("GITHUB_TOKEN") || !Object.keys(users()).length) return send(503, { error: "config" });

  const body = await readJson(req);
  try {
    if (body.action === "login") {
      const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0] || "?";
      await throttle(ip);
      const all = users();
      const name = Object.keys(all).find((u) => u.toLowerCase() === String(body.name || "").trim().toLowerCase());
      if (!name || !same(all[name].password, String(body.password || ""))) { failures.set(ip, (failures.get(ip) || 0) + 1); return send(401, { error: "login" }); }
      failures.delete(ip);
      const exp = Date.now() + SESSION_HOURS * 3600e3;
      setCookie(res, `${name}|${exp}|${sign(`${name}|${exp}`)}`, SESSION_HOURS * 3600);
      return send(200, info(name));
    }
    if (body.action === "logout") { setCookie(res, "", 0); return send(200, { user: null }); }
    const user = session(req);
    if (!user) return send(401, { error: "session" });
    if (body.action === "upload") return send(...(await upload(body)));
    if (body.action === "publish") return send(...(await publish(body, user)));
    if (body.action === "load") return send(...(await load(body, user)));
    if (body.action === "delete") return send(...(await remove(body, user)));
    if (FEATURES.events) {
      if (body.action === "events") return send(...(await listEvents()));
      if (body.action === "event") return send(...(await saveEvent(body, user)));
      if (body.action === "event-delete") return send(...(await removeEvent(body, user)));
    }
    return send(400, { error: "action" });
  } catch (e) {
    console.error(e);
    return send(502, { error: "server" });
  }
};

module.exports.sanitise = sanitise;
module.exports.slugify = slugify;
module.exports.users = users;
