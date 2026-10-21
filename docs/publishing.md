# Publishing (news, events, notices, galleries)

The site is static: everything the public sees is built by `build.py` from the files in `content/`. Staff do not touch
those files. They publish at **`/pridat-aktualitu/`** (not linked from the site, not indexed, behind a password) and the
page's API, `api/news.js`, writes the files into the repository `Omegaswitch/skolaskutec` as ordinary commits. Vercel rebuilds
the site in about a minute. The same code runs on maltezskyrad.cz and on the three school sites, so one fix fixes all.

## Who can do what

`NEWS_USERS` (a Vercel environment variable) holds one line per person: `Name:password`, or `Name:password:admin`.
The password may contain `:`. Removing a line signs that person out everywhere within a day.

| | editor | admin |
|---|---|---|
| write, save a draft, schedule, publish | ✅ | ✅ |
| edit or delete a post or event | own only (author or last editor) | any |
| pin a notice to the home page | – | ✅ |

The editor shows a person only the buttons their role allows; the API checks the role again on every request.

## What can be published

| Type | How | Where it appears |
|---|---|---|
| **News post** | tab *Nová aktualita*: title, date, categories, summary, text (Quill, limited to the site's own styles), main photo, attachments | `/aktuality/`, category and year archives, RSS, the home page |
| **Draft** | tick *Koncept* | nowhere on the site; listed with the flag *koncept* in *Upravit nebo smazat*; publish it by editing and unticking |
| **Scheduled post** | choose a future date | on the site from that day (see *Daily rebuild*); listed with *naplánováno na …* until then |
| **Pinned notice** (admin) | tick *Připnout na úvodní stránku* | a red notice band on the home page and the news listing, with a link to the post; unpin by editing |
| **Event** | tab *Události*: title, start, end, all-day, place, description | /udalosti/ (Plán akcí) and the calendar; each event has its own page under `/udalost/…/` |
| **Photo gallery** | insert two or more photos in a row in the text (the photo button accepts several files) | the post shows a photo grid and is listed in *Fotogalerie* |

Editing keeps a post's address and records `editedBy`. Deleting removes the post in one commit (the media files stay in
`static/media/`, so links in old e-mails keep working).

## Daily rebuild (scheduled posts, events)

A static site only changes when it is built. Publishing triggers a build, but a scheduled post must go out on its day
and date-based lists (upcoming events, the calendar) must move on by themselves. `vercel.json` therefore asks Vercel to call
`/api/rebuild` every day at 03:00 UTC (`crons`). That function asks a **deploy hook** to rebuild. Set up once in Vercel
(project `skutec`):

1. Settings → Git → Deploy Hooks → create one for `main`, copy its URL into the environment variable `DEPLOY_HOOK_URL`.
2. Settings → Environment Variables → `CRON_SECRET` = a long random string (Vercel sends it with every cron call; without it the function answers anyone).
3. Redeploy. Without `DEPLOY_HOOK_URL` the function answers `rebuilt: false` and nothing happens.

A post dated today goes out at the next build, whatever the hour on it. Times are Europe/Prague.

## Security

- **Sign-in:** password compared in constant time; a signed, `HttpOnly`, `Secure`, `SameSite=Strict` cookie (`NEWS_SECRET`) for 12 hours; sign-in throttled per address.
- **Cross-site:** every writing request must come from the site itself (`Origin` check) with the cookie; the API refuses everything else.
- **Text:** server-side allowlist sanitiser (headings, emphasis, lists, quotes, links with safe schemes, images from `/media/` only); scripts, styles, event handlers, foreign attributes and inline data are dropped. The CSP (`vercel.json`) blocks inline scripts anyway.
- **Files:** photos and PDFs only, checked by their first bytes, 3 MB each, saved under a new random name under `static/media/YYYY/MM/`; photos are shrunk and stripped of camera data in the browser.
- **Paths:** the API only ever writes under `content/news/`, `content/events.json` and `static/media/`; any other path is refused (tested).
- **Changes:** every publish, edit or delete is one commit by a fine-grained token limited to this one repository (Contents: read and write), with the person's name in the commit message and front matter, so the history shows who changed what and anything can be reverted.
- **Secrets** live only in Vercel environment variables. Nothing in `static/` or the built pages contains a token, and the API never echoes one.

| Variable | Value |
|---|---|
| `NEWS_USERS` | `Name:password` or `Name:password:admin`, one per line |
| `NEWS_SECRET` | long random string (`openssl rand -base64 32`) |
| `GITHUB_TOKEN` | fine-grained token for `Omegaswitch/skolaskutec` only, Contents: Read and write |
| `DEPLOY_HOOK_URL`, `CRON_SECRET` | daily rebuild (above) |
| `NEWS_NOTIFY`, `RESEND_API_KEY`, `MAIL_FROM` | optional e-mail about every new post |

## Testing

- `node tests/news.test.js` — the API with GitHub stubbed: sign-in, roles, drafts, scheduling, events, pinning, file checks, sanitiser, origin check, edit, delete.
- `node tests/news.local.js` — a local stand-in of the hosting: serves `dist/` and the API with GitHub replaced by this
  checkout, so the whole flow can be tried in a browser at `http://127.0.0.1:8090/pridat-aktualitu/` (editor/editor,
  admin/admin; build first with `python3 build.py`). Posts land in `content/`, where `git status` shows them; discard
  them with `git checkout -- content static/media` when done.

Verified on 21 October 2026 in Chromium against the stand-in: draft with photo → listed as *koncept* → edited into a
scheduled post → not built → pinned notice by an admin shown on the home page → event added, edited and deleted →
post deleted → path traversal refused. 0 page errors.
