import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { CTAButton } from "@/components/funnel/cta-button";
import { FAQAccordion } from "@/components/funnel/faq-accordion";
import { GapFlow } from "@/components/funnel/gap-flow";
import { IndustryExplorer } from "@/components/funnel/industry-explorer";
import { LiveSystemScene } from "@/components/funnel/live-system-scene";
import { MiniBuilder } from "@/components/funnel/mini-builder";
import { ROIEstimator } from "@/components/funnel/roi-estimator";
import { FinalCTA, SectionHeader } from "@/components/funnel/sections";
import { UseCaseExplorer } from "@/components/funnel/use-case-explorer";
import {
  blueprintIncludes,
  estimatorDefaults,
  guardrailFlow,
  homepageFAQs,
  integrations,
  pricingPlans,
} from "@/data/funnel";

const container = "mx-auto max-w-[1240px] px-5 md:px-8";

export default function Home() {
  return (
    <main id="main-content">
      {/* 1 — Hero: product experience first */}
      <section className={`${container} grid gap-12 pb-20 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:items-center lg:gap-16`}>
        <div>
          <h1 className="font-heading text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-ink-1">
            Bamboo AI turns every visitor into a qualified next step.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-2">
            Build a no-code agent that answers questions, qualifies intent, books the right
            action, and hands your team the context. Create the first blueprint in under five
            minutes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="none" payload={{ source: "hero" }}>
              Build My Free Agent
            </CTAButton>
            <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="none" payload={{ source: "hero" }}>
              Book a Strategy Call
            </CTAButton>
          </div>
          <p className="mt-5 font-mono text-xs text-ink-3">
            No code. No credit card. Keep human control.
          </p>
        </div>
        <LiveSystemScene className="lg:pt-2" />
      </section>

      {/* 2 — Integration capability strip */}
      <section aria-label="Connection capabilities" className="border-y border-line bg-bg-1">
        <div className={`${container} flex flex-wrap items-baseline gap-x-6 gap-y-2 py-5`}>
          <span className="font-mono text-xs uppercase tracking-wide text-ink-3">
            Designed to connect with
          </span>
          {integrations.map((integration) => (
            <span key={integration} className="text-sm text-ink-2">
              {integration}
            </span>
          ))}
        </div>
      </section>

      {/* 3 — Cost of the gap */}
      <section className={`${container} py-20 md:py-28`}>
        <SectionHeader
          title="The lead usually disappears between interest and follow-up."
          description="Interest is instant. Follow-up isn't. Watch the same inquiry cross both versions of your funnel."
        />
        <div className="mt-12">
          <GapFlow />
        </div>
      </section>

      {/* 4 — Interactive use-case explorer */}
      <section id="use-cases" className="border-t border-line bg-bg-1 scroll-mt-20">
        <div className={`${container} py-20 md:py-28`}>
          <SectionHeader
            title="Give the first agent one job worth doing."
            description="Every deployment starts with a single outcome. Pick one to see the full system behind it — trigger, actions, capture, handoff, and result."
          />
          <div className="mt-12">
            <UseCaseExplorer />
          </div>
        </div>
      </section>

      {/* 5 — Builder demonstration */}
      <section id="how-it-works" className={`${container} scroll-mt-20 py-20 md:py-28`}>
        <SectionHeader
          title="Build the blueprint before you book the call."
          description="Three decisions are enough to see it take shape. The full builder finishes the job: describe the workflow, review the agent blueprint, save it and map the launch."
        />
        <div className="mt-12">
          <MiniBuilder />
        </div>
      </section>

      {/* 6 — Outcome and ROI model */}
      <section className="border-t border-line bg-bg-1">
        <div className={`${container} py-20 md:py-28`}>
          <SectionHeader
            title="Model the value with your numbers."
            description="No industry benchmarks, no invented multipliers — just your volume, your rates, your deal size."
          />
          <div className="mt-12">
            <ROIEstimator defaults={estimatorDefaults} />
          </div>
        </div>
      </section>

      {/* 7 — Knowledge, guardrails, handoff */}
      <section className={`${container} py-20 md:py-28`}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <div>
            <SectionHeader
              title="Automation your team can inspect."
              description="Every answer traces back to knowledge you approved. Every escalation follows a rule you wrote. Every conversation ends as a record you can read."
            />
            <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-ink-3">
              <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-bamboo" />
              For medical, legal, insurance, and cannabis workflows, the agent handles
              administrative guidance only — professional advice always escalates to a licensed
              human.
            </p>
          </div>
          <ol className="grid gap-0">
            {guardrailFlow.map((step, index) => (
              <li key={step.stage} className="relative pb-7 pl-8 last:pb-0">
                <span
                  className="absolute left-0 top-1 flex size-5 items-center justify-center rounded-full border border-bamboo-deep font-mono text-[10px] text-bamboo"
                  aria-hidden
                >
                  {index + 1}
                </span>
                {index < guardrailFlow.length - 1 ? (
                  <span className="absolute left-[9.5px] top-7 h-[calc(100%-24px)] w-px bg-line" aria-hidden />
                ) : null}
                <h3 className="font-heading text-lg font-semibold tracking-[-0.01em] text-ink-1">
                  {step.stage}
                </h3>
                <p className="mt-1 text-sm leading-6 text-ink-2">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 — Industry explorer */}
      <section id="industries" className="scroll-mt-20 border-t border-line bg-bg-1">
        <div className={`${container} py-20 md:py-28`}>
          <SectionHeader
            title="Start with the workflow your market already needs."
            description="Eleven industry playbooks, each with its own qualification logic, guardrails, and example conversations."
          />
          <div className="mt-12">
            <IndustryExplorer />
          </div>
        </div>
      </section>

      {/* 9 — Proof replacement: the blueprint artifact */}
      <section className={`${container} py-20 md:py-28`}>
        <SectionHeader
          title="What your blueprint includes."
          description="The free builder doesn't end in a thank-you email. It ends in a working document your team can act on."
        />
        <dl className="mt-12 grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {blueprintIncludes.map((item) => (
            <div key={item.label} className="border-t border-line pt-4">
              <dt className="font-heading text-base font-semibold tracking-[-0.01em] text-ink-1">
                {item.label}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-ink-2">{item.example}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 10 — Pricing teaser */}
      <section className="border-t border-line bg-bg-1">
        <div className={`${container} py-20 md:py-28`}>
          <SectionHeader
            title="Prove the workflow free. Pay when it is ready to work."
            description="Everything up to a saved blueprint costs nothing. Plans start when an agent goes to work on a real channel."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
            {pricingPlans.slice(0, 2).map((plan) => (
              <div key={plan.name} className="bg-bg-0 p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-heading text-xl font-semibold tracking-[-0.015em] text-ink-1">
                    {plan.name}
                  </h3>
                  <div className="font-mono text-sm text-ink-2">
                    <span className="text-lg font-semibold text-ink-1">{plan.price}</span>{" "}
                    {plan.cadence}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink-2">{plan.bestFor}</p>
                <CTAButton
                  href={plan.href}
                  event={plan.href === "/free-agent-builder" ? "hero_cta_clicked" : "pricing_plan_clicked"}
                  tone={plan.featured ? "primary" : "secondary"}
                  icon="none"
                  className="mt-6"
                  payload={{ plan: plan.name, source: "homepage_teaser" }}
                >
                  {plan.cta}
                </CTAButton>
              </div>
            ))}
          </div>
          <Link
            href="/pricing"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-signal-cyan underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Compare all plans
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section className={`${container} max-w-4xl py-20 md:py-28`}>
        <SectionHeader title="The questions buyers actually ask." />
        <div className="mt-10">
          <FAQAccordion items={homepageFAQs} />
        </div>
      </section>

      {/* 12 — Final CTA */}
      <FinalCTA />
    </main>
  );
}
