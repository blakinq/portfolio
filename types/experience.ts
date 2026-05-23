export interface ExperienceEntry {
  id: string
  start: string
  end: string | "Now"
  company: string
  role: string
  description?: string
  bullets?: string[]
  logoPath?: string
  url?: string
  accentColor?: string
}
