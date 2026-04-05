# Phase 7: Case Studies - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning
**Mode:** Smart discuss (1 grey area, all recommendations accepted)

<domain>
## Phase Boundary

Add two marketing case studies (UTD International Center Campaign + Rio Jiu Jitsu Marketing Strategy) as inline sections on the single page, rendered via one reusable `CaseStudySection` component fed by two data inputs (Data-as-Prop pattern). Brief supplies all copy verbatim.

In scope: `CaseStudyData` + `CaseStudyBlock` types, `caseStudyUtd.ts` + `caseStudyRio.ts` data files, `CaseStudySection.tsx` component, wire both into page.tsx.

Out of scope: gallery (Phase 8), navbar rewire (Phase 9), section-order finalization (Phase 9).

</domain>

<decisions>
## Implementation Decisions

### Case Study Layout & Structure
- Surface: off-white #F9F9F9 for both studies, subtle separator (hr or border-top) between them
- Block visual structure: left label (Context, What I Did, Execution, Results) + right content on desktop; single column on mobile
- Results block emphasis: large Montserrat display number + small descriptive label
- Include project metadata row at top of each case study: role, timeframe, client
- Section IDs: `case-study-utd` and `case-study-rio` (explicit, deep-linkable, match Phase 9 navbar anchors)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- Typed data singleton pattern from v1.0 (src/types + src/data + src/components/sections)
- buttonVariants not needed -- no CTAs inside case studies
- AnimatedSection wrapper reused for fade-in on scroll

### Established Patterns
- Data-as-Prop: one `CaseStudySection` component receives `data: CaseStudyData` prop; two `<CaseStudySection data={caseStudyUtd} />` calls render two inline sections
- Montserrat applies automatically to h2 via globals.css @layer base
- max-w-5xl for content width, py-24 for vertical spacing

### Integration Points
- Add imports for CaseStudySection + both data files in page.tsx
- Wire between AboutSection and Gallery slot (Gallery doesn't exist yet -- will be handled in Phase 8 position, Phase 9 reorder)

</code_context>

<specifics>
## Specific Ideas

**Brief copy verbatim:**

Case Study 1 -- UTD International Center Campaign:
- Description: "At the UTD International Center, I was responsible for planning and executing digital marketing campaigns to improve student engagement and increase visibility for events and initiatives."
- Context & Challenge: "The International Center faced low engagement levels on social media platforms. Event promotions were not reaching enough students, and there was no structured content strategy guiding marketing efforts."
- What I Did: "I developed a structured content strategy across Instagram and LinkedIn. I designed visually engaging creatives using Canva and ensured consistent branding across all content. I also introduced performance tracking using engagement metrics and optimized posting schedules based on audience behavior."
- Execution Details: "I created and published social media posts, reels, and event promotions on a regular schedule. I designed posters and digital creatives for campaigns and worked closely with internal teams to align messaging. I monitored campaign performance weekly and made data-driven adjustments."
- Results & Impact: "The campaigns led to a 7% increase in engagement. Audience retention improved, and overall visibility of events increased significantly."
- Metric: "7%" + "engagement lift"

Case Study 2 -- Rio Jiu Jitsu Marketing Strategy:
- Description: "Worked on improving brand visibility and customer engagement for Rio Jiu Jitsu through digital marketing strategies."
- Context & Challenge: "The brand lacked a consistent content strategy and had low engagement across its digital platforms. There was also limited optimization of the e-commerce funnel."
- What I Did: "I created structured content plans for Instagram and email marketing. I worked on improving the e-commerce funnel using Shopify and introduced performance tracking for campaigns."
- Execution Details: "I developed promotional content for memberships and merchandise. I supported product marketing efforts and continuously analyzed campaign performance data to refine strategies."
- Results & Impact: "Engagement increased by 5%, customer acquisition strategies improved, and overall brand visibility grew."
- Metric: "5%" + "engagement lift"

Project metadata (from resume, not brief):
- UTD: role "Marketing Graduate Assistant", client "UTD International Center"
- Rio: role "Digital Marketing Specialist", client "Rio Jiu Jitsu"
- Timeframes: from resume data

</specifics>

<deferred>
## Deferred Ideas

- Case study detail pages -- out of scope (single-page portfolio)
- Inline gallery images per case study -- Phase 8 gallery handles visual work
- Client logos or brand marks -- not in brief

</deferred>
