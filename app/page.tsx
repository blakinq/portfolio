import { Suspense } from "react"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/home/HeroSection"
import { ProjectGrid } from "@/components/home/ProjectGrid"
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline"
import { Testimonials } from "@/components/home/Testimonials"
import { StackIcons } from "@/components/home/StackIcons"
import { SectionLabel } from "@/components/ui/SectionLabel"

export default function HomePage() {
  return (
    <>
      <main className="mx-auto max-w-[var(--content-max)] px-4">
        <HeroSection />

        <section id="work" className="scroll-mt-20 py-10">
          <SectionLabel className="mb-6">Selected Projects</SectionLabel>
          <Suspense fallback={null}>
            <ProjectGrid />
          </Suspense>
        </section>

        <div id="about" className="scroll-mt-20">
          <ExperienceTimeline />
          <Testimonials />
          <StackIcons />
        </div>
      </main>
      <Footer />
    </>
  )
}
