// Express.js server (ESM) for API routes
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { query } from './api/lib/db.js';
import { hashPassword, getUserByEmail, verifyPassword, generateToken, verifyToken } from './api/lib/auth.js';

const app = express();
const PORT = Number(process.env.PORT) || 3002;

// Allow multiple dev origins (Vite may select next free port)
const allowedOrigins = new Set([
	'http://localhost:5173',
	'http://localhost:5174',
	'http://localhost:5175',
	'http://localhost:5176'
]);

app.use(cors({
	origin: (origin, callback) => {
		if (!origin) return callback(null, true); // non-browser or same-origin
		if (allowedOrigins.has(origin)) {
			return callback(null, true);
		}
		return callback(new Error('CORS not allowed for origin: ' + origin));
	},
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
				name: user.name,
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

// Current user profile
app.get('/api/users/profile', async (req, res) => {
	try {
		const token = req.cookies['auth-token'];
		if (!token) return res.status(401).json({ error: 'Unauthorized' });
		const decoded = verifyToken(token);
		if (!decoded) {
			console.warn('Token verification failed; raw token starts with:', token.slice(0,20));
		}
		if (!decoded) return res.status(401).json({ error: 'Invalid token' });
		const result = await query('SELECT id, email, full_name, name, role, student_id, room_number, gender, phone FROM users WHERE id = $1', [decoded.userId]);
		if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
		res.json({ user: result.rows[0] });
	} catch (e) {
		console.error('Profile fetch error:', e);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Fee route (GET)
app.get('/api/fee', async (req, res) => {
	try {
		const token = req.cookies['auth-token'];
		if (!token) return res.status(401).json({ error: 'Unauthorized' });
		const decoded = verifyToken(token);
		if (!decoded) return res.status(401).json({ error: 'Invalid token' });
		const userId = decoded.role === 'admin' ? req.query.userId : decoded.userId;
		const result = await query(
			`SELECT fr.*, COALESCE(u.full_name, u.name) as full_name, u.student_id 
			 FROM fee_records fr 
			 JOIN users u ON fr.user_id = u.id 
			 WHERE fr.user_id = $1 
			 ORDER BY fr.year::int DESC, fr.month DESC`,
			[userId || decoded.userId]
		);
		res.json({ fees: result.rows });
	} catch (error) {
		console.error('Fees fetch error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Student Leave GET
app.get('/api/student-leave', async (req, res) => {
	try {
		const token = req.cookies['auth-token'];
		if (!token) return res.status(401).json({ error: 'Unauthorized' });
		const decoded = verifyToken(token);
		if (!decoded) return res.status(401).json({ error: 'Invalid token' });

		let queryText, params;
		if (decoded.role === 'admin' || decoded.role === 'manager') {
			queryText = `
				SELECT lr.*, u.full_name, u.student_id, u.room_number,
							 approver.full_name as approved_by_name
				FROM leave_requests lr
				JOIN users u ON lr.user_id = u.id
				LEFT JOIN users approver ON lr.approved_by = approver.id
				ORDER BY lr.created_at DESC`;
			params = [];
		} else {
			queryText = `
				SELECT lr.*, approver.full_name as approved_by_name
				FROM leave_requests lr
				LEFT JOIN users approver ON lr.approved_by = approver.id
				WHERE lr.user_id = $1
				ORDER BY lr.created_at DESC`;
			params = [decoded.userId];
		}
		const result = await query(queryText, params);
		res.json({ leaveRequests: result.rows });
	} catch (error) {
		console.error('Leave requests fetch error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Student Leave POST
app.post('/api/student-leave', async (req, res) => {
	try {
		const token = req.cookies['auth-token'];
		if (!token) return res.status(401).json({ error: 'Unauthorized' });
		const decoded = verifyToken(token);
		if (!decoded) return res.status(401).json({ error: 'Invalid token' });

		const { start_date, end_date, reason } = req.body;
		if (!start_date || !end_date) {
			return res.status(400).json({ error: 'Start date and end date are required' });
		}
		const startDate = new Date(start_date);
		const endDate = new Date(end_date);
		const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
		const result = await query(
			`INSERT INTO leave_requests (user_id, start_date, end_date, reason, total_days)
			 VALUES ($1, $2, $3, $4, $5)
			 RETURNING *`,
			[decoded.userId, start_date, end_date, reason, totalDays]
		);
		res.json({ leaveRequest: result.rows[0] });
	} catch (error) {
		console.error('Leave request creation error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Meals GET
app.get('/api/meals', async (req, res) => {
	try {
		const week = req.query.week || new Date().toISOString().split('T')[0];
		const result = await query(`
			SELECT mp.*, u.full_name as created_by_name
			FROM meal_plans mp
			LEFT JOIN users u ON mp.created_by = u.id
			WHERE mp.week_start_date = $1
			ORDER BY mp.day_of_week
		`, [week]);
		res.json({ mealPlans: result.rows });
	} catch (error) {
		console.error('Meal plans fetch error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Meals POST
app.post('/api/meals', async (req, res) => {
	try {
		const token = req.cookies['auth-token'];
		if (!token) return res.status(401).json({ error: 'Unauthorized' });
		const decoded = verifyToken(token);
		if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'manager')) {
			return res.status(403).json({ error: 'Manager or admin access required' });
		}
		const { week_start_date, day_of_week, breakfast, lunch, dinner } = req.body;
		if (week_start_date == null || day_of_week == null) return res.status(400).json({ error: 'week_start_date and day_of_week required' });
		const result = await query(`
			INSERT INTO meal_plans (week_start_date, day_of_week, breakfast, lunch, dinner, created_by)
			VALUES ($1, $2, $3, $4, $5, $6)
			ON CONFLICT (week_start_date, day_of_week)
			DO UPDATE SET breakfast = EXCLUDED.breakfast, lunch = EXCLUDED.lunch, dinner = EXCLUDED.dinner, created_by = EXCLUDED.created_by
			RETURNING *
		`, [week_start_date, day_of_week, breakfast, lunch, dinner, decoded.userId]);
		res.json({ mealPlan: result.rows[0] });
	} catch (error) {
		console.error('Meal plan creation error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Notices GET
app.get('/api/notices', async (_req, res) => {
	try {
		const result = await query(`
			SELECT n.*, u.full_name as created_by_name
			FROM notices n
			LEFT JOIN users u ON n.created_by = u.id
			WHERE n.expiry_date IS NULL OR n.expiry_date >= CURRENT_DATE
			ORDER BY n.is_urgent DESC, n.created_at DESC
		`);
		res.json({ notices: result.rows });
	} catch (error) {
		console.error('Notices fetch error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Notices POST
app.post('/api/notices', async (req, res) => {
	try {
		const token = req.cookies['auth-token'];
		if (!token) return res.status(401).json({ error: 'Unauthorized' });
		const decoded = verifyToken(token);
		if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'manager')) {
			return res.status(403).json({ error: 'Manager or admin access required' });
		}
		const { title, content, notice_type, is_urgent, target_audience, expiry_date } = req.body;
		if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
		const result = await query(`
			INSERT INTO notices (title, content, notice_type, is_urgent, target_audience, expiry_date, created_by)
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			RETURNING *
		`, [title, content, notice_type || 'general', is_urgent || false, target_audience || 'all', expiry_date, decoded.userId]);
		res.json({ notice: result.rows[0] });
	} catch (error) {
		console.error('Notice creation error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Events GET
app.get('/api/events', async (_req, res) => {
	try {
		const result = await query(`
			SELECT e.*, u.full_name as created_by_name
			FROM events e
			LEFT JOIN users u ON e.created_by = u.id
			ORDER BY e.event_date ASC, e.created_at DESC
		`);
		res.json({ events: result.rows });
	} catch (error) {
		console.error('Events fetch error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Events POST
app.post('/api/events', async (req, res) => {
	try {
		const token = req.cookies['auth-token'];
		if (!token) return res.status(401).json({ error: 'Unauthorized' });
		const decoded = verifyToken(token);
		if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'manager')) {
			return res.status(403).json({ error: 'Manager or admin access required' });
		}
		const { title, description, event_date, location, event_type } = req.body;
		if (!title || !event_date) return res.status(400).json({ error: 'Title and event_date are required' });
		const result = await query(`
			INSERT INTO events (title, description, event_date, location, event_type, created_by)
			VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING *
		`, [title, description, event_date, location, event_type || 'general', decoded.userId]);
		res.json({ event: result.rows[0] });
	} catch (error) {
		console.error('Event creation error:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Health endpoint
app.get('/api/health', async (_req, res) => {
	try {
		await query('SELECT 1');
		res.json({ status: 'ok' });
	} catch (e) {
		res.status(500).json({ status: 'db-failed' });
	}
});

// 404 handler
app.use((req, res, next) => {
	if (req.path.startsWith('/api/')) {
		return res.status(404).json({ error: 'Not Found' });
	}
	next();
});

// Error middleware
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
	console.error('Unhandled error:', err);
	res.status(500).json({ error: 'Internal server error' });
});

function start(port, attempt = 0) {
	const srv = app.listen(port, () => {
		console.log(`API server running on http://localhost:${port}`);
	});
	srv.on('error', (err) => {
		if (err.code === 'EADDRINUSE' && attempt < 3) {
			const nextPort = port + 1;
			console.warn(`Port ${port} in use, retrying on ${nextPort}...`);
			start(nextPort, attempt + 1);
		} else {
			console.error('Failed to start server:', err);
			console.error('You can free the port with (macOS):');
			console.error(`lsof -nP -iTCP:${port} | grep LISTEN`);
			console.error(`kill -9 <PID>`);
			process.exit(1);
		}
	});
}

start(PORT);
