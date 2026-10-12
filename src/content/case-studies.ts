/**
 * Client work / case studies.
 *
 * Intentionally empty — the "Selected Work" section shows a placeholder until
 * real, client-approved projects are added. Never publish invented clients,
 * metrics, or results.
 *
 * Example entry:
 *
 *   {
 *     slug: "order-sync-platform",
 *     client: "Client name (with permission)",
 *     title: "Unifying order data across ERP and e-commerce",
 *     summary: "What the problem was and what we built — two sentences.",
 *     services: ["Boomi Integration", "Automation & APIs"],
 *     year: 2026,
 *     outcome: "A real, verifiable outcome — or omit.",
 *     url: "https://…", // optional link to a full write-up
 *     image: { src: "/work/order-sync.png", alt: "…" },
 *   }
 */

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  summary: string;
  services: string[];
  year?: number;
  outcome?: string;
  url?: string;
  image?: { src: string; alt: string };
};

export const caseStudies: CaseStudy[] = [];
