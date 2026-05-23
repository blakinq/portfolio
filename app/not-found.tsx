import Link from "next/link"
import { Footer } from "@/components/layout/Footer"

export default function NotFound() {
  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-[var(--content-max)] flex-col items-center justify-center px-4 py-32 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
          404
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-text-primary">
          Nothing at this URL.
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          The page you&apos;re looking for has moved or never existed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-[4px] border border-border-default bg-bg-elevated px-3 py-1.5 text-sm text-text-primary hover:bg-bg-hover"
        >
          ← Back home
        </Link>
      </main>
      <Footer />
    </>
  )
}
