# Phase 5: Design Token Foundation - Context

**Gathered:** 2026-04-04
**Status:** Ready for planning
**Mode:** Smart discuss (4 grey areas, all recommendations accepted)

<domain>
## Phase Boundary

Establish Harsha's personal brand palette (DeepBlack #0F0F0F, Orange #FF6A00, Orange-soft #FFA559, White #F9F9F9) and Montserrat Bold display typography in the Tailwind v4 `@theme` block with every existing accent usage audited and contrast-verified. This is the hard dependency blocker: every downstream v2.0 section consumes these tokens, so shipping sections under old tokens means re-styling everything twice. Deliverable is a stable, WCAG-compliant token foundation plus an accent-usage audit document.

In scope: palette OKLCH values, Montserrat font loading, shadcn token expansion, skip-link rewrite, accent-usage audit.

Out of scope: rebuilding Hero/About/Contact (Phase 6), case studies (Phase 7), gallery (Phase 8), navbar rewire (Phase 9), full axe-core audit + CI contrast script (Phase 10).

</domain>

<decisions>
## Implementation Decisions

### Token Application Strategy
- Produce accent-usage audit doc at `05-01-ACCENT-AUDIT.md` listing each call-site, its new contrast, and verdict; rewrite all failing usages
- Keep `--color-accent` token name (minimizes diff, preserves shadcn alignment)
- Split accent into `--color-accent` (orange fill) + `--color-accent-foreground` (DeepBlack text) -- enforces the only safe combo
- Rewrite skip-link from `focus:bg-accent focus:text-white` to `focus:bg-foreground focus:text-background` (DeepBlack bg, White text)

### Montserrat Loading
- Variable font (single `.woff2`, fewer bytes, future-proof)
- Scope Montserrat to H1 + H2 only to preserve hierarchy and avoid font fatigue
- CSS variable name `--font-display` (semantic, decouples from specific font name)
- Keep Inter as body font (no body reflow)

### Palette Values & Orange Usage
- Use authoritative hex-to-OKLCH converter to commit exact values (target STACK's `oklch(0.7009 0.2012 44.77)` for #FF6A00; reconcile before writing @theme)
- Button fills: Orange #FF6A00 background + DeepBlack #0F0F0F text (6.68:1 PASS); never white-on-orange
- Focus ring: Orange #FF6A00 (passes 3:1 UI threshold on DeepBlack surfaces)
- Base surface mode: hybrid -- off-white #F9F9F9 body background with DeepBlack band-surfaces available for hero/case-study/gallery sections where orange text is needed

### Verification Approach
- Audit method: markdown audit log (`05-01-ACCENT-AUDIT.md`) with table columns file, line, class, surface color, text color, new contrast, verdict
- Defer automated contrast script to Phase 10 -- Phase 5 only needs the audit doc
- Defer axe-core full run to Phase 10 -- Phase 5 visual walkthrough suffices
- Two commits: (1) @theme + Montserrat + shadcn token expansion, (2) accent audit + skip-link rewrite

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `harsha-portfolio/src/app/globals.css` already uses Tailwind v4 `@theme` block with muted-neutral palette -- directly replaceable
- `harsha-portfolio/src/app/layout.tsx` already loads Inter via `next/font/google` with `--font-inter` variable -- Montserrat slot identical pattern
- `harsha-portfolio/src/components/sections/*Section.tsx` (6 components) all use accent-prefixed utility classes -- will be rewritten in Phase 6 after token migration
- `harsha-portfolio/src/app/layout.tsx` skip-link at line ~92 uses `focus:bg-accent focus:text-white` -- must be rewritten this phase
- `harsha-portfolio/components.json` has shadcn baseColor="neutral" -- unchanged, tokens layer on top

### Established Patterns
- Data flow: `src/types/*.ts` -> `src/data/*.ts` -> `src/components/sections/*Section.tsx` (server components)
- Font pattern: `next/font/google` import in layout.tsx, expose as CSS variable on `<html className>`
- Design tokens: Tailwind v4 @theme block consumed via utility classes (no `tailwind.config.ts`)
- Animation: motion/react via `AnimatedSection` wrapper (client island)

### Integration Points
- `src/app/globals.css` -- @theme block (palette swap + font CSS var registration)
- `src/app/layout.tsx` -- Montserrat import, html className font variables, skip-link rewrite
- Every file in `src/components/` and `src/app/` using `bg-accent`, `text-accent`, `border-accent`, etc. -- 27 usages across 9 files per grep audit
- No `tailwind.config.ts` file (v4 CSS-first mode)

</code_context>

<specifics>
## Specific Ideas

- Color contrast from research: #FF6A00 on #0F0F0F = 6.68:1 PASS, #FF6A00 on #F9F9F9 = 2.73:1 FAIL, #FFFFFF on #FF6A00 = 2.87:1 FAIL
- Montserrat weight '700' is the primary display weight per brief (Montserrat Bold)
- OKLCH values to reconcile:
  - STACK: DeepBlack `oklch(0.1684 0 0)`, Orange `oklch(0.7009 0.2012 44.77)`, Orange-soft `oklch(0.7976 0.1404 58.86)`, White `oklch(0.9821 0 0)`
  - ARCHITECTURE: DeepBlack `oklch(0.15 0 0)`, Orange `oklch(0.68 0.21 40)`, Orange-soft `oklch(0.79 0.14 55)`, White `oklch(0.98 0 0)`
  - Resolution: use authoritative converter, prefer STACK's more-precise values
- shadcn tokens that must be expanded (currently missing from @theme): `--color-card`, `--color-border`, `--color-input`, `--color-ring`, `--color-accent-foreground`
- Previously noted in v1.0 Phase 4: muted-foreground was updated from oklch(0.50) to oklch(0.45) for 4.5:1 contrast on card bg -- verify new value under v2.0 palette

</specifics>

<deferred>
## Deferred Ideas

- Automated contrast-check CI script -- Phase 10
- Full axe-core audit across all sections -- Phase 10
- Dark mode toggle -- explicitly out of scope (brand IS the palette)
- Token-level theme playground / Storybook -- out of scope for this milestone

</deferred>
