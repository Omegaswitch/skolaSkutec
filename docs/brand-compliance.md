# Brand compliance

Checked against the same sources as maltezskyrad.cz (see that repository's `docs/brand-compliance.md`): the *Sovereign Order of Malta Worldwide Communications Policy and Guide* (CP, February 2025), the *Coat of Arms and Emblems guidelines* (CoA, v3.3, 2023) and the Grand Magistry *Entities Theme* (March 2025). This site reuses maltezskyrad.cz's frame, tokens and checks unchanged, so the rows proven there (colours, Asap, banner photograph, footer link to orderofmalta.int, no acronyms) apply here too.

| # | Requirement | Status | How |
|---|---|---|---|
| 1 | Frame and colours of the Grand Magistry theme | ✅ | Same header, banner photograph, menu bar and footer bands as the sister sites. |
| 2 | Full name of the Order at first mention | ✅ | Banner: "Suverénní vojenský špitální řád svatého Jana Jeruzalémského, z Rhodu a z Malty / České velkopřevorství · zřizovatel školy". |
| 3 | No "SMOM", never "Malta" alone | ✅ | `check.py` fails the build on the acronym. The school's legal name ("…Suverénního řádu maltézských rytířů…") is kept as registered. |
| 4 | Footer link to www.orderofmalta.int | ✅ | Red footer band, with the founder (maltezskyrad.cz). |
| 5 | Only official emblems, unaltered | ✅ | The shield in the school logo is the official vector from maltezskyrad.cz's lockup (taken from the CoA master lockup), unchanged in shape and proportion. `check.py` rejects any other file under `/img/`. The old site's `crest.png` was not reused. |
| 6 | School logo | ⚠️ needs approval | See below. |
| 7 | Monochrome emblem | ⚠️ needs approval | `logo-mono-black.svg` sets the shield field in black for one-colour print. The CoA guidelines allow one-colour reproduction only where colour is impossible; confirm before use. |
| 8 | Font substitution | ⚠️ | Logo text in TeX Gyre Adventor Bold (GUST licence), the same stand-in for Century Gothic Bold that the sister sites' lockups use. |
| 9 | Photographs | ⚠️ | Only real photographs: three from the Grand Prior's visit (maltezskyrad.cz, April 2023). The old site's photos could not be downloaded yet. Confirm consent for identifiable pupils. |

## School logo (`static/img/logo/`)

Built the way the Vyšší odborná škola zdravotnická Suverénního řádu maltézských rytířů (Žerotínova, Praha; vos.mojezdravka.cz) builds its logo: the official red shield on the left, the school name in two lines of red geometric bold sans to its right, the last baseline near the foot of the shield. Only the name changes: "Gymnázium Suverénního řádu / maltézských rytířů ve Skutči".

| File | Use |
|---|---|
| `logo-primary.svg` | Red on white: documents, letterheads, the site on white |
| `logo-white.svg` | White text, shield unchanged: the site banner, dark or photographic grounds |
| `logo-mono-black.svg` | One colour (stamps, fax, engraving) — approval needed (row 7) |
| `logo-compact.svg` | "Gymnázium / Skuteč": small sizes, social avatars |
| `shield.svg` | The shield alone (official artwork) |

Regenerate with `pip install fonttools && python3 tools/make_logo.py`.

**Approval needed** from the Grand Priory (and, through it, the Grand Magistry where the CoA guidelines require it) before the logo is used outside this preview: the construction, the compact and monochrome variants, and the font substitute.

## Open approvals

1. The school logo and its variants (above).
2. Every page marked "summary", "new" or "approval" in preview builds.
3. Consent and usage rights for photographs.
