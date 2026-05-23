# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev         # Next.js dev server (http://localhost:3000)
pnpm build       # Production build
pnpm start       # Serve the production build
pnpm lint        # next lint (ESLint w/ eslint-config-next)
pnpm typecheck   # tsc --noEmit (strict mode is on)
```

No test runner is configured.

## Stack

- **Next.js 15** App Router + **React 19**
- **Tailwind CSS v4** — CSS-first config via `@theme` in `app/globals.css` (no `tailwind.config.*` file)
- **framer-motion** for transitions; **lucide-react** for icons
- **Resend** + **Zod** for the contact form API
- **TypeScript** strict mode, path alias `@/*` → repo root

## Architecture

### Content vs. components

All site copy, project data, experience, testimonials, and stack icons live in `content/` as typed TS modules — this is the **source of truth**. Components in `components/` consume `content/` and render it; never inline copy into a component.

Projects are split one-per-file under `content/projects/*.ts`, aggregated and sorted by `order` in `content/projects/index.ts`. To add a project: create a new file matching the `Project` shape in `types/project.ts`, then import + add to the array in `index.ts`. Helpers `getProject(slug)` and `getAdjacentProjects(slug)` power the `app/work/[slug]` route.

### Routes

App Router under `app/`:
- `/` — home (hero, project grid, experience, testimonials, stack)
- `/work`, `/work/[slug]` — projects index + detail
- `/about`, `/contact`
- `/api/contact` — POST endpoint, validates with Zod, sends via Resend. In dev with no `RESEND_API_KEY`, it logs the submission and returns success (so the form is testable without a key).

Metadata is generated centrally via `lib/metadata.ts` (`generateMeta()`); per-page metadata composes from it.

### Component organization

- `components/ui/` — primitives (Avatar, Badge, BrandIcon, Kbd, LiveClock, SectionLabel, Toast, Tooltip)
- `components/layout/` — shell (BottomNav, Footer, ThemeToggle, SplashScreen)
- `components/home/` — homepage sections
- `components/projects/` — project-specific rendering (ProjectCard)
- `components/providers/` — `Providers.tsx` wraps the tree in `MotionConfig` with `reducedMotion="user"` and a default ease curve

### Theming

Defined in `app/globals.css`:
- All design tokens (colors, fonts, radii) declared inside `@theme { … }` — this is the Tailwind v4 way; do not create a `tailwind.config.js`.
- Dark is the default; light theme overrides via `[data-theme="light"]`.
- A small inline script in `app/layout.tsx` reads `localStorage.theme` and sets `data-theme` on `<html>` **before paint** to prevent FOUC. `ThemeToggle` writes back to localStorage.
- **Radii are unified at 4px** across `--radius-*` tokens — keep that convention when adding components.
- Brand icon colors only render in light mode via `.brand-swatch[data-brand="…"]` selectors; dark mode is monochrome.

### Splash screen coordination

`SplashScreen` (rendered in root layout) only activates on `/`. While active it sets `html[data-splash="active"]` / `"leaving"`, which CSS rules in `globals.css` use to hide `body > main` and `body > footer` (opacity 0, translateY) and then ease them in when the splash starts leaving. If you add top-level page content that should participate in this reveal, make sure it's a direct child of `<body>` (Providers is a context, not a wrapper element).

`scrollbar-gutter: stable` is set on `<html>` so the scrollbar reservation doesn't shift layout when the splash locks `body` scroll.

### Utilities

- `lib/utils.ts` — `cn()` (clsx + tailwind-merge — always use this for conditional classes), `formatDate`, `shortDate`
- `lib/metadata.ts` — `generateMeta()` for per-route metadata
- `lib/motion.ts` — shared motion variants/easings
- `lib/resend.ts` — lazy Resend client + `buildContactEmail()` for the contact endpoint

## Environment

`.env.local` (see `.env.local.example`):
- `RESEND_API_KEY` — optional in dev (endpoint logs & succeeds without it)
- `CONTACT_EMAIL_TO` — recipient; falls back to `site.email`
- `NEXT_PUBLIC_SITE_URL` — used by `generateMeta()` for absolute URLs
