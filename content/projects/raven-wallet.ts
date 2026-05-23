import type { Project } from "@/types/project"

export const ravenWallet: Project = {
  slug: "raven-wallet",
  title: "Raven Wallet",
  year: "2022 - 2023",
  category: "Browser Extension",
  discipline: "design",
  tagline: "Fraud Detection and Reporting System for Non-Custodial Wallets",
  heroImage: "",
  thumbnailImage: "",
  background:
    "Raven Wallet – a non-custodial wallet designed to detect and flag suspicious transactions and activities, or patterns of behavior that indicate possible fraud.\n\nBy integrating a first-hand reporting system that makes it possible for users to report scams and scam attempts, Raven Wallet's user-friendly functionality empowers users to take an active role in protecting their assets. It helps the platform to quickly alert them of potential fraud incidents from smart contracts that have been flagged or reported in the past.\n\nRaven Wallet also enables users to revoke permissions they give to protocols upon interacting with them for the first time. This helps to ensure that future transactions on such protocols cannot be carried out without express permission from the wallet owner.",
  overviewLinks: [
    { label: "Documentation Link", href: "#" },
    { label: "Research Report", href: "#" },
    { label: "Maze User Testing Report", href: "#" },
    { label: "Research Survey", href: "#" },
  ],
  challenges: [],
  solutions: [],
  gallery: [
    ...Array.from({ length: 9 }, (_, i) => ({
      src: `/work/raven-wallet/${String(i + 1).padStart(2, "0")}.avif`,
      alt: `Raven Wallet project image ${i + 1}`,
      orientation: "portrait" as const,
      ...(i === 8 ? { rowSpan: 2 as const } : {}),
    })),
    {
      src: "/work/raven-wallet/video1.mp4",
      alt: "Raven Wallet walkthrough video 1",
      orientation: "landscape" as const,
    },
    {
      src: "/work/raven-wallet/video2.mp4",
      alt: "Raven Wallet walkthrough video 2",
      orientation: "landscape" as const,
    },
  ],
  tags: ["DeFi", "UX Research", "Design Thinking", "UI Design"],
  featured: true,
  order: 4,
}
