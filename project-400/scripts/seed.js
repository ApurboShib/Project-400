#!/usr/bin/env node
import 'dotenv/config';
import { query } from '../api/lib/db.js';
import { hashPassword } from '../api/lib/auth.js';

async function seed() {
  try {
    console.log('Seeding data...');

    // Basic cleanup (optional in dev)
    // await query('TRUNCATE fee_records, leave_requests, meal_plans, notices, events, users RESTART IDENTITY CASCADE;');

    const adminPass = await hashPassword('Admin123!');
    const managerPass = await hashPassword('Manager123!');
    const studentPass = await hashPassword('Student123!');

    const usersInsert = await query(`WITH ins AS (
      INSERT INTO users (email, password_hash, name, full_name, role, student_id, room_number, gender, phone)
      VALUES 
        ('admin@example.com', $1, 'Admin', 'System Admin', 'admin', NULL, NULL, 'M', '1000000000'),
        ('manager@example.com', $2, 'Manager', 'Hall Manager', 'manager', NULL, NULL, 'F', '1000000001'),
        ('student1@example.com', $3, 'Student One', 'Student One', 'student', 'STD-001', 'A-101', 'M', '1000000002')
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, role
    ) SELECT * FROM ins;`, [adminPass, managerPass, studentPass]);

    console.log('Inserted users:', usersInsert.rows);

    // Get IDs (fallback queries if ON CONFLICT skipped insert)
    const allUsers = await query(`SELECT id, email, role FROM users WHERE email IN ('admin@example.com','manager@example.com','student1@example.com');`);
    const admin = allUsers.rows.find(u => u.email==='admin@example.com');
    const manager = allUsers.rows.find(u => u.email==='manager@example.com');
    const student = allUsers.rows.find(u => u.email==='student1@example.com');

    // Fee records (simple sample months)
    await query(`INSERT INTO fee_records (user_id, month, year, base_fee, deduction_amount, final_amount, leave_days)
      VALUES ($1,'January',2025,4000,0,4000,0)
      ON CONFLICT DO NOTHING;`, [student.id]);
    await query(`INSERT INTO fee_records (user_id, month, year, base_fee, deduction_amount, final_amount, leave_days)
      VALUES ($1,'February',2025,4000,500,3500,2)
      ON CONFLICT DO NOTHING;`, [student.id]);

    // Meal plan week (current Monday)
    const now = new Date();
    const day = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((day + 6) % 7));
    const mondayStr = monday.toISOString().split('T')[0];
    for (let d=0; d<7; d++) {
      await query(`INSERT INTO meal_plans (week_start_date, day_of_week, breakfast, lunch, dinner, created_by)
        VALUES ($1,$2,$3,$4,$5,$6)
        ON CONFLICT (week_start_date, day_of_week) DO NOTHING;`, [
        mondayStr,
        d,
        'Bread & Eggs',
        'Rice & Curry',
        'Dal & Vegetables',
        manager.id
      ]);
    }

    // Notices
    const noticeColsRes = await query(`SELECT column_name FROM information_schema.columns WHERE table_name='notices'`);
    const noticeCols = noticeColsRes.rows.map(r=>r.column_name);
    const hasContent = noticeCols.includes('content');
    const hasBody = noticeCols.includes('body');
    if (hasContent) {
      await query(`INSERT INTO notices (title, content, notice_type, is_urgent, target_audience, created_by)
        VALUES ('Welcome', 'Welcome to the hostel management system.', 'general', false, 'all', $1)
        ON CONFLICT DO NOTHING;`, [admin.id]);
      await query(`INSERT INTO notices (title, content, notice_type, is_urgent, target_audience, created_by)
        VALUES ('Fire Drill', 'Fire drill on Friday 10 AM.', 'important', true, 'all', $1)
        ON CONFLICT DO NOTHING;`, [manager.id]);
    } else if (hasBody) {
      await query(`INSERT INTO notices (title, body, notice_type, is_urgent, target_audience, created_by)
        VALUES ('Welcome', 'Welcome to the hostel management system.', 'general', false, 'all', $1)
        ON CONFLICT DO NOTHING;`, [admin.id]);
      await query(`INSERT INTO notices (title, body, notice_type, is_urgent, target_audience, created_by)
        VALUES ('Fire Drill', 'Fire drill on Friday 10 AM.', 'important', true, 'all', $1)
        ON CONFLICT DO NOTHING;`, [manager.id]);
    }

    // Events
    const futureDate = new Date(Date.now() + 1000*60*60*24*7).toISOString().split('T')[0];
    await query(`INSERT INTO events (title, description, event_date, location, event_type, created_by)
      VALUES ('Tech Talk', 'Introduction to system usage', $1, 'Auditorium', 'seminar', $2)
      ON CONFLICT DO NOTHING;`, [futureDate, admin.id]);

    // Leave request
    await query(`INSERT INTO leave_requests (user_id, start_date, end_date, reason, total_days, status)
      VALUES ($1, CURRENT_DATE + INTERVAL '1 day', CURRENT_DATE + INTERVAL '3 days', 'Family visit', 3, 'approved')
      ON CONFLICT DO NOTHING;`, [student.id]);

    console.log('Seeding completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
