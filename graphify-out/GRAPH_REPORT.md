# Graph Report - kirei-fe  (2026-11-27)

## Corpus Check
- 479 files · ~265,444 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2425 nodes · 6924 edges · 128 communities (103 shown, 25 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6d045d74`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- UserDashboard.tsx
- ScheduleManager.tsx
- ComplaintForm.tsx
- RoomReservationForm.tsx
- UserManagement.tsx
- TimeWheel.tsx
- getDataMode
- PageSkeleton
- draftStorage.ts
- pengguna/page.tsx
- facilities.ts
- slots.ts
- InternalReservationBreadcrumb.tsx
- ReservationTypePicker.tsx
- OperatorFloorPage.tsx
- ReportFilterForm.tsx
- contrast-check.py
- reservationStore.ts
- AnnouncementManager.tsx
- UserReportList.tsx
- PublicDamageReportForm.tsx
- DraftCard.tsx
- timelineDetail.ts
- schema.ts
- getReservationOptions.ts
- package.json
- zod
- ChangePasswordForm.tsx
- SportsHallReservationForm.tsx
- ReservationRecord
- ReservationHistoryTable.tsx
- content.ts
- createReservation.ts
- RoomManager.tsx
- compilerOptions
- Accessibility Code Patterns
- reservations.ts
- UniversityDashboard.tsx
- Button
- ReservationType
- toWibDateKey
- Tone & Voice
- kirei-fe
- Card.tsx
- antislop-layoutmobile
- types/reservation.ts
- vitest
- query.ts
- devDependencies
- What You Must Do When Invoked
- AnnouncementManager
- AdminDashboardSkeleton
- ReservationFormSkeleton
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- date.ts
- Group 1: Hard Gate (absolute, no exceptions)
- Comments That Add Nothing
- requireRole
- KIREI FE
- dependencies
- scripts
- Group 2: Purpose-Gate (technique allowed, purpose required)
- auth/actions.ts
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
- sks.ts
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
- ReservationTable.tsx
- facility.ts
- VehicleManagement.tsx
- getUniversityDashboard.ts
- Fakultas
- eslint.config.mjs
- historyExport.ts
- 2. Struktur dan fungsi folder
- next
- react
- Role dan Halaman

## God Nodes (most connected - your core abstractions)
1. `next` - 118 edges
2. `toWibDateKey()` - 86 edges
3. `react` - 84 edges
4. `Button` - 77 edges
5. `vitest` - 71 edges
6. `Card()` - 68 edges
7. `requireRole()` - 52 edges
8. `ReservationType` - 46 edges
9. `RoomReservationForm()` - 42 edges
10. `ReservationRequest` - 40 edges

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

## Communities (128 total, 25 thin omitted)

### Community 0 - "UserDashboard.tsx"
Cohesion: 0.09
Nodes (32): metadata, Page(), formatDateWIB(), monthName(), buildDashboardMock(), buildMonthGrid(), CalendarCell, CalendarMarker (+24 more)

### Community 1 - "ScheduleManager.tsx"
Cohesion: 0.13
Nodes (20): dayText(), IMPORT_OPTIONS, ScheduleManager(), ScheduleManagerProps, announcementsSchema, buildingsSchema, floorPlanRoomSchema, lecturerSchedulesSchema (+12 more)

### Community 2 - "ComplaintForm.tsx"
Cohesion: 0.14
Nodes (21): metadata, Page(), ReportSeedRow, ROWS, ComplaintForm(), ComplaintFormProps, DEFAULTS, CATEGORIES (+13 more)

### Community 3 - "RoomReservationForm.tsx"
Cohesion: 0.12
Nodes (40): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, CAPS_LABEL_CLASS, Card(), addDaysToKey(), crossFacultyApprover(), defaultSchedule(), isRoomBooked() (+32 more)

### Community 4 - "UserManagement.tsx"
Cohesion: 0.08
Nodes (43): MOCK_ACCOUNTS, ADMIN_GEDUNG, DOSEN, MOCK_MANAGED_USERS, OPERATORS, ORMAWA, AddUserDialogProps, DEFAULTS (+35 more)

### Community 5 - "TimeWheel.tsx"
Cohesion: 0.26
Nodes (14): clampTime(), formatPart, HourRange, joinTime(), pad(), parseTypedPart(), splitTime(), stepPart() (+6 more)

### Community 6 - "getDataMode"
Cohesion: 0.07
Nodes (42): sksRangeToTimes(), parseCsv(), DATA_MODE_COOKIE, DataMode, parseDataMode(), readBrowserDataMode(), writeBrowserDataMode(), getDataMode (+34 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (20): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+12 more)

### Community 8 - "draftStorage.ts"
Cohesion: 0.16
Nodes (18): 3. Titik Integrasi Mock untuk Prototipe, cancelDraft(), submitDraft(), DraftDetails, DraftStorage, listeners, parseDrafts(), readDrafts() (+10 more)

### Community 9 - "pengguna/page.tsx"
Cohesion: 0.21
Nodes (11): metadata, Page(), metadata, Page(), MOCK_BUILDINGS, getStaff(), parseUserTab(), STAFF_TAB (+3 more)

### Community 10 - "facilities.ts"
Cohesion: 0.13
Nodes (18): metadata, Page(), metadata, Page(), buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_ROOM_RULES, MOCK_SPORTS_HALL (+10 more)

### Community 11 - "slots.ts"
Cohesion: 0.14
Nodes (26): ROOM_CLOSE_TIME, buildHourGrid(), displayTime(), FloorTimeline(), FloorTimelineProps, LEGEND, pad(), px() (+18 more)

### Community 12 - "InternalReservationBreadcrumb.tsx"
Cohesion: 0.27
Nodes (8): Layout(), Layout(), Breadcrumb(), BreadcrumbItem, BreadcrumbProps, InternalReservationBreadcrumb(), CreateReservationBreadcrumb(), RESERVATION_TYPES

### Community 13 - "ReservationTypePicker.tsx"
Cohesion: 0.15
Nodes (12): metadata, Page(), metadata, Page(), internalReservationRoute(), createReservationFor(), ORMAWA_ROUTES, DRAWINGS (+4 more)

### Community 14 - "OperatorFloorPage.tsx"
Cohesion: 0.17
Nodes (20): MaskIcon(), MaskIconProps, formatDateLongWIB(), CreateReservationPanel(), displayTime(), AssignedFloor(), displayTime(), EmptyState() (+12 more)

### Community 15 - "ReportFilterForm.tsx"
Cohesion: 0.17
Nodes (19): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), isInPeriod(), shiftKey(), TIME_PERIOD_OPTIONS (+11 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "reservationStore.ts"
Cohesion: 0.12
Nodes (29): Simulasi alur reservasi (mock store), listing, owner, addMockReservation(), approvedRoomBookings(), assignVehicleCrew(), decideMockReservation(), EMPTY_STATE (+21 more)

### Community 18 - "AnnouncementManager.tsx"
Cohesion: 0.20
Nodes (13): ANNOUNCEMENT_CATEGORY, AnnouncementManagerProps, ANNOUNCEMENT, CreateAnnouncementDialogProps, Errors, NewAnnouncement, TODO: POST through the orval client and map 422 errors with lib/api/form-…, DEFAULT_ANNOUNCEMENT_FILTER (+5 more)

### Community 19 - "UserReportList.tsx"
Cohesion: 0.16
Nodes (19): ButtonProps, VARIANT_STYLES, formatRelativeDayWIB(), LatestReportsCardProps, ExportReportButtons(), ExportReportButtonsProps, isDefaultReportFilter(), useLiveReports() (+11 more)

### Community 20 - "PublicDamageReportForm.tsx"
Cohesion: 0.09
Nodes (25): @testing-library/react, LaporContent(), metadata, Page(), CONTACT, TODO: replace the Figma placeholders with the real Sarpras Udinus contacts…, applyFormErrors(), FormErrorEntry (+17 more)

### Community 21 - "DraftCard.tsx"
Cohesion: 0.13
Nodes (22): Countdown, DeadlineInput, getCountdown(), NOW, useCountdown(), DeadlineTimer(), DeadlineTimerProps, display() (+14 more)

### Community 22 - "timelineDetail.ts"
Cohesion: 0.10
Nodes (33): Operator, useMediaQuery(), formatTimeRangeWIB(), toWibTimeKey(), buildSksMatrix(), itemsForRoomSlot(), overlapsRange(), reservationFitsSlot() (+25 more)

### Community 23 - "schema.ts"
Cohesion: 0.09
Nodes (32): REPORT_PHOTO_MAX_SIZE_MB, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, PHOTO_TYPES, TODO: kirei-api unggah foto kerusakan via multipart/form-data dan simpan URL…, REPORT_PHOTO_ACCEPT, reportPhotoSchema (+24 more)

### Community 24 - "getReservationOptions.ts"
Cohesion: 0.11
Nodes (33): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+25 more)

### Community 25 - "package.json"
Cohesion: 0.12
Nodes (14): name, private, version, jsdom, orval, react-dom, tailwindcss, @tailwindcss/turbopack (+6 more)

### Community 26 - "zod"
Cohesion: 0.20
Nodes (17): Mode data: dengan atau tanpa data dummy, zod, LiveData, useLiveData(), useLiveState(), clearLive(), listeners, LIVE_PREFIX (+9 more)

### Community 27 - "ChangePasswordForm.tsx"
Cohesion: 0.29
Nodes (8): changePassword(), MIN_PASSWORD_LENGTH, PasswordChange, PasswordErrors, TODO: PUT /user/password through the orval client (Sanctum session) and map 422…, validatePasswordChange(), ChangePasswordForm(), Result

### Community 28 - "SportsHallReservationForm.tsx"
Cohesion: 0.17
Nodes (17): wibToIso(), toSportsHallReservationRequest(), DATE, ReservationStep, STEPS_BY_TYPE, TIME, UPLOAD, LEGEND (+9 more)

### Community 29 - "ReservationRecord"
Cohesion: 0.17
Nodes (15): CreateReservationPanelProps, ActiveReservationCard(), Field(), room, ActiveReservationList(), ActiveReservationListProps, Group(), HistoryRecords (+7 more)

### Community 30 - "ReservationHistoryTable.tsx"
Cohesion: 0.19
Nodes (12): LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, HISTORY_PARAMS, PER_PAGE_OPTIONS, Purpose() (+4 more)

### Community 31 - "content.ts"
Cohesion: 0.06
Nodes (50): framer-motion, src_app_globals, inter, metadata, poppins, metadata, Page(), AppBrand() (+42 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.15
Nodes (16): CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., TODO: kirei-api: backend wajib memverifikasi role admin_universitas /…, ReservationRequest, status(), BUS, text() (+8 more)

### Community 33 - "RoomManager.tsx"
Cohesion: 0.06
Nodes (62): Admin Gedung (role `admin_fakultas`), metadata, Page(), metadata, Page(), Toast(), ToastProps, ROOM_PHOTO_MAX_SIZE_MB (+54 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "reservations.ts"
Cohesion: 0.15
Nodes (19): BOOKER, buildFacilityRequestsMock(), buildReservationHistoryMock(), buildReservationsMock(), FACILITY_ROWS, FacilityRow, PAST_STATUSES, PAST_TRIPS (+11 more)

### Community 37 - "UniversityDashboard.tsx"
Cohesion: 0.11
Nodes (26): LineChart(), LineChartProps, LineSeries, niceMax(), TypeSummary, WeeklyCounts, ReservationTrendCard(), ReservationTrendCardProps (+18 more)

### Community 38 - "Button"
Cohesion: 0.10
Nodes (29): @hookform/resolvers, RouteError(), RouteErrorProps, Field(), FieldProps, INPUT_CLASS, SelectInput(), SelectInputProps (+21 more)

### Community 39 - "ReservationType"
Cohesion: 0.09
Nodes (32): metadata, Page(), metadata, Page(), SegmentedNav(), SegmentedNavItem, SegmentedNavProps, RESERVATION_TAB_LINKS (+24 more)

### Community 40 - "toWibDateKey"
Cohesion: 0.26
Nodes (16): toWibDateKey(), LiveUniversityDashboard(), LiveAdminDashboard(), activeBorrowers(), CANCELLED, HOLDS_SLOT, ownReservationFigures, roomRequestsInScope() (+8 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "Card.tsx"
Cohesion: 0.12
Nodes (16): react-hook-form, CardProps, DRAFT_LETTER_HOURS, ReservationSubmitDialogProps, SubmissionFields, ReservationIntent, COSTS, CrewInput (+8 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "types/reservation.ts"
Cohesion: 0.19
Nodes (11): cell(), HEADERS, lastDayKey(), STAFF, trip, vehicleHistoryCsv(), VehicleAssignment, TRIP_KIND_LABEL (+3 more)

### Community 46 - "vitest"
Cohesion: 0.22
Nodes (4): ref_node_url, vitest, LETTER_MAX_SIZE_MB, letterFileSchema

### Community 47 - "query.ts"
Cohesion: 0.17
Nodes (21): metadata, Page(), getHistoryRecords(), ACTIVE_STATUSES, buildHistoryResult(), ReservationHistoryResult, DEFAULT_HISTORY_QUERY, first() (+13 more)

### Community 48 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+7 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "AnnouncementManager"
Cohesion: 0.26
Nodes (10): metadata, Page(), metadata, Page(), metadata, Page(), buildAnnouncementsMock(), AnnouncementManager() (+2 more)

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

### Community 64 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 65 - "date.ts"
Cohesion: 0.27
Nodes (13): DateInput, formatDateTimeShortWIB(), formatDayRange(), formatDayRangeShortWIB(), formatDayRangeWIB(), formatFullDateWIB(), formatTimeSpanWIB(), formatTimeWIB() (+5 more)

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 70 - "requireRole"
Cohesion: 0.18
Nodes (21): metadata, Page(), generateMetadata(), generateStaticParams, Page(), generateStaticParams, Page(), generateMetadata() (+13 more)

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, exceljs, framer-motion, @hookform/resolvers, jspdf, jspdf-autotable, next, qrcode (+4 more)

### Community 74 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 77 - "auth/actions.ts"
Cohesion: 0.07
Nodes (58): Admin Universitas, metadata, Page(), metadata, Page(), login(), LoginResult, loginWithLaravel() (+50 more)

### Community 78 - "OrmawaShell.tsx"
Cohesion: 0.06
Nodes (43): AdminGedungLayout(), AdminUniversitasLayout(), OperatorLayout(), metadata, Page(), OrmawaLayout(), isActive(), NavItem (+35 more)

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

### Community 94 - "sks.ts"
Cohesion: 0.21
Nodes (14): buildSksSlots(), formatMinutes(), formatSksSlotRange(), pad(), TODO: kirei-api: sinkronkan daftar jeda istirahat ini dengan konfigurasi…, sessionForStart(), SKS_BREAKS, SKS_DURATION_MINUTES (+6 more)

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
Cohesion: 0.09
Nodes (39): Popover(), PopoverProps, VehicleFleetInfo(), VehicleFleetInfoProps, VehicleManagement(), VehicleManagementProps, rangesOverlap(), VehicleReservationOptions (+31 more)

### Community 116 - "ReservationTable.tsx"
Cohesion: 0.17
Nodes (20): B. Pengelola (`admin_fakultas` dan `admin_universitas`), hardCopyLabel(), isHardCopySubmitted(), HardCopyBadge(), HardCopyBadgeProps, ApproveReservationDialog(), REASON_EXAMPLE, RejectReservationDialog() (+12 more)

### Community 117 - "facility.ts"
Cohesion: 0.12
Nodes (22): SksSlot, OperatorFloorData, base, bookings, RoomReservationOptions, displayTime(), LEGEND, RoomBookingCalendar() (+14 more)

### Community 118 - "VehicleManagement.tsx"
Cohesion: 0.05
Nodes (59): Badge(), BadgeProps, BadgeTone, SIZE_STYLES, TONE_STYLES, PAGE_SIZE_OPTIONS, Pagination(), PaginationProps (+51 more)

### Community 120 - "getUniversityDashboard.ts"
Cohesion: 0.13
Nodes (20): metadata, Page(), metadata, Page(), MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE (+12 more)

### Community 121 - "Fakultas"
Cohesion: 0.33
Nodes (6): MOCK_FAKULTAS, FakultasFilterProps, FAKULTAS_PARAM, SearchParams, TODO: replace with the orval client for faculties (rarely changes, so it may be…, Fakultas

### Community 122 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 125 - "historyExport.ts"
Cohesion: 0.12
Nodes (25): exceljs, jspdf, jspdf-autotable, formatDateShortWIB(), exportReportsToExcel(), mapReportToExportRow(), TODO: kirei-api: Ekspor Excel dan PDF laporan pengguna saat ini dijalankan di…, REPORT_EXPORT_COLUMNS (+17 more)

### Community 128 - "2. Struktur dan fungsi folder"
Cohesion: 0.09
Nodes (21): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE (+13 more)

### Community 129 - "next"
Cohesion: 0.25
Nodes (5): nextConfig, next, Page(), ComingSoonProps, reservationsRoute()

### Community 132 - "react"
Cohesion: 0.11
Nodes (24): qrcode, react, Loading(), metadata, Page(), ResultDialog(), ResultDialogProps, Modal() (+16 more)

### Community 146 - "Role dan Halaman"
Cohesion: 0.12
Nodes (15): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin) (+7 more)

## Knowledge Gaps
- **746 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+741 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 908 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `UserDashboard.tsx`, `ComplaintForm.tsx`, `RoomReservationForm.tsx`, `react`, `UserManagement.tsx`, `getDataMode`, `pengguna/page.tsx`, `facilities.ts`, `InternalReservationBreadcrumb.tsx`, `ReservationTypePicker.tsx`, `OperatorFloorPage.tsx`, `AnnouncementManager.tsx`, `UserReportList.tsx`, `PublicDamageReportForm.tsx`, `DraftCard.tsx`, `getReservationOptions.ts`, `package.json`, `SportsHallReservationForm.tsx`, `ReservationRecord`, `ReservationHistoryTable.tsx`, `content.ts`, `RoomManager.tsx`, `UniversityDashboard.tsx`, `Button`, `ReservationType`, `Card.tsx`, `query.ts`, `AnnouncementManager`, `date.ts`, `requireRole`, `auth/actions.ts`, `OrmawaShell.tsx`, `ReservationTable.tsx`, `VehicleManagement.tsx`, `getUniversityDashboard.ts`, `Fakultas`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `UserDashboard.tsx`, `ScheduleManager.tsx`, `ComplaintForm.tsx`, `RoomReservationForm.tsx`, `UserManagement.tsx`, `TimeWheel.tsx`, `getDataMode`, `draftStorage.ts`, `OperatorFloorPage.tsx`, `ReportFilterForm.tsx`, `reservationStore.ts`, `AnnouncementManager.tsx`, `UserReportList.tsx`, `PublicDamageReportForm.tsx`, `DraftCard.tsx`, `timelineDetail.ts`, `package.json`, `zod`, `ChangePasswordForm.tsx`, `SportsHallReservationForm.tsx`, `ReservationHistoryTable.tsx`, `content.ts`, `RoomManager.tsx`, `UniversityDashboard.tsx`, `Button`, `toWibDateKey`, `Card.tsx`, `query.ts`, `auth/actions.ts`, `OrmawaShell.tsx`, `VehicleReservationForm.tsx`, `ReservationTable.tsx`, `VehicleManagement.tsx`, `Fakultas`, `historyExport.ts`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `2. Struktur dan fungsi folder`, `UserDashboard.tsx`, `ComplaintForm.tsx`, `ScheduleManager.tsx`, `UserManagement.tsx`, `react`, `getDataMode`, `TimeWheel.tsx`, `draftStorage.ts`, `slots.ts`, `InternalReservationBreadcrumb.tsx`, `OperatorFloorPage.tsx`, `ReportFilterForm.tsx`, `reservationStore.ts`, `AnnouncementManager.tsx`, `UserReportList.tsx`, `PublicDamageReportForm.tsx`, `DraftCard.tsx`, `timelineDetail.ts`, `schema.ts`, `getReservationOptions.ts`, `package.json`, `zod`, `ChangePasswordForm.tsx`, `SportsHallReservationForm.tsx`, `ReservationRecord`, `ReservationHistoryTable.tsx`, `content.ts`, `createReservation.ts`, `RoomManager.tsx`, `Button`, `ReservationType`, `toWibDateKey`, `types/reservation.ts`, `query.ts`, `date.ts`, `auth/actions.ts`, `OrmawaShell.tsx`, `sks.ts`, `VehicleReservationForm.tsx`, `ReservationTable.tsx`, `facility.ts`, `VehicleManagement.tsx`, `getUniversityDashboard.ts`, `Fakultas`, `historyExport.ts`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _746 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UserDashboard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0859465737514518 - nodes in this community are weakly interconnected._
- **Should `ScheduleManager.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1349206349206349 - nodes in this community are weakly interconnected._
- **Should `ComplaintForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13793103448275862 - nodes in this community are weakly interconnected._