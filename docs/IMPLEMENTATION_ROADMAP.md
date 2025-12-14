# Blog, Auth & Admin - Implementation Roadmap

## Quick Start Checklist

### ✅ Phase 1: Database (COMPLETED)
- [x] Migration 004 created (blog_posts, admin_logs, user updates)
- [x] Migration 005 created (RLS policies)
- [ ] Run migrations in Supabase
- [ ] Verify tables created correctly

### Phase 2: Authentication (NEXT)
- [ ] Set up Supabase Auth configuration
- [ ] Create signin page (`/signin`)
- [ ] Update assessment to include password field
- [ ] Add account creation flow in assessment
- [ ] Update NavBar with signin/signup buttons
- [ ] Create auth middleware for protected routes
- [ ] Test signup flow
- [ ] Test signin flow

### Phase 3: Blog System
- [ ] Create blog utilities (`src/utils/blog.ts`)
- [ ] Create blog listing page (`/portal/blog`)
- [ ] Create individual blog post page (`/portal/blog/[slug]`)
- [ ] Add blog card to portal dashboard
- [ ] Create blog post types
- [ ] Test blog display

### Phase 4: Admin Dashboard
- [ ] Create admin layout component
- [ ] Create admin overview dashboard
- [ ] Build blog management interface
- [ ] Build user management interface
- [ ] Build assessment responses viewer
- [ ] Build contact submissions viewer
- [ ] Build email subscribers viewer
- [ ] Add activity logging
- [ ] Test admin permissions

---

## Detailed Implementation Order

### Step 1: Run Database Migrations
```bash
# In Supabase SQL Editor, run:
1. supabase/migrations/004_blog_and_auth.sql
2. supabase/migrations/005_blog_rls_policies.sql
```

### Step 2: Configure Supabase Auth
1. Go to Supabase Dashboard → Authentication → Settings
2. Enable Email provider
3. Configure email templates
4. Set password requirements
5. Enable email confirmations (optional)

### Step 3: Create Sign In Page
- File: `src/app/signin/page.tsx`
- Form: Email + Password
- Links: "Forgot Password", "Sign Up → Assessment"
- Redirect: To portal after successful signin

### Step 4: Update Assessment
- Add password field (conditional)
- Add "Create Account" checkbox
- On submit: Create Supabase Auth user if checked
- Link auth user to users table
- Continue to portal

### Step 5: Update NavBar
- Show "Sign In" when not authenticated
- Show "Sign Up" → redirects to `/assessment`
- Show user name/dropdown when authenticated
- Add logout functionality

### Step 6: Create Blog Utilities
- `getBlogPosts()` - Get published posts
- `getBlogPostBySlug()` - Get single post
- `getBlogCategories()` - Get categories
- `getBlogTags()` - Get tags

### Step 7: Create Blog Pages
- Blog listing with pagination
- Individual post page
- Add to portal navigation

### Step 8: Create Admin Dashboard
- Start with overview
- Add blog management
- Add user management
- Add other sections incrementally

---

## Key Files to Create

### Authentication
- `src/app/signin/page.tsx`
- `src/utils/auth.ts`
- `src/middleware.ts` (update existing)

### Blog
- `src/app/portal/blog/page.tsx`
- `src/app/portal/blog/[slug]/page.tsx`
- `src/utils/blog.ts`
- `src/types/blog.ts`
- `src/components/BlogPostCard.tsx`

### Admin
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/blog/page.tsx`
- `src/app/admin/blog/new/page.tsx`
- `src/app/admin/blog/[id]/page.tsx`
- `src/components/admin/AdminLayout.tsx`
- `src/components/admin/BlogEditor.tsx`
- `src/utils/admin.ts`

---

## Testing Checklist

### Authentication
- [ ] Can sign up via assessment
- [ ] Can sign in with email/password
- [ ] Can reset password
- [ ] Protected routes redirect to signin
- [ ] Session persists across page reloads
- [ ] Logout works correctly

### Blog
- [ ] Blog listing shows published posts
- [ ] Individual post page displays correctly
- [ ] Draft posts not visible to public
- [ ] Blog card links correctly

### Admin
- [ ] Only admins can access `/admin/*`
- [ ] Can create blog post
- [ ] Can edit blog post
- [ ] Can publish/unpublish posts
- [ ] Can view users
- [ ] Can view assessment responses
- [ ] Activity logs are created

---

## Notes

- Start with authentication first (foundation for everything)
- Blog can work without admin initially (manual DB entries)
- Admin dashboard can be built incrementally
- Test each feature before moving to next

