"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Check } from "lucide-react"

export function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-[4px] border border-border-default bg-bg-elevated px-4 py-2 text-sm text-text-primary shadow-xl"
          role="status"
          aria-live="polite"
        >
          <Check className="size-4 text-[var(--color-green)]" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
