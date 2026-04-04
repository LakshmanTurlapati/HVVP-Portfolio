# Phase 2: Content Sections - Research

**Researched:** 2026-04-03
**Domain:** React Server Components, Tailwind v4 responsive layout, section component composition, resume data rendering
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- Hero: full-height (min-h-screen), left-aligned desktop / centered mobile, 5 headline metrics row below tagline, dual CTAs (filled accent "Get In Touch" + outlined "Download Resume")
- Experience: timeline with vertical line and dots, each role shows company/title/dates/location + 3-4 metric achievement bullets, all content visible upfront (no expand/collapse), bold numbers in bullets
- Skills: grouped tags/pills by category (Marketing & Analytics, Tools & Platforms, Certifications)
- Contact: centered layout, large email + LinkedIn buttons, availability reminder
- Alternating section backgrounds (white/card color) between sections for visual rhythm
- Section headings: left-aligned h2 with small accent underline

### Claude's Discretion

- About section layout (single paragraph with education callout)
- Leadership section layout (similar to experience but more compact)
- Education display within About (inline mention vs separate subsection)
- Specific Tailwind utility classes and responsive breakpoint details
- Animation-ready class names (Phase 4 will add Motion animations)

### Deferred Ideas (OUT OF SCOPE)

- Scroll animations on section entry (Phase 4: Polish)
- Active section highlighting in nav (Phase 3: Navigation)
- Professional headshot photo (v2 - not available yet)
- Certification badge logos (v2 - need credential images)
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| HERO-01 | Page displays Harsha's full name prominently as primary heading | `heroData.name` in `src/data/hero.ts`; render as `<h1>` — only one h1 allowed per page per semantic HTML contract in Phase 1 |
| HERO-02 | Tagline communicates specialization | `heroData.tagline` string; render below h1 as `<p>` or styled span |
| HERO-03 | CTA buttons link to contact section and downloadable resume PDF | `heroData.ctaContact` (`#contact` anchor) + `heroData.ctaResume` (`/resume.pdf` download link); use shadcn Button component already installed |
| HERO-04 | Availability statement visible | `heroData.availability` string; render as subdued badge or inline text below tagline |
| HERO-05 | 3-5 headline metrics displayed prominently | `heroData.metrics` array (5 items); render as horizontal row of stat cards with large value + label |
| ABOUT-01 | Professional summary paragraph | `aboutData.bio` string; single paragraph block |
| ABOUT-02 | Education credentials featured | `educationData` array (2 entries); display inline callout or subsection showing degrees + honors |
| EXP-01 | All 4 roles with company/title/dates/location | `experienceData` array (4 entries); each `ExperienceEntry` has all required fields |
| EXP-02 | Each role includes 3-4 achievement bullets with quantified metrics | `experienceData[n].bullets` array (4 bullets each); bold the numbers inline |
| EXP-03 | Experience entries visually structured for scannability | Timeline layout: vertical line + dot per entry; defined by locked decision |
| SKILL-01 | Marketing and analytics skills by category | `skillsData.marketingAnalytics` array (10 items); pill/tag rendering |
| SKILL-02 | Tools and platforms showcased | `skillsData.toolsPlatforms` array (8 items); pill/tag rendering |
| SKILL-03 | Certifications listed | `skillsData.certifications` array (2 items); distinct visual treatment from regular pills |
| LEAD-01 | Leadership roles displayed | `leadershipData` array (4 entries including IYEP); each has organization/role/dates |
| LEAD-02 | Each role includes organization/title/dates/description | All fields present in `LeadershipEntry` type; description is a full sentence |
| LEAD-03 | IYEP Malaysia delegation noted | `leadershipData[3]` has `location: 'Malaysia'`; surface this in the rendered card |
| CONT-01 | Email displayed and linked (mailto) | `contactData.email` = `harshavprabu@gmail.com`; wrap in `<a href="mailto:...">` |
| CONT-02 | LinkedIn profile linked prominently | `contactData.linkedIn` URL; large button per locked decision |
| CONT-03 | Phone accessible or omitted by choice | `contactData.phone` = `323-659-8053`; discretion: include as small text or omit |
| DES-05 | Responsive design works on mobile (375px+), tablet, and desktop | All sections use Tailwind responsive prefixes (sm:/md:/lg:); Hero left-align desktop / center mobile |
</phase_requirements>

---

## Summary

Phase 2 is pure component authoring. The data layer is complete and type-safe; the design token system is live. This phase's sole job is to replace six `<section>` stubs in `page.tsx` with real components that display resume content at correct breakpoints.

The critical pattern is: import typed data from `@/data/*`, compose it into semantic HTML, style with the established Tailwind v4 token utilities (`bg-background`, `text-accent`, `bg-card`, etc.), and keep every component a Server Component unless an interaction (onClick, useState) requires otherwise. All six section components in this phase are static rendering — no client boundary is needed.

The main risks are (1) number-bolding inside bullet strings (requires parsing or a helper since bullets are plain strings, not structured data), (2) the timeline CSS pattern (requires a relative-positioned container with an absolute pseudo-element or border trick), and (3) the CTA download link for the PDF (must use plain `<a>` with `download` attribute, not Next.js `<Link>`).

**Primary recommendation:** Build sections in page order — Hero, About, Experience, Skills, Leadership, Contact — each as its own file in `src/components/sections/`. Update `page.tsx` to import and mount each component as it is built.

---

## Project Constraints (from CLAUDE.md)

| Directive | Impact on Phase 2 |
|-----------|-------------------|
| Never use emojis in any file output | Section data files, component comments, and any strings must be emoji-free. `heroData`, `aboutData`, etc. already comply. |
| Never run applications automatically | `npm run dev` must not be executed in any task; mention only as a human verification step |

AGENTS.md in `harsha-portfolio/` adds: **"This is NOT the Next.js you know — read `node_modules/next/dist/docs/` before writing any code."** This phase must follow Next.js 16 App Router conventions as documented in those files, not training-data assumptions.

---

## Standard Stack

### Core (all already installed — no new installs for this phase)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.2 | App Router Server Components | Already installed; section components are RSCs by default |
| React | 19.2.4 | JSX rendering | Bundled with Next.js 16; no explicit import needed in RSCs |
| TypeScript | 5.x | Typed data contracts | All data files use typed imports; components extend existing types |
| Tailwind CSS | 4.2.2 | Styling | Token utilities (`bg-card`, `text-accent`, `text-muted-foreground`) already in `@theme` |
| shadcn Button | installed | CTA buttons in Hero and Contact | `src/components/ui/button.tsx` uses `@base-ui/react` + `cva`; already in project |
| lucide-react | 1.7.0 | Optional icons (external link, download, mail) | Already installed; use sparingly — no icon-heavy design |
| clsx + tailwind-merge (cn) | installed | Conditional className composition | `src/lib/utils.ts` exposes `cn()`; use everywhere classNames are computed |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Plain `<a download>` for resume PDF | `next/link` | Next.js `<Link>` does not support `download` attribute; use plain `<a>` for PDF CTAs |
| Plain `<a href="#contact">` for scroll CTA | `next/link` | STATE.md confirms `<Link>` suppresses smooth scroll for hash anchors; use plain `<a>` |
| CSS timeline with border-left trick | SVG or separate element | CSS border-left on a wrapper div is simpler, responsive, and requires no JS |
| Inline bold via regex helper | Structured bullet data | Bullets are plain strings; a lightweight `BoldNumbers` component using regex + dangerouslySetInnerHTML or span-splitting avoids modifying the TypeScript types contract |

**No new installs required for Phase 2.** All dependencies are in `package.json`.

---

## Architecture Patterns

### Project Structure for Phase 2

```
src/
├── app/
│   └── page.tsx                        # Replace stubs with real component imports
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                  # Leave as Phase 3 stub (returns null)
│   │   └── Footer.tsx                  # Already implemented; leave untouched
│   ├── sections/
│   │   ├── HeroSection.tsx             # HERO-01 through HERO-05
│   │   ├── AboutSection.tsx            # ABOUT-01, ABOUT-02
│   │   ├── ExperienceSection.tsx       # EXP-01, EXP-02, EXP-03
│   │   ├── SkillsSection.tsx           # SKILL-01, SKILL-02, SKILL-03
│   │   ├── LeadershipSection.tsx       # LEAD-01, LEAD-02, LEAD-03
│   │   └── ContactSection.tsx          # CONT-01, CONT-02, CONT-03
│   └── ui/
│       └── button.tsx                  # Already installed; do not modify
├── data/                               # All populated in Phase 1; do not modify
└── types/
    └── index.ts                        # Locked after Phase 2 begins; do not modify
```

### Pattern 1: Section Component Shell

**What:** Each section component is a Server Component (no directive needed) that imports its typed data and renders semantic HTML.

**When to use:** All six sections — none require client-side state in Phase 2.

**Example:**
```tsx
// src/components/sections/ExperienceSection.tsx
// No "use client" -- Server Component

import { experienceData } from '@/data/experience'

export default function ExperienceSection() {
  return (
    <section id="experience" aria-label="Experience" className="py-20 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>Experience</SectionHeading>
        <Timeline entries={experienceData} />
      </div>
    </section>
  )
}
```

### Pattern 2: Section Wrapper and Heading

**What:** Consistent padding, max-width, and heading style applied to all sections. Section headings use a left-aligned h2 with an accent underline (locked decision).

**When to use:** Every section uses the same outer padding and max-width. The heading style is reused across all sections.

**Example:**
```tsx
// Inline — no separate component needed unless repeated 4+ times
<h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
  Experience
</h2>
<div className="w-12 h-1 bg-accent mb-8 rounded-full" />
```

The accent underline is a simple `div` with `bg-accent`, not a CSS border — gives precise width control. Width `w-12` (3rem) is a reasonable starting point; adjust to taste.

### Pattern 3: Alternating Section Backgrounds

**What:** Sections alternate between `bg-background` (white, hex ~#fafafa) and `bg-card` (slightly off-white, `oklch(0.97 0.00 0)`). The contrast is subtle — the difference provides rhythm without jarring color shifts.

**Alternation order (by page flow):**
```
Hero        → bg-background   (full-height, primary)
About       → bg-card
Experience  → bg-background
Skills      → bg-card
Leadership  → bg-background
Contact     → bg-card
```

### Pattern 4: Hero Layout (Locked Decision)

**What:** Full-height hero, left-aligned on desktop, centered on mobile. Name as h1, tagline as styled paragraph, metrics row, dual CTAs, availability text.

**Example structure:**
```tsx
<section id="hero" aria-label="Hero"
  className="min-h-screen flex items-center bg-background">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    {/* Left on desktop, centered on mobile */}
    <div className="text-center sm:text-left">
      <p className="text-accent font-medium mb-2">{heroData.availability}</p>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
        {heroData.name}
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
        {heroData.tagline}
      </p>
      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center sm:justify-start">
        <a href="#contact">
          <Button size="lg">Get In Touch</Button>
        </a>
        <a href="/resume.pdf" download>
          <Button variant="outline" size="lg">Download Resume</Button>
        </a>
      </div>
      {/* Metrics row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {heroData.metrics.map(/* ... */)}
      </div>
    </div>
  </div>
</section>
```

**Key CTA rule:** Resume download uses `<a href="/resume.pdf" download>` — not `<Link>`. Contact CTA uses `<a href="#contact">` — not `<Link>`. Both confirmed in STATE.md.

### Pattern 5: Timeline Layout for Experience (Locked Decision)

**What:** Vertical timeline with a line running down the left and a dot marker per entry. Pure CSS — no JS.

**Implementation approach:**
```tsx
{/* Timeline container */}
<div className="relative pl-8">
  {/* Vertical line */}
  <div className="absolute left-0 top-2 bottom-2 w-px bg-muted" />

  {experienceData.map((entry, i) => (
    <div key={i} className="relative mb-12 last:mb-0">
      {/* Dot */}
      <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-accent
                      border-2 border-background" />

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">{entry.role}</h3>
        <p className="text-accent font-medium">{entry.company}</p>
        <p className="text-sm text-muted-foreground mb-3">
          {entry.startDate} – {entry.endDate} · {entry.location}
        </p>
        <ul className="space-y-1.5">
          {entry.bullets.map((bullet, j) => (
            <li key={j} className="text-muted-foreground text-sm leading-relaxed">
              <BoldNumbers text={bullet} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</div>
```

**Critical detail:** The dot uses `border-2 border-background` so it visually "punches through" the vertical line — standard timeline technique.

### Pattern 6: BoldNumbers Helper for Metric Bullets

**What:** Bullet strings like `"Drove 7% engagement increase..."` need the numbers bolded. Bullets are plain strings (TypeScript type is `string[]`), not structured data.

**Solution:** A tiny utility component that splits the string on number patterns and wraps them in `<strong>`. This avoids modifying the locked TypeScript types.

**Example:**
```tsx
// src/components/sections/ExperienceSection.tsx (inline or small helper file)
function BoldNumbers({ text }: { text: string }) {
  // Match integers, decimals, and percentages: "40%", "7", "25%", "20%"
  const parts = text.split(/(\d+(?:\.\d+)?%?)/g)
  return (
    <>
      {parts.map((part, i) =>
        /^\d+(?:\.\d+)?%?$/.test(part)
          ? <strong key={i} className="text-foreground font-semibold">{part}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}
```

This component is Server Component compatible — no state or event handlers.

### Pattern 7: Skills Pills by Category (Locked Decision)

**What:** Skills rendered as tag/pill chips grouped under category headings.

**Example:**
```tsx
<div className="space-y-6">
  {[
    { label: 'Marketing & Analytics', items: skillsData.marketingAnalytics },
    { label: 'Tools & Platforms', items: skillsData.toolsPlatforms },
  ].map(({ label, items }) => (
    <div key={label}>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase
                     tracking-wider mb-3">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(skill => (
          <span key={skill}
            className="px-3 py-1 text-sm bg-muted text-foreground
                       rounded-full border border-muted/60">
            {skill}
          </span>
        ))}
      </div>
    </div>
  ))}
  {/* Certifications — different visual treatment */}
  <div>
    <h3 className="text-sm font-semibold text-muted-foreground uppercase
                   tracking-wider mb-3">Certifications</h3>
    <div className="flex flex-col gap-2">
      {skillsData.certifications.map(cert => (
        <p key={cert} className="text-sm text-foreground pl-4
                                 border-l-2 border-accent">{cert}</p>
      ))}
    </div>
  </div>
</div>
```

**Certifications use a different visual treatment** (left-border with accent color, not a pill) because the names are long sentences, not short keywords.

### Pattern 8: Contact Section (Locked Decision)

**What:** Centered layout, large email + LinkedIn buttons.

**Example structure:**
```tsx
<section id="contact" aria-label="Contact" className="py-20 bg-card text-center">
  <div className="max-w-2xl mx-auto px-4">
    <SectionHeading centered>Get In Touch</SectionHeading>
    <p className="text-muted-foreground mb-8">{heroData.availability}</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a href={`mailto:${contactData.email}`}>
        <Button size="lg">Email Me</Button>
      </a>
      <a href={contactData.linkedIn} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="lg">LinkedIn</Button>
      </a>
    </div>
    {/* Phone: render as small subdued text below buttons */}
    {contactData.phone && (
      <p className="mt-6 text-sm text-muted-foreground">{contactData.phone}</p>
    )}
  </div>
</section>
```

**Note on phone (CONT-03):** `contactData.phone` is populated (`323-659-8053`). Render it as small subdued text below the main CTAs — visible but not prominent. The locked decision does not specify omitting it, so expose it by default.

### Anti-Patterns to Avoid

- **Adding "use client" unnecessarily:** All six sections are pure render — no onClick, no useState. "use client" would disable RSC optimizations for no benefit.
- **Using `next/link` for hash anchors or PDF downloads:** Confirmed in STATE.md. Use plain `<a>` for both.
- **Modifying `src/types/index.ts`:** Types are locked after Phase 2 begins. If a component needs data in a different shape, transform it in the component, not the type.
- **Adding new design tokens to `globals.css` for one-off values:** Use Tailwind's arbitrary value syntax `[value]` for isolated cases. Adding tokens for single-use values pollutes the design system.
- **Nesting `<a>` inside `<Button>` (component):** shadcn Button renders a `<button>` element via `@base-ui/react`. Wrap the `<a>` on the outside and put the Button inside it, or use `asChild` if the Button primitive supports it. Check button.tsx — the current implementation uses `ButtonPrimitive` from `@base-ui/react/button`; wrapping with `<a>` outside is the safe approach.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CTA buttons with variants | Custom styled `<button>` | `Button` from `@/components/ui/button` (shadcn, already installed) | Has focus-visible ring, disabled states, size variants, cva-based class merging |
| Responsive flex/grid layouts | Custom CSS media queries | Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) | Already in the project; consistent breakpoints |
| Conditional class merging | Template literal + manual conditions | `cn()` from `@/lib/utils` | Handles Tailwind class deduplication; already imported everywhere |
| Timeline vertical line | Absolutely-positioned SVG or JS | CSS `border-left` or `w-px bg-muted` absolute div | Pure CSS, responsive, no JS |
| Bold numbers in strings | `dangerouslySetInnerHTML` | Regex-split + `<strong>` wrapping in a Server Component | Safe, no XSS risk, no external dependency |

**Key insight:** This phase adds zero new dependencies. Everything needed is already in `package.json` and `node_modules`.

---

## Data Layer Summary

All data is confirmed populated in `src/data/`. No modifications needed. Summary for component authors:

| File | Export | Key Shape Notes |
|------|--------|-----------------|
| `src/data/hero.ts` | `heroData: HeroData` | `metrics`: 5 items; `ctaContact` = "Get In Touch"; `ctaResume` = "Download Resume" |
| `src/data/about.ts` | `aboutData: AboutData` | `bio`: single string paragraph (no subfields) |
| `src/data/education.ts` | `educationData: EducationEntry[]` | 2 entries; UTD has `coursework[]`; Madras has `honors` = "University Gold Medalist" |
| `src/data/experience.ts` | `experienceData: ExperienceEntry[]` | 4 entries; `endDate` of first entry = `'Present'` (literal string); all have 4 bullets |
| `src/data/skills.ts` | `skillsData: SkillsData` | `marketingAnalytics`: 10 items; `toolsPlatforms`: 8 items; `certifications`: 2 long strings |
| `src/data/leadership.ts` | `leadershipData: LeadershipEntry[]` | 4 entries; IYEP entry has `location: 'Malaysia'` and single-month date span |
| `src/data/contact.ts` | `contactData: ContactData` | `resumePdf`: `'/resume.pdf'`; `phone` is populated |

**Education display in About (Claude's discretion):** Show education as a compact subsection below the bio paragraph — a two-row inline list showing degree, institution, graduation, and honors. Inline mention blends into the bio, but a small callout block is more scannable for recruiters.

---

## Common Pitfalls

### Pitfall 1: `<Link>` for Hash Anchors Suppresses Smooth Scroll

**What goes wrong:** Using `<Link href="#contact">` causes the page to scroll without the CSS `scroll-behavior: smooth` animation. The link fires a client-side router navigation instead of a standard anchor jump.

**Why it happens:** Next.js `<Link>` is a client-side router component that intercepts `href` values. For hash-only anchors it conflicts with the browser's native scroll mechanism.

**How to avoid:** Use plain `<a href="#contact">` for all in-page section anchor CTAs. This is a confirmed project decision in STATE.md.

**Warning signs:** Scroll animation missing or page jumping instead of scrolling smoothly.

### Pitfall 2: `<a download>` vs `<Link>` for PDF

**What goes wrong:** Using `<Link href="/resume.pdf">` for the resume download does not trigger a file download — it navigates to the PDF in the browser tab.

**How to avoid:** Use `<a href="/resume.pdf" download>` or `<a href="/resume.pdf" download="Harsha_Vardhini_Resume.pdf">` for a named download. The `download` attribute is not supported by Next.js `<Link>`.

### Pitfall 3: `<button>` Nested Inside `<a>`

**What goes wrong:** Wrapping `<Button>` (which renders a `<button>` element) inside an `<a>` tag is invalid HTML — interactive elements cannot be nested. Browsers may silently correct it, but the behavior is undefined.

**How to avoid:** Wrap the `<a>` outside, not inside the `<Button>`. Apply the button's visual styling directly on the `<a>` using `className={cn(buttonVariants({ variant, size }))}` and `buttonVariants` export — or use `asChild` prop if the `ButtonPrimitive` from `@base-ui/react` supports it. The current `button.tsx` does not use `asChild` — use the class-on-anchor approach for CTA links.

### Pitfall 4: Timeline Dot Alignment

**What goes wrong:** The dot marker on the timeline appears misaligned or overlaps the vertical line differently across browsers if using margin instead of absolute positioning.

**How to avoid:** Use absolute positioning for the dot relative to its entry container. Key: set `position: relative` on the entry wrapper, and use negative left offset (e.g., `-left-8` to match `pl-8` on parent) for the dot. The dot needs `border-2 border-background` to appear to float over the line.

### Pitfall 5: Section IDs Renamed After Phase 2 Begins

**What goes wrong:** Renaming `id="experience"` to `id="work"` in `ExperienceSection.tsx` breaks Phase 3's Intersection Observer and all navbar anchor links.

**How to avoid:** The six IDs (`hero`, `about`, `experience`, `skills`, `leadership`, `contact`) are locked per STATE.md. Every section component must use exactly those IDs on the outermost `<section>` element.

### Pitfall 6: `<h1>` in a Section Component

**What goes wrong:** Adding `<h1>` inside any section component other than HeroSection breaks the heading hierarchy. The `<h1>` for the page is Harsha's name in HeroSection.

**How to avoid:** Section headings use `<h2>`. Sub-headings within a section (e.g., company name under a role) use `<h3>`. Experience bullets are `<li>` elements, not headings.

---

## Code Examples

### CTA Button Pattern (Hero and Contact)

```tsx
// Source: button.tsx in project, plain <a> wrapper per STATE.md convention
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Option A: <a> wrapping <Button> — use when Button's className suffices
<a href="#contact">
  <Button size="lg">Get In Touch</Button>
</a>

// Option B: <a> styled as button — use when valid HTML nesting is required
<a
  href="/resume.pdf"
  download="Harsha_Vardhini_Resume.pdf"
  className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
>
  Download Resume
</a>
```

Option B is valid HTML (no nested interactive elements) and is the safer choice for the PDF download link.

### Tailwind v4 Token Utility Reference

```
bg-background     → oklch(0.99 0.00 0)      near-white page background
bg-card           → oklch(0.97 0.00 0)      slightly off-white card/section bg
text-foreground   → oklch(0.15 0.01 260)    dark text (near-black)
text-accent       → oklch(0.55 0.10 240)    muted blue for highlights
text-muted-foreground → oklch(0.50 0.01 260) medium gray for secondary text
bg-muted          → oklch(0.93 0.00 0)      light gray for tag pill backgrounds
border-muted      → same token, used as border color
```

All generated automatically from `@theme` in `globals.css`. Use these utility names directly in Tailwind `className` props.

### Responsive Breakpoints in Use

Tailwind v4 default breakpoints (verified — no custom breakpoints defined in `@theme`):
```
sm:  640px+   (tablets in portrait)
md:  768px+   (tablets in landscape)
lg:  1024px+  (desktop)
xl:  1280px+  (large desktop)
```

For DES-05 (375px+ mobile), the base (no prefix) styles are mobile-first. Apply the narrowest layout at base, then override at `sm:` and `lg:`.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 2 is pure code/component authoring with no external service dependencies. All required packages are already in `node_modules`. `public/resume.pdf` was placed in Phase 1.

---

## Open Questions

1. **Phone number display (CONT-03)**
   - What we know: `contactData.phone` is populated (`323-659-8053`) and CONT-03 says "accessible or omitted by choice"
   - What's unclear: Whether to expose it prominently or hide it (privacy vs accessibility)
   - Recommendation (Claude's discretion): Render as small subdued text below the email/LinkedIn buttons. Visible to motivated visitors without being the primary call-to-action.

2. **Education subsection placement in About (ABOUT-02)**
   - What we know: `educationData` has 2 entries; `aboutData.bio` already mentions UTD and Gold Medal inline
   - What's unclear: Does repeating education data below the bio feel redundant?
   - Recommendation (Claude's discretion): Add a compact 2-row education block below the bio using institution names, degree, and graduation dates. The Gold Medal honor deserves visual prominence even if mentioned in the bio. Recruiters scan — redundancy is a feature here, not a bug.

3. **Leadership section compactness vs Experience section depth**
   - What we know: CONTEXT.md says Leadership should be "similar to experience but more compact"
   - What's unclear: Whether to use the same timeline pattern or simpler cards
   - Recommendation (Claude's discretion): Use a simplified timeline — same vertical line and dots, but drop the bullets in favor of the `description` string as a single paragraph. This signals "leadership context" without equating it to professional work experience.

---

## Sources

### Primary (HIGH confidence)

- `harsha-portfolio/src/types/index.ts` — TypeScript contracts for all data shapes; confirmed locked
- `harsha-portfolio/src/data/*.ts` — All 7 data files read directly; content confirmed populated
- `harsha-portfolio/src/app/globals.css` — `@theme` tokens confirmed; all utility classes verified
- `harsha-portfolio/src/app/page.tsx` — Section stubs and locked IDs confirmed
- `harsha-portfolio/src/components/ui/button.tsx` — shadcn Button uses `@base-ui/react`; `buttonVariants` is exported
- `harsha-portfolio/package.json` — All dependencies confirmed; no new installs needed
- `harsha-portfolio/node_modules/next/dist/docs/` — Next.js 16 App Router docs read for Server Component and Link component behavior
- `.planning/STATE.md` — `<a>` vs `<Link>` decision confirmed; section IDs locked confirmed

### Secondary (MEDIUM confidence)

- Phase 1 RESEARCH.md — Tailwind v4 `@theme` token generation pattern verified against globals.css in project
- CONTEXT.md Phase 2 — Locked visual decisions (timeline, pills, alternating backgrounds) used as specification

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — all versions read from `package.json` directly
- Data content: HIGH — all data files read directly; content confirmed
- Architecture: HIGH — patterns derived from existing code + locked decisions from CONTEXT.md
- Pitfalls: HIGH — sourced from STATE.md confirmed decisions + standard HTML/Next.js behavior
- Responsive breakpoints: HIGH — Tailwind v4 defaults; no custom breakpoints in globals.css

**Research date:** 2026-04-03
**Valid until:** 2026-05-03 (stable stack — Next.js 16.x, Tailwind v4 tokens unchanged)
