(async () => {
  const dbMod = await import("./api/lib/db.js");
  query = dbMod.query;
  await dbMod.createFeeRecordsTable(); // Ensure fee_records table exists
  const authMod = await import("./api/lib/auth.js");
  hashPassword = authMod.hashPassword;
  getUserByEmail = authMod.getUserByEmail;
  verifyPassword = authMod.verifyPassword;
  generateToken = authMod.generateToken;
})();
// Express.js server for API routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let query, hashPassword, getUserByEmail, verifyPassword, generateToken;
(async () => {
  const dbMod = await import("./api/lib/db.js");
  query = dbMod.query;
  const authMod = await import("./api/lib/auth.js");
  hashPassword = authMod.hashPassword;
  getUserByEmail = authMod.getUserByEmail;
  verifyPassword = authMod.verifyPassword;
  generateToken = authMod.generateToken;
})();

const app = express();
const PORT = 3002;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Login route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user.id, user.role);
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7 * 1000,
      path: "/"
    });
    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        student_id: user.student_id,
        room_number: user.room_number,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Signup route
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

// Fee route (GET example)
app.get("/api/fee", async (req, res) => {
  try {
    const token = req.cookies["auth-token"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const authMod = await import("./api/lib/auth.js");
    const decoded = authMod.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const userId = decoded.role === "admin" ? req.query.userId : decoded.userId;
    const result = await query(
      `SELECT fr.*, u.full_name, u.student_id 
       FROM fee_records fr 
       JOIN users u ON fr.user_id = u.id 
       WHERE fr.user_id = $1 
       ORDER BY fr.year DESC, fr.month DESC`,
      [userId || decoded.userId],
    );
    res.json({ fees: result.rows });
  } catch (error) {
    console.error("Fees fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Student Leave API
app.get("/api/student-leave", async (req, res) => {
  try {
    const token = req.cookies["auth-token"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const authMod = await import("./api/lib/auth.js");
    const decoded = authMod.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    let queryText, params;
    if (decoded.role === "admin" || decoded.role === "manager") {
      queryText = `
        SELECT lr.*, u.full_name, u.student_id, u.room_number,
               approver.full_name as approved_by_name
        FROM leave_requests lr
        JOIN users u ON lr.user_id = u.id
        LEFT JOIN users approver ON lr.approved_by = approver.id
        ORDER BY lr.created_at DESC
      `;
      params = [];
    } else {
      queryText = `
        SELECT lr.*, approver.full_name as approved_by_name
        FROM leave_requests lr
        LEFT JOIN users approver ON lr.approved_by = approver.id
        WHERE lr.user_id = $1
        ORDER BY lr.created_at DESC
      `;
      params = [decoded.userId];
    }

    const result = await query(queryText, params);
    res.json({ leaveRequests: result.rows });
  } catch (error) {
    console.error("Leave requests fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/student-leave", async (req, res) => {
  try {
    const token = req.cookies["auth-token"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const authMod = await import("./api/lib/auth.js");
    const decoded = authMod.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { start_date, end_date, reason } = req.body;
    if (!start_date || !end_date) {
      return res.status(400).json({ error: "Start date and end date are required" });
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    const result = await query(
      `INSERT INTO leave_requests (user_id, start_date, end_date, reason, total_days)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [decoded.userId, start_date, end_date, reason, totalDays],
    );

    res.json({ leaveRequest: result.rows[0] });
  } catch (error) {
    console.error("Leave request creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
