"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Tooltip } from "@/components/ui/Tooltip"

const THRESHOLD = 400

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > THRESHOLD)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollUp = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-40"
        >
          <Tooltip label="Back to top">
            <button
              type="button"
              onClick={scrollUp}
              aria-label="Scroll back to top"
              className="inline-flex size-11 items-center justify-center rounded-full border border-border-default bg-bg-elevated/80 text-text-secondary shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors hover:bg-bg-hover hover:text-text-primary"
            >
              <ArrowUp className="size-[18px]" strokeWidth={1.75} />
            </button>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
