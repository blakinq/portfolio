export type ProjectCategory =
  | "Mobile App"
  | "Watch App"
  | "Website"
  | "Website, Web App"
  | "Design System"
  | "Product"
  | "Web App"
  | "Browser Extension"
  | "CLI"
  | "Library"
  | "Infrastructure"

export type ProjectDiscipline = "design" | "engineering"

export interface Solution {
  title: string
  body?: string
  bullets?: string[]
  problems?: string[]
  goals?: string[]
}

export interface Goal {
  intro?: string
  bullets: string[]
}

export interface CustomSection {
  label: string
  intro?: string
  bullets?: string[]
  outro?: string
}

export interface GalleryItem {
  src?: string
  alt?: string
  caption?: string
  orientation?: "landscape" | "portrait"
  rowSpan?: 1 | 2
}

export interface OverviewLink {
  label: string
  href: string
}

export interface Project {
  slug: string
  title: string
  year: string
  category: ProjectCategory
  discipline: ProjectDiscipline
  tagline: string
  heroImage: string
  heroVideo?: string
  thumbnailImage: string
  externalUrl?: string
  background: string
  overviewLinks?: OverviewLink[]
  challenges: string[]
  goal?: Goal
  solutions: Solution[]
  sections?: CustomSection[]
  gallery?: GalleryItem[]
  impact?: string[]
  outcome?: string
  tags: string[]
  featured: boolean
  order: number
}
