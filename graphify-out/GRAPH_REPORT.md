# Graph Report - skolaskutec  (2026-10-21)

## Corpus Check
- 92 files · ~228,144 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 31 file(s) not represented in the graph (top: .woff2 16, .toml 4, (none) 4)

## Summary
- 2511 nodes · 5994 edges · 114 communities (97 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 187 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `79af8435`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- live-browser.js
- Pages
- resumeSession
- quill.js
- modern-screenshot.umd.js
- el
- serve
- connectSSE
- _
- Articles
- m
- news-editor.js
- a
- length
- build.py
- handleManualEditActivity
- N
- Module
- initPageChat
- new-work.md
- length
- initGlobalBar
- Rt
- live.md
- w
- renderDesignVisual
- url_map.py
- i
- .remove
- onboard.md
- .listen
- kontakt.js
- SKILL.md
- The Toolkit
- build
- n
- createLiveBrowserDomHelpers
- createLiveBrowserSessionState
- N
- showToast
- .forEach
- animate.md
- Handle `generate`
- Generate Report
- New visual work
- O škole (menu item without its own URL)
- optimize.md
- onAnnotDown
- Scan mode (approach C: auto-extract, then confirm descriptive language)
- Hardening Dimensions
- page.py
- x
- actOnAgentTarget
- critique.md
- Simplify the Design
- Studium
- clarify.md
- Nielsen's 10 Heuristics
- Generate Combined Critique Report
- document.md
- polish.md
- quieter.md
- Source inventory – www.gymskutec.cz
- Compliance and security audit — three school sites (19 October 2026)
- Init flow
- Školní akce
- vercel.json
- Common Cognitive Load Violations
- iOS platform
- u
- Shape
- gymskutec.cz
- h
- Visualize: Direction Comps & Asset Production
- adapt.native.md
- Android platform
- colorize.md
- Persona-Based Design Testing
- Extract Flow
- Generate Report
- Cognitive Load Assessment
- Impeccable Finish Reviewer
- Impeccable Manual Edit Applier
- check.py
- live-browser-ignores.js
- make_logo.py
- scheduleAcceptCleanup
- Diagnostic Scan
- gymskutec.cz rebuild: analysis and implementation plan
- R
- Impeccable Documenter
- QA report — gymskutec.cz (19 October 2026)
- Region map
- Heuristics Scoring Guide
- o
- Brand compliance
- Zaměstnanci školy
- doctor.md
- CLAUDE.md
- bolder.md
- url-map.md
- PRODUCT.md
- Handler
- make_og.py
- $impeccable hooks
- Read
- de
- split
- enableInlineEdit
- .mcp.json

## God Nodes (most connected - your core abstractions)
1. `Pages` - 92 edges
2. `de` - 67 edges
3. `_` - 66 edges
4. `i` - 64 edges
5. `Module()` - 51 edges
6. `m` - 51 edges
7. `length()` - 51 edges
8. `h()` - 48 edges
9. `o` - 47 edges
10. `s` - 45 edges

## Surprising Connections (you probably didn't know these)
- `Step 1: Parse the request` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/generate.md → build.py
- `3. Load the action's reference` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/live.md → build.py
- `Phase D: Squint test` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/live.md → build.py
- `Comp-led: the comp is a measured contract` --references--> `image()`  [INFERRED]
  .claude/skills/impeccable/reference/new-work.md → static/js/vendor/quill-2.0.3/quill.js
- `Painted material` --references--> `image()`  [INFERRED]
  .claude/skills/impeccable/reference/region-map.md → static/js/vendor/quill-2.0.3/quill.js

## Import Cycles
- None detected.

## Communities (114 total, 17 thin omitted)

### Community 0 - "live-browser.js"
Cohesion: 0.03
Nodes (126): applyGlobalBarLabelState(), applyOriginalAttrsToSvelteAnchor(), applyPlaceholderSizingStyles(), averageRgb01(), bindEditBadgeProxy(), bufferToBase64(), buildColorModels(), buildPlaceholderResizeHandles() (+118 more)

### Community 1 - "Pages"
Cohesion: 0.02
Nodes (92): Adopce na dálku, Anglie 2015, Archiv – 3. fairtradeová kavárna, Archiv – Diplomy a ocenění, Archiv – Dětská majálesová olympiáda 2014, Archiv – Majáles 2014, Archiv – Majáles 2015, Archiv – Maturitní ples 2015 (+84 more)

### Community 2 - "resumeSession"
Cohesion: 0.06
Nodes (87): abortSvelteComponentInjection(), applyParamDefaults(), applyParamValue(), applySavedSessionMeta(), buildParamsPanel(), checkpointPayload(), clampVariantIndex(), clearSession() (+79 more)

### Community 3 - "quill.js"
Cohesion: 0.06
Nodes (52): attach(), attachUI(), attribute(), Bt(), buildItem(), buildLabel(), buildOptions(), buildPicker() (+44 more)

### Community 4 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 5 - "el"
Cohesion: 0.07
Nodes (56): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+48 more)

### Community 6 - "serve"
Cohesion: 0.14
Nodes (15): serve(), do_GET(), end_headers(), guess_type(), Act on the receipt, Assemble and review, Plan and asset review, Plan, capture, serve (+7 more)

### Community 7 - "connectSSE"
Cohesion: 0.10
Nodes (59): beginNewLiveConfiguration(), buildInsertPlaceholderSnapshotFromDom(), buildPickedAnchorSnapshot(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), cleanup(), cleanupAcceptedSession() (+51 more)

### Community 8 - "_"
Cohesion: 0.06
Nodes (25): _, ae, C(), n(), r(), ce, delete(), E() (+17 more)

### Community 9 - "Articles"
Cohesion: 0.05
Nodes (42): Articles, Branná soutěž MISE – reminiscence 2025, Den lidských práv – Nebeští jezdci, Dobročinná svačinka, Europass, Expedice Skotsko 2024, Festival vědy a techniky, Finále Recyklohraní (+34 more)

### Community 11 - "news-editor.js"
Cohesion: 0.08
Nodes (53): Accounts, sign-in, roles, Publishing (news, events, notices, galleries), Running it locally, Schema (for reference), Security, What can be published, addCategory(), afterSignIn() (+45 more)

### Community 13 - "length"
Cohesion: 0.08
Nodes (8): image(), index(), k, normalizedToRange(), normalizeNative(), offset(), register(), s

### Community 14 - "build.py"
Cohesion: 0.07
Nodes (42): breadcrumbs(), contact_card(), contact_form(), crumbs_html(), _descendants(), enhance_body(), fix_img(), event_slug() (+34 more)

### Community 15 - "handleManualEditActivity"
Cohesion: 0.18
Nodes (25): clearStoredManualApplyState(), fetchPendingCount(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage(), numberOrNull() (+17 more)

### Community 16 - "N"
Cohesion: 0.16
Nodes (3): E(), N, w()

### Community 17 - "Module"
Cohesion: 0.06
Nodes (31): Module(), a(), Aa(), bb(), c(), cc(), a(), d() (+23 more)

### Community 18 - "initPageChat"
Cohesion: 0.09
Nodes (51): armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), clearSteerFocusRecoverTimer(), collapsePageChat() (+43 more)

### Community 19 - "new-work.md"
Cohesion: 0.08
Nodes (21): Recommended Actions, Craft (deprecated alias), Apply, Live-mode signature params, Set the spatial thesis, Two isolated assessments, Verify, Visitor mode (+13 more)

### Community 20 - "length"
Cohesion: 0.10
Nodes (19): applyDelta(), deleteText(), f, getDelta(), getHTML(), h(), handler(), hasNext() (+11 more)

### Community 21 - "initGlobalBar"
Cohesion: 0.10
Nodes (31): agentHasWorkInFlight(), agentStatusText(), applyLiveBarPreference(), barPaletteForTheme(), brandMarkSvg(), designPanelCss(), detectPageTheme(), ensureAgentPollTooltip() (+23 more)

### Community 23 - "live.md"
Cohesion: 0.07
Nodes (26): Step 1: Parse the request, Step 2: Reuse the page, then start, Step 3: Generate, Step 4: Accept and close, Cleanup, Exit, First-time setup, Handle `accept` (+18 more)

### Community 24 - "w"
Cohesion: 0.12
Nodes (12): i(), d(), f, g, l, p, S, T() (+4 more)

### Community 25 - "renderDesignVisual"
Cohesion: 0.09
Nodes (33): buildCollapsible(), buildDesignHeader(), buildListHtml(), buildRadiiModels(), cssSafe(), designEmptyMessage(), escapeHtml(), fetchDesignSystem() (+25 more)

### Community 26 - "url_map.py"
Cohesion: 0.16
Nodes (6): local_name(), main(), slug(), exists(), main(), resolve()

### Community 27 - "i"
Cohesion: 0.06
Nodes (8): d(), formatText(), getText(), i, insertContents(), l(), o, v()

### Community 28 - ".remove"
Cohesion: 0.10
Nodes (14): deleteAt(), enforceAllowedChildren(), formatAt(), formatLine(), isolate(), moveChildren(), optimize(), position() (+6 more)

### Community 29 - "onboard.md"
Cohesion: 0.09
Nodes (22): Assess Onboarding Needs, Context Over Ceremony, Contextual Help, Design Onboarding Experiences, Documentation & Help, Empty State Design, Feature Discovery & Adoption, Guided Tours & Walkthroughs (+14 more)

### Community 30 - ".listen"
Cohesion: 0.15
Nodes (8): formula(), getBounds(), hide(), link(), qt(), St(), T(), video()

### Community 31 - "kontakt.js"
Cohesion: 0.23
Nodes (9): clean(), esc(), FIELDS, handler(), redirect(), assert, call(), handler (+1 more)

### Community 32 - "SKILL.md"
Cohesion: 0.09
Nodes (19): Craft floor, Refuse, Verify, Color, Components, Layout, Motion, Operate mode depth (and Read notes) (+11 more)

### Community 33 - "The Toolkit"
Cohesion: 0.10
Nodes (20): Animate complex properties, Assess What "Extraordinary" Means Here, For data-heavy interfaces, For functional UI, For performance-critical UI, For visual/marketing surfaces, Implement with Discipline, Interact with the device (+12 more)

### Community 34 - "build"
Cohesion: 0.12
Nodes (10): handler, listing(), build(), lockup(), logo_viewbox(), render_news_editor(), render_news_index(), render_simple() (+2 more)

### Community 36 - "createLiveBrowserDomHelpers"
Cohesion: 0.13
Nodes (19): createLiveBrowserDomHelpers(), activeElementDeep(), cloneWithoutChrome(), copyTextViaSelection(), cssId(), liveUiRoot(), makeFrozenAnchor(), own() (+11 more)

### Community 37 - "createLiveBrowserSessionState"
Cohesion: 0.19
Nodes (17): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+9 more)

### Community 38 - "N"
Cohesion: 0.08
Nodes (25): Assess Adaptation Challenge, Breakpoints: Content-Driven, Content Adaptation, Desktop Adaptation (Mobile → Desktop), Detect Input Method, Not Just Screen Size, Email Adaptation (Web → Email), Implement Adaptations, Layout Adaptation Patterns (+17 more)

### Community 39 - "showToast"
Cohesion: 0.07
Nodes (44): abandonForeignSession(), abandonSupersededGo(), addManualContextText(), applyEditing(), buildLocatorForLeaf(), canRestoreManualEditElement(), collectManualContextPieces(), walk() (+36 more)

### Community 40 - ".forEach"
Cohesion: 0.14
Nodes (16): A(), b(), build(), descendant(), detach(), Et(), getFormat(), handleDOM() (+8 more)

### Community 41 - "animate.md"
Cohesion: 0.12
Nodes (14): Accessibility and control, Choose material by meaning, Find the job, Implement to the runtime, Set the motion thesis, Timing and easing, Verify, Visitor mode (+6 more)

### Community 42 - "Handle `generate`"
Cohesion: 0.12
Nodes (16): 1. Read the screenshot (if present), 2. Wrap the element, 3. Load the action's reference, 4. Plan three variants: identity first, then mode, then axes, 5. Apply the freeform prompt (if present), 6. Deliver variants, 7. Parameters (composition-sized, 0-4 per variant), 8. Signal done (+8 more)

### Community 43 - "Generate Report"
Cohesion: 0.13
Nodes (14): 1. Accessibility (A11y), 2. Performance, 3. Theming, 4. Responsive Design, 5. Implementation Integrity (CRITICAL), Audit Health Score, Detailed Findings by Severity, Diagnostic Scan (+6 more)

### Community 44 - "New visual work"
Cohesion: 0.14
Nodes (14): 1. Decide what is already true, 2. Ask what will change the work, 3. Choose the right amount of invention, 4. Commit the world, 5. Record the decision, 6. Build with full commitment, 7. Inspect and finish, Both paths (+6 more)

### Community 45 - "O škole (menu item without its own URL)"
Cohesion: 0.13
Nodes (15): Absolventi a úspěchy, Dokumenty školy, Domov mládeže, E-podatelna, Fotogalerie, O škole (menu item without its own URL), Povinné informace, Pro dárce a sponzory (+7 more)

### Community 46 - "optimize.md"
Cohesion: 0.14
Nodes (13): Animation Performance, Assess Performance Issues, Core Web Vitals Optimization, Cumulative Layout Shift (CLS < 0.1), Interaction to Next Paint (INP < 200ms), Largest Contentful Paint (LCP < 2.5s), Loading Performance, Network Optimization (+5 more)

### Community 47 - "onAnnotDown"
Cohesion: 0.18
Nodes (19): applyPlaceholderDimensions(), beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), finalizeEditingPin(), initAnnotOverlay(), localCoords() (+11 more)

### Community 48 - "Scan mode (approach C: auto-extract, then confirm descriptive language)"
Cohesion: 0.15
Nodes (13): Component translation rules, Narrative mapping, Scan mode (approach C: auto-extract, then confirm descriptive language), Schema, Step 1: Find the design assets, Step 2: Auto-extract what can be auto-extracted, Step 2b: Stage the frontmatter, Step 3: Ask the user for qualitative language (+5 more)

### Community 49 - "Hardening Dimensions"
Cohesion: 0.15
Nodes (11): Accessibility Resilience, Assess Hardening Needs, Edge Cases & Boundary Conditions, Error Handling, Hardening Dimensions, Input Validation & Sanitization, Internationalization (i18n), Performance Resilience (+3 more)

### Community 50 - "page.py"
Cohesion: 0.13
Nodes (20): as_event(), as_news(), cached(), dynamic_pages(), events(), file_info(), full_posts(), human_size() (+12 more)

### Community 52 - "actOnAgentTarget"
Cohesion: 0.29
Nodes (17): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), declineAgentTargetBusy(), declineAgentTargetUnresolvable() (+9 more)

### Community 53 - "critique.md"
Cohesion: 0.17
Nodes (11): Action Summary, Ask the User, Assessment A: Design Review, Assessment B: Detector + Browser Evidence, Assessment Orchestration, Deliver the Report, Hard Invariants, Persist the Snapshot (+3 more)

### Community 54 - "Simplify the Design"
Cohesion: 0.17
Nodes (11): Assess Current State, Code Simplification, Content Simplification, Document Removed Complexity, Information Architecture, Interaction Simplification, Layout Simplification, Plan Simplification (+3 more)

### Community 55 - "Studium"
Cohesion: 0.17
Nodes (12): Europass, Formuláře ke stažení, Harmonogram školního roku, Maturitní zkouška, Nepovinné předměty a zájmové kroužky, Odborná praxe BPČ, Pro uchazeče, Předměty (+4 more)

### Community 56 - "clarify.md"
Cohesion: 0.18
Nodes (10): Actions and navigation, Audit the language, Errors and permissions, Forms, Help and instructional text, Loading, empty, and success states, Rewrite by function, Set the message hierarchy (+2 more)

### Community 57 - "Nielsen's 10 Heuristics"
Cohesion: 0.18
Nodes (11): 10. Help and Documentation, 1. Visibility of System Status, 2. Match Between System and Real World, 3. User Control and Freedom, 4. Consistency and Standards, 5. Error Prevention, 6. Recognition Rather Than Recall, 7. Flexibility and Efficiency of Use (+3 more)

### Community 58 - "Generate Combined Critique Report"
Cohesion: 0.18
Nodes (11): Design Health Score, Design Specificity Verdict, Generate Combined Critique Report, Minor Observations, Overall Impression, Persona Red Flags, Priority Issues, Questions to Consider (+3 more)

### Community 59 - "document.md"
Cohesion: 0.18
Nodes (10): Pitfalls, Seed mode, Step 1: Route through new-work's workshop, Step 2: Write seed DESIGN.md, Step 3: Confirm, Style guidelines, The frontmatter: token schema, The markdown body: eight sections (canonical order) (+2 more)

### Community 60 - "polish.md"
Cohesion: 0.18
Nodes (10): 1. Establish the system, 2. Gather the evidence, 3. Triage, 4. Polish the whole path, 5. Verify and finish, Color, imagery, and icons, Content and code, Flow and hierarchy (+2 more)

### Community 61 - "quieter.md"
Cohesion: 0.18
Nodes (10): Assess Current State, Color Refinement, Composition Refinement, Motion Reduction, Plan Refinement, Refine the Design, Simplification, Verify Quality (+2 more)

### Community 62 - "Source inventory – www.gymskutec.cz"
Cohesion: 0.18
Nodes (10): Homepage, Kontaktní informace, Kontakty, Napište nám, News articles, Not retrieved, Pro žáky a rodiče, Site-wide elements (repeated on almost every page) (+2 more)

### Community 63 - "Compliance and security audit — three school sites (19 October 2026)"
Cohesion: 0.33
Nodes (5): Before launch (needs the schools / Grand Priory), Compliance and security audit — three school sites (19 October 2026), Fixed today (Skuteč), Not fixed (other repositories), Sources

### Community 64 - "Init flow"
Cohesion: 0.20
Nodes (10): Completion gate, Init flow, Step 1: Load current state, Step 2: Explore the project, Step 3: Interview for product truth, Step 4: Write PRODUCT.md, Step 5: Record workflow defaults, Step 6: Wrap up or resume (+2 more)

### Community 65 - "Školní akce"
Cohesion: 0.20
Nodes (10): Other Projekty subpages (not fetched), Projektové dny, Projekty, Projekty EU, Soutěže, Sportovní akce, Studentské kavárny, Zahraniční zájezdy (+2 more)

### Community 66 - "vercel.json"
Cohesion: 0.13
Nodes (14): excludeFiles, includeFiles, buildCommand, cleanUrls, framework, functions, api/page.py, headers (+6 more)

### Community 67 - "Common Cognitive Load Violations"
Cohesion: 0.22
Nodes (9): 1. The Wall of Options, 2. The Memory Bridge, 3. The Hidden Navigation, 4. The Jargon Barrier, 5. The Visual Noise Floor, 6. The Inconsistent Pattern, 7. The Multi-Task Demand, 8. The Context Switch (+1 more)

### Community 68 - "iOS platform"
Cohesion: 0.22
Nodes (9): Color & materials, Components & controls, iOS platform, Layout & structure, Motion, The iOS slop test, Touch targets, Typography (+1 more)

### Community 69 - "u"
Cohesion: 0.21
Nodes (4): Monorepo notes, add(), u, value()

### Community 70 - "Shape"
Cohesion: 0.22
Nodes (8): Cadence, Confirm and stop, Phase 1: Discovery interview, Phase 2: Resolve the design direction, Phase 3: Write the brief, Round 1: purpose, people, and outcome, Round 2: material, behavior, and boundaries, Shape

### Community 71 - "gymskutec.cz"
Cohesion: 0.25
Nodes (7): Front matter fields, gymskutec.cz, News, events and galleries, Rules (Grand Magistry communications policy and coat-of-arms guidelines), Security notes, Shared code, Where things are

### Community 72 - "h"
Cohesion: 0.13
Nodes (4): ee(), h(), m, se

### Community 73 - "Visualize: Direction Comps & Asset Production"
Cohesion: 0.33
Nodes (5): After approval: the comp becomes a spec, Generate three compositional options, One approval point, Plates and provenance, Visualize: Direction Comps & Asset Production

### Community 74 - "adapt.native.md"
Cohesion: 0.25
Nodes (7): Adaptation Strategies, Assess Adaptation Challenge, Implement & Verify, Orientation & foldables, Phone → Tablet (iPad / large screens), Platform → platform (iOS ↔ Android), Web → native (porting a website or web app)

### Community 75 - "Android platform"
Cohesion: 0.25
Nodes (8): Android platform, Color & theming, Components & motion, Layout & structure, The Android slop test, Touch targets, Typography, Verifying the build

### Community 76 - "colorize.md"
Cohesion: 0.25
Nodes (7): Apply at system scale, Audit before choosing, Choose a strategy, Contrast and perception, Live-mode signature params, Verify, Visitor mode

### Community 77 - "Persona-Based Design Testing"
Cohesion: 0.25
Nodes (8): 1. Impatient Power User: "Alex", 2. Confused First-Timer: "Jordan", 3. Accessibility-Dependent User: "Sam", 4. Deliberate Stress Tester: "Riley", 5. Distracted Mobile User: "Casey", Persona-Based Design Testing, Project-Specific Personas, Selecting Personas

### Community 78 - "Extract Flow"
Cohesion: 0.25
Nodes (7): Extract Flow, Step 1: Discover the Design System, Step 2: Identify Patterns, Step 3: Plan Extraction, Step 4: Extract & Enrich, Step 5: Migrate, Step 6: Document

### Community 79 - "Generate Report"
Cohesion: 0.29
Nodes (7): Audit Health Score, Detailed Findings by Severity, Executive Summary, Generate Report, Patterns & Systemic Issues, Platform Conformance Verdict, Positive Findings

### Community 80 - "Cognitive Load Assessment"
Cohesion: 0.29
Nodes (7): Cognitive Load Assessment, Cognitive Load Checklist, Extraneous Load: Bad Design, Germane Load: Learning Effort, Intrinsic Load: The Task Itself, The Working Memory Rule, Three Types of Cognitive Load

### Community 81 - "Impeccable Finish Reviewer"
Cohesion: 0.29
Nodes (6): Checks, in order, Disposition, Impeccable Finish Reviewer, Input Contract, Output Contract, Verdict Pass

### Community 82 - "Impeccable Manual Edit Applier"
Cohesion: 0.29
Nodes (6): Checks, Entry Atomicity, Impeccable Manual Edit Applier, Input Contract, Output Contract, Workflow

### Community 83 - "check.py"
Cohesion: 0.21
Nodes (4): main(), Page, redirect_sources(), resolves()

### Community 85 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 86 - "make_logo.py"
Cohesion: 0.19
Nodes (5): lockup(), shield(), text_path(), vos_lockup(), vos_text()

### Community 87 - "scheduleAcceptCleanup"
Cohesion: 0.23
Nodes (14): acceptedDomAlreadyClean(), clearHandledWrapperReloadStamp(), commitAcceptedSvelteComponentToDom(), deferredRecoverySuperseded(), ensureAcceptedDomClean(), findAcceptedRuntimeWrappers(), handledWrapperReloadKey(), maybeCompleteAcceptedSession() (+6 more)

### Community 88 - "Diagnostic Scan"
Cohesion: 0.33
Nodes (6): 1. Accessibility (VoiceOver / TalkBack), 2. Performance, 3. Appearance & Theming, 4. Platform Conformance (CRITICAL), 5. Adaptivity, Diagnostic Scan

### Community 89 - "gymskutec.cz rebuild: analysis and implementation plan"
Cohesion: 0.33
Nodes (5): Blockers, gymskutec.cz rebuild: analysis and implementation plan, Phased roadmap (once unblocked), Reference repositories (read only, not modified), Target site (what could be confirmed)

### Community 91 - "Impeccable Documenter"
Cohesion: 0.40
Nodes (4): Impeccable Documenter, Input Contract, Output Contract, Workflow

### Community 92 - "QA report — gymskutec.cz (19 October 2026)"
Cohesion: 0.25
Nodes (7): Cross-device audit and publishing workflow (21 October 2026), Final audit before presentation (19 October 2026), Impeccable critique and what changed, QA report — gymskutec.cz (19 October 2026), Results, Shared Supabase database (21 October 2026), Unresolved (needs the school, the Grand Priory or network access)

### Community 93 - "Region map"
Cohesion: 0.40
Nodes (4): Containment, Painted material, Region map, What varies independently

### Community 94 - "Heuristics Scoring Guide"
Cohesion: 0.50
Nodes (4): Heuristics Scoring Guide, Issue Severity (P0–P3), Reference Material, Score Summary

### Community 96 - "Brand compliance"
Cohesion: 0.40
Nodes (4): Brand compliance, Open approvals, School logo (`static/img/logo/`), Share card (`static/img/og.jpg`)

### Community 97 - "Zaměstnanci školy"
Cohesion: 0.50
Nodes (4): Pedagogický sbor, Provozní zaměstnanci, Vedení školy, Zaměstnanci školy

### Community 98 - "doctor.md"
Cohesion: 0.29
Nodes (6): Opting out of the boot check, Step 1: Run the pass, Step 2: Act by severity, Step 3: Deprecated fields are binding, Step 4: Do not overclaim on truth drift, What this owns, and what it does not

### Community 100 - "bolder.md"
Cohesion: 0.33
Nodes (5): Before you finish, Scope is sovereign, The amplification, The skeleton test, Why it reads flat

### Community 108 - "$impeccable hooks"
Cohesion: 0.33
Nodes (6): Constraints, Failure modes, Flow, $impeccable hooks, Routing, Triage findings

### Community 109 - "Read"
Cohesion: 0.50
Nodes (3): Comps, Directions, Read

### Community 111 - "de"
Cohesion: 0.10
Nodes (3): Q(), de, z()

### Community 113 - "split"
Cohesion: 0.11
Nodes (9): appendChild(), c, clone(), descendants(), insertAt(), keys(), q(), split() (+1 more)

### Community 114 - "enableInlineEdit"
Cohesion: 0.40
Nodes (5): collectEditableTextRows(), visit(), enableInlineEdit(), onInlineInput(), wrapMixedContentTextNodes()

## Knowledge Gaps
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `e()` connect `.forEach` to `quill.js`, `modern-screenshot.umd.js`, `_`, `m`, `length`, `N`, `Module`, `split`, `length`, `i`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `i` (e.g. with `e()` and `i()`) actually correct?**
  _`i` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `live-browser.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0306500115660421 - nodes in this community are weakly interconnected._
- **Why does `_` connect `_` to `n`, `.forEach`, `h`, `a`, `de`, `x`, `w`, `o`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Module()` (e.g. with `ac()` and `$b()`) actually correct?**
  _`Module()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Should `Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.021739130434782608 - nodes in this community are weakly interconnected._
- **Why does `image()` connect `length` to `quill.js`, `serve`, `gymskutec.cz`, `Visualize: Direction Comps & Asset Production`, `news-editor.js`, `New visual work`, `Region map`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._