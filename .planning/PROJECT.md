# Harsha Vardhini Portfolio

## What This Is

A single-page portfolio website for Harsha Vardhini Veeravalli Prabu, a data-driven digital marketing strategist who pairs content and campaign execution with measurable results. The site positions her for full-time marketing roles by showcasing her brand, case studies, and creative body of work in a voice and visual language she designed herself.

## Core Value

A polished, professional online presence that makes hiring managers want to reach out -- clear narrative, strong credentials (University Gold Medalist, measurable marketing results), visible body of creative work, easy contact.

## Completed Milestones

- **v1.0 (2026-04-04)** -- Initial portfolio with Hero, About, Experience, Skills, Leadership, Contact on muted-neutral design system. 4 phases, 10 plans, 35 requirements. Deployed to Vercel + Fly.io.
- **v2.0 (2026-04-05)** -- Brand Redesign & Creative Portfolio. DeepBlack/Orange/Montserrat redesign + two case studies + 31-asset gallery + ValueProp section. 6 phases (5-10), ~15 commits, 46 requirements. Code-complete; Lighthouse/LCP deploy-time verification pending with user.

## Requirements

### Validated

- Hero section with name, tagline, CTAs -- Validated in Phase 2 (v1.0)
- About/Bio section with professional summary -- Validated in Phase 2 (v1.0)
- Experience section displaying work history with measurable achievements -- Validated in Phase 2 (v1.0)
- Skills and tools showcase -- Validated in Phase 2 (v1.0)
- Education credentials (UTD MS Marketing, Gold Medalist) -- Validated in Phase 2 (v1.0)
- Leadership section -- Validated in Phase 2 (v1.0)
- Contact section with email and LinkedIn links -- Validated in Phase 2 (v1.0)
- Sticky navbar with active-section highlight and mobile hamburger -- Validated in Phase 3 (v1.0)
- Smooth scroll navigation between sections -- Validated in Phase 3 (v1.0)
- Scroll-reveal animations with prefers-reduced-motion -- Validated in Phase 4 (v1.0)
- WCAG 2.2 AA color contrast on body text -- Validated in Phase 4 (v1.0)
- Responsive design (mobile, tablet, desktop) -- Validated in Phase 2 (v1.0)
- Clean minimal design with neutral base and one muted accent color -- Validated in Phase 1 (v1.0); **superseded by v2.0 brand redesign**
- SEO-optimized metadata for discoverability -- Validated in Phase 1 (v1.0)
- Live production deployment -- Validated in Phase 4 (v1.0)
- Harsha's personal brand palette (DeepBlack #0F0F0F, Orange #FF6A00/#FFA559, White #F9F9F9) in Tailwind v4 @theme -- Validated in Phase 5 (v2.0)
- Montserrat Bold display typography scoped to H1/H2 with Inter for body -- Validated in Phase 5 (v2.0)
- Accent usage audited across 23 call-sites with WCAG AA verdict per site -- Validated in Phase 5 (v2.0)
- Hero rebuilt with brief-supplied copy, 3 metric cards, View My Work CTA -- Validated in Phase 6 (v2.0)
- About rewritten with brief-supplied bio + inline credential callout -- Validated in Phase 6 (v2.0)
- "What I Bring to the Table" section on DeepBlack band with orange heading -- Validated in Phase 6 (v2.0)
- Contact section redesigned with "Let's Connect" heading -- Validated in Phase 6 (v2.0)
- Two case studies (UTD + Rio) in 5-block structure via Data-as-Prop component -- Validated in Phase 7 (v2.0)
- Creative Work gallery: 31 assets across 6 categories with accessible lightbox -- Validated in Phase 8 (v2.0)
- next/image pipeline with AVIF/WebP + mandatory sizes attribute -- Validated in Phase 8 (v2.0)
- Navbar rewired to v2.0 section lineup; v1.0 Experience/Skills/Leadership sections retired -- Validated in Phase 9 (v2.0)
- New OG image (v2) + Twitter card images added -- Validated in Phase 10 (v2.0)

### Active

(None -- v2.0 milestone complete; Lighthouse + LCP deploy-time verification pending with user)

### Out of Scope

- Blog or content publishing -- not needed for job-hunting portfolio
- Case study / project detail pages -- using resume data only for now
- CMS or admin panel -- static content, no dynamic updates needed
- Authentication or user accounts -- public-facing site only
- Analytics dashboard -- can add Google Analytics later if desired
- Multi-language support -- English only

## Context

- Harsha is pursuing MS Marketing at UT Dallas (graduating May 2026) and is eligible to work in the US for up to 36 months
- She has 4 professional experiences spanning digital marketing, social media, SEO/SEM, and e-commerce across US and India
- University Gold Medalist from University of Madras -- strong academic differentiator
- Leadership roles: Global Ambassador at UTD, President of Kotler's Quorum, Events Team Officer at UTD Project Management Club
- Target audience: Marketing hiring managers and recruiters at US companies
- Design inspiration drawn from Brittany Chiang's minimalist single-page layout, with elements from Yagmur Cetin Tas's calm professionalism
- Content source: resume data only (no external case studies or portfolio pieces at this time)

## Constraints

- **Tech stack**: Next.js 16 + React 19 + TypeScript + Tailwind v4 + shadcn/ui + motion/react + @base-ui/react (lightbox)
- **Design system (v2.0)**: Harsha's personal brand -- DeepBlack #0F0F0F, Orange #FF6A00 / #FFA559, White #F9F9F9; Montserrat Bold for H1/H2, Inter for body; WCAG 2.2 AA compliant
- **Layout**: Single scrollable page -- Hero -> About -> UTD case study -> Rio case study -> Gallery -> ValueProp -> Contact
- **Content**: Resume + brief-supplied copy; 31 real design assets + 2 case study narratives
- **Accessibility**: WCAG 2.2 AA body text contrast; 3:1 UI contrast; orange text only on DeepBlack surfaces or ≥24px display; prefers-reduced-motion at JS level

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-page layout | Simpler for recruiters to scan, matches Brittany Chiang-style inspiration | Validated v1.0 |
| React/Next.js | Modern stack, easy to extend with blog/projects later if needed | Validated v1.0 |
| Resume data only (v1.0) | No case studies available yet, avoids placeholder content | **Superseded v2.0** -- brief now supplies two case studies |
| Inter font family (v1.0) | Clean sans-serif, widely supported, matches minimal aesthetic | **Superseded v2.0** -- Montserrat Bold for display, Inter for body |
| Muted neutral aesthetic (v1.0) | Clean, professional, hiring-manager-friendly | **Superseded v2.0** -- Harsha's personal brand (DeepBlack + Orange) better reflects her designer identity |
| Adopt Harsha's brand palette (v2.0) | Design assets themselves are the strongest positioning signal; site should speak in her visual voice | -- Pending |
| Case study 5-block structure (v2.0) | Description / Context / What I Did / Execution / Results matches brief and gives recruiters a scannable repeat pattern | -- Pending |
| Category-grouped asset gallery (v2.0) | Brief explicitly requests zip folder grouping with asset titles | -- Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check -- still the right priority?
3. Audit Out of Scope -- reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-05 -- milestone v2.0 complete (Brand Redesign & Creative Portfolio)*
