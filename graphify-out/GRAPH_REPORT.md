# Graph Report - skolaskutec  (2026-11-02)

## Corpus Check
- 94 files · ~210,695 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 31 file(s) not represented in the graph (top: .woff2 16, .toml 4, (none) 4)

## Summary
- 2555 nodes · 5474 edges · 127 communities (112 shown, 15 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 194 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a244588e`
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
- k
- build.py
- handleManualEditActivity
- N
- Module
- initPageChat
- new-work.md
- s
- initGlobalBar
- j
- live.md
- w
- renderDesignVisual
- url_map.py
- i
- o
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
- b
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
- jt
- live-browser-ignores.js
- make_logo.py
- scheduleAcceptCleanup
- Diagnostic Scan
- gymskutec.cz rebuild: analysis and implementation plan
- showToast
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
- Q
- de
- ci.yml
- c
- update
- rt
- optimize
- .mcp.json
- Operate mode depth (and Read notes)
- ye
- serve
- L
- image
- Publishing (news, events, notices, galleries)
- c
- interface
- Persuade and Experience

## God Nodes (most connected - your core abstractions)
1. `Pages` - 92 edges
2. `_` - 73 edges
3. `de` - 67 edges
4. `i` - 57 edges
5. `Module()` - 50 edges
6. `h()` - 48 edges
7. `n` - 46 edges
8. `s` - 42 edges
9. `o` - 39 edges
10. `m` - 38 edges

## Surprising Connections (you probably didn't know these)
- `Step 1: Parse the request` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/generate.md → build.py
- `3. Load the action's reference` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/live.md → build.py
- `Phase D: Squint test` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/live.md → build.py
- `Painted material` --references--> `image()`  [INFERRED]
  .claude/skills/impeccable/reference/region-map.md → static/js/vendor/quill-2.0.3/quill.js
- `Schema (for reference)` --references--> `events()`  [INFERRED]
  docs/publishing.md → api/page.py

## Import Cycles
- None detected.

## Communities (127 total, 15 thin omitted)

### Community 0 - "live-browser.js"
Cohesion: 0.03
Nodes (118): applyGlobalBarLabelState(), applyLiveBarPreference(), applyOriginalAttrsToSvelteAnchor(), applyParamValue(), applyPlaceholderSizingStyles(), averageRgb01(), bindEditBadgeProxy(), bufferToBase64() (+110 more)

### Community 1 - "Pages"
Cohesion: 0.02
Nodes (92): Adopce na dálku, Anglie 2015, Archiv – 3. fairtradeová kavárna, Archiv – Diplomy a ocenění, Archiv – Dětská majálesová olympiáda 2014, Archiv – Majáles 2014, Archiv – Majáles 2015, Archiv – Maturitní ples 2015 (+84 more)

### Community 2 - "resumeSession"
Cohesion: 0.06
Nodes (79): applyParamDefaults(), applyPlaceholderDimensions(), applySavedSessionMeta(), clampVariantIndex(), clearHandled(), closedClipPath(), commitAcceptedVariantToDom(), completeParameterGenerationIfReady() (+71 more)

### Community 3 - "quill.js"
Cohesion: 0.05
Nodes (35): buildItem(), buildLabel(), buildOptions(), buildPicker(), close(), constructor(), copy(), detach() (+27 more)

### Community 4 - "modern-screenshot.umd.js"
Cohesion: 0.12
Nodes (37): ae(), be(), bt(), Ce(), de(), dt(), _e(), er() (+29 more)

### Community 5 - "el"
Cohesion: 0.07
Nodes (53): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+45 more)

### Community 6 - "serve"
Cohesion: 0.22
Nodes (7): Core Rule, Decision Comps, Impeccable Asset Producer, Input Contract, Output Contract, Review handoff, The job

### Community 7 - "connectSSE"
Cohesion: 0.11
Nodes (57): abortSvelteComponentInjection(), beginNewLiveConfiguration(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), cleanup(), cleanupAcceptedSession(), clearAnnotations() (+49 more)

### Community 8 - "_"
Cohesion: 0.05
Nodes (21): _, ae, b, C(), ce, constructor(), E(), ee() (+13 more)

### Community 9 - "Articles"
Cohesion: 0.05
Nodes (42): Articles, Branná soutěž MISE – reminiscence 2025, Den lidských práv – Nebeští jezdci, Dobročinná svačinka, Europass, Expedice Skotsko 2024, Festival vědy a techniky, Finále Recyklohraní (+34 more)

### Community 10 - "m"
Cohesion: 0.09
Nodes (7): attachUI(), descendant(), g(), getHTML(), length(), m, query()

### Community 11 - "news-editor.js"
Cohesion: 0.10
Nodes (47): addCategory(), afterSignIn(), askCode(), attachmentRow(), categories(), clearPhoto(), dateHint(), del() (+39 more)

### Community 12 - "a"
Cohesion: 0.08
Nodes (5): a, d(), k, u, update()

### Community 14 - "build.py"
Cohesion: 0.08
Nodes (41): listing(), breadcrumbs(), contact_card(), contact_form(), crumbs_html(), _descendants(), event_slug(), event_when() (+33 more)

### Community 15 - "handleManualEditActivity"
Cohesion: 0.19
Nodes (24): clearStoredManualApplyState(), fetchPendingCount(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage(), numberOrNull() (+16 more)

### Community 16 - "N"
Cohesion: 0.11
Nodes (5): E(), N, q(), R(), w()

### Community 17 - "Module"
Cohesion: 0.06
Nodes (34): Module(), a(), Aa(), bb(), c(), cc(), a(), d() (+26 more)

### Community 18 - "initPageChat"
Cohesion: 0.07
Nodes (55): armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), clearSteerFocusRecoverTimer(), collapsePageChat() (+47 more)

### Community 19 - "new-work.md"
Cohesion: 0.10
Nodes (18): Recommended Actions, Craft (deprecated alias), Apply, Live-mode signature params, Set the spatial thesis, Two isolated assessments, Verify, Visitor mode (+10 more)

### Community 20 - "s"
Cohesion: 0.06
Nodes (3): h(), register(), s

### Community 21 - "initGlobalBar"
Cohesion: 0.09
Nodes (34): agentHasWorkInFlight(), agentStatusText(), barPaletteForTheme(), brandMarkSvg(), buildParamsPanel(), designPanelCss(), detectPageTheme(), ensureAgentPollTooltip() (+26 more)

### Community 22 - "j"
Cohesion: 0.13
Nodes (5): create(), descendants(), et, j, nt()

### Community 23 - "live.md"
Cohesion: 0.07
Nodes (26): Step 1: Parse the request, Step 2: Reuse the page, then start, Step 3: Generate, Step 4: Accept and close, Cleanup, Exit, First-time setup, Handle `accept` (+18 more)

### Community 24 - "w"
Cohesion: 0.12
Nodes (10): f, g, i, l, p, S, T(), v() (+2 more)

### Community 25 - "renderDesignVisual"
Cohesion: 0.08
Nodes (39): buildCollapsible(), buildColorModels(), buildDesignHeader(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), cssSafe(), designEmptyMessage() (+31 more)

### Community 26 - "url_map.py"
Cohesion: 0.09
Nodes (11): is_dynamic(), main(), Page, redirect_sources(), resolves(), local_name(), main(), slug() (+3 more)

### Community 27 - "i"
Cohesion: 0.06
Nodes (6): d(), getText(), handleDOM(), handler(), i, U()

### Community 28 - "o"
Cohesion: 0.08
Nodes (16): applyDelta(), attach(), deleteAt(), deleteText(), f, formatAt(), formatLine(), formatText() (+8 more)

### Community 29 - "onboard.md"
Cohesion: 0.09
Nodes (22): Assess Onboarding Needs, Context Over Ceremony, Contextual Help, Design Onboarding Experiences, Documentation & Help, Empty State Design, Feature Discovery & Adoption, Guided Tours & Walkthroughs (+14 more)

### Community 30 - ".listen"
Cohesion: 0.29
Nodes (3): hide(), qt(), St()

### Community 31 - "kontakt.js"
Cohesion: 0.24
Nodes (7): clean(), esc(), FIELDS, handler(), redirect(), assert, sent

### Community 32 - "SKILL.md"
Cohesion: 0.15
Nodes (10): Craft floor, Refuse, Verify, Command guidance, No-argument routing: the context-aware menu, Workflow questions, Commands, How to design (+2 more)

### Community 33 - "The Toolkit"
Cohesion: 0.10
Nodes (20): Animate complex properties, Assess What "Extraordinary" Means Here, For data-heavy interfaces, For functional UI, For performance-critical UI, For visual/marketing surfaces, Implement with Discipline, Interact with the device (+12 more)

### Community 34 - "build"
Cohesion: 0.11
Nodes (11): handler, build(), enhance_body(), fix_img(), image_size(), lockup(), logo_viewbox(), render_news_editor() (+3 more)

### Community 36 - "createLiveBrowserDomHelpers"
Cohesion: 0.14
Nodes (18): createLiveBrowserDomHelpers(), activeElementDeep(), cloneWithoutChrome(), copyTextViaSelection(), cssId(), liveUiRoot(), makeFrozenAnchor(), own() (+10 more)

### Community 37 - "createLiveBrowserSessionState"
Cohesion: 0.19
Nodes (17): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+9 more)

### Community 38 - "N"
Cohesion: 0.08
Nodes (25): Assess Adaptation Challenge, Breakpoints: Content-Driven, Content Adaptation, Desktop Adaptation (Mobile → Desktop), Detect Input Method, Not Just Screen Size, Email Adaptation (Web → Email), Implement Adaptations, Layout Adaptation Patterns (+17 more)

### Community 39 - "showToast"
Cohesion: 0.07
Nodes (39): addManualContextText(), applyEditing(), buildLocatorForLeaf(), canRestoreManualEditElement(), collectEditableTextRows(), visit(), collectManualContextPieces(), walk() (+31 more)

### Community 40 - "b"
Cohesion: 0.11
Nodes (9): b(), find(), getFormat(), moveChildren(), n(), O(), replaceWith(), unwrap() (+1 more)

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
Cohesion: 0.20
Nodes (10): 1. Decide what is already true, 2. Ask what will change the work, 3. Choose the right amount of invention, 4. Commit the world, 5. Record the decision, 7. Inspect and finish, Create a whole surface inside an established world, Create or replace the visual world (+2 more)

### Community 45 - "O škole (menu item without its own URL)"
Cohesion: 0.13
Nodes (15): Absolventi a úspěchy, Dokumenty školy, Domov mládeže, E-podatelna, Fotogalerie, O škole (menu item without its own URL), Povinné informace, Pro dárce a sponzory (+7 more)

### Community 46 - "optimize.md"
Cohesion: 0.14
Nodes (13): Animation Performance, Assess Performance Issues, Core Web Vitals Optimization, Cumulative Layout Shift (CLS < 0.1), Interaction to Next Paint (INP < 200ms), Largest Contentful Paint (LCP < 2.5s), Loading Performance, Network Optimization (+5 more)

### Community 47 - "onAnnotDown"
Cohesion: 0.24
Nodes (15): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), finalizeEditingPin(), initAnnotOverlay(), localCoords(), onAnnotDown() (+7 more)

### Community 48 - "Scan mode (approach C: auto-extract, then confirm descriptive language)"
Cohesion: 0.15
Nodes (13): Component translation rules, Narrative mapping, Scan mode (approach C: auto-extract, then confirm descriptive language), Schema, Step 1: Find the design assets, Step 2: Auto-extract what can be auto-extracted, Step 2b: Stage the frontmatter, Step 3: Ask the user for qualitative language (+5 more)

### Community 49 - "Hardening Dimensions"
Cohesion: 0.17
Nodes (11): Accessibility Resilience, Assess Hardening Needs, Edge Cases & Boundary Conditions, Error Handling, Hardening Dimensions, Input Validation & Sanitization, Internationalization (i18n), Performance Resilience (+3 more)

### Community 50 - "page.py"
Cohesion: 0.14
Nodes (19): as_event(), as_news(), cached(), dynamic_pages(), events(), file_info(), full_posts(), human_size() (+11 more)

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
Cohesion: 0.18
Nodes (4): add(), split(), u, value()

### Community 70 - "Shape"
Cohesion: 0.22
Nodes (8): Cadence, Confirm and stop, Phase 1: Discovery interview, Phase 2: Resolve the design direction, Phase 3: Write the brief, Round 1: purpose, people, and outcome, Round 2: material, behavior, and boundaries, Shape

### Community 71 - "gymskutec.cz"
Cohesion: 0.29
Nodes (6): gymskutec.cz, News, events and galleries, Rules (Grand Magistry communications policy and coat-of-arms guidelines), Security notes, Shared code, Where things are

### Community 72 - "h"
Cohesion: 0.13
Nodes (6): h(), m, Q(), se, Y(), z()

### Community 73 - "Visualize: Direction Comps & Asset Production"
Cohesion: 0.40
Nodes (4): Generate three compositional options, One approval point, Plates and provenance, Visualize: Direction Comps & Asset Production

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

### Community 83 - "jt"
Cohesion: 0.12
Nodes (21): Zt(), Bt(), Ct(), Et(), Ft(), Gt(), e(), jt() (+13 more)

### Community 85 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 86 - "make_logo.py"
Cohesion: 0.19
Nodes (5): lockup(), shield(), text_path(), vos_lockup(), vos_text()

### Community 87 - "scheduleAcceptCleanup"
Cohesion: 0.31
Nodes (11): acceptedDomAlreadyClean(), clearHandledWrapperReloadStamp(), deferredRecoverySuperseded(), ensureAcceptedDomClean(), findAcceptedRuntimeWrappers(), handledWrapperReloadKey(), reloadAfterMissingAcceptedDom(), restoreAcceptedDomFromSnapshot() (+3 more)

### Community 88 - "Diagnostic Scan"
Cohesion: 0.33
Nodes (6): 1. Accessibility (VoiceOver / TalkBack), 2. Performance, 3. Appearance & Theming, 4. Platform Conformance (CRITICAL), 5. Adaptivity, Diagnostic Scan

### Community 89 - "gymskutec.cz rebuild: analysis and implementation plan"
Cohesion: 0.33
Nodes (5): Blockers, gymskutec.cz rebuild: analysis and implementation plan, Phased roadmap (once unblocked), Reference repositories (read only, not modified), Target site (what could be confirmed)

### Community 90 - "showToast"
Cohesion: 0.10
Nodes (27): abandonForeignSession(), abandonSupersededGo(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), copyToClipboard(), describeMountFailure(), detectDevServerBase(), discardOrphanedSession() (+19 more)

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

### Community 95 - "o"
Cohesion: 0.33
Nodes (3): _getAccessToken(), o, s()

### Community 96 - "Brand compliance"
Cohesion: 0.40
Nodes (4): Brand compliance, Open approvals, School logo (`static/img/logo/`), Share card (`static/img/og.jpg`)

### Community 97 - "Zaměstnanci školy"
Cohesion: 0.50
Nodes (4): Pedagogický sbor, Provozní zaměstnanci, Vedení školy, Zaměstnanci školy

### Community 98 - "doctor.md"
Cohesion: 0.25
Nodes (7): Monorepo notes, Opting out of the boot check, Step 1: Run the pass, Step 2: Act by severity, Step 3: Deprecated fields are binding, Step 4: Do not overclaim on truth drift, What this owns, and what it does not

### Community 100 - "bolder.md"
Cohesion: 0.33
Nodes (5): Before you finish, Scope is sovereign, The amplification, The skeleton test, Why it reads flat

### Community 108 - "$impeccable hooks"
Cohesion: 0.33
Nodes (6): Constraints, Failure modes, Flow, $impeccable hooks, Routing, Triage findings

### Community 109 - "Read"
Cohesion: 0.50
Nodes (3): Comps, Directions, Read

### Community 110 - "Q"
Cohesion: 0.15
Nodes (4): G, Q, X, z()

### Community 112 - "ci.yml"
Cohesion: 0.13
Nodes (14): runs-on, steps, jobs, build, name, on, pull_request, push (+6 more)

### Community 113 - "c"
Cohesion: 0.18
Nodes (3): c, clone(), normalizeNative()

### Community 114 - "update"
Cohesion: 0.19
Nodes (13): A(), a, build(), getDelta(), getRange(), I(), i(), insertBefore() (+5 more)

### Community 116 - "optimize"
Cohesion: 0.25
Nodes (7): appendChild(), enforceAllowedChildren(), insertAt(), optimize(), splitAfter(), wrap(), Y

### Community 118 - "Operate mode depth (and Read notes)"
Cohesion: 0.22
Nodes (9): Color, Components, Layout, Motion, Operate mode depth (and Read notes), Product constraints, Product permissions, The product slop test (+1 more)

### Community 119 - "ye"
Cohesion: 0.25
Nodes (9): Ee(), ht(), pt(), u(), ut(), vt(), wt(), ye() (+1 more)

### Community 120 - "serve"
Cohesion: 0.36
Nodes (8): serve(), do_GET(), end_headers(), guess_type(), Act on the receipt, Assemble and review, Plan and asset review, Plan, capture, serve

### Community 121 - "L"
Cohesion: 0.29
Nodes (7): Ct(), Et(), J(), L(), me(), Se(), Tt()

### Community 122 - "image"
Cohesion: 0.29
Nodes (7): 6. Build with full commitment, Both paths, Code-led, Comp-led: the comp is a measured contract, After approval: the comp becomes a spec, Front matter fields, image()

### Community 123 - "Publishing (news, events, notices, galleries)"
Cohesion: 0.29
Nodes (6): Accounts, sign-in, roles, Publishing (news, events, notices, galleries), Running it locally, Schema (for reference), Security, What can be published

### Community 124 - "c"
Cohesion: 0.43
Nodes (4): c, i(), n(), r()

### Community 125 - "interface"
Cohesion: 0.40
Nodes (4): interface, default_prompt, display_name, short_description

### Community 126 - "Persuade and Experience"
Cohesion: 0.50
Nodes (3): Comps, Directions, Persuade and Experience

## Knowledge Gaps
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `image()` connect `image` to `serve`, `quill.js`, `Publishing (news, events, notices, galleries)`, `Region map`?**
  _High betweenness centrality (0.227) - this node is a cross-community bridge._
- **Are the 12 inferred relationships involving `Module()` (e.g. with `ac()` and `$b()`) actually correct?**
  _`Module()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **Should `live-browser.js` be split into smaller, more focused modules?**
  _Cohesion score 0.03160241279832153 - nodes in this community are weakly interconnected._
- **Why does `_` connect `_` to `n`, `h`, `a`, `de`, `jt`, `x`, `w`, `c`, `o`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Should `Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.021739130434782608 - nodes in this community are weakly interconnected._
- **Why does `e()` connect `jt` to `b`, `_`, `Module`, `update`, `s`, `j`, `ye`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Should `resumeSession` be split into smaller, more focused modules?**
  _Cohesion score 0.06458941901979877 - nodes in this community are weakly interconnected._