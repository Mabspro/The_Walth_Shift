# The Wealth Shift

**A journey-based conversion funnel, rooted in personal growth, transformation, and aligned community.**  
The tone is soft-premium. The UX is clean, empowering, and designed to attract intentional participants—not passive visitors.

---

## 🌍 Project Overview

The Wealth Shift is more than a website—it's an intentional experience.

Users move through a **multi-stage transformational journey**:
1. **Assessment** – Discover their current financial mindset
2. **Manifesto** – Commit to core values of Self-Honor, Discipline, and Accountability
3. **Portal Access** – Unlock a personalized journey including recommended workbooks, progress tracking, and rewards

This structure builds exclusivity, internal buy-in, and community alignment.

---

## 🧠 Core Features

- **Landing Page:** Hero section + elegant introduction to the movement
- **Assessment System:** Quiz logic returns Wealth Level, Mindset, and Workbook recommendations
- **Manifesto Agreement:** Value commitment gate for intentional participation
- **Unlock Page:** Welcome video and next step CTA
- **Personalized Portal:** Shows user-specific workbook track, daily check-in system, and progress visuals
- **Workbook System:** Tracks daily engagement and unlocks challenges and rewards
- **Challenge Pages:** Post-workbook reflection + badge system
- **Email Integrations:** Tagging logic triggers milestone-based coaching and reward emails

---

## 🎨 Brand Aesthetic

- Color Palette: Deep forest green, soft sage, warm gold, cream, and earthy accents
- Typography: Graceful serif headers, modern readable body fonts
- Theme: Afrocentric elegance, sisterhood, growth, intention, financial rebirth

---

## 🚀 Getting Started

Clone the repo and run the development server:

```bash
npm install
npm run dev
# or
yarn dev

🧱 Project Structure

the-wealth-shift/
├── docs/                      # Project documentation
├── public/                    # Static assets
│   └── images/                # Brand visuals, backgrounds, icons
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── assessment/        # Assessment page
│   │   ├── manifesto/         # Manifesto page
│   │   ├── unlock/            # Unlock + onboarding video
│   │   ├── portal/            # Main user portal & dashboard
│   │   ├── workbook/          # Workbook start & daily check-in
│   │   ├── challenge/         # Challenge unlock + reflection form
│   │   └── complete/          # Final milestone rewards
│   ├── components/            # Shared components (nav, footer, progress bars)
│   ├── lib/                   # Firebase / email / tagging integrations
│   ├── styles/                # Tailwind + custom tokens
│   └── utils/                 # Logic helpers (quiz scoring, user flow)

🧰 Technology Stack
Frontend Framework: Next.js

Styling: Tailwind CSS

Animations: Framer Motion

Forms: Tally / Typeform (for onboarding logic)

Database (Planned): Firebase (Auth, Firestore for user data + tracking)

Email Automation: Flodesk or ConvertKit (via Zapier/Make or Firebase Functions)

📈 Journey Logic (Quick Reference)
Phase	Function
Assessment	Scores user into level + mindset + workbook set
Portal	Reveals personal plan + progress tracking
Workbook Tracker	Logs daily activity and triggers rewards
Challenges	Unlock post-workbook, offer actions + reflection
Email Coaching	Sends nudges, motivation, badges, completion gifts
Final Rewards	Certificate, coupon, gift card, invite for coaching

For detailed logic, see docs/ASSESSMENT_LOGIC.md

📚 Documentation
PROJECT_STATUS.md – Current build progress and next steps

SITE_MAP.md – Page flow and user journey map

TALLY_FORM_SETUP.md – Quiz/manifesto embed + logic guide

ASSESSMENT_LOGIC.md – Full logic structure for personalized journey

VERCEL_DEPLOYMENT.md – Vercel deploy steps + env config

🧪 Deployment
The site is live at:

🔗 https://the-wealth-shift.vercel.app

For deployment configs, hosting notes, and secrets setup see VERCEL_DEPLOYMENT.md

🧠 Next Milestones
 Firebase backend + auth + tracking

 Flodesk/ConvertKit integration with progress-based tagging

 “Reveal Results” logic engine

 Gamified portal dashboard (badges, next-step CTAs)

 Final reward fulfillment automation (gift card, certificate delivery)

🙏 Credits
Created by LevrAge Innovation Studios
Crafted with intention for The Wealth Shift movement









