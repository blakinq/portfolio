"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Tooltip } from "@/components/ui/Tooltip"

type Theme = "light" | "dark"

const STORAGE_KEY = "theme"

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark"
  const attr = document.documentElement.getAttribute("data-theme")
  return attr === "light" ? "light" : "dark"
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(getInitialTheme())
    setMounted(true)
  }, [])

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }

  const isDark = theme === "dark"
  const ariaLabel = isDark ? "Switch to light mode" : "Switch to dark mode"
  const tooltipLabel = isDark ? "Light mode" : "Dark mode"

  return (
    <Tooltip label={tooltipLabel}>
    <button
      type="button"
      onClick={toggle}
      aria-label={ariaLabel}
      aria-pressed={!isDark}
      className="relative inline-flex size-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-text-primary"
    >
      <span className="relative block size-[18px]">
        <AnimatePresence initial={false} mode="wait">
          {mounted && isDark ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="size-[18px]" strokeWidth={1.75} />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="size-[18px]" strokeWidth={1.75} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
    </Tooltip>
  )
}
