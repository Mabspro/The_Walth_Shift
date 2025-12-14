-- Link existing Supabase Auth users to users table
-- Users exist in Auth but not in the users table
-- This creates the missing user records

-- For mabspro34@gmail.com (Auth UID: a909864e-d865-4ff7-bd03-cd0323776c8d)
-- Set as admin directly
INSERT INTO users (email, full_name, auth_user_id, role, status)
VALUES (
  'mabspro34@gmail.com',
  'Mabvuto Kaela',
  'a909864e-d865-4ff7-bd03-cd0323776c8d'::uuid,
  'admin',
  'active'
)
ON CONFLICT (email) DO UPDATE
SET 
  auth_user_id = EXCLUDED.auth_user_id,
  role = 'admin',
  status = 'active',
  full_name = COALESCE(EXCLUDED.full_name, users.full_name);

-- For levragetestuser@gmail.com (Auth UID: 92854204-f50a-4294-b651-0c049e013972)
INSERT INTO users (email, full_name, auth_user_id, role, status)
VALUES (
  'levragetestuser@gmail.com',
  'Levrage Tester',
  '92854204-f50a-4294-b651-0c049e013972'::uuid,
  'member',
  'active'
)
ON CONFLICT (email) DO UPDATE
SET 
  auth_user_id = EXCLUDED.auth_user_id,
  role = COALESCE(EXCLUDED.role, users.role),
  status = 'active',
  full_name = COALESCE(EXCLUDED.full_name, users.full_name);

-- Verify the users were created
SELECT id, email, full_name, auth_user_id, role, status, created_at
FROM users
ORDER BY created_at DESC;
