import { aboutData } from '@/data/about'
import { educationData } from '@/data/education'

export default function AboutSection() {
  return (
    <section id="about" aria-label="About" className="py-20 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">About</h2>
        <div className="w-12 h-1 bg-accent mb-8 rounded-full" />

        <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-10 max-w-3xl">
          {aboutData.bio}
        </p>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Education
          </h3>
          <div className="space-y-4">
            {educationData.map((entry) => (
              <div
                key={entry.institution}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 border-l-2 border-accent pl-4"
              >
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {entry.degree} in {entry.field}
                  </p>
                  <p className="text-sm text-muted-foreground">{entry.institution}</p>
                  {entry.honors && (
                    <p className="text-xs font-medium text-accent mt-0.5">{entry.honors}</p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground shrink-0">
                  {entry.graduationDate}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
