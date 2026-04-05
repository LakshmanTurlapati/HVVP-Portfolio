// src/app/page.tsx
// Section IDs are LOCKED -- do not rename after Phase 2 begins.
// Phase 3 Navbar uses plain <a href="#[id]"> anchors for smooth scroll.
// Phase 3 Intersection Observer targets these same IDs for active-link highlighting.

import AnimatedSection from '@/components/AnimatedSection'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import LeadershipSection from '@/components/sections/LeadershipSection'
import ValuePropSection from '@/components/sections/ValuePropSection'
import CaseStudySection from '@/components/sections/CaseStudySection'
import { caseStudyUtd } from '@/data/caseStudyUtd'
import { caseStudyRio } from '@/data/caseStudyRio'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <AnimatedSection><HeroSection /></AnimatedSection>
      <AnimatedSection><AboutSection /></AnimatedSection>
      <AnimatedSection><CaseStudySection data={caseStudyUtd} /></AnimatedSection>
      <AnimatedSection><CaseStudySection data={caseStudyRio} /></AnimatedSection>
      <AnimatedSection><ExperienceSection /></AnimatedSection>
      <AnimatedSection><SkillsSection /></AnimatedSection>
      <AnimatedSection><LeadershipSection /></AnimatedSection>
      <AnimatedSection><ValuePropSection /></AnimatedSection>
      <AnimatedSection><ContactSection /></AnimatedSection>
    </>
  )
}
