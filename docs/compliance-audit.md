# Compliance and security audit — three school sites (19 October 2026)

Scope: the new builds of **VOŠZ Praha** (`skolaPraha`, branch `main`), **ZŠ Kladno** (`skolaKladno`, `main`, read-only from this session) and **Gymnázium Skuteč** (`skolaSkutec`), compared with the live sites vos.mojezdravka.cz, www.zsmr.eu and www.gymskutec.cz. Legal sources opened: zakonyprolidi.cz consolidated texts, ÚOOU, EDPB, DIA methodology v1.7 (see the end). Legend: ✅ compliant · ❌ missing · ⚠️ needs review · — not applicable.

| Requirement (legal basis, status) | Praha new | Kladno new | Skuteč new | Old sites (Praha / Kladno / Skuteč) |
|---|---|---|---|---|
| HTTPS + HSTS (GDPR čl. 32; recommended) | ✅ | ✅ | ✅ | ⚠️ no HSTS / ❌ expired cert, HTTP only, admin login in clear / ⚠️ |
| Security headers, strict CSP (best practice) | ✅ | ✅ | ✅ | ❌ / ❌ / ⚠️ X-Frame only |
| Software exposure (versions, user enumeration) | ✅ static site | ✅ static site | ✅ static site | ❌ WP 7.0.7, users API / ❌ WP 5.4, PHP 7.3, 10 usernames / ⚠️ PHPSESSID |
| Cookies: banner not needed if only technical storage (z. 127/2005 § 89/3; ÚOOU leaflet) | ✅ none on public pages | ✅ | ✅ | ✅ / ✅ / ⚠️ session cookie |
| Storage disclosed in privacy notice (recommended) | ✅ | ⚠️ not mentioned | ✅ fixed | — |
| Third-party loads (Google Fonts, embeds; LG München 3 O 17493/20, § 89/3) | ✅ none | ⚠️ 1 image hotlinked from mail.google.com (`/2021/02/26/nase-koupelny/`) | ✅ none | ❌ Google Fonts / ❌ Google Fonts / ⚠️ |
| GDPR notice incl. website, forms, transfers (GDPR čl. 13) | ✅ | ⚠️ old template, no website/forms section | ✅ fixed (contact form, Resend, DPF) | ⚠️ DOCX, old address / ⚠️ template / ⚠️ PDF only |
| DPO named (čl. 37; z. 110/2019 § 14; ÚOOU UOOU-00215/18 — mandatory for all schools) | ✅ Havránek | ✅ | ✅ fixed (Ing. Jiří Ligr, from the school's own document) | ✅ / ✅ / PDF only |
| Form notice at point of collection (čl. 13) | — no form | ❌ Schránka důvěry form has no notice | ✅ | — / ❌ / ⚠️ |
| Accessibility statement per z. 99/2019 § 8, EU template 2018/1523, DIA | ✅ | ❌ copied WordPress text (wrong: says WordPress), no status, no DIA | ✅ fixed (EN 301 549 V3.2.1 / WCAG 2.1 AA, partial, date, DIA) | ❌ none / ❌ generic / ⚠️ 2019 |
| WCAG 2.1 AA (legal) / 2.2 AA (recommended) | ⚠️ not re-tested here | ⚠️ not re-tested here | ✅ axe 0 violations, 353 pages | — |
| Povinně zveřejňované informace (z. 106/1999 § 5, vyhl. 515/2020 — ambiguous for church ŠPO, common practice) | ✅ | ❌ | ✅ | ❌ / ❌ / ✅ |
| Úřední deska online (správní řád § 26/1 via ŠZ § 165/2; DIA) | ❌ | ❌ | ❌ | ❌ / ❌ / ❌ |
| Whistleblowing info (z. 171/2023 § 9/2 b) — mandatory if ≥ 50 employees or veřejný zadavatel) | ⚠️ check headcount | ⚠️ check | ⚠️ staff list ≈ 50: check | ❌ / ❌ / ❌ |
| ŠVP, výroční zprávy, školní řád online (ŠZ § 5/3, § 10/3, § 30/4) | ✅ | ✅ | ✅ (118 documents migrated today) | ✅ / ✅ / ✅ |
| Admission information (ŠZ § 60, § 94, § 183/2) | ✅ | ✅ zápis | ✅ criteria | ✅ / ✅ / ✅ |
| Identity: name, sídlo, IČO, zřizovatel, datová schránka (GDPR čl. 13; InfZ § 5) | ✅ | ✅ | ✅ | ⚠️ no IČO / ✅ / ✅ |
| robots.txt, sitemap.xml, canonical, noindex on staff page | ✅ | ✅ | ✅ | ⚠️ WP sitemap lists user / ❌ none / ⚠️ |
| Legacy redirects | ✅ 150 | ✅ 479 | ✅ 215 old URLs, 0 missing | — |
| Order of Malta branding (CP 2025, CoA 3.3) | ✅ shared logo set | ✅ | ✅ | — |
| European Accessibility Act (z. 424/2023) | — | — | — | not applicable to school information sites |
| NIS2 / z. 264/2025 | — | — | — | not applicable (sector 19 covers research only) |

## Fixed today (Skuteč)
1. 118 legacy documents downloaded from gymskutec.cz and linked locally (the site became reachable); 1 file is 404 on the old site too — note left for the school.
2. Privacy notice: DPO, contact form processing and US transfer (Resend, DPF), staff cookie and session storage, link to the school's GDPR document.
3. Accessibility statement rewritten to the EU template: legal standard EN 301 549 V3.2.1, partial compliance (legacy PDFs, image-only data), date, yearly review, DIA enforcement.
4. Schránka důvěry described as the school does (link deliberately only on the notice board; it is not the 171/2023 channel).

## Not fixed (other repositories)
- **Kladno** (no write access from this session): replace the accessibility statement; add a website/forms section to the privacy notice and a notice on the Schránka důvěry form; remove the `mail.google.com` emoji image from `content/news/2021/02/26/nase-koupelny.html`; add a povinné informace page.
- **Praha**: compliance pages were added on `main` by another session during this audit; only úřední deska and whistleblowing remain.

## Before launch (needs the schools / Grand Priory)
1. Approve the privacy notices and accessibility statements (legal texts).
2. Confirm headcount (≥ 50 employees) for the whistleblowing duty; if obliged, publish the channel, the příslušná osoba and the Ministry of Justice channel.
3. Set up an online úřední deska (content comes from the school).
4. Sign a processing agreement (čl. 28) with Resend and Vercel; Vercel and Resend should be on the DPF list.
5. Old live sites until switch-over: zsmr.eu has an expired certificate and sends its admin login and trust-box messages unencrypted — fix or switch soon.

## Sources
zakonyprolidi.cz: 110/2019, 127/2005, 99/2019, 515/2020, 106/1999, 561/2004, 353/2016, 171/2023, 134/2016, 89/2012, 424/2023, 264/2025, 408/2025, 500/2004, 300/2008, 111/2009, 499/2004 · ÚOOU: UOOU-00215/18 (private schools and DPO), Q&A Školství, leaflet "Webové stránky" (cookies), 2024 cookie seminar · EDPB Guidelines 2/2023 v2 · DIA Metodický pokyn přístupnost v1.7 (16.7.2025) · edu.gov.cz "Školy a poskytování informací podle zákona 106/1999" (2026) · mv.gov.cz GDPR transfers to the USA · EU texts (GDPR 2016/679, decision 2023/1795, directive 2019/882, decision 2018/1523) cited from knowledge, EUR-Lex blocked automated access.
