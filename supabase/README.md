# Supabase Database Setup

This directory contains SQL migration files for setting up The Wealth Shift database in Supabase.

## Setup Instructions

### 1. Access Supabase SQL Editor

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/sjwuxdwcvtmrbbizjshy
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**

### 2. Run Migrations in Order

Run these SQL files in the following order:

1. **001_initial_schema.sql** - Creates all database tables
2. **002_rls_policies.sql** - Sets up Row Level Security policies
3. **003_seed_initial_data.sql** - Inserts initial package data

### 3. Verify Setup

After running the migrations, verify:

- All tables are created (check in **Table Editor**)
- RLS is enabled on all tables
- Initial packages are visible in the `packages` table

## Database Schema Overview

### Core Tables

- **users** - User accounts and profiles
- **assessment_responses** - Assessment quiz results
- **packages** - Product packages and pricing
- **community_posts** - Community content and announcements
- **user_progress** - Workbook progress tracking
- **email_subscribers** - Email list management
- **contact_submissions** - Contact form submissions
- **activity_logs** - Admin activity tracking

## Security

All tables have Row Level Security (RLS) enabled with appropriate policies:
- Public can read active packages and published posts
- Anyone can submit assessments and contact forms
- Admins have full access to all tables
- Users can only access their own data

## Next Steps

After running the migrations:
1. Create an admin user (manually in Supabase Auth or via SQL)
2. Test the API connections from the frontend
3. Begin integrating frontend pages with Supabase

