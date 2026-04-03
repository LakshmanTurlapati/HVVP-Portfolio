# Technology Stack

**Project:** Harsha Vardhini Portfolio
**Domain:** Single-page marketing professional portfolio
**Researched:** 2026-04-03
**Research Mode:** Ecosystem

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.x (latest: 16.2.2) | App framework, routing, SSG | Industry standard for React portfolios. App Router is stable. Turbopack default means fast dev iteration. Static export or Vercel deploy is trivial. React 19 included. |
| React | 19.x (bundled with Next.js 16) | UI rendering | Comes with Next.js. React Compiler (stable in Next.js 16) auto-memoizes — no manual `useMemo`/`useCallback` needed on a simple portfolio. |
| TypeScript | 5.x (minimum 5.1 required by Next.js 16) | Type safety | Default in `create-next-app`. Catches mistakes early. Small overhead for a simple project, zero downside. |

**Confidence: HIGH** — Verified against nextjs.org/blog/next-16 (published October 21, 2025) and npm (16.2.2, published 2 days ago as of 2026-04-03).

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x (stable since January 22, 2025, latest on GitHub) | Utility-first CSS | CSS-first configuration (no tailwind.config.js). Single `@import "tailwindcss"` in globals.css. 5x faster full builds, 100x faster incremental. @theme directive replaces JS config for custom colors and spacing. Perfect match for the clean minimal design system this project requires. |
| @tailwindcss/postcss | 4.x | PostCSS plugin for Tailwind v4 | Replaces the old `tailwindcss` postcss plugin. Single plugin in postcss.config.mjs. |

**Do NOT use:** Tailwind v3. It still works but v4 is stable, faster, and the new default in `create-next-app`. No reason to start a greenfield project on the old version.

**Do NOT use:** CSS Modules. They add per-component file overhead with no benefit over Tailwind for a single-page portfolio. Harder to maintain design consistency across sections.

**Do NOT use:** styled-components or Emotion. Runtime CSS-in-JS adds bundle weight and hydration cost. Not needed.

**Confidence: HIGH** — Verified against tailwindcss.com/blog/tailwindcss-v4 and tailwindcss.com/docs/guides/nextjs.

### Component Library (Optional, Recommended)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui | Latest (Tailwind v4 support stable as of February 2025) | UI primitives (buttons, cards, nav) | Copy-paste components, not a dependency. Fully supports Tailwind v4. Components are owned by the project — no version lock-in. CLI auto-detects Tailwind version. Uses tw-animate-css (not the deprecated tailwindcss-animate). |

**Use shadcn/ui selectively:** Only pull in components you actually use (Button, Card, NavigationMenu, Separator). Do not install the entire library.

**Do NOT use:** Material UI, Chakra UI, or Ant Design. They impose opinionated design systems that conflict with the custom minimal aesthetic this portfolio needs.

**Confidence: HIGH** — Verified against ui.shadcn.com/docs/tailwind-v4 and ui.shadcn.com/docs/changelog.

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Motion (formerly Framer Motion) | 12.x (latest: 12.38.0 as of mid-March 2026) | Scroll-triggered animations, section reveal, subtle transitions | The package was rebranded from `framer-motion` to `motion`. Import from `motion/react` instead of `framer-motion`. Deeply integrated with React lifecycle. Supports `useInView` for scroll-triggered reveals — the primary animation pattern for a portfolio. Layout animations, gesture support, and spring physics available if needed. |

**Install as:** `npm install motion` (not `npm install framer-motion` — the old name still works but the canonical package is now `motion`).

**Animation scope for this project:** Keep it conservative. Use `initial`/`animate`/`whileInView` on section wrappers for fade-up-on-scroll. Avoid over-animating — this is a professional recruiter-facing site, not a creative agency showcase.

**Do NOT use:** GSAP. Overkill for this use case. Adds complexity and the license model changed for commercial work.

**Do NOT use:** React Spring. Larger bundle, more complex API for the same scroll reveals Motion handles cleanly.

**Do NOT use:** CSS-only animations (keyframes). Fine for hover states, but cannot handle scroll-triggered reveals without an IntersectionObserver wrapper — Motion provides this out of the box.

**Confidence: HIGH** — Verified against motion.dev and npmjs.com/package/framer-motion (version 12.38.0, active maintenance confirmed).

### Font Loading

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/font/google | Bundled with Next.js | Inter font loading | Self-hosts fonts — no external request to Google servers at runtime. Eliminates FOUT/FOIT (flash of unstyled/invisible text). Applies `size-adjust` to fallback font so layout shift is zero. Variable font support means a single font file covers all weights. |

**Pattern to follow:**
```ts
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',   // Expose as CSS variable for Tailwind
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

```css
/* app/globals.css — Tailwind v4 CSS-first config */
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

**Do NOT use:** `<link>` tags pointing to fonts.googleapis.com. This creates an external dependency, adds a render-blocking network request, and forfeits the FOUT protection that `next/font` provides.

**Do NOT use:** Local font files managed manually. `next/font/google` handles download, self-hosting, and cache headers automatically.

**Confidence: HIGH** — Verified against nextjs.org/docs/app/getting-started/fonts and confirmed in Next.js 16 App Router docs.

### Deployment

| Platform | Tier | Why |
|----------|------|-----|
| Vercel | Free (Hobby) | Built by the Next.js team. Zero-config deployment. Automatic preview URLs per commit. CDN included. 100GB bandwidth/month — more than enough for a portfolio. Edge network. Free tier is appropriate for a personal non-commercial portfolio. |

**Confidence: HIGH** — Verified against vercel.com free tier and Netlify vs Vercel comparisons from multiple sources.

**Alternative if needed:** Netlify. Also free, also supports Next.js App Router, also zero-config. Choose Netlify if you anticipate monetizing the site or if the free tier's commercial use concern is a factor. For a personal portfolio, Vercel's free Hobby tier is appropriate.

**Do NOT use:** GitHub Pages. Does not support Next.js SSR or API routes. Limited to fully static exports with manual configuration. Not worth the friction when Vercel is free and zero-config.

**Do NOT use:** Self-hosted VPS (DigitalOcean, Linode). Operational overhead with no benefit for a static/SSG portfolio.

---

## Complete Dependency List

### Production Dependencies

```bash
npm install motion
```

### Dev Dependencies (handled by create-next-app + shadcn init)

```bash
# Bootstrap project — includes Next.js 16, React 19, TypeScript, Tailwind v4
npx create-next-app@latest harsha-portfolio \
  --typescript \
  --eslint \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

# Add shadcn/ui (select only needed components)
npx shadcn@latest init
npx shadcn@latest add button card separator

# Add animation library
npm install motion
```

### PostCSS Config

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

---

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

---

## SEO Notes (Relevant to Stack)

Next.js 16 App Router provides a `Metadata` API exported from page files. For this portfolio:

```ts
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Harsha Vardhini Veeravalli Prabu — Digital Marketing',
  description: 'MS Marketing @ UT Dallas. SEO, SEM, social media, and campaign optimization specialist.',
  openGraph: { ... },
}
```

This renders as real `<meta>` tags in SSG output — crawlable by Google and LinkedIn preview cards. This is why a pure SPA was rejected.

---

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
