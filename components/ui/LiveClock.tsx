"use client"

import { useEffect, useState } from "react"
import { site } from "@/content/site"

function format(d: Date) {
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: site.timezone,
    hour12: false,
  })
}

export function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    setTime(format(new Date()))
    const id = setInterval(() => setTime(format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span suppressHydrationWarning className={className}>
      {time ?? "--:--:--"}
    </span>
  )
}
