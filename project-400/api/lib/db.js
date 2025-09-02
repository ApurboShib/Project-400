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
