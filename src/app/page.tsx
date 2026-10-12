import type { Metadata } from "next";
import { Fragment, type ReactElement } from "react";
import { AiSection } from "@/components/sections/ai-section";
import { BusinessAreas } from "@/components/sections/business-areas";
import { CapabilityStrip } from "@/components/sections/capability-strip";
import { CtaSection } from "@/components/sections/cta-section";
import { Delivery } from "@/components/sections/delivery";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";
import { Products } from "@/components/sections/products";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";
import { Team } from "@/components/sections/team";
import { WhyWyzOps } from "@/components/sections/why-wyzops";
import { JsonLd, servicesSchema } from "@/components/seo/json-ld";
import { showProducts, showWork } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ path: "/" });

type NumberedSection = { key: string; show: boolean; render: (index: string) => ReactElement };

/**
 * Homepage section order. Sections are numbered automatically ("01", "02", …),
 * so hiding one (e.g. Products while it's empty) keeps the numbering tidy.
 */
const sections: NumberedSection[] = [
  { key: "about", show: true, render: (i) => <BusinessAreas index={i} /> },
  { key: "services", show: true, render: (i) => <Services index={i} /> },
  { key: "ai", show: true, render: (i) => <AiSection index={i} /> },
  { key: "team", show: true, render: (i) => <Team index={i} /> },
  { key: "process", show: true, render: (i) => <Process index={i} /> },
  { key: "delivery", show: true, render: (i) => <Delivery index={i} /> },
  { key: "work", show: showWork, render: (i) => <SelectedWork index={i} /> },
  { key: "why", show: true, render: (i) => <WhyWyzOps index={i} /> },
  { key: "pricing", show: siteConfig.showPricing, render: (i) => <Pricing index={i} /> },
  { key: "products", show: showProducts, render: (i) => <Products index={i} /> },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      {sections
        .filter((s) => s.show)
        .map((s, i) => (
          <Fragment key={s.key}>{s.render(String(i + 1).padStart(2, "0"))}</Fragment>
        ))}
      <CtaSection />
      <JsonLd data={servicesSchema()} />
    </>
  );
}
