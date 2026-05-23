import type { Project } from "@/types/project"

export const oddience: Project = {
  slug: "oddience",
  title: "Oddience",
  year: "2025",
  category: "Website, Web App",
  discipline: "design",
  tagline: "AI-powered advocacy-marketing platform",
  heroImage: "/work/oddience/hero.webp",
  thumbnailImage: "",
  background:
    "Oddience is an AI-powered advocacy-marketing platform that lets brands turn everyday social-media users into paid micro-promoters. Brands upload creative once; Oddience matches, tracks, and pays a distributed \"oddience\" of authentic sharers who repost the ad to their own feeds, thereby unlocking trusted reach at performance-media precision.\n\nBrands upload a campaign, specify budget and audience, and then everyday social-media users (\"oddience\") can get paid by successfully applying to amplify that campaign to their own followers, aiming for more authentic reach.",
  challenges: [],
  solutions: [],
  sections: [
    {
      label: "Key Features",
      bullets: [
        "Cost-Effective Marketing: Achieve high visibility without the high cost of traditional ads.",
        "Real Engagement: People engage more with content shared by someone they trust.",
        "Simple & Rewarding: Users get paid to repost ads, allowing marketing budgets to work effectively.",
      ],
      outro:
        "Oddience is currently in beta and invites marketers to test the platform and share their feedback.",
    },
    {
      label: "Creators",
      intro: "Oddience offers creators (influencers):",
      bullets: [
        "Monetization Opportunities: Creators can earn money by promoting brands, regardless of their follower count.",
        "Direct Communication: The platform serves as an online marketplace connecting influencers and brands, allowing users to communicate directly and foster collaborations.",
      ],
    },
    {
      label: "Brands",
      intro: "Oddience enables brands to:",
      bullets: [
        "Upload Ads: Brands can upload their advertisements, set budgets, and define target audiences.",
        "Go Viral: Real people share these ads with their followers, creating authentic engagements.",
        "Track Results: Brands can monitor engagement and reach in real-time through a dashboard.",
      ],
      outro:
        "The platform's AI algorithms match brands with the most suitable influencers, ensuring maximum efficiency while driving measurable ROI.",
    },
  ],
  gallery: Array.from({ length: 16 }, (_, i) => ({
    src: `/work/oddience/${String(i + 1).padStart(2, "0")}.webp`,
    alt: `Oddience project image ${i + 1}`,
    orientation: "landscape" as const,
  })),
  tags: ["Content Creation", "User Research", "UI Design"],
  featured: true,
  order: 2,
}
