"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, User, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { Tooltip } from "@/components/ui/Tooltip"

type NavItem = {
  href: string
  label: string
  icon: typeof Home
  match: (pathname: string) => boolean
}

const ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
    match: (p) => p === "/",
  },
  {
    href: "/work",
    label: "Work",
    icon: Briefcase,
    match: (p) => p.startsWith("/work"),
  },
  {
    href: "/about",
    label: "About",
    icon: User,
    match: (p) => p.startsWith("/about"),
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
    match: (p) => p.startsWith("/contact"),
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
    >
      <ul className="flex items-center gap-1 rounded-full border border-border-default bg-bg-elevated/80 p-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        {ITEMS.map((item) => {
          const active = item.match(pathname)
          const Icon = item.icon
          return (
            <li key={item.href}>
              <Tooltip label={item.label}>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex size-10 items-center justify-center rounded-full",
                    active
                      ? "text-bg-base"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="bottom-nav-active"
                      className="absolute inset-0 rounded-full bg-text-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                        mass: 0.8,
                      }}
                    />
                  )}
                  <Icon
                    className="relative z-10 size-[18px]"
                    strokeWidth={1.75}
                  />
                </Link>
              </Tooltip>
            </li>
          )
        })}
        <li aria-hidden className="mx-1 h-5 w-px bg-border-default" />
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  )
}
