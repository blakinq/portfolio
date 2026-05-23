import { cn } from "@/lib/utils"

export function Badge({
  children,
  color,
  className,
}: {
  children: React.ReactNode
  color?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[4px] border border-border-default bg-bg-elevated px-2 py-0.5 text-xs font-medium text-text-primary",
        className,
      )}
    >
      {color && (
        <span
          aria-hidden
          className="size-1.5 rounded-[4px]"
          style={{ background: color }}
        />
      )}
      {children}
    </span>
  )
}
