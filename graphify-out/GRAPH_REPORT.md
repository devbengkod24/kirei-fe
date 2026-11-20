# Graph Report - kirei-fe  (2026-11-20)

## Corpus Check
- 426 files · ~241,317 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2135 nodes · 5796 edges · 111 communities (91 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 92 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3e6bf0b1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- announcement.ts
- types/reservation.ts
- toWibDateKey
- DraftCard.tsx
- availability.ts
- TimeWheel.tsx
- scheduleCsv.ts
- PageSkeleton
- RoomManager.tsx
- userSchema.ts
- UserManagement.tsx
- FloorPlanEditor.tsx
- UserReportList.tsx
- SportsHallReservationForm.tsx
- next
- ReservationTrendCard.tsx
- contrast-check.py
- useLiveData.ts
- AnnouncementManager.tsx
- Button
- wibDateTime
- CreateReservationPanel.tsx
- TypeTabs.tsx
- schema.ts
- package.json
- date.ts
- getDataMode.ts
- UniversityDashboard.tsx
- LecturerScheduleUpload.tsx
- content.ts
- createReservation.ts
- facility.ts
- compilerOptions
- Accessibility Code Patterns
- ReservationLogCalendar.tsx
- ComplaintForm.tsx
- requireRole
- Tone & Voice
- kirei-fe
- [tipe]/persetujuan/page.tsx
- antislop-layoutmobile
- lecturer-schedule/actions.ts
- auth/actions.ts
- getManagedUsers.ts
- What You Must Do When Invoked
- AdminDashboardSkeleton
- ReservationFormSkeleton
- ReservationType
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- Group 1: Hard Gate (absolute, no exceptions)
- RoomReservationForm.tsx
- Comments That Add Nothing
- react
- KIREI FE
- getUniversityDashboard.ts
- devDependencies
- Group 2: Purpose-Gate (technique allowed, purpose required)
- OrmawaShell.tsx
- Decorative Elements
- antislop-ui
- Core Web Vitals (LCP, INP, CLS)
- Layout & Components
- Visual & Color
- Group 3: Quality Locks (consistency)
- antislop
- graphify reference: extra exports and benchmark
- graphify reference: extra exports and benchmark
- Part 1: AI Slop Patterns (Warning Signs)
- App & Dashboard
- Web Baseline
- The Craftsmanship Standard
- graphify reference: query, path, explain
- graphify reference: query, path, explain
- AddUserDialog.tsx
- Delivery Gate (Mandatory)
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: commit hook and native CLAUDE.md integration
- Part 3: Liveliness Toolkit
- Structural & Flow
- graphify reference: add a URL and watch a folder
- graphify reference: incremental update and cluster-only
- graphify reference: add a URL and watch a folder
- graphify reference: incremental update and cluster-only
- README.md
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- rules/graphify.md
- .agents/skills/graphify/references/extraction-spec.md
- workflows/graphify.md
- CLAUDE.md
- .claude/CLAUDE.md
- .claude/skills/graphify/references/extraction-spec.md
- 2. Struktur dan fungsi folder
- RouteError.tsx
- Card
- Role dan Halaman
- dependencies
- scripts
- eslint.config.mjs

## God Nodes (most connected - your core abstractions)
1. `next` - 113 edges
2. `react` - 70 edges
3. `toWibDateKey()` - 67 edges
4. `Card()` - 62 edges
5. `Button` - 55 edges
6. `requireRole()` - 54 edges
7. `vitest` - 52 edges
8. `PageSkeleton()` - 43 edges
9. `ReservationType` - 43 edges
10. `RoomReservationForm()` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Di root repo` --references--> `MaskIcon()`  [INFERRED]
  docs/architecture.md → src/components/ui/MaskIcon.tsx
- `6. Urutan pembangunan yang disarankan` --references--> `getCurrentUser()`  [INFERRED]
  docs/architecture.md → src/lib/auth/getCurrentUser.ts
- `Mode data: dengan atau tanpa data dummy` --references--> `useLiveData()`  [INFERRED]
  docs/architecture.md → src/hooks/useLiveData.ts
- `Mode data: dengan atau tanpa data dummy` --references--> `useLiveState()`  [INFERRED]
  docs/architecture.md → src/hooks/useLiveData.ts
- `Client API (orval)` --references--> `applyFormErrors()`  [INFERRED]
  docs/architecture.md → src/lib/api/form-errors.ts

## Import Cycles
- None detected.

## Communities (111 total, 20 thin omitted)

### Community 0 - "announcement.ts"
Cohesion: 0.21
Nodes (8): BadgeProps, BadgeTone, SIZE_STYLES, TONE_STYLES, ANNOUNCEMENT_CATEGORY, ANNOUNCEMENT, LatestAnnouncementsCardProps, Announcement

### Community 1 - "types/reservation.ts"
Cohesion: 0.05
Nodes (75): Operator, ref_node_url, @testing-library/react, vitest, metadata, Page(), MaskIcon(), MaskIconProps (+67 more)

### Community 2 - "toWibDateKey"
Cohesion: 0.05
Nodes (73): Simulasi alur reservasi (mock store), 3. Titik Integrasi Mock untuk Prototipe, metadata, Page(), toWibDateKey(), LiveUniversityDashboard(), LiveAdminDashboard(), createReservation() (+65 more)

### Community 3 - "DraftCard.tsx"
Cohesion: 0.08
Nodes (45): Loading(), metadata, Page(), DRAFT_LETTER_HOURS, DeadlineInput, getCountdown(), NOW, useCountdown() (+37 more)

### Community 4 - "availability.ts"
Cohesion: 0.14
Nodes (20): addDaysToKey(), CreateReservationPanelProps, crossFacultyApprover(), defaultSchedule(), isRoomBooked(), roomBookingsOnDay(), roomStatus, RoomStatusInput (+12 more)

### Community 5 - "TimeWheel.tsx"
Cohesion: 0.26
Nodes (14): clampTime(), formatPart, HourRange, joinTime(), pad(), parseTypedPart(), splitTime(), stepPart() (+6 more)

### Community 6 - "scheduleCsv.ts"
Cohesion: 0.18
Nodes (14): parseCsv(), DAYS, normalizeTime(), overlaps(), ParsedSchedule, parseScheduleCsv(), rowSchema(), SCHEDULE_MAX_ROWS (+6 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.09
Nodes (22): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+14 more)

### Community 8 - "RoomManager.tsx"
Cohesion: 0.09
Nodes (43): Admin Fakultas, metadata, Page(), ROOM_PHOTO_MAX_SIZE_MB, classroomRow(), MOCK_BUILDINGS, MOCK_ROOMS, room() (+35 more)

### Community 9 - "userSchema.ts"
Cohesion: 0.09
Nodes (29): ADMIN_FAKULTAS, DOSEN, MOCK_MANAGED_USERS, OPERATORS, ORMAWA, AddUserDialogProps, STATUS_OPTIONS, UserDetailChanges (+21 more)

### Community 10 - "UserManagement.tsx"
Cohesion: 0.11
Nodes (31): Badge(), CardProps, LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, TABLE (+23 more)

### Community 11 - "FloorPlanEditor.tsx"
Cohesion: 0.13
Nodes (31): metadata, Page(), Drag, FloorPlanCanvas(), FloorPlanCanvasProps, CATEGORIES, FloorPlanEditor(), FloorPlanEditorProps (+23 more)

### Community 12 - "UserReportList.tsx"
Cohesion: 0.12
Nodes (30): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), isInPeriod(), shiftKey(), TIME_PERIOD_OPTIONS (+22 more)

### Community 13 - "SportsHallReservationForm.tsx"
Cohesion: 0.14
Nodes (21): rangesOverlap(), BookingMode, DATE, ReservationStep, STEPS_BY_TYPE, TIME, UPLOAD, ReservationLinks (+13 more)

### Community 14 - "next"
Cohesion: 0.18
Nodes (9): nextConfig, next, Page(), ComingSoonProps, TypeSummary, TypeSummaryCardProps, internalReservationRoute(), STAT_TONES (+1 more)

### Community 15 - "ReservationTrendCard.tsx"
Cohesion: 0.14
Nodes (17): LineChart(), LineChartProps, LineSeries, niceMax(), WeeklyCounts, ReservationTrendCard(), ReservationTrendCardProps, TrendView (+9 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "useLiveData.ts"
Cohesion: 0.20
Nodes (17): zod, LiveData, useLiveData(), clearLive(), listeners, LIVE_PREFIX, liveKey(), LiveStorage (+9 more)

### Community 18 - "AnnouncementManager.tsx"
Cohesion: 0.13
Nodes (21): PAGE_SIZE_OPTIONS, Pagination(), PaginationProps, Popover(), PopoverProps, useLiveState(), usePagination(), formatTimeWIB() (+13 more)

### Community 19 - "Button"
Cohesion: 0.17
Nodes (18): B. Pengelola (`admin_fakultas` dan `admin_universitas`), react-hook-form, CAPS_LABEL_CLASS, Button, ButtonProps, VARIANT_STYLES, Modal(), ReportDetailDialog() (+10 more)

### Community 20 - "wibDateTime"
Cohesion: 0.13
Nodes (16): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+8 more)

### Community 21 - "CreateReservationPanel.tsx"
Cohesion: 0.36
Nodes (7): @hookform/resolvers, CreateReservationPanel(), displayTime(), createOperatorReservation(), OPERATOR_RESERVATION_FIELD_MAP, operatorReservationSchema, OperatorReservationValues

### Community 22 - "TypeTabs.tsx"
Cohesion: 0.33
Nodes (5): SegmentedNav(), SegmentedNavItem, SegmentedNavProps, TypeTabsProps, RESERVATION_TYPES

### Community 23 - "schema.ts"
Cohesion: 0.08
Nodes (32): LETTER_MAX_SIZE_MB, ORGANISATION_MIN_DAYS_AHEAD, ROOM_CLOSE_TIME, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, BOOKING_MODES, BookingModeSettings (+24 more)

### Community 25 - "package.json"
Cohesion: 0.13
Nodes (13): name, private, version, jsdom, orval, react-dom, tailwindcss, @tailwindcss/turbopack (+5 more)

### Community 26 - "date.ts"
Cohesion: 0.17
Nodes (22): Countdown, DateInput, formatDateLongWIB(), formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatDayRange(), formatDayRangeShortWIB() (+14 more)

### Community 27 - "getDataMode.ts"
Cohesion: 0.24
Nodes (12): DATA_MODE_COOKIE, DataMode, parseDataMode(), readBrowserDataMode(), writeBrowserDataMode(), DataModeControls(), DataModeSwitch(), DataModeSwitchProps (+4 more)

### Community 28 - "UniversityDashboard.tsx"
Cohesion: 0.23
Nodes (11): MOCK_FAKULTAS, UniversityDashboardData, TypeSummaryCard(), TONE, UniversityDashboard(), UniversityDashboardProps, FakultasFilter(), FakultasFilterProps (+3 more)

### Community 30 - "LecturerScheduleUpload.tsx"
Cohesion: 0.19
Nodes (15): dayText(), LecturerScheduleUpload(), Picked, timeText(), DAY_LABEL, SCHEDULE_COLUMNS, buildingsSchema, floorPlanRoomSchema (+7 more)

### Community 31 - "content.ts"
Cohesion: 0.06
Nodes (49): framer-motion, src_app_globals, inter, metadata, poppins, metadata, Page(), SITE (+41 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.15
Nodes (18): wibToIso(), CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., ReservationListing, ReservationRequest, status(), text() (+10 more)

### Community 33 - "facility.ts"
Cohesion: 0.15
Nodes (18): buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_BUILDINGS, MOCK_ROOM_RULES, MOCK_SPORTS_HALL, MOCK_VEHICLES, SAMPLE_CAPACITY, TODO: replace with the orval client for buildings and floor plans (no-store). (+10 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 37 - "ReservationLogCalendar.tsx"
Cohesion: 0.23
Nodes (13): monthName(), buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef (+5 more)

### Community 38 - "ComplaintForm.tsx"
Cohesion: 0.16
Nodes (16): applyFormErrors(), FormErrorEntry, LaravelValidationError, fieldMap, toFormErrors(), ComplaintForm(), ComplaintFormProps, DEFAULTS (+8 more)

### Community 39 - "requireRole"
Cohesion: 0.10
Nodes (23): metadata, Page(), metadata, Page(), metadata, metadata, Page(), metadata (+15 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "[tipe]/persetujuan/page.tsx"
Cohesion: 0.14
Nodes (22): metadata, Page(), generateMetadata(), generateStaticParams, Page(), Page(), generateStaticParams, Page() (+14 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "lecturer-schedule/actions.ts"
Cohesion: 0.17
Nodes (16): metadata, Page(), getMockLecturerSchedule(), getMockLecturerSchedules(), schedules, setMockLecturerSchedule(), saveLecturerSchedule(), SaveScheduleResult (+8 more)

### Community 46 - "auth/actions.ts"
Cohesion: 0.06
Nodes (68): Admin Universitas, metadata, Page(), metadata, Page(), metadata, Page(), metadata (+60 more)

### Community 47 - "getManagedUsers.ts"
Cohesion: 0.27
Nodes (9): metadata, Page(), demoAccountUsers(), getManagedUsers(), isManagedRole(), MANAGED_ROLES, TODO: replace with the orval client for users (no-store, filtered by role)., parseUserTab() (+1 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 53 - "ReservationType"
Cohesion: 0.08
Nodes (28): Admin Universitas, Layout(), InternalReservationFormProps, UniversityReservationsProps, ADMIN_UNIVERSITAS_ROUTES, TypeTabs(), TodayReservationsCardProps, AdminScope (+20 more)

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

### Community 64 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 67 - "RoomReservationForm.tsx"
Cohesion: 0.14
Nodes (37): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, Page(), InternalReservationForm(), useLiveLectureBookings(), FloorPlan(), getRoomReservationOptions(), getSportsHallReservationOptions() (+29 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "react"
Cohesion: 0.20
Nodes (12): react, ResultDialog(), ResultDialogProps, ModalProps, useModalDialog(), changePassword(), PasswordChange, PasswordErrors (+4 more)

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "getUniversityDashboard.ts"
Cohesion: 0.10
Nodes (31): getDataMode, MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE, BOOKER, buildFacilityRequestsMock(), buildReservationHistoryMock() (+23 more)

### Community 74 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+6 more)

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 78 - "OrmawaShell.tsx"
Cohesion: 0.05
Nodes (50): AdminFakultasLayout(), AdminUniversitasLayout(), OperatorLayout(), metadata, Page(), OrmawaLayout(), Layout(), metadata (+42 more)

### Community 79 - "Decorative Elements"
Cohesion: 0.17
Nodes (12): AI Capsule Badges, Colored Left Stripe, Decorative Elements, Decorative Status Dot, Emoji as Decoration, Eyebrow Badge Above the Headline, Fake Terminal Window, Generic AI Icons (+4 more)

### Community 80 - "antislop-ui"
Cohesion: 0.17
Nodes (12): antislop-ui, Endless Pulses and Loops, Hero Image Loaded Like Any Other Image, How to use this skill, Motion, Page Basics, Performance, Render-Blocking Third-Party Script (+4 more)

### Community 81 - "Core Web Vitals (LCP, INP, CLS)"
Cohesion: 0.18
Nodes (11): CLS: Cumulative Layout Shift, Common LCP issues, Core Web Vitals (LCP, INP, CLS), INP: Interaction to Next Paint, LCP element identification, LCP: Largest Contentful Paint, LCP optimization checklist, Measure before optimizing (+3 more)

### Community 82 - "Layout & Components"
Cohesion: 0.18
Nodes (11): 4-Column Template Footer, Bento Grid, Copy-Paste Feature Cards, Demo Without a Product, "How It Works" Always 3 Steps, Layout & Components, Monotonous Template Layout, "Most Popular" Pricing Card (+3 more)

### Community 83 - "Visual & Color"
Cohesion: 0.18
Nodes (11): Background Grid, Dark Mode Default for No Reason, Excessive Accent Color, Excessive Border Radius, Excessive Glassmorphism, Generic Blue-Purple Gradient, Glow Everywhere, Overly Soft Shadows (+3 more)

### Community 84 - "Group 3: Quality Locks (consistency)"
Cohesion: 0.20
Nodes (10): Group 3: Quality Locks (consistency), R-05 — Layout & Page Structure, R-11 — Border Radius, R-15 — CTA (Call to Action), R-16 — Copywriting & Buzzwords, R-20 — Visual Identity, R-21 — Dark Mode, R-29 — Color Palette (+2 more)

### Community 85 - "antislop"
Cohesion: 0.22
Nodes (8): Already installed, and the user asks how to update, antislop, Core Principle, First-Run Install Wizard, Functional Patterns, Part 2: Mandatory Rules (R-01 to R-40, grouped), Two Usage Modes, What This Is (and What It Isn't)

### Community 86 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 87 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 88 - "Part 1: AI Slop Patterns (Warning Signs)"
Cohesion: 0.25
Nodes (8): Accessibility, Copywriting & Content, Decorative Elements, Functionality & Content, Identity & Originality, Layout & Components, Part 1: AI Slop Patterns (Warning Signs), Visual & Color

### Community 89 - "App & Dashboard"
Cohesion: 0.25
Nodes (8): App & Dashboard, Charts Without a Question, Default Dashboard Shell, Filler Activity Feed, Filler Data in Fields and Columns, Generic Table Columns, Placeholder Empty and Loading States, Stat Cards With Invented Numbers

### Community 90 - "Web Baseline"
Cohesion: 0.29
Nodes (4): Document basics, Runtime, Security defaults, Web Baseline

### Community 91 - "The Craftsmanship Standard"
Cohesion: 0.33
Nodes (6): C-1 — Intentionality, C-2 — Functional Completeness, C-3 — Content-Driven Composition, C-4 — Resilience, C-5 — Evidence Over Claims, The Craftsmanship Standard

### Community 92 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 93 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 94 - "AddUserDialog.tsx"
Cohesion: 0.23
Nodes (14): Field(), FieldProps, INPUT_CLASS, SelectInput(), SelectInputProps, AddUserDialog(), DEFAULTS, CreateAnnouncementDialog() (+6 more)

### Community 95 - "Delivery Gate (Mandatory)"
Cohesion: 0.40
Nodes (5): Block 1: Hard Gate (absolute), Block 2: Purpose-Gate (technique allowed, reason required), Block 3: Liveliness (required to be alive, not just clean), Block 4: Craftsmanship & Quality Locks, Delivery Gate (Mandatory)

### Community 96 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.40
Nodes (4): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration, Source-read freshness

### Community 97 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.40
Nodes (4): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration, Source-read freshness

### Community 98 - "Part 3: Liveliness Toolkit"
Cohesion: 0.50
Nodes (4): Design Read (how the dials are set), Levers (how the dials become visual decisions), Part 3: Liveliness Toolkit, Three Dials (required)

### Community 99 - "Structural & Flow"
Cohesion: 0.50
Nodes (4): Dead Navigation, Non-Functional Controls, Sections That Fill a Template, Structural & Flow

### Community 100 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 101 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 102 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 103 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 104 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 115 - "2. Struktur dan fungsi folder"
Cohesion: 0.08
Nodes (22): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE (+14 more)

### Community 119 - "Card"
Cohesion: 0.14
Nodes (20): metadata, Page(), Card(), buildDashboardMock(), DashboardHero(), DashboardHeroProps, getUserDashboard(), TODO: replace with the orval client for the dashboard endpoint (no-store) once… (+12 more)

### Community 120 - "Role dan Halaman"
Cohesion: 0.12
Nodes (14): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin) (+6 more)

### Community 124 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, framer-motion, @hookform/resolvers, next, react, react-dom, react-hook-form, zod

### Community 125 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 126 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (3): eslintConfig, eslint, eslint-config-next

## Knowledge Gaps
- **680 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+675 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 810 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `announcement.ts`, `types/reservation.ts`, `toWibDateKey`, `DraftCard.tsx`, `availability.ts`, `RoomManager.tsx`, `UserManagement.tsx`, `FloorPlanEditor.tsx`, `UserReportList.tsx`, `SportsHallReservationForm.tsx`, `ReservationTrendCard.tsx`, `AnnouncementManager.tsx`, `Button`, `wibDateTime`, `TypeTabs.tsx`, `package.json`, `getDataMode.ts`, `UniversityDashboard.tsx`, `content.ts`, `facility.ts`, `ReservationLogCalendar.tsx`, `requireRole`, `[tipe]/persetujuan/page.tsx`, `lecturer-schedule/actions.ts`, `auth/actions.ts`, `getManagedUsers.ts`, `ReservationType`, `RoomReservationForm.tsx`, `react`, `getUniversityDashboard.ts`, `OrmawaShell.tsx`, `AddUserDialog.tsx`, `Card`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `types/reservation.ts`, `toWibDateKey`, `DraftCard.tsx`, `TimeWheel.tsx`, `RoomManager.tsx`, `userSchema.ts`, `UserManagement.tsx`, `FloorPlanEditor.tsx`, `UserReportList.tsx`, `SportsHallReservationForm.tsx`, `ReservationTrendCard.tsx`, `useLiveData.ts`, `AnnouncementManager.tsx`, `Button`, `CreateReservationPanel.tsx`, `package.json`, `getDataMode.ts`, `UniversityDashboard.tsx`, `LecturerScheduleUpload.tsx`, `content.ts`, `ReservationLogCalendar.tsx`, `ComplaintForm.tsx`, `auth/actions.ts`, `RoomReservationForm.tsx`, `OrmawaShell.tsx`, `AddUserDialog.tsx`, `Card`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `vitest` connect `types/reservation.ts` to `announcement.ts`, `toWibDateKey`, `DraftCard.tsx`, `availability.ts`, `TimeWheel.tsx`, `scheduleCsv.ts`, `RoomManager.tsx`, `userSchema.ts`, `FloorPlanEditor.tsx`, `UserReportList.tsx`, `SportsHallReservationForm.tsx`, `useLiveData.ts`, `AnnouncementManager.tsx`, `schema.ts`, `package.json`, `date.ts`, `UniversityDashboard.tsx`, `content.ts`, `createReservation.ts`, `facility.ts`, `ReservationLogCalendar.tsx`, `ComplaintForm.tsx`, `[tipe]/persetujuan/page.tsx`, `auth/actions.ts`, `ReservationType`, `react`, `getUniversityDashboard.ts`, `OrmawaShell.tsx`, `2. Struktur dan fungsi folder`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _680 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `types/reservation.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05133599831685252 - nodes in this community are weakly interconnected._
- **Should `toWibDateKey` be split into smaller, more focused modules?**
  _Cohesion score 0.0547008547008547 - nodes in this community are weakly interconnected._
- **Should `DraftCard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07890122735242548 - nodes in this community are weakly interconnected._