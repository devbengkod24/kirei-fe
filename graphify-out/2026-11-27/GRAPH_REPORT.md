# Graph Report - kirei-fe  (2026-11-27)

## Corpus Check
- 481 files · ~265,732 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2437 nodes · 6973 edges · 141 communities (115 shown, 26 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 111 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d4c47d9d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- UserDashboard.tsx
- OperatorFloorPage.tsx
- ComplaintForm.tsx
- RoomReservationForm.tsx
- AddUserDialog.tsx
- TimeWheel.tsx
- scheduleCsv.ts
- PageSkeleton
- OrmawaShell.tsx
- ReservationRecord
- facility.ts
- slots.ts
- ReservationTable.tsx
- vitest
- draftStorage.ts
- ReportFilterForm.tsx
- contrast-check.py
- toWibDateKey
- ReservationOwner
- UserReportList.tsx
- getUniversityDashboard.ts
- DraftCard.tsx
- DeadlineTimer.tsx
- schema.ts
- getCurrentUser
- package.json
- mutator.test.ts
- react
- sportsHallSlots.ts
- getReservationCandidates
- auth/actions.ts
- content.ts
- createReservation.ts
- RoomManager.tsx
- compilerOptions
- Accessibility Code Patterns
- reservations.ts
- UniversityDashboard.tsx
- Field.tsx
- ReservationTypePicker.tsx
- date.ts
- Tone & Voice
- kirei-fe
- wibDateTime
- antislop-layoutmobile
- types/reservation.ts
- PublicDamageReportForm.tsx
- query.ts
- devDependencies
- What You Must Do When Invoked
- AnnouncementManager.tsx
- AdminDashboardSkeleton
- ReservationFormSkeleton
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- admin-gedung/nav.ts
- Group 1: Hard Gate (absolute, no exceptions)
- Comments That Add Nothing
- ScheduleManager.tsx
- requireRole
- reservationTime.ts
- KIREI FE
- dependencies
- scripts
- RoleShell.tsx
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
- Button
- getReservationOptions.ts
- StaffManagement.tsx
- next
- DraftReservationsPage.tsx
- CreateAnnouncementDialog.tsx
- eslint.config.mjs
- ReservationLogCalendar.tsx
- getOperatorFloor.ts
- ReservationHistoryTable.tsx
- Avatar
- Card
- 2. Struktur dan fungsi folder
- requireRole.ts
- FaqPage.tsx
- ReportQrDialog.tsx
- ReservationTrendCard.tsx
- sksMatrix.ts
- vehicleSchema.ts
- 2. Alur Tindakan Pengguna (User Flow)
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
- `Client API (orval)` --references--> `customFetch()`  [INFERRED]
  docs/architecture.md → src/lib/api/mutator.ts

## Import Cycles
- None detected.

## Communities (141 total, 26 thin omitted)

### Community 0 - "UserDashboard.tsx"
Cohesion: 0.21
Nodes (12): DashboardHero(), DashboardHeroProps, LatestAnnouncementsCard(), ReservationTotal(), ReservationTotalProps, TodayReservationCard(), TodayReservationCardProps, UserDashboard() (+4 more)

### Community 1 - "OperatorFloorPage.tsx"
Cohesion: 0.09
Nodes (40): Operator, MaskIcon(), MaskIconProps, useMediaQuery(), formatDateLongWIB(), wibToIso(), dayText(), ScheduleManager() (+32 more)

### Community 2 - "ComplaintForm.tsx"
Cohesion: 0.13
Nodes (19): metadata, Page(), CONTACT, TODO: replace the Figma placeholders with the real Sarpras Udinus contacts…, ComplaintFormProps, DEFAULTS, CATEGORIES, COMPLAINT_FIELD_MAP (+11 more)

### Community 3 - "RoomReservationForm.tsx"
Cohesion: 0.11
Nodes (38): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, CAPS_LABEL_CLASS, FILTER_INPUT_CLASS, FILTER_SELECT_CLASS, FilterField(), FilterFieldProps, toSportsHallReservationRequest() (+30 more)

### Community 4 - "AddUserDialog.tsx"
Cohesion: 0.07
Nodes (49): @hookform/resolvers, metadata, Page(), MOCK_ACCOUNTS, ADMIN_GEDUNG, DOSEN, MOCK_MANAGED_USERS, OPERATORS (+41 more)

### Community 5 - "TimeWheel.tsx"
Cohesion: 0.26
Nodes (14): clampTime(), formatPart, HourRange, joinTime(), pad(), parseTypedPart(), splitTime(), stepPart() (+6 more)

### Community 6 - "scheduleCsv.ts"
Cohesion: 0.09
Nodes (30): sksRangeToTimes(), parseCsv(), entry(), getMockLecturerSchedule(), getMockLecturerSchedules(), schedules, setMockLecturerSchedule(), saveLecturerSchedule() (+22 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (20): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+12 more)

### Community 8 - "OrmawaShell.tsx"
Cohesion: 0.33
Nodes (8): OrmawaLayout(), hasDrafts(), DOSEN_NAV, NOT_FOR_DOSEN, ORMAWA_NAV, BorrowerShell(), OrmawaShell(), RoleShell()

### Community 9 - "ReservationRecord"
Cohesion: 0.13
Nodes (18): @testing-library/react, Layout(), Layout(), Breadcrumb(), BreadcrumbItem, BreadcrumbProps, InternalReservationBreadcrumb(), CreateReservationBreadcrumb() (+10 more)

### Community 10 - "facility.ts"
Cohesion: 0.09
Nodes (35): Admin Gedung (role `admin_fakultas`), SKS_SLOTS, SksSlot, displayTime(), LEGEND, SksScheduleMatrix(), SksScheduleMatrixProps, SlotCard() (+27 more)

### Community 11 - "slots.ts"
Cohesion: 0.14
Nodes (27): buildHourGrid(), displayTime(), FloorTimeline(), FloorTimelineProps, LEGEND, pad(), px(), rangeLabel() (+19 more)

### Community 12 - "ReservationTable.tsx"
Cohesion: 0.12
Nodes (26): Badge(), CardProps, PAGE_SIZE_OPTIONS, Pagination(), PaginationProps, TABLE, TABLE_CELL, TABLE_HEAD_CELL (+18 more)

### Community 13 - "vitest"
Cohesion: 0.17
Nodes (9): ref_node_url, vitest, cookieStore, SESSION_COOKIE, findMockAccount(), MOCK_ADMIN_GEDUNG, MOCK_ADMIN_UNIVERSITAS, MOCK_CURRENT_USER (+1 more)

### Community 14 - "draftStorage.ts"
Cohesion: 0.23
Nodes (12): DRAFT_LETTER_HOURS, draftsSnapshot(), DraftStorage, listeners, parseDrafts(), readDrafts(), removeDraft(), saveDraft() (+4 more)

### Community 15 - "ReportFilterForm.tsx"
Cohesion: 0.15
Nodes (21): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), isInPeriod(), shiftKey(), TIME_PERIOD_OPTIONS (+13 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "toWibDateKey"
Cohesion: 0.06
Nodes (63): Simulasi alur reservasi (mock store), metadata, Page(), toWibDateKey(), buildDashboardMock(), LiveUniversityDashboard(), ORMAWA_ROUTES, LiveAdminDashboard() (+55 more)

### Community 18 - "ReservationOwner"
Cohesion: 0.20
Nodes (14): InternalReservationFormProps, DraftListProps, DraftDetails, BookingMode, ReservationFormPageProps, ReservationLinks, ReservationSubmitDialogProps, RoomReservationFormProps (+6 more)

### Community 19 - "UserReportList.tsx"
Cohesion: 0.19
Nodes (20): formatTimeWIB(), LatestReportsCardProps, ExportReportButtons(), ExportReportButtonsProps, isDefaultReportFilter(), REPORT_CATEGORY_LABEL, REPORTER_TYPE_LABEL, ReportDetailDialog() (+12 more)

### Community 20 - "getUniversityDashboard.ts"
Cohesion: 0.15
Nodes (19): metadata, Page(), MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE, buildReportsMock(), buildReservationsMock() (+11 more)

### Community 21 - "DraftCard.tsx"
Cohesion: 0.17
Nodes (19): Loading(), formatTimeRangeWIB(), cancelDraft(), DraftActionResult, submitDraft(), DraftCard(), DraftCardProps, Field() (+11 more)

### Community 22 - "DeadlineTimer.tsx"
Cohesion: 0.27
Nodes (9): Countdown, DeadlineInput, getCountdown(), NOW, useCountdown(), DeadlineTimer(), DeadlineTimerProps, display() (+1 more)

### Community 23 - "schema.ts"
Cohesion: 0.06
Nodes (43): LETTER_MAX_SIZE_MB, ORGANISATION_MIN_DAYS_AHEAD, ROOM_CLOSE_TIME, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, addDaysToKey(), crossFacultyApprover() (+35 more)

### Community 24 - "getCurrentUser"
Cohesion: 0.28
Nodes (11): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+3 more)

### Community 25 - "package.json"
Cohesion: 0.11
Nodes (17): name, private, version, exceljs, jsdom, jspdf, jspdf-autotable, orval (+9 more)

### Community 26 - "mutator.test.ts"
Cohesion: 0.24
Nodes (7): API_URL, CSRF_METHODS, customFetch(), readBody(), readXsrfToken(), Result, toApiUrl()

### Community 27 - "react"
Cohesion: 0.15
Nodes (16): react, ResultDialog(), ResultDialogProps, ModalProps, WIDTH, useModalDialog(), changePassword(), MIN_PASSWORD_LENGTH (+8 more)

### Community 28 - "sportsHallSlots.ts"
Cohesion: 0.36
Nodes (8): rangesOverlap(), buildSlots(), SlotSelection, slotStatus, toggleSlot(), toMinutes(), toTime(), upcomingDays()

### Community 29 - "getReservationCandidates"
Cohesion: 0.38
Nodes (7): metadata, Page(), metadata, Page(), RESERVATION_TAB_LINKS, getReservationCandidates(), ReservationManagement()

### Community 30 - "auth/actions.ts"
Cohesion: 0.19
Nodes (17): applyFormErrors(), FormErrorEntry, isLaravelValidationError(), LaravelValidationError, fieldMap, toFormErrors(), login(), LoginResult (+9 more)

### Community 31 - "content.ts"
Cohesion: 0.06
Nodes (50): framer-motion, src_app_globals, inter, metadata, poppins, metadata, Page(), AppBrand() (+42 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.13
Nodes (17): Client API (orval), CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., TODO: kirei-api: backend wajib memverifikasi role admin_universitas /…, ReservationListing, ReservationRequest, status() (+9 more)

### Community 33 - "RoomManager.tsx"
Cohesion: 0.07
Nodes (52): Toast(), ToastProps, ROOM_PHOTO_MAX_SIZE_MB, classroomRow(), MOCK_BUILDINGS, MOCK_ROOMS, room(), AddRoomDialogProps (+44 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "reservations.ts"
Cohesion: 0.12
Nodes (21): BOOKER, buildFacilityRequestsMock(), buildReservationHistoryMock(), FACILITY_ROWS, FacilityRow, PAST_STATUSES, PAST_TRIPS, pastRecords() (+13 more)

### Community 37 - "UniversityDashboard.tsx"
Cohesion: 0.30
Nodes (9): TypeSummary, ReservationTrendCard(), TypeSummaryCard(), TypeSummaryCardProps, TONE, UniversityDashboard(), STAT_TONES, StatTileProps (+1 more)

### Community 38 - "Field.tsx"
Cohesion: 0.10
Nodes (32): react-hook-form, Field(), FieldProps, INPUT_CLASS, SelectInput(), SelectInputProps, Modal(), ImportScheduleDialog() (+24 more)

### Community 39 - "ReservationTypePicker.tsx"
Cohesion: 0.16
Nodes (11): metadata, Page(), metadata, Page(), internalReservationRoute(), createReservationFor(), DRAWINGS, ReservationTypeIllustration() (+3 more)

### Community 40 - "date.ts"
Cohesion: 0.31
Nodes (12): DateInput, formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatDayRange(), formatDayRangeWIB(), formatFullDateWIB(), formatRelativeDayWIB() (+4 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "wibDateTime"
Cohesion: 0.43
Nodes (4): ReportSeedRow, ROWS, wibDateTime(), ReportCategory

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "types/reservation.ts"
Cohesion: 0.15
Nodes (19): UniversityReservationsProps, ADMIN_UNIVERSITAS_ROUTES, TodayReservationsCardProps, getReservationRequests(), TODO: replace with the orval client (no-store, filtered by scope, type, and…, ReservationCandidates, RejectReservationDialogProps, HISTORY_STATUSES (+11 more)

### Community 46 - "PublicDamageReportForm.tsx"
Cohesion: 0.05
Nodes (62): Mode data: dengan atau tanpa data dummy, zod, LaporContent(), metadata, Page(), REPORT_PHOTO_MAX_SIZE_MB, LiveData, useLiveData() (+54 more)

### Community 47 - "query.ts"
Cohesion: 0.17
Nodes (21): metadata, Page(), ActiveReservationList(), ACTIVE_STATUSES, buildHistoryResult(), ReservationHistoryResult, DEFAULT_HISTORY_QUERY, first() (+13 more)

### Community 48 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+7 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "AnnouncementManager.tsx"
Cohesion: 0.17
Nodes (16): metadata, Page(), metadata, Page(), metadata, Page(), Popover(), PopoverProps (+8 more)

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

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "ScheduleManager.tsx"
Cohesion: 0.15
Nodes (19): ImportScheduleDialogProps, ScheduleImportFormat, IMPORT_OPTIONS, ScheduleManagerProps, buildingsSchema, floorPlanRoomSchema, lecturerSchedulesSchema, LIVE_NAMES (+11 more)

### Community 70 - "requireRole"
Cohesion: 0.11
Nodes (29): metadata, Page(), generateMetadata(), generateStaticParams, Page(), Page(), generateStaticParams, Page() (+21 more)

### Community 71 - "reservationTime.ts"
Cohesion: 0.60
Nodes (4): isWholeDayType(), reservationDateLong(), reservationDateShort(), Timed

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "dependencies"
Cohesion: 0.17
Nodes (12): dependencies, exceljs, framer-motion, @hookform/resolvers, jspdf, jspdf-autotable, next, qrcode (+4 more)

### Community 74 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 75 - "RoleShell.tsx"
Cohesion: 0.21
Nodes (11): AdminUniversitasLayout(), isActive(), NavItem, NavList(), Shell(), ShellProps, AdminAvatar(), AdminUniversitasShell() (+3 more)

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 77 - "laravel.ts"
Cohesion: 0.30
Nodes (11): callLaravel(), decode(), fetchApiUser(), LaravelResponse, parseApiUser(), parseSetCookie(), userSchema, apiUrl() (+3 more)

### Community 78 - "AdminGedungShell.tsx"
Cohesion: 0.32
Nodes (7): AdminGedungLayout(), OperatorLayout(), AdminAvatar(), AdminGedungShell(), OperatorAccount(), OperatorShell(), CurrentUserAvatarPlaceholder()

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
Nodes (36): 3. Titik Integrasi Mock untuk Prototipe, VehicleFleetInfo(), VehicleFleetInfoProps, VehicleManagementProps, toVehicleReservationRequest(), VehicleReservationOptions, FieldError(), SummaryRow() (+28 more)

### Community 116 - "Button"
Cohesion: 0.14
Nodes (21): B. Pengelola (`admin_fakultas` dan `admin_universitas`), RouteError(), RouteErrorProps, Button, ButtonProps, VARIANT_STYLES, hardCopyLabel(), isHardCopySubmitted() (+13 more)

### Community 117 - "getReservationOptions.ts"
Cohesion: 0.13
Nodes (26): metadata, Page(), metadata, Page(), getDataMode, buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_BUILDINGS (+18 more)

### Community 118 - "StaffManagement.tsx"
Cohesion: 0.13
Nodes (25): MOCK_STAFF, TODO: replace with the orval client for staff (no-store)., ROLES, StaffDialog(), StaffDialogProps, toInput(), TODO: POST a new driver or PATCH an existing one through the orval client., StaffManagement() (+17 more)

### Community 119 - "next"
Cohesion: 0.14
Nodes (12): nextConfig, next, metadata, Page(), metadata, Page(), metadata, Page() (+4 more)

### Community 120 - "DraftReservationsPage.tsx"
Cohesion: 0.60
Nodes (3): metadata, Page(), DraftReservationsPage()

### Community 121 - "CreateAnnouncementDialog.tsx"
Cohesion: 0.18
Nodes (13): BadgeProps, BadgeTone, SIZE_STYLES, TONE_STYLES, ANNOUNCEMENT_CATEGORY, ANNOUNCEMENT, CreateAnnouncementDialogProps, Errors (+5 more)

### Community 122 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 123 - "ReservationLogCalendar.tsx"
Cohesion: 0.23
Nodes (13): monthName(), buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef (+5 more)

### Community 124 - "getOperatorFloor.ts"
Cohesion: 0.19
Nodes (12): metadata, Page(), buildClassSchedulesMock(), buildOperatorReservationsMock(), MOCK_OPERATOR_FLOOR, RESERVATION, SCHEDULE, getOperatorFloor() (+4 more)

### Community 125 - "ReservationHistoryTable.tsx"
Cohesion: 0.11
Nodes (30): LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, formatDayRangeShortWIB(), formatTimeSpanWIB(), ExportHistoryButtons() (+22 more)

### Community 126 - "Avatar"
Cohesion: 0.20
Nodes (11): metadata, Page(), Avatar(), AvatarProps, initialsOf(), OperatorAccountBar(), LogoutButton(), ProfilePage() (+3 more)

### Community 127 - "Card"
Cohesion: 0.33
Nodes (10): Card(), AdminDashboard(), AdminDashboardLinks, AdminDashboardProps, AdminDashboardData, LatestReportsCard(), StatTile(), TodayReservationsCard() (+2 more)

### Community 128 - "2. Struktur dan fungsi folder"
Cohesion: 0.13
Nodes (14): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Admin Universitas (+6 more)

### Community 129 - "requireRole.ts"
Cohesion: 0.16
Nodes (24): metadata, Page(), quickLogin(), startSession(), getSessionUser, authMode, getDemoAccounts(), homeFor() (+16 more)

### Community 130 - "FaqPage.tsx"
Cohesion: 0.29
Nodes (7): metadata, Page(), DOSEN_ANSWERS, DOSEN_FAQ_ITEMS, FAQ_ITEMS, FaqItem, FaqPage()

### Community 132 - "ReportQrDialog.tsx"
Cohesion: 0.39
Nodes (6): qrcode, buildPublicReportUrl(), generateReportQrDataUrl(), QrResult, ReportQrDialog(), ReportQrDialogProps

### Community 133 - "ReservationTrendCard.tsx"
Cohesion: 0.24
Nodes (8): LineChart(), LineChartProps, LineSeries, niceMax(), WeeklyCounts, ReservationTrendCardProps, TrendView, VIEWS

### Community 138 - "sksMatrix.ts"
Cohesion: 0.33
Nodes (8): toWibTimeKey(), buildSksMatrix(), itemsForRoomSlot(), overlapsRange(), reservationFitsSlot(), scheduleFitsSlot(), RESERVATION, SCHEDULE

### Community 139 - "vehicleSchema.ts"
Cohesion: 0.27
Nodes (10): VehicleDialogProps, createVehicleSchema(), normalName(), searchVehicles(), issues(), valid, VEHICLES, VehicleInput (+2 more)

### Community 140 - "2. Alur Tindakan Pengguna (User Flow)"
Cohesion: 0.20
Nodes (8): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin)

### Community 146 - "Role dan Halaman"
Cohesion: 0.15
Nodes (13): Admin Universitas, Ormawa dan dosen, Override slot oleh Admin Universitas, Perbedaan dengan Figma V3, Publik dan autentikasi, Ringkasan, Role dan Halaman, SegmentedNav() (+5 more)

## Knowledge Gaps
- **748 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+743 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 910 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `UserDashboard.tsx`, `requireRole.ts`, `ComplaintForm.tsx`, `FaqPage.tsx`, `AddUserDialog.tsx`, `OperatorFloorPage.tsx`, `scheduleCsv.ts`, `RoomReservationForm.tsx`, `ReservationRecord`, `facility.ts`, `ReservationTable.tsx`, `vitest`, `toWibDateKey`, `Role dan Halaman`, `UserReportList.tsx`, `getUniversityDashboard.ts`, `DraftCard.tsx`, `getCurrentUser`, `package.json`, `react`, `getReservationCandidates`, `auth/actions.ts`, `content.ts`, `RoomManager.tsx`, `reservations.ts`, `UniversityDashboard.tsx`, `Field.tsx`, `ReservationTypePicker.tsx`, `types/reservation.ts`, `PublicDamageReportForm.tsx`, `query.ts`, `AnnouncementManager.tsx`, `admin-gedung/nav.ts`, `requireRole`, `RoleShell.tsx`, `laravel.ts`, `VehicleReservationForm.tsx`, `Button`, `getReservationOptions.ts`, `StaffManagement.tsx`, `DraftReservationsPage.tsx`, `CreateAnnouncementDialog.tsx`, `ReservationLogCalendar.tsx`, `getOperatorFloor.ts`, `ReservationHistoryTable.tsx`, `Avatar`, `Card`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `requireRole.ts`, `OperatorFloorPage.tsx`, `ComplaintForm.tsx`, `AddUserDialog.tsx`, `ReservationTrendCard.tsx`, `ReportQrDialog.tsx`, `RoomReservationForm.tsx`, `OrmawaShell.tsx`, `TimeWheel.tsx`, `facility.ts`, `ReservationTable.tsx`, `ReportFilterForm.tsx`, `toWibDateKey`, `ReservationOwner`, `UserReportList.tsx`, `DraftCard.tsx`, `DeadlineTimer.tsx`, `package.json`, `content.ts`, `RoomManager.tsx`, `Field.tsx`, `PublicDamageReportForm.tsx`, `query.ts`, `AnnouncementManager.tsx`, `ScheduleManager.tsx`, `requireRole`, `RoleShell.tsx`, `AdminGedungShell.tsx`, `VehicleReservationForm.tsx`, `Button`, `StaffManagement.tsx`, `CreateAnnouncementDialog.tsx`, `ReservationLogCalendar.tsx`, `ReservationHistoryTable.tsx`, `Avatar`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `OperatorFloorPage.tsx`, `FaqPage.tsx`, `ComplaintForm.tsx`, `AddUserDialog.tsx`, `ReportQrDialog.tsx`, `scheduleCsv.ts`, `TimeWheel.tsx`, `ReservationRecord`, `sksMatrix.ts`, `vehicleSchema.ts`, `ReservationTable.tsx`, `slots.ts`, `draftStorage.ts`, `ReportFilterForm.tsx`, `facility.ts`, `toWibDateKey`, `UserReportList.tsx`, `getUniversityDashboard.ts`, `DeadlineTimer.tsx`, `schema.ts`, `package.json`, `mutator.test.ts`, `react`, `sportsHallSlots.ts`, `auth/actions.ts`, `content.ts`, `createReservation.ts`, `RoomManager.tsx`, `Field.tsx`, `date.ts`, `types/reservation.ts`, `PublicDamageReportForm.tsx`, `query.ts`, `ScheduleManager.tsx`, `requireRole`, `reservationTime.ts`, `laravel.ts`, `sks.ts`, `VehicleReservationForm.tsx`, `StaffManagement.tsx`, `CreateAnnouncementDialog.tsx`, `ReservationLogCalendar.tsx`, `getOperatorFloor.ts`, `ReservationHistoryTable.tsx`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _748 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `OperatorFloorPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0946938775510204 - nodes in this community are weakly interconnected._
- **Should `ComplaintForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12923076923076923 - nodes in this community are weakly interconnected._
- **Should `RoomReservationForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11304347826086956 - nodes in this community are weakly interconnected._