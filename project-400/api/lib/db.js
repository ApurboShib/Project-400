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

const pool = new Pool({
  user: "apurboshib", // <-- change to your pgAdmin username
  host: "localhost",   // or your server host
  database: "project_400", // <-- change to your database name
  password: "224400", // <-- change to your password
  port: 5432,
});

export async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}
