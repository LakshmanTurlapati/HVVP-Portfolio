# Phase 1: Foundation - Research

**Researched:** 2026-04-03
**Domain:** Next.js 16 App Router scaffold, Tailwind v4 design tokens, next/font, Next.js Metadata API, JSON-LD structured data, typed TypeScript content
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

All implementation choices are at Claude's discretion -- pure infrastructure phase. Use ROADMAP phase goal, success criteria, and codebase conventions to guide decisions.

Key constraints from PROJECT.md:
- Tech stack: Next.js 16 + Tailwind v4 + Motion + shadcn/ui
- Design: white/off-white background, dark text, one muted accent color, Inter font
- Content: resume-sourced data only, no placeholders
- Layout: single scrollable page

### Claude's Discretion

All implementation choices in this phase (file structure, token names, accent color value, data schema shape, JSON-LD field selection) are at Claude's discretion within the above constraints.

### Deferred Ideas (OUT OF SCOPE)

None -- discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DES-01 | Clean minimal layout with white/off-white background and dark text | Tailwind v4 @theme color tokens; `--color-background` and `--color-foreground` pattern |
| DES-02 | One muted accent color used consistently for buttons, links, and highlights | Single `--color-accent` token in @theme; use across all interactive elements |
| DES-03 | Inter font family loaded via next/font/google | `next/font/google` Inter with CSS variable exposed via `--font-inter`; wired into @theme |
| DES-04 | Grid-based layout with consistent spacing and alignment | Tailwind grid utilities (`grid`, `grid-cols-*`, `gap-*`); consistent section wrapper class |
| POL-02 | SEO meta tags set (title, description, Open Graph for LinkedIn sharing) | Next.js Metadata API static export from `layout.tsx`; openGraph type "website" |
| POL-03 | JSON-LD Person schema for Google discoverability | `<script type="application/ld+json">` with `dangerouslySetInnerHTML` in `layout.tsx` |
| POL-06 | Semantic HTML structure (proper heading hierarchy, landmarks) | `<header>`, `<main>`, `<footer>`, `<section>` in layout + page; `<h1>` only in HeroSection |
</phase_requirements>

---

## Summary

Phase 1 is a pure scaffolding and configuration phase. Its output is a runnable Next.js 16 App Router project with no visible UI content beyond a correctly-styled blank canvas -- the right font, background color, and global CSS system. Everything subsequent phases build on (design tokens, content data types, SEO metadata, HTML skeleton) must be finalized here.

The three highest-risk areas for this phase are: (1) wiring Tailwind v4's CSS-first `@theme` directive correctly so tokens generate actual utility classes, (2) populating all `src/data/*.ts` files with real resume-sourced content so Phase 2 has no reason to use placeholders, and (3) ensuring JSON-LD is rendered server-side (via inline `<script>` in the RSC layout, not via next/script with a client strategy) so it appears in raw HTML without hydration.

**Primary recommendation:** Bootstrap with `create-next-app@latest` (auto-selects Next.js 16, React 19, TypeScript, Tailwind v4, App Router, src/ layout). Then layer: design tokens in `globals.css @theme`, Inter via `next/font/google`, static metadata export, JSON-LD inline script, and all typed data files populated from the resume PDF before any section component is touched.

---

## Project Constraints (from CLAUDE.md)

Directives extracted from `./CLAUDE.md` that the planner must enforce:

| Directive | Impact on This Phase |
|-----------|---------------------|
| Never use emojis in terminal logs, README files, or any file output | All data files, comments, and log strings must be emoji-free |
| Never run applications automatically; only when explicitly asked | `npm run dev` must NOT be run as part of any task; mention it only as a verification instruction to the human |
| GSD workflow enforcement: file changes only through GSD commands | All file writes go through the execute-phase workflow |

---

## Standard Stack

### Core (all locked -- no alternatives)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.2 | App framework, SSG, routing, Metadata API | Project constraint. App Router stable. Metadata API replaces next/head. |
| React | 19.x (bundled) | UI rendering | Bundled with Next.js 16. React Compiler auto-memoizes. |
| TypeScript | 5.x | Type safety | Default in create-next-app. Required for typed data contracts. |
| Tailwind CSS | 4.2.2 | Utility-first CSS, design tokens via @theme | Project constraint. CSS-first config: no tailwind.config.js needed. |
| @tailwindcss/postcss | 4.2.2 | PostCSS integration for Tailwind v4 | Replaces old `tailwindcss` PostCSS plugin. Required for v4. |
| next/font/google | bundled with Next.js | Inter font, self-hosted, zero FOUT | Project constraint (DES-03). Eliminates external font request. |
| motion | 12.38.0 | Scroll animations (Phase 4) | Project constraint. Install now to avoid dependency churn later. |

### Supporting (Phase 1 scope)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn/ui | 4.1.2 (CLI) | UI primitives | Initialize now; pull specific components in Phase 2 (Button, Card) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next/font/google | Google Fonts CDN `<link>` | CDN link is render-blocking, causes FOUT, no layout shift protection |
| Tailwind v4 @theme | tailwind.config.ts | v3 config pattern: deprecated in v4, do not use |
| Static metadata export | generateMetadata() function | generateMetadata() is for dynamic/async metadata; static export is simpler and correct here |
| Inline `<script>` for JSON-LD | next/script with `beforeInteractive` | next/script adds hydration overhead; inline RSC script renders server-side in raw HTML |

**Installation (bootstrap + extras):**

```bash
# Bootstrap -- run once, interactive prompts will appear
npx create-next-app@latest harsha-portfolio \
  --typescript \
  --eslint \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

# Motion (animation library -- install now for Phase 4)
npm install motion

# shadcn/ui init (Tailwind v4 auto-detected)
npx shadcn@latest init
```

**Version verification (confirmed 2026-04-03):**
- `next`: 16.2.2
- `tailwindcss`: 4.2.2
- `@tailwindcss/postcss`: 4.2.2
- `motion`: 12.38.0
- `shadcn` CLI: 4.1.2

---

## Architecture Patterns

### Recommended Project Structure

```
harsha-portfolio/
├── public/
│   └── resume.pdf               # Harsha's resume PDF (linked from Hero CTA)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # RootLayout: Inter font, Metadata, JSON-LD, global CSS
│   │   ├── page.tsx             # Section composition (stub in Phase 1)
│   │   ├── globals.css          # @import tailwindcss + @theme design tokens
│   │   └── favicon.ico
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Phase 3 -- placeholder stub only in Phase 1
│   │   │   └── Footer.tsx       # Minimal footer stub
│   │   └── sections/            # Phase 2 -- leave empty in Phase 1
│   ├── data/
│   │   ├── hero.ts              # Name, tagline, availability, metrics, CTA labels
│   │   ├── about.ts             # Bio paragraph
│   │   ├── experience.ts        # 4 roles with bullets
│   │   ├── skills.ts            # Grouped skills, tools, certifications
│   │   ├── education.ts         # UTD + Madras degrees, Gold Medal
│   │   ├── leadership.ts        # 3 leadership roles + IYEP delegation
│   │   └── contact.ts           # Email, LinkedIn URL, resume PDF path
│   ├── hooks/                   # Empty in Phase 1 (useActiveSection goes here in Phase 3)
│   └── types/
│       └── index.ts             # All shared TypeScript interfaces
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

### Pattern 1: Tailwind v4 CSS-First Design Tokens

**What:** All design tokens (colors, font, spacing overrides) declared in `globals.css` using `@theme`. No `tailwind.config.ts` for custom values.

**When to use:** Always in a Tailwind v4 project. The `@theme` block replaces the `theme.extend` section of the old JS config.

**How @theme works:** Variables declared inside `@theme` are treated as design tokens -- they generate utility classes AND are available as CSS custom properties. `--color-accent` automatically enables `bg-accent`, `text-accent`, `border-accent` utility classes.

**Example:**
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Font -- wired to the CSS variable exposed by next/font/google */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  /* Color palette */
  --color-background: oklch(0.99 0.00 0);        /* near-white: #fafafa equivalent */
  --color-foreground: oklch(0.15 0.01 260);       /* near-black: #1a1a2e equivalent */
  --color-accent: oklch(0.55 0.10 240);           /* muted blue: professional, subdued */
  --color-accent-hover: oklch(0.48 0.12 240);     /* slightly darker on hover */
  --color-muted: oklch(0.92 0.00 0);              /* light gray for subtle borders */
  --color-muted-foreground: oklch(0.50 0.01 260); /* medium gray for secondary text */

  /* Spacing overrides (optional -- Tailwind defaults are usually fine) */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

/* Global base styles */
html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
}
```

**Accent color rationale:** Muted blue (`oklch(0.55 0.10 240)`) aligns with the "muted blue, soft green, or warm beige" options listed in PROJECT.md. Muted blue reads as professional and trustworthy to marketing hiring managers. It passes 4.5:1 contrast on the off-white background (verified by WCAG calculation). Final value is at Claude's discretion.

### Pattern 2: Inter Font via next/font/google

**What:** Load Inter as a self-hosted font using Next.js built-in optimization. Expose it as a CSS variable so Tailwind's `--font-sans` token can reference it.

**When to use:** Always. Never use `<link rel="stylesheet" href="fonts.googleapis.com/...">`.

**Example:**
```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',   // exposed as CSS custom property on <html>
  display: 'swap',            // prevents FOIT; shows fallback until Inter loads
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
```

**Why `inter.variable` on `<html>`:** This attaches `--font-inter` as a CSS variable to the root element. Tailwind's `@theme { --font-sans: var(--font-inter), ... }` then picks it up. The font cascades to every element without any additional class application.

### Pattern 3: Static Metadata Export (Next.js App Router)

**What:** Declare SEO metadata as a typed static export from `layout.tsx`. This renders as `<meta>` tags in the SSG HTML output -- fully crawlable by Google and LinkedIn's preview cards.

**When to use:** For a site with fixed metadata (no per-page dynamic titles). Static export is simpler and correct for a single-page portfolio.

**Example:**
```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://harshavardhini.com'),
  title: 'Harsha Vardhini Veeravalli Prabu | Digital Marketing Professional',
  description:
    'Data-driven digital marketing professional specializing in SEO, social media, and campaign optimization. University Gold Medalist. MS Marketing at UT Dallas.',
  openGraph: {
    title: 'Harsha Vardhini | Digital Marketing Professional',
    description:
      'SEO, SEM, social media, and campaign optimization specialist. Open to full-time marketing roles in the US.',
    url: 'https://harshavardhini.com',
    siteName: 'Harsha Vardhini Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',   // 1200x630px -- can be a placeholder for now
        width: 1200,
        height: 630,
        alt: 'Harsha Vardhini Veeravalli Prabu -- Digital Marketing Professional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harsha Vardhini | Digital Marketing Professional',
    description:
      'SEO, SEM, and campaign optimization specialist. MS Marketing at UT Dallas.',
  },
  alternates: {
    canonical: 'https://harshavardhini.com',
  },
}
```

**LinkedIn sharing note:** LinkedIn's Post Inspector reads `og:title`, `og:description`, and `og:image`. The `openGraph.images` array with a 1200x630 image is required for the large card preview. A static OG image (even a simple text-on-color PNG) is sufficient for Phase 1; a custom generated image is listed as v2 scope (APOL-04).

### Pattern 4: JSON-LD Person Schema (Inline Script in RSC)

**What:** A `<script type="application/ld+json">` tag embedded in the layout's `<head>` or `<body>`, rendered by a React Server Component. Tells Google the page describes a specific person with professional credentials.

**When to use:** Place in `layout.tsx` as it applies site-wide. Use inline `dangerouslySetInnerHTML` -- NOT `next/script`, which introduces hydration complexity and may defer execution.

**XSS note:** `JSON.stringify()` alone is not sufficient -- if data contains `</script>`, it can break out of the tag. Replace `<` with `\u003c` to sanitize.

**Example:**
```typescript
// src/app/layout.tsx (inside the exported RootLayout function)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Harsha Vardhini Veeravalli Prabu',
  url: 'https://harshavardhini.com',
  email: 'harshavprabu@gmail.com',
  jobTitle: 'Digital Marketing Professional',
  description:
    'Data-driven digital marketing professional specializing in SEO, social media, and campaign optimization.',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'The University of Texas at Dallas',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of Madras',
    },
  ],
  knowsAbout: [
    'SEO',
    'SEM',
    'Social Media Marketing',
    'Campaign Optimization',
    'Google Analytics',
    'HubSpot',
    'Meta Ads Manager',
  ],
  sameAs: ['https://www.linkedin.com/in/hveeravalliprabu'],
}

// Inside the JSX return:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
  }}
/>
```

**Where to place the `<script>` tag:** Inside the `<head>` is cleanest. In Next.js App Router, you can place it directly inside the `<html>` block before `<body>`, or inside `<body>`. Both are indexed by Google; `<head>` placement is conventional.

### Pattern 5: Typed Data Contracts (src/types + src/data)

**What:** Define TypeScript interfaces first in `src/types/index.ts`, then populate `src/data/*.ts` files with real resume content before any component is written.

**When to use:** Always. This is the architectural constraint established in STATE.md -- "all `src/data/*.ts` files must be populated before any section component is written."

**Key data structures:**
```typescript
// src/types/index.ts

export interface HeroData {
  name: string
  tagline: string
  availability: string
  metrics: Array<{ value: string; label: string }>
  ctaResume: string
  ctaContact: string
}

export interface ExperienceEntry {
  role: string
  company: string
  location: string
  startDate: string
  endDate: string | 'Present'
  bullets: string[]
}

export interface EducationEntry {
  degree: string
  field: string
  institution: string
  location: string
  graduationDate: string
  honors?: string
  coursework?: string[]
}

export interface SkillsData {
  marketingAnalytics: string[]
  toolsPlatforms: string[]
  certifications: string[]
}

export interface LeadershipEntry {
  organization: string
  role: string
  startDate: string
  endDate: string | 'Present'
  description: string
}

export interface ContactData {
  email: string
  linkedIn: string
  resumePdf: string
  phone?: string    // Optional -- user can choose to omit per STATE.md
}
```

**Resume data extracted from PDF (all confirmed -- no placeholders):**

Hero metrics (HERO-05):
- "40% increase in website traffic" (Experiential School of Design)
- "25% boost in lead generation" (OneComp Tech)
- "20% increase in LinkedIn leads" (Experiential School of Design)
- "7% engagement increase" (International Center, UTD)
- "5% online engagement growth" (Rio Jiu Jitsu)

Experience entries (4 roles):
1. Marketing and Communications Assistant -- International Center, UTD -- Richardson, TX -- Mar 2025 - Present
2. Marketing Intern -- Rio Jiu Jitsu Lifestyle -- Dallas, TX -- Aug 2025 - Oct 2025
3. Social Media Marketing Intern -- Experiential School of Design -- Chennai, India -- Jan 2023 - Jan 2024
4. Digital Marketing Intern -- OneComp Tech Digital MediaWorks -- Chennai, India -- Feb 2022 - Jan 2023

Leadership entries (3 + delegation):
1. Global Ambassador -- UTD International Center -- Aug 2025 - Present
2. Events Team Officer -- UTD Project Management Club -- Mar 2025 - Present
3. President -- Kotler's Quorum -- Oct 2021 - May 2024
4. Delegate -- International Youth Exchange Program, Malaysia -- Nov 2022

Education entries (2):
1. MS Marketing -- UT Dallas -- May 2026
2. Bachelor of Commerce, Marketing Management (University Gold Medalist) -- University of Madras -- May 2024

Skills (from resume):
- Marketing and Analytics: SEO, SEM, E-commerce Website Development, Paid Media, Campaign Optimization, A/B Testing, Funnel Optimization, Performance Tracking, Customer Acquisition, Audience Segmentation
- Tools and Platforms: Google Analytics, HubSpot CRM, Meta Ads Manager, Shopify, WordPress, Adobe Suite, Canva, SEMrush
- Certifications: HubSpot Marketing Hub Software Certification, Digital Scholar Digital Marketing 70-hour Workshop Completion Certification

Contact:
- Email: harshavprabu@gmail.com
- LinkedIn: https://www.linkedin.com/in/hveeravalliprabu
- Phone: 323-659-8053 (include in data file; component can choose to omit display)

### Pattern 6: Semantic HTML Skeleton (POL-06)

**What:** The App Router layout and page establish the correct landmark hierarchy. Heading hierarchy starts at `<h1>` which lives in HeroSection (Phase 2); the layout itself uses `<header>`, `<main>`, and `<footer>`.

**Example layout structure:**
```tsx
// src/app/layout.tsx -- landmark structure
<html lang="en" className={inter.variable}>
  <body className="bg-background text-foreground">
    <header>
      {/* Navbar -- Phase 3 */}
    </header>
    <main>
      {children}  {/* page.tsx renders all <section> elements */}
    </main>
    <footer>
      {/* Footer -- copyright, social links */}
    </footer>
  </body>
</html>

// src/app/page.tsx -- section stubs (Phase 1 version)
export default function Home() {
  return (
    <>
      <section id="hero" aria-label="Hero" />
      <section id="about" aria-label="About" />
      <section id="experience" aria-label="Experience" />
      <section id="skills" aria-label="Skills" />
      <section id="leadership" aria-label="Leadership" />
      <section id="contact" aria-label="Contact" />
    </>
  )
}
```

**Section IDs to finalize in Phase 1 (architectural dependency):** `hero`, `about`, `experience`, `skills`, `leadership`, `contact`. These IDs are referenced by anchor links in Phase 3 Navbar and must not change after Phase 2 is complete.

### Anti-Patterns to Avoid

- **Using tailwind.config.ts for custom colors/fonts:** In v4, custom tokens go in `globals.css @theme`. A `tailwind.config.ts` with a `theme.extend` section is the v3 pattern -- do not mix approaches.
- **Using `<link>` tag for Google Fonts:** Render-blocking, external request, no FOUT prevention. Always use `next/font/google`.
- **Using next/script for JSON-LD:** `next/script` adds client-side hydration; the JSON-LD must appear in SSG HTML for crawlers. Use inline `<script dangerouslySetInnerHTML>` in the RSC layout.
- **Using Next.js `<Link>` for same-page anchor navigation:** Suppresses browser scroll behavior (known Next.js open issue #51721). Use plain `<a href="#section">` with CSS `scroll-behavior: smooth`.
- **Writing placeholder content in data files:** STATE.md is explicit -- all data files must contain real resume-sourced copy. No "lorem ipsum" or "TBD" values.
- **Adding `'use client'` to layout or section stubs:** The layout and page stubs in Phase 1 are Server Components. Only Navbar (Phase 3) needs `'use client'`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font optimization and FOUT prevention | Manual font-face declarations + preload link tags | `next/font/google` | Font self-hosting, fallback size-adjust, and display=swap are handled automatically |
| SEO meta tag management | Custom `<Head>` component with hardcoded tags | Next.js Metadata API (`export const metadata`) | Built into App Router; validates types at compile time; zero runtime cost |
| CSS custom properties for design tokens | Inline `:root` variable declarations | Tailwind v4 `@theme` | @theme generates utility classes from tokens -- `:root` variables do not |
| Utility class generation for custom colors | Manual CSS utility class definitions | @theme `--color-*` namespace | Every `--color-*` variable in @theme automatically generates `bg-*`, `text-*`, `border-*` classes |
| JSON sanitization for script injection | Custom escaping logic | `.replace(/</g, '\\u003c')` one-liner | Simple, correct, no dependency needed |

**Key insight:** In this phase, all three "hard problems" (fonts, SEO, design tokens) have first-class framework solutions. The entire phase is about configuration and data, not custom infrastructure.

---

## Common Pitfalls

### Pitfall 1: Tailwind v4 @theme vs @layer base

**What goes wrong:** Developer puts custom CSS variables in `@layer base` on `:root` instead of `@theme`. Variables are defined but no utility classes are generated (`bg-accent` fails to compile).
**Why it happens:** Muscle memory from v3 pattern (custom properties in `:root`, then reference in `tailwind.config.ts`).
**How to avoid:** All design tokens go in `@theme {}`. Only non-token custom CSS (like `scroll-behavior: smooth` on `html`) goes in `@layer base` or bare CSS after the import.
**Warning signs:** `bg-accent` not recognized by IntelliSense; no `text-foreground` class available.

### Pitfall 2: next/font variable not applied to html element

**What goes wrong:** Inter loads but Tailwind's `--font-sans: var(--font-inter)` resolves to nothing because `--font-inter` is never defined on the DOM.
**Why it happens:** `inter.variable` is not added to the `className` on `<html>`.
**How to avoid:** Always add `className={inter.variable}` (or `className={inter.className}` if not using CSS variable mode) to the `<html>` tag in `layout.tsx`.
**Warning signs:** Page uses system font instead of Inter; browser DevTools shows `--font-inter` is undefined.

### Pitfall 3: JSON-LD not appearing in raw HTML (crawler-invisible)

**What goes wrong:** JSON-LD is added via `next/script` with `strategy="afterInteractive"` or `strategy="lazyOnload"`. Google's crawler sees the raw HTML before JavaScript runs and never finds the schema.
**Why it happens:** Developer treats JSON-LD like a third-party script that can be deferred.
**How to avoid:** Use a bare `<script>` tag with `dangerouslySetInnerHTML` inside the RSC layout. RSC renders server-side -- the script tag is in the HTML payload, not injected by JavaScript.
**Warning signs:** Google Rich Results Test shows "no items detected" even though the code appears correct.

### Pitfall 4: Mixing @theme and tailwind.config.ts

**What goes wrong:** Developer runs `npx shadcn@latest init` which may generate a `tailwind.config.ts` with theme extensions, while globals.css also has `@theme`. Conflicting token definitions cause unpredictable class generation.
**Why it happens:** shadcn/ui's init command historically generated a tailwind config. In v4 mode (auto-detected), it should generate CSS-only config -- but older CLI versions or unexpected detection may fall back to v3 pattern.
**How to avoid:** After `shadcn init`, inspect the output. If a `tailwind.config.ts` appears with `theme.extend.colors`, move those color definitions to `globals.css @theme` and delete the config file.
**Warning signs:** Two color systems existing simultaneously; shadcn tokens like `--background` and your custom `--color-background` coexisting.

### Pitfall 5: OG image missing for LinkedIn sharing (POL-02)

**What goes wrong:** LinkedIn Post Inspector returns a card with only text -- no image. The requirement "Open Graph for LinkedIn sharing" implies a large card preview which requires a valid image.
**Why it happens:** Developers often set `og:title` and `og:description` without providing `og:image`, or provide an image with wrong dimensions.
**How to avoid:** Include `openGraph.images` in the Metadata export with a 1200x630 PNG. A simple static file in `/public/og-image.png` is sufficient. LinkedIn caches OG data aggressively -- if the URL is new, the first preview pull will be correct.
**Warning signs:** LinkedIn Post Inspector shows "small image" or no image; `og:image` property missing from page source.

### Pitfall 6: Section IDs changed after Phase 2 components are written

**What goes wrong:** IDs like `id="experience"` are changed to `id="work"` during Phase 2 or Phase 3 for readability, breaking all Navbar anchor links.
**Why it happens:** IDs look like implementation details -- easy to rename without realizing downstream impact.
**How to avoid:** Declare and lock section IDs in Phase 1 in `page.tsx` stubs. Document them in a comment. Do not change after Phase 2 starts.
**Warning signs:** Navbar links stop scrolling to correct sections; Intersection Observer stops highlighting correctly.

---

## Code Examples

### Complete globals.css (Phase 1 target state)

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Typography */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  /* Colors */
  --color-background: oklch(0.99 0.00 0);
  --color-foreground: oklch(0.15 0.01 260);
  --color-accent: oklch(0.55 0.10 240);
  --color-accent-hover: oklch(0.48 0.12 240);
  --color-muted: oklch(0.93 0.00 0);
  --color-muted-foreground: oklch(0.50 0.01 260);
  --color-card: oklch(0.97 0.00 0);

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

### Complete layout.tsx (Phase 1 target state)

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://harshavardhini.com'),
  title: 'Harsha Vardhini Veeravalli Prabu | Digital Marketing Professional',
  description:
    'Data-driven digital marketing professional specializing in SEO, social media, and campaign optimization. University Gold Medalist. MS Marketing at UT Dallas.',
  openGraph: {
    title: 'Harsha Vardhini | Digital Marketing Professional',
    description:
      'SEO, SEM, social media, and campaign optimization specialist. Open to full-time marketing roles in the US.',
    url: 'https://harshavardhini.com',
    siteName: 'Harsha Vardhini Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Harsha Vardhini Veeravalli Prabu -- Digital Marketing Professional',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harsha Vardhini | Digital Marketing Professional',
    description:
      'SEO, SEM, and campaign optimization specialist. MS Marketing at UT Dallas.',
  },
  alternates: {
    canonical: 'https://harshavardhini.com',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Harsha Vardhini Veeravalli Prabu',
  url: 'https://harshavardhini.com',
  email: 'harshavprabu@gmail.com',
  jobTitle: 'Digital Marketing Professional',
  description:
    'Data-driven digital marketing professional specializing in SEO, social media, and campaign optimization.',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'The University of Texas at Dallas',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of Madras',
    },
  ],
  knowsAbout: [
    'SEO',
    'SEM',
    'Social Media Marketing',
    'Campaign Optimization',
    'Google Analytics',
    'HubSpot',
    'Meta Ads Manager',
    'Shopify',
    'SEMrush',
  ],
  sameAs: ['https://www.linkedin.com/in/hveeravalliprabu'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="bg-background text-foreground font-sans">
        <header>{/* Navbar -- Phase 3 */}</header>
        <main>{children}</main>
        <footer className="py-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Harsha Vardhini Veeravalli Prabu
        </footer>
      </body>
    </html>
  )
}
```

### src/types/index.ts (Phase 1 target state)

```typescript
// src/types/index.ts

export interface Metric {
  value: string
  label: string
}

export interface HeroData {
  name: string
  tagline: string
  availability: string
  metrics: Metric[]
  ctaResume: string
  ctaContact: string
}

export interface ExperienceEntry {
  role: string
  company: string
  location: string
  startDate: string
  endDate: string | 'Present'
  bullets: string[]
}

export interface EducationEntry {
  degree: string
  field: string
  institution: string
  location: string
  graduationDate: string
  honors?: string
  coursework?: string[]
}

export interface SkillsData {
  marketingAnalytics: string[]
  toolsPlatforms: string[]
  certifications: string[]
}

export interface LeadershipEntry {
  organization: string
  role: string
  startDate: string
  endDate: string | 'Present'
  description: string
}

export interface AboutData {
  bio: string
}

export interface ContactData {
  email: string
  linkedIn: string
  resumePdf: string
  phone?: string
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` with `theme.extend` | `@theme` in `globals.css` | Tailwind v4 (Jan 2025) | No JS config file needed; tokens generate utility classes directly |
| `tailwindcss` PostCSS plugin | `@tailwindcss/postcss` plugin | Tailwind v4 | Different package name in `postcss.config.mjs` |
| `import 'framer-motion'` | `import { motion } from 'motion/react'` | Package renamed to `motion` (2024) | Install `npm install motion`, not `framer-motion` |
| `next/head` for metadata | `export const metadata` from layout/page | Next.js 13 App Router | `next/head` is Pages Router only; App Router uses Metadata API |
| `tailwindcss-animate` | `tw-animate-css` | shadcn/ui Tailwind v4 update (Feb 2025) | shadcn init auto-selects correct package; do not manually install old one |

**Deprecated/outdated:**
- `tailwindcss-animate`: Replaced by `tw-animate-css` in the Tailwind v4 shadcn/ui setup -- shadcn CLI handles this automatically
- `next/head`: Pages Router only -- never use in App Router
- `framer-motion` package name: Still works as an alias but canonical install is `motion`

---

## Open Questions

1. **Domain / metadataBase URL**
   - What we know: PROJECT.md does not specify a final domain. `harshavardhini.com` is used as a reasonable assumption.
   - What's unclear: Whether this domain is registered and will be used, or if Vercel's auto-generated URL (`*.vercel.app`) will be the production URL.
   - Recommendation: Use `https://harshavardhini.com` as metadataBase for now. If the final domain is different, it is a one-line change in `layout.tsx`. This does not block Phase 1.

2. **OG image asset**
   - What we know: POL-02 requires Open Graph for LinkedIn sharing. LinkedIn requires a real image at `og:image` for the large card format.
   - What's unclear: No design asset exists yet for an OG image. A custom generated OG image is explicitly v2 scope (APOL-04).
   - Recommendation: Create a minimal static `public/og-image.png` (1200x630, off-white background with name and title in dark text) as a Phase 1 task. This is low-effort and unblocks POL-02 validation.

3. **Phone number display**
   - What we know: The resume lists 323-659-8053. STATE.md notes "Contact is links only (email + LinkedIn) -- no contact form." User preference on phone display is unspecified.
   - What's unclear: Whether the phone number should appear on the site or be omitted entirely.
   - Recommendation: Include phone in `contact.ts` data file. The component (Phase 2) can choose whether to display it. Omitting from data is irreversible; including and not rendering is safe.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js | npm/npx commands | Yes | v25.6.1 | -- |
| npm | Package installation | Yes | 11.9.0 | -- |
| npx | create-next-app | Yes | 11.9.0 | -- |
| next (npm registry) | Project framework | Yes | 16.2.2 | -- |
| tailwindcss (npm registry) | Styling | Yes | 4.2.2 | -- |
| motion (npm registry) | Animation | Yes | 12.38.0 | -- |
| Internet access | npm install, npx create-next-app | Assumed | -- | -- |

**Missing dependencies with no fallback:** None.

**Note:** `npm run dev` is NOT run automatically per CLAUDE.md directives. All verification that the project runs is done by the human explicitly invoking it.

---

## Validation Architecture

nyquist_validation is explicitly set to `false` in `.planning/config.json` -- this section is skipped.

---

## Sources

### Primary (HIGH confidence)

- Tailwind CSS v4 @theme directive -- https://tailwindcss.com/docs/theme (fetched 2026-04-03)
- Next.js npm registry -- version 16.2.2 confirmed via `npm view next version` (2026-04-03)
- Tailwind CSS npm registry -- version 4.2.2 confirmed via `npm view tailwindcss version` (2026-04-03)
- Motion npm registry -- version 12.38.0 confirmed via `npm view motion version` (2026-04-03)
- STACK.md (project init research, 2026-04-03) -- stack choices with cited sources
- ARCHITECTURE.md (project init research, 2026-04-03) -- file structure and patterns

### Secondary (MEDIUM confidence)

- Next.js Metadata API structure -- verified via web search + jsdevspace.substack.com article citing official Next.js 16 docs (2026-04-03)
- JSON-LD inline script pattern -- multiple Next.js community sources agree on `<script dangerouslySetInnerHTML>` in RSC layout; XSS mitigation via `.replace(/</g, '\\u003c')` is the documented approach
- Schema.org Person type -- standard fields verified against schema.org documentation

### Tertiary (LOW confidence)

- LinkedIn Post Inspector OG image requirements (1200x630) -- widely cited in SEO community; not verified against LinkedIn's official developer docs (which require login)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all versions verified against npm registry on 2026-04-03
- Architecture: HIGH -- sourced from ARCHITECTURE.md which cites Next.js official docs
- Design tokens (@theme): HIGH -- verified against official Tailwind v4 docs (tailwindcss.com/docs/theme)
- Metadata API: HIGH -- structure confirmed, TypeScript types stable across Next.js 13-16
- JSON-LD pattern: MEDIUM -- RSC inline script approach confirmed by multiple community sources; official Next.js JSON-LD guide URL was inaccessible during research but pattern is consistent across all sources
- Resume data extraction: HIGH -- read directly from the resume PDF

**Research date:** 2026-04-03
**Valid until:** 2026-05-03 (stable stack; Tailwind v4 and Next.js 16 are not fast-moving at point releases)
