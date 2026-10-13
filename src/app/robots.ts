import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/content/site";
import { isComingSoon } from "@/lib/coming-soon";

export default function robots(): MetadataRoute.Robots {
  if (isComingSoon) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
