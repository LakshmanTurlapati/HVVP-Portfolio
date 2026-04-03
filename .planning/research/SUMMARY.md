# Project Research Summary

**Project:** Harsha Vardhini Portfolio
**Domain:** Single-page marketing professional portfolio (job-seeking)
**Researched:** 2026-04-03
**Confidence:** HIGH

## Executive Summary

This is a recruiter-facing, single-page portfolio for a data-driven digital marketing professional with a strong academic credential (University Gold Medal, MS Marketing at UT Dallas). Research across industry hiring guides and technical documentation confirms that the primary job of the site is to pass a 55-second recruiter scan — which means immediate identity clarity in the hero, measurable achievements in every experience bullet, and frictionless contact. The recommended build approach is Next.js 16 with static generation, Tailwind CSS v4, and the Motion library for subtle scroll animations. Content lives in typed TypeScript data files with no CMS, no API routes, and no runtime data fetching.

The recommended architecture is deliberately minimal: one page (`app/page.tsx`) composed of six section components, all Server Components except the Navbar. All content is sourced from `src/data/*.ts` typed files, making updates a matter of editing a data file and redeploying — no component surgery required. Deployment to Vercel's free Hobby tier is zero-config and appropriate for a personal non-commercial portfolio.

The key risks are non-technical: a vague hero tagline, experience bullets without metrics, and a broken or hard-to-find contact path account for most recruiter drop-off. Technical risks are mitigated by stack choices: `next/font` prevents font CLS, `next/image` prevents image performance failures, and third-party form services (Formspree or Web3Forms) eliminate the need for custom API routes. Both mobile-first layout discipline and accessibility from the start (semantic HTML, 4.5:1 contrast, keyboard navigation) are non-negotiable — a digital marketer's broken mobile site is a direct credibility signal.

---

## Stack Recommendation

Use Next.js 16 (App Router, static generation), TypeScript 5.x, Tailwind CSS v4 (CSS-first config via `@import "tailwindcss"` and `@theme` directive), Motion 12.x (imported from `motion/react`) for scroll-reveal animations, `next/font/google` for zero-CLS Inter font loading, and shadcn/ui selectively (Button, Card, Separator only). Deploy to Vercel free Hobby tier. Bootstrap with `create-next-app@latest --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"`, then `npx shadcn@latest init`, then `npm install motion`.

Do not use: CSS-in-JS libraries, CSS Modules, GSAP, Material UI, GitHub Pages, or any form of server-side rendering or API routes. All content is static; treat this as an SSG site with React polish.

---

## Key Findings

### Recommended Stack

Next.js 16 is verified stable (16.2.2 on npm as of 2026-04-03) and is the unambiguous choice for a portfolio that requires real meta tags for SEO — pure SPAs cannot render `<meta>` tags that search crawlers and LinkedIn preview cards consume. React Compiler in Next.js 16 auto-memoizes, eliminating the need for manual `useMemo`/`useCallback`.

**Core technologies:**
- Next.js 16 + React 19: App Router with SSG — the framework for routing, metadata API, `next/image`, and `next/font`
- TypeScript 5.x: default in `create-next-app`; catches content data shape errors before runtime
- Tailwind CSS v4: CSS-first config, 5x faster builds, `@theme` directive for design tokens — no `tailwind.config.js` needed
- Motion 12.x: `whileInView` for scroll-reveal animations; install as `motion`, import from `motion/react`
- next/font/google: self-hosted Inter, zero layout shift, no external CDN round-trip
- shadcn/ui (selective): copy-paste primitives that own the project — no version lock-in
- Vercel Hobby: zero-config deployment, automatic preview URLs, CDN included

### Table Stakes Features

Must ship before launch — missing any of these signals an incomplete or unprofessional portfolio to recruiters:

- Hero section: name, specialization tagline (not generic), CTA to contact and resume download within one viewport
- Professional headshot (high-quality only)
- About / Bio section (one concise paragraph tying credentials to narrative)
- Experience section with measurable achievements — every bullet must contain a metric (%, $, time, scale)
- Skills and tools section grouped by category with platform logos/icons
- Education section with UTD MS Marketing and Gold Medal featured prominently
- Contact section: email link, LinkedIn URL, working contact form
- Fully responsive layout tested at 375px, 390px, and 414px on iOS Safari and Android Chrome
- Smooth scroll navigation with anchor links and a sticky header
- SEO meta tags: title, description, Open Graph, canonical URL
- Fast load time: LCP under 2.5s, CLS under 0.1

### Should-Have Features (Differentiators)

- Downloadable PDF resume button in hero or nav
- Metrics callout / stat highlights (3-5 headline numbers pulled near hero or at section tops)
- Certifications / badges section with credential logos linked to verification pages
- Leadership and extracurricular roles section (Global Ambassador, Kotler's Quorum President, PMC Officer)
- Fade-in scroll animations (subtle, entrance-only, `prefers-reduced-motion` respected)
- JSON-LD Person schema in `<head>` (name, jobTitle, alumniOf, url, sameAs LinkedIn)
- Active section highlight on nav items during scroll (Intersection Observer)
- Open Graph image (1200x630px) for social share previews
- Visible "Open to Work" / availability statement in hero or footer

### Defer to Post-Launch (v2+)

- Social proof / testimonials (only if quotes can be collected from real sources)
- Print-friendly stylesheet
- Sitemap.xml via `next-sitemap`
- Google Analytics (GA4) via `next/script`, anonymized mode

### Anti-Features (Never Build)

Blog, CMS, dark mode toggle, case study detail pages, heavy parallax, AI chatbot, social feed embeds, admin panel, multi-language support, password-protected sections.

### Architecture Approach

The entire site is one page (`app/page.tsx`) rendering a linear stack of section components in a single scrollable canvas. Navigation is a sticky anchor-link header — no `next/link` for same-page anchors (known Next.js open issue: `<Link>` suppresses browser scroll behavior; use plain `<a href="#section">` tags with `scroll-behavior: smooth` in global CSS). All section components are React Server Components. Only `Navbar` is a Client Component (`'use client'`) because it needs `useState`/`useEffect` for scroll detection and mobile menu toggle. Content is imported directly from `src/data/*.ts` typed files — no prop drilling, no Context, no state management library.

**Major components:**
1. `RootLayout` (app/layout.tsx) — HTML shell, Inter font via `next/font`, Metadata API export, global CSS
2. `Navbar` (Client Component) — sticky header, plain `<a>` anchor links, `useActiveSection` hook, mobile hamburger
3. Section components (Server Components) — `HeroSection`, `AboutSection`, `ExperienceSection`, `SkillsSection`, `EducationSection`, `ContactSection`
4. `src/data/*.ts` files — source of truth for all content; typed interfaces in `src/types/index.ts`
5. `useActiveSection` hook — Intersection Observer watches all `section[id]` elements, returns active ID for Navbar highlight

**Critical dependency:** Section `id` attributes must be finalized before the Navbar active-section logic is written. Renaming section IDs after that point breaks nav highlight behavior.

### Critical Pitfalls

1. **Vague hero tagline** — Draft the tagline before writing any code. It must name the specific discipline: "Data-Driven Digital Marketer | SEO, Social Media & Campaign Analytics." Recruiter exits within 55 seconds if identity is unclear.

2. **Experience bullets without metrics** — Audit Harsha's resume for quantified achievements before implementing any section. Every bullet must follow: Action + Metric + Context. The absence of numbers directly contradicts a "data-driven" positioning claim.

3. **Mobile-last design** — Write base styles for mobile first, apply `md:` / `lg:` modifiers for larger screens. Test at 375px throughout development, not only at the end. Navigation hamburger menu must be keyboard-accessible. Touch targets minimum 44x44px.

4. **Broken contact path** — Use Formspree, Web3Forms, or EmailJS. Test the form end-to-end (submit → receive email → see confirmation) before marking the section done. A motivated recruiter who cannot contact the candidate is a total loss.

5. **Core Web Vitals failures** — Use `next/image` for every image (never `<img>`), `next/font` for Inter (never Google Fonts CDN link), add `priority` prop to above-the-fold images, set explicit `width`/`height` on all images. Run Lighthouse before launch.

---

## Implications for Roadmap

### Phase 1: Foundation and Content Preparation

**Rationale:** Content decisions must precede code. The experience bullets must be metric-rich before any component is written or the data shape is designed around vague copy. Scaffold and data layer are the dependency for everything else.

**Delivers:** Runnable project scaffold, complete typed data files with all content finalized, Inter font wired, SEO metadata exported from layout.

**Addresses:** Table stakes features (all section content), pitfalls 1 and 2 (hero tagline drafted, metrics audited before any code).

**Tasks:**
- `create-next-app` with TypeScript, Tailwind v4, App Router, `src/` directory
- `npx shadcn@latest init` + add Button, Card, Separator
- `npm install motion`
- Finalize hero tagline copy (name + specialization + CTA text)
- Audit resume; write all experience bullets with metrics
- Populate `src/types/index.ts` with TypeScript interfaces
- Populate all `src/data/*.ts` files (hero, about, experience, skills, education, contact)
- Wire `next/font/google` Inter in `app/layout.tsx`
- Export `metadata` object from `app/layout.tsx` (title, description, Open Graph, canonical)
- Add custom favicon (initials HV in accent color)
- Add `resume.pdf` to `/public`

**Avoids:** Pitfall 1 (vague tagline), Pitfall 2 (no metrics), Pitfall 4 (over-engineering — static data layer keeps complexity minimal)

---

### Phase 2: Core Section Build (Structure and Content)

**Rationale:** With typed data files finalized, all sections can be implemented as Server Components reading from data. Section IDs must be established here before Navbar active-section logic is written.

**Delivers:** All six sections rendered with correct content, section `id` attributes locked, `app/page.tsx` composing sections in order, basic mobile-first layout on each section.

**Addresses:** All table stakes sections (Hero, About, Experience, Skills, Education, Contact).

**Tasks:**
- Implement `app/page.tsx` composing all sections
- Implement each section component reading from its data file with mobile-first Tailwind layout
- Hero: headshot via `next/image` with `priority`, name, tagline, CTA buttons
- Experience: metric-rich bullet cards
- Skills: grouped by category with logos
- Education: UTD and Gold Medal prominently featured
- Contact: email link, LinkedIn link, Formspree/Web3Forms form integration
- Test contact form end-to-end (submit → email received → confirmation shown)
- Establish and lock all `section[id]` attribute values

**Avoids:** Pitfall 3 (mobile-first from the start), Pitfall 5 (`next/image` for headshot), Pitfall 7 (contact form tested before moving on)

---

### Phase 3: Navigation and Interactivity

**Rationale:** Navbar depends on section IDs being finalized (Phase 2). Active-section hook depends on Navbar existing. This is a hard sequential dependency from architecture research.

**Delivers:** Sticky `Navbar` with plain `<a>` anchor links, working mobile hamburger menu, `useActiveSection` hook wired for nav highlight, smooth scroll globally in CSS.

**Tasks:**
- Implement `Navbar` as Client Component with plain `<a href="#section">` anchors (not `<Link>`)
- Add `scroll-behavior: smooth` to `html` in `globals.css`
- Implement mobile hamburger toggle with keyboard accessibility (focus management, `aria-expanded`)
- Implement `useActiveSection` hook with Intersection Observer
- Wire active state into Navbar link styling
- Implement `Footer` with copyright and social links

**Avoids:** Pitfall 3 (accessible mobile nav built correctly from the start, not bolted on), anti-pattern of using Next.js `<Link>` for same-page anchors

---

### Phase 4: Polish — Animations, Differentiators, and Accessibility QA

**Rationale:** Animation and polish come after structure and content are stable. Accessibility is validated before the site is considered shippable.

**Delivers:** Subtle scroll-reveal animations on section entry, metrics callout highlights, JSON-LD Person schema, OG image, accessibility passing Lighthouse, Lighthouse performance score above 90.

**Tasks:**
- Add `whileInView` fade-in-up animation wrappers to section components using Motion
- Wrap all animations with `prefers-reduced-motion` check
- Add metrics callout component (3-5 headline numbers near hero or section tops)
- Add JSON-LD Person schema script block to `app/layout.tsx`
- Create 1200x630px OG image and wire `og:image` meta tags
- Add "Open to Work / availability" statement to hero or footer
- Run axe or Lighthouse Accessibility audit; fix all errors (contrast, alt text, form labels, keyboard nav)
- Add skip-navigation link before `<nav>`
- Verify all color choices against WebAIM Contrast Checker (4.5:1 minimum for body text)
- Run Lighthouse Performance audit; target LCP under 2.5s and CLS under 0.1
- Test on real devices at 375px, 390px, 414px

**Avoids:** Pitfall 8 (animations kept subtle, entrance-only, `prefers-reduced-motion` respected), Pitfall 9 (accessibility from this phase's checklist), Pitfall 12 (OG image for social share previews)

---

### Phase 5: Pre-Launch QA and Deployment

**Rationale:** Final verification pass before the site is shareable with recruiters.

**Delivers:** Live Vercel deployment, Google Search Console submitted, all links verified, copy proofread.

**Tasks:**
- Deploy to Vercel (connect GitHub repo, zero-config)
- Verify custom domain (if applicable) with canonical URL
- Submit sitemap to Google Search Console
- Validate OG tags using LinkedIn Post Inspector
- Proofread all visible copy (nav labels, section headers, button text, bio, experience bullets, footer)
- Check all external links (LinkedIn profile URL, email, certification verification links)
- Run final Lighthouse audit on deployed URL (not localhost)
- Test contact form on production

**Avoids:** Pitfall 6 (SEO indexed correctly), Pitfall 7 (contact form verified on production), Pitfall 11 (typos caught before launch)

---

### Phase Ordering Rationale

- Content before code: experience metrics must be decided before the data shape and components are written (Pitfall 2 prevention)
- Data layer before components: typed `src/data/*.ts` files are the dependency for all section components
- Section IDs before Navbar: this is a hard architectural dependency documented in ARCHITECTURE.md
- Polish after structure: animations and differentiator features added only after all content sections are stable and tested
- QA after all features: accessibility and performance audits are most efficient as a final pass, not piecemeal

### Research Flags

Phases with well-documented patterns — no additional research needed during planning:
- Phase 1 (Foundation): Next.js scaffold and Tailwind v4 setup are fully documented; shadcn/ui CLI handles integration automatically
- Phase 2 (Core sections): Server Components with static data imports is the canonical Next.js App Router pattern
- Phase 3 (Navigation): Plain anchor links with Intersection Observer is a documented pattern; implementation code is in ARCHITECTURE.md

Phases that may benefit from light validation during implementation:
- Phase 4 (Animations): Verify `motion/react` `whileInView` API against current Motion 12.x docs if behavior is unexpected — the `framer-motion` to `motion` rebrand introduced import path changes
- Phase 5 (Deployment): Confirm Vercel Hobby tier limits have not changed if any monetization or commercial use is anticipated

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified against official npm and framework release blogs as of 2026-04-03 |
| Features | HIGH | Table stakes consistent across multiple independent recruiter and industry hiring sources; anti-features directly supported by research |
| Architecture | HIGH | Patterns verified against Next.js official docs, known open issues documented (Link anchor scroll), and real portfolio implementations |
| Pitfalls | HIGH | Critical pitfalls corroborated by WebAIM Million 2026 report, PageSpeed research, and recruiter behavior studies |

**Overall confidence:** HIGH

### Gaps to Address

- **Contact form service selection:** Research confirms third-party services (Formspree, Web3Forms, EmailJS) are the correct pattern. The specific service choice (pricing tiers, rate limits) should be confirmed against current offerings before implementation.
- **Harsha's actual resume metrics:** The content research assumes measurable achievements exist in the source resume. If specific numbers are unavailable for some roles, the experience section strategy may need to fall back to scale indicators — this should be confirmed during Phase 1 content prep, not during section implementation.
- **Custom domain:** If a custom domain is planned, canonical URL, DNS configuration, and Vercel domain setup add minor complexity to Phase 5. Not researched in detail because it is not confirmed in scope.

---

## Sources

### Primary (HIGH confidence — official documentation)
- nextjs.org/blog/next-16 — Next.js 16 release, React Compiler, App Router stability
- tailwindcss.com/blog/tailwindcss-v4 — Tailwind v4 stable release, CSS-first config
- tailwindcss.com/docs/guides/nextjs — official PostCSS setup for Next.js
- ui.shadcn.com/docs/tailwind-v4 — shadcn/ui Tailwind v4 support confirmation
- motion.dev/docs/react — Motion 12.x canonical docs (whileInView API)
- nextjs.org/docs/app/getting-started/fonts — next/font/google patterns
- nextjs.org/docs/app/getting-started/project-structure — App Router file organization
- nextjs.org/docs/app/getting-started/metadata-and-og-images — Metadata API
- nextjs.org/docs/app/guides/json-ld — JSON-LD Person schema in Next.js
- webaim.org/projects/million/ — WebAIM Million 2026 accessibility failure rates

### Secondary (HIGH confidence — corroborated industry sources)
- marketermilk.com/blog/marketing-portfolio-examples — 2026 portfolio feature expectations
- brainstation.io/career-guides/how-to-build-a-digital-marketing-portfolio — recruiter behavior data
- methodrecruiting.com/digital-marketing-hiring-trends-2026 — hiring manager expectations
- pagepro.co/blog/common-nextjs-mistakes-core-web-vitals — Next.js performance anti-patterns
- github.com/vercel/next.js/issues/51721 — Next.js Link smooth scroll open issue (confirmed)

### Tertiary (MEDIUM confidence — single or secondary sources)
- Recruiter "55-second scan" and "78% expect portfolio" statistics — cited by multiple sources but derived from secondary research; treat as directional, not precise

---
*Research completed: 2026-04-03*
*Ready for roadmap: yes*
