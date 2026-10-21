# Graph Report - skolaskutec  (2026-10-21)

## Corpus Check
- 92 files · ~239,582 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 31 file(s) not represented in the graph (top: .woff2 16, .toml 4, (none) 4)

## Summary
- 2211 nodes · 5175 edges · 119 communities (101 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 144 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `49d08575`
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
- news.local.js
- Articles
- m
- news-editor.js
- renderDesignVisual
- length
- build.py
- handleManualEditActivity
- .push
- Module
- initPageChat
- new-work.md
- o
- initGlobalBar
- Rt
- live.md
- resolveLiveInjectionAnchor
- mountSvelteComponentVariant
- re
- i
- z
- onboard.md
- jt
- news.js
- SKILL.md
- The Toolkit
- build
- .forEach
- createLiveBrowserDomHelpers
- createLiveBrowserSessionState
- N
- showToast
- .remove
- animate.md
- Handle `generate`
- Generate Report
- New visual work
- O škole (menu item without its own URL)
- optimize.md
- captureElementToBlob
- Scan mode (approach C: auto-extract, then confirm descriptive language)
- Hardening Dimensions
- u
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
- Operate mode depth (and Read notes)
- Shape
- gymskutec.cz
- startVoice
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
- .Cb
- live-browser-ignores.js
- layout
- eb
- Diagnostic Scan
- gymskutec.cz rebuild: analysis and implementation plan
- R
- Impeccable Documenter
- QA report — gymskutec.cz (19 October 2026)
- Region map
- Heuristics Scoring Guide
- Read
- Brand compliance
- Zaměstnanci školy
- render_page
- CLAUDE.md
- .getLength
- url-map.md
- PRODUCT.md
- doctor.md
- E
- Publishing (news, events, notices, galleries)
- lockup
- N
- page_body
- c
- enhance_body
- .mcp.json
- Operate

## God Nodes (most connected - your core abstractions)
1. `Pages` - 92 edges
2. `i` - 63 edges
3. `Module()` - 51 edges
4. `m` - 51 edges
5. `length()` - 51 edges
6. `o` - 47 edges
7. `s` - 44 edges
8. `Articles` - 38 edges
9. `h()` - 35 edges
10. `connectSSE()` - 34 edges

## Surprising Connections (you probably didn't know these)
- `Safe Areas: Handle the Notch` --references--> `env()`  [INFERRED]
  .claude/skills/impeccable/reference/adapt.md → api/news.js
- `Step 1: Parse the request` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/generate.md → build.py
- `3. Load the action's reference` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/live.md → build.py
- `Phase D: Squint test` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/live.md → build.py
- `Comp-led: the comp is a measured contract` --references--> `image()`  [INFERRED]
  .claude/skills/impeccable/reference/new-work.md → static/js/vendor/quill-2.0.3/quill.js

## Import Cycles
- None detected.

## Communities (119 total, 18 thin omitted)

### Community 0 - "live-browser.js"
Cohesion: 0.04
Nodes (95): addManualContextText(), applyEditing(), applyParamValue(), applyPlaceholderSizingStyles(), bindEditBadgeProxy(), buildLocatorForLeaf(), buildPlaceholderResizeHandles(), canRestoreManualEditElement() (+87 more)

### Community 1 - "Pages"
Cohesion: 0.02
Nodes (92): Adopce na dálku, Anglie 2015, Archiv – 3. fairtradeová kavárna, Archiv – Diplomy a ocenění, Archiv – Dětská majálesová olympiáda 2014, Archiv – Majáles 2014, Archiv – Majáles 2015, Archiv – Maturitní ples 2015 (+84 more)

### Community 2 - "resumeSession"
Cohesion: 0.06
Nodes (83): abortSvelteComponentInjection(), applyParamDefaults(), applyPlaceholderDimensions(), applySavedSessionMeta(), clampVariantIndex(), clearHandled(), clearSession(), closedClipPath() (+75 more)

### Community 3 - "quill.js"
Cohesion: 0.07
Nodes (38): buildItem(), buildLabel(), buildOptions(), buildPicker(), close(), constructor(), create(), Dt() (+30 more)

### Community 4 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 5 - "el"
Cohesion: 0.07
Nodes (58): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+50 more)

### Community 6 - "serve"
Cohesion: 0.14
Nodes (15): serve(), do_GET(), end_headers(), guess_type(), Act on the receipt, Assemble and review, Plan and asset review, Plan, capture, serve (+7 more)

### Community 7 - "connectSSE"
Cohesion: 0.12
Nodes (48): beginNewLiveConfiguration(), buildPickedAnchorSnapshot(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), cleanupAcceptedSession(), clearAnnotations(), clearInsertPicking() (+40 more)

### Community 8 - "news.local.js"
Cohesion: 0.14
Nodes (9): blobs, crypto, fs, handler, http, path, port, ROOT (+1 more)

### Community 9 - "Articles"
Cohesion: 0.05
Nodes (42): Articles, Branná soutěž MISE – reminiscence 2025, Den lidských práv – Nebeští jezdci, Dobročinná svačinka, Europass, Expedice Skotsko 2024, Festival vědy a techniky, Finále Recyklohraní (+34 more)

### Community 10 - "m"
Cohesion: 0.10
Nodes (8): attachUI(), d(), g(), getHTML(), handler(), length(), m, query()

### Community 11 - "news-editor.js"
Cohesion: 0.09
Nodes (47): Constraints, Failure modes, Flow, $impeccable hooks, Routing, Triage findings, addCategory(), attachmentRow() (+39 more)

### Community 12 - "renderDesignVisual"
Cohesion: 0.07
Nodes (42): buildCollapsible(), buildColorModels(), buildDesignHeader(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), cssSafe(), designEmptyMessage() (+34 more)

### Community 14 - "build.py"
Cohesion: 0.13
Nodes (16): breadcrumbs(), crumbs_html(), event_slug(), event_when(), events_list(), events_page_html(), home_events_band(), _index() (+8 more)

### Community 15 - "handleManualEditActivity"
Cohesion: 0.19
Nodes (24): clearStoredManualApplyState(), fetchPendingCount(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage(), numberOrNull() (+16 more)

### Community 16 - ".push"
Cohesion: 0.15
Nodes (7): E(), h(), hasNext(), peek(), peekLength(), peekType(), rest()

### Community 17 - "Module"
Cohesion: 0.11
Nodes (6): Module(), O(), R(), sb(), ua(), ub()

### Community 18 - "initPageChat"
Cohesion: 0.12
Nodes (36): applyGlobalBarLabelState(), armPageChatForTyping(), attachSteerFocusDebug(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), collapsePageChat(), expandPageChat() (+28 more)

### Community 19 - "new-work.md"
Cohesion: 0.10
Nodes (18): Recommended Actions, Craft (deprecated alias), Apply, Live-mode signature params, Set the spatial thesis, Two isolated assessments, Verify, Visitor mode (+10 more)

### Community 20 - "o"
Cohesion: 0.11
Nodes (20): A(), applyDelta(), attribute(), deleteText(), detach(), f, formatLine(), formatText() (+12 more)

### Community 21 - "initGlobalBar"
Cohesion: 0.09
Nodes (38): agentHasWorkInFlight(), agentStatusText(), applyLiveBarPreference(), attachSteerFocusGuard(), barPaletteForTheme(), brandMarkSvg(), buildParamsPanel(), clearSteerFocusRecoverTimer() (+30 more)

### Community 23 - "live.md"
Cohesion: 0.07
Nodes (26): Step 1: Parse the request, Step 2: Reuse the page, then start, Step 3: Generate, Step 4: Accept and close, Cleanup, Exit, First-time setup, Handle `accept` (+18 more)

### Community 24 - "resolveLiveInjectionAnchor"
Cohesion: 0.16
Nodes (19): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), elementMatchesOriginalMarkup() (+11 more)

### Community 25 - "mountSvelteComponentVariant"
Cohesion: 0.11
Nodes (29): acceptedDomAlreadyClean(), applyOriginalAttrsToSvelteAnchor(), clearHandledWrapperReloadStamp(), clearMountErrorCard(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), deferredRecoverySuperseded(), describeMountFailure() (+21 more)

### Community 26 - "re"
Cohesion: 0.06
Nodes (16): main(), Page, redirect_sources(), resolves(), lockup(), shield(), text_path(), vos_lockup() (+8 more)

### Community 28 - "z"
Cohesion: 0.16
Nodes (3): q(), X, z()

### Community 29 - "onboard.md"
Cohesion: 0.09
Nodes (22): Assess Onboarding Needs, Context Over Ceremony, Contextual Help, Design Onboarding Experiences, Documentation & Help, Empty State Design, Feature Discovery & Adoption, Guided Tours & Walkthroughs (+14 more)

### Community 30 - "jt"
Cohesion: 0.09
Nodes (21): attach(), Bt(), Ct(), Ft(), getBounds(), getRange(), Gt(), hide() (+13 more)

### Community 31 - "news.js"
Cohesion: 0.05
Nodes (61): clean(), esc(), FIELDS, handler(), redirect(), ALLOWED, CATEGORIES, commit() (+53 more)

### Community 32 - "SKILL.md"
Cohesion: 0.11
Nodes (15): Before you finish, Scope is sovereign, The amplification, The skeleton test, Why it reads flat, Craft floor, Refuse, Verify (+7 more)

### Community 33 - "The Toolkit"
Cohesion: 0.10
Nodes (20): Animate complex properties, Assess What "Extraordinary" Means Here, For data-heavy interfaces, For functional UI, For performance-critical UI, For visual/marketing surfaces, Implement with Discipline, Interact with the device (+12 more)

### Community 34 - "build"
Cohesion: 0.25
Nodes (8): build(), plain(), render_news_editor(), render_simple(), rss(), section_children_html(), sitemap_html(), write()

### Community 35 - ".forEach"
Cohesion: 0.13
Nodes (13): b(), build(), clean(), copy(), descendant(), descendants(), Et(), find() (+5 more)

### Community 36 - "createLiveBrowserDomHelpers"
Cohesion: 0.14
Nodes (18): createLiveBrowserDomHelpers(), activeElementDeep(), cloneWithoutChrome(), copyTextViaSelection(), cssId(), liveUiRoot(), makeFrozenAnchor(), own() (+10 more)

### Community 37 - "createLiveBrowserSessionState"
Cohesion: 0.19
Nodes (17): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+9 more)

### Community 38 - "N"
Cohesion: 0.05
Nodes (27): Assess Adaptation Challenge, Breakpoints: Content-Driven, Content Adaptation, Desktop Adaptation (Mobile → Desktop), Detect Input Method, Not Just Screen Size, Email Adaptation (Web → Email), Implement Adaptations, Layout Adaptation Patterns (+19 more)

### Community 39 - "showToast"
Cohesion: 0.09
Nodes (31): abandonForeignSession(), abandonSupersededGo(), captureAndEmit(), checkpointPayload(), cleanup(), clearScrollY(), compileShader(), copyToClipboard() (+23 more)

### Community 40 - ".remove"
Cohesion: 0.16
Nodes (17): appendChild(), clone(), deleteAt(), enforceAllowedChildren(), format(), formatAt(), insertAt(), insertBefore() (+9 more)

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

### Community 47 - "captureElementToBlob"
Cohesion: 0.08
Nodes (36): averageRgb01(), beginEditPin(), bufferToBase64(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), captureChromeNodes(), captureElementFromRenderedAncestor() (+28 more)

### Community 48 - "Scan mode (approach C: auto-extract, then confirm descriptive language)"
Cohesion: 0.15
Nodes (13): Component translation rules, Narrative mapping, Scan mode (approach C: auto-extract, then confirm descriptive language), Schema, Step 1: Find the design assets, Step 2: Auto-extract what can be auto-extracted, Step 2b: Stage the frontmatter, Step 3: Ask the user for qualitative language (+5 more)

### Community 49 - "Hardening Dimensions"
Cohesion: 0.15
Nodes (11): Accessibility Resilience, Assess Hardening Needs, Edge Cases & Boundary Conditions, Error Handling, Hardening Dimensions, Input Validation & Sanitization, Internationalization (i18n), Performance Resilience (+3 more)

### Community 51 - "u"
Cohesion: 0.19
Nodes (6): Monorepo notes, add(), remove(), removeChild(), u, value()

### Community 52 - "actOnAgentTarget"
Cohesion: 0.26
Nodes (18): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), declineAgentTargetBusy(), declineAgentTargetUnresolvable() (+10 more)

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
Cohesion: 0.18
Nodes (10): buildCommand, cleanUrls, crons, framework, headers, installCommand, outputDirectory, redirects (+2 more)

### Community 67 - "Common Cognitive Load Violations"
Cohesion: 0.22
Nodes (9): 1. The Wall of Options, 2. The Memory Bridge, 3. The Hidden Navigation, 4. The Jargon Barrier, 5. The Visual Noise Floor, 6. The Inconsistent Pattern, 7. The Multi-Task Demand, 8. The Context Switch (+1 more)

### Community 68 - "iOS platform"
Cohesion: 0.22
Nodes (9): Color & materials, Components & controls, iOS platform, Layout & structure, Motion, The iOS slop test, Touch targets, Typography (+1 more)

### Community 69 - "Operate mode depth (and Read notes)"
Cohesion: 0.22
Nodes (9): Color, Components, Layout, Motion, Operate mode depth (and Read notes), Product constraints, Product permissions, The product slop test (+1 more)

### Community 70 - "Shape"
Cohesion: 0.22
Nodes (8): Cadence, Confirm and stop, Phase 1: Discovery interview, Phase 2: Resolve the design direction, Phase 3: Write the brief, Round 1: purpose, people, and outcome, Round 2: material, behavior, and boundaries, Shape

### Community 71 - "gymskutec.cz"
Cohesion: 0.25
Nodes (7): Front matter fields, gymskutec.cz, News (no GitHub needed), Rules (Grand Magistry communications policy and coat-of-arms guidelines), Security notes, Shared code, Where things are

### Community 72 - "startVoice"
Cohesion: 0.29
Nodes (11): configureVoiceContext(), finishVoiceSession(), isEmbeddedPreviewBrowser(), releaseVoiceEngine(), startVoice(), steerSpeechRecognitionCtor(), steerVoiceErrorMessage(), steerVoiceUnavailableMessage() (+3 more)

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

### Community 83 - ".Cb"
Cohesion: 0.28
Nodes (8): c(), d(), I, jb(), kb(), lb(), mb(), qb()

### Community 85 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 86 - "layout"
Cohesion: 0.27
Nodes (10): fmt_date(), img(), layout(), link_attr(), nav_html(), news_card(), pinned_html(), render_article() (+2 more)

### Community 87 - "eb"
Cohesion: 0.33
Nodes (6): Aa(), eb(), fb(), wa(), ya(), za()

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
Cohesion: 0.29
Nodes (6): Cross-device audit and publishing workflow (21 October 2026), Final audit before presentation (19 October 2026), Impeccable critique and what changed, QA report — gymskutec.cz (19 October 2026), Results, Unresolved (needs the school, the Grand Priory or network access)

### Community 93 - "Region map"
Cohesion: 0.40
Nodes (4): Containment, Painted material, Region map, What varies independently

### Community 94 - "Heuristics Scoring Guide"
Cohesion: 0.50
Nodes (4): Heuristics Scoring Guide, Issue Severity (P0–P3), Reference Material, Score Summary

### Community 95 - "Read"
Cohesion: 0.50
Nodes (3): Comps, Directions, Read

### Community 96 - "Brand compliance"
Cohesion: 0.40
Nodes (4): Brand compliance, Open approvals, School logo (`static/img/logo/`), Share card (`static/img/og.jpg`)

### Community 97 - "Zaměstnanci školy"
Cohesion: 0.50
Nodes (4): Pedagogický sbor, Provozní zaměstnanci, Vedení školy, Zaměstnanci školy

### Community 98 - "render_page"
Cohesion: 0.29
Nodes (6): contact_card(), contact_form(), _descendants(), render_page(), side_nav(), walk()

### Community 106 - "doctor.md"
Cohesion: 0.29
Nodes (6): Opting out of the boot check, Step 1: Run the pass, Step 2: Act by severity, Step 3: Deprecated fields are binding, Step 4: Do not overclaim on truth drift, What this owns, and what it does not

### Community 108 - "E"
Cohesion: 0.33
Nodes (6): a(), bb(), cc(), a(), sa(), va()

### Community 109 - "Publishing (news, events, notices, galleries)"
Cohesion: 0.29
Nodes (6): Daily rebuild (scheduled posts, events), Publishing (news, events, notices, galleries), Security, Testing, What can be published, Who can do what

### Community 111 - "N"
Cohesion: 0.52
Nodes (7): hb(), ib(), M(), N(), P(), Q(), rb()

### Community 112 - "page_body"
Cohesion: 0.47
Nodes (5): gallery_html(), gallery_posts(), page_body(), photos_of(), render_gallery()

### Community 113 - "c"
Cohesion: 0.13
Nodes (4): c, image(), k, normalizeNative()

### Community 115 - "enhance_body"
Cohesion: 0.40
Nodes (3): enhance_body(), fix_img(), image_size()

### Community 118 - "Operate"
Cohesion: 0.50
Nodes (3): Comps, Directions, Operate

## Knowledge Gaps
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Monorepo notes` connect `u` to `doctor.md`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `i` (e.g. with `e()` and `i()`) actually correct?**
  _`i` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `live-browser.js` be split into smaller, more focused modules?**
  _Cohesion score 0.040606060606060604 - nodes in this community are weakly interconnected._
- **Why does `Module()` connect `Module` to `news.local.js`, `E`, `N`, `pdf-worker.js`, `.Cb`, `eb`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Module()` (e.g. with `ac()` and `$b()`) actually correct?**
  _`Module()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Should `Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.021739130434782608 - nodes in this community are weakly interconnected._
- **Why does `image()` connect `c` to `quill.js`, `serve`, `gymskutec.cz`, `Visualize: Direction Comps & Asset Production`, `New visual work`, `Region map`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._