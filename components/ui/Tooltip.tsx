"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Side = "top" | "bottom"

export function Tooltip({
  label,
  children,
  side = "top",
  delay = 150,
  className,
}: {
  label: string
  children: ReactNode
  side?: Side
  delay?: number
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [canHover, setCanHover] = useState(true)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => {
      mq.removeEventListener("change", update)
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  const show = () => {
    if (!canHover) return
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setOpen(true), delay)
  }
  const hide = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setOpen(false)
  }

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: side === "top" ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: side === "top" ? 4 : -4 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-[4px] border border-border-default bg-bg-elevated px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)]",
              side === "top" ? "bottom-full mb-2" : "top-full mt-2",
            )}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
