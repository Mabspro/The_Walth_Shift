# The Wealth Shift

A journey-based conversion funnel, rooted in personal growth and values. The tone is soft-premium, the UX is clean and empowering, and the intent is to filter for aligned participants, not just capture traffic.

## Project Overview

The Wealth Shift is not just a website—it's a journey-based conversion funnel that guides users through a two-step ritual (Assessment + Manifesto) before gaining full access to the portal. This builds exclusivity and commitment early on.

### Core Features

- **Landing Page**: Introduces the concept and invites users to begin their journey
- **Assessment**: Embedded form to understand the user's current wealth mindset
- **Manifesto**: Value commitment form to align with The Wealth Shift principles
- **Unlock Page**: Welcome video and portal access
- **Portal**: Dashboard with access to various resources and tools

### Brand Aesthetic

- Sage, cream, earthy-gold tones
- Afrocentric elegance
- Bold yet graceful serif fonts with clean layouts
- Visual metaphors: growth, sisterhood, rebirth, light

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
the-wealth-shift/
├── docs/                  # Project documentation
├── public/                # Static assets
│   └── images/            # Images and icons
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── assessment/    # Assessment page
│   │   ├── manifesto/     # Manifesto page
│   │   ├── portal/        # Portal pages
│   │   └── unlock/        # Unlock page
│   ├── components/        # Reusable components
│   └── utils/             # Utility functions
```

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: Tally/Typeform (to be integrated)

## Current Status

See [PROJECT_STATUS.md](./docs/PROJECT_STATUS.md) for the current status of the project and next steps.

## Documentation

- [PROJECT_STATUS.md](./docs/PROJECT_STATUS.md) - Current status and next steps
- [SITE_MAP.md](./docs/SITE_MAP.md) - Site structure and user flow
- [TALLY_FORM_SETUP.md](./docs/TALLY_FORM_SETUP.md) - Instructions for setting up Tally forms
- [VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md) - Guide for deploying to Vercel

## Deployment

The project is deployed on Vercel. For deployment instructions and environment variables, see [VERCEL_DEPLOYMENT.md](./docs/VERCEL_DEPLOYMENT.md).

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://the-wealth-shift.vercel.app)

## Credits

Powered by LevrAge Innovation Studios
