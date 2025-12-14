# Find Your User and Set Admin Role

## Step 1: Find Your User

Run this query to see all users (or search by email):

```sql
-- Option 1: See all users
SELECT id, email, full_name, auth_user_id, role, status, created_at
FROM users
ORDER BY created_at DESC;

-- Option 2: Search by email (case-insensitive, partial match)
SELECT id, email, full_name, auth_user_id, role, status
FROM users
WHERE email ILIKE '%mabspro%';

-- Option 3: Search by exact email
SELECT id, email, full_name, auth_user_id, role, status
FROM users
WHERE email = 'mabspro34@gmail.com';
```

## Step 2: Update Role to Admin

Once you find your user, run this (replace with your actual email):

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'your-actual-email@example.com';
```

**Important:** Remove any comments from the same line as the SQL statement. Comments should be on separate lines or removed entirely.

## Step 3: Verify the Update

```sql
SELECT id, email, full_name, role, status
FROM users
WHERE email = 'your-actual-email@example.com';
```

You should see `role = 'admin'`.

## Step 4: Access Admin Dashboard

1. Sign out of your current session
2. Sign back in
3. Navigate to `/admin` or click the "Admin" link in navigation
4. You should now have access!

## Troubleshooting

### If no user is found:
- Check if you completed the signup process
- The user might be in Supabase Auth but not in the users table
- Check the Supabase Auth dashboard to see registered users

### If the UPDATE doesn't work:
- Make sure you're using the exact email (case-sensitive in some databases)
- Check that the user exists first with a SELECT query
- Remove any comments from the SQL statement

