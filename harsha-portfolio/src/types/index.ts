// src/types/index.ts
// Shared TypeScript interfaces for all section data
// These types are the contract between data files and section components
// DO NOT modify field names after Phase 2 begins -- section components depend on these shapes

export interface Metric {
  value: string
  label: string
}

export interface HeroData {
  name: string
  heading: string
  subheading: string
  availability: string
  metrics: Metric[]
  ctaPrimary: { label: string; href: string }
  ctaResume: string
  ctaContact: string
}

export interface ExperienceEntry {
  role: string
  company: string
  location: string
  startDate: string
  endDate: string | 'Present'
  bullets: string[]
}

export interface EducationEntry {
  degree: string
  field: string
  institution: string
  location: string
  graduationDate: string
  honors?: string
  coursework?: string[]
}

export interface SkillsData {
  marketingAnalytics: string[]
  toolsPlatforms: string[]
  certifications: string[]
}

export interface LeadershipEntry {
  organization: string
  role: string
  startDate: string
  endDate: string | 'Present'
  description: string
  location?: string
}

export interface AboutData {
  bio: string
}

export interface ContactData {
  heading: string
  email: string
  linkedIn: string
  resumePdf: string
  phone?: string
}

export interface ValuePropItem {
  text: string
}

export interface ValuePropData {
  heading: string
  opener: string
  items: ValuePropItem[]
}

export interface CaseStudyBlock {
  label: string
  body: string
}

export interface CaseStudyResult {
  value: string
  label: string
}

export interface CaseStudyData {
  slug: string
  title: string
  client: string
  role: string
  timeframe: string
  description: string
  blocks: CaseStudyBlock[]
  result: CaseStudyResult
}
