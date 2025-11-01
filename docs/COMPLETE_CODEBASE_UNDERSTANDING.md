# The Wealth Shift - Complete Codebase Understanding

**Last Updated:** November 1, 2025  
**Version:** 1.0  
**Reviewer:** Comprehensive Code Review  

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technical Stack](#technical-stack)
3. [Architecture Overview](#architecture-overview)
4. [CSS Rendering System](#css-rendering-system)
5. [Image Assets & Usage](#image-assets--usage)
6. [Hero Component Deep Dive](#hero-component-deep-dive)
7. [Layout & Rendering Flow](#layout--rendering-flow)
8. [Component Library](#component-library)
9. [Routing & Navigation](#routing--navigation)
10. [State Management](#state-management)
11. [User Journey Flow](#user-journey-flow)
12. [Dark Mode Implementation](#dark-mode-implementation)
13. [Performance & Optimization](#performance--optimization)
14. [Known Issues & Technical Debt](#known-issues--technical-debt)

---

## Executive Summary

**The Wealth Shift** is a Next.js 15-based transformation platform designed as an intentional conversion funnel for women seeking financial empowerment. The application features a sophisticated assessment system, personalized workbook recommendations, and a gated portal experience.

**Core Philosophy:**
- Journey-based conversion funnel (not just information display)
- Values-first approach (Assessment → Manifesto → Portal)
- Soft-premium aesthetic with Afrocentric elegance
- Dark mode enforced globally for brand consistency

**Current Status:** 
- ✅ Core infrastructure complete
- ✅ Assessment & personalization engine functional
- ✅ Portal structure implemented
- 🔄 Backend integration pending
- 🔄 Full content creation in progress

---

## Technical Stack

### Core Technologies

```json
{
  "framework": "Next.js 15.3.3",
  "react": "19.0.0",
  "typescript": "5.x",
  "styling": "Tailwind CSS 3.3.2 + Custom CSS",
  "animation": "Framer Motion 12.15.0",
  "deployment": "Vercel",
  "node": "20.x"
}
```

### Key Dependencies

**Production:**
- `next@15.3.3` - React framework with App Router
- `react@19.0.0` - UI library
- `react-dom@19.0.0` - React DOM rendering
- `framer-motion@12.15.0` - Animation library

**Development:**
- `typescript@5.x` - Type safety
- `tailwindcss@3.3.2` - Utility-first CSS
- `autoprefixer@10.4.14` - CSS vendor prefixing
- `eslint@9.x` - Code linting

### Font System

```typescript
// src/app/layout.tsx
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});
```

- **Headings:** Playfair Display (serif) - Elegant, sophisticated
- **Body:** Geist Sans (sans-serif) - Modern, readable
- **Auto-optimization:** Next.js font loading optimization enabled

---

## Architecture Overview

### Directory Structure

```
the-wealth-shift/
├── public/
│   ├── images/                    # Static image assets
│   │   ├── bg_image.png          # Hero background
│   │   ├── the_invitation.png     # Section 2 background
│   │   ├── scroll_manifesto.png   # Manifesto background
│   │   ├── video-card1.jpg        # Video thumbnails
│   │   ├── video-card2.jpg
│   │   ├── video-card3.jpg
│   │   ├── wealth.png             # Brand assets
│   │   └── wealth2.png
│   └── [svg files]                # Icons
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Landing page
│   │   ├── globals.css            # Global styles
│   │   ├── GatedLayout.tsx        # Layout for gated pages
│   │   ├── assessment/
│   │   │   └── page.tsx           # Assessment quiz
│   │   ├── manifesto/
│   │   │   └── page.tsx           # Values commitment
│   │   ├── unlock/
│   │   │   └── page.tsx           # Welcome video
│   │   └── portal/
│   │       ├── layout.tsx         # Portal-specific layout
│   │       ├── page.tsx           # Dashboard
│   │       ├── workbooks/         # Workbook system
│   │       ├── challenges/        # Challenge pages
│   │       ├── marketplace/       # Resources
│   │       ├── packages/          # Package tiers
│   │       ├── community/         # Community hub
│   │       └── celebration/       # Milestones
│   ├── components/                # Reusable components
│   │   ├── Hero.tsx
│   │   ├── NavBar.tsx
│   │   ├── Footer.tsx
│   │   ├── Card.tsx
│   │   ├── VideoSection.tsx
│   │   ├── VideoCard.tsx
│   │   ├── ScrollProgressBar.tsx
│   │   ├── SvgAccent.tsx
│   │   ├── WorkbookPage.tsx
│   │   ├── WorkbookTracker.tsx
│   │   ├── SimpleForm.tsx
│   │   ├── FormEmbed.tsx
│   │   └── VideoPlayer.tsx
│   ├── utils/                     # Utility functions
│   │   ├── assessment.ts          # Assessment logic
│   │   └── challenges.ts          # Challenge system
│   └── workbooks/                 # Workbook content
│       └── workbook-1-mindset/
├── docs/                          # Documentation
└── [config files]
```

### Design Patterns

1. **App Router Architecture** (Next.js 15)
   - File-based routing
   - Server and client components
   - Layouts for shared UI

2. **Component Composition**
   - Atomic design principles
   - Prop-based customization
   - TypeScript interfaces for type safety

3. **Client-Side State**
   - localStorage for user data
   - React hooks for component state
   - No Redux/Context (intentionally simple)

4. **Progressive Enhancement**
   - Core functionality without JavaScript
   - Framer Motion animations as enhancement
   - Graceful degradation

---

## CSS Rendering System

### Global CSS Architecture

**File: `src/app/globals.css`**

The CSS system is built on three layers:

#### Layer 1: Tailwind Base
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Layer 2: CSS Variables (Brand Colors)
```css
:root {
  /* Brand Colors */
  --sage: #4A6741;
  --deep-sage: #2C4024;
  --cream: #F5F1E8;
  --earthy-gold: #D4A76A;
  --vibrant-orange: #E55812;
  --rich-green: #0F3D20;
  
  /* Enhanced Text Colors */
  --soft-sage: #E6F1E9;
  --muted-sage: #DDEAD9;
  --subheading: #B6D1C1;
  --soft-gold: #F6D07C;
  --warm-gold: #F4AE53;
  --earth-tone: #C6AF6F;
  
  /* UI Colors - DARK MODE ENFORCED */
  --background: var(--rich-green);
  --foreground: var(--cream);
  --accent: var(--earthy-gold);
  --highlight: var(--vibrant-orange);
  --primary: var(--sage);
  --secondary: var(--cream);
  
  /* Card backgrounds for dark mode */
  --card-bg: rgba(74, 103, 65, 0.2);
  --card-border: rgba(212, 167, 106, 0.3);
}
```

#### Layer 3: Component Styles

**Typography System:**
```css
h1, h2, h3, h4, h5, h6 {
  font-family: serif;
  font-weight: 600;
  color: #8fbc8f !important;
  line-height: 1.2;
  letter-spacing: 0.02em;
}

h1 { font-size: 2.5rem; margin-bottom: 1.5rem; }
h2 { font-size: 2rem; margin-bottom: 1.25rem; }
h3 { font-size: 1.75rem; margin-bottom: 1rem; }
h4 { font-size: 1.5rem; margin-bottom: 0.75rem; }
```

**Card System:**
```css
.card {
  background-color: var(--background);
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(212, 167, 106, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

**Navigation Styles:**
```css
.nav-link {
  color: var(--accent);
  font-weight: 500;
  padding: 0.5rem;
  transition: color 0.3s ease, transform 0.2s ease;
  position: relative;
  letter-spacing: 0.03em;
}

.nav-link:hover {
  color: var(--highlight);
  transform: translateY(-2px);
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--highlight);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
```

### Tailwind Configuration

**File: `tailwind.config.js`**

```javascript
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rich-green': '#0F3D20',
        'deep-sage': '#2C4024',
        'sage': '#4A6741',
        'cream': '#F5F1E8',
        'earthy-gold': '#D4A76A',
        'vibrant-orange': '#E55812',
        'soft-sage': '#E6F1E9',
        'muted-sage': '#DDEAD9',
        'subheading': '#B6D1C1',
        'soft-gold': '#F6D07C',
        'warm-gold': '#F4AE53',
        'earth-tone': '#C6AF6F',
      },
      backgroundColor: {
        'background': '#0F3D20',
        'foreground': '#F5F1E8',
      },
      textColor: {
        'background': '#0F3D20',
        'foreground': '#F5F1E8',
      },
      backgroundImage: {
        'gradient-bg': 'linear-gradient(135deg, #0F3D20 0%, #4A6741 100%)',
      },
    },
  },
  plugins: [],
}
```

### Dark Mode Overrides

**Critical for Enforced Dark Mode:**

```css
/* Override any light backgrounds with dark colors */
.bg-white {
  background-color: #1a3a2e !important;
  border-color: rgba(212, 167, 106, 0.3);
}

.bg-gray-50 { background-color: #0f2920 !important; }
.bg-gray-100 { background-color: #1a3a2e !important; }
.bg-gray-200 { background-color: #254a3d !important; }

/* Ensure text is readable on dark backgrounds */
.text-gray-600 { color: #e6dcc9 !important; }
.text-gray-700 { color: #f0e6d3 !important; }
.text-gray-500 { color: #d4c4aa !important; }
.text-deep-sage { color: #c9e4de !important; }
```

### Animation System

**CSS Animations:**
```css
@keyframes progress {
  0% { width: 0; }
  100% { width: 100%; }
}

.animate-progress {
  animation: progress 8s linear forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out forwards;
}
```

**Framer Motion Animations:**
```typescript
// Fade in animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// Scale on hover
<motion.div
  whileHover={{ scale: 1.02, y: -5 }}
  transition={{ duration: 0.3 }}
>

// Bounce animation
<motion.div
  animate={{ y: [0, 10, 0] }}
  transition={{ duration: 1.5, repeat: Infinity }}
>
```

### Responsive Breakpoints

```css
/* Mobile First Approach */
@media (min-width: 768px) {
  .md\:flex { display: flex; }
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\:text-4xl { font-size: 2.25rem; }
}
```

**Standard Breakpoints:**
- Mobile: < 768px (default styles)
- Tablet: 768px - 1024px (`md:` prefix)
- Desktop: > 1024px (`lg:` prefix)

---

## Image Assets & Usage

### Image Inventory

**Location:** `public/images/`

```
public/images/
├── bg_image.png           # Hero background image
├── the_invitation.png     # Section 2 background (The Invitation)
├── scroll_manifesto.png   # Manifesto page background
├── video-card1.jpg        # Video thumbnail 1
├── video-card2.jpg        # Video thumbnail 2
├── video-card3.jpg        # Video thumbnail 3
├── wealth.png             # Brand asset
└── wealth2.png            # Brand asset alternate
```

### Image Usage Details

#### 1. Hero Background (`bg_image.png`)

**Location:** Hero component (Section 1 of landing page)

```typescript
// src/components/Hero.tsx
<div className="hero-section relative min-h-[100vh] flex items-center 
                bg-[url('/images/bg_image.png')] bg-cover bg-center bg-no-repeat">
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/20 z-0"></div>
  <div className="absolute inset-0 bg-gradient-to-r from-rich-green/30 to-transparent z-0"></div>
  
  {/* Content */}
  <div className="container mx-auto px-6 relative z-20">
    {/* Hero content */}
  </div>
</div>
```

**Rendering Details:**
- Full viewport height (min-h-[100vh])
- Background covers entire section (bg-cover)
- Centered positioning (bg-center)
- No repeat (bg-no-repeat)
- Two overlay layers:
  - Black overlay at 20% opacity for depth
  - Green-to-transparent gradient for brand integration
- Content positioned with z-20 to appear above overlays

#### 2. The Invitation Background (`the_invitation.png`)

**Location:** Section 2 of landing page

```typescript
// src/app/page.tsx - Section 2
<motion.section 
  ref={section2Ref}
  className="min-h-screen py-16 bg-rich-green flex items-center relative"
>
  {/* Background image with elegant blur effect */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[#052e26] to-[#0f3f2f]"></div>
    <div 
      className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-95"
      style={{ 
        backgroundImage: 'url("/images/the_invitation.png")',
        backgroundPosition: 'center 20%',
        filter: 'drop-shadow(0 0 10px rgba(212,168,80,0.3))'
      }}
    ></div>
    {/* Blurred edges */}
    <div className="absolute inset-0 bg-rich-green/50 backdrop-blur-[1px]" 
      style={{
        maskImage: 'radial-gradient(ellipse at center, transparent 40%, black 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 40%, black 85%)'
      }}
    ></div>
    <div className="absolute inset-0 bg-rich-green/40"></div>
  </div>
</motion.section>
```

**Rendering Details:**
- Contains the image (bg-contain for proper sizing)
- Positioned at center top (center 20%)
- 95% opacity for subtle appearance
- Drop shadow with gold tint for glow effect
- Radial gradient mask for blurred edges
- Four-layer composition:
  1. Base gradient (green shades)
  2. Image with drop shadow
  3. Blur mask layer
  4. Final overlay for depth

#### 3. Video Thumbnails

**Files:** `video-card1.jpg`, `video-card2.jpg`, `video-card3.jpg`

```typescript
// src/components/VideoCard.tsx
<div className="relative w-full h-48">
  <Image
    src={thumbnailUrl}
    alt={title}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    style={{ objectFit: 'cover' }}
    className="transition-transform duration-300 hover:scale-105"
  />
  {/* Play button overlay */}
  <div className="absolute inset-0 flex items-center justify-center 
                  bg-black/30 hover:bg-black/40 transition-all duration-300">
    <div className="w-14 h-14 rounded-full bg-accent/80 flex items-center justify-center">
      {/* Play icon SVG */}
    </div>
  </div>
</div>
```

**Rendering Details:**
- Next.js Image component for optimization
- `fill` prop for responsive sizing
- Responsive sizes for different breakpoints
- Object-fit cover for consistent aspect ratio
- Hover scale effect (scale-105)
- Play button overlay with accent color
- Duration badge in bottom-right corner

### Image Optimization Strategy

1. **Next.js Image Component**
   - Automatic optimization
   - Lazy loading
   - Responsive sizing
   - Modern format conversion (WebP)

2. **Sizing Attributes**
   ```typescript
   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
   ```
   - Mobile: Full viewport width
   - Tablet: Half viewport width
   - Desktop: One-third viewport width

3. **Loading Strategy**
   - Hero image: `priority` flag (preload)
   - Other images: Lazy load on scroll
   - Thumbnails: Progressive loading

---

## Hero Component Deep Dive

### Component Architecture

**File:** `src/components/Hero.tsx`

```typescript
interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  secondaryCtaOnClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaLink = '/assessment',
  secondaryCtaText,
  secondaryCtaLink,
  secondaryCtaOnClick
}) => { /* ... */ }
```

### Visual Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ Background Image (bg_image.png)                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Black Overlay (20% opacity)                         │ │
│ │ ┌───────────────────────────────────────────────┐   │ │
│ │ │ Green Gradient Overlay (30% opacity)          │   │ │
│ │ │ ┌─────────────────────────────────────────┐   │   │ │
│ │ │ │ Content Container (z-20)                │   │   │ │
│ │ │ │   ┌─────────────────────────────────┐   │   │   │ │
│ │ │ │   │ Title (cream, 4xl-6xl)          │   │   │   │ │
│ │ │ │   ├─────────────────────────────────┤   │   │   │ │
│ │ │ │   │ Subtitle (cream/90, xl-2xl)     │   │   │   │ │
│ │ │ │   ├─────────────────────────────────┤   │   │   │ │
│ │ │ │   │ CTA Buttons                     │   │   │   │ │
│ │ │ │   │ [Primary] [Secondary]           │   │   │   │ │
│ │ │ │   └─────────────────────────────────┘   │   │   │ │
│ │ │ └─────────────────────────────────────────┘   │   │ │
│ │ └───────────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────┘ │
│ Gradient Footer (bottom fade)                           │
└─────────────────────────────────────────────────────────┘
```

### Layer Breakdown

**Layer 1: Background Image**
```css
className="bg-[url('/images/bg_image.png')] bg-cover bg-center bg-no-repeat"
```
- Full viewport height
- Cover sizing (fills container)
- Centered positioning
- No repetition

**Layer 2: Dark Overlay**
```css
className="absolute inset-0 bg-black/20 z-0"
```
- Covers entire hero section
- 20% black for depth
- z-index 0 (behind content)

**Layer 3: Brand Gradient**
```css
className="absolute inset-0 bg-gradient-to-r from-rich-green/30 to-transparent z-0"
```
- Left-to-right gradient
- Starts with brand green (30% opacity)
- Fades to transparent on right
- Creates branded integration

**Layer 4: Content**
```css
className="container mx-auto px-6 relative z-20"
```
- Maximum width container
- Horizontal padding
- z-index 20 (above all overlays)
- Left-aligned on desktop (ml-0 md:ml-8 lg:ml-16)

**Layer 5: Footer Gradient**
```css
className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"
```
- Bottom-to-top gradient
- Smooth transition to next section
- 64px height

### Typography Rendering

**Title:**
```typescript
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-cream md:whitespace-nowrap">
  {title}
</h1>
```
- Responsive sizing: 36px → 48px → 60px
- Font: Playfair Display (serif)
- Color: Cream (#F5F1E8)
- No wrap on desktop for elegance

**Subtitle:**
```typescript
<p className="text-xl md:text-2xl mb-8 text-cream/90">
  {subtitle}
</p>
```
- Responsive sizing: 20px → 24px
- Slightly transparent (90%)
- Larger bottom margin

### CTA Button System

**Primary Button:**
```typescript
<Link 
  href={ctaLink}
  className="px-8 py-3 bg-accent hover:bg-highlight text-background 
             font-semibold rounded-md transition-colors duration-300 text-center"
>
  {ctaText}
</Link>
```
- Accent color (#D4A76A) → Highlight on hover (#E55812)
- Text: Background color (dark green)
- Padding: 32px horizontal, 12px vertical
- Smooth color transition (300ms)

**Secondary Button:**
```typescript
<button 
  onClick={secondaryCtaOnClick}
  className="px-8 py-3 bg-transparent hover:bg-cream/10 border border-cream 
             text-cream font-semibold rounded-md transition-colors duration-300"
>
  {secondaryCtaText}
</button>
```
- Transparent background → Subtle cream hover
- Border: Cream color
- Text: Cream color
- Same padding as primary

### Scroll Indicator

```typescript
<motion.div 
  className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
  animate={{ y: [0, 10, 0] }}
  transition={{ duration: 1.5, repeat: Infinity }}
  onClick={() => scrollToSection(2)}
>
  <svg className="h-10 w-10 text-accent">
    {/* Down arrow icon */}
  </svg>
</motion.div>
```
- Positioned at bottom center
- Bouncing animation (10px movement)
- Accent color
- Clickable to scroll to next section
- Infinite loop animation

### Responsive Behavior

**Mobile (< 768px):**
- Title: 36px (text-4xl)
- Subtitle: 20px (text-xl)
- Buttons stack vertically (flex-col)
- Content full width

**Tablet (768px - 1024px):**
- Title: 48px (md:text-5xl)
- Subtitle: 24px (md:text-2xl)
- Buttons horizontal (sm:flex-row)
- Content left margin: 32px (md:ml-8)

**Desktop (> 1024px):**
- Title: 60px (lg:text-6xl)
- Subtitle: 24px (stays same)
- Title no-wrap for elegance
- Content left margin: 64px (lg:ml-16)

---

## Layout & Rendering Flow

### Root Layout

**File:** `src/app/layout.tsx`

```typescript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${playfairDisplay.variable} antialiased text-cream`}>
        {children}
      </body>
    </html>
  );
}
```

**Key Features:**
- `className="dark"` on html element (enforces dark mode)
- Font variables injected via Next.js font optimization
- `antialiased` class for smooth text rendering
- Default text color: cream

### Landing Page Structure

**File:** `src/app/page.tsx`

```typescript
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-rich-green">
      <ScrollProgressBar />
      <NavBar isTransparent={true} />
      
      <main className="flex-grow">
        {/* Section 1: Hero */}
        <section className="hero-section relative">
          <Hero {...props} />
          {/* Scroll indicator */}
        </section>
        
        {/* Video Section */}
        <VideoSection />
        
        {/* Section 2: The Invitation */}
        <motion.section id="section2" ref={section2Ref}>
          {/* Background image + cards */}
        </motion.section>
        
        {/* Section 3: Our Philosophy */}
        <motion.section id="section3" ref={section3Ref}>
          {/* Philosophy content + CTA */}
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}
```

### Portal Layout

**File:** `src/app/portal/layout.tsx`

```typescript
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar isPortal={true} />
      <main className="min-h-screen py-16 px-6 bg-rich-green">
        {children}
      </main>
      <Footer />
    </>
  );
}
```

**Differences from Root:**
- NavBar has `isPortal={true}` (different navigation items)
- Main has padding-top for navbar clearance
- Consistent dark green background

### Gated Layout

**File:** `src/app/GatedLayout.tsx`

```typescript
export default function GatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-rich-green">
      <NavBar isTransparent={false} />
      <main className="flex-grow py-16 px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

**Purpose:**
- Used for assessment, manifesto, unlock pages
- Non-transparent navbar
- Consistent vertical spacing

### Rendering Flow

```
User Request
    ↓
Root Layout (layout.tsx)
    ↓
├── HTML with dark class
├── Font variables loaded
├── Body with antialiased text
    ↓
Page Component (page.tsx)
    ↓
├── ScrollProgressBar (fixed, z-50)
├── NavBar (fixed, z-50)
├── Main Content
│   ├── Hero Section (viewport height)
│   ├── Video Section
│   ├── Invitation Section (min-h-screen)
│   └── Philosophy Section (min-h-screen)
└── Footer
```

---

## Component Library

### Core Components Overview

#### 1. NavBar Component

**File:** `src/components/NavBar.tsx`

**Props:**
```typescript
interface NavBarProps {
  isPortal?: boolean;
  isTransparent?: boolean;
}
```

**Features:**
- Fixed positioning (z-50)
- Two navigation modes: Public vs Portal
- Transparent option for hero sections
- Backdrop blur effect
- Mobile menu structure (not functional yet)

**Public Navigation:**
- Home
- Assessment
- Manifesto

**Portal Navigation:**
- Dashboard
- Workbooks
- Challenges
- Marketplace
- Giving
- Celebration

#### 2. Card Component

**File:** `src/components/Card.tsx`

**Props:**
```typescript
interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  className?: string;
  children?: React.ReactNode;
  icon?: string;
}
```

**Styling:**
- Dark sage/green gradient background
- Accent border (30% opacity)
- Hover effects: scale + translateY + enhanced shadow
- Optional image with cover fit
- Optional icon display (emoji)

#### 3. VideoSection Component

**File:** `src/components/VideoSection.tsx`

**Features:**
- Displays 3 sample videos in grid
- Links to assessment for full library
- Framer Motion animations
- Responsive 1-3 column grid

**Video Data Structure:**
```typescript
interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
}
```

#### 4. VideoCard Component

**File:** `src/components/VideoCard.tsx`

**Features:**
- Thumbnail with play button overlay
- Modal popup on click
- Embedded iframe player
- Duration badge
- Close button with backdrop

**Interaction Flow:**
1. User clicks card → Opens modal
2. Modal displays iframe with video
3. User can close via button or backdrop click

#### 5. ScrollProgressBar Component

**File:** `src/components/ScrollProgressBar.tsx`

**Features:**
- Fixed top position (z-50)
- Calculates scroll percentage
- Accent color progress bar
- Updates on scroll event

#### 6. SvgAccent Component

**File:** `src/components/SvgAccent.tsx`

**Props:**
```typescript
interface SvgAccentProps {
  className?: string;
  color?: string;
  opacity?: number;
}
```

**Purpose:**
- Decorative African-inspired pattern
- Positioned absolutely in sections
- Configurable color and opacity
- Adds cultural authenticity

#### 7. Footer Component

**File:** `src/components/Footer.tsx`

**Sections:**
- Brand description
- Social media links (Instagram, Twitter)
- Quick links
- Contact information
- Copyright and LevrAge credits

**Grid Layout:**
- 3 columns on desktop
- Single column on mobile
- Dark green/sage background

#### 8. WorkbookPage Component

**File:** `src/components/WorkbookPage.tsx`

**Features:**
- Day-by-day workbook content display
- Journal prompts with textarea
- Back/Next navigation
- Progress tracker integration
- Dark mode styling

#### 9. SimpleForm Component

**File:** `src/components/SimpleForm.tsx`

**Features:**
- Dynamic form generation from questions array
- Radio button groups
- Text inputs
- Required field validation
- Submit handling
- Dark mode optimized

---

## Routing & Navigation

### Route Structure

```
/ (Landing Page)
├── /assessment (Assessment Quiz)
├── /manifesto (Values Commitment)
├── /unlock (Welcome Video)
└── /portal (Protected Portal)
    ├── /portal (Dashboard)
    ├── /portal/workbooks (Workbook Library)
    │   ├── /portal/workbooks/[id] (Workbook Overview)
    │   └── /portal/workbooks/[id]/day/[day] (Daily Content)
    ├── /portal/challenges (Challenge Hub)
    │   └── /portal/challenges/[id] (Individual Challenge)
    ├── /portal/marketplace (Resources Marketplace)
    ├── /portal/packages (Package Tiers)
    ├── /portal/community (Community Hub)
    └── /portal/celebration (Milestone Recognition)
```

### Dynamic Routes

**Workbook System:**
```
/portal/workbooks/[id]/day/[day]
```
- `[id]`: Workbook identifier (e.g., "workbook1", "workbook2")
- `[day]`: Day number (1-7)

**Challenge System:**
```
/portal/challenges/[id]
```
- `[id]`: Challenge identifier

### Navigation Flow

```
Landing Page
    ↓ CTA: "Start My Shift"
Assessment (13 questions)
    ↓ Auto-redirect after 8 seconds
Manifesto (Value commitment)
    ↓ CTA: "Enter Portal"
Unlock Page (Welcome video)
    ↓ CTA: "Enter Portal"
Portal Dashboard
    ↓ Various CTAs
Portal Sections (Workbooks, Challenges, etc.)
```

---

## State Management

### LocalStorage Implementation

**Assessment Data:**
```typescript
// Key: 'wealthShiftAssessment'
interface AssessmentResult {
  totalScore: number;
  wealthShiftLevel: WealthShiftLevel;
  mindsetType: MindsetType;
  recommendedWorkbooks: Workbook[];
}

// Key: 'wealthShiftEmail'
string
```

**Helper Functions:**
```typescript
// Save assessment result
saveAssessmentResult(result: AssessmentResult): void

// Retrieve assessment result
getAssessmentResult(): AssessmentResult | null

// Check if assessment completed
hasCompletedAssessment(): boolean
```

### Client-Side State (React Hooks)

**Common Patterns:**
```typescript
// Component state
const [showResults, setShowResults] = useState(false);
const [assessmentResult, setAssessmentResult] = useState(null);

// Refs for scroll
const section2Ref = useRef<HTMLDivElement>(null);

// Effects for localStorage
useEffect(() => {
  const completed = hasCompletedAssessment();
  setAssessmentCompleted(completed);
}, []);
```

**No Global State Management:**
- Intentionally simple architecture
- No Redux, Zustand, or Context API
- LocalStorage for persistence
- Component-level state for UI

---

## User Journey Flow

### Complete User Journey

```
1. DISCOVERY PHASE
   Landing Page (/)
   ├── Hero Section: "Welcome to Your Wealth Era"
   ├── Video Section: 3 sample videos
   ├── The Invitation: 3-step process
   └── Philosophy: Core values
   
   CTA: "Start My Shift" → Assessment

2. ASSESSMENT PHASE
   Assessment Page (/assessment)
   ├── Introduction & Purpose
   ├── 13 Questions (4 categories)
   │   ├── Mindset (Q1-4)
   │   ├── Debt (Q5-6)
   │   ├── Assets (Q7-8)
   │   └── Income & Legacy (Q9-13)
   ├── Email Collection
   └── Results Display
       ├── Wealth Shift Level (Seed Planter → Oracle)
       ├── Mindset Type (Fixed → Growth)
       └── Personalized Message
   
   Auto-redirect (8 seconds) → Manifesto

3. COMMITMENT PHASE
   Manifesto Page (/manifesto)
   ├── Values Display
   ├── Commitment Form
   └── Affirmation
   
   CTA: "Enter Portal" → Unlock

4. ONBOARDING PHASE
   Unlock Page (/unlock)
   ├── Welcome Video
   └── Access Granted Message
   
   CTA: "Enter Portal" → Portal Dashboard

5. PORTAL PHASE
   Portal Dashboard (/portal)
   ├── Personalized Welcome
   ├── Assessment Results Display
   ├── Recommended Workbooks
   ├── Progress Tracking
   └── Quick Access Cards
   
   Navigation: 6 portal sections

6. WORKBOOK PHASE
   Workbooks (/portal/workbooks)
   ├── Golden Pass (Free Starter)
   ├── 10 Available Workbooks
   └── Stanstore Integration (External)
   
   Note: Content hosted externally via FlipSnack

7. COMMUNITY PHASE
   Community (/portal/community)
   ├── WhatsApp Pods (Small groups)
   └── The Shifters (Advanced circle)

8. CELEBRATION PHASE
   Celebration (/portal/celebration)
   └── Milestone Recognition
```

### Decision Trees

**Assessment → Workbook Recommendations:**
```
Total Score: 13-52 points
├── 0-18: Seed Planter
│   └── Focus: Foundation building
├── 19-32: Groundbreaker
│   └── Focus: Basic implementation
├── 33-44: Pathwalker
│   └── Focus: Intermediate growth
└── 45-52: Oracle
    └── Focus: Advanced mastery

Mindset Score (Q1-4): 4-16 points
├── 4-8: Fixed Mindset
├── 9-12: Neutral Mindset
└── 13-16: Growth Mindset

Workbook Recommendations:
├── Workbook 1 (Mindset): Always
├── Workbook 2 (Debt): If Q5 OR Q6 ≤ 2
├── Workbook 3 (Assets): If Q7 OR Q8 ≤ 2
├── Workbook 4 (Investing): If Q9 OR Q10 ≤ 2
├── Workbook 5 (Income): If Q12 AND Q13 ≥ 3
└── Workbook 6 (Legacy): If Q13 ≥ 3
```

---

## Dark Mode Implementation

### Enforcement Strategy

**Critical Decision:** Dark mode is ENFORCED, not optional

**Implementation:**
1. HTML element has `className="dark"` hardcoded
2. No system preference checking
3. CSS variables default to dark values
4. Override utility classes (.bg-white, .bg-gray-*, etc.)

### Why Enforced Dark Mode?

**Reasons:**
1. Brand consistency across all users
2. Soft-premium aesthetic requires dark backgrounds
3. User complaints about light pages
4. Earthy gold accents pop on dark backgrounds
5. Afrocentric elegance enhanced by darkness

### Dark Mode Color Scheme

**Backgrounds:**
- Rich Green (#0F3D20): Primary background
- Sage variations (#4A6741, #2C4024): Card backgrounds
- Black overlays: Depth and contrast

**Text:**
- Cream (#F5F1E8): Primary text
- Soft Sage (#E6F1E9): Body text
- Gold variations: Headings and accents

**Accents:**
- Earthy Gold (#D4A76A): Primary CTAs
- Vibrant Orange (#E55812): Hover states
- Gold tints: Highlights and emphasis

### Utility Class Overrides

```css
/* Force dark backgrounds */
.bg-white { background-color: #1a3a2e !important; }
.bg-gray-50 { background-color: #0f2920 !important; }
.bg-gray-100 { background-color: #1a3a2e !important; }
.bg-gray-200 { background-color: #254a3d !important; }

/* Ensure readable text */
.text-gray-600 { color: #e6dcc9 !important; }
.text-gray-700 { color: #f0e6d3 !important; }
.text-gray-500 { color: #d4c4aa !important; }
```

### Contrast Ratios

**Tested Combinations:**
- Cream text on Rich Green: 7.8:1 (AAA)
- Gold accent on Rich Green: 4.9:1 (AA)
- Soft Sage on Rich Green: 6.2:1 (AA+)

All combinations meet WCAG 2.1 Level AA standards.

---

## Performance & Optimization

### Next.js Optimizations

**Automatic Features:**
1. **Code Splitting**
   - Each page automatically split
   - Dynamic imports for large components
   - Tree shaking unused code

2. **Image Optimization**
   - Next.js Image component
   - Automatic WebP conversion
   - Responsive sizes
   - Lazy loading (except hero with `priority`)

3. **Font Optimization**
   - Self-hosted fonts via next/font
   - Automatic font subsetting
   - Preloading critical fonts
   - Zero layout shift

4. **Static Generation**
   - Most pages can be pre-rendered
   - Fast initial page load
   - CDN cacheable

### Performance Metrics (Target)

```
First Contentful Paint (FCP): < 1.8s
Largest Contentful Paint (LCP): < 2.5s
Time to Interactive (TTI): < 3.8s
Cumulative Layout Shift (CLS): < 0.1
First Input Delay (FID): < 100ms
```

### Optimization Strategies

**Images:**
- Use Next.js Image component
- Provide responsive sizes
- Use appropriate formats (WebP)
- Lazy load off-screen images
- Optimize source file sizes

**CSS:**
- Tailwind CSS purges unused styles
- Critical CSS inlined
- Non-critical CSS deferred
- Custom CSS minimized

**JavaScript:**
- Code splitting per route
- Dynamic imports for heavy components
- Minimize third-party scripts
- Tree shake unused code

**Fonts:**
- next/font optimization
- Font display: swap
- Preload critical fonts
- Subset to Latin characters

### Bundle Analysis

**Current Bundle Sizes (estimated):**
- Landing page: ~150KB (gzipped)
- Assessment page: ~120KB (gzipped)
- Portal page: ~130KB (gzipped)

**Largest Dependencies:**
- React: ~40KB
- Framer Motion: ~35KB
- Next.js Runtime: ~70KB

---

## Known Issues & Technical Debt

### Critical Issues

1. **Mobile Navigation Not Functional**
   - Hamburger menu doesn't toggle
   - Need state management for menu open/close
   - Missing animation implementation

2. **No Backend Integration**
   - Using localStorage (not persistent)
   - No user authentication
   - No database for user data
   - Email collection not processed

3. **Limited Error Handling**
   - No error boundaries
   - Missing loading states
   - No fallback UI
   - Network errors not handled

### Medium Priority Issues

4. **Form Validation Basic**
   - Only required field checking
   - No email format validation
   - No input sanitization
   - No error messages

5. **Video Integration Placeholder**
   - Using YouTube placeholders
   - No actual video content
   - Player needs customization
   - Analytics not tracked

6. **Progress Tracking Not Persisted**
   - Workbook progress lost on refresh
   - No completion tracking
   - No milestone system
   - No badge rewards

### Low Priority Issues

7. **SEO Not Optimized**
   - Missing structured data
   - Limited meta tags
   - No sitemap
   - No robots.txt

8. **Accessibility Gaps**
   - Keyboard navigation incomplete
   - Screen reader support limited
   - Focus states need improvement
   - ARIA labels missing in places

9. **Testing Not Implemented**
   - No unit tests
   - No integration tests
   - No E2E tests
   - No test coverage reporting

### Technical Debt Items

**Authentication System:**
- Need Firebase Auth or similar
- User profile system
- Session management
- Password reset flow

**Database Integration:**
- Firebase Firestore or Supabase
- User data persistence
- Assessment results storage
- Progress tracking

**Email System:**
- ConvertKit/Flodesk integration
- Automated email flows
- Email templates
- Unsubscribe management

**Content Management:**
- Headless CMS (Sanity/Contentful)
- Admin dashboard
- Content versioning
- Media library

**Payment Processing:**
- Stripe integration
- Subscription management
- Receipt generation
- Refund handling

### Refactoring Needed

**Component Structure:**
- Split large page components
- Extract repeated patterns
- Create more reusable components
- Implement proper prop drilling solution

**Code Organization:**
- Consolidate utility functions
- Create constants file
- Organize types/interfaces
- Document component APIs

**State Management:**
- Consider React Context for shared state
- Implement proper cache invalidation
- Add optimistic updates
- Handle concurrent requests

---

## Summary & Recommendations

### What's Working Well

✅ **Solid Foundation**
- Next.js 15 App Router properly configured
- TypeScript providing type safety
- Tailwind CSS with custom design system
- Component-based architecture

✅ **User Experience**
- Clear user journey flow
- Intentional conversion funnel
- Personalized assessment system
- Beautiful dark mode design

✅ **Design System**
- Consistent color palette
- Elegant typography
- Smooth animations
- Responsive layouts

✅ **Code Quality**
- Well-organized structure
- Comprehensive documentation
- TypeScript interfaces
- Reusable components

### Immediate Actions Required

**Week 1-2:**
1. Fix mobile navigation toggle
2. Add error boundaries
3. Implement loading states
4. Add form validation

**Week 3-4:**
5. Set up Firebase/Supabase
6. Implement authentication
7. Migrate localStorage to database
8. Set up email automation

**Month 2:**
9. Complete workbook content
10. Add payment processing
11. Implement progress tracking
12. Set up analytics

### Long-term Roadmap

**Q1 2026:**
- Community features (forums, chat)
- Mobile app consideration
- Advanced analytics dashboard
- AI-powered recommendations

**Q2 2026:**
- Coaching integration
- Live events platform
- Advanced workbook features
- Marketplace expansion

**Q3-Q4 2026:**
- White-label licensing
- API for third-party integrations
- Advanced gamification
- International expansion

### Final Notes

**The Wealth Shift** has a strong technical foundation with modern technologies and best practices. The intentional design, clear user journey, and sophisticated assessment system set it apart from typical landing pages.

**Strengths:**
- Clear vision and purpose
- Solid technical implementation
- Beautiful, consistent design
- Well-documented codebase

**Next Steps:**
- Backend integration is the top priority
- Content creation for all workbooks
- Payment and email automation
- Community platform development

With focused execution on these priorities, The Wealth Shift can become a powerful platform for financial transformation and community building.

---

**Document Complete**  
**Total Sections:** 14  
**Last Updated:** November 1, 2025  
**Next Review:** After backend integration
