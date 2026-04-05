# Phase 8: Creative Work Gallery - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning
**Mode:** Smart discuss (2 grey areas, all accepted)

<domain>
## Phase Boundary

Build creative gallery section displaying 31 design assets across 6 categories with accessible click-to-enlarge lightbox and next/image pipeline (first usage in codebase). Convert ~50MB raw PNG assets into <500KB first-paint mobile experience via WebP/AVIF optimization.

In scope: asset migration to public/gallery/, gallery types/data/components, next/image discipline, @base-ui/react Dialog lightbox, aspect-ratio containers per category, PDF preview handling.

Out of scope: navbar rewire (Phase 9), OG refresh/deploy (Phase 10).

</domain>

<decisions>
## Implementation Decisions

### Asset Pipeline
- Location: `public/gallery/[category-slug]/[asset-slug].png` (unified rule; handles PDFs too)
- Filenames: kebab-case, strip brackets, keep client/channel tags as-is for later badge derivation
- PDFs: PNG preview thumbnails generated from first page + "PDF" badge; lightbox opens PDF in new tab
- Image dimensions: manually measured once + hardcoded in gallery.ts data

### Gallery UX
- Grid: uniform cells per category with aspect-ratio containers (1:1 Instagram, 1.91:1 LinkedIn, 16:9 Digital Signage, etc.)
- Lightbox: @base-ui/react Dialog (already installed, zero new deps)
- Features: full image view + ESC/arrow keys + focus return + alt text as caption
- Category navigation: stacked scrollable sections with heading anchors; no filter UI

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- @base-ui/react 1.3.0 already installed (verified in package.json via research)
- next.config.ts exists but has no custom image config
- Zero prior next/image usage in codebase -- pattern established fresh here

### Established Patterns
- Typed data singleton for data layer
- Server components default; client islands only where needed (lightbox)
- Section ID pattern: kebab-case slug

### Integration Points
- public/gallery/ directory (create)
- page.tsx -- insert GallerySection
- next.config.ts -- add images.formats: ['image/avif', 'image/webp']

</code_context>

<specifics>
## Specific Ideas

**6 categories (matching zip folder structure):**
- Instagram Posts (10 assets, 1:1 aspect ratio -- 1080x1080)
- LinkedIn Posts (7 assets, varies -- likely 1200x627)
- LinkedIn Ads (4 assets, 1200x627 or 1:1)
- LinkedIn Events (2 assets, 1200x627)
- Digital Signage (2 assets, 16:9 -- 1920x1080)
- Printables (6 assets, varies -- includes 2 PDFs)

**Intro copy (brief verbatim):**
"This section showcases a selection of my design work across social media campaigns, event promotions, and digital marketing assets. Each piece reflects my ability to combine creativity with strategic marketing objectives."

**Closing line (brief verbatim):**
"These are a few designs out of the 30+ marketing assets I've created and posted across social media, events, and digital campaigns."

**Title derivation:**
Original filenames like `[ISSO][IG] Townhall Meeting Post.png` -> readable title "Town Hall Meeting" (strip client tag + format tag + "Post" suffix). Client tag (ISSO, IC, OIE, etc.) can become a small badge on the tile.

**Budget:** <500KB first-paint on mobile (below-the-fold items lazy-load).

</specifics>

<deferred>
## Deferred Ideas

- Filter UI (category tabs)
- Lightbox carousel across all 31 assets
- Asset download buttons
- Per-asset description text (titles only for first ship)

</deferred>
