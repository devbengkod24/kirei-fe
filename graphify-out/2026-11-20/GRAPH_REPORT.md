# Graph Report - kirei-fe  (2026-11-20)

## Corpus Check
- 432 files · ~248,569 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2191 nodes · 6055 edges · 122 communities (101 shown, 21 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b42333ee`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth/actions.ts
- FloorTimeline.tsx
- reservationStore.ts
- Card
- RoomReservationForm.tsx
- TimeWheel.tsx
- LecturerScheduleUpload.tsx
- PageSkeleton
- RoomManager.tsx
- UserManagement.tsx
- ReservationHistoryTable.tsx
- Role dan Halaman
- VehicleCrewPanel.tsx
- admin-universitas/routes.ts
- OperatorFloorPage.tsx
- UniversityDashboard.tsx
- contrast-check.py
- useLiveData.ts
- vitest
- ReservationTable.tsx
- toWibDateKey
- DraftCard.tsx
- UserDashboard.tsx
- schema.ts
- schedule.ts
- package.json
- date.ts
- dataMode.ts
- Fakultas
- Button.tsx
- 2. Struktur dan fungsi folder
- content.ts
- createReservation.ts
- getReservationOptions.ts
- compilerOptions
- Accessibility Code Patterns
- reservations.ts
- ReservationLogCalendar.tsx
- react
- getUniversityDashboard.ts
- useLiveFacilities.ts
- Tone & Voice
- kirei-fe
- [tipe]/persetujuan/page.tsx
- FloorPlanEditor.tsx
- liveDashboard.ts
- DraftReservationsPage
- query.ts
- devDependencies
- What You Must Do When Invoked
- timelineDetail.ts
- AdminDashboardSkeleton
- ReservationFormSkeleton
- ReservationType
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- LandingPage.tsx
- Group 1: Hard Gate (absolute, no exceptions)
- SportsHallReservationForm.tsx
- Comments That Add Nothing
- types/reservation.ts
- reservasi-internal/[tipe]/page.tsx
- LandingHeader.tsx
- KIREI FE
- dependencies
- scripts
- ReservationHistoryPage.tsx
- Group 2: Purpose-Gate (technique allowed, purpose required)
- next
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
- reservationTypes.ts
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
- requireRole
- RouteError.tsx
- FaqAccordion.tsx
- liveSchemas.ts
- 2. Alur Tindakan Pengguna (User Flow)

## God Nodes (most connected - your core abstractions)
1. `next` - 112 edges
2. `toWibDateKey()` - 74 edges
3. `react` - 72 edges
4. `Card()` - 65 edges
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
- `4. Perbedaan dengan Vault dan Keputusan` --references--> `VehicleReservationForm()`  [INFERRED]
  docs/flow-reservasi.md → src/shared/reservation-form/VehicleReservationForm.tsx
- `Client API (orval)` --references--> `applyFormErrors()`  [INFERRED]
  docs/architecture.md → src/lib/api/form-errors.ts
- `Admin Universitas` --references--> `requireRole()`  [INFERRED]
  docs/architecture.md → src/lib/auth/requireRole.ts

## Import Cycles
- None detected.

## Communities (122 total, 21 thin omitted)

### Community 0 - "auth/actions.ts"
Cohesion: 0.05
Nodes (75): Admin Universitas, metadata, Page(), metadata, Page(), metadata, Page(), metadata (+67 more)

### Community 1 - "FloorTimeline.tsx"
Cohesion: 0.13
Nodes (28): toWibTimeKey(), ACCENT, ClipBody(), ClipBodyProps, displayTime(), FloorTimeline(), FloorTimelineProps, LEGEND (+20 more)

### Community 2 - "reservationStore.ts"
Cohesion: 0.12
Nodes (28): Simulasi alur reservasi (mock store), listing, owner, addMockReservation(), approvedRoomBookings(), assignVehicleCrew(), decideMockReservation(), EMPTY_STATE (+20 more)

### Community 3 - "Card"
Cohesion: 0.17
Nodes (27): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, metadata, Page(), Card(), CardProps, InternalReservationForm(), FloorPlan() (+19 more)

### Community 4 - "RoomReservationForm.tsx"
Cohesion: 0.15
Nodes (24): addDaysToKey(), crossFacultyApprover(), defaultSchedule(), isRoomBooked(), roomBookingsOnDay(), roomStatus, RoomStatusInput, base (+16 more)

### Community 5 - "TimeWheel.tsx"
Cohesion: 0.26
Nodes (14): clampTime(), formatPart, HourRange, joinTime(), pad(), parseTypedPart(), splitTime(), stepPart() (+6 more)

### Community 6 - "LecturerScheduleUpload.tsx"
Cohesion: 0.13
Nodes (22): parseCsv(), dayText(), LecturerScheduleUpload(), Picked, timeText(), DAY_LABEL, DAYS, lecturerScheduleInputSchema (+14 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (20): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+12 more)

### Community 8 - "RoomManager.tsx"
Cohesion: 0.08
Nodes (47): Admin Gedung (role `admin_fakultas`), metadata, Page(), metadata, Page(), Field(), SelectInput(), ROOM_PHOTO_MAX_SIZE_MB (+39 more)

### Community 9 - "UserManagement.tsx"
Cohesion: 0.08
Nodes (49): @hookform/resolvers, metadata, Page(), ADMIN_GEDUNG, DOSEN, MOCK_MANAGED_USERS, OPERATORS, ORMAWA (+41 more)

### Community 10 - "ReservationHistoryTable.tsx"
Cohesion: 0.20
Nodes (14): LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, TABLE, TABLE_CELL, TABLE_HEAD_CELL (+6 more)

### Community 11 - "Role dan Halaman"
Cohesion: 0.25
Nodes (8): Admin Universitas, Ormawa dan dosen, Override slot oleh Admin Universitas, Perbedaan dengan Figma V3, Publik dan autentikasi, Ringkasan, Role dan Halaman, TypeTabs()

### Community 12 - "VehicleCrewPanel.tsx"
Cohesion: 0.10
Nodes (21): MOCK_STAFF, ReservationTableProps, COSTS, CrewInput, crewSchema, CrewValues, money, TODO: PUT the drivers and costs through the orval client. Until then the demo… (+13 more)

### Community 13 - "admin-universitas/routes.ts"
Cohesion: 0.16
Nodes (12): @testing-library/react, Layout(), metadata, Page(), Layout(), Breadcrumb(), BreadcrumbItem, BreadcrumbProps (+4 more)

### Community 14 - "OperatorFloorPage.tsx"
Cohesion: 0.16
Nodes (22): MaskIcon(), MaskIconProps, formatDateLongWIB(), CreateReservationPanel(), CreateReservationPanelProps, displayTime(), AssignedFloor(), displayTime() (+14 more)

### Community 15 - "UniversityDashboard.tsx"
Cohesion: 0.13
Nodes (24): LineChart(), LineChartProps, LineSeries, niceMax(), TypeSummary, UniversityDashboardData, ReservationTrendCard(), TypeSummaryCard() (+16 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "useLiveData.ts"
Cohesion: 0.15
Nodes (22): Mode data: dengan atau tanpa data dummy, LiveData, useLiveData(), useLiveState(), LaravelValidationError, readBrowserDataMode(), clearLive(), listeners (+14 more)

### Community 18 - "vitest"
Cohesion: 0.05
Nodes (68): ref_node_url, vitest, metadata, Page(), metadata, Page(), metadata, Page() (+60 more)

### Community 19 - "ReservationTable.tsx"
Cohesion: 0.12
Nodes (30): B. Pengelola (`admin_fakultas` dan `admin_universitas`), Button, ApproveReservationDialog(), ApproveReservationDialogProps, RejectReservationDialog(), RejectReservationDialogProps, HISTORY_STATUSES, requestsForTab() (+22 more)

### Community 20 - "toWibDateKey"
Cohesion: 0.20
Nodes (15): metadata, Page(), toWibDateKey(), buildAnnouncementsMock(), buildDashboardMock(), buildClassSchedulesMock(), buildOperatorReservationsMock(), MOCK_OPERATOR_FLOOR (+7 more)

### Community 21 - "DraftCard.tsx"
Cohesion: 0.08
Nodes (41): zod, Loading(), Countdown, DeadlineInput, getCountdown(), NOW, useCountdown(), formatTimeRangeWIB() (+33 more)

### Community 22 - "UserDashboard.tsx"
Cohesion: 0.23
Nodes (11): DashboardHero(), DashboardHeroProps, LatestAnnouncementsCard(), ReservationTotal(), ReservationTotalProps, TodayReservationCard(), TodayReservationCardProps, UserDashboard() (+3 more)

### Community 23 - "schema.ts"
Cohesion: 0.08
Nodes (32): LETTER_MAX_SIZE_MB, ORGANISATION_MIN_DAYS_AHEAD, ROOM_CLOSE_TIME, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, BOOKING_MODES, BookingModeSettings (+24 more)

### Community 24 - "schedule.ts"
Cohesion: 0.18
Nodes (16): metadata, Page(), getMockLecturerSchedule(), getMockLecturerSchedules(), schedules, setMockLecturerSchedule(), saveLecturerSchedule(), SaveScheduleResult (+8 more)

### Community 25 - "package.json"
Cohesion: 0.11
Nodes (16): eslintConfig, name, private, version, eslint, eslint-config-next, jsdom, orval (+8 more)

### Community 26 - "date.ts"
Cohesion: 0.30
Nodes (13): DateInput, formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatDayRange(), formatDayRangeShortWIB(), formatDayRangeWIB(), formatFullDateWIB() (+5 more)

### Community 27 - "dataMode.ts"
Cohesion: 0.35
Nodes (8): DataMode, writeBrowserDataMode(), DataModeSwitch(), DataModeSwitchProps, MODES, ResetMockReservationsButton(), ResetMockReservationsButtonProps, TEXT

### Community 28 - "Fakultas"
Cohesion: 0.33
Nodes (6): MOCK_FAKULTAS, FakultasFilterProps, FAKULTAS_PARAM, SearchParams, TODO: replace with the orval client for faculties (rarely changes, so it may be…, Fakultas

### Community 29 - "Button.tsx"
Cohesion: 0.10
Nodes (22): metadata, Page(), CAPS_LABEL_CLASS, FieldProps, INPUT_CLASS, SelectInputProps, ButtonProps, VARIANT_STYLES (+14 more)

### Community 30 - "2. Struktur dan fungsi folder"
Cohesion: 0.09
Nodes (21): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE (+13 more)

### Community 31 - "content.ts"
Cohesion: 0.13
Nodes (19): BOOKING_WINDOW_RULE, CAMPUS_ADDRESS, FACILITY_ITEMS, FACILITY_SLIDES, FacilitySlide, FaqItem, IconItem, LETTER_RULE (+11 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.10
Nodes (26): react-hook-form, DRAFT_LETTER_HOURS, createReservation(), CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., ReservationRequest, status() (+18 more)

### Community 33 - "getReservationOptions.ts"
Cohesion: 0.22
Nodes (11): buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_ROOM_RULES, MOCK_SPORTS_HALL, MOCK_VEHICLES, SAMPLE_CAPACITY, TODO: replace with the orval clients for buildings/floor plans, room…, TODO: replace with the orval clients for the GOR and its bookings (no-store). (+3 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "reservations.ts"
Cohesion: 0.14
Nodes (19): BOOKER, buildFacilityRequestsMock(), buildReservationHistoryMock(), FACILITY_ROWS, FacilityRow, PAST_STATUSES, PAST_TRIPS, pastRecords() (+11 more)

### Community 37 - "ReservationLogCalendar.tsx"
Cohesion: 0.23
Nodes (13): monthName(), buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef (+5 more)

### Community 38 - "react"
Cohesion: 0.16
Nodes (15): react, ResultDialog(), ResultDialogProps, Modal(), ModalProps, WIDTH, useModalDialog(), ComplaintFormProps (+7 more)

### Community 39 - "getUniversityDashboard.ts"
Cohesion: 0.11
Nodes (27): metadata, Page(), metadata, Page(), DATA_MODE_COOKIE, parseDataMode(), getDataMode, MOCK_UNIVERSITY_USER_ACTIVITY (+19 more)

### Community 40 - "useLiveFacilities.ts"
Cohesion: 0.14
Nodes (19): wibToIso(), InternalReservationFormProps, DraftListProps, useLiveLectureBookings(), useLiveLecturerSchedules(), BookingMode, ReservationListing, RoomReservationOptions (+11 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "[tipe]/persetujuan/page.tsx"
Cohesion: 0.29
Nodes (10): metadata, Page(), generateMetadata(), generateStaticParams, Page(), generateStaticParams, Page(), UniversityReservations() (+2 more)

### Community 44 - "FloorPlanEditor.tsx"
Cohesion: 0.06
Nodes (55): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+47 more)

### Community 45 - "liveDashboard.ts"
Cohesion: 0.19
Nodes (19): LiveUniversityDashboard(), LiveAdminDashboard(), useLiveReports(), activeBorrowers(), CANCELLED, HOLDS_SLOT, ownReservationFigures, roomRequestsInScope() (+11 more)

### Community 46 - "DraftReservationsPage"
Cohesion: 0.67
Nodes (3): metadata, Page(), DraftReservationsPage()

### Community 47 - "query.ts"
Cohesion: 0.18
Nodes (18): metadata, Page(), ACTIVE_STATUSES, buildHistoryResult(), ReservationHistoryResult, DEFAULT_HISTORY_QUERY, first(), groupActiveReservations() (+10 more)

### Community 48 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+6 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "timelineDetail.ts"
Cohesion: 0.18
Nodes (16): Operator, useMediaQuery(), Box, DetailRow, isAnchorVisible(), placePopover(), PopoverPlacement, RESERVATION (+8 more)

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 53 - "ReservationType"
Cohesion: 0.14
Nodes (13): metadata, Page(), TODO: load drivers from Kelola Staf (orval) once it exists; sample drivers…, UniversityReservationsProps, createReservationFor(), ORMAWA_ROUTES, DRAWINGS, ReservationTypeIllustration() (+5 more)

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

### Community 64 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 65 - "LandingPage.tsx"
Cohesion: 0.23
Nodes (12): framer-motion, metadata, Page(), FaqSection(), Divider(), LandingPage(), RulesSection(), SectionHeading() (+4 more)

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 67 - "SportsHallReservationForm.tsx"
Cohesion: 0.14
Nodes (19): rangesOverlap(), DATE, ReservationStep, STEPS_BY_TYPE, TIME, UPLOAD, LEGEND, SLOT_LABEL (+11 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "types/reservation.ts"
Cohesion: 0.23
Nodes (12): ActiveReservationCard(), Field(), room, ActiveReservationList(), ActiveReservationListProps, Group(), rejected, ReservationStatusBadge() (+4 more)

### Community 70 - "reservasi-internal/[tipe]/page.tsx"
Cohesion: 0.23
Nodes (11): generateMetadata(), generateStaticParams, Page(), Page(), generateStaticParams, Page(), generateMetadata(), reservationsRoute() (+3 more)

### Community 71 - "LandingHeader.tsx"
Cohesion: 0.29
Nodes (10): HeroSection(), LandingHeader(), SECTION_LIST, ArrowRightIcon(), CloseIcon(), IconProps, MenuIcon(), Stroke() (+2 more)

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, framer-motion, @hookform/resolvers, next, react, react-dom, react-hook-form, zod

### Community 74 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 75 - "ReservationHistoryPage.tsx"
Cohesion: 0.20
Nodes (11): SegmentedNav(), SegmentedNavItem, SegmentedNavProps, getHistoryRecords(), HistoryRecords, TODO: send as the API filter once the orval client exists ({ mine } -> own…, TODO: replace with the orval client for the reservation list endpoint (no-…, HistoryView (+3 more)

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 77 - "next"
Cohesion: 0.21
Nodes (8): nextConfig, next, metadata, Page(), ComingSoonProps, FloorPlanEditor(), getBuildings(), TODO: replace with the orval client for buildings and floor plans (no-store,…

### Community 78 - "OrmawaShell.tsx"
Cohesion: 0.06
Nodes (46): AdminGedungLayout(), AdminUniversitasLayout(), src_app_globals, inter, metadata, poppins, OperatorLayout(), metadata (+38 more)

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

### Community 94 - "reservationTypes.ts"
Cohesion: 0.23
Nodes (8): WeeklyCounts, ReservationTrendCardProps, TrendView, VIEWS, TypeTabsProps, RESERVATION_TYPE_LABEL, RESERVATION_UNIT_LABEL, RESERVATION_TYPES

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
Nodes (26): 3. Titik Integrasi Mock untuk Prototipe, Popover(), PopoverProps, VehicleFleetInfo(), VehicleFleetInfoProps, VehicleReservationOptions, MAX_DESTINATIONS, VEHICLE_RESERVATION_FIELD_MAP (+18 more)

### Community 116 - "requireRole"
Cohesion: 0.38
Nodes (8): metadata, Page(), metadata, Page(), requireRole(), RESERVATION_TAB_LINKS, getReservationCandidates(), ReservationManagement()

### Community 119 - "FaqAccordion.tsx"
Cohesion: 0.67
Nodes (3): FAQ_ITEMS, FaqAccordion(), PlusIcon()

### Community 123 - "liveSchemas.ts"
Cohesion: 0.19
Nodes (11): metadata, Page(), LiveUserDashboard(), UserDashboardProps, announcementsSchema, buildingsSchema, floorPlanRoomSchema, lecturerSchedulesSchema (+3 more)

### Community 125 - "2. Alur Tindakan Pengguna (User Flow)"
Cohesion: 0.20
Nodes (8): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin)

## Knowledge Gaps
- **699 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+694 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 834 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `auth/actions.ts`, `Card`, `RoomReservationForm.tsx`, `RoomManager.tsx`, `UserManagement.tsx`, `ReservationHistoryTable.tsx`, `admin-universitas/routes.ts`, `OperatorFloorPage.tsx`, `UniversityDashboard.tsx`, `vitest`, `ReservationTable.tsx`, `toWibDateKey`, `DraftCard.tsx`, `UserDashboard.tsx`, `schedule.ts`, `package.json`, `dataMode.ts`, `Fakultas`, `Button.tsx`, `content.ts`, `createReservation.ts`, `getReservationOptions.ts`, `ReservationLogCalendar.tsx`, `react`, `getUniversityDashboard.ts`, `[tipe]/persetujuan/page.tsx`, `DraftReservationsPage`, `query.ts`, `ReservationType`, `LandingPage.tsx`, `SportsHallReservationForm.tsx`, `types/reservation.ts`, `reservasi-internal/[tipe]/page.tsx`, `LandingHeader.tsx`, `ReservationHistoryPage.tsx`, `OrmawaShell.tsx`, `reservationTypes.ts`, `requireRole`, `liveSchemas.ts`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `auth/actions.ts`, `FloorTimeline.tsx`, `reservationStore.ts`, `Card`, `RoomReservationForm.tsx`, `TimeWheel.tsx`, `LecturerScheduleUpload.tsx`, `RoomManager.tsx`, `UserManagement.tsx`, `ReservationHistoryTable.tsx`, `VehicleCrewPanel.tsx`, `OperatorFloorPage.tsx`, `useLiveData.ts`, `vitest`, `ReservationTable.tsx`, `DraftCard.tsx`, `package.json`, `dataMode.ts`, `Fakultas`, `Button.tsx`, `content.ts`, `createReservation.ts`, `ReservationLogCalendar.tsx`, `getUniversityDashboard.ts`, `useLiveFacilities.ts`, `FloorPlanEditor.tsx`, `liveDashboard.ts`, `query.ts`, `timelineDetail.ts`, `LandingPage.tsx`, `SportsHallReservationForm.tsx`, `LandingHeader.tsx`, `OrmawaShell.tsx`, `reservationTypes.ts`, `VehicleReservationForm.tsx`, `FaqAccordion.tsx`, `liveSchemas.ts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `auth/actions.ts`, `FloorTimeline.tsx`, `reservationStore.ts`, `RoomReservationForm.tsx`, `TimeWheel.tsx`, `LecturerScheduleUpload.tsx`, `RoomManager.tsx`, `UserManagement.tsx`, `VehicleCrewPanel.tsx`, `admin-universitas/routes.ts`, `useLiveData.ts`, `ReservationTable.tsx`, `DraftCard.tsx`, `schema.ts`, `package.json`, `date.ts`, `Fakultas`, `Button.tsx`, `2. Struktur dan fungsi folder`, `createReservation.ts`, `ReservationLogCalendar.tsx`, `react`, `getUniversityDashboard.ts`, `useLiveFacilities.ts`, `FloorPlanEditor.tsx`, `liveDashboard.ts`, `query.ts`, `timelineDetail.ts`, `SportsHallReservationForm.tsx`, `types/reservation.ts`, `OrmawaShell.tsx`, `VehicleReservationForm.tsx`, `LandingPage.test.tsx`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _699 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth/actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.050970873786407765 - nodes in this community are weakly interconnected._
- **Should `FloorTimeline.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13306451612903225 - nodes in this community are weakly interconnected._
- **Should `reservationStore.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11932773109243698 - nodes in this community are weakly interconnected._