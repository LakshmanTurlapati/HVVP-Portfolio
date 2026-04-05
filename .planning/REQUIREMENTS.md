# Requirements: Harsha Vardhini Portfolio

**Defined:** 2026-04-03 (v1.0), 2026-04-04 (v2.0)
**Core Value:** A polished, professional online presence that makes hiring managers want to reach out

## v2.0 Requirements -- Brand Redesign & Creative Portfolio

Requirements for the v2.0 milestone. Each maps to roadmap phases during roadmap creation.

### Brand System

- [ ] **BRAND-01**: Tailwind v4 @theme palette migrated to DeepBlack #0F0F0F, Orange #FF6A00, Orange-soft #FFA559, White #F9F9F9 (OKLCH values)
- [ ] **BRAND-02**: Montserrat Bold loaded via next/font/google as second font variable (`--font-montserrat` / `--font-display`) alongside existing Inter
- [ ] **BRAND-03**: shadcn token set expanded to full spec (card, border, input, ring, accent-foreground) to prevent silent regressions after palette swap
- [ ] **BRAND-04**: Orange usage restricted to DeepBlack surfaces or large display/UI elements (>=24px text or non-text UI) -- never body paragraphs or white-on-orange buttons
- [ ] **BRAND-05**: Skip-link rewritten from `focus:bg-accent focus:text-white` to `focus:bg-foreground focus:text-background` to preserve WCAG 2.2 AA
- [ ] **BRAND-06**: All 27 existing accent-prefixed class usages (9 files) audited call-site-by-call-site with contrast verification before token swap
- [ ] **BRAND-07**: Montserrat loaded as variable font OR minimal static subset (['700','800']), scoped to H1/H2 only so hierarchy is preserved

### Hero (Rebuilt)

- [ ] **HERO-06**: Main heading displays brief copy verbatim -- "Data-Driven Marketing Strategist | Content & Campaigns That Convert"
- [ ] **HERO-07**: Subheading displays brief copy verbatim about designing and executing high-performing digital marketing campaigns
- [ ] **HERO-08**: Hero shows 3 highlight metric cards/badges (down from 5 in v1.0), including "Increased engagement by 7% at UTD International Center"
- [ ] **HERO-09**: Primary CTA reads "View My Work" and anchors to gallery section
- [ ] **HERO-10**: Hero heading uses Montserrat Bold, applied to H1 only

### About Me (Rebuilt)

- [ ] **ABOUT-03**: About Me copy replaced with brief-supplied text verbatim (data-driven marketing professional, UTD MS Marketing, digital marketing / content strategy / campaign optimization specialization)
- [ ] **ABOUT-04**: Education credentials (UTD MS Marketing, Gold Medalist) remain integrated into About section

### Case Study 1 -- UTD International Center Campaign

- [ ] **CASE-01**: UTD International Center case study rendered with 5-block structure (Project Description / Context & Challenge / What I Did / Execution Details / Results & Impact) using brief copy verbatim
- [ ] **CASE-02**: Case study Results block visually emphasizes the 7% engagement lift as a quantified outcome
- [ ] **CASE-03**: Section ID is `case-study-utd` for deep linking and navbar anchor

### Case Study 2 -- Rio Jiu Jitsu Marketing Strategy

- [ ] **CASE-04**: Rio Jiu Jitsu case study rendered with identical 5-block structure (Project Description / Context & Challenge / What I Did / Execution Details / Results & Impact) using brief copy verbatim
- [ ] **CASE-05**: Case study Results block visually emphasizes the 5% engagement lift as a quantified outcome
- [ ] **CASE-06**: Section ID is `case-study-rio` for deep linking and navbar anchor

### Case Study Component (shared)

- [ ] **CASE-07**: Both case studies render from a single reusable `CaseStudySection` component using Data-as-Prop pattern (one component + two data inputs)

### Creative Work Gallery

- [ ] **GAL-01**: Gallery section intro displays brief copy verbatim introducing design work across social media campaigns, event promotions, and digital marketing assets
- [ ] **GAL-02**: Gallery renders 31 design assets grouped into 6 categories matching zip folder structure (Instagram Posts, LinkedIn Posts, LinkedIn Ads, LinkedIn Events, Digital Signage, Printables)
- [ ] **GAL-03**: Each asset displays a curated title derived from the original filename (human-readable, not raw slug)
- [ ] **GAL-04**: Closing line below gallery reads "These are a few designs out of the 30+ marketing assets I've created and posted across social media, events, and digital campaigns" (brief copy)
- [ ] **GAL-05**: Each asset opens in an accessible lightbox/dialog on click with keyboard nav (ESC to close, arrow keys, focus return to trigger)
- [ ] **GAL-06**: Gallery uses `next/image` with AVIF/WebP conversion and mandatory `sizes` attribute on every image
- [ ] **GAL-07**: Each category section uses an `aspect-ratio` container matching asset dimensions (1:1 Instagram, 1.91:1 LinkedIn, 16:9 signage) to prevent CLS
- [ ] **GAL-08**: PDF printables display as PNG preview thumbnails with a "PDF" badge; lightbox view opens the PDF in a new tab
- [ ] **GAL-09**: Gallery first-paint payload under 500KB on mobile (below-the-fold items lazy-loaded)
- [ ] **GAL-10**: Gallery tile captions pass WCAG 2.2 AA contrast (4.5:1)

### What I Bring to the Table

- [ ] **VAL-01**: Section uses brief-supplied opener verbatim ("I bring a strong combination of analytical thinking and creative execution to marketing")
- [ ] **VAL-02**: Bullet list displays "Ability to make data-driven decisions using campaign performance metrics" and other brief-supplied items
- [ ] **VAL-03**: Section heading uses Montserrat display typography per new brand system

### Contact (Redesigned)

- [ ] **CONT-04**: Contact section heading reads "Let's Connect" (brief copy)
- [ ] **CONT-05**: Email and LinkedIn links remain visible and clickable under new brand styling

### Navigation (Rewired)

- [ ] **NAV-05**: Navbar anchor links updated to match new section lineup (Hero, About, Case Studies, Work/Gallery, Approach/Value, Contact)
- [ ] **NAV-06**: Retired v1.0 section IDs (experience, skills, leadership) removed from NAV_LINKS array and Navbar
- [ ] **NAV-07**: Desktop navbar labels stay short enough to fit without overflow at all supported breakpoints

### Polish + Launch

- [ ] **POL-08**: WCAG 2.2 AA contrast re-verified across full site after palette migration (4.5:1 body text, 3:1 UI)
- [ ] **POL-09**: Lighthouse accessibility score remains 100 after redesign
- [ ] **POL-10**: Lighthouse LCP under 2.5s on gallery page mobile
- [ ] **POL-11**: `prefers-reduced-motion` verified at JS level via `useReducedMotion` in motion components
- [ ] **POL-12**: OG image regenerated with new brand, renamed (e.g., `og-image-v2.png`), `openGraph.images` updated; LinkedIn Post Inspector cache warmed post-deploy
- [ ] **POL-13**: Twitter card metadata added (currently missing from v1.0)
- [ ] **POL-14**: `metadataBase` and JSON-LD canonical URL verified against production domain

## v1 Requirements (Completed -- 2026-04-04)

All 35 v1.0 requirements validated. See ROADMAP.md phases 1-4 for phase mapping.

### Hero

- [x] **HERO-01**: Page displays Harsha's full name prominently as the primary heading
- [x] **HERO-02**: Tagline communicates specialization
- [x] **HERO-03**: CTA buttons link to contact section and downloadable resume PDF
- [x] **HERO-04**: Availability statement visible
- [x] **HERO-05**: 3-5 headline metrics displayed prominently

### About

- [x] **ABOUT-01**: Professional summary paragraph
- [x] **ABOUT-02**: Education credentials featured (UTD MS Marketing, University Gold Medalist)

### Experience

- [x] **EXP-01**: All 4 professional roles displayed
- [x] **EXP-02**: Each role includes 3-4 achievement bullets with quantified metrics
- [x] **EXP-03**: Experience entries are visually structured as cards or timeline

### Skills

- [x] **SKILL-01**: Marketing and analytics skills displayed by category
- [x] **SKILL-02**: Tools and platforms showcased
- [x] **SKILL-03**: Certifications listed

### Leadership

- [x] **LEAD-01**: Leadership roles displayed
- [x] **LEAD-02**: Each role includes organization, title, dates, and key achievement
- [x] **LEAD-03**: IYEP delegation noted

### Contact

- [x] **CONT-01**: Email address displayed and linked (mailto)
- [x] **CONT-02**: LinkedIn profile linked prominently
- [x] **CONT-03**: Phone number accessible or omitted by choice

### Navigation

- [x] **NAV-01**: Sticky top navigation bar with links to all sections
- [x] **NAV-02**: Active section highlighted in nav while scrolling
- [x] **NAV-03**: Mobile hamburger menu
- [x] **NAV-04**: Smooth scroll animation when clicking nav links

### Design

- [x] **DES-01**: Clean minimal layout with neutral base (superseded by v2.0 BRAND-01)
- [x] **DES-02**: One muted accent color (superseded by v2.0 BRAND-01)
- [x] **DES-03**: Inter font family loaded via next/font/google
- [x] **DES-04**: Grid-based layout with consistent spacing
- [x] **DES-05**: Responsive design

### Polish

- [x] **POL-01**: Subtle fade-in scroll animations using Motion
- [x] **POL-02**: SEO meta tags set
- [x] **POL-03**: JSON-LD Person schema
- [x] **POL-04**: WCAG 2.2 AA color contrast
- [x] **POL-05**: Keyboard accessibility
- [x] **POL-06**: Semantic HTML structure
- [x] **POL-07**: LCP under 2.5s

## Future Requirements (Deferred)

Tracked but not in current milestone.

### Enhanced Content

- **ENH-01**: Professional headshot / photo in hero or about section
- **ENH-02**: Certifications badges section with credential logos and verification links
- **ENH-03**: Social proof / testimonials from managers or colleagues

### Additional Polish

- **APOL-01**: Print-friendly stylesheet
- **APOL-02**: Canonical URL and auto-generated sitemap.xml
- **APOL-03**: Google Analytics (GA4) integration via next/script

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Blog / content publishing | No content strategy exists; LinkedIn serves as thought leadership channel |
| Dedicated case study detail pages | 2 case studies do not justify route-based depth; inline sections are the standard for single-page portfolios |
| Gallery search / filter UI | 31 items on a single page do not need filter state; category sections already do this work |
| Dark/light mode toggle | DeepBlack + Orange IS the brand identity; dual mode would dilute it |
| Asset download buttons on gallery | Client IP concerns; viewing is sufficient |
| CMS or admin panel | Static content, 2 case studies will not change weekly |
| Multi-language support | English only, US market |
| Social media feed embeds | Layout instability, performance drag |
| AI chatbot | Infrastructure overhead, gimmicky |
| Video autoplay | Jarring in office settings, hurts LCP |
| Contact form | User prefers links only (email + LinkedIn) |
| Gallery carousel/swipe across all 31 | Click-to-enlarge with ESC to close is sufficient for first ship |

## Traceability

Which phases cover which requirements. Filled during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| BRAND-01..07 | TBD | Pending |
| HERO-06..10 | TBD | Pending |
| ABOUT-03..04 | TBD | Pending |
| CASE-01..07 | TBD | Pending |
| GAL-01..10 | TBD | Pending |
| VAL-01..03 | TBD | Pending |
| CONT-04..05 | TBD | Pending |
| NAV-05..07 | TBD | Pending |
| POL-08..14 | TBD | Pending |

**Coverage:**
- v2.0 requirements: 47 total
- Mapped to phases: 0 (roadmap pending)
- Unmapped: 47 (to be filled during roadmap creation)

---
*Requirements defined: 2026-04-03 (v1.0), 2026-04-04 (v2.0)*
*Last updated: 2026-04-04 -- v2.0 requirements drafted from brief + research*
