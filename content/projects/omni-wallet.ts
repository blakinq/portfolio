import type { Project } from "@/types/project"

export const omniWallet: Project = {
  slug: "omni-wallet",
  title: "Omni Wallet",
  year: "2025",
  category: "Mobile App",
  discipline: "design",
  tagline: "Streamlining Crypto and Traditional Currencies",
  heroImage: "",
  thumbnailImage: "",
  background:
    "Omni - a mobile application that seamlessly integrates the management of crypto and traditional currencies.\nOmni introduces a range of features designed to optimize financial management. Users gain access to secure and encrypted wallets, ensuring the safe storage of their crypto assets alongside their traditional currency holdings. The integration of Omni virtual cards provides unparalleled convenience, enabling users to make secure transactions globally, pay bills, and transfer funds effortlessly. Also, it addresses the challenges associated with cross-border transfers. Users could now initiate fast and low-cost international money transfers, simplifying the normally convoluted process. The app seamlessly integrates bill payment functionalities, enabling users to manage and settle their financial obligations within the same platform.",
  challenges: [],
  solutions: [],
  gallery: [
    ...Array.from({ length: 8 }, (_, i) => {
      const n = String(i + 1).padStart(2, "0")
      const ext = i === 0 ? "avif" : "webp"
      return {
        src: `/work/omni-wallet/${n}.${ext}`,
        alt: `Omni Wallet project image ${i + 1}`,
        orientation: "landscape" as const,
      }
    }),
    {
      src: "/work/omni-wallet/video1.mp4",
      alt: "Omni Wallet walkthrough video 1",
      caption: "Onboarding",
      orientation: "landscape" as const,
    },
    {
      src: "/work/omni-wallet/video2.mp4",
      alt: "Omni Wallet walkthrough video 2",
      caption: "Crypto Sale",
      orientation: "landscape" as const,
    },
    {
      src: "/work/omni-wallet/video3.mp4",
      alt: "Omni Wallet walkthrough video 3",
      caption: "Currency Exchange",
      orientation: "landscape" as const,
    },
    {
      src: "/work/omni-wallet/video4.mp4",
      alt: "Omni Wallet walkthrough video 4",
      caption: "Bill Payment",
      orientation: "landscape" as const,
    },
  ],
  outcome:
    "The impact of Omni on the financial lives of users is profound. By consolidating financial activities into a single app, individuals experience enhanced efficiency, reduced costs, and global accessibility. The streamlined user experience and intuitive design empowers users to take full control of their finances, making informed decisions and effortlessly managing their crypto and traditional currency transactions.",
  tags: ["FinTech", "User Research", "UI Design"],
  featured: true,
  order: 5,
}
