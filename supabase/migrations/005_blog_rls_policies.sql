-- RLS Policies for Blog Posts and Admin Features

-- Enable RLS on blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published blog posts
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Admins can do everything with blog posts
CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth_user_id FROM users WHERE auth_user_id = auth.uid())
      AND users.role = 'admin'
    )
  );

-- Enable RLS on admin_activity_logs
ALTER TABLE admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can read activity logs
CREATE POLICY "Only admins can read activity logs"
  ON admin_activity_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth_user_id FROM users WHERE auth_user_id = auth.uid())
      AND users.role = 'admin'
    )
  );

-- Only admins can insert activity logs
CREATE POLICY "Only admins can insert activity logs"
  ON admin_activity_logs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth_user_id FROM users WHERE auth_user_id = auth.uid())
      AND users.role = 'admin'
    )
  );

-- Update users RLS to allow admins to read all users
-- (Assuming users table already has RLS enabled from previous migration)
CREATE POLICY "Admins can read all users"
  ON users FOR SELECT
  USING (
    role = 'admin' OR
    id = (SELECT id FROM users WHERE auth_user_id = auth.uid())
  );

