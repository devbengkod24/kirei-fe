# Graph Report - kirei-fe  (2026-11-20)

## Corpus Check
- 433 files · ~248,999 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2195 nodes · 6068 edges · 126 communities (105 shown, 21 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2d07c64c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- requireRole.ts
- OperatorFloorPage.tsx
- reservationStore.ts
- RoomReservationForm.tsx
- FloorPlanEditor.tsx
- TimeWheel.tsx
- LecturerScheduleUpload.tsx
- PageSkeleton
- EditRoomDialog.tsx
- UserManagement.tsx
- ReservationHistoryTable.tsx
- AnnouncementManager.tsx
- vehicleReport.ts
- next
- vitest
- Card
- contrast-check.py
- useLiveData.ts
- ReportFilterForm.tsx
- ReservationTable.tsx
- getOperatorFloor.ts
- DraftCard.tsx
- UserDashboard.tsx
- schema.ts
- getDataMode
- package.json
- date.ts
- readBrowserDataMode
- UniversityDashboard.tsx
- react
- 2. Struktur dan fungsi folder
- content.ts
- createReservation.ts
- RoomManager.tsx
- compilerOptions
- Accessibility Code Patterns
- reservations.ts
- ReservationLogCalendar.tsx
- Button
- getUniversityDashboard.ts
- toWibDateKey
- Tone & Voice
- kirei-fe
- getCurrentUser
- antislop-layoutmobile
- liveDashboard.ts
- DraftReservationsPage.tsx
- ReservationRecord
- devDependencies
- What You Must Do When Invoked
- wibDateTime
- AdminDashboardSkeleton
- ReservationFormSkeleton
- Role dan Halaman
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- auth/actions.ts
- Group 1: Hard Gate (absolute, no exceptions)
- SportsHallReservationForm.tsx
- Comments That Add Nothing
- rooms.ts
- requireRole
- LoginPage.tsx
- KIREI FE
- dependencies
- scripts
- ReservationSubmitDialog.tsx
- Group 2: Purpose-Gate (technique allowed, purpose required)
- laravel.ts
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
- ReservationTrendCard.tsx
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
- VehicleReservationForm.tsx
- ReservationType
- availability.ts
- RouteError.tsx
- DeadlineTimer.tsx
- ContactPage.tsx
- gedung/ruangan/page.tsx
- eslint.config.mjs
- liveSchemas.ts
- DraftsSkeleton
- 2. Alur Tindakan Pengguna (User Flow)

## God Nodes (most connected - your core abstractions)
1. `next` - 112 edges
2. `toWibDateKey()` - 74 edges
3. `react` - 72 edges
4. `Card()` - 65 edges
5. `Button` - 59 edges
6. `vitest` - 55 edges
7. `requireRole()` - 52 edges
8. `ReservationType` - 43 edges
9. `RoomReservationForm()` - 40 edges
10. `PageSkeleton()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Di root repo` --references--> `MaskIcon()`  [INFERRED]
  docs/architecture.md → src/components/ui/MaskIcon.tsx
- `6. Urutan pembangunan yang disarankan` --references--> `getCurrentUser()`  [INFERRED]
  docs/architecture.md → src/lib/auth/getCurrentUser.ts
- `4. Perbedaan dengan Vault dan Keputusan` --references--> `VehicleReservationForm()`  [INFERRED]
  docs/flow-reservasi.md → src/shared/reservation-form/VehicleReservationForm.tsx
- `Client API (orval)` --references--> `applyFormErrors()`  [INFERRED]
  docs/architecture.md → src/lib/api/form-errors.ts
- `Admin Universitas` --references--> `getCurrentUser()`  [INFERRED]
  docs/architecture.md → src/lib/auth/getCurrentUser.ts

## Import Cycles
- None detected.

## Communities (126 total, 21 thin omitted)

### Community 0 - "requireRole.ts"
Cohesion: 0.18
Nodes (15): cookieStore, LOGIN_PATH, ROLE_HOME, SESSION_COOKIE, userFromSession(), findMockUserById(), MOCK_ACCOUNTS, MOCK_ADMIN_GEDUNG (+7 more)

### Community 1 - "OperatorFloorPage.tsx"
Cohesion: 0.08
Nodes (57): Operator, MaskIcon(), MaskIconProps, ROOM_CLOSE_TIME, useMediaQuery(), toWibTimeKey(), ACCENT, ClipBody() (+49 more)

### Community 2 - "reservationStore.ts"
Cohesion: 0.13
Nodes (26): Simulasi alur reservasi (mock store), createReservation(), listing, owner, addMockReservation(), approvedRoomBookings(), assignVehicleCrew(), decideMockReservation() (+18 more)

### Community 3 - "RoomReservationForm.tsx"
Cohesion: 0.22
Nodes (24): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, formatDateLongWIB(), FloorPlan(), LetterPanel(), ReviewButton(), PanelHeading(), ReservationSteps() (+16 more)

### Community 4 - "FloorPlanEditor.tsx"
Cohesion: 0.10
Nodes (40): Admin Gedung (role `admin_fakultas`), metadata, Page(), Drag, FloorPlanCanvas(), FloorPlanCanvasProps, CATEGORIES, FloorPlanEditor() (+32 more)

### Community 5 - "TimeWheel.tsx"
Cohesion: 0.26
Nodes (14): clampTime(), formatPart, HourRange, joinTime(), pad(), parseTypedPart(), splitTime(), stepPart() (+6 more)

### Community 6 - "LecturerScheduleUpload.tsx"
Cohesion: 0.13
Nodes (23): parseCsv(), dayText(), LecturerScheduleUpload(), Picked, timeText(), DAY_LABEL, DAYS, normalizeTime() (+15 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (20): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+12 more)

### Community 8 - "EditRoomDialog.tsx"
Cohesion: 0.16
Nodes (16): ROOM_PHOTO_MAX_SIZE_MB, EditRoomDialogProps, TODO: PATCH the room through the orval client (multipart when the photo…, STATUS_OPTIONS, RoomsData, ROOM_TYPE_LABEL, ROOM_TYPE_PREFIX, RoomManagerProps (+8 more)

### Community 9 - "UserManagement.tsx"
Cohesion: 0.08
Nodes (46): metadata, Page(), ADMIN_GEDUNG, DOSEN, MOCK_MANAGED_USERS, OPERATORS, ORMAWA, AddUserDialogProps (+38 more)

### Community 10 - "ReservationHistoryTable.tsx"
Cohesion: 0.12
Nodes (23): @testing-library/react, LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, TABLE, TABLE_CELL (+15 more)

### Community 11 - "AnnouncementManager.tsx"
Cohesion: 0.13
Nodes (18): Badge(), BadgeProps, BadgeTone, SIZE_STYLES, TONE_STYLES, ANNOUNCEMENT_CATEGORY, AnnouncementManager(), AnnouncementManagerProps (+10 more)

### Community 12 - "vehicleReport.ts"
Cohesion: 0.25
Nodes (8): cell(), HEADERS, lastDayKey(), STAFF, trip, vehicleHistoryCsv(), reservationStatusLabel(), VehicleAssignment

### Community 13 - "next"
Cohesion: 0.10
Nodes (21): nextConfig, next, Layout(), metadata, Page(), Layout(), ComingSoonProps, Breadcrumb() (+13 more)

### Community 14 - "vitest"
Cohesion: 0.08
Nodes (30): ref_node_url, react-hook-form, vitest, applyFormErrors(), FormErrorEntry, isLaravelValidationError(), LaravelValidationError, fieldMap (+22 more)

### Community 15 - "Card"
Cohesion: 0.20
Nodes (15): LineChart(), LineChartProps, LineSeries, niceMax(), Card(), CardProps, AdminDashboard(), AdminDashboardLinks (+7 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "useLiveData.ts"
Cohesion: 0.19
Nodes (18): Mode data: dengan atau tanpa data dummy, zod, LiveData, useLiveData(), useLiveState(), clearLive(), listeners, LIVE_PREFIX (+10 more)

### Community 18 - "ReportFilterForm.tsx"
Cohesion: 0.12
Nodes (26): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), isInPeriod(), shiftKey(), TIME_PERIOD_OPTIONS (+18 more)

### Community 19 - "ReservationTable.tsx"
Cohesion: 0.13
Nodes (23): B. Pengelola (`admin_fakultas` dan `admin_universitas`), Pagination(), usePagination(), formatTimeWIB(), Page, paginate(), isDefaultReportFilter(), ReportDetailDialog() (+15 more)

### Community 20 - "getOperatorFloor.ts"
Cohesion: 0.36
Nodes (7): metadata, Page(), buildClassSchedulesMock(), buildOperatorReservationsMock(), MOCK_OPERATOR_FLOOR, getOperatorFloor(), TODO: replace with the orval client for the operator's floor, today's…

### Community 21 - "DraftCard.tsx"
Cohesion: 0.12
Nodes (34): formatTimeRangeWIB(), cancelDraft(), DraftActionResult, submitDraft(), DraftCard(), DraftCardProps, Field(), LetterInput (+26 more)

### Community 22 - "UserDashboard.tsx"
Cohesion: 0.20
Nodes (13): DashboardHero(), DashboardHeroProps, LatestAnnouncementsCard(), LatestAnnouncementsCardProps, ReservationTotal(), ReservationTotalProps, TodayReservationCard(), TodayReservationCardProps (+5 more)

### Community 23 - "schema.ts"
Cohesion: 0.09
Nodes (30): DRAFT_LETTER_HOURS, LETTER_MAX_SIZE_MB, ORGANISATION_MIN_DAYS_AHEAD, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, BOOKING_MODES, BookingModeSettings (+22 more)

### Community 24 - "getDataMode"
Cohesion: 0.17
Nodes (17): metadata, Page(), getDataMode, getMockLecturerSchedule(), schedules, setMockLecturerSchedule(), saveLecturerSchedule(), SaveScheduleResult (+9 more)

### Community 25 - "package.json"
Cohesion: 0.13
Nodes (13): name, private, version, jsdom, orval, react-dom, tailwindcss, @tailwindcss/turbopack (+5 more)

### Community 26 - "date.ts"
Cohesion: 0.30
Nodes (13): DateInput, formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatDayRange(), formatDayRangeShortWIB(), formatDayRangeWIB(), formatFullDateWIB() (+5 more)

### Community 27 - "readBrowserDataMode"
Cohesion: 0.21
Nodes (14): DATA_MODE_COOKIE, DataMode, parseDataMode(), readBrowserDataMode(), writeBrowserDataMode(), sendComplaint(), DataModeSwitch(), DataModeSwitchProps (+6 more)

### Community 28 - "UniversityDashboard.tsx"
Cohesion: 0.15
Nodes (17): MOCK_FAKULTAS, TypeSummary, UniversityDashboardData, ReservationTrendCard(), TypeSummaryCard(), TypeSummaryCardProps, TONE, UniversityDashboard() (+9 more)

### Community 29 - "react"
Cohesion: 0.14
Nodes (17): react, ResultDialog(), ResultDialogProps, ModalProps, WIDTH, PAGE_SIZE_OPTIONS, PaginationProps, useModalDialog() (+9 more)

### Community 30 - "2. Struktur dan fungsi folder"
Cohesion: 0.09
Nodes (21): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE (+13 more)

### Community 31 - "content.ts"
Cohesion: 0.06
Nodes (50): framer-motion, src_app_globals, inter, metadata, poppins, metadata, Page(), AppBrand() (+42 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.12
Nodes (20): CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., ReservationListing, ReservationRequest, status(), BUS, text() (+12 more)

### Community 33 - "RoomManager.tsx"
Cohesion: 0.20
Nodes (17): EditRoomDialog(), managedByLabel(), roomManagedBy(), roomTitle(), applyRoomEdits(), editManyRooms(), localPhotoUrl(), ROOM_EDITS_NAME (+9 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "reservations.ts"
Cohesion: 0.15
Nodes (19): BOOKER, buildFacilityRequestsMock(), buildReservationHistoryMock(), buildReservationsMock(), FACILITY_ROWS, FacilityRow, PAST_STATUSES, PAST_TRIPS (+11 more)

### Community 37 - "ReservationLogCalendar.tsx"
Cohesion: 0.23
Nodes (13): monthName(), buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef (+5 more)

### Community 38 - "Button"
Cohesion: 0.12
Nodes (28): @hookform/resolvers, CAPS_LABEL_CLASS, Field(), FieldProps, INPUT_CLASS, SelectInput(), SelectInputProps, Button (+20 more)

### Community 39 - "getUniversityDashboard.ts"
Cohesion: 0.18
Nodes (13): metadata, Page(), MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE, getUniversityDashboard(), TODO: replace with the orval client for the admin universitas dashboard (no-… (+5 more)

### Community 40 - "toWibDateKey"
Cohesion: 0.11
Nodes (29): metadata, Page(), toWibDateKey(), buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_BUILDINGS, MOCK_ROOM_RULES, MOCK_SPORTS_HALL (+21 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "getCurrentUser"
Cohesion: 0.23
Nodes (15): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+7 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "liveDashboard.ts"
Cohesion: 0.20
Nodes (18): LiveUniversityDashboard(), LiveAdminDashboard(), useLiveReports(), activeBorrowers(), CANCELLED, HOLDS_SLOT, ownReservationFigures, roomRequestsInScope() (+10 more)

### Community 46 - "DraftReservationsPage.tsx"
Cohesion: 0.60
Nodes (3): metadata, Page(), DraftReservationsPage()

### Community 47 - "ReservationRecord"
Cohesion: 0.11
Nodes (31): metadata, Page(), SegmentedNav(), ORMAWA_ROUTES, ActiveReservationList(), ActiveReservationListProps, Group(), getHistoryRecords() (+23 more)

### Community 48 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+6 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "wibDateTime"
Cohesion: 0.19
Nodes (11): metadata, Page(), metadata, Page(), buildAnnouncementsMock(), buildDashboardMock(), buildReportsMock(), ROWS (+3 more)

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 53 - "Role dan Halaman"
Cohesion: 0.12
Nodes (14): Admin Universitas, Ormawa dan dosen, Override slot oleh Admin Universitas, Perbedaan dengan Figma V3, Publik dan autentikasi, Ringkasan, Role dan Halaman, metadata (+6 more)

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

### Community 64 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 65 - "auth/actions.ts"
Cohesion: 0.24
Nodes (15): Admin Universitas, login(), LoginResult, loginWithLaravel(), logout(), onEmail(), quickLogin(), startSession() (+7 more)

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 67 - "SportsHallReservationForm.tsx"
Cohesion: 0.15
Nodes (18): wibToIso(), DATE, ReservationStep, STEPS_BY_TYPE, TIME, UPLOAD, SPORTS_HALL_RESERVATION_FIELD_MAP, SPORTS_HALL_SCHEDULE_FIELDS (+10 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "rooms.ts"
Cohesion: 0.19
Nodes (12): metadata, Page(), classroomRow(), MOCK_BUILDINGS, MOCK_ROOMS, mockRoomsInScope(), room(), AdminScope (+4 more)

### Community 70 - "requireRole"
Cohesion: 0.15
Nodes (24): metadata, Page(), generateMetadata(), generateStaticParams, Page(), Page(), generateStaticParams, Page() (+16 more)

### Community 71 - "LoginPage.tsx"
Cohesion: 0.21
Nodes (12): metadata, Page(), getSessionUser, authMode, getDemoAccounts(), LoginPage(), QuickLogin(), QuickLoginProps (+4 more)

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, framer-motion, @hookform/resolvers, next, react, react-dom, react-hook-form, zod

### Community 74 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 75 - "ReservationSubmitDialog.tsx"
Cohesion: 0.17
Nodes (10): DraftDetails, LetterField(), LetterFieldProps, LetterPanelProps, PanelHeadingProps, ReservationSubmitDialogProps, SubmissionFields, ReservationIntent (+2 more)

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 77 - "laravel.ts"
Cohesion: 0.30
Nodes (11): callLaravel(), decode(), fetchApiUser(), LaravelResponse, parseApiUser(), parseSetCookie(), userSchema, apiUrl() (+3 more)

### Community 78 - "OrmawaShell.tsx"
Cohesion: 0.06
Nodes (46): AdminGedungLayout(), AdminUniversitasLayout(), OperatorLayout(), metadata, Page(), OrmawaLayout(), metadata, Page() (+38 more)

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

### Community 94 - "ReservationTrendCard.tsx"
Cohesion: 0.40
Nodes (4): WeeklyCounts, ReservationTrendCardProps, TrendView, VIEWS

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

### Community 115 - "VehicleReservationForm.tsx"
Cohesion: 0.12
Nodes (28): 3. Titik Integrasi Mock untuk Prototipe, Popover(), PopoverProps, VehicleFleetInfo(), VehicleFleetInfoProps, VehicleReservationOptions, ReservationLinks, MAX_DESTINATIONS (+20 more)

### Community 116 - "ReservationType"
Cohesion: 0.09
Nodes (31): metadata, Page(), metadata, Page(), MOCK_STAFF, RESERVATION_TAB_LINKS, InternalReservationFormProps, TODO: load drivers from Kelola Staf (orval) once it exists; sample drivers… (+23 more)

### Community 117 - "availability.ts"
Cohesion: 0.24
Nodes (10): addDaysToKey(), crossFacultyApprover(), defaultSchedule(), isRoomBooked(), rangesOverlap(), roomBookingsOnDay(), RoomStatusInput, base (+2 more)

### Community 119 - "DeadlineTimer.tsx"
Cohesion: 0.27
Nodes (9): Countdown, DeadlineInput, getCountdown(), NOW, useCountdown(), DeadlineTimer(), DeadlineTimerProps, display() (+1 more)

### Community 120 - "ContactPage.tsx"
Cohesion: 0.33
Nodes (6): metadata, Page(), CONTACT, TODO: replace the Figma placeholders with the real Sarpras Udinus contacts…, ChannelIcon(), ContactPage()

### Community 121 - "gedung/ruangan/page.tsx"
Cohesion: 0.38
Nodes (5): metadata, Page(), metadata, Page(), getRooms()

### Community 122 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 123 - "liveSchemas.ts"
Cohesion: 0.19
Nodes (11): metadata, Page(), LiveUserDashboard(), UserDashboardProps, announcementsSchema, buildingsSchema, floorPlanRoomSchema, lecturerSchedulesSchema (+3 more)

### Community 125 - "2. Alur Tindakan Pengguna (User Flow)"
Cohesion: 0.20
Nodes (8): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin)

## Knowledge Gaps
- **700 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+695 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 835 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `requireRole.ts`, `OperatorFloorPage.tsx`, `RoomReservationForm.tsx`, `FloorPlanEditor.tsx`, `UserManagement.tsx`, `ReservationHistoryTable.tsx`, `AnnouncementManager.tsx`, `Card`, `ReportFilterForm.tsx`, `ReservationTable.tsx`, `getOperatorFloor.ts`, `DraftCard.tsx`, `UserDashboard.tsx`, `getDataMode`, `package.json`, `readBrowserDataMode`, `UniversityDashboard.tsx`, `react`, `content.ts`, `RoomManager.tsx`, `ReservationLogCalendar.tsx`, `Button`, `getUniversityDashboard.ts`, `toWibDateKey`, `getCurrentUser`, `DraftReservationsPage.tsx`, `ReservationRecord`, `wibDateTime`, `Role dan Halaman`, `auth/actions.ts`, `SportsHallReservationForm.tsx`, `rooms.ts`, `requireRole`, `LoginPage.tsx`, `ReservationSubmitDialog.tsx`, `laravel.ts`, `OrmawaShell.tsx`, `ReservationType`, `ContactPage.tsx`, `gedung/ruangan/page.tsx`, `liveSchemas.ts`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `requireRole.ts`, `OperatorFloorPage.tsx`, `reservationStore.ts`, `RoomReservationForm.tsx`, `FloorPlanEditor.tsx`, `TimeWheel.tsx`, `LecturerScheduleUpload.tsx`, `EditRoomDialog.tsx`, `UserManagement.tsx`, `ReservationHistoryTable.tsx`, `AnnouncementManager.tsx`, `vitest`, `useLiveData.ts`, `ReportFilterForm.tsx`, `ReservationTable.tsx`, `DraftCard.tsx`, `getDataMode`, `package.json`, `readBrowserDataMode`, `UniversityDashboard.tsx`, `content.ts`, `RoomManager.tsx`, `ReservationLogCalendar.tsx`, `Button`, `toWibDateKey`, `liveDashboard.ts`, `ReservationRecord`, `SportsHallReservationForm.tsx`, `LoginPage.tsx`, `ReservationSubmitDialog.tsx`, `OrmawaShell.tsx`, `ReservationTrendCard.tsx`, `VehicleReservationForm.tsx`, `DeadlineTimer.tsx`, `liveSchemas.ts`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `requireRole.ts`, `OperatorFloorPage.tsx`, `reservationStore.ts`, `FloorPlanEditor.tsx`, `TimeWheel.tsx`, `LecturerScheduleUpload.tsx`, `EditRoomDialog.tsx`, `UserManagement.tsx`, `ReservationHistoryTable.tsx`, `AnnouncementManager.tsx`, `vehicleReport.ts`, `next`, `useLiveData.ts`, `ReportFilterForm.tsx`, `ReservationTable.tsx`, `DraftCard.tsx`, `schema.ts`, `package.json`, `date.ts`, `UniversityDashboard.tsx`, `2. Struktur dan fungsi folder`, `content.ts`, `createReservation.ts`, `RoomManager.tsx`, `ReservationLogCalendar.tsx`, `getUniversityDashboard.ts`, `toWibDateKey`, `liveDashboard.ts`, `ReservationRecord`, `SportsHallReservationForm.tsx`, `laravel.ts`, `OrmawaShell.tsx`, `VehicleReservationForm.tsx`, `ReservationType`, `availability.ts`, `DeadlineTimer.tsx`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _700 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `OperatorFloorPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07688828584350972 - nodes in this community are weakly interconnected._
- **Should `reservationStore.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1268939393939394 - nodes in this community are weakly interconnected._
- **Should `FloorPlanEditor.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09879336349924585 - nodes in this community are weakly interconnected._