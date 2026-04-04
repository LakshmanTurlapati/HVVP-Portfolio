# Phase 3: Navigation - Context

**Gathered:** 2026-04-04
**Status:** Ready for planning
**Mode:** Auto-generated (focused phase -- decisions locked from research)

<domain>
## Phase Boundary

Sticky top navigation bar with anchor links to all 6 sections, active section highlighting via IntersectionObserver, mobile hamburger menu, and smooth scroll animation on click.

</domain>

<decisions>
## Implementation Decisions

### Navigation Architecture
- Navbar is a Client Component ("use client") -- the ONLY one in the project
- Uses plain <a href="#section"> anchors, NOT next/link (per STATE.md locked decision)
- CSS scroll-behavior: smooth already set in globals.css
- IntersectionObserver via useActiveSection custom hook for active section highlighting
- Section IDs locked from Phase 1: hero, about, experience, skills, leadership, contact

### Visual Design
- Sticky/fixed top position with backdrop blur
- Nav links highlight active section with accent color underline or text color
- Mobile: hamburger icon that toggles a dropdown/slide menu
- Mobile menu closes on link click and on outside click
- Desktop: horizontal link list

### Claude's Discretion
- Exact hamburger icon choice (Lucide Menu/X icons recommended)
- Transition/animation details for mobile menu open/close
- Exact IntersectionObserver threshold and rootMargin values
- Whether to show/hide nav on scroll direction (optional, not required)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- harsha-portfolio/src/components/layout/Navbar.tsx -- current stub returns null, replace entirely
- harsha-portfolio/src/lib/utils.ts -- cn() utility for conditional classes
- globals.css @theme tokens -- accent, background, foreground colors available

### Established Patterns
- All other components are Server Components
- Layout already has <header><Navbar /></header> wrapper
- Design tokens in Tailwind v4 @theme block

### Integration Points
- layout.tsx already imports and renders Navbar in <header>
- Section IDs in page.tsx: hero, about, experience, skills, leadership, contact

</code_context>

<specifics>
## Specific Ideas

No specific requirements beyond ROADMAP phase description and success criteria.

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope.

</deferred>
