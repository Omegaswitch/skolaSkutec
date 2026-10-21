// A local stand-in for the hosting: serves dist/ and api/news.js with GitHub replaced by a folder on disk, so the
// whole publishing flow (sign-in, upload, publish, edit, delete, events) can be tried in a browser or by a test
// without a token. Writes go to the repository checkout itself (content/, static/media/), where git shows them.
//   node tests/news.local.js [port]      then open http://127.0.0.1:8090/pridat-aktualitu/
//   sign-in: editor / editor, admin / admin   (NEWS_USERS, NEWS_SECRET and GITHUB_TOKEN are set here only)
const http = require("http"), fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..");
process.env.NEWS_USERS = process.env.NEWS_USERS || "editor:editor\nadmin:admin:admin";
process.env.NEWS_SECRET = process.env.NEWS_SECRET || crypto.randomBytes(16).toString("hex");
process.env.GITHUB_TOKEN = "local";
const blobs = {};  // sha -> bytes, until the commit writes them
global.fetch = async (url, opts = {}) => {
  const u = new URL(url), body = opts.body ? JSON.parse(opts.body) : null;
  const json = (status, data) => ({ ok: status < 300, status, json: async () => data });
  if (u.pathname.includes("/contents/")) {
    const p = path.join(ROOT, decodeURIComponent(u.pathname.split("/contents/")[1]));
    return fs.existsSync(p) ? json(200, { content: fs.readFileSync(p).toString("base64") }) : json(404, {});
  }
  if (u.pathname.endsWith("/git/blobs")) { const sha = crypto.createHash("sha1").update(body.content).digest("hex"); blobs[sha] = Buffer.from(body.content, "base64"); return json(201, { sha }); }
  if (u.pathname.endsWith("/git/ref/heads/main")) return json(200, { object: { sha: "0".repeat(40) } });
  if (/\/git\/commits\/0+$/.test(u.pathname)) return json(200, { tree: { sha: "1".repeat(40) } });
  if (u.pathname.endsWith("/git/trees")) {
    for (const f of body.tree) {
      const p = path.join(ROOT, f.path);
      if (!p.startsWith(ROOT + path.sep)) throw new Error("outside the repository: " + f.path);
      if (f.sha === null) { if (fs.existsSync(p)) fs.unlinkSync(p); continue; }
      fs.mkdirSync(path.dirname(p), { recursive: true });
      fs.writeFileSync(p, f.content != null ? f.content : blobs[f.sha]);
    }
    return json(201, { sha: "2".repeat(40) });
  }
  if (u.pathname.endsWith("/git/commits")) { console.log("commit:", body.message); return json(201, { sha: "3".repeat(40) }); }
  if (u.pathname.endsWith("/git/refs/heads/main")) return json(200, {});
  if (u.hostname === "api.resend.com") return json(200, {});
  throw new Error("unexpected " + url);
};
const handler = require("../api/news.js");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".pdf": "application/pdf", ".woff2": "font/woff2", ".xml": "application/xml", ".wasm": "application/wasm" };
const port = Number(process.argv[2] || process.env.PORT || 8090);
http.createServer(async (req, res) => {
  if (req.url.startsWith("/api/news")) {
    req.headers.host = req.headers.host || `127.0.0.1:${port}`;
    const chunks = []; for await (const c of req) chunks.push(c);
    try { req.body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); } catch { req.body = {}; }
    const setHeader = res.setHeader.bind(res);
    res.setHeader = (k, v) => setHeader(k, k.toLowerCase() === "set-cookie" ? String(v).replace("; Secure", "") : v);  // plain http locally
    return handler(req, res);
  }
  let p = path.join(ROOT, "dist", decodeURIComponent(req.url.split("?")[0]));
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, "index.html");
  if (!p.startsWith(path.join(ROOT, "dist")) || !fs.existsSync(p)) { res.statusCode = 404; return res.end("not found"); }
  res.setHeader("Content-Type", TYPES[path.extname(p)] || "application/octet-stream");
  fs.createReadStream(p).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`local publishing at http://127.0.0.1:${port}/pridat-aktualitu/ (editor/editor, admin/admin); build first with python3 build.py`));
