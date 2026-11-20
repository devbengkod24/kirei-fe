# Graph Report - kirei-fe  (2026-11-20)

## Corpus Check
- 418 files · ~240,407 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2110 nodes · 5717 edges · 118 communities (98 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 91 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3e6bf0b1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- session.ts
- OperatorFloorPage.tsx
- reservationStore.ts
- DraftCard.tsx
- availability.ts
- vitest
- LecturerScheduleUpload.tsx
- PageSkeleton
- RoomManager.tsx
- userSchema.ts
- ReservationHistoryTable.tsx
- FloorPlanEditor.tsx
- toWibDateKey
- SportsHallReservationForm.tsx
- useCountdown.ts
- Card
- contrast-check.py
- useLiveData.ts
- AnnouncementManager.tsx
- ReservationTable.tsx
- getUniversityDashboard.ts
- AddUserDialog.tsx
- UserDashboard.tsx
- schema.ts
- ReservationFormPage.tsx
- package.json
- date.ts
- getDataMode
- pengguna/page.tsx
- react
- 2. Struktur dan fungsi folder
- content.ts
- createReservation.ts
- facility.ts
- compilerOptions
- Accessibility Code Patterns
- reservations.ts
- ReservationLogCalendar.tsx
- sendComplaint.ts
- QuickLogin.tsx
- types/reservation.ts
- Tone & Voice
- kirei-fe
- [tipe]/persetujuan/page.tsx
- antislop-layoutmobile
- lecturer-schedule/actions.ts
- getCurrentUser.ts
- auth/actions.ts
- devDependencies
- What You Must Do When Invoked
- ActiveReservationCard.tsx
- AdminDashboardSkeleton
- ReservationFormSkeleton
- admin-universitas/routes.ts
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- UserManagement.tsx
- Group 1: Hard Gate (absolute, no exceptions)
- RoomReservationForm.tsx
- Comments That Add Nothing
- laravel.ts
- LoginPage.tsx
- ContactPage.tsx
- KIREI FE
- dependencies
- scripts
- MOCK_BUILDINGS
- Group 2: Purpose-Gate (technique allowed, purpose required)
- eslint.config.mjs
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
- CreateReservationPanel.tsx
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
- DraftsSkeleton
- next
- Button

## God Nodes (most connected - your core abstractions)
1. `next` - 110 edges
2. `react` - 70 edges
3. `toWibDateKey()` - 67 edges
4. `Card()` - 62 edges
5. `Button` - 53 edges
6. `vitest` - 51 edges
7. `requireRole()` - 48 edges
8. `ReservationType` - 43 edges
9. `RoomReservationForm()` - 40 edges
10. `PageSkeleton()` - 37 edges

## Surprising Connections (you probably didn't know these)
- `Di root repo` --references--> `MaskIcon()`  [INFERRED]
  docs/architecture.md → src/components/ui/MaskIcon.tsx
- `6. Urutan pembangunan yang disarankan` --references--> `getCurrentUser()`  [INFERRED]
  docs/architecture.md → src/lib/auth/getCurrentUser.ts
- `Client API (orval)` --references--> `applyFormErrors()`  [INFERRED]
  docs/architecture.md → src/lib/api/form-errors.ts
- `Client API (orval)` --references--> `customFetch()`  [INFERRED]
  docs/architecture.md → src/lib/api/mutator.ts
- `Admin Universitas` --references--> `login()`  [INFERRED]
  docs/architecture.md → src/lib/auth/actions.ts

## Import Cycles
- None detected.

## Communities (118 total, 20 thin omitted)

### Community 0 - "session.ts"
Cohesion: 0.18
Nodes (14): cookieStore, laravelSessionCookie(), LOGIN_PATH, ROLE_HOME, SESSION_COOKIE, userFromSession(), findMockAccount(), findMockUserById() (+6 more)

### Community 1 - "OperatorFloorPage.tsx"
Cohesion: 0.07
Nodes (61): Operator, useMediaQuery(), toWibTimeKey(), buildClassSchedulesMock(), buildOperatorReservationsMock(), MOCK_OPERATOR_FLOOR, ACCENT, ClipBody() (+53 more)

### Community 2 - "reservationStore.ts"
Cohesion: 0.11
Nodes (30): Simulasi alur reservasi (mock store), 3. Titik Integrasi Mock untuk Prototipe, buildRoomBookingsMock(), createReservation(), listing, owner, ReservationHistoryView(), addMockReservation() (+22 more)

### Community 3 - "DraftCard.tsx"
Cohesion: 0.12
Nodes (32): formatTimeRangeWIB(), cancelDraft(), DraftActionResult, submitDraft(), DraftCard(), DraftCardProps, Field(), LetterInput (+24 more)

### Community 4 - "availability.ts"
Cohesion: 0.15
Nodes (19): addDaysToKey(), CreateReservationPanelProps, crossFacultyApprover(), defaultSchedule(), isRoomBooked(), rangesOverlap(), roomBookingsOnDay(), roomStatus (+11 more)

### Community 5 - "vitest"
Cohesion: 0.08
Nodes (28): ref_node_url, vitest, Layout(), Breadcrumb(), BreadcrumbItem, BreadcrumbProps, API_URL, CSRF_METHODS (+20 more)

### Community 6 - "LecturerScheduleUpload.tsx"
Cohesion: 0.13
Nodes (22): parseCsv(), dayText(), LecturerScheduleUpload(), LecturerScheduleUploadProps, Picked, timeText(), DAY_LABEL, DAYS (+14 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.11
Nodes (19): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+11 more)

### Community 8 - "RoomManager.tsx"
Cohesion: 0.10
Nodes (33): metadata, Page(), ROOM_PHOTO_MAX_SIZE_MB, classroomRow(), MOCK_BUILDINGS, MOCK_ROOMS, room(), EditRoomDialogProps (+25 more)

### Community 9 - "userSchema.ts"
Cohesion: 0.07
Nodes (39): MOCK_ACCOUNTS, ADMIN_GEDUNG, DOSEN, MOCK_MANAGED_USERS, OPERATORS, ORMAWA, AddUserDialogProps, demoAccountUsers() (+31 more)

### Community 10 - "ReservationHistoryTable.tsx"
Cohesion: 0.18
Nodes (13): LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, formatTimeSpanWIB(), HISTORY_PARAMS, PER_PAGE_OPTIONS (+5 more)

### Community 11 - "FloorPlanEditor.tsx"
Cohesion: 0.08
Nodes (45): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin) (+37 more)

### Community 12 - "toWibDateKey"
Cohesion: 0.22
Nodes (18): toWibDateKey(), LiveUniversityDashboard(), LiveAdminDashboard(), activeBorrowers(), CANCELLED, HOLDS_SLOT, roomRequestsInScope(), SUCCEEDED (+10 more)

### Community 13 - "SportsHallReservationForm.tsx"
Cohesion: 0.29
Nodes (12): toSportsHallReservationRequest(), LEGEND, SLOT_LABEL, SLOT_STYLES, SportsHallReservationForm(), buildSlots(), SlotSelection, slotStatus (+4 more)

### Community 14 - "useCountdown.ts"
Cohesion: 0.53
Nodes (4): DeadlineInput, getCountdown(), NOW, useCountdown()

### Community 15 - "Card"
Cohesion: 0.10
Nodes (32): LineChart(), LineChartProps, LineSeries, niceMax(), Card(), CardProps, TypeSummary, UniversityDashboardData (+24 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "useLiveData.ts"
Cohesion: 0.19
Nodes (18): Mode data: dengan atau tanpa data dummy, zod, LiveData, useLiveData(), useLiveState(), readBrowserDataMode(), listeners, LIVE_PREFIX (+10 more)

### Community 18 - "AnnouncementManager.tsx"
Cohesion: 0.05
Nodes (61): metadata, Page(), metadata, Page(), metadata, Page(), CheckboxGrid(), ChipRadios() (+53 more)

### Community 19 - "ReservationTable.tsx"
Cohesion: 0.11
Nodes (25): SegmentedNav(), SegmentedNavItem, SegmentedNavProps, UniversityReservationsProps, TodayReservationsCardProps, getReservationRequests(), TODO: replace with the orval client (no-store, filtered by scope, type, and…, ReservationCandidates (+17 more)

### Community 20 - "getUniversityDashboard.ts"
Cohesion: 0.21
Nodes (15): MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE, buildReservationsMock(), mockRoomsInScope(), getUniversityDashboard(), TODO: replace with the orval client for the admin universitas dashboard (no-… (+7 more)

### Community 21 - "AddUserDialog.tsx"
Cohesion: 0.16
Nodes (24): @hookform/resolvers, react-hook-form, Field(), FieldProps, INPUT_CLASS, SelectInput(), SelectInputProps, Modal() (+16 more)

### Community 22 - "UserDashboard.tsx"
Cohesion: 0.14
Nodes (19): metadata, Page(), ORMAWA_ROUTES, DashboardHero(), DashboardHeroProps, getUserDashboard(), TODO: replace with the orval client for the dashboard endpoint (no-store) once…, LatestAnnouncementsCard() (+11 more)

### Community 23 - "schema.ts"
Cohesion: 0.08
Nodes (34): DRAFT_LETTER_HOURS, LETTER_MAX_SIZE_MB, ORGANISATION_MIN_DAYS_AHEAD, ROOM_CLOSE_TIME, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, BOOKING_MODES (+26 more)

### Community 24 - "ReservationFormPage.tsx"
Cohesion: 0.27
Nodes (13): InternalReservationForm(), InternalReservationFormProps, DraftListProps, BookingMode, getRoomReservationOptions(), getSportsHallReservationOptions(), getVehicleReservationOptions(), ReservationFormPageProps (+5 more)

### Community 25 - "package.json"
Cohesion: 0.13
Nodes (13): name, private, version, jsdom, orval, react-dom, tailwindcss, @tailwindcss/turbopack (+5 more)

### Community 26 - "date.ts"
Cohesion: 0.17
Nodes (21): Countdown, DateInput, formatDateLongWIB(), formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatDayRange(), formatDayRangeShortWIB() (+13 more)

### Community 27 - "getDataMode"
Cohesion: 0.22
Nodes (14): DATA_MODE_COOKIE, DataMode, parseDataMode(), writeBrowserDataMode(), getDataMode, clearLive(), notify(), DataModeControls() (+6 more)

### Community 28 - "pengguna/page.tsx"
Cohesion: 0.21
Nodes (10): metadata, Page(), metadata, Page(), MOCK_FAKULTAS, FAKULTAS_PARAM, fakultasScopeFromSearchParams(), SearchParams (+2 more)

### Community 29 - "react"
Cohesion: 0.20
Nodes (12): react, ResultDialog(), ResultDialogProps, ModalProps, useModalDialog(), changePassword(), PasswordChange, PasswordErrors (+4 more)

### Community 30 - "2. Struktur dan fungsi folder"
Cohesion: 0.13
Nodes (14): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Admin Universitas (+6 more)

### Community 31 - "content.ts"
Cohesion: 0.06
Nodes (52): framer-motion, src_app_globals, inter, metadata, poppins, metadata, Page(), AppBrand() (+44 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.15
Nodes (14): Client API (orval), CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., ReservationListing, ReservationRequest, status(), text() (+6 more)

### Community 33 - "facility.ts"
Cohesion: 0.13
Nodes (22): wibToIso(), buildSportsHallBookingsMock(), MOCK_ROOM_RULES, MOCK_SPORTS_HALL, MOCK_VEHICLES, SAMPLE_CAPACITY, getMockLecturerSchedules(), schedules (+14 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "reservations.ts"
Cohesion: 0.12
Nodes (21): buildAnnouncementsMock(), buildDashboardMock(), buildReportsMock(), ROWS, BOOKER, buildFacilityRequestsMock(), buildReservationHistoryMock(), FACILITY_ROWS (+13 more)

### Community 37 - "ReservationLogCalendar.tsx"
Cohesion: 0.23
Nodes (13): monthName(), buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef (+5 more)

### Community 38 - "sendComplaint.ts"
Cohesion: 0.22
Nodes (8): LaravelValidationError, CATEGORIES, COMPLAINT_FIELD_MAP, ComplaintInput, complaintSchema, ComplaintValues, TODO: POST `values` with the orval client. Map 422 bodies to { validation } and…, SendComplaintResult

### Community 39 - "QuickLogin.tsx"
Cohesion: 0.22
Nodes (10): metadata, Page(), QuickLoginProps, ROLE_LABEL, ProfilePage(), ProfilePageProps, ProfileSummary(), ProfileSummaryProps (+2 more)

### Community 40 - "types/reservation.ts"
Cohesion: 0.08
Nodes (39): metadata, Page(), metadata, Page(), TypeTabsProps, createReservationFor(), DRAWINGS, ReservationTypeIllustration() (+31 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "[tipe]/persetujuan/page.tsx"
Cohesion: 0.20
Nodes (15): generateMetadata(), generateStaticParams, Page(), generateStaticParams, Page(), generateMetadata(), generateStaticParams, Page() (+7 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "lecturer-schedule/actions.ts"
Cohesion: 0.20
Nodes (12): metadata, Page(), getMockLecturerSchedule(), setMockLecturerSchedule(), saveLecturerSchedule(), SaveScheduleResult, facultyRoomCodes(), getLecturerSchedule() (+4 more)

### Community 46 - "getCurrentUser.ts"
Cohesion: 0.37
Nodes (10): metadata, Page(), metadata, Page(), metadata, Page(), getCurrentUser(), borrowerBooking() (+2 more)

### Community 47 - "auth/actions.ts"
Cohesion: 0.27
Nodes (13): login(), LoginResult, loginWithLaravel(), logout(), onEmail(), quickLogin(), startSession(), forwardCookies() (+5 more)

### Community 48 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+6 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "ActiveReservationCard.tsx"
Cohesion: 0.26
Nodes (9): Badge(), ActiveReservationCard(), Field(), room, ActiveReservationList(), ActiveReservationListProps, Group(), RESERVATION_STATUS (+1 more)

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

### Community 65 - "UserManagement.tsx"
Cohesion: 0.14
Nodes (21): @testing-library/react, PAGE_SIZE_OPTIONS, Pagination(), PaginationProps, TABLE, TABLE_CELL, TABLE_HEAD_CELL, TABLE_ROW (+13 more)

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 67 - "RoomReservationForm.tsx"
Cohesion: 0.11
Nodes (38): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, useLiveBuildings(), FloorPlan(), LetterField(), LetterFieldProps, LetterPanel(), LetterPanelProps (+30 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "laravel.ts"
Cohesion: 0.31
Nodes (10): callLaravel(), decode(), fetchApiUser(), LaravelResponse, parseApiUser(), parseSetCookie(), userSchema, apiUrl() (+2 more)

### Community 70 - "LoginPage.tsx"
Cohesion: 0.30
Nodes (9): metadata, Page(), getSessionUser, authMode, getDemoAccounts(), LoginPage(), QuickLogin(), roleLabel() (+1 more)

### Community 71 - "ContactPage.tsx"
Cohesion: 0.33
Nodes (6): metadata, Page(), CONTACT, TODO: replace the Figma placeholders with the real Sarpras Udinus contacts…, ChannelIcon(), ContactPage()

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, framer-motion, @hookform/resolvers, next, react, react-dom, react-hook-form, zod

### Community 74 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 75 - "MOCK_BUILDINGS"
Cohesion: 0.36
Nodes (6): metadata, Page(), MOCK_BUILDINGS, FloorPlanEditor(), getFloorPlanBuildings(), TODO: replace with the orval client for buildings and floor plans (no-store).

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 77 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 78 - "OrmawaShell.tsx"
Cohesion: 0.08
Nodes (38): AdminFakultasLayout(), AdminUniversitasLayout(), OperatorLayout(), metadata, Page(), OrmawaLayout(), isActive(), NavItem (+30 more)

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

### Community 94 - "CreateReservationPanel.tsx"
Cohesion: 0.20
Nodes (13): applyFormErrors(), FormErrorEntry, isLaravelValidationError(), fieldMap, toFormErrors(), CreateReservationPanel(), displayTime(), createOperatorReservation() (+5 more)

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

### Community 116 - "next"
Cohesion: 0.10
Nodes (23): nextConfig, next, metadata, Page(), metadata, Page(), metadata, Page() (+15 more)

### Community 118 - "Button"
Cohesion: 0.18
Nodes (12): B. Pengelola (`admin_fakultas` dan `admin_universitas`), RouteError(), RouteErrorProps, CAPS_LABEL_CLASS, Button, ButtonProps, VARIANT_STYLES, ApproveReservationDialog() (+4 more)

## Knowledge Gaps
- **676 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+671 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 803 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `session.ts`, `OperatorFloorPage.tsx`, `DraftCard.tsx`, `availability.ts`, `vitest`, `RoomManager.tsx`, `userSchema.ts`, `ReservationHistoryTable.tsx`, `SportsHallReservationForm.tsx`, `Card`, `AnnouncementManager.tsx`, `ReservationTable.tsx`, `getUniversityDashboard.ts`, `AddUserDialog.tsx`, `UserDashboard.tsx`, `package.json`, `getDataMode`, `pengguna/page.tsx`, `react`, `content.ts`, `facility.ts`, `ReservationLogCalendar.tsx`, `QuickLogin.tsx`, `types/reservation.ts`, `[tipe]/persetujuan/page.tsx`, `lecturer-schedule/actions.ts`, `getCurrentUser.ts`, `auth/actions.ts`, `ActiveReservationCard.tsx`, `admin-universitas/routes.ts`, `UserManagement.tsx`, `RoomReservationForm.tsx`, `laravel.ts`, `LoginPage.tsx`, `ContactPage.tsx`, `MOCK_BUILDINGS`, `OrmawaShell.tsx`, `Button`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `OperatorFloorPage.tsx`, `DraftCard.tsx`, `vitest`, `LecturerScheduleUpload.tsx`, `RoomManager.tsx`, `userSchema.ts`, `ReservationHistoryTable.tsx`, `FloorPlanEditor.tsx`, `toWibDateKey`, `SportsHallReservationForm.tsx`, `useCountdown.ts`, `Card`, `useLiveData.ts`, `AnnouncementManager.tsx`, `ReservationTable.tsx`, `AddUserDialog.tsx`, `UserDashboard.tsx`, `package.json`, `getDataMode`, `content.ts`, `facility.ts`, `ReservationLogCalendar.tsx`, `QuickLogin.tsx`, `types/reservation.ts`, `getCurrentUser.ts`, `UserManagement.tsx`, `RoomReservationForm.tsx`, `LoginPage.tsx`, `OrmawaShell.tsx`, `CreateReservationPanel.tsx`, `Button`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `session.ts`, `OperatorFloorPage.tsx`, `reservationStore.ts`, `DraftCard.tsx`, `availability.ts`, `LecturerScheduleUpload.tsx`, `RoomManager.tsx`, `userSchema.ts`, `ReservationHistoryTable.tsx`, `FloorPlanEditor.tsx`, `toWibDateKey`, `SportsHallReservationForm.tsx`, `useCountdown.ts`, `useLiveData.ts`, `AnnouncementManager.tsx`, `ReservationTable.tsx`, `schema.ts`, `package.json`, `date.ts`, `pengguna/page.tsx`, `react`, `content.ts`, `createReservation.ts`, `facility.ts`, `ReservationLogCalendar.tsx`, `sendComplaint.ts`, `types/reservation.ts`, `ActiveReservationCard.tsx`, `UserManagement.tsx`, `laravel.ts`, `OrmawaShell.tsx`, `CreateReservationPanel.tsx`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _676 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `OperatorFloorPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06735159817351598 - nodes in this community are weakly interconnected._
- **Should `reservationStore.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10793650793650794 - nodes in this community are weakly interconnected._
- **Should `DraftCard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12435897435897436 - nodes in this community are weakly interconnected._