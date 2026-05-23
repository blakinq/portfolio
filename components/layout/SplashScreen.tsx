"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { site } from "@/content/site"

const DURATION_MS = 3000
const FADE_MS = 400

const STATUSES: Array<{ until: number; label: string }> = [
  { until: 18, label: "Booting up" },
  { until: 42, label: "Loading assets" },
  { until: 68, label: "Indexing projects" },
  { until: 92, label: "Polishing pixels" },
  { until: 101, label: "Ready" },
]

function statusFor(percent: number) {
  return STATUSES.find((s) => percent < s.until)?.label ?? "Ready"
}

const MARQUEE_ITEMS = [
  site.role,
  site.location,
  "Designing · Building · Shipping",
  site.gmtOffset,
  `Est. ${site.establishedYear}`,
]

export function SplashScreen() {
  const pathname = usePathname()
  const [show, setShow] = useState(pathname === "/")
  const [leaving, setLeaving] = useState(false)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    if (pathname !== "/") return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    document.body.style.overflow = "hidden"
    document.documentElement.dataset.splash = "active"

    let rafId = 0
    let fadeTimer = 0
    let removeTimer = 0

    const finish = () => {
      fadeTimer = window.setTimeout(() => {
        setLeaving(true)
        document.documentElement.dataset.splash = "leaving"
      }, 200)
      removeTimer = window.setTimeout(() => {
        setShow(false)
        document.body.style.overflow = ""
        delete document.documentElement.dataset.splash
      }, 200 + FADE_MS)
    }

    if (reduced) {
      setPercent(100)
      finish()
    } else {
      const start = performance.now()
      const tick = (now: number) => {
        const ratio = Math.min((now - start) / DURATION_MS, 1)
        const eased = 1 - Math.pow(1 - ratio, 3)
        setPercent(Math.round(eased * 100))
        if (ratio < 1) {
          rafId = requestAnimationFrame(tick)
        } else {
          finish()
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.clearTimeout(fadeTimer)
      window.clearTimeout(removeTimer)
      document.body.style.overflow = ""
      delete document.documentElement.dataset.splash
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!show) return null

  const padded = percent.toString().padStart(3, "0")
  const status = statusFor(percent)

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!leaving}
      className="splash-root fixed inset-0 z-[100] flex flex-col bg-bg-base"
      style={{
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-border-default"
      >
        <div
          className="relative h-full bg-text-primary"
          style={{ width: `${percent}%` }}
        >
          <span className="splash-progress-glow" aria-hidden />
        </div>
      </div>

      <div className="absolute inset-x-0 top-3 flex items-center justify-between px-5 font-mono text-[11px] uppercase tracking-[0.22em] text-text-tertiary">
        <span className="flex items-center gap-2">
          <span className="splash-dot" aria-hidden />
          <span className="text-text-secondary">{status}</span>
        </span>
        <span className="inline-flex items-baseline gap-1 tabular-nums text-text-secondary">
          <span>{padded}%</span>
          <span className="splash-caret" aria-hidden>
            _
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-7 px-5">
        <div className="splash-avatar-wrap relative">
          <span className="splash-bracket splash-bracket--tl" aria-hidden />
          <span className="splash-bracket splash-bracket--tr" aria-hidden />
          <span className="splash-bracket splash-bracket--bl" aria-hidden />
          <span className="splash-bracket splash-bracket--br" aria-hidden />
          <div
            aria-hidden
            className="splash-avatar relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-[4px] ring-1 ring-border-default"
          >
            <Image
              src="/avatar.jpg"
              alt=""
              width={64}
              height={64}
              className="h-full w-full object-cover"
              priority
            />
            <span className="splash-scan" aria-hidden />
          </div>
        </div>

        <div className="text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-tertiary">
            {site.shortName}
          </div>
          <div className="mt-1 text-[13px] text-text-secondary">{site.role}</div>
        </div>
      </div>

      <div className="splash-marquee-track absolute inset-x-0 bottom-4 overflow-hidden">
        <div className="splash-marquee font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary">
          {[0, 1, 2, 3, 4, 5].map((dup) => (
            <span
              key={dup}
              className="splash-marquee-row"
              aria-hidden={dup === 0 ? undefined : true}
            >
              {MARQUEE_ITEMS.map((item, idx) => (
                <span key={idx} className="splash-marquee-item">
                  <span>{item}</span>
                  <span className="splash-marquee-sep" aria-hidden>
                    ◇
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <span className="sr-only">Loading {site.name}&apos;s portfolio.</span>
    </div>
  )
}
