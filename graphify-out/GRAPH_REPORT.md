# Graph Report - kirei-fe  (2026-11-27)

## Corpus Check
- 476 files · ~263,608 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2412 nodes · 6898 edges · 148 communities (123 shown, 25 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c22907c1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- mocks/user.ts
- ScheduleManager.tsx
- reservationStore.ts
- RoomReservationForm.tsx
- getOperatorFloor.ts
- TimeWheel.tsx
- scheduleCsv.ts
- PageSkeleton
- report.ts
- Button
- historyExport.ts
- OperatorFloorPage.tsx
- Staff
- ReservationTypePicker.tsx
- CreateReservationPanel.tsx
- Button.tsx
- contrast-check.py
- zod
- filterAnnouncements.ts
- VehicleManagement.tsx
- timelineDetail.ts
- DraftList.tsx
- Card
- schema.ts
- pengguna/page.tsx
- package.json
- date.ts
- react
- UniversityDashboard.tsx
- ReservationRecord
- Arsitektur KIREI FE
- content.ts
- createReservation.ts
- RoomManager.tsx
- compilerOptions
- Accessibility Code Patterns
- getUniversityDashboard.ts
- ReservationLogCalendar.tsx
- Field.tsx
- types/reservation.ts
- getReservationOptions.ts
- Tone & Voice
- kirei-fe
- getCurrentUser
- antislop-layoutmobile
- liveDashboard.ts
- reservations.ts
- query.ts
- devDependencies
- What You Must Do When Invoked
- UserReportList.tsx
- AdminDashboardSkeleton
- ReservationFormSkeleton
- DraftCard.tsx
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- auth/actions.ts
- Group 1: Hard Gate (absolute, no exceptions)
- reservationTypes.ts
- Comments That Add Nothing
- Admin Universitas
- requireRole
- LoginPage.tsx
- KIREI FE
- dependencies
- scripts
- getDataMode
- Group 2: Purpose-Gate (technique allowed, purpose required)
- laravel.ts
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
- SportsHallReservationForm.tsx
- staffSchema.ts
- SksScheduleMatrix.tsx
- ContactPage.tsx
- Fakultas
- eslint.config.mjs
- vehicleSchema.ts
- VehicleCrewPanel.tsx
- ReservationHistoryTable.tsx
- rooms.ts
- toWibDateKey
- mutator.test.ts
- next
- requireRole.ts
- RouteError.tsx
- vitest
- RoleShell.tsx
- FaqPage.tsx
- ReservationTrendCard.tsx
- getReservationCandidates
- OrmawaShell.tsx
- ActiveReservationCard.tsx
- OperatorShell.tsx
- reservationTime.ts
- Shell.tsx
- 2. Alur Tindakan Pengguna (User Flow)
- DraftsSkeleton

## God Nodes (most connected - your core abstractions)
1. `next` - 118 edges
2. `toWibDateKey()` - 86 edges
3. `react` - 83 edges
4. `Button` - 79 edges
5. `vitest` - 69 edges
6. `Card()` - 68 edges
7. `requireRole()` - 52 edges
8. `ReservationType` - 46 edges
9. `RoomReservationForm()` - 41 edges
10. `ReservationRequest` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Di root repo` --references--> `MaskIcon()`  [INFERRED]
  docs/architecture.md → src/components/ui/MaskIcon.tsx
- `6. Urutan pembangunan yang disarankan` --references--> `getCurrentUser()`  [INFERRED]
  docs/architecture.md → src/lib/auth/getCurrentUser.ts
- `Mode data: dengan atau tanpa data dummy` --references--> `useLiveState()`  [INFERRED]
  docs/architecture.md → src/hooks/useLiveData.ts
- `Client API (orval)` --references--> `applyFormErrors()`  [INFERRED]
  docs/architecture.md → src/lib/api/form-errors.ts
- `Admin Universitas` --references--> `login()`  [INFERRED]
  docs/architecture.md → src/lib/auth/actions.ts

## Import Cycles
- None detected.

## Communities (148 total, 25 thin omitted)

### Community 0 - "mocks/user.ts"
Cohesion: 0.26
Nodes (7): cookieStore, SESSION_COOKIE, findMockAccount(), MOCK_ADMIN_GEDUNG, MOCK_ADMIN_UNIVERSITAS, MOCK_CURRENT_USER, MOCK_PASSWORD

### Community 1 - "ScheduleManager.tsx"
Cohesion: 0.21
Nodes (15): formatDateLongWIB(), dayText(), ScheduleManager(), announcementsSchema, buildingsSchema, floorPlanRoomSchema, lecturerSchedulesSchema, LIVE_NAMES (+7 more)

### Community 2 - "reservationStore.ts"
Cohesion: 0.13
Nodes (24): listing, owner, addMockReservation(), decideMockReservation(), EMPTY_STATE, listeners, mergeOwnHistory(), MOCK_RESERVATIONS_KEY (+16 more)

### Community 3 - "RoomReservationForm.tsx"
Cohesion: 0.13
Nodes (35): 1. Tabel Pemetaan Halaman dan Komponen Utama, 4. Perbedaan dengan Vault dan Keputusan, A. Pemohon (`organisasi` dan `dosen`), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin), Komponen `shared/` dan pemakainya, CAPS_LABEL_CLASS, DRAFT_LETTER_HOURS, ROOM_CATEGORY_LABEL (+27 more)

### Community 4 - "getOperatorFloor.ts"
Cohesion: 0.28
Nodes (10): metadata, Page(), buildClassSchedulesMock(), buildOperatorReservationsMock(), MOCK_OPERATOR_FLOOR, getOperatorFloor(), OperatorFloorData, TODO: replace with the orval client for the operator's floor, today's… (+2 more)

### Community 5 - "TimeWheel.tsx"
Cohesion: 0.26
Nodes (14): clampTime(), formatPart, HourRange, joinTime(), pad(), parseTypedPart(), splitTime(), stepPart() (+6 more)

### Community 6 - "scheduleCsv.ts"
Cohesion: 0.09
Nodes (32): sksRangeToTimes(), parseCsv(), entry(), getMockLecturerSchedule(), schedules, setMockLecturerSchedule(), SaveScheduleResult, facultyRoomCodes() (+24 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (20): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+12 more)

### Community 8 - "report.ts"
Cohesion: 0.15
Nodes (21): @testing-library/react, ReportSeedRow, ROWS, LatestReportsCardProps, ComplaintFormProps, ExportReportButtons(), ExportReportButtonsProps, REPORT_CATEGORY_LABEL (+13 more)

### Community 9 - "Button"
Cohesion: 0.08
Nodes (49): Button, useLiveState(), MOCK_ACCOUNTS, ADMIN_GEDUNG, DOSEN, MOCK_MANAGED_USERS, OPERATORS, ORMAWA (+41 more)

### Community 10 - "historyExport.ts"
Cohesion: 0.15
Nodes (14): exceljs, jspdf, jspdf-autotable, ExportHistoryButtonsProps, buildHistoryExportFilename(), downloadBlob(), ExportColumn, ExportRow (+6 more)

### Community 11 - "OperatorFloorPage.tsx"
Cohesion: 0.16
Nodes (24): formatTimeRangeWIB(), AssignedFloor(), displayTime(), EmptyState(), FloorAvailability(), OperatorFloorPage(), toStoredOperatorBooking(), CLOSE_TIME (+16 more)

### Community 12 - "Staff"
Cohesion: 0.20
Nodes (11): MOCK_STAFF, TODO: replace with the orval client for staff (no-store)., cell(), HEADERS, lastDayKey(), STAFF, trip, vehicleHistoryCsv() (+3 more)

### Community 13 - "ReservationTypePicker.tsx"
Cohesion: 0.16
Nodes (11): metadata, Page(), metadata, Page(), internalReservationRoute(), createReservationFor(), DRAWINGS, ReservationTypeIllustration() (+3 more)

### Community 14 - "CreateReservationPanel.tsx"
Cohesion: 0.10
Nodes (26): applyFormErrors(), FormErrorEntry, isLaravelValidationError(), LaravelValidationError, fieldMap, toFormErrors(), CreateReservationPanel(), displayTime() (+18 more)

### Community 15 - "Button.tsx"
Cohesion: 0.16
Nodes (18): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), ButtonProps, VARIANT_STYLES, TIME_PERIOD_OPTIONS (+10 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "zod"
Cohesion: 0.05
Nodes (57): 2. Struktur dan fungsi folder, Cara memilih lokasi sebuah file, Contoh: Admin Fakultas (Figma V3, section "Admin Fakultas"), Contoh: dashboard ormawa dan dosen, Di dalam `src/`, Di root repo, Mode data: dengan atau tanpa data dummy, Simulasi alur reservasi (mock store) (+49 more)

### Community 18 - "filterAnnouncements.ts"
Cohesion: 0.20
Nodes (10): isInPeriod(), shiftKey(), TimePeriod, AnnouncementFilterFormProps, AnnouncementFilter, DEFAULT_ANNOUNCEMENT_FILTER, DEFAULT_REPORT_FILTER, ReportFilter (+2 more)

### Community 19 - "VehicleManagement.tsx"
Cohesion: 0.12
Nodes (26): metadata, Page(), Badge(), BadgeProps, BadgeTone, SIZE_STYLES, TONE_STYLES, PAGE_SIZE_OPTIONS (+18 more)

### Community 20 - "timelineDetail.ts"
Cohesion: 0.19
Nodes (15): Operator, react-dom, useMediaQuery(), Box, DetailRow, isAnchorVisible(), itemKey(), placePopover() (+7 more)

### Community 21 - "DraftList.tsx"
Cohesion: 0.15
Nodes (23): cancelDraft(), DraftActionResult, submitDraft(), DraftCardProps, clientSnapshot(), DraftList(), DraftListProps, Outcome (+15 more)

### Community 22 - "Card"
Cohesion: 0.15
Nodes (19): metadata, Page(), Card(), CardProps, DashboardHero(), DashboardHeroProps, LatestAnnouncementsCard(), LatestAnnouncementsCardProps (+11 more)

### Community 23 - "schema.ts"
Cohesion: 0.08
Nodes (33): LETTER_MAX_SIZE_MB, ORGANISATION_MIN_DAYS_AHEAD, ROOM_CLOSE_TIME, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, toIsoRange(), BOOKING_MODES (+25 more)

### Community 24 - "pengguna/page.tsx"
Cohesion: 0.29
Nodes (8): metadata, Page(), metadata, Page(), getStaff(), parseUserTab(), STAFF_TAB, getBuildings()

### Community 25 - "package.json"
Cohesion: 0.13
Nodes (13): name, private, version, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+5 more)

### Community 26 - "date.ts"
Cohesion: 0.29
Nodes (13): DateInput, formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatDayRange(), formatDayRangeShortWIB(), formatDayRangeWIB(), formatFullDateWIB() (+5 more)

### Community 27 - "react"
Cohesion: 0.11
Nodes (23): react, LaporContent(), metadata, Page(), ResultDialog(), ResultDialogProps, ModalProps, WIDTH (+15 more)

### Community 28 - "UniversityDashboard.tsx"
Cohesion: 0.15
Nodes (20): TypeSummary, UniversityDashboardData, ReservationTrendCard(), TypeSummaryCard(), TypeSummaryCardProps, TONE, UniversityDashboard(), UniversityDashboardProps (+12 more)

### Community 29 - "ReservationRecord"
Cohesion: 0.19
Nodes (17): SksScheduleMatrixProps, CreateReservationPanelProps, buildHourGrid(), displayTime(), FloorTimeline(), FloorTimelineProps, LEGEND, pad() (+9 more)

### Community 30 - "Arsitektur KIREI FE"
Cohesion: 0.25
Nodes (7): 1. Prinsip, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE

### Community 31 - "content.ts"
Cohesion: 0.06
Nodes (51): framer-motion, src_app_globals, inter, metadata, poppins, metadata, Page(), AppBrand() (+43 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.11
Nodes (24): createReservation(), CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., TODO: kirei-api: backend wajib memverifikasi role admin_universitas /…, ReservationListing, ReservationRequest, status() (+16 more)

### Community 33 - "RoomManager.tsx"
Cohesion: 0.08
Nodes (50): Admin Gedung (role `admin_fakultas`), SelectInput(), ROOM_PHOTO_MAX_SIZE_MB, AddRoomDialog(), AddRoomDialogProps, Errors, TODO: POST the room through the orval client (multipart with the photo); map…, TODO: align RoomType with the API (kelas, lab, meeting, auditorium, gor). (+42 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "getUniversityDashboard.ts"
Cohesion: 0.18
Nodes (17): metadata, Page(), MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE, buildFacilityRequestsMock(), buildReservationsMock() (+9 more)

### Community 37 - "ReservationLogCalendar.tsx"
Cohesion: 0.24
Nodes (12): buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef, cellClass() (+4 more)

### Community 38 - "Field.tsx"
Cohesion: 0.17
Nodes (21): @hookform/resolvers, react-hook-form, Field(), FieldProps, INPUT_CLASS, SelectInputProps, Modal(), saveLecturerSchedule() (+13 more)

### Community 39 - "types/reservation.ts"
Cohesion: 0.15
Nodes (19): UniversityReservationsProps, ADMIN_UNIVERSITAS_ROUTES, AdminScope, getReservationRequests(), TODO: replace with the orval client (no-store, filtered by scope, type, and…, ReservationCandidates, HISTORY_STATUSES, requestsForTab() (+11 more)

### Community 40 - "getReservationOptions.ts"
Cohesion: 0.10
Nodes (31): metadata, Page(), buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_BUILDINGS, MOCK_ROOM_RULES, MOCK_SPORTS_HALL, MOCK_VEHICLES (+23 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "getCurrentUser"
Cohesion: 0.19
Nodes (15): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+7 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "liveDashboard.ts"
Cohesion: 0.23
Nodes (15): LiveUniversityDashboard(), LiveAdminDashboard(), useLiveReports(), activeBorrowers(), CANCELLED, HOLDS_SLOT, roomRequestsInScope(), SUCCEEDED (+7 more)

### Community 46 - "reservations.ts"
Cohesion: 0.13
Nodes (18): BOOKER, buildReservationHistoryMock(), FACILITY_ROWS, FacilityRow, PAST_STATUSES, PAST_TRIPS, pastRecords(), PURPOSES (+10 more)

### Community 47 - "query.ts"
Cohesion: 0.10
Nodes (31): Ormawa dan dosen, Override slot oleh Admin Universitas, Perbedaan dengan Figma V3, Publik dan autentikasi, Ringkasan, Role dan Halaman, metadata, Page() (+23 more)

### Community 48 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+7 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "UserReportList.tsx"
Cohesion: 0.15
Nodes (22): metadata, Page(), metadata, Page(), metadata, Page(), Popover(), PopoverProps (+14 more)

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 53 - "DraftCard.tsx"
Cohesion: 0.19
Nodes (15): Countdown, DeadlineInput, getCountdown(), NOW, useCountdown(), DeadlineTimer(), DeadlineTimerProps, display() (+7 more)

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

### Community 64 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 65 - "auth/actions.ts"
Cohesion: 0.30
Nodes (13): login(), LoginResult, loginWithLaravel(), logout(), onEmail(), quickLogin(), startSession(), forwardCookies() (+5 more)

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 67 - "reservationTypes.ts"
Cohesion: 0.22
Nodes (10): Layout(), Layout(), Breadcrumb(), BreadcrumbItem, BreadcrumbProps, InternalReservationBreadcrumb(), TypeTabsProps, CreateReservationBreadcrumb() (+2 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "Admin Universitas"
Cohesion: 0.29
Nodes (6): Admin Universitas, Admin Universitas, SegmentedNav(), SegmentedNavItem, SegmentedNavProps, TypeTabs()

### Community 70 - "requireRole"
Cohesion: 0.20
Nodes (18): metadata, Page(), generateMetadata(), generateStaticParams, Page(), generateMetadata(), generateStaticParams, Page() (+10 more)

### Community 71 - "LoginPage.tsx"
Cohesion: 0.29
Nodes (9): metadata, Page(), getDemoAccounts(), LoginPage(), QuickLogin(), ROLE_LABEL, roleLabel(), RedirectIfSignedIn() (+1 more)

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, exceljs, framer-motion, @hookform/resolvers, jspdf, jspdf-autotable, next, qrcode (+4 more)

### Community 74 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 75 - "getDataMode"
Cohesion: 0.25
Nodes (9): getDataMode, buildAnnouncementsMock(), buildDashboardMock(), wibDateTime(), ANNOUNCEMENT, TODO: replace with the orval client for announcements (no-store, filtered by…, getUserDashboard(), TODO: replace with the orval client for the dashboard endpoint (no-store) once… (+1 more)

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 77 - "laravel.ts"
Cohesion: 0.19
Nodes (16): callLaravel(), decode(), fetchApiUser(), LaravelCookie, LaravelResponse, parseApiUser(), parseSetCookie(), userSchema (+8 more)

### Community 78 - "AdminGedungShell.tsx"
Cohesion: 0.22
Nodes (12): AdminGedungLayout(), AdminUniversitasLayout(), Avatar(), AvatarProps, initialsOf(), AdminAvatar(), AdminGedungShell(), AdminAvatar() (+4 more)

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
Cohesion: 0.22
Nodes (13): buildSksSlots(), formatMinutes(), formatSksSlotRange(), pad(), TODO: kirei-api: sinkronkan daftar jeda istirahat ini dengan konfigurasi…, sessionForStart(), SKS_BREAKS, SKS_DURATION_MINUTES (+5 more)

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
Cohesion: 0.10
Nodes (34): 3. Titik Integrasi Mock untuk Prototipe, VehicleFleetInfo(), VehicleFleetInfoProps, VehicleManagementProps, VehicleReservationOptions, VEHICLE_RESERVATION_FIELD_MAP, VehicleIssue, HOLDING_STATUSES (+26 more)

### Community 116 - "ReservationTable.tsx"
Cohesion: 0.14
Nodes (23): B. Pengelola (`admin_fakultas` dan `admin_universitas`), hardCopyLabel(), isHardCopySubmitted(), HardCopyBadge(), HardCopyBadgeProps, ApproveReservationDialog(), ApproveReservationDialogProps, REASON_EXAMPLE (+15 more)

### Community 117 - "SportsHallReservationForm.tsx"
Cohesion: 0.08
Nodes (42): SKS_SLOTS, crossFacultyApprover(), isRoomBooked(), rangesOverlap(), roomBookingsOnDay(), roomStatus, RoomStatusInput, base (+34 more)

### Community 118 - "staffSchema.ts"
Cohesion: 0.26
Nodes (10): createStaffSchema(), licenseDigits(), searchStaff(), STAFF_ROLE_LABEL, StaffInput, issues(), STAFF, valid (+2 more)

### Community 119 - "SksScheduleMatrix.tsx"
Cohesion: 0.14
Nodes (18): MaskIcon(), SksSlot, toWibTimeKey(), buildSksMatrix(), itemsForRoomSlot(), overlapsRange(), reservationFitsSlot(), scheduleFitsSlot() (+10 more)

### Community 120 - "ContactPage.tsx"
Cohesion: 0.22
Nodes (10): metadata, Page(), CONTACT, TODO: replace the Figma placeholders with the real Sarpras Udinus contacts…, buildReportsMock(), ChannelIcon(), ContactPage(), ContactPageProps (+2 more)

### Community 121 - "Fakultas"
Cohesion: 0.33
Nodes (6): MOCK_FAKULTAS, FakultasFilterProps, FAKULTAS_PARAM, SearchParams, TODO: replace with the orval client for faculties (rarely changes, so it may be…, Fakultas

### Community 122 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 123 - "vehicleSchema.ts"
Cohesion: 0.27
Nodes (10): VehicleDialogProps, createVehicleSchema(), normalName(), searchVehicles(), issues(), valid, VEHICLES, VehicleInput (+2 more)

### Community 124 - "VehicleCrewPanel.tsx"
Cohesion: 0.20
Nodes (11): COSTS, CrewInput, crewSchema, CrewValues, money, TODO: PUT the drivers and costs through the orval client. Until then the demo…, rupiah, toInput() (+3 more)

### Community 125 - "ReservationHistoryTable.tsx"
Cohesion: 0.20
Nodes (14): LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, formatTimeSpanWIB(), ExportHistoryButtons(), exportColumnsForType() (+6 more)

### Community 126 - "rooms.ts"
Cohesion: 0.19
Nodes (12): metadata, Page(), metadata, Page(), classroomRow(), MOCK_BUILDINGS, MOCK_ROOMS, mockRoomsInScope() (+4 more)

### Community 127 - "toWibDateKey"
Cohesion: 0.22
Nodes (10): addDaysToKey(), toWibDateKey(), wibToIso(), useLiveLectureBookings(), defaultSchedule(), lecturerScheduleBookings(), BUILDINGS, weekdayOf() (+2 more)

### Community 128 - "mutator.test.ts"
Cohesion: 0.22
Nodes (8): Client API (orval), API_URL, CSRF_METHODS, customFetch(), readBody(), readXsrfToken(), Result, toApiUrl()

### Community 129 - "next"
Cohesion: 0.21
Nodes (7): nextConfig, next, Page(), generateStaticParams, Page(), ComingSoonProps, reservationsRoute()

### Community 130 - "requireRole.ts"
Cohesion: 0.22
Nodes (12): metadata, Page(), getSessionUser, requestCookies(), LOGIN_PATH, ROLE_HOME, QuickLoginProps, ProfilePage() (+4 more)

### Community 132 - "vitest"
Cohesion: 0.16
Nodes (10): ref_node_url, qrcode, vitest, Page, paginate(), buildPublicReportUrl(), generateReportQrDataUrl(), QrResult (+2 more)

### Community 133 - "RoleShell.tsx"
Cohesion: 0.24
Nodes (5): ADMIN_GEDUNG_ROUTES, ADMIN_UNIVERSITAS_NAV, LogoutButton(), NavLinkConfig, RoleShellProps

### Community 138 - "FaqPage.tsx"
Cohesion: 0.29
Nodes (7): metadata, Page(), DOSEN_ANSWERS, DOSEN_FAQ_ITEMS, FAQ_ITEMS, FaqItem, FaqPage()

### Community 139 - "ReservationTrendCard.tsx"
Cohesion: 0.24
Nodes (8): LineChart(), LineChartProps, LineSeries, niceMax(), WeeklyCounts, ReservationTrendCardProps, TrendView, VIEWS

### Community 140 - "getReservationCandidates"
Cohesion: 0.38
Nodes (7): metadata, Page(), metadata, Page(), RESERVATION_TAB_LINKS, getReservationCandidates(), ReservationManagement()

### Community 141 - "OrmawaShell.tsx"
Cohesion: 0.33
Nodes (7): OrmawaLayout(), hasDrafts(), DOSEN_NAV, NOT_FOR_DOSEN, ORMAWA_NAV, BorrowerShell(), OrmawaShell()

### Community 142 - "ActiveReservationCard.tsx"
Cohesion: 0.39
Nodes (6): ActiveReservationCard(), Field(), room, vehicleSummary(), ReservationStatusBadge(), tripText()

### Community 143 - "OperatorShell.tsx"
Cohesion: 0.52
Nodes (4): OperatorLayout(), OperatorAccountBar(), OperatorAccount(), OperatorShell()

### Community 144 - "reservationTime.ts"
Cohesion: 0.52
Nodes (5): mapAdminRequestToRow(), isWholeDayType(), reservationDateLong(), reservationDateShort(), Timed

### Community 145 - "Shell.tsx"
Cohesion: 0.53
Nodes (5): isActive(), NavItem, NavList(), Shell(), ShellProps

### Community 146 - "2. Alur Tindakan Pengguna (User Flow)"
Cohesion: 0.40
Nodes (5): 2. Alur Tindakan Pengguna (User Flow), A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin)

## Knowledge Gaps
- **743 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+738 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 902 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `mocks/user.ts`, `requireRole.ts`, `RoomReservationForm.tsx`, `getOperatorFloor.ts`, `RoleShell.tsx`, `scheduleCsv.ts`, `report.ts`, `Button`, `FaqPage.tsx`, `OperatorFloorPage.tsx`, `getReservationCandidates`, `ReservationTypePicker.tsx`, `Staff`, `Shell.tsx`, `zod`, `VehicleManagement.tsx`, `DraftList.tsx`, `Card`, `pengguna/page.tsx`, `package.json`, `react`, `UniversityDashboard.tsx`, `content.ts`, `RoomManager.tsx`, `getUniversityDashboard.ts`, `ReservationLogCalendar.tsx`, `Field.tsx`, `types/reservation.ts`, `getReservationOptions.ts`, `getCurrentUser`, `reservations.ts`, `query.ts`, `UserReportList.tsx`, `DraftCard.tsx`, `auth/actions.ts`, `reservationTypes.ts`, `Admin Universitas`, `requireRole`, `LoginPage.tsx`, `getDataMode`, `laravel.ts`, `AdminGedungShell.tsx`, `ReservationTable.tsx`, `SportsHallReservationForm.tsx`, `ContactPage.tsx`, `Fakultas`, `ReservationHistoryTable.tsx`, `rooms.ts`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `ScheduleManager.tsx`, `requireRole.ts`, `RoomReservationForm.tsx`, `vitest`, `TimeWheel.tsx`, `reservationStore.ts`, `report.ts`, `Button`, `historyExport.ts`, `ReservationTrendCard.tsx`, `OperatorFloorPage.tsx`, `OrmawaShell.tsx`, `CreateReservationPanel.tsx`, `Button.tsx`, `OperatorShell.tsx`, `Shell.tsx`, `zod`, `VehicleManagement.tsx`, `timelineDetail.ts`, `DraftList.tsx`, `Card`, `package.json`, `content.ts`, `createReservation.ts`, `RoomManager.tsx`, `ReservationLogCalendar.tsx`, `Field.tsx`, `liveDashboard.ts`, `query.ts`, `UserReportList.tsx`, `DraftCard.tsx`, `LoginPage.tsx`, `AdminGedungShell.tsx`, `VehicleReservationForm.tsx`, `ReservationTable.tsx`, `SportsHallReservationForm.tsx`, `SksScheduleMatrix.tsx`, `Fakultas`, `VehicleCrewPanel.tsx`, `ReservationHistoryTable.tsx`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `mutator.test.ts`, `mocks/user.ts`, `reservationStore.ts`, `TimeWheel.tsx`, `scheduleCsv.ts`, `report.ts`, `Button`, `FaqPage.tsx`, `OperatorFloorPage.tsx`, `historyExport.ts`, `Staff`, `CreateReservationPanel.tsx`, `ActiveReservationCard.tsx`, `reservationTime.ts`, `zod`, `filterAnnouncements.ts`, `timelineDetail.ts`, `DraftList.tsx`, `schema.ts`, `package.json`, `date.ts`, `react`, `content.ts`, `createReservation.ts`, `RoomManager.tsx`, `ReservationLogCalendar.tsx`, `types/reservation.ts`, `liveDashboard.ts`, `query.ts`, `DraftCard.tsx`, `reservationTypes.ts`, `requireRole`, `getDataMode`, `laravel.ts`, `sks.ts`, `VehicleReservationForm.tsx`, `ReservationTable.tsx`, `SportsHallReservationForm.tsx`, `staffSchema.ts`, `SksScheduleMatrix.tsx`, `Fakultas`, `vehicleSchema.ts`, `ReservationHistoryTable.tsx`, `toWibDateKey`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _743 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `reservationStore.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12903225806451613 - nodes in this community are weakly interconnected._
- **Should `RoomReservationForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12956810631229235 - nodes in this community are weakly interconnected._
- **Should `scheduleCsv.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08974358974358974 - nodes in this community are weakly interconnected._