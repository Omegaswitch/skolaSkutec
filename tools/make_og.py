#!/usr/bin/env python3
"""Renders the link-preview image static/img/og.jpg (1200×630, Open Graph): the Order's flag (the official banner
photograph, a crop scaled up under a dark veil), the school lockup as in the site's header (the school's
name in red), and a red strip at the
foot, the same on every Order school site. Run once after a logo change; the output is committed.

    pip install playwright pillow && python3 tools/make_og.py
"""
import base64
import re
from io import BytesIO
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
LOGO, BANNER, OUT = ROOT / "static/img/logo/logo-red-on-dark.svg", ROOT / "static/img/banner/banner-photo.webp", ROOT / "static" / "img" / "og.jpg"
RED = "#e31818"


def main():
    svg = LOGO.read_text(encoding="utf-8")
    photo = "data:image/webp;base64," + base64.b64encode(BANNER.read_bytes()).decode()
    logo = "data:image/svg+xml;base64," + base64.b64encode(svg.encode()).decode()
    html = f'''<!doctype html><body style="margin:0;width:1200px;height:630px;position:relative;overflow:hidden;background:#1d2a3a">
<img src="{photo}" style="position:absolute;top:0;height:630px;width:auto;left:-2690px;filter:blur(1.2px)" alt="">
<div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,22,30,.9) 0%,rgba(14,22,30,.88) 35%,rgba(14,22,30,.82) 55%,rgba(14,22,30,.72) 70%,rgba(14,22,30,.6) 85%,rgba(14,22,30,.5) 100%)"></div>
<img src="{logo}" style="position:absolute;left:68px;top:50%;transform:translateY(-54%);height:206px;width:auto" alt="">
<div style="position:absolute;left:0;right:0;bottom:0;height:18px;background:{RED}"></div></body>'''
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium" if Path("/opt/pw-browsers/chromium").exists() else None)
        pg = b.new_page(viewport={"width": 1200, "height": 630})
        pg.set_content(html)
        pg.wait_for_timeout(300)
        png = pg.screenshot()
        b.close()
    Image.open(BytesIO(png)).convert("RGB").save(OUT, "JPEG", quality=86, optimize=True, progressive=True)
    print(OUT, OUT.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
