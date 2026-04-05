# Stack Research — v2.0 Brand Redesign & Creative Portfolio

**Domain:** Personal portfolio / creative gallery (milestone addition to existing Next.js 16 app)
**Researched:** 2026-04-04
**Confidence:** HIGH

## Scope

This research ONLY covers stack additions for milestone v2.0. The base stack (Next.js 16.2.2, React 19.2.4, Tailwind v4, shadcn/ui, motion 12.38.0, next/font Inter, Vercel + Fly.io) is already validated and deployed in v1.0. Nothing in that base stack is being replaced.

**New v2.0 requirements under investigation:**
1. Add Montserrat Bold as a display font alongside Inter
2. Migrate the Tailwind v4 `@theme` palette to DeepBlack/Orange/White
3. Render 31 design assets (29 PNG + 2 PDF) as a performant, categorised gallery
4. Optional lightbox for full-resolution viewing
5. Keep bundle size reasonable (portfolio is a job-hunt tool, must stay fast on mobile)

**Critical discovery upfront:** the raw design assets weigh **49 MB** across 31 files (largest PNG is 3.4 MB). Ship-as-is is not an option. Next.js Image optimization + static imports are mandatory, not optional.

**Second critical discovery:** `@base-ui/react@1.3.0` is **already installed** and ships a fully accessible `Dialog` primitive with portal/backdrop/focus-trap. No new lightbox dependency is needed unless advanced features (pinch-zoom, thumbnails strip) are explicitly desired.

## Recommended Stack Additions

### Core Additions (Required)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `next/font/google` Montserrat import | Bundled with Next.js 16.2.2 | Display heading font (brief specifies Montserrat Bold) | Same mechanism already used for Inter — self-hosted, zero layout shift, zero extra dependency. Montserrat ships as a **variable font on Google Fonts**, so a single file covers weight 100–900. Pair it with the existing Inter by exposing a second CSS variable (`--font-montserrat`) and using it from a `font-display` Tailwind utility. |
| Static imports for gallery images | Built into Next.js | Co-located design assets with automatic width/height/blurDataURL | When you `import img from "./foo.png"` and pass it as `<Image src={img}>`, Next.js auto-derives intrinsic dimensions AND generates a tiny `blurDataURL` for placeholder blur-up — no manual measurement, no CLS, no extra tooling. This is the single biggest DX win for a 31-asset gallery. |
| Tailwind v4 `@theme` palette update | 4.x (already installed) | Swap v1.0 muted-neutral tokens for DeepBlack/Orange/White | No new dependency. Just edit `globals.css`. Tailwind v4 reads `--color-*` variables from `@theme` and generates utility classes (`bg-brand-orange`, `text-brand-black`, etc.). OKLCH values computed in this doc. |

### Supporting Libraries (Optional)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@base-ui/react` Dialog (**already installed** as `@base-ui/react@^1.3.0`) | 1.3.0 | Accessible modal primitive for click-to-enlarge lightbox | **Default recommendation.** Already a transitive dep in this project. Exports `Dialog.Root`, `Dialog.Backdrop`, `Dialog.Portal`, `Dialog.Popup`, `Dialog.Close` — all headless and WCAG-compliant (focus trap, escape-to-close, scroll-lock). Wrap a `next/image` with `fill` inside `Dialog.Popup` for a minimal lightbox. Zero new KB added to the bundle. |
| `yet-another-react-lightbox-lite` | 1.x (latest on npm, ~5 KB gzip) | Pre-built lightbox with swipe/zoom/keyboard nav | **Only if** the brief escalates from "click to enlarge" to "carousel across all gallery items with zoom." 5 KB is small, but `@base-ui/react` Dialog is already paid-for and sufficient for a 6-category grouped gallery where users click one asset at a time. |
| `yet-another-react-lightbox` (full) | 3.30.1 (Mar 26 2026) | Lightbox with plugin ecosystem (thumbnails, zoom, captions, fullscreen, slideshow) | **Do not use on this project.** The full version supports React 19 and has Next.js Image integration docs, but its plugin set (thumbnails strip, fullscreen, slideshow) is overkill for a portfolio gallery where each asset has a title caption already rendered in the grid. Use only if you later build a multi-asset carousel with 50+ items. |

### Development / Config Additions

| Tool | Purpose | Notes |
|------|---------|-------|
| `sharp` (auto-installed by Next.js) | Runtime image optimization | Comes bundled with Next.js 16 — no manual install needed. Handles PNG → WebP/AVIF conversion, resize, blur placeholder generation. Already working because v1.0 uses `next/image` for the resume OG image. |
| `public/designs/` folder structure | Serve static PDFs and any hero-level previews | For the 2 PDFs (brochures), link to them from `/designs/` as plain `<a href="/designs/brochure.pdf" target="_blank">` — PDFs are not optimizable and should never be wrapped in `<Image>`. |

## Installation

```bash
# NO new dependencies required for the baseline plan.
# The recommended approach uses only what is already in package.json.

# Optional — ONLY if the baseline Dialog lightbox is judged insufficient
# during implementation:
npm install yet-another-react-lightbox-lite
```

Changes required in existing files (no package additions):

1. **`src/app/layout.tsx`** — add Montserrat import alongside Inter
2. **`src/app/globals.css`** — replace `@theme` color tokens with brand palette
3. **`public/designs/`** — copy the 2 PDFs (for direct link download)
4. **`src/assets/designs/`** — place 29 PNGs here for static imports (or a subfolder per category)
5. **`next.config.js`** — add `images.formats: ['image/avif', 'image/webp']` for modern format output

## Font Loading Pattern (`src/app/layout.tsx`)

```tsx
import { Inter, Montserrat } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['700', '800'], // only what the design needs — do NOT pull all 9 weights
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  )
}
```

**Why weight `['700', '800']` not the variable font axis:** Montserrat's static subsets are smaller per-weight than loading the full variable-axis file when only two weights are used. The brief says "Montserrat Bold" (700) for headings — anything heavier (800 ExtraBold) is a nice-to-have for the hero. Pulling 9 weights would add ~250 KB of unused font data. If the design later calls for 4+ weights, switch to the variable font by omitting the `weight` key.

## Tailwind v4 Theme Update (`src/app/globals.css`)

Replace the existing `@theme` block with the computed OKLCH values:

```css
@theme {
  /* Typography */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-montserrat), var(--font-inter), ui-sans-serif, sans-serif;

  /* Brand palette — Harsha v2.0 */
  --color-brand-black: oklch(0.1684 0 0);                /* #0F0F0F DeepBlack */
  --color-brand-orange: oklch(0.7009 0.2012 44.77);      /* #FF6A00 primary accent */
  --color-brand-orange-soft: oklch(0.7976 0.1404 58.86); /* #FFA559 hover/highlight */
  --color-brand-white: oklch(0.9821 0 0);                /* #F9F9F9 background */

  /* Semantic tokens mapped to brand palette */
  --color-background: var(--color-brand-white);
  --color-foreground: var(--color-brand-black);
  --color-accent: var(--color-brand-orange);
  --color-accent-hover: var(--color-brand-orange-soft);
  --color-muted: oklch(0.95 0 0);
  --color-muted-foreground: oklch(0.35 0 0);
  --color-card: oklch(1 0 0); /* pure white card on off-white background */
}
```

OKLCH values were computed directly from the hex codes using the OKLab color-space formulas (sRGB → linear RGB → LMS → OKLab → OKLCH). Chroma is zero for the neutrals because `#0F0F0F`, `#F9F9F9`, and `#FFFFFF` are pure greys in sRGB.

**Contrast check (manual, must re-verify in accessibility phase):**
- `#0F0F0F` on `#F9F9F9` → ~19:1 (far exceeds WCAG AA 4.5:1 for body, AAA 7:1 large)
- `#FF6A00` on `#F9F9F9` → ~3.4:1 (FAILS AA 4.5:1 for body text; PASSES 3:1 for large text/UI and non-text elements)
- `#FF6A00` on `#0F0F0F` → ~5.6:1 (passes AA body)

**Implication:** Orange on the off-white background must **only** be used for large headlines (18pt+ or 14pt+ bold), buttons/CTAs (where 3:1 UI contrast applies), icons, and accent strokes — **never body paragraphs**. Use black or a darkened orange (~`oklch(0.55 0.18 40)`) for orange-themed body text. Flag this for the accessibility phase.

## Gallery Image Pattern

The recommended pattern is a CSS Grid of `next/image` components with static imports, grouped by the 6 categories, with a `@base-ui/react` `Dialog` opened on click:

```tsx
// src/components/sections/CreativeWork.tsx
'use client'

import Image, { type StaticImageData } from 'next/image'
import { Dialog } from '@base-ui/react/dialog'
import { useState } from 'react'

// Static imports — Next.js resolves width/height/blurDataURL at build time
import igRealId from '@/assets/designs/instagram/pp-ig-real-id-post.png'
import igLastCall from '@/assets/designs/instagram/utdg-ig-last-call.png'
// ...29 more imports

type Asset = { src: StaticImageData; title: string; category: string }

const assets: Asset[] = [
  { src: igRealId, title: 'Real ID Post', category: 'Instagram Posts' },
  // ...
]

export function CreativeWork() {
  const [active, setActive] = useState<Asset | null>(null)

  return (
    <section aria-labelledby="creative-work-heading">
      {/* ...category-grouped grid... */}
      {assets.map((a) => (
        <button
          key={a.title}
          onClick={() => setActive(a)}
          className="group overflow-hidden rounded-md"
        >
          <Image
            src={a.src}
            alt={a.title}
            placeholder="blur"        // auto from static import
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="transition-transform group-hover:scale-105"
          />
          <figcaption className="mt-2 text-sm">{a.title}</figcaption>
        </button>
      ))}

      <Dialog.Root open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-brand-black/80" />
          <Dialog.Popup className="fixed inset-4 flex items-center justify-center">
            {active && (
              <Image
                src={active.src}
                alt={active.title}
                placeholder="blur"
                sizes="100vw"
                className="max-h-full w-auto"
              />
            )}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}
```

**Key Next.js 16 Image rules applied:**
- **`loading="lazy"` is the default** — no explicit prop needed. Images outside the viewport will not download until scrolled near.
- **`priority` was deprecated in Next.js 16.** Use `preload` instead for above-the-fold images. The gallery has no preloaded images — the Hero card images (if any) are the only candidates for `preload={true}`.
- **`sizes` attribute is mandatory** when using responsive CSS — without it Next.js assumes `100vw` and downloads the largest variant. For a 3-column desktop grid: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`.
- **Static imports automatically provide `blurDataURL`** (the tiny placeholder) — do not write manual blur data URLs.

## Why Not Store Images in `public/`

Two reasons:

1. **Static imports from `src/assets/` get automatic dimension inference and blurDataURL generation.** Files in `public/` are served verbatim — no build-time hashing, no intrinsic size detection, no blur placeholder unless you generate it manually.
2. **Long-term cache headers.** Files in `public/` get a short-TTL `Cache-Control`. Statically imported images get a content-hash in the filename and `Cache-Control: public, max-age=31536000, immutable`, per the bundled Next.js self-hosting docs.

**Exception:** the 2 PDFs **must** go in `public/designs/` since `next/image` cannot process PDFs. Link with plain `<a href="/designs/file.pdf" target="_blank" rel="noopener">`.

## Bundle-Size Impact Summary

| Addition | Bundle Cost | Notes |
|----------|------------|-------|
| Montserrat font (2 weights, latin subset) | ~40–60 KB WOFF2, self-hosted, cached | Similar to Inter's current footprint. Preloaded by `next/font` with `font-display: swap`. |
| Tailwind `@theme` palette change | 0 KB | Just CSS variable rewrites. |
| 31 design assets via `next/image` | **Net reduction vs shipping raw PNGs.** Originals = 49 MB. Next.js serves AVIF/WebP at viewport-appropriate widths → expect 200–400 KB per image at 800 px wide × optimized = ~5–10 MB total, lazy-loaded only when visible. The *initial page load* adds zero gallery weight because lazy loading delays download until scroll. | |
| `@base-ui/react` Dialog | 0 KB NEW | Already installed. Tree-shakes unused primitives. |
| No lightbox library | 0 KB | Avoided ~5 KB (lite) or ~40 KB (full) gzipped. |

**Total JS bundle delta vs v1.0:** expected < 5 KB gzipped for the Dialog import (already paid for) + gallery component code. Font file delta is ~50 KB cached WOFF2.

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Static imports from `src/assets/designs/` | Files in `public/designs/` | If Harsha wants to swap assets without a rebuild (e.g. via a future CMS). For a portfolio with fixed content, static imports are strictly better. |
| `@base-ui/react` Dialog lightbox | `yet-another-react-lightbox-lite` (~5 KB gzip) | If click-to-enlarge evolves into a full carousel across all 31 items with swipe gestures and zoom. Lite version supports React 18+, has keyboard/touchpad/touchscreen nav and built-in zoom. |
| `@base-ui/react` Dialog lightbox | `yet-another-react-lightbox` (full, v3.30.1) | Only if thumbnails strip, slideshow, fullscreen plugin, or caption overlay plugins are needed. Overkill for a 31-asset grouped gallery with titles already visible. |
| Montserrat via `next/font/google` with `weight: ['700', '800']` | Montserrat variable font (same import, omit `weight`) | Switch to variable if the design adds 4+ display weights later. For now, 2 static weights is smaller on the wire. |
| Native HTML `<dialog>` element | `@base-ui/react` Dialog | `<dialog>` is baseline-supported in 2026 but requires more imperative code for close-on-outside-click, focus restore, scroll-lock, and React state sync. Base UI wraps all of this. |
| CSS Grid gallery layout | `react-photo-album` / masonry library | Only if the design calls for a true masonry (variable-height rows that pack like Pinterest). The brief describes "6 categories with titles" which is a uniform grid — CSS Grid is free and accessible. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `react-image-lightbox` | Unmaintained since 2020. Uses class components. No React 18/19 support. | `@base-ui/react` Dialog (already installed) or `yet-another-react-lightbox-lite` |
| `priority` prop on `<Image>` | **Deprecated in Next.js 16.** | `preload={true}` for LCP images, or rely on default `loading="lazy"` for gallery items |
| Wrapping PDFs in `<Image>` | `next/image` only supports jpg/png/webp/avif/gif/svg. PDFs will break the build. | Plain `<a href="/designs/file.pdf" target="_blank" rel="noopener">` link |
| Raw Google Fonts `<link>` tag | Render-blocking, external request, FOUT/FOIT, violates same policy that already chose `next/font` in v1.0 | `next/font/google` Montserrat import (same pattern as Inter) |
| Loading Montserrat with all 9 weights (100–900) | Adds ~250 KB of unused font files; hurts LCP on mobile | `weight: ['700', '800']` — only what the design uses |
| `loading="eager"` on gallery images | Forces all 31 images to download on page load regardless of viewport position. Catastrophic for LCP. | Default `loading="lazy"` (omit the prop) |
| Manual `blurDataURL` generation for static imports | Already auto-generated by Next.js at build time | Just use `placeholder="blur"` with static imports |
| Storing originals in `public/` without optimization | 49 MB of raw PNGs would blow Fly.io bandwidth and Vercel free-tier budget | Static imports → runtime AVIF/WebP conversion via `sharp` |
| `framer-motion` package name | Renamed to `motion` (already correct in v1.0). Importing from `framer-motion` will fail. | Keep using `motion/react` — already correct in `AnimatedSection.tsx` |

## Stack Patterns by Variant

**If the gallery grows beyond 50 assets later:**
- Switch to `yet-another-react-lightbox-lite` for carousel navigation between items
- Consider route-based pagination or a dedicated `/work/[slug]` page per asset
- Evaluate `react-photo-album` if masonry layout is needed

**If the design adds 4+ display font weights:**
- Switch Montserrat to the variable-font import (omit `weight` entirely)
- Keep Inter static (body text uses at most 400/500/600/700)

**If contrast fails WCAG AA on orange-themed text during the accessibility audit:**
- Darken the accent to ~`oklch(0.55 0.18 40)` (hex approx `#D45500`) for body-text usage
- Reserve the brand `#FF6A00` strictly for headlines ≥24 px bold and UI elements (buttons, borders)

**If site deploys to Fly.io (existing) and image optimization memory spikes:**
- Next.js 16 self-hosting docs note sharp may need `SHARP_IGNORE_GLOBAL_LIBVIPS=1` on glibc Linux
- Verify in execution phase against the existing `fly.toml` / Dockerfile

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `next@16.2.2` | `next/font/google` Montserrat | Works. `next/font` ships bundled; any Google Fonts family name is supported. |
| `next@16.2.2` | `@base-ui/react@1.3.0` Dialog | Works. Base UI is React 18/19 compatible and already resolves in this project. |
| `next@16.2.2` | `yet-another-react-lightbox-lite` | Works (React 18+ peer). The lite version does not explicitly list React 19 in its peer deps but the full sibling (v3.30.1) does, and the two share an author and codebase lineage. **Confidence: MEDIUM** on the lite version being fully React 19 tested — verify by `npm install --dry-run` before adopting. |
| `tailwindcss@4.x` | OKLCH color values in `@theme` | Works. Tailwind v4 ships with full OKLCH support in the color engine. |
| `sharp` (bundled) | Fly.io Linux/glibc | Works but may need `SHARP_IGNORE_GLOBAL_LIBVIPS=1` env var. |
| `motion@12.38.0` | Gallery grid stagger animation | Works. `staggerChildren` via `variants` prop enables the scroll-reveal wave for 31 cards. Already used in `AnimatedSection.tsx`. |

## Answers to Downstream Questions

**Q1: Montserrat + Inter pairing via next/font — confirmed?**
YES. Import both from `next/font/google`, expose two CSS variables (`--font-inter`, `--font-montserrat`), apply both classNames to the `<html>` element, and reference them from Tailwind utilities (`font-sans` for body, `font-display` for headings). No new dependencies. Pattern is identical to the existing Inter setup.

**Q2: Lightbox library — needed?**
NO, **not required**. `@base-ui/react@1.3.0` (already in package.json) ships a `Dialog` primitive that is fully sufficient for click-to-enlarge behaviour on gallery assets. Use `Dialog.Root` + `Dialog.Backdrop` + `Dialog.Portal` + `Dialog.Popup`. If the milestone later demands swipe-to-advance-between-assets, add `yet-another-react-lightbox-lite` (~5 KB gzip, MIT) — but start without it.

**Q3: Next.js Image best practices for 31 local PNGs?**
- Place assets under `src/assets/designs/` (NOT `public/`) and use static ES imports
- Always pass `sizes` attribute to avoid over-fetching on mobile
- Default `loading="lazy"` is perfect for a gallery — do not override
- Use `placeholder="blur"` (blurDataURL auto-generated from static import)
- Use `preload={true}` sparingly and ONLY for the hero LCP image (the word `priority` is deprecated in Next.js 16)
- Add `images.formats: ['image/avif', 'image/webp']` to `next.config.js`

**Q4: What NOT to add?**
- No `react-image-lightbox` (abandoned)
- No `framer-motion` rename import (already using `motion/react`)
- No full `yet-another-react-lightbox` (v3 with plugin ecosystem is overkill for this scope)
- No masonry library (CSS Grid handles uniform gallery layouts)
- No `priority` prop on any `<Image>` (deprecated in Next.js 16)

## Sources

- **Bundled Next.js 16.2.2 docs** (authoritative, shipped with the project per `AGENTS.md` instruction):
  - `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` — static imports, blurDataURL, local vs remote
  - `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` — Google Fonts multi-font pattern, variable vs static weights
  - `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` — `preload` replaces `priority`, `loading="lazy"` default, `sizes` attribute rules
  - `node_modules/next/dist/docs/01-app/02-guides/self-hosting.md` — sharp config on Fly.io/glibc
  - Confidence: **HIGH** (authoritative, version-matched)
- **`@base-ui/react@1.3.0` installed `package.json` + `dialog/` directory listing** — verified Dialog primitive is present locally
  - Confidence: **HIGH**
- **[npm: yet-another-react-lightbox](https://www.npmjs.com/package/yet-another-react-lightbox)** — v3.30.1 (March 26 2026), MIT, React 16.8+/17/18/19
  - Confidence: **HIGH**
- **[yet-another-react-lightbox-lite GitHub](https://github.com/igordanchenko/yet-another-react-lightbox-lite)** — ~5 KB gzip, React 18+, MIT, actively maintained (122 commits)
  - Confidence: **MEDIUM** (explicit React 19 peer-dep claim not verified in lite README; inferred from sibling package)
- **[yet-another-react-lightbox Next.js integration docs](https://yet-another-react-lightbox.com/examples/nextjs)** — confirms `next/dynamic` + `next/image` pattern, note about Zoom plugin not working with `next/image`
  - Confidence: **HIGH** (official library docs)
- **[Montserrat on Google Fonts](https://fonts.google.com/specimen/Montserrat)** + **[Montserrat GitHub repo](https://github.com/JulietaUla/Montserrat)** — 9 static weights + variable font, latin subset
  - Confidence: **HIGH**
- **OKLCH conversion** — computed directly using OKLab formulas (sRGB → linear RGB → LMS cube-root → OKLab → OKLCH polar), verified against expected zero-chroma for pure greys
  - Confidence: **HIGH**
- **Design asset inventory** — `find` on `.planning/design-references/My Designs/` confirmed 31 files (29 PNG + 2 PDF), 49 MB total, across 6 category folders
  - Confidence: **HIGH** (direct filesystem inspection)
- **[yet-another-react-lightbox Releases](https://github.com/igordanchenko/yet-another-react-lightbox/releases)** — latest v3.30.1 on 2026-03-26
  - Confidence: **HIGH**

---
*Stack research for: v2.0 Brand Redesign & Creative Portfolio milestone*
*Researched: 2026-04-04*
