import { AlertTriangle, Bot, CheckCircle2, ClipboardList, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CTAButton } from "@/components/funnel/cta-button";
import { FAQAccordion } from "@/components/funnel/faq-accordion";
import { FinalCTA, SectionHeader } from "@/components/funnel/blocks";
import type { Industry } from "@/data/funnel";

export function IndustryPageTemplate({ industry }: { industry: Industry }) {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div>
          <Badge className="border-bamboo/25 bg-bamboo/12 text-bamboo hover:bg-bamboo/12">
            {industry.eyebrow}
          </Badge>
          <h1 className="mt-5 font-heading text-balance text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
            {industry.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
            {industry.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="sparkles">
              Build Your Free AI Agent
            </CTAButton>
            <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="calendar">
              Book a Demo
            </CTAButton>
          </div>
        </div>
        <Card className="rounded-lg border-white/10 bg-white/[0.05] py-0 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-lg bg-bamboo text-black">
                <Bot aria-hidden className="size-6" />
              </div>
              <div>
                <p className="text-sm text-white/56">Example agent</p>
                <h2 className="font-heading text-xl font-semibold tracking-[-0.01em] text-white">{industry.agentExamples[0]}</h2>
              </div>
            </div>
            <div className="mt-6 rounded-lg border border-bamboo/20 bg-bamboo/10 p-5">
              <div className="font-heading text-4xl font-semibold tracking-[-0.02em] text-bamboo">{industry.roi.metric}</div>
              <p className="mt-2 font-medium text-white">{industry.roi.label}</p>
              <p className="mt-3 text-sm leading-7 text-white/68">{industry.roi.description}</p>
            </div>
            <div className="mt-5 grid gap-3">
              {industry.workflow.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-md border border-white/10 bg-black/20 p-3 text-sm text-white/70"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white/10 font-mono text-xs text-bamboo">
                    {index + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <InfoList
            icon={<AlertTriangle aria-hidden className="size-5" />}
            title="Pain points"
            items={industry.pains}
          />
          <InfoList
            icon={<CheckCircle2 aria-hidden className="size-5" />}
            title="Use cases"
            items={industry.useCases}
          />
          <InfoList
            icon={<ClipboardList aria-hidden className="size-5" />}
            title="Agent examples"
            items={industry.agentExamples}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            align="left"
            eyebrow="Workflow"
            title={`How Bamboo works for ${industry.name.toLowerCase()}.`}
            description="Use the same template across industries while swapping the conversation logic, routing, and proof points."
          />
          <Card className="rounded-lg border-white/10 bg-white/[0.05] py-0 shadow-none">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <Workflow aria-hidden className="size-5 text-bamboo" />
                <h2 className="font-heading text-lg font-semibold tracking-[-0.01em] text-white">Workflow example</h2>
              </div>
              <div className="mt-6 grid gap-4">
                {industry.workflow.map((item) => (
                  <div key={item} className="rounded-md border border-white/10 bg-black/20 p-4">
                    <p className="text-sm leading-7 text-white/68">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-cyan-soft/20 bg-cyan-soft/10 p-5">
                <p className="text-sm font-medium text-white">Testimonial placeholder</p>
                <p className="mt-3 text-sm leading-7 text-white/64">
                  &quot;{industry.testimonial}&quot;
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <SectionHeader
          eyebrow="FAQ"
          title={`${industry.name} questions`}
          description="The production site can keep expanding these from sales calls, support tickets, and customer objections."
        />
        <div className="mt-8">
          <FAQAccordion items={industry.faqs} />
        </div>
      </section>

      <FinalCTA
        title={`Build a ${industry.name.toLowerCase()} AI agent today.`}
        description="Start with the free builder, then book an optimization call to map integrations and launch rules."
      />
    </main>
  );
}

function InfoList({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <Card className="rounded-lg border-white/10 bg-white/[0.05] py-0 shadow-none">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-bamboo/10 text-bamboo">
            {icon}
          </div>
          <h2 className="font-heading text-lg font-semibold tracking-[-0.01em] text-white">{title}</h2>
        </div>
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-white/68">
              <CheckCircle2 aria-hidden className="mt-1 size-4 shrink-0 text-bamboo" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
