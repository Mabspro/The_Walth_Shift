-- Helper script to set up your first admin user
-- Replace 'your-email@example.com' with your actual email address
-- Run this in Supabase SQL Editor after you've created your account

-- Option 1: Update existing user to admin
UPDATE users
SET role = 'admin'
WHERE email = 'your-email@example.com';

-- Verify the update
SELECT 
  id,
  email,
  full_name,
  role,
  status,
  created_at
FROM users
WHERE email = 'your-email@example.com';

-- Option 2: If you want to set multiple admins at once
-- UPDATE users
-- SET role = 'admin'
-- WHERE email IN (
--   'admin1@example.com',
--   'admin2@example.com'
-- );

-- Option 3: Set the first user (by creation date) as admin
-- UPDATE users
-- SET role = 'admin'
-- WHERE id = (
--   SELECT id FROM users
--   ORDER BY created_at ASC
--   LIMIT 1
-- );

