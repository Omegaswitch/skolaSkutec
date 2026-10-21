# gymskutec.cz

Website of the Gymnázium Suverénního řádu maltézských rytířů ve Skutči, a school founded by the Czech Grand Priory of the Sovereign Order of Malta (Suverénní řád maltézských rytířů – České velkopřevorství).

It is built with the same engine and Grand Magistry frame as maltezskyrad.cz, lurdy.eu and velkoprevorskypalac.eu: a static generator in plain Python (standard library only), hosted on Vercel. Czech only.

```sh
python3 build.py serve 8000      # preview build, served at http://127.0.0.1:8000 (headers and redirects applied)
python3 build.py                 # preview build into dist/ (noindex, content-status labels shown)
python3 build.py --production    # production build
python3 check.py                 # checks dist/: links, one <h1> per page, titles, descriptions, brand files, acronyms
python3 tests/site.local.py       # dist/ plus the pages rendered from the shared database
node tests/kontakt.test.js       # contact form function, e-mail stubbed
```

CI (`.github/workflows/ci.yml`) runs the build, `check.py` and both tests on every push.

## Where things are

| Path | What |
|---|---|
| `content/site.json` | Names, contact details, menu (`nav`), news categories, homepage texts, top-bar links; `supabase` (project address, publishable key, this site's id) |
| `content/pages/<url>/index.html` | Pages: JSON front matter between `---` lines, then HTML. The URL is the old site's URL. |
| `content/privacy.html` | Privacy notice |
| `vercel.json` | Hosting, security headers (CSP, HSTS…) and legacy redirects; copied to `dist/_headers` and `dist/_redirects` |
| `static/` | CSS, JS, fonts, brand files (`img/`), media |
| `static/img/logo/` | School logo variants (see `docs/brand-compliance.md`); regenerate with `tools/make_logo.py` |
| `tools/migrate_files.py` | Downloads the documents and images still linked on the old site and rewrites the links. **Run before switching the domain.** |
| `tools/make_og.py` | Builds `static/img/og.jpg`, the 1200×630 link-preview card (Discord, iMessage, Facebook): the Order's flag under a dark veil, the school lockup in white, a red strip. Same layout on all three school sites. |
| `docs/` | Inventory of the old site, URL map, brand compliance, QA report |

## Front matter fields

`title`, `url`, `description`, optional `lead`, `image`, `status`, `source`, `contactCard`, `contactForm`.
`status` shows a label in preview builds only: `summary` (rebuilt from a summary of the old page, original text to be checked),
`existing` (carried over), `new` (new text awaiting approval), `approval` (needs sign-off). Remove it once the page is approved.
HTML comments `<!-- OVĚŘIT: … -->` and `<!-- CHYBÍ: … -->` mark facts to verify or supply.

## News, events and galleries

**News, events, notices and galleries (no GitHub needed).** Staff publish at `/pridat-aktualitu/` (not linked, not indexed): e-mail, password and a one-time code from an authenticator app. Posts, events and photos go to the shared Supabase database of the three school sites and are on the web within a minute; `api/page.py` renders those pages on request with this site's own functions. Drafts, scheduled posts, pinned notices, roles and user management are described in `docs/publishing.md`.

Vercel environment variables:

| Variable | Value |
|---|---|
| `RESEND_API_KEY`, `MAIL_TO`, `MAIL_FROM` | contact form e-mail (Resend); `MAIL_TO` defaults to info@gymskutec.cz.  |

## Rules (Grand Magistry communications policy and coat-of-arms guidelines)

- Never write "SMOM" or "Malta" on its own (`check.py` enforces the acronym rule).
- Never add, redraw or recolour an emblem; only the files allowed in `check.py` may appear under `/img/`.
- Do not invent facts. Facts come from the old site (`docs/source-inventory*.md`) or the school.

## Shared code

`api/page.py`, `static/js/news-editor.js`, `static/js/pdf-worker.js`, `static/js/head.js`, the menu and image code in `static/js/site.js`, the frame in `static/css/site.css` and the sanitiser in `tools/import_wp.py` are shared with maltezskyrad.cz and the other Order school sites (skolaKladno, skolaPraha, skolaSkutec). Change them in one place and copy the file to the others; do not fork them.

## Security notes

- Headers (`vercel.json`): CSP with no third-party origins and no inline styles or scripts (`'wasm-unsafe-eval'` only lets WebAssembly compile, for the PDF shrinking), HSTS, `nosniff`, `frame-ancestors 'none'`, Referrer-Policy, Permissions-Policy. `check.py` fails the build on any inline `style` attribute.
- Publishing: Supabase Auth with a mandatory second factor; row level security decides who may read or change what (see `docs/publishing.md`); the pages hold only the publishable key; `api/page.py` rebuilds every post text from a tag allowlist before it is shown.
- Quill 2.0.3 (`static/js/vendor/`): CVE-2025-15056 (XSS through its HTML export, no patched release yet). Not exploitable here: the editor's HTML is never rendered unsanitised; `api/page.py` rebuilds it from the allowlist before it reaches any page.
- Ghostscript 10.06.0 as WebAssembly (`static/js/vendor/ghostscript-1.1.0/`): runs only in the staff member's own browser, in a worker that is dropped after one file. Update by replacing the folder with a newer `@okathira/ghostpdl-wasm` build.

