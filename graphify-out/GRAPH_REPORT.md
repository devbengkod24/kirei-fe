# Graph Report - kirei-fe  (2026-11-11)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1404 nodes · 4278 edges · 64 communities (53 shown, 11 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `586c2411`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth/actions.ts
- OperatorFloorPage.tsx
- OrmawaShell.tsx
- DraftCard.tsx
- RoomReservationForm.tsx
- ReportFilterForm.tsx
- LecturerScheduleUpload.tsx
- PageSkeleton
- EditRoomDialog.tsx
- requireRole
- types/reservation.ts
- FloorPlanEditor.tsx
- toWibDateKey
- SportsHallReservationForm.tsx
- AddUserDialog.tsx
- UniversityDashboard.tsx
- contrast-check.py
- ReservationType
- Button.tsx
- CreateReservationBreadcrumb.tsx
- getUniversityDashboard.ts
- ReservationHistoryPage.tsx
- Card
- schema.ts
- next
- package.json
- date.ts
- UserReportList.tsx
- CreateReservationPanel.tsx
- AnnouncementManager
- react
- Button
- wibToIso
- VehicleReservationForm.tsx
- compilerOptions
- ReservationLogCalendar.tsx
- reservations.ts
- TimeWheel.tsx
- ComplaintForm.tsx
- ProfilePage.tsx
- mutator.test.ts
- LatestAnnouncementsCard.tsx
- kirei-fe
- reservasi/persetujuan/page.tsx
- ContactPage.tsx
- dependencies
- scripts
- eslint.config.mjs
- vitest
- UserDetailDialog.tsx
- RouteError.tsx
- AdminDashboardSkeleton
- ReservationFormSkeleton
- DraftReservationsPage.tsx
- allowBuilds
- (ormawa)/dashboard/loading.tsx
- (ormawa)/reservasi/riwayat/loading.tsx
- operator/routes.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 107 edges
2. `Card()` - 62 edges
3. `react` - 54 edges
4. `Button` - 53 edges
5. `requireRole()` - 51 edges
6. `toWibDateKey()` - 50 edges
7. `vitest` - 42 edges
8. `PageSkeleton()` - 41 edges
9. `ReservationType` - 38 edges
10. `RoomReservationForm()` - 32 edges

## Surprising Connections (you probably didn't know these)
- `ProfilePageProps` --references--> `CurrentUser`  [EXTRACTED]
  src/shared/profile/ProfilePage.tsx → src/types/user.ts
- `FloorPlanEditorProps` --references--> `Building`  [EXTRACTED]
  src/modules/admin-universitas/floor-plan/FloorPlanEditor.tsx → src/types/facility.ts
- `UserDetailDialogProps` --references--> `ManagedUser`  [EXTRACTED]
  src/modules/admin-universitas/users/UserDetailDialog.tsx → src/types/managedUser.ts
- `ReservationLogCalendar()` --indirect_call--> `toWibDateKey()`  [INFERRED]
  src/shared/dashboard/ReservationLogCalendar.tsx → src/lib/date.ts
- `RoomReservationForm()` --indirect_call--> `toRoomReservationRequest()`  [INFERRED]
  src/shared/reservation-form/RoomReservationForm.tsx → src/shared/reservation-form/createReservation.ts

## Import Cycles
- None detected.

## Communities (64 total, 11 thin omitted)

### Community 0 - "auth/actions.ts"
Cohesion: 0.07
Nodes (60): metadata, Page(), metadata, Page(), metadata, Page(), metadata, Page() (+52 more)

### Community 1 - "OperatorFloorPage.tsx"
Cohesion: 0.07
Nodes (58): metadata, Page(), MaskIcon(), MaskIconProps, useMediaQuery(), toWibTimeKey(), buildClassSchedulesMock(), buildOperatorReservationsMock() (+50 more)

### Community 2 - "OrmawaShell.tsx"
Cohesion: 0.06
Nodes (45): AdminFakultasLayout(), AdminUniversitasLayout(), inter, metadata, poppins, OperatorLayout(), metadata, Page() (+37 more)

### Community 3 - "DraftCard.tsx"
Cohesion: 0.07
Nodes (43): zod, Loading(), LETTER_MAX_SIZE_MB, Countdown, DeadlineInput, getCountdown(), NOW, useCountdown() (+35 more)

### Community 4 - "RoomReservationForm.tsx"
Cohesion: 0.10
Nodes (33): crossFacultyApprover(), defaultSchedule(), isRoomBooked(), roomBookingsOnDay(), RoomStatus, roomStatus(), RoomStatusInput, base (+25 more)

### Community 5 - "ReportFilterForm.tsx"
Cohesion: 0.11
Nodes (30): CheckboxGrid(), ChipRadios(), Choice, GroupProps, RadioRow(), isInPeriod(), shiftKey(), TIME_PERIOD_OPTIONS (+22 more)

### Community 6 - "LecturerScheduleUpload.tsx"
Cohesion: 0.09
Nodes (34): metadata, Page(), parseCsv(), getMockLecturerSchedule(), schedules, setMockLecturerSchedule(), saveLecturerSchedule(), SaveScheduleResult (+26 more)

### Community 7 - "PageSkeleton"
Cohesion: 0.10
Nodes (21): Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading(), Loading() (+13 more)

### Community 8 - "EditRoomDialog.tsx"
Cohesion: 0.12
Nodes (25): metadata, Page(), ROOM_PHOTO_MAX_SIZE_MB, classroomRow(), MOCK_BUILDINGS, MOCK_ROOMS, room(), EditRoomDialogProps (+17 more)

### Community 9 - "requireRole"
Cohesion: 0.13
Nodes (25): metadata, Page(), generateMetadata(), generateStaticParams, Page(), generateStaticParams, Page(), generateMetadata() (+17 more)

### Community 10 - "types/reservation.ts"
Cohesion: 0.11
Nodes (26): LinkPagination(), LinkPaginationProps, PageLink(), PerPageSelect(), PerPageSelectProps, TABLE, TABLE_CELL, TABLE_HEAD_CELL (+18 more)

### Community 11 - "FloorPlanEditor.tsx"
Cohesion: 0.13
Nodes (26): metadata, Page(), MOCK_BUILDINGS, Drag, FloorPlanCanvas(), FloorPlanCanvasProps, CATEGORIES, FloorPlanEditor() (+18 more)

### Community 12 - "toWibDateKey"
Cohesion: 0.14
Nodes (25): toWibDateKey(), buildRoomBookingsMock(), buildSportsHallBookingsMock(), MOCK_ROOM_RULES, MOCK_SPORTS_HALL, MOCK_VEHICLES, SAMPLE_CAPACITY, getMockLecturerSchedules() (+17 more)

### Community 13 - "SportsHallReservationForm.tsx"
Cohesion: 0.11
Nodes (24): DRAFT_LETTER_HOURS, SPORTS_HALL_BOOKING_DAYS, SPORTS_HALL_MAX_MINUTES, rangesOverlap(), BOOKING_MODES, BookingModeSettings, DATE, ReservationStep (+16 more)

### Community 14 - "AddUserDialog.tsx"
Cohesion: 0.12
Nodes (23): ADMIN_FAKULTAS, DOSEN, MOCK_MANAGED_USERS, OPERATORS, ORMAWA, AddUserDialogProps, DEFAULTS, UserManagementProps (+15 more)

### Community 15 - "UniversityDashboard.tsx"
Cohesion: 0.12
Nodes (24): Page(), LineChart(), LineChartProps, LineSeries, niceMax(), TypeSummary, UniversityDashboardData, ReservationTrendCard() (+16 more)

### Community 16 - "contrast-check.py"
Cohesion: 0.12
Nodes (18): contrast_ratio(), linearize(), luminance(), main(), parse_hex(), parse_pairing(), parse_reference_rows(), reference_doc_path() (+10 more)

### Community 17 - "ReservationType"
Cohesion: 0.12
Nodes (21): Page(), Page(), WeeklyCounts, ReservationTrendCardProps, InternalReservationFormProps, UniversityReservationsProps, ADMIN_UNIVERSITAS_ROUTES, internalReservationRoute() (+13 more)

### Community 18 - "Button.tsx"
Cohesion: 0.15
Nodes (20): CAPS_LABEL_CLASS, Field(), FieldProps, INPUT_CLASS, SelectInput(), SelectInputProps, ButtonProps, VARIANT_STYLES (+12 more)

### Community 19 - "CreateReservationBreadcrumb.tsx"
Cohesion: 0.11
Nodes (16): @testing-library/react, Layout(), metadata, Page(), Breadcrumb(), BreadcrumbItem, BreadcrumbProps, CreateReservationBreadcrumb() (+8 more)

### Community 20 - "getUniversityDashboard.ts"
Cohesion: 0.15
Nodes (17): metadata, Page(), MOCK_UNIVERSITY_USER_ACTIVITY, MOCK_USER_ACTIVITY, MOCK_WEEKLY_TREND, MOCK_WEEKLY_TREND_BY_TYPE, buildReportsMock(), buildFacilityRequestsMock() (+9 more)

### Community 21 - "ReservationHistoryPage.tsx"
Cohesion: 0.15
Nodes (21): metadata, Page(), ActiveReservationList(), ACTIVE_STATUSES, getReservationHistory(), ReservationHistoryResult, DEFAULT_HISTORY_QUERY, first() (+13 more)

### Community 22 - "Card"
Cohesion: 0.15
Nodes (18): metadata, Page(), Card(), CardProps, buildDashboardMock(), DashboardHero(), DashboardHeroProps, getUserDashboard() (+10 more)

### Community 23 - "schema.ts"
Cohesion: 0.12
Nodes (24): ALWAYS, createRoomReservationSchema(), createSportsHallReservationSchema(), createVehicleReservationSchema(), describe(), IssueSink, lastBookableDay(), minutesBetween() (+16 more)

### Community 24 - "next"
Cohesion: 0.11
Nodes (13): nextConfig, next, metadata, metadata, Page(), Layout(), ComingSoonProps, SegmentedNav() (+5 more)

### Community 25 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, jsdom@26.1.0, orval@^8.47.0, tailwindcss@^4, @tailwindcss/turbopack@^4, @testing-library/dom@10.4.0, @testing-library/react@16.3.0, @types/node@^20 (+15 more)

### Community 26 - "date.ts"
Cohesion: 0.19
Nodes (18): DateInput, formatDateShortWIB(), formatDateTimeShortWIB(), formatDateWIB(), formatFullDateWIB(), formatRelativeDayWIB(), formatTimeSpanWIB(), formatTimeWIB() (+10 more)

### Community 27 - "UserReportList.tsx"
Cohesion: 0.17
Nodes (14): PAGE_SIZE_OPTIONS, Pagination(), PaginationProps, Popover(), PopoverProps, usePagination(), Page, paginate() (+6 more)

### Community 28 - "CreateReservationPanel.tsx"
Cohesion: 0.17
Nodes (15): react-hook-form, applyFormErrors(), FormErrorEntry, isLaravelValidationError(), LaravelValidationError, fieldMap, toFormErrors(), CreateReservationPanel() (+7 more)

### Community 29 - "AnnouncementManager"
Cohesion: 0.18
Nodes (13): metadata, Page(), metadata, Page(), metadata, Page(), buildAnnouncementsMock(), AnnouncementManager() (+5 more)

### Community 30 - "react"
Cohesion: 0.19
Nodes (12): react, ResultDialog(), ResultDialogProps, ModalProps, useModalDialog(), changePassword(), MIN_PASSWORD_LENGTH, PasswordChange (+4 more)

### Community 31 - "Button"
Cohesion: 0.20
Nodes (14): metadata, Page(), Button, AddUserDialog(), getManagedUsers(), UserDetailDialog(), Email(), StatusBadge() (+6 more)

### Community 32 - "wibToIso"
Cohesion: 0.19
Nodes (14): wibToIso(), DraftDetails, createReservation(), CreateReservationResult, ReservationRequest, status(), toRoomReservationRequest(), toSportsHallReservationRequest() (+6 more)

### Community 33 - "VehicleReservationForm.tsx"
Cohesion: 0.22
Nodes (15): LetterField(), LetterFieldProps, LetterPanel(), LetterPanelProps, ReviewButton(), PanelHeading(), PanelHeadingProps, ReservationSubmitDialog() (+7 more)

### Community 34 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 35 - "ReservationLogCalendar.tsx"
Cohesion: 0.23
Nodes (13): monthName(), buildMonthGrid(), CalendarCell, CalendarMarker, keyOf(), monthOfKey(), monthRange(), MonthRef (+5 more)

### Community 36 - "reservations.ts"
Cohesion: 0.17
Nodes (13): BOOKER, buildReservationHistoryMock(), FACILITY_ROWS, FacilityRow, PAST_STATUSES, pastRecords(), PURPOSES, record() (+5 more)

### Community 37 - "TimeWheel.tsx"
Cohesion: 0.31
Nodes (12): formatPart, joinTime(), pad(), parseTypedPart(), splitTime(), stepPart(), TIME_PARTS, TimePart (+4 more)

### Community 38 - "ComplaintForm.tsx"
Cohesion: 0.24
Nodes (9): ComplaintForm(), DEFAULTS, CATEGORIES, COMPLAINT_FIELD_MAP, ComplaintInput, complaintSchema, ComplaintValues, sendComplaint() (+1 more)

### Community 39 - "ProfilePage.tsx"
Cohesion: 0.26
Nodes (8): metadata, Page(), metadata, Page(), metadata, Page(), ProfilePage(), ProfilePageProps

### Community 40 - "mutator.test.ts"
Cohesion: 0.24
Nodes (7): API_URL, CSRF_METHODS, customFetch(), readBody(), readXsrfToken(), Result, toApiUrl()

### Community 41 - "LatestAnnouncementsCard.tsx"
Cohesion: 0.31
Nodes (7): Badge(), BadgeProps, BadgeTone, SIZE_STYLES, TONE_STYLES, ANNOUNCEMENT_CATEGORY, RESERVATION_STATUS

### Community 42 - "kirei-fe"
Cohesion: 0.20
Nodes (9): context, dockerfile, build, container_name, environment, ports, restart, services (+1 more)

### Community 43 - "reservasi/persetujuan/page.tsx"
Cohesion: 0.38
Nodes (7): metadata, Page(), metadata, Page(), RESERVATION_TAB_LINKS, getReservationRequests(), ReservationManagement()

### Community 44 - "ContactPage.tsx"
Cohesion: 0.33
Nodes (5): metadata, Page(), CONTACT, ChannelIcon(), ContactPage()

### Community 45 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, @hookform/resolvers@^6.0.2, next@16.4.3, react@19.3.0, react-dom@19.3.0, react-hook-form@^7.91.0, zod@4.6.7, react-dom

### Community 46 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, api:generate, build, dev, lint, start, test, typecheck

### Community 47 - "eslint.config.mjs"
Cohesion: 0.29
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.3, eslint, eslint-config-next

### Community 49 - "UserDetailDialog.tsx"
Cohesion: 0.33
Nodes (5): @hookform/resolvers, STATUS_OPTIONS, UserDetailChanges, UserDetailDialogProps, PasswordResetValues

### Community 51 - "AdminDashboardSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), AdminDashboardSkeleton()

### Community 52 - "ReservationFormSkeleton"
Cohesion: 0.60
Nodes (3): Loading(), Loading(), ReservationFormSkeleton()

### Community 53 - "DraftReservationsPage.tsx"
Cohesion: 0.60
Nodes (3): metadata, Page(), DraftReservationsPage()

### Community 54 - "allowBuilds"
Cohesion: 0.50
Nodes (3): allowBuilds, esbuild, unrs-resolver

## Knowledge Gaps
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `auth/actions.ts`, `OperatorFloorPage.tsx`, `OrmawaShell.tsx`, `DraftCard.tsx`, `RoomReservationForm.tsx`, `ReportFilterForm.tsx`, `LecturerScheduleUpload.tsx`, `EditRoomDialog.tsx`, `requireRole`, `types/reservation.ts`, `FloorPlanEditor.tsx`, `toWibDateKey`, `SportsHallReservationForm.tsx`, `AddUserDialog.tsx`, `UniversityDashboard.tsx`, `ReservationType`, `Button.tsx`, `CreateReservationBreadcrumb.tsx`, `getUniversityDashboard.ts`, `ReservationHistoryPage.tsx`, `Card`, `package.json`, `date.ts`, `UserReportList.tsx`, `AnnouncementManager`, `react`, `Button`, `VehicleReservationForm.tsx`, `ReservationLogCalendar.tsx`, `ProfilePage.tsx`, `LatestAnnouncementsCard.tsx`, `reservasi/persetujuan/page.tsx`, `ContactPage.tsx`, `dependencies`, `DraftReservationsPage.tsx`?**
  _High betweenness centrality (0.244) - this node is a cross-community bridge._
- **Should `auth/actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06741250717154332 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `auth/actions.ts`, `OperatorFloorPage.tsx`, `OrmawaShell.tsx`, `DraftCard.tsx`, `RoomReservationForm.tsx`, `ReportFilterForm.tsx`, `LecturerScheduleUpload.tsx`, `EditRoomDialog.tsx`, `requireRole`, `types/reservation.ts`, `FloorPlanEditor.tsx`, `SportsHallReservationForm.tsx`, `AddUserDialog.tsx`, `Button.tsx`, `package.json`, `date.ts`, `UserReportList.tsx`, `CreateReservationPanel.tsx`, `Button`, `wibToIso`, `VehicleReservationForm.tsx`, `ReservationLogCalendar.tsx`, `TimeWheel.tsx`, `ComplaintForm.tsx`, `dependencies`, `UserDetailDialog.tsx`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Should `OperatorFloorPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0681081081081081 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `auth/actions.ts`, `OperatorFloorPage.tsx`, `OrmawaShell.tsx`, `DraftCard.tsx`, `RoomReservationForm.tsx`, `ReportFilterForm.tsx`, `LecturerScheduleUpload.tsx`, `EditRoomDialog.tsx`, `requireRole`, `FloorPlanEditor.tsx`, `SportsHallReservationForm.tsx`, `AddUserDialog.tsx`, `CreateReservationBreadcrumb.tsx`, `ReservationHistoryPage.tsx`, `schema.ts`, `package.json`, `date.ts`, `UserReportList.tsx`, `CreateReservationPanel.tsx`, `AnnouncementManager`, `react`, `wibToIso`, `ReservationLogCalendar.tsx`, `TimeWheel.tsx`, `ComplaintForm.tsx`, `mutator.test.ts`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Should `OrmawaShell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.059076682316118935 - nodes in this community are weakly interconnected._
- **Should `DraftCard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07481005260081823 - nodes in this community are weakly interconnected._