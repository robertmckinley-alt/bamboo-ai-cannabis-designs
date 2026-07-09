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
import { ArrowRight, CheckCircle2, PlugZap, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CTAButton } from "@/components/funnel/cta-button";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeader
          eyebrow="Interactive preview"
          title="A builder that makes the agent feel real before the sales call."
          description="Visitors choose the workflow, see the agent take shape, and understand the value before anyone asks for a credit card."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<Sparkles aria-hidden className="size-5" />}
            title="Smart defaults"
            description="Industry and goal choices pre-fill sensible conversation logic so users never start from a blank screen."
          />
          <FeatureCard
            icon={<Workflow aria-hidden className="size-5" />}
            title="Live workflow"
            description="The preview updates as the builder captures channel, tone, business details, and knowledge sources."
          />
          <FeatureCard
            icon={<ArrowRight aria-hidden className="size-5" />}
            title="Clean conversion"
            description="The final step captures the lead, saves the agent object locally, and routes to optimization booking."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeader
          eyebrow="Industries"
          title="Built around real workflows, not generic chatbot copy."
          description="Each industry page uses a shared system with distinct pain points, agent examples, ROI framing, FAQs, and CTAs."
        />
        <div className="mt-10">
          <IndustrySelector industries={industries} />
        </div>
      </section>

      <HowItWorks />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeader
          eyebrow="Agent templates"
          title="Start with a proven agent pattern."
          description="Templates make the free builder feel fast while giving sales a clear path to paid implementation."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {agentTemplates.map((template) => (
            <AgentTemplateCard key={template.title} {...template} />
          ))}
        </div>
      </section>

      <BeforeAfterBlock />
      <ROIBlock />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeader
          eyebrow="Use cases"
          title="One funnel, many first agents."
          description="Bamboo can start narrow, prove value, and then expand into more channels and deeper workflows."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <div
              key={useCase}
              className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-white/66"
            >
              <CheckCircle2 aria-hidden className="mt-1 size-4 shrink-0 text-bamboo" />
              {useCase}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeader
          eyebrow="Testimonials"
          title="The product story sounds like momentum."
          description="Use these placeholders until live customer proof is ready."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            align="left"
            eyebrow="Integrations"
            title="Designed to connect when the backend is ready."
            description="The front end captures clean data and leaves clear surfaces for CRM, calendar, help desk, knowledge base, and analytics integrations."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {integrations.map((integration) => (
              <div
                key={integration}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm font-medium text-white/70"
              >
                <PlugZap aria-hidden className="size-4 text-cyan-soft" />
                {integration}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SecuritySection />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <Card className="rounded-lg border-bamboo/25 bg-bamboo/10 shadow-none">
          <CardContent className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-bamboo">
                <ShieldCheck aria-hidden className="size-4" />
                Pricing teaser
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                Build free, then choose the launch plan that fits demand.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">
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
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20">
        <SectionHeader
          eyebrow="FAQ"
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
