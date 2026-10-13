import type { NextConfig } from "next";

/**
 * IS_COMING_SOON=true replaces the whole site with a "Coming soon" screen.
 *
 * The flag is read once, at build time, and inlined into the app (see `env`
 * below), so the routing here and the rendered pages always agree.
 * After changing it: redeploy, or rebuild / restart `next dev`.
 */
const isComingSoon = ["1", "true", "yes", "on"].includes(
  (process.env.IS_COMING_SOON ?? "").trim().toLowerCase(),
);

/**
 * Paths that stay reachable while the site is gated: build assets, icons,
 * the share image, the manifest, and robots/sitemap (which gate themselves).
 */
const ungatedPaths = [
  "_next/",
  "icon\\.svg",
  "apple-icon",
  "opengraph-image",
  "manifest\\.webmanifest",
  "favicon\\.ico",
  "robots\\.txt",
  "sitemap\\.xml",
].join("|");

const nextConfig: NextConfig = {
  env: {
    IS_COMING_SOON: isComingSoon ? "true" : "false",
  },

  async rewrites() {
    if (!isComingSoon) return [];
    return {
      // Every page URL (including unknown ones) renders the coming-soon route.
      beforeFiles: [{ source: `/:path((?!${ungatedPaths}).*)`, destination: "/coming-soon" }],
      afterFiles: [],
      fallback: [],
    };
  },

  async headers() {
    if (!isComingSoon) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
