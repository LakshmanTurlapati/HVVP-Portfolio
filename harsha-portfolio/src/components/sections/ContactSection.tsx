// src/components/sections/ContactSection.tsx
// Server Component -- no "use client" directive
// "Let's Connect" heading + email + LinkedIn CTAs + phone

import { contactData } from '@/data/contact'
import { heroData } from '@/data/hero'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

export default function ContactSection() {
  return (
    <section id="contact" aria-label="Contact" className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{contactData.heading}</h2>
        <div className="w-16 h-1 bg-accent mb-8 rounded-full mx-auto" />

        <p className="text-muted-foreground mb-10 text-base sm:text-lg">
          {heroData.availability}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`mailto:${contactData.email}`}
            className={cn(buttonVariants({ size: 'lg' }), 'bg-accent text-accent-foreground hover:bg-accent-hover font-semibold')}
          >
            Email Me
          </a>
          <a
            href={contactData.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            LinkedIn
          </a>
        </div>

        {contactData.phone && (
          <p className="mt-8 text-sm text-muted-foreground">
            {contactData.phone}
          </p>
        )}

      </div>
    </section>
  )
}
