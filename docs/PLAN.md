# gymskutec.cz rebuild: analysis and implementation plan

Status: **phase 0 (analysis). No site code has been written yet.** See "Blockers" below.

## Tool check (19 Oct 2026)

| Tool | Status |
|---|---|
| Graphify | Installed (`graphify`). Run on the reference repo `maltezskyrad` (existing `graphify-out/`; hubs: `layout()`, `render_page()`, `render_home()`, `build()`, `Sanitiser` in `api/news.js`). |
| Ponytail | **Not available** in this session (no skill or command found). The reference repos' CLAUDE.md requires it. |
| Impeccable / `/taste` | **Not available** in this session. |

## Reference repositories (read only, not modified)

| Brief name | Repository found | Notes |
|---|---|---|
| maltezskyrad | `Omegaswitch/maltezskyrad` | Primary engine and design reference. |
| poutlourdy | `Omegaswitch/lurdy` (assumed match) | Same engine, five languages, forms via `api/prihlaska.js`. |
| maltezskypalac | `Omegaswitch/palacPronajem` (assumed match) | Same engine, room galleries (WebP 480/800/1600). |

Shared architecture: a static generator in standard-library Python (`build.py`), content as JSON front matter + HTML
in `content/`, `check.py` for link/heading/brand checks, Vercel hosting with `vercel.json` headers (CSP, HSTS…) and
legacy redirects, self-hosted Asap + EB Garamond, Grand Magistry frame (red top bar, banner lockup, `#454545` menu).

News workflow to reuse (maltezskyrad): `content/news/YYYY/MM/DD/slug.html`, archive and category pages, RSS,
and the password-protected editor `/pridat-aktualitu/` (Quill 2.0.3) backed by `api/news.js`, which sanitises
the text and commits the post to GitHub so Vercel rebuilds. Env: `NEWS_USERS`, `NEWS_SECRET`, `GITHUB_TOKEN`.

## Target site (what could be confirmed)

- Name: Gymnázium Suverénního řádu maltézských rytířů ve Skutči; Vítězslava Nováka 584, 539 73 Skuteč;
  info@gymskutec.cz; office/canteen +420 739 085 660; dormitory +420 724 905 528.
- Server: Microsoft-IIS/10.0 (not WordPress). Two programmes ending in maturita: gymnázium and bezpečnostně právní činnost.
- Main menu: O škole · Školní akce · Studium · Pro žáky a rodiče · Kontakty.
- Known URL pattern: `/studium/pro-uchazece-1/`, `/studium/harmonogram-skolniho-roku/`, `/o-skole/skolni-poradenske-pracoviste/`.
- External services to link, not rebuild: Bakaláři (`gymskutec.bakalari.cz`), Strava.cz canteen menu (jidelna 5644),
  Facebook, Instagram, YouTube, whistleblower mailbox, e-podatelna.

## Blockers

1. **The target site can't be crawled from this environment.** `https://www.gymskutec.cz` and `web.archive.org`
   reset the connection through the environment's proxy (plain HTTP answers only with a 302 to HTTPS). The web-fetch
   tool returns summaries only, not verbatim text, images or documents. A faithful migration (all pages, news
   archive, PDFs, photos, legacy URL map) needs either network access to `www.gymskutec.cz` (and ideally
   `web.archive.org`), or an export or copy of the site provided by the school.
2. Ponytail and Impeccable/taste are not installed, so they can't be run as the brief requires.
3. Logo: the "school in Žerotínova" reference identity is not in any repository in this session
   (`skolaPraha` is empty). Any school logo also needs formal approval from the Grand Priory / Grand Magistry
   under the Coat of Arms guidelines; it must reuse the official shield unaltered.

## Phased roadmap (once unblocked)

1. Crawl: full inventory (pages, news, media, documents, links, SEO), saved to `docs/content-inventory.md`
   and `docs/url-map.md` (legacy → new, with 301s in `vercel.json`).
2. Engine: copy maltezskyrad's `build.py`, `check.py`, `static/` fonts and frame; Czech only; remove the church
   calendar and Grand Magistry feed; add school sections. Preserve legacy URLs where the path shape allows.
3. Content: importer for the IIS site (like `tools/import_wp.py`), pages marked `"status": "existing"`.
4. News: port `api/news.js` + editor, categories from the old site (akce, soutěže, sport, zahraniční zájezdy, projekty),
   archive, RSS, migrated articles at their old URLs.
5. Design: maltezskyrad tokens, with a more open, photo-led homepage (intro, two programmes, admissions, latest news,
   quick links to Bakaláři / jídelníček). Brand compliance doc with open approvals; logo proposal flagged for approval.
6. QA: `check.py`, Playwright on desktop and mobile, axe accessibility, redirects test, news API test
   (`node tests/news.test.js`), production build; audit report in `docs/qa-report.md`.
