#!/usr/bin/env python3
"""Static site generator for gymskutec.cz. Python 3.10+, standard library only.
Same engine as maltezskyrad.cz, lurdy.eu and velkoprevorskypalac.eu, reduced to one language (Czech).

    python3 build.py                 preview build into dist/ (noindex, content-status labels shown)
    python3 build.py --production    production build (indexable, no status labels)
    python3 build.py serve [port]    preview build, then serve dist/ with _headers and _redirects applied
"""
import html
import json
import re
import shutil
import struct
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CONTENT, STATIC, DIST = ROOT / "content", ROOT / "static", ROOT / "dist"
PRODUCTION = "--production" in sys.argv
SITE = json.loads((CONTENT / "site.json").read_text(encoding="utf-8"))
T = SITE["text"]
ASSET_VERSION = datetime.now().strftime("%Y%m%d%H%M")
MONTHS = ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"]
esc = lambda s: html.escape(str(s or ""), quote=True)


# ---------------------------------------------------------------- content


def read_doc(path):
    _, meta, body = path.read_text(encoding="utf-8").split("---\n", 2)
    return json.loads(meta), body.strip()


def load_pages():
    pages = {}
    for f in sorted((CONTENT / "pages").rglob("index.html")):
        meta, body = read_doc(f)
        pages[meta["url"]] = {**meta, "body": body}
    return pages


def load_news():
    news = []
    for f in (CONTENT / "news").rglob("*.html"):
        meta, body = read_doc(f)
        news.append({**meta, "body": body, "src": f.relative_to(ROOT).as_posix()})
    return sorted(news, key=lambda n: n["date"], reverse=True)


PAGES, NEWS = load_pages(), load_news()


# navigation index: url -> {node, parent, top}
NAV_INDEX = {}


def _index(nodes, parent=None, top=None):
    for n in nodes:
        n.setdefault("title", PAGES.get(n["url"], {}).get("title", n["url"]))
        NAV_INDEX[n["url"]] = {"node": n, "parent": parent, "top": top or n["url"]}
        _index(n.get("children", []), n["url"], top or n["url"])


_index(SITE["nav"])


def breadcrumbs(url):
    trail = []
    while url in NAV_INDEX:
        trail.insert(0, (NAV_INDEX[url]["node"]["title"], url))
        url = NAV_INDEX[url]["parent"]
    return trail


# ---------------------------------------------------------------- helpers


def image_size(rel_url):
    """Width/height of a local JPEG, PNG or WebP (for layout-stable <img>)."""
    from urllib.parse import unquote
    f = STATIC / unquote(rel_url.lstrip("/"))
    try:
        b = f.read_bytes()[:65536]
    except OSError:
        return None
    if b[:8] == b"\x89PNG\r\n\x1a\n":
        return struct.unpack(">II", b[16:24])
    if b[:4] == b"RIFF" and b[8:12] == b"WEBP":
        c = b[12:16]
        if c == b"VP8 ":
            w, h = struct.unpack("<HH", b[26:30])
            return w & 0x3FFF, h & 0x3FFF
        if c == b"VP8L":
            v = int.from_bytes(b[21:25], "little")
            return (v & 0x3FFF) + 1, ((v >> 14) & 0x3FFF) + 1
        if c == b"VP8X":
            return int.from_bytes(b[24:27], "little") + 1, int.from_bytes(b[27:30], "little") + 1
    if b[:2] == b"\xff\xd8":
        i = 2
        while i < len(b) - 9:
            if b[i] != 0xFF:
                i += 1
                continue
            marker, length = b[i + 1], struct.unpack(">H", b[i + 2:i + 4])[0]
            if marker in (0xC0, 0xC1, 0xC2):
                h, w = struct.unpack(">HH", b[i + 5:i + 9])
                return w, h
            i += 2 + length
    return None


def img(src, alt, cls="", eager=False):
    wh = image_size(src)
    dims = f' width="{wh[0]}" height="{wh[1]}"' if wh else ""
    load = 'fetchpriority="high"' if eager else 'loading="lazy"'
    return f'<img class="ph-img {cls}" src="{esc(src)}" alt="{esc(alt)}"{dims} {load} decoding="async">'


def enhance_body(body):
    """Layout-stable lazy images and scrollable tables in imported content."""
    def fix_img(m):
        tag = m.group(0)
        src = re.search(r'src="([^"]+)"', tag)
        if not src:
            return tag
        wh = image_size(html.unescape(src.group(1))) if src.group(1).startswith("/") else None
        extra = f' width="{wh[0]}" height="{wh[1]}"' if wh else ""
        if ' alt="' not in tag:
            extra += ' alt=""'
        return tag[:-1] + f'{extra} loading="lazy" decoding="async" class="ph-img">'
    body = re.sub(r"<img [^>]+>", fix_img, body)
    # two or more photos in a row (the editor puts each on its own line) become a grid; each opens its full file
    photo = r'(?:<figure><img [^>]+></figure>|<p><img [^>]+></p>|<img [^>]+>)'
    body = re.sub(rf"(?:{photo}\s*){{2,}}", lambda m: '<div class="photo-run">' + re.sub(
        r'<img src="([^"]+)"[^>]*>', lambda i: f'<a href="{i.group(1)}" aria-label="Zobrazit celou fotografii">{i.group(0)}</a>', m.group(0)) + "</div>", body)
    body = re.sub(r"<table>", '<div class="table-wrap" tabindex="0"><table>', body)
    return body.replace("</table>", "</table></div>")


def plain(html_text, n=180):
    t = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", html_text))).strip()
    return t if len(t) <= n else t[: t.rfind(" ", 0, n)] + "…"


def fmt_date(iso):
    d = datetime.fromisoformat(iso[:10])
    return f"{d.day}. {MONTHS[d.month - 1]} {d.year}"


def short_date(iso):
    d = datetime.fromisoformat(iso[:10])
    return f"{d.day}. {d.month}. {d.year}"


# ---------------------------------------------------------------- layout

FONTS_PRELOAD = ["asap-latin-400-normal", "eb-garamond-latin-500-normal"]


def nav_html(current_url):
    top = NAV_INDEX.get(current_url, {}).get("top")
    if current_url.startswith("/aktuality/") or re.match(r"^/\d{4}/", current_url):
        top = "/aktuality/"
    lis = []
    for n in SITE["nav"]:
        cur = ' aria-current="page"' if n["url"] == current_url else (' class="is-active"' if n["url"] == top else "")
        kids = n.get("children", [])
        sub = ""
        if kids:
            sub_items = "".join(f'<li><a href="{c["url"]}">{esc(c["title"])}</a></li>' for c in kids)
            sub = (f'<button class="sub-toggle" type="button" aria-expanded="false" aria-label="{esc(n["title"])}: {esc(T["morePages"])}">'
                   f'<span aria-hidden="true"></span></button><ul class="sub">{sub_items}</ul>')
        lis.append(f'<li class="{"has-sub" if kids else ""}"><a href="{n["url"]}"{cur}>{esc(n["title"])}</a>{sub}</li>')
    return f'<ul class="nav-list">{"".join(lis)}</ul>'


def logo_viewbox():
    """The school lockup's viewBox: its height and the accents above the shield top, in shield units (see .lockup in the CSS)."""
    return [float(v) for v in re.search(r'viewBox="([^"]+)"', (STATIC / "img" / "logo" / "logo-red-on-dark.svg").read_text()).group(1).split()]


def lockup():
    """The school logo (tools/make_logo.py) in the banner, sized like the Order lockup on the sister sites: the shield keeps the Grand Magistry web size."""
    vb = logo_viewbox()
    return (f'<img class="lockup" src="/img/logo/logo-red-on-dark.svg" alt="{esc(SITE["names"]["school"])}" width="{vb[2]:.0f}" height="{vb[3]:.0f}"'
            f'>')


def layout(*, url, title, body, description="", image=None, status=None, main_class=""):
    names, c = SITE["names"], SITE["contact"]
    full_title = f"{title} | {names['site']}" if title != names["site"] else title
    canonical = SITE["baseUrl"] + url
    image = image or SITE["defaultImage"]
    og_image = image if image.startswith("http") else SITE["baseUrl"] + image
    robots = "" if PRODUCTION else '<meta name="robots" content="noindex, nofollow">'
    preload = "".join(f'<link rel="preload" href="/fonts/{f}.woff2" as="font" type="font/woff2" crossorigin>' for f in FONTS_PRELOAD) + \
        '<link rel="preload" href="/img/banner/banner-photo.webp" as="image" fetchpriority="high">'
    ld = ""
    if url == "/":  # who we are, for search engines (data only, not executed)
        ld = '<script type="application/ld+json">' + json.dumps({
            "@context": "https://schema.org", "@type": "HighSchool",
            "name": names["school"], "url": canonical, "email": c["email"], "telephone": c["phones"][0]["number"],
            "address": {"@type": "PostalAddress", "streetAddress": c["street"], "postalCode": c["zip"], "addressLocality": c["city"], "addressCountry": "CZ"},
            "sameAs": [s["url"] for s in SITE["social"]],
            "parentOrganization": {"@type": "Organization", "name": names["founder"], "url": "https://www.maltezskyrad.cz/"},
        }, ensure_ascii=False).replace("</", "<\\/") + "</script>"
    status_bar = ""
    if status and not PRODUCTION:
        status_bar = f'<p class="content-status content-status--{esc(status)}"><span>{esc(T["status"].get(status, status))}</span></p>'
    social = "".join(f'<a href="{esc(s["url"])}" rel="noopener">{esc(s["label"])}</a>' for s in SITE["social"])
    footer_nav = "".join(f'<li><a href="{n["url"]}">{esc(n["title"])}</a></li>' for n in SITE["nav"])
    phones = " · ".join(f'{esc(p["label"])} <a href="tel:{p["number"].replace(" ", "")}">{esc(p["number"])}</a>' for p in c["phones"])
    return f"""<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(full_title)}</title>
<meta name="description" content="{esc(plain(description or body, 160))}">
{robots}
<link rel="canonical" href="{canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{esc(names['site'])}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(description or plain(body, 160))}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{og_image}">
<meta property="og:locale" content="cs_CZ">
<meta name="twitter:card" content="summary_large_image">
{ld}
<meta name="theme-color" content="#e31a18">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png">
<link rel="apple-touch-icon" href="/img/favicon/apple-touch-icon-180x180.png">
<link rel="alternate" type="application/rss+xml" title="{esc(names['site'])}" href="/feed.xml">
{preload}
<link rel="stylesheet" href="/css/site.css?v={ASSET_VERSION}">
<script src="/js/head.js?v={ASSET_VERSION}"></script>
<script src="/js/site.js?v={ASSET_VERSION}" defer></script>
</head>
<body>
<a class="skip" href="#main">{esc(T['skip'])}</a>
<header class="site-header">
 <div class="topbar"><div class="wrap">
  <a class="topbar-home" href="/">{esc(names['topbar'])}</a>
  <span class="topbar-social">{social}</span>
  <span class="topbar-tools"><a href="/hledat/">Hledat</a>{''.join(f'<a href="{esc(q["url"])}" rel="noopener">{esc(q["label"])}</a>' for q in SITE["topbarLinks"])}</span>
 </div></div>
 <div class="banner"><div class="wrap">
  <a class="banner-home" href="/">{lockup()}</a>
  <p class="fullname">{esc(names['school'])}<span>Maltézský řád · {esc(names['entity'])}</span></p>
 </div></div>
 <nav class="mainnav" aria-label="{esc(T['menu'])}"><div class="wrap">
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu">{esc(T['menu'])}</button>
  <div id="menu" class="menu">{nav_html(url)}</div>
 </div></nav>
</header>
<main id="main" class="{main_class}" tabindex="-1">
{status_bar}
{body}
</main>
<footer class="site-footer">
 <div class="f-nav"><div class="wrap"><ul>{footer_nav}</ul></div></div>
 <div class="f-id"><div class="wrap">
  <p class="f-name">{esc(names['school'])}</p>
  <p>{esc(c['street'])}, {esc(c['zip'])} {esc(c['city'])} · <a href="mailto:{c['email']}">{c['email']}</a> · {phones}</p>
 </div></div>
 <div class="f-partners"><div class="wrap">
  <p><span class="label">Spolupracujeme</span> {" · ".join(f'<a href="{esc(l["url"])}"{link_attr(l["url"])}>{esc(l["label"])}</a>' for l in SITE["partners"])}</p>
  <p><span class="label">Odkazy</span> {" · ".join(f'<a href="{esc(l["url"])}"{link_attr(l["url"])}>{esc(l["label"])}</a>' for l in SITE["links"][3:8])}</p>
 </div></div>
 <div class="f-red"><div class="wrap">
  <p>Zřizovatel: <a href="https://www.maltezskyrad.cz/">{esc(names['founder'])}</a></p>
  <p>{esc(names['orderShort'])}: <a href="https://www.orderofmalta.int/">www.orderofmalta.int</a></p>
  <p><a href="/ochrana-osobnich-udaju/">{esc(T['privacy'])}</a> · <a href="/prohlaseni-o-pristupnosti/">Přístupnost</a> · <a href="/mapa-webu/">Mapa webu</a></p>
 </div></div>
</footer>
</body>
</html>
"""


# ---------------------------------------------------------------- shared blocks


def contact_card():
    c = SITE["contact"]
    phones = "<br>".join(f'{esc(p["label"])}: <a href="tel:{p["number"].replace(" ", "")}">{esc(p["number"])}</a>' for p in c["phones"])
    return f"""<dl class="contact-card">
 <div><dt>Adresa</dt><dd>{esc(c['street'])}<br>{esc(c['zip'])} {esc(c['city'])}<br><a href="{esc(c['mapUrl'])}">Zobrazit na mapě</a></dd></div>
 <div><dt>Telefon</dt><dd>{phones}</dd></div>
 <div><dt>E-mail</dt><dd><a href="mailto:{c['email']}">{c['email']}</a></dd></div>
</dl>"""


def contact_form():
    """Posts to api/kontakt.js; works without JavaScript. ?chyba=1|2 in the URL shows the error (site.js)."""
    f = lambda k, label, el="input", extra="": (f'<label class="ne-field"><span>{label} <i aria-hidden="true">*</i></span>'
        + (f'<textarea name="{k}" rows="7" maxlength="5000" required{extra}></textarea>' if el == "textarea" else f'<input name="{k}" maxlength="200" required{extra}>') + '</label>')
    return f"""<form class="contact-form ne" id="formular" method="post" action="/api/kontakt">
 <p class="ne-msg ne-msg--error" id="form-error" role="alert" hidden data-1="Vyplňte prosím všechna pole." data-2="Zprávu se nepodařilo odeslat. Zkuste to prosím znovu, nebo napište na info@gymskutec.cz."></p>
 {f("jmeno", "Jméno a příjmení", extra=' autocomplete="name"')}
 {f("kontakt", "Kontakt (e-mail nebo telefon)")}
 {f("predmet", "Předmět")}
 {f("zprava", "Zpráva", "textarea")}
 <label class="hp" aria-hidden="true">Nevyplňujte<input name="web" tabindex="-1" autocomplete="off"></label>
 <p class="small">Údaje z formuláře použijeme jen k vyřízení vašeho dotazu, viz <a href="/ochrana-osobnich-udaju/#formular">Ochrana osobních údajů</a>. Pole s * jsou povinná.</p>
 <p><button class="btn" type="submit">Odeslat</button></p>
</form>"""


def news_item(n, compact=False):
    excerpt = "" if compact or not n.get("excerpt") else f'<p class="n-excerpt">{esc(n["excerpt"])}</p>'
    return (f'<li class="n-item"><time datetime="{n["date"][:10]}">{short_date(n["date"])}</time>'
            f'<div><a href="{n["url"]}">{esc(n["title"])}</a>{excerpt}</div></li>')


def news_card(n):
    pic = f'<div class="card-img">{img(n["image"], "")}</div>' if n.get("image") else ""
    excerpt = f'<p>{esc(n["excerpt"])}</p>' if n.get("excerpt") else ""
    return (f'<li class="card">{pic}<div class="card-body"><time datetime="{n["date"][:10]}">{fmt_date(n["date"])}</time>'
            f'<a href="{n["url"]}">{esc(n["title"])}</a>{excerpt}</div></li>')


# ---------------------------------------------------------------- pages


def link_attr(u):
    return ' rel="noopener"' if u.startswith("http") else ""


def render_home():
    links = "".join(f'<li><a href="{esc(l["url"])}"{link_attr(l["url"])}><b>{esc(l["label"])}</b><span>{esc(l["text"])}</span></a></li>' for l in SITE["links"])
    h, names = SITE["home"], SITE["names"]
    programmes = "".join(f'<li><a href="{p["url"]}"><b>{esc(p["title"])}</b><span>{esc(p["text"])}</span></a></li>' for p in h["programmes"])
    quick = "".join(f'<li><a href="{esc(q["url"])}"{" rel=" + chr(34) + "noopener" + chr(34) if q["url"].startswith("http") else ""}>{esc(q["label"])}</a></li>' for q in h["quickLinks"])
    life = "".join(f'<li><a href="{p["url"]}"><b>{esc(p["title"])}</b><span>{esc(p["text"])}</span></a></li>' for p in h["life"])
    photo = h.get("photo")
    figure = lambda f: f'<figure class="home-photo">{img(f["src"], f["alt"])}<figcaption>{esc(f["caption"])}</figcaption></figure>' if f else ""
    photo_html = f'<figure class="home-photo">{img(photo["src"], photo["alt"], eager=True)}<figcaption>{esc(photo["caption"])}</figcaption></figure>' if photo else ""
    latest = NEWS[:3]
    news_band = ""
    if latest:
        news_band = f"""<section class="band" aria-labelledby="news-title"><div class="wrap">
 <div class="section-head section-head--row"><h2 id="news-title" class="display-m">Aktuality</h2><p><a class="link-strong" href="/aktuality/">Všechny aktuality</a></p></div>
 <ol class="cards">{"".join(news_card(n) for n in latest)}</ol>
</div></section>"""
    body = f"""
<section class="home-open home-open--school" aria-labelledby="home-title"><div class="wrap home-intro">
 <div class="home-intro-main">
  <h1 id="home-title" class="display">{esc(h['title'])}</h1>
  <p class="lead">{esc(h['lead'])}</p>
  <p class="home-actions"><a class="btn" href="{h['cta']['url']}">{esc(h['cta']['label'])}</a> <a class="link-strong" href="{h['cta2']['url']}">{esc(h['cta2']['label'])}</a></p>
 </div>
 {photo_html}
</div></section>

<section class="band band-quick" aria-labelledby="quick-title"><div class="wrap">
 <h2 id="quick-title" class="label">Pro žáky a rodiče</h2>
 <ul class="quick-links quick-links--row">{quick}</ul>
</div></section>

<section class="band band-grey" aria-labelledby="prog-title"><div class="wrap split">
 <div class="split-head"><h2 id="prog-title" class="display-m">{esc(h['programmesTitle'])}</h2><p>{esc(h['programmesText'])}</p></div>
 <ul class="works">{programmes}</ul>
</div></section>

{news_band}

<section class="band band-grey" aria-labelledby="life-title"><div class="wrap split">
 <div class="split-head"><h2 id="life-title" class="display-m">{esc(h['lifeTitle'])}</h2><p>{esc(h['lifeText'])}</p>{figure(h.get('lifePhoto'))}</div>
 <ul class="works">{life}</ul>
</div></section>


<section class="band" aria-labelledby="links-title"><div class="wrap">
 <div class="section-head"><h2 id="links-title" class="display-m">Užitečné odkazy</h2></div>
 <ul class="works">{links}</ul>
</div></section>

<section class="band band-grey" aria-labelledby="order-title"><div class="wrap split">
 <div class="split-head"><h2 id="order-title" class="display-m">{esc(h['orderTitle'])}</h2>{figure(h.get('orderPhoto'))}</div>
 <div class="prose">{h['orderText']}</div>
</div></section>
"""
    return layout(url="/", title=names["site"], body=body, status=h.get("status"), description=h["description"],
                  image=photo["src"] if photo else None)


def section_children_html(url):
    kids = NAV_INDEX.get(url, {}).get("node", {}).get("children", [])
    if not kids:
        return ""
    items = []
    for k in kids:
        p = PAGES.get(k["url"], {})
        desc = p.get("description") or plain(p.get("body", ""), 150)
        ext = ' rel="noopener"' if k["url"].startswith("http") else ""
        items.append(f'<li><a href="{esc(k["url"])}"{ext}><b>{esc(k["title"])}</b>{f"<span>{esc(desc)}</span>" if desc else ""}</a></li>')
    return f'<ul class="index-list">{"".join(items)}</ul>'


def _descendants(node):
    out = set()
    for c in node.get("children", []):
        out.add(c["url"])
        out |= _descendants(c)
    return out


def side_nav(url):
    info = NAV_INDEX.get(url)
    if not info:
        return ""
    top = NAV_INDEX[info["top"]]["node"]
    def walk(nodes):
        out = []
        for n in nodes:
            cur = ' aria-current="page"' if n["url"] == url else ""
            sub = walk(n["children"]) if n.get("children") and (n["url"] == url or url in _descendants(n)) else ""
            out.append(f'<li><a href="{esc(n["url"])}"{cur}>{esc(n["title"])}</a>{sub}</li>')
        return f'<ul>{"".join(out)}</ul>'
    if not top.get("children") or info["top"] == url:  # a section's own page already lists its children
        return ""
    return (f'<nav class="side-nav" aria-label="{esc(T["inSection"])}"><p class="label">'
            f'<a href="{top["url"]}">{esc(top["title"])}</a></p>{walk(top["children"])}</nav>')


def crumbs_html(url, extra=None):
    trail = [("Úvod", "/")] + breadcrumbs(url) + (extra or [])
    if len(trail) < 2:
        return ""
    items = []
    for i, (t, u) in enumerate(trail):
        items.append(f'<li><span aria-current="page">{esc(t)}</span></li>' if i == len(trail) - 1 else f'<li><a href="{u}">{esc(t)}</a></li>')
    return f'<nav class="crumbs" aria-label="Drobečková navigace"><ol>{"".join(items)}</ol></nav>'


def render_page(p):
    url = p["url"]
    is_section = p.get("section") or bool(NAV_INDEX.get(url, {}).get("node", {}).get("children"))
    figure = f'<figure class="page-figure">{img(p["image"], p.get("imageAlt") or p["title"], eager=True)}</figure>' if p.get("image") else ""
    card = contact_card() if p.get("contactCard") else ""  # facts first, as on maltezskyrad.cz's Kontakt
    special = contact_form() if p.get("contactForm") else ""
    source = ""
    if p.get("source") and not PRODUCTION:
        source = f'<p class="small source-note">Zdroj: <a href="{esc(p["source"])}">{esc(p["source"])}</a></p>'
    side = side_nav(url)
    body = f"""
<div class="wrap">{crumbs_html(url)}</div>
<article class="wrap page{' page--with-side' if side else ''}">
 <header class="page-head">
  <h1 class="display">{esc(p['title'])}</h1>
  {f'<p class="lead-s">{esc(p["lead"])}</p>' if p.get("lead") else ''}
 </header>
 <div class="page-main">
  {figure}
  {card}
  <div class="prose">{enhance_body(p['body'])}</div>
  {special}
  {section_children_html(url) if is_section else ''}
  {source}
 </div>
 {f'<div class="page-side">{side}</div>' if side else ''}
</article>"""
    return layout(url=url, title=p["title"], body=body, description=p.get("description", ""), image=p.get("image"), status=p.get("status"))


def render_article(n, prev_n, next_n):
    cats = SITE["newsCategories"]
    cat_links = " · ".join(f'<a href="/aktuality/{c}/">{esc(cats[c])}</a>' for c in n.get("categories", []) if c in cats)
    figure = f'<figure class="page-figure">{img(n["image"], n["title"], eager=True)}</figure>' if n.get("image") else ""
    pager = ""
    if prev_n or next_n:
        pager = '<nav class="pager" aria-label="Další články">' + \
            (f'<a class="pager-prev" href="{next_n["url"]}"><span>Novější</span>{esc(next_n["title"])}</a>' if next_n else "<span></span>") + \
            (f'<a class="pager-next" href="{prev_n["url"]}"><span>Starší</span>{esc(prev_n["title"])}</a>' if prev_n else "") + "</nav>"
    body = f"""
<div class="wrap">{crumbs_html('/aktuality/', [(n['title'], n['url'])])}</div>
<article class="wrap page page--article">
 <header class="page-head">
  <h1 class="display">{esc(n['title'])}</h1>
  <p class="byline"><time datetime="{n['date'][:10]}">{fmt_date(n['date'])}</time>{(' · ' + cat_links) if cat_links else ''}</p>
 </header>
 <div class="page-main">
  {figure}
  <div class="prose">{enhance_body(n['body'])}</div>
  <p><a class="link-strong" href="/aktuality/">Zpět na aktuality</a></p>
  {pager}
 </div>
</article>"""
    return layout(url=n["url"], title=n["title"], body=body, description=n.get("excerpt", ""), image=n.get("image"), status=n.get("status"))


def render_news_index(items, active="", year=None, url="/aktuality/"):
    cats = SITE["newsCategories"]
    counts = {c: sum(1 for n in NEWS if c in n.get("categories", [])) for c in cats}
    cur = lambda on: ' aria-current="page"' if on else ""
    tabs = [f'<a href="/aktuality/"{cur(not active and not year)}>Vše</a>']
    tabs += [f'<a href="/aktuality/{c}/"{cur(active == c)}>{esc(label)} <span class="count">{counts[c]}</span></a>' for c, label in cats.items() if counts[c]]
    years = sorted({n["date"][:4] for n in NEWS}, reverse=True)
    year_links = "".join(f'<a href="/aktuality/{y}/"{cur(year == y)}>{y}</a>' for y in years)
    groups, cur_year = [], None
    for n in items:
        y = n["date"][:4]
        if y != cur_year:
            if cur_year:
                groups.append("</ol></section>")
            groups.append(f'<section class="year-group"><h2 class="year">{y}</h2><ol class="news-list news-list--full">')
            cur_year = y
        groups.append(news_item(n))
    if cur_year:
        groups.append("</ol></section>")
    title = "Aktuality" + (f": {cats[active]}" if active else "") + (f" {year}" if year else "")
    body = f"""
<div class="wrap">{crumbs_html('/aktuality/', [(title, url)] if url != '/aktuality/' else None)}</div>
<div class="wrap page page--news">
 <header class="page-head"><h1 class="display">{esc(title)}</h1>
  <p class="lead-s">Zprávy ze života školy: akce, soutěže, sport, zájezdy a projekty.</p></header>
 <nav class="tabs" aria-label="Rubrika">{''.join(tabs)}</nav>
 {f'<nav class="years" aria-label="Rok">{year_links}</nav>' if years else ''}
 {''.join(groups) or '<p class="empty">V této rubrice zatím nejsou žádné zprávy.</p>'}
</div>"""
    return layout(url=url, title=title, body=body, description=f"{title} – {SITE['names']['school']}.")


def render_simple(url, title, inner, status=None):
    body = f'<div class="wrap page page--simple"><header class="page-head"><h1 class="display">{esc(title)}</h1></header><div class="prose">{inner}</div></div>'
    return layout(url=url, title=title, body=body, status=status, description=plain(inner, 160))


def sitemap_html(nodes):
    return "<ul>" + "".join(f'<li><a href="{n["url"]}">{esc(n["title"])}</a>{sitemap_html(n["children"]) if n.get("children") else ""}</li>' for n in nodes) + "</ul>"


ACCESSIBILITY = """<p>Gymnázium Suverénního řádu maltézských rytířů ve Skutči se zavazuje zpřístupnit své internetové stránky v souladu se zákonem č. 99/2019 Sb., o přístupnosti internetových stránek a mobilních aplikací, kterým se provádí směrnice Evropského parlamentu a Rady (EU) 2016/2102. Toto prohlášení se vztahuje na internetové stránky www.gymskutec.cz.</p>
<h2>Stav souladu</h2>
<p>Tyto internetové stránky jsou <strong>částečně v souladu</strong> s harmonizovanou normou EN 301 549 V3.2.1 (pravidla WCAG 2.1 na úrovni AA), a to z důvodu nesouladu uvedeného níže. Stránky jsou navíc kontrolovány podle novějších pravidel WCAG 2.2 AA.</p>
<h2>Nepřístupný obsah</h2>
<ul><li>Některé dokumenty ke stažení (PDF, DOC, DOCX) převzaté ze stávajícího webu nejsou přístupné; některá PDF nemají strojově čitelnou textovou vrstvu (WCAG 1.1.1). Na vyžádání je poskytneme v přístupné podobě.</li><li>Některé informace (například harmonogram školního roku, složení školské rady) jsou zatím jen v obrázku nebo v PDF (WCAG 1.1.1).</li></ul>
<h2>Vypracování prohlášení</h2>
<p>Prohlášení bylo vypracováno dne 19. října 2026 na základě vlastního posouzení provedeného školou: automatická kontrola nástrojem axe-core všech stránek na počítači i mobilu a ruční kontrola ovládání klávesnicí. Prohlášení bude přezkoumáno nejméně jednou ročně.</p>
<h2>Zpětná vazba a kontaktní údaje</h2>
<p>Nedostatky v přístupnosti nám můžete oznámit a o nepřístupné informace požádat na <a href="mailto:info@gymskutec.cz">info@gymskutec.cz</a> nebo na telefonu <a href="tel:+420739085660">739 085 660</a>. Odpovíme bez zbytečného odkladu.</p>
<h2>Postupy pro prosazování práva</h2>
<p>Nebude-li odpověď uspokojivá, můžete podat podnět Digitální a informační agentuře, Na Vápence 915/14, 130 00 Praha 3, <a href="mailto:pristupnost@dia.gov.cz">pristupnost@dia.gov.cz</a> (§ 10 zákona č. 99/2019 Sb.).</p>"""


SEARCH_FORM = """<form class="search-form" role="search" action="/hledat/" method="get">
 <label for="q">Hledaný výraz</label><div><input id="q" name="q" type="search" required autocomplete="off"><button class="btn" type="submit">Hledat</button></div>
</form>
<p id="search-status" class="small" role="status"></p>
<ol id="search-results" class="index-list"></ol>
<noscript><p>Vyhledávání potřebuje JavaScript. Projděte prosím <a href="/mapa-webu/">mapu webu</a>.</p></noscript>
<script src="/js/search.js" defer></script>"""


NEWS_EDITOR_URL = "/pridat-aktualitu/"


def render_news_editor():
    """Staff page for publishing news (api/news.js); not linked, not indexed, behind a password. Markup as on maltezskyrad.cz."""
    body = (ROOT / "tools" / "news-editor.html").read_text(encoding="utf-8").replace("{ASSET_VERSION}", ASSET_VERSION)
    h = layout(url=NEWS_EDITOR_URL, title="Přidat aktualitu", body=body, description="Přidání aktuality na web gymnázia.")
    return h if not PRODUCTION else h.replace("<head>\n", '<head>\n<meta name="robots" content="noindex, nofollow">\n', 1)


# ---------------------------------------------------------------- output


def write(url, html_text):
    path = DIST / url.lstrip("/") / "index.html" if url.endswith("/") else DIST / url.lstrip("/")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html_text, encoding="utf-8")


def rss():
    items = "".join(
        f"<item><title>{esc(n['title'])}</title><link>{SITE['baseUrl']}{n['url']}</link><guid>{SITE['baseUrl']}{n['url']}</guid>"
        f"<pubDate>{datetime.fromisoformat(n['date']).strftime('%a, %d %b %Y %H:%M:00 +0100')}</pubDate><description>{esc(n.get('excerpt', ''))}</description></item>"
        for n in NEWS[:30])
    return (f'<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>{esc(SITE["names"]["site"])}</title>'
            f'<link>{SITE["baseUrl"]}/</link><description>Aktuality gymnázia</description><language>cs</language>{items}</channel></rss>')


VERCEL = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))  # headers and redirects live here; other hosts get _headers and _redirects
HEADERS = "".join(h["source"].replace("(.*)", "*") + "\n" + "".join(f"  {x['key']}: {x['value']}\n" for x in h["headers"]) for h in VERCEL["headers"])
REDIRECTS = [(r["source"].replace(":path*", "*").replace("(.*)", "*"), r["destination"].replace(":path*", ":splat").replace("$1", ":splat"))
             for r in VERCEL.get("redirects", []) if "has" not in r]


def build():
    if DIST.exists():
        shutil.rmtree(DIST)
    shutil.copytree(STATIC, DIST)
    vb = logo_viewbox()  # the lockup's size variables live in the stylesheet, so pages carry no inline style (CSP style-src 'self')
    with (DIST / "css" / "site.css").open("a", encoding="utf-8") as f:
        f.write(f"\n.lockup{{--h:{vb[3] / 126:.4f};--t:{vb[1] / 126:.4f}}}\n")
    write("/", render_home())
    for p in PAGES.values():
        write(p["url"], render_page(p))
    for i, n in enumerate(NEWS):
        write(n["url"], render_article(n, NEWS[i + 1] if i + 1 < len(NEWS) else None, NEWS[i - 1] if i else None))
    write("/aktuality/", render_news_index(NEWS[:40]))
    for c in SITE["newsCategories"]:
        items = [n for n in NEWS if c in n.get("categories", [])]
        if items:
            write(f"/aktuality/{c}/", render_news_index(items, active=c, url=f"/aktuality/{c}/"))
    for y in sorted({n["date"][:4] for n in NEWS}):
        write(f"/aktuality/{y}/", render_news_index([n for n in NEWS if n["date"].startswith(y)], year=y, url=f"/aktuality/{y}/"))
    write(NEWS_EDITOR_URL, render_news_editor())
    (DIST / NEWS_EDITOR_URL.strip("/") / "news.json").write_text(json.dumps(  # the editor's list of posts to edit or delete
        [{"path": n["src"], "url": n["url"], "title": n["title"], "date": n["date"][:16], "author": n.get("author")} for n in NEWS],
        ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    privacy = (CONTENT / "privacy.html").read_text(encoding="utf-8")
    write("/ochrana-osobnich-udaju/", render_simple("/ochrana-osobnich-udaju/", "Ochrana osobních údajů", privacy, status="approval"))
    write("/hledat/", render_simple("/hledat/", "Hledat", SEARCH_FORM))
    (DIST / "hledat" / "index.json").write_text(json.dumps(  # what /js/search.js searches: title, url, plain text
        [{"t": p["title"], "u": p["url"], "x": plain(p["body"], 600)} for p in PAGES.values()] +
        [{"t": n["title"], "u": n["url"], "x": plain(n["body"], 600), "d": short_date(n["date"])} for n in NEWS], ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    write("/mapa-webu/", render_simple("/mapa-webu/", "Mapa webu", sitemap_html(SITE["nav"]) + '<p><a href="/ochrana-osobnich-udaju/">Ochrana osobních údajů</a> · <a href="/prohlaseni-o-pristupnosti/">Prohlášení o přístupnosti</a></p>'))
    write("/prohlaseni-o-pristupnosti/", render_simple("/prohlaseni-o-pristupnosti/", "Prohlášení o přístupnosti", ACCESSIBILITY, status="approval"))
    write("/kontakty/napiste-nam/odeslano/", render_simple("/kontakty/napiste-nam/odeslano/", "Zpráva odeslána",
                                                           '<p>Děkujeme, vaši zprávu jsme přijali. Odpovíme co nejdříve.</p><p><a class="link-strong" href="/">Úvodní stránka</a></p>'))
    write("/404.html", render_simple("/404.html", "Stránka nenalezena",
                                     '<p>Tato stránka neexistuje nebo byla přesunuta.</p><p><a class="link-strong" href="/">Úvodní stránka</a> · <a class="link-strong" href="/aktuality/">Aktuality</a> · <a class="link-strong" href="/kontakty/">Kontakty</a></p>'))
    urls = ["/", "/aktuality/", "/hledat/", "/ochrana-osobnich-udaju/", "/mapa-webu/", "/prohlaseni-o-pristupnosti/"] + list(PAGES) + [n["url"] for n in NEWS]
    (DIST / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
                                      "".join(f"<url><loc>{SITE['baseUrl']}{u}</loc></url>" for u in urls) + "</urlset>", encoding="utf-8")
    (DIST / "robots.txt").write_text(("User-agent: *\nAllow: /\nDisallow: /pridat-aktualitu/\nDisallow: /api/\n\nSitemap: " + SITE["baseUrl"] + "/sitemap.xml\n") if PRODUCTION
                                     else "User-agent: *\nDisallow: /\n", encoding="utf-8")
    (DIST / "feed.xml").write_text(rss(), encoding="utf-8")
    (DIST / "_headers").write_text(HEADERS + ("" if PRODUCTION else "/*\n  X-Robots-Tag: noindex, nofollow\n"), encoding="utf-8")
    (DIST / "_redirects").write_text("".join(f"{a} {b} 301\n" for a, b in REDIRECTS), encoding="utf-8")
    print(f"built {len(PAGES)} pages, {len(NEWS)} news, {'production' if PRODUCTION else 'preview'} → {DIST}")


# ---------------------------------------------------------------- local preview server


def serve(port=8000):
    import functools
    import http.server
    from urllib.parse import unquote
    rules = [l.split() for l in (DIST / "_redirects").read_text().splitlines() if l.strip()]
    headers, types, block = {}, {}, None  # site-wide headers; exact-path Content-Type overrides
    for line in (DIST / "_headers").read_text().splitlines():
        if line and not line.startswith(" "):
            block = line.strip()
        elif line.strip():
            k, v = line.strip().split(":", 1)
            if block == "/*":
                headers[k] = v.strip()
            elif k == "Content-Type":
                types[block] = v.strip()

    class H(http.server.SimpleHTTPRequestHandler):
        def guess_type(self, path):
            return types.get(self.path.split("?")[0]) or super().guess_type(path)

        def end_headers(self):
            for k, v in headers.items():
                if k == "Strict-Transport-Security":
                    continue  # local server is plain HTTP
                self.send_header(k, v.replace("; upgrade-insecure-requests", "") if k == "Content-Security-Policy" else v)
            super().end_headers()

        def do_GET(self):
            path = self.path.split("?")[0]
            for src, dst, _ in rules:
                if src.endswith("*") and path.startswith(src[:-1]):
                    dst = dst.replace(":splat", path[len(src) - 1:])
                elif src != path:
                    continue
                self.send_response(301)
                self.send_header("Location", dst)
                self.end_headers()
                return
            fs_path = unquote(path).lstrip("/")
            if not (DIST / fs_path).exists() and not (DIST / fs_path / "index.html").exists():
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()
                self.wfile.write((DIST / "404.html").read_bytes())
                return
            super().do_GET()

        do_HEAD = do_GET

    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(H, directory=str(DIST)))
    print(f"serving http://127.0.0.1:{port}/")
    httpd.serve_forever()


if __name__ == "__main__":
    build()
    if len(sys.argv) > 1 and sys.argv[1] == "serve":
        serve(int(sys.argv[2]) if len(sys.argv) > 2 and sys.argv[2].isdigit() else 8000)
