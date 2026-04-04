# Phase 2: Content Sections - Context

**Gathered:** 2026-04-04
**Status:** Ready for planning

<domain>
## Phase Boundary

All six sections (Hero, About, Experience, Skills, Leadership, Contact) rendered on the page with real resume-sourced content, correct layout at all breakpoints, and the site reads as a complete, credible portfolio.

</domain>

<decisions>
## Implementation Decisions

### Hero Section Layout
- Full-height hero (min-h-screen) with content vertically centered
- 5 headline metrics displayed in a horizontal row below the tagline
- Dual CTA buttons: filled accent (Contact Me) + outlined (Download Resume) for clear primary/secondary hierarchy
- Left-aligned text on desktop, centered on mobile (asymmetric modern feel)

### Experience Section Design
- Timeline layout with vertical line and dots showing career progression
- Each role shows company, title, dates, location + 3-4 metric achievement bullets
- All content shown upfront (no expand/collapse) -- recruiters scan, don't click
- Bold the numbers in achievement bullets to draw the scanner's eye

### Skills & Contact Sections
- Skills displayed as grouped tags/pills by category (Marketing & Analytics, Tools & Platforms, Certifications)
- Contact section centered with large email + LinkedIn buttons + availability reminder
- Alternating subtle background tints (white/card color) between sections for visual rhythm
- Section headings are left-aligned h2 with small accent underline

### Claude's Discretion
- About section layout details (single paragraph with education callout)
- Leadership section layout (similar to experience but more compact)
- Education display within About (inline mention vs separate subsection)
- Specific Tailwind utility classes and responsive breakpoint details
- Animation-ready class names (Phase 4 will add Motion animations)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/types/index.ts` -- 8 TypeScript interfaces for all section data
- `src/data/*.ts` -- 7 data files with real resume content (hero, about, experience, skills, education, leadership, contact)
- `src/lib/utils.ts` -- cn() utility from shadcn/ui for conditional classNames
- `src/app/globals.css` -- Tailwind v4 @theme tokens (background, foreground, accent, muted, card colors)

### Established Patterns
- Server Components by default (no "use client" unless interactivity needed)
- Import data from `@/data/*` and types from `@/types`
- Design tokens via Tailwind utility classes (bg-background, text-foreground, text-accent, etc.)
- Inter font loaded via CSS variable --font-inter, used as font-sans

### Integration Points
- `src/app/page.tsx` -- 6 section stubs with locked IDs (hero, about, experience, skills, leadership, contact)
- Each section component replaces its stub placeholder
- Navbar (Phase 3) will link to these section IDs

</code_context>

<specifics>
## Specific Ideas

- Hero inspired by Brittany Chiang's clean, left-aligned asymmetric layout
- Metrics row similar to stat highlights pattern from research (stop scanners in their tracks)
- Experience timeline inspired by modern portfolio patterns (vertical line with dots)
- Overall vibe: professional, calm, easy to navigate per project brief

</specifics>

<deferred>
## Deferred Ideas

- Scroll animations on section entry (Phase 4: Polish)
- Active section highlighting in nav (Phase 3: Navigation)
- Professional headshot photo (v2 -- not available yet)
- Certification badge logos (v2 -- need credential images)

</deferred>
