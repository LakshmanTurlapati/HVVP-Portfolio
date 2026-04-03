<!-- GSD:project-start source:PROJECT.md -->
## Project

**Harsha Vardhini Portfolio**

A single-page portfolio website for Harsha Vardhini Veeravalli Prabu, a data-driven digital marketing professional specializing in SEO, social media, and campaign optimization. The site positions her for full-time marketing roles by showcasing her experience, skills, and professional background in a clean, modern format.

**Core Value:** A polished, professional online presence that makes hiring managers want to reach out -- clear narrative, strong credentials (University Gold Medalist, measurable marketing results), easy contact.

### Constraints

- **Tech stack**: React/Next.js -- modern, extensible, good for future enhancements
- **Design system**: Clean minimal aesthetic -- white/off-white/light gray base, dark text, one muted accent color (muted blue, soft green, or warm beige), sans-serif typography (Inter preferred)
- **Layout**: Single scrollable page with section-based navigation, grid layout with consistent spacing
- **Content**: Resume-sourced data only -- no placeholder or fabricated content
- **Accessibility**: Must be navigable and readable on all common devices and screen sizes
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.x (latest: 16.2.2) | App framework, routing, SSG | Industry standard for React portfolios. App Router is stable. Turbopack default means fast dev iteration. Static export or Vercel deploy is trivial. React 19 included. |
| React | 19.x (bundled with Next.js 16) | UI rendering | Comes with Next.js. React Compiler (stable in Next.js 16) auto-memoizes — no manual `useMemo`/`useCallback` needed on a simple portfolio. |
| TypeScript | 5.x (minimum 5.1 required by Next.js 16) | Type safety | Default in `create-next-app`. Catches mistakes early. Small overhead for a simple project, zero downside. |
### Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x (stable since January 22, 2025, latest on GitHub) | Utility-first CSS | CSS-first configuration (no tailwind.config.js). Single `@import "tailwindcss"` in globals.css. 5x faster full builds, 100x faster incremental. @theme directive replaces JS config for custom colors and spacing. Perfect match for the clean minimal design system this project requires. |
| @tailwindcss/postcss | 4.x | PostCSS plugin for Tailwind v4 | Replaces the old `tailwindcss` postcss plugin. Single plugin in postcss.config.mjs. |
### Component Library (Optional, Recommended)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui | Latest (Tailwind v4 support stable as of February 2025) | UI primitives (buttons, cards, nav) | Copy-paste components, not a dependency. Fully supports Tailwind v4. Components are owned by the project — no version lock-in. CLI auto-detects Tailwind version. Uses tw-animate-css (not the deprecated tailwindcss-animate). |
### Animation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Motion (formerly Framer Motion) | 12.x (latest: 12.38.0 as of mid-March 2026) | Scroll-triggered animations, section reveal, subtle transitions | The package was rebranded from `framer-motion` to `motion`. Import from `motion/react` instead of `framer-motion`. Deeply integrated with React lifecycle. Supports `useInView` for scroll-triggered reveals — the primary animation pattern for a portfolio. Layout animations, gesture support, and spring physics available if needed. |
### Font Loading
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/font/google | Bundled with Next.js | Inter font loading | Self-hosts fonts — no external request to Google servers at runtime. Eliminates FOUT/FOIT (flash of unstyled/invisible text). Applies `size-adjust` to fallback font so layout shift is zero. Variable font support means a single font file covers all weights. |
### Deployment
| Platform | Tier | Why |
|----------|------|-----|
| Vercel | Free (Hobby) | Built by the Next.js team. Zero-config deployment. Automatic preview URLs per commit. CDN included. 100GB bandwidth/month — more than enough for a portfolio. Edge network. Free tier is appropriate for a personal non-commercial portfolio. |
## Complete Dependency List
### Production Dependencies
### Dev Dependencies (handled by create-next-app + shadcn init)
# Bootstrap project — includes Next.js 16, React 19, TypeScript, Tailwind v4
# Add shadcn/ui (select only needed components)
# Add animation library
### PostCSS Config
## Alternatives Considered
| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 16 | Vite + React (SPA) | Next.js gives SEO metadata control, `next/font`, `next/image` optimization, and Vercel zero-config deploy. The project explicitly requires SEO-optimized metadata — a pure SPA cannot do this well. |
| Framework | Next.js 16 | Astro | Astro is excellent for content-heavy sites. Portfolio is simple enough that either works, but the project constraint specifies React/Next.js. Astro would require a different mental model. |
| Styling | Tailwind v4 | Tailwind v3 | Greenfield project. v4 is stable, faster, and the create-next-app default. No reason to use older version. |
| Styling | Tailwind | CSS Modules | Tailwind enforces design-system consistency through utility classes. CSS Modules allow arbitrary values that drift over time. For a small team/solo project, Tailwind is strictly better. |
| Animation | Motion | GSAP | GSAP license changed — now requires a paid license for non-open-source commercial projects. The portfolio is personal/professional-use and motion is simpler for scroll-reveal patterns. |
| Animation | Motion | React Spring | Comparable bundle size, but more complex API for the same result. Motion's `whileInView` is the simplest API for portfolio scroll animations. |
| Fonts | next/font/google | Google Fonts CDN link | CDN link: render-blocking, external request, FOUT/FOIT risk, no layout shift prevention. next/font self-hosts and eliminates all of these issues. |
| Deployment | Vercel | Netlify | Both work. Vercel is the Next.js creator — deepest integration, no config. Netlify is a valid backup. |
| Deployment | Vercel | GitHub Pages | GitHub Pages cannot run Next.js App Router without full static export mode, which disables API routes and metadata flexibility. |
## SEO Notes (Relevant to Stack)
## Sources
- [Next.js 16 Release Blog](https://nextjs.org/blog/next-16) — published October 21, 2025
- [Next.js 15.5 Release Blog](https://nextjs.org/blog/next-15-5) — version history and upgrade path
- [Next.js npm page](https://www.npmjs.com/package/next) — version 16.2.2 current as of 2026-04-03
- [Tailwind CSS v4 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) — stable January 22, 2025
- [Tailwind CSS Next.js Install Guide](https://tailwindcss.com/docs/guides/nextjs) — official PostCSS setup
- [Motion for React (Get Started)](https://motion.dev/docs/react) — canonical docs for the renamed library
- [framer-motion npm](https://www.npmjs.com/package/framer-motion) — version 12.38.0, active as of 2026-04-03
- [shadcn/ui Tailwind v4 docs](https://ui.shadcn.com/docs/tailwind-v4) — February 2025 support confirmed
- [shadcn/ui Changelog February 2025](https://ui.shadcn.com/docs/changelog/2025-02-tailwind-v4)
- [Next.js Font Optimization Docs](https://nextjs.org/docs/app/getting-started/fonts)
- [Vercel vs Netlify Comparison — Codecademy](https://www.codecademy.com/article/vercel-vs-netlify-which-one-should-you-choose)
- [Vercel vs Netlify vs Cloudflare 2025](https://www.ai-infra-link.com/vercel-vs-netlify-vs-cloudflare-pages-2025-comparison-for-developers/)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
