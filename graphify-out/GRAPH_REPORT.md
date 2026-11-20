# Graph Report - kirei-fe  (2026-11-20)

## Corpus Check
- 432 files · ~248,852 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2193 nodes · 6061 edges · 121 communities (101 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `50a1fb90`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- requireRole.ts
- OperatorFloorPage.tsx
- reservationStore.ts
- DraftCard.tsx
- RoomReservationForm.tsx
- vitest
- scheduleCsv.ts
- PageSkeleton
- RoomManager.tsx
- UserManagement.tsx
- types/reservation.ts
- FloorPlanEditor.tsx
- VehicleCrewPanel.tsx
- InternalReservationBreadcrumb.tsx
- DeadlineTimer.tsx
- AdminDashboard.tsx
- contrast-check.py
- useLiveData.ts
- AnnouncementManager.tsx
- ReservationTable.tsx
- toWibDateKey
- draftStorage.ts
- UserDashboard.tsx
- schema.ts
- lecturer-schedule/actions.ts
- package.json
- date.ts
- DataModeSwitch.tsx
- UniversityDashboard.tsx
- react
- 2. Struktur dan fungsi folder
- content.ts
- createReservation.ts
- getReservationOptions.ts
- compilerOptions
- Accessibility Code Patterns
- reservations.ts
- ReservationLogCalendar.tsx
- ComplaintForm.tsx
- getUniversityDashboard.ts
- RoleShell.tsx
- Tone & Voice
- kirei-fe
- requireRole
- antislop-layoutmobile
- Avatar
- getCurrentUser
- auth/actions.ts
- devDependencies
- What You Must Do When Invoked
- OrmawaShell.tsx
- AdminDashboardSkeleton
- ReservationFormSkeleton
- ReservationType
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- Shell.tsx
- Group 1: Hard Gate (absolute, no exceptions)
- SportsHallReservationForm.tsx
- Comments That Add Nothing
- laravel.ts
- LoginPage.tsx
- ContactPage.tsx
- KIREI FE
- dependencies
- scripts
- ReservationSubmitDialog.tsx
- Group 2: Purpose-Gate (technique allowed, purpose required)
- eslint.config.mjs
- AdminGedungShell.tsx
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
- DraftsSkeleton
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
- next
- Button
- pengguna/page.tsx
- LecturerScheduleUpload.tsx
- 2. Alur Tindakan Pengguna (User Flow)

## God Nodes (most connected - your core abstractions)
1. `next` - 112 edges
2. `toWibDateKey()` - 74 edges
3. `react` - 72 edges
4. `Card()` - 64 edges
5. `Button` - 59 edges
6. `vitest` - 54 edges
7. `requireRole()` - 52 edges
8. `ReservationType` - 43 edges
9. `RoomReservationForm()` - 40 edges
10. `PageSkeleton()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Di root repo` --references--> `MaskIcon()`  [INFERRED]
  docs/architecture.md → src/components/ui/MaskIcon.tsx
- `6. Urutan pembangunan yang disarankan` --references--> `getCurrentUser()`  [INFERRED]
  docs/architecture.md → src/lib/auth/getCurrentUser.ts
- `Client API (orval)` --references--> `applyFormErrors()`  [INFERRED]
  docs/architecture.md → src/lib/api/form-errors.ts
- `Admin Universitas` --references--> `getCurrentUser()`  [INFERRED]
  docs/architecture.md → src/lib/auth/getCurrentUser.ts
- `Admin Universitas` --references--> `requireRole()`  [INFERRED]
  docs/architecture.md → src/lib/auth/requireRole.ts

## Import Cycles
- None detected.

## Communities (121 total, 20 thin omitted)

### Community 0 - "requireRole.ts"
Cohesion: 0.18
Nodes (15): cookieStore, LOGIN_PATH, ROLE_HOME, SESSION_COOKIE, userFromSession(), findMockAccount(), findMockUserById(), MOCK_ADMIN_GEDUNG (+7 more)

### Community 1 - "OperatorFloorPage.tsx"
Cohesion: 0.06
Nodes (73): Operator, metadata, Page(), useMediaQuery(), toWibTimeKey(), buildClassSchedulesMock(), buildOperatorReservationsMock(), MOCK_OPERATOR_FLOOR (+65 more)

### Community 2 - "reservationStore.ts"
Cohesion: 0.05
Nodes (69): Simulasi alur reservasi (mock store), Ormawa dan dosen, metadata, Page(), LiveUniversityDashboard(), UniversityDashboardProps, LiveAdminDashboard(), useLiveReports() (+61 more)

### Community 3 - "DraftCard.tsx"
Cohesion: 0.20
Nodes (18): formatTimeRangeWIB(), DraftActionResult, DraftCard(), DraftCardProps, Field(), LetterInput, LetterValues, schema (+10 more)

### Community 4 - "RoomReservationForm.tsx"
Cohesion: 0.14
Nodes (29): ROOM_CLOSE_TIME, ROOM_OPEN_TIME, addDaysToKey(), wibToIso(), useLiveLectureBookings(), crossFacultyApprover(), defaultSchedule(), isRoomBooked() (+21 more)

### Community 5 - "vitest"
Cohesion: 0.10
Nodes (24): ref_node_url, vitest, metadata, Page(), hasDrafts(), DOSEN_ANSWERS, DOSEN_FAQ_ITEMS, FAQ_ITEMS (+16 more)

### Community 6 - "scheduleCsv.ts"
Cohesion: 0.16
Nodes (16): parseCsv(), DAY_LABEL, DAYS, normalizeTime(), overlaps(), ParsedSchedule, parseScheduleCsv(), rowSchema() (+8 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (20): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+12 more)

### Community 8 - "RoomManager.tsx"
Cohesion: 0.08
Nodes (49): Admin Gedung (role `admin_fakultas`), metadata, Page(), metadata, Page(), Field(), FieldProps, SelectInput() (+41 more)

### Community 9 - "UserManagement.tsx"
Cohesion: 0.08
Nodes (44): MOCK_ACCOUNTS, ADMIN_GEDUNG, DOSEN, MOCK_MANAGED_USERS, OPERATORS, ORMAWA, AddUserDialog(), AddUserDialogProps (+36 more)

### Community 10 - "types/reservation.ts"
Cohesion: 0.09
Nodes (37): Badge(), Card(), CardProps, LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps (+29 more)

### Community 11 - "FloorPlanEditor.tsx"
Cohesion: 0.09
Nodes (43): Admin Universitas, Override slot oleh Admin Universitas, Perbedaan dengan Figma V3, Publik dan autentikasi, Ringkasan, Role dan Halaman, Drag, FloorPlanCanvas() (+35 more)

### Community 12 - "VehicleCrewPanel.tsx"
Cohesion: 0.11
Nodes (21): MOCK_STAFF, COSTS, CrewInput, crewSchema, CrewValues, money, TODO: PUT the drivers and costs through the orval client. Until then the demo…, rupiah (+13 more)

### Community 13 - "InternalReservationBreadcrumb.tsx"
Cohesion: 0.11
Nodes (16): Layout(), metadata, Page(), Layout(), metadata, Page(), Breadcrumb(), BreadcrumbItem (+8 more)

### Community 14 - "DeadlineTimer.tsx"
Cohesion: 0.27
Nodes (9): Countdown, DeadlineInput, getCountdown(), NOW, useCountdown(), DeadlineTimer(), DeadlineTimerProps, display() (+1 more)

### Community 15 - "AdminDashboard.tsx"
Cohesion: 0.21
Nodes (12): LineChart(), LineChartProps, LineSeries, niceMax(), AdminDashboard(), AdminDashboardLinks, AdminDashboardProps, AdminDashboardData (+4 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "useLiveData.ts"
Cohesion: 0.14
Nodes (24): Mode data: dengan atau tanpa data dummy, LiveData, useLiveData(), useLiveState(), DATA_MODE_COOKIE, parseDataMode(), readBrowserDataMode(), writeBrowserDataMode() (+16 more)

### Community 18 - "AnnouncementManager.tsx"
Cohesion: 0.06
Nodes (53): metadata, Page(), metadata, Page(), metadata, Page(), CheckboxGrid(), ChipRadios() (+45 more)

### Community 19 - "ReservationTable.tsx"
Cohesion: 0.09
Nodes (35): B. Pengelola (`admin_fakultas` dan `admin_universitas`), Modal(), PAGE_SIZE_OPTIONS, Pagination(), PaginationProps, SegmentedNav(), SegmentedNavItem, SegmentedNavProps (+27 more)

### Community 20 - "toWibDateKey"
Cohesion: 0.16
Nodes (21): metadata, Page(), getDataMode, toWibDateKey(), buildAnnouncementsMock(), buildDashboardMock(), buildReportsMock(), ROWS (+13 more)

### Community 21 - "draftStorage.ts"
Cohesion: 0.21
Nodes (13): cancelDraft(), submitDraft(), draftsSnapshot(), DraftStorage, listeners, parseDrafts(), readDrafts(), removeDraft() (+5 more)

### Community 22 - "UserDashboard.tsx"
Cohesion: 0.17
Nodes (16): Page(), DashboardHero(), DashboardHeroProps, LatestAnnouncementsCard(), LiveUserDashboard(), ReservationTotal(), ReservationTotalProps, TodayReservationCard() (+8 more)

### Community 23 - "schema.ts"
Cohesion: 0.09
Nodes (30): DRAFT_LETTER_HOURS, LETTER_MAX_SIZE_MB, ORGANISATION_MIN_DAYS_AHEAD, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, BOOKING_MODES, BookingModeSettings, ALWAYS (+22 more)

### Community 24 - "lecturer-schedule/actions.ts"
Cohesion: 0.19
Nodes (13): metadata, Page(), getMockLecturerSchedule(), schedules, setMockLecturerSchedule(), saveLecturerSchedule(), SaveScheduleResult, facultyRoomCodes() (+5 more)

### Community 25 - "package.json"
Cohesion: 0.13
Nodes (13): name, private, version, jsdom, orval, react-dom, tailwindcss, @tailwindcss/turbopack (+5 more)

### Community 26 - "date.ts"
Cohesion: 0.28
Nodes (14): DateInput, formatDateLongWIB(), formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatDayRange(), formatDayRangeShortWIB(), formatDayRangeWIB() (+6 more)

### Community 27 - "DataModeSwitch.tsx"
Cohesion: 0.31
Nodes (8): DataMode, DataModeControls(), DataModeSwitch(), DataModeSwitchProps, MODES, ResetMockReservationsButton(), ResetMockReservationsButtonProps, TEXT

### Community 28 - "UniversityDashboard.tsx"
Cohesion: 0.17
Nodes (15): MOCK_FAKULTAS, TypeSummary, ReservationTrendCard(), TypeSummaryCard(), TypeSummaryCardProps, TONE, UniversityDashboard(), STAT_TONES (+7 more)

### Community 29 - "react"
Cohesion: 0.15
Nodes (16): react, ResultDialog(), ResultDialogProps, ModalProps, WIDTH, useModalDialog(), changePassword(), MIN_PASSWORD_LENGTH (+8 more)

### Community 30 - "2. Struktur dan fungsi folder"
Cohesion: 0.09
Nodes (21): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE (+13 more)

### Community 31 - "content.ts"
Cohesion: 0.06
Nodes (51): framer-motion, src_app_globals, inter, metadata, poppins, metadata, Page(), MaskIcon() (+43 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.13
Nodes (21): react-hook-form, DraftDetails, createReservation(), CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., ReservationRequest, status() (+13 more)

### Community 33 - "getReservationOptions.ts"
Cohesion: 0.11
Nodes (32): 3. Titik Integrasi Mock untuk Prototipe, buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_BUILDINGS, MOCK_ROOM_RULES, MOCK_SPORTS_HALL, MOCK_VEHICLES, SAMPLE_CAPACITY (+24 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "reservations.ts"
Cohesion: 0.13
Nodes (17): BOOKER, buildReservationHistoryMock(), FACILITY_ROWS, FacilityRow, PAST_STATUSES, PAST_TRIPS, pastRecords(), PURPOSES (+9 more)

### Community 37 - "ReservationLogCalendar.tsx"
Cohesion: 0.23
Nodes (13): monthName(), buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef (+5 more)

### Community 38 - "ComplaintForm.tsx"
Cohesion: 0.27
Nodes (8): zod, ComplaintFormProps, DEFAULTS, CATEGORIES, COMPLAINT_FIELD_MAP, ComplaintInput, complaintSchema, ComplaintValues

### Community 39 - "getUniversityDashboard.ts"
Cohesion: 0.22
Nodes (12): MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE, TODO: replace with the orval client for the admin universitas dashboard (no-…, UniversityDashboardData, WeeklyCounts, ReservationTrendCardProps (+4 more)

### Community 40 - "RoleShell.tsx"
Cohesion: 0.31
Nodes (8): OperatorLayout(), AppBrand(), OperatorAccountBar(), OperatorAccount(), OperatorShell(), LogoutButton(), RoleShell(), RoleShellProps

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "requireRole"
Cohesion: 0.18
Nodes (20): metadata, Page(), generateMetadata(), generateStaticParams, Page(), generateStaticParams, Page(), generateMetadata() (+12 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "Avatar"
Cohesion: 0.24
Nodes (9): metadata, Page(), Avatar(), AvatarProps, initialsOf(), ProfilePage(), ProfilePageProps, ProfileSummary() (+1 more)

### Community 46 - "getCurrentUser"
Cohesion: 0.17
Nodes (16): metadata, Page(), metadata, metadata, Page(), metadata, Page(), metadata (+8 more)

### Community 47 - "auth/actions.ts"
Cohesion: 0.18
Nodes (20): Admin Universitas, applyFormErrors(), FormErrorEntry, isLaravelValidationError(), LaravelValidationError, fieldMap, toFormErrors(), login() (+12 more)

### Community 48 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+6 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "OrmawaShell.tsx"
Cohesion: 0.36
Nodes (6): OrmawaLayout(), DOSEN_NAV, NOT_FOR_DOSEN, ORMAWA_NAV, BorrowerShell(), OrmawaShell()

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 53 - "ReservationType"
Cohesion: 0.19
Nodes (13): Page(), TODO: load drivers from Kelola Staf (orval) once it exists; sample drivers…, UniversityReservationsProps, ADMIN_UNIVERSITAS_ROUTES, reservationsRoute(), AdminScope, ReservationTypePickerProps, TODO: replace with the orval client (no-store, filtered by scope, type, and… (+5 more)

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

### Community 64 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 65 - "Shell.tsx"
Cohesion: 0.53
Nodes (5): isActive(), NavItem, NavList(), Shell(), ShellProps

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 67 - "SportsHallReservationForm.tsx"
Cohesion: 0.11
Nodes (32): 1. Tabel Pemetaan Halaman dan Komponen Utama, 4. Perbedaan dengan Vault dan Keputusan, A. Pemohon (`organisasi` dan `dosen`), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin), Komponen `shared/` dan pemakainya, LetterField(), LetterFieldProps, LetterPanel() (+24 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "laravel.ts"
Cohesion: 0.27
Nodes (12): callLaravel(), decode(), fetchApiUser(), LaravelCookie, LaravelResponse, parseApiUser(), parseSetCookie(), userSchema (+4 more)

### Community 70 - "LoginPage.tsx"
Cohesion: 0.23
Nodes (11): metadata, Page(), getSessionUser, getDemoAccounts(), LoginForm(), LoginPage(), QuickLogin(), QuickLoginProps (+3 more)

### Community 71 - "ContactPage.tsx"
Cohesion: 0.43
Nodes (5): CONTACT, TODO: replace the Figma placeholders with the real Sarpras Udinus contacts…, ComplaintForm(), ChannelIcon(), ContactPage()

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
Cohesion: 0.27
Nodes (8): CAPS_LABEL_CLASS, ReservationSubmitDialogProps, SubmissionFields, ReservationIntent, SUMMARY_INPUT, SUMMARY_LABEL, SummaryRow(), SummaryWhenProps

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 77 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 78 - "AdminGedungShell.tsx"
Cohesion: 0.21
Nodes (10): AdminGedungLayout(), AdminUniversitasLayout(), AdminAvatar(), AdminGedungShell(), ADMIN_GEDUNG_NAV, AdminAvatar(), AdminUniversitasShell(), ADMIN_UNIVERSITAS_NAV (+2 more)

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
Cohesion: 0.13
Nodes (25): @hookform/resolvers, Popover(), PopoverProps, VehicleFleetInfo(), VehicleFleetInfoProps, VehicleReservationOptions, MAX_DESTINATIONS, VEHICLE_RESERVATION_FIELD_MAP (+17 more)

### Community 116 - "next"
Cohesion: 0.12
Nodes (15): nextConfig, next, metadata, Page(), metadata, Page(), metadata, Page() (+7 more)

### Community 118 - "Button"
Cohesion: 0.15
Nodes (14): @testing-library/react, RouteError(), RouteErrorProps, Button, ButtonProps, VARIANT_STYLES, usePagination(), formatTimeWIB() (+6 more)

### Community 120 - "pengguna/page.tsx"
Cohesion: 0.27
Nodes (9): metadata, Page(), metadata, Page(), FloorPlanEditor(), getFloorPlanBuildings(), TODO: replace with the orval client for buildings and floor plans (no-store)., getManagedUsers() (+1 more)

### Community 123 - "LecturerScheduleUpload.tsx"
Cohesion: 0.15
Nodes (17): dayText(), LecturerScheduleUpload(), LecturerScheduleUploadProps, Picked, timeText(), buildingsSchema, floorPlanRoomSchema, lecturerSchedulesSchema (+9 more)

### Community 125 - "2. Alur Tindakan Pengguna (User Flow)"
Cohesion: 0.40
Nodes (5): 2. Alur Tindakan Pengguna (User Flow), A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin)

## Knowledge Gaps
- **699 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+694 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 834 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `requireRole.ts`, `OperatorFloorPage.tsx`, `reservationStore.ts`, `DraftCard.tsx`, `RoomReservationForm.tsx`, `vitest`, `RoomManager.tsx`, `UserManagement.tsx`, `types/reservation.ts`, `FloorPlanEditor.tsx`, `InternalReservationBreadcrumb.tsx`, `AdminDashboard.tsx`, `AnnouncementManager.tsx`, `ReservationTable.tsx`, `toWibDateKey`, `UserDashboard.tsx`, `lecturer-schedule/actions.ts`, `package.json`, `DataModeSwitch.tsx`, `UniversityDashboard.tsx`, `react`, `content.ts`, `getReservationOptions.ts`, `reservations.ts`, `ReservationLogCalendar.tsx`, `getUniversityDashboard.ts`, `requireRole`, `Avatar`, `getCurrentUser`, `auth/actions.ts`, `ReservationType`, `Shell.tsx`, `SportsHallReservationForm.tsx`, `laravel.ts`, `LoginPage.tsx`, `ContactPage.tsx`, `ReservationSubmitDialog.tsx`, `Button`, `pengguna/page.tsx`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `requireRole.ts`, `OperatorFloorPage.tsx`, `reservationStore.ts`, `DraftCard.tsx`, `RoomReservationForm.tsx`, `vitest`, `RoomManager.tsx`, `UserManagement.tsx`, `types/reservation.ts`, `FloorPlanEditor.tsx`, `VehicleCrewPanel.tsx`, `DeadlineTimer.tsx`, `useLiveData.ts`, `AnnouncementManager.tsx`, `ReservationTable.tsx`, `toWibDateKey`, `UserDashboard.tsx`, `package.json`, `DataModeSwitch.tsx`, `UniversityDashboard.tsx`, `content.ts`, `createReservation.ts`, `ReservationLogCalendar.tsx`, `ComplaintForm.tsx`, `RoleShell.tsx`, `Avatar`, `OrmawaShell.tsx`, `Shell.tsx`, `SportsHallReservationForm.tsx`, `LoginPage.tsx`, `AdminGedungShell.tsx`, `VehicleReservationForm.tsx`, `Button`, `LecturerScheduleUpload.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `requireRole.ts`, `OperatorFloorPage.tsx`, `reservationStore.ts`, `DraftCard.tsx`, `RoomReservationForm.tsx`, `scheduleCsv.ts`, `RoomManager.tsx`, `UserManagement.tsx`, `types/reservation.ts`, `FloorPlanEditor.tsx`, `VehicleCrewPanel.tsx`, `InternalReservationBreadcrumb.tsx`, `DeadlineTimer.tsx`, `useLiveData.ts`, `AnnouncementManager.tsx`, `ReservationTable.tsx`, `draftStorage.ts`, `schema.ts`, `package.json`, `date.ts`, `UniversityDashboard.tsx`, `react`, `2. Struktur dan fungsi folder`, `content.ts`, `createReservation.ts`, `ReservationLogCalendar.tsx`, `ComplaintForm.tsx`, `auth/actions.ts`, `SportsHallReservationForm.tsx`, `laravel.ts`, `VehicleReservationForm.tsx`, `Button`, `LecturerScheduleUpload.tsx`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _699 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `OperatorFloorPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.055642633228840124 - nodes in this community are weakly interconnected._
- **Should `reservationStore.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0545308740978348 - nodes in this community are weakly interconnected._
- **Should `RoomReservationForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1354723707664884 - nodes in this community are weakly interconnected._