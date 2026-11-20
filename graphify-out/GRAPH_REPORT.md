# Graph Report - kirei-fe  (2026-11-20)

## Corpus Check
- 422 files · ~239,740 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2117 nodes · 5727 edges · 112 communities (92 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 91 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3e6bf0b1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- OperatorFloorPage.tsx
- reservationStore.ts
- DraftCard.tsx
- FloorPlanEditor.tsx
- vitest
- scheduleCsv.ts
- PageSkeleton
- RoomManager.tsx
- Button
- ReservationTable.tsx
- RoomReservationForm.tsx
- toWibDateKey
- SportsHallReservationForm.tsx
- react
- UniversityDashboard.tsx
- contrast-check.py
- useLiveData.ts
- AnnouncementManager.tsx
- types/reservation.ts
- getUniversityDashboard.ts
- 2. Struktur dan fungsi folder
- UserDashboard.tsx
- schema.ts
- borrowerBooking.ts
- package.json
- date.ts
- dataMode.ts
- getManagedUsers.ts
- getDataMode
- useLiveFacilities.ts
- content.ts
- createReservation.ts
- getReservationOptions.ts
- compilerOptions
- Accessibility Code Patterns
- reservations.ts
- ReservationLogCalendar.tsx
- ComplaintForm.tsx
- LecturerScheduleUpload.tsx
- query.ts
- Tone & Voice
- kirei-fe
- requireRole
- antislop-layoutmobile
- schedule.ts
- OperatorShell.tsx
- draftStorage.ts
- ReservationType
- What You Must Do When Invoked
- CreateReservationBreadcrumb.tsx
- AdminDashboardSkeleton
- ReservationFormSkeleton
- admin-universitas/routes.ts
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- UserReportList.tsx
- Group 1: Hard Gate (absolute, no exceptions)
- VehicleReservationForm.tsx
- Comments That Add Nothing
- Card
- OrmawaShell.tsx
- KIREI FE
- Group 2: Purpose-Gate (technique allowed, purpose required)
- AdminFakultasShell.tsx
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
- form-errors.ts
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
- RoleShell.tsx
- RouteError.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 112 edges
2. `react` - 70 edges
3. `toWibDateKey()` - 67 edges
4. `Card()` - 63 edges
5. `Button` - 53 edges
6. `requireRole()` - 52 edges
7. `vitest` - 51 edges
8. `ReservationType` - 43 edges
9. `PageSkeleton()` - 41 edges
10. `RoomReservationForm()` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Di root repo` --references--> `MaskIcon()`  [INFERRED]
  docs/architecture.md → src/components/ui/MaskIcon.tsx
- `6. Urutan pembangunan yang disarankan` --references--> `getCurrentUser()`  [INFERRED]
  docs/architecture.md → src/lib/auth/getCurrentUser.ts
- `Admin Universitas` --references--> `TypeTabs()`  [INFERRED]
  docs/roles-and-pages.md → src/modules/admin-universitas/TypeTabs.tsx
- `Mode data: dengan atau tanpa data dummy` --references--> `useLiveData()`  [INFERRED]
  docs/architecture.md → src/hooks/useLiveData.ts
- `Mode data: dengan atau tanpa data dummy` --references--> `useLiveState()`  [INFERRED]
  docs/architecture.md → src/hooks/useLiveData.ts

## Import Cycles
- None detected.

## Communities (112 total, 20 thin omitted)

### Community 0 - "next"
Cohesion: 0.05
Nodes (74): Admin Universitas, nextConfig, next, metadata, Page(), metadata, Page(), metadata (+66 more)

### Community 1 - "OperatorFloorPage.tsx"
Cohesion: 0.06
Nodes (68): Operator, react-dom, SelectInput(), MaskIcon(), MaskIconProps, useMediaQuery(), toWibTimeKey(), CreateReservationPanel() (+60 more)

### Community 2 - "reservationStore.ts"
Cohesion: 0.11
Nodes (28): Simulasi alur reservasi (mock store), listing, owner, addMockReservation(), approvedRoomBookings(), decideMockReservation(), EMPTY_STATE, listeners (+20 more)

### Community 3 - "DraftCard.tsx"
Cohesion: 0.15
Nodes (20): Loading(), DeadlineInput, getCountdown(), NOW, useCountdown(), cancelDraft(), DraftActionResult, submitDraft() (+12 more)

### Community 4 - "FloorPlanEditor.tsx"
Cohesion: 0.18
Nodes (23): Drag, FloorPlanCanvas(), FloorPlanCanvasProps, CATEGORIES, FloorPlanForm(), TODO: PUT the changed floors through the orval client, then refetch. Until then…, RECT_FIELDS, RectInput() (+15 more)

### Community 5 - "vitest"
Cohesion: 0.07
Nodes (32): ref_node_url, vitest, metadata, Page(), API_URL, CSRF_METHODS, customFetch(), readBody() (+24 more)

### Community 6 - "scheduleCsv.ts"
Cohesion: 0.18
Nodes (14): parseCsv(), DAYS, normalizeTime(), overlaps(), ParsedSchedule, parseScheduleCsv(), rowSchema(), SCHEDULE_MAX_ROWS (+6 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (21): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+13 more)

### Community 8 - "RoomManager.tsx"
Cohesion: 0.06
Nodes (49): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin) (+41 more)

### Community 9 - "Button"
Cohesion: 0.08
Nodes (52): @hookform/resolvers, CAPS_LABEL_CLASS, Field(), FieldProps, INPUT_CLASS, SelectInputProps, Button, Modal() (+44 more)

### Community 10 - "ReservationTable.tsx"
Cohesion: 0.14
Nodes (22): B. Pengelola (`admin_fakultas` dan `admin_universitas`), PAGE_SIZE_OPTIONS, Pagination(), PaginationProps, TABLE, TABLE_CELL, TABLE_HEAD_CELL, TABLE_ROW (+14 more)

### Community 11 - "RoomReservationForm.tsx"
Cohesion: 0.13
Nodes (30): ROOM_CLOSE_TIME, ROOM_OPEN_TIME, addDaysToKey(), useLiveBuildings(), crossFacultyApprover(), defaultSchedule(), isRoomBooked(), rangesOverlap() (+22 more)

### Community 12 - "toWibDateKey"
Cohesion: 0.22
Nodes (18): metadata, Page(), toWibDateKey(), LiveUniversityDashboard(), getAdminDashboard(), LiveAdminDashboard(), activeBorrowers(), CANCELLED (+10 more)

### Community 13 - "SportsHallReservationForm.tsx"
Cohesion: 0.18
Nodes (15): DATE, ReservationStep, STEPS_BY_TYPE, TIME, UPLOAD, LEGEND, SLOT_LABEL, SLOT_STYLES (+7 more)

### Community 14 - "react"
Cohesion: 0.19
Nodes (13): react, ResultDialog(), ResultDialogProps, ModalProps, useModalDialog(), changePassword(), MIN_PASSWORD_LENGTH, PasswordChange (+5 more)

### Community 15 - "UniversityDashboard.tsx"
Cohesion: 0.16
Nodes (16): MOCK_FAKULTAS, TypeSummary, UniversityDashboardData, ReservationTrendCard(), TypeSummaryCard(), TypeSummaryCardProps, TONE, UniversityDashboard() (+8 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "useLiveData.ts"
Cohesion: 0.20
Nodes (16): LiveData, useLiveData(), clearLive(), listeners, LIVE_PREFIX, liveKey(), LiveStorage, notify() (+8 more)

### Community 18 - "AnnouncementManager.tsx"
Cohesion: 0.10
Nodes (32): Badge(), BadgeProps, BadgeTone, SIZE_STYLES, TONE_STYLES, useLiveState(), isInPeriod(), shiftKey() (+24 more)

### Community 19 - "types/reservation.ts"
Cohesion: 0.11
Nodes (27): metadata, Page(), metadata, Page(), RESERVATION_TAB_LINKS, UniversityReservationsProps, TodayReservationsCardProps, ApproveReservationDialogProps (+19 more)

### Community 20 - "getUniversityDashboard.ts"
Cohesion: 0.16
Nodes (17): metadata, Page(), MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE, buildReportsMock(), ROWS (+9 more)

### Community 21 - "2. Struktur dan fungsi folder"
Cohesion: 0.13
Nodes (14): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE (+6 more)

### Community 22 - "UserDashboard.tsx"
Cohesion: 0.14
Nodes (18): metadata, Page(), buildDashboardMock(), DashboardHero(), DashboardHeroProps, getUserDashboard(), TODO: replace with the orval client for the dashboard endpoint (no-store) once…, LiveUserDashboard() (+10 more)

### Community 23 - "schema.ts"
Cohesion: 0.09
Nodes (27): LETTER_MAX_SIZE_MB, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, ALWAYS, createRoomReservationSchema(), createSportsHallReservationSchema(), describe(), IssueSink (+19 more)

### Community 24 - "borrowerBooking.ts"
Cohesion: 0.15
Nodes (22): metadata, Page(), metadata, Page(), metadata, Page(), ORGANISATION_MIN_DAYS_AHEAD, InternalReservationFormProps (+14 more)

### Community 25 - "package.json"
Cohesion: 0.04
Nodes (45): eslintConfig, dependencies, framer-motion, @hookform/resolvers, next, react, react-dom, react-hook-form (+37 more)

### Community 26 - "date.ts"
Cohesion: 0.10
Nodes (38): @testing-library/react, LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, Countdown, DateInput (+30 more)

### Community 27 - "dataMode.ts"
Cohesion: 0.30
Nodes (9): DATA_MODE_COOKIE, DataMode, writeBrowserDataMode(), DataModeSwitch(), DataModeSwitchProps, MODES, ResetMockReservationsButton(), ResetMockReservationsButtonProps (+1 more)

### Community 28 - "getManagedUsers.ts"
Cohesion: 0.21
Nodes (12): metadata, Page(), metadata, Page(), FloorPlanEditor(), demoAccountUsers(), getManagedUsers(), isManagedRole() (+4 more)

### Community 29 - "getDataMode"
Cohesion: 0.12
Nodes (20): metadata, Page(), metadata, Page(), SegmentedNav(), SegmentedNavItem, SegmentedNavProps, parseDataMode() (+12 more)

### Community 30 - "useLiveFacilities.ts"
Cohesion: 0.17
Nodes (13): FloorPlanEditorProps, FloorPlanFormProps, buildingsSchema, floorPlanRoomSchema, lecturerSchedulesSchema, LIVE_NAMES, weekdaySchema, useLiveLectureBookings() (+5 more)

### Community 31 - "content.ts"
Cohesion: 0.06
Nodes (50): framer-motion, src_app_globals, inter, metadata, poppins, metadata, Page(), AppBrand() (+42 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.14
Nodes (20): 3. Titik Integrasi Mock untuk Prototipe, wibToIso(), createReservation(), CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., ReservationRequest, status() (+12 more)

### Community 33 - "getReservationOptions.ts"
Cohesion: 0.13
Nodes (22): metadata, Page(), buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_BUILDINGS, MOCK_ROOM_RULES, MOCK_SPORTS_HALL, MOCK_VEHICLES (+14 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "reservations.ts"
Cohesion: 0.11
Nodes (26): metadata, Page(), buildAnnouncementsMock(), buildClassSchedulesMock(), buildOperatorReservationsMock(), MOCK_OPERATOR_FLOOR, BOOKER, buildFacilityRequestsMock() (+18 more)

### Community 37 - "ReservationLogCalendar.tsx"
Cohesion: 0.24
Nodes (12): buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef, cellClass() (+4 more)

### Community 38 - "ComplaintForm.tsx"
Cohesion: 0.19
Nodes (13): zod, readBrowserDataMode(), ComplaintFormProps, DEFAULTS, CATEGORIES, COMPLAINT_FIELD_MAP, ComplaintInput, complaintSchema (+5 more)

### Community 39 - "LecturerScheduleUpload.tsx"
Cohesion: 0.23
Nodes (11): metadata, Page(), getLecturerSchedule(), dayText(), LecturerScheduleUpload(), LecturerScheduleUploadProps, Picked, timeText() (+3 more)

### Community 40 - "query.ts"
Cohesion: 0.16
Nodes (19): Page(), ActiveReservationList(), ActiveReservationListProps, Group(), ACTIVE_STATUSES, buildHistoryResult(), ReservationHistoryResult, DEFAULT_HISTORY_QUERY (+11 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "requireRole"
Cohesion: 0.17
Nodes (22): metadata, Page(), generateMetadata(), generateStaticParams, Page(), generateStaticParams, Page(), generateMetadata() (+14 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "schedule.ts"
Cohesion: 0.23
Nodes (12): getMockLecturerSchedule(), schedules, setMockLecturerSchedule(), saveLecturerSchedule(), SaveScheduleResult, facultyRoomCodes(), LecturerScheduleData, TODO: replace with the orval clients for the faculty's schedule and rooms (no-… (+4 more)

### Community 46 - "OperatorShell.tsx"
Cohesion: 0.42
Nodes (5): OperatorLayout(), OperatorAccountBar(), OperatorAccount(), OperatorShell(), LogoutButton()

### Community 47 - "draftStorage.ts"
Cohesion: 0.21
Nodes (14): DraftDetails, draftsSnapshot(), DraftStorage, letterDeadline(), listeners, parseDrafts(), readDrafts(), removeDraft() (+6 more)

### Community 48 - "ReservationType"
Cohesion: 0.09
Nodes (23): Ormawa dan dosen, metadata, Page(), LineChart(), LineChartProps, LineSeries, niceMax(), WeeklyCounts (+15 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "CreateReservationBreadcrumb.tsx"
Cohesion: 0.18
Nodes (10): Layout(), metadata, Page(), metadata, Breadcrumb(), BreadcrumbItem, BreadcrumbProps, CreateReservationBreadcrumb() (+2 more)

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 53 - "admin-universitas/routes.ts"
Cohesion: 0.24
Nodes (7): Layout(), Page(), Page(), ADMIN_UNIVERSITAS_ROUTES, internalReservationRoute(), reservationsRoute(), TypeTabs()

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

### Community 64 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 65 - "UserReportList.tsx"
Cohesion: 0.13
Nodes (25): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), ButtonProps, VARIANT_STYLES, Popover() (+17 more)

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 67 - "VehicleReservationForm.tsx"
Cohesion: 0.13
Nodes (28): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, react-hook-form, DRAFT_LETTER_HOURS, LetterField(), LetterFieldProps, LetterPanel(), LetterPanelProps (+20 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "Card"
Cohesion: 0.29
Nodes (11): Card(), CardProps, AdminDashboard(), AdminDashboardLinks, AdminDashboardProps, AdminDashboardData, LatestReportsCard(), StatTile() (+3 more)

### Community 70 - "OrmawaShell.tsx"
Cohesion: 0.39
Nodes (6): OrmawaLayout(), hasDrafts(), DOSEN_NAV, ORMAWA_NAV, BorrowerShell(), OrmawaShell()

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 78 - "AdminFakultasShell.tsx"
Cohesion: 0.21
Nodes (13): AdminFakultasLayout(), AdminUniversitasLayout(), Avatar(), AvatarProps, initialsOf(), AdminAvatar(), AdminFakultasShell(), AdminAvatar() (+5 more)

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

### Community 94 - "form-errors.ts"
Cohesion: 0.31
Nodes (7): Client API (orval), applyFormErrors(), FormErrorEntry, isLaravelValidationError(), LaravelValidationError, fieldMap, toFormErrors()

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

### Community 116 - "RoleShell.tsx"
Cohesion: 0.18
Nodes (10): isActive(), NavItem, NavList(), Shell(), ShellProps, ADMIN_FAKULTAS_NAV, ADMIN_FAKULTAS_ROUTES, ADMIN_UNIVERSITAS_NAV (+2 more)

## Knowledge Gaps
- **678 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+673 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 805 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `OperatorFloorPage.tsx`, `DraftCard.tsx`, `vitest`, `RoomManager.tsx`, `Button`, `ReservationTable.tsx`, `RoomReservationForm.tsx`, `toWibDateKey`, `SportsHallReservationForm.tsx`, `react`, `UniversityDashboard.tsx`, `AnnouncementManager.tsx`, `types/reservation.ts`, `getUniversityDashboard.ts`, `UserDashboard.tsx`, `borrowerBooking.ts`, `package.json`, `date.ts`, `dataMode.ts`, `getManagedUsers.ts`, `getDataMode`, `content.ts`, `getReservationOptions.ts`, `reservations.ts`, `ReservationLogCalendar.tsx`, `LecturerScheduleUpload.tsx`, `query.ts`, `requireRole`, `schedule.ts`, `ReservationType`, `CreateReservationBreadcrumb.tsx`, `admin-universitas/routes.ts`, `UserReportList.tsx`, `VehicleReservationForm.tsx`, `Card`, `AdminFakultasShell.tsx`, `RoleShell.tsx`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `next`, `OperatorFloorPage.tsx`, `reservationStore.ts`, `DraftCard.tsx`, `FloorPlanEditor.tsx`, `vitest`, `RoomManager.tsx`, `Button`, `ReservationTable.tsx`, `RoomReservationForm.tsx`, `toWibDateKey`, `SportsHallReservationForm.tsx`, `UniversityDashboard.tsx`, `useLiveData.ts`, `AnnouncementManager.tsx`, `UserDashboard.tsx`, `package.json`, `date.ts`, `dataMode.ts`, `getDataMode`, `useLiveFacilities.ts`, `content.ts`, `createReservation.ts`, `ReservationLogCalendar.tsx`, `ComplaintForm.tsx`, `LecturerScheduleUpload.tsx`, `query.ts`, `OperatorShell.tsx`, `ReservationType`, `UserReportList.tsx`, `VehicleReservationForm.tsx`, `OrmawaShell.tsx`, `AdminFakultasShell.tsx`, `RoleShell.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `next`, `OperatorFloorPage.tsx`, `reservationStore.ts`, `DraftCard.tsx`, `FloorPlanEditor.tsx`, `scheduleCsv.ts`, `RoomManager.tsx`, `Button`, `ReservationTable.tsx`, `RoomReservationForm.tsx`, `toWibDateKey`, `SportsHallReservationForm.tsx`, `react`, `UniversityDashboard.tsx`, `useLiveData.ts`, `AnnouncementManager.tsx`, `types/reservation.ts`, `schema.ts`, `borrowerBooking.ts`, `package.json`, `date.ts`, `useLiveFacilities.ts`, `content.ts`, `createReservation.ts`, `ReservationLogCalendar.tsx`, `ComplaintForm.tsx`, `query.ts`, `draftStorage.ts`, `CreateReservationBreadcrumb.tsx`, `UserReportList.tsx`, `form-errors.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _678 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.05013477088948787 - nodes in this community are weakly interconnected._
- **Should `OperatorFloorPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06358024691358025 - nodes in this community are weakly interconnected._
- **Should `reservationStore.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11092436974789915 - nodes in this community are weakly interconnected._