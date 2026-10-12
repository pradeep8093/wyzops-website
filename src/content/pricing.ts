/**
 * Engagement models and starting prices (USD).
 *
 * Positioned above typical offshore rates and below US agencies — the
 * "senior-led boutique" band. 2026 benchmarks used to set these:
 *   • India agencies: ~$25–75/hr · Eastern Europe: ~$50–120/hr · US: ~$150–300/hr
 *   • Paid discovery phases (2–4 weeks): ~$5k–15k
 *   • API-based AI chatbots ~$8k–25k · RAG systems ~$20k–50k
 *   • Agency retainers: ~$8k–25k/month
 *
 * Every number here is editable. Toggle the whole section with
 * `showPricing` in content/site.ts.
 */

export type Engagement = {
  id: string;
  name: string;
  /** Rendered as e.g. "From $5,000 / month". */
  price: { from?: boolean; amount: string; per?: string };
  /** e.g. "Fixed fee · 2 weeks" */
  unit: string;
  description: string;
  includes: string[];
  /** Small label above the card, e.g. "Start here". Keep it factual. */
  badge?: string;
  /** Visually emphasised card. */
  featured?: boolean;
  cta: { label: string; href: string };
  /** One-line "best for" hint. */
  bestFor: string;
};

export const pricingIntro = {
  eyebrow: "Pricing",
  title: "Senior-level work, priced transparently.",
  description:
    "We're not the cheapest option — by design. Every engagement is senior-led, architected before it's built, and documented so your team can own it.",
};

export const engagements: Engagement[] = [
  {
    id: "discovery",
    name: "Discovery Sprint",
    price: { from: true, amount: "$5,000" },
    unit: "Fixed fee · 2 weeks",
    badge: "Start here",
    featured: true,
    description: "We map your systems and goals, then hand you an architecture and a fixed-price plan.",
    includes: [
      "Stakeholder and systems workshops",
      "Architecture and integration map",
      "Scoped roadmap with a fixed quote",
      "Fee credited toward your build",
    ],
    bestFor: "New initiatives and unclear scope",
    cta: { label: "Start with discovery", href: "/contact?type=technical-consulting" },
  },
  {
    id: "project",
    name: "Fixed-Scope Project",
    price: { from: true, amount: "$15,000" },
    unit: "Fixed price · milestone billing",
    description: "A defined outcome, a fixed price, and a delivery date — delivered by a senior-led team.",
    includes: [
      "Dedicated engagement lead",
      "Weekly demos and written updates",
      "QA, documentation, and handover",
      "30-day post-launch warranty",
    ],
    bestFor: "Integrations, AI features, MVPs",
    cta: { label: "Scope a project", href: "/contact" },
  },
  {
    id: "pod",
    name: "Dedicated Engineering Pod",
    price: { from: true, amount: "$12,000", per: "/ month" },
    unit: "Monthly · 30 days' notice",
    description: "A senior-led team that works as an extension of yours, inside your tools and rituals.",
    includes: [
      "Full-time senior engineer(s)",
      "Tech lead and architect oversight",
      "Sprint planning, demos, reporting",
      "Scale up or down month to month",
    ],
    bestFor: "Ongoing product and platform work",
    cta: { label: "Discuss a pod", href: "/contact" },
  },
  {
    id: "advisory",
    name: "Advisory & Architecture",
    price: { amount: "$150", per: "/ hour" },
    unit: "Or retainers from $3,000 / month",
    description: "Senior guidance without a full team — for decisions that are expensive to get wrong.",
    includes: [
      "Architecture and code reviews",
      "Boomi and integration health checks",
      "AI strategy and build-vs-buy",
      "Direct access to senior engineers",
    ],
    bestFor: "CTOs, product leaders, internal teams",
    cta: { label: "Book advisory time", href: "/contact?type=technical-consulting" },
  },
];

export const pricingFootnotes = [
  "All prices in USD. Final pricing is confirmed in writing before work starts — no surprises.",
  "Ongoing care plans for integrations and applications start at $2,000 / month.",
];
