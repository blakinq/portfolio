import { SectionLabel } from "@/components/ui/SectionLabel"
import { BrandIcon, type BrandName } from "@/components/ui/BrandIcon"
import { Tooltip } from "@/components/ui/Tooltip"
import { stack } from "@/content/stack"

export function StackIcons() {
  return (
    <section className="py-10">
      <SectionLabel className="mb-6">Stack</SectionLabel>
      <ul className="flex flex-wrap items-center gap-5">
        {stack.map((s) => (
          <li key={s.id}>
            <Tooltip label={s.name}>
              <span
                aria-label={s.name}
                tabIndex={0}
                data-brand={s.icon}
                className="brand-swatch inline-flex text-text-secondary outline-none transition-colors hover:text-text-primary focus-visible:text-text-primary"
              >
                <BrandIcon name={s.icon as BrandName} size={28} />
              </span>
            </Tooltip>
          </li>
        ))}
      </ul>
    </section>
  )
}
