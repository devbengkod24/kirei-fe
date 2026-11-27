# Graph Report - kirei-fe  (2026-11-27)

## Corpus Check
- 482 files · ~265,987 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2441 nodes · 6985 edges · 136 communities (111 shown, 25 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 113 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2ed852e4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- UserReportList.tsx
- OperatorFloorPage.tsx
- ComplaintForm.tsx
- Card
- AddUserDialog.tsx
- TimeWheel.tsx
- useLiveFacilities.ts
- PageSkeleton
- RoomReservationForm.tsx
- next
- SksScheduleMatrix.tsx
- slots.ts
- VehicleManagement.tsx
- vitest
- ReportFilterForm.tsx
- AnnouncementManager.tsx
- contrast-check.py
- toWibDateKey
- scheduleCsv.ts
- reportExport.ts
- vehicleReport.ts
- DraftCard.tsx
- LoginPage.tsx
- schema.ts
- getDataMode
- package.json
- userSchema.test.ts
- react
- SportsHallReservationForm.tsx
- getCurrentUser.ts
- PublicDamageReportForm.tsx
- content.ts
- createReservation.ts
- RoomManager.tsx
- compilerOptions
- Accessibility Code Patterns
- reservations.ts
- UserManagement.tsx
- Field.tsx
- ReservationTypePicker.tsx
- date.ts
- Tone & Voice
- kirei-fe
- Button
- antislop-layoutmobile
- ReservationType
- zod
- query.ts
- devDependencies
- What You Must Do When Invoked
- auth/actions.ts
- AdminDashboardSkeleton
- ReservationFormSkeleton
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- QuickLogin.tsx
- Group 1: Hard Gate (absolute, no exceptions)
- Comments That Add Nothing
- getCurrentUser
- [tipe]/persetujuan/page.tsx
- CreateReservationPanel.tsx
- KIREI FE
- dependencies
- scripts
- OrmawaShell.tsx
- Group 2: Purpose-Gate (technique allowed, purpose required)
- lecturerScheduleBookings.ts
- ActiveReservationCard.tsx
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
- types/reservation.ts
- getReservationOptions.ts
- VehicleCrewPanel.tsx
- requireRole
- Button.tsx
- eslint.config.mjs
- ReservationRecord
- ReservationHistoryTable.tsx
- getUniversityDashboard.ts
- 2. Struktur dan fungsi folder
- session.ts
- ReportQrDialog.tsx
- sksMatrix.ts
- vehicleSchema.ts
- 2. Alur Tindakan Pengguna (User Flow)
- getManagedUsers.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 118 edges
2. `toWibDateKey()` - 86 edges
3. `react` - 85 edges
4. `Button` - 73 edges
5. `vitest` - 71 edges
6. `Card()` - 68 edges
7. `requireRole()` - 52 edges
8. `ReservationType` - 46 edges
9. `RoomReservationForm()` - 44 edges
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
- `Admin Universitas` --references--> `login()`  [INFERRED]
  docs/architecture.md → src/lib/auth/actions.ts

## Import Cycles
- None detected.

## Communities (136 total, 25 thin omitted)

### Community 0 - "UserReportList.tsx"
Cohesion: 0.15
Nodes (20): Popover(), PopoverProps, ReportSeedRow, ROWS, LatestReportsCardProps, ComplaintFormProps, DEFAULT_REPORT_FILTER, filterReports() (+12 more)

### Community 1 - "OperatorFloorPage.tsx"
Cohesion: 0.09
Nodes (44): Admin Gedung (role `admin_fakultas`), Admin Universitas, Operator, Override slot oleh Admin Universitas, Perbedaan dengan Figma V3, Publik dan autentikasi, Ringkasan, Role dan Halaman (+36 more)

### Community 2 - "ComplaintForm.tsx"
Cohesion: 0.16
Nodes (16): applyFormErrors(), FormErrorEntry, isLaravelValidationError(), LaravelValidationError, fieldMap, toFormErrors(), ComplaintForm(), DEFAULTS (+8 more)

### Community 3 - "Card"
Cohesion: 0.14
Nodes (27): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, Ormawa dan dosen, CAPS_LABEL_CLASS, Card(), CardProps, DRAFT_LETTER_HOURS, LatestAnnouncementsCard() (+19 more)

### Community 4 - "AddUserDialog.tsx"
Cohesion: 0.13
Nodes (24): AddUserDialogProps, DEFAULTS, STATUS_OPTIONS, UserDetailChanges, UserDetailDialogProps, UserManagementProps, createUserSchema(), IssueSink (+16 more)

### Community 5 - "TimeWheel.tsx"
Cohesion: 0.26
Nodes (14): clampTime(), formatPart, HourRange, joinTime(), pad(), parseTypedPart(), splitTime(), stepPart() (+6 more)

### Community 6 - "useLiveFacilities.ts"
Cohesion: 0.10
Nodes (27): sksRangeToTimes(), entry(), getMockLecturerSchedule(), getMockLecturerSchedules(), schedules, setMockLecturerSchedule(), saveLecturerSchedule(), SaveScheduleResult (+19 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (20): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+12 more)

### Community 8 - "RoomReservationForm.tsx"
Cohesion: 0.14
Nodes (20): addDaysToKey(), crossFacultyApprover(), defaultSchedule(), isRoomBooked(), rangesOverlap(), roomBookingsOnDay(), roomStatus, base (+12 more)

### Community 9 - "next"
Cohesion: 0.16
Nodes (12): nextConfig, next, Layout(), Layout(), ComingSoonProps, Breadcrumb(), BreadcrumbItem, BreadcrumbProps (+4 more)

### Community 10 - "SksScheduleMatrix.tsx"
Cohesion: 0.11
Nodes (27): SksSlot, displayTime(), LEGEND, SksScheduleMatrix(), SlotCard(), RESERVATION, SCHEDULE, CreateReservationPanelProps (+19 more)

### Community 11 - "slots.ts"
Cohesion: 0.14
Nodes (27): ROOM_CLOSE_TIME, buildHourGrid(), displayTime(), FloorTimeline(), LEGEND, pad(), px(), rangeLabel() (+19 more)

### Community 12 - "VehicleManagement.tsx"
Cohesion: 0.15
Nodes (21): metadata, Page(), Badge(), PAGE_SIZE_OPTIONS, Pagination(), PaginationProps, TABLE, TABLE_CELL (+13 more)

### Community 13 - "vitest"
Cohesion: 0.13
Nodes (11): ref_node_url, @testing-library/react, vitest, ImportScheduleDialog(), PDF_IMPORT_PENDING_MESSAGE, Picked, TODO: POST the PDF (multipart) with the semester to kirei-api, which reads the…, renderDialog() (+3 more)

### Community 14 - "ReportFilterForm.tsx"
Cohesion: 0.19
Nodes (17): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), isInPeriod(), shiftKey(), TIME_PERIOD_OPTIONS (+9 more)

### Community 15 - "AnnouncementManager.tsx"
Cohesion: 0.13
Nodes (22): metadata, Page(), metadata, Page(), BadgeProps, BadgeTone, SIZE_STYLES, TONE_STYLES (+14 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "toWibDateKey"
Cohesion: 0.05
Nodes (73): Simulasi alur reservasi (mock store), metadata, Page(), monthName(), toWibDateKey(), buildDashboardMock(), LiveUniversityDashboard(), UniversityDashboard() (+65 more)

### Community 18 - "scheduleCsv.ts"
Cohesion: 0.15
Nodes (16): parseCsv(), DAY_LABEL, DAYS, MAX_SKS_PER_ENTRY, overlaps(), ParsedSchedule, parseScheduleCsv(), positiveInt() (+8 more)

### Community 19 - "reportExport.ts"
Cohesion: 0.33
Nodes (9): ExportReportButtons(), ExportReportButtonsProps, buildReportExportFilename(), exportReportsToExcel(), exportReportsToPdf(), mapReportToExportRow(), TODO: kirei-api: Ekspor Excel dan PDF laporan pengguna saat ini dijalankan di…, REPORT_EXPORT_COLUMNS (+1 more)

### Community 20 - "vehicleReport.ts"
Cohesion: 0.15
Nodes (13): cell(), HEADERS, lastDayKey(), STAFF, trip, vehicleHistoryCsv(), RESERVATION_STATUS, reservationStatusLabel() (+5 more)

### Community 21 - "DraftCard.tsx"
Cohesion: 0.08
Nodes (44): 3. Titik Integrasi Mock untuk Prototipe, Loading(), Countdown, DeadlineInput, getCountdown(), NOW, useCountdown(), DeadlineTimer() (+36 more)

### Community 22 - "LoginPage.tsx"
Cohesion: 0.18
Nodes (10): src_app_globals, inter, metadata, poppins, metadata, Page(), SITE, getDemoAccounts() (+2 more)

### Community 23 - "schema.ts"
Cohesion: 0.08
Nodes (33): LETTER_MAX_SIZE_MB, ORGANISATION_MIN_DAYS_AHEAD, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, toIsoRange(), BOOKING_MODES, BookingModeSettings (+25 more)

### Community 24 - "getDataMode"
Cohesion: 0.12
Nodes (19): Admin Universitas, metadata, Page(), metadata, Page(), metadata, Page(), CONTACT (+11 more)

### Community 25 - "package.json"
Cohesion: 0.12
Nodes (14): name, private, version, jsdom, orval, react-dom, tailwindcss, @tailwindcss/turbopack (+6 more)

### Community 26 - "userSchema.test.ts"
Cohesion: 0.22
Nodes (7): ADMIN_GEDUNG, DOSEN, MOCK_MANAGED_USERS, OPERATORS, ORMAWA, NO_FLOOR, PASSWORD

### Community 27 - "react"
Cohesion: 0.17
Nodes (14): react, ResultDialog(), ResultDialogProps, ModalProps, WIDTH, useModalDialog(), changePassword(), MIN_PASSWORD_LENGTH (+6 more)

### Community 28 - "SportsHallReservationForm.tsx"
Cohesion: 0.16
Nodes (22): wibToIso(), toSportsHallReservationRequest(), DATE, ReservationStep, ReservationSteps(), STEPS_BY_TYPE, TIME, UPLOAD (+14 more)

### Community 29 - "getCurrentUser.ts"
Cohesion: 0.23
Nodes (12): getSessionUser, decode(), fetchApiUser(), LaravelCookie, LaravelResponse, parseApiUser(), parseSetCookie(), requestCookies() (+4 more)

### Community 30 - "PublicDamageReportForm.tsx"
Cohesion: 0.13
Nodes (21): LaporContent(), metadata, Page(), REPORT_PHOTO_MAX_SIZE_MB, DAMAGE_REPORT_FIELD_MAP, DamageReportInput, damageReportSchema, DamageReportValues (+13 more)

### Community 31 - "content.ts"
Cohesion: 0.07
Nodes (45): framer-motion, metadata, Page(), AppBrand(), BOOKING_WINDOW_RULE, CAMPUS_ADDRESS, FACILITY_ITEMS, FACILITY_SLIDES (+37 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.11
Nodes (22): CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., TODO: kirei-api: backend wajib memverifikasi role admin_universitas /…, ReservationListing, ReservationRequest, status(), BUS (+14 more)

### Community 33 - "RoomManager.tsx"
Cohesion: 0.11
Nodes (28): FILTER_SELECT_CLASS, FilterField(), FilterFieldProps, Toast(), ToastProps, EditRoomDialog(), managedByLabel(), ROOM_TYPE_LABEL (+20 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "reservations.ts"
Cohesion: 0.13
Nodes (20): BOOKER, buildFacilityRequestsMock(), buildReservationHistoryMock(), buildReservationsMock(), FACILITY_ROWS, FacilityRow, PAST_STATUSES, PAST_TRIPS (+12 more)

### Community 37 - "UserManagement.tsx"
Cohesion: 0.23
Nodes (11): usePagination(), Page, paginate(), UserDetailDialog(), Email(), TODO: PATCH the status and PUT the new password through the orval client; the…, TODO: POST the account (with its password) through the orval client; the…, StatusBadge() (+3 more)

### Community 38 - "Field.tsx"
Cohesion: 0.14
Nodes (26): @hookform/resolvers, react-hook-form, Field(), FieldProps, INPUT_CLASS, SelectInput(), SelectInputProps, Modal() (+18 more)

### Community 39 - "ReservationTypePicker.tsx"
Cohesion: 0.16
Nodes (11): metadata, Page(), metadata, Page(), internalReservationRoute(), createReservationFor(), DRAWINGS, ReservationTypeIllustration() (+3 more)

### Community 40 - "date.ts"
Cohesion: 0.26
Nodes (15): DateInput, formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatDayRange(), formatDayRangeWIB(), formatFullDateWIB(), formatRelativeDayWIB() (+7 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "Button"
Cohesion: 0.11
Nodes (30): Button, ROOM_PHOTO_MAX_SIZE_MB, classroomRow(), MOCK_BUILDINGS, MOCK_ROOMS, room(), AddRoomDialog(), AddRoomDialogProps (+22 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "ReservationType"
Cohesion: 0.16
Nodes (18): metadata, Page(), metadata, Page(), Page(), RESERVATION_TAB_LINKS, UniversityReservationsProps, ADMIN_UNIVERSITAS_ROUTES (+10 more)

### Community 46 - "zod"
Cohesion: 0.06
Nodes (54): Mode data: dengan atau tanpa data dummy, zod, LiveData, useLiveData(), useLiveState(), DATA_MODE_COOKIE, DataMode, parseDataMode() (+46 more)

### Community 47 - "query.ts"
Cohesion: 0.14
Nodes (25): metadata, Page(), ORMAWA_ROUTES, getHistoryRecords(), ACTIVE_STATUSES, buildHistoryResult(), ReservationHistoryResult, DEFAULT_HISTORY_QUERY (+17 more)

### Community 48 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+7 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "auth/actions.ts"
Cohesion: 0.30
Nodes (13): login(), LoginResult, loginWithLaravel(), logout(), onEmail(), quickLogin(), startSession(), callLaravel() (+5 more)

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

### Community 65 - "QuickLogin.tsx"
Cohesion: 0.22
Nodes (10): QuickLogin(), QuickLoginProps, ROLE_LABEL, roleLabel(), DataModeControls(), ProfilePageProps, ProfileSummary(), ProfileSummaryProps (+2 more)

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "getCurrentUser"
Cohesion: 0.34
Nodes (9): metadata, Page(), metadata, Page(), metadata, Page(), getCurrentUser(), borrowerBooking() (+1 more)

### Community 70 - "[tipe]/persetujuan/page.tsx"
Cohesion: 0.13
Nodes (23): metadata, Page(), generateMetadata(), generateStaticParams, Page(), generateStaticParams, Page(), generateMetadata() (+15 more)

### Community 71 - "CreateReservationPanel.tsx"
Cohesion: 0.27
Nodes (9): CreateReservationPanel(), displayTime(), createOperatorReservation(), CreateOperatorReservationResult, TODO: POST with the orval client (room_id, booker_name, purpose, starts_at,…, OPERATOR_RESERVATION_FIELD_MAP, operatorReservationSchema, OperatorReservationValues (+1 more)

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, exceljs, framer-motion, @hookform/resolvers, jspdf, jspdf-autotable, next, qrcode (+4 more)

### Community 74 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 75 - "OrmawaShell.tsx"
Cohesion: 0.07
Nodes (40): AdminGedungLayout(), AdminUniversitasLayout(), OperatorLayout(), metadata, Page(), OrmawaLayout(), isActive(), NavItem (+32 more)

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 77 - "lecturerScheduleBookings.ts"
Cohesion: 0.32
Nodes (4): useLiveLectureBookings(), lecturerScheduleBookings(), BUILDINGS, weekdayOf()

### Community 78 - "ActiveReservationCard.tsx"
Cohesion: 0.33
Nodes (7): ActiveReservationCard(), Field(), room, ActiveReservationList(), ActiveReservationListProps, Group(), ReservationStatusBadge()

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
Cohesion: 0.10
Nodes (30): VehicleFleetInfoProps, VehicleManagementProps, VehicleReservationOptions, ReservationLinks, HOLDING_STATUSES, passengerSeats(), rank(), BUS (+22 more)

### Community 116 - "types/reservation.ts"
Cohesion: 0.11
Nodes (32): B. Pengelola (`admin_fakultas` dan `admin_universitas`), Row, hardCopyLabel(), isHardCopySubmitted(), HardCopyBadge(), HardCopyBadgeProps, ApproveReservationDialog(), ApproveReservationDialogProps (+24 more)

### Community 117 - "getReservationOptions.ts"
Cohesion: 0.12
Nodes (27): metadata, Page(), buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_BUILDINGS, MOCK_ROOM_RULES, MOCK_SPORTS_HALL, MOCK_VEHICLES (+19 more)

### Community 118 - "VehicleCrewPanel.tsx"
Cohesion: 0.18
Nodes (11): COSTS, CrewInput, crewSchema, CrewValues, money, TODO: PUT the drivers and costs through the orval client. Until then the demo…, rupiah, toInput() (+3 more)

### Community 120 - "requireRole"
Cohesion: 0.13
Nodes (18): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+10 more)

### Community 121 - "Button.tsx"
Cohesion: 0.31
Nodes (4): RouteError(), RouteErrorProps, ButtonProps, VARIANT_STYLES

### Community 122 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 124 - "ReservationRecord"
Cohesion: 0.22
Nodes (14): metadata, Page(), buildClassSchedulesMock(), buildOperatorReservationsMock(), MOCK_OPERATOR_FLOOR, wibDateTime(), SksScheduleMatrixProps, getOperatorFloor() (+6 more)

### Community 125 - "ReservationHistoryTable.tsx"
Cohesion: 0.09
Nodes (35): exceljs, jspdf, jspdf-autotable, LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps (+27 more)

### Community 127 - "getUniversityDashboard.ts"
Cohesion: 0.08
Nodes (36): LineChart(), LineChartProps, LineSeries, niceMax(), MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE (+28 more)

### Community 128 - "2. Struktur dan fungsi folder"
Cohesion: 0.09
Nodes (21): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE (+13 more)

### Community 129 - "session.ts"
Cohesion: 0.16
Nodes (16): cookieStore, laravelSessionCookie(), LOGIN_PATH, ROLE_HOME, SESSION_COOKIE, userFromSession(), findMockAccount(), findMockUserById() (+8 more)

### Community 132 - "ReportQrDialog.tsx"
Cohesion: 0.39
Nodes (6): qrcode, buildPublicReportUrl(), generateReportQrDataUrl(), QrResult, ReportQrDialog(), ReportQrDialogProps

### Community 138 - "sksMatrix.ts"
Cohesion: 0.33
Nodes (8): toWibTimeKey(), buildSksMatrix(), itemsForRoomSlot(), overlapsRange(), reservationFitsSlot(), scheduleFitsSlot(), RESERVATION, SCHEDULE

### Community 139 - "vehicleSchema.ts"
Cohesion: 0.36
Nodes (8): createVehicleSchema(), normalName(), searchVehicles(), issues(), valid, VEHICLES, VehicleInput, wholeNumber()

### Community 140 - "2. Alur Tindakan Pengguna (User Flow)"
Cohesion: 0.20
Nodes (8): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin)

### Community 146 - "getManagedUsers.ts"
Cohesion: 0.14
Nodes (19): metadata, Page(), SegmentedNav(), SegmentedNavItem, SegmentedNavProps, getStaff(), demoAccountUsers(), getManagedUsers() (+11 more)

## Knowledge Gaps
- **750 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+745 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 912 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `UserReportList.tsx`, `OperatorFloorPage.tsx`, `session.ts`, `Card`, `AddUserDialog.tsx`, `useLiveFacilities.ts`, `RoomReservationForm.tsx`, `VehicleManagement.tsx`, `AnnouncementManager.tsx`, `toWibDateKey`, `getManagedUsers.ts`, `DraftCard.tsx`, `LoginPage.tsx`, `getDataMode`, `package.json`, `react`, `SportsHallReservationForm.tsx`, `getCurrentUser.ts`, `PublicDamageReportForm.tsx`, `content.ts`, `RoomManager.tsx`, `reservations.ts`, `UserManagement.tsx`, `Field.tsx`, `ReservationTypePicker.tsx`, `date.ts`, `Button`, `ReservationType`, `zod`, `query.ts`, `auth/actions.ts`, `QuickLogin.tsx`, `getCurrentUser`, `[tipe]/persetujuan/page.tsx`, `OrmawaShell.tsx`, `ActiveReservationCard.tsx`, `types/reservation.ts`, `getReservationOptions.ts`, `requireRole`, `ReservationRecord`, `ReservationHistoryTable.tsx`, `getUniversityDashboard.ts`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `UserReportList.tsx`, `OperatorFloorPage.tsx`, `ComplaintForm.tsx`, `Card`, `AddUserDialog.tsx`, `ReportQrDialog.tsx`, `useLiveFacilities.ts`, `TimeWheel.tsx`, `RoomReservationForm.tsx`, `SksScheduleMatrix.tsx`, `VehicleManagement.tsx`, `vitest`, `ReportFilterForm.tsx`, `AnnouncementManager.tsx`, `toWibDateKey`, `reportExport.ts`, `DraftCard.tsx`, `LoginPage.tsx`, `getDataMode`, `package.json`, `SportsHallReservationForm.tsx`, `getCurrentUser.ts`, `PublicDamageReportForm.tsx`, `content.ts`, `createReservation.ts`, `RoomManager.tsx`, `UserManagement.tsx`, `Field.tsx`, `Button`, `zod`, `query.ts`, `QuickLogin.tsx`, `CreateReservationPanel.tsx`, `OrmawaShell.tsx`, `VehicleReservationForm.tsx`, `types/reservation.ts`, `VehicleCrewPanel.tsx`, `Button.tsx`, `ReservationHistoryTable.tsx`, `getUniversityDashboard.ts`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `2. Struktur dan fungsi folder`, `session.ts`, `ComplaintForm.tsx`, `OperatorFloorPage.tsx`, `UserReportList.tsx`, `ReportQrDialog.tsx`, `TimeWheel.tsx`, `RoomReservationForm.tsx`, `next`, `sksMatrix.ts`, `SksScheduleMatrix.tsx`, `vehicleSchema.ts`, `slots.ts`, `ReportFilterForm.tsx`, `AnnouncementManager.tsx`, `toWibDateKey`, `scheduleCsv.ts`, `reportExport.ts`, `vehicleReport.ts`, `DraftCard.tsx`, `schema.ts`, `package.json`, `userSchema.test.ts`, `react`, `SportsHallReservationForm.tsx`, `getCurrentUser.ts`, `PublicDamageReportForm.tsx`, `content.ts`, `createReservation.ts`, `RoomManager.tsx`, `UserManagement.tsx`, `date.ts`, `Button`, `zod`, `query.ts`, `getCurrentUser`, `[tipe]/persetujuan/page.tsx`, `CreateReservationPanel.tsx`, `OrmawaShell.tsx`, `lecturerScheduleBookings.ts`, `ActiveReservationCard.tsx`, `sks.ts`, `VehicleReservationForm.tsx`, `types/reservation.ts`, `ReservationHistoryTable.tsx`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _750 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `OperatorFloorPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08823529411764706 - nodes in this community are weakly interconnected._
- **Should `Card` be split into smaller, more focused modules?**
  _Cohesion score 0.13825757575757575 - nodes in this community are weakly interconnected._
- **Should `AddUserDialog.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._