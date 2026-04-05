# Architecture Research -- v2.0 Brand Redesign & Creative Portfolio

**Domain:** Next.js 16 App Router single-page portfolio (additive milestone, not greenfield)
**Researched:** 2026-04-04
**Confidence:** HIGH (based on direct inspection of the existing codebase + Next.js 16 behavior)

> This research is INTEGRATION-focused. It answers: how do the new v2.0 sections and 31 image assets slot into the existing architecture without breaking Phase 1-4 validated work.

---

## Current System Overview (v1.0 -- what exists today)

```
+---------------------------------------------------------------+
|                     app/layout.tsx                             |
|    (Inter font, metadata, JSON-LD, <Navbar/>, <Footer/>)       |
+--------------------------+------------------------------------+
                           |
                           v
+---------------------------------------------------------------+
|                      app/page.tsx                              |
|           (AnimatedSection wrapper x 6 sections)               |
+--------------------------+------------------------------------+
                           |
         +-----------------+-----------------+
         v                 v                 v
   +-----------+    +-------------+   +----------------+
   | sections/ |    |   layout/   |   |  AnimatedSec   |
   |  (6 RSC)  |    | Navbar,Footr|   | (client,motion)|
   +-----+-----+    +------+------+   +----------------+
         |                 |
         v                 v
   +-----------+    +----------------+
   |  data/    |    |  hooks/        |
   | (7 *.ts)  |    | useActiveSec   |
   +-----+-----+    +----------------+
         v
   +-----------+
   |  types/   |
   | index.ts  |
   +-----------+
```

### Existing Component Inventory (inspected, verified)

| Location | File | Type | Client/Server | Status in v2.0 |
|----------|------|------|---------------|----------------|
| `src/app/` | `layout.tsx` | Root layout | Server | MODIFY (keep Inter, add Montserrat) |
| `src/app/` | `page.tsx` | Page | Server | MODIFY (reorder sections) |
| `src/app/` | `globals.css` | Tailwind v4 theme | -- | MODIFY (@theme tokens) |
| `src/components/` | `AnimatedSection.tsx` | Wrapper | Client (motion) | KEEP (reuse for new sections) |
| `src/components/layout/` | `Navbar.tsx` | Nav | Client (state, IO) | MODIFY (NAV_LINKS array) |
| `src/components/layout/` | `Footer.tsx` | Footer | Server | KEEP |
| `src/components/sections/` | `HeroSection.tsx` | Section | Server | REBUILD (new copy + 3 metrics) |
| `src/components/sections/` | `AboutSection.tsx` | Section | Server | REBUILD (new copy) |
| `src/components/sections/` | `ExperienceSection.tsx` | Section | Server | RETIRE or SUPPRESS (superseded by case studies) |
| `src/components/sections/` | `SkillsSection.tsx` | Section | Server | REPLACE with "What I Bring to the Table" |
| `src/components/sections/` | `LeadershipSection.tsx` | Section | Server | RETIRE (not in v2.0 brief) |
| `src/components/sections/` | `ContactSection.tsx` | Section | Server | REBUILD ("Let's Connect") |
| `src/components/ui/` | `button.tsx` + `button-variants.ts` | shadcn/base-nova | Client (Base UI primitive) | KEEP -- token-driven, will inherit new palette |
| `src/hooks/` | `useActiveSection.ts` | Hook | Client | KEEP (section-id-agnostic, re-queries DOM) |
| `src/lib/` | `utils.ts` | `cn()` helper | -- | KEEP |
| `src/data/` | `hero.ts`, `about.ts`, `experience.ts`, `skills.ts`, `leadership.ts`, `contact.ts`, `education.ts` | Typed data | -- | REBUILD hero/about/contact, ADD new files |
| `src/types/` | `index.ts` | Type contracts | -- | EXTEND (new interfaces, keep old) |
| `public/` | `og-image.png`, `resume.pdf` | Static assets | -- | KEEP + ADD 31 assets |

### Existing Data Pattern (verified)

Every data file follows the same shape:

```typescript
// src/data/hero.ts (existing pattern)
import type { HeroData } from '@/types'
export const heroData: HeroData = { /* ... */ }
```

Every section component consumes its own data:

```typescript
// src/components/sections/HeroSection.tsx (existing pattern)
import { heroData } from '@/data/hero'
export default function HeroSection() { /* uses heroData */ }
```

**This is the contract to preserve.** All new sections MUST follow:
1. One typed interface in `src/types/index.ts`
2. One data export in `src/data/[name].ts`
3. One server component in `src/components/sections/[Name]Section.tsx` that imports the data

---

## Integration Question 1: Data Model Design (NEW case studies + gallery)

### Case Study Data Model (fits 5-block structure from brief)

Add to `src/types/index.ts`:

```typescript
export interface CaseStudyBlock {
  heading: string       // "Description" | "Context" | "What I Did" | "Execution" | "Results"
  body: string          // Paragraph copy
  bullets?: string[]    // Optional supporting points (Execution/Results commonly use these)
}

export interface CaseStudyData {
  slug: string          // "utd" | "rio" (used in section id="case-study-{slug}")
  title: string         // "UTD International Center Campaign"
  client: string        // "UTD International Center"
  role: string          // "Marketing and Communications Assistant"
  timeframe: string     // "Mar 2025 - Present"
  heroImage?: string    // Optional /case-studies/utd/hero.png for visual anchor
  blocks: [
    CaseStudyBlock,     // Description
    CaseStudyBlock,     // Context
    CaseStudyBlock,     // What I Did
    CaseStudyBlock,     // Execution
    CaseStudyBlock,     // Results
  ]
  metrics?: Metric[]    // Reuse existing Metric interface from v1.0
}
```

**Why a single `CaseStudyData` type (not separate per study):** The brief specifies "5-block structure" as a repeat pattern. One type + two data exports = one component renders both.

**File layout:**
```
src/data/
  caseStudyUtd.ts          # export const caseStudyUtd: CaseStudyData = {...}
  caseStudyRio.ts          # export const caseStudyRio: CaseStudyData = {...}
```

### Gallery Data Model (31 assets across 6 categories with titles)

**Verified asset inventory** from `.planning/design-references/My Designs/`:

| Category | Count | Notes |
|----------|-------|-------|
| Instagram Posts | 10 PNG | Social campaign posts |
| LinkedIn Posts | 7 PNG | LinkedIn organic content |
| Printables | 6 (4 PNG + 2 PDF) | Posters, brochures, thank-you cards |
| LinkedIn Ads | 4 PNG | Paid social ads |
| Digital Signage | 2 PNG | Campus signage |
| LinkedIn Events | 2 PNG | Event banners |
| **Total** | **31 files** | Matches brief |

Add to `src/types/index.ts`:

```typescript
export type GalleryCategoryId =
  | 'instagram-posts'
  | 'linkedin-posts'
  | 'printables'
  | 'linkedin-ads'
  | 'digital-signage'
  | 'linkedin-events'

export interface GalleryAsset {
  id: string              // Stable slug: "pp-ig-real-id-post"
  title: string           // "Real ID Post" (stripped of [PP][IG] prefixes)
  category: GalleryCategoryId
  src: string             // Public path: "/gallery/instagram-posts/real-id.png"
  alt: string             // Required -- accessibility
  width: number           // Required for next/image
  height: number          // Required for next/image
  client?: string         // Decoded from prefix: "PP", "UTDG", "IC", "ISSO", "OIE", "II"
  fileType: 'png' | 'pdf' // PDFs in Printables are not next/image-optimizable
}

export interface GalleryCategory {
  id: GalleryCategoryId
  label: string           // "Instagram Posts"
  description?: string
  assets: GalleryAsset[]
}

export interface GalleryData {
  categories: GalleryCategory[]
}
```

**Why title is a required field (not derived from filename):** The brief explicitly says "asset titles." Filenames use cryptic prefixes (`[PP][IG] Real ID Post.png`) that recruiters should not see. Titles must be hand-curated.

**File layout:**
```
src/data/
  gallery.ts              # export const galleryData: GalleryData = {...}
```

### "What I Bring to the Table" Data Model

Brief-supplied copy, static structure:

```typescript
export interface ValuePropItem {
  heading: string         // e.g. "Brand Strategy"
  body: string            // Short paragraph
  icon?: string           // Lucide icon name (optional)
}

export interface ValuePropData {
  sectionTitle: string    // "What I Bring to the Table"
  items: ValuePropItem[]
}
```

File: `src/data/valueProp.ts`

### Updated `HeroData` (no breaking type change)

The brief says "3 metric cards" (was 5 in v1.0). The `Metric` interface stays the same; only the data file changes:

```typescript
// src/data/hero.ts (v2.0)
export const heroData: HeroData = {
  name: 'Harsha Vardhini Veeravalli Prabu',
  tagline: '[brief-supplied]',
  availability: '[brief-supplied]',
  metrics: [ /* 3 items, not 5 */ ],
  ctaResume: 'Download Resume',
  ctaContact: "Let's Connect",  // copy change
}
```

The `HeroData` TYPE does not need to change -- `metrics` is `Metric[]`, so shortening to 3 is a data-only change. **No breaking type change.**

---

## Integration Question 2: Image Asset Location

### Recommendation: `public/gallery/[category-slug]/[asset-slug].png`

**Verdict:** Place in `public/`, not `src/assets/`.

### Justification (verified with Next.js 16 behavior)

**Two image-handling approaches in Next.js 16:**

| Approach | Path | Trade-off |
|----------|------|-----------|
| **Static import** | `import img from '@/assets/foo.png'` then `<Image src={img} />` | Width/height auto-extracted at build time. Blur placeholder auto-generated. BUT: all imports bundled; requires bundler plugin; adds build-time coupling |
| **Public path** | `<Image src="/gallery/foo.png" width={1080} height={1080} />` | Must declare width/height manually. Fully static; served from `/public/`. Works with `output: "standalone"` (already configured in `next.config.ts`) |

**Why `public/` wins for this project:**

1. **`output: "standalone"` is already configured** (see `next.config.ts:4`). Standalone mode copies `public/` directly into the Docker/Fly deployment. Static-import bundling adds unnecessary webpack overhead for a 31-asset portfolio.

2. **31 assets with predictable dimensions** -- most are social media posts at known aspect ratios (1080x1080 Instagram, 1200x627 LinkedIn). Width/height is not a mystery; hand-coding it is trivial.

3. **2 files are PDFs** (`Pre-Master's Pathway Brochure`, `Brochure Refined`). PDFs cannot be processed by `next/image` under any approach. They need `public/` paths for direct download/view anyway -- splitting images across two locations is worse than unified in `public/`.

4. **LCP is unaffected** -- `next/image` with a `public/` path still produces `<picture>` tags with AVIF/WebP variants and lazy-loading.

5. **Mental model is simpler** -- "put the file in `public/`, reference the path" is one rule. "Some go in `src/assets/` with import, some in `public/`, PDFs special-cased" is three rules.

**One exception:** Hero background imagery or above-the-fold decorative illustrations that rarely change -- static import would get blur placeholders for free. Not applicable to this milestone's scope.

### Recommended Directory Layout

```
public/
|-- og-image.png                    # (existing -- keep)
|-- resume.pdf                      # (existing -- keep)
|-- gallery/
|   |-- instagram-posts/
|   |   |-- real-id.png             # was [PP][IG] Real ID Post.png
|   |   |-- last-call-deadline.png  # was [UTDG][IG] Last Call Deadline Reminder Post.png
|   |   |-- francisco-dinner.png
|   |   |-- port-of-entry-webinar.png
|   |   |-- pizza-plagiarism.png
|   |   |-- townhall-meeting.png
|   |   |-- seasons-greeting.png
|   |   |-- black-history-month.png
|   |   |-- dir-lunch.png
|   |   |-- slice-of-study-abroad.png
|   |-- linkedin-posts/
|   |   |-- weeks-of-welcome.png
|   |   |-- welcome-back-to-campus.png
|   |   |-- hispanic-heritage-month.png
|   |   |-- raising-cans.png
|   |   |-- womens-equality-day.png
|   |   |-- study-abroad.png
|   |   |-- international-youth-day.png
|   |-- linkedin-ads/
|   |   |-- pre-masters-pathway-1.png
|   |   |-- scholarships-1.png
|   |   |-- scholarships-2.png
|   |   |-- scholarships-3.png
|   |-- linkedin-events/
|   |   |-- lets-talk-event.png
|   |   |-- pre-masters-pathway-event.png
|   |-- digital-signage/
|   |   |-- arrive-and-thrive.png
|   |   |-- study-abroad-signage.png
|   |-- printables/
|       |-- iew-poster.png
|       |-- donor-thank-you-cards.png
|       |-- independence-day-poster.png
|       |-- juneteenth-poster.png
|       |-- pre-masters-pathway-brochure.pdf
|       |-- brochure-refined.pdf
|-- case-studies/                   # NEW (optional, only if hero images used)
    |-- utd/
    |   |-- hero.png
    |-- rio/
        |-- hero.png
```

**Filename rules applied:**
- Bracket prefixes stripped from display filenames
- Kebab-case throughout (Next.js deploys are case-sensitive on Linux -- avoid whitespace/apostrophes/parentheses)
- Original prefix codes (`PP`, `UTDG`, `IC`, `ISSO`, `OIE`, `II`) preserved as `client` field in `GalleryAsset`

---

## Integration Question 3: Section Order, Navbar Links, Section IDs

### Current v1.0 section contract (section IDs were LOCKED -- but milestone can break the lock)

Per the `src/app/page.tsx:2` comment: *"Section IDs are LOCKED -- do not rename after Phase 2 begins."* This is because three things depend on section IDs:

1. `<section id="...">` elements in each section component
2. `NAV_LINKS` in `Navbar.tsx` with `href="#..."`
3. `useActiveSection` Intersection Observer querying `document.querySelectorAll("section[id]")`

**The lock was for v1.0 stability.** A new MILESTONE is explicitly a place to revise this contract. The v2.0 section lineup differs structurally (case studies, gallery, value prop), so IDs MUST change. The discipline: change in lockstep across all three places.

### Recommended v2.0 Section Order + IDs

| Order | Section | ID | Source Component | Status |
|-------|---------|----|----|--------|
| 1 | Hero | `hero` | `HeroSection.tsx` | REBUILD -- keep ID |
| 2 | About | `about` | `AboutSection.tsx` | REBUILD -- keep ID |
| 3 | Case Study 1 (UTD) | `case-study-utd` | `CaseStudySection.tsx` (new) | NEW |
| 4 | Case Study 2 (Rio) | `case-study-rio` | `CaseStudySection.tsx` (new) | NEW |
| 5 | Creative Work Gallery | `gallery` | `GallerySection.tsx` (new) | NEW |
| 6 | What I Bring to the Table | `value-prop` | `ValuePropSection.tsx` (new) | NEW |
| 7 | Contact | `contact` | `ContactSection.tsx` | REBUILD -- keep ID |

**IDs kept:** `hero`, `about`, `contact` (they still exist conceptually).
**IDs retired:** `experience`, `skills`, `leadership` (components are retired or replaced).
**IDs added:** `case-study-utd`, `case-study-rio`, `gallery`, `value-prop`.

### Navbar Update

In `src/components/layout/Navbar.tsx:8-15`, replace `NAV_LINKS`:

```typescript
// v2.0 navbar links
const NAV_LINKS = [
  { id: "hero",             label: "Home"        },
  { id: "about",            label: "About"       },
  { id: "case-study-utd",   label: "UTD"         },  // short labels -- 7 items fit desktop
  { id: "case-study-rio",   label: "Rio"         },
  { id: "gallery",          label: "Work"        },
  { id: "value-prop",       label: "Approach"    },
  { id: "contact",          label: "Contact"     },
] as const
```

**Label tradeoff:** 7 nav items will not fit on narrow desktop without truncation if labels are long. Short labels ("UTD," "Rio," "Work," "Approach") keep the bar readable. The mobile hamburger can tolerate longer labels if desired. Alternative: collapse both case studies into one "Case Studies" anchor that jumps to the first -- but this loses the active-section highlight for the second.

**Verified:** `useActiveSection` hook (`src/hooks/useActiveSection.ts:9`) queries `document.querySelectorAll("section[id]")` with no hardcoded IDs -- so adding/removing sections requires ZERO hook changes. The hook discovers IDs at mount.

### page.tsx Update (NEW section ordering)

```typescript
// src/app/page.tsx (v2.0)
import AnimatedSection from '@/components/AnimatedSection'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import CaseStudySection from '@/components/sections/CaseStudySection'
import GallerySection from '@/components/sections/GallerySection'
import ValuePropSection from '@/components/sections/ValuePropSection'
import ContactSection from '@/components/sections/ContactSection'
import { caseStudyUtd } from '@/data/caseStudyUtd'
import { caseStudyRio } from '@/data/caseStudyRio'

export default function Home() {
  return (
    <>
      <AnimatedSection><HeroSection /></AnimatedSection>
      <AnimatedSection><AboutSection /></AnimatedSection>
      <AnimatedSection><CaseStudySection data={caseStudyUtd} /></AnimatedSection>
      <AnimatedSection><CaseStudySection data={caseStudyRio} /></AnimatedSection>
      <AnimatedSection><GallerySection /></AnimatedSection>
      <AnimatedSection><ValuePropSection /></AnimatedSection>
      <AnimatedSection><ContactSection /></AnimatedSection>
    </>
  )
}
```

**`CaseStudySection` takes a `data` prop.** This is a deliberate break from the v1.0 pattern where each section imports its own singleton data. Reason: two case studies share one component -- coupling the data source to the component breaks reuse. The section derives its `id` from `data.slug`:

```typescript
// src/components/sections/CaseStudySection.tsx (new)
export default function CaseStudySection({ data }: { data: CaseStudyData }) {
  return <section id={`case-study-${data.slug}`} aria-label={data.title}>
    {/* ... */}
  </section>
}
```

### Retired v1.0 Components -- what happens to them

Per the brief, Experience/Skills/Leadership sections are "retired/restructured." Options:

| Strategy | Pro | Con |
|----------|-----|-----|
| **Delete files** | Clean codebase | Loses working v1.0 code if brief shifts |
| **Keep files, remove from page.tsx** | Can restore in one line | Dead code warnings, tsconfig may complain if imports break |
| **Archive to `_retired/` subfolder** | Git history preserved + explicit | Extra folder |

**Recommendation: remove from `page.tsx` and delete the section files + data files in a single commit.** Git history is the archive. The `experience.ts`, `skills.ts`, `leadership.ts`, `education.ts` data files can either be deleted or left in place (they are ~3KB combined, and `education.ts` content may be absorbed into the new About section). `types/index.ts` interfaces (`ExperienceEntry`, `SkillsData`, `LeadershipEntry`, `EducationEntry`) can stay or go -- keeping them is harmless.

**Recommended:** Delete the retired section components, delete `experience.ts`/`skills.ts`/`leadership.ts`, keep `education.ts` (likely re-used in About), keep all type definitions (cheap, may be needed later).

---

## Integration Question 4: Design Token Migration Order

### The Constraint

`src/app/globals.css` has an `@theme` block with tokens like `--color-background`, `--color-accent`, `--font-sans`. Section components use these via Tailwind utilities: `bg-background`, `text-accent`, `font-sans`.

The shadcn/ui button (`button-variants.ts`) uses semantic tokens NOT defined in this `globals.css`: `bg-primary`, `text-primary-foreground`, `bg-secondary`, `border-border`, `ring-ring`, `bg-destructive`, `text-destructive`. These tokens are imported via the `@import "shadcn/tailwind.css"` line in `globals.css:3`.

**Two token systems in play:**
1. **Project tokens** (in `globals.css @theme`): `background`, `foreground`, `accent`, `muted`, `muted-foreground`, `card`
2. **shadcn semantic tokens** (from `shadcn/tailwind.css`): `primary`, `secondary`, `border`, `ring`, `destructive`, `input`, `popover`, `chart-*`

### Brand palette mapping (v2.0 brief)

| Brand token | OKLCH approximation | Usage |
|-------------|---------------------|-------|
| DeepBlack `#0F0F0F` | `oklch(0.15 0 0)` | Foreground (text) |
| Orange `#FF6A00` | `oklch(0.68 0.21 40)` | Primary accent |
| Orange Light `#FFA559` | `oklch(0.79 0.14 55)` | Hover/secondary accent |
| White `#F9F9F9` | `oklch(0.98 0 0)` | Background |

> **Confirm exact OKLCH values with a conversion tool before committing.** Hex to OKLCH is non-trivial; eyeball approximations drift.

### Migration Order (the safe sequence)

Doing this in the wrong order will either (a) break shadcn's button at runtime or (b) require double work.

**Step 1 -- Add Montserrat font (additive, no risk)**

In `src/app/layout.tsx`:

```typescript
import { Inter, Montserrat } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['700', '800'],  // Bold + ExtraBold per brief
  display: 'swap',
})

// <html className={`${inter.variable} ${montserrat.variable}`}>
```

In `globals.css @theme`:
```css
--font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
--font-display: var(--font-montserrat), ui-sans-serif, system-ui, sans-serif;
```

This adds a new token without touching existing ones. Components opt-in via `font-display` utility. Zero breakage.

**Step 2 -- Update project palette tokens in `@theme` (safe, but visually disruptive)**

Swap the OKLCH values in `globals.css:7-24`:

```css
@theme {
  --color-background: oklch(0.98 0 0);       /* was 0.99 -- now #F9F9F9 White */
  --color-foreground: oklch(0.15 0 0);       /* was 0.15 0.01 260 -- now #0F0F0F DeepBlack */
  --color-accent: oklch(0.68 0.21 40);       /* was 0.55 0.10 240 -- now #FF6A00 Orange */
  --color-accent-hover: oklch(0.62 0.22 40); /* was 0.48 0.12 240 */
  --color-muted: oklch(0.94 0 0);            /* slight adjustment from 0.93 0 0 */
  --color-muted-foreground: oklch(0.45 0 0); /* drop chroma -- neutral grey */
  --color-card: oklch(0.96 0 0);             /* slight adjustment from 0.97 0 0 */
}
```

All existing section components use these tokens via Tailwind utilities. Changing values means visual shift -- but no breakage. Tailwind v4's `@theme` generates utilities at build time; changing values regenerates them on next `npm run dev` restart.

**Step 3 -- Confirm shadcn/ui button still renders**

The button uses `bg-primary`, `text-primary-foreground`, etc. These come from `@import "shadcn/tailwind.css"`. **These are separate from the project tokens above and are NOT affected by Step 2.** The button will still render in its default shadcn colors (likely neutral greys via `baseColor: "neutral"` in `components.json:9`).

**Options for shadcn token alignment:**
- **Option A (recommended):** Leave shadcn primitives using their own tokens. The project's section components use project tokens (`bg-accent`, etc.) directly. The buttons are overridden inline: `className="bg-accent text-white hover:bg-accent/90"` -- already the pattern in `HeroSection.tsx:26` and `ContactSection.tsx:25`. No shadcn token changes needed.
- **Option B:** Override shadcn tokens in `globals.css` to match brand. Example:
  ```css
  @theme {
    --color-primary: var(--color-accent);           /* alias */
    --color-primary-foreground: oklch(0.98 0 0);    /* white on orange */
  }
  ```
  This makes `<Button variant="default">` use orange by default. Riskier -- changes default behavior of every shadcn component added later.

**Recommendation: Option A.** The existing pattern already overrides button colors inline with `bg-accent`, so shadcn's token system does not need to change. Keep the two systems decoupled.

**Step 4 -- Rebuild affected section components to apply new typography**

Hero, About, Contact get rebuilt with:
- `font-display font-bold` on h1/h2 (Montserrat Bold per brief)
- `font-sans` continues for body text (Inter)

Because typography was previously `font-sans font-bold` globally, **until Step 4 is done, all headings still render in Inter Bold even though the token exists.** This is intentional -- isolates visual changes to the components being actively rebuilt.

**Step 5 -- Test in dev against shadcn component**

Visually verify the existing `<Button>` renders correctly after `@theme` swap. If shadcn's `tw-animate-css` imports any variables that shifted, they will be visible. Open `localhost:3000`, load any page rendering a button -- confirm no runtime errors and acceptable appearance.

### Migration Order Summary

```
Step 1: Add Montserrat via next/font + add --font-display token   [additive, safe]
Step 2: Swap project palette OKLCH values in @theme               [visual change, no break]
Step 3: Verify shadcn tokens untouched                            [check, no action]
Step 4: Rebuild section components using new tokens + font        [per-section]
Step 5: Dev-test shadcn button still renders                      [smoke test]
```

**Do NOT:**
- Change shadcn's `baseColor` in `components.json` mid-project (re-runs shadcn init logic)
- Rename existing tokens (e.g., `--color-accent` to `--color-orange`) -- all sections break
- Move from oklch to hex -- the whole system is oklch; mixing color spaces causes off-by-one perceptual differences

---

## Recommended v2.0 Project Structure

```
src/
|-- app/
|   |-- layout.tsx                   # MODIFY: add Montserrat
|   |-- page.tsx                     # MODIFY: new section order
|   |-- globals.css                  # MODIFY: @theme token values
|
|-- components/
|   |-- AnimatedSection.tsx          # KEEP: reuse for new sections
|   |
|   |-- layout/
|   |   |-- Navbar.tsx               # MODIFY: NAV_LINKS array
|   |   |-- Footer.tsx               # KEEP
|   |
|   |-- sections/
|   |   |-- HeroSection.tsx          # REBUILD: new copy, 3 metrics, Montserrat h1
|   |   |-- AboutSection.tsx         # REBUILD: new bio copy
|   |   |-- CaseStudySection.tsx     # NEW: accepts CaseStudyData prop
|   |   |-- GallerySection.tsx       # NEW: renders GalleryData with categories
|   |   |-- ValuePropSection.tsx     # NEW: "What I Bring to the Table"
|   |   |-- ContactSection.tsx       # REBUILD: "Let's Connect" heading
|   |                                # DELETE: ExperienceSection, SkillsSection, LeadershipSection
|   |
|   |-- gallery/                     # NEW: sub-components for gallery complexity
|   |   |-- GalleryGrid.tsx          # Renders one category's grid
|   |   |-- GalleryCard.tsx          # Single asset card with next/image
|   |   |-- GalleryLightbox.tsx      # OPTIONAL: modal for full-size view
|   |
|   |-- ui/
|       |-- button.tsx               # KEEP: shadcn base-nova primitive
|       |-- button-variants.ts       # KEEP
|
|-- data/
|   |-- hero.ts                      # REBUILD: 3 metrics, new copy
|   |-- about.ts                     # REBUILD: new bio
|   |-- caseStudyUtd.ts              # NEW
|   |-- caseStudyRio.ts              # NEW
|   |-- gallery.ts                   # NEW: 31 GalleryAsset entries in 6 categories
|   |-- valueProp.ts                 # NEW
|   |-- contact.ts                   # KEEP (maybe tweak phone display)
|   |-- education.ts                 # KEEP (may absorb into about)
|                                    # DELETE: experience.ts, skills.ts, leadership.ts
|
|-- types/
|   |-- index.ts                     # EXTEND: CaseStudyData, GalleryAsset,
|                                    #         GalleryCategory, GalleryData,
|                                    #         ValuePropItem, ValuePropData
|                                    # KEEP: Metric, HeroData, AboutData, ContactData
|                                    # OPTIONAL DELETE: ExperienceEntry, SkillsData,
|                                    #                  LeadershipEntry, EducationEntry
|
|-- hooks/
|   |-- useActiveSection.ts          # KEEP: ID-agnostic, works with new IDs automatically
|
|-- lib/
    |-- utils.ts                     # KEEP: cn() helper

public/
|-- og-image.png                     # KEEP
|-- resume.pdf                       # KEEP
|-- gallery/                         # NEW: 31 assets (see detailed layout above)
|   |-- instagram-posts/             # 10 PNG
|   |-- linkedin-posts/              # 7 PNG
|   |-- linkedin-ads/                # 4 PNG
|   |-- linkedin-events/             # 2 PNG
|   |-- digital-signage/             # 2 PNG
|   |-- printables/                  # 4 PNG + 2 PDF
|-- case-studies/                    # NEW (optional)
    |-- utd/hero.png
    |-- rio/hero.png
```

---

## Architectural Patterns (for the v2.0 work)

### Pattern 1: Typed-Data Singleton (existing -- keep applying)

**What:** One data file per domain concept, exported as a named const, consumed directly by the section that owns it.

**When to use:** Single-instance data per section (hero, about, contact, valueProp, gallery).

**Example (existing, keep):**
```typescript
// src/data/valueProp.ts
import type { ValuePropData } from '@/types'
export const valuePropData: ValuePropData = { sectionTitle: '...', items: [...] }

// src/components/sections/ValuePropSection.tsx
import { valuePropData } from '@/data/valueProp'
export default function ValuePropSection() {
  return <section id="value-prop" aria-label={valuePropData.sectionTitle}>...</section>
}
```

**Trade-off:** Not reusable as a "template" -- one component per data file. Good for sections that are truly singletons.

### Pattern 2: Data-as-Prop (NEW -- for case studies)

**What:** Component accepts `data: DataType` as a prop. Data lives in separate files; `page.tsx` wires them together.

**When to use:** Multiple instances of the same structural component (case study 1 + case study 2).

**Example:**
```typescript
// src/components/sections/CaseStudySection.tsx
export default function CaseStudySection({ data }: { data: CaseStudyData }) {
  return <section id={`case-study-${data.slug}`} aria-label={data.title}>...</section>
}

// src/app/page.tsx
<CaseStudySection data={caseStudyUtd} />
<CaseStudySection data={caseStudyRio} />
```

**Trade-off:** `page.tsx` has more imports. But one component file means edits apply to both case studies -- a win for consistency (they MUST look the same per the "scannable repeat pattern" in ROADMAP key decisions).

### Pattern 3: Categorized Gallery (NEW -- for 31 assets)

**What:** Outer container loops categories, each category loops assets. Pure server-side rendering of `<picture>` tags via `next/image`.

**Example:**
```typescript
// src/components/sections/GallerySection.tsx
export default function GallerySection() {
  return (
    <section id="gallery" aria-label="Creative Work">
      {galleryData.categories.map((category) => (
        <div key={category.id}>
          <h3 id={`gallery-${category.id}`}>{category.label}</h3>
          <GalleryGrid assets={category.assets} />
        </div>
      ))}
    </section>
  )
}
```

**Trade-off:** Rendering 29 images as a grid risks LCP/CLS regression. Mitigations:
- `<Image loading="lazy" />` on all except the first few (`next/image` lazy-loads by default below the fold)
- `width`/`height` declared in data -- no layout shift
- `placeholder="empty"` (no `blur` since not using static imports)
- Consider `sizes="(min-width: 768px) 33vw, 50vw"` to let `next/image` generate smaller variants

**Gallery interactivity options:**
- **Server-only grid (simplest):** Just render the images. No lightbox, no filter. Cheapest to ship.
- **Client-island filter:** A `<GalleryFilter>` client component lets users toggle categories. Adds complexity; may be overkill for 31 items.
- **Lightbox/modal:** Click opens full-size view. Needs client component + focus trap + keyboard handlers. Consider if stakeholders request it.

**Recommendation: Ship server-only grid first.** Add lightbox in a follow-up plan if user feedback demands it.

---

## Data Flow (v2.0)

### Build-time flow (static generation)

```
src/data/*.ts  (typed const exports)
      |  (imports at build)
      v
src/components/sections/*.tsx  (RSC, server-rendered)
      |  (streamed HTML + /gallery/*.png via next/image)
      v
Static HTML + optimized image variants
      |  (deploy)
      v
Vercel / Fly.io edge
```

No runtime data fetching. No API routes. No hydration of data -- only the tiny client islands (`Navbar` state, `AnimatedSection` motion, optional gallery lightbox) ship JS.

### Client-island boundaries

| Client component | Reason it is client | Scope |
|------------------|---------------------|-------|
| `Navbar` | `useState` for hamburger + `useActiveSection` hook | Top of page, tiny |
| `AnimatedSection` | `motion/react` + `useReducedMotion` | Wraps each section, minimal JS per wrapper |
| `GalleryLightbox` (optional) | `useState` for open/close + keyboard handlers | Only if added |

Everything else is Server Component (RSC) -- zero JS on the wire for those.

---

## Integration Build Order (sequential dependencies)

Working on the right file in the wrong week causes rework. This order minimizes backtracking:

1. **Design tokens first** (`globals.css` `@theme` + `layout.tsx` Montserrat font)
   - Reason: every new component renders against these tokens. Do not build 6 new sections under old tokens and then re-style.
   - Atomicity: Steps 1-3 from "Migration Order" above.

2. **Types next** (`src/types/index.ts` -- add `CaseStudyData`, `GalleryAsset`, `GalleryCategory`, `GalleryData`, `ValuePropItem`, `ValuePropData`)
   - Reason: data files depend on types. Types first means data files compile on first save.

3. **Image asset migration** (copy `.planning/design-references/My Designs/*` into `public/gallery/*` with kebab-case renames)
   - Reason: data files will reference paths like `/gallery/instagram-posts/real-id.png`. Paths must exist for local dev.
   - Script: a one-off rename script is faster than manual copy for 29 files.

4. **Data files** (7 new/rebuilt: `hero.ts`, `about.ts`, `caseStudyUtd.ts`, `caseStudyRio.ts`, `gallery.ts`, `valueProp.ts`, `contact.ts`)
   - Reason: components import these. No point rendering a component with missing data.
   - Note: `gallery.ts` is the largest (31 entries with title/alt/dimensions each).

5. **Section components** (rebuild/new)
   - Order within this step: rebuild first (Hero, About, Contact -- they inherit v1.0 layout structure), then new (CaseStudy, Gallery, ValueProp -- new layouts).
   - Reason: rebuilding a known component is faster than greenfield; front-load the quick wins.

6. **Navbar update** (change `NAV_LINKS` array)
   - Reason: must happen after section IDs exist in the DOM. Updating navbar before sections are built breaks active-section highlighting.

7. **page.tsx reorder** (wire the new section lineup)
   - Reason: final integration. Verifies all prior steps by rendering the full page.

8. **Retire v1.0 sections** (delete `ExperienceSection.tsx`, `SkillsSection.tsx`, `LeadershipSection.tsx`, plus their data files)
   - Reason: LAST. Only delete once the new `page.tsx` renders correctly without them. Deletion is reversible via git, but easier to delete confidently after verification.

9. **Visual QA + Lighthouse**
   - Same gates as Phase 4: WCAG 2.2 AA contrast (orange on white is tricky -- verify #FF6A00 on #F9F9F9 passes 4.5:1), LCP under 2.5s (gallery of 29 images may slow this -- lazy-loading is the defense).

### Contrast warning (known risk)

Orange `#FF6A00` on white `#F9F9F9` is a known contrast pain point. Approximate WCAG calc:
- Orange L ~ 0.68, white L ~ 0.98
- Contrast ratio approximately 3.0-3.2 -- **fails 4.5:1 for body text**
- Passes 3:1 for large text (18pt / 14pt bold) -- usable for hero h1, section headings, metric numbers
- Does NOT pass for small body links

**Mitigation:** Reserve orange for large display text (h1, h2, metric numbers) and non-text UI (borders, underlines, button backgrounds with white text on orange). For inline links in body copy, use a darker orange variant (e.g., `oklch(0.58 0.19 40)` -- roughly `#C84E00`) or use `foreground` DeepBlack with underline.

---

## Anti-Patterns (v2.0 specific)

### Anti-Pattern 1: Rename Section IDs Without Updating Navbar + Hook
**What people do:** Change `<section id="experience">` to `<section id="case-study-utd">` but forget the `NAV_LINKS` entry.
**Why it is wrong:** Navbar link dead-ends to `#experience` (which no longer exists). Clicking does nothing.
**Do this instead:** Update IDs in all three places atomically: (1) section component's JSX, (2) `NAV_LINKS` array, (3) any cross-section anchor hrefs. `useActiveSection` handles itself.

### Anti-Pattern 2: Load all 29 Gallery Images Eagerly
**What people do:** Use `<img loading="eager">` or `<Image priority />` on all gallery images.
**Why it is wrong:** All images contend for the initial network budget. LCP regresses. Lighthouse score drops.
**Do this instead:** Let `next/image` default to `loading="lazy"`. Only the first 1-2 images above the fold should use `priority`. For a gallery section that starts below the fold, NO images should be `priority`.

### Anti-Pattern 3: Hard-Code Asset Dimensions in Component
**What people do:** `<Image src="/gallery/foo.png" width={1080} height={1080} />` directly in `GalleryCard.tsx`.
**Why it is wrong:** Different categories have different aspect ratios (Instagram 1:1, LinkedIn 1.91:1, poster 2:3). Hard-coding forces all images into one ratio -- cropping or stretching.
**Do this instead:** Store `width` and `height` in each `GalleryAsset` data entry. `GalleryCard` reads `asset.width` and `asset.height`. `next/image` generates correct sized variants.

### Anti-Pattern 4: Inline Case Study Content in Component
**What people do:** Write case study paragraphs as JSX text inside `CaseStudySection.tsx`.
**Why it is wrong:** The type contract says `blocks: CaseStudyBlock[]`. Inline content breaks the pattern -- violates "data and presentation separate" that v1.0 established.
**Do this instead:** All case study copy goes in `src/data/caseStudyUtd.ts` / `caseStudyRio.ts`. Component reads from props.

### Anti-Pattern 5: Change shadcn `baseColor` Mid-Milestone
**What people do:** Re-run `npx shadcn init` with a new `baseColor` to try to get branded colors.
**Why it is wrong:** Rewrites `components.json`, regenerates all shadcn components, and may conflict with custom edits.
**Do this instead:** Leave shadcn's `baseColor: "neutral"`. Override appearance at component usage sites (`className="bg-accent text-white"`). Or alias project tokens to shadcn semantic names in `globals.css @theme` (Option B from Design Token Migration).

### Anti-Pattern 6: Mix `src/assets/` Imports and `public/` References for Gallery
**What people do:** Half the images are `import` + static, half are `public/` paths.
**Why it is wrong:** Inconsistent mental model. PDFs cannot be imported anyway; forcing a split creates two code paths.
**Do this instead:** All gallery assets in `public/gallery/`. All references are string paths. One rule.

---

## Integration Points Summary

### Files New Components Touch

| New component | Reads from | Mounted by |
|---------------|------------|------------|
| `CaseStudySection.tsx` | Props (`CaseStudyData`) | `page.tsx` x2 |
| `GallerySection.tsx` | `@/data/gallery` | `page.tsx` |
| `GalleryGrid.tsx`, `GalleryCard.tsx` | Props | `GallerySection` |
| `ValuePropSection.tsx` | `@/data/valueProp` | `page.tsx` |

### Files New Components DO NOT Touch

- `layout.tsx` -- only gets font additions; does not know about sections
- `Footer.tsx` -- untouched
- `AnimatedSection.tsx` -- untouched; new sections wrap inside it exactly like v1.0
- `useActiveSection.ts` -- untouched; discovers IDs at runtime
- `button.tsx` + `button-variants.ts` -- untouched; shadcn primitives unchanged

### Optional: shared dimension-fetching helper

If you do not want to hand-type `width`/`height` for 29 images, write a one-time Node script:

```
scripts/gen-gallery-manifest.ts (one-off, not shipped)
Reads public/gallery/**/*.png, uses `sharp` or `image-size` to extract dimensions,
emits a populated src/data/gallery.ts file.
```

This is a build-time automation decision, not an architectural one. Can be deferred.

---

## Scaling / Future Considerations

This portfolio will not "scale" in the traditional sense -- it is a static site for job-hunting. But the architecture needs to survive:

| Concern | Current approach | Future trigger |
|---------|------------------|---------------|
| Adding more case studies | Add new `caseStudyXyz.ts` + one line in `page.tsx` | Already trivial |
| Adding more gallery assets | Add entries to `gallery.ts` + images to `public/gallery/` | Already trivial |
| Moving to CMS later | Replace `data/*.ts` with API fetches in server components | Contracts in `types/` stay stable |
| Case study detail pages | `src/app/case-studies/[slug]/page.tsx` + `generateStaticParams()` from `caseStudyUtd/rio` slugs | Only if depth demanded |
| Gallery lightbox/filter | Add client island in `components/gallery/` | Only if stakeholders ask |

The current data architecture (typed consts + server components) scales to 100+ case studies and 500+ gallery assets before needing any redesign. A portfolio will never reach that.

---

## Confidence Assessment

| Claim | Confidence | Basis |
|-------|------------|-------|
| Current file structure (verified paths) | HIGH | Direct `ls` / `Read` tool inspection |
| v1.0 data pattern (one file per section) | HIGH | All 7 data files follow same pattern (inspected) |
| `useActiveSection` is ID-agnostic | HIGH | Read hook source (`querySelectorAll("section[id]")`) |
| `public/` beats `src/assets/` for next/image here | HIGH | `output: "standalone"` configured; PDFs cannot be imported; 31 assets with known dimensions |
| Token migration order (font then palette then components) | HIGH | Tailwind v4 `@theme` regenerates utilities on build; shadcn tokens are separate import |
| Contrast warning (orange on white fails 4.5:1) | MEDIUM | OKLCH approximations; should be verified with exact OKLCH values + a WCAG calculator before committing |
| 31-asset count and 6 categories | HIGH | Directly counted from `.planning/design-references/My Designs/` |
| shadcn `baseColor: "neutral"` behavior unchanged by @theme swap | HIGH | shadcn tokens imported from `shadcn/tailwind.css` separately |
| Rebuilding Hero/About/Contact is safer than from-scratch | MEDIUM | Inferred from existing component structure being already good |

---

## Sources

- Existing codebase files inspected (all absolute paths):
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/app/layout.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/app/page.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/app/globals.css`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/components/layout/Navbar.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/components/layout/Footer.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/components/AnimatedSection.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/components/sections/HeroSection.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/components/sections/AboutSection.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/components/sections/ExperienceSection.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/components/sections/SkillsSection.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/components/sections/LeadershipSection.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/components/sections/ContactSection.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/components/ui/button.tsx`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/components/ui/button-variants.ts`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/hooks/useActiveSection.ts`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/lib/utils.ts`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/types/index.ts`
  - All 7 files in `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/src/data/`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/next.config.ts`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/package.json`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/components.json`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/tsconfig.json`
  - `/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/postcss.config.mjs`
- 31 design assets catalogued from `/Users/lakshmanturlapati/Documents/Codes/Harsha/.planning/design-references/My Designs/`
- Prior research (v1.0): `/Users/lakshmanturlapati/Documents/Codes/Harsha/.planning/research/ARCHITECTURE.md`, `STACK.md`, `FEATURES.md`, `PITFALLS.md`
- Project context: `/Users/lakshmanturlapati/Documents/Codes/Harsha/.planning/PROJECT.md`, `ROADMAP.md`

---
*Architecture research for: v2.0 Brand Redesign & Creative Portfolio (additive milestone)*
*Researched: 2026-04-04*
