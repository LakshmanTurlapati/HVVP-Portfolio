import { heroData } from '@/data/hero'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

export default function HeroSection() {
  return (
    <section id="hero" aria-label="Hero" className="min-h-screen flex items-center bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="text-left">

          <p className="text-xs font-semibold text-foreground mb-6 tracking-[0.2em] uppercase">
            {heroData.availability}
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.05] tracking-tight">
            {heroData.name}
          </h1>

          <p className="text-xl sm:text-2xl text-foreground mb-4 max-w-3xl font-semibold leading-snug">
            {heroData.heading}
          </p>

          <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-3xl leading-relaxed">
            {heroData.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              href={heroData.ctaPrimary.href}
              className={cn(buttonVariants({ size: 'lg' }), 'bg-accent text-accent-foreground hover:bg-accent-hover font-semibold')}
            >
              {heroData.ctaPrimary.label}
            </a>
            <a
              href="/resume.pdf"
              download="Harsha_Vardhini_Resume.pdf"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              {heroData.ctaResume}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-border pt-8">
            {heroData.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span
                  className="text-4xl sm:text-5xl font-bold text-foreground leading-none"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {metric.value}
                </span>
                <span className="text-sm text-muted-foreground mt-2 leading-snug">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
