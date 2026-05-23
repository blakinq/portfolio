"use client"

import { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Avatar } from "@/components/ui/Avatar"
import { testimonials } from "@/content/testimonials"
import { cn } from "@/lib/utils"

export function Testimonials() {
  const count = testimonials.length
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const hasTestimonials = count > 0

  const go = useCallback(
    (delta: number) => {
      setDirection(delta > 0 ? 1 : -1)
      setIndex((i) => (i + delta + count) % count)
    },
    [count],
  )

  const jumpTo = useCallback(
    (target: number) => {
      setDirection(target > index ? 1 : -1)
      setIndex(target)
    },
    [index],
  )

  useEffect(() => {
    if (!hasTestimonials) return
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement
      const tag = el?.tagName
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (el as HTMLElement | null)?.isContentEditable
      ) {
        return
      }
      if (e.key === "ArrowLeft") go(-1)
      else if (e.key === "ArrowRight") go(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, hasTestimonials])

  if (!hasTestimonials) return null

  const t = testimonials[index]

  return (
    <section className="py-10">
      <div className="mb-6 flex items-center justify-between">
        <SectionLabel>Testimonials</SectionLabel>
        <div className="flex items-center gap-1">
          <NavButton ariaLabel="Previous testimonial" onClick={() => go(-1)}>
            <ChevronLeft className="size-4" />
          </NavButton>
          <NavButton ariaLabel="Next testimonial" onClick={() => go(1)}>
            <ChevronRight className="size-4" />
          </NavButton>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.figure
            key={t.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 24 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -24 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bento p-5"
          >
            <blockquote className="text-[14px] leading-relaxed text-text-secondary">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <Avatar initials={t.name.charAt(0)} size={32} />
              <div>
                <div className="text-sm text-text-primary">{t.name}</div>
                <div className="text-xs text-text-tertiary">
                  {t.role} · {t.company}
                </div>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div
        role="tablist"
        aria-label="Testimonials"
        className="mt-4 flex items-center justify-center gap-1.5"
      >
        {testimonials.map((item, i) => {
          const active = i === index
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Show testimonial ${i + 1} of ${count}`}
              onClick={() => jumpTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                active
                  ? "w-6 bg-text-primary"
                  : "w-1.5 bg-text-tertiary hover:bg-text-secondary",
              )}
            />
          )
        })}
      </div>
    </section>
  )
}

function NavButton({
  ariaLabel,
  onClick,
  children,
}: {
  ariaLabel: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-flex size-7 items-center justify-center rounded-[4px] border border-border-subtle bg-bg-elevated text-text-secondary transition-colors hover:border-border-default hover:text-text-primary"
    >
      {children}
    </button>
  )
}
