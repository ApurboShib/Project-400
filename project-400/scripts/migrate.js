#!/usr/bin/env node
import 'dotenv/config';
import { query } from '../api/lib/db.js';

async function migrate() {
  try {
    // Users base table (if not existing). Adjust as needed; assumes initial table exists.
    await query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      full_name TEXT,
      role TEXT DEFAULT 'student',
      student_id TEXT,
      room_number TEXT,
      gender TEXT,
      phone TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    // Add columns safety
    await query(`DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='full_name') THEN
        ALTER TABLE users ADD COLUMN full_name TEXT;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='student_id') THEN
        ALTER TABLE users ADD COLUMN student_id TEXT;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='room_number') THEN
        ALTER TABLE users ADD COLUMN room_number TEXT;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='gender') THEN
        ALTER TABLE users ADD COLUMN gender TEXT;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='phone') THEN
        ALTER TABLE users ADD COLUMN phone TEXT;
      END IF;
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
        ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'student';
      END IF;
    END $$;`);

    // fee_records
    await query(`CREATE TABLE IF NOT EXISTS fee_records (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      month VARCHAR(20) NOT NULL,
      year INTEGER NOT NULL,
      base_fee INTEGER NOT NULL,
      deduction_amount INTEGER DEFAULT 0,
      final_amount INTEGER NOT NULL,
      leave_days INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    // leave_requests
    await query(`CREATE TABLE IF NOT EXISTS leave_requests (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      reason TEXT,
      total_days INTEGER,
      status VARCHAR(20) DEFAULT 'pending',
      deduction INTEGER DEFAULT 0,
      approved_by INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    // meal_plans
    await query(`CREATE TABLE IF NOT EXISTS meal_plans (
      id SERIAL PRIMARY KEY,
      week_start_date DATE NOT NULL,
      day_of_week INTEGER NOT NULL CHECK(day_of_week BETWEEN 0 AND 6),
      breakfast TEXT,
      lunch TEXT,
      dinner TEXT,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(week_start_date, day_of_week)
    );`);

    // notices
    await query(`CREATE TABLE IF NOT EXISTS notices (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      notice_type VARCHAR(50) DEFAULT 'general',
      is_urgent BOOLEAN DEFAULT FALSE,
      target_audience VARCHAR(50) DEFAULT 'all',
      expiry_date DATE,
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    // events
    await query(`CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      event_date DATE NOT NULL,
      location TEXT,
      event_type VARCHAR(50) DEFAULT 'general',
      created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    // --- Reconciliation for pre-existing tables missing newer columns ---
    // notices missing columns (content, notice_type, etc.)
    await query(`DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='notices') THEN
        -- If legacy 'body' column exists and 'content' missing, add 'content' then copy
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='notices' AND column_name='body')
           AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='notices' AND column_name='content') THEN
          ALTER TABLE notices ADD COLUMN content TEXT;
          UPDATE notices SET content = body WHERE content IS NULL;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='notices' AND column_name='title') THEN
          ALTER TABLE notices ADD COLUMN title TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='notices' AND column_name='content') THEN
          ALTER TABLE notices ADD COLUMN content TEXT;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='notices' AND column_name='notice_type') THEN
          ALTER TABLE notices ADD COLUMN notice_type VARCHAR(50) DEFAULT 'general';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='notices' AND column_name='is_urgent') THEN
          ALTER TABLE notices ADD COLUMN is_urgent BOOLEAN DEFAULT FALSE;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='notices' AND column_name='target_audience') THEN
          ALTER TABLE notices ADD COLUMN target_audience VARCHAR(50) DEFAULT 'all';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='notices' AND column_name='expiry_date') THEN
          ALTER TABLE notices ADD COLUMN expiry_date DATE;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='notices' AND column_name='created_by') THEN
          ALTER TABLE notices ADD COLUMN created_by INTEGER REFERENCES users(id) ON DELETE SET NULL;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='notices' AND column_name='created_at') THEN
          ALTER TABLE notices ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
        END IF;
        -- Relax legacy NOT NULL on body if present so inserts omitting it succeed
        IF EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name='notices' AND column_name='body' AND is_nullable='NO'
        ) THEN
          BEGIN
            ALTER TABLE notices ALTER COLUMN body DROP NOT NULL;
          EXCEPTION WHEN others THEN NULL; -- ignore if constraint name unknown
          END;
        END IF;
      END IF;
    END $$;`);

    // events reconciliation
    await query(`DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='events') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='event_type') THEN
          ALTER TABLE events ADD COLUMN event_type VARCHAR(50) DEFAULT 'general';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='created_by') THEN
          ALTER TABLE events ADD COLUMN created_by INTEGER REFERENCES users(id) ON DELETE SET NULL;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='created_at') THEN
          ALTER TABLE events ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
        END IF;
      END IF;
    END $$;`);

    // fee_records reconciliation
    await query(`DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='fee_records') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='fee_records' AND column_name='deduction_amount') THEN
          ALTER TABLE fee_records ADD COLUMN deduction_amount INTEGER DEFAULT 0;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='fee_records' AND column_name='final_amount') THEN
          ALTER TABLE fee_records ADD COLUMN final_amount INTEGER;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='fee_records' AND column_name='leave_days') THEN
          ALTER TABLE fee_records ADD COLUMN leave_days INTEGER DEFAULT 0;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='fee_records' AND column_name='created_at') THEN
          ALTER TABLE fee_records ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
        END IF;
      END IF;
    END $$;`);

    // leave_requests reconciliation
    await query(`DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='leave_requests') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leave_requests' AND column_name='status') THEN
          ALTER TABLE leave_requests ADD COLUMN status VARCHAR(20) DEFAULT 'pending';
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leave_requests' AND column_name='deduction') THEN
          ALTER TABLE leave_requests ADD COLUMN deduction INTEGER DEFAULT 0;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leave_requests' AND column_name='approved_by') THEN
          ALTER TABLE leave_requests ADD COLUMN approved_by INTEGER REFERENCES users(id);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='leave_requests' AND column_name='created_at') THEN
          ALTER TABLE leave_requests ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
        END IF;
      END IF;
    END $$;`);

    console.log('Migration completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
