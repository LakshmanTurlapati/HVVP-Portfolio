---
status: human_needed
phase: 10-polish-accessibility-deploy
verified: 2026-04-05
---

# Phase 10 Verification -- Polish, Accessibility QA, Deploy

## Success Criteria Status

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Every fg/bg pair passes 4.5:1 body / 3:1 UI; Lighthouse a11y = 100 | PARTIAL | Code-level audit complete: all text-accent-on-white usages eliminated (replaced with text-foreground + accent divider/border patterns); final Lighthouse run on deployed URL = USER VERIFICATION |
| 2 | PageSpeed Insights mobile LCP < 2.5s on gallery | DEFERRED | Requires deployed URL + PSI run = USER VERIFICATION |
| 3 | Every motion component verifies prefers-reduced-motion at JS level | PASS | AnimatedSection.tsx uses useReducedMotion() from motion/react at line 11-15; returns plain div when true |
| 4 | OG image renamed + twitter card renders where none did in v1.0 | PASS | og-image-v2.png (1200x630 DeepBlack+Orange) created; openGraph.images and twitter.images both reference it |
| 5 | Site live, metadataBase + JSON-LD canonical match production domain | PARTIAL | metadataBase and JSON-LD both point at https://harshavardhini.com -- user must verify this matches actual production domain before deploy |

## Requirements Coverage

| REQ | Status | Evidence |
|-----|--------|----------|
| POL-08 | PASS (code audit) | text-accent eliminated from body text; CaseStudySection labels rewritten to text-foreground + orange non-text accents |
| POL-09 | USER | Run Lighthouse on deployed URL |
| POL-10 | USER | Run PageSpeed Insights mobile LCP on deployed URL |
| POL-11 | PASS | AnimatedSection.tsx uses useReducedMotion() -- JS-level, not just CSS |
| POL-12 | PASS | og-image-v2.png created (1200x630 with DeepBlack bg + orange accent bar); openGraph.images updated; requires post-deploy LinkedIn Post Inspector / Twitter Card Validator warm-up |
| POL-13 | PASS | twitter.images field added with og-image-v2.png path |
| POL-14 | USER | Verify metadataBase https://harshavardhini.com matches actual production domain |

## Production Build Check

```
Route (app)                                 Size     First Load JS
┌ ○ /                                       ...      ...
└ ○ /_not-found                             ...      ...

○  (Static)  prerendered as static content
```

Build: PASS (4 static pages, 0 errors)

## Deferred Items Resolved

From accent audit deferrals in Phase 5:
- HeroSection text-accent -> rewritten in Phase 6 to text-foreground + border-t divider
- AboutSection text-accent -> rewritten in Phase 6 to inline credential callout (border-l-4)
- ExperienceSection / SkillsSection / LeadershipSection -> deleted in Phase 9
- Navbar active link text-accent -> rewritten in Phase 9 to text-foreground + orange underline (desktop) / orange left border (mobile)
- CaseStudySection text-accent labels -> rewritten in Phase 10 to text-foreground + orange decorative accent

All 7 FAILs documented in Phase 5 audit are now resolved. Only safe orange usages remain: decorative dividers, timeline dots, borders, button fills with DeepBlack text.

## Human Verification Needed

User must complete the following before marking milestone fully shipped:

1. **Visual walkthrough**: Run `cd harsha-portfolio && npm run dev` and verify all sections render correctly on desktop + mobile
2. **Deploy to production**: Deploy to Vercel or current production hosting (user's workflow)
3. **Lighthouse**: Run Lighthouse on deployed URL, confirm Accessibility = 100, Performance > 90, LCP < 2.5s
4. **Social debuggers**: Submit deployed URL to LinkedIn Post Inspector + Twitter Card Validator to warm caches and verify new OG image renders
5. **Production domain check**: Confirm metadataBase https://harshavardhini.com matches actual domain

## Status: human_needed

Build + code-level checks PASS. Deploy + live-URL verification steps belong to user per global preference (never auto-run apps/deploys).
