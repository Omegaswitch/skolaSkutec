#!/usr/bin/env python3
"""Builds the school logo variants in static/img/logo/ (run once; needs `pip install fonttools`).

Construction follows the logo of the Vyšší odborná škola zdravotnická Suverénního řádu maltézských rytířů (Žerotínova, Praha;
vos.mojezdravka.cz): the official red shield on the left, the school name in two lines of red geometric bold sans to its right,
the last baseline near the foot of the shield. The shield is the unaltered vector from tools/source/order-lockup-cs.svg (maltezskyrad.cz,
taken from the Coat of Arms guidelines' master lockup). Text: TeX Gyre Adventor Bold (GUST font licence), the substitute for
Century Gothic Bold used on the Order's lockups, set as outlines so the SVG renders the same everywhere.
Needs approval by the Grand Priory before use (see docs/brand-compliance.md).
"""
import re
from pathlib import Path
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "static" / "img" / "logo"
RED, BLACK, WHITE = "#e31818", "#111111", "#ffffff"
SHIELD_H = 126.0  # shield height in the lockup's units (cs.svg)

src = (ROOT / "tools" / "source" / "order-lockup-cs.svg").read_text()
SHIELD = "".join(re.findall(r"<path [^>]*/>", src)[:8])  # paths 0-7: white field edge, red outline, red field, white cross
font = TTFont(ROOT / "tools" / "fonts" / "texgyreadventor-bold.otf")
gs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font["head"].unitsPerEm
CAP = font["OS/2"].sCapHeight or 0.74 * upm


def text_path(s, x, baseline, size, tracking=-0.01):
    """Outlines of s, left edge x, on baseline (SVG y down)."""
    k, out = size / upm, []
    for ch in s:
        g = cmap.get(ord(ch))
        if g is None:
            raise SystemExit(f"glyph missing: {ch!r}")
        pen = SVGPathPen(gs)
        gs[g].draw(TransformPen(pen, (k, 0, 0, -k, x, baseline)))
        out.append(pen.getCommands())
        x += gs[g].width * k + tracking * size
    return " ".join(out), x


def shield(colour_field, colour_cross):
    s = SHIELD.replace('fill="#fff"', f'fill="{colour_cross}"').replace('"#e31818"', f'"{colour_field}"')
    return f'<g transform="translate(-113.9 -228.2)">{s}</g>'


def lockup(lines, text_colour, field=RED, cross=WHITE, cap_ratio=0.16, lead_ratio=0.235):
    size = cap_ratio * SHIELD_H * upm / CAP
    x0 = 110 + 0.065 * SHIELD_H
    last = 0.885 * SHIELD_H
    paths, right = [], 0
    for i, line in enumerate(lines):
        d, end = text_path(line, x0, last - (len(lines) - 1 - i) * lead_ratio * SHIELD_H, size)
        paths.append(d)
        right = max(right, end)
    w = right + 4
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 {w + 2:.1f} {SHIELD_H + 3:.1f}" width="{w + 2:.1f}" height="{SHIELD_H + 3:.1f}">'
            f'{shield(field, cross)}<path fill="{text_colour}" d="{" ".join(paths)}"/></svg>\n')


NAME = ["Gymnázium Suverénního řádu", "maltézských rytířů ve Skutči"]
OUT.mkdir(parents=True, exist_ok=True)
variants = {
    "logo-primary.svg": lockup(NAME, RED),                                   # on white
    "logo-white.svg": lockup(NAME, WHITE),                                   # on dark or photographic grounds
    "logo-mono-black.svg": lockup(NAME, BLACK, field=BLACK, cross=WHITE),     # one-colour print (stamps, fax, engraving)
    "logo-compact.svg": lockup(["Gymnázium", "Skuteč"], RED, cap_ratio=0.2, lead_ratio=0.29),  # small sizes, social avatars
    "shield.svg": f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 112 {SHIELD_H + 3:.1f}" width="112" height="{SHIELD_H + 3:.1f}">{shield(RED, WHITE)}</svg>\n',
}
for name, svg in variants.items():
    (OUT / name).write_text(svg)
    print(name, len(svg))
