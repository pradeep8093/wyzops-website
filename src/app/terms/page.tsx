import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description: `Terms of use for the ${siteConfig.name} website.`,
  path: "/terms",
});

// TEMPLATE — review with counsel before launch. Replace [bracketed] values.
export default function TermsPage() {
  const email = siteConfig.contactEmail;
  return (
    <LegalPage title="Terms of Use" lastUpdated="[Month DD, YYYY]">
      <p>
        These terms govern your use of the {siteConfig.name} website. By using the site, you agree to them. Client
        engagements are covered by separate written agreements.
      </p>

      <h2>Use of the site</h2>
      <p>
        You may browse and use this site for lawful purposes. Please don&apos;t attempt to disrupt it, access it in
        unauthorized ways, or use it to send unsolicited or harmful content.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, design, and branding on this site belong to {siteConfig.name} unless stated otherwise. You may not
        copy or reuse them without permission, except as allowed by law.
      </p>

      <h2>Information on this site</h2>
      <p>
        We aim to keep information accurate and current, but it is provided &ldquo;as is&rdquo; for general information
        and does not constitute professional advice or an offer to provide services on specific terms.
      </p>

      <h2>Third-party links</h2>
      <p>We may link to other websites. We aren&apos;t responsible for their content or practices.</p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {siteConfig.name} is not liable for any indirect or consequential loss arising
        from your use of this site.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of [jurisdiction].</p>

      <h2>Changes</h2>
      <p>We may update these terms. The &ldquo;Last updated&rdquo; date above reflects the latest version.</p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${email}`}>{email}</a> or visit our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
