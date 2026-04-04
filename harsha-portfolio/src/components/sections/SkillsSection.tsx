// SkillsSection.tsx
// Server Component -- no "use client" directive
// Renders 3 skill groups: Marketing & Analytics (pills), Tools & Platforms (pills),
// and Certifications (left-border accent treatment -- long sentences don't fit as pills)

import { skillsData } from '@/data/skills'

export default function SkillsSection() {
  return (
    <section id="skills" aria-label="Skills" className="py-20 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading -- locked: left-aligned h2 + accent underline */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Skills</h2>
        <div className="w-12 h-1 bg-accent mb-8 rounded-full" />

        <div className="space-y-8">

          {/* Marketing & Analytics -- pill chips (SKILL-01) */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Marketing &amp; Analytics
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsData.marketingAnalytics.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm bg-muted text-foreground rounded-full border border-muted-foreground/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools & Platforms -- pill chips (SKILL-02) */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Tools &amp; Platforms
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsData.toolsPlatforms.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 text-sm bg-muted text-foreground rounded-full border border-muted-foreground/20"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications -- left-border accent treatment (SKILL-03) */}
          {/* Long certification names don't fit as pills -- left-border lines match About's education style */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Certifications
            </h3>
            <div className="flex flex-col gap-3">
              {skillsData.certifications.map((cert) => (
                <p
                  key={cert}
                  className="text-sm text-foreground pl-4 border-l-2 border-accent leading-relaxed"
                >
                  {cert}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
