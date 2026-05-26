import type { Project, ProjectDiscipline } from "@/types/project"
import { agegeLga } from "./agege-lga"
import { oddience } from "./oddience"
import { liefCare } from "./lief-care"
import { ravenWallet } from "./raven-wallet"
import { omniWallet } from "./omni-wallet"
import { kindred } from "./kindred"
import { tokene } from "./tokene"
import { joseWhitney } from "./jose-whitney"
import { cuk } from "./cuk"
import { metrix } from "./metrix"

export const projects: Project[] = [
  agegeLga,
  oddience,
  liefCare,
  ravenWallet,
  omniWallet,
  kindred,
  tokene,
  joseWhitney,
  cuk,
  metrix,
].sort((a, b) => a.order - b.order)

export function getProjectsByDiscipline(discipline: ProjectDiscipline): Project[] {
  return projects.filter((p) => p.discipline === discipline)
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string) {
  const current = projects.find((p) => p.slug === slug)
  if (!current) return { prev: undefined, next: undefined }
  const pool = projects.filter((p) => p.discipline === current.discipline)
  const i = pool.findIndex((p) => p.slug === slug)
  if (i === -1 || pool.length < 2) return { prev: undefined, next: undefined }
  return {
    prev: pool[(i - 1 + pool.length) % pool.length],
    next: pool[(i + 1) % pool.length],
  }
}
