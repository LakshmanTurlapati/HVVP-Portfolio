# Roadmap: Harsha Vardhini Portfolio

## Overview

**v1.0 (completed 2026-04-04):** Four phases delivered a polished, recruiter-ready single-page portfolio on a muted-neutral design system with resume-sourced content.

**v2.0 (in progress -- 2026-04-04 onward):** Six phases reposition the portfolio from "data-driven marketer with numbers" to "strategist + creator with a visible body of work." The milestone layers Harsha's personal brand identity (DeepBlack / Orange / White + Montserrat Bold), two inline marketing case studies, and a 31-asset creative gallery onto the validated v1.0 base. Phase 5 is the hard dependency blocker -- design tokens must ship first because every downstream section consumes them. Phases 6 and 7 rebuild content sections on the new tokens. Phase 8 (the single largest risk surface) establishes a next/image pipeline for the creative gallery. Phase 9 atomically rewires navigation and retires v1.0 sections. Phase 10 re-verifies accessibility, refreshes OG cache, and ships.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

**v1.0 Milestone (completed):**
- [x] **Phase 1: Foundation** - Scaffold project, establish design tokens, wire Inter font, populate all typed content data files, export SEO metadata
- [x] **Phase 2: Content Sections** - Implement all six section components (Hero, About, Experience, Skills, Leadership, Contact) with real resume-sourced content
- [x] **Phase 3: Navigation** - Sticky navbar with anchor links, active-section highlight, mobile hamburger menu, smooth scroll
- [x] **Phase 4: Polish + Launch** - Scroll-reveal animations, accessibility audit, performance validation, Vercel deployment (completed 2026-04-04)

**v2.0 Milestone (Brand Redesign & Creative Portfolio):**
- [ ] **Phase 5: Design Token Foundation** - Palette swap to DeepBlack/Orange/White OKLCH, Montserrat variable font, full shadcn token expansion, 27-usage accent audit, skip-link rewrite
- [ ] **Phase 6: Content Sections Rebuild** - Rebuilt Hero (brief copy + 3 metrics + View My Work CTA), rewritten About, new Value Prop section, redesigned Contact
- [ ] **Phase 7: Case Studies** - Two 5-block case studies (UTD International Center + Rio Jiu Jitsu) via shared Data-as-Prop CaseStudySection component
- [ ] **Phase 8: Creative Work Gallery** - 31-asset gallery across 6 categories with accessible lightbox, next/image pipeline, aspect-ratio containers, lazy loading
- [ ] **Phase 9: Navigation Rewire + Retirements** - Rewire navbar anchors, reorder page.tsx, delete v1.0 Experience/Skills/Leadership sections atomically
- [ ] **Phase 10: Polish, Accessibility QA, Deploy** - Contrast re-audit, LCP verification, OG image rename, Twitter card, reduced-motion JS verification, production deploy

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
- [x] 01-01-PLAN.md -- Bootstrap Next.js 16 project scaffold, install motion, initialize shadcn/ui
- [x] 01-02-PLAN.md -- Wire Tailwind v4 @theme design tokens, Inter font, SEO metadata, JSON-LD Person schema, semantic HTML landmarks
- [x] 01-03-PLAN.md -- Define TypeScript type contracts and populate all 7 data files with real resume content
- [x] 01-04-PLAN.md -- Write page.tsx section ID stubs, add OG image and resume PDF to public/
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
**Plans**: 3 plans
Plans:
- [x] 02-01-PLAN.md -- HeroSection (name, tagline, availability, 5 metrics, dual CTAs) + AboutSection (bio, education callout)
- [x] 02-02-PLAN.md -- ExperienceSection (timeline with BoldNumbers) + SkillsSection (grouped pills + cert treatment)
- [x] 02-03-PLAN.md -- LeadershipSection (simplified timeline, IYEP location) + ContactSection (email + LinkedIn CTAs) + page.tsx wire-up
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
**Plans**: 1 plan
Plans:
- [x] 03-01-PLAN.md -- useActiveSection hook + Navbar (sticky, active highlight, hamburger, keyboard accessible)
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
**Plans**: 2 plans
Plans:
- [x] 04-01-PLAN.md -- AnimatedSection wrapper (motion/react fade-in-up, prefers-reduced-motion) + focus rings + contrast fix + skip-to-content link
- [x] 04-02-PLAN.md -- Production build validation + Vercel deployment + live site verification (LCP, links, keyboard)

### Phase 5: Design Token Foundation
**Goal**: Harsha's personal brand palette (DeepBlack #0F0F0F, Orange #FF6A00, Orange-soft #FFA559, White #F9F9F9) and Montserrat Bold display typography are live in the Tailwind v4 @theme with every existing accent usage audited and contrast-verified, so every downstream section in this milestone builds on stable, WCAG-compliant tokens
**Depends on**: Phase 4 (v1.0 complete)
**Requirements**: BRAND-01, BRAND-02, BRAND-03, BRAND-04, BRAND-05, BRAND-06, BRAND-07
**Success Criteria** (what must be TRUE):
  1. The running site renders with the new DeepBlack / Orange / White palette: backgrounds are off-white #F9F9F9, body text is DeepBlack #0F0F0F, and accent elements appear in brand Orange #FF6A00 -- with zero visible regression from v1.0 layout
  2. All existing pages load Montserrat as a second font variable alongside Inter, and the hero H1 plus section H2 headings visibly render in Montserrat Bold while body copy continues to render in Inter
  3. The keyboard skip-link, when focused, is readable against a DeepBlack background with white text (not orange on white) and passes 4.5:1 contrast
  4. Every pre-existing accent-prefixed class usage across the codebase either passes WCAG 2.2 AA contrast in its new Orange form or has been rewritten to a compliant alternative -- documented in an audit log
  5. Orange never appears as body paragraph text or as white-on-orange button labels anywhere on the site
**Plans**: TBD
**UI hint**: yes

### Phase 6: Content Sections Rebuild
**Goal**: The Hero, About, Value Prop ("What I Bring to the Table"), and Contact sections all render with brief-supplied copy verbatim on the new brand tokens, so a visitor lands on a visually cohesive page that speaks in Harsha's brand voice before case studies and gallery are added
**Depends on**: Phase 5
**Requirements**: HERO-06, HERO-07, HERO-08, HERO-09, HERO-10, ABOUT-03, ABOUT-04, VAL-01, VAL-02, VAL-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. The Hero displays the brief-supplied heading "Data-Driven Marketing Strategist | Content & Campaigns That Convert" in Montserrat Bold, the brief subheading, and exactly 3 metric cards (down from 5 in v1.0) including the UTD International Center 7% engagement figure
  2. The Hero primary CTA reads "View My Work" and scrolls smoothly to the gallery section
  3. The About section displays the brief's data-driven marketing bio verbatim with UTD MS Marketing and Gold Medalist credentials still integrated
  4. A new "What I Bring to the Table" section appears on the page with the brief's analytical-plus-creative opener and the bullet list of value-prop items, with the heading in Montserrat display type
  5. The Contact section heading reads "Let's Connect" and both the email and LinkedIn links remain visible and clickable on the new DeepBlack/Orange styling
**Plans**: TBD
**UI hint**: yes

### Phase 7: Case Studies
**Goal**: Two marketing case studies (UTD International Center Campaign and Rio Jiu Jitsu Marketing Strategy) render inline on the page in an identical 5-block scannable structure, rendered by a single reusable CaseStudySection component fed by two data inputs, so recruiters can compare apples-to-apples and see quantified outcomes at a glance
**Depends on**: Phase 6
**Requirements**: CASE-01, CASE-02, CASE-03, CASE-04, CASE-05, CASE-06, CASE-07
**Success Criteria** (what must be TRUE):
  1. Both case studies render with the identical 5-block structure -- Project Description, Context & Challenge, What I Did, Execution Details, Results & Impact -- using the brief's copy verbatim
  2. The UTD case study's Results block visually emphasizes the 7% engagement lift as a standout quantified outcome; the Rio case study's Results block visually emphasizes the 5% engagement lift the same way
  3. Both case studies render from a single `CaseStudySection` component receiving `data: CaseStudyData` as a prop -- not two copy-pasted component trees
  4. The UTD case study is reachable via the deep link `#case-study-utd` and the Rio case study via `#case-study-rio`
  5. A recruiter scrolling from one case study to the next sees immediate structural rhyme -- block order, heading styles, and metric emphasis all match
**Plans**: TBD
**UI hint**: yes

### Phase 8: Creative Work Gallery
**Goal**: Harsha's 31 real design assets render across 6 categories (Instagram Posts, LinkedIn Posts, LinkedIn Ads, LinkedIn Events, Digital Signage, Printables) with human-readable titles, click-to-enlarge lightbox, and a next/image pipeline that ships AVIF/WebP at viewport-appropriate widths -- converting raw 50MB PNG assets into a sub-500KB first-paint experience on mobile
**Depends on**: Phase 7
**Requirements**: GAL-01, GAL-02, GAL-03, GAL-04, GAL-05, GAL-06, GAL-07, GAL-08, GAL-09, GAL-10
**Success Criteria** (what must be TRUE):
  1. The gallery section opens with the brief's intro copy verbatim, then renders all 31 assets grouped into the 6 categories matching the zip folder structure, and closes with the brief's "30+ marketing assets" line
  2. Every gallery tile displays a curated, human-readable title (not a raw filename slug) and the two PDF printables display as PNG preview thumbnails with a visible "PDF" badge
  3. Clicking any gallery tile opens a lightbox showing the full-resolution asset, ESC closes it, arrow keys advance to the next asset, and keyboard focus returns to the tile that launched it; clicking a PDF thumbnail opens the PDF in a new tab
  4. The gallery first mobile paint stays under 500KB, tile captions meet 4.5:1 contrast, and each category grid uses an `aspect-ratio` container matching its assets so no layout shift occurs as images load
  5. Every `next/image` on the page has a `sizes` attribute (no 100vw assumption) and below-the-fold images lazy-load automatically
**Plans**: TBD
**UI hint**: yes

### Phase 9: Navigation Rewire + Retirements
**Goal**: The navbar points at the new v2.0 section lineup only, v1.0 Experience/Skills/Leadership sections and their data files are deleted atomically, and the page.tsx section ordering reflects the final v2.0 narrative -- so the site reads as one coherent redesigned portfolio with no orphaned anchors
**Depends on**: Phase 8
**Requirements**: NAV-05, NAV-06, NAV-07
**Success Criteria** (what must be TRUE):
  1. The navbar renders exactly the new 7-item lineup (Hero, About, Case Studies, Work/Gallery, Approach/Value, Contact) and every link scrolls to an existing section on the page
  2. No navbar link points at the retired section IDs experience, skills, or leadership -- and none of those three section files remain in the codebase
  3. Desktop navbar labels fit on one row without overflow or wrapping at 1024px, 1280px, and 1440px breakpoints
  4. The page.tsx section order matches the v2.0 narrative flow: Hero → About → Case Study UTD → Case Study Rio → Gallery → Value Prop → Contact
  5. Active-section highlighting continues to work across scroll (the existing ID-agnostic hook recognizes the new IDs without modification)
**Plans**: TBD
**UI hint**: yes

### Phase 10: Polish, Accessibility QA, Deploy
**Goal**: The redesigned site passes WCAG 2.2 AA contrast across the full brand palette, scores 100 on Lighthouse accessibility, holds LCP under 2.5s on the gallery page mobile, respects prefers-reduced-motion at the JS level, ships a renamed OG image that bypasses LinkedIn/Twitter/Slack cache, and goes live to production with warmed social-debugger caches
**Depends on**: Phase 9
**Requirements**: POL-08, POL-09, POL-10, POL-11, POL-12, POL-13, POL-14
**Success Criteria** (what must be TRUE):
  1. Every foreground/background pair on the redesigned site passes 4.5:1 contrast for body text and 3:1 for UI elements, and Lighthouse accessibility scores 100 on the deployed URL
  2. PageSpeed Insights mobile LCP on the gallery section measures under 2.5s on the deployed site
  3. Every motion-wrapped component verifies `prefers-reduced-motion` at the JavaScript level via `useReducedMotion`, not just CSS media queries
  4. When the new production URL is pasted into LinkedIn, the preview card shows the new v2.0 brand OG image (served from a renamed file path) and a Twitter card now renders where none did in v1.0
  5. The site is live on the production domain, `metadataBase` and JSON-LD canonical URL both match that domain, and LinkedIn Post Inspector / Twitter Card Validator / Slack unfurl all show the new preview
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 4/4 | Complete | 2026-04-03 |
| 2. Content Sections | 3/3 | Complete | 2026-04-03 |
| 3. Navigation | 1/1 | Complete | 2026-04-03 |
| 4. Polish + Launch | 2/2 | Complete | 2026-04-04 |
| 5. Design Token Foundation | 0/? | Not started | - |
| 6. Content Sections Rebuild | 0/? | Not started | - |
| 7. Case Studies | 0/? | Not started | - |
| 8. Creative Work Gallery | 0/? | Not started | - |
| 9. Navigation Rewire + Retirements | 0/? | Not started | - |
| 10. Polish, Accessibility QA, Deploy | 0/? | Not started | - |
