---
phase: 04-polish-launch
plan: 02
subsystem: infra
tags: [nextjs, vercel, build, deployment, tailwind, button-variants]

# Dependency graph
requires:
  - phase: 04-01
    provides: AnimatedSection, accessibility fixes, focus rings, skip link
provides:
  - Passing production build (exit code 0, "/" as Static)
  - button-variants.ts extracted for Server Component use
  - Fixed globals.css (removed invalid @apply border-border outline-ring/50)
  - Vercel deployment (pending checkpoint -- deployment URL TBD)
affects:
  - Any future plan that imports buttonVariants from Server Components

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "buttonVariants extracted to button-variants.ts (no 'use client') so Server Components can call cva() functions at build time without client boundary errors"

key-files:
  created:
    - harsha-portfolio/src/components/ui/button-variants.ts
  modified:
    - harsha-portfolio/src/app/globals.css
    - harsha-portfolio/src/components/ui/button.tsx
    - harsha-portfolio/src/components/sections/HeroSection.tsx
    - harsha-portfolio/src/components/sections/ContactSection.tsx

key-decisions:
  - "buttonVariants split from button.tsx into button-variants.ts -- cva() is a pure string function, safe to call from Server Components without 'use client'"
  - "Removed @apply border-border outline-ring/50 from globals.css -- this project does not define --color-border/--color-ring tokens; shadcn boilerplate not applicable here"

patterns-established:
  - "Server-safe utilities pattern: pure functions used in Server Components live in separate files without 'use client'"

requirements-completed: [POL-07, POL-04, POL-05]

# Metrics
duration: 2min
completed: 2026-04-04
---

# Phase 4 Plan 02: Production Build Validation and Vercel Deployment Summary

**Next.js 16 production build fixed and validated as fully static -- two build-time errors resolved (invalid Tailwind utility class, client/server boundary violation for buttonVariants)**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-04T02:53:37Z
- **Completed:** 2026-04-04T02:55:52Z
- **Tasks:** 1 of 2 completed (Task 2 pending human action -- Vercel deployment)
- **Files modified:** 5

## Accomplishments

- Production build passes with exit code 0 and route "/" as Static
- Extracted `buttonVariants` to a server-safe module to fix React 19 client/server boundary error
- Removed invalid `@apply border-border outline-ring/50` from globals.css (undefined Tailwind v4 utilities)
- BUILD_ID confirmed generated: `Jhc7DKJEZiiDM04z9_BWN`
- .next/static/chunks total: 804K (uncompressed)

## Task Commits

Each task was committed atomically:

1. **Task 1: Production build validation** - `fc9cb0c` (fix)

**Plan metadata:** TBD (after deployment checkpoint resolved)

## Files Created/Modified

- `harsha-portfolio/src/components/ui/button-variants.ts` - cva() buttonVariants definition, no "use client", importable from Server Components
- `harsha-portfolio/src/app/globals.css` - Removed invalid @apply line (border-border outline-ring/50)
- `harsha-portfolio/src/components/ui/button.tsx` - Now imports buttonVariants from button-variants.ts, re-exports for backward compat
- `harsha-portfolio/src/components/sections/HeroSection.tsx` - Import updated to button-variants.ts
- `harsha-portfolio/src/components/sections/ContactSection.tsx` - Import updated to button-variants.ts

## Decisions Made

- `buttonVariants` extracted to `button-variants.ts` because `cva()` is a pure function with no browser APIs or React hooks -- it computes a string from variant keys. Server Components can call pure functions freely, but cannot cross a `"use client"` boundary. Separation avoids duplicating the variant config.
- Removed `@apply border-border outline-ring/50` from globals.css: this is shadcn/ui boilerplate that assumes `--color-border` and `--color-ring` are defined, but this project uses its own custom `@theme` tokens. The line served no purpose and caused a fatal Tailwind v4 build error.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed invalid Tailwind utility class @apply border-border outline-ring/50**
- **Found during:** Task 1 (Production build validation)
- **Issue:** globals.css line 37 contained `@apply border-border outline-ring/50` -- shadcn boilerplate referencing `--color-border` and `--color-ring` which are not defined in this project's `@theme`. Tailwind v4 throws a fatal error for unknown utility classes.
- **Fix:** Removed the `* { @apply border-border outline-ring/50; }` rule from `@layer base`. Focus styles are handled by the explicit `:focus-visible` block below it.
- **Files modified:** `harsha-portfolio/src/app/globals.css`
- **Verification:** Build no longer throws CssSyntaxError
- **Committed in:** `fc9cb0c` (Task 1 commit)

**2. [Rule 1 - Bug] Extracted buttonVariants to server-safe module to fix client/server boundary error**
- **Found during:** Task 1 (Production build validation)
- **Issue:** `button.tsx` is marked `"use client"` and exports `buttonVariants`. In Next.js 16 / React 19, calling a function exported from a Client Component module from a Server Component at prerender time causes: "Attempted to call buttonVariants() from the server but buttonVariants is on the client."
- **Fix:** Created `button-variants.ts` (no `"use client"` directive) containing only the `cva()` definition. Updated `button.tsx` to import and re-export from it. Updated `HeroSection.tsx` and `ContactSection.tsx` to import directly from `button-variants.ts`.
- **Files modified:** `harsha-portfolio/src/components/ui/button-variants.ts` (created), `harsha-portfolio/src/components/ui/button.tsx`, `harsha-portfolio/src/components/sections/HeroSection.tsx`, `harsha-portfolio/src/components/sections/ContactSection.tsx`
- **Verification:** Build succeeds, static generation of "/" completes, no prerender error
- **Committed in:** `fc9cb0c` (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (2x Rule 1 - Bug)
**Impact on plan:** Both fixes required for the build to succeed. No scope creep -- globals.css cleanup removed dead code, buttonVariants split is a minimal refactor.

## Issues Encountered

- `next build` failed on first attempt with two separate errors:
  1. CssSyntaxError: unknown utility class `border-border` in globals.css
  2. Prerender error: `buttonVariants()` called from server (client boundary violation)
- Both resolved via targeted fixes with no architectural changes needed.

## User Setup Required

**Task 2 (Vercel deployment) requires human action.** See checkpoint message above.

Steps for deployment:
1. Run `cd /Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio && npx vercel --yes` in your terminal
2. Authenticate with Vercel if prompted (browser-based OAuth)
3. After deploy completes, run `npx vercel --prod` to promote to production
4. Verify the live site at the provided URL

## Known Stubs

None -- all content is wired from data layer (`src/data/*.ts`). No placeholder text or empty data sources.

## Next Phase Readiness

- Production build is clean and fully static -- ready to deploy
- All 6 sections render correctly (verified in prior phases)
- External link targets confirmed: mailto, LinkedIn URL, /resume.pdf (file exists in public/)
- Vercel deployment pending user action (Task 2 checkpoint)

---
*Phase: 04-polish-launch*
*Completed: 2026-04-04*

## Self-Check: PASSED

- FOUND: harsha-portfolio/src/components/ui/button-variants.ts
- FOUND: harsha-portfolio/src/app/globals.css
- FOUND: .planning/phases/04-polish-launch/04-02-SUMMARY.md
- FOUND: harsha-portfolio/.next (BUILD_ID: Jhc7DKJEZiiDM04z9_BWN)
- FOUND: commit fc9cb0c
