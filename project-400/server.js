// Simple Express.js server for API routes with CORS enabled
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { query } from "./api/lib/db.js";
import { hashPassword } from "./api/lib/auth.js";

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, gender, phone } = req.body;
  if (!name || !email || !password || !gender) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }
  try {
    const existingUser = await query("SELECT id FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "User with this email already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const result = await query(
      `INSERT INTO users (email, password_hash, name, gender, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, gender, phone`,
      [email, hashedPassword, name, gender, phone]
    );
    res.json({ message: "Registration successful", user: result.rows[0] });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
