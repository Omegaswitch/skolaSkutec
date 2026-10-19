# Graph Report - skolaSkutec  (2026-10-19)

## Corpus Check
- 84 files · ~223,789 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 28 file(s) not represented in the graph (top: .woff2 16, .toml 4, (none) 3)

## Summary
- 2062 nodes · 4913 edges · 106 communities (92 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 129 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `15c93f41`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- live-browser.js
- Pages
- resumeSession
- quill.js
- modern-screenshot.umd.js
- el
- New visual work
- connectSSE
- .forEach
- Articles
- m
- news-editor.js
- renderDesignVisual
- length
- build.py
- handleManualEditActivity
- .push
- o
- initPageChat
- new-work.md
- cleanup
- initGlobalBar
- Rt
- live.md
- split
- showToast
- re
- i
- captureElementToBlob
- onboard.md
- .listen
- news.js
- SKILL.md
- The Toolkit
- mountSvelteComponentVariant
- .remove
- createLiveBrowserDomHelpers
- createLiveBrowserSessionState
- N
- resolveLiveInjectionAnchor
- adapt.md
- animate.md
- Handle `generate`
- Generate Report
- onAnnotDown
- O škole (menu item without its own URL)
- optimize.md
- u
- Scan mode (approach C: auto-extract, then confirm descriptive language)
- Hardening Dimensions
- kontakt.js
- publish
- news.test.js
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
- Responsive Design
- Init flow
- Školní akce
- vercel.json
- Common Cognitive Load Violations
- iOS platform
- Operate mode depth (and Read notes)
- Shape
- enableInlineEdit
- make_logo.py
- adapt.native.md
- Android platform
- colorize.md
- Persona-Based Design Testing
- Extract Flow
- Generate Report
- Cognitive Load Assessment
- Impeccable Finish Reviewer
- Impeccable Manual Edit Applier
- doctor.md
- live-browser-ignores.js
- enhance_body
- Page
- Diagnostic Scan
- gymskutec.cz rebuild: analysis and implementation plan
- R
- Impeccable Documenter
- QA report — gymskutec.cz (19 October 2026)
- .getLength
- Heuristics Scoring Guide
- Read
- Brand compliance
- Zaměstnanci školy
- _descendants
- CLAUDE.md
- url-map.md
- PRODUCT.md

## God Nodes (most connected - your core abstractions)
1. `Pages` - 92 edges
2. `i` - 63 edges
3. `m` - 51 edges
4. `length()` - 51 edges
5. `o` - 47 edges
6. `s` - 44 edges
7. `Articles` - 38 edges
8. `h()` - 35 edges
9. `connectSSE()` - 34 edges
10. `setLiveState()` - 33 edges

## Surprising Connections (you probably didn't know these)
- `Safe Areas: Handle the Notch` --references--> `env()`  [INFERRED]
  .claude/skills/impeccable/reference/adapt.md → api/news.js
- `Step 1: Parse the request` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/generate.md → build.py
- `3. Load the action's reference` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/live.md → build.py
- `Phase D: Squint test` --references--> `layout()`  [INFERRED]
  .claude/skills/impeccable/reference/live.md → build.py
- `srcset with Width Descriptors` --references--> `w()`  [INFERRED]
  .claude/skills/impeccable/reference/adapt.md → static/js/vendor/quill-2.0.3/quill.js

## Import Cycles
- None detected.

## Communities (106 total, 14 thin omitted)

### Community 0 - "live-browser.js"
Cohesion: 0.04
Nodes (103): addManualContextText(), agentHasWorkInFlight(), applyEditing(), applyGlobalBarLabelState(), applyPlaceholderSizingStyles(), bindEditBadgeProxy(), bufferToBase64(), buildLocatorForLeaf() (+95 more)

### Community 1 - "Pages"
Cohesion: 0.02
Nodes (92): Adopce na dálku, Anglie 2015, Archiv – 3. fairtradeová kavárna, Archiv – Diplomy a ocenění, Archiv – Dětská majálesová olympiáda 2014, Archiv – Majáles 2014, Archiv – Majáles 2015, Archiv – Maturitní ples 2015 (+84 more)

### Community 2 - "resumeSession"
Cohesion: 0.06
Nodes (82): applyParamDefaults(), applyParamValue(), applyPlaceholderDimensions(), applySavedSessionMeta(), buildParamsPanel(), clampVariantIndex(), clearHandled(), closedClipPath() (+74 more)

### Community 3 - "quill.js"
Cohesion: 0.07
Nodes (46): attribute(), Bt(), buildItem(), buildLabel(), buildOptions(), buildPicker(), close(), constructor() (+38 more)

### Community 4 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 5 - "el"
Cohesion: 0.07
Nodes (56): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+48 more)

### Community 6 - "New visual work"
Cohesion: 0.04
Nodes (44): serve(), do_GET(), end_headers(), guess_type(), Act on the receipt, Assemble and review, Plan and asset review, Plan, capture, serve (+36 more)

### Community 7 - "connectSSE"
Cohesion: 0.12
Nodes (49): actOnAgentTarget(), beginNewLiveConfiguration(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), clearAnnotations(), clearInsertPicking(), closeTunePopover() (+41 more)

### Community 8 - ".forEach"
Cohesion: 0.10
Nodes (18): attach(), b(), build(), clean(), create(), descendant(), Et(), f (+10 more)

### Community 9 - "Articles"
Cohesion: 0.05
Nodes (42): Articles, Branná soutěž MISE – reminiscence 2025, Den lidských práv – Nebeští jezdci, Dobročinná svačinka, Europass, Expedice Skotsko 2024, Festival vědy a techniky, Finále Recyklohraní (+34 more)

### Community 10 - "m"
Cohesion: 0.08
Nodes (5): attachUI(), g(), getHTML(), m, X

### Community 11 - "news-editor.js"
Cohesion: 0.12
Nodes (35): Constraints, Failure modes, Flow, $impeccable hooks, Routing, Triage findings, addCategory(), attachmentRow() (+27 more)

### Community 12 - "renderDesignVisual"
Cohesion: 0.08
Nodes (39): buildCollapsible(), buildColorModels(), buildDesignHeader(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), cssSafe(), designEmptyMessage() (+31 more)

### Community 13 - "length"
Cohesion: 0.09
Nodes (9): index(), k, length(), next(), normalizedToRange(), normalizeNative(), offset(), register() (+1 more)

### Community 14 - "build.py"
Cohesion: 0.12
Nodes (29): breadcrumbs(), build(), contact_card(), contact_form(), crumbs_html(), fmt_date(), img(), _index() (+21 more)

### Community 15 - "handleManualEditActivity"
Cohesion: 0.12
Nodes (38): agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), clearStoredManualApplyState(), declineAgentTargetBusy(), declineAgentTargetUnresolvable() (+30 more)

### Community 16 - ".push"
Cohesion: 0.13
Nodes (11): A(), descendants(), h(), hasNext(), i(), p(), path(), peek() (+3 more)

### Community 17 - "o"
Cohesion: 0.17
Nodes (15): applyDelta(), d(), deleteText(), detach(), formatLine(), formatText(), getDelta(), handler() (+7 more)

### Community 18 - "initPageChat"
Cohesion: 0.14
Nodes (32): armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), collapsePageChat(), expandPageChat() (+24 more)

### Community 19 - "new-work.md"
Cohesion: 0.08
Nodes (21): Recommended Actions, Craft (deprecated alias), Apply, Live-mode signature params, Set the spatial thesis, Two isolated assessments, Verify, Visitor mode (+13 more)

### Community 20 - "cleanup"
Cohesion: 0.11
Nodes (31): abortSvelteComponentInjection(), buildInsertPlaceholderSnapshotFromDom(), cleanup(), cleanupAcceptedSession(), clearMountErrorCard(), clearScrollY(), clearSession(), discardedWrappers() (+23 more)

### Community 21 - "initGlobalBar"
Cohesion: 0.11
Nodes (29): agentStatusText(), applyLiveBarPreference(), barPaletteForTheme(), brandMarkSvg(), clearSteerFocusRecoverTimer(), designPanelCss(), detectPageTheme(), ensureAgentPollTooltip() (+21 more)

### Community 23 - "live.md"
Cohesion: 0.07
Nodes (26): Step 1: Parse the request, Step 2: Reuse the page, then start, Step 3: Generate, Step 4: Accept and close, Cleanup, Exit, First-time setup, Handle `accept` (+18 more)

### Community 24 - "split"
Cohesion: 0.11
Nodes (8): appendChild(), c, clone(), insertAt(), keys(), q(), split(), splitAfter()

### Community 25 - "showToast"
Cohesion: 0.12
Nodes (25): abandonForeignSession(), abandonSupersededGo(), copyToClipboard(), discardOrphanedSession(), dismissToast(), finishVoiceSession(), handleDiscard(), isEmbeddedPreviewBrowser() (+17 more)

### Community 26 - "re"
Cohesion: 0.15
Nodes (9): main(), redirect_sources(), resolves(), local_name(), main(), slug(), exists(), main() (+1 more)

### Community 28 - "captureElementToBlob"
Cohesion: 0.11
Nodes (23): averageRgb01(), captureAndEmit(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), checkpointPayload(), compileShader(), cssColorToRgb01() (+15 more)

### Community 29 - "onboard.md"
Cohesion: 0.09
Nodes (22): Assess Onboarding Needs, Context Over Ceremony, Contextual Help, Design Onboarding Experiences, Documentation & Help, Empty State Design, Feature Discovery & Adoption, Guided Tours & Walkthroughs (+14 more)

### Community 30 - ".listen"
Cohesion: 0.15
Nodes (8): formula(), getBounds(), hide(), link(), qt(), St(), T(), video()

### Community 31 - "news.js"
Cohesion: 0.10
Nodes (16): ALLOWED, CATEGORIES, crypto, excerptOf(), failures, MAGIC, plain(), RENAME (+8 more)

### Community 32 - "SKILL.md"
Cohesion: 0.10
Nodes (15): Before you finish, Scope is sovereign, The amplification, The skeleton test, Why it reads flat, Craft floor, Refuse, Verify (+7 more)

### Community 33 - "The Toolkit"
Cohesion: 0.10
Nodes (20): Animate complex properties, Assess What "Extraordinary" Means Here, For data-heavy interfaces, For functional UI, For performance-critical UI, For visual/marketing surfaces, Implement with Discipline, Interact with the device (+12 more)

### Community 34 - "mountSvelteComponentVariant"
Cohesion: 0.15
Nodes (21): acceptedDomAlreadyClean(), applyOriginalAttrsToSvelteAnchor(), clearHandledWrapperReloadStamp(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), deferredRecoverySuperseded(), describeMountFailure(), detectDevServerBase() (+13 more)

### Community 35 - ".remove"
Cohesion: 0.16
Nodes (11): deleteAt(), enforceAllowedChildren(), formatAt(), isolate(), moveChildren(), optimize(), replaceWith(), show() (+3 more)

### Community 36 - "createLiveBrowserDomHelpers"
Cohesion: 0.16
Nodes (15): createLiveBrowserDomHelpers(), activeElementDeep(), cloneWithoutChrome(), copyTextViaSelection(), cssId(), liveUiRoot(), makeFrozenAnchor(), raiseHitModal() (+7 more)

### Community 37 - "createLiveBrowserSessionState"
Cohesion: 0.19
Nodes (17): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+9 more)

### Community 38 - "N"
Cohesion: 0.16
Nodes (3): E(), N, w()

### Community 39 - "resolveLiveInjectionAnchor"
Cohesion: 0.16
Nodes (19): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), elementMatchesOriginalMarkup() (+11 more)

### Community 40 - "adapt.md"
Cohesion: 0.12
Nodes (15): Assess Adaptation Challenge, Content Adaptation, Desktop Adaptation (Mobile → Desktop), Email Adaptation (Web → Email), Implement Adaptations, Layout Adaptation Techniques, Mobile Adaptation (Desktop → Mobile), Navigation Adaptation (+7 more)

### Community 41 - "animate.md"
Cohesion: 0.12
Nodes (14): Accessibility and control, Choose material by meaning, Find the job, Implement to the runtime, Set the motion thesis, Timing and easing, Verify, Visitor mode (+6 more)

### Community 42 - "Handle `generate`"
Cohesion: 0.12
Nodes (16): 1. Read the screenshot (if present), 2. Wrap the element, 3. Load the action's reference, 4. Plan three variants: identity first, then mode, then axes, 5. Apply the freeform prompt (if present), 6. Deliver variants, 7. Parameters (composition-sized, 0-4 per variant), 8. Signal done (+8 more)

### Community 43 - "Generate Report"
Cohesion: 0.13
Nodes (14): 1. Accessibility (A11y), 2. Performance, 3. Theming, 4. Responsive Design, 5. Implementation Integrity (CRITICAL), Audit Health Score, Detailed Findings by Severity, Diagnostic Scan (+6 more)

### Community 44 - "onAnnotDown"
Cohesion: 0.24
Nodes (15): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), finalizeEditingPin(), initAnnotOverlay(), localCoords(), onAnnotDown() (+7 more)

### Community 45 - "O škole (menu item without its own URL)"
Cohesion: 0.13
Nodes (15): Absolventi a úspěchy, Dokumenty školy, Domov mládeže, E-podatelna, Fotogalerie, O škole (menu item without its own URL), Povinné informace, Pro dárce a sponzory (+7 more)

### Community 46 - "optimize.md"
Cohesion: 0.14
Nodes (13): Animation Performance, Assess Performance Issues, Core Web Vitals Optimization, Cumulative Layout Shift (CLS < 0.1), Interaction to Next Paint (INP < 200ms), Largest Contentful Paint (LCP < 2.5s), Loading Performance, Network Optimization (+5 more)

### Community 47 - "u"
Cohesion: 0.19
Nodes (6): Monorepo notes, add(), remove(), removeChild(), u, value()

### Community 48 - "Scan mode (approach C: auto-extract, then confirm descriptive language)"
Cohesion: 0.15
Nodes (13): Component translation rules, Narrative mapping, Scan mode (approach C: auto-extract, then confirm descriptive language), Schema, Step 1: Find the design assets, Step 2: Auto-extract what can be auto-extracted, Step 2b: Stage the frontmatter, Step 3: Ask the user for qualitative language (+5 more)

### Community 49 - "Hardening Dimensions"
Cohesion: 0.15
Nodes (11): Accessibility Resilience, Assess Hardening Needs, Edge Cases & Boundary Conditions, Error Handling, Hardening Dimensions, Input Validation & Sanitization, Internationalization (i18n), Performance Resilience (+3 more)

### Community 50 - "kontakt.js"
Cohesion: 0.23
Nodes (9): clean(), esc(), FIELDS, handler(), redirect(), assert, call(), handler (+1 more)

### Community 51 - "publish"
Cohesion: 0.33
Nodes (12): commit(), editable(), env(), esc(), exists(), gh(), load(), notify() (+4 more)

### Community 52 - "news.test.js"
Cohesion: 0.18
Nodes (9): slugify(), sniff(), upload(), assert, call(), commits, existing, handler (+1 more)

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

### Community 63 - "Responsive Design"
Cohesion: 0.20
Nodes (10): Breakpoints: Content-Driven, Detect Input Method, Not Just Screen Size, Layout Adaptation Patterns, Mobile-First: Write It Right, Picture Element for Art Direction, Responsive Design, Responsive Images: Get It Right, Safe Areas: Handle the Notch (+2 more)

### Community 64 - "Init flow"
Cohesion: 0.20
Nodes (10): Completion gate, Init flow, Step 1: Load current state, Step 2: Explore the project, Step 3: Interview for product truth, Step 4: Write PRODUCT.md, Step 5: Record workflow defaults, Step 6: Wrap up or resume (+2 more)

### Community 65 - "Školní akce"
Cohesion: 0.20
Nodes (10): Other Projekty subpages (not fetched), Projektové dny, Projekty, Projekty EU, Soutěže, Sportovní akce, Studentské kavárny, Zahraniční zájezdy (+2 more)

### Community 66 - "vercel.json"
Cohesion: 0.20
Nodes (9): buildCommand, cleanUrls, framework, headers, installCommand, outputDirectory, redirects, $schema (+1 more)

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

### Community 71 - "enableInlineEdit"
Cohesion: 0.22
Nodes (9): collectEditableTextRows(), visit(), own(), pickable(), stopFocusOutIntoChrome(), enableInlineEdit(), layoutFlowChildren(), onInlineInput() (+1 more)

### Community 72 - "make_logo.py"
Cohesion: 0.28
Nodes (3): lockup(), shield(), text_path()

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

### Community 83 - "doctor.md"
Cohesion: 0.29
Nodes (6): Opting out of the boot check, Step 1: Run the pass, Step 2: Act by severity, Step 3: Deprecated fields are binding, Step 4: Do not overclaim on truth drift, What this owns, and what it does not

### Community 85 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 86 - "enhance_body"
Cohesion: 0.33
Nodes (3): enhance_body(), fix_img(), image_size()

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
Cohesion: 0.40
Nodes (4): Impeccable critique and what changed, QA report — gymskutec.cz (19 October 2026), Results, Unresolved (needs the school, the Grand Priory or network access)

### Community 94 - "Heuristics Scoring Guide"
Cohesion: 0.50
Nodes (4): Heuristics Scoring Guide, Issue Severity (P0–P3), Reference Material, Score Summary

### Community 95 - "Read"
Cohesion: 0.50
Nodes (3): Comps, Directions, Read

### Community 96 - "Brand compliance"
Cohesion: 0.50
Nodes (3): Brand compliance, Open approvals, School logo (`static/img/logo/`)

### Community 97 - "Zaměstnanci školy"
Cohesion: 0.50
Nodes (4): Pedagogický sbor, Provozní zaměstnanci, Vedení školy, Zaměstnanci školy

### Community 98 - "_descendants"
Cohesion: 0.67
Nodes (3): _descendants(), side_nav(), walk()

## Knowledge Gaps
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Monorepo notes` connect `u` to `doctor.md`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `i` (e.g. with `e()` and `i()`) actually correct?**
  _`i` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `live-browser.js` be split into smaller, more focused modules?**
  _Cohesion score 0.036690896503980615 - nodes in this community are weakly interconnected._
- **Why does `length()` connect `length` to `quill.js`, `.remove`, `N`, `.forEach`, `m`, `u`, `.push`, `o`, `split`, `.listen`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Should `Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.021739130434782608 - nodes in this community are weakly interconnected._
- **Why does `image()` connect `New visual work` to `quill.js`, `length`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `resumeSession` be split into smaller, more focused modules?**
  _Cohesion score 0.05871725383920506 - nodes in this community are weakly interconnected._