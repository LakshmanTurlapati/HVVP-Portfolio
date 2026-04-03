# Feature Landscape

**Domain:** Marketing professional portfolio website (job-seeking, single-page)
**Project:** Harsha Vardhini Portfolio
**Researched:** 2026-04-03
**Overall Confidence:** HIGH (multiple corroborating sources, current year)

---

## Table Stakes

Features users (hiring managers and recruiters) expect. Missing any of these = the portfolio feels unprofessional or incomplete, and the candidate is passed over.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section with name + specialty + CTA | Hiring managers spend ~55 seconds on a portfolio; they need to understand who you are in under 3 seconds | Low | Tagline must convey specialization, not just "marketer." CTA should be "Contact" or "Download Resume." |
| Professional headshot / photo | Builds human connection and trust; absence feels evasive | Low | High-quality photo only. No low-res or casual shots. |
| About / Bio section | Context behind the resume; marketing philosophy, story, personality | Low | One concise paragraph max. Ties credentials to narrative. |
| Work history / Experience section with measurable results | 78% of hiring managers now expect demonstrated work; vague claims fail | Medium | Must include metrics ("increased CTR by 32%"), not just job descriptions. |
| Education section | Credential validation; expected for new graduates | Low | Gold Medal and UTD MS Marketing are strong differentiators -- feature them prominently here. |
| Skills and tools section | Recruiters scan for platform proficiency (Google Analytics, HubSpot, Meta Ads, etc.) | Low | Logos/icons make this section scannable. List platforms over generic adjectives. |
| Contact section with email + LinkedIn | 44% of visitors leave if contact info is hard to find | Low | Email, LinkedIn link minimum. Contact form is strongly preferred over email-only. |
| Mobile responsive design | A digital marketer's broken mobile site is a red flag to employers -- signals poor UX awareness | Medium | Mobile-first layout. Test on iOS Safari and Android Chrome. |
| Smooth scroll navigation | Expected on single-page layouts; anchor links must work | Low | Fixed or sticky nav with section anchors. Active section highlighting is a plus. |
| SEO meta tags (title, description, Open Graph) | Hiring managers Google candidates; a findable portfolio ranks above peers | Low | Title tag: name + specialty. OG tags for LinkedIn share previews. |
| Readable typography and visual hierarchy | Poor readability is a red flag for any creative professional | Low | Inter or equivalent sans-serif. Dark text on light background. Minimum 16px body. |
| Fast load time (LCP under 2.5s) | Core Web Vitals affect both search ranking and first impressions; slow sites signal poor technical awareness | Medium | Optimize images (WebP/AVIF), minimize JS bundle, use Next.js static generation. |
| Accessible color contrast and keyboard navigation | WCAG 2.2 AA is baseline expectation; inaccessible site fails on principle for a professional who should know better | Medium | 4.5:1 contrast ratio for body text. All interactive elements keyboard-reachable. |

---

## Differentiators

Features that give competitive advantage. Recruiters don't always expect these, but they tip decisions in your favor when present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Downloadable PDF resume button | Recruiters still request PDFs in some workflows; frictionless access is appreciated | Low | Prominent "Download Resume" button in hero or nav. Hosted as a static PDF asset. |
| Certifications / badges section | Visual proof of continuous learning; Google, HubSpot, Meta credentials are instantly recognizable | Low | Show credential logos. Link out to verification pages when possible. |
| Leadership roles / extracurricular section | Differentiates candidates with thin professional experience; signals initiative and community engagement | Low | Harsha's Global Ambassador, Kotler's Quorum President, PMC Officer roles belong here. |
| Metrics callout / stat highlights | Quantified achievements visually emphasized (e.g., "35% increase in organic traffic") stop scanners in their tracks | Low-Medium | Pull 3-5 headline numbers from experience and display them prominently near hero or in experience cards. |
| Fade-in scroll animations (subtle) | Adds polish and perceived quality; demonstrates design awareness | Low-Medium | Framer Motion or CSS intersection observer. Keep subtle -- entrance animations only, not parallax. |
| JSON-LD structured data (Person schema) | Enables rich search results; improves name-search discoverability; signals technical sophistication | Low | One script block in `<head>` with name, jobTitle, url, sameAs (LinkedIn). Next.js App Router supports this natively. |
| Social proof / testimonial section | Quotes from managers or colleagues validate claims; rare enough in marketing portfolios to stand out | Medium | Even 1-2 short attributed quotes carry weight. Depends on whether Harsha can collect these. |
| Canonical URL + sitemap.xml | Ensures Google indexes the right URL version; prevents duplicate content issues | Low | Next.js can auto-generate sitemap with `next-sitemap` package. |
| Active state on nav items during scroll | Shows technical polish; aids orientation on a long single-page site | Low | Intersection Observer API tracking section visibility. |
| Print-friendly stylesheet | Recruiters occasionally print pages; well-formatted print output signals thoroughness | Low | CSS `@media print` hiding nav, footer, background colors. |
| Visible "Open to Work" / availability statement | Removes recruiter uncertainty about whether the candidate is actively looking | Low | One line in hero or footer: "Available for full-time roles · Authorized to work in US for up to 36 months." |

---

## Anti-Features

Features to deliberately NOT build. Each one adds cost without proportional benefit for this project's goals and timeline.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Blog / content publishing | Out of scope per PROJECT.md; requires CMS, maintenance, and content strategy that doesn't exist yet | Add LinkedIn profile link as the "thought leadership" proof point |
| Case study detail pages (multi-page routing) | No case studies available; placeholder content is a portfolio red flag that breaks trust | Use metric-rich experience cards in a single Experience section instead |
| Dark mode toggle | Marketing portfolios target warmth and approachability, not tech-brand premium; toggling adds complexity, doubles design system work, and the minimal aesthetic is better served by a clean light theme | Commit fully to light theme with strong contrast |
| Heavy scroll-jacking or parallax effects | Degrades performance on mobile, causes motion sickness for some users, and signals "designed for the designer, not the recruiter" | Use entrance animations only (fade-in-up on scroll into view) |
| Animations that block content | Any animation that delays when text becomes readable hurts the 55-second recruiter window | Animate with `opacity`/`transform`, never delay initial paint |
| AI chatbot or virtual assistant | Adds infrastructure, raises privacy questions, and feels gimmicky for a job-seeking portfolio | Let the contact form do the job |
| Password-protected sections | Creates unnecessary friction; Harsha has no NDA-constrained work to hide | Keep everything public |
| Social media feed embed (Instagram, Twitter) | Live feeds create layout instability, performance drag, and content that is out of your control | Link out to LinkedIn profile instead |
| Multi-language support | English-only is explicitly out of scope; US market only | -- |
| Video autoplay | Unexpected audio or motion is jarring, especially in a quiet office; increases LCP and layout shift | Use static image with optional video link if needed |
| Visitor analytics dashboard (public-facing) | Nobody needs to see this except the site owner | Add Google Analytics (GA4) via `next/script` as a private internal tool |
| Admin/CMS panel | No dynamic content updates are needed; static export is simpler and more reliable | Use hardcoded or JSON-config content; update by deploying |
| Cookie consent banner | No tracking cookies needed if GA4 is configured in anonymized mode or omitted entirely | If GA4 is added later, configure it anonymized or add minimal consent on first interaction |

---

## Feature Dependencies

```
Mobile responsive design --> All section layouts
Smooth scroll navigation --> Fixed/sticky nav component --> Active section state tracking
Contact form --> Email delivery mechanism (EmailJS, Formspree, or server action)
Downloadable resume --> PDF file hosted in /public directory
JSON-LD Person schema --> SEO meta tags (both live in Next.js head/layout)
Fade-in scroll animations --> Intersection Observer or Framer Motion dependency
Certifications section --> Actual credential images/logos available
Social proof section --> Testimonial text collected from real sources
Metrics callout highlights --> Verified numbers from actual work experience
```

---

## MVP Recommendation

Prioritize (Phase 1 -- must ship):

1. Hero section (name, tagline, photo, CTA to contact + resume download)
2. About / Bio section
3. Experience section with measurable achievements in each role
4. Skills and tools section (platform logos, key categories)
5. Education section (UTD, Gold Medal prominently featured)
6. Contact section (email link + LinkedIn + contact form)
7. Responsive layout across mobile, tablet, desktop
8. SEO meta tags (title, description, Open Graph, canonical)
9. Smooth scroll navigation with anchor links

Defer to Phase 2 (post-launch validation):

- JSON-LD Person schema (low effort, add early in Phase 2)
- Fade-in scroll animations (polish pass after content is finalized)
- Certifications/badges section (only after credentials are gathered)
- Social proof / testimonials (only if Harsha can collect quotes)
- Active nav state on scroll (polish, not blocking)
- Print stylesheet

Explicitly out of scope (never build unless PROJECT.md changes):

- Blog, CMS, case study pages, dark mode, social embeds, chatbot

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Table stakes sections | HIGH | Consistent across BrainStation, Marketer Milk, Artisan Talent, MarketerHire sources |
| Recruiter behavior (55-second scan, 78% expect portfolio) | MEDIUM | Cited by multiple sources but specific percentages from secondary research |
| Anti-features rationale | HIGH | Directly corroborated by recruiter red-flag lists and project constraints |
| SEO/structured data | HIGH | Verified against Next.js official docs and Google guidelines |
| Accessibility standards | HIGH | WCAG 2.2 AA is official W3C standard, Core Web Vitals from Google |
| Dark mode verdict (avoid for marketing) | MEDIUM | Supported by design trend analysis; light theme is more conservative/safe choice |

---

## Sources

- [20 Inspiring Marketing Portfolio Examples 2026 - Marketer Milk](https://www.marketermilk.com/blog/marketing-portfolio-examples)
- [How to Make a Marketing Portfolio (2026 Guide) - BrainStation](https://brainstation.io/career-guides/how-to-build-a-digital-marketing-portfolio)
- [Portfolio for Digital Marketing 2026 - Complete Guide](https://dizispark.com/portfolio-for-digital-marketing-complete-guide/)
- [How to Fix Your Creative Portfolio - Artisan Talent](https://creative.artisantalent.com/portfolio-red-flags)
- [Digital Marketing Hiring Trends 2026 - Method Recruiting](https://www.methodrecruiting.com/digital-marketing-hiring-trends-2026/)
- [JSON-LD Guide - Next.js Official Docs](https://nextjs.org/docs/app/guides/json-ld)
- [Core Web Vitals Optimization Guide 2026](https://skyseodigital.com/core-web-vitals-optimization-complete-guide-for-2026/)
- [Web Performance Best Practices 2026](https://solidappmaker.com/web-performance-in-2026-best-practices-for-speed-security-core-web-vitals/)
- [Contact Page Best Practices - Huemor](https://huemor.rocks/blog/contact-page-design/)
- [How Recruiters Actually Look at Your Portfolio - Open Doors Careers](https://blog.opendoorscareers.com/p/how-recruiters-and-hiring-managers-actually-look-at-your-portfolio)
- [Meta Tags Guide 2026 - SEWWA](https://www.sewwa.com/meta-tags-guide-2026/)
- [Web Design Trends 2026 - Figma](https://www.figma.com/resource-library/web-design-trends/)
