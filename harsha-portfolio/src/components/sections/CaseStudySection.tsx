import type { CaseStudyData } from '@/types'

interface CaseStudySectionProps {
  data: CaseStudyData
}

export default function CaseStudySection({ data }: CaseStudySectionProps) {
  return (
    <section
      id={`case-study-${data.slug}`}
      aria-label={data.title}
      className="py-24 bg-background border-t border-border"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-3">
          Case Study
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 leading-tight">
          {data.title}
        </h2>
        <div className="w-16 h-1 bg-accent mb-8 rounded-full" />

        {/* Metadata stat row */}
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 border-y border-border py-6 mb-10 max-w-3xl">
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Client</dt>
            <dd className="text-sm font-semibold text-foreground">{data.client}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Role</dt>
            <dd className="text-sm font-semibold text-foreground">{data.role}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Timeframe</dt>
            <dd className="text-sm font-semibold text-foreground">{data.timeframe}</dd>
          </div>
        </dl>

        {/* Project Description */}
        <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-12 max-w-3xl font-medium">
          {data.description}
        </p>

        {/* 4 narrative blocks: Context, What I Did, Execution, Results */}
        <div className="space-y-10">
          {data.blocks.map((block) => (
            <div
              key={block.label}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-10"
            >
              <p className="text-sm font-semibold text-accent uppercase tracking-wider md:pt-1">
                {block.label}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {block.body}
              </p>
            </div>
          ))}
        </div>

        {/* Results emphasis -- large Montserrat number */}
        <div className="mt-12 pt-10 border-t-2 border-accent max-w-3xl">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-3">
            Outcome
          </p>
          <div className="flex items-baseline gap-4 flex-wrap">
            <span
              className="text-6xl sm:text-7xl font-bold text-foreground leading-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {data.result.value}
            </span>
            <span className="text-base sm:text-lg text-muted-foreground leading-snug">
              {data.result.label}
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
