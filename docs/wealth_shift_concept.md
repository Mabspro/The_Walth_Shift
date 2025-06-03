🔍 Summary of Project Understanding: “The Wealth Shift”
This is not just a website—it’s a journey-based conversion funnel, rooted in personal growth and values. The tone is soft-premium, the UX is clean and empowering, and the intent is to filter for aligned participants, not just capture traffic.

🧠 Key Takeaways
1. Core Objective:
Intentional Opt-In Funnel → Participants go through a two-step ritual (Assessment + Manifesto) before gaining full access.

This builds exclusivity and commitment early on.

2. Top Priority Features:
Gated access using forms + conditional logic (not full login system yet)

Smooth flow from:

Landing page

Assessment (Tally or Typeform)

Manifesto agreement

Unlock page with welcome video

Portal page with full navigation

3. Brand Aesthetic:
Sage, cream, earthy-gold tones

Afrocentric elegance (see the uploaded image—this is her brand tone guide visually)

Bold yet graceful serif fonts with clean layouts

Visual metaphors: growth, sisterhood, rebirth, light

🧱 Suggested Folder Structure (VS Code + Firebase + Vercel)
plaintext
Copy
Edit
the-wealth-shift/
├── public/
│   ├── images/         # Backgrounds, icons, headshot, etc.
│   └── manifest.json   # (for future PWA features)
├── src/
│   ├── components/     # NavBar, Footer, VideoPlayer, Card, FormEmbed, etc.
│   ├── layouts/        # BaseLayout, GatedLayout, PortalLayout
│   ├── pages/
│   │   ├── index.jsx            # Landing page: “The Invitation”
│   │   ├── assessment.jsx       # Embed Tally/Typeform
│   │   ├── manifesto.jsx        # Value commitment form
│   │   ├── unlock.jsx           # Welcome video + redirect
│   │   └── portal/
│   │       ├── index.jsx        # Main portal hub
│   │       ├── workbooks.jsx
│   │       ├── challenges.jsx
│   │       ├── marketplace.jsx
│   │       ├── giving.jsx
│   │       └── celebration.jsx
│   ├── styles/
│   │   └── globals.css          # Tailwind or CSS modules
│   └── utils/
│       └── email.js / auth.js   # For any external integrations
├── firebase.json                # For hosting configs
├── vercel.json                  # If using edge functions
├── .env                         # API keys (Typeform, ConvertKit, etc.)
└── README.md
🚀 Platform Architecture
Feature	Tool	Purpose
Hosting	Vercel	Front-end hosting & previews
Forms	Tally / Typeform	Assessment + Manifesto
Automation	Zapier / Make	Unlock logic, email triggers
Gating	Light logic (via redirect)	Full auth may not be needed yet
Email	ConvertKit / MailerLite	Post-unlock nurture
Portal	React Pages	Acts as a dashboard for community access

🔐 Suggested Flow Logic (without heavy backend)
Landing Page

CTA → Tally quiz

Assessment Page

Embedded form (Tally/Typeform)

Manifesto Page

Simple checkbox form (e.g., Tally with conditional completion)

On Complete → Redirect or Zap to “Unlock Page”

Unlock Page

Welcome video + CTA to “Enter Portal”

Portal

Static React site styled like a dashboard

Each section navigable, expandable over time

✅ Next Steps
Finalize tech choices for:

Forms (Tally or Typeform? Both support redirects & logic)

Email system (does she already use ConvertKit?)

Create GitHub repo + base file structure

Develop UI components:

Start with Landing, Assessment, and Manifesto

Build placeholder for Welcome + Portal pages

Design Theme Tokens:

Typography (serif for headings, sans for body)

Colors (sage, cream, dark green, soft gold highlights)

Responsive layout (grid-based + soft motion)