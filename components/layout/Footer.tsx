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

function DribbbleMark({ className }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.628 0 12 0Zm7.93 5.527a10.396 10.396 0 0 1 2.353 6.523c-.343-.067-3.78-.77-7.244-.333-.078-.183-.155-.376-.232-.578-.21-.5-.443-1.013-.685-1.524 3.84-1.566 5.594-3.81 5.808-4.088ZM12 1.737c2.603 0 4.985.978 6.798 2.583-.18.255-1.756 2.353-5.465 3.747C11.62 4.937 9.71 2.413 9.412 2.022A10.293 10.293 0 0 1 12 1.737Zm-4.508.937c.286.376 2.157 2.91 3.95 5.985C6.413 9.997 1.969 9.94 1.51 9.937a10.30 10.30 0 0 1 5.982-7.263ZM1.736 12.005v-.31c.443.012 5.667.078 11.078-1.547.31.611.6 1.232.866 1.852-.143.044-.299.088-.443.144-5.596 1.797-8.554 6.755-8.8 7.176A10.249 10.249 0 0 1 1.736 12.005Zm10.265 10.288a10.227 10.227 0 0 1-6.301-2.169c.188-.387 2.357-4.572 8.484-6.703.022-.011.044-.011.066-.022a47.66 47.66 0 0 1 2.467 8.722 10.05 10.05 0 0 1-4.716 1.172Zm6.422-2.111c-.155-.918-.91-5.07-2.371-8.611 3.27-.521 6.131.343 6.486.464a10.244 10.244 0 0 1-4.115 8.147Z" />
    </svg>
  )
}

const SOCIALS = [
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
  { label: "X", href: site.socials.twitterUrl, Icon: Twitter },
  { label: "GitHub", href: site.socials.githubUrl, Icon: Github },
  { label: "LinkedIn", href: site.socials.linkedinUrl, Icon: LinkedinMark },
  { label: "Dribbble", href: site.socials.dribbbleUrl, Icon: DribbbleMark },
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
