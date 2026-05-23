"use client"

import { useCallback, useEffect, useState } from "react"
import { Avatar } from "@/components/ui/Avatar"
import { Kbd } from "@/components/ui/Kbd"
import { Toast } from "@/components/ui/Toast"
import { site } from "@/content/site"

function isTypingInInput() {
  const el = document.activeElement
  if (!el) return false
  const tag = el.tagName
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    (el as HTMLElement).isContentEditable
  )
}

async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // fall through to legacy fallback
    }
  }
  try {
    const ta = document.createElement("textarea")
    ta.value = text
    ta.setAttribute("readonly", "")
    ta.style.position = "fixed"
    ta.style.top = "0"
    ta.style.left = "0"
    ta.style.opacity = "0"
    document.body.appendChild(ta)
    ta.select()
    ta.setSelectionRange(0, text.length)
    const ok = document.execCommand("copy")
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

export function HeroSection() {
  const [copied, setCopied] = useState(false)

  const triggerCopy = useCallback(async () => {
    const ok = await copyToClipboard(site.email)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "c" && e.key !== "C" && e.code !== "KeyC") return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (isTypingInInput()) return
      e.preventDefault()
      void triggerCopy()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [triggerCopy])

  return (
    <section className="pt-14 pb-10 sm:pt-20">
      <div className="text-xs font-mono uppercase tracking-[0.18em] text-text-tertiary">
        EST. {site.establishedYear}
      </div>
      <div className="mt-3 flex items-center gap-4">
        <Avatar
          initials={site.shortName.slice(0, 1)}
          size={48}
          src="/avatar.jpg"
          alt={site.name}
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-text-primary sm:text-[1.75rem]">
            {site.name}
          </h1>
          <div className="mt-1 text-sm text-text-secondary">{site.role}</div>
        </div>
      </div>

      <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-text-secondary">
        {site.intro}
      </p>
      <p className="mt-4 max-w-[620px] text-[15px] leading-relaxed text-text-secondary">
        {site.bio}
      </p>

      <button
        type="button"
        onClick={triggerCopy}
        aria-label={`Copy email ${site.email} to clipboard`}
        className="mt-6 inline-flex items-center gap-2 text-xs text-text-tertiary transition-colors hover:text-text-secondary"
      >
        Press <Kbd>C</Kbd> to copy email
      </button>

      <Toast message="Email copied!" visible={copied} />
    </section>
  )
}
