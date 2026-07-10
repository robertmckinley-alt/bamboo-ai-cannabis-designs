import {
  AgentTemplateCard,
  BeforeAfterBlock,
  FeatureCard,
  FinalCTA,
  HowItWorks,
  ROIBlock,
  SectionHeader,
  SecuritySection,
  TestimonialCard,
} from "@/components/funnel/blocks";
import { CTAButton } from "@/components/funnel/cta-button";
import { FAQAccordion } from "@/components/funnel/faq-accordion";
import { HeroSection } from "@/components/funnel/hero-section";
import { IndustrySelector } from "@/components/funnel/industry-selector";
import {
  agentTemplates,
  homepageFAQs,
  industries,
  integrations,
  testimonials,
  useCases,
} from "@/data/funnel";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const builderPath = [
  ["Intake", "Visitor chooses industry, goal, channel, and tone."],
  ["Preview", "Bamboo turns the answers into a visible agent blueprint."],
  ["Handoff", "The captured lead includes context, readiness, and next action."],
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Builder preview"
              title="Let visitors shape the agent before sales gets involved."
              description="The free builder gives each visitor a concrete artifact: what the agent says, what it captures, and how it routes the next step."
            />
            <div className="mt-8 grid gap-3">
              {builderPath.map(([label, detail], index) => (
                <div
                  key={label}
                  className="grid grid-cols-[2.75rem_1fr] gap-4 rounded-lg bg-white/[0.04] p-4 ring-1 ring-white/10"
                >
                  <div className="flex size-11 items-center justify-center rounded-md bg-bamboo/12 font-heading text-lg font-semibold text-bamboo">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold tracking-[-0.01em] text-white">{label}</h3>
                    <p className="mt-1 text-sm leading-7 text-white/64">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FeatureCard
              icon={<Sparkles aria-hidden className="size-5" />}
              title="Smart intake"
              description="Industry and goal choices pre-fill useful logic so the agent draft starts with context."
            />
            <FeatureCard
              icon={<Workflow aria-hidden className="size-5" />}
              title="Live workflow"
              description="The preview updates around channel, tone, qualification, and knowledge-source decisions."
            />
            <FeatureCard
              icon={<ClipboardCheck aria-hidden className="size-5" />}
              title="Sales-ready summary"
              description="Every saved draft becomes a cleaner lead object for follow-up, routing, and launch planning."
            />
            <FeatureCard
              icon={<ArrowRight aria-hidden className="size-5" />}
              title="Clean conversion"
              description="Visitors can build for free, then move naturally into pricing or an optimization call."
            />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionHeader
              align="left"
              title="Pick the first workflow with real business shape."
              description="Bamboo works best when the first agent has a job: qualify a buyer, route a patient, answer a policy question, or capture a project brief."
            />
            <IndustrySelector industries={industries} />
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            align="left"
            title="Start from a pattern your team can recognize."
            description="Templates make the first draft feel immediate while keeping the paid implementation path specific."
            className="mx-0"
          />
          <CTAButton href="/free-agent-builder" event="secondary_cta_clicked" icon="sparkles">
            Try a Template
          </CTAButton>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {agentTemplates.map((template) => (
            <AgentTemplateCard key={template.title} {...template} />
          ))}
        </div>
      </section>

      <BeforeAfterBlock />
      <ROIBlock />

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <SectionHeader
            align="left"
            title="The funnel keeps the data useful after the click."
            description="A Bamboo draft is more than a chat transcript. It becomes structured intent your team can route, measure, and expand."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {useCases.map((useCase) => (
              <div
                key={useCase}
                className="flex gap-3 rounded-lg bg-white/[0.045] p-4 text-sm leading-7 text-white/68 ring-1 ring-white/10"
              >
                <CheckCircle2 aria-hidden className="mt-1 size-4 shrink-0 text-bamboo" />
                {useCase}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map((integration) => (
            <div
              key={integration}
              className="flex items-center gap-3 rounded-lg bg-background/42 p-4 text-sm font-medium text-white/70 ring-1 ring-white/10"
            >
              <PlugZap aria-hidden className="size-4 text-cyan-soft" />
              {integration}
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <SectionHeader
            align="left"
            title="The product story should sound like momentum."
            description="These placeholders keep the proof surface ready for real customers without letting the page go quiet."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <SecuritySection />

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid gap-8 rounded-lg bg-bamboo/10 p-6 ring-1 ring-bamboo/25 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-bamboo">
              <ShieldCheck aria-hidden className="size-4" />
              Pricing path
            </div>
            <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
              Build free, then choose the launch plan that fits demand.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">
              Give users the agent preview now and route qualified buyers toward Growth, Scale, or a custom sales call.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <CTAButton href="/pricing" event="secondary_cta_clicked" icon="arrow">
              View Pricing
            </CTAButton>
            <CTAButton href="/free-agent-builder" event="hero_cta_clicked" tone="secondary" icon="sparkles">
              Try Builder
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 md:py-24">
        <SectionHeader
          title="Questions before the first agent."
          description="Objection handling for the free builder, implementation path, and sales handoff."
        />
        <div className="mt-10">
          <FAQAccordion items={homepageFAQs} />
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}
