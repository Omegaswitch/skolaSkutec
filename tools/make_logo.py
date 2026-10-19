#!/usr/bin/env python3
"""Builds the school logo variants in static/img/logo/ (run once; needs `pip install fonttools`).

Construction follows the logo of the Vyšší odborná škola zdravotnická Suverénního řádu maltézských rytířů (Žerotínova, Praha;
vos.mojezdravka.cz): the Order lockup (official red shield, "MALTÉZSKÝ ŘÁD / ČESKÁ REPUBLIKA" aligned to the shield top), a thin rule
with a short tick at its left end under it, and the school name in two lines of red geometric bold sans, the last baseline near
the foot of the shield. Shield and lockup text are the unaltered vectors from tools/source/order-lockup-cs.svg (maltezskyrad.cz,
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
ORDER = re.findall(r'<path fill="#fff" d="([^"]+)"/>', src.split("</g>", 1)[1])  # official lockup text, kept for reference; the logo resets it in the same font at the VOŠ sizes
ORDER_RIGHT = 351.1 - 4  # right edge of the lockup text (cs.svg viewBox width less its margin)
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


# Measured on the VOŠ logo file (logo-vos-male2.png, 1205×266 px): shield x 1–216, y 17–265 (248 px tall).
# Everything below is in those pixels and converted to this file's units (shield 126 units tall, top-left at 0,0).
VOS = {"text_x": 233, "l1_base": 69.5, "l1_cap": 53.5, "l2_base": 109, "l2_cap": 33.5, "n_xh": 30, "rule_y": 129.5, "rule_x": 234.5, "tick_to": 170,
       "name_x": 253, "n1_base": 194, "n2_base": 236, "rule_end_pad": 10, "stroke": 1.2}
U = lambda px, origin=0: (px - origin) * SHIELD_H / 248
X = lambda px: U(px, 1)
Y = lambda px: U(px, 17)


XH = font["OS/2"].sxHeight or 0.53 * upm
# Adventor's accents stand taller than Century Gothic's, so at the VOŠ sizes Č and ř would touch the line above;
# positions stay as measured except two baselines moved a few px apart (ČESKÁ +3.5, name line 1 -5), and the type is scaled by FIT.
FIT = 0.9
cap_size = lambda px: FIT * U(px) * upm / CAP  # font size giving this cap height (VOŠ pixels)
xh_size = lambda px: FIT * U(px) * upm / XH


def lockup(lines, text_colour, order_colour, field=RED, cross=WHITE):
    v = VOS
    s1, s2 = cap_size(v["l1_cap"]), cap_size(v["l2_cap"])
    o1, e1 = text_path("MALTÉZSKÝ ŘÁD", X(v["text_x"]), Y(v["l1_base"]), s1)
    o2, e2 = text_path("ČESKÁ REPUBLIKA", X(v["text_x"]), Y(v["l2_base"]), s2)
    size = xh_size(v["n_xh"])  # the school name keeps the VOŠ name's type size
    bases = [Y(v["n2_base"]) - (len(lines) - 1 - i) * U(v["n2_base"] - v["n1_base"]) for i in range(len(lines))]
    paths, right = [], max(e1, e2)
    for line, base in zip(lines, bases):
        d, end = text_path(line, X(v["name_x"]), base, size)
        paths.append(d)
        right = max(right, end)
    rule_end = right - U(v["rule_end_pad"])
    sw = U(v["stroke"])
    rule = (f'<path fill="none" stroke="{order_colour}" stroke-width="{sw:.2f}" '
            f'd="M{X(v["rule_x"]):.2f} {Y(v["tick_to"]):.2f}V{Y(v["rule_y"]):.2f}H{rule_end:.2f}"/>')
    top, w = Y(0) - 1, right + 3
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 {top:.1f} {w + 1:.1f} {SHIELD_H + 2 - top:.1f}" width="{w + 1:.1f}" height="{SHIELD_H + 2 - top:.1f}">'
            f'{shield(field, cross)}<path fill="{order_colour}" d="{o1} {o2}"/>{rule}<path fill="{text_colour}" d="{" ".join(paths)}"/></svg>\n')


NAME = ["Gymnázium Suverénního řádu", "maltézských rytířů ve Skutči"]
OUT.mkdir(parents=True, exist_ok=True)
variants = {
    "logo-primary.svg": lockup(NAME, RED, BLACK),                            # on white
    "logo-white.svg": lockup(NAME, WHITE, WHITE),                            # on dark or photographic grounds (the site banner)
    "logo-red-on-dark.svg": lockup(NAME, RED, WHITE),                        # as the VOŠ logo: white lockup text, red name, on dark plain grounds
    "logo-mono-black.svg": lockup(NAME, BLACK, BLACK, field=BLACK),          # one-colour print (stamps, fax, engraving)
    "logo-compact.svg": lockup(["Gymnázium ve Skutči"], RED, BLACK),  # one line, small sizes
    "shield.svg": f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 112 {SHIELD_H + 3:.1f}" width="112" height="{SHIELD_H + 3:.1f}">{shield(RED, WHITE)}</svg>\n',
}
for name, svg in variants.items():
    (OUT / name).write_text(svg)
    print(name, len(svg))
