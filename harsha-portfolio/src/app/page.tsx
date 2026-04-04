// src/app/page.tsx
// Section IDs are LOCKED -- do not rename after Phase 2 begins.
// Phase 3 Navbar uses plain <a href="#[id]"> anchors for smooth scroll.
// Phase 3 Intersection Observer targets these same IDs for active-link highlighting.

import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import LeadershipSection from '@/components/sections/LeadershipSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <LeadershipSection />
      <ContactSection />
    </>
  )
}
