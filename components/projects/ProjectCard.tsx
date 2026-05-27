import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/types/project"

const FALLBACK_BG =
  "radial-gradient(120% 120% at 30% 30%, #2a2a2a 0%, #111 60%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent)"

const SCREENSHOT_REV = "2"

function screenshotUrl(pageUrl: string): string {
  const withRev = pageUrl + (pageUrl.includes("?") ? "&" : "?") + `v=${SCREENSHOT_REV}`
  const url = encodeURIComponent(withRev)
  return `https://api.microlink.io/?url=${url}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800`
}

export function ProjectCard({ project }: { project: Project }) {
  const isExternal = Boolean(project.externalUrl)
  const thumb =
    project.thumbnailImage ||
    project.heroImage ||
    (project.externalUrl ? screenshotUrl(project.externalUrl) : "")

  const media = (
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      {project.heroVideo && !isExternal ? (
        <video
          src={project.heroVideo}
          poster={project.heroImage || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ background: FALLBACK_BG }}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(0,0,0,0.55))]"
      />
    </div>
  )

  const meta = (
    <div className="flex items-end justify-between p-4">
      <div>
        <div className="inline-flex items-center gap-1.5 text-sm font-medium text-text-primary">
          {project.title}
          {isExternal && (
            <ArrowUpRight
              className="size-3.5 text-text-tertiary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          )}
        </div>
        <div className="mt-0.5 text-xs text-text-secondary">
          {project.category}
        </div>
      </div>
      {project.year && (
        <div className="text-xs text-text-tertiary">{project.year}</div>
      )}
    </div>
  )

  if (isExternal && project.externalUrl) {
    return (
      <a
        href={project.externalUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="bento group block overflow-hidden"
      >
        {media}
        {meta}
      </a>
    )
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="bento group block overflow-hidden"
    >
      {media}
      {meta}
    </Link>
  )
}
