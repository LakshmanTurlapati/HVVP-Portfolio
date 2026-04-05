# Feature Landscape -- v2.0 Brand Redesign & Creative Portfolio

**Domain:** Marketing/designer hybrid portfolio (creative body of work + quantified marketing case studies)
**Project:** Harsha Vardhini Portfolio -- v2.0 milestone
**Researched:** 2026-04-04
**Overall Confidence:** HIGH (multiple corroborating 2025-2026 sources, cross-verified with designer and marketer portfolio conventions)

---

## Scope Note

This FEATURES.md focuses **only on the new v2.0 capabilities** being added in this milestone: case study sections, creative gallery, brand redesign, and the new skills/hero/contact copy. Features already validated in v1.0 (hero/about/experience/skills/leadership/contact/navbar/smooth-scroll/scroll-reveal) are documented in `.planning/research/FEATURES.md` at the v1.0 snapshot and are not repeated here.

---

## Gallery Asset Inventory (Confirmed)

The 31 design assets are organized into **6 category folders** under `.planning/design-references/My Designs/`:

| # | Category | Asset Count | Format |
|---|----------|-------------|--------|
| 1 | Digital Signage | 2 | PNG (landscape, large canvas) |
| 2 | Instagram Posts | 10 | PNG (1:1 square, social) |
| 3 | LinkedIn > LinkedIn Ads | 4 | PNG (mixed ratio) |
| 4 | LinkedIn > LinkedIn Events | 2 | PNG (event card) |
| 5 | LinkedIn > LinkedIn Posts | 7 | PNG (LI feed ratio) |
| 6 | Printables | 6 | PNG + PDF (brochures, posters, thank-you cards) |

**Total asset count:** 31 items. Categories align with the brief's requested grouping. File names use `[Client][Channel] Asset Name` convention (e.g., `[ISSO][IG] Townhall Meeting Post.png`) which can be parsed for titles but is currently raw-slug format; curated titles need to be defined per-asset.

**Implication:** LinkedIn has a natural sub-hierarchy (Ads / Events / Posts) that could be flattened to "LinkedIn" top-level or preserved as 3 subcategories (making 8 total). The brief says "6 groupings" so flattening LinkedIn into one group is the right call -- sub-type can surface as a caption/badge on each tile.

---

## Table Stakes (Expected on a Designer/Marketer Portfolio in 2026)

Features visitors (hiring managers at marketing orgs + creative agencies) assume exist. Missing any of these = the v2.0 redesign fails to deliver on the "strategist + creator" positioning.

### Case Study Features

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Case study with Problem/Context framing | Magazine-feature convention; hiring managers scan for "why this mattered" before reading process | LOW | Brief supplies exact copy in 5-block structure: Description / Context / What I Did / Execution / Results. Render as prose blocks, not cards. |
| Quantified results callout | Table stakes for marketing case studies; vague outcomes = disqualifying. Headlines like "340% revenue increase" are the industry standard opening or closing hook | LOW | Pull key metric(s) from the Results block and style as a prominent pull-quote or stat card. |
| Consistent repeated structure across case studies | Scannable pattern-matching lets recruiters compare apples-to-apples; inconsistent formats signal chaos | LOW | Both case studies MUST use identical block order and heading styles. Repeat the 5-block structure verbatim. |
| Section heading that clearly identifies which case study | Anchored navigation requires unambiguous section IDs; visual anchor helps scroll scanning | LOW | "Case Study 1: UTD International Center" and "Case Study 2: Rio Jiu Jitsu" as H2-level section titles. |
| Scannable typography hierarchy inside each block | Recruiters skim; if blocks all look the same density, they bounce | LOW | Block labels (Context, What I Did, etc.) styled as small-caps or bold labels; body copy in comfortable reading size (17-18px). |

### Creative Gallery Features

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Category grouping with clear section headers | Brief explicitly requests "6 groupings"; visitors need to scan by work-type (IG vs print vs signage) to match to job-type fit | LOW | Render 6 category subheadings with asset grids beneath each. No tab UI needed on a single-page site -- let the natural scrolling stack be the navigation. |
| Per-asset title/caption | Brief explicitly requires asset titles; a wall of images without captions is a portfolio anti-pattern per Semplice/Format/Artisan | LOW | Curated human titles under each thumbnail (e.g., "Welcome Back to Campus"), not raw file slugs. |
| Click-to-enlarge / lightbox | 31 thumbnails at grid size are too small to appreciate design craft; visitors expect to inspect full-res | MEDIUM | yet-another-react-lightbox is current standard for Next.js in 2026. Supports keyboard nav, next/image integration, tree-shakeable. |
| Lazy-loaded images | 31 PNGs totaling ~70+ MB would cripple LCP without lazy loading; `next/image` does this automatically | LOW | Already handled by `next/image loading="lazy"` default. Ensure all gallery images use `next/image`, not raw `<img>`. |
| Responsive grid that reflows on mobile | Marketing portfolio on a broken mobile layout = instant red flag (per v1.0 research); must hold up on iPhone SE width | MEDIUM | CSS grid with `grid-template-columns: repeat(auto-fill, minmax(...))` or Tailwind responsive grid utilities. |
| Visible file format indicator for PDFs | Two printables are PDFs, not PNGs -- visitors expect to know what they'll get before clicking | LOW | Small badge or icon on PDF items ("PDF" pill). |
| Keyboard-accessible lightbox (ESC to close, arrows to navigate) | WCAG 2.2 AA and also a baseline expectation from any modern viewer | LOW-MEDIUM | yet-another-react-lightbox ships keyboard support by default. Verify focus trap and focus return. |

### Brand System Features

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Consistent accent color use (Orange restricted to CTAs, highlights, hovers) | Bold orange on dark MUST be restrained or the interface becomes fatiguing; Humbleteam/Neue World reference designs use orange as accent only | LOW | Document tokens: Orange primary = CTA buttons, link hover, active nav state, metric cards. Never for body text or backgrounds of long content. |
| Dark base with generous whitespace | DeepBlack (#0F0F0F) backgrounds require more breathing room than light ones; crowded dark layouts feel claustrophobic | LOW | Increase vertical rhythm (section padding) by ~20% vs v1.0 light theme defaults. |
| High-contrast body text on DeepBlack | WCAG 2.2 AA requires 4.5:1; White (#F9F9F9) on #0F0F0F = 18.6:1 contrast ratio, safely above AA | LOW | Verify with contrast checker during implementation. Muted secondary text should still clear 4.5:1. |
| Typographic hierarchy using Montserrat Bold for display, Inter for body | Brief specifies this pairing; also a well-understood pattern (geometric display + neutral body) | LOW | Load both via `next/font/google` with weight subsetting. Montserrat 700 for H1-H3, Inter 400/500 for paragraphs. |
| Orange focus ring on keyboard focus | Accessibility + brand consistency; default browser blue focus ring clashes with orange brand | LOW | Tailwind `focus-visible:ring-2 focus-visible:ring-[#FF6A00]` utility pattern. |
| Preserved reduced-motion respect | Already validated in v1.0 Phase 4; must not regress during redesign | LOW | Keep existing `prefers-reduced-motion` guards in scroll-reveal components. |

---

## Differentiators (Competitive Edge, Not Required)

Features that make the v2.0 redesign stand out from peer marketer portfolios. Not expected, but valued.

### Case Study Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Pull-quote metric as mid-case-study visual break | Breaks up prose, gives scanners a data anchor, creates the "magazine spread" feel Semplice/Format recommend | LOW-MEDIUM | Pull a standout line from Results ("3x engagement in 8 weeks" style) and render it large, in Orange, between Execution and Results blocks. |
| Case study "at-a-glance" stat row (3 metrics) | Mirrors the Hero metric cards; creates visual rhyme across the page | LOW | Row of 3 compact stat cards at the top of each case study: Role / Timeline / Headline Result. |
| Subtle horizontal divider between case studies | Gives the two case studies visual distinct weight; without dividers they blur together | LOW | Thin orange accent rule (1-2px) as section separator. |
| Role/timeline/deliverables metadata strip | Common on agency case studies; answers "what did she actually do?" before the reader invests in the prose | LOW | One-line: "Role: Social Media Strategist · Timeline: 6 months · Channels: Meta, LinkedIn" under the case study title. |

### Gallery Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Hover state with title reveal over image | On desktop, revealing the title on hover keeps the grid visually clean while providing context on-demand; common in designer portfolios (Toptal, DesignerUp references) | LOW-MEDIUM | CSS transition on `opacity` of caption overlay. Title always visible on mobile (no hover). |
| Client/channel badge on thumbnail | At 31 assets, visitors benefit from seeing org (UTD ISSO, IC, OIE) without clicking in -- adds narrative context | LOW | Small text badge in corner using asset filename prefix metadata. |
| Lightbox shows title + category + client on the full-res view | Once enlarged, the caption provides the "this was for X, in support of Y" story | LOW | yet-another-react-lightbox supports description slot. |
| Category anchor links in navbar or section TOC | With 6 categories, a mini TOC inside the gallery section lets visitors jump to "show me the print work" | LOW-MEDIUM | In-section sticky or inline anchor nav: [Signage] [Instagram] [LinkedIn] [Print]. Smooth-scroll behavior matches site pattern. |
| Aspect-ratio-preserving grid (uniform cells with object-fit: cover) | Mixed ratios (1:1 IG, landscape signage, 4:5 LinkedIn) otherwise break the grid rhythm; cropping to uniform cells keeps the page visually calm | LOW | CSS `aspect-ratio: 1/1` or `4/5` on grid cells, `object-fit: cover` on images. Lightbox shows original ratio. |

### Brand System Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Secondary orange (#FFA559) for hover/soft accents | Gives tonal range within the orange palette; prevents single-orange monotony | LOW | Document as two tokens: `orange-primary #FF6A00` (CTAs), `orange-soft #FFA559` (hover, dividers, subtle accents). |
| Section entrance animations use orange accent color on reveal | Subtle orange underline or orange fade-in accent as sections enter viewport reinforces brand identity moment-to-moment | LOW-MEDIUM | Extend existing scroll-reveal with orange underline slide-in for section headings. |
| Branded 404 and loading states | Small touches that signal brand consistency even in edge states | LOW | Not blocking for v2.0 but differentiating if time allows. |

---

## Anti-Features (Looks Good, Don't Build)

Features that seem like obvious additions but create problems for this project's goals, timeline, or audience.

| Anti-Feature | Why Requested | Why Problematic | Alternative |
|--------------|---------------|-----------------|-------------|
| Interactive category filter with JS state management on the gallery | "Filterable galleries are standard" (WP plugin marketing) | On a single-page site with 31 assets organized into 6 sections, a filter recreates what vertical scrolling already does, adds JS weight, introduces state bugs, and hurts SEO (filtered items may be hidden from indexers). Users can Ctrl+F or scroll. | Just render the 6 categories as stacked sections with clear subheadings. Add anchor links if scroll fatigue is a concern. |
| Masonry layout for the gallery | "Masonry looks Pinterest-modern" | Masonry with mixed aspect ratios creates a visually busy grid -- which fights the calm brand system. It also introduces layout shift as images load, hurting CLS. Uniform-cell grids are calmer and more appropriate to a DeepBlack brand system (where whitespace matters more). | Uniform-cell grid with `aspect-ratio: 1/1` or category-appropriate ratio, `object-fit: cover`. Preserves brand calm and hits CLS targets. |
| Case study detail pages on separate routes | "Dedicated case study pages are best practice" (Semplice, Copyfolio) | True for designers with 10+ case studies who need depth per project. For 2 case studies, a dedicated page adds routing complexity, extra navigation, and splits the single-page narrative that the rest of the site relies on. | Inline case studies on the main scroll as stacked sections. The 5-block structure from the brief fits comfortably inline. |
| Video case study walkthroughs or embedded loom | "Video increases engagement" | Autoplay is annoying, non-autoplay requires a click users won't make, video hurts LCP, video requires hosting + captions for accessibility. | Stick to prose + metric callouts + supporting image if needed. |
| Full case study image galleries per case study | "Show the work in the case study" | Case studies document strategy/process; the Creative Work gallery IS the visual proof. Duplicating images between case studies and gallery creates maintenance burden and dilutes both. | Add 1 hero visual per case study max. Link out to gallery category ("See the campaign assets below"). |
| Lightbox with zoom, pan, or slideshow autoplay | Feels "premium" | Zoom and pan are power features for photography portfolios; graphic design assets are meant to be viewed at canvas size. Slideshow autoplay is a dark pattern that hijacks user attention. | Simple lightbox: click to open full-res, arrow keys to navigate, ESC to close. No zoom, no autoplay. |
| Dark/light mode toggle on v2.0 | "Users want choice" | The brand system IS the DeepBlack identity. Offering a light-mode fallback undermines the brand positioning the milestone is built around. Also doubles design token work. | Commit fully to DeepBlack. If a high-contrast accessibility mode is needed, that's a separate accessibility feature, not a mode toggle. |
| Social sharing buttons on case studies | "Make it shareable" | Recruiters don't share case studies; they forward the portfolio URL. Share buttons add visual clutter and third-party JS. | Ensure Open Graph meta tags are correct (already v1.0 validated) so LinkedIn/Twitter previews work when URL is pasted. |
| Asset download buttons on gallery items | "Let people download the work" | These are client assets (UTD, Rio, IC, OIE). Distributing them to random visitors raises IP/licensing questions. | Display-only gallery. Recruiters who want samples can ask. |
| CMS integration for gallery/case studies | "Easy updates" | 31 assets and 2 case studies are stable content -- they won't change weekly. CMS adds hosting cost, complexity, and a dependency for a benefit Harsha doesn't need. | Static TypeScript data files (`src/data/gallery.ts`, `src/data/case-studies.ts`) with typed shape. Update via code commit. |

---

## Feature Dependencies

```
Brand Token System (#0F0F0F, #FF6A00, #FFA559, #F9F9F9, Montserrat)
    |
    +--> All new v2.0 sections (Hero, About, Case Studies, Skills, Gallery, Contact)
    +--> Existing v1.0 sections (Experience, Leadership, Navbar) -- must be restyled to match
    |
    +--> Focus-visible ring color
    +--> Metric card styling
    +--> Section heading styling

Typography Tokens (Montserrat Bold + Inter)
    |
    +--> Hero headline
    +--> Section titles (H2)
    +--> Case study block labels
    +--> Body copy across site

Case Study 5-Block Structure (component)
    |
    +--> Reused twice (UTD + Rio) -- must be a parameterized component, not copy-pasted markup
    |
    +--> Metric pull-quote subcomponent (optional differentiator)
    +--> Stat row subcomponent (optional differentiator)

Gallery Category Component
    |
    +--> Reused 6 times with different asset arrays
    |
    +--> Image thumbnail subcomponent (next/image with caption)
    +--> Lightbox integration (yet-another-react-lightbox)
    +--> Optional: category anchor TOC

Lightbox (yet-another-react-lightbox)
    |
    +--> next/image integration (via custom render)
    +--> next/dynamic (lazy-load lightbox JS bundle until first click)
    +--> Keyboard focus management
    +--> ESC-to-close handler

Updated Navbar
    |
    +--> Must add anchor link for Case Studies + Creative Work
    +--> Must add anchor link for "What I Bring to the Table"
    +--> Active-section tracking (existing) must recognize new sections

Scroll-Reveal Animation (existing v1.0)
    |
    +--> Must continue to work on new sections without modification
    +--> Must respect prefers-reduced-motion
```

### Dependency Notes

- **Brand tokens must ship first:** Every new section depends on the color and typography tokens being defined. The token update (Phase 1 of v2.0 execution) is the blocker for everything else.
- **Case study component must be a single reusable component:** Two case studies with identical structure = one component, two data inputs. Copy-pasting markup is a maintenance trap.
- **Lightbox is deferred-loaded:** yet-another-react-lightbox recommends `next/dynamic` import so the lightbox JS (and CSS) only loads on first click. Keeps initial bundle lean.
- **Category anchor TOC depends on category IDs being assigned:** Each of the 6 gallery categories needs a stable anchor ID (`#signage`, `#instagram`, etc.) before anchor nav can point at them.
- **Navbar update must happen after new sections are in place:** Adding nav anchors to sections that don't exist yet creates broken links during development.

---

## Complexity Reference

| Feature | Complexity | Why |
|---------|------------|-----|
| Brand token rollout across all sections | MEDIUM | Mechanical but touches every component; easy to miss spots |
| Case study component (reusable, typed data) | LOW | Simple data-driven render; 5 prose blocks + optional stat row |
| Creative gallery with 6 categories + thumbnails | MEDIUM | 31 images need next/image wiring, aspect-ratio handling, caption rendering |
| Lightbox integration with keyboard + focus management | MEDIUM | yet-another-react-lightbox handles most of it; still requires testing |
| Hero metric cards | LOW | 3 static cards; styling work only |
| "What I Bring to the Table" skills block | LOW | Static copy from brief; list or card layout |
| Montserrat loading via next/font/google | LOW | One import line, add to font stack |
| Orange focus ring tokens | LOW | Tailwind utility + theme config |
| Mobile responsive verification across all new sections | MEDIUM | Each section needs testing at 320/768/1024/1440 breakpoints |

---

## Feature Prioritization (v2.0 Scope)

### Must Ship (v2.0 Launch)

- [ ] Brand token rollout (colors + typography) -- blocks everything
- [ ] Rebuilt Hero with brief-supplied copy + 3 metric cards
- [ ] Rewritten About Me with brief-supplied copy
- [ ] Case Study 1: UTD International Center (5-block structure)
- [ ] Case Study 2: Rio Jiu Jitsu (5-block structure)
- [ ] Creative Work gallery: 6 category sections, 31 assets with titles
- [ ] Click-to-enlarge lightbox on gallery items
- [ ] "What I Bring to the Table" skills section
- [ ] Redesigned Contact ("Let's Connect")
- [ ] Navbar updated with new section anchors
- [ ] Keyboard accessibility on lightbox (ESC, arrows, focus return)
- [ ] WCAG 2.2 AA contrast verification on DeepBlack theme

### Add If Time Permits (same milestone, P2)

- [ ] Case study metric pull-quote (mid-case-study visual break)
- [ ] Case study stat row (Role / Timeline / Headline Result)
- [ ] Gallery hover state with title reveal
- [ ] Gallery anchor TOC (mini nav within gallery section)
- [ ] Client/channel badges on gallery thumbnails
- [ ] Orange underline accent on section heading reveals

### Defer to v2.1 or Later

- [ ] Case study detail pages (only if >3 case studies accumulate)
- [ ] Gallery search/filter (only if asset count exceeds ~50)
- [ ] Branded 404 and loading states
- [ ] Dark/light mode toggle (never, unless accessibility need emerges)

---

## Pattern References From Real Portfolios

| Reference | Pattern Borrowed | Applied To v2.0 As |
|-----------|------------------|-------------------|
| Brittany Chiang (bchiang7.github.io) | Single-page scroll + section anchors + scroll-reveal + subtle animation | Already base pattern in v1.0 -- continue in v2.0 |
| Humbleteam (via Neue World roundup) | Black base + burnt orange accent, restrained use on CTAs and hover | Direct model for brand system restraint |
| Semplice / Format magazine-feature convention | Case study as prose with visual breaks (not card grids) | Case study 5-block structure as flowing prose |
| IxDF UX case study template | Hook + context + process + outcomes narrative | Aligns with brief's Description/Context/What I Did/Execution/Results |
| yet-another-react-lightbox Next.js example | Lightbox with next/image + next/dynamic | Direct dependency choice for gallery |
| Toptal designer portfolios | Hover caption reveal on gallery thumbnails | Differentiator pattern for gallery tiles |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Case study block structure (5-block prose) | HIGH | Brief specifies exact copy; convention confirmed by 4+ designer/marketer sources |
| Inline case studies vs dedicated pages (for 2 studies) | HIGH | 2 case studies is too few to justify routing overhead; convention confirmed |
| Gallery layout (uniform grid vs masonry) | HIGH | Uniform grid for brand calm + CLS + mixed aspect ratios, confirmed by 2026 gallery UX sources |
| Lightbox as gallery click-target | HIGH | Table-stakes for image galleries; yet-another-react-lightbox is current Next.js standard |
| No filter UI for 31-asset gallery | MEDIUM | Defensible on single-page grounds but filters are defensible too; evidence supports "stacked categories > filter" for this scale |
| Orange as restrained accent on DeepBlack | HIGH | Matches Humbleteam/Neue World references, color theory consensus (warm accent, cool base) |
| Anti-features (no video, no download, no CMS) | HIGH | Directly derived from project constraints and client-asset IP considerations |

---

## Sources

- [UX Case Study Template & Structure (2026 Guide) - uxfol.io](https://blog.uxfol.io/ux-case-study-template/)
- [How to Write UX/UI Design Case Studies - IxDF](https://ixdf.org/literature/article/how-to-write-great-case-studies-for-your-ux-design-portfolio)
- [4 Tips for Structuring Design Case Studies - UX Planet](https://uxplanet.org/4-tips-for-structuring-case-studies-in-your-design-portfolio-f7436fd460ec)
- [How To Write A Case Study For Your Design Portfolio - Format](https://www.format.com/magazine/resources/design/how-to-write-design-case-study)
- [Semplice - How to write case studies for your online portfolio](https://www.semplice.com/how-to-write-case-studies-for-your-portfolio)
- [27 Marketing Portfolio Examples - Copyfolio](https://blog.copyfol.io/marketing-portfolio-examples)
- [25 Marketing Portfolio Examples and Design Tips - Framer](https://www.framer.com/blog/marketing-portfolio-examples/)
- [Brittany Chiang Portfolio - bchiang7.github.io](https://bchiang7.github.io/)
- [15 Black and Orange Website Design Ideas for 2026 - Wavespace Agency](https://www.wavespace.agency/blog/black-and-orange-websites)
- [Inspiring Black and Orange Website Designs - Neue World](https://www.neue.world/journal/inspiring-black-and-orange-website-designs)
- [Top 20 Modern Color Combinations 2026 - Pro Design School](https://prodesignschool.com/design/top-20-modern-color-combinations-must-use-in-2026/)
- [Yet Another React Lightbox - Next.js example](https://yet-another-react-lightbox.com/examples/nextjs)
- [Yet Another React Lightbox - npm](https://www.npmjs.com/package/yet-another-react-lightbox)
- [Lightbox Accessibility (Keyboard Navigation) - Code: Accessible](https://codeaccessible.com/codepatterns/lightbox/)
- [Specification for an Accessible Lightbox - Coolfields Consulting](https://www.coolfields.co.uk/2011/12/specification-for-an-accessible-lightbox/)
- [Masonry Portfolio Gallery with Lightbox Preview - Redesignee](https://www.redesignee.com/items/masonry-portfolio-gallery-lightbox-preview/1584)
- [How To Create a Portfolio Gallery with Filtering - W3Schools](https://www.w3schools.com/howto/howto_js_portfolio_filter.asp)
- [All About Process: Dissecting Case Study Portfolios - Toptal](https://www.toptal.com/designers/ui/case-study-portfolio)
- [10 Exceptional Product Design Portfolios - DesignerUp](https://designerup.co/blog/10-exceptional-product-design-portfolios-with-case-study-breakdowns/)
- [Color Design Trends for 2026 - Sage Design Group](https://sagedesigngroup.biz/color-design-trends-for-2026-what-brands-designers-should-watch/)

---

*Feature research for: Harsha Vardhini Portfolio v2.0 (Brand Redesign & Creative Portfolio)*
*Researched: 2026-04-04*
