// src/components/sections/ContactSection.tsx
// Server Component -- no "use client" directive
// Centered layout: email + LinkedIn as primary CTAs, phone as subdued text

import { contactData } from '@/data/contact'
import { heroData } from '@/data/hero'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

export default function ContactSection() {
  return (
    <section id="contact" aria-label="Contact" className="py-20 bg-card">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Get In Touch</h2>
        <div className="w-12 h-1 bg-accent mb-6 rounded-full mx-auto" />

        <p className="text-muted-foreground mb-8 text-sm sm:text-base">
          {heroData.availability}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`mailto:${contactData.email}`}
            className={cn(buttonVariants({ size: 'lg' }), 'bg-accent text-accent-foreground hover:bg-accent/90')}
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
          <p className="mt-6 text-sm text-muted-foreground">
            {contactData.phone}
          </p>
        )}

      </div>
    </section>
  )
}
