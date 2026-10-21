# Publishing (news, events, notices, galleries)

The three school websites share **one Supabase project** (`pqmgtvfeavidoecwbvwy`): one database, one sign-in, one
set of rules, and every row carries the school it belongs to (`site_id`: `skutec`, `kladno`, `praha`). Staff publish at
**`/pridat-aktualitu/`** on their school's site (not linked, not indexed). Nothing is committed to the repository any
more: a post is a row, a photo is a file in the `media` bucket, and the pages that show them (`api/page.py`) are
rendered on request with the very same functions `build.py` uses for the rest of the site, so nothing changes visually.
No GitHub token, no scheduled rebuild: a change is on the site within a minute (the CDN keeps a page for 60 s).

## Accounts, sign-in, roles

- **Account:** one per person, created by invitation in Supabase (Authentication → Users → *Invite user*). The person
  sets a password from the e-mail. Public sign-up must stay **off** (Authentication → Providers → Email → *Allow new
  users to sign up*: off).
- **Second factor:** mandatory. At the first sign-in the page shows a QR code for an authenticator app (Google /
  Microsoft Authenticator, Authy, …); from then on every sign-in asks for the six-digit code. The database refuses every
  change from a session without it (`aal2`), so the rule cannot be skipped by a different client.
- **Forgotten password:** *Zapomenuté heslo* on the sign-in form sends a link; the page then shows the new-password form.
  Every school domain must be in Authentication → URL Configuration → *Redirect URLs*
  (`https://www.gymskutec.cz/pridat-aktualitu/`, `https://www.zsmr.eu/pridat-aktualitu/`, `https://vos.mojezdravka.cz/pridat-aktualitu/`,
  plus the `*.vercel.app` previews if wanted); the Site URL can be any one of them.
- **Access to a school:** a row in `site_members` (`user_id`, `site_id`, `role`). An account with no row for a site
  cannot do anything there; a teacher who works at two schools has two rows. Administrators of a site manage its rows
  on the **Uživatelé** tab (add by e-mail, change role, remove); accounts themselves are made in Supabase.

| | editor (redaktor) | admin (správce) |
|---|---|---|
| write, save a draft, schedule, publish | ✅ | ✅ |
| edit or delete a post or event | own only | any of the site |
| texts imported from the old website | – | ✅ |
| pin a notice to the home page | – | ✅ |
| manage the site's users | – | ✅ |

The page only shows the buttons a role allows; the database enforces the same rules on every request (row level
security), so a modified page, a stolen session or a direct API call cannot do more.

## What can be published

| Type | How | Where it appears |
|---|---|---|
| **News post** | tab *Nová aktualita*: title, date, categories, summary, text (Quill, limited to the site's styles), main photo, attachments | `/aktuality/`, category and year archives, RSS, the home page |
| **Draft** | tick *Koncept* | nowhere public; listed with *koncept* in *Upravit nebo smazat* |
| **Scheduled post** | choose a future day | public from that day (Prague time), without anyone doing anything |
| **Pinned notice** (admin) | tick *Připnout na úvodní stránku* | a notice band on the home page and the news listing |
| **Event** | tab *Události*: title, start, end, all-day, place, description | /udalosti/ (Plán akcí) and the pages that list events; each event has a page under `/udalost/…/` |
| **Photo gallery** | two or more photos in a row in the text (the photo button takes several files) | a photo grid in the post; the post is listed in *Fotogalerie* |

Editing keeps a post's address and records who changed it. Deleting removes the row at once (uploaded files stay in
the bucket). Posts imported from the old website keep their richer markup (tables, captioned photos) and are
changed by administrators only.

## Security

- **Row level security** on every table: the public (the site's own renderer uses the public key, like any visitor)
  sees published posts only (`draft = false`, dated today or earlier) and non-draft events; members see all rows of
  their sites; writes need membership, the second factor, and ownership or the admin role; a row never changes site.
- **Text:** what the editor saves is rebuilt from an allowlist (headings, emphasis, lists, quotes, links, photos
  from the media bucket) every time a page is rendered. The CSP of the site forbids inline scripts anyway.
- **Files:** the bucket accepts JPEG, PNG, WebP and PDF up to 3 MB (checked by Supabase, not the browser); uploads go
  into the uploader's own site folder (`<site>/YYYY/MM/`) under a random name; photos are shrunk and stripped of
  camera data in the browser first.
- **Keys:** the pages contain only the *publishable* key, which is public by design. No service key exists outside
  Supabase; nothing in the repository or in Vercel holds a secret for publishing.
- **Checks:** `supabase` advisors (security, performance) were run after the schema was created; see `docs/qa-report.md`.

## Running it locally

```
python3 build.py              # the static pages
python3 tests/site.local.py   # dist/ plus the pages rendered from the database → http://127.0.0.1:8090/
```

The staff page on the local server talks to the real database, with a real account. There is no stubbed mode: the
rules live in the database and are tested there (`docs/qa-report.md`).

## Schema (for reference)

`sites`, `profiles` (display name), `site_members` (`user_id`, `site_id`, `role`), `posts` (`site_id`, `url`, `title`,
`date`, `categories`, `excerpt`, `body`, `image`, `image_w/h`, `attachments`, `draft`, `pinned`, `author(_id)`,
`edited_by`, `meta`, generated `photos`/`first_photo`, server-set `trusted`), `events` (`site_id`, `url`, `title`,
`starts_at`, `ends_at`, `all_day`, `place`, `description`, `draft`, …); functions `is_editor(site)`, `is_admin(site)`,
`site_members_of(site)`, `add_member(email, site, role)`, `remove_member(user, site)`; storage bucket `media`.
