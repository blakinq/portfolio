"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus, X } from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { experience } from "@/content/experience"
import { cn } from "@/lib/utils"

export function ExperienceTimeline() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null)

  return (
    <section className="py-10">
      <SectionLabel className="mb-4">Experience</SectionLabel>
      <ol>
        {experience.map((e) => {
          const isOpen = openId === e.id
          const hasBullets = (e.bullets?.length ?? 0) > 0
          return (
            <li key={e.id}>
              <button
                type="button"
                onClick={() =>
                  hasBullets && setOpenId(isOpen ? null : e.id)
                }
                aria-expanded={isOpen}
                aria-controls={`exp-${e.id}`}
                disabled={!hasBullets}
                className={cn(
                  "grid w-full grid-cols-[1fr_auto_auto] items-start gap-4 py-5 text-left sm:gap-8",
                  hasBullets &&
                    "cursor-pointer transition-colors hover:text-text-primary",
                )}
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium text-text-primary">
                    {e.role}
                  </div>
                  <div className="mt-0.5 text-[13px] uppercase tracking-wide text-text-secondary">
                    {e.company}
                  </div>
                </div>
                <div className="shrink-0 pt-0.5 text-right text-[12px] uppercase tabular-nums tracking-wide text-text-tertiary">
                  <span className="whitespace-nowrap">
                    {e.start} – {e.end}
                  </span>
                </div>
                {hasBullets ? (
                  <span
                    className="shrink-0 pt-0.5 text-text-tertiary transition-colors"
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <X className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                ) : (
                  <span className="w-3.5 shrink-0" aria-hidden="true" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && hasBullets && (
                  <motion.div
                    id={`exp-${e.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 pb-5 pr-8 text-[14.5px] leading-relaxed text-text-tertiary">
                      {e.bullets!.map((b, i) => (
                        <li key={i} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-text-tertiary"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
