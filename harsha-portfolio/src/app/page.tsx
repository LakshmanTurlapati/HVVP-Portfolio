// src/app/page.tsx
// Section IDs are LOCKED -- do not rename after Phase 2 begins.
// Phase 3 Navbar uses plain <a href="#[id]"> anchors for smooth scroll.
// Phase 3 Intersection Observer targets these same IDs for active-link highlighting.

export default function Home() {
  return (
    <>
      {/* Hero section -- Phase 2: HeroSection component */}
      <section id="hero" aria-label="Hero" className="min-h-screen" />

      {/* About section -- Phase 2: AboutSection component */}
      <section id="about" aria-label="About" />

      {/* Experience section -- Phase 2: ExperienceSection component */}
      <section id="experience" aria-label="Experience" />

      {/* Skills section -- Phase 2: SkillsSection component */}
      <section id="skills" aria-label="Skills" />

      {/* Leadership section -- Phase 2: LeadershipSection component */}
      <section id="leadership" aria-label="Leadership" />

      {/* Contact section -- Phase 2: ContactSection component */}
      <section id="contact" aria-label="Contact" />
    </>
  )
}
