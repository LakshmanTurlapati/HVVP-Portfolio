# Phase 4: Polish + Launch - Context

**Gathered:** 2026-04-04
**Status:** Ready for planning
**Mode:** Auto-generated (final polish phase)

<domain>
## Phase Boundary

The site is visually refined with subtle scroll-reveal animations, passes WCAG 2.2 AA accessibility checks and a Lighthouse performance score above 90, and is live on Vercel and shareable with recruiters.

</domain>

<decisions>
## Implementation Decisions

### Scroll Animations
- Use Motion library (motion/react) for fade-in-up animations on section entry
- Animations trigger via whileInView prop with IntersectionObserver
- Must respect prefers-reduced-motion: suppress animations when active
- Keep animations subtle -- entrance only (opacity + translateY), no parallax or scroll-jacking
- Animations should not delay content visibility (no blocking)

### Accessibility
- WCAG 2.2 AA compliance: 4.5:1 contrast ratio for all body text
- All interactive elements (nav links, CTAs, hamburger) keyboard-reachable and operable
- Semantic HTML already in place from Phase 1 (landmarks, heading hierarchy)
- Focus indicators visible on all interactive elements
- aria-labels already on hamburger menu from Phase 3

### Performance
- Target LCP under 2.5s on desktop and mobile
- Optimize images with next/image if needed (OG image is already optimized)
- Minimize JS bundle -- Motion is the only animation library
- Static generation (no SSR/API routes)

### Deployment
- Deploy to Vercel free tier
- Verify all links work in production (email, LinkedIn, resume PDF)
- No custom domain needed yet (Vercel default URL is fine for now)

### Claude's Discretion
- Exact animation timing/easing values
- Whether to wrap each section or use a reusable AnimatedSection wrapper
- Specific Lighthouse optimization techniques if score is below target
- Whether to add skip-to-content link for accessibility

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- motion@12.38.0 already installed (Phase 1)
- All 6 section components are Server Components -- animation wrapper needs "use client"
- globals.css has scroll-behavior: smooth and all design tokens
- Navbar already handles keyboard navigation and ARIA

### Established Patterns
- Only Navbar.tsx and useActiveSection.ts are Client Components
- Animation wrapper will be a new Client Component
- Design tokens available as Tailwind utilities

### Integration Points
- Each section component in page.tsx can be wrapped with animation component
- prefers-reduced-motion can be detected via CSS media query or useReducedMotion hook

</code_context>

<specifics>
## Specific Ideas

No specific requirements beyond ROADMAP phase description and success criteria.

</specifics>

<deferred>
## Deferred Ideas

- Custom domain setup (user decides later)
- Google Analytics integration (v2)
- Professional OG image replacement (v2)
- Print stylesheet (v2)

</deferred>
