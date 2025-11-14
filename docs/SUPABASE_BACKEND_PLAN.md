# Supabase Backend Implementation Plan
## The Wealth Shift Platform

### Executive Summary
This document outlines a comprehensive backend architecture using Supabase to support The Wealth Shift platform. The backend will enable admin management, data collection, user tracking, and content management while maintaining simplicity and scalability.

---

## Current Application Analysis

### Existing Features Requiring Backend:
1. **Assessment System** - Currently stores results in localStorage
2. **Portal Access** - No authentication or user management
3. **Packages** - Static content, no pricing management
4. **Community** - Static page, no post management
5. **Workbooks** - Static content, no progress tracking
6. **Contact Forms** - No data collection

### Key Pain Points:
- No data persistence beyond browser
- No admin control over content
- No user tracking or analytics
- No email collection beyond localStorage
- No pricing or package management

---

## Supabase Backend Architecture

### Phase 1: Core Infrastructure (Priority: HIGH)

#### 1.1 Database Schema

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  role VARCHAR(20) DEFAULT 'member', -- 'admin', 'member'
  status VARCHAR(20) DEFAULT 'active' -- 'active', 'inactive', 'pending'
);

-- Assessment Responses
CREATE TABLE assessment_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  wealth_shift_level VARCHAR(50),
  mindset_type VARCHAR(50),
  total_score INTEGER,
  responses JSONB NOT NULL, -- Store all Q&A
  completed_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Packages
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  duration VARCHAR(50), -- 'monthly', 'yearly', 'lifetime'
  features JSONB, -- Array of features
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Community Posts
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  post_type VARCHAR(20) DEFAULT 'update', -- 'update', 'announcement', 'event'
  is_published BOOLEAN DEFAULT false,
  is_pinned BOOLEAN DEFAULT false,
  tags JSONB, -- Array of tags
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

-- User Progress Tracking
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  workbook_id VARCHAR(50) NOT NULL,
  day_number INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, workbook_id, day_number)
);

-- Email Subscribers
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  source VARCHAR(50), -- 'landing', 'assessment', 'portal'
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'unsubscribed'
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP
);

-- Contact Submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new', -- 'new', 'read', 'responded'
  submitted_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45)
);

-- Activity Logs (for admin tracking)
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50), -- 'package', 'post', 'user', etc.
  entity_id UUID,
  details JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 1.2 Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public can read active packages
CREATE POLICY "Public can view active packages"
  ON packages FOR SELECT
  USING (is_active = true);

-- Public can read published posts
CREATE POLICY "Public can view published posts"
  ON community_posts FOR SELECT
  USING (is_published = true);

-- Admins can do everything
CREATE POLICY "Admins have full access"
  ON packages FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage posts"
  ON community_posts FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Users can view their own data
CREATE POLICY "Users can view own assessment"
  ON assessment_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

### Phase 2: Admin Dashboard (Priority: HIGH)

#### 2.1 Admin Features

**Dashboard Overview:**
- Total users count
- Assessment responses (today, week, month)
- Active packages
- Recent community posts
- Email subscribers count
- Contact submissions (unread count)

**Package Management:**
```typescript
interface PackageManagement {
  // CRUD operations
  - Create new package
  - Edit existing package (price, features, description)
  - Delete/deactivate package
  - Reorder packages (drag & drop)
  - Toggle featured status
  
  // Fields to manage:
  - Title
  - Description
  - Price (with currency)
  - Duration (monthly/yearly/lifetime)
  - Features list (add/remove/reorder)
  - Active/Inactive toggle
  - Featured toggle
  - Display order
}
```

**Community Post Management:**
```typescript
interface CommunityManagement {
  // CRUD operations
  - Create new post
  - Edit post
  - Delete post
  - Publish/Unpublish
  - Pin/Unpin important posts
  
  // Rich text editor for content
  // Image upload support
  // Tags management
  // Preview before publishing
}
```

**Assessment Responses View:**
```typescript
interface AssessmentView {
  // Filters
  - By date range
  - By wealth shift level
  - By mindset type
  - Search by email/name
  
  // Export functionality
  - Export to CSV
  - Export selected responses
  
  // Individual response details
  - View all Q&A
  - User contact info
  - Response timestamp
  - Calculated scores
}
```

**User Management:**
```typescript
interface UserManagement {
  // View all users
  - List with pagination
  - Search by email/name
  - Filter by role, status
  
  // User details
  - Profile information
  - Assessment results
  - Progress tracking
  - Last login
  
  // Actions
  - Update user role
  - Activate/deactivate user
  - Send email (integration)
}
```

**Email Subscribers:**
```typescript
interface SubscriberManagement {
  // View subscribers
  - List all subscribers
  - Filter by source
  - Search
  
  // Export
  - Export to CSV
  - Export for email marketing tools
  
  // Bulk actions
  - Bulk unsubscribe
}
```

**Contact Submissions:**
```typescript
interface ContactManagement {
  // Inbox style view
  - List submissions (newest first)
  - Mark as read/unread
  - Mark as responded
  - Delete
  
  // Individual view
  - Full message
  - Contact details
  - Response form
  - Status update
}
```

#### 2.2 Admin Routes Structure

```
/admin (protected)
  /dashboard - Overview metrics
  /packages - Package management
    /new - Create package
    /[id]/edit - Edit package
  /community - Post management
    /new - Create post
    /[id]/edit - Edit post
  /assessments - View responses
    /[id] - Individual response
  /users - User management
    /[id] - User profile
  /subscribers - Email list
  /contacts - Contact submissions
    /[id] - View submission
  /settings - Platform settings
```

---

### Phase 3: Frontend Integration (Priority: HIGH)

#### 3.1 Supabase Client Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  // Generated types from Supabase CLI
}
```

#### 3.2 Assessment Integration

**Update Assessment Flow:**
```typescript
// utils/assessment.ts - Add Supabase integration

export async function saveAssessmentToDatabase(
  email: string,
  fullName: string,
  phone: string | undefined,
  answers: AssessmentAnswer[],
  result: AssessmentResult
) {
  const { data, error } = await supabase
    .from('assessment_responses')
    .insert({
      email,
      full_name: fullName,
      phone,
      wealth_shift_level: result.wealthShiftLevel,
      mindset_type: result.mindsetType,
      total_score: result.totalScore,
      responses: answers,
      ip_address: await getClientIP(),
      user_agent: navigator.userAgent
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving assessment:', error)
    return null
  }

  // Also save to email_subscribers
  await supabase
    .from('email_subscribers')
    .upsert({
      email,
      full_name: fullName,
      source: 'assessment'
    })

  return data
}
```

#### 3.3 Package Display

```typescript
// app/portal/packages/page.tsx - Fetch from Supabase

export default async function PackagesPage() {
  const { data: packages } = await supabase
    .from('packages')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return (
    <div>
      {packages?.map(pkg => (
        <PackageCard key={pkg.id} package={pkg} />
      ))}
    </div>
  )
}
```

#### 3.4 Community Posts

```typescript
// app/portal/community/page.tsx - Fetch from Supabase

export default async function CommunityPage() {
  const { data: posts } = await supabase
    .from('community_posts')
    .select('*, author:users(full_name)')
    .eq('is_published', true)
    .order('is_pinned', { ascending: false })
    .order('published_at', { ascending: false })

  return (
    <div>
      {posts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

---

### Phase 4: Authentication & Authorization (Priority: MEDIUM)

#### 4.1 Admin Authentication

**Simple Email/Password Auth:**
```typescript
// Admin login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@thewealthshift.com',
  password: 'secure_password'
})

// Protected admin routes
export default async function AdminLayout({ children }) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user || user.user_metadata.role !== 'admin') {
    redirect('/login')
  }

  return <>{children}</>
}
```

#### 4.2 User Authentication (Optional for Phase 1)

**Email Magic Links:**
- Passwordless authentication
- Send magic link to email
- Simple user experience
- Can add later for portal access

---

### Phase 5: Additional Features (Priority: LOW)

#### 5.1 Analytics & Reporting

```typescript
// Admin analytics dashboard
interface Analytics {
  // User metrics
  - New users (daily, weekly, monthly)
  - Active users
  - User retention
  
  // Assessment metrics
  - Response rate
  - Average scores
  - Level distribution
  - Mindset distribution
  
  // Package metrics
  - Most viewed packages
  - Click-through rates
  
  // Community engagement
  - Post views
  - Most popular posts
}
```

#### 5.2 Email Integration

**Supabase Edge Functions:**
```typescript
// Send welcome email after assessment
// Send admin notification on new submission
// Send weekly community digest
```

#### 5.3 Progress Tracking

```typescript
// Track user workbook progress
// Sync with localStorage initially
// Migrate to database as auth is implemented
```

---

## Implementation Roadmap

### Week 1: Setup & Core Infrastructure
- [ ] Create Supabase project
- [ ] Set up database schema
- [ ] Configure RLS policies
- [ ] Install Supabase client in Next.js
- [ ] Set up environment variables
- [ ] Create database types

### Week 2: Admin Dashboard - Phase 1
- [ ] Create admin authentication
- [ ] Build admin layout
- [ ] Implement dashboard overview
- [ ] Create package management UI
- [ ] Implement package CRUD operations

### Week 3: Admin Dashboard - Phase 2
- [ ] Community post management
- [ ] Rich text editor integration
- [ ] Assessment responses view
- [ ] Export functionality (CSV)

### Week 4: Frontend Integration
- [ ] Update assessment flow with Supabase
- [ ] Connect packages page to database
- [ ] Connect community page to database
- [ ] Add email collection on landing page
- [ ] Contact form integration

### Week 5: Testing & Polish
- [ ] Test all CRUD operations
- [ ] Test RLS policies
- [ ] Performance optimization
- [ ] Error handling
- [ ] Admin user training
- [ ] Documentation

### Week 6: Advanced Features (Optional)
- [ ] User authentication
- [ ] Progress tracking
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Backup strategies

---

## Technical Requirements

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Dependencies to Install
```json
{
  "@supabase/supabase-js": "^2.38.0",
  "@supabase/auth-helpers-nextjs": "^0.8.0",
  "react-hook-form": "^7.48.0",
  "zod": "^3.22.0",
  "@tanstack/react-query": "^5.8.0"
}
```

### Admin UI Libraries (Optional)
```json
{
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-tabs": "^1.0.4",
  "react-quill": "^2.0.0", // Rich text editor
  "recharts": "^2.10.0" // Charts for analytics
}
```

---

## Security Considerations

### 1. API Keys Protection
- Use environment variables
- Never expose service role key in frontend
- Use RLS for data access control

### 2. Data Validation
- Validate all inputs on frontend and backend
- Use Zod for schema validation
- Sanitize user inputs (especially rich text)

### 3. Rate Limiting
- Implement rate limiting on API routes
- Prevent spam submissions
- Use Supabase Edge Functions for rate limiting

### 4. GDPR Compliance
- Add privacy policy
- Allow users to request data deletion
- Track consent for email collection
- Provide unsubscribe functionality

### 5. Backup Strategy
- Regular database backups (Supabase automatic)
- Export critical data regularly
- Version control for schema changes

---

## Cost Estimation (Supabase Free Tier)

### Free Tier Limits:
- Database: 500 MB
- Storage: 1 GB
- Bandwidth: 5 GB
- Edge Functions: 500K invocations
- Auth users: Unlimited

### Expected Usage:
- Users: ~1000 (small data footprint)
- Assessment responses: ~500/month (~50KB each = 25MB)
- Packages: ~10 (negligible)
- Posts: ~20/month (with images ~5MB total)
- Total: Well within free tier for first 6-12 months

### Scaling Plan:
- Start with free tier
- Monitor usage in Supabase dashboard
- Upgrade to Pro ($25/month) when needed
- Estimated need: 2000+ users or 100GB+ storage

---

## Success Metrics

### Technical Metrics:
- Page load time < 2s
- API response time < 500ms
- 99.9% uptime
- Zero data loss

### Business Metrics:
- Email collection rate > 30%
- Assessment completion rate > 60%
- Admin efficiency (time to update content < 5 min)
- User engagement tracking

---

## Next Steps

1. **Review this plan** with stakeholder
2. **Prioritize features** based on immediate needs
3. **Set up Supabase project**
4. **Begin Week 1 implementation**
5. **Schedule weekly check-ins** for progress review

---

## Support & Resources

### Supabase Documentation:
- https://supabase.com/docs
- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/guides/database

### Next.js + Supabase:
- https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

### Community:
- Supabase Discord
- Stack Overflow
- GitHub Discussions

---

**Document Version:** 1.0  
**Last Updated:** November 1, 2025  
**Author:** Development Team  
**Status:** Draft - Pending Review
