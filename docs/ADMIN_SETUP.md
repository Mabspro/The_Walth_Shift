# Admin Setup Guide

## How Admins Sign In

Admins sign in the **exact same way** as regular users:

1. Go to `/signin` (or click "Sign In" in the navigation)
2. Enter their email and password
3. Click "Sign In"
4. If they have admin role, they can access `/admin` dashboard

**Note:** The system automatically detects admin status based on the `role` field in the database. Admins can access both the regular portal (`/portal`) and the admin dashboard (`/admin`).

## Setting Up Your First Admin

### Option 1: Via Supabase Dashboard (Recommended)

1. **Sign up a regular account first:**
   - Complete the assessment and create an account
   - Or sign up through the signin page

2. **Go to Supabase Dashboard:**
   - Navigate to your Supabase project
   - Go to **Table Editor** → **users** table

3. **Find your user:**
   - Search for your email address
   - Click on your user row

4. **Update the role:**
   - Find the `role` field
   - Change it from `member` to `admin`
   - Click **Save**

5. **Verify:**
   - Sign out and sign back in
   - Navigate to `/admin` - you should now have access!

### Option 2: Via SQL Editor

1. **Go to Supabase SQL Editor**

2. **Run this SQL query** (replace `your-email@example.com` with your actual email):

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

3. **Verify the update:**

```sql
SELECT email, full_name, role, status
FROM users
WHERE email = 'your-email@example.com';
```

You should see `role = 'admin'`

4. **Sign out and sign back in**, then navigate to `/admin`

### Option 3: Create Admin Directly in Database

If you want to create an admin user directly (without going through signup):

```sql
-- First, create the auth user in Supabase Auth (via Dashboard or Auth API)
-- Then link it to the users table:

INSERT INTO users (email, full_name, role, status, auth_user_id)
VALUES (
  'admin@example.com',
  'Admin User',
  'admin',
  'active',
  'auth-user-id-from-supabase-auth' -- Get this from Supabase Auth dashboard
);
```

## Admin Features

Once you have admin access, you can:

- **Dashboard** (`/admin`) - Overview with statistics
- **Blog Management** (`/admin/blog`) - Create, edit, publish blog posts
- **User Management** (`/admin/users`) - View and manage all users
- **Assessment Responses** (`/admin/assessments`) - View all assessment submissions
- **Contact Submissions** (`/admin/contact`) - Manage contact form messages
- **Email Subscribers** (`/admin/subscribers`) - View and export email list
- **Community Posts** (`/admin/community`) - Manage community posts
- **Package Management** (`/admin/packages`) - Manage packages

## Security Notes

1. **Admin routes are protected** - Only users with `role = 'admin'` can access `/admin/*`
2. **RLS Policies** - Row Level Security policies ensure admins can access all data
3. **Session-based** - Admin status is checked on each page load
4. **No special signin** - Admins use the same signin flow as regular users

## Troubleshooting

### "Access Denied" when trying to access `/admin`

1. **Check your role in database:**
   ```sql
   SELECT email, role FROM users WHERE email = 'your-email@example.com';
   ```
   Should show `role = 'admin'`

2. **Sign out and sign back in** - Admin status is checked on login

3. **Check browser console** - Look for any errors

4. **Verify RLS policies** - Make sure RLS policies allow admin access

### Can't find my user in the database

- Make sure you've completed the signup process
- Check the `users` table in Supabase
- Your email should match exactly (case-sensitive in some cases)

### Need to remove admin access

```sql
UPDATE users
SET role = 'member'
WHERE email = 'user-email@example.com';
```

## Multiple Admins

You can have multiple admins. Just set `role = 'admin'` for any user you want to grant admin access to.

```sql
-- Make multiple users admins
UPDATE users
SET role = 'admin'
WHERE email IN ('admin1@example.com', 'admin2@example.com', 'admin3@example.com');
```

