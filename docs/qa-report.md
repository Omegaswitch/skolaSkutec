# QA report — gymskutec.cz (19 October 2026)

Branch `claude/elegant-heisenberg-vcoq5u`. All checks below were run on this commit's build; the commands are in the README and run in CI.

## Results

| Check | How | Result |
|---|---|---|
| Production build | `python3 build.py --production` | 129 pages, 197 news, sitemap, RSS, robots, `_headers`, `_redirects`; no noindex, no status labels; editor noindex |
| Links, headings, descriptions, brand files, acronym | `python3 check.py` | 354 HTML files, 0 problems |
| Legacy URLs | `python3 tools/url_map.py --live` | 215 old addresses: 203 same URL, 12 redirected (301), 0 missing; all 215 verified over HTTP on the local server (query-string rules are Vercel-only and checked statically) |
| Accessibility | axe-core 4.10 (WCAG 2.0/2.1/2.2 A+AA + best practice), every page at 1366 px and 390 px | 0 violations on 353 pages |
| News publishing | `node tests/news.test.js` (GitHub stubbed) | pass: sign-in, file checks, sanitising, commit, edit, delete, origin check |
| Contact form | `node tests/kontakt.test.js` (Resend stubbed) | pass: validation, honeypot, origin check, reply-to, error redirect |
| Mobile navigation | Playwright, 390 px | menu and submenus open (`aria-expanded`), keyboard-focusable |
| Search | Playwright `/hledat/?q=jidelna` | results listed |
| Page weight | Playwright, home, first load | ~200 kB incl. fonts and hero photo |
| Design critique | Impeccable `critique` (design review + detector, two independent agents) | see below |

## Impeccable critique and what changed

The frame was judged on-brand (family header, emblem untouched); the homepage body monotonous. Fixed: red reserved for links and actions (descriptions in ink), pupil quick links moved under the hero and extended (Suplování, Rozvrhy, Formuláře), news cards show excerpts, "Život ve škole" as tiles, no two grey bands in a row. The "draft" banners flagged as P0 appear in preview builds only, by design (production verified clean).

Detector: 12 warnings on the homepage: `cramped-padding` on full-bleed bands whose inner `.wrap` carries the padding, and `flat-type-hierarchy` (the CLI did not resolve the stylesheet; the live overlay reports 1 issue). Both are false positives. `dark-glow` = the banner text shadow used across the sister sites for legibility over the photograph; kept for consistency.

## Unresolved (needs the school, the Grand Priory or network access)

1. **Files and photos from the old site** are still linked at their old addresses (32+ documents, all images). Run `python3 tools/migrate_files.py` from a machine that can reach www.gymskutec.cz **before switching the domain**; this environment's proxy resets connections to it.
2. **Texts are rebuilt from summaries** (status "summary" on 316 files): the old site could only be read through a summarising fetch. Check against the old site before launch; ~134 older news items have only a title-based sentence.
3. **38 `OVĚŘIT` and 22 `CHYBÍ` comments** in `content/` (conflicting e-mails and account numbers on the old site, data that exists only in images: harmonogram, office hours, school council members, kroužky).
4. **Approvals**: school logo (Grand Priory), monochrome emblem use, photographs/consent, the privacy notice and accessibility statement, every "new" page.
5. **Vercel settings**: `NEWS_USERS`, `NEWS_SECRET`, `GITHUB_TOKEN`, `RESEND_API_KEY` (contact form), DNS for www.gymskutec.cz.
6. Homepage photography: only the Grand Prior's 2023 visit photos are available; pupils' everyday life needs photos from the school.
