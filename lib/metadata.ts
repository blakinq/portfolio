import type { Metadata } from "next"
import { site } from "@/content/site"

interface GenerateMetaOpts {
  title?: string
  description?: string
  image?: string
  path?: string
}

export function generateMeta({
  title,
  description,
  image,
  path = "/",
}: GenerateMetaOpts = {}): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · ${site.role}`
  const desc = description ?? site.shortBio
  const url = `${site.url.replace(/\/$/, "")}${path}`
  const ogImage = image ?? "/og-default.png"

  return {
    metadataBase: new URL(site.url),
    title: fullTitle,
    description: desc,
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      images: [{ url: ogImage }],
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  }
}
