# Fix RLS Infinite Recursion Error

## Problem
You're seeing this error:
```
infinite recursion detected in policy for relation "users"
```

This happens because RLS policies on the `users` table are trying to query the `users` table to check if a user is an admin, which triggers the same policies again, creating infinite recursion.

## Solution

Run the migration file `supabase/migrations/007_fix_users_rls_recursion.sql` in your Supabase SQL Editor.

### Steps:

1. **Go to Supabase Dashboard**
   - Navigate to your project
   - Click on **SQL Editor** in the left sidebar

2. **Run the Migration**
   - Click **New Query**
   - Copy and paste the contents of `supabase/migrations/007_fix_users_rls_recursion.sql`
   - Click **Run** (or press Ctrl+Enter)

3. **Verify the Fix**
   - The query should complete successfully
   - Try accessing the admin dashboard again
   - The error should be gone

## What the Fix Does

1. **Creates a SECURITY DEFINER function** (`is_admin_user()`) that bypasses RLS to check if the current user is an admin
2. **Updates all user policies** to use `auth_user_id = auth.uid()` instead of matching `id` with JWT claims
3. **Fixes all admin-check policies** across all tables to use the new function instead of querying the users table directly

## After Running the Migration

1. **Refresh your browser** to clear any cached errors
2. **Sign out and sign back in** to refresh your session
3. **Navigate to `/admin`** - it should work now!

## If You Still Have Issues

1. Check that your user has `role = 'admin'` in the users table
2. Verify that `auth_user_id` is set correctly (should match the Supabase Auth user ID)
3. Make sure you're signed in with the correct account

