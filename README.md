# gymskutec.cz

Website of the Gymnázium Suverénního řádu maltézských rytířů ve Skutči, a school founded by the Czech Grand Priory of the Sovereign Order of Malta (Suverénní řád maltézských rytířů – České velkopřevorství).

It is built with the same engine and Grand Magistry frame as maltezskyrad.cz, lurdy.eu and velkoprevorskypalac.eu: a static generator in plain Python (standard library only), hosted on Vercel. Czech only.

```sh
python3 build.py serve 8000      # preview build, served at http://127.0.0.1:8000 (headers and redirects applied)
python3 build.py                 # preview build into dist/ (noindex, content-status labels shown)
python3 build.py --production    # production build
python3 check.py                 # checks dist/: links, one <h1> per page, titles, descriptions, brand files, acronyms
node tests/news.test.js          # news editor function, GitHub stubbed
node tests/kontakt.test.js       # contact form function, e-mail stubbed
```

CI (`.github/workflows/ci.yml`) runs the build, `check.py` and both tests on every push.

## Where things are

| Path | What |
|---|---|
| `content/site.json` | Names, contact details, menu (`nav`), news categories, homepage texts, top-bar links |
| `content/pages/<url>/index.html` | Pages: JSON front matter between `---` lines, then HTML. The URL is the old site's URL. |
| `content/news/YYYY/MM/DD/slug.html` | News. Migrated articles keep their old URL (`…/<slug>-<ID>cs.html`) in the front matter; new posts get `/YYYY/MM/DD/slug/`. |
| `content/privacy.html` | Privacy notice |
| `vercel.json` | Hosting, security headers (CSP, HSTS…) and legacy redirects; copied to `dist/_headers` and `dist/_redirects` |
| `static/` | CSS, JS, fonts, brand files (`img/`), media |
| `static/img/logo/` | School logo variants (see `docs/brand-compliance.md`); regenerate with `tools/make_logo.py` |
| `tools/migrate_files.py` | Downloads the documents and images still linked on the old site and rewrites the links. **Run before switching the domain.** |
| `docs/` | Inventory of the old site, URL map, brand compliance, QA report |

## Front matter fields

`title`, `url`, `description`, optional `lead`, `image`, `status`, `source`, `contactCard`, `contactForm`.
`status` shows a label in preview builds only: `summary` (rebuilt from a summary of the old page, original text to be checked),
`existing` (carried over), `new` (new text awaiting approval), `approval` (needs sign-off). Remove it once the page is approved.
HTML comments `<!-- OVĚŘIT: … -->` and `<!-- CHYBÍ: … -->` mark facts to verify or supply.

## News (no GitHub needed)

Staff publish at `/pridat-aktualitu/` (not linked, not indexed, password). Same editor as maltezskyrad.cz: text editor limited to the site's styles, date, categories, summary, main photo, attachments; edit or delete existing posts. Several photos can be inserted into the text at once; two or more in a row appear as a photo grid. PDFs over 1 MB are shrunk in the browser by Ghostscript compiled to WebAssembly (`static/js/pdf-worker.js`, `static/js/vendor/ghostscript-1.1.0/`, AGPL: licence and source links in that folder, offered on the staff page), loaded only when such a PDF is attached. `api/news.js` cleans the text and commits the post to `main`; Vercel rebuilds in about a minute.

Vercel environment variables:

| Variable | Value |
|---|---|
| `NEWS_USERS` | one `Name:password` per line (`Name:password:admin` for an administrator, who can edit or delete anyone's posts and pin notices), one per co-worker |
| `NEWS_SECRET` | a long random string (`openssl rand -base64 32`) |
| `DEPLOY_HOOK_URL`, `CRON_SECRET` | daily rebuild so scheduled posts and date-based lists go out on their day — see `docs/publishing.md` (also: roles, drafts, events, pinned notices, galleries, local stand-in `node tests/news.local.js`) |
| `GITHUB_TOKEN` | fine-grained token, repository `Omegaswitch/skolaSkutec` only, Contents: read and write |
| `RESEND_API_KEY`, `MAIL_TO`, `MAIL_FROM` | contact form e-mail (Resend); `MAIL_TO` defaults to info@gymskutec.cz. Optional `NEWS_NOTIFY` for news e-mails. |

## Rules (Grand Magistry communications policy and coat-of-arms guidelines)

- Never write "SMOM" or "Malta" on its own (`check.py` enforces the acronym rule).
- Never add, redraw or recolour an emblem; only the files allowed in `check.py` may appear under `/img/`.
- Do not invent facts. Facts come from the old site (`docs/source-inventory*.md`) or the school.

## Shared code

`api/news.js`, `static/js/news-editor.js`, `static/js/pdf-worker.js`, `static/js/head.js`, the menu and image code in `static/js/site.js`, the frame in `static/css/site.css` and the sanitiser in `tools/import_wp.py` are shared with maltezskyrad.cz and the other Order school sites (skolaKladno, skolaPraha, skolaSkutec). Change them in one place and copy the file to the others; do not fork them.

## Security notes

- Headers (`vercel.json`): CSP with no third-party origins and no inline styles or scripts (`'wasm-unsafe-eval'` only lets WebAssembly compile, for the PDF shrinking), HSTS, `nosniff`, `frame-ancestors 'none'`, Referrer-Policy, Permissions-Policy. `check.py` fails the build on any inline `style` attribute.
- `api/news.js`: passwords compared in constant time, signed `HttpOnly; Secure; SameSite=Strict` session cookie scoped to the API path, same-origin check on every POST, sign-in throttling per function instance, uploads checked by content and renamed, text rebuilt from a tag allowlist. The GitHub token must be fine-grained to this repository only (Contents: read and write).
- Quill 2.0.3 (`static/js/vendor/`): CVE-2025-15056 (XSS through its HTML export, no patched release yet). Not exploitable here: the editor's HTML is never rendered unsanitised; the server rebuilds it from the allowlist before it reaches any page.
- Ghostscript 10.06.0 as WebAssembly (`static/js/vendor/ghostscript-1.1.0/`): runs only in the staff member's own browser, in a worker that is dropped after one file. Update by replacing the folder with a newer `@okathira/ghostpdl-wasm` build.

