# Milestones

Ship history for Harsha Vardhini Portfolio.

## v2.0 -- Brand Redesign & Creative Portfolio (2026-04-05)

**Goal:** Reposition from "data-driven marketer with numbers" to "strategist + creator with a visible body of work."

**Delivered:**
- v2.0 brand palette (DeepBlack + Orange + White) + Montserrat Bold display typography in Tailwind v4 @theme
- Two marketing case studies (UTD International Center Campaign + Rio Jiu Jitsu) in 5-block structure via reusable Data-as-Prop component
- Creative Work gallery showcasing 31 real design assets across 6 categories with accessible lightbox (ESC + arrow keys + focus return)
- "What I Bring to the Table" section on DeepBlack band surface
- Rebuilt Hero with brief-supplied copy + 3 metric cards + "View My Work" CTA
- Redesigned About Me with brief-supplied bio + inline credential callout
- Redesigned Contact with "Let's Connect" heading
- New navbar lineup (7 items) + retired v1.0 Experience/Skills/Leadership sections
- New OG image + Twitter card images + updated metadata copy

**Phases:** 5 Design Token Foundation -> 6 Content Sections Rebuild -> 7 Case Studies -> 8 Creative Work Gallery -> 9 Navigation Rewire + Retirements -> 10 Polish, Accessibility QA, Deploy

**Requirements:** 46 addressed (3 deploy-time verifications pending with user: Lighthouse, LCP, domain match)

**Zero new production dependencies** (used @base-ui/react 1.3.0 already installed for lightbox)

**Archive:** `.planning/milestones/v2.0-*`

---

## v1.0 -- Initial Portfolio (2026-04-04)

**Goal:** Ship a polished, recruiter-ready single-page portfolio positioning Harsha for full-time marketing roles.

**Delivered:**
- Hero, About, Experience, Skills, Leadership, Contact sections with resume-sourced content
- Sticky navbar with active-section highlight + mobile hamburger
- Scroll-reveal animations with prefers-reduced-motion
- WCAG 2.2 AA color contrast + keyboard accessibility
- SEO metadata + JSON-LD Person schema + OG image
- Deployed to Vercel + Fly.io

**Phases:** 1 Foundation -> 2 Content Sections -> 3 Navigation -> 4 Polish + Launch

**Requirements:** 35 v1.0 requirements, all validated
