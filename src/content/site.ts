/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION
 *  Everything brand-level lives here. Values marked ⚠️ PLACEHOLDER must be
 *  replaced before launch (see README → "Launch checklist").
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type SocialLink = {
  /** Display name, e.g. "LinkedIn" */
  label: string;
  /** Full URL, e.g. "https://www.linkedin.com/company/…" */
  href: string;
};

/** Reserved documentation domain — never a real inbox. */
const PLACEHOLDER_EMAIL = "hello@example.com";

export const siteConfig = {
  name: "WyzOps",
  tagline: "Build. Integrate. Automate.",
  description:
    "WyzOps is a technology consultancy and product studio. Senior-led engineering teams in India design, build, and integrate systems for clients worldwide — SaaS, web and mobile development, Boomi and API integrations, AI, and MCP.",

  /** Where the team works from. Shown in the footer, contact page and structured data. */
  location: {
    country: "India",
    countryCode: "IN",
    servedRegion: "Clients worldwide",
  },

  /**
   * ⚠️ PLACEHOLDER — the production URL (no trailing slash).
   * Used for canonical URLs, Open Graph, the sitemap and structured data.
   * Set NEXT_PUBLIC_SITE_URL in your hosting environment, or edit the fallback.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://wyzops.com").replace(/\/$/, ""),

  /**
   * ⚠️ PLACEHOLDER — the public contact inbox.
   * Set NEXT_PUBLIC_CONTACT_EMAIL, or replace PLACEHOLDER_EMAIL above.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || PLACEHOLDER_EMAIL,

  /**
   * Social profiles. Leave empty until real accounts exist —
   * the footer and structured data only render links listed here.
   */
  socials: [] as SocialLink[],

  /**
   * Optional scheduling link (Cal.com, Calendly, HubSpot…), e.g. "https://cal.com/wyzops/intro".
   * When set, "Book a call" buttons appear in the pricing section, final CTA and contact page.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",

  /** Shown in the footer. */
  copyrightYear: 2026,

  /** Show the pricing section (prices live in content/pricing.ts). */
  showPricing: true,

  /**
   * Products and Selected Work hide themselves until they have real entries.
   * Set to true to show their "coming soon" placeholders instead.
   */
  showEmptySections: false,

  /**
   * Legal pages ship as templates. While this is true, a visible notice is
   * rendered on /privacy and /terms. Set to false after legal review.
   */
  legalPagesAreDrafts: true,
} as const;

/** True while the contact email is still the documentation placeholder. */
export const isPlaceholderEmail = siteConfig.contactEmail === PLACEHOLDER_EMAIL;

export const absoluteUrl = (path = "/") =>
  `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
