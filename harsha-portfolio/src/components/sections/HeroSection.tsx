import { heroData } from '@/data/hero'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function HeroSection() {
  return (
    <section id="hero" aria-label="Hero" className="min-h-screen flex items-center bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="text-center sm:text-left">

          <p className="text-sm font-medium text-accent mb-4 tracking-wide">
            {heroData.availability}
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            {heroData.name}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto sm:mx-0">
            {heroData.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center sm:justify-start">
            <a
              href="#contact"
              className={cn(buttonVariants({ size: 'lg' }), 'bg-accent text-white hover:bg-accent/90')}
            >
              {heroData.ctaContact}
            </a>
            <a
              href="/resume.pdf"
              download="Harsha_Vardhini_Resume.pdf"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              {heroData.ctaResume}
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {heroData.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-bold text-accent">
                  {metric.value}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground mt-1 leading-snug">
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
