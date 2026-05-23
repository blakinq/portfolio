"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { projects } from "@/content/projects"
import { cn } from "@/lib/utils"
import type { ProjectDiscipline } from "@/types/project"

const TABS: Array<{ id: ProjectDiscipline; label: string }> = [
  { id: "design", label: "Design" },
  { id: "engineering", label: "Engineering" },
]

function isDiscipline(v: string | null): v is ProjectDiscipline {
  return v === "design" || v === "engineering"
}

export function ProjectGrid() {
  const searchParams = useSearchParams()
  const initial = searchParams.get("tab")
  const [tab, setTab] = useState<ProjectDiscipline>(
    isDiscipline(initial) ? initial : "design",
  )

  const visible = useMemo(
    () => projects.filter((p) => p.discipline === tab),
    [tab],
  )

  return (
    <div>
      <div
        role="tablist"
        aria-label="Project discipline"
        className="mb-5 inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-elevated p-1"
      >
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-full px-3 py-1 text-xs transition-colors",
                active
                  ? "bg-bg-base font-medium text-text-primary"
                  : "text-text-secondary hover:text-text-primary",
              )}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        transition={{ duration: 0.3 }}
      >
        {visible.map((p) => (
          <motion.div key={p.slug} layout initial={false}>
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
