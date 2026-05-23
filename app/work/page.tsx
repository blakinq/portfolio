import { Suspense } from "react"
import { Footer } from "@/components/layout/Footer"
import { ProjectGrid } from "@/components/home/ProjectGrid"
import { generateMeta } from "@/lib/metadata"

export const metadata = generateMeta({
  title: "Work",
  description: "Designing memorable digital experiences.",
  path: "/work",
})

export default function WorkPage() {
  return (
    <>
      <main className="mx-auto min-h-screen max-w-[var(--content-max)] px-4 py-16">
        <header className="mb-6">
          <h1 className="text-base font-medium text-text-primary">Work</h1>
          <p className="mt-1 text-xs text-text-secondary">
            Designing memorable digital experiences.
          </p>
        </header>
        <Suspense fallback={null}>
          <ProjectGrid />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
