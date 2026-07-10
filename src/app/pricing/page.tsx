import type { Metadata } from "next";
import { Check } from "lucide-react";
import { TrackOnMount } from "@/components/analytics/track-on-mount";
import { CTAButton } from "@/components/funnel/cta-button";
import { FAQAccordion } from "@/components/funnel/faq-accordion";
import { FinalCTA } from "@/components/funnel/sections";
import { comparisonRows, pricingFAQs, pricingPlans } from "@/data/funnel";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start with the free blueprint. Upgrade when the workflow is ready: Growth, Scale, and Enterprise plans by deployment complexity.",
  openGraph: {
    title: "Pricing | Bamboo AI",
    description: "Start with the blueprint. Upgrade when the workflow is ready.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <main id="main-content">
      <TrackOnMount event="pricing_viewed" payload={{ billing_mode: "monthly" }} />

      <section className="mx-auto max-w-[1240px] px-5 pb-16 pt-14 md:px-8 md:pt-20">
        <h1 className="max-w-3xl font-heading text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.028em] text-ink-1">
          Start with the blueprint. Upgrade when the workflow is ready.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-2">
          Plans map to deployment complexity — how many agents run, and how deep they connect
          into your stack — not to feature paywalls.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn("relative flex flex-col bg-bg-0 p-6", plan.featured && "bg-bg-1")}
            >
              {plan.featured ? (
                <span className="absolute right-5 top-5 rounded-full bg-bamboo px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                  Most direct path
                </span>
              ) : null}
              <h2 className="font-heading text-xl font-semibold tracking-[-0.015em] text-ink-1">
                {plan.name}
              </h2>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-semibold tracking-[-0.02em] text-ink-1">
                  {plan.price}
                </span>
                <span className="font-mono text-xs text-ink-3">{plan.cadence}</span>
              </div>
              <p className="mt-3 text-sm font-medium leading-6 text-bamboo">{plan.bestFor}</p>
              <p className="mt-2 text-sm leading-6 text-ink-2">{plan.description}</p>
              <ul className="mt-5 grid gap-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm leading-6 text-ink-2">
                    <Check aria-hidden className="mt-1 size-3.5 shrink-0 text-bamboo" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <CTAButton
                  href={plan.href}
                  event="pricing_plan_clicked"
                  tone={plan.featured ? "primary" : "secondary"}
                  icon="none"
                  className="w-full"
                  payload={{ plan: plan.name, billing_mode: "monthly", source: "pricing_page" }}
                >
                  {plan.cta}
                </CTAButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-bg-1">
        <div className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-24">
          <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-[-0.025em] text-ink-1">
            What each plan includes.
          </h2>
          <div className="mt-8 overflow-x-auto rounded-lg border border-line" tabIndex={0} role="region" aria-label="Plan comparison table, scrolls horizontally">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line-strong">
                  <th scope="col" className="sticky left-0 z-10 bg-bg-1 px-5 py-3.5 text-left font-mono text-xs uppercase tracking-wide text-ink-3">
                    Capability
                  </th>
                  {["Free Builder", "Growth", "Scale", "Enterprise"].map((plan) => (
                    <th key={plan} scope="col" className="px-5 py-3.5 text-left font-heading text-sm font-semibold text-ink-1">
                      {plan}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-line last:border-b-0">
                    <th scope="row" className="sticky left-0 z-10 bg-bg-1 px-5 py-3.5 text-left font-medium text-ink-1">
                      {row.feature}
                    </th>
                    <td className="px-5 py-3.5 text-ink-2">{row.free}</td>
                    <td className="px-5 py-3.5 text-ink-2">{row.growth}</td>
                    <td className="px-5 py-3.5 text-ink-2">{row.scale}</td>
                    <td className="px-5 py-3.5 text-ink-2">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-mono text-xs text-ink-3 md:hidden">Scroll the table sideways for all plans →</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-[-0.025em] text-ink-1">
          Implementation and security questions.
        </h2>
        <div className="mt-8">
          <FAQAccordion items={pricingFAQs} />
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
