import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { Footer } from "@/components/layout/Footer"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { ProjectGallery } from "@/components/projects/ProjectGallery"
import { getAdjacentProjects, getProject, projects } from "@/content/projects"
import { generateMeta } from "@/lib/metadata"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return generateMeta({ title: "Project not found" })
  return generateMeta({
    title: project.title,
    description: project.tagline,
    path: `/work/${project.slug}`,
  })
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)

  return (
    <>
      <main className="mx-auto min-h-screen max-w-[760px] px-4 py-12">
        <Link
          href={`/work?tab=${project.discipline}`}
          className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="size-3.5" /> All Work
        </Link>

        <header className="mt-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-medium text-text-primary">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="mt-1 text-sm text-text-secondary">
                {project.tagline}
              </p>
            )}
          </div>
          <div className="shrink-0 pt-1 text-right text-[11px] text-text-tertiary">
            {project.year && <div>{project.year}</div>}
            <div className="text-text-secondary">{project.category}</div>
          </div>
        </header>

        <div
          className="mt-8 aspect-[16/10] w-full overflow-hidden rounded-[4px] border border-border-subtle"
          style={
            project.heroVideo || project.heroImage
              ? undefined
              : {
                  background:
                    "radial-gradient(120% 120% at 30% 30%, #2a2a2a 0%, #111 60%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent)",
                }
          }
          aria-label={`${project.title} hero`}
        >
          {project.heroVideo ? (
            <video
              src={project.heroVideo}
              poster={project.heroImage || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="size-full object-cover"
            />
          ) : project.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.heroImage}
              alt={`${project.title} hero`}
              className="size-full object-cover"
            />
          ) : null}
        </div>

        <article className="mt-12 space-y-12">
          {project.background && (
            <section>
              <SectionLabel className="mb-3">Overview</SectionLabel>
              {project.overviewLinks && project.overviewLinks.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
                  {project.overviewLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-1 text-blue transition-opacity hover:opacity-80"
                    >
                      {link.label}
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.75}
                      />
                    </a>
                  ))}
                </div>
              )}
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-text-secondary">
                {project.background}
              </p>
            </section>
          )}

          {project.challenges.length > 0 && (
            <section>
              <SectionLabel className="mb-4">The Problem</SectionLabel>
              <ol className="space-y-3 text-[15px] leading-relaxed text-text-secondary">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="pt-1 font-mono text-[11px] tabular-nums text-text-tertiary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {project.goal && (
            <section>
              <SectionLabel className="mb-4">The Goal</SectionLabel>
              {project.goal.intro && (
                <p className="mb-4 text-[15px] leading-relaxed text-text-secondary">
                  {project.goal.intro}
                </p>
              )}
              <ul className="space-y-2 text-[15px] leading-relaxed text-text-secondary">
                {project.goal.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-text-tertiary"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.solutions.length > 0 && (
            <section>
              <SectionLabel className="mb-4">The Solution</SectionLabel>
              <ol className="space-y-5 text-[15px] leading-relaxed">
                {project.solutions.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="pt-1 font-mono text-[11px] tabular-nums text-text-tertiary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="text-text-secondary">
                      <div className="font-medium text-text-primary">
                        {s.title}
                      </div>
                      {s.body && <p className="mt-1">{s.body}</p>}
                      {s.bullets && s.bullets.length > 0 && (
                        <ul className="mt-2 space-y-2">
                          {s.bullets.map((b, j) => (
                            <li key={j} className="flex gap-3">
                              <span
                                aria-hidden
                                className="mt-2 size-1 shrink-0 rounded-full bg-text-tertiary"
                              />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {s.problems && s.problems.length > 0 && (
                        <div className="mt-4">
                          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary">
                            Customer Problems
                          </div>
                          <ol className="space-y-2">
                            {s.problems.map((p, j) => (
                              <li key={j} className="flex gap-3">
                                <span className="pt-1 font-mono text-[11px] tabular-nums text-text-tertiary">
                                  {String(j + 1).padStart(2, "0")}
                                </span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                      {s.goals && s.goals.length > 0 && (
                        <div className="mt-4">
                          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary">
                            Goals
                          </div>
                          <ol className="space-y-2">
                            {s.goals.map((g, j) => (
                              <li key={j} className="flex gap-3">
                                <span className="pt-1 font-mono text-[11px] tabular-nums text-text-tertiary">
                                  {String(j + 1).padStart(2, "0")}
                                </span>
                                <span>{g}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {project.sections?.map((sec, i) => (
            <section key={i}>
              <SectionLabel className="mb-4">{sec.label}</SectionLabel>
              {sec.intro && (
                <p className="mb-4 text-[15px] leading-relaxed text-text-secondary">
                  {sec.intro}
                </p>
              )}
              {sec.bullets && sec.bullets.length > 0 && (
                <ul className="space-y-2 text-[15px] leading-relaxed text-text-secondary">
                  {sec.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 rounded-full bg-text-tertiary"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {sec.outro && (
                <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
                  {sec.outro}
                </p>
              )}
            </section>
          ))}

          {project.gallery && project.gallery.length > 0 && (
            <section>
              <SectionLabel className="mb-4">Gallery</SectionLabel>
              <ProjectGallery items={project.gallery} />
            </section>
          )}

          {project.impact && project.impact.length > 0 && (
            <section>
              <SectionLabel className="mb-4">Impact</SectionLabel>
              <ul className="space-y-2 text-[15px] leading-relaxed text-text-secondary">
                {project.impact.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-text-tertiary"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.outcome && (
            <section>
              <SectionLabel className="mb-3">Outcome</SectionLabel>
              <p className="text-[15px] leading-relaxed text-text-secondary">
                {project.outcome}
              </p>
            </section>
          )}
        </article>

        {(prev || next) && (
          <nav className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/work/${prev.slug}`}
                className="group flex flex-col gap-2 rounded-[4px] border border-border-subtle bg-transparent p-4 transition-all duration-200 hover:border-border-strong hover:bg-bg-surface"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary">
                  <ArrowLeft className="size-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
                  Previous
                </span>
                <span className="text-sm font-medium text-text-primary">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span aria-hidden className="hidden sm:block" />
            )}
            {next ? (
              <Link
                href={`/work/${next.slug}`}
                className="group flex flex-col items-end gap-2 rounded-[4px] border border-border-subtle bg-transparent p-4 text-right transition-all duration-200 hover:border-border-strong hover:bg-bg-surface"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary">
                  Next
                  <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
                <span className="text-sm font-medium text-text-primary">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        )}
      </main>
      <Footer />
    </>
  )
}
