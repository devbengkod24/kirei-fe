# Graph Report - kirei-fe  (2026-11-16)

## Corpus Check
- 406 files · ~233,676 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2023 nodes · 5278 edges · 119 communities (99 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 88 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6ebac4a6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- vitest
- FloorTimeline.tsx
- OrmawaShell.tsx
- DraftList.tsx
- RoomReservationForm.tsx
- 2. Struktur dan fungsi folder
- LecturerScheduleUpload.tsx
- PageSkeleton
- EditRoomDialog.tsx
- UserManagement.tsx
- ReservationTable.tsx
- FloorPlanEditor.tsx
- toWibDateKey
- ReservationSteps.tsx
- DraftCard.tsx
- UniversityDashboard.tsx
- contrast-check.py
- ReservationType
- ReportFilterForm.tsx
- ReservationRequest
- getUniversityDashboard.ts
- timelineDetail.ts
- Card
- schema.ts
- VehicleReservationForm.tsx
- package.json
- date.ts
- ReservationStatusBadge.tsx
- Fakultas
- AnnouncementManager.tsx
- react
- content.ts
- createReservation.ts
- SportsHallReservationForm.tsx
- compilerOptions
- Accessibility Code Patterns
- reservations.ts
- TimeWheel.tsx
- ComplaintForm.tsx
- ProfilePage.tsx
- reservationStore.ts
- Tone & Voice
- kirei-fe
- requireRole
- antislop-layoutmobile
- dependencies
- scripts
- eslint.config.mjs
- getCurrentUser
- What You Must Do When Invoked
- Button
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
- ReservationSubmitDialog.tsx
- Comments That Add Nothing
- next
- ReservationTable
- types/reservation.ts
- KIREI FE
- schedule.ts
- OperatorFloorPage.tsx
- devDependencies
- Group 2: Purpose-Gate (technique allowed, purpose required)
- RoleShell.tsx
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
- usePagination
- admin-fakultas/nav.ts
- Shell.tsx
- RouteError.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 110 edges
2. `Card()` - 62 edges
3. `react` - 61 edges
4. `toWibDateKey()` - 54 edges
5. `Button` - 53 edges
6. `requireRole()` - 52 edges
7. `vitest` - 49 edges
8. `ReservationType` - 42 edges
9. `PageSkeleton()` - 41 edges
10. `RoomReservationForm()` - 38 edges

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

## Communities (119 total, 20 thin omitted)

### Community 0 - "vitest"
Cohesion: 0.06
Nodes (60): Admin Universitas, ref_node_url, vitest, zod, metadata, Page(), login(), LoginResult (+52 more)

### Community 1 - "FloorTimeline.tsx"
Cohesion: 0.15
Nodes (25): toWibTimeKey(), ACCENT, ClipBody(), ClipBodyProps, displayTime(), FloorTimeline(), FloorTimelineProps, LEGEND (+17 more)

### Community 2 - "OrmawaShell.tsx"
Cohesion: 0.43
Nodes (5): OrmawaLayout(), DOSEN_NAV, ORMAWA_NAV, BorrowerShell(), OrmawaShell()

### Community 3 - "DraftList.tsx"
Cohesion: 0.15
Nodes (21): Loading(), cancelDraft(), DraftActionResult, DraftCardProps, clientSnapshot(), DraftList(), Outcome, serverSnapshot() (+13 more)

### Community 4 - "RoomReservationForm.tsx"
Cohesion: 0.15
Nodes (23): Admin Universitas, addDaysToKey(), crossFacultyApprover(), defaultSchedule(), isRoomBooked(), rangesOverlap(), roomBookingsOnDay(), roomStatus (+15 more)

### Community 5 - "2. Struktur dan fungsi folder"
Cohesion: 0.09
Nodes (21): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE (+13 more)

### Community 6 - "LecturerScheduleUpload.tsx"
Cohesion: 0.09
Nodes (35): metadata, Page(), parseCsv(), getMockLecturerSchedule(), schedules, setMockLecturerSchedule(), saveLecturerSchedule(), SaveScheduleResult (+27 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (21): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+13 more)

### Community 8 - "EditRoomDialog.tsx"
Cohesion: 0.07
Nodes (41): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin) (+33 more)

### Community 9 - "UserManagement.tsx"
Cohesion: 0.08
Nodes (40): PAGE_SIZE_OPTIONS, Pagination(), PaginationProps, SegmentedNav(), ADMIN_FAKULTAS, DOSEN, MOCK_MANAGED_USERS, OPERATORS (+32 more)

### Community 10 - "ReservationTable.tsx"
Cohesion: 0.15
Nodes (19): LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, TABLE, TABLE_CELL, TABLE_HEAD_CELL (+11 more)

### Community 11 - "FloorPlanEditor.tsx"
Cohesion: 0.17
Nodes (25): Drag, FloorPlanCanvas(), FloorPlanCanvasProps, CATEGORIES, FloorPlanEditor(), FloorPlanEditorProps, TODO: PUT the changed floors through the orval client, then refetch; this keeps…, RECT_FIELDS (+17 more)

### Community 12 - "toWibDateKey"
Cohesion: 0.13
Nodes (24): metadata, Page(), toWibDateKey(), buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_BUILDINGS, MOCK_ROOM_RULES, MOCK_SPORTS_HALL (+16 more)

### Community 13 - "ReservationSteps.tsx"
Cohesion: 0.33
Nodes (5): DATE, ReservationStep, STEPS_BY_TYPE, TIME, UPLOAD

### Community 14 - "DraftCard.tsx"
Cohesion: 0.18
Nodes (16): Countdown, DeadlineInput, getCountdown(), NOW, useCountdown(), DeadlineTimer(), DeadlineTimerProps, display() (+8 more)

### Community 15 - "UniversityDashboard.tsx"
Cohesion: 0.11
Nodes (26): metadata, Page(), LineChart(), LineChartProps, LineSeries, niceMax(), TypeSummary, UniversityDashboardData (+18 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "ReservationType"
Cohesion: 0.19
Nodes (12): WeeklyCounts, ReservationTrendCardProps, TrendView, VIEWS, TypeTabsProps, DESCRIPTION, ReservationTypePickerProps, ActiveReservationListProps (+4 more)

### Community 18 - "ReportFilterForm.tsx"
Cohesion: 0.19
Nodes (17): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), isInPeriod(), shiftKey(), TIME_PERIOD_OPTIONS (+9 more)

### Community 19 - "ReservationRequest"
Cohesion: 0.14
Nodes (17): UniversityReservationsProps, TodayReservationsCardProps, AdminScope, ApproveReservationDialogProps, getReservationRequests(), TODO: replace with the orval client (no-store, filtered by scope, type, and…, ReservationCandidates, RejectReservationDialogProps (+9 more)

### Community 20 - "getUniversityDashboard.ts"
Cohesion: 0.16
Nodes (16): metadata, Page(), MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE, MOCK_VEHICLES, buildReportsMock() (+8 more)

### Community 21 - "timelineDetail.ts"
Cohesion: 0.18
Nodes (17): Operator, useMediaQuery(), Box, DetailRow, isAnchorVisible(), itemKey(), placePopover(), PopoverPlacement (+9 more)

### Community 22 - "Card"
Cohesion: 0.08
Nodes (36): metadata, Page(), metadata, Page(), Card(), CONTACT, TODO: replace the Figma placeholders with the real Sarpras Udinus contacts…, buildDashboardMock() (+28 more)

### Community 23 - "schema.ts"
Cohesion: 0.08
Nodes (32): DRAFT_LETTER_HOURS, LETTER_MAX_SIZE_MB, ORGANISATION_MIN_DAYS_AHEAD, ROOM_CLOSE_TIME, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, ALWAYS (+24 more)

### Community 24 - "VehicleReservationForm.tsx"
Cohesion: 0.20
Nodes (16): InternalReservationForm(), InternalReservationFormProps, DraftListProps, BOOKING_MODES, BookingMode, BookingModeSettings, getSportsHallReservationOptions(), getVehicleReservationOptions() (+8 more)

### Community 25 - "package.json"
Cohesion: 0.13
Nodes (13): name, private, version, jsdom, orval, react-dom, tailwindcss, @tailwindcss/turbopack (+5 more)

### Community 26 - "date.ts"
Cohesion: 0.32
Nodes (12): DateInput, formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatFullDateWIB(), formatRelativeDayWIB(), formatTimeSpanWIB(), formatTimeWIB() (+4 more)

### Community 27 - "ReservationStatusBadge.tsx"
Cohesion: 0.36
Nodes (6): Badge(), BadgeProps, BadgeTone, SIZE_STYLES, TONE_STYLES, RESERVATION_STATUS

### Community 28 - "Fakultas"
Cohesion: 0.25
Nodes (9): metadata, Page(), MOCK_FAKULTAS, FakultasFilterProps, FAKULTAS_PARAM, fakultasScopeFromSearchParams(), SearchParams, TODO: replace with the orval client for faculties (rarely changes, so it may be… (+1 more)

### Community 29 - "AnnouncementManager.tsx"
Cohesion: 0.12
Nodes (24): metadata, Page(), metadata, Page(), metadata, Page(), buildAnnouncementsMock(), ANNOUNCEMENT_CATEGORY (+16 more)

### Community 30 - "react"
Cohesion: 0.19
Nodes (13): react, ResultDialog(), ResultDialogProps, ModalProps, useModalDialog(), changePassword(), MIN_PASSWORD_LENGTH, PasswordChange (+5 more)

### Community 31 - "content.ts"
Cohesion: 0.06
Nodes (51): framer-motion, src_app_globals, inter, metadata, poppins, metadata, Page(), MaskIcon() (+43 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.12
Nodes (20): 3. Titik Integrasi Mock untuk Prototipe, DraftDetails, createReservation(), CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., ReservationListing, ReservationRequest (+12 more)

### Community 33 - "SportsHallReservationForm.tsx"
Cohesion: 0.13
Nodes (33): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, wibToIso(), toSportsHallReservationRequest(), FloorPlan(), LetterField(), LetterFieldProps, LetterPanel() (+25 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "reservations.ts"
Cohesion: 0.12
Nodes (21): BOOKER, buildFacilityRequestsMock(), buildReservationHistoryMock(), FACILITY_ROWS, FacilityRow, PAST_STATUSES, pastRecords(), PURPOSES (+13 more)

### Community 37 - "TimeWheel.tsx"
Cohesion: 0.26
Nodes (14): clampTime(), formatPart, HourRange, joinTime(), pad(), parseTypedPart(), splitTime(), stepPart() (+6 more)

### Community 38 - "ComplaintForm.tsx"
Cohesion: 0.16
Nodes (14): FormErrorEntry, isLaravelValidationError(), LaravelValidationError, fieldMap, toFormErrors(), DEFAULTS, CATEGORIES, COMPLAINT_FIELD_MAP (+6 more)

### Community 39 - "ProfilePage.tsx"
Cohesion: 0.27
Nodes (8): metadata, Page(), metadata, Page(), metadata, Page(), ProfilePage(), ProfileSummary()

### Community 40 - "reservationStore.ts"
Cohesion: 0.07
Nodes (48): Simulasi alur reservasi (mock store), metadata, Page(), listing, owner, ActiveReservationList(), ACTIVE_STATUSES, buildHistoryResult() (+40 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "requireRole"
Cohesion: 0.12
Nodes (29): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+21 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, framer-motion, @hookform/resolvers, next, react, react-dom, react-hook-form, zod

### Community 46 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 47 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 48 - "getCurrentUser"
Cohesion: 0.08
Nodes (29): Ormawa dan dosen, metadata, Page(), metadata, Page(), metadata, Page(), metadata (+21 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "Button"
Cohesion: 0.14
Nodes (25): @hookform/resolvers, react-hook-form, CAPS_LABEL_CLASS, Field(), FieldProps, INPUT_CLASS, SelectInput(), SelectInputProps (+17 more)

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 53 - "admin-universitas/routes.ts"
Cohesion: 0.20
Nodes (9): Layout(), Page(), Page(), generateStaticParams, Page(), ADMIN_UNIVERSITAS_ROUTES, internalReservationRoute(), reservationsRoute() (+1 more)

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

### Community 64 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 65 - "UserReportList.tsx"
Cohesion: 0.17
Nodes (16): Popover(), PopoverProps, ROWS, LatestReportsCardProps, DEFAULT_REPORT_FILTER, filterReports(), isDefaultReportFilter(), REPORT_CATEGORY_LABEL (+8 more)

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 67 - "ReservationSubmitDialog.tsx"
Cohesion: 0.28
Nodes (7): ReservationSubmitDialogProps, SubmissionFields, ReservationIntent, SUMMARY_INPUT, SUMMARY_LABEL, SummaryRow(), SummaryWhenProps

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "next"
Cohesion: 0.16
Nodes (10): nextConfig, next, Layout(), ComingSoonProps, Breadcrumb(), BreadcrumbItem, BreadcrumbProps, SegmentedNavItem (+2 more)

### Community 70 - "ReservationTable"
Cohesion: 0.26
Nodes (13): B. Pengelola (`admin_fakultas` dan `admin_universitas`), formatDayRange(), formatDayRangeShortWIB(), formatDayRangeWIB(), lastWibDay(), ApproveReservationDialog(), rejectionText(), ReservationTable() (+5 more)

### Community 71 - "types/reservation.ts"
Cohesion: 0.20
Nodes (11): @testing-library/react, CardProps, ActiveReservationCard(), Field(), room, Group(), rejected, TRIP (+3 more)

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "schedule.ts"
Cohesion: 0.29
Nodes (9): buildClassSchedulesMock(), buildOperatorReservationsMock(), MOCK_OPERATOR_FLOOR, wibDateTime(), getOperatorFloor(), OperatorFloorData, TODO: replace with the orval client for the operator's floor, today's…, ClassSchedule (+1 more)

### Community 74 - "OperatorFloorPage.tsx"
Cohesion: 0.32
Nodes (10): metadata, Page(), formatDateLongWIB(), formatTimeRangeWIB(), CreateReservationPanel(), displayTime(), EmptyState(), FloorAvailability() (+2 more)

### Community 75 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+6 more)

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 77 - "RoleShell.tsx"
Cohesion: 0.31
Nodes (8): OperatorLayout(), AppBrand(), OperatorAccountBar(), OperatorAccount(), OperatorShell(), LogoutButton(), RoleShell(), RoleShellProps

### Community 78 - "AdminFakultasShell.tsx"
Cohesion: 0.26
Nodes (10): AdminFakultasLayout(), AdminUniversitasLayout(), Avatar(), AvatarProps, initialsOf(), AdminAvatar(), AdminFakultasShell(), AdminAvatar() (+2 more)

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
Cohesion: 0.26
Nodes (9): CreateReservationPanelProps, displayTime(), createOperatorReservation(), CreateOperatorReservationResult, TODO: POST with the orval client (room_id, booker_name, purpose, starts_at,…, OPERATOR_RESERVATION_FIELD_MAP, operatorReservationSchema, OperatorReservationValues (+1 more)

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

### Community 115 - "usePagination"
Cohesion: 0.53
Nodes (3): usePagination(), Page, paginate()

### Community 116 - "admin-fakultas/nav.ts"
Cohesion: 0.28
Nodes (4): ADMIN_FAKULTAS_NAV, ADMIN_FAKULTAS_ROUTES, ADMIN_UNIVERSITAS_NAV, NavLinkConfig

### Community 117 - "Shell.tsx"
Cohesion: 0.53
Nodes (5): isActive(), NavItem, NavList(), Shell(), ShellProps

## Knowledge Gaps
- **663 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+658 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 787 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `vitest`, `DraftList.tsx`, `RoomReservationForm.tsx`, `LecturerScheduleUpload.tsx`, `EditRoomDialog.tsx`, `UserManagement.tsx`, `ReservationTable.tsx`, `toWibDateKey`, `ReservationSteps.tsx`, `DraftCard.tsx`, `UniversityDashboard.tsx`, `ReservationType`, `ReservationRequest`, `getUniversityDashboard.ts`, `Card`, `package.json`, `Fakultas`, `AnnouncementManager.tsx`, `react`, `content.ts`, `SportsHallReservationForm.tsx`, `reservations.ts`, `ProfilePage.tsx`, `reservationStore.ts`, `requireRole`, `getCurrentUser`, `Button`, `admin-universitas/routes.ts`, `UserReportList.tsx`, `ReservationSubmitDialog.tsx`, `types/reservation.ts`, `schedule.ts`, `OperatorFloorPage.tsx`, `admin-fakultas/nav.ts`, `Shell.tsx`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `vitest`, `FloorTimeline.tsx`, `OrmawaShell.tsx`, `DraftList.tsx`, `RoomReservationForm.tsx`, `LecturerScheduleUpload.tsx`, `EditRoomDialog.tsx`, `UserManagement.tsx`, `ReservationTable.tsx`, `FloorPlanEditor.tsx`, `DraftCard.tsx`, `ReservationType`, `ReportFilterForm.tsx`, `timelineDetail.ts`, `Card`, `VehicleReservationForm.tsx`, `package.json`, `Fakultas`, `AnnouncementManager.tsx`, `content.ts`, `createReservation.ts`, `SportsHallReservationForm.tsx`, `TimeWheel.tsx`, `ComplaintForm.tsx`, `reservationStore.ts`, `Button`, `UserReportList.tsx`, `OperatorFloorPage.tsx`, `RoleShell.tsx`, `AdminFakultasShell.tsx`, `CreateReservationPanel.tsx`, `usePagination`, `Shell.tsx`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `FloorTimeline.tsx`, `DraftList.tsx`, `RoomReservationForm.tsx`, `2. Struktur dan fungsi folder`, `LecturerScheduleUpload.tsx`, `EditRoomDialog.tsx`, `UserManagement.tsx`, `FloorPlanEditor.tsx`, `toWibDateKey`, `DraftCard.tsx`, `ReportFilterForm.tsx`, `ReservationRequest`, `getUniversityDashboard.ts`, `timelineDetail.ts`, `Card`, `schema.ts`, `VehicleReservationForm.tsx`, `package.json`, `date.ts`, `Fakultas`, `AnnouncementManager.tsx`, `react`, `content.ts`, `createReservation.ts`, `SportsHallReservationForm.tsx`, `TimeWheel.tsx`, `ComplaintForm.tsx`, `reservationStore.ts`, `getCurrentUser`, `UserReportList.tsx`, `next`, `ReservationTable`, `types/reservation.ts`, `usePagination`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _663 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `vitest` be split into smaller, more focused modules?**
  _Cohesion score 0.0644384221619994 - nodes in this community are weakly interconnected._
- **Should `FloorTimeline.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1477832512315271 - nodes in this community are weakly interconnected._
- **Should `DraftList.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14532019704433496 - nodes in this community are weakly interconnected._