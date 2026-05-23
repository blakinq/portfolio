import { Mail, Github, Twitter } from "lucide-react"
import { LiveClock } from "@/components/ui/LiveClock"
import { Tooltip } from "@/components/ui/Tooltip"
import { site } from "@/content/site"

function LinkedinMark({ className }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const SOCIALS = [
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
  { label: "X", href: site.socials.twitterUrl, Icon: Twitter },
  { label: "GitHub", href: site.socials.githubUrl, Icon: Github },
  { label: "LinkedIn", href: site.socials.linkedinUrl, Icon: LinkedinMark },
]

export function Footer() {
  return (
    <footer className="border-t border-border-subtle py-6">
      <div className="mx-auto flex max-w-[var(--content-max)] items-center justify-between gap-3 px-4 text-xs text-text-secondary">
        <ul className="flex items-center gap-4">
          {SOCIALS.map(({ label, href, Icon }) => {
            const external = !href.startsWith("mailto:")
            return (
              <li key={label}>
                <Tooltip label={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    aria-label={label}
                    className="inline-flex text-text-secondary transition-colors hover:text-text-primary"
                  >
                    <Icon className="size-[18px]" strokeWidth={1.75} />
                  </a>
                </Tooltip>
              </li>
            )
          })}
        </ul>
        <div className="flex items-center gap-3">
          <span className="hidden font-mono uppercase tracking-[0.16em] sm:inline">
            <span className="normal-case tracking-normal">{site.location}</span>{" "}
            · {site.gmtOffset}
          </span>
          <LiveClock className="rounded-[4px] border border-border-default bg-bg-elevated px-2 py-1 font-mono uppercase tracking-[0.16em]" />
        </div>
      </div>
    </footer>
  )
}
