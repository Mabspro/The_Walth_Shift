-- Fix infinite recursion in users table RLS policies
-- The issue is that policies are querying the users table to check admin status,
-- which triggers the same policies again, causing infinite recursion.

-- Solution: Use a SECURITY DEFINER function that bypasses RLS for admin checks

-- Create a function to check if current user is admin (bypasses RLS)
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE auth_user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Drop existing users policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Admins can update any user" ON users;

-- Users can view their own profile using auth_user_id
-- This uses auth.uid() which doesn't require querying the users table
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (
    auth_user_id = auth.uid()
  );

-- Admins can view all users (uses function that bypasses RLS)
CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (is_admin_user());

-- Also allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth_user_id = auth.uid())
  WITH CHECK (auth_user_id = auth.uid());

-- Admins can update any user
CREATE POLICY "Admins can update any user"
  ON users FOR UPDATE
  USING (is_admin_user());

-- Fix other policies that incorrectly reference users.id instead of auth_user_id
-- These policies were using users.id::text = JWT 'sub', but 'sub' is auth.uid(), not users.id

-- Drop and recreate policies that check admin status using the function
DROP POLICY IF EXISTS "Admins have full access to packages" ON packages;
DROP POLICY IF EXISTS "Admins can manage posts" ON community_posts;
DROP POLICY IF EXISTS "Admins can view all assessments" ON assessment_responses;
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Admins can view subscribers" ON email_subscribers;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admins can view activity logs" ON activity_logs;

-- Recreate with fixed admin checks
CREATE POLICY "Admins have full access to packages"
  ON packages FOR ALL
  USING (is_admin_user());

CREATE POLICY "Admins can manage posts"
  ON community_posts FOR ALL
  USING (is_admin_user());

CREATE POLICY "Admins can view all assessments"
  ON assessment_responses FOR SELECT
  USING (is_admin_user());

-- For user_progress, we need to find the user's id by matching auth_user_id
-- Create a helper function to get current user's id
CREATE OR REPLACE FUNCTION get_current_user_id()
RETURNS UUID AS $$
BEGIN
  RETURN (SELECT id FROM users WHERE auth_user_id = auth.uid() LIMIT 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (
    user_id = get_current_user_id()
    OR is_admin_user()
  );

CREATE POLICY "Admins can view subscribers"
  ON email_subscribers FOR SELECT
  USING (is_admin_user());

CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT
  USING (is_admin_user());

CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions FOR UPDATE
  USING (is_admin_user());

CREATE POLICY "Admins can view activity logs"
  ON activity_logs FOR SELECT
  USING (is_admin_user());

-- Fix blog post policies (from migration 005)
DROP POLICY IF EXISTS "Admins can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Only admins can read activity logs" ON admin_activity_logs;
DROP POLICY IF EXISTS "Only admins can insert activity logs" ON admin_activity_logs;
DROP POLICY IF EXISTS "Admins can read all users" ON users;

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  USING (is_admin_user());

CREATE POLICY "Only admins can read activity logs"
  ON admin_activity_logs FOR SELECT
  USING (is_admin_user());

CREATE POLICY "Only admins can insert activity logs"
  ON admin_activity_logs FOR INSERT
  WITH CHECK (is_admin_user());

-- Fix user_progress insert/update policies to use the helper function
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress records" ON user_progress;

CREATE POLICY "Users can update own progress"
  ON user_progress FOR INSERT
  WITH CHECK (
    user_id = get_current_user_id()
  );

CREATE POLICY "Users can update own progress records"
  ON user_progress FOR UPDATE
  USING (
    user_id = get_current_user_id()
  );

