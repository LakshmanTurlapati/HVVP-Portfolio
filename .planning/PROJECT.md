# Harsha Vardhini Portfolio

## What This Is

A single-page portfolio website for Harsha Vardhini Veeravalli Prabu, a data-driven digital marketing strategist who pairs content and campaign execution with measurable results. The site positions her for full-time marketing roles by showcasing her brand, case studies, and creative body of work in a voice and visual language she designed herself.

## Core Value

A polished, professional online presence that makes hiring managers want to reach out -- clear narrative, strong credentials (University Gold Medalist, measurable marketing results), visible body of creative work, easy contact.

## Current Milestone: v2.0 Brand Redesign & Creative Portfolio

**Goal:** Revamp the portfolio's visual identity around Harsha's own design language (DeepBlack + Orange + Montserrat), add two marketing case studies, and showcase 31 real design assets -- repositioning her from "data-driven marketer with numbers" to "strategist + creator with a visible body of work."

**Target features:**
- New design system (DeepBlack #0F0F0F, Orange #FF6A00 / #FFA559, White #F9F9F9, Montserrat Bold headings)
- Rebuilt Hero with new copy and 3 metric cards
- Rewritten About Me using brief-supplied copy verbatim
- Case Study 1: UTD International Center Campaign (5-block structure)
- Case Study 2: Rio Jiu Jitsu Marketing Strategy (5-block structure)
- Creative Work gallery: 31 assets across 6 categories with titles
- "What I Bring to the Table" skills block (brief copy)
- Redesigned Contact section ("Let's Connect")

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

### Active

- [ ] Adopt Harsha's personal brand palette (DeepBlack, Orange, White) across the site
- [ ] Adopt Montserrat Bold for display typography while keeping Inter for body
- [ ] Rebuild Hero with brief-supplied copy, metric cards, and primary CTA
- [ ] Rewrite About Me with brief-supplied copy
- [ ] Add two case study sections with 5-block structure (Description / Context / What I Did / Execution / Results)
- [ ] Add Creative Work gallery displaying 31 assets grouped by 6 categories with titles
- [ ] Add "What I Bring to the Table" section
- [ ] Redesign Contact section with "Let's Connect" heading

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

- **Tech stack**: React/Next.js -- modern, extensible, good for future enhancements
- **Design system**: Clean minimal aesthetic -- white/off-white/light gray base, dark text, one muted accent color (muted blue, soft green, or warm beige), sans-serif typography (Inter preferred)
- **Layout**: Single scrollable page with section-based navigation, grid layout with consistent spacing
- **Content**: Resume-sourced data only -- no placeholder or fabricated content
- **Accessibility**: Must be navigable and readable on all common devices and screen sizes

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
*Last updated: 2026-04-04 -- milestone v2.0 kickoff (Brand Redesign & Creative Portfolio)*
