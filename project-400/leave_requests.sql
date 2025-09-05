-- Add full_name column to users table if not exists
ALTER TABLE users
ADD COLUMN IF NOT EXISTS full_name TEXT;
-- Optionally populate full_name from first_name and last_name if they exist
UPDATE users
SET full_name = CONCAT(first_name, ' ', last_name)
WHERE full_name IS NULL
    AND first_name IS NOT NULL
    AND last_name IS NOT NULL;
-- SQL to create the leave_requests table for student leave management
CREATE TABLE leave_requests (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    total_days INTEGER,
    status VARCHAR(20) DEFAULT 'pending',
    deduction INTEGER DEFAULT 0,
    approved_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);