# Project Research Summary

**Project:** Harsha Vardhini Portfolio -- v2.0 Brand Redesign & Creative Portfolio
**Domain:** Marketer/designer hybrid portfolio (additive milestone on shipped Next.js 16 app)
**Researched:** 2026-04-04
**Confidence:** HIGH

## Executive Summary

This milestone repositions a live Next.js 16 portfolio from "data-driven marketer with numbers" to "strategist + creator with a visible body of work." The redesign layers three new capabilities onto an already-validated v1.0 base: (1) a DeepBlack/Orange/White brand palette paired with Montserrat Bold display typography, (2) two inline case studies built on a reusable 5-block component (Description / Context / What I Did / Execution / Results), and (3) a 31-asset creative gallery grouped into 6 categories with click-to-enlarge behavior. The existing v1.0 stack (Next.js 16.2.2, React 19, Tailwind v4, shadcn/ui, motion 12.38.0, @base-ui/react 1.3.0) is sufficient; zero new production dependencies are required for the baseline plan.

**The foundational design rule that governs every other decision:** Orange #FF6A00 on the off-white background measures ~2.73:1 contrast, which **fails WCAG 2.2 AA for body text (4.5:1) AND fails the 3:1 threshold for UI elements and focus rings.** Orange only passes when paired with DeepBlack (6.68:1) or when used as large display text / non-text UI shapes ≥24px on light surfaces. This single constraint dictates that orange may appear as headings, metric numbers, CTA fills (with DeepBlack text, never white), borders, badges, and dark-surface accents -- but **never** as body paragraph text and **never** as white-on-orange button labels. The skip-link currently uses `focus:bg-accent focus:text-white`, which regresses the moment the token flips; it must be rewritten to `focus:bg-foreground focus:text-background`.

**The recommended build sequence is tightly constrained by dependencies.** Design tokens must ship first (palette swap + Montserrat font + full shadcn token expansion) because every new section consumes them; shipping sections under old tokens means re-styling everything. Types and data files follow, then component rebuilds (Hero/About/Contact inherit existing structure -- quick wins first), then the gallery (highest complexity, 31 images requiring WebP conversion + `next/image` discipline on a codebase that has zero prior `next/image` usage), then navbar/section-ID rewiring, then polish/launch. All 4 independent research tracks converged on this ordering without coordination. Risk concentrates in two places: (1) the accent-token migration touches 27 existing usages across 9 files and will silently regress the shipped WCAG 2.2 AA compliance if not audited call-site-by-call-site, and (2) the gallery image pipeline must be established from scratch (50MB raw PNGs → ~5-10MB WebP/AVIF via Next.js optimization, mandatory `sizes` attribute, lazy-loading default) or LCP/CLS collapse on mobile.

## Key Findings

### Recommended Stack

The v1.0 base stack is fully sufficient for v2.0 -- no new production dependencies are required. Three additive changes inside existing files do all the work: a second `next/font/google` Montserrat import alongside Inter, an OKLCH palette swap inside the Tailwind v4 `@theme` block, and a `next/image` discipline across 31 gallery assets. The project already has `@base-ui/react@1.3.0` installed as a transitive dep, which ships a fully accessible `Dialog` primitive (portal + backdrop + focus trap + escape-to-close) that serves as a zero-KB lightbox.

**Core additions:**
- **`next/font/google` Montserrat (variable font, or `weight: ['700','800']` for static subset)** — Display heading font, same self-hosted pattern as existing Inter setup. Pair via second CSS variable `--font-montserrat` exposed on `<html>`.
- **Tailwind v4 `@theme` palette rewrite** — DeepBlack `oklch(~0.15 0 0)`, Orange `oklch(~0.68 0.21 40)`, Orange-soft `oklch(~0.79 0.14 55)`, White `oklch(~0.98 0 0)`. Zero new dependencies; CSS-only change.
- **`next/image` with mandatory `sizes` attribute** — 31-asset gallery is viable only with runtime AVIF/WebP conversion (via bundled `sharp`). Default `loading="lazy"` is correct for below-the-fold items; `preload={true}` replaces the deprecated `priority` prop in Next.js 16.
- **`@base-ui/react` Dialog (already installed)** OR **`yet-another-react-lightbox-lite` (~5 KB gzip)** for click-to-enlarge behavior — see decision point in Gaps section.

See `.planning/research/STACK.md` for complete rationale, OKLCH derivations, font-loading pattern, and bundle-size analysis.

### Expected Features

The v2.0 brief maps cleanly onto designer/marketer portfolio conventions from 2025-2026 sources. Table-stakes are well-defined; the brief supplies all required copy verbatim.

**Must have (table stakes):**
- Brand token system (DeepBlack/Orange/White + Montserrat display) rolled out across every section -- blocks everything else
- Rebuilt Hero with brief copy + 3 metric cards (down from 5 in v1.0)
- Rewritten About Me with brief-supplied copy verbatim
- Two case studies in identical 5-block structure (UTD International Center + Rio Jiu Jitsu), rendered as a single reusable component with two data inputs
- Creative Work gallery: 6 category sections, 31 assets each with curated title (not raw filename)
- Click-to-enlarge lightbox with keyboard nav (ESC, arrows) and focus return
- "What I Bring to the Table" skills block (brief copy, replaces v1.0 Skills pill chips)
- Redesigned Contact as "Let's Connect"
- Updated Navbar anchor links to match new section lineup
- WCAG 2.2 AA contrast re-verification after palette change

**Should have (competitive differentiators):**
- Pull-quote metric between Execution and Results blocks in each case study (magazine feel)
- At-a-glance Role/Timeline/Headline stat row atop each case study
- Gallery hover state revealing title on desktop (always visible on mobile)
- Client/channel badge on gallery thumbnails (decoded from filename prefix: PP, UTDG, IC, ISSO, OIE, II)
- Aspect-ratio-preserving uniform grid cells (category-appropriate 1:1, 1.91:1, etc.)
- Orange underline accent on section heading reveals

**Defer to v2.1+:**
- Case study detail pages (never justified for only 2 case studies)
- Gallery search/filter UI (single-page scrolling already does this work for 31 items)
- Dark/light mode toggle (brand identity IS the palette -- don't dilute it)
- Asset download buttons (client IP concerns)
- CMS integration (content is stable, 2 case studies won't change weekly)

See `.planning/research/FEATURES.md` for full table-stakes/differentiator breakdown and anti-features.

### Architecture Approach

The v2.0 architecture is **additive -- not a rewrite.** The existing typed-data-singleton pattern (one interface in `src/types/`, one data export in `src/data/[name].ts`, one server component in `src/components/sections/[Name]Section.tsx`) is preserved for all new single-instance sections. One new pattern is introduced: **Data-as-Prop** for the case study component (one component + two data inputs = two sections), which is the correct shape for repeating structural content. Everything else continues the v1.0 pattern. The `useActiveSection` hook is ID-agnostic (queries `document.querySelectorAll("section[id]")` at runtime), so section ID changes require zero hook modifications -- only the `NAV_LINKS` array and section JSX must stay in lockstep.

**Major components:**
1. **Design Token System (`globals.css` @theme + `layout.tsx` fonts)** — Palette + typography tokens. Foundation for everything. Must ship first. Includes full shadcn token expansion (`--color-card`, `--color-border`, `--color-input`, `--color-ring`, `--color-accent-foreground`), not just the 5 tokens currently declared.
2. **CaseStudySection (new, data-as-prop)** — Renders any `CaseStudyData` (5 blocks + optional metrics). Mounted twice in `page.tsx` with `caseStudyUtd` and `caseStudyRio` data. Section ID derived from `data.slug` as `case-study-{slug}`.
3. **GallerySection + GalleryGrid + GalleryCard (new)** — 6 categories × N assets, server-rendered `next/image` grid with kebab-case paths under `public/gallery/[category-slug]/`. Optional `GalleryLightbox` client island opens on click.
4. **ValuePropSection (new, typed-data-singleton)** — "What I Bring to the Table" replaces retired `SkillsSection`.
5. **Retired components** — `ExperienceSection`, `SkillsSection` (v1.0 pill chips), `LeadershipSection` deleted. `experience.ts`, `skills.ts`, `leadership.ts` data files deleted. `education.ts` likely absorbed into About. Types stay (harmless).
6. **Navbar (modified)** — `NAV_LINKS` array replaced with new 7-item lineup: `hero`, `about`, `case-study-utd`, `case-study-rio`, `gallery`, `value-prop`, `contact`. Short labels ("UTD", "Rio", "Work", "Approach") to fit desktop bar.

Client-island boundaries remain minimal: Navbar (hamburger state + active-section), AnimatedSection (motion), and the optional GalleryLightbox. Everything else is Server Component with zero hydration cost.

See `.planning/research/ARCHITECTURE.md` for complete data models, file layouts, migration order, and anti-patterns.

### Critical Pitfalls

1. **Orange contrast fails except on DeepBlack** — #FF6A00 on #F9F9F9 = 2.73:1 (FAIL body, FAIL UI). #FFFFFF on #FF6A00 = 2.87:1 (FAIL button labels). Rule: orange text only on DeepBlack surfaces; buttons with orange fill use DeepBlack text not white; on white surfaces, orange is non-text only (borders, underlines, large display headings ≥24px). Add contrast-check script to CI.

2. **`--color-accent` token collision across 27 existing usages in 9 files** — Simple token swap silently regresses Phase 4 WCAG 2.2 AA compliance. The `focus:bg-accent focus:text-white` on the skip-link (the single most important accessibility affordance) becomes 2.87:1 FAIL the moment the token flips. Mandatory: audit every `accent`-prefixed class before the swap, split token into `--color-accent` (orange, dark-only) vs `--color-accent-foreground` (DeepBlack for button text), rewrite skip-link to `focus:bg-foreground focus:text-background`.

3. **31 PNGs (50MB raw) tank LCP and CLS without image pipeline discipline** — Codebase has ZERO `next/image` usage today, so pattern must be established. Required: kebab-case rename to `public/gallery/[category]/[asset].png`, WebP/AVIF output via `images.formats: ['image/avif','image/webp']` in next.config, mandatory `sizes` attribute on every image (without it Next.js assumes 100vw and ships full-res to mobile), `aspect-ratio` container per category (1:1 Instagram, 1.91:1 LinkedIn, 16:9 signage) to prevent CLS, `loading="lazy"` default (never override with `eager`), `preload={true}` replaces deprecated `priority` prop. Budget: <500KB gallery payload on first mobile paint.

4. **Montserrat preload regression if weight array used instead of variable font** — Listing `['400','700','900']` ships three .woff2 files and doubles font transfer. Use variable Montserrat (omit `weight` or explicit `'variable'`) OR minimal static subset (`['700','800']` only), keep `subsets: ['latin']` only, scope `font-display` to H1/H2 only (never H3+, nav, or body) to avoid overuse that erases hierarchy.

5. **OG image cache staleness on redesign** — LinkedIn, X, Slack, iMessage cache OG images 7-30 days. Updating `/og-image.png` in place means recruiters who receive the new URL see the old muted-blue preview for weeks. Required: rename file (`og-image-v2.png`), update `openGraph.images` + add `twitter.images` (currently missing), verify `metadataBase` matches production domain, submit to LinkedIn Post Inspector after deploy.

See `.planning/research/PITFALLS.md` for the full 13-pitfall catalog (5 critical, 5 moderate, 3 minor) plus technical-debt patterns, performance traps, and the "Looks Done But Isn't" verification checklist.

## Implications for Roadmap

Based on combined research, suggested phase structure (all 3 architecture-adjacent researchers independently converged on this ordering):

### Phase 1: Design Token Foundation
**Rationale:** Every new v2.0 section consumes tokens. Shipping sections under old tokens means re-styling every component a second time. This phase is the hard dependency for everything downstream.
**Delivers:** Full palette swap (DeepBlack/Orange/White OKLCH values in `@theme`), Montserrat variable font added via `next/font/google`, `--font-display` token wired, shadcn token set expanded to full specification (card, border, input, ring, accent-foreground), skip-link rewritten to use foreground/background not accent/white, full audit of all 27 existing `accent`-prefixed usages with call-site-by-call-site contrast verification, contrast-check script added to CI.
**Addresses:** Brand Token System feature (blocks all others).
**Avoids:** Pitfall 1 (orange contrast failure), Pitfall 2 (token collision across 27 usages), Pitfall 4 (Montserrat preload regression), Pitfall 6 (shadcn token drift), Pitfall 7 (Montserrat overuse), Pitfall 11 (accidentally removing `tw-animate-css`).
**Complexity:** MEDIUM -- mechanical work touches every component file, easy to miss spots.

### Phase 2: Content Sections (Hero / About / Value Prop / Contact)
**Rationale:** Rebuild known components first (quick wins front-loaded) + add the one new non-gallery section. These sections use existing layout structure and all rely on Phase 1 tokens. All brief copy is supplied verbatim.
**Delivers:** Rebuilt HeroSection (new copy + 3 metric cards, down from 5; Montserrat H1), rebuilt AboutSection (new bio copy verbatim), new ValuePropSection replacing retired SkillsSection, rebuilt ContactSection ("Let's Connect" heading). New types (`ValuePropItem`, `ValuePropData`) in `src/types/index.ts`. New/rebuilt data files: `hero.ts`, `about.ts`, `valueProp.ts`, `contact.ts`.
**Uses:** Tailwind v4 tokens from Phase 1, existing `AnimatedSection` wrapper (motion/react), existing typed-data-singleton pattern.
**Implements:** HeroSection, AboutSection, ValuePropSection, ContactSection components.
**Complexity:** LOW -- brief supplies exact copy, layout patterns exist from v1.0.

### Phase 3: Case Studies
**Rationale:** Case studies depend on Phase 1 tokens and introduce the new Data-as-Prop pattern. The single reusable `CaseStudySection` component with two data inputs enforces the "scannable repeat pattern" that recruiters rely on when comparing studies.
**Delivers:** New `CaseStudyData` and `CaseStudyBlock` types, `caseStudyUtd.ts` and `caseStudyRio.ts` data files (each with Description / Context / What I Did / Execution / Results blocks plus role/timeframe/client metadata), single `CaseStudySection.tsx` component accepting `data: CaseStudyData` prop, section IDs derived as `case-study-{slug}`.
**Addresses:** Case study 5-block structure, quantified results callout, consistent repeated structure, optional metric pull-quote differentiator, optional stat row differentiator.
**Avoids:** Pitfall 8 (missing alt text on case-study inline images -- run axe-core after each case study, not just at milestone end).
**Complexity:** LOW -- simple data-driven render, 5 prose blocks + optional decorations.

### Phase 4: Creative Work Gallery (Highest Complexity)
**Rationale:** Gallery is the single-largest risk surface (31 images, 50MB raw, zero prior `next/image` in codebase, WCAG AA text contrast on tile captions, keyboard-accessible lightbox). Built after content sections because it requires its own sub-component tree (`GalleryGrid`, `GalleryCard`, optional `GalleryLightbox`) and because gallery rendering issues would compound with any open design-token questions if built earlier.
**Delivers:** Kebab-case asset migration from `.planning/design-references/My Designs/` to `public/gallery/[category-slug]/[asset-slug].png` (6 categories: instagram-posts, linkedin-posts, linkedin-ads, linkedin-events, digital-signage, printables), 2 PDFs in `public/gallery/printables/` with PNG preview thumbnails and file-size labels, new `GalleryAsset` / `GalleryCategory` / `GalleryData` types, `gallery.ts` data file with 31 entries (title, alt, client, width, height, fileType), `GallerySection` + `GalleryGrid` + `GalleryCard` server components, mandatory `sizes` attribute on every `next/image`, `aspect-ratio` container per category, click-to-enlarge lightbox (likely `@base-ui/react` Dialog -- see Gaps), keyboard nav (ESC, arrows), focus return.
**Uses:** `next/image` (first usage in project), bundled `sharp`, `@base-ui/react` Dialog primitive OR `yet-another-react-lightbox-lite`, `images.formats: ['image/avif','image/webp']` next.config addition.
**Implements:** Categorized Gallery pattern (ARCHITECTURE.md Pattern 3).
**Avoids:** Pitfall 3 (31 PNGs tank LCP), Pitfall 9 (25MB raw PDFs), Pitfall 13 (gallery titles dropped).
**Complexity:** MEDIUM-HIGH -- new pattern in codebase, 31 assets require width/height entries (consider one-off `sharp`-based manifest script).

### Phase 5: Navigation Rewire + Retirements
**Rationale:** Must happen after all new sections exist in the DOM. Updating navbar anchors before sections are built creates broken links during development. The `useActiveSection` hook is ID-agnostic so this is safe to do as a discrete step.
**Delivers:** Updated `NAV_LINKS` array in `Navbar.tsx` (new 7-item lineup with short labels), new section ordering in `page.tsx` (Hero → About → CaseStudy UTD → CaseStudy Rio → Gallery → ValueProp → Contact), deletion of `ExperienceSection.tsx` / `SkillsSection.tsx` / `LeadershipSection.tsx` and their data files `experience.ts` / `skills.ts` / `leadership.ts` (kept: `education.ts` absorbed into About; retired types stay, harmless).
**Avoids:** Anti-Pattern 1 (rename section IDs without updating navbar + hook), orphaned anchor links, Pitfall 10 (orange focus ring identical to orange hover state on navbar -- use `outline-offset: 3px` to distinguish).
**Complexity:** LOW -- mechanical rewire, one commit.

### Phase 6: Polish, Accessibility QA, Deploy
**Rationale:** Final verification surface -- contrast audit, Lighthouse, keyboard traversal, OG cache refresh, social debugger warm-up.
**Delivers:** Contrast-check script run in CI (every fg/bg pair passes 4.5:1 text / 3:1 UI), Lighthouse accessibility = 100, PageSpeed Insights mobile LCP <2.5s on gallery page, axe-core clean on all sections, every interactive element keyboard-reachable with 3:1 focus-ring contrast, `prefers-reduced-motion` verified at JS level (not just CSS) via `useReducedMotion()` in every motion component, renamed OG image (`og-image-v2.png`), updated `openGraph.images` + new `twitter.images` entry, `metadataBase` verified against production domain, LinkedIn Post Inspector / Facebook Sharing Debugger / Slack cache warmed, sitemap.ts + robots.ts evaluated, JSON-LD re-verified against schema.org validator.
**Avoids:** Pitfall 5 (OG cache staleness), Pitfall 12 (motion ignoring reduced-motion), regressions to v1.0 Phase 4 accessibility guarantees.
**Complexity:** MEDIUM -- checklist work, high-impact.

### Phase Ordering Rationale

- **Tokens before anything:** confirmed by STACK (palette swap + font is a prerequisite), ARCHITECTURE (migration-order section explicitly says "Step 1-3: tokens & fonts"), and PITFALLS (4 of 5 critical pitfalls are design-token-related and must be prevented at Phase 1).
- **Content sections before gallery:** Hero/About/Contact/ValueProp are low-complexity rebuilds with supplied copy. Front-loading quick wins keeps momentum before the gallery's higher risk surface.
- **Case studies before gallery:** case studies reuse the existing section pattern + add one new pattern (data-as-prop). Gallery introduces an entirely new sub-component tree + image pipeline. Easier before harder.
- **Gallery late, navigation last:** gallery changes may ripple back into data models; navbar cannot be updated until all target anchors exist. Retire-v1.0-components is the final cleanup in the same commit so git history is the archive.
- **Polish after integration:** WCAG/LCP verification is meaningful only once the full page renders. Running axe-core per-phase catches local issues; the final pass catches cross-section interactions (focus order across the full page, OG image vs. actual hero copy, etc.).

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 1 (Design Tokens):** The 27-usage accent audit requires a systematic call-site-by-call-site review. Consider a short spike to produce the spreadsheet (file, line, classname, surface color, text color, new expected contrast) BEFORE swapping the token. Also verify exact OKLCH values for #FF6A00 and #FFA559 with a conversion tool (STACK gave `oklch(0.7009 0.2012 44.77)`, ARCHITECTURE gave `oklch(0.68 0.21 40)` -- reconcile before committing).
- **Phase 4 (Gallery):** Two open decisions need resolution during planning: (a) which lightbox library (see Gaps), (b) whether to hand-type 31 image width/height pairs vs. write a one-off `scripts/gen-gallery-manifest.ts` using `sharp` or `image-size`. Also verify `sharp` behavior on Fly.io glibc (may need `SHARP_IGNORE_GLOBAL_LIBVIPS=1`).
- **Phase 6 (Polish/Launch):** Confirm whether `app/sitemap.ts` and `app/robots.ts` are needed (currently absent) given the static-export deployment configuration used in v1.0 Phase 4.

**Phases with standard patterns (can skip `/gsd:research-phase`):**
- **Phase 2 (Content Sections):** Brief supplies exact copy, layouts inherit v1.0 patterns, data models are simple extensions.
- **Phase 3 (Case Studies):** 5-block structure is explicit in brief, Data-as-Prop pattern is well-understood, complexity is LOW.
- **Phase 5 (Nav Rewire):** Mechanical work, `useActiveSection` is ID-agnostic, one-commit change.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified against bundled Next.js 16.2.2 docs, installed `@base-ui/react@1.3.0` package inspection, direct npm registry checks (`yet-another-react-lightbox@3.30.1`, Montserrat variable font). OKLCH values computed directly from hex via OKLab formulas. |
| Features | HIGH | Multiple corroborating 2025-2026 sources (Semplice, Format, Copyfolio, Toptal, Humbleteam, Neue World, IxDF). Brief supplies exact copy for all new sections. Direct filesystem verification of 31-asset inventory across 6 categories. |
| Architecture | HIGH | Direct inspection of every file in the current `src/` tree (layout, page, globals.css, all 9 components with accent usages, 7 data files, types, hooks, next.config, package.json, components.json). Token migration sequence verified against Tailwind v4 `@theme` behavior. |
| Pitfalls | HIGH | Contrast ratios computed directly from brand hex values using WCAG 2.1/2.2 relative luminance formula (not looked up). Next.js 16 facts verified against `node_modules/next/dist/docs/`. 27 accent-usage count verified via grep on current tree. |

**Overall confidence:** HIGH

### Gaps to Address

Cross-cutting decision points where the 4 research tracks diverged or left open questions that should be resolved before or during planning:

- **Gallery lightbox library decision:** STACK recommends `@base-ui/react` Dialog (already installed as `@base-ui/react@1.3.0`, zero new dependencies, ships full accessibility primitives including focus trap + portal + backdrop + escape-to-close). FEATURES recommends `yet-another-react-lightbox` (lite variant ~5 KB gzip, purpose-built for image galleries, swipe/arrow keys built in). **Recommendation: default to `@base-ui/react` Dialog for the baseline** — it is already paid for, sufficient for click-to-enlarge on a grouped gallery where each asset has a visible caption in the grid, and avoids a new dependency. Escalate to `yet-another-react-lightbox-lite` only if the milestone evolves to demand swipe-between-assets carousel behavior across all 31 items. Handle during Phase 4 planning.

- **Image asset location decision:** STACK recommends `src/assets/designs/` with static ES imports (auto width/height, auto blurDataURL, long-TTL cache headers). ARCHITECTURE recommends `public/gallery/[category-slug]/` (handles 2 PDFs which cannot be imported, works with existing `output: "standalone"` Fly.io config, single mental model for all assets). **Recommendation: follow ARCHITECTURE's guidance and use `public/gallery/[category-slug]/` for a unified rule** — the PDF exception and existing standalone-deploy mode make `public/` the pragmatic choice for this project, and 31 assets with well-known social-media aspect ratios make manual width/height entries cheap. Can still use `placeholder="empty"` or generate blur stubs via a one-off `sharp` script if desired. Handle during Phase 4 planning.

- **Section ID retirements safe but verify atomic updates:** Experience, Skills pill-chips, and Leadership components are superseded by the brief. Navbar anchor IDs must change from `experience`/`skills`/`leadership` to `case-study-utd`/`case-study-rio`/`gallery`/`value-prop`. **The `useActiveSection` hook is ID-agnostic** (queries `document.querySelectorAll("section[id]")` at runtime per ARCHITECTURE verification), so this is safe -- but all three places (section JSX, `NAV_LINKS` array, any cross-section anchor hrefs) must be updated atomically. Flagged for Phase 5.

- **No `next/image` usage currently in codebase:** the pattern must be established from scratch in Phase 4. Establish strict rules in the first gallery component (mandatory `sizes`, `aspect-ratio` wrapper, lazy-load default, `preload` not `priority`, `placeholder="blur"` or `"empty"`) and reuse across all 31 assets. 50MB raw → target <500KB first-paint budget on mobile.

- **`metadataBase` and JSON-LD canonical URL drift:** `layout.tsx` currently hardcodes `https://harshavardhini.com` in two places (`alternates.canonical`, `jsonLd.url`). Verify the production domain matches before Phase 6 deploy verification.

- **Exact OKLCH values for orange tokens:** STACK computed `oklch(0.7009 0.2012 44.77)` for #FF6A00; ARCHITECTURE used approximation `oklch(0.68 0.21 40)`. Reconcile with an authoritative hex-to-OKLCH converter before committing to `@theme` in Phase 1.

## Sources

### Primary (HIGH confidence)
- **Bundled Next.js 16.2.2 documentation** (`node_modules/next/dist/docs/`) — `getting-started/12-images.md`, `getting-started/13-fonts.md`, `api-reference/components/image.md` (`preload` prop, `priority` deprecation), `api-reference/components/font.md` (variable option, adjustFontFallback), `02-guides/self-hosting.md` (sharp on Fly.io/glibc), `api-reference/file-conventions/metadata/opengraph-image.md`
- **Installed package inspection** — `@base-ui/react@1.3.0` Dialog primitive verified locally, `package.json` dependency tree, Tailwind v4 `@theme` behavior, shadcn/ui `components.json` (`baseColor: "neutral"`)
- **Direct codebase inspection** — all 9 files with accent-prefixed classes (27 usages), 7 data files, all section components, `layout.tsx`, `page.tsx`, `globals.css`, `Navbar.tsx`, `useActiveSection.ts`, `next.config.ts`
- **Filesystem audit** — 31 design assets counted across 6 categories in `.planning/design-references/My Designs/`, 49MB total
- **WCAG 2.1/2.2 contrast ratios** — computed directly from brand hex values using relative-luminance formula (11 combinations verified by calculation)
- **OKLCH palette values** — computed from hex via OKLab formulas (sRGB → linear RGB → LMS → OKLab → OKLCH)
- **[Next.js 16 Release Blog](https://nextjs.org/blog/next-16)** — October 21, 2025
- **[Tailwind CSS v4 Announcement](https://tailwindcss.com/blog/tailwindcss-v4)** — stable January 22, 2025
- **[shadcn/ui Tailwind v4 docs](https://ui.shadcn.com/docs/tailwind-v4)** — February 2025 support
- **[Montserrat on Google Fonts](https://fonts.google.com/specimen/Montserrat)** + **[GitHub repo](https://github.com/JulietaUla/Montserrat)** — variable font confirmed
- **[yet-another-react-lightbox npm](https://www.npmjs.com/package/yet-another-react-lightbox)** — v3.30.1 (March 26 2026), React 19 peer

### Secondary (MEDIUM confidence)
- **[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)** — threshold reference
- **[Orange You Accessible? -- Bounteous](https://www.bounteous.com/insights/2019/03/22/orange-you-accessible-mini-case-study-color-ratio/)** — orange contrast challenges documented
- **[WCAG 2.2 Level AA Contrast Requirements](https://www.makethingsaccessible.com/guides/contrast-requirements-for-wcag-2-2-level-aa/)**
- **[Next.js Image Optimization -- DebugBear](https://www.debugbear.com/blog/nextjs-image-optimization)**
- **[Custom fonts with next/font -- Vercel](https://vercel.com/blog/nextjs-next-font)**
- **[yet-another-react-lightbox-lite GitHub](https://github.com/igordanchenko/yet-another-react-lightbox-lite)** — ~5KB gzip, React 18+ (React 19 peer claim unverified, inferred from sibling package)
- **[Semplice: How to write case studies](https://www.semplice.com/how-to-write-case-studies-for-your-portfolio)**, **[Format design case study guide](https://www.format.com/magazine/resources/design/how-to-write-design-case-study)**, **[IxDF UX case studies](https://ixdf.org/literature/article/how-to-write-great-case-studies-for-your-ux-design-portfolio)** — case study convention consensus
- **[Humbleteam via Neue World black-and-orange roundup](https://www.neue.world/journal/inspiring-black-and-orange-website-designs)** — brand restraint model
- **[Vercel OG image refresh guide](https://www.beyondspace.studio/blog/how-to-refresh-open-graph-image)**, **[OG cache refresh trick](https://www.8p-design.com/en/blog/simple-trick-refresh-open-graph-cache)**

### Tertiary (LOW confidence / needs validation)
- **Exact OKLCH values for #FF6A00 and #FFA559** — STACK and ARCHITECTURE give slightly different approximations. Verify with an authoritative converter before committing to `@theme`.
- **`sharp` Fly.io glibc behavior** — `SHARP_IGNORE_GLOBAL_LIBVIPS=1` may be required per Next.js self-hosting docs. Verify in Phase 4 against existing Fly.io Dockerfile.

---
*Research completed: 2026-04-04*
*Ready for roadmap: yes*
