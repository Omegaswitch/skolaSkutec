"""The pages that show what staff publish: rendered on request from the shared Supabase database, with the very same
functions build.py uses for the rest of the site, so a post looks exactly as it did when it was a file in content/news.

Vercel sends every address that is not a file in dist/ here (vercel.json → rewrites). Nothing is written to the
repository any more: publishing changes a row, and the next request (the CDN keeps a page for a minute) shows it.
Only the public key is used, so the database shows this code exactly what it shows any visitor: published posts.
"""
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timedelta
from http.server import BaseHTTPRequestHandler
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
import build  # noqa: E402  (the site's own renderer; imported once per instance)

SB = build.SITE["supabase"]
SITE_ID = SB["site"]
MEDIA_URL = SB["url"] + "/storage/v1/object/public/media/"
CACHE_HEADER = "public, max-age=0, s-maxage=60, stale-while-revalidate=600"
TTL = 30  # seconds the fetched lists live in this instance

try:
    SIZES = json.loads((ROOT / "content" / "image-sizes.json").read_text(encoding="utf-8"))  # written by build.py
except OSError:
    SIZES = {}

# ---------------------------------------------------------------- the database

def rest(table, params):
    q = urllib.parse.urlencode(params, safe=",.*()")
    req = urllib.request.Request(f"{SB['url']}/rest/v1/{table}?{q}", headers={"apikey": SB["key"], "Authorization": "Bearer " + SB["key"]})
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.loads(r.read().decode("utf-8"))


_cache = {}

def cached(key, make):
    hit = _cache.get(key)
    if hit and time.time() - hit[0] < TTL:
        return hit[1]
    value = make()
    _cache[key] = (time.time(), value)
    return value


# ---------------------------------------------------------------- the text of a post, rebuilt from an allowlist
# What the staff page saves is treated as untrusted: every tag is rebuilt from this list and everything else is
# dropped, so nothing an account (or a stolen session) writes can carry a script onto a page. Texts imported from
# the old websites are marked trusted by the server (tables, captioned photos) and are shown as they are.
ALLOWED = {"p", "br", "h2", "h3", "strong", "em", "u", "s", "a", "ul", "ol", "li", "blockquote", "img"}
RENAME = {"b": "strong", "i": "em", "h1": "h2", "h4": "h3", "strike": "s", "del": "s"}
VOID = {"br", "img"}
TAG = re.compile(r"(</?[a-zA-Z][^<>]*>)")
ATTR = re.compile(r"""\s([a-zA-Z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))""")


def safe_href(v):
    v = (v or "").strip()
    return v if re.match(r"^(https?://|mailto:|/(?!/))", v, re.I) else None


def media_src(v):
    v = (v or "").strip()
    return v if v.startswith("/media/") or v.startswith(MEDIA_URL) else None


def sanitise(html_text):
    html_text = re.sub(r"<!--.*?-->", "", str(html_text), flags=re.S)
    html_text = re.sub(r"<(script|style|iframe|object|svg|math)\b.*?</\1\s*>", "", html_text, flags=re.S | re.I).replace("&nbsp;", " ").replace(" ", " ")
    out, open_tags = [], []
    for part in TAG.split(html_text):
        m = re.match(r"^<(/?)([a-zA-Z][a-zA-Z0-9]*)([^<>]*)>$", part)
        if not m:
            out.append(part.replace("<", "&lt;").replace(">", "&gt;"))
            continue
        name = m.group(2).lower()
        name = RENAME.get(name, name)
        if name not in ALLOWED:
            continue
        if m.group(1):
            if name in open_tags:
                while open_tags:
                    t = open_tags.pop()
                    out.append(f"</{t}>")
                    if t == name:
                        break
            continue
        attrs = {a[0].lower(): (a[1] or a[2] or a[3]) for a in ATTR.findall(m.group(3))}
        tag = name
        if name == "a":
            href = safe_href(attrs.get("href"))
            if not href:
                continue
            tag += f' href="{build.esc(href)}"' + (' rel="noopener"' if href.startswith("http") else "")
        elif name == "img":
            src = media_src(attrs.get("src"))
            if not src:
                continue
            tag += f' src="{build.esc(src)}" alt="{build.esc(attrs.get("alt") or "")}"'
            if str(attrs.get("width", "")).isdigit() and str(attrs.get("height", "")).isdigit():
                tag += f' width="{attrs["width"]}" height="{attrs["height"]}"'
        out.append(f"<{tag}>")
        if name not in VOID:
            open_tags.append(name)
    while open_tags:
        out.append(f"</{open_tags.pop()}>")
    text = "".join(out)
    text = re.sub(r"<(p|h2|h3|li|blockquote|strong|em|u|s)>\s*</\1>", "", text)
    return text.replace("<p><br></p>", "").strip()


def human_size(size):
    return f"{size / 1048576:.1f} MB".replace(".", ",") if size >= 1048576 else f"{max(1, round(size / 1024))} kB"


def as_news(row):
    """A posts row in the shape build.py's renderers expect (the front matter of a news file plus its body)."""
    body = row.get("body") or ""
    if "body" in row and not row.get("trusted"):
        body = sanitise(body)
    for a in row.get("attachments") or []:
        meta = ", ".join(x for x in (a.get("ext"), human_size(a["size"]) if a.get("size") else None) if x)
        body += f'<p class="file"><a class="file" href="{build.esc(a["url"])}"><span>{build.esc(a.get("label") or "Soubor")}</span> <span class="file-meta">{build.esc(meta)}</span></a></p>'
    n = {"url": row["url"], "title": row["title"], "date": row["date"][:16], "categories": row.get("categories") or [], "excerpt": row.get("excerpt") or "",
         "image": row.get("image"), "pinned": bool(row.get("pinned")), "author": row.get("author"), "photos": row.get("photos", 0), "first_photo": row.get("first_photo")}
    if "body" in row:
        n["body"] = body
    n.update({k: v for k, v in (row.get("meta") or {}).items() if k not in n})
    if row.get("image") and row.get("image_w"):
        SIZES[row["image"]] = [row["image_w"], row["image_h"]]
    return n


def as_event(row):
    return {"title": row["title"], "start": row["starts_at"][:16].replace("T", " "), "end": row["ends_at"][:16].replace("T", " "), "allDay": bool(row.get("all_day")),
            "url": row["url"], "description": sanitise(row.get("description") or ""), "place": row.get("place") or "", "categories": row.get("categories") or []}


LIST_COLUMNS = "url,title,date,categories,excerpt,image,image_w,image_h,pinned,author,photos,first_photo,meta"

def published():
    """Every published post of this site, newest first, without the texts (one request, cached)."""
    tomorrow = (datetime.now(ZoneInfo("Europe/Prague")) + timedelta(days=1)).strftime("%Y-%m-%d")  # a post dated today is out, whatever its hour
    return cached("posts", lambda: [as_news(r) for r in rest("posts", {"select": LIST_COLUMNS, "site_id": f"eq.{SITE_ID}", "draft": "eq.false", "date": f"lt.{tomorrow}", "order": "date.desc,created_at.desc", "limit": 5000})])


def events():
    return cached("events", lambda: [as_event(r) for r in rest("events", {"select": "*", "site_id": f"eq.{SITE_ID}", "draft": "eq.false", "order": "starts_at.asc", "limit": 2000})])


def post(url):
    rows = rest("posts", {"select": "*", "site_id": f"eq.{SITE_ID}", "url": f"eq.{url}", "limit": 1})
    return as_news(rows[0]) if rows else None


def full_posts():
    """All posts with their texts (the search index); cached longer, it is only read on the search page."""
    hit = _cache.get("full")
    if hit and time.time() - hit[0] < 600:
        return hit[1]
    rows = [as_news(r) for r in rest("posts", {"select": "*", "site_id": f"eq.{SITE_ID}", "draft": "eq.false", "order": "date.desc", "limit": 5000})]
    _cache["full"] = (time.time(), rows)
    return rows


# ---------------------------------------------------------------- build.py sees the database as it saw the files

def image_size(rel_url):
    wh = SIZES.get(rel_url) or SIZES.get(urllib.parse.unquote(rel_url))
    return tuple(wh) if wh else None


def file_info(url):
    f = SIZES.get(url)
    return (f["ext"], human_size(f["size"])) if isinstance(f, dict) else None


build.image_size = image_size
build.file_info = file_info


def photos_of(n):
    """The photographs of a post; a listing row has no text, so it answers from the counted columns instead."""
    if "body" in n:
        return list(dict.fromkeys(([n["image"]] if n.get("image") else []) + re.findall(r'<img[^>]+src="([^"]*/media/[^"]+)"', n["body"])))
    first = n.get("image") or n.get("first_photo")
    return [first] * n.get("photos", 0) if first else []


build.photos_of = photos_of


def prepare():
    news = published()
    build.NEWS = build.ALL_NEWS = news
    build.PINNED = [n for n in news if n.get("pinned")]
    build.EVENTS = events()
    return news


# ---------------------------------------------------------------- routes

POST_URL = re.compile(r"^/\d{4}/\d{2}/\d{2}/[^/]+/$")
PAGE_EXTRA = re.compile(r"data-events|data-gallery")


def dynamic_pages():
    """Pages of content/ whose text lists events or photos: rendered here, not by the build."""
    return {u: p for u, p in build.PAGES.items() if PAGE_EXTRA.search(p["body"])}


def is_dynamic(path):
    """Whether an address is served here (for check.py; posts and legacy addresses are assumed to exist)."""
    fixed = {"/", "/aktuality/", "/fotogalerie/", "/udalosti/", "/kalendar/", "/feed.xml", "/sitemap.xml", "/hledat/index.json"}
    return path in fixed or path.startswith("/aktuality/") or path.startswith("/udalost/") or bool(POST_URL.match(path)) or path.endswith(".html") or path in dynamic_pages()


def render_event(e):
    when = build.event_when(e) + ("" if e.get("allDay") else f", {e['start'][11:]}")
    inner = f'<p class="lead-s"><time datetime="{e["start"][:10]}">{build.esc(when)}</time>{(" · " + build.esc(e["place"])) if e.get("place") else ""}</p>{e["description"]}' \
            f'<p><a class="link-strong" href="{"/udalosti/" if hasattr(build, "render_events_page") else "/kalendar/" if hasattr(build, "render_calendar") else "/"}">Všechny akce</a></p>'
    return build.render_simple(e["url"], e["title"], inner)


def not_found():
    return 404, "text/html; charset=utf-8", build.render_simple("/404.html", "Stránka nenalezena",
                                    '<p>Tato stránka neexistuje nebo byla přesunuta.</p><p><a class="link-strong" href="/">Úvodní stránka</a> · <a class="link-strong" href="/aktuality/">Aktuality</a></p>')


def listing(path, news):
    """/aktuality/, a category, a year, and (where the site paginates) /strana/N/."""
    m = re.match(r"^/aktuality/(?:([a-z0-9_-]+)/)?(?:strana/(\d+)/)?$", path)
    if not m:
        return None
    key, page = m.group(1), int(m.group(2) or 1)
    cats = build.SITE["newsCategories"]
    if key and key in cats:
        items, kw, base = [n for n in news if key in n.get("categories", [])], {"active": key}, f"/aktuality/{key}/"
    elif key and re.fullmatch(r"\d{4}", key):
        items, kw, base = [n for n in news if n["date"].startswith(key)], {"year": key}, f"/aktuality/{key}/"
    elif not key:
        items, kw, base = news, {}, "/aktuality/"
    else:
        return None
    if not items and key:
        return None
    url = base if page == 1 else f"{base}strana/{page}/"
    if hasattr(build, "PER_PAGE") and not kw.get("year"):
        per = build.PER_PAGE
        pages = max(1, -(-len(items) // per))
        if page > pages:
            return None
        return build.render_news_index(items[(page - 1) * per:page * per], url=url, page=page, pages=pages, **kw)
    if page != 1:
        return None
    return build.render_news_index(items if key else items[:40], url=url, **kw)


def render(path):
    """(status, content type, body) for an address, or a 404 page."""
    path = urllib.parse.unquote(path.split("?")[0]) or "/"
    news = prepare()
    html = "text/html; charset=utf-8"
    if path == "/":
        return 200, html, build.render_home()
    if path == "/feed.xml":
        return 200, "application/rss+xml; charset=utf-8", build.rss()
    if path == "/sitemap.xml":
        urls = ["/", "/aktuality/"] + [u for u in ("/fotogalerie/", "/udalosti/", "/kalendar/") if is_dynamic(u) and (u != "/fotogalerie/" or hasattr(build, "render_gallery")) and (u != "/udalosti/" or hasattr(build, "render_events_page")) and (u != "/kalendar/" or hasattr(build, "render_calendar"))] + list(build.PAGES) + [n["url"] for n in news]
        return 200, "application/xml; charset=utf-8", '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + "".join(f"<url><loc>{build.SITE['baseUrl']}{u}</loc></url>" for u in urls) + "</urlset>"
    if path == "/hledat/index.json" and hasattr(build, "SEARCH_FORM"):
        items = [{"t": p["title"], "u": p["url"], "x": build.plain(p["body"], 600)} for p in build.PAGES.values()] + \
                [{"t": n["title"], "u": n["url"], "x": build.plain(n["body"], 600), "d": build.short_date(n["date"])} for n in full_posts()]
        return 200, "application/json; charset=utf-8", json.dumps(items, ensure_ascii=False, separators=(",", ":"))
    if path == "/fotogalerie/" and hasattr(build, "render_gallery"):
        return 200, html, build.render_gallery()
    if path == "/udalosti/" and hasattr(build, "render_events_page"):
        return 200, html, build.render_events_page()
    if path == "/kalendar/" and hasattr(build, "render_calendar"):
        return 200, html, build.render_calendar()
    if path.startswith("/aktuality/"):
        out = listing(path, news)
        return (200, html, out) if out else not_found()
    if path.startswith("/udalost/"):
        for e in build.EVENTS:
            if e["url"] == path:
                return 200, html, render_event(e)
        return not_found()
    if path in dynamic_pages():
        return 200, html, build.render_page(build.PAGES[path])
    if POST_URL.match(path) or path.endswith(".html") or "/" in path.strip("/"):
        n = post(path)  # the public key sees published posts only
        if n:
            urls = [x["url"] for x in news]
            i = urls.index(path) if path in urls else -1
            prev_n = news[i + 1] if 0 <= i < len(news) - 1 else None
            next_n = news[i - 1] if i > 0 else None
            return 200, html, build.render_article(n, prev_n, next_n)
    return not_found()


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        qs = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        path = qs.get("path", [self.headers.get("x-vercel-original-path", "/")])[0] or "/"
        if not path.endswith("/") and "." not in path.rsplit("/", 1)[-1]:
            path += "/"  # the rewrite hands over the address without its trailing slash
        try:
            status, ctype, body = render(path)
        except Exception as e:  # the site stays up with a plain message rather than a stack trace
            status, ctype, body = 503, "text/html; charset=utf-8", build.render_simple("/503.html", "Stránka je dočasně nedostupná", "<p>Zkuste to prosím za chvíli znovu.</p>")
            print("render failed:", path, repr(e))
        data = body.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", CACHE_HEADER if status == 200 else "no-store")
        self.send_header("Vary", "Accept-Encoding")
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, *a):
        pass
