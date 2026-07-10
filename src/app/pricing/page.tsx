import type { Metadata } from "next";
import { FinalCTA } from "@/components/funnel/blocks";
import { FAQAccordion } from "@/components/funnel/faq-accordion";
import { PricingSection } from "@/components/funnel/pricing-section";
import { homepageFAQs } from "@/data/funnel";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore Bamboo AI plan options for free agent previews, growth teams, scale workflows, and enterprise deployments.",
  openGraph: {
    title: "Pricing | Bamboo AI",
    description: "Start with a free AI agent preview and upgrade when ready.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <main id="main-content">
      <PricingSection />
      <section className="page-shell section-space max-w-4xl">
        <FAQAccordion items={homepageFAQs.slice(0, 4)} />
      </section>
      <FinalCTA
        title="Not sure which plan fits?"
        description="Build the free agent first, then use the demo call to map the right launch plan."
      />
    </main>
  );
}
