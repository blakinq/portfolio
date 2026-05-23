import Image from "next/image"
import { cn } from "@/lib/utils"

export function Avatar({
  initials,
  size = 48,
  src,
  alt,
  className,
}: {
  initials: string
  size?: number
  src?: string
  alt?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-[4px] ring-1 ring-border-default",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? initials}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          priority
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 120% at 20% 10%, #6b6bff 0%, #4f46e5 40%, #1e1b4b 100%)",
            }}
          />
          <span className="relative text-sm font-semibold text-white tracking-wide">
            {initials}
          </span>
        </>
      )}
    </div>
  )
}
