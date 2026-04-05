import { aboutData } from '@/data/about'
import { educationData } from '@/data/education'

export default function AboutSection() {
  return (
    <section id="about" aria-label="About" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">About Me</h2>
        <div className="w-16 h-1 bg-accent mb-10 rounded-full" />

        <p className="text-foreground leading-relaxed text-lg sm:text-xl mb-12 max-w-3xl">
          {aboutData.bio}
        </p>

        <div className="border-l-4 border-accent pl-6 py-2 max-w-3xl">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Education
          </p>
          <div className="space-y-3">
            {educationData.map((entry) => (
              <div key={entry.institution}>
                <p className="font-semibold text-foreground text-base">
                  {entry.degree} in {entry.field}
                </p>
                <p className="text-sm text-muted-foreground">
                  {entry.institution} &mdash; {entry.graduationDate}
                </p>
                {entry.honors && (
                  <p className="text-sm font-semibold text-foreground mt-1">{entry.honors}</p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
