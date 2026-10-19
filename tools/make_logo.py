#!/usr/bin/env python3
"""Builds the school logo variants in static/img/logo/ (run once; needs `pip install fonttools`).

Construction follows the logo of the Vyšší odborná škola zdravotnická Suverénního řádu maltézských rytířů (Žerotínova, Praha;
vos.mojezdravka.cz): the Order lockup (official red shield, "MALTÉZSKÝ ŘÁD / ČESKÁ REPUBLIKA" aligned to the shield top), a thin rule
with a short tick at its left end under it, and the school name in two lines of red geometric bold sans, the last baseline near
the foot of the shield. The shield is the unaltered vector from tools/source/order-lockup-cs.svg (maltezskyrad.cz, from the Coat of Arms guidelines'
master lockup). Sizes and spacing are the shared geometry below, measured on the Prague logo and identical in the Kladno
generator. Lettering: Century Gothic Bold per the Order's guidelines, substituted by TeX Gyre Adventor Bold (GUST font
licence) with size and tracking fitted to the Prague logo, set as outlines so the SVG renders the same everywhere.
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


VOS_GLYPHS, VOS_CMAP, VOS_UPM = gs, cmap, upm

# ---- Shared logo geometry (identical in skolaKladno, skolaSkutec; source: the Prague school's logo) ----
# Measured on the Prague logo (vos.mojezdravka.cz, logo-vos-male2.png trimmed to 748×266 px; shield ink x 0–216, y 17–265)
# and fitted in TeX Gyre Adventor Bold, so the three school logos have the same sizes and spacing. All numbers are those
# pixels; VOS_X/VOS_Y map them onto the lockup's units (shield ink 126 units tall, as in the Order's cs.svg).
VOS_K = 126.0 / 249
VOS_X = lambda px: -0.22 + px * VOS_K
VOS_Y = lambda px: 0.19 + (px - 17) * VOS_K
VOS_ORDER = (("MALTÉZSKÝ ŘÁD", 61, 60.89, 0.0219), ("ČESKÁ REPUBLIKA", 106, 46.01, 0.0036))  # text, baseline, size, tracking (em)
VOS_TEXT_X, VOS_NAME_X = 233, 253                       # ink left edge of the Order lines and of the school name
VOS_RULE_Y, VOS_RULE_X, VOS_TICK_TO, VOS_RULE_END_PAD, VOS_STROKE = 129.5, 234.5, 172, 10, 1.2
VOS_NAME_BASE, VOS_NAME_PITCH, VOS_NAME_SIZE, VOS_NAME_TRACK = 237, 47, 54.15, 0.001  # last baseline; lines stack upwards


def vos_text(s, ink_left, base, size_px, track):
    """Outline path of s with its ink starting at ink_left (px) on baseline base (px); returns (d, ink right in units)."""
    from fontTools.pens.boundsPen import BoundsPen
    size = size_px * VOS_K
    k = size / VOS_UPM
    lsb = BoundsPen(VOS_GLYPHS)
    VOS_GLYPHS[VOS_CMAP[ord(s[0])]].draw(lsb)
    x, y = VOS_X(ink_left) - lsb.bounds[0] * k, VOS_Y(base)
    pen, box = SVGPathPen(VOS_GLYPHS), BoundsPen(VOS_GLYPHS)
    for ch in s:
        g = VOS_GLYPHS[VOS_CMAP[ord(ch)]]
        g.draw(TransformPen(pen, (k, 0, 0, -k, x, y)))
        g.draw(TransformPen(box, (k, 0, 0, -k, x, y)))
        x += g.width * k + track * size
    return pen.getCommands(), box.bounds[2]


def vos_lockup(shield_svg, name_lines, name_colour, order_colour, title):
    """Shield, MALTÉZSKÝ ŘÁD / ČESKÁ REPUBLIKA, the rule with its tick, and the school name, laid out as the Prague logo."""
    order, right = [], 0
    for s, base, size, track in VOS_ORDER:
        d, r = vos_text(s, VOS_TEXT_X, base, size, track)
        order.append(d)
        right = max(right, r)
    names, name_right = [], 0
    for i, line in enumerate(name_lines):
        base = VOS_NAME_BASE - (len(name_lines) - 1 - i) * VOS_NAME_PITCH
        d, r = vos_text(line, VOS_NAME_X, base, VOS_NAME_SIZE, VOS_NAME_TRACK)
        names.append(d)
        name_right = max(name_right, r)
    right = max(right, name_right)
    rule = (f'<path fill="none" stroke="{order_colour}" stroke-width="{VOS_STROKE * VOS_K:.2f}" '
            f'd="M{VOS_X(VOS_RULE_X):.2f} {VOS_Y(VOS_TICK_TO):.2f}V{VOS_Y(VOS_RULE_Y):.2f}H{name_right - VOS_RULE_END_PAD * VOS_K:.2f}"/>')
    top, w, h = VOS_Y(0) - 0.5, right + 1.5, 126.6 - (VOS_Y(0) - 0.5)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 {top:.2f} {w:.2f} {h:.2f}" width="{w:.2f}" height="{h:.2f}" role="img">'
            f'<title>{title}</title>{shield_svg}<path fill="{order_colour}" d="{" ".join(order)}"/>{rule}'
            f'<path fill="{name_colour}" d="{" ".join(names)}"/></svg>\n')
# ---- end of shared logo geometry ----


def lockup(lines, text_colour, order_colour, field=RED, cross=WHITE):
    return vos_lockup(shield(field, cross), lines, text_colour, order_colour, "Gymnázium Suverénního řádu maltézských rytířů ve Skutči")


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
