# Graph Report - kirei-fe  (2026-11-27)

## Corpus Check
- 478 files · ~264,449 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2416 nodes · 6908 edges · 138 communities (111 shown, 27 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8380934c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Button
- liveSchemas.ts
- ComplaintForm.tsx
- SportsHallReservationForm.tsx
- AddUserDialog.tsx
- TimeWheel.tsx
- scheduleCsv.ts
- PageSkeleton
- reportExport.ts
- UserManagement.tsx
- AddRoomDialog.tsx
- OperatorFloorPage.tsx
- types/reservation.ts
- ReservationTypePicker.tsx
- form-errors.ts
- ReportFilterForm.tsx
- contrast-check.py
- reservationStore.ts
- AnnouncementManager.tsx
- UserReportList.tsx
- damageReportSchema.ts
- DraftCard.tsx
- UserDashboard.tsx
- schema.ts
- getLecturerSchedule.ts
- package.json
- Card
- react
- UniversityDashboard.tsx
- staffStore.ts
- ReservationOwner
- MaskIcon
- createReservation.ts
- RoomManager.tsx
- compilerOptions
- Accessibility Code Patterns
- getUniversityDashboard.ts
- ReservationLogCalendar.tsx
- Button.tsx
- ReservationType
- toWibDateKey
- Tone & Voice
- kirei-fe
- PublicDamageReportForm.tsx
- antislop-layoutmobile
- lecturer-schedule/actions.ts
- reservations.ts
- query.ts
- devDependencies
- What You Must Do When Invoked
- next
- AdminDashboardSkeleton
- ReservationFormSkeleton
- sportsHallSlots.ts
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- vitest
- Group 1: Hard Gate (absolute, no exceptions)
- @testing-library/react
- Comments That Add Nothing
- ReservationSteps.tsx
- [tipe]/persetujuan/page.tsx
- Toast.tsx
- KIREI FE
- dependencies
- scripts
- wibDateTime
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
- RoomReservationForm.tsx
- StaffManagement.tsx
- ContactPage.tsx
- Fakultas
- eslint.config.mjs
- VehicleManagement.tsx
- date.ts
- gedung/ruangan/page.tsx
- 2. Struktur dan fungsi folder
- ComingSoon.tsx
- RouteError.tsx
- ReportQrDialog.tsx
- gedung/dashboard/page.tsx
- FaqPage.tsx
- ReservationTrendCard.tsx
- getReservationCandidates
- 2. Alur Tindakan Pengguna (User Flow)

## God Nodes (most connected - your core abstractions)
1. `next` - 118 edges
2. `toWibDateKey()` - 86 edges
3. `react` - 84 edges
4. `Button` - 79 edges
5. `vitest` - 70 edges
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
- `4. Perbedaan dengan Vault dan Keputusan` --references--> `VehicleReservationForm()`  [INFERRED]
  docs/flow-reservasi.md → src/shared/reservation-form/VehicleReservationForm.tsx
- `Client API (orval)` --references--> `applyFormErrors()`  [INFERRED]
  docs/architecture.md → src/lib/api/form-errors.ts
- `Admin Universitas` --references--> `requireRole()`  [INFERRED]
  docs/architecture.md → src/lib/auth/requireRole.ts

## Import Cycles
- None detected.

## Communities (138 total, 27 thin omitted)

### Community 0 - "Button"
Cohesion: 0.22
Nodes (22): Admin Gedung (role `admin_fakultas`), Field(), SelectInput(), Button, Modal(), ImportScheduleDialog(), Picked, dayText() (+14 more)

### Community 1 - "liveSchemas.ts"
Cohesion: 0.25
Nodes (7): announcementsSchema, buildingsSchema, floorPlanRoomSchema, lecturerSchedulesSchema, LIVE_NAMES, reportsSchema, weekdaySchema

### Community 2 - "ComplaintForm.tsx"
Cohesion: 0.17
Nodes (16): ReportSeedRow, ROWS, ComplaintFormProps, DEFAULTS, CATEGORIES, COMPLAINT_FIELD_MAP, ComplaintInput, complaintSchema (+8 more)

### Community 3 - "SportsHallReservationForm.tsx"
Cohesion: 0.13
Nodes (37): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, metadata, Page(), DRAFT_LETTER_HOURS, addDaysToKey(), InternalReservationForm(), getRoomReservationOptions() (+29 more)

### Community 4 - "AddUserDialog.tsx"
Cohesion: 0.17
Nodes (19): AddUserDialogProps, DEFAULTS, STATUS_OPTIONS, UserDetailChanges, UserDetailDialogProps, UserManagementProps, createUserSchema(), IssueSink (+11 more)

### Community 5 - "TimeWheel.tsx"
Cohesion: 0.26
Nodes (14): clampTime(), formatPart, HourRange, joinTime(), pad(), parseTypedPart(), splitTime(), stepPart() (+6 more)

### Community 6 - "scheduleCsv.ts"
Cohesion: 0.15
Nodes (16): parseCsv(), DAY_LABEL, DAYS, MAX_SKS_PER_ENTRY, overlaps(), ParsedSchedule, parseScheduleCsv(), positiveInt() (+8 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (20): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+12 more)

### Community 8 - "reportExport.ts"
Cohesion: 0.24
Nodes (14): ExportReportButtons(), buildReportExportFilename(), exportReportsToExcel(), exportReportsToPdf(), mapReportToExportRow(), TODO: kirei-api: Ekspor Excel dan PDF laporan pengguna saat ini dijalankan di…, REPORT_EXPORT_COLUMNS, SAMPLE (+6 more)

### Community 9 - "UserManagement.tsx"
Cohesion: 0.08
Nodes (38): metadata, Page(), Badge(), PAGE_SIZE_OPTIONS, Pagination(), PaginationProps, MOCK_ACCOUNTS, ADMIN_GEDUNG (+30 more)

### Community 10 - "AddRoomDialog.tsx"
Cohesion: 0.15
Nodes (12): ROOM_PHOTO_MAX_SIZE_MB, Errors, TODO: POST the room through the orval client (multipart with the photo); map…, TODO: align RoomType with the API (kelas, lab, meeting, auditorium, gor)., RoomPhotoFieldProps, RoomStatusFieldProps, STATUS_OPTIONS, PHOTO_TYPES (+4 more)

### Community 11 - "OperatorFloorPage.tsx"
Cohesion: 0.05
Nodes (80): Operator, react-dom, useMediaQuery(), toWibTimeKey(), buildClassSchedulesMock(), buildOperatorReservationsMock(), MOCK_OPERATOR_FLOOR, buildSksMatrix() (+72 more)

### Community 12 - "types/reservation.ts"
Cohesion: 0.11
Nodes (23): TodayReservationsCardProps, ActiveReservationCard(), Field(), room, ActiveReservationList(), ActiveReservationListProps, Group(), cell() (+15 more)

### Community 13 - "ReservationTypePicker.tsx"
Cohesion: 0.08
Nodes (24): Admin Universitas, Ormawa dan dosen, Override slot oleh Admin Universitas, Perbedaan dengan Figma V3, Publik dan autentikasi, Ringkasan, Role dan Halaman, metadata (+16 more)

### Community 14 - "form-errors.ts"
Cohesion: 0.17
Nodes (10): FormErrorEntry, LaravelValidationError, fieldMap, toFormErrors(), CreateOperatorReservationResult, TODO: POST with the orval client (room_id, booker_name, purpose, starts_at,…, OPERATOR_RESERVATION_FIELD_MAP, operatorReservationSchema (+2 more)

### Community 15 - "ReportFilterForm.tsx"
Cohesion: 0.30
Nodes (10): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), AnnouncementFilterForm(), ReportFilter, ReportFilterForm() (+2 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "reservationStore.ts"
Cohesion: 0.05
Nodes (76): Mode data: dengan atau tanpa data dummy, Simulasi alur reservasi (mock store), zod, LiveData, useLiveData(), useLiveState(), DATA_MODE_COOKIE, DataMode (+68 more)

### Community 18 - "AnnouncementManager.tsx"
Cohesion: 0.12
Nodes (24): BadgeProps, BadgeTone, SIZE_STYLES, TONE_STYLES, Popover(), PopoverProps, isInPeriod(), shiftKey() (+16 more)

### Community 19 - "UserReportList.tsx"
Cohesion: 0.20
Nodes (14): formatRelativeDayWIB(), formatTimeWIB(), LatestReportsCardProps, ExportReportButtonsProps, DEFAULT_REPORT_FILTER, filterReports(), isDefaultReportFilter(), ReportDetailDialog() (+6 more)

### Community 20 - "damageReportSchema.ts"
Cohesion: 0.17
Nodes (12): REPORT_PHOTO_MAX_SIZE_MB, DAMAGE_REPORT_FIELD_MAP, DamageReportInput, damageReportSchema, DamageReportValues, TODO: kirei-api must validate all fields and file uploads on POST…, REPORT_CATEGORIES, valid (+4 more)

### Community 21 - "DraftCard.tsx"
Cohesion: 0.07
Nodes (47): Loading(), metadata, Page(), Countdown, DeadlineInput, getCountdown(), NOW, useCountdown() (+39 more)

### Community 22 - "UserDashboard.tsx"
Cohesion: 0.22
Nodes (11): DashboardHero(), DashboardHeroProps, LatestAnnouncementsCard(), ReservationTotal(), ReservationTotalProps, TodayReservationCard(), TodayReservationCardProps, UserDashboard() (+3 more)

### Community 23 - "schema.ts"
Cohesion: 0.09
Nodes (28): LETTER_MAX_SIZE_MB, toIsoRange(), ALWAYS, createRoomReservationSchema(), createSportsHallReservationSchema(), createVehicleReservationSchema(), describe(), IssueSink (+20 more)

### Community 24 - "getLecturerSchedule.ts"
Cohesion: 0.23
Nodes (11): metadata, Page(), getMockLecturerSchedule(), facultyRoomCodes(), getLecturerSchedule(), LecturerScheduleData, TODO: replace with the orval clients for the faculty's schedule and rooms (no-…, ImportScheduleDialogProps (+3 more)

### Community 25 - "package.json"
Cohesion: 0.11
Nodes (16): name, private, version, exceljs, jsdom, jspdf, jspdf-autotable, orval (+8 more)

### Community 26 - "Card"
Cohesion: 0.29
Nodes (11): Card(), CardProps, AdminDashboard(), AdminDashboardLinks, AdminDashboardProps, AdminDashboardData, LatestReportsCard(), StatTile() (+3 more)

### Community 27 - "react"
Cohesion: 0.17
Nodes (14): react, ResultDialog(), ResultDialogProps, ModalProps, WIDTH, useModalDialog(), changePassword(), MIN_PASSWORD_LENGTH (+6 more)

### Community 28 - "UniversityDashboard.tsx"
Cohesion: 0.30
Nodes (9): TypeSummary, ReservationTrendCard(), TypeSummaryCard(), TypeSummaryCardProps, TONE, UniversityDashboard(), STAT_TONES, StatTileProps (+1 more)

### Community 29 - "staffStore.ts"
Cohesion: 0.25
Nodes (10): listeners, MOCK_STAFF_KEY, readStoredStaff(), saveStaff(), staffKey(), staffListSchema, Storage, subscribeStaff() (+2 more)

### Community 30 - "ReservationOwner"
Cohesion: 0.18
Nodes (13): ORGANISATION_MIN_DAYS_AHEAD, InternalReservationFormProps, BOOKING_MODES, BookingMode, BookingModeSettings, ReservationListing, SportsHallReservationOptions, ReservationFormPageProps (+5 more)

### Community 31 - "MaskIcon"
Cohesion: 0.06
Nodes (52): framer-motion, src_app_globals, inter, metadata, poppins, metadata, Page(), AppBrand() (+44 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.12
Nodes (20): CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., TODO: kirei-api: backend wajib memverifikasi role admin_universitas /…, ReservationRequest, status(), BUS, text() (+12 more)

### Community 33 - "RoomManager.tsx"
Cohesion: 0.10
Nodes (36): classroomRow(), MOCK_BUILDINGS, MOCK_ROOMS, room(), AddRoomDialogProps, EditRoomDialogProps, TODO: PATCH the room through the orval client (multipart when the photo…, TODO: replace with the orval client for buildings and rooms (no-store, filtered… (+28 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "getUniversityDashboard.ts"
Cohesion: 0.16
Nodes (18): metadata, Page(), MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE, buildFacilityRequestsMock(), buildReservationsMock() (+10 more)

### Community 37 - "ReservationLogCalendar.tsx"
Cohesion: 0.23
Nodes (13): monthName(), buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef (+5 more)

### Community 38 - "Button.tsx"
Cohesion: 0.10
Nodes (28): @hookform/resolvers, react-hook-form, CAPS_LABEL_CLASS, FieldProps, INPUT_CLASS, SelectInputProps, ButtonProps, VARIANT_STYLES (+20 more)

### Community 39 - "ReservationType"
Cohesion: 0.14
Nodes (18): UniversityDashboardData, UniversityReservationsProps, ADMIN_UNIVERSITAS_ROUTES, ReservationHistoryTableProps, ApproveReservationDialogProps, getReservationRequests(), TODO: replace with the orval client (no-store, filtered by scope, type, and…, ReservationCandidates (+10 more)

### Community 40 - "toWibDateKey"
Cohesion: 0.12
Nodes (24): toWibDateKey(), wibToIso(), buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_BUILDINGS, MOCK_ROOM_RULES, MOCK_SPORTS_HALL, MOCK_VEHICLES (+16 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "PublicDamageReportForm.tsx"
Cohesion: 0.26
Nodes (9): LaporContent(), metadata, Page(), ChannelIcon(), PublicDamageReportForm(), PublicDamageReportFormProps, TODO: kirei-api POST /api/public/reports (multipart/form-data, tanpa login +…, SubmitOutcome (+1 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "lecturer-schedule/actions.ts"
Cohesion: 0.27
Nodes (8): sksRangeToTimes(), entry(), schedules, setMockLecturerSchedule(), saveLecturerSchedule(), SaveScheduleResult, lecturerScheduleInputSchema, Weekday

### Community 46 - "reservations.ts"
Cohesion: 0.12
Nodes (19): BOOKER, buildReservationHistoryMock(), FACILITY_ROWS, FacilityRow, PAST_STATUSES, PAST_TRIPS, pastRecords(), PURPOSES (+11 more)

### Community 47 - "query.ts"
Cohesion: 0.14
Nodes (23): metadata, Page(), ORMAWA_ROUTES, ACTIVE_STATUSES, buildHistoryResult(), ReservationHistoryResult, DEFAULT_HISTORY_QUERY, first() (+15 more)

### Community 48 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+7 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "next"
Cohesion: 0.13
Nodes (22): nextConfig, next, metadata, Page(), metadata, Page(), metadata, Page() (+14 more)

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 53 - "sportsHallSlots.ts"
Cohesion: 0.39
Nodes (7): buildSlots(), SlotSelection, slotStatus, toggleSlot(), toMinutes(), toTime(), upcomingDays()

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

### Community 64 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 67 - "@testing-library/react"
Cohesion: 0.26
Nodes (8): @testing-library/react, Layout(), Layout(), Breadcrumb(), BreadcrumbItem, BreadcrumbProps, InternalReservationBreadcrumb(), CreateReservationBreadcrumb()

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "ReservationSteps.tsx"
Cohesion: 0.33
Nodes (5): DATE, ReservationStep, STEPS_BY_TYPE, TIME, UPLOAD

### Community 70 - "[tipe]/persetujuan/page.tsx"
Cohesion: 0.17
Nodes (19): generateMetadata(), generateStaticParams, Page(), Page(), generateStaticParams, Page(), generateMetadata(), generateStaticParams (+11 more)

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, exceljs, framer-motion, @hookform/resolvers, jspdf, jspdf-autotable, next, qrcode (+4 more)

### Community 74 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 75 - "wibDateTime"
Cohesion: 0.27
Nodes (7): metadata, Page(), buildDashboardMock(), wibDateTime(), getUserDashboard(), TODO: replace with the orval client for the dashboard endpoint (no-store) once…, UserDashboardData

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 77 - "auth/actions.ts"
Cohesion: 0.06
Nodes (63): Admin Universitas, metadata, Page(), metadata, Page(), metadata, Page(), metadata (+55 more)

### Community 78 - "OrmawaShell.tsx"
Cohesion: 0.08
Nodes (37): AdminGedungLayout(), AdminUniversitasLayout(), OperatorLayout(), OrmawaLayout(), metadata, Page(), isActive(), NavItem (+29 more)

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
Nodes (36): 3. Titik Integrasi Mock untuk Prototipe, VehicleFleetInfo(), VehicleFleetInfoProps, VehicleManagementProps, isRoomBooked(), rangesOverlap(), VehicleReservationOptions, HOLDING_STATUSES (+28 more)

### Community 116 - "ReservationTable.tsx"
Cohesion: 0.18
Nodes (20): B. Pengelola (`admin_fakultas` dan `admin_universitas`), hardCopyLabel(), isHardCopySubmitted(), HardCopyBadge(), HardCopyBadgeProps, ApproveReservationDialog(), RejectReservationDialog(), DEFAULT_LAYOUT (+12 more)

### Community 117 - "RoomReservationForm.tsx"
Cohesion: 0.10
Nodes (35): ROOM_CLOSE_TIME, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, SksSlot, crossFacultyApprover(), defaultSchedule(), roomBookingsOnDay() (+27 more)

### Community 118 - "StaffManagement.tsx"
Cohesion: 0.17
Nodes (20): MOCK_STAFF, TODO: replace with the orval client for staff (no-store)., ROLES, StaffDialog(), StaffDialogProps, toInput(), TODO: POST a new driver or PATCH an existing one through the orval client., StaffManagementProps (+12 more)

### Community 120 - "ContactPage.tsx"
Cohesion: 0.29
Nodes (7): metadata, Page(), CONTACT, TODO: replace the Figma placeholders with the real Sarpras Udinus contacts…, ChannelIcon(), ContactPage(), ContactPageProps

### Community 121 - "Fakultas"
Cohesion: 0.29
Nodes (7): MOCK_FAKULTAS, UniversityDashboardProps, FakultasFilterProps, FAKULTAS_PARAM, SearchParams, TODO: replace with the orval client for faculties (rarely changes, so it may be…, Fakultas

### Community 122 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 123 - "VehicleManagement.tsx"
Cohesion: 0.13
Nodes (21): TABLE, TABLE_CELL, TABLE_HEAD_CELL, TABLE_ROW, usePagination(), Page, paginate(), VehicleDialogProps (+13 more)

### Community 125 - "date.ts"
Cohesion: 0.10
Nodes (35): LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, DateInput, formatDateLongWIB(), formatDateShortWIB() (+27 more)

### Community 126 - "gedung/ruangan/page.tsx"
Cohesion: 0.38
Nodes (5): metadata, Page(), metadata, Page(), getRooms()

### Community 128 - "2. Struktur dan fungsi folder"
Cohesion: 0.09
Nodes (21): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE (+13 more)

### Community 132 - "ReportQrDialog.tsx"
Cohesion: 0.39
Nodes (6): qrcode, buildPublicReportUrl(), generateReportQrDataUrl(), QrResult, ReportQrDialog(), ReportQrDialogProps

### Community 133 - "gedung/dashboard/page.tsx"
Cohesion: 0.31
Nodes (5): metadata, Page(), buildReportsMock(), ADMIN_GEDUNG_ROUTES, getAdminDashboard()

### Community 138 - "FaqPage.tsx"
Cohesion: 0.29
Nodes (7): metadata, Page(), DOSEN_ANSWERS, DOSEN_FAQ_ITEMS, FAQ_ITEMS, FaqItem, FaqPage()

### Community 139 - "ReservationTrendCard.tsx"
Cohesion: 0.24
Nodes (8): LineChart(), LineChartProps, LineSeries, niceMax(), WeeklyCounts, ReservationTrendCardProps, TrendView, VIEWS

### Community 140 - "getReservationCandidates"
Cohesion: 0.33
Nodes (8): metadata, Page(), metadata, Page(), mockRoomsInScope(), RESERVATION_TAB_LINKS, getReservationCandidates(), ReservationManagement()

### Community 146 - "2. Alur Tindakan Pengguna (User Flow)"
Cohesion: 0.20
Nodes (8): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin)

## Knowledge Gaps
- **744 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+739 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 903 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `ComingSoon.tsx`, `SportsHallReservationForm.tsx`, `gedung/dashboard/page.tsx`, `UserManagement.tsx`, `FaqPage.tsx`, `OperatorFloorPage.tsx`, `getReservationCandidates`, `ReservationTypePicker.tsx`, `types/reservation.ts`, `AddRoomDialog.tsx`, `reservationStore.ts`, `AnnouncementManager.tsx`, `UserReportList.tsx`, `DraftCard.tsx`, `UserDashboard.tsx`, `getLecturerSchedule.ts`, `package.json`, `Card`, `react`, `UniversityDashboard.tsx`, `MaskIcon`, `RoomManager.tsx`, `getUniversityDashboard.ts`, `ReservationLogCalendar.tsx`, `Button.tsx`, `ReservationType`, `toWibDateKey`, `PublicDamageReportForm.tsx`, `reservations.ts`, `query.ts`, `@testing-library/react`, `ReservationSteps.tsx`, `[tipe]/persetujuan/page.tsx`, `wibDateTime`, `auth/actions.ts`, `OrmawaShell.tsx`, `ReservationTable.tsx`, `RoomReservationForm.tsx`, `StaffManagement.tsx`, `ContactPage.tsx`, `Fakultas`, `VehicleManagement.tsx`, `date.ts`, `gedung/ruangan/page.tsx`?**
  _High betweenness centrality (0.145) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `Button`, `ComplaintForm.tsx`, `SportsHallReservationForm.tsx`, `AddUserDialog.tsx`, `ReportQrDialog.tsx`, `TimeWheel.tsx`, `reportExport.ts`, `UserManagement.tsx`, `AddRoomDialog.tsx`, `OperatorFloorPage.tsx`, `ReservationTrendCard.tsx`, `ReportFilterForm.tsx`, `reservationStore.ts`, `AnnouncementManager.tsx`, `UserReportList.tsx`, `DraftCard.tsx`, `package.json`, `staffStore.ts`, `MaskIcon`, `createReservation.ts`, `RoomManager.tsx`, `ReservationLogCalendar.tsx`, `Button.tsx`, `toWibDateKey`, `PublicDamageReportForm.tsx`, `query.ts`, `Toast.tsx`, `auth/actions.ts`, `OrmawaShell.tsx`, `VehicleReservationForm.tsx`, `ReservationTable.tsx`, `RoomReservationForm.tsx`, `StaffManagement.tsx`, `Fakultas`, `VehicleManagement.tsx`, `date.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `2. Struktur dan fungsi folder`, `ComplaintForm.tsx`, `ReportQrDialog.tsx`, `TimeWheel.tsx`, `scheduleCsv.ts`, `reportExport.ts`, `UserManagement.tsx`, `FaqPage.tsx`, `OperatorFloorPage.tsx`, `types/reservation.ts`, `AddRoomDialog.tsx`, `form-errors.ts`, `reservationStore.ts`, `AnnouncementManager.tsx`, `UserReportList.tsx`, `damageReportSchema.ts`, `DraftCard.tsx`, `schema.ts`, `package.json`, `react`, `staffStore.ts`, `MaskIcon`, `createReservation.ts`, `RoomManager.tsx`, `ReservationLogCalendar.tsx`, `ReservationType`, `toWibDateKey`, `PublicDamageReportForm.tsx`, `query.ts`, `sportsHallSlots.ts`, `@testing-library/react`, `Toast.tsx`, `auth/actions.ts`, `sks.ts`, `VehicleReservationForm.tsx`, `ReservationTable.tsx`, `RoomReservationForm.tsx`, `StaffManagement.tsx`, `Fakultas`, `VehicleManagement.tsx`, `date.ts`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _744 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SportsHallReservationForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1294685990338164 - nodes in this community are weakly interconnected._
- **Should `PageSkeleton` be split into smaller, more focused modules?**
  _Cohesion score 0.09986504723346828 - nodes in this community are weakly interconnected._
- **Should `UserManagement.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07955596669750231 - nodes in this community are weakly interconnected._