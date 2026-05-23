import { Footer } from "@/components/layout/Footer"
import { ContactForm } from "@/components/home/ContactForm"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { site } from "@/content/site"
import { generateMeta } from "@/lib/metadata"

export const metadata = generateMeta({
  title: "Contact",
  description: `Get in touch with ${site.name} — usually replies within a day.`,
  path: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <main className="mx-auto min-h-screen max-w-[760px] px-4 py-16">
        <header className="mb-10">
          <h1 className="text-base font-medium text-text-primary">Contact</h1>
          <p className="mt-1 text-xs text-text-secondary">
            Got something to build, ship, or fix? Drop a note ; I usually reply
            within a day.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-elevated px-3 py-1.5 text-xs text-text-secondary">
            <span aria-hidden className="relative inline-flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--color-green)] opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-[var(--color-green)]" />
            </span>
            Currently open to work globally
          </div>

          <div className="mt-6 space-y-4 text-[14px] leading-relaxed text-text-secondary">
            <p>
              I combine strategy, design, and technology to create interfaces
              and experiences that feel seamless, look polished, and actually
              work for people.
            </p>
            <p>
              If you&apos;re looking to turn your next big idea into reality,
              feel free to reach out!
            </p>
          </div>
        </header>

        <ContactForm hideHeader />

        <section className="mt-14">
          <SectionLabel className="mb-4">Helpful to include</SectionLabel>
          <ul className="space-y-2 text-[14px] leading-relaxed text-text-secondary">
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-text-tertiary" />
              <span>
                <span className="text-text-primary">Shape of the project</span>{" "}
                : what you&apos;re building, who it&apos;s for, where it is today.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-text-tertiary" />
              <span>
                <span className="text-text-primary">Timeline</span> : when
                you&apos;d like to start and any hard deadlines.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-text-tertiary" />
              <span>
                <span className="text-text-primary">Scope</span> : design,
                build, or both. Solo or alongside a team.
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-text-tertiary" />
              <span>
                <span className="text-text-primary">Budget range</span> : even a
                ballpark helps us figure out fit quickly.
              </span>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  )
}
