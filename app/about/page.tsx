import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/layout/Footer"
import { Avatar } from "@/components/ui/Avatar"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline"
import { site } from "@/content/site"
import { generateMeta } from "@/lib/metadata"

export const metadata = generateMeta({
  title: "About",
  description: `${site.name} — ${site.role.toLowerCase()} based in ${site.location}.`,
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <main className="mx-auto max-w-[760px] px-4 py-16">
        <header className="mb-10">
          <h1 className="text-base font-medium text-text-primary">About</h1>
          <p className="mt-1 text-xs text-text-secondary">
            A bit more about me.
          </p>
        </header>

        <div className="flex items-start gap-4">
          <Avatar
            initials={site.shortName.slice(0, 1)}
            size={56}
            src="/avatar.jpg"
            alt={site.name}
          />
          <div className="flex-1">
            <div className="text-lg font-medium text-text-primary">
              {site.name}
            </div>
            <div className="mt-0.5 text-sm text-text-secondary">
              {site.role} · {site.location}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-text-secondary">
          <p>
            Over the past few years, I&apos;ve worked with product teams to
            create user focused, insight driven solutions across e-commerce,
            B2B SaaS, fintech, and DeFi; also building for
            the British social care industry at Lief Care.
          </p>
          <p>
            All these experiences were fully anchored in design, but my work has recently
            adopted building products with AI. I bring the same curious,
            empathetic interest in my end users&apos; lives into this new
            chapter, only now I&apos;m shipping the things I used to hand off;
            using AI to compress the time between designs on my canvas and working
            products, while still keeping business goals in view.
          </p>
          <p>
            Figma, Framer, and Adobe Illustrator are still in my toolkit,
            joined now by Claude Code, Cursor, and a growing stack of AI native
            tools that let me prototype, automate, and ship without waiting on
            a full team. My grounding in no-code development means I already
            know how to translate user and business requirements into real,
            usable features. AI just shortens the distance between idea and
            execution.
          </p>
          <p>
            I&apos;ve also picked up an interest in cybersecurity and started
            studying for a degree in the field (we&apos;ll see how that goes),
            which is sharpening how I think about trust and responsibility
            when putting AI-powered tools in front of real people.
          </p>
          <p>
            Outside of work, my passions revolve around my Christian faith,
            music, anime, basketball, Formula1 and cars in general.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
          {[1, 2].map((n) => (
            <figure
              key={n}
              className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-bg-surface"
            >
              <Image
                src={`/about/portrait-${n}.jpg`}
                alt={`${site.name} portrait ${n}`}
                fill
                sizes="(min-width: 760px) 360px, 50vw"
                className="object-cover"
                priority={n === 1}
              />
            </figure>
          ))}
        </div>

        <ExperienceTimeline />

        <section className="mt-12">
          <SectionLabel className="mb-4">Currently</SectionLabel>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-[4px] border border-border-subtle bg-border-subtle sm:grid-cols-2">
            <Fact label="Location" value={site.location} />
            <Fact
              label="Time"
              value={`${site.gmtOffset} · ${site.timezone}`}
            />
          </dl>
        </section>

        <section className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            Got something to build, ship, or fix?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-[4px] bg-text-primary px-4 py-2 text-sm font-medium text-bg-base transition-colors hover:bg-white"
          >
            Get in touch
            <ArrowUpRight className="size-3.5" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-surface px-4 py-3">
      <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-text-tertiary">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-text-primary">{value}</dd>
    </div>
  )
}
