import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

type PageMetaInput = {
  /** Page title. Omit on the homepage to use the default title. */
  title?: string;
  description?: string;
  /** Route path, e.g. "/contact". Used for the canonical URL. */
  path: string;
  /** Set false for pages that shouldn't be indexed (e.g. 404). */
  index?: boolean;
};

const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
};

/**
 * Builds consistent per-page metadata: canonical URL, Open Graph and X cards.
 * (Nested `openGraph` objects replace the parent's, so everything is set here.)
 */
export function pageMetadata({ title, description = siteConfig.description, path, index = true }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} — ${siteConfig.name}` : undefined;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      url: path,
      ...(fullTitle ? { title: fullTitle } : {}),
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      ...(fullTitle ? { title: fullTitle } : {}),
      description,
      images: [ogImage.url],
    },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}
