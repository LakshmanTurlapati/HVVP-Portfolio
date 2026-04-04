# Roadmap: Harsha Vardhini Portfolio

## Overview

Four phases deliver a polished, recruiter-ready single-page portfolio. Phase 1 scaffolds the project and locks the design system and content data so every subsequent phase builds on stable foundations. Phase 2 renders all visible content sections. Phase 3 adds interactive navigation. Phase 4 applies motion polish, accessibility validation, and ships to production. Each phase ends with a verifiable, working state.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Scaffold project, establish design tokens, wire Inter font, populate all typed content data files, export SEO metadata
- [ ] **Phase 2: Content Sections** - Implement all six section components (Hero, About, Experience, Skills, Leadership, Contact) with real resume-sourced content
- [ ] **Phase 3: Navigation** - Sticky navbar with anchor links, active-section highlight, mobile hamburger menu, smooth scroll
- [ ] **Phase 4: Polish + Launch** - Scroll-reveal animations, accessibility audit, performance validation, Vercel deployment

## Phase Details

### Phase 1: Foundation
**Goal**: A runnable Next.js 16 project with Tailwind v4 design tokens, Inter font, global layout, typed content data, and SEO metadata -- so every section built in Phase 2 inherits a consistent visual system and no placeholder copy
**Depends on**: Nothing (first phase)
**Requirements**: DES-01, DES-02, DES-03, DES-04, POL-02, POL-03, POL-06
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` renders a blank page with Inter font, the correct off-white background, and no console errors
  2. All typed content data files (`src/data/*.ts`) exist and contain real resume-sourced copy -- no lorem ipsum
  3. Browser tab shows the correct SEO title and meta description; LinkedIn Post Inspector returns the correct Open Graph preview
  4. JSON-LD Person schema is present in page source and validates without errors in Google's Rich Results Test
  5. Semantic HTML landmarks (`<header>`, `<main>`, `<footer>`, `<section>`) are in place and heading hierarchy starts at `<h1>`
**Plans**: 4 plans
Plans:
- [ ] 01-01-PLAN.md -- Bootstrap Next.js 16 project scaffold, install motion, initialize shadcn/ui
- [ ] 01-02-PLAN.md -- Wire Tailwind v4 @theme design tokens, Inter font, SEO metadata, JSON-LD Person schema, semantic HTML landmarks
- [ ] 01-03-PLAN.md -- Define TypeScript type contracts and populate all 7 data files with real resume content
- [ ] 01-04-PLAN.md -- Write page.tsx section ID stubs, add OG image and resume PDF to public/
**UI hint**: yes

### Phase 2: Content Sections
**Goal**: All six sections (Hero, About, Experience, Skills, Leadership, Contact) are rendered on the page with real content, correct layout at all breakpoints, and the site reads as a complete, credible portfolio
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, ABOUT-01, ABOUT-02, EXP-01, EXP-02, EXP-03, SKILL-01, SKILL-02, SKILL-03, LEAD-01, LEAD-02, LEAD-03, CONT-01, CONT-02, CONT-03, DES-05
**Success Criteria** (what must be TRUE):
  1. A visitor landing on the page sees Harsha's name, specialization tagline, availability statement, and 3-5 headline metrics within the first viewport on both mobile (375px) and desktop
  2. Clicking the resume CTA button in the hero downloads the PDF; clicking the contact CTA scrolls to the contact section
  3. All four professional roles are displayed with company, title, dates, and 3-4 quantified achievement bullets each
  4. Skills are grouped by category and tools are listed with recognizable platform names; certifications are listed below
  5. Email and LinkedIn are both visible and clickable in the contact section; all three leadership roles are displayed with their descriptions
**Plans**: TBD
**UI hint**: yes

### Phase 3: Navigation
**Goal**: Visitors can orient themselves and jump between sections via a sticky top navigation bar that highlights the active section during scroll and collapses to a hamburger menu on mobile
**Depends on**: Phase 2
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. The navigation bar remains visible at the top of the viewport as the user scrolls the full page length
  2. The nav link corresponding to the section currently in view is visually highlighted; highlight updates as the user scrolls through each section
  3. On a mobile viewport (375px), the nav collapses to a hamburger icon; tapping it opens and closes a menu that contains all section links
  4. Clicking any nav link scrolls smoothly to that section; the hamburger menu can be opened and closed with the keyboard alone
**Plans**: TBD
**UI hint**: yes

### Phase 4: Polish + Launch
**Goal**: The site is visually refined with subtle scroll-reveal animations, passes WCAG 2.2 AA accessibility checks and a Lighthouse performance score above 90, and is live on Vercel and shareable with recruiters
**Depends on**: Phase 3
**Requirements**: POL-01, POL-04, POL-05, POL-07
**Success Criteria** (what must be TRUE):
  1. Each section fades in as it enters the viewport; animations are suppressed when `prefers-reduced-motion` is active
  2. All body text passes 4.5:1 color contrast ratio; all interactive elements are reachable and operable via keyboard alone
  3. Lighthouse on the deployed Vercel URL reports LCP under 2.5s and an accessibility score of 100
  4. The site is live at a public URL; all external links (email, LinkedIn, resume PDF) work correctly in production
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/4 | Not started | - |
| 2. Content Sections | 0/? | Not started | - |
| 3. Navigation | 0/? | Not started | - |
| 4. Polish + Launch | 0/? | Not started | - |
