import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SiteEffects } from "@/components/effects/site-effects";
import { ComingSoon } from "@/components/layout/coming-soon";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/seo/json-ld";
import { siteConfig } from "@/content/site";
import { isComingSoon } from "@/lib/coming-soon";
import "./globals.css";

const defaultTitle = `${siteConfig.name} — SaaS Products, AI & Integration Engineering`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "SaaS development",
    "SaaS consulting",
    "AI integration",
    "AI development",
    "MCP integration",
    "Boomi integration",
    "web development",
    "mobile app development",
    "technology consulting",
    "software development",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    title: defaultTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: isComingSoon
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
      },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables JS-only enhancements (scroll reveals) before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh bg-canvas text-fg antialiased">
        {isComingSoon ? <ComingSoonShell /> : <SiteShell>{children}</SiteShell>}
      </body>
    </html>
  );
}

/**
 * IS_COMING_SOON: page content is never rendered, whichever route was requested.
 * (next.config.ts also rewrites every URL to /coming-soon for consistent metadata.)
 */
function ComingSoonShell() {
  return (
    <main id="main-content" className="outline-none">
      <ComingSoon />
    </main>
  );
}

function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-fg px-4 py-2 text-sm font-medium text-canvas transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <SiteEffects />
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
    </>
  );
}
