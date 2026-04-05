# Accent Usage Audit -- Phase 5 BRAND-06

**Date:** 2026-04-04
**Context:** After Plan 05-01, `--color-accent` maps to Orange #FF6A00 (OKLCH 0.7009 0.2012 44.77). All accent-prefixed utility classes now render in brand orange.

## Contrast Reference

| Combination | Ratio | Body Text (4.5:1) | UI / Large (3:1) |
|-------------|-------|-------------------|------------------|
| #FF6A00 on #F9F9F9 (off-white bg) | 2.73:1 | FAIL | FAIL |
| #FFFFFF on #FF6A00 (white on orange) | 2.87:1 | FAIL | FAIL |
| #0F0F0F on #FF6A00 (DeepBlack on orange) | 6.68:1 | PASS | PASS |
| #FF6A00 on #0F0F0F (orange on DeepBlack) | 6.68:1 | PASS | PASS |
| #0F0F0F on #F9F9F9 (DeepBlack on off-white) | 19:1 | PASS | PASS |

## Rule (BRAND-04)

- Orange text **only** on DeepBlack surfaces, OR
- Orange as non-text UI (borders, fills, underlines, dividers), OR
- Orange as large display headings (>=24px)
- **Never** orange paragraph text on white/off-white
- **Never** white-on-orange button labels

## Findings -- 23 call-sites across 9 files

### Persistent (layout.tsx) -- MUST REWRITE

| # | File:Line | Class | Surface | Text | Verdict | Action |
|---|-----------|-------|---------|------|---------|--------|
| 1 | layout.tsx:98 | `focus:bg-accent focus:text-white` | Orange | White | FAIL (2.87:1) | **REWRITE** to `focus:bg-foreground focus:text-background` (DeepBlack bg, Off-white text, 19:1 PASS) |

### Hero / Contact button CTAs -- REWRITE (minimal fix)

| # | File:Line | Class | Verdict | Action |
|---|-----------|-------|---------|--------|
| 2 | HeroSection.tsx:26 | `bg-accent text-white` (button) | FAIL (2.87:1) | **REWRITE** text-white -> text-accent-foreground (DeepBlack, 6.68:1 PASS) |
| 3 | ContactSection.tsx:25 | `bg-accent text-white` (button) | FAIL (2.87:1) | **REWRITE** text-white -> text-accent-foreground (DeepBlack, 6.68:1 PASS) |

### Non-text UI decorations -- PASS (no action)

| # | File:Line | Class | Type | Verdict |
|---|-----------|-------|------|---------|
| 4 | AboutSection.tsx:10 | `bg-accent` (w-12 h-1 divider) | Non-text UI | PASS (solid fill, no contrast req) |
| 5 | AboutSection.tsx:24 | `border-accent` (border-l-2) | Non-text UI border | PASS |
| 6 | SkillsSection.tsx:15 | `bg-accent` (divider) | Non-text UI | PASS |
| 7 | SkillsSection.tsx:63 | `border-accent` (border-l-2) | Non-text UI border | PASS |
| 8 | ExperienceSection.tsx:32 | `bg-accent` (divider) | Non-text UI | PASS |
| 9 | ExperienceSection.tsx:44 | `bg-accent` + `ring-accent/30` (timeline dot) | Non-text UI dot | PASS |
| 10 | ContactSection.tsx:16 | `bg-accent` (divider) | Non-text UI | PASS |
| 11 | LeadershipSection.tsx:13 | `bg-accent` (divider) | Non-text UI | PASS |
| 12 | LeadershipSection.tsx:22 | `bg-accent` + `ring-accent/30` (timeline dot) | Non-text UI dot | PASS |

### Large display text on white -- PASS (>=24px threshold)

| # | File:Line | Class | Size | Verdict |
|---|-----------|-------|------|---------|
| 13 | HeroSection.tsx:42 | `text-accent` on metric numbers | text-3xl sm:text-4xl (30-36px) + font-bold | PASS (large text 3:1 threshold, 2.73:1 still FAIL but acceptable as WCAG large-text is 3:1 = TECHNICALLY STILL FAIL; scheduled for Phase 6 rewrite onto DeepBlack band surface) |

### Body / small text on white -- FAIL, DEFERRED to Phase 6 or Phase 9

These usages fail WCAG AA on the off-white background. All appear in components that are scheduled for **rebuild (Phase 6)** or **retirement (Phase 9)** per ROADMAP, so they will be deleted or rewritten before any production deploy in Phase 10. Documented here per BRAND-06.

| # | File:Line | Class | Context | Deferred To |
|---|-----------|-------|---------|-------------|
| 14 | HeroSection.tsx:11 | `text-accent` | Availability label (tracking-wide sm) | Phase 6 rebuild -- new Hero uses brief copy + 3 metric cards |
| 15 | AboutSection.tsx:32 | `text-accent` | Honors line (text-xs font-medium) | Phase 6 rebuild -- new About uses brief bio copy |
| 16 | ExperienceSection.tsx:50 | `text-accent` | Company name (text-sm font-medium) | Phase 9 retirement -- ExperienceSection deleted |
| 17 | ExperienceSection.tsx:59 | `text-accent` | Bullet separator dash | Phase 9 retirement -- ExperienceSection deleted |
| 18 | LeadershipSection.tsx:25 | `text-accent` | Organization name (text-sm font-medium) | Phase 9 retirement -- LeadershipSection deleted |
| 19 | Navbar.tsx:37 | `text-accent` | Desktop active nav link | Phase 9 navbar rewire -- active link style will be reconsidered |
| 20 | Navbar.tsx:73 | `text-accent` | Mobile active nav link | Phase 9 navbar rewire -- active link style will be reconsidered |

### Token declarations -- PASS (not render targets)

| # | File:Line | Class | Verdict |
|---|-----------|-------|---------|
| 21 | globals.css:21 | `--color-accent:` declaration | PASS (token def) |
| 22 | globals.css:22 | `--color-accent-foreground:` declaration | PASS (token def) |
| 23 | globals.css:23 | `--color-accent-hover:` declaration | PASS (token def) |

## Summary

- **23 call-sites audited** across 9 files
- **3 rewritten in Phase 5** (skip-link + 2 button labels) -- fixes worst FAILS
- **9 non-text decorations PASS** (no contrast requirement)
- **7 body-text FAILS deferred** to Phase 6 rebuild (3) or Phase 9 retirement (4)
- **1 large display text** on HeroSection.tsx:42 remains orange-on-white (technical FAIL at 3:1 large-text threshold since 2.73:1 still misses; deferred to Phase 6 Hero rebuild where metric cards will be redesigned)

## Remediation Tracking

- [x] layout.tsx skip-link rewritten in Plan 05-02
- [x] HeroSection.tsx:26 button `text-white` -> `text-accent-foreground`
- [x] ContactSection.tsx:25 button `text-white` -> `text-accent-foreground`
- [ ] HeroSection.tsx text-accent usages -> Phase 6 rebuild
- [ ] AboutSection.tsx text-accent usage -> Phase 6 rebuild
- [ ] ExperienceSection.tsx usages -> Phase 9 retirement
- [ ] LeadershipSection.tsx usages -> Phase 9 retirement
- [ ] Navbar.tsx active link usages -> Phase 9 navbar rewire

Each deferred item is tracked in ROADMAP.md for the corresponding phase and will be validated in Phase 10 polish/deploy WCAG sweep.
