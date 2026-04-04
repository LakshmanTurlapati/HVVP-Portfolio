// ExperienceSection.tsx
// Server Component -- no "use client" directive
// Renders 4 professional roles in a vertical timeline layout
// BoldNumbers helper bolds numeric tokens (integers, decimals, percentages) inside bullet strings

import { experienceData } from '@/data/experience'

// BoldNumbers: splits a bullet string on numeric patterns and wraps numbers in <strong>
// Example: "Drove 7% engagement increase" -> "Drove " + <strong>7%</strong> + " engagement increase"
// Regex: matches integers, decimals, percentages -- e.g. "40%", "25%", "7", "20%"
// Server Component compatible -- no state or event handlers
function BoldNumbers({ text }: { text: string }) {
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

export default function ExperienceSection() {
  return (
    <section id="experience" aria-label="Experience" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading -- locked: left-aligned h2 + accent underline */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Experience</h2>
        <div className="w-12 h-1 bg-accent mb-8 rounded-full" />

        {/* Timeline container -- vertical line on the left, dot per entry */}
        <div className="relative pl-8">

          {/* Vertical line: absolute, runs top to bottom on the left */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-muted" />

          {experienceData.map((entry, index) => (
            <div key={index} className="relative mb-12 last:mb-0">

              {/* Dot: absolute, positioned at left edge, border-background punches through the line */}
              <div className="absolute -left-[1.85rem] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background ring-1 ring-accent/30" />

              {/* Role and company header */}
              <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug">
                {entry.role}
              </h3>
              <p className="text-sm font-medium text-accent mt-0.5">{entry.company}</p>
              <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                {entry.startDate} &ndash; {entry.endDate} &middot; {entry.location}
              </p>

              {/* Achievement bullets */}
              <ul className="space-y-2">
                {entry.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-accent mt-1 shrink-0" aria-hidden="true">&ndash;</span>
                    <BoldNumbers text={bullet} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
