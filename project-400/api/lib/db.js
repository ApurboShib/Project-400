// Create fee_records table if not exists
export async function createFeeRecordsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS fee_records (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      month VARCHAR(20) NOT NULL,
      year INTEGER NOT NULL,
      base_fee INTEGER NOT NULL,
      deduction_amount INTEGER DEFAULT 0,
      final_amount INTEGER NOT NULL,
      leave_days INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
import { Pool } from "pg";
import 'dotenv/config';

const pool = new Pool({
  user: process.env.PGUSER || "apurboshib",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "project_400",
  password: process.env.PGPASSWORD || "224400",
  port: Number(process.env.PGPORT) || 5432,
});

export async function createMealPlansTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS meal_plans (
      id SERIAL PRIMARY KEY,
      week_start_date DATE NOT NULL,
      day_of_week INTEGER NOT NULL CHECK(day_of_week BETWEEN 0 AND 6),
      breakfast TEXT,
      lunch TEXT,
      dinner TEXT,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(week_start_date, day_of_week)
    );
  `);
}

export async function createNoticesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notices (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      notice_type VARCHAR(50) DEFAULT 'general',
      is_urgent BOOLEAN DEFAULT FALSE,
      target_audience VARCHAR(50) DEFAULT 'all',
      expiry_date DATE,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function createEventsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      event_date DATE NOT NULL,
      location TEXT,
      event_type VARCHAR(50) DEFAULT 'general',
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// pool configured above

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}
