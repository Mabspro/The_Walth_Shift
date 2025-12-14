# Blog, Authentication & Admin Dashboard Implementation Plan

## Overview
This document outlines the implementation plan for adding a blog system, user authentication, and an admin dashboard to The Wealth Shift platform.

---

## Phase 1: Database Schema Updates

### 1.1 Migration Files Created
- `supabase/migrations/004_blog_and_auth.sql` - Blog posts table, admin logs, user updates
- `supabase/migrations/005_blog_rls_policies.sql` - RLS policies for blog and admin features

### 1.2 Blog Posts Table
✅ Created in migration 004
- Full CRUD support
- Status workflow (draft → published → archived)
- SEO fields
- Tags and categories
- View tracking

### 1.3 Users Table Updates
✅ Already has `role` field (from initial schema)
- Added `auth_user_id` to link with Supabase Auth
- Role values: 'admin', 'member'
- Status values: 'active', 'inactive', 'pending'

### 1.4 Admin Activity Logs
✅ Created in migration 004
- Tracks all admin actions
- Links to admin user
- Stores action details in JSONB
- IP and user agent tracking

---

## Phase 2: Authentication System

### 2.1 Supabase Auth Integration
- Enable email/password authentication in Supabase
- Configure email templates
- Set up password reset flow

### 2.2 Assessment as Signup Flow
**Modify Assessment Modal/Form:**
- Add password field (optional initially)
- Add "Create Account" checkbox
- When user completes assessment:
  1. If "Create Account" is checked:
     - Create Supabase Auth user with email/password
     - Create user record in `users` table
     - Link assessment response to user
  2. If not checked:
     - Continue as guest (current behavior)

**Assessment Form Updates:**
```typescript
interface AssessmentFormData {
  email: string;
  fullName: string;
  phone?: string;
  password?: string; // New field
  createAccount?: boolean; // New field
  answers: AssessmentAnswer[];
}
```

### 2.3 Sign In Page
**Location:** `/signin`
- Email/password form
- "Forgot Password" link
- "Don't have an account? Start Assessment" link
- Redirect to portal after successful signin

### 2.4 Landing Page Updates
- Add "Sign In" button in NavBar (when not authenticated)
- Add "Sign Up" button that redirects to `/assessment`
- Show user name/dropdown when authenticated

### 2.5 Auth Middleware
- Protect portal routes (require authentication)
- Redirect unauthenticated users to signin
- Store session in cookies (Supabase SSR)

---

## Phase 3: Blog System

### 3.1 Blog Page (`/portal/blog`)
- List of published blog posts
- Featured post section
- Category/tag filtering
- Search functionality
- Pagination
- Individual post page (`/portal/blog/[slug]`)

### 3.2 Blog Card on Portal Dashboard
- Add to card grid
- Icon: 📝 or ✍️
- Title: "Blog"
- Description: "Read insights, stories, and wealth-building tips"
- Link: `/portal/blog`

### 3.3 Blog Post Template
- Rich text editor support
- Featured image
- Author info
- Publish date
- Tags/categories
- Related posts
- Social sharing

---

## Phase 4: Admin Dashboard

### 4.1 Admin Authentication
- Check user role = 'admin'
- Protect admin routes
- Admin-only middleware

### 4.2 Admin Layout (`/admin`)
- Sidebar navigation
- Main content area
- Header with user info
- Logout button

### 4.3 Admin Dashboard Sections

#### 4.3.1 Overview Dashboard
- Key metrics:
  - Total users
  - Total assessments
  - Total blog posts
  - Recent activity
  - Pending contact submissions

#### 4.3.2 Blog Management (`/admin/blog`)
- List all blog posts
- Create new post
- Edit existing post
- Delete/archive posts
- Preview before publishing
- Rich text editor (Tiptap or similar)
- Image upload
- SEO fields

#### 4.3.3 User Management (`/admin/users`)
- List all users
- View user details
- View user's assessment results
- View user progress
- Deactivate/activate users
- Change user roles

#### 4.3.4 Assessment Responses (`/admin/assessments`)
- View all assessment submissions
- Filter by date, wealth shift level, mindset type
- Export data
- View individual responses

#### 4.3.5 Contact Submissions (`/admin/contact`)
- View all contact form submissions
- Mark as read/responded
- Filter by status
- Export data

#### 4.3.6 Email Subscribers (`/admin/subscribers`)
- List all email subscribers
- Export list
- Filter by source
- Unsubscribe management

#### 4.3.7 Community Posts (`/admin/community`)
- Manage community posts
- Pin/unpin posts
- Edit/delete posts
- Moderate content

#### 4.3.8 Packages Management (`/admin/packages`)
- Edit package details
- Update pricing
- Manage features
- Set featured package

---

## Phase 5: Implementation Steps

### Step 1: Database Setup
1. Run migrations for blog_posts table
2. Update users table with role field
3. Create admin_activity_logs table
4. Set up RLS policies for blog posts
5. Create initial admin user (manually or via script)

### Step 2: Authentication
1. Configure Supabase Auth
2. Create signin page
3. Update assessment to include password/account creation
4. Add auth middleware
5. Update NavBar with signin/signup buttons
6. Protect portal routes

### Step 3: Blog System
1. Create blog utilities (getPosts, getPostBySlug, etc.)
2. Create blog listing page
3. Create individual blog post page
4. Add blog card to portal dashboard
5. Set up blog post types

### Step 4: Admin Dashboard
1. Create admin layout component
2. Create admin overview dashboard
3. Build blog management interface
4. Build user management interface
5. Build other admin sections
6. Add activity logging

### Step 5: Testing & Polish
1. Test authentication flows
2. Test blog creation/editing
3. Test admin permissions
4. Test RLS policies
5. UI/UX refinements

---

## Technical Considerations

### Authentication Flow
```
Landing Page
  ├─ Sign In → /signin → Portal (if authenticated)
  └─ Sign Up → /assessment → Create Account → Portal

Assessment
  ├─ Guest Mode → Save to localStorage/Supabase (no account)
  └─ Create Account → Supabase Auth + User Record → Portal
```

### Admin Access
- Only users with `role = 'admin'` can access `/admin/*`
- Admin routes protected by middleware
- Activity logged for all admin actions

### Blog Post Status
- `draft`: Not visible to public
- `published`: Visible on blog page
- `archived`: Hidden but preserved

### Rich Text Editor
- Recommended: Tiptap (React-based, extensible)
- Alternative: React Quill
- Support for:
  - Headings
  - Bold/Italic
  - Lists
  - Links
  - Images
  - Code blocks

---

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx (Admin layout)
│   │   ├── page.tsx (Dashboard overview)
│   │   ├── blog/
│   │   │   ├── page.tsx (Blog list)
│   │   │   ├── new/
│   │   │   │   └── page.tsx (Create blog)
│   │   │   └── [id]/
│   │   │       └── page.tsx (Edit blog)
│   │   ├── users/
│   │   │   └── page.tsx
│   │   ├── assessments/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── subscribers/
│   │       └── page.tsx
│   ├── portal/
│   │   ├── blog/
│   │   │   ├── page.tsx (Blog listing)
│   │   │   └── [slug]/
│   │   │       └── page.tsx (Individual post)
│   ├── signin/
│   │   └── page.tsx
│   └── assessment/
│       └── page.tsx (Updated with password field)
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx
│   │   ├── BlogEditor.tsx
│   │   ├── UserTable.tsx
│   │   └── DashboardStats.tsx
│   └── BlogPostCard.tsx
├── utils/
│   ├── auth.ts (Auth helpers)
│   ├── blog.ts (Blog utilities)
│   └── admin.ts (Admin utilities)
└── types/
    ├── blog.ts
    └── admin.ts
```

---

## Security Considerations

1. **RLS Policies:**
   - Blog posts: Public can read published, admins can read all
   - Users: Users can read own data, admins can read all
   - Admin logs: Admin only

2. **Password Requirements:**
   - Minimum 8 characters
   - Require uppercase, lowercase, number
   - Optional: special character

3. **Rate Limiting:**
   - Signin attempts
   - Password reset requests
   - Blog post creation

4. **Input Validation:**
   - Sanitize blog post content
   - Validate email formats
   - Prevent XSS attacks

---

## Next Steps

1. Review and approve this plan
2. Create database migrations
3. Set up Supabase Auth
4. Begin implementation in phases
5. Test each phase before moving to next

---

## Estimated Timeline

- **Phase 1 (Database):** 1-2 hours
- **Phase 2 (Auth):** 3-4 hours
- **Phase 3 (Blog):** 4-5 hours
- **Phase 4 (Admin):** 6-8 hours
- **Phase 5 (Testing):** 2-3 hours

**Total:** ~16-22 hours

