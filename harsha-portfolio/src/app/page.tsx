// src/app/page.tsx
// v2.0 section order: Hero -> About -> UTD -> Rio -> Gallery -> ValueProp -> Contact
// Section IDs: hero, about, case-study-utd, case-study-rio, gallery, value-prop, contact

import AnimatedSection from '@/components/AnimatedSection'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import CaseStudySection from '@/components/sections/CaseStudySection'
import GallerySection from '@/components/sections/GallerySection'
import ValuePropSection from '@/components/sections/ValuePropSection'
import ContactSection from '@/components/sections/ContactSection'
import { caseStudyUtd } from '@/data/caseStudyUtd'
import { caseStudyRio } from '@/data/caseStudyRio'

export default function Home() {
  return (
    <>
      <AnimatedSection><HeroSection /></AnimatedSection>
      <AnimatedSection><AboutSection /></AnimatedSection>
      <AnimatedSection><CaseStudySection data={caseStudyUtd} /></AnimatedSection>
      <AnimatedSection><CaseStudySection data={caseStudyRio} /></AnimatedSection>
      <AnimatedSection><GallerySection /></AnimatedSection>
      <AnimatedSection><ValuePropSection /></AnimatedSection>
      <AnimatedSection><ContactSection /></AnimatedSection>
    </>
  )
}
