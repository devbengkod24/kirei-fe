# Graph Report - kirei-fe  (2026-11-20)

## Corpus Check
- 443 files · ~252,579 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 8, .example 1, .csv 1)

## Summary
- 2240 nodes · 6306 edges · 133 communities (113 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 106 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fe4a9772`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- session.ts
- OperatorFloorPage.tsx
- reservationStore.ts
- RoomReservationForm
- FloorPlanEditor.tsx
- TimeWheel.tsx
- scheduleCsv.ts
- PageSkeleton
- EditRoomDialog.tsx
- AddUserDialog.tsx
- StaffManagement.tsx
- FloorTimeline.tsx
- VehicleCrewPanel.tsx
- InternalReservationBreadcrumb.tsx
- CreateReservationPanel.tsx
- VehicleReservationForm.tsx
- contrast-check.py
- zod
- ReportFilterForm.tsx
- react
- timelineDetail.ts
- DraftCard.tsx
- Card
- schema.ts
- pengguna/page.tsx
- package.json
- date.ts
- dataMode.ts
- UniversityDashboard.tsx
- StaffDialog.tsx
- 2. Struktur dan fungsi folder
- content.ts
- createReservation.ts
- RoomManager.tsx
- compilerOptions
- Accessibility Code Patterns
- toWibDateKey
- ReservationLogCalendar.tsx
- Button
- getReservationCandidates
- ScheduleManager.tsx
- Tone & Voice
- kirei-fe
- getCurrentUser.ts
- antislop-layoutmobile
- useMockReservations
- DraftReservationsPage.tsx
- ReservationRecord
- devDependencies
- What You Must Do When Invoked
- requireRole
- AdminDashboardSkeleton
- ReservationFormSkeleton
- ComplaintForm.tsx
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts
- What You Must Do When Invoked
- auth/actions.ts
- Group 1: Hard Gate (absolute, no exceptions)
- SportsHallReservationForm.tsx
- Comments That Add Nothing
- rooms.ts
- [tipe]/persetujuan/page.tsx
- LoginPage.tsx
- KIREI FE
- dependencies
- scripts
- RoomReservationForm.tsx
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
- RoleShell.tsx
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
- vehicleAvailability.ts
- types/reservation.ts
- facility.ts
- staffStore.ts
- DeadlineTimer.tsx
- ContactPage.tsx
- next
- eslint.config.mjs
- mutator.test.ts
- FaqPage.tsx
- Role dan Halaman
- OrmawaShell.tsx
- app/layout.tsx
- QuickLogin.tsx
- OperatorShell.tsx
- ProfilePage.tsx
- Field.tsx
- vitest

## God Nodes (most connected - your core abstractions)
1. `next` - 114 edges
2. `toWibDateKey()` - 78 edges
3. `react` - 76 edges
4. `Card()` - 67 edges
5. `Button` - 65 edges
6. `vitest` - 57 edges
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
- `Mode data: dengan atau tanpa data dummy` --references--> `useLiveData()`  [INFERRED]
  docs/architecture.md → src/hooks/useLiveData.ts
- `Mode data: dengan atau tanpa data dummy` --references--> `useLiveState()`  [INFERRED]
  docs/architecture.md → src/hooks/useLiveData.ts

## Import Cycles
- None detected.

## Communities (133 total, 20 thin omitted)

### Community 0 - "session.ts"
Cohesion: 0.16
Nodes (16): cookieStore, laravelSessionCookie(), LOGIN_PATH, ROLE_HOME, SESSION_COOKIE, userFromSession(), findMockAccount(), findMockUserById() (+8 more)

### Community 1 - "OperatorFloorPage.tsx"
Cohesion: 0.36
Nodes (10): AssignedFloor(), displayTime(), EmptyState(), FloorAvailability(), OperatorFloorPage(), toStoredOperatorBooking(), toggleRoom(), itemKey() (+2 more)

### Community 2 - "reservationStore.ts"
Cohesion: 0.13
Nodes (24): Simulasi alur reservasi (mock store), listing, owner, addMockReservation(), assignVehicleCrew(), decideMockReservation(), EMPTY_STATE, listeners (+16 more)

### Community 3 - "RoomReservationForm"
Cohesion: 0.19
Nodes (24): A. Pemohon (`organisasi` dan `dosen`), Komponen `shared/` dan pemakainya, metadata, Page(), InternalReservationForm(), FloorPlan(), getRoomReservationOptions(), getSportsHallReservationOptions() (+16 more)

### Community 4 - "FloorPlanEditor.tsx"
Cohesion: 0.17
Nodes (24): Drag, FloorPlanCanvas(), FloorPlanCanvasProps, CATEGORIES, FloorPlanEditorProps, FloorPlanForm(), FloorPlanFormProps, TODO: PUT the changed floors through the orval client, then refetch. Until then… (+16 more)

### Community 5 - "TimeWheel.tsx"
Cohesion: 0.26
Nodes (14): clampTime(), formatPart, HourRange, joinTime(), pad(), parseTypedPart(), splitTime(), stepPart() (+6 more)

### Community 6 - "scheduleCsv.ts"
Cohesion: 0.14
Nodes (19): parseCsv(), ImportScheduleDialog(), ImportScheduleDialogProps, Picked, DAY_LABEL, DAYS, normalizeTime(), overlaps() (+11 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (20): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+12 more)

### Community 8 - "EditRoomDialog.tsx"
Cohesion: 0.23
Nodes (8): ROOM_PHOTO_MAX_SIZE_MB, EditRoomDialogProps, TODO: PATCH the room through the orval client (multipart when the photo…, STATUS_OPTIONS, PHOTO_TYPES, ROOM_PHOTO_ACCEPT, RoomPhotoChange, roomPhotoSchema

### Community 9 - "AddUserDialog.tsx"
Cohesion: 0.06
Nodes (52): ResultDialog(), ResultDialogProps, useModalDialog(), ADMIN_GEDUNG, DOSEN, MOCK_MANAGED_USERS, OPERATORS, ORMAWA (+44 more)

### Community 10 - "StaffManagement.tsx"
Cohesion: 0.10
Nodes (30): LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, TABLE, TABLE_CELL, TABLE_HEAD_CELL (+22 more)

### Community 11 - "FloorTimeline.tsx"
Cohesion: 0.13
Nodes (30): ROOM_CLOSE_TIME, toWibTimeKey(), OperatorFloorData, ACCENT, ClipBody(), ClipBodyProps, displayTime(), FloorTimeline() (+22 more)

### Community 12 - "VehicleCrewPanel.tsx"
Cohesion: 0.11
Nodes (21): MOCK_STAFF, TODO: replace with the orval client for staff (no-store)., COSTS, CrewInput, crewSchema, CrewValues, money, TODO: PUT the drivers and costs through the orval client. Until then the demo… (+13 more)

### Community 13 - "InternalReservationBreadcrumb.tsx"
Cohesion: 0.09
Nodes (23): Layout(), metadata, Page(), metadata, Page(), Layout(), metadata, Page() (+15 more)

### Community 14 - "CreateReservationPanel.tsx"
Cohesion: 0.16
Nodes (15): MaskIcon(), MaskIconProps, LaravelValidationError, formatDateLongWIB(), CreateReservationPanel(), CreateReservationPanelProps, displayTime(), createOperatorReservation() (+7 more)

### Community 15 - "VehicleReservationForm.tsx"
Cohesion: 0.16
Nodes (19): @hookform/resolvers, InternalReservationFormProps, BookingMode, createReservation(), ReservationFormPageProps, ReservationLinks, RoomReservationFormProps, MAX_DESTINATIONS (+11 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.11
Nodes (27): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), WCAG 2.x contrast checker, home of the antislop-human contrast checker. Usage:… (+19 more)

### Community 17 - "zod"
Cohesion: 0.19
Nodes (17): zod, LiveData, useLiveData(), clearLive(), listeners, LIVE_PREFIX, liveKey(), LiveStorage (+9 more)

### Community 18 - "ReportFilterForm.tsx"
Cohesion: 0.10
Nodes (32): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), BadgeProps, BadgeTone, SIZE_STYLES (+24 more)

### Community 19 - "react"
Cohesion: 0.12
Nodes (27): react, @testing-library/react, PAGE_SIZE_OPTIONS, Pagination(), PaginationProps, Popover(), PopoverProps, usePagination() (+19 more)

### Community 20 - "timelineDetail.ts"
Cohesion: 0.19
Nodes (15): Operator, useMediaQuery(), Box, DetailRow, isAnchorVisible(), placePopover(), PopoverPlacement, RESERVATION (+7 more)

### Community 21 - "DraftCard.tsx"
Cohesion: 0.10
Nodes (36): Loading(), ButtonProps, VARIANT_STYLES, formatTimeRangeWIB(), cancelDraft(), DraftActionResult, submitDraft(), DraftCard() (+28 more)

### Community 22 - "Card"
Cohesion: 0.16
Nodes (18): Card(), CardProps, buildDashboardMock(), DashboardHero(), DashboardHeroProps, TODO: replace with the orval client for the dashboard endpoint (no-store) once…, LatestAnnouncementsCard(), LatestAnnouncementsCardProps (+10 more)

### Community 23 - "schema.ts"
Cohesion: 0.10
Nodes (28): LETTER_MAX_SIZE_MB, ORGANISATION_MIN_DAYS_AHEAD, ROOM_OPEN_TIME, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, BOOKING_MODES, BookingModeSettings, ALWAYS (+20 more)

### Community 24 - "pengguna/page.tsx"
Cohesion: 0.20
Nodes (12): metadata, Page(), metadata, Page(), metadata, Page(), FloorPlanEditor(), getStaff() (+4 more)

### Community 25 - "package.json"
Cohesion: 0.13
Nodes (13): name, private, version, jsdom, orval, react-dom, tailwindcss, @tailwindcss/turbopack (+5 more)

### Community 26 - "date.ts"
Cohesion: 0.26
Nodes (14): DateInput, formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatDayRange(), formatDayRangeShortWIB(), formatDayRangeWIB(), formatFullDateWIB() (+6 more)

### Community 27 - "dataMode.ts"
Cohesion: 0.30
Nodes (9): DATA_MODE_COOKIE, DataMode, writeBrowserDataMode(), DataModeSwitch(), DataModeSwitchProps, MODES, ResetMockReservationsButton(), ResetMockReservationsButtonProps (+1 more)

### Community 28 - "UniversityDashboard.tsx"
Cohesion: 0.08
Nodes (32): LineChart(), LineChartProps, LineSeries, niceMax(), MOCK_FAKULTAS, TypeSummary, UniversityDashboardData, WeeklyCounts (+24 more)

### Community 29 - "StaffDialog.tsx"
Cohesion: 0.20
Nodes (15): ROLES, StaffDialog(), StaffDialogProps, toInput(), createStaffSchema(), licenseDigits(), searchStaff(), STAFF_ROLE_LABEL (+7 more)

### Community 30 - "2. Struktur dan fungsi folder"
Cohesion: 0.12
Nodes (15): 1. Prinsip, 2. Struktur dan fungsi folder, 3. Aturan dependensi, 4. Pola utama, 5. Penamaan, 6. Urutan pembangunan yang disarankan, 7. Kapan struktur ini ditinjau ulang, Arsitektur KIREI FE (+7 more)

### Community 31 - "content.ts"
Cohesion: 0.07
Nodes (44): framer-motion, metadata, Page(), BOOKING_WINDOW_RULE, CAMPUS_ADDRESS, FACILITY_ITEMS, FACILITY_SLIDES, FacilitySlide (+36 more)

### Community 32 - "createReservation.ts"
Cohesion: 0.14
Nodes (19): wibToIso(), CreateReservationResult, TODO: send `request` with the orval client (POST, multipart). Map 422 bodies to…, TODO: match the request keys and the status field to the OpenAPI spec., ReservationListing, ReservationRequest, status(), BUS (+11 more)

### Community 33 - "RoomManager.tsx"
Cohesion: 0.18
Nodes (19): Admin Gedung (role `admin_fakultas`), SelectInput(), EditRoomDialog(), managedByLabel(), roomManagedBy(), roomTitle(), applyRoomEdits(), editManyRooms() (+11 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "Accessibility Code Patterns"
Cohesion: 0.04
Nodes (45): Accessibility Code Patterns, ARIA tabs, Dragging movements, Error handling, Form labels, Live regions and notifications, Modal focus trap, Pointer cursor base layer (+37 more)

### Community 36 - "toWibDateKey"
Cohesion: 0.05
Nodes (73): metadata, Page(), parseDataMode(), getDataMode, toWibDateKey(), MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND (+65 more)

### Community 37 - "ReservationLogCalendar.tsx"
Cohesion: 0.23
Nodes (13): monthName(), buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef (+5 more)

### Community 38 - "Button"
Cohesion: 0.12
Nodes (27): B. Pengelola (`admin_fakultas` dan `admin_universitas`), RouteError(), RouteErrorProps, Badge(), Button, Modal(), ModalProps, WIDTH (+19 more)

### Community 39 - "getReservationCandidates"
Cohesion: 0.22
Nodes (9): metadata, Page(), metadata, Page(), ADMIN_GEDUNG_NAV, RESERVATION_TAB_LINKS, ADMIN_GEDUNG_ROUTES, getReservationCandidates() (+1 more)

### Community 40 - "ScheduleManager.tsx"
Cohesion: 0.17
Nodes (19): dayText(), ScheduleManager(), ScheduleManagerProps, buildingsSchema, floorPlanRoomSchema, lecturerSchedulesSchema, LIVE_NAMES, weekdaySchema (+11 more)

### Community 41 - "Tone & Voice"
Cohesion: 0.05
Nodes (38): Actorless Passive, All-Caps Emphasis, antislop-copywriting, Aphorism Formulas, Boldface Overuse, Chatbot Closers, Copywriting Skill Checklist, Draft, audit, final (+30 more)

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "getCurrentUser.ts"
Cohesion: 0.26
Nodes (11): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+3 more)

### Community 44 - "antislop-layoutmobile"
Cohesion: 0.06
Nodes (30): 100vh Sections, antislop-layoutmobile, Bottom Nav That Eats Content, Breakpoint Driven by Device List, Breakpoints, Columns That Don't Collapse, Desktop-Only Layout, Desktop-Sized Everything (+22 more)

### Community 45 - "useMockReservations"
Cohesion: 0.19
Nodes (20): LiveUniversityDashboard(), LiveAdminDashboard(), LiveUserDashboard(), announcementsSchema, activeBorrowers(), CANCELLED, HOLDS_SLOT, ownReservationFigures (+12 more)

### Community 46 - "DraftReservationsPage.tsx"
Cohesion: 0.60
Nodes (3): metadata, Page(), DraftReservationsPage()

### Community 47 - "ReservationRecord"
Cohesion: 0.11
Nodes (31): Admin Universitas, metadata, Page(), SegmentedNav(), SegmentedNavItem, SegmentedNavProps, TypeTabs(), getHistoryRecords() (+23 more)

### Community 48 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, eslint, eslint-config-next, jsdom, orval, tailwindcss, @tailwindcss/turbopack, @testing-library/dom (+6 more)

### Community 49 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 50 - "requireRole"
Cohesion: 0.17
Nodes (15): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+7 more)

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 53 - "ComplaintForm.tsx"
Cohesion: 0.21
Nodes (12): readBrowserDataMode(), ComplaintFormProps, DEFAULTS, CATEGORIES, COMPLAINT_FIELD_MAP, ComplaintInput, complaintSchema, ComplaintValues (+4 more)

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

### Community 64 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 65 - "auth/actions.ts"
Cohesion: 0.19
Nodes (18): Admin Universitas, applyFormErrors(), FormErrorEntry, isLaravelValidationError(), fieldMap, toFormErrors(), login(), LoginResult (+10 more)

### Community 66 - "Group 1: Hard Gate (absolute, no exceptions)"
Cohesion: 0.10
Nodes (20): Group 1: Hard Gate (absolute, no exceptions), R-02 — Copywriting, R-03 — Mobile Responsiveness, R-17 — Data & Numbers, R-18 — Testimonials, R-23 — Clarification & Visual Assets, R-24 — Navigation, R-25 — Color Contrast (+12 more)

### Community 67 - "SportsHallReservationForm.tsx"
Cohesion: 0.15
Nodes (17): DATE, ReservationStep, STEPS_BY_TYPE, TIME, UPLOAD, SPORTS_HALL_RESERVATION_FIELD_MAP, SPORTS_HALL_SCHEDULE_FIELDS, LEGEND (+9 more)

### Community 68 - "Comments That Add Nothing"
Cohesion: 0.11
Nodes (17): antislop-code, Code Comment Checklist, Comments That Add Nothing, Decorative Emoji, Decorative Separators, Empty Labels, End Markers, How It Should Read (+9 more)

### Community 69 - "rooms.ts"
Cohesion: 0.22
Nodes (14): classroomRow(), MOCK_BUILDINGS, MOCK_ROOMS, room(), TODO: replace with the orval client for buildings and rooms (no-store, filtered…, RoomsData, ROOM_TYPE_LABEL, ROOM_TYPE_PREFIX (+6 more)

### Community 70 - "[tipe]/persetujuan/page.tsx"
Cohesion: 0.17
Nodes (18): metadata, Page(), generateMetadata(), generateStaticParams, Page(), generateMetadata(), generateStaticParams, Page() (+10 more)

### Community 71 - "LoginPage.tsx"
Cohesion: 0.35
Nodes (8): metadata, Page(), getSessionUser, authMode, getDemoAccounts(), LoginForm(), LoginPage(), RedirectIfSignedIn()

### Community 72 - "KIREI FE"
Cohesion: 0.12
Nodes (15): antislop, Aturan bisnis: sumber di vault Obsidian, Aturan wajib, Keamanan dan data, Keputusan yang sudah diambil (jangan diusulkan ulang), KIREI FE, Kode, Penamaan (+7 more)

### Community 73 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, framer-motion, @hookform/resolvers, next, react, react-dom, react-hook-form, zod

### Community 74 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 75 - "RoomReservationForm.tsx"
Cohesion: 0.18
Nodes (15): react-hook-form, CAPS_LABEL_CLASS, DRAFT_LETTER_HOURS, ReservationSubmitDialogProps, SubmissionFields, CATEGORIES, firstFloorId(), LEGEND (+7 more)

### Community 76 - "Group 2: Purpose-Gate (technique allowed, purpose required)"
Cohesion: 0.15
Nodes (13): Group 2: Purpose-Gate (technique allowed, purpose required), R-01 — Color & Gradients, R-04 — Icons, R-06 — Typography, R-07 — Background, R-08 — Button Arrows, R-09 — Badges, R-10 — Glassmorphism (+5 more)

### Community 77 - "laravel.ts"
Cohesion: 0.27
Nodes (11): callLaravel(), decode(), fetchApiUser(), LaravelCookie, LaravelResponse, parseApiUser(), parseSetCookie(), userSchema (+3 more)

### Community 78 - "AdminGedungShell.tsx"
Cohesion: 0.22
Nodes (11): AdminGedungLayout(), AdminUniversitasLayout(), Avatar(), AvatarProps, initialsOf(), AdminAvatar(), AdminGedungShell(), AdminAvatar() (+3 more)

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

### Community 94 - "RoleShell.tsx"
Cohesion: 0.22
Nodes (11): AppBrand(), isActive(), NavItem, NavList(), Shell(), ShellProps, ADMIN_UNIVERSITAS_NAV, LogoutButton() (+3 more)

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

### Community 115 - "vehicleAvailability.ts"
Cohesion: 0.20
Nodes (17): 3. Titik Integrasi Mock untuk Prototipe, VehicleFleetInfo(), VehicleFleetInfoProps, VehicleReservationOptions, HOLDING_STATUSES, passengerSeats(), BUS, ELF (+9 more)

### Community 116 - "types/reservation.ts"
Cohesion: 0.09
Nodes (33): UniversityReservationsProps, ADMIN_UNIVERSITAS_ROUTES, ApproveReservationDialogProps, getReservationRequests(), TODO: replace with the orval client (no-store, filtered by scope, type, and…, ReservationCandidates, RejectReservationDialogProps, HISTORY_STATUSES (+25 more)

### Community 117 - "facility.ts"
Cohesion: 0.15
Nodes (22): addDaysToKey(), crossFacultyApprover(), defaultSchedule(), isRoomBooked(), rangesOverlap(), roomBookingsOnDay(), roomStatus, RoomStatusInput (+14 more)

### Community 118 - "staffStore.ts"
Cohesion: 0.25
Nodes (10): listeners, MOCK_STAFF_KEY, readStoredStaff(), saveStaff(), staffKey(), staffListSchema, Storage, subscribeStaff() (+2 more)

### Community 119 - "DeadlineTimer.tsx"
Cohesion: 0.27
Nodes (9): Countdown, DeadlineInput, getCountdown(), NOW, useCountdown(), DeadlineTimer(), DeadlineTimerProps, display() (+1 more)

### Community 120 - "ContactPage.tsx"
Cohesion: 0.33
Nodes (6): metadata, Page(), CONTACT, TODO: replace the Figma placeholders with the real Sarpras Udinus contacts…, ChannelIcon(), ContactPage()

### Community 121 - "next"
Cohesion: 0.21
Nodes (7): nextConfig, next, Page(), generateStaticParams, Page(), ComingSoonProps, reservationsRoute()

### Community 122 - "eslint.config.mjs"
Cohesion: 0.40
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 123 - "mutator.test.ts"
Cohesion: 0.24
Nodes (7): API_URL, CSRF_METHODS, customFetch(), readBody(), readXsrfToken(), Result, toApiUrl()

### Community 124 - "FaqPage.tsx"
Cohesion: 0.29
Nodes (7): metadata, Page(), DOSEN_ANSWERS, DOSEN_FAQ_ITEMS, FAQ_ITEMS, FaqItem, FaqPage()

### Community 125 - "Role dan Halaman"
Cohesion: 0.12
Nodes (14): 1. Tabel Pemetaan Halaman dan Komponen Utama, 2. Alur Tindakan Pengguna (User Flow), 4. Perbedaan dengan Vault dan Keputusan, A. Alur Pengajuan Reservasi Ruangan (pemohon), B. Alur Draft (khusus `organisasi`), C. Alur Persetujuan (admin), D. Alur Penolakan (admin), Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin) (+6 more)

### Community 126 - "OrmawaShell.tsx"
Cohesion: 0.33
Nodes (7): OrmawaLayout(), hasDrafts(), DOSEN_NAV, NOT_FOR_DOSEN, ORMAWA_NAV, BorrowerShell(), OrmawaShell()

### Community 127 - "app/layout.tsx"
Cohesion: 0.28
Nodes (5): src_app_globals, inter, metadata, poppins, SITE

### Community 128 - "QuickLogin.tsx"
Cohesion: 0.39
Nodes (6): QuickLogin(), QuickLoginProps, ROLE_LABEL, roleLabel(), DataModeControls(), CurrentUser

### Community 129 - "OperatorShell.tsx"
Cohesion: 0.52
Nodes (4): OperatorLayout(), OperatorAccountBar(), OperatorAccount(), OperatorShell()

### Community 130 - "ProfilePage.tsx"
Cohesion: 0.43
Nodes (5): metadata, Page(), ProfilePage(), ProfilePageProps, ProfileSummary()

### Community 131 - "Field.tsx"
Cohesion: 0.29
Nodes (6): Field(), FieldProps, INPUT_CLASS, SelectInputProps, RectInput(), ComplaintForm()

## Knowledge Gaps
- **706 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+701 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 844 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `session.ts`, `OperatorFloorPage.tsx`, `ProfilePage.tsx`, `RoomReservationForm`, `Field.tsx`, `AddUserDialog.tsx`, `StaffManagement.tsx`, `VehicleCrewPanel.tsx`, `InternalReservationBreadcrumb.tsx`, `react`, `DraftCard.tsx`, `Card`, `pengguna/page.tsx`, `package.json`, `dataMode.ts`, `UniversityDashboard.tsx`, `content.ts`, `RoomManager.tsx`, `toWibDateKey`, `ReservationLogCalendar.tsx`, `Button`, `getReservationCandidates`, `getCurrentUser.ts`, `DraftReservationsPage.tsx`, `ReservationRecord`, `requireRole`, `auth/actions.ts`, `SportsHallReservationForm.tsx`, `rooms.ts`, `[tipe]/persetujuan/page.tsx`, `LoginPage.tsx`, `RoomReservationForm.tsx`, `laravel.ts`, `AdminGedungShell.tsx`, `RoleShell.tsx`, `types/reservation.ts`, `facility.ts`, `ContactPage.tsx`, `FaqPage.tsx`, `app/layout.tsx`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `QuickLogin.tsx`, `OperatorFloorPage.tsx`, `OperatorShell.tsx`, `RoomReservationForm`, `FloorPlanEditor.tsx`, `TimeWheel.tsx`, `scheduleCsv.ts`, `EditRoomDialog.tsx`, `AddUserDialog.tsx`, `StaffManagement.tsx`, `FloorTimeline.tsx`, `VehicleCrewPanel.tsx`, `CreateReservationPanel.tsx`, `VehicleReservationForm.tsx`, `zod`, `ReportFilterForm.tsx`, `timelineDetail.ts`, `DraftCard.tsx`, `package.json`, `dataMode.ts`, `UniversityDashboard.tsx`, `StaffDialog.tsx`, `content.ts`, `RoomManager.tsx`, `toWibDateKey`, `ReservationLogCalendar.tsx`, `Button`, `ScheduleManager.tsx`, `getCurrentUser.ts`, `useMockReservations`, `ReservationRecord`, `ComplaintForm.tsx`, `SportsHallReservationForm.tsx`, `LoginPage.tsx`, `RoomReservationForm.tsx`, `AdminGedungShell.tsx`, `RoleShell.tsx`, `vehicleAvailability.ts`, `types/reservation.ts`, `staffStore.ts`, `DeadlineTimer.tsx`, `OrmawaShell.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `vitest` connect `vitest` to `session.ts`, `reservationStore.ts`, `FloorPlanEditor.tsx`, `TimeWheel.tsx`, `scheduleCsv.ts`, `EditRoomDialog.tsx`, `AddUserDialog.tsx`, `StaffManagement.tsx`, `FloorTimeline.tsx`, `VehicleCrewPanel.tsx`, `InternalReservationBreadcrumb.tsx`, `CreateReservationPanel.tsx`, `zod`, `ReportFilterForm.tsx`, `react`, `timelineDetail.ts`, `DraftCard.tsx`, `schema.ts`, `package.json`, `date.ts`, `UniversityDashboard.tsx`, `StaffDialog.tsx`, `content.ts`, `createReservation.ts`, `RoomManager.tsx`, `toWibDateKey`, `ReservationLogCalendar.tsx`, `Button`, `ScheduleManager.tsx`, `getCurrentUser.ts`, `useMockReservations`, `ReservationRecord`, `ComplaintForm.tsx`, `auth/actions.ts`, `SportsHallReservationForm.tsx`, `[tipe]/persetujuan/page.tsx`, `laravel.ts`, `vehicleAvailability.ts`, `types/reservation.ts`, `facility.ts`, `staffStore.ts`, `DeadlineTimer.tsx`, `mutator.test.ts`, `FaqPage.tsx`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _706 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `reservationStore.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12643678160919541 - nodes in this community are weakly interconnected._
- **Should `scheduleCsv.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14130434782608695 - nodes in this community are weakly interconnected._
- **Should `PageSkeleton` be split into smaller, more focused modules?**
  _Cohesion score 0.09986504723346828 - nodes in this community are weakly interconnected._