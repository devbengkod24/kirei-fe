# Graph Report - kirei-fe  (2026-11-20)

## Corpus Check
- 426 files · ~241,309 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2135 nodes · 5797 edges · 121 communities (101 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 92 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3e6bf0b1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth/actions.ts
- types/reservation.ts
- toWibDateKey
- DraftCard.tsx
- RoomReservationForm.tsx
- TimeWheel.tsx
- scheduleCsv.ts
- PageSkeleton
- RoomManager.tsx
- AddUserDialog.tsx
- UserManagement.tsx
- FloorPlanEditor.tsx
- ReportFilterForm.tsx
- SportsHallReservationForm.tsx
- next
- Card
- contrast-check.py
- useLiveData.ts
- AnnouncementManager.tsx
- Button
- getAnnouncements.ts
- CreateReservationPanel.tsx
- 2. Struktur dan fungsi folder
- schema.ts
- VehicleReservationForm.tsx
- package.json
- date.ts
- getDataMode.ts
- pengguna/page.tsx
- CreateReservationBreadcrumb.tsx
- useLiveFacilities.ts
- content.ts
- createReservation.ts
- facility.ts
- compilerOptions
- Accessibility Code Patterns
- getUniversityDashboard.ts
- ReservationLogCalendar.tsx
- ComplaintForm.tsx
- requireRole
- Tone & Voice
- kirei-fe
- [tipe]/persetujuan/page.tsx
- antislop-layoutmobile
- LecturerScheduleUpload.tsx
- getCurrentUser.ts
- getManagedUsers.ts
- ReservationType
- What You Must Do When Invoked
- getCurrentUser
- AdminDashboardSkeleton
- ReservationFormSkeleton
- ReservationRequest
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- Arsitektur KIREI FE
- Group 1: Hard Gate (absolute, no exceptions)
- RoomReservationForm
- Comments That Add Nothing
- react
- QuickLogin.tsx
- laravel.ts
- KIREI FE
- reservations.ts
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
- Field.tsx
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
- mutator.test.ts
- RouteError.tsx
- UserDashboard.tsx
- 2. Alur Tindakan Pengguna (User Flow)
- LoginPage.tsx
- ContactPage.tsx
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

## Communities (121 total, 20 thin omitted)

### Community 0 - "auth/actions.ts"
Cohesion: 0.26
Nodes (15): Admin Universitas, isLaravelValidationError(), login(), LoginResult, loginWithLaravel(), logout(), onEmail(), quickLogin() (+7 more)

### Community 1 - "types/reservation.ts"
Cohesion: 0.05
Nodes (75): Operator, ref_node_url, @testing-library/react, vitest, metadata, Page(), MaskIcon(), MaskIconProps (+67 more)

### Community 2 - "toWibDateKey"
Cohesion: 0.05
Nodes (73): Simulasi alur reservasi (mock store), 3. Titik Integrasi Mock untuk Prototipe, metadata, Page(), toWibDateKey(), LiveUniversityDashboard(), LiveAdminDashboard(), createReservation() (+65 more)

### Community 3 - "DraftCard.tsx"
Cohesion: 0.09
Nodes (42): Loading(), DRAFT_LETTER_HOURS, DeadlineInput, getCountdown(), NOW, useCountdown(), formatTimeRangeWIB(), cancelDraft() (+34 more)

### Community 4 - "RoomReservationForm.tsx"
Cohesion: 0.10
Nodes (32): addDaysToKey(), CreateReservationPanelProps, useLiveLectureBookings(), crossFacultyApprover(), defaultSchedule(), isRoomBooked(), roomBookingsOnDay(), roomStatus (+24 more)

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
Nodes (40): Admin Fakultas, ROOM_PHOTO_MAX_SIZE_MB, classroomRow(), MOCK_BUILDINGS, MOCK_ROOMS, room(), EditRoomDialog(), EditRoomDialogProps (+32 more)

### Community 9 - "AddUserDialog.tsx"
Cohesion: 0.14
Nodes (23): AddUserDialogProps, DEFAULTS, STATUS_OPTIONS, UserDetailChanges, UserDetailDialogProps, UserManagementProps, createUserSchema(), IssueSink (+15 more)

### Community 10 - "UserManagement.tsx"
Cohesion: 0.08
Nodes (39): Badge(), BadgeProps, BadgeTone, SIZE_STYLES, TONE_STYLES, LinkPagination(), LinkPaginationProps, PageLink() (+31 more)

### Community 11 - "FloorPlanEditor.tsx"
Cohesion: 0.13
Nodes (31): metadata, Page(), Drag, FloorPlanCanvas(), FloorPlanCanvasProps, CATEGORIES, FloorPlanEditor(), FloorPlanEditorProps (+23 more)

### Community 12 - "ReportFilterForm.tsx"
Cohesion: 0.15
Nodes (21): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), isInPeriod(), shiftKey(), TIME_PERIOD_OPTIONS (+13 more)

### Community 13 - "SportsHallReservationForm.tsx"
Cohesion: 0.15
Nodes (18): rangesOverlap(), DATE, ReservationStep, STEPS_BY_TYPE, TIME, UPLOAD, SPORTS_HALL_RESERVATION_FIELD_MAP, SPORTS_HALL_SCHEDULE_FIELDS (+10 more)

### Community 14 - "next"
Cohesion: 0.15
Nodes (15): nextConfig, next, Page(), ComingSoonProps, TypeSummary, UniversityDashboardData, TypeSummaryCard(), TypeSummaryCardProps (+7 more)

### Community 15 - "Card"
Cohesion: 0.11
Nodes (28): LineChart(), LineChartProps, LineSeries, niceMax(), Card(), CardProps, WeeklyCounts, ReservationTrendCard() (+20 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "useLiveData.ts"
Cohesion: 0.20
Nodes (17): zod, LiveData, useLiveData(), clearLive(), listeners, LIVE_PREFIX, liveKey(), LiveStorage (+9 more)

### Community 18 - "AnnouncementManager.tsx"
Cohesion: 0.11
Nodes (25): PAGE_SIZE_OPTIONS, Pagination(), PaginationProps, Popover(), PopoverProps, useLiveState(), usePagination(), formatRelativeDayWIB() (+17 more)

### Community 19 - "Button"
Cohesion: 0.16
Nodes (19): B. Pengelola (`admin_fakultas` dan `admin_universitas`), react-hook-form, CAPS_LABEL_CLASS, Button, ButtonProps, VARIANT_STYLES, Modal(), UserDetailDialog() (+11 more)

### Community 20 - "getAnnouncements.ts"
Cohesion: 0.23
Nodes (9): metadata, Page(), metadata, Page(), metadata, Page(), buildAnnouncementsMock(), getAnnouncements() (+1 more)

### Community 21 - "CreateReservationPanel.tsx"
Cohesion: 0.36
Nodes (7): @hookform/resolvers, CreateReservationPanel(), displayTime(), createOperatorReservation(), OPERATOR_RESERVATION_FIELD_MAP, operatorReservationSchema, OperatorReservationValues

### Community 22 - "2. Struktur dan fungsi folder"
Cohesion: 0.25
Nodes (8): 2. Struktur dan fungsi folder, Cara memilih lokasi sebuah file, Client API (orval), Contoh: Admin Fakultas (Figma V3, section "Admin Fakultas"), Contoh: dashboard ormawa dan dosen, Di dalam `src/`, Di root repo, Mode data: dengan atau tanpa data dummy

### Community 23 - "schema.ts"
Cohesion: 0.11
Nodes (25): LETTER_MAX_SIZE_MB, ROOM_CLOSE_TIME, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, ALWAYS, createRoomReservationSchema(), createSportsHallReservationSchema() (+17 more)

### Community 24 - "VehicleReservationForm.tsx"
Cohesion: 0.22
Nodes (11): ORGANISATION_MIN_DAYS_AHEAD, BOOKING_MODES, BookingMode, BookingModeSettings, ReservationLinks, RoomReservationFormProps, VEHICLE_RESERVATION_FIELD_MAP, SportsHallReservationFormProps (+3 more)

### Community 25 - "package.json"
Cohesion: 0.13
Nodes (13): name, private, version, jsdom, orval, react-dom, tailwindcss, @tailwindcss/turbopack (+5 more)

### Community 26 - "date.ts"
Cohesion: 0.17
Nodes (23): Countdown, DateInput, formatDateLongWIB(), formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatDayRange(), formatDayRangeShortWIB() (+15 more)

### Community 27 - "getDataMode.ts"
Cohesion: 0.24
Nodes (12): DATA_MODE_COOKIE, DataMode, parseDataMode(), readBrowserDataMode(), writeBrowserDataMode(), DataModeControls(), DataModeSwitch(), DataModeSwitchProps (+4 more)

### Community 28 - "pengguna/page.tsx"
Cohesion: 0.17
Nodes (15): metadata, Page(), metadata, Page(), MOCK_FAKULTAS, getManagedUsers(), parseUserTab(), USER_TAB_PARAM (+7 more)

### Community 29 - "CreateReservationBreadcrumb.tsx"
Cohesion: 0.33
Nodes (6): Layout(), Breadcrumb(), BreadcrumbItem, BreadcrumbProps, CreateReservationBreadcrumb(), ORMAWA_ROUTES

### Community 30 - "useLiveFacilities.ts"
Cohesion: 0.27
Nodes (9): buildingsSchema, floorPlanRoomSchema, lecturerSchedulesSchema, LIVE_NAMES, reportsSchema, weekdaySchema, useLiveBuildings(), useLiveFloor() (+1 more)

### Community 31 - "content.ts"
Cohesion: 0.07
Nodes (44): framer-motion, metadata, Page(), BOOKING_WINDOW_RULE, CAMPUS_ADDRESS, FACILITY_ITEMS, FACILITY_SLIDES, FacilitySlide (+36 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.16
Nodes (16): wibToIso(), CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., ReservationListing, ReservationRequest, status(), text() (+8 more)

### Community 33 - "facility.ts"
Cohesion: 0.14
Nodes (20): buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_BUILDINGS, MOCK_ROOM_RULES, MOCK_SPORTS_HALL, MOCK_VEHICLES, SAMPLE_CAPACITY, TODO: replace with the orval client for buildings and floor plans (no-store). (+12 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "getUniversityDashboard.ts"
Cohesion: 0.15
Nodes (19): metadata, Page(), getDataMode, MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE, buildReportsMock() (+11 more)

### Community 37 - "ReservationLogCalendar.tsx"
Cohesion: 0.24
Nodes (12): buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef, cellClass() (+4 more)

### Community 38 - "ComplaintForm.tsx"
Cohesion: 0.16
Nodes (16): applyFormErrors(), FormErrorEntry, LaravelValidationError, fieldMap, toFormErrors(), ComplaintForm(), ComplaintFormProps, DEFAULTS (+8 more)

### Community 39 - "requireRole"
Cohesion: 0.12
Nodes (19): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+11 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "[tipe]/persetujuan/page.tsx"
Cohesion: 0.19
Nodes (15): generateMetadata(), generateStaticParams, Page(), generateStaticParams, Page(), generateMetadata(), generateStaticParams, Page() (+7 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "LecturerScheduleUpload.tsx"
Cohesion: 0.14
Nodes (22): metadata, Page(), getMockLecturerSchedule(), getMockLecturerSchedules(), schedules, setMockLecturerSchedule(), saveLecturerSchedule(), SaveScheduleResult (+14 more)

### Community 46 - "getCurrentUser.ts"
Cohesion: 0.18
Nodes (13): cookieStore, LOGIN_PATH, ROLE_HOME, SESSION_COOKIE, userFromSession(), findMockAccount(), findMockUserById(), MOCK_ADMIN_FAKULTAS (+5 more)

### Community 47 - "getManagedUsers.ts"
Cohesion: 0.20
Nodes (10): MOCK_ACCOUNTS, ADMIN_FAKULTAS, DOSEN, MOCK_MANAGED_USERS, OPERATORS, ORMAWA, demoAccountUsers(), isManagedRole() (+2 more)

### Community 48 - "ReservationType"
Cohesion: 0.10
Nodes (19): Admin Universitas, Ormawa dan dosen, Override slot oleh Admin Universitas, Perbedaan dengan Figma V3, Publik dan autentikasi, Ringkasan, Role dan Halaman, metadata (+11 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "getCurrentUser"
Cohesion: 0.28
Nodes (11): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+3 more)

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 53 - "ReservationRequest"
Cohesion: 0.09
Nodes (28): metadata, Page(), metadata, Page(), Layout(), Page(), RESERVATION_TAB_LINKS, UniversityReservationsProps (+20 more)

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

### Community 64 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 65 - "Arsitektur KIREI FE"
Cohesion: 0.25
Nodes (7): 1. Prinsip, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 67 - "RoomReservationForm"
Cohesion: 0.21
Nodes (23): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, InternalReservationForm(), FloorPlan(), getRoomReservationOptions(), getSportsHallReservationOptions(), getVehicleReservationOptions(), LetterField() (+15 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "react"
Cohesion: 0.19
Nodes (13): react, ResultDialog(), ResultDialogProps, ModalProps, useModalDialog(), changePassword(), MIN_PASSWORD_LENGTH, PasswordChange (+5 more)

### Community 70 - "QuickLogin.tsx"
Cohesion: 0.33
Nodes (7): QuickLogin(), QuickLoginProps, ROLE_LABEL, roleLabel(), ProfilePageProps, CurrentUser, UserRole

### Community 71 - "laravel.ts"
Cohesion: 0.27
Nodes (12): callLaravel(), decode(), fetchApiUser(), LaravelCookie, LaravelResponse, parseApiUser(), parseSetCookie(), userSchema (+4 more)

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "reservations.ts"
Cohesion: 0.16
Nodes (19): BOOKER, buildFacilityRequestsMock(), buildReservationHistoryMock(), buildReservationsMock(), FACILITY_ROWS, FacilityRow, PAST_STATUSES, pastRecords() (+11 more)

### Community 74 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+6 more)

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 78 - "OrmawaShell.tsx"
Cohesion: 0.07
Nodes (41): AdminFakultasLayout(), AdminUniversitasLayout(), OperatorLayout(), metadata, Page(), OrmawaLayout(), AppBrand(), isActive() (+33 more)

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

### Community 94 - "Field.tsx"
Cohesion: 0.24
Nodes (13): Field(), FieldProps, INPUT_CLASS, SelectInput(), SelectInputProps, AddUserDialog(), CreateAnnouncementDialog(), CreateAnnouncementDialogProps (+5 more)

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

### Community 115 - "mutator.test.ts"
Cohesion: 0.24
Nodes (7): API_URL, CSRF_METHODS, customFetch(), readBody(), readXsrfToken(), Result, toApiUrl()

### Community 119 - "UserDashboard.tsx"
Cohesion: 0.14
Nodes (19): metadata, Page(), buildDashboardMock(), DashboardHero(), DashboardHeroProps, getUserDashboard(), TODO: replace with the orval client for the dashboard endpoint (no-store) once…, LatestAnnouncementsCard() (+11 more)

### Community 120 - "2. Alur Tindakan Pengguna (User Flow)"
Cohesion: 0.20
Nodes (8): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin)

### Community 122 - "LoginPage.tsx"
Cohesion: 0.17
Nodes (11): src_app_globals, inter, metadata, poppins, metadata, Page(), SITE, getSessionUser (+3 more)

### Community 123 - "ContactPage.tsx"
Cohesion: 0.33
Nodes (6): metadata, Page(), CONTACT, TODO: replace the Figma placeholders with the real Sarpras Udinus contacts…, ChannelIcon(), ContactPage()

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

- **Why does `next` connect `next` to `auth/actions.ts`, `types/reservation.ts`, `toWibDateKey`, `DraftCard.tsx`, `RoomReservationForm.tsx`, `RoomManager.tsx`, `UserManagement.tsx`, `FloorPlanEditor.tsx`, `SportsHallReservationForm.tsx`, `Card`, `AnnouncementManager.tsx`, `Button`, `getAnnouncements.ts`, `package.json`, `getDataMode.ts`, `pengguna/page.tsx`, `CreateReservationBreadcrumb.tsx`, `content.ts`, `facility.ts`, `getUniversityDashboard.ts`, `ReservationLogCalendar.tsx`, `requireRole`, `[tipe]/persetujuan/page.tsx`, `LecturerScheduleUpload.tsx`, `getCurrentUser.ts`, `getManagedUsers.ts`, `ReservationType`, `getCurrentUser`, `ReservationRequest`, `RoomReservationForm`, `react`, `laravel.ts`, `OrmawaShell.tsx`, `Field.tsx`, `UserDashboard.tsx`, `LoginPage.tsx`, `ContactPage.tsx`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `types/reservation.ts`, `toWibDateKey`, `DraftCard.tsx`, `RoomReservationForm.tsx`, `TimeWheel.tsx`, `RoomManager.tsx`, `AddUserDialog.tsx`, `UserManagement.tsx`, `FloorPlanEditor.tsx`, `ReportFilterForm.tsx`, `SportsHallReservationForm.tsx`, `Card`, `useLiveData.ts`, `AnnouncementManager.tsx`, `Button`, `CreateReservationPanel.tsx`, `VehicleReservationForm.tsx`, `package.json`, `getDataMode.ts`, `pengguna/page.tsx`, `useLiveFacilities.ts`, `content.ts`, `ReservationLogCalendar.tsx`, `ComplaintForm.tsx`, `LecturerScheduleUpload.tsx`, `getCurrentUser.ts`, `RoomReservationForm`, `QuickLogin.tsx`, `OrmawaShell.tsx`, `Field.tsx`, `UserDashboard.tsx`, `LoginPage.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `vitest` connect `types/reservation.ts` to `toWibDateKey`, `DraftCard.tsx`, `RoomReservationForm.tsx`, `TimeWheel.tsx`, `scheduleCsv.ts`, `RoomManager.tsx`, `AddUserDialog.tsx`, `FloorPlanEditor.tsx`, `ReportFilterForm.tsx`, `SportsHallReservationForm.tsx`, `useLiveData.ts`, `AnnouncementManager.tsx`, `schema.ts`, `VehicleReservationForm.tsx`, `package.json`, `date.ts`, `pengguna/page.tsx`, `CreateReservationBreadcrumb.tsx`, `content.ts`, `createReservation.ts`, `facility.ts`, `getUniversityDashboard.ts`, `ReservationLogCalendar.tsx`, `ComplaintForm.tsx`, `[tipe]/persetujuan/page.tsx`, `getCurrentUser.ts`, `ReservationRequest`, `react`, `laravel.ts`, `OrmawaShell.tsx`, `mutator.test.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _680 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `types/reservation.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05133599831685252 - nodes in this community are weakly interconnected._
- **Should `toWibDateKey` be split into smaller, more focused modules?**
  _Cohesion score 0.0547008547008547 - nodes in this community are weakly interconnected._
- **Should `DraftCard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0880503144654088 - nodes in this community are weakly interconnected._