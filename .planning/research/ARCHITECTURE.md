# Architecture Patterns

**Project:** Harsha Vardhini Portfolio
**Domain:** Single-page marketing portfolio website
**Researched:** 2026-04-03
**Confidence:** HIGH (verified against Next.js official docs, real portfolio implementations, and multiple community sources)

---

## Recommended Architecture

A single-page application built with Next.js App Router. The entire site lives at `app/page.tsx`, which renders a linear stack of section components. Navigation is a sticky header with anchor links; no multi-page routing is needed. All content is static TypeScript data — no CMS, no API calls.

### High-Level Structure

```
Browser
  └── RootLayout (app/layout.tsx)
        ├── Navbar (sticky, fixed position, scroll-aware)
        └── Main (app/page.tsx — single scrollable canvas)
              ├── HeroSection
              ├── AboutSection
              ├── ExperienceSection
              ├── SkillsSection
              ├── EducationSection
              └── ContactSection
```

---

## Component Boundaries

| Component | Responsibility | Inputs | Communicates With |
|-----------|---------------|--------|-------------------|
| `RootLayout` | HTML shell, metadata, font loading, global styles | none | wraps everything |
| `Navbar` | Fixed top nav, anchor links, active-section highlight, mobile menu | none (reads scroll state internally) | sections (via Intersection Observer) |
| `HeroSection` | Name, tagline, CTA button ("View Resume" / "Contact Me") | `data/hero.ts` | ContactSection (CTA scrolls to it) |
| `AboutSection` | Professional bio paragraph, brief background | `data/about.ts` | none |
| `ExperienceSection` | Chronological work history with measurable achievements | `data/experience.ts` | none |
| `SkillsSection` | Grouped skills, marketing platforms, certifications | `data/skills.ts` | none |
| `EducationSection` | UTD MS Marketing, Gold Medal, University of Madras | `data/education.ts` | none |
| `ContactSection` | Email link, LinkedIn link, optional contact note | `data/contact.ts` | none |
| `Footer` | Copyright, social links | `data/contact.ts` | none |

**Server vs. Client boundary:** All section components are React Server Components (no `'use client'`). The `Navbar` is the only Client Component — it needs `useState` and `useEffect` for scroll detection and mobile menu toggle.

---

## Data Flow

Static data lives in `src/data/` as typed TypeScript objects. Components import directly — no prop drilling, no Context, no state management library needed for content.

```
src/data/*.ts  (source of truth)
     |
     v
Section Components (Server Components, import at build time)
     |
     v
Rendered HTML (static, no runtime data fetching)
```

Navbar active-section state flows separately:

```
Browser scroll events / Intersection Observer
     |
     v
useActiveSection() hook (inside Navbar, client-side only)
     |
     v
Navbar link highlight (visual feedback only, no data affected)
```

There is no upward data flow. Sections are purely presentational — they receive typed data and render it.

---

## File Organization

```
harsha-portfolio/
├── public/
│   └── resume.pdf               # Downloadable resume (linked from Hero)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # RootLayout: fonts, metadata, global CSS
│   │   ├── page.tsx             # Composes all sections in order
│   │   ├── globals.css          # Tailwind base + custom scroll-behavior
│   │   └── favicon.ico
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # 'use client' — scroll-aware, mobile menu
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── AboutSection.tsx
│   │       ├── ExperienceSection.tsx
│   │       ├── SkillsSection.tsx
│   │       ├── EducationSection.tsx
│   │       └── ContactSection.tsx
│   ├── data/
│   │   ├── hero.ts              # Tagline, CTA text
│   │   ├── about.ts             # Bio paragraph
│   │   ├── experience.ts        # Array of job entries (role, company, dates, bullets)
│   │   ├── skills.ts            # Grouped skills/tools/certs
│   │   ├── education.ts         # Degrees, awards
│   │   └── contact.ts           # Email, LinkedIn URL, resume URL
│   ├── hooks/
│   │   └── useActiveSection.ts  # Intersection Observer hook for nav highlight
│   └── types/
│       └── index.ts             # Shared TypeScript interfaces
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Patterns to Follow

### Pattern 1: Section ID Anchoring

Every section component renders a `<section>` with a stable `id` attribute. Navigation links use `href="#experience"` with `scroll-behavior: smooth` set globally in CSS.

```typescript
// globals.css
html {
  scroll-behavior: smooth;
}

// ExperienceSection.tsx
export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 max-w-4xl mx-auto px-6">
      {/* content */}
    </section>
  );
}
```

This approach avoids Next.js Link's scroll suppression issue. Plain `<a href="#section">` anchor tags in the Navbar work correctly with CSS smooth scroll. No JavaScript scroll manipulation needed.

### Pattern 2: Static Data as Typed Arrays

Content is typed and co-located in `src/data/`. Each file exports a typed constant — easy to edit, version-controlled, no CMS dependency.

```typescript
// src/types/index.ts
export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  bullets: string[];
}

// src/data/experience.ts
import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    role: "Digital Marketing Specialist",
    company: "...",
    location: "...",
    startDate: "Jan 2024",
    endDate: "Present",
    bullets: ["Increased organic traffic by 40% through...", "..."],
  },
  // ...
];
```

### Pattern 3: Intersection Observer for Active Nav

The Navbar uses a custom `useActiveSection` hook that observes all `section[id]` elements and returns the ID of the most visible one. Nav links conditionally apply an accent color class when their href matches the active section.

```typescript
// src/hooks/useActiveSection.ts
"use client";
import { useEffect, useState } from "react";

export function useActiveSection(): string {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return activeId;
}
```

### Pattern 4: Mobile-First Responsive Layout

All layout uses Tailwind mobile-first breakpoints. Section containers use a consistent max-width and padding pattern so spacing is uniform across all sections.

```typescript
// Consistent section wrapper class string
"py-20 md:py-28 px-6 max-w-4xl mx-auto"

// Navbar mobile: hamburger toggle (useState), desktop: inline links
// md:hidden  → show hamburger on mobile
// hidden md:flex  → show inline links on desktop
```

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Multi-Page Routing for Sections

**What:** Creating `app/about/page.tsx`, `app/experience/page.tsx` etc.
**Why bad:** Defeats single-page design, breaks smooth scroll UX, adds unnecessary complexity. Recruiters should scan everything without navigation clicks.
**Instead:** All sections in `app/page.tsx`, anchor link navigation only.

### Anti-Pattern 2: Client Components for Static Sections

**What:** Adding `'use client'` to HeroSection, ExperienceSection, etc.
**Why bad:** Unnecessary JavaScript bundle shipped to browser; sections have no interactivity. Hurts performance and SEO.
**Instead:** Keep all sections as Server Components. Only Navbar needs `'use client'`.

### Anti-Pattern 3: Hardcoding Content Inside Components

**What:** Writing resume data (job titles, bullets, dates) directly in JSX.
**Why bad:** Content changes require hunting through component files. Difficult to update.
**Instead:** All content in `src/data/*.ts`, imported into components.

### Anti-Pattern 4: Global State for Section Data

**What:** Using React Context or Zustand to pass content through the tree.
**Why bad:** Over-engineering for a static site. Content doesn't change at runtime.
**Instead:** Direct imports from `src/data/` into each section component.

### Anti-Pattern 5: Using Next.js `<Link>` for Same-Page Anchor Navigation

**What:** `<Link href="#experience">Experience</Link>` in the Navbar.
**Why bad:** Next.js `<Link>` suppresses the browser's default scroll behavior; clicking updates the URL hash but does not scroll. A known open issue as of 2025.
**Instead:** Plain `<a href="#experience">Experience</a>` tags in the Navbar, with `scroll-behavior: smooth` in global CSS.

---

## Metadata and SEO Structure

SEO metadata is declared statically in `app/layout.tsx` using the Next.js App Router Metadata API. No `next/head` needed.

```typescript
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Harsha Vardhini Veeravalli Prabu | Digital Marketing",
  description:
    "Data-driven digital marketing professional specializing in SEO, social media, and campaign optimization. University Gold Medalist, MS Marketing at UT Dallas.",
  metadataBase: new URL("https://harshavardhini.com"),
  openGraph: {
    title: "Harsha Vardhini | Digital Marketing Professional",
    description: "...",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};
```

---

## Suggested Build Order

Dependencies between components determine build sequence. Lower-numbered phases must ship before higher ones depend on them.

| Phase | What to Build | Why This Order |
|-------|--------------|----------------|
| 1 | Project scaffold: Next.js init, Tailwind, TypeScript config, `src/` structure | Everything else depends on this |
| 2 | `src/types/index.ts` and all `src/data/*.ts` files | Components cannot be written without typed data contracts |
| 3 | `app/layout.tsx` with RootLayout, fonts (Inter), metadata, global CSS | Required shell before any page renders |
| 4 | `app/page.tsx` stub + individual section components (no styling) | Establishes render order, confirms data flows into components |
| 5 | Section styling: Hero, About, Experience, Skills, Education, Contact | Content-first; layout polish follows structure |
| 6 | `Navbar` component with anchor links and mobile menu | Depends on section IDs being established in step 4 |
| 7 | `useActiveSection` hook wired into Navbar | Depends on Navbar and all section IDs existing |
| 8 | Responsive polish, accessibility review, performance audit | Final pass after all components are functional |

**Critical dependency:** Section `id` attributes (set in step 4) must be finalized before the Navbar active-section logic (step 7) is written. Renaming section IDs after step 7 breaks nav highlight behavior.

---

## Scalability Considerations

This is a static marketing site; scalability means maintainability, not traffic handling.

| Concern | Current Approach | If Extended Later |
|---------|-----------------|-------------------|
| Content updates | Edit `src/data/*.ts` files | Add Contentlayer or MDX for richer content |
| New sections | Add file to `sections/`, add entry to `page.tsx`, add nav link | Zero architectural change needed |
| Blog addition | Out of scope now | Add `app/blog/` route; existing single-page unaffected |
| Dark mode | Out of scope now | Add `ThemeContext` as Client Component wrapper in layout |
| Analytics | Out of scope now | Add `@vercel/analytics` script to layout |
| Internalization | Out of scope now | Would require significant routing rework |

---

## Sources

- Next.js App Router project structure: https://nextjs.org/docs/app/getting-started/project-structure
- Next.js App Router metadata API: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Brittany Chiang portfolio (design inspiration reference): https://brittanychiang.com/
- Building a modern portfolio with Next.js 15: https://richardporter.dev/blog/building-modern-portfolio-nextjs-15
- Smooth scroll section navigation in Next.js: https://mariogiancini.com/implementing-smooth-scroll-behavior-with-tailwind-css-and-nextjs
- Next.js Link smooth scroll issue (open): https://github.com/vercel/next.js/issues/51721
- Intersection Observer for active nav highlight: https://www.thomasledoux.be/blog/highlighting-navigation-items-on-scroll
- Next.js portfolio with Tailwind CSS (freeCodeCamp): https://www.freecodecamp.org/news/how-to-build-a-portfolio-site-with-nextjs-tailwindcss/
- Next.js 15 project structure best practices: https://dev.to/bajrayejoon/best-practices-for-organizing-your-nextjs-15-2025-53ji
- Mastering responsive layouts with Tailwind Grid: https://dev.to/codeparrot/mastering-responsive-layouts-with-tailwind-grid-36em
