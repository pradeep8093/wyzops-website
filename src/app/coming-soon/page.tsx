import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site";
import { isComingSoon } from "@/lib/coming-soon";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Coming soon",
  description: `${siteConfig.name}: ${siteConfig.tagline} Our website is coming soon.`,
  path: "/",
  index: false,
});

/**
 * Rewrite target while IS_COMING_SOON is on (see next.config.ts), so every URL
 * gets this route's metadata. The screen itself is rendered by the root layout,
 * which replaces all page content while the flag is on.
 * With the flag off, this URL doesn't exist.
 */
export default function ComingSoonPage() {
  if (!isComingSoon) notFound();
  return null;
}
