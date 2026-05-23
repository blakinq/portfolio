import type { Project } from "@/types/project"

export const liefCare: Project = {
  slug: "lief-care",
  title: "Lief Care, Birmingham, U.K.",
  year: "2023 - 2025",
  category: "Web App",
  discipline: "design",
  tagline:
    "\"Disruptive technology for Children's Homes (CHs) and Supported Accommodations (SAs) to manage everything about their care easily\" — Lief Care",
  heroImage: "",
  thumbnailImage: "",
  background:
    "Working at Lief Care, an early stage start-up building a B2B SaaS product for the British social care industry, allowed me to work closely with co-founders, product managers, software developers and other stakeholders to shape features that directly impacts the business. I regularly translated business goals into thoughtful, user-centered design solutions; thereby contributing to the company's ARR growth by 2,400% in 13 months.\n\nIn a small but nimble team, I'd work with multiple hats which included defining and implementing design guidelines, conducting user research, creating wireframes, high-fidelity mockups, and interactive prototypes that spanned complex user journeys. My designs weren't just polished, they were purposeful. One such result: we experienced over 1,000% increase in registered children homes (CHs) and supported accommodations (SAs) in just under a year, going from 31 to over 399 CHs & SAs at the time.\n\nDuring my time at Lief Care, I contributed to building a platform that improves care management by simplifying workflows for care providers. From user testing to shipping designs with software developers, I've led features across the entire product lifecycle, ensuring design consistency, accessibility, usability and clarity.",
  overviewLinks: [
    { label: "lief.care", href: "https://www.lief.care/" },
  ],
  challenges: [],
  solutions: [
    {
      title: "Rota Bulk Add & Copy",
      problems: [
        "Meal Planning was Time-Intensive and Repetitive",
        "Poor Visibility of Long-Term Meal Planning",
        "Limited Flexibility when Managing Multiple Homes",
      ],
      goals: [
        "Save time and reduce repetitive admin work for care staff.",
        "Ensure dietary consistency and compliance with health guidelines.",
        "Minimize errors and improve coordination between planning and kitchen staff.",
        "Make long-term and multi-YP planning more efficient and less stressful.",
      ],
    },
    {
      title: "Medical Inventory",
      problems: [
        "Manual Tracking of Medication & Supplies",
        "Risk of Running Out of Critical Items",
        "Lack of Visibility Across Shifts",
        "Non-Compliance with Medical Regulations",
      ],
      goals: [
        "Improve medication safety and accountability.",
        "Prevent stockouts and reduce waste from expired supplies.",
        "Help care homes stay compliant with care and health regulations.",
      ],
    },
    {
      title: "Meal Plan",
      problems: [
        "Meal Planning was Time-Intensive and Repetitive",
        "Poor Visibility of Long-Term Meal Planning",
        "Limited Flexibility when Managing Multiple Homes",
      ],
      goals: [
        "Save time and reduce repetitive admin work for care staff.",
        "Ensure dietary consistency and compliance with health guidelines.",
        "Minimize errors and improve coordination between planning and kitchen staff.",
        "Make long-term and multi-YP planning more efficient and less stressful.",
      ],
    },
  ],
  gallery: Array.from({ length: 8 }, (_, i) => {
    const n = i + 1
    const ext = n === 1 || n === 3 ? "avif" : "webp"
    return {
      src: `/work/lief-care/${String(n).padStart(2, "0")}.${ext}`,
      alt: `Lief Care project image ${n}`,
      orientation: "landscape" as const,
    }
  }),
  impact: [
    "Drove 2,400% ARR growth in 13 months by designing user-centred features aligned with business goals.",
    "Led design that resulted in a 1,000% increase in registered children's homes (CHs) within one year.",
    "In 13 months, supported platform growth from 31 to 399+ supported accommodations (SAs) and care homes (CHs) through improved onboarding and workflows.",
    "Simplified complex case-management processes, reducing friction for care providers and improving day-to-day usability.",
    "Enabled faster shipping and consistent UX by owning design across research, prototyping, testing, and developer handoff.",
    "Improved accessibility, clarity, and adoption across the product through systemised design guidelines.",
  ],
  tags: ["Social Care", "UX Research", "UI Design"],
  featured: true,
  order: 3,
}
