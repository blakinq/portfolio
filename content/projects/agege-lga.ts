import type { Project } from "@/types/project"

export const agegeLga: Project = {
  slug: "agege-lga",
  title: "Agege LGA",
  year: "2025 - 2026",
  category: "Website, Web App",
  discipline: "design",
  tagline:
    "User-friendly Government Platform for Digital Tax Collection and Public Services",
  heroImage: "",
  heroVideo: "/work/agege-lga/hero.mp4",
  thumbnailImage: "",
  background:
    "Agege Local Government required a modern digital platform to improve revenue collection, reduce payment friction, and increase transparency between the government and citizens. Existing processes were fragmented, manual and time-consuming, leading to missed payments, poor record-keeping, and low citizen trust.\n\nThis project involved designing an end-to-end municipal web platform consisting of a public-facing website and a secure tax and levy web application for residents, and government administrators.",
  challenges: [
    "Payments were often made offline with delayed confirmation",
    "Receipts and records were difficult to retrieve",
    "Administrators relied heavily on manual processes and siloed data",
    "Limited visibility into revenue performance on the administrative end",
  ],
  goal: {
    intro:
      "To design a user-friendly, secure, and transparent digital platform that would:",
    bullets: [
      "Simplify tax and levy payments",
      "Improve revenue collection efficiency",
      "Provide real-time access to bills, receipts, and payment history",
      "Enable administrators to manage taxpayers, levies, and disputes from one system",
    ],
  },
  solutions: [
    {
      title: "User-Facing Tax Web App",
      bullets: [
        "Centralized dashboard showing amount remitted and transaction history over period of time.",
        "Secure online payments with instant confirmation",
        "Downloadable receipts and tax documents",
        "Clear levy breakdowns and due date reminders",
        "Support ticket system for disputes and inquiries",
        "Notification preferences for email and in-app alerts",
      ],
    },
    {
      title: "Admin Management App",
      bullets: [
        "Custom CMS to manage variable website data",
        "User (administrators) management",
        "Levy creation and adjustment",
        "Payment management and reconciliation",
        "Dispute resolution and support ticket handling",
        "Audit logs and role-based access control",
      ],
    },
  ],
  gallery: Array.from({ length: 12 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0")
    const ext = i + 1 === 5 ? "avif" : "webp"
    return {
      src: `/work/agege-lga/${n}.${ext}`,
      alt: `Agege LGA project image ${i + 1}`,
    }
  }),
  tags: ["GovTech", "UX Design", "UI Design"],
  featured: true,
  order: 1,
}
