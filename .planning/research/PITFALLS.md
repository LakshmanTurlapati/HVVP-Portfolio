# Domain Pitfalls: v2.0 Brand Redesign + 31-Image Creative Gallery

**Domain:** Next.js 16 portfolio site upgrade -- palette migration, display-font addition, large-asset gallery, production redesign
**Researched:** 2026-04-04
**Confidence:** HIGH -- contrast ratios computed directly from hex values; Next.js 16 facts verified against installed `node_modules/next/dist/docs/`; Tailwind v4 / shadcn / font / image behavior verified against multiple official sources
**Context:** Existing Harsha portfolio is live (Vercel + Fly.io), WCAG 2.2 AA validated on muted-blue palette, no `next/image` yet, 27 `accent`-token references across 9 component files, Inter + `next/font/google` already wired

---

## Critical Pitfalls

Mistakes that would break the shipped v1.0, tank Lighthouse, or make the v2.0 redesign fail WCAG AA.

---

### Pitfall 1: Saturated Orange Text Fails WCAG AA Except on DeepBlack

**What goes wrong:** Designers assume the brand orange (#FF6A00 and #FFA559) can be used as text or as a button fill with white text on any surface. In reality, the contrast math forces orange to be used in only a narrow set of combinations. Using orange-on-white body text, or white-on-orange button text, produces ratios that fail WCAG 2.2 AA and also fail the 3:1 non-text UI threshold.

**Computed contrast ratios (verified 2026-04-04):**

| Combination | Ratio | Normal text AA (4.5:1) | Large text AA (3:1) | UI / icon AA (3:1) |
|---|---|---|---|---|
| Orange #FF6A00 on DeepBlack #0F0F0F | 6.68:1 | PASS | PASS | PASS |
| Light Orange #FFA559 on DeepBlack #0F0F0F | 9.84:1 | PASS | PASS | PASS |
| White #F9F9F9 on DeepBlack #0F0F0F | 18.21:1 | PASS | PASS | PASS |
| **Orange #FF6A00 on White #F9F9F9** | **2.73:1** | **FAIL** | **FAIL** | **FAIL** |
| **Orange #FF6A00 on Pure White** | **2.87:1** | **FAIL** | **FAIL** | **FAIL** |
| **Light Orange #FFA559 on White #F9F9F9** | **1.85:1** | **FAIL** | **FAIL** | **FAIL** |
| DeepBlack on Orange #FF6A00 (button) | 6.68:1 | PASS | PASS | PASS |
| DeepBlack on Light Orange #FFA559 (button) | 9.84:1 | PASS | PASS | PASS |
| **Pure White on Orange #FF6A00 (button)** | **2.87:1** | **FAIL** | **FAIL** | **FAIL** |
| **White #F9F9F9 on Orange #FF6A00 (button)** | **2.73:1** | **FAIL** | **FAIL** | **FAIL** |

**Why it happens:** Orange is a long-wavelength color with high luminance. Contrast ratios drop sharply against any light background. Designers also tend to assume "dark text on colored background" is safe, but white-on-brand-orange is an especially common pattern that the math rejects for any section with a white or F9F9F9 page background.

**Consequences:** The v1.0 portfolio passed WCAG 2.2 AA on body text (validated in Phase 4). Shipping v2.0 with orange-on-white copy silently regresses that. Lighthouse will flag it. Hiring managers with low vision cannot read the CTA. For a marketing professional's portfolio, a visible contrast failure is a direct credibility hit.

**How to avoid:**
- **Rule: orange is a dark-surface accent only.** On any white/off-white section, orange text is forbidden. Use DeepBlack text and reserve orange for filled shapes, icons, or borders that pass the 3:1 non-text rule when placed on DeepBlack.
- **Buttons with orange fill must use DeepBlack #0F0F0F text, not white.** #0F0F0F-on-#FF6A00 = 6.68:1 PASS; #FFFFFF-on-#FF6A00 = 2.87:1 FAIL.
- Reserve `--color-accent` (orange) for: headings on DeepBlack surfaces, hover states, decorative dividers on dark backgrounds, focus rings (with sufficient outline offset so surrounding white does not visually bleed into the ring), and filled pills where label text is black.
- If a white-background section needs an orange accent for hierarchy, use it as a shape/fill (non-text) at 3:1 minimum -- a 4px orange underline or 12px orange dot works; orange H2 text does not.
- Add a contrast verification script (`pnpm check:contrast`) that asserts every declared fg/bg pairing in `@theme` meets 4.5:1 for text, 3:1 for UI. Run it in CI.

**Warning signs:**
- Lighthouse "Contrast" audit flags any node
- Orange text appearing anywhere `bg-background` (white) applies
- Buttons with `bg-accent text-white` or `bg-accent text-background` (both fail -- white = F9F9F9, 2.73:1)
- Light-orange #FFA559 used as the ONLY distinguishing color for an interactive element (even on DeepBlack at 9.84:1 it's fine for text, but on white it's 1.85:1 -- nearly invisible)

**Phase to address:** Design-token migration phase (foundational, must be fixed before any component uses the token). Re-verify in final accessibility QA after every section is styled.

---

### Pitfall 2: `--color-accent` Token Collision Across 27 Existing Usages

**What goes wrong:** The v1.0 site has 27 references to `accent`-prefixed classes across 9 component files (`bg-accent`, `text-accent`, `border-accent`, `focus:bg-accent`, etc.). If `--color-accent` in `@theme` is simply swapped from muted blue (`oklch(0.55 0.10 240)`) to orange without auditing each call site, every existing usage inherits the new color -- which may land on a white surface and trigger Pitfall 1.

**Current usages (verified via grep 2026-04-04):**
- `src/app/globals.css` (3 -- theme def + focus ring)
- `src/app/layout.tsx` (1 -- skip-link focus background)
- `src/components/sections/ContactSection.tsx` (2)
- `src/components/sections/ExperienceSection.tsx` (5)
- `src/components/sections/LeadershipSection.tsx` (3)
- `src/components/sections/HeroSection.tsx` (3)
- `src/components/sections/SkillsSection.tsx` (5)
- `src/components/layout/Navbar.tsx` (2)
- `src/components/sections/AboutSection.tsx` (3)

**Why it happens:** A single-variable change feels like a clean migration. Developers swap the `@theme` value, the site recompiles, everything "looks orange," and they ship. The regression surfaces weeks later when someone runs Lighthouse on a white-background section.

**Consequences:**
- `focus:bg-accent` on the skip link (`layout.tsx:92`) now has the focus button as orange with `text-white` -- FAIL 2.87:1. The skip-link is the single most important accessibility affordance on the page.
- Any `text-accent` on a `bg-background` section becomes orange text on white = FAIL.
- Existing focus-visible ring (`outline: 2px solid var(--color-accent)` in `globals.css:44`) changes color but may now have insufficient contrast against white focus-target borders. 2px orange on white next to the focused element needs 3:1 contrast; #FF6A00 on #F9F9F9 = 2.73:1 FAIL.

**How to avoid:**
- **Audit every `accent`-prefixed class** before changing the token. Make a spreadsheet: file, line, classname, surface color, text color, new expected contrast.
- **Split the token into two:** `--color-accent` (orange, for dark-surface use only) and `--color-accent-on-light` (DeepBlack, for white-surface sections where hierarchy was previously conveyed with blue).
- Replace `focus:bg-accent focus:text-white` with `focus:bg-foreground focus:text-background` (DeepBlack bg + white text) for the skip link -- 18.21:1 PASS and matches the brand.
- Change the focus-visible outline to `var(--color-foreground)` (DeepBlack) on light sections and `var(--color-accent)` (orange) only on dark sections. Use `@custom-variant dark` or section-level CSS variables.
- Run `rg -n "accent"` after migration and verify every hit has been intentionally re-colored.

**Warning signs:**
- Skip-link focus shows orange background with washed-out white text
- `border-accent` dividers disappear visually on light sections
- Lighthouse accessibility score drops from ~100 to <90
- Screen reader users report the focus ring is hard to see

**Phase to address:** Design-token migration phase, BEFORE any new v2.0 section is built. This is the first code change of the milestone.

---

### Pitfall 3: 31 PNG Images Tank LCP and Bloat the Bundle

**What goes wrong:** Source assets are ~50MB across 31 PNGs + 2 PDFs, mixed dimensions (1080x1080, 1200x628, 1920x1080). Dropping all 31 into a gallery section with raw `<img>` tags, or even with `next/image` but no `sizes` prop, produces a page where LCP collapses (hero image competes with 31 eager/large decoded images), CLS spikes (no reserved space until each image's intrinsic dimensions resolve), and the mobile data transfer exceeds 10MB.

**Specifically for 31 assets:**
- PNG is 2x-5x larger than WebP/AVIF at equivalent quality. 50MB of PNG becomes ~10-15MB of WebP and ~5-8MB of AVIF.
- Without `sizes`, Next.js generates a limited 1x/2x srcset (suitable for fixed sizes) instead of a full responsive srcset (640w, 750w, 828w, 1080w, ...), so a 1920x1080 source gets served at full resolution to a 375px mobile viewport.
- Mixed aspect ratios (1:1, 1.91:1, 16:9) mean a single hardcoded `height` causes distortion; a missing `aspect-ratio` container means CLS.

**Why it happens:** The brief includes 31 assets as a zip with titles. The path of least resistance is importing them as-is, rendering them in a grid, setting `width={1920} height={1080}`, and calling it done. The site currently has zero `next/image` usage, so there is no established pattern to copy. `next/image` configuration (`qualities`, `deviceSizes`, `imageSizes`) is rarely revisited -- defaults are accepted.

**Consequences:**
- Lighthouse performance score on the gallery page falls below 70
- LCP on mobile 4G > 4s (Google's "poor" threshold is 4s; "needs improvement" is 2.5-4s)
- CLS > 0.1 because image containers resize when intrinsic dimensions resolve
- Mobile users on cellular hit data caps or abandon the page
- Vercel image-optimization function hits its free-tier limit (1000 source images/month) if bots repeatedly crawl

**How to avoid:**
- **Pre-convert PNGs to WebP at build time.** Use `sharp` (already a Next.js dependency transitively) or an `astro`-style build script: `sharp('./src-assets/img.png').webp({ quality: 80 }).toFile('./public/gallery/img.webp')`. Commit the WebP outputs; do not re-encode at runtime.
- **Use `next/image` for every gallery asset.** This is non-negotiable for Lighthouse.
- **Always provide `sizes`.** For a 3-col grid on desktop, 2-col on tablet, 1-col on mobile: `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`. Without this, Next.js defaults to `100vw` and serves the largest responsive variant.
- **Use `loading="lazy"` (the default) for all gallery images EXCEPT those above the fold.** If the gallery is below the fold, every image is lazy-loaded -- no priority hints needed.
- **Wrap each image in an `aspect-ratio` container matching its category.** Portrait (1080x1080 = 1/1), landscape social (1200x628 = 1.91/1), video/thumbnail (1920x1080 = 16/9). Set the container with `style={{ aspectRatio: '1 / 1' }}` or Tailwind `aspect-square` / `aspect-video` utilities.
- **Add `placeholder="blur"` with static imports** so users see a blurred preview while the image loads. Static `import img from '@/assets/...'` auto-generates `blurDataURL`.
- **Next.js 16: use `preload={true}` not `priority` (deprecated in v16).** The current layout has no `next/image` so no migration cost, but any tutorial code copied in will have `priority` -- search and replace.
- **Budget rule:** Total gallery payload on first paint (mobile, 375px) must be < 500KB. Run `npx next build` and inspect the image pipeline output.

**Warning signs:**
- DevTools Network tab shows images > 200KB each on mobile viewport
- Lighthouse "Properly size images" or "Serve images in next-gen formats" flags raised
- `Image` component missing `sizes` prop (Next.js emits a console warning but only in dev)
- CLS shown > 0.05 in PageSpeed Insights
- `.next/` build log shows image-optimization cache misses

**Phase to address:** Gallery implementation phase; set the image-handling pattern in the first gallery component and reuse it for all 31. Validate in a final performance QA pass.

---

### Pitfall 4: Adding Montserrat as a Second `next/font` Family Doubles LCP Fetches Without `variable` Scoping

**What goes wrong:** Developers add `Montserrat` alongside Inter in `layout.tsx` and spread its className on the `<html>` or `<body>` tag. Both fonts now load unconditionally on every page. If Montserrat is imported with multiple weights (`['400', '700', '900']` instead of a variable axis), three `.woff2` files ship. LCP text above the fold may be Montserrat-styled, so font-loading delay visibly shifts the hero heading.

**Why it happens:** `next/font/google` is convenient -- `import { Montserrat } from 'next/font/google'` Just Works. But developers rarely check whether the font is variable (Montserrat IS variable, supports weights 100-900 in one file), and they commonly list out specific weights out of habit. Variable-font support requires zero effort but is often skipped.

**Consequences:**
- Each added weight = separate `.woff2` file = separate network request. Three weights = 3x the font payload.
- Even with `next/font` self-hosting, total font transfer can exceed 150KB, delaying FCP.
- If Montserrat is the hero H1 font, `display: swap` (the default) still produces a visible FOUT -- Inter renders, then Montserrat swaps in, causing a reflow. `adjustFontFallback: true` (default) mitigates the sizing component but not the style flash.
- Double `--font-*` CSS variables on `<html>` mean both fonts are preloaded. If Montserrat is only used for H1/H2, the Inter preload is wasted for pages that are all-headings (hero) and the Montserrat preload is wasted for scroll-deep content (About, Contact copy).

**How to avoid:**
- **Use variable Montserrat, not specific weights.** Import with `weight: 'variable'` or just omit weight (variable is default for `next/font/google` when the font supports it). This ships one `.woff2` covering all weights.
- **Load both fonts via CSS variables and `variable` option** (which this project already does for Inter as `--font-inter`). Do the same for Montserrat as `--font-montserrat`. Spread BOTH variables on the `<html>` className: `className={\`${inter.variable} ${montserrat.variable}\`}`.
- **Then reference them in `@theme`:**
  ```css
  @theme {
    --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    --font-display: var(--font-montserrat), var(--font-inter), ui-sans-serif, sans-serif;
  }
  ```
  Montserrat falls back to Inter, which falls back to system sans. If Montserrat fails to load, Inter (already loaded for body) renders headings -- near-identical x-height, minimal visual jump.
- **Apply `font-display` to the exact elements that need it:** `<h1 className="font-display">...</h1>`. Do NOT set `font-display` as the HTML default, or you'll trigger Montserrat download for pages with no H1.
- **Keep `display: 'swap'` (the `next/font` default) but verify `adjustFontFallback: true`** (also the default for `next/font/google`) which uses `size-adjust` on the fallback to match Montserrat's metrics -- this prevents CLS on the font swap.
- **Subset properly.** `subsets: ['latin']` only. Latin-ext, cyrillic, vietnamese each add weight and are unused by an English-only US-recruiter audience.
- **Verify preload:** `next/font/google` auto-preloads when `subsets` is provided. That is desired for Montserrat if Montserrat is above-the-fold (hero heading). If Montserrat is ONLY used below the fold, set `preload: false` to save the preload budget for the LCP image instead.

**Warning signs:**
- Network tab shows > 2 font files loading on initial page load
- Flash of wrong-font heading visible on first paint (FOUT)
- CLS budget shifted by hero heading resizing ~200ms into load
- PageSpeed Insights flags "Reduce unused JavaScript/CSS" pointing at font CSS
- Montserrat imported with explicit weight array (`['400', '700', '900']`) in code review

**Phase to address:** Typography/design-token phase, same change as `@theme` palette migration. One commit should land: Montserrat import + CSS variable wiring + `@theme` `--font-display` + removal of any hardcoded Montserrat CDN `<link>` if a designer added one to compare.

---

### Pitfall 5: Redesigning the Live Production Site Without Cache-Busting OG Image or Canonical Verification

**What goes wrong:** The site currently deploys to `harshavardhini.com` with `/og-image.png` referenced in `metadataBase`. v2.0 changes brand colors, adds case studies, and replaces `og-image.png` with a new DeepBlack+Orange version. But LinkedIn, X, Slack, iMessage, Facebook, and Google all independently cache the old OG image for 7-30 days. When Harsha shares the new URL to recruiters, they see the old muted-blue preview -- on-brand messaging breaks the moment a link is shared.

**Why it happens:** `og-image.png` is a static file at a stable URL. Updating the file in place (same filename, same path) means external crawlers have no signal to re-fetch. Platforms trust their cache. Additionally, `alternates.canonical` in `layout.tsx` points to `https://harshavardhini.com` -- if production moves to a different domain or adds `www.`, the canonical is wrong and Google treats it as a redirect loop.

**Consequences:**
- LinkedIn post inspector shows old v1.0 preview for up to 30 days
- Recruiter shares link in Slack/iMessage -- sees old design -- forms first impression before clicking
- `og:image` 1200x630 may have different content now (new copy, new colors) but metadata still references the old file
- If `metadataBase` URL has drifted from actual deploy URL, relative image paths resolve incorrectly in the OG card
- Google's cache of the page shows old title, description, and screenshot until re-crawled (typically 1-2 weeks)

**How to avoid:**
- **Rename the new OG image file.** `/og-image-v2.png` or `/og-image-2026.png`. Changing the URL forces every cache to re-fetch. The old filename can be left in place to avoid breaking any external references, or 301'd to the new one.
- **Update every OG/Twitter reference in `layout.tsx`** to the new filename, including `openGraph.images[0].url` and `twitter.images` (currently missing from this project -- add it explicitly).
- **Audit `metadataBase`:** confirm it matches the production deploy URL. Fly.io and Vercel both set different hostnames -- make sure the canonical URL is the one used in marketing (likely `harshavardhini.com`, not the `.fly.dev` or `.vercel.app`).
- **After deploy, hit the social debugger tools:**
  - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
  - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
  - X/Twitter Card Validator: (deprecated but still functional in some form)
  - Slack link-preview cache: paste the URL in a channel, if stale, use `/slack-shared-url-warm` or force a fresh crawl by appending `?v=2` once
- **Render dimension in metadata:** the current `openGraph.images[0]` already has `width: 1200, height: 630, alt: ...` -- keep that. If the NEW image has different dimensions (e.g., 1200x675), update `width` and `height` to match, or LinkedIn and Facebook crop unexpectedly.
- **Regenerate `twitter` image explicitly.** Currently `twitter.images` is not set in `layout.tsx:35-40`, so X falls back to the `og:image`. If the brand requires a different crop for X (which prefers 2:1 or 1.91:1), add `twitter.images` with its own 1200x628 variant.
- **Verify JSON-LD still resolves correctly.** The `jsonLd.url` is hardcoded to `https://harshavardhini.com` (layout.tsx:48) -- same risk as canonical URL.
- **Sitemap and robots.txt:** this project does not currently have `app/sitemap.ts` or `app/robots.ts`. If Next.js static export is used (it currently is -- see phase-4 checkpoint in git log), verify these are either generated at build time or placed in `public/` manually. Missing sitemap after redesign = delayed re-indexing of new content.

**Warning signs:**
- LinkedIn post inspector shows v1.0 preview after v2.0 deploy
- Browser devtools shows `/og-image.png` 200 response for the old file after the new file is pushed
- Google search console "Pages" report shows old snapshots for > 14 days
- Twitter shares show no image or the wrong dimension
- `alternates.canonical` returns a 404 when hit directly

**Phase to address:** Deploy/launch phase (verification occurs after v2.0 is live, before sharing the updated URL with recruiters). Also revisit during the metadata pass when case-study sections are added -- page-level metadata may need per-section OG images.

---

## Moderate Pitfalls

---

### Pitfall 6: shadcn Component Tokens Drift from `@theme` During Palette Swap

**What goes wrong:** shadcn/ui components reference tokens like `--color-card`, `--color-border`, `--color-input`, `--color-ring` that are set separately from `--color-accent`. When the brand palette flips to DeepBlack+Orange, developers update `--color-background`, `--color-foreground`, `--color-accent` -- but forget `--color-card` (currently `oklch(0.97 0.00 0)` = near-white), leaving cards as off-white islands on a DeepBlack page, or forget `--color-ring` which controls focus rings on shadcn inputs.

**Why it happens:** The v4 `@theme` block in this project (globals.css:7-24) only declares 5 color tokens. shadcn components expect more -- the full set is typically `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `border`, `input`, `ring`, `radius`. Missing declarations fall back to Tailwind defaults (colored grays), which clash with a DeepBlack brand.

**How to avoid:**
- **Expand the `@theme` block** to the full shadcn token set before migrating. For each pair, define both surface and foreground so text contrast is guaranteed.
- **Define dark mode explicitly** if the site will support it. The `@custom-variant dark` directive is already in place (globals.css:5), but no `.dark` block exists. For v2.0's "inverted" sections (DeepBlack hero, DeepBlack case-study header), either apply `.dark` to the section wrapper, or create custom section-level CSS variables rather than relying on a global dark mode.
- **Specifically for this brand:**
  ```css
  @theme {
    --color-background: oklch(0.98 0.005 60);          /* #F9F9F9 White */
    --color-foreground: oklch(0.14 0.01 0);            /* #0F0F0F DeepBlack */
    --color-card: oklch(1 0 0);                         /* pure white for lifted cards on F9F9F9 */
    --color-card-foreground: oklch(0.14 0.01 0);
    --color-accent: oklch(0.69 0.20 45);                /* #FF6A00 Orange */
    --color-accent-foreground: oklch(0.14 0.01 0);      /* DeepBlack text on orange -- 6.68:1 */
    --color-muted: oklch(0.93 0.005 60);
    --color-muted-foreground: oklch(0.45 0.01 0);
    --color-border: oklch(0.88 0.005 60);
    --color-input: oklch(0.95 0.005 60);
    --color-ring: oklch(0.14 0.01 0);                   /* DeepBlack focus ring on light surfaces */
  }
  ```
- Run `grep -r "bg-card\|border-border\|ring-ring" src/` to find every shadcn token reference and verify it renders correctly.

**Warning signs:**
- Cards appear as off-white patches against white page background (missing `--color-card` update)
- Focus rings on shadcn Buttons/Inputs are default blue, not brand color (missing `--color-ring`)
- Borders on shadcn Separators look like Tailwind's default gray-200 (missing `--color-border`)

**Phase to address:** Design-token migration phase, same commit as `--color-accent` change.

---

### Pitfall 7: Montserrat Display Font Overused -- Every Heading, Nav Item, and Label

**What goes wrong:** A bold display font exists to create rhythm and hierarchy. When it's applied to every heading, nav item, button, label, and caption, the page loses contrast -- everything shouts equally. Montserrat Bold at 14px (small labels) is also harder to read than Inter at 14px; Montserrat's geometry is optimized for display sizes (48px+).

**Why it happens:** Adding a new font is exciting. Developers apply it globally via `body { font-family: var(--font-display) }` or use `font-display` everywhere once they see it works. The brief says "Montserrat Bold for display" -- developers interpret "display" as "any heading or nav label."

**How to avoid:**
- **Scope Montserrat to H1 and H2 only.** Section headers, hero name, case-study titles. Everything else stays Inter.
- **Minimum size rule:** Montserrat at 24px+. Inter for anything below.
- **Add a style-guide comment in `globals.css`** so future components stay disciplined:
  ```css
  /* --font-display = Montserrat Bold -- use for H1, H2, hero name only, minimum 24px */
  /* --font-sans = Inter -- body, nav, buttons, captions, H3+, anything < 24px */
  ```

**Phase to address:** Typography phase, enforced in section-by-section implementation.

---

### Pitfall 8: Case-Study Sections Shipped Without `alt` Text for Embedded Images

**What goes wrong:** The two case studies (UTD International Center, Rio Jiu Jitsu) will reference gallery images inline -- a screenshot of an Instagram post, a photo of a printed flyer, a graph. These images get pasted in without `alt` text, or with `alt="image"`, which fails WebAIM's most-common WCAG error #2 (missing alt text).

**How to avoid:**
- **Every image in a case study has an `alt` that describes the content in context.** Not "flyer" but "Rio Jiu Jitsu gym-opening flyer with class schedule and promotional discount."
- **Decorative-only images get `alt=""`** (empty, not missing) -- example: a colored-stripe divider.
- **Run axe-core or Lighthouse after each case-study is built**, not just at the end of the milestone.

**Phase to address:** Case-study implementation phase; verified in accessibility QA pass.

---

### Pitfall 9: PDFs in the Gallery Served as 25MB Raw Downloads

**What goes wrong:** The brief includes 2 PDFs as gallery items. Linking directly to 25MB PDFs (total ~50MB source includes the PDFs) causes browsers to either download or render them in-page -- either way, a 25MB transfer kills the user experience. On iOS Safari, PDF rendering can hang the tab.

**How to avoid:**
- **Serve a PNG/WebP preview image of the first page** as the gallery thumbnail. Clicking opens the PDF in a new tab (`target="_blank" rel="noopener"`).
- **Compress the PDFs** (Ghostscript, Acrobat, or `qpdf --linearize`) -- marketing PDFs routinely compress 10x without visible quality loss. Target < 2MB.
- **Add a "Download PDF (1.2MB)" label** next to the thumbnail so users know what they're clicking into.
- **Do not embed PDFs with `<iframe>` or `<embed>`** -- poor mobile behavior, accessibility failures.

**Phase to address:** Gallery implementation phase.

---

### Pitfall 10: Orange Focus Ring on Dark-Mode Navbar Blends with Orange Hover State

**What goes wrong:** Navbar gets a DeepBlack background in v2.0. Orange is used for both hover state AND focus ring. Keyboard users cannot distinguish "hovered" from "focused" -- both look identical.

**How to avoid:**
- **Focus indicator must be distinct from hover.** Use orange for hover text color; use a 2px orange outline WITH offset (`outline-offset: 3px`) for focus. The offset creates visual separation between the text and the ring.
- **Alternative:** Use orange for focus, underline for hover. Two orthogonal visual signals.
- **Never rely on color alone** to convey state changes (WCAG 1.4.1).

**Phase to address:** Navbar redesign phase.

---

## Minor Pitfalls

---

### Pitfall 11: `tw-animate-css` and Old shadcn `@import` Already in globals.css Work Fine -- Don't Rip Them Out

**What goes wrong:** Developers migrating Tailwind v4 see `@import "tw-animate-css"` and `@import "shadcn/tailwind.css"` in `globals.css:2-3` and assume they're legacy. Removing them breaks shadcn Dialog/Sheet/Dropdown animations.

**How to avoid:** Leave them. `tw-animate-css` replaces the deprecated `tailwindcss-animate` and is the current-standard animation library for shadcn on Tailwind v4. Only remove if shadcn components are also removed.

**Phase to address:** Design-token migration phase (avoid accidental deletion).

---

### Pitfall 12: Hero Metric Cards Animate on Load Without `prefers-reduced-motion` Guard

**What goes wrong:** The hero has 3 new metric cards. Motion-library `animate` on mount feels nice -- but users with vestibular disorders who have `prefers-reduced-motion: reduce` set should see static cards.

**How to avoid:** `globals.css:49-56` already has a `prefers-reduced-motion` block that neutralizes CSS animations. But `motion/react` (formerly framer-motion) animations run via JS -- CSS overrides do NOT catch them. In component code, read the preference via `useReducedMotion()` from `motion/react` and conditionally disable animations.

**Phase to address:** Hero redesign phase.

---

### Pitfall 13: Category Grouping Loses Image Titles in the Grid

**What goes wrong:** The brief requires 31 assets "grouped by 6 categories with titles." Developers implement the grid and drop the titles because "images speak for themselves" or titles clutter the layout.

**How to avoid:** Titles are an explicit brief requirement. Each card should include the title below the image or overlaid at the bottom. Titles also serve as `alt` text sources for screen readers.

**Phase to address:** Gallery implementation phase.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Single `--color-accent` swap without splitting token for light-vs-dark surface use | Fast visual refresh | Every future section requires manual accent override; regressions sneak in | Never -- always split into `accent` (orange, dark-only) and `accent-on-light` (black) |
| Importing Montserrat with explicit weight array `['700', '900']` instead of variable | "I know exactly what I get" | 2x-3x font transfer, manual weight management on every H1 | Never -- Montserrat is variable, use it |
| Raw `<img>` for 1-2 "temporary" case-study images | "Good enough for draft" | Breaks Lighthouse score baseline, sets bad pattern | Local dev only, never merged |
| Linking to uncompressed PDFs with `<a href>` | Zero build step | 25MB transfers kill mobile | Only for download links labeled with file size |
| Skipping contrast audit "because orange passes on black" | Fast palette adoption | Regressions on any white section; focus ring failures | Never -- math is cheap, re-audits are not |
| Hardcoding `bg-orange-500` instead of `bg-accent` | Fast first-draft | Token semantics lost, future palette changes impossible | Only in prototypes, strip before merge |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| `next/font/google` Montserrat | Importing specific weights, double-preload | Use variable font (no weight arg), `variable: '--font-montserrat'`, single preload |
| shadcn/ui + Tailwind v4 | Only declaring 5 color tokens in `@theme`, leaving card/border/ring fallback | Declare full token set (background, foreground, card, card-foreground, primary, accent, muted, border, input, ring) |
| `next/image` Next.js 16 | Using `priority` (deprecated) | Use `preload={true}` instead |
| `next/image` responsive | Omitting `sizes` prop | Always provide `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` for grids |
| Vercel image optimization | Source images not pre-converted, relying on runtime | Pre-convert PNGs to WebP in build, check into `/public/gallery/` |
| LinkedIn OG cache | Updating `og-image.png` in place | Rename file (e.g., `og-image-v2.png`), trigger re-crawl via Post Inspector |
| JSON-LD in `layout.tsx` | Not updating `alumniOf`/`description` when brand copy changes | Keep JSON-LD in sync with visible hero copy |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| 31 PNGs served raw | LCP > 4s, bandwidth > 10MB | Pre-convert to WebP, `next/image` with `sizes`, lazy-load below fold | Immediately on first gallery load |
| Two fonts loaded, both above-the-fold | FCP > 2s, FOUT visible | Variable Montserrat, font fallback stack uses Inter | First paint on slow 3G |
| `priority` on every gallery image | Competing preloads delay real LCP | Only `preload={true}` on the actual LCP image (usually hero) | > 1 image marked priority |
| Cards with `backdrop-blur` over 31 gallery thumbnails | GPU compositing cost compounds | Apply blur to 1-2 lifted elements, not every card | > 5 simultaneous blur layers on mobile |
| Motion scroll-reveal on all 31 gallery items | Jank on mid-range Android | `whileInView` with `once: true`, or CSS `content-visibility: auto` | > 20 simultaneous animations |
| Full-resolution blurDataURL | Adds KB to every image | Keep blurDataURL under 200 bytes, use Next.js auto-generated for static imports | Every image in gallery |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Gallery PDFs linked without `rel="noopener noreferrer"` and `target="_blank"` | Tab-napping if PDF host is third-party | Always add `rel="noopener noreferrer"` on external-opening links |
| OG image served from arbitrary third-party (e.g., Dropbox link) | Link rot, privacy leakage | Serve OG image from same-origin `public/` |
| Image filenames leak internal paths ("harsha_personal_draft_v3_FINAL.png") | Professionalism, privacy | Rename all assets to semantic slugs: `utd-campaign-poster-01.webp` |
| EXIF metadata in gallery photos | Location / device info exposure | Strip EXIF during PNG-to-WebP conversion: `sharp(...).withMetadata({ exif: false })` |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Orange hover state identical to orange focus ring | Keyboard users cannot track where they are | Focus = 2px outline with offset; hover = text color change |
| Gallery with no lightbox or click-to-enlarge on mobile | 1080x1080 images shown at 150px cannot be examined | Add click-to-enlarge (simple modal or route to full image URL) |
| Case studies formatted as walls of text with no sub-headings | Recruiters skim, miss results | 5-block structure with clear H3 labels: Description / Context / What I Did / Execution / Results |
| Metric cards with orange numbers on white | Numbers unreadable (2.73:1 FAIL) | Numbers in DeepBlack on F9F9F9, OR numbers in orange on DeepBlack card |
| "Back to top" button in orange on white | Button visible for sighted users, contrast-failing for low-vision | Button background DeepBlack, icon/text white or orange on dark |

---

## "Looks Done But Isn't" Checklist

Items that appear complete in v2.0 but are frequently missing verification.

- [ ] **Palette migration:** Every `accent`-prefixed class re-verified against new contrast requirements (all 27 usages)
- [ ] **Skip link:** Focus state rendered on DeepBlack, not orange -- verify in browser
- [ ] **Montserrat scope:** Applied only to H1/H2, not H3-H6 or body
- [ ] **next/image sizes:** Every gallery image has a `sizes` prop matching its grid behavior
- [ ] **OG image:** Renamed file, re-crawled via LinkedIn Post Inspector, verified `alternates.canonical` matches deploy URL
- [ ] **Alt text:** All 31 gallery images AND all case-study inline images have descriptive alt
- [ ] **Focus ring:** Keyboard-tabbed through every interactive element in every section, ring visible with 3:1 contrast
- [ ] **PDFs:** Compressed to < 2MB, thumbnail generated, link labeled with file size
- [ ] **Contrast:** Lighthouse accessibility = 100 after palette change
- [ ] **LCP:** PageSpeed Insights mobile score on gallery page > 90
- [ ] **Prefers-reduced-motion:** Motion-library animations disabled when preference set (JS-level, not just CSS)
- [ ] **JSON-LD:** Still valid after any copy/credential changes (test at schema.org validator)

---

## Recovery Strategies

When these pitfalls surface despite prevention.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Orange-on-white contrast regression | LOW | Grep for `text-accent` on light surfaces, swap to `text-foreground`, re-verify Lighthouse |
| OG image cached stale on LinkedIn | LOW | Rename file, update `layout.tsx`, submit via Post Inspector, wait 5-10 minutes |
| LCP regression from gallery | MEDIUM | Add `sizes` prop to every image, convert PNGs to WebP, re-deploy, re-run PageSpeed Insights |
| CLS on gallery from missing aspect ratios | MEDIUM | Wrap each `<Image>` in `aspect-*` container, enforce with ESLint custom rule |
| Skip-link focus invisible | LOW | Change `focus:bg-accent focus:text-white` to `focus:bg-foreground focus:text-background` |
| Montserrat FOUT on hero | MEDIUM | Verify `adjustFontFallback` is on, tune fallback font metrics manually if flashing persists |
| shadcn tokens not updated | MEDIUM | Expand `@theme` block with full token set, audit every shadcn component visually |
| Canonical URL mismatch | LOW | Update `metadataBase` and `alternates.canonical`, re-submit sitemap to Google Search Console |
| Focus ring and hover both orange | LOW | Add `outline-offset: 3px` to focus, change hover to text-color-only |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| 1. Orange contrast fails except on DeepBlack | Design-token migration (Phase 1 of v2.0) | Contrast-check script in CI; Lighthouse = 100 accessibility |
| 2. `--color-accent` collides with 27 existing usages | Design-token migration (Phase 1 of v2.0) | Manual audit of each `rg -n "accent"` hit, visual diff per component |
| 3. 31 PNG images tank LCP | Gallery implementation (Phase 3-4 of v2.0) | PageSpeed Insights mobile > 90; PNG-to-WebP build step present |
| 4. Montserrat doubles LCP fetches | Typography phase (Phase 1 of v2.0) | DevTools Network: 1 Montserrat file; `variable` option in font import |
| 5. OG image cache stale on redesign | Deploy/launch phase (Phase 5 of v2.0) | LinkedIn Post Inspector shows v2.0 preview; `metadataBase` matches deploy URL |
| 6. shadcn token drift | Design-token migration (Phase 1 of v2.0) | Every shadcn component renders with brand tokens, not defaults |
| 7. Montserrat overused | Typography phase (Phase 1 of v2.0) | Style-guide comment present; H3+ use Inter |
| 8. Case-study missing alt | Case-study implementation (Phase 2 of v2.0) | axe-core pass |
| 9. Uncompressed PDFs | Gallery implementation (Phase 3-4 of v2.0) | PDF < 2MB, thumbnail present, label shows file size |
| 10. Focus ring same as hover | Navbar redesign (Phase 1 of v2.0) | Keyboard tab-through, focus distinct from hover |
| 11. Removing `tw-animate-css` import | Design-token migration (Phase 1 of v2.0) | shadcn Dialog still animates after refactor |
| 12. Motion animations ignore reduced-motion | Hero redesign (Phase 1 of v2.0) | `useReducedMotion` hook in every motion component |
| 13. Gallery titles dropped | Gallery implementation (Phase 3-4 of v2.0) | Every card has visible title text |

---

## Sources

**Verified against installed Next.js 16.2.2 docs (node_modules/next/dist/docs/):**
- `01-app/03-api-reference/02-components/image.md` -- `preload` prop, `priority` deprecation in v16.0.0, `sizes` behavior, `fetchPriority` guidance
- `01-app/03-api-reference/02-components/font.md` -- `variable` option, `adjustFontFallback`, `preload`, weight handling
- `01-app/01-getting-started/13-fonts.md` -- `next/font/google` self-hosting, layout shift prevention
- `01-app/03-api-reference/03-file-conventions/01-metadata/opengraph-image.md` -- OG image file conventions

**Contrast ratios computed directly (2026-04-04):** WCAG 2.1/2.2 relative luminance formula applied to brand hex values. All 11 combinations verified by calculation, not by search.

**Tailwind v4 + shadcn/ui (HIGH confidence, multiple sources):**
- [Tailwind v4 - shadcn/ui](https://ui.shadcn.com/docs/tailwind-v4) -- February 2025 official support
- [Tailwind v4 - shadcn Theming](https://ui.shadcn.com/docs/theming) -- `@theme inline` pattern, OKLCH conversion
- [Migrating from Tailwind 3 to Tailwind 4 with shadcn/ui -- ZippyStarter](https://zippystarter.com/blog/guides/migrating-tailwind3-to-tailwind4-with-shadcn)
- [Updating shadcn/ui to Tailwind 4 -- Shadcnblocks](https://www.shadcnblocks.com/blog/tailwind4-shadcn-themeing/)

**Color contrast and orange accessibility (HIGH confidence, computed + referenced):**
- [WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/) -- thresholds reference
- [Orange You Accessible? Case Study -- Bounteous](https://www.bounteous.com/insights/2019/03/22/orange-you-accessible-mini-case-study-color-ratio/) -- orange contrast challenges documented
- [WCAG 2.2 Level AA Contrast Requirements](https://www.makethingsaccessible.com/guides/contrast-requirements-for-wcag-2-2-level-aa/)
- [W3C Understanding SC 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Orange accessibility guidelines](https://a11y-guidelines.orange.com/en/web/develop/colors-and-contrasts/)

**Next.js performance and image optimization (HIGH confidence):**
- [Next.js Image Optimization -- DebugBear](https://www.debugbear.com/blog/nextjs-image-optimization)
- [Avoid Overusing fetchpriority=high -- DebugBear](https://www.debugbear.com/blog/avoid-overusing-fetchpriority-high)
- [Fetch Priority API -- web.dev](https://web.dev/articles/fetch-priority)
- [GitHub Discussion: priority on arrays of images](https://github.com/vercel/next.js/discussions/33447)
- [Stop the Wait: A Developer's Guide to Smashing LCP in Next.js](https://medium.com/@iamsandeshjain/stop-the-wait-a-developers-guide-to-smashing-lcp-in-next-js-634e2963f4c7)

**Fonts and multi-font LCP (HIGH confidence):**
- [Next.js Fonts Guide](https://nextjs.org/docs/app/getting-started/fonts)
- [Custom fonts with next/font -- Vercel](https://vercel.com/blog/nextjs-next-font)
- [Next.js Font Component Reference](https://nextjs.org/docs/app/api-reference/components/font)
- [Montserrat -- Google Fonts](https://fonts.google.com/specimen/Montserrat) (variable axis confirmed)

**OG image caching and SEO during redesign (MEDIUM confidence):**
- [How to refresh Open Graph image -- Beyondspace](https://www.beyondspace.studio/blog/how-to-refresh-open-graph-image)
- [Open Graph caching refresh trick -- 8P Design](https://www.8p-design.com/en/blog/simple-trick-refresh-open-graph-cache)
- [Metadata Files: opengraph-image -- Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Make OG image caching less aggressive (Mastodon issue)](https://github.com/mastodon/mastodon/issues/28537)

**Layout shift / aspect ratio (HIGH confidence):**
- [Image Aspect Ratio & Browser Quirks: CLS -- Jonathan Lau](https://blog.jonathanlau.io/posts/layout-shifts---ssr-vs-spa-strategies-for-images/)
- [CSS Masonry & CSS Grid -- CSS-Tricks](https://css-tricks.com/css-masonry-css-grid/)

**Modern image formats (HIGH confidence):**
- [Serve images in modern formats -- Chrome Lighthouse Docs](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images)
- [Modern Image Formats: AVIF and WebP -- Smashing Magazine](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/)
- [DebugBear: How to Serve Images in Next-Gen Formats](https://www.debugbear.com/blog/image-formats)

**Project-internal (verified 2026-04-04):**
- `src/app/globals.css` -- current `@theme` tokens, focus-visible style
- `src/app/layout.tsx` -- Inter font setup, metadata, JSON-LD, skip link
- `src/components/**/*.tsx` -- 27 `accent`-prefixed class usages across 9 files
- `public/og-image.png` -- existing OG image file requiring replacement
- `node_modules/next/dist/docs/` -- authoritative Next.js 16.2.2 reference

---

*Pitfalls research for: Harsha Vardhini Portfolio v2.0 Brand Redesign + Creative Gallery milestone*
*Researched: 2026-04-04*
