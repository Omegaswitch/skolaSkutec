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

## Final audit before presentation (19 October 2026)

Full sweep with Playwright: 353 pages × 3 widths (1366, 820, 390 px), plus interaction tests, axe, Impeccable detector on the whole build, and a side-by-side comparison with maltezskyrad.cz and velkoprevorskypalac.eu.

| Area | Result |
|---|---|
| Console errors, failed requests, broken local images | none on public pages |
| Horizontal overflow | none (was: 5 px on /studium/predmety/matematika/ at 390 px — fixed) |
| Layout shift (CLS > 0.05) | none on public pages (was: 0.09–0.11 at 820 px on 3 pages with tables — fixed) |
| Interactions (13 tests) | skip link, submenu on focus, Escape closes, mobile menu and submenus, news category and year filters, article pager, search, form error message, form labels, 404 — all pass |
| Animations | hover fades 160–280 ms, cross-document fade, section slide, image develop-in for uncached images only; all off under `prefers-reduced-motion`; same as the sister sites |
| Accessibility (axe, WCAG 2.2 AA) | 0 violations on 353 pages |
| Feeds | RSS (30 items) and sitemap (332 URLs) parse |

Fixed in this audit:
1. Tablet: news cards without a photo were squeezed into a 9rem column — image column now only when there is an image.
2. Tablet layout shift: removed `content-visibility:auto` from tables (placeholder height 600 px made the page jump).
3. Phone overflow: page grid track and prose now shrink and wrap long words/URLs.
4. Preview label for "summary" pages had no background — now tinted like "existing".
5. Contact page: address card first, as on maltezskyrad.cz.
6. Homepage eyebrow now carries the short red rule used on velkoprevorskypalac.eu.

Not changed (deliberate): mobile header height and the banner text shadow (shared with the sister sites); Impeccable detector `cramped-padding` / `dark-glow` / `flat-type-hierarchy` are false positives (full-bleed wrappers, family banner shadow, unresolved stylesheet); `broken-image` / `overused-font` hit a regex in news-editor.js and the vendored Quill CSS.

Staff page `/pridat-aktualitu/`: its API exists only on Vercel (404 on the local server, expected); the sign-in form appears after a session check (layout shift 0.09–0.21, internal page only).

## Cross-device audit and publishing workflow (21 October 2026)

Run with Playwright (Chromium) and axe-core 4.10 on the built site of all three school sites at six viewports
(phone 360 and 390 px, phone landscape 844 px, tablet 768 and 1024 px, desktop 1920 px): home, news listing, a post,
the main information page, contacts, the Grand Priory page, the editor.

| Check | Result |
|---|---|
| Horizontal overflow, layout | one bug across the sites: at 1024 px the hidden drop-down menus of the last items widened the page; fixed by right-aligning those menus (`.nav-list>li:nth-last-child(-n+3)>.sub`) |
| axe (WCAG 2 A/AA, 2.1, 2.2) | 0 violations at every viewport |
| Console errors, missing alt texts, one h1 | 0 |
| Sticky menu bar (added 20 Oct) | opens and scrolls correctly at every width; mobile menu limited to the viewport height |
| Small type and tap targets in the Grand Magistry frame (top bar, footer) | informational: the frame is the Order's prescribed template and was left as designed |

Publishing (see `docs/publishing.md`): roles (editor/admin), drafts, scheduled posts with a daily rebuild, pinned
notices, events and photo galleries were added to the shared editor and tested end to end in Chromium against the
local stand-in (`tests/news.local.js`): create with photo → draft → edit into a scheduled post → not built → admin pins a
notice → shown on the home page → event added, edited, deleted → post deleted → path traversal refused; 0 page errors.
`node tests/news.test.js`, `python3 build.py --production --offline` and `python3 check.py` pass.

Still needing authorisation: the Vercel environment variables (`NEWS_USERS`, `NEWS_SECRET`, `GITHUB_TOKEN`,
`DEPLOY_HOOK_URL`, `CRON_SECRET`) are not set on this project, so publishing is not live yet.
