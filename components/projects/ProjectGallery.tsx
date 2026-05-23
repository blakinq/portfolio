"use client"

import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, ZoomOut } from "lucide-react"
import type { GalleryItem } from "@/types/project"

const PLACEHOLDER_BG =
  "radial-gradient(120% 120% at 30% 30%, #2a2a2a 0%, #111 60%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent)"

function isVideoSrc(src?: string): boolean {
  if (!src) return false
  return /\.(mp4|webm|mov|ogg|ogv)$/i.test(src)
}

function thumbAspectClass(item: GalleryItem): string {
  return item.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]"
}

function lightboxAspectClass(item: GalleryItem): string {
  return item.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]"
}

export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [failed, setFailed] = useState<Set<number>>(() => new Set())
  const isOpen = activeIndex !== null

  const markFailed = useCallback((i: number) => {
    setFailed((prev) => {
      if (prev.has(i)) return prev
      const next = new Set(prev)
      next.add(i)
      return next
    })
  }, [])

  const close = useCallback(() => setActiveIndex(null), [])
  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % items.length))
  }, [items.length])
  const prev = useCallback(() => {
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + items.length) % items.length,
    )
  }, [items.length])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight") next()
      else if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, close, next, prev])

  const active = activeIndex !== null ? items[activeIndex] : null

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item, i) => {
          const isVideo = isVideoSrc(item.src)
          const isTall = item.rowSpan === 2
          const prevIsTall = i > 0 && items[i - 1]?.rowSpan === 2
          const mobileBorderJoin = isTall
            ? "max-sm:border-b-0"
            : prevIsTall
              ? "max-sm:border-t-0"
              : ""
          return (
            <figure
              key={i}
              className={`flex flex-col gap-2 ${isTall ? "sm:row-span-2" : ""}`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={item.alt ?? `Open item ${i + 1}`}
                className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-[4px] border border-border-subtle outline-none transition-colors hover:border-border-default focus-visible:border-border-strong ${thumbAspectClass(item)} ${mobileBorderJoin}`}
              >
                {item.src && !failed.has(i) ? (
                  isVideo ? (
                    <video
                      src={item.src}
                      muted
                      playsInline
                      preload="metadata"
                      onError={() => markFailed(i)}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.src}
                      alt={item.alt ?? ""}
                      onError={() => markFailed(i)}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  )
                ) : (
                  <div
                    className="size-full transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ background: PLACEHOLDER_BG }}
                  />
                )}
                {isVideo && !failed.has(i) && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <span className="inline-flex size-12 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                      <Play className="size-5 translate-x-[1px]" strokeWidth={1.75} fill="currentColor" />
                    </span>
                  </span>
                )}
                <span className="pointer-events-none absolute right-2 top-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
              {item.caption && (
                <figcaption className="text-xs text-text-tertiary">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          )
        })}
      </div>

      <AnimatePresence>
        {isOpen && active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
            onClick={close}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                close()
              }}
              aria-label="Close image viewer"
              className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 transition-colors hover:bg-black/60 hover:text-white"
            >
              <ZoomOut className="size-[18px]" strokeWidth={1.75} />
            </button>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    prev()
                  }}
                  aria-label="Previous item"
                  className="group absolute left-4 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 transition-all duration-200 hover:scale-110 hover:border-white/30 hover:bg-black/70 hover:text-white"
                >
                  <ChevronLeft
                    className="size-[18px] transition-transform duration-200 group-hover:-translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    next()
                  }}
                  aria-label="Next item"
                  className="group absolute right-4 top-1/2 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 transition-all duration-200 hover:scale-110 hover:border-white/30 hover:bg-black/70 hover:text-white"
                >
                  <ChevronRight
                    className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </button>
              </>
            )}

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex max-h-full max-w-full items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {active.src && !failed.has(activeIndex ?? -1) ? (
                isVideoSrc(active.src) ? (
                  <video
                    src={active.src}
                    controls
                    autoPlay
                    playsInline
                    onError={() =>
                      activeIndex !== null && markFailed(activeIndex)
                    }
                    className={`max-h-[90vh] max-w-[92vw] rounded-[4px] ${
                      active.orientation === "portrait" ? "h-[90vh] w-auto" : ""
                    }`}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={active.src}
                    alt={active.alt ?? ""}
                    onError={() =>
                      activeIndex !== null && markFailed(activeIndex)
                    }
                    className={`max-h-[90vh] max-w-[92vw] rounded-[4px] object-contain ${
                      active.orientation === "portrait" ? "h-[90vh] w-auto" : ""
                    }`}
                  />
                )
              ) : (
                <div
                  role="img"
                  aria-label={
                    active.alt ?? `Placeholder ${(activeIndex ?? 0) + 1}`
                  }
                  className={`relative ${lightboxAspectClass(active)} ${
                    active.orientation === "portrait"
                      ? "h-[90vh] w-auto"
                      : "w-[min(92vw,1200px)]"
                  } rounded-[4px] border border-white/10`}
                  style={{ background: PLACEHOLDER_BG }}
                >
                  <span className="absolute right-3 top-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                    {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
