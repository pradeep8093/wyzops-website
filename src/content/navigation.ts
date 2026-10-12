import { caseStudies } from "@/content/case-studies";
import { products } from "@/content/products";
import { siteConfig } from "@/content/site";

export type NavItem = {
  label: string;
  href: string;
};

/** Sections that only appear once they have real content (or when showEmptySections is on). */
export const showProducts = products.length > 0 || siteConfig.showEmptySections;
export const showWork = caseStudies.length > 0 || siteConfig.showEmptySections;

const when = (condition: boolean, item: NavItem) => (condition ? [item] : []);

/** Primary navigation (desktop bar + mobile menu). */
export const mainNav: NavItem[] = [
  ...when(products.length > 0, { label: "Products", href: "/#products" }),
  { label: "Services", href: "/#services" },
  { label: "AI", href: "/#ai" },
  ...when(siteConfig.showPricing, { label: "Pricing", href: "/#pricing" }),
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta: NavItem = {
  label: "Start a Conversation",
  href: "/contact",
};

/** Footer link groups. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Explore",
    items: [
      ...when(showProducts, { label: "Products", href: "/#products" }),
      { label: "Services", href: "/#services" },
      { label: "AI", href: "/#ai" },
      { label: "Team", href: "/#team" },
      ...when(siteConfig.showPricing, { label: "Pricing", href: "/#pricing" }),
      { label: "About", href: "/#about" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
