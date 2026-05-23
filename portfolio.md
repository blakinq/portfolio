# Product Requirements Document
## Personal Portfolio — Product Design Engineer
**Version:** 1.0  
**Date:** May 2026  
**Status:** Ready for Development

---

## 1. Executive Summary

This document defines the complete product, technical, and design specification for a personal portfolio website for a Product Design Engineer. The portfolio is a single-author, content-driven site that communicates professional identity, showcases selected project case studies, surfaces writing and thinking, and converts visitor interest into real conversations.

The reference direction (Image 3 — Jacob Vos) establishes the aesthetic register: a dark-themed, bento-grid-style single-page personal site that blends editorial depth with playful interactive details — live clock, keyboard shortcuts, Spotify integration, and photography. The project listing (Image 2) and case study layout (Image 1) establish the depth expected within the Projects section.

The product is not a resumé website. It is a **digital presence** — personal, opinionated, and technically considered.

---

## 2. Problem Statement

Product design engineers occupy a unique intersection between product thinking, UX design, and engineering implementation. Most portfolio templates fail them by:

- Forcing a pure "designer" or pure "developer" framing
- Offering no depth for process-heavy case studies
- Looking generic and interchangeable
- Providing no personality layer (music, photography, writing, personal context)

This portfolio solves for all four gaps.

---

## 3. Goals & Success Metrics

### Primary Goals
| Goal | Metric | Target |
|------|--------|--------|
| Establish professional credibility | Time on site | > 2 min avg |
| Convert visitors to contacts | Contact form submissions | > 5% of visitors |
| Showcase technical + design range | Project views | > 60% of homepage visitors view ≥1 project |
| Signal personality | Scroll depth | > 70% of visitors reach the Personal section |

### Non-Goals
- Not an e-commerce or SaaS product
- Not multi-author or CMS-collaborative
- Not a job board aggregator or resume parser

---

## 4. Users & Audience

### Primary Audience
**Hiring managers & recruiters** at product-forward companies. They have 90 seconds. They need signal fast: who is this person, what have they shipped, are they the real deal?

### Secondary Audience
**Peers & collaborators** — other designers and engineers who arrive via links, Twitter, or conferences. They read more deeply, they check the stack section, they read the writing.

### Tertiary Audience
**Clients & freelance prospects** — looking for a collaborator who can own both design and implementation.

---

## 5. Information Architecture

```
/ (Home — single-page scroll)
  ├── Hero / Identity Block
  ├── Work / Project Showcase
  ├── Experience Timeline
  ├── Testimonials
  ├── Stack
  ├── Ventures / Side Projects
  ├── Writing
  ├── Personal (Music + Photography)
  └── Contact

/projects (Projects index grid)
  └── /projects/[slug] (Case study detail)
      ├── Hero
      ├── Background
      ├── Challenge
      ├── Solution
      ├── Outcome
      └── Next Project

/writing/[slug] (Blog post)
```

---

## 6. Feature Specifications

### 6.1 Global / Shell

#### Navigation
- Fixed top bar, minimal: logo/initials left, optional anchor links right
- On mobile: hamburger collapses to full-screen nav overlay
- "Press C to copy email" keyboard shortcut — copies to clipboard, shows a transient toast
- Live clock in top-right showing current time in user's timezone with GMT offset
- Location string: "LAGOS, NIGERIA · GMT+1"

#### Theme
- Dark mode is the primary/only theme
- Background: `#111111` or `#0f0f0f`
- Surface: `#1a1a1a`
- Elevated surface: `#222222`
- Text primary: `#f0f0f0`
- Text secondary: `#888888`
- Accent: single configurable accent color (recommend `#ffffff` or a warm tint)

---

### 6.2 Home Page — Section Breakdown

#### Section 1: Identity / Hero
- **EST. [YEAR]** label top-left
- **Avatar**: circular photo, 48–64px
- **Name**: large, bold
- **Title**: "Product Design Engineer" with inline colored chips for company/location (matching Jacob Vos's `Wait · Lagos, Nigeria` pattern)
- **Bio**: 2–3 line personal intro, honest and direct
- **"Press C to copy email"**: visible keyboard shortcut hint with `⌘/Ctrl` + `C` visual
- **WORK label**: section header that transitions into the project grid below

**Interactive Behavior:**
- `C` key → copy email → show `Copied!` toast for 2s
- Cursor: default

---

#### Section 2: Work / Project Showcase
- 3D-rotated floating device mockup carousel (as seen in Image 3: overlapping screens, slight perspective tilt)
- 3–5 device frames showing key project UIs
- On hover: slight parallax shift per device layer
- Below devices: filterable project grid (see Section 6.3)

**Filterable Categories:**
`All` · `Mobile App` · `Web` · `Watch App` · `Design Systems`

---

#### Section 3: Experience Timeline
- Left: year range label (e.g., `2024 — Now`)
- Right: company logo chip + company name + role title
- Sub-text: 1-line description of contribution
- Icon row at top: filter tabs by type (Work, Projects, Contact, etc.) — visual navigation icons not functional filters

**Data shape (per entry):**
```json
{
  "start": "2024",
  "end": "Now",
  "company": "Wait",
  "role": "Design Engineer",
  "description": "Designed a real-time waitlist and dashboard...",
  "logo_url": "/logos/wait.svg"
}
```

---

#### Section 4: Testimonials
- 2–3 testimonials displayed in a card row or carousel
- Card: quote text, person's name, role, company, avatar
- Subtle card border, no heavy styling
- Light fade-in on scroll entry

---

#### Section 5: Stack
- Icon row of tool logos: Figma, Framer, React, TypeScript, Tailwind, GitHub, Sketch, Webflow, Spotify (personal), etc.
- Logos rendered as SVG/PNG at 28–32px
- Hover: label tooltip appears below icon

---

#### Section 6: Ventures / Side Projects
- Small bento-style grid
- Each card: service/product name, subtitle, external arrow icon
- Max 4–6 items
- Opens in new tab on click

---

#### Section 7: Writing
- Tabular list layout — no images
- Columns: date (dimmed) · title (link) · estimated read time
- Sorted newest first
- Max 5 shown on homepage; "See all" link to `/writing`

**Data shape:**
```json
{
  "slug": "how-to-think-like-a-designer-engineer",
  "title": "How to think like both a designer & engineer",
  "date": "2025-02-21",
  "read_time_minutes": 4,
  "published": true
}
```

---

#### Section 8: Personal
- **Music**: Spotify "most replayed this month" card
  - Album art (square), track name, artist, album
  - "Listen on Spotify →" link
  - Animated equalizer bars if track is "Now Playing" (requires Spotify API integration)
- **Photography**: horizontal strip of 4 personal photos (Leica or similar context)
  - "Shot with Leica M6 · See more on IG →" footer
  - Light-box on click

---

#### Section 9: Contact
- **Intro text**: "You can contact me using the form or via the links below."
- **Form fields**: Name, Email, Message (textarea)
- **Submit button**: "Send message" + "or ↵ Enter to send" keyboard hint
- **Social links below form**: Email, X.com, GitHub, LinkedIn — each with handle and external arrow

**Form validation:**
- All fields required
- Email format validation
- Success: form disappears, replaced by "Message sent — I'll be in touch." 
- Error: inline field-level errors

---

#### Section 10: Footer
- Centered signature / logotype SVG
- "Built using Framer" or stack disclosure
- Year + attribution
- City · Country + temperature widget (live, optional)
- "Remix for free" / "Made in Framer" — configurable

---

### 6.3 Projects Index Page (`/projects`)

- Page header: `Projects` (large, bold) + subtitle
- Masonry or 2-column grid of project cards
- Each card:
  - Thumbnail image (16:9 or 4:3)
  - Project name (bold)
  - Type (e.g., "Mobile App", "Watch App")
  - Year (right-aligned, dimmed)
- Hover: slight scale, image brightness increase
- Click: navigate to `/projects/[slug]`

---

### 6.4 Project Case Study (`/projects/[slug]`)

**Layout (as per Image 1):**

```
← All Projects

[Project Title]                      [Year] · [Category]

[Full-width hero image]

Background:
[Paragraph text]

Challenge:
1. [Challenge item]
2. [Challenge item]
3. [Challenge item]

Solution:
1. [Bold heading:] [Description paragraph]
2. [Bold heading:] [Description paragraph]
3. [Bold heading:] [Description paragraph]

Outcome:
[Summary paragraph with key metrics]

[← Previous Project]        [Next Project →]
```

**Data shape:**
```json
{
  "slug": "lifelog",
  "title": "LifeLog",
  "year": "2023",
  "category": "Watch App",
  "hero_image": "/projects/lifelog/hero.jpg",
  "background": "...",
  "challenges": ["...", "..."],
  "solutions": [
    { "title": "Radial Calendar Display", "body": "..." },
    { "title": "Gesture-Based Navigation", "body": "..." }
  ],
  "outcome": "...",
  "tags": ["watchOS", "UX", "SwiftUI"]
}
```

---

### 6.5 Writing / Blog (`/writing/[slug]`)

- Clean reading layout, ~680px max-width
- Typography-first: generous line height, readable serif or sans
- Date, read time at top
- No comments section (initial version)
- Share link copy button at bottom

---

## 7. Technical Architecture

### 7.1 Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Framework** | Next.js 15 (App Router) | SSG for case studies, SSR for dynamic sections, excellent image optimization |
| **Language** | TypeScript | Type safety across data models and components |
| **Styling** | Tailwind CSS v4 + CSS Variables | Utility-first with design token control |
| **Animations** | Framer Motion | Page transitions, scroll-triggered reveals, micro-interactions |
| **3D / Perspective** | CSS Transform 3D + optional Three.js | Device mockup tilt effect |
| **Content** | MDX (for writing) + local JSON/TS (for structured data) | No CMS dependency for MVP; Contentlayer or Velite for processing |
| **Email / Contact** | Resend API | Developer-friendly, generous free tier |
| **Music** | Spotify Web API (Now Playing endpoint) | Requires OAuth token refresh |
| **Deployment** | Vercel | Zero-config Next.js, Edge Functions, Analytics |
| **Domain** | Custom via Namecheap/Cloudflare | |
| **Analytics** | Vercel Analytics + optional Plausible | Privacy-respecting |
| **Icons** | Lucide React | Consistent icon library |
| **Fonts** | Variable font (e.g., Geist, Cabinet Grotesk, or Neue Haas) | Performance + design quality |

---

### 7.2 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx                  # Root layout: font loading, theme, metadata
│   ├── page.tsx                    # Home page (all sections)
│   ├── projects/
│   │   ├── page.tsx                # Projects index
│   │   └── [slug]/
│   │       └── page.tsx            # Case study detail
│   ├── writing/
│   │   ├── page.tsx                # Writing index
│   │   └── [slug]/
│   │       └── page.tsx            # Blog post
│   └── api/
│       ├── contact/route.ts        # POST — send email via Resend
│       ├── spotify/route.ts        # GET — now playing / top track
│       └── og/route.tsx            # Dynamic Open Graph image generation
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── NavOverlay.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── WorkShowcase.tsx        # 3D device mockups
│   │   ├── ProjectGrid.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   ├── Testimonials.tsx
│   │   ├── StackIcons.tsx
│   │   ├── VenturesGrid.tsx
│   │   ├── WritingList.tsx
│   │   ├── PersonalSection.tsx     # Spotify + Photos
│   │   └── ContactForm.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   ├── CaseStudyHeader.tsx
│   │   ├── ChallengeList.tsx
│   │   ├── SolutionList.tsx
│   │   └── ProjectNav.tsx
│   ├── ui/
│   │   ├── Toast.tsx
│   │   ├── Badge.tsx
│   │   ├── DeviceMockup.tsx
│   │   ├── SpotifyCard.tsx
│   │   ├── PhotoStrip.tsx
│   │   └── SectionLabel.tsx
│   └── providers/
│       └── Providers.tsx           # Theme, motion, toasts
│
├── content/
│   ├── projects/
│   │   ├── lifelog.ts
│   │   ├── storesystem.ts
│   │   └── ...
│   ├── writing/
│   │   ├── how-to-think-designer-engineer.mdx
│   │   └── ...
│   ├── experience.ts
│   ├── testimonials.ts
│   ├── stack.ts
│   └── ventures.ts
│
├── lib/
│   ├── spotify.ts                  # Spotify API helper
│   ├── resend.ts                   # Email helper
│   ├── utils.ts                    # cn(), formatDate(), etc.
│   └── metadata.ts                 # Shared metadata generator
│
├── public/
│   ├── avatar.jpg
│   ├── projects/                   # Case study images
│   ├── logos/                      # Company logos
│   └── photos/                     # Personal photography
│
├── styles/
│   └── globals.css                 # Tailwind base + CSS variables
│
├── types/
│   ├── project.ts
│   ├── post.ts
│   └── spotify.ts
│
├── .env.local
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

### 7.3 Data Models

```typescript
// types/project.ts
export interface Project {
  slug: string
  title: string
  year: string
  category: ProjectCategory
  tagline: string
  heroImage: string
  thumbnailImage: string
  background: string
  challenges: string[]
  solutions: Solution[]
  outcome: string
  tags: string[]
  featured: boolean
  order: number
}

export interface Solution {
  title: string
  body: string
}

export type ProjectCategory =
  | 'Mobile App'
  | 'Watch App'
  | 'Website'
  | 'Design System'
  | 'Product'

// types/post.ts
export interface Post {
  slug: string
  title: string
  date: string
  readTimeMinutes: number
  excerpt: string
  published: boolean
  tags: string[]
}

// types/experience.ts
export interface ExperienceEntry {
  id: string
  start: string
  end: string | 'Now'
  company: string
  role: string
  description: string
  logoPath: string
  url: string
}

// types/testimonial.ts
export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company: string
  avatarPath: string
}

// types/spotify.ts
export interface SpotifyTrack {
  title: string
  artist: string
  album: string
  albumArt: string
  url: string
  isPlaying: boolean
}
```

---

### 7.4 API Routes

#### POST `/api/contact`
```typescript
// Request
{ name: string, email: string, message: string }

// Response 200
{ success: true }

// Response 400
{ success: false, error: string }

// Validation: zod schema on server
// Rate limiting: Vercel Edge middleware, 3 req/hr per IP
// Email: Resend → portfolio owner's inbox
```

#### GET `/api/spotify`
```typescript
// Response 200
{
  isPlaying: boolean,
  title: string,
  artist: string,
  album: string,
  albumArtUrl: string,
  trackUrl: string
}

// Fallback: returns top-played track if not currently playing
// Cache: 60s via Next.js fetch cache
// Auth: refresh token stored in env, auto-refreshed
```

#### GET `/api/og`
```typescript
// Query: ?title=LifeLog&type=Project
// Returns: PNG image (1200×630) via @vercel/og
// Used for: per-project and per-post social preview images
```

---

### 7.5 State Management

No global state library required. State is local and scoped:

| State | Location | Mechanism |
|-------|----------|-----------|
| Email copied toast | `HeroSection` | `useState` + `useEffect` timeout |
| Contact form | `ContactForm` | `useActionState` (React 19) or `useFormState` |
| Project filter | `ProjectGrid` | `useState` (client component) |
| Spotify track | `SpotifyCard` | SWR with 60s revalidation |
| Nav open/close | `Header` | `useState` + `useEffect` for scroll lock |

---

### 7.6 Routing & Rendering Strategy

| Route | Strategy | Rationale |
|-------|----------|-----------|
| `/` | SSG + ISR (1h) | Static for speed; Spotify is client-side |
| `/projects` | SSG | All projects known at build |
| `/projects/[slug]` | SSG with `generateStaticParams` | All slugs known at build |
| `/writing` | SSG | |
| `/writing/[slug]` | SSG | MDX compiled at build |
| `/api/contact` | Edge Function | Low latency, globally distributed |
| `/api/spotify` | Edge Function + 60s cache | Spotify rate limits |
| `/api/og` | Edge Function | Dynamic image generation |

---

### 7.7 Performance Requirements

| Metric | Target |
|--------|--------|
| Largest Contentful Paint (LCP) | < 1.8s |
| Cumulative Layout Shift (CLS) | < 0.05 |
| First Input Delay (FID) | < 50ms |
| Total Blocking Time (TBT) | < 150ms |
| Lighthouse Score | > 95 (all categories) |
| Bundle size (initial JS) | < 80KB gzipped |
| Images | All via `next/image` with blur placeholders |

---

## 8. Design System

### 8.1 Color Tokens

```css
:root {
  /* Base */
  --bg-base:        #0f0f0f;
  --bg-surface:     #1a1a1a;
  --bg-elevated:    #222222;
  --bg-hover:       #2a2a2a;

  /* Text */
  --text-primary:   #f0f0f0;
  --text-secondary: #888888;
  --text-tertiary:  #555555;
  --text-accent:    #ffffff;

  /* Borders */
  --border-subtle:  rgba(255,255,255,0.06);
  --border-default: rgba(255,255,255,0.10);
  --border-strong:  rgba(255,255,255,0.20);

  /* Semantic */
  --color-green:    #22c55e;
  --color-amber:    #f59e0b;
  --color-red:      #ef4444;
  --color-blue:     #3b82f6;
}
```

### 8.2 Typography Scale

```css
/* Display */
.text-display   { font-size: 4rem;   line-height: 1.05; font-weight: 600; }
.text-headline  { font-size: 2.5rem; line-height: 1.1;  font-weight: 600; }
.text-title     { font-size: 1.5rem; line-height: 1.3;  font-weight: 500; }

/* Body */
.text-body      { font-size: 1rem;   line-height: 1.7;  font-weight: 400; }
.text-body-sm   { font-size: 0.875rem; line-height: 1.6; font-weight: 400; }

/* UI */
.text-label     { font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; }
.text-mono      { font-family: var(--font-mono); font-size: 0.875rem; }
```

### 8.3 Spacing Scale
`4px base` unit. Steps: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.

### 8.4 Motion Tokens

```typescript
// All Framer Motion variants reuse these
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

export const staggerChildren = {
  visible: { transition: { staggerChildren: 0.07 } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
}
```

### 8.5 Breakpoints
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

---

## 9. Component Specifications (Critical)

### 9.1 WorkShowcase (3D Device Mockup)

**Behavior:**
- 3 overlapping device frames (tablet, phone, desktop) at different z-indexes and slight rotation angles
- Mouse move on container: subtle parallax — each layer moves at different speeds based on depth
- Framer Motion `useMotionValue` + `useTransform` for smooth tracking

```typescript
// Pseudocode
const mouseX = useMotionValue(0)
const mouseY = useMotionValue(0)

const layer1X = useTransform(mouseX, [-300, 300], [-8, 8])  // slowest (background)
const layer2X = useTransform(mouseX, [-300, 300], [-14, 14])
const layer3X = useTransform(mouseX, [-300, 300], [-20, 20]) // fastest (foreground)
```

### 9.2 ContactForm

- Built with React Server Actions (`"use server"`) + `useFormState`
- Zod validation on server: name (required, 2–100 chars), email (valid format), message (required, 10–2000 chars)
- Honeypot field for spam protection (hidden, must be empty)
- Rate limiting via Upstash Redis or Vercel KV (3 submissions per IP per hour)
- Success state replaces form with a confirmation message

### 9.3 SpotifyCard

```typescript
// Polling strategy
const { data } = useSWR('/api/spotify', fetcher, {
  refreshInterval: 60_000,
  revalidateOnFocus: true
})

// Animated equalizer (only shown when isPlaying === true)
// Three bars, CSS animation with different speeds
```

### 9.4 KeyboardShortcut (Email Copy)

```typescript
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'c' && !e.metaKey && !e.ctrlKey && !isTypingInInput()) {
      navigator.clipboard.writeText(EMAIL)
      showToast('Email copied!')
    }
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])
```

---

## 10. SEO & Metadata Strategy

### Per-page Metadata
```typescript
// lib/metadata.ts
export function generateMeta(opts: {
  title: string
  description: string
  image?: string
  path: string
}): Metadata {
  return {
    title: `${opts.title} — [Your Name]`,
    description: opts.description,
    openGraph: {
      title: opts.title,
      description: opts.description,
      images: [opts.image || '/og-default.png'],
      url: `https://yoursite.com${opts.path}`,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@yourhandle',
    }
  }
}
```

### Structured Data (JSON-LD)
- `Person` schema on homepage
- `Article` schema on writing posts
- `CreativeWork` schema on project pages

### Sitemap
- Auto-generated via `next-sitemap` at build time
- Priority: `/` = 1.0, `/projects/*` = 0.9, `/writing/*` = 0.8

---

## 11. Integrations & Environment Variables

```bash
# .env.local

# Resend (contact form email)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL_TO=you@yourmail.com

# Spotify
SPOTIFY_CLIENT_ID=xxxxxxxxxxxx
SPOTIFY_CLIENT_SECRET=xxxxxxxxxxxx
SPOTIFY_REFRESH_TOKEN=xxxxxxxxxxxx

# Rate limiting (optional — Upstash)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Site
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

---

## 12. Accessibility Requirements

- All images: meaningful `alt` text
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text
- Focus management: visible focus rings, keyboard-navigable all interactive elements
- Reduced motion: all Framer Motion animations wrapped with `useReducedMotion()` check
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>` used correctly
- Form fields: all associated `<label>` elements, aria-describedby for errors
- WCAG 2.1 AA target

---

## 13. Build & Deployment Pipeline

```
GitHub (main branch)
  └── Push triggers Vercel build
        ├── next build (static generation)
        ├── Type check (tsc --noEmit)
        ├── Lint (eslint)
        └── Deploy to Vercel Edge Network

Preview deployments:
  └── Every PR gets a unique preview URL

Custom domain:
  └── DNS → Vercel → Next.js Edge runtime
```

---

## 14. Content Management Strategy

**Phase 1 (MVP):** All content is code — TypeScript objects in `/content/**`. Author edits via code + commit. No CMS.

**Phase 2 (Optional, post-MVP):** Migrate to a headless CMS:
- **Sanity** (recommended — excellent DX, type generation, real-time preview)
- Or **Contentlayer v2 / Velite** for MDX-based content with type safety

---

## 15. Development Phases

### Phase 1 — Foundation (Week 1–2)
- [ ] Project scaffolding: Next.js 15, TypeScript, Tailwind v4
- [ ] Global layout: Header, Footer, fonts, CSS tokens
- [ ] Home page: Hero + Work sections (static data)
- [ ] Keyboard shortcut (email copy)
- [ ] Deploy to Vercel (staging)

### Phase 2 — Core Sections (Week 3–4)
- [ ] Projects index + case study pages
- [ ] Experience timeline
- [ ] Writing list + individual post rendering (MDX)
- [ ] Stack icons section
- [ ] Contact form with Resend integration

### Phase 3 — Polish & Personality (Week 5)
- [ ] 3D device mockup parallax effect
- [ ] Spotify Now Playing integration
- [ ] Photography strip + lightbox
- [ ] Testimonials section
- [ ] Ventures/side projects grid
- [ ] Scroll-triggered animations (Framer Motion)

### Phase 4 — Optimization (Week 6)
- [ ] Lighthouse audit & performance fixes
- [ ] Open Graph image generation per project/post
- [ ] Sitemap + robots.txt
- [ ] Accessibility audit
- [ ] Analytics integration
- [ ] Cross-browser/device testing
- [ ] Production domain + SSL

---

## 16. Open Questions

| # | Question | Owner | Priority |
|---|----------|-------|----------|
| 1 | What is the final domain name? | Owner | High |
| 2 | Framer vs. custom Next.js build? (Reference site uses Framer — custom gives more control) | Owner | High |
| 3 | Include a downloadable CV/resume PDF link? | Owner | Medium |
| 4 | Enable blog commenting (Giscus/GitHub discussions)? | Owner | Low |
| 5 | Integrate Calendly or similar for booking calls? | Owner | Low |
| 6 | Show live GitHub contribution graph? | Owner | Low |

---

*Document maintained by the product owner. All sections subject to revision as design and development progress.*
