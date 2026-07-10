import { CornerDownRight, ShieldCheck } from "lucide-react";
import { CTAButton } from "@/components/funnel/cta-button";
import { FAQAccordion } from "@/components/funnel/faq-accordion";
import { ROIEstimator } from "@/components/funnel/roi-estimator";
import { SectionHeader } from "@/components/funnel/sections";
import { builderIndustries, type Industry } from "@/data/funnel";

const container = "mx-auto max-w-[1240px] px-5 md:px-8";

function builderHref(industry: Industry) {
  const match = builderIndustries.find(
    (name) => name.toLowerCase() === industry.name.toLowerCase()
  );
  return match
    ? `/free-agent-builder?industry=${encodeURIComponent(match)}`
    : "/free-agent-builder";
}

export function IndustryPageTemplate({ industry }: { industry: Industry }) {
  const href = builderHref(industry);

  return (
    <main id="main-content">
      {/* Hero */}
      <section className={`${container} pb-16 pt-14 md:pt-20`}>
        <p className="font-mono text-xs uppercase tracking-wide text-signal-cyan">{industry.eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-heading text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.028em] text-ink-1">
          {industry.headline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-2">{industry.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CTAButton href={href} event="hero_cta_clicked" icon="none" payload={{ source: "industry_hero", industry: industry.slug }}>
            Build My Free Agent
          </CTAButton>
          <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="none" payload={{ source: "industry_hero", industry: industry.slug }}>
            Book a Strategy Call
          </CTAButton>
        </div>
      </section>

      {/* Pains */}
      <section className="border-y border-line bg-bg-1">
        <div className={`${container} py-14 md:py-20`}>
          <h2 className="font-mono text-xs uppercase tracking-wide text-ink-3">
            What this actually costs today
          </h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {industry.pains.map((pain) => (
              <li key={pain} className="border-l-2 border-signal-amber pl-4 text-base leading-7 text-ink-1">
                {pain}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Live conversation + routed outcome */}
      <section className={`${container} py-16 md:py-24`}>
        <SectionHeader
          title="One conversation, start to routed finish."
          description={`How a ${industry.name.toLowerCase()} agent handles the inquiry your team sees every week.`}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div className="grid gap-5 rounded-lg border border-line bg-bg-1 p-5 md:p-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Visitor</div>
              <p className="mt-1.5 rounded-md rounded-tl-sm bg-surface-2 px-3.5 py-2.5 text-sm leading-6 text-ink-1">
                {industry.conversation.visitor}
              </p>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Agent</div>
              <p className="mt-1.5 border-l-2 border-bamboo-deep pl-3.5 text-sm leading-6 text-ink-1">
                {industry.conversation.agent}
              </p>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Qualified</div>
              <ul className="mt-2 flex flex-wrap gap-2">
                {industry.conversation.qualified.map((item) => (
                  <li key={item} className="rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2 border-t border-line pt-4 font-mono text-xs text-signal-cyan">
              <CornerDownRight aria-hidden className="size-3.5 shrink-0" />
              {industry.conversation.route}
            </div>
            <p className="font-heading text-lg font-semibold tracking-[-0.015em] text-bamboo">
              {industry.conversation.outcome}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wide text-ink-3">The three-stage workflow</h3>
            <ol className="mt-4 grid gap-0">
              {industry.workflow.map((stage, index) => (
                <li key={stage} className="relative pb-6 pl-8 last:pb-0">
                  <span className="absolute left-0 top-0.5 flex size-5 items-center justify-center rounded-full border border-bamboo-deep font-mono text-[10px] text-bamboo" aria-hidden>
                    {index + 1}
                  </span>
                  {index < industry.workflow.length - 1 ? (
                    <span className="absolute left-[9.5px] top-6 h-[calc(100%-20px)] w-px bg-line" aria-hidden />
                  ) : null}
                  <span className="text-sm leading-6 text-ink-2">{stage}</span>
                </li>
              ))}
            </ol>

            <h3 className="mt-8 font-mono text-xs uppercase tracking-wide text-ink-3">Agents teams start with</h3>
            <ul className="mt-3 grid gap-1.5">
              {industry.agentExamples.map((example) => (
                <li key={example} className="text-sm leading-6 text-ink-2">
                  — {example}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 font-mono text-xs uppercase tracking-wide text-ink-3">Common use cases</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {industry.useCases.map((useCase) => (
                <li key={useCase} className="rounded-full border border-line-strong px-3 py-1 text-xs text-ink-2">
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Guardrails / compliance */}
      {industry.compliance ? (
        <section className="border-y border-line bg-bg-1">
          <div className={`${container} py-14 md:py-20`}>
            <div className="flex items-start gap-3">
              <ShieldCheck aria-hidden className="mt-1 size-5 shrink-0 text-bamboo" />
              <div>
                <h2 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-1">
                  The boundaries are part of the deployment.
                </h2>
                <ul className="mt-5 grid max-w-2xl gap-3">
                  {industry.compliance.map((rule) => (
                    <li key={rule} className="border-l-2 border-bamboo-deep pl-4 text-sm leading-6 text-ink-2">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Editable estimate */}
      <section className={`${container} py-16 md:py-24`}>
        <SectionHeader
          title="Model the value with your numbers."
          description={`Defaults below are editable starting points for a ${industry.name.toLowerCase()} workflow — not benchmarks. Every output is an illustrative estimate.`}
        />
        <div className="mt-10">
          <ROIEstimator defaults={industry.estimatorDefaults} />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-bg-1">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold tracking-[-0.025em] text-ink-1">
            {industry.name} questions.
          </h2>
          <div className="mt-8">
            <FAQAccordion items={industry.faqs} />
          </div>
        </div>
      </section>

      {/* CTA with preselected industry */}
      <section className={`${container} py-16 md:py-24`}>
        <div className="max-w-2xl">
          <h2 className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-1">
            Build the {industry.name.toLowerCase()} blueprint now.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-2">
            The builder opens with {industry.name.toLowerCase()} preselected — five minutes to a
            blueprint you can put in front of your team.
          </p>
          <div className="mt-7">
            <CTAButton href={href} event="hero_cta_clicked" icon="none" payload={{ source: "industry_footer", industry: industry.slug }}>
              Build My Free Agent
            </CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
