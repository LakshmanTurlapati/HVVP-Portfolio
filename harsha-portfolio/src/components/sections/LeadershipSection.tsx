// src/components/sections/LeadershipSection.tsx
// Server Component -- no "use client" directive
// Simplified timeline for leadership roles (paragraph description, not bullets)

import { leadershipData } from '@/data/leadership'

export default function LeadershipSection() {
  return (
    <section id="leadership" aria-label="Leadership" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Leadership</h2>
        <div className="w-12 h-1 bg-accent mb-8 rounded-full" />

        <div className="relative pl-8">

          <div className="absolute left-0 top-2 bottom-2 w-px bg-muted" />

          {leadershipData.map((entry, index) => (
            <div key={index} className="relative mb-10 last:mb-0">

              <div className="absolute -left-[1.85rem] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background ring-1 ring-accent/30" />

              <h3 className="text-base font-semibold text-foreground">{entry.role}</h3>
              <p className="text-sm font-medium text-accent mt-0.5">{entry.organization}</p>

              <p className="text-xs text-muted-foreground mt-0.5 mb-2">
                {entry.startDate} – {entry.endDate}
                {entry.location ? ` · ${entry.location}` : ''}
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {entry.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
