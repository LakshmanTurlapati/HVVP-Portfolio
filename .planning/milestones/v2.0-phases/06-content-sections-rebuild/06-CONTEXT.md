# Phase 6: Content Sections Rebuild - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning
**Mode:** Smart discuss (2 grey areas, all recommendations accepted)

<domain>
## Phase Boundary

Rebuild Hero, About, ValueProp ("What I Bring to the Table"), and Contact sections with brief-supplied copy verbatim on the new v2.0 brand tokens. Includes data model updates, component rewrites, and one DeepBlack band surface (ValueProp) showcasing rare orange-on-dark accent usage.

In scope: Hero rebuild (3 metrics + new heading + View My Work CTA), About rebuild (brief bio + education callout), new ValueProp component + data file + type, Contact redesign ("Let's Connect").

Out of scope: case studies (Phase 7), gallery (Phase 8), navbar rewire (Phase 9), OG image refresh (Phase 10), retiring Experience/Skills/Leadership components (Phase 9).

</domain>

<decisions>
## Implementation Decisions

### Layout & Surface Strategy
- Hero uses off-white #F9F9F9 body background (consistent with existing layout)
- ValueProp section uses DeepBlack band surface — showcases orange-on-dark accent usage once in the milestone
- All other new/rebuilt sections stay on off-white
- Hero 3-metric layout: horizontal 3-column strip on desktop, stacked vertical on mobile
- "View My Work" CTA anchors to `#gallery` (section ID created in Phase 8)
- Section vertical spacing: py-24 (slightly larger than v1.0's py-20 to breathe under Montserrat Bold)
- Max content width: max-w-5xl (unchanged from v1.0)
- Hero H1 scale: text-5xl sm:text-6xl lg:text-7xl
- Hero metric numbers use Montserrat Bold for scale emphasis

### Data Model & Scope
- Replace hero.ts: drop 5-metric array, add 3-metric array; update heading, subheading, CTA; keep availability as secondary copy
- Replace about.ts: use brief-supplied bio copy verbatim; keep education + honors for inline credential callout
- Create src/data/valueProp.ts + ValuePropData type in src/types/index.ts -- new typed data singleton matching existing pattern
- Update contact.ts: add heading field ("Let's Connect"); email/linkedin unchanged

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/sections/HeroSection.tsx` -- v1.0 component, will be rebuilt (not deleted)
- `src/components/sections/AboutSection.tsx` -- v1.0 component, will be rebuilt
- `src/components/sections/ContactSection.tsx` -- v1.0 component, will be rebuilt with new heading
- `src/components/AnimatedSection.tsx` -- motion/react wrapper, reuse as-is
- `src/data/hero.ts`, `src/data/about.ts`, `src/data/contact.ts` -- v1.0 data files, will be rewritten
- `src/types/index.ts` -- add ValuePropItem + ValuePropData types
- buttonVariants from shadcn button-variants.ts -- reuse for CTAs

### Established Patterns
- Typed-data-singleton: `src/types/index.ts` -> `src/data/[name].ts` -> `src/components/sections/[Name]Section.tsx`
- Server components everywhere except Navbar + AnimatedSection
- buttonVariants on `<a>` elements (avoids invalid button-inside-a nesting)
- Montserrat applies automatically to h1, h2 via globals.css @layer base (Phase 5)
- --color-accent-foreground = DeepBlack, used on orange fills

### Integration Points
- page.tsx renders sections in order: Hero -> About -> Experience -> Skills -> Leadership -> Contact (Phase 9 will reorder)
- Section IDs: hero, about (existing); value-prop (new)
- Contact section ID unchanged
- NAV_LINKS in Navbar.tsx references existing section IDs (Phase 9 will update)

</code_context>

<specifics>
## Specific Ideas

**Brief copy to use verbatim:**

Hero:
- Heading: "Data-Driven Marketing Strategist | Content & Campaigns That Convert"
- Subheading: "I design and execute high-performing digital marketing campaigns across social media, web, and email, combining creative storytelling with data-backed decision making."
- Metric 1: "Increased engagement by 7% at UTD International Center"
- Metrics 2 and 3: to be derived from resume data (audit needed during planning)
- Primary CTA: "View My Work"

About Me:
- Brief copy: "I am a data-driven marketing professional currently pursuing my Master's in Marketing at The University of Texas at Dallas. I specialize in digital marketing, content strategy, and campaign optimization." + continuation about designing and optimizing campaigns

What I Bring to the Table:
- Opener: "I bring a strong combination of analytical thinking and creative execution to marketing."
- First bullet: "Ability to make data-driven decisions using campaign performance metrics"
- Additional bullets: to be derived from resume/original brief content

Contact:
- Heading: "Let's Connect"

**Orange-on-DeepBlack band (ValueProp section):**
- Background: `--color-brand-black` (#0F0F0F)
- Heading: Orange #FF6A00 H2 (6.68:1 PASS on DeepBlack)
- Body text: Off-white #F9F9F9 on DeepBlack (19:1 PASS)
- Single decorative orange divider bar retained

</specifics>

<deferred>
## Deferred Ideas

- Case study sections -- Phase 7
- Gallery section -- Phase 8
- Retirement of Experience/Skills/Leadership sections -- Phase 9
- Navbar updates -- Phase 9
- Final OG image regeneration + contrast CI -- Phase 10

</deferred>
