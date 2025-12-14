# Vercel Environment Variables Setup

## Quick Setup Guide

### Step 1: Access Vercel Project Settings

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: **the-wealth-shift** (or your project name)
3. Click on **Settings** in the top navigation
4. Click on **Environment Variables** in the left sidebar

### Step 2: Add Supabase Environment Variables

Add these two **required** environment variables:

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
- **Key:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://sjwuxdwcvtmrbbizjshy.supabase.co`
- **Environment:** Select all (Production, Preview, Development)
- Click **Save**

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Key:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqd3V4ZHdjdnRtcmJiaXpqc2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MzgxMDEsImV4cCI6MjA4MTMxNDEwMX0.VFBwQqZHLFUlyoFRwytaBWDLJsU4-YtVr_pnGPvuYhM`
- **Environment:** Select all (Production, Preview, Development)
- Click **Save**

### Step 3: Redeploy

After adding the environment variables:

1. Go to the **Deployments** tab
2. Click the **⋯** (three dots) menu on your latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic redeployment

## Environment Variable Details

### NEXT_PUBLIC_SUPABASE_URL
- **Purpose:** Your Supabase project API URL
- **Format:** `https://[project-id].supabase.co`
- **Where to find:** Supabase Dashboard → Settings → API → Project URL

### NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Purpose:** Public anonymous key for client-side Supabase operations
- **Security:** Safe to expose in frontend (protected by RLS policies)
- **Where to find:** Supabase Dashboard → Settings → API → Project API keys → `anon` `public`

## Verification

After deployment, verify the environment variables are working:

1. Visit your deployed site
2. Open browser DevTools → Console
3. Try submitting an assessment
4. Check Supabase Dashboard → Table Editor → `assessment_responses` to see if data is being saved

## Troubleshooting

### Variables Not Working?
- Ensure variables are added to **all environments** (Production, Preview, Development)
- Redeploy after adding variables (they don't apply to existing deployments)
- Check variable names match exactly (case-sensitive)
- Verify no extra spaces in values

### Still Having Issues?
- Check Vercel deployment logs for errors
- Verify Supabase project is active
- Ensure RLS policies are set up correctly
- Test locally with `.env.local` first

## Security Notes

✅ **Safe to expose:**
- `NEXT_PUBLIC_SUPABASE_URL` - Public API endpoint
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Protected by RLS policies

❌ **Never expose:**
- `SUPABASE_SERVICE_ROLE_KEY` - Full database access (server-side only)
- Database connection strings with passwords

