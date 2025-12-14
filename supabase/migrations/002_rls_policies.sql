-- The Wealth Shift - Row Level Security (RLS) Policies
-- Run this in Supabase SQL Editor after the schema is created

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PACKAGES POLICIES
-- ============================================

-- Public can read active packages
CREATE POLICY "Public can view active packages"
  ON packages FOR SELECT
  USING (is_active = true);

-- Admins can do everything on packages
CREATE POLICY "Admins have full access to packages"
  ON packages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND users.role = 'admin'
    )
  );

-- ============================================
-- COMMUNITY POSTS POLICIES
-- ============================================

-- Public can read published posts
CREATE POLICY "Public can view published posts"
  ON community_posts FOR SELECT
  USING (is_published = true);

-- Admins can do everything on posts
CREATE POLICY "Admins can manage posts"
  ON community_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND users.role = 'admin'
    )
  );

-- ============================================
-- ASSESSMENT RESPONSES POLICIES
-- ============================================

-- Anyone can insert assessment responses (for public assessment)
CREATE POLICY "Anyone can submit assessment"
  ON assessment_responses FOR INSERT
  WITH CHECK (true);

-- Users can view their own assessment (if authenticated)
CREATE POLICY "Users can view own assessment"
  ON assessment_responses FOR SELECT
  USING (
    email = current_setting('request.jwt.claims', true)::json->>'email'
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND users.role = 'admin'
    )
  );

-- Admins can view all assessments
CREATE POLICY "Admins can view all assessments"
  ON assessment_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND users.role = 'admin'
    )
  );

-- ============================================
-- USER PROGRESS POLICIES
-- ============================================

-- Users can view their own progress
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (
    user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    OR EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND users.role = 'admin'
    )
  );

-- Users can insert/update their own progress
CREATE POLICY "Users can update own progress"
  ON user_progress FOR INSERT
  WITH CHECK (
    user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
  );

CREATE POLICY "Users can update own progress records"
  ON user_progress FOR UPDATE
  USING (
    user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
  );

-- ============================================
-- EMAIL SUBSCRIBERS POLICIES
-- ============================================

-- Anyone can insert email subscribers (for public forms)
CREATE POLICY "Anyone can subscribe"
  ON email_subscribers FOR INSERT
  WITH CHECK (true);

-- Admins can view all subscribers
CREATE POLICY "Admins can view subscribers"
  ON email_subscribers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND users.role = 'admin'
    )
  );

-- Users can unsubscribe themselves (by email)
CREATE POLICY "Users can unsubscribe"
  ON email_subscribers FOR UPDATE
  USING (
    email = current_setting('request.jwt.claims', true)::json->>'email'
  );

-- ============================================
-- CONTACT SUBMISSIONS POLICIES
-- ============================================

-- Anyone can submit contact forms
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Admins can view all contact submissions
CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND users.role = 'admin'
    )
  );

-- Admins can update contact submissions (mark as read, etc.)
CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND users.role = 'admin'
    )
  );

-- ============================================
-- USERS POLICIES
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (
    id::text = current_setting('request.jwt.claims', true)::json->>'sub'
  );

-- Admins can view all users
CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND u.role = 'admin'
    )
  );

-- ============================================
-- ACTIVITY LOGS POLICIES
-- ============================================

-- Only admins can view activity logs
CREATE POLICY "Admins can view activity logs"
  ON activity_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = current_setting('request.jwt.claims', true)::json->>'sub'
      AND users.role = 'admin'
    )
  );

-- System can insert activity logs (via service role)
-- This will be handled server-side with service role key

