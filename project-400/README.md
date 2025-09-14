# Project 400

Full-stack hostel/student management prototype using React (Vite) + Express + PostgreSQL.

## Quick Start

```bash
cp .env.example .env # if example provided (or edit existing .env)
pnpm install # or npm install / yarn
node scripts/migrate.js
node scripts/seed.js
npm run server   # starts API (http://localhost:3002)
npm run dev      # starts Vite frontend (http://localhost:5173)
```

## Data Model Overview

### users

| Column                | Purpose                                     |
| --------------------- | ------------------------------------------- | --------- | --------------------------- |
| id                    | Primary key                                 |
| email                 | Login + unique identifier                   |
| password_hash         | Bcrypt hash for authentication              |
| name                  | Display/basic name                          |
| full_name             | Extended display name (queries prefer this) |
| role                  | 'admin'                                     | 'manager' | 'student' role-based access |
| student_id            | External student system identifier          |
| room_number           | Hostel room assignment                      |
| gender                | Demographic field                           |
| phone                 | Contact number                              |
| created_at/updated_at | Timestamps                                  |

### fee_records

Tracks per-user monthly fee calculations.
| Field | Notes |
|-------|------|
| base_fee | Original fee before deductions |
| deduction_amount | Total deductions applied |
| final_amount | base_fee - deduction_amount |
| leave_days | Days of approved leave affecting fee |

### leave_requests

Student leave applications.
| Field | Notes |
|-------|------|
| user_id | Requesting student |
| start_date/end_date | Leave period |
| total_days | Derived days count |
| status | pending / approved / rejected |
| deduction | Optional fee deduction value |
| approved_by | Manager/admin approver |

### meal_plans

Weekly meal schedule.
| Field | Notes |
|-------|------|
| week_start_date | Monday (or chosen week anchor) |
| day_of_week | 0=Mon..6=Sun (CHECK constraint) |
| breakfast/lunch/dinner | Text entries for menus |

### notices

General / urgent announcements.
| Field | Notes |
|-------|------|
| notice_type | general/important/warning/etc. |
| is_urgent | Pin/priority flag |
| target_audience | all / students / staff |
| expiry_date | Auto-hide after this date |

### events

Calendar items & activities.
| Field | Notes |
|-------|------|
| event_date | Date of event |
| event_type | Category (seminar, sports, etc.) |

## Scripts

| Script               | Purpose                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| `scripts/migrate.js` | Creates/updates tables idempotently                                    |
| `scripts/seed.js`    | Inserts dummy data (admin/manager/student, sample fees, notices, etc.) |

## Authentication

Cookie-based JWT. Cookie: `auth-token` (httpOnly). Supply credentials via `fetch(..., { credentials: 'include' })`.

## Adding Real Data

1. Run `node scripts/migrate.js` to ensure schema.
2. Insert real users (ensure roles set correctly).
3. Add fee records per month using `/api/fee` (admin-only POST).
4. Add meal plans via `/api/meals` (manager/admin).
5. Post notices and events with appropriate roles.

## Health Check

`GET /api/health` -> `{ status: 'ok' }` if DB reachable.

## Roadmap

- Role-based authorization middleware extraction
- Pagination & filtering for notices/events
- File upload support (e.g., avatars)
- Automated migrations versioning

---

Generated documentation to support transition from dummy to production data.
