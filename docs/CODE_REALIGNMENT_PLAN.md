# Code Realignment Plan - The Wealth Shift

**Date:** October 31, 2025  
**Based on:** July-Feedback-Site-Reallign.md

---

## 🎯 Strategic Changes Overview

### Current Flow (What We Have):
```
Landing Page → Assessment → Manifesto → Unlock → Portal → Workbooks
```

### New Flow (What We Need):
```
Entry A (Social): Mini Lesson Page → Assessment → Manifesto → Dashboard
Entry B (Homepage): Videos Page → Assessment → Manifesto → Dashboard
```

---

## 📋 Required Code Changes

### 1. NEW PAGES TO CREATE

#### A. Mini Lesson Landing Page (`/mini-lessons/[slug]`)
**Purpose:** Entry point from social media
- Single video lesson + journal prompt
- CTA to take assessment for more
- Publicly accessible (no gate)
- Example: "Why You Keep Leaking Wealth"

#### B. Videos/Lessons Library Page (`/lessons`)
**Purpose:** Main video showcase before assessment
- Display snippet videos
- Invite to view full scope
- Strong CTA to assessment
- Replace or enhance current VideoSection

#### C. Tiered Membership Pages
- `/membership` - Overview of tiers
- `/membership/checkout/[tier]` - Payment flows
- Integrate Stripe for payments

### 2. MODIFY EXISTING PAGES

#### A. Landing Page (`src/app/page.tsx`)
**Changes:**
- Update hero CTA: "Start My Shift" → Go to `/lessons`
- Enhance VideoSection to be more prominent
- Add membership tier preview section
- Adjust flow to prioritize video content

#### B. Assessment Page (`src/app/assessment/page.tsx`)
**Changes:**
- Add entry tracking (social vs homepage)
- Store referral source in localStorage
- Adjust messaging based on entry point
- Update redirect logic after completion

#### C. Portal Dashboard (`src/app/portal/page.tsx`)
**Changes:**
- Add tier-based access control
- Show locked/unlocked content based on tier
- Add upsell prompts for locked content
- Display mini lessons vs full workbooks

### 3. NEW COMPONENTS TO BUILD

#### A. MiniLessonCard
- Video player
- Journal prompt section
- CTA to assessment
- Progress indicator

#### B. TierGate
- Shows locked content with preview
- Displays tier requirements
- CTA to upgrade
- Used throughout portal

#### C. MembershipTierCard
- Displays tier benefits
- Pricing display
- CTA to purchase
- Comparison view

#### D. VideoLibrary
- Grid of video cards
- Filter by category
- Snippet vs full video indicators
- Click to watch/unlock logic

### 4. BACKEND/STATE MANAGEMENT

#### A. User State (localStorage initially, then Firebase)
```typescript
interface UserState {
  email: string;
  assessmentComplete: boolean;
  manifestoSigned: boolean;
  membershipTier: 'free' | 'action-taker' | 'shifter-pro' | 'inner-circle';
  entrySource: 'social' | 'homepage' | 'direct';
  completedLessons: string[];
  completedChallenges: string[];
  workbookProgress: Record<string, number>;
}
```

#### B. Content Access Logic
```typescript
// Utility to check if user can access content
function canAccessContent(
  contentType: 'mini-lesson' | 'challenge' | 'workbook' | 'coaching',
  userTier: MembershipTier,
  contentId?: string
): boolean
```

### 5. DATA STRUCTURES

#### A. Mini Lessons
```typescript
interface MiniLesson {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  videoUrl: string;
  category: 'mindset' | 'debt' | 'investing';
  journalPrompt: string;
  isFree: boolean;
  relatedChallenge?: string;
  duration: string;
  thumbnail: string;
}
```

#### B. Membership Tiers
```typescript
interface MembershipTier {
  id: string;
  name: string;
  price: number;
  billingCycle?: 'one-time' | 'monthly' | 'annual';
  benefits: string[];
  accessLevel: number;
  includes: {
    miniLessons: number | 'all';
    challenges: number | 'all';
    workbooks: number | 'all';
    coaching: boolean;
  };
}
```

---

## 🔧 Implementation Priority

### Phase 1: Core Flow Changes (Week 1)
1. ✅ Create `/lessons` page with video library
2. ✅ Update landing page hero to point to lessons
3. ✅ Enhance VideoSection component
4. ✅ Update assessment to track entry source
5. ✅ Create basic mini lesson page structure

### Phase 2: Membership System (Week 2)
1. ✅ Create membership tier definitions
2. ✅ Build TierGate component
3. ✅ Add tier-based access control to portal
4. ✅ Create membership page
5. ✅ Implement basic tier logic (localStorage)

### Phase 3: Mini Lessons & Challenges (Week 3)
1. ✅ Build MiniLessonCard component
2. ✅ Create mini lesson pages
3. ✅ Add journal prompt functionality
4. ✅ Create challenge pack structure
5. ✅ Link lessons to challenges

### Phase 4: Payment Integration (Week 4)
1. ✅ Set up Stripe account
2. ✅ Create checkout flows
3. ✅ Implement payment success/failure pages
4. ✅ Add purchase confirmation emails
5. ✅ Store purchase status

### Phase 5: Polish & Testing (Week 5)
1. ✅ Test all user flows
2. ✅ Mobile optimization
3. ✅ Performance optimization
4. ✅ SEO for new pages
5. ✅ Analytics tracking

---

## 📝 File Structure Changes

### New Files to Create:
```
src/
├── app/
│   ├── lessons/
│   │   └── page.tsx                    # Video library page
│   ├── mini-lessons/
│   │   └── [slug]/
│   │       └── page.tsx                # Individual mini lesson
│   ├── membership/
│   │   ├── page.tsx                    # Membership overview
│   │   └── checkout/
│   │       └── [tier]/
│   │           └── page.tsx            # Checkout flow
│   └── challenges/
│       └── [id]/
│           └── purchase/
│               └── page.tsx            # Challenge purchase
├── components/
│   ├── MiniLessonCard.tsx
│   ├── TierGate.tsx
│   ├── MembershipTierCard.tsx
│   ├── VideoLibrary.tsx
│   └── JournalPrompt.tsx
├── utils/
│   ├── membership.ts                   # Tier logic
│   ├── content-access.ts               # Access control
│   └── mini-lessons.ts                 # Lesson data
└── data/
    ├── mini-lessons.json               # Lesson content
    ├── membership-tiers.json           # Tier definitions
    └── challenges.json                 # Challenge data
```

---

## 🎨 Design Considerations

### A. Mini Lesson Page Style
- Clean, focused design
- Prominent video player
- Distraction-free journal section
- Clear CTA to assessment
- Social proof elements

### B. Videos Library Style
- Grid layout with filters
- Video thumbnails with play overlay
- Category badges
- Duration indicators
- Lock icons for premium content

### C. Membership Page Style
- Comparison table
- Feature highlights
- Social proof
- Money-back guarantee (if applicable)
- FAQ section

---

## 🔄 Migration Strategy

### For Existing Users:
1. Check localStorage for assessment completion
2. Default to "free" tier if no tier set
3. Preserve existing workbook progress
4. Prompt to select tier on next login

### For New Users:
1. Track entry source
2. Guide through new flow
3. Store tier selection
4. Track engagement

---

## 📊 Success Metrics to Track

### Conversion Funnel:
- Social → Mini Lesson → Assessment → Conversion %
- Homepage → Videos → Assessment → Conversion %
- Free → Paid tier conversion %

### Engagement:
- Mini lesson completion rate
- Challenge pack purchases
- Workbook completion rate
- Retention by tier

---

## 🚀 Quick Wins (Can Implement Today)

1. **Update Landing Page Hero:**
   - Change CTA from "Start Assessment" to "Watch Our Videos"
   - Point to lessons page

2. **Create Lessons Page:**
   - Use existing VideoSection content
   - Add proper routing
   - Enhance with CTAs

3. **Add Entry Tracking:**
   - Simple localStorage flag
   - Track where users come from
   - Use in assessment flow

4. **Create Membership Tier Data:**
   - Define 4 tiers in JSON
   - Create utility functions
   - Add to portal display

---

## ⚠️ Technical Considerations

### A. Authentication
- Start with localStorage
- Migrate to Firebase Auth
- Plan for user accounts

### B. Payment Processing
- Stripe for all tiers
- Webhook for fulfillment
- Secure checkout flow

### C. Content Management
- Start with JSON files
- Migrate to CMS later
- Easy content updates

### D. Email Automation
- Capture emails at multiple points
- Tag by tier and entry source
- Automate based on actions

---

## 📧 User Tagging Strategy

### Tags to Implement:
```typescript
type UserTag = 
  | 'social-entry'           // Came from social media
  | 'homepage-entry'         // Came from homepage
  | 'assessment-complete'    // Completed assessment
  | 'manifesto-signed'       // Signed manifesto
  | 'tier-free'              // Free tier
  | 'tier-action-taker'      // $10 tier
  | 'tier-shifter-pro'       // $147 tier
  | 'tier-inner-circle'      // $997 tier
  | 'lesson-viewer'          // Watched mini lesson
  | 'challenge-purchaser'    // Bought challenge
  | 'workbook-active'        // Active in workbooks
  | 'needs-nudge'            // Inactive user
```

---

## 🎯 Next Immediate Steps

1. Update landing page hero CTA
2. Create basic `/lessons` page
3. Add entry source tracking
4. Define membership tiers in code
5. Create TierGate component skeleton

Ready to start implementing?
