import { services } from "@/content/services";
import { absoluteUrl, isPlaceholderEmail, siteConfig } from "@/content/site";

type JsonLdValue = Record<string, unknown>;

/** Renders a JSON-LD <script>, escaping "<" to prevent script injection. */
export function JsonLd({ data }: { data: JsonLdValue | JsonLdValue[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const orgId = absoluteUrl("/#organization");

export function organizationSchema(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon.svg"),
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    address: { "@type": "PostalAddress", addressCountry: siteConfig.location.countryCode },
    areaServed: "Worldwide",
    knowsAbout: [
      "SaaS development",
      "Web development",
      "Mobile app development",
      "Boomi integration",
      "API development",
      "AI integration",
      "AI chatbots",
      "Model Context Protocol",
      "Business process automation",
      "Cloud and backend engineering",
      "Solution architecture",
    ],
    ...(isPlaceholderEmail
      ? {}
      : {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteConfig.contactEmail,
          },
        }),
    ...(siteConfig.socials.length ? { sameAs: siteConfig.socials.map((s) => s.href) } : {}),
  };
}

export function websiteSchema(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": orgId },
  };
}

/** The service catalogue, described as Services provided by the Organization. */
export function servicesSchema(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${siteConfig.name} services`,
    url: absoluteUrl("/#services"),
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": orgId },
      },
    })),
  };
}
