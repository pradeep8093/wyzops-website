import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects information submitted through this website.`,
  path: "/privacy",
});

// TEMPLATE — review with counsel before launch. Replace [bracketed] values.
export default function PrivacyPage() {
  const email = siteConfig.contactEmail;
  return (
    <LegalPage title="Privacy Policy" lastUpdated="[Month DD, YYYY]">
      <p>
        This policy explains how {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information when you
        visit this website or contact us through it.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Information you provide.</strong> When you use the contact form or email us, we receive the details
          you share — such as your name, work email, company, project details, and budget range.
        </li>
        <li>
          <strong>Technical information.</strong> Like most websites, our hosting provider may log basic request data
          (such as IP address, browser type, and pages visited) to operate and secure the site. [Describe any analytics
          tools here, or state that none are used.]
        </li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to your inquiry and discuss a potential engagement.</li>
        <li>To operate, maintain, and secure this website.</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Sharing</h2>
      <p>
        We share information only with service providers that help us run this website and handle communications (for
        example, hosting and email delivery), and only as needed to provide those services — or where required by law.
        [List key processors if required in your jurisdiction.]
      </p>

      <h2>Retention</h2>
      <p>
        We keep inquiry information for as long as needed to respond and to manage any resulting relationship, then
        delete it. [Specify a retention period.]
      </p>

      <h2>Your choices and rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, or delete your personal information, or
        to object to certain processing. To make a request, email us at <a href={`mailto:${email}`}>{email}</a>.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. The &ldquo;Last updated&rdquo; date above reflects the latest
        version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email <a href={`mailto:${email}`}>{email}</a> or use our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
