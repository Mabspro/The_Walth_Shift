The Wealth Shift Site Build
🔍 Summary of the Flow
🧭 Overall Journey:
Start My Shift → Go to videos page > Review Snippet Videos
invite to view full scope of viseos
be taken to the assessment page


Take Assessment (13 Qs, scored) → 


Sign Manifesto →


Watch Welcome Video → (Move to the landing page - TBD)


Enter Portal → 


See Personalized Journey based on assessment results → See and view all videos


Start Workbooks (one or more) →


Track Daily Progress (7-day tracker per workbook) →


Unlock Challenges upon completion →


Earn Rewards →


Complete All Workbooks + Challenges →


Receive final rewards + offer for strategy session



🧪 Assessment Logic
🎯 Purpose:
Place users in 1 of 4 Wealth Shift Levels


Identify Mindset Type


Recommend specific Workbooks to begin with


🔢 Structure:
13 questions, each with 4 options (A–D scored 1–4)


Max score: 52


Evaluation is based on:


Total Score → Wealth Shift Level


Q1–Q4 Subtotal → Mindset Type


Conditional logic on specific questions → Workbook Recommendations


📥 Output:
Wealth Shift Level (Seed, Groundbreaker, Pathwalker, Oracle)


Mindset (Fixed, Neutral, Growth)


Recommended Workbook Checklist (with icons, download buttons)



📘 Workbook & Tracker System
Once a user selects a workbook:


They confirm start → opt into tracking + emails


7-day (or multi-day) tracker appears


Each day they check off “✔ Completed”


Progress is saved (per user, per workbook)


Completion triggers:


Unlock of associated challenge


Email reward & badge logic



⚔️ Challenges
Each completed workbook → unlocks 1 challenge


Challenge includes:


3–5 action steps


1–2 reflection prompts


Optional proof submission (checkboxes or short answer)


Completion unlocks:


Badge


Mystery gift (discount)


CTA to next workbook



🎁 Final Completion Logic
User finishes all recommended workbooks + challenges


Triggers:


🎓 Certificate of Completion


☕ Starbucks gift card


💼 Invite to book 1-on-1 session with Beryl



📬 Email Logic (Trigger Points)
✅ Workbook Start → Begin coaching email series


❌ Missed day → Send nudge/reminder


✅ Workbook Complete → Celebrate + unlock challenge email


✅ Challenge Complete → Badge + gift + next steps email


🏁 All Complete → Certificate + gift card + coaching offer


Needs:
Tagging per user status


Flodesk, ConvertKit, or Podia integration


Zapier / Make.com or Firebase functions for automation



🛠 Development Requirements by System
Feature
Backend Need
Frontend
Assessment logic
JS function or Firebase Cloud Function
Dynamic quiz form
Progress tracking
Firebase Firestore or Realtime DB
Progress UI & buttons
Email triggers
Zapier / Make / Cloud Functions
None directly
Badge system
Firestore flags per user
Badge component display
Challenge unlock
Logic after completion == 100%
Modal + unlock message
Personalized dashboard
Firestore + auth
Portal with user data binding
Final rewards
Cloud function trigger
Final screen logic


✅ What Makes This Powerful
Emotional onboarding → Purposeful journey


Smart branching logic → Tailored UX


Gamified progress → Motivation maintained


Seamless tech handoff via Firebase + form integrations
END Edits for Phase one

🧭 Current Stage: Option 2 Completed or Near-Complete
✅ What’s Already Delivered or Built:
Frontend: Next.js + Tailwind layout, clean navigation


Hero Section: On-brand, elegant, visually compelling


Assessment + Manifesto Pages: Functional (using Tally or placeholder form logic)


Unlock Page: Visual confirmation of “You’re In!” experience


Portal UI: Initial layout and navigation for personalized journey


Overall UX: Branded, empowering, and flows naturally


Staging and Deployment: Live on Vercel


🚧 Option 2 Status: ~90–95% Complete
All static and semi-dynamic components are built and staged. What's currently simulated or manually embedded (e.g., assessment results, progress tracking, tagging, gated logic) would need to be powered dynamically in Option 3.

🔀 Transition Point: Moving into Option 3 – Full Custom Site
The Project is poised to expand into Option 3, which means activating real-time logic, user state persistence, email integration, and backend automation.

🛠️ Option 3: Expansion Pathway
🧩 Core Backend Features to Add:
Feature
Tool
Purpose
Auth (optional-lite)
Firebase Auth
Track each user’s journey uniquely
Quiz Scoring Engine
Cloud Functions or local JS
Dynamic result generation from assessment
User Progress Tracking
Firebase Firestore
Save workbook, day status, challenge states
Workbook Completion Logic
Firestore triggers or app logic
Track %, unlock challenges, issue rewards
Challenge Form Logic
Firestore + storage
Record submissions, trigger reward logic
Email Automation
Zapier/Make or Firebase + Flodesk
Nudge, reward, and segment users dynamically


🔁 Steps to Proceed into Option 3
🔹 Step 1: Firebase Setup
Create Firebase project


Enable Firestore (DB), Auth (email/password or magic link), Hosting (if needed)


Configure security rules to support per-user tracking


🔹 Step 2: Implement Quiz Logic
Convert static assessment → score engine (JS or Firebase Cloud Function)


Return Wealth Level, Mindset, and Workbook list dynamically


Store results in Firestore under user record


🔹 Step 3: Add Workbook Tracker
Build daily tracker component (7-day checklist)


Store progress per workbook per user


Trigger unlock logic when progress = 100%


🔹 Step 4: Challenge + Badge System
Build form component with checklist + reflections


Store completion state


Trigger badge UI + coupon email logic


🔹 Step 5: Email Integrations
Use Firebase + Zapier to trigger:


Workbook started → coaching sequence


Workbook complete → challenge unlock email


Final reward → certificate + gift email



🧮 Development Layers Breakdown (Option 3)
Layer
What You Build
Frontend
Dynamic React components for portal, progress, challenges
Logic Layer
JS/Cloud Functions: scoring, unlocks, tagging logic
Persistence
Firestore schemas: user profile, workbooks, challenges
Automation Layer
Zapier/Make.com + email provider API
CMS (optional)
Firebase table or Sanity for editable content
Admin Portal (future)
Simple dashboard to track user activity


🔐 Security & Role Management (Optional)
For now, basic uid-based Firestore rules are enough, but you can expand into:
Admin role (for Beryl)


Restrict access to unlockables based on state



✅ Conclusion: We are at the Perfect Pivot Point
We have built the entire frontend framework of Option 3 during Option 2 delivery. The design is scale-ready.

RUNNING NOTES 06.22.25

🧠 STRATEGIC FLOW (RECOMMENDED STRUCTURE)
🚪 Entry Point A: Direct from Social (Instagram, TikTok, YouTube)
Goes straight to 1 featured Mini Lesson Landing Page
Can watch video + do journal prompt
At bottom: “To access the full lesson series + track your financial growth... take the test.”
🎯 CTA: “Unlock More Lessons by Taking the Free Financial Standing Quiz”

🎯 Entry Point B: Homepage / Organic Traffic
Welcome video: “Welcome to The Wealth Shift”
Invitation to take Financial Literacy Assessment immediately
Message: “This is your starting point. Because if you don’t know where you are financially, how will you know where to go?”
Results page introduces:
Your Wealth Shift Level
Recommended Workbooks
Invite to sign the Manifesto and begin your journey
Optional: Join a membership tier or just explore freely
🔑 Flow After Assessment:
Takes quiz
Gets result
Chooses to:
✅ Sign the Manifesto (unlocks more)
🛍 Buy recommended workbook
👣 Join a membership
🔁 Or keep learning for free (with email capture)
🧱 BACK-END STRUCTURE (TELL YOUR DEVELOPER)
You’ll want to tag users based on how they arrive:
Visitor Type
Access Granted
Call to Action
🔗 Social Media Visitor
1 free Mini Lesson
"Unlock more with the Financial Quiz"
🏠 Direct Website Visitor
Prompted to take Assessment
“Start Your Wealth Shift”
📧 Email Subscriber
See dashboard + full lessons (after quiz)
“Pick up where you left off”
🧾 Member (Tiered)
Access based on tier
Dashboard with content map


💡 SMART PSYCHOLOGY TRIGGERS
Here’s why your system will work:
Reciprocity: You give something free that’s actually valuable.
Progress Path: People know where they stand, what to do next.
Commitment: Manifesto makes it feel meaningful (not just another freebie site).
Gamified Growth: Users see levels, badges, track progress = dopamine hits.
Aligned Offers: Nothing feels like a hard sell, because every offer flows from their experience.

🧭 FINAL VISITOR JOURNEY OPTIONS
Action
Experience
Clicks from TikTok
Gets 1 Mini Lesson → Prompt to take Financial Test for more
Arrives on homepage
Intro Video → Assessment → Results → Manifesto → Full access
Takes assessment first
Gets customized Wealth Shift Level → Suggestions
Signs Manifesto
Unlocks dashboard + tracks growth, challenges, lessons
Pays for a tier
Unlocks premium features (downloads, coaching, deeper tracking)


🧰 WHAT YOU NEED BUILT
Tell your web dev to build:
Open Mini Lesson Page (x1) – Public
Gated Lesson Library – Requires quiz + Manifesto
Financial Literacy Test – With scoring + level mapping
Manifesto Page – Simple, beautiful, affirming
User Dashboard – Tracks progress, gives access by tier
Tiered Membership – Paywall with Stripe or Memberstack
Email Capture Throughout – Even on free content
✅ PART 1: USER JOURNEY FLOW – From First Click to Full Membership
🎯 GOAL: Attract → Engage → Educate → Convert (without pressure)

🔁 USER FLOW MAP
plaintext
CopyEdit
[SOCIAL MEDIA POST or REEL]
        ↓
[Mini Lesson Landing Page – FREE Access]
        ↓
[Watch Lesson Video + Journal Prompt]
        ↓
[CTA: “Want to Go Further?” → Financial Literacy Test]
        ↓
[User Takes Test → Gets Result + Wealth Shift Level]
        ↓
[Prompt: Sign The Manifesto]
        ↓
[User Dashboard Unlocks]
   - Based on Access: Free / Paid
        ↓
[Prompt to Join Tiered Membership or Purchase à la carte]

🌐 WEBSITE STRUCTURE (Visual Hierarchy)
Mini Lesson Library Page (Public)
Displays 1–3 free mini lessons to choose from
CTA below: “Get Your Personalized Wealth Shift Plan → Take the Free Assessment”
Assessment Results Page
Displays their Wealth Shift Level
Recommends specific workbook + challenge
CTA: “Sign the Manifesto to Begin Your Transformation”
Manifesto Page
Short, affirming pledge
Unlocks full site dashboard (based on tier)
Dashboard View
Tabs: My Lessons | My Challenges | My Workbooks | Coaching | Journal
Based on tier: some content locked with upsell prompts

✅ PART 2: MINI LESSON LANDING PAGE COPY – Mindset Edition

✨ Title:
“Why You Keep Leaking Wealth (and Don’t Even Know It)”
🎥 Subheading:
This 5-minute mini lesson is the wake-up call your finances needed — no jargon, no fluff. Just truth.

💡 Mini Lesson Intro (Before Video):
Most people don’t need more money.
 They need to stop leaking the money they already have.
You work hard. You plan. You try.
 But something still doesn’t add up.
This lesson will help you uncover the hidden ways your money mindset is sabotaging your results, and the tiny mindset leaks that are costing you peace, power, and wealth.

🔁 Watch the Lesson:
[Video Placeholder Embed]
 “Leaky Wealth: The Subtle Mindset That’s Draining You”

🧠 Journal Prompt:
“In what ways am I sabotaging my own abundance — emotionally, mentally, or financially?”
 What’s one belief I keep holding onto that may be holding me back?
→ [Write privately | Save to Wealth Journal]

🔗 CTA:
🛠 Ready to do something about it?
👉 Join the Challenge:
 Turn this insight into real action in under 7 days.
Clean up 1 financial leak
Replace 1 limiting belief
Create 1 powerful new money habit
Price: $10
 ✅ Includes printable tracker
 ✅ Daily nudges
 ✅ Completion badge
→ [Join the Challenge]

🌀 Explore More:
Want more lessons like this?
 Take the free quiz to discover your financial standing and unlock the full Wealth Shift experience.
[Take the Free Assessment →]

✅ PART 3: MEMBERSHIP TIERS & PRICING

Tier
Name
Price
Includes
🟢 Tier 1
Seeker
FREE
1 free mini lesson per category (Mindset, Debt, Investing) + access to journal
🟠 Tier 2
Action Taker
$10 per lesson bundle
Mini Lesson + Challenge Pack (7-day tracker + daily prompts + success badge)
🔵 Tier 3
Shifter Pro
$147 one-time OR $25/month
All lessons, all challenges, all 6 workbooks (digital) + journal dashboard access
🔴 Tier 4
Inner Circle
$997+ (or 3 payments)
Everything above + private coaching with Beryl, quarterly intensives, live support chats, and exclusive strategy sessions

📌 TECH REQUIREMENTS SUMMARY
Tag users based on entry point (social, homepage, etc.)
Gate access to lessons based on assessment + Manifesto
Track which lessons and challenges are completed
Allow progress tracking + badges
Store journal responses to user dashboard
Set up Stripe or other payment system for challenge + tier access

