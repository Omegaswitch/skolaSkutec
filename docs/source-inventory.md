# Source inventory – www.gymskutec.cz

Crawled 2026-10-19 via WebFetch (AI-summarised fetches, not raw HTML). Facts are what the fetch returned. Treat exact strings (phone numbers, account numbers, e-mails) as "verify before publishing". Site footer on most pages: "Poslední aktualizace: 17. 10. 2026". The CMS is from Galileo Corporation s.r.o. (https://www.igalileo.cz), skin `gymskutec.cz_lego3`.

## URL patterns

- Section pages: `/<sekce>/<podsekce>/` with a trailing slash. Some slugs carry a `-1` suffix: `/o-skole/absolventi-a-uspechy-1/`, `/studium/pro-uchazece-1/`, `/skolni-akce/souteze/jazykove-souteze-1/`, `umelecke-souteze-1/`, `sportovni-souteze-1/`, `.../charitativni-akce/svetluska-1/`, `.../pribehy-bezpravi-1/`, `.../maraton-psani-dopisu-1/`, `.../studentske-volby-1/`, `.../tridni-casopisy-1/`.
- Articles / galleries: `<section path>/<slug>-<ID>cs.html` (for example `finale-souteze-mas-na-to-586cs.html`). The IDs are global and roughly chronological (latest seen is 586).
- Document records: `/o-skole/dokumenty-skoly/<slug>-<N>.html`.
- Images in articles: `/evt_image.php?img=<ID>` with optional `&width=540&height=540&box=2` (thumbnail) or `&width=500` / `&width=800`.
- Article attachments: `/evt_file.php?file=<ID>`.
- Editor files: `/e_download.php?file=/data/editor/<x>.pdf&original=<name>`. Editor images: `/data/editor/<id>cs_<n>.(png|jpg)`, `_big` for the large version, sometimes `?gcm_date=<ts>`. Multipage blocks: `/data/multipage/editor/editor-<a>-<b>-cs_<n>.(png|jpg)`.
- File storage: `/modules/file_storage/download.php?file=<hash>%7C<n>&inline=1`.
- Query-string URLs: `/?mapa-webu=1&lang=cs` (site map), `/?cookies=1`, `/?hledej` and `/?hledej=&lang=cs` (search), `/cs/tiraz/#prohlaseniopristupnosti` (accessibility statement), `/o-skole/dokumenty-skoly/-/aktualni/`.
- Duplicate trees: projects exist both under `/o-skole/projekty/skolni-projekty/...` and `/skolni-akce/projekty/skolni-projekty/...` (for example `charitativni-akce` vs `charitativni-projekty`).
- Links resolve to both `https://www.gymskutec.cz` and `https://gymskutec.cz`.
- External systems: Bakaláři (https://gymskutec.bakalari.cz/login, events agenda https://gymskutec.bakalari.cz/core/Events/Agenda/Index, substitutions http://gymskutec.bakalari.cz/next/zmeny.aspx, timetables http://gymskutec.bakalari.cz/timetable/public). Menu: https://app.strava.cz/jidelnicky?jidelna=5644 (also https://www.strava.cz/strava5/Jidelnicky?zarizeni=5644).

## Site-wide elements (repeated on almost every page)

- Footer: Gymnázium Suverénního řádu maltézských rytířů ve Skutči, Vítězslava Nováka 584, 539 73 Skuteč; info@gymskutec.cz; kancelář/školní jídelna +420 739 085 660; domov mládeže +420 724 905 528.
- Social: Facebook https://www.facebook.com/GS%C5%98MR-Skute%C4%8D-178420408988256/, Instagram https://www.instagram.com/gsrmrveskutci/, YouTube https://www.youtube.com/channel/UCvkVuaUcXy1Ymuqwx-9WtZQ.
- Sidebar blocks:
  - "Finance z EU" (/o-skole/projekty/projekty-eu/). The link "Operační program pro vědu, výzkum a vzdělávání" has a broken placeholder `[MENU_CS_145]`.
  - "Jak pomohli EU a ESF naší obci" (PDF, 79.09 kB): https://www.gymskutec.cz/e_download.php?file=data/editor/mini21cs_1.pdf&original=VN+-+VZ+-+Publicita.pdf
  - ISIC karta (PDF, 1.94 MB): https://www.gymskutec.cz/e_download.php?file=/data/editor/mini35cs_1.pdf&original=ISIC.pdf
  - EU – energetické úspory (JPG, 37.51 kB): https://www.gymskutec.cz/e_download.php?file=/data/editor/mini36cs_1.jpg&original=Publicita.jpg
  - Nábor k policii: https://nabor.policie.gov.cz/
  - Zřizovatel: http://cvp.maltezskyrad.cz/
- "Spolupracujeme": Člověk v tísni (https://www.clovekvtisni.cz/), ISIC (https://www.isic.cz/prukazy/prukaz-isic), Spektrum (https://spektrum-ams.cz/), eTwinning (https://www.dzs.cz/program/etwinning), EU MŠMT, Světluška (/o-skole/projekty/skolni-projekty/charitativni-akce/svetluska-1/), Židovské muzeum v Praze (https://www.jewishmuseum.cz/), Život dětem (/o-skole/projekty/skolni-projekty/charitativni-akce/srdickove-dny/).
- Site-wide images:
  - Crest: /skins/gymskutec.cz_lego3/images/crest.png
  - Sidebar images: /data/editor/mini21cs_1.png (vlajka EU), /data/editor/mini21cs_2.jpg (+ _big, logo projektu), /data/editor/mini35cs_1.png (ISIC), /data/editor/mini36cs_1.png (EU úspory), /data/editor/mini37cs_1.png (Nábor k policii), /data/editor/mini38cs_1.png (zřizovatel)

The per-page sections below omit these site-wide elements unless they are relevant.

---

## Homepage

- **URL:** https://www.gymskutec.cz/
- **H1:** Gymnázium Suverénního řádu maltézských rytířů ve Skutči
- **Status:** OK
- **Facts:**
  - Horní odkazy: Pro uchazeče, Plán akcí (Bakaláři agenda), Bakaláři, Jídelníček (strava.cz, jídelna 5644)
  - Bloky: "Platby žáků", "Kurz křesťanské meditace" (Spirituální kabinet), ISIC, EU, Nábor k policii, Zřizovatel
  - Aktuality: viz sekce News articles
- **Internal links:** the full main menu (see the sections below), plus /?mapa-webu=1&lang=cs, /?cookies=1, /?hledej, /cs/tiraz/#prohlaseniopristupnosti
- **Documents:**
  - "Co s námi můžete zažít..." (PDF): https://www.gymskutec.cz/e_download.php?file=/data/editor/164cs_1.pdf
  - Spirituální kabinet 5.pdf (PDF, 4.62 MB): https://www.gymskutec.cz/e_download.php?file=/data/multipage/editor/editor-1-359-cs_1.pdf
  - ISIC.pdf, Publicita.jpg (site-wide)
- **Images:**
  - https://www.gymskutec.cz/data/multipage/editor/editor-1-245-cs_1.jpg (+ _big, Platby žáků)
  - https://www.gymskutec.cz/data/multipage/editor/editor-1-359-cs_1.png (Kurz křesťanské meditace)
  - https://www.gymskutec.cz/data/multipage/editor/editor-1-366-cs_2.png (Ranní duchovní nakopávák)
  - The evt_image news thumbnails listed under News articles

---

## O škole (menu item without its own URL)

### Základní informace
- **URL:** https://www.gymskutec.cz/o-skole/zakladni-informace/
- **H1:** Základní informace
- **Status:** OK
- **Facts:**
  - Sídlo: Vítězslava Nováka 584, 539 73 Skuteč; Pardubický kraj
  - Zřizovatel: Suverénní řád Maltézských rytířů – České velkopřevorství
  - IČO 71 341 064; IZO školy 110 100 859; IZO ředitelství 691 000 719
  - Tel. 739 085 660; e-mail info@gymskutec.cz; ID datové schránky 8t69bd7
  - GPS 49.8401678N, 15.9935742E; mapa https://maps.app.goo.gl/WCkHAr7mXSJpuCWy8
  - Účty:
    - hlavní 1144231339/0800
    - platby od žáků 6689078349/0800 (školní fond, exkurze, kurzy, kroužky)
    - stravné a ubytování 35-1144231339/0800
  - Obory (maturitní):
    - osmileté a čtyřleté gymnázium (absolventi 5. tříd do primy, 9. tříd do kvinty)
    - Bezpečnostně právní činnost (absolventi 9. tříd do 1. ročníku)
  - Kancelář/ŠJ 739 085 660; Domov mládeže 724 905 528
- **Internal links:** /o-skole/projekty/projekty-eu/, Světluška, Život dětem
- **Documents:** Obecné nařízení o ochraně osobních údajů (PDF, 361.6 kB): https://gymskutec.cz/e_download.php?file=/data/editor/4cs_2.pdf&original=Obecn%C3%A9%20na%C5%99%C3%ADzen%C3%AD%20o%20ochran%C4%9B%20osobn%C3%ADch%20%C3%BAdaj%C5%AF.pdf
- **Images:** https://gymskutec.cz/data/editor/4cs_1.png (mapa), https://gymskutec.cz/data/multipage/editor/editor-1-245-cs_1.jpg, https://gymskutec.cz/data/multipage/editor/editor-1-244-cs_1.jpg (QR / platby)

### Absolventi a úspěchy
- **URL:** https://www.gymskutec.cz/o-skole/absolventi-a-uspechy-1/
- **H1:** Absolventi a úspěchy
- **Status:** OK
- **Facts:** Jediný záznam "Medailonky absolventů" (15. 9. 2025): "Co nám o sobě a o čase stráveném studiem na GSŘMR napsali někteří naši absolventi…"
- **Internal links:** https://gymskutec.cz/o-skole/absolventi-a-uspechy-1/medailonky-absolventu-556cs.html
- **Documents / images:** none in the content

### Zaměstnanci školy
- **URL:** https://www.gymskutec.cz/o-skole/zamestnanci-skoly/
- **Status:** PARTIAL. The parent page was not fetched separately; its three subpages were.

#### Vedení školy
- **URL:** https://www.gymskutec.cz/o-skole/zamestnanci-skoly/vedeni-skoly/
- **H1:** Vedení školy
- **Status:** OK
- **Facts:**
  - Mgr. Šárka Jonešová – ředitelka ŠPO, tel. 739 518 239, sarka.jonesova@gymskutec.cz
  - Mgr. Radka Švadlenková – zástupkyně ředitelky školy, radka.svadlenkova@gymskutec.cz
  - Bc. Th. Jan Pecháček – spirituál. The displayed address is jan.pechacek@gymskutec.cz but the mailto points to jan.linhart@gymskutec.cz (mismatch on the page).
- **Images:** https://gymskutec.cz/data/editor/24cs_2.jpg (+ _big, header photo)

#### Pedagogický sbor
- **URL:** https://www.gymskutec.cz/o-skole/zamestnanci-skoly/pedagogicky-sbor/
- **H1:** Pedagogický sbor
- **Status:** OK. Some mailto links differ from the displayed addresses (entries 5, 12, 14, 15, 31, 35).
- **Facts** (jméno – předměty – funkce – e-mail – konzultace):
  1. Mgr. Luděk Netolický – Bi, Bie, Tv – výchovný poradce – ludek.netolicky@gymskutec.cz – st 11.40–12.25
  2. Ing. Dagmar Kučerová – Ch, Chs – dagmar.kucerova@ – po 12.30–13.10
  3. Ing. Michaela Poslušná – Bi, Ch – TU prima – michaela.poslusna@ – pá 11.40–12.25
  4. Ing. František Krejčí, CSc. – Ch – frantisek.krejci@ – st 12.30–13.15
  5. Mgr. Zuzana Pospíšilová – Ikt, Ivt, Ad – TU kvinta – zuzana.pospisilova@ – čt 9.35–9.55
  6. Mgr. Lenka Krafková – Nj – TU kvarta – lenka.krafkova@ – st 14.00–14.30
  7. Mgr. Petr Krčmář – Aj, Ajk – TU 3. BP – petr.krcmar@ – pá 9.35–9.55
  8. Mgr. Šárka Jonešová – Zsv, Svs – ředitelka ŠPO – po 15.00–16.00
  9. Mgr. Radka Švadlenková – D – zástupkyně ředitelky – po 14.00–15.00
  10. Mgr. Kateřina Bálková – Nj – katerina.balkova@ – po 9.35–9.55
  11. Mgr. Romana Bartheldy – F – romana.bartheldy@ – po 9.35–9.55
  12. Mgr. Michaela Bohatá – Čj, D – michaela.bohata@ – čt 9.35–9.55
  13. Mgr. Daniel Čermák – Aj, Ajk, Nj – daniel.cermak@ – út 9.35–9.55
  14. PhDr. Mgr. Pavel Černý, DiS. – Pv, Bsp, Kri – pavel.cerny@ – čt 9.35–9.55
  15. PaedDr. Ivana Freiwaldová – Kri, Pp – ivana.freiwaldova@ – út 13.20–14.05
  16. Mgr. Pavlína Kořístková Burešová – Zsv, M – pavlina.koristkova_buresova@ – st 12.30–13.00
  17. Ing. Jiří Ligr – správce školní sítě – jiri.ligr@
  18. Mgr. et Mgr. Ondřej Matula – Zkk – ondrej.matula@ – st 9.35–9.55
  19. MgA. Ondřej Merta – Ikt – ondrej.merta@ – čt 9.35–9.55
  20. Bc. Markéta Požárová – asistentka pedagoga (on the page as "asistetka") – marketa.pozarova@
  21. Michaela Třísková – asistentka pedagoga; vychovatelka (Školní klub) – michaela.triskova@
  22. Mgr. Bc. Monika Čapková – Čj, Zsv, Sor, Lis – školní metodik prevence – monika.capkova@ – pá 10.45–11.30; speciálně ped. intervence po 10.45–11.45
  23. Bc. Lucie Dejdarová – Vv, Sor, Ov – TU tercie – lucie.dejdarova@ – po 9.35–9.55
  24. PhDr. Hana Burešová, Ph.D. – Čj, Lis – TU oktáva – hana.buresova@ – út 8.50–9.35
  25. Mgr. Kateřina Pokorná – Aj, Ajk – TU sekunda – katerina.pokorna@ – po 10.45–11.30
  26. Mgr. Věra Čechlovská – M – TU 4. BP – vera.cechlovska@ – st 12.30–13.15
  27. Mgr. Lenka Slavíková – Ad, Ek, Tv – lenka.slavikova@ – út 12.30–13.15
  28. Mgr. Milan Tůma – Bi, Bie, Bis, Ge, Z – TU sexta – milan.tuma@ – čt 8.50–9.35
  29. Mgr. Jana Suchánková – F, M, Mfs – TU septima – jana.suchankova@ – st 13.25–14.00
  30. Mgr. Anežka Kosová – Bi, F – anezka.kosova@ – út 11.40–12.25
  31. Bc. Th. Jan Pecháček – Sn – spirituál školy – jan.pechacek@ – st 15.00–16.00; čt 11.30–12.30; pá 13.30–15.00 (mimo první pátek v měsíci)
  32. Mgr. Viktor Kořístka – Čj, D, Mod – TU 1. BP – viktor.koristka@ – út 13.20–14.05
  33. Mgr. Petr Klimeš – Kri, Pv, Bsp – TU 2. BP; vedoucí učitel oboru BPČ – petr.klimes@ – po 13.20–14.05
  34. Mgr. Vladimír Opletal, DiS. – Z, Ges, Hv – vladimir.opletal@ – čt 13.20–14.05
  35. Bc. Petr Čapek – Se, Bsp – petr.capek@ – čt 11.40–12.25
  36. Miroslava Indrová – vedoucí vychovatelka (DM, Školní klub) – miroslava.indrova@
  37. Blanka Skalická – vychovatelka (DM) – blanka.skalicka@
  38. Renáta Pokorná – vychovatelka (DM, Školní klub) – renata.pokorna@
  39. Žaneta Špičková – vychovatelka (Školní klub)
  - All e-mail addresses are @gymskutec.cz.

#### Provozní zaměstnanci
- **URL:** https://www.gymskutec.cz/o-skole/zamestnanci-skoly/provozni-zamestnanci/
- **H1:** Provozní zaměstnanci
- **Status:** OK
- **Facts:**
  - Kancelář (1. patro):
    - Monika Modráčková – vedoucí provozně ekonomického úseku – 739 085 660, 731 604 645 – info@ / monika.modrackova@gymskutec.cz
    - Marta Poslušná – účetní ŠJ, účetní – 739 085 660, 604 684 792 – jidelna@ / marta.poslusna@gymskutec.cz
    - Ing. Jiří Ligr – IT služby, správa sítě – jiri.ligr@gymskutec.cz
  - Školní jídelna (přízemí): Žaneta Vodvárková (vedoucí kuchařka), Dana Doležalová, Gabriela Sudová
  - Technické zázemí: František Spilko (školník), Petra Horáková, Žaneta Špičková, Pavla Vyčichlová

### Spirituál školy
- **URL:** https://www.gymskutec.cz/o-skole/spiritual-skoly/
- **H1:** Spirituál školy
- **Status:** OK
- **Facts:**
  - Články:
    - "Podzimní duchovní obnova" (23. 9. 2026) – duchovní cvičení v karmelitánském klášteře
    - "Pozvání spirituála" (3. 9. 2026) – úvodní pozdrav spirituála a možnosti setkávání
  - Starší činnost na stránce "Půlhodinka s církví a další činnost spirituála"
- **Internal links:**
  - https://gymskutec.cz/o-skole/spiritual-skoly/podzimni-duchovni-obnova-583cs.html
  - https://gymskutec.cz/o-skole/spiritual-skoly/pozvani-spirituala-577cs.html
  - https://gymskutec.cz/o-skole/projekty/skolni-projekty/pulhodinky/pulhodinka-s-cirkvi-a-dalsi-cinnost-spirituala/
- **Images:** https://gymskutec.cz/evt_image.php?img=2781&width=500, https://gymskutec.cz/evt_image.php?img=2730&width=500

### Školní jídelna
- **URL:** https://www.gymskutec.cz/o-skole/skolni-jidelna/
- **H1:** Školní jídelna
- **Status:** OK
- **Facts:**
  - Vítězslava Nováka 584, 539 73 Skuteč; jidelna@gymskutec.cz; tel. 739 085 660
  - Přihlašování/odhlašování v aplikaci www.strava.cz (č. jídelny 5644)
  - Účet pouze pro stravné 35-1144231339/0800; nutný správný variabilní symbol
  - Ceny od 1. 1. 2026 (oběd / měsíc):
    - 7–10 let 34,00 Kč / 720,00 Kč
    - 11–14 let 37,00 Kč / 780,00 Kč
    - 15 a více 40,00 Kč / 840,00 Kč
    - cizí strávník 110,00 Kč
  - "Aktuální vyhlášky a hygienické předpisy jsou k nahlédnutí v kanceláři ŠJ."
- **Documents:**
  - Přihláška ke stravování (290,01 kB): https://gymskutec.cz/modules/file_storage/download.php?file=64e243fc%7C23&inline=1
  - Objednávkový formulář pro stravování o hlavních prázdninách (460,85 kB): https://gymskutec.cz/modules/file_storage/download.php?file=a61a21d0%7C24&inline=1
  - Vnitřní řád ŠJ od 1. 9. 2026 (322,55 kB): https://gymskutec.cz/modules/file_storage/download.php?file=207e8f14%7C25&inline=1
  - Provozní řád školní jídelny od 1. 1. 2026 (303,84 kB): https://gymskutec.cz/modules/file_storage/download.php?file=615b22c7%7C26&inline=1
  - Seznam potravinových alergenů (586,42 kB): https://gymskutec.cz/modules/file_storage/download.php?file=9bd5d061%7C27&inline=1
- **Images:** https://gymskutec.cz/data/editor/211cs_1.jpg (QR kód pro platby od 1. 1. 2026)
- **External:** https://www.strava.cz/strava5/Jidelnicky?zarizeni=5644

### Domov mládeže
- **URL:** https://www.gymskutec.cz/o-skole/domov-mladeze/
- **H1:** Domov mládeže
- **Status:** OK
- **Facts:**
  - Ubytování ve dvou a třílůžkových pokojích; toalety a sprchy na patrech; kuchyňka, studovna, wifi v celé budově, posilovna, ŠJ v areálu
  - "Ubytování ve školním roce 2025/2026 začíná v neděli 31. srpna 2025 od 17 hodin." (the page shows a past school year)
  - Vedoucí vychovatelka Miroslava Indrová, tel. 724 905 528; vychovatelky Blanka Skalická, Renáta Pokorná
- **Documents:**
  - Přihláška do domova mládeže (PDF, 915.5 kB): https://www.gymskutec.cz/e_download.php?file=/data/editor/185cs_3.pdf&original=p%C5%99ihl%C3%A1%C5%A1ka-DM.pdf
  - Vnitřní řád domova mládeže (PDF, 330.03 kB): https://www.gymskutec.cz/e_download.php?file=/data/editor/185cs_1.pdf&original=2026%C5%A1j08%20-%20Vnit%C5%99n%C3%AD%20%C5%99%C3%A1d%20domova%20ml%C3%A1de%C5%BEe%20-%20%C3%BAprava.pdf
- **Images:** https://www.gymskutec.cz/data/editor/185cs_3.jpg, 185cs_5.jpg, 185cs_6.jpg, 185cs_7.jpg, 185cs_8.jpg (Ubytování); 185cs_9.jpg, 185cs_10.jpg, 185cs_11.jpg (Kuchyňka)

### Školní poradenské pracoviště
- **URL:** https://www.gymskutec.cz/o-skole/skolni-poradenske-pracoviste/
- **H1:** Školní poradenské pracoviště
- **Status:** OK. The three subpages were not fetched separately.
- **Facts:**
  - Tel. 739 085 660
  - Výchovný poradce Mgr. Luděk Netolický (ludek.netolicky@gymskutec.cz)
  - Školní metodik prevence Mgr. et Bc. Monika Čapková (monika.capkova@gymskutec.cz; the mailto points to m.capkova@gymskutec.cz). Konzultace po 10.45–11.45.
  - Preventivní tým: M. Čapková, L. Netolický, Bc. Th. Jan Pecháček, vedení školy. Externě Mgr. Jana Kopecká, MBA (psychoterapeutka a krizová interventka).
  - Spolupráce: Poradna pro rodinu Pardubického kraje (the page shows the incomplete link "https://poradnapardubice/"), Fokus
  - Instagram https://www.instagram.com/gsrmr_metodik_prevence/
  - Nástěnka prevence v 1. patře u kopírky
  - Elektronická schránka důvěry pouze pro žáky (lze anonymně)
- **Internal links:**
  - https://www.gymskutec.cz/o-skole/skolni-poradenske-pracoviste/minimalni-preventivni-program/
  - https://www.gymskutec.cz/o-skole/skolni-poradenske-pracoviste/informace-pro-rodice/
  - https://www.gymskutec.cz/o-skole/skolni-poradenske-pracoviste/psychologicke-poradenstvi/

### Školská rada
- **URL:** https://www.gymskutec.cz/o-skole/skolska-rada/
- **H1:** Školská rada
- **Status:** OK. Member names are only in a linked record/image.
- **Facts:**
  - Dle zákona č. 561/2004 Sb., § 167 a § 168
  - Pravomoci:
    - vyjadřuje se k výroční zprávě, ŠVP, školnímu řádu a pravidlům hodnocení
    - podílí se na koncepci rozvoje
    - vyjadřuje se k hospodaření
    - projednává inspekční zprávy ČŠI, podněty a stížnosti
    - podává návrh na vyhlášení konkursu na ředitele
  - Podněty e-mailem na rada@gymskutec.cz. Uveďte, koho se věc týká, jaké pravidlo je podle vás porušeno a jaký výsledek očekáváte. Anonymní podněty nelze zpětně vyřídit.
  - Složení: zástupci zřizovatele, pedagogů, zákonných zástupců a zletilých žáků. Aktualizace 1. 12. 2025.
- **Internal links:** https://gymskutec.cz/o-skole/skolska-rada/slozeni-skolske-rady-323cs.html
- **Documents:** Volební řád (PDF, 210.63 kB): https://gymskutec.cz/e_download.php?file=/data/editor/160cs_1.pdf&original=2019%C5%A1j01%20Volebn%C3%AD%20%C5%99%C3%A1d%20%C5%A0R.pdf
- **Images:** https://gymskutec.cz/evt_image.php?img=2605&width=500 (Aktuální složení Školské rady)

### Žákovský parlament
- **URL:** https://www.gymskutec.cz/o-skole/zakovsky-parlament/
- **H1:** Žákovský parlament
- **Status:** OK
- **Facts / articles:**
  - 7. 10. 2024 – Úvodní schůzka žákovského parlamentu 2024/25 (schůzka ve středu 25. 9. 2024) – /o-skole/zakovsky-parlament/uvodni-schuzka-zakovskeho-parlamentu-2024-25-531cs.html – img 2387
  - 5. 4. 2023 – Žákovský parlament (setkání s velkopřevorem Fra Pierrem de Bizemont, návštěva 28. 3. 2023) – .../zakovsky-parlament-507cs.html – img 2240
  - 2. 9. 2020 – První schůzka žákovského parlamentu (středa 23. září v 9.40 v čajovně) – .../prvni-schuzka-zakovskeho-parlamentu-436cs.html
  - 2. 2. 2020 – Žákovský parlament – .../zakovsky-parlament-409cs.html – img 1891
  - 20. 9. 2019 – Žákovský parlament 2019/20 (první schůzka 18. 9. 2019) – .../zakovsky-parlament-2019-20-371cs.html
  - 21. 12. 2018 – Žákovský parlament 2018/19 – .../zakovsky-parlament-2018-19-297cs.html – img 1509
  - 27. 2. 2018 – Žákovský parlament 2017/18 (funguje od září 2017, každá třída volí 2 zástupce) – .../zakovsky-parlament-2017-18-193cs.html – img 980
- **Images:** /evt_image.php?img=<ID>&width=500 for the IDs above

### Projekty (školní projekty)
- **URL:** https://www.gymskutec.cz/o-skole/projekty/skolni-projekty/
- **H1:** Školní projekty
- **Status:** OK (index only; the subpages were not fetched)
- **Internal links** (prefix https://gymskutec.cz/o-skole/projekty/skolni-projekty/):
  - zahranicni-vymena/, etwinning/, pribehy-bezpravi-1/, maraton-psani-dopisu-1/, studentske-volby-1/, sdruzeni-tereza-tajny-zivot-mesta/, ekoskola/, recyklohrani/, putovni-vystavy-zidovskeho-muzea-v-praze/, projekt-krokus/, fyzika-trochu-jinak/, soutez-pri-vyuce-biologie/, charitativni-akce/, literarni-projekt-bible/, pulhodinky/pulhodinka-s-cirkvi-a-dalsi-cinnost-spirituala/, tridni-casopisy-1/, pamet-naroda/
  - Also https://gymskutec.cz/o-skole/projekty/projekty-eu/ and https://gymskutec.cz/o-skole/projekty/projekty-eu-sablony/
- **Facts:** Čerpání EU (OP VVV) na modernizaci výuky

### Fotogalerie
- **URL:** https://www.gymskutec.cz/o-skole/fotogalerie/
- **H1:** Fotogalerie
- **Status:** OK (index only; the albums were not fetched)
- **Internal links:**
  - https://gymskutec.cz/o-skole/fotogalerie/ucebny/
  - https://gymskutec.cz/o-skole/fotogalerie/galerie-pozvanek/
  - Archiv https://gymskutec.cz/o-skole/fotogalerie/archiv/ with albums: 3-fairtradeova-kavarna/ ("Tentokrát s Vlajkou pro Tibet"), maturitni-ples-2015/, majales-2015/, cteni-v-ms/, seznamovaci-kurz-2014/, skolni-budova/, diplomy-a-oceneni/, majales-2014/, detska-majalesova-olympiada-2014/, prodejni-vystava-zalozek/
- **Images:** no gallery photos on the index page

### Pro dárce a sponzory
- **URL:** https://www.gymskutec.cz/o-skole/pro-darce-a-sponzory/
- **H1:** Pro dárce a sponzory
- **Status:** OK
- **Facts:**
  - "Všem případným dárcům a sponzorům velice děkujeme za jakoukoliv podporu škole (finanční, materiální, službami...)."
  - Účet 1144231339/0800
  - Kancelář tel. 469 326 360 (an older number, differs from 739 085 660 elsewhere)
  - No sponsor names are given.
- **Documents:** Darovací smlouva (PDF, 82.6 kB): https://gymskutec.cz/e_download.php?file=/data/editor/156cs_2.pdf&original=Darovac%C3%AD%20smlouva.pdf

### Dokumenty školy
- **URL:** https://www.gymskutec.cz/o-skole/dokumenty-skoly/
- **H1:** Dokumenty školy
- **Status:** PARTIAL (only the listing; the record pages were not fetched)
- **Facts / records:**
  - Školní řád platný od 1. 9. 2026 (31. 8. 2026, kat. Školní řád): /o-skole/dokumenty-skoly/skolni-rad-platny-od-1-9-2026-6.html
  - ŠVP (1. 1. 2026, kat. Školní vzdělávací program): /o-skole/dokumenty-skoly/svp-8.html
  - Výroční zprávy (5. 9. 2025, kat. Ostatní): /o-skole/dokumenty-skoly/vyrocni-zpravy-5.html
- **Internal links:** /o-skole/dokumenty-skoly/-/aktualni/

### E-podatelna
- **URL:** https://www.gymskutec.cz/o-skole/e-podatelna/
- **H1:** E-podatelna
- **Status:** OK
- **Facts:**
  - Adresa: V. Nováka 584, 53973 Skuteč; ID DS 8t69bd7; e-podatelna info@gymskutec.cz
  - Úřední hodiny po–pá 9:00–10:00
  - Formáty: PDF, PDF/A, DOC, DOCX, RTF, TXT, JPG/JPEG, PNG, XLS, XLSX; max. 10 MB
  - The "fyzické nosiče" field is empty on the page.
  - Vadné zprávy se nezpracovávají, pokud vadu nelze odstranit s odesílatelem
  - Cituje § 37 zák. č. 500/2004 Sb.

### Povinné informace
- **URL:** https://www.gymskutec.cz/o-skole/povinne-informace/
- **H1:** Povinné informace
- **Status:** OK
- **Facts:**
  - Zřizovatel: Suverénní řád Maltézských rytířů – České velkopřevorství, Velkopřevorské náměstí 485/4, 118 00 Praha 1 – Malá Strana, IČO 00569623
  - IČO školy 71341064; "Nejsme plátci DPH."
  - Organizační struktura: Gymnázium, Domov mládeže, Školní jídelna
  - Tel. +420 739 085 660, DM +420 724 905 528, info@gymskutec.cz, ID DS 8t69bd7
  - Úřadovna po–pá 9:00–10:00; žádosti o informace po–pá 8:00–14:00
  - Účty (Česká spořitelna, a.s.): stravné a ubytování 35-1144231339/0800; platby od žáků 6689078349/0800
  - "Sazebník úhrad za poskytování informací nebyl vydán."

---

## Školní akce

### Školní akce – galerie
- **URL:** https://www.gymskutec.cz/skolni-akce/skolni-akce-galerie/
- **H1:** Školní akce – galerie
- **Status:** OK (15 entries, no pagination)
- **Facts / entries** (date – title – number of photos – URL):
  - 14. 10. 2026 – Finále soutěže Máš na to! – 4 – .../finale-souteze-mas-na-to-586cs.html
  - 14. 10. 2026 – Cesty k vědě a výzkumu – 5 – .../cesty-k-vede-a-vyzkumu-585cs.html
  - 23. 9. 2026 – Seznamovací kurz – 4 – .../seznamovaci-kurz-584cs.html
  - 16. 9. 2026 – Středoškolský atletický pohár – 5 – .../stredoskolsky-atleticky-pohar-581cs.html
  - 13. 9. 2026 – Nový žákovský parlament – 1 – .../novy-zakovsky-parlament-579cs.html
  - 3. 9. 2026 – Slavnostní zahájení školního roku – 2 – .../slavnostni-zahajeni-skolniho-roku-580cs.html
  - 25. 6. 2026 – Kurz přežití ve Zbraslavicích – 11 – .../kurz-preziti-ve-zbraslavicich-576cs.html
  - 27. 4. 2026 – Larischova vila – 4 – .../larischova-vila-572cs.html
  - 24. 4. 2026 – Noc s Andersenem 2026 – 16 – .../noc-s-andersenem-2026-570cs.html
  - 18. 2. 2026 – Lyžařský kurz 2026 – 5 – .../lyzarsky-kurz-2026-565cs.html
  - 5. 1. 2026 – Střelecký výcvik 4. BP – 9 – .../strelecky-vycvik-4-bp-562cs.html
  - 8. 10. 2025 – 25 LET GYMNÁZIA – 3 – .../25-let-gymnazia-557cs.html
  - 23. 4. 2025 – Studentská kavárna – 6 – .../studentska-kavarna-548cs.html
  - 23. 4. 2025 – Vojáci na Gymnáziu v rámci projektu POKOS – 12 – .../vojaci-na-gymnaziu-v-ramci-projektu-pokos-547cs.html
  - 20. 11. 2024 – Workshop 2024 – den s Policií České republiky, fyzické testy – 4 – .../workshop-2024-den-s-policii-ceske-republiky-fyzicke-testy-537cs.html
  - All URLs are under https://www.gymskutec.cz/skolni-akce/skolni-akce-galerie/
- **Images** (thumbnail `&width=540&height=540&box=2`), in the order above: img 2794, 2786, 2783, 2772, 2766, 2768, 2719, 2705, 2697, 2653, 2610, 2558, 2495, 2489, 2426

### Zahraniční zájezdy
- **URL:** https://www.gymskutec.cz/skolni-akce/zahranicni-zajezdy/
- **H1:** Zahraniční zájezdy
- **Status:** OK
- **Facts:**
  - Cílem je poznat rozmanitost evropské kultury a autenticky se učit jazyky
  - Galerie:
    - 15. 10. 2025 – Zájezd do Francie 2025 (19 fotografií) – zajezd-do-francie-2025-558cs.html – img 2582
    - 2. 10. 2024 – Expedice Skotsko 2024 (9) – expedice-skotsko-2024-530cs.html – img 2375
    - 2. 9. 2024 – Předvánoční Vídeň 12/25 (4) – predvanocni-viden-12-25-563cs.html – img 2618 (the date and title look inconsistent on the page)
    - 13. 4. 2023 – Zájezd do Anglie 2023 (14) – zajezd-do-anglie-2023-509cs.html – img 2254
    - 27. 9. 2019 – Zájezd do Anglie pro žáky nižšího gymnázia (2) – zajezd-do-anglie-pro-zaky-nizsiho-gymnazia-366cs.html – img 1780

### Projekty
- **URL:** https://www.gymskutec.cz/skolni-akce/projekty/
- **Status:** INACCESSIBLE / not fetched (parent page)

#### Projekty EU
- **URL:** https://www.gymskutec.cz/skolni-akce/projekty/projekty-eu/
- **H1:** Projekty EU
- **Status:** OK
- **Facts:**
  - OP Výzkum, vývoj a vzdělávání, reg. č. CZ.02.3.68/0.0/0.0/16_035/0007919, "Zvýšení kvality péče o studenty Gymnázia Suverénního řádu maltézských rytířů ve Skutči." (2017–2019)
  - Doučování, fiktivní firmy, vzdělávací kurzy, tandemová výuka, školní asistent a speciální pedagog
  - Probíhá závěrečné monitorování
- **Documents:** "Jak pomohli EU a ESF naší obci" (OP Zaměstnanost), PDF 79.09 kB (site-wide link)

#### Projektové dny
- **URL:** https://www.gymskutec.cz/skolni-akce/projekty/skolni-projekty/projektove-dny/
- **H1:** Projektové dny
- **Status:** OK
- **Facts:**
  - 10. 12. 2024 – Den lidských práv – Nebeští jezdci (12 fotografií) – .../den-lidskych-prav-nebesti-jezdci-540cs.html – img 2452
  - 20. 11. 2024 – Oslavy 17. listopadu (6) – .../oslavy-17-listopadu-539cs.html – img 2427
  - 18. 11. 2019 – Festival svobody (16) – .../festival-svobody-373cs.html – img 1841

#### Other Projekty subpages (not fetched)
Charitativní projekty, Ježíškova vnoučata, Další..., Ekoškola, Recyklohraní, eTwinning, Záložka do knihy..., Třídní časopisy. All are under https://www.gymskutec.cz/skolni-akce/projekty/skolni-projekty/; see "Not retrieved".

### Soutěže
- **URL:** https://www.gymskutec.cz/skolni-akce/souteze/
- **H1:** Soutěže
- **Status:** OK (index only, no articles)
- **Internal links:**
  - https://www.gymskutec.cz/skolni-akce/souteze/prirodovedne-souteze/
  - https://www.gymskutec.cz/skolni-akce/souteze/jazykove-souteze-1/
  - https://www.gymskutec.cz/skolni-akce/souteze/umelecke-souteze-1/
  - https://www.gymskutec.cz/skolni-akce/souteze/sportovni-souteze-1/
  - https://www.gymskutec.cz/skolni-akce/souteze/konference/

### Studentské kavárny
- **URL:** https://www.gymskutec.cz/skolni-akce/studentske-kavarny/
- **H1:** Studentské kavárny
- **Status:** OK
- **Facts:**
  - 2. 2. 2020 – Pololetní kavárna (pořádala Oktáva) – pololetni-kavarna-412cs.html – img 1897
  - 25. 10. 2019 – Halloweenská kavárna (septima) – halloweenska-kavarna-378cs.html – img 1819
  - 26. 9. 2019 – Svatováclavská kavárna (3.BP) – svatovaclavska-kavarna-367cs.html – img 1783

### Sportovní akce
- **URL:** https://www.gymskutec.cz/skolni-akce/sportovni-akce/
- **H1:** Sportovní akce
- **Status:** OK
- **Facts:**
  - 28. 10. 2020 – Vodácký kurz 2020 (kvůli koronaviru přesunut na září; 14.–17. září, oktáva a 4. BP, Vyšší Brod, 3 učitelé) – vodacky-kurz-2020-443cs.html – img 1972
  - 20. 9. 2019 – Středoškolský atletický pohár (okresní kolo, Chrudim) – stredoskolsky-atleticky-pohar-370cs.html – img 1799

---

## Studium

### Pro uchazeče
- **URL:** https://www.gymskutec.cz/studium/pro-uchazece-1/
- **H1:** Pro uchazeče
- **Status:** OK
- **Facts:**
  - Obory pro šk. rok 2027/28:
    - 79-41-K/81 GYMNÁZIUM OSMILETÉ (z 5. tříd ZŠ)
    - 79-41-K/41 GYMNÁZIUM ČTYŘLETÉ (z 9. tříd)
    - 68-42-M/01 BEZPEČNOSTNĚ PRÁVNÍ ČINNOST (z 9. tříd)
  - Články:
    - Informace o studiu živě (17. 9. 2026)
    - Informace o nabízených oborech (1. 9. 2026)
    - Přijímací řízení (28. 8. 2026; "Informace budou zveřejňovány postupně dle harmonogramu MŠMT.") – prijimaci-rizeni-542cs.html
    - Školní přijímací zkouška pro uchazeče o obor BPČ (1. 1. 2026) – skolni-prijimaci-zkouska-pro-uchazece-o-obor-bpc-474cs.html
    - Informace pro uchazeče z Ukrajiny (1. 1. 2026; JPZ dle Opatření obecné povahy) – informace-pro-uchazece-z-ukrajiny-544cs.html – img 2456
    - Naše škola Vám nabízí... (1. 8. 2023) – nase-skola-vam-nabizi-392cs.html
- **Documents:** "Co s námi můžete zažít..." (PDF): https://gymskutec.cz/e_download.php?file=/data/editor/164cs_1.pdf&original=Gymn%C3%A1zium%20Suver%C3%A9nn%C3%ADho%20%C5%99%C3%A1du%20malt%C3%A9zsk%C3%BDch%20ryt%C3%AD%C5%99%C5%AF%20ve%20Skut%C4%8Di.pdf
- **Images:** https://gymskutec.cz/data/editor/164cs_3.png (+ _big, Gymnázium), https://gymskutec.cz/data/editor/164cs_4.png (+ _big, BPČ)

### Harmonogram školního roku
- **URL:** https://www.gymskutec.cz/studium/harmonogram-skolniho-roku/
- **H1:** Harmonogram školního roku
- **Status:** PARTIAL. The dates are only in images and a PDF.
- **Facts:**
  - Článek "Harmonogram školního roku 2026/27" (31. 8. 2026): https://www.gymskutec.cz/studium/harmonogram-skolniho-roku/harmonogram-skolniho-roku-2026-27-434cs.html
  - The article shows "1. pololetí" and "2. poletí" (sic) as images.
- **Documents:** Harmonogram školního roku (PDF, 178.76 kB): https://www.gymskutec.cz/evt_file.php?file=2729
- **Images:** https://www.gymskutec.cz/evt_image.php?img=2727, https://www.gymskutec.cz/evt_image.php?img=2728

### Maturitní zkouška
- **URL:** https://www.gymskutec.cz/studium/maturitni-zkouska/
- **H1:** Maturitní zkouška
- **Status:** OK (listing only)
- **Facts:**
  - "Aktuální informace k maturitní zkoušce v jarním termínu 2027 budou zveřejňovány dle harmonogramu."
  - 31. 8. 2026 – MATURITNÍ ZKOUŠKA 2027 – BEZPEČNOSTNĚ PRÁVNÍ ČINNOST: https://gymskutec.cz/studium/maturitni-zkouska/maturitni-zkouska2027-bezpecnostne-pravni-cinnost-554cs.html
  - 31. 8. 2026 – MATURITNÍ ZKOUŠKA 2027 – GYMNÁZIUM: https://gymskutec.cz/studium/maturitni-zkouska/maturitni-zkouska-2027-gymnazium-553cs.html
  - 7. 4. 2026 – KRITÉRIA HODNOCENÍ MZ 2026: https://gymskutec.cz/studium/maturitni-zkouska/kriteria-hodnoceni-mz-2026-567cs.html
  - 1. 12. 2025 – Přihláška k maturitní zkoušce: https://gymskutec.cz/studium/maturitni-zkouska/prihlaska-k-maturitni-zkousce-385cs.html

### Odborná praxe BPČ
- **URL:** https://www.gymskutec.cz/studium/odborna-praxe-bpc/
- **H1:** Odborná praxe BPČ
- **Status:** OK
- **Facts:**
  - Zajištění praxe: Mgr. Šárka Jonešová, Mgr. Petr Klimeš, Mgr. Luděk Netolický
  - 7. 9. 2026 – Odborná praxe 4.BP ("Pokyny k povinné praxi ve 4. ročníku."): https://gymskutec.cz/studium/odborna-praxe-bpc/odborna-praxe-4bp-552cs.html – img 2521
  - 2. 4. 2026 – Odborná praxe 3. BP ("Pokyny a formuláře k vykonání praxe."): https://gymskutec.cz/studium/odborna-praxe-bpc/odborna-praxe-3-bp-566cs.html – img 2660

### Předměty
- **URL:** https://www.gymskutec.cz/studium/predmety/
- **H1:** Předměty
- **Status:** OK (index; the subject subpages were not fetched)
- **Facts:**
  - Seznam předmětů a doporučených učebnic
  - Některé učebnice lze hromadně objednat výhodněji
  - Každoroční burza učebnic na začátku roku
  - "Stránky jsou ve výstavbě, seznam předmětů bude dále doplňován."
- **Internal links** (prefix https://www.gymskutec.cz/studium/predmety/): cesky-jazyk-a-literatura/, anglicky-jazyk/, nemecky-jazyk/, latina/, svetova-nabozenstvi/, zaklady-krestanske-kultury/, zaklady-spolecenskych-ved/, dejepis/, zemepis/, biologie/, matematika/, odborne-predmety-bpc/ (with subpages bezpecnostni-a-strelecka-priprava/, kriminalistika-a-kriminologie/, pedagogika-a-psychologie/, sebeobrana/)

### Nepovinné předměty a zájmové kroužky
- **URL:** https://www.gymskutec.cz/studium/nepovinne-predmety-a-zajmove-krouzky/
- **H1:** Nepovinné předměty a zájmové kroužky
- **Status:** PARTIAL. Details are in the article, which was not fetched.
- **Facts:** Článek "Zájmové kroužky při školním klubu 2025/26" (6. 10. 2025; "Hudba, sport, jazyky, šachy nebo chemická laboratoř…"): https://www.gymskutec.cz/studium/nepovinne-predmety-a-zajmove-krouzky/zajmove-krouzky-pri-skolnim-klubu-2025-26-498cs.html – img 2590

### Úspěchy a aktivity žáků i absolventů
- **URL:** https://www.gymskutec.cz/studium/uspechy-a-aktivity-zaku-i-absolventu/
- **H1:** Úspěchy a aktivity žáků i absolventů
- **Status:** OK (index)
- **Facts:** Galerie mimoškolních aktivit žáků a absolventů, které pomáhají při přijímacím řízení na VŠ
- **Internal links** (prefix https://www.gymskutec.cz/studium/uspechy-a-aktivity-zaku-i-absolventu/): m-hrubantova-od-fotografie-k-filmu/, s-rudou-pozarem-nejen-o-hudbe/, jarka-naghi-ja-a-rumunsko/, almanach-sexty-2015-16/, dalsi-studentske-prace/. Also /o-skole/fotogalerie/archiv/diplomy-a-oceneni/ and /skolni-akce/souteze/.
- **Images:** https://gymskutec.cz/data/editor/35csabove_1.jpg

### Zajímavé odkazy
- **URL:** https://www.gymskutec.cz/studium/zajimave-odkazy/
- **H1:** Zajímavé odkazy
- **Status:** OK
- **Facts:**
  - Rozcestník externích zdrojů po předmětech: Anglický jazyk (~19 odkazů, např. Duolingo, helpforenglish.cz, BBC Learning English), Globální problémy/environmentalistika (rozvojovka.cz, ecn.cz, ekolist.cz, hraozemi.cz, ochranaprirody.cz), Zeměpis (CIA Factbook, aldebaran.cz, chmi.cz, czso.cz, Eurostat, National Geographic...), Dějepis a ZSV (holocaust.cz, totalita.cz...), Český jazyk a literatura (~28 odkazů, např. iliteratura.cz, prirucka.ujc.cas.cz), Matematika a informatika (2), Nezařazeno (Ableton Learning Music, online-convert, Khan Academy, Memrise)
  - Many of the links are old http:// URLs.
  - Tipy na odkazy: the displayed address is pavla.koristkova@gymskutec.cz but the mailto points to pavlina.buresova@gmail.com (mismatch on the page).

### Suplování
- **URL:** https://www.gymskutec.cz/studium/suplovani/
- **H1:** Suplování
- **Status:** OK
- **Facts / links:**
  - Změny rozvrhu – suplování: http://gymskutec.bakalari.cz/next/zmeny.aspx
  - Rozvrhy tříd: http://gymskutec.bakalari.cz/timetable/public

### Formuláře ke stažení
- **URL:** https://www.gymskutec.cz/studium/formulare-ke-stazeni/
- **H1:** Formuláře ke stažení
- **Status:** OK
- **Facts:** Formuláře (labelled "školní rok 2021/22"), all PDF, under https://gymskutec.cz/modules/file_storage/download.php?file=…&inline=1:
  - LVK - náhradní plnění - potvrzení (106,11 kB) `3dc784ff%7C1`
  - LVK - náhradní plnění - žák (124,91 kB) `3c6f4c0d%7C2`
  - Oznámení o přestupu (110,48 kB) `26293ec7%7C3`
  - Žádost o dlouhodobé uvolnění (89,79 kB) `f714a873%7C4`
  - Žádost o duplikát - ročníkové vysvědčení (95,05 kB) `417671cf%7C6`
  - Žádost o duplikát maturitního vysvědčení (100,27 kB) `c9517727%7C19`
  - Žádost o individuální vzdělávací plán (104,06 kB) `81654929%7C7`
  - Žadost o ISIC (1,94 MB) `7318ab8e%7C21`
  - Žádost o krátkodobé uvolnění (30,81 kB) `f01fc1af%7C18`
  - Žádost o náhradní termín (218,82 kB) `b3be41e3%7C22`
  - Žádost o opakování ročníku (117,07 kB) `d950f545%7C20`
  - Žádost o přerušení vzdělávání (101,92 kB) `d9b321e0%7C9`
  - Žádost o přestup (227,62 kB) `644ab18f%7C16`
  - Žádost o přijetí do vyššího ročníku (113,18 kB) `fc18b868%7C10`
  - Žádost o uvolnění z LVK (103,46 kB) `f9c5e69a%7C11`
  - Žádost o uvolnění z Tv (116,89 kB) `6c9d2e92%7C12`
  - Žádost o změnu oboru (113,59 kB) `d43cc4e2%7C13`

### Europass
- **URL:** https://www.gymskutec.cz/studium/europass/
- **H1:** Europass (dodatek k maturitě)
- **Status:** OK
- **Facts:**
  - Dodatek k osvědčení (maturitnímu vysvědčení); stejný pro všechny absolventy oboru (kód a název oboru, adresa školy, bez jména)
  - Popisuje kompetence a uplatnění; uvádí úroveň EQF (http://www.nuv.cz/eqf)
- **Internal links:** Europass (4. 6. 2025): https://gymskutec.cz/studium/europass/europass-549cs.html

---

## Pro žáky a rodiče
- **URL:** https://www.gymskutec.cz/pro-zaky-a-rodice/
- **H1:** Pro žáky a rodiče
- **Status:** PARTIAL. The page has almost no content of its own beyond blocks; no articles and no pagination.
- **Facts:** Blok "Provoz kanceláře školy" (image only) and a link to the teachers' consultation hours (/o-skole/zamestnanci-skoly/pedagogicky-sbor/)
- **Images:** https://gymskutec.cz/data/multipage/editor/editor-5-363-cs_2.png (provoz kanceláře; the hours are probably only in the image)

---

## Kontakty

### Kontaktní informace
- **URL:** https://www.gymskutec.cz/kontakty/kontaktni-informace/
- **H1:** Kontaktní informace
- **Status:** OK
- **Facts:**
  - Gymnázium Suverénního řádu maltézských rytířů ve Skutči, Vítězslava Nováka 584, 539 73 Skuteč
  - info@gymskutec.cz; kancelář/ŠJ 739 085 660; DM 724 905 528
  - Účty:
    - platby žáků: the page shows **66899078349/0800**, which does not match 6689078349/0800 on the Základní informace and Povinné informace pages (likely a typo on this page)
    - ŠJ (stravné a ubytování) 35-1144231339/0800
  - The page does not give office hours, data box, IČO or a map.

### Napište nám
- **URL:** https://www.gymskutec.cz/kontakty/napiste-nam/
- **H1:** Napište nám
- **Status:** OK
- **Facts:**
  - "Kontaktní formulář slouží k zaslání Vašeho dotazu či žádosti."
  - Pole: Jméno a příjmení*, Kontakt* (Adresa: Ulice, Obec/Město, PSČ / Telefon / E-mail – vyplnit jen jednu možnost), Předmět*, Obsah*, Odeslat

---

## News articles

The site has no dedicated news listing: https://www.gymskutec.cz/aktuality/ and https://www.gymskutec.cz/novinky/ both return **404**. News appears as the "Aktuality" block on the homepage and as dated articles (`-<ID>cs.html`) inside the section listings. Below are the articles found (newest first). "Detail fetched" means the article page itself was read. The other entries come from the listing summaries only.

1. **Finále soutěže Máš na to!** – 14. 10. 2026 (finále 24. 9. 2026) – https://www.gymskutec.cz/skolni-akce/skolni-akce-galerie/finale-souteze-mas-na-to-586cs.html – Detail fetched.
   - Celostátní finále soutěže Policie ČR pro SŠ v Olymp Centru sportu MV: 126 závodníků ve 42 týmech; disciplíny 4×10 m, kliky, 2min cvičení, 1 000 m.
   - Školu (za Pardubický kraj) reprezentovali Michaela Máslová, Lukáš Hron a Matouš Klouček. Their placing is not stated.
   - Ceny předávali ministr vnitra Lubomír Metnar a policejní prezident Martin Vondrášek.
   - Images: /evt_image.php?img=2794, 2795, 2796, 2797
2. **Cesty k vědě a výzkumu** – 14. 10. 2026 (akce ve středu 9. 9. 2026) – https://www.gymskutec.cz/skolni-akce/skolni-akce-galerie/cesty-k-vede-a-vyzkumu-585cs.html – Detail fetched.
   - Workshopy Univerzity Pardubice pro sextu, septimu a oktávu.
   - Představily se fakulty chemicko-technologická, dopravní Jana Pernera, zdravotnických studií a filozofická.
   - Images: img 2786, 2788, 2789, 2790, 2792
3. **Seznamovací kurz** – 23. 9. 2026 – https://www.gymskutec.cz/skolni-akce/skolni-akce-galerie/seznamovaci-kurz-584cs.html – Detail fetched.
   - "Momentky ze seznamovacích aktivit..." The page gives no place or classes.
   - Images: img 2782, 2783, 2784, 2785
4. **Podzimní duchovní obnova** – 23. 9. 2026 – https://www.gymskutec.cz/o-skole/spiritual-skoly/podzimni-duchovni-obnova-583cs.html – Detail fetched.
   - "Duchovní cvičení v karmelitánském klášteře." Details are only on the poster image.
   - Image: img 2781
5. **Informace o studiu živě** – 17. 9. 2026 – https://www.gymskutec.cz/studium/pro-uchazece-1/informace-o-studiu-zive-582cs.html – Detail fetched.
   - DOD čtvrtek 26. 11. 2026 12–17 a sobota 9. 1. 2027 9–13.
   - Přehlídky SŠ:
     - Svitavy 15. 10. 2026 (Fabrika)
     - Pardubice 16.–17. 10. 2026 (Ideon)
     - Havlíčkův Brod 20. 10. 2026 (Ostrov)
     - Chrudim 21. 10. 2026 (Muzeum)
   - Online setkání 27. 1. 2027 v 18:00 (MS Teams).
   - Images: img 2775, 2776, 2777
6. **Středoškolský atletický pohár** – 16. 9. 2026 (závod 15. 9. 2026) – https://www.gymskutec.cz/skolni-akce/skolni-akce-galerie/stredoskolsky-atleticky-pohar-581cs.html – Detail fetched.
   - Okresní kolo v Chrudimi: chlapci 2. místo a postup do krajského kola, dívky bronz.
   - Výsledky: https://online.atletika.cz/vysledky/90959
   - Images: img 2770–2774
7. **Nový žákovský parlament** – 13. 9. 2026 – https://www.gymskutec.cz/skolni-akce/skolni-akce-galerie/novy-zakovsky-parlament-579cs.html – Listing only (1 photo; img 2766).
8. **Odborná praxe 4.BP** – 7. 9. 2026 – https://gymskutec.cz/studium/odborna-praxe-bpc/odborna-praxe-4bp-552cs.html – Listing only. "Pokyny k povinné praxi ve 4. ročníku." img 2521.
9. **Slavnostní zahájení školního roku** – 3. 9. 2026 – https://www.gymskutec.cz/skolni-akce/skolni-akce-galerie/slavnostni-zahajeni-skolniho-roku-580cs.html – Detail fetched.
   - Školní rok 2026/2027 zahájen slavnostní bohoslužbou za účasti biskupa Prokopa.
   - Mši sloužil nový spirituál P. Jan Pecháček; přítomen zástupce zřizovatele Alessandro Soggia; hudba "Thomas company".
   - Images: img 2768, 2769
10. **Pozvání spirituála** – 3. 9. 2026 – https://gymskutec.cz/o-skole/spiritual-skoly/pozvani-spirituala-577cs.html – Listing only. Úvodní pozdrav spirituála; img 2730.
11. **Informace o nabízených oborech** – 1. 9. 2026 (aktualizace 14. 10. 2026) – https://www.gymskutec.cz/studium/pro-uchazece-1/informace-o-nabizenych-oborech-408cs.html – Detail fetched.
    - Obory:
      - 79-41-K/81 osmileté (z 5. tříd, třídy cca 15 žáků)
      - 79-41-K/41 čtyřleté (z 9. tříd nebo kvarty víceletých gymnázií)
      - 68-42-M/01 BPČ (maturita; uplatnění u policie, Policejní akademie a právní VŠ)
    - Přílohy (URLs not captured): Učební plán G 24-25.pdf (206.1 kB), učební plán G.pdf (208.29 kB), učební plán BPČ.pdf (202.99 kB). Main image img 2411.
12. **Harmonogram školního roku 2026/27** – 31. 8. 2026 – https://www.gymskutec.cz/studium/harmonogram-skolniho-roku/harmonogram-skolniho-roku-2026-27-434cs.html – Detail fetched.
    - The schedule is only in images (img 2727, 2728) and a PDF (https://www.gymskutec.cz/evt_file.php?file=2729, 178.76 kB).
13. **MATURITNÍ ZKOUŠKA 2027 – GYMNÁZIUM** / **– BEZPEČNOSTNĚ PRÁVNÍ ČINNOST** – 31. 8. 2026 – …-553cs.html / …-554cs.html – Listing only. Nabídka předmětů a maturitních témat 2026/2027.
14. **Školní řád platný od 1. 9. 2026** – 31. 8. 2026 – /o-skole/dokumenty-skoly/skolni-rad-platny-od-1-9-2026-6.html – Listing only.
15. **Přijímací řízení** – 28. 8. 2026 – https://gymskutec.cz/studium/pro-uchazece-1/prijimaci-rizeni-542cs.html – Listing only. Informace dle harmonogramu MŠMT.
16. **Kurz přežití ve Zbraslavicích** – 25. 6. 2026 – https://www.gymskutec.cz/skolni-akce/skolni-akce-galerie/kurz-preziti-ve-zbraslavicich-576cs.html – Detail fetched.
    - 28 studentů 2.BP v lesích u Zbraslavic, první červnový týden 2026: vojenské stany, noční poplachy, slaňování na zřícenině hradu Sion.
    - Instruktoři z policie a hasičů; autor Mgr. Petr Klimeš.
    - Images: img 2716–2726
17. **Larischova vila** – 27. 4. 2026 – …/larischova-vila-572cs.html – Listing only (4 photos, img 2705).
18. **Noc s Andersenem 2026** – 24. 4. 2026 – …/noc-s-andersenem-2026-570cs.html – Listing only (16 photos, img 2697).
19. **KRITÉRIA HODNOCENÍ MZ 2026** – 7. 4. 2026 – …/kriteria-hodnoceni-mz-2026-567cs.html – Listing only.
20. **Odborná praxe 3. BP** – 2. 4. 2026 – …/odborna-praxe-3-bp-566cs.html – Listing only (img 2660).
21. **Lyžařský kurz 2026** – 18. 2. 2026 – …/lyzarsky-kurz-2026-565cs.html – Listing only (5 photos, img 2653).
22. **Střelecký výcvik 4. BP** – 5. 1. 2026 – …/strelecky-vycvik-4-bp-562cs.html – Listing only (9 photos, img 2610).
23. **Školní přijímací zkouška pro uchazeče o obor BPČ** – 1. 1. 2026 (aktualizace 29. 8. 2026) – …/skolni-prijimaci-zkouska-pro-uchazece-o-obor-bpc-474cs.html – Detail fetched.
    - Testy fyzických předpokladů pro uchazeče BPČ, konané jednou, mimo termín JPZ; termíny dle MŠMT.
    - Images: img 2118, 2635, 2636
24. **Informace pro uchazeče z Ukrajiny** – 1. 1. 2026 – …/informace-pro-uchazece-z-ukrajiny-544cs.html – Listing only (img 2456).
25. **Přihláška k maturitní zkoušce** – 1. 12. 2025 – …/prihlaska-k-maturitni-zkousce-385cs.html – Listing only.
26. **Zájezd do Francie 2025** – 15. 10. 2025 – …/zajezd-do-francie-2025-558cs.html – Listing only (19 photos, img 2582).
27. **25 LET GYMNÁZIA** – 8. 10. 2025 – https://www.gymskutec.cz/skolni-akce/skolni-akce-galerie/25-let-gymnazia-557cs.html – Detail fetched.
    - Oslava 25. výročí školy se setkáním absolventů.
    - Článek Mgr. Viktora Kořístky v Chrudimském deníku: https://chrudimsky.denik.cz/ctenar-reporter/skutecske-gymnazium-zmenilo-nazev-i-tvar-slavilo-ctvrtstoleti-s-absolventy.html
    - Fotogalerie Zdeňka Picpauera: https://eu.zonerama.com/PhotographyZdenekPicpauer/Album/13955005
    - Vznikly "Školní letopisy" č. 1 (PDF, 64.91 MB).
    - Images: img 2558, 2559, 2563
28. **Zájmové kroužky při školním klubu 2025/26** – 6. 10. 2025 – …-498cs.html – Listing only.
29. **Medailonky absolventů** – 15. 9. 2025 – /o-skole/absolventi-a-uspechy-1/medailonky-absolventu-556cs.html – Listing only.
30. **Výroční zprávy** – 5. 9. 2025 – /o-skole/dokumenty-skoly/vyrocni-zpravy-5.html – Listing only.
31. **Europass** – 4. 6. 2025 – /studium/europass/europass-549cs.html – Listing only.
32. **Studentská kavárna** – 23. 4. 2025 – …-548cs.html – Listing only (6 photos, img 2495).
33. **Vojáci na Gymnáziu v rámci projektu POKOS** – 23. 4. 2025 – …-547cs.html – Listing only (12 photos, img 2489).
34. **Den lidských práv – Nebeští jezdci** – 10. 12. 2024 – …-540cs.html – Listing only (12 photos, img 2452).
35. **Workshop 2024 – den s Policií ČR, fyzické testy** – 20. 11. 2024 – …-537cs.html – Listing only (img 2426).
36. **Oslavy 17. listopadu** – 20. 11. 2024 – …-539cs.html – Listing only (img 2427).
37. **Úvodní schůzka žákovského parlamentu 2024/25** – 7. 10. 2024 – …-531cs.html – Listing only.
38. **Expedice Skotsko 2024** – 2. 10. 2024 – …-530cs.html – Listing only (img 2375).

Older archive items (2018–2023: žákovský parlament, kavárny, Vodácký kurz 2020, Festival svobody 2019, zájezdy do Anglie 2019 a 2023) are listed in their section entries above.

Homepage item without a date: "Ranní duchovní nakopávák". It links to podzimni-duchovni-obnova-583cs.html; image /data/multipage/editor/editor-1-366-cs_2.png.

## Not retrieved

- Returned 404 (no such page): https://www.gymskutec.cz/aktuality/, https://www.gymskutec.cz/novinky/
- Section parents not fetched: /o-skole/zamestnanci-skoly/, /skolni-akce/projekty/, /skolni-akce/projekty/skolni-projekty/
- Školní poradenské pracoviště subpages: minimalni-preventivni-program/, informace-pro-rodice/, psychologicke-poradenstvi/
- Fotogalerie subpages and archive albums (ucebny/, galerie-pozvanek/, archiv/*)
- All school-project subpages under /o-skole/projekty/skolni-projekty/* and /skolni-akce/projekty/skolni-projekty/* (charitativní projekty, Ježíškova vnoučata, Ekoškola, Recyklohraní, eTwinning, Záložka do knihy, Třídní časopisy, …), plus /o-skole/projekty/projekty-eu/ and /o-skole/projekty/projekty-eu-sablony/
- Soutěže subpages (přírodovědné, jazykové, umělecké, sportovní, konference)
- Všechny stránky předmětů (/studium/predmety/*), including the BPČ subject subpages
- Student-work subpages under /studium/uspechy-a-aktivity-zaku-i-absolventu/*
- Article details marked "listing only" in News articles. Also the Dokumenty školy records (školní řád, ŠVP, výroční zprávy), Složení školské rady (-323cs.html), Zájmové kroužky 2025/26 and the maturita articles.
- Content of PDFs and images (harmonogram, posters, provoz kanceláře) was not extracted.
- Download URLs for the curricula (učební plány) in the article "Informace o nabízených oborech".
- /cs/tiraz/ (accessibility statement), /?mapa-webu=1&lang=cs (site map)
