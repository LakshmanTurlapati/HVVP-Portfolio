# Plan 05-01 Summary -- @theme Migration + Montserrat

**Completed:** 2026-04-04
**Commit:** 0a936cb

## What Shipped

- `globals.css` `@theme` block rewritten with v2.0 brand palette (DeepBlack, Orange, Orange-soft, White) using STACK.md's precise OKLCH values
- Full shadcn token set expanded: `--color-card`, `--color-card-foreground`, `--color-border`, `--color-input`, `--color-ring`, `--color-accent-foreground`
- `--font-display` token registered, referencing `--font-montserrat`
- `@layer base` scopes Montserrat to `h1, h2` only (Pitfall 7 avoided)
- `layout.tsx` imports Montserrat via `next/font/google` as variable font (no weight key -> single `.woff2`, Pitfall 4 avoided)
- `<html>` exposes both `inter.variable` + `montserrat.variable`
- `@import "tw-animate-css"` + `@import "shadcn/tailwind.css"` preserved (Pitfall 11 avoided)
- `--color-muted-foreground` darkened from 0.45 to 0.35 OKLCH for 4.5:1 on off-white

## OKLCH Values Committed

| Token | OKLCH | Hex |
|-------|-------|-----|
| `--color-brand-black` | `oklch(0.1684 0 0)` | #0F0F0F |
| `--color-brand-orange` | `oklch(0.7009 0.2012 44.77)` | #FF6A00 |
| `--color-brand-orange-soft` | `oklch(0.7976 0.1404 58.86)` | #FFA559 |
| `--color-brand-white` | `oklch(0.9821 0 0)` | #F9F9F9 |

No deviations from STACK.md computed values.

## Verification

- TypeScript check: PASS (exit 0)
- 10 new tokens present in globals.css (verified via grep)
- `tw-animate-css` import preserved
- `font-display` scoped correctly (no body/html/* application)
- Dev server visual verification deferred to user (per global preference: never auto-run apps)

## Requirements Validated

- BRAND-01: palette migrated to DeepBlack/Orange/White OKLCH
- BRAND-02: Montserrat via next/font/google as `--font-montserrat`
- BRAND-03: shadcn token set expanded (card, border, input, ring, accent-foreground)
- BRAND-07: Montserrat as variable font, scoped to H1/H2 only

## Next Plan

Plan 05-02 (wave 2) -- accent audit doc + skip-link rewrite + button label contrast fixes.
