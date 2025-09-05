-- Add a full_name column to the users table for compatibility with backend queries
ALTER TABLE users
ADD COLUMN full_name TEXT;
-- Optionally, update full_name for existing users (example for user_id 1)
UPDATE users
SET full_name = CONCAT(first_name, ' ', last_name)
WHERE full_name IS NULL
    AND first_name IS NOT NULL
    AND last_name IS NOT NULL;