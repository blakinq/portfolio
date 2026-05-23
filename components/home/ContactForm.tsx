"use client"

import { useState, useTransition } from "react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Kbd } from "@/components/ui/Kbd"
import { cn } from "@/lib/utils"

interface ContactState {
  status: "idle" | "ok" | "error"
  error?: string
}

export function ContactForm({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [state, setState] = useState<ContactState>({ status: "idle" })
  const [isPending, startTransition] = useTransition()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      honey: String(data.get("company") ?? ""),
    }
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        const json = await res.json()
        if (!res.ok || !json.success) {
          setState({ status: "error", error: json.error ?? "Something went wrong." })
          return
        }
        setState({ status: "ok" })
        form.reset()
      } catch {
        setState({ status: "error", error: "Network error. Try again." })
      }
    })
  }

  return (
    <section className={hideHeader ? "" : "py-10"}>
      {!hideHeader && (
        <>
          <SectionLabel className="mb-6">Contact</SectionLabel>
          <p className="mb-4 text-sm text-text-secondary">
            You can contact me using the form or via the links below.
          </p>
        </>
      )}

      <div className="bento p-6 sm:p-7">
        {state.status === "ok" ? (
          <div className="flex items-center gap-3 py-4 text-sm text-text-primary">
            <span
              aria-hidden
              className="inline-flex size-6 items-center justify-center rounded-full bg-[var(--color-green)]/15 text-[var(--color-green)]"
            >
              ✓
            </span>
            Message sent — I&apos;ll be in touch.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="company"
              aria-hidden
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[10000px] size-0 opacity-0"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                id="name"
                name="name"
                label="Name"
                placeholder="Your name"
                required
                minLength={2}
              />
              <Field
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="you@domain.com"
                required
              />
            </div>
            <Field
              id="message"
              name="message"
              label="Message"
              placeholder="What are you working on?"
              required
              textarea
              minLength={10}
            />
            {state.status === "error" && (
              <div className="text-xs text-[var(--color-red)]">{state.error}</div>
            )}
            <div className="mt-2 flex items-center justify-between">
              <button
                type="submit"
                disabled={isPending}
                className={cn(
                  "inline-flex items-center gap-2 rounded-[4px] bg-text-primary px-4 py-2 text-sm font-medium text-bg-base transition-all hover:bg-white disabled:cursor-not-allowed",
                  isPending && "opacity-60",
                )}
              >
                {isPending ? "Sending…" : "Send message"}
              </button>
              <div className="hidden items-center gap-1.5 text-[11px] text-text-tertiary sm:flex">
                <Kbd>↵</Kbd>
                <span>Enter to send</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
  minLength,
  textarea,
}: {
  id: string
  name: string
  label: string
  placeholder?: string
  type?: string
  required?: boolean
  minLength?: number
  textarea?: boolean
}) {
  const baseClass =
    "w-full rounded-[4px] border border-border-subtle bg-bg-elevated px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary transition-colors hover:border-border-default focus:border-border-strong focus:bg-bg-hover focus:outline-none"
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.08em] text-text-tertiary">
        {label}
        {required && <span aria-hidden className="text-text-tertiary/70">*</span>}
      </span>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          minLength={minLength}
          rows={5}
          placeholder={placeholder}
          className={baseClass + " resize-y"}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          minLength={minLength}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </label>
  )
}

