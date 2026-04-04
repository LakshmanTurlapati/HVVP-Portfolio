---
phase: 02-content-sections
plan: 02
subsystem: ui
tags: [react, nextjs, tailwind, server-component, timeline, pills]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: types/index.ts (ExperienceEntry, SkillsData), data/experience.ts, data/skills.ts, globals.css design tokens
provides:
  - ExperienceSection.tsx: vertical timeline layout with BoldNumbers helper, 4 professional roles
  - SkillsSection.tsx: grouped skill pills (Marketing & Analytics, Tools & Platforms) plus left-border certifications
affects:
  - 02-03 (wiring plan that imports and mounts both sections into page.tsx)
  - 03-navigation (navbar active-section logic reads section IDs -- experience and skills are now locked)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - BoldNumbers inline helper: regex split /(\d+(?:\.\d+)?%?)/g wraps numeric tokens in <strong> inside bullet strings, defined in same file as consumer
    - Alternating section backgrounds: Experience bg-background, Skills bg-card, established pattern for all content sections
    - Certification left-border treatment: long-sentence credentials use border-l-2 border-accent instead of pill chips

key-files:
  created:
    - harsha-portfolio/src/components/sections/ExperienceSection.tsx
    - harsha-portfolio/src/components/sections/SkillsSection.tsx
  modified: []

key-decisions:
  - "BoldNumbers defined inline in ExperienceSection.tsx (not a separate file) -- it is a ~10-line helper used only in that file; a shared file would add import clutter without benefit"
  - "Certifications rendered as left-border accent items (border-l-2 border-accent), not pill chips -- certification names are 50+ character sentences that overflow pill constraints"
  - "Used HTML entity &ndash; and &middot; in JSX rather than the Unicode characters for clarity in source code"

patterns-established:
  - "BoldNumbers pattern: inline regex helper that splits bullet strings on numeric tokens and wraps each match in <strong> -- reuse pattern if other sections need number bolding"
  - "Section structure: <section id={locked-id} aria-label className=py-20 bg-{token}> / max-w-4xl container / h2 heading / w-12 accent underline bar"
  - "Timeline layout: relative pl-8 container with absolute left-0 vertical line and absolute -left-[1.85rem] accent dot per entry -- border-background on dot punches through the line visually"

requirements-completed: [EXP-01, EXP-02, EXP-03, SKILL-01, SKILL-02, SKILL-03]

# Metrics
duration: 8min
completed: 2026-04-03
---

# Phase 2 Plan 02: ExperienceSection and SkillsSection Summary

**Vertical timeline with BoldNumbers number-bolding helper for 4 roles, plus grouped skill pills and left-border certifications -- both Server Components, no use client**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-03T00:00:00Z
- **Completed:** 2026-04-03T00:08:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- ExperienceSection renders all 4 professional roles in a vertical CSS timeline (absolute left line + accent dot per entry)
- BoldNumbers helper splits bullet strings on /(\d+(?:\.\d+)?%?)/g and wraps numeric tokens in `<strong>` -- numbers like 7%, 40%, 25%, 5%, 20% are visually bolded for recruiter scanning
- SkillsSection renders 10 Marketing & Analytics pills, 8 Tools & Platforms pills, and 2 certifications using a distinct left-border accent treatment
- Both components are pure Server Components with no use client, correct section IDs (experience, skills), and correct alternating backgrounds (bg-background, bg-card)

## Task Commits

Each task was committed atomically:

1. **Task 1: ExperienceSection with BoldNumbers helper** - `20f8610` (feat)
2. **Task 2: SkillsSection with grouped pills and certifications** - `f035413` (feat)

## Files Created/Modified

- `harsha-portfolio/src/components/sections/ExperienceSection.tsx` (71 lines) - Vertical timeline Server Component with BoldNumbers helper and 4 role entries
- `harsha-portfolio/src/components/sections/SkillsSection.tsx` (75 lines) - Skills Server Component with pill groups and left-border certification items

## Decisions Made

- BoldNumbers defined inline in ExperienceSection.tsx -- a 10-line helper used only in that file does not warrant a shared module
- Certifications use left-border accent treatment instead of pills -- the certification names are 50+ character full sentences that cannot wrap gracefully inside pill constraints
- Used HTML entities (&ndash;, &middot;) in JSX for the bullet dash separator and date separator for source code readability

## Deviations from Plan

None - plan executed exactly as written. All acceptance criteria verified, TypeScript passes cleanly with no errors.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Both components are ready for wiring into page.tsx in Plan 02-03
- Section IDs (experience, skills) are locked and match the locked list in STATE.md
- Plan 03 Navbar active-section logic can reference these IDs safely
- No blockers or concerns

---
*Phase: 02-content-sections*
*Completed: 2026-04-03*
