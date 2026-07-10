import { AlertTriangle, ArrowRight, CheckCircle2, LockKeyhole, Route, ShieldCheck } from "lucide-react";
import { CTAButton } from "@/components/funnel/cta-button";
import { FAQAccordion } from "@/components/funnel/faq-accordion";
import { FinalCTA, SectionHeader } from "@/components/funnel/blocks";
import { SignalSystem } from "@/components/funnel/signal-system";
import type { Industry } from "@/data/funnel";

export function IndustryPageTemplate({ industry }: { industry: Industry }) {
  const builderHref = `/free-agent-builder?industry=${encodeURIComponent(industry.name)}&goal=${encodeURIComponent(goalForIndustry(industry.name))}&channel=Website%20chat`;
  const regulated = ["Medical", "Law Firms", "Insurance", "Cannabis"].includes(industry.name);
  const boundary = regulatoryBoundary(industry.name);

  return (
    <main id="main-content">
      <section className="page-shell section-space pb-16">
        <div className="max-w-5xl">
          <div className="mb-5 flex items-center gap-3 text-sm font-medium text-bamboo"><span aria-hidden className="h-px w-8 bg-bamboo/60" />Bamboo AI for {industry.name}</div>
          <h1 className="font-heading text-[clamp(3rem,6.6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white">{industry.headline}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">{industry.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><CTAButton href={builderHref} event="hero_cta_clicked" payload={{ industry: industry.slug }} icon="sparkles">Build My {industry.name} Agent</CTAButton><CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="calendar">Book a Strategy Call</CTAButton></div>
        </div>
        <div className="mt-12"><SignalSystem industry={industry.name} message={industry.pains[0]} outcome={industry.workflow[industry.workflow.length - 1]} /></div>
      </section>

      <section className="border-y border-white/10 bg-black/14">
        <div className="page-shell section-space grid gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:items-start">
          <SectionHeader align="left" title={`Where ${industry.name.toLowerCase()} demand loses momentum.`} description="The first useful agent should solve a visible operational gap, not automate for its own sake." />
          <div className="border-y border-white/12">
            {industry.pains.map((pain, index) => <div key={pain} className="flex items-center gap-4 border-b border-white/10 py-5 last:border-0"><span className="font-mono text-sm text-signal-coral">0{index + 1}</span><span className="text-base text-white/76">{pain}</span></div>)}
          </div>
        </div>
      </section>

      <section className="page-shell section-space">
        <SectionHeader align="left" title="One signal. Three controlled stages." description="The route changes by market, but the operating logic stays inspectable." />
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/10 md:grid-cols-3">
          {industry.workflow.map((item, index) => <div key={item} className="relative min-h-44 bg-surface-raised p-5"><span className="font-mono text-xs text-bamboo">STAGE 0{index + 1}</span><p className="mt-6 font-heading text-xl font-semibold leading-7 text-white">{item}</p>{index < industry.workflow.length - 1 ? <ArrowRight aria-hidden className="absolute bottom-5 right-5 size-4 text-white/30" /> : <CheckCircle2 aria-hidden className="absolute bottom-5 right-5 size-4 text-bamboo" />}</div>)}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/14">
        <div className="page-shell section-space grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <SectionHeader align="left" title="The agent knows where its job ends." description="Approved knowledge and explicit escalation keep customer help useful and accountable." />
          <div className="grid gap-4">
            <GuardrailRow icon={ShieldCheck} title="Approved scope" text={`Use the business's approved ${industry.useCases.join(", ").toLowerCase()} content and rules.`} />
            <GuardrailRow icon={LockKeyhole} title="Decision boundary" text={boundary} />
            <GuardrailRow icon={Route} title="Human escalation" text={`Route urgent, sensitive, low-confidence, or high-value requests with a readable ${industry.name.toLowerCase()} summary.`} />
            {regulated ? <div className="flex gap-3 rounded-md border border-signal-amber/24 bg-signal-amber/[0.07] p-4 text-sm leading-7 text-white/72"><AlertTriangle aria-hidden className="mt-1 size-4 shrink-0 text-signal-amber" />This workflow supports administrative guidance and intake. A qualified human remains responsible for professional advice and final decisions.</div> : null}
          </div>
        </div>
      </section>

      <section className="page-shell section-space grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <SectionHeader align="left" title={`Useful ${industry.name.toLowerCase()} starting points.`} description="Choose the narrowest high-value job, prove it, then expand." />
        <div className="grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/10 sm:grid-cols-2">
          {[...industry.useCases, ...industry.agentExamples].map((item, index) => <div key={item} className="min-h-20 bg-surface-raised p-5"><span className="font-mono text-xs text-white/34">{String(index + 1).padStart(2, "0")}</span><p className="mt-2 font-medium text-white/78">{item}</p></div>)}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/14"><div className="page-shell section-space max-w-4xl"><SectionHeader title={`${industry.name} agent questions`} description="What teams usually need to confirm before launch." /><div className="mt-9"><FAQAccordion items={industry.faqs} /></div></div></section>
      <FinalCTA title={`Build a focused ${industry.name.toLowerCase()} agent blueprint.`} description="Start with the workflow, inspect the guardrails, and decide what is worth launching." />
    </main>
  );
}

function GuardrailRow({ icon: Icon, title, text }: { icon: typeof ShieldCheck; title: string; text: string }) {
  return <div className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-white/10 pb-4"><div className="flex size-11 items-center justify-center rounded-md bg-white/[0.045] text-bamboo ring-1 ring-white/10"><Icon aria-hidden className="size-5" /></div><div><h3 className="font-heading font-semibold text-white">{title}</h3><p className="mt-1 text-sm leading-7 text-white/64">{text}</p></div></div>;
}

function regulatoryBoundary(industry: string) {
  if (industry === "Medical") return "Administrative assistance only. No diagnosis, treatment recommendation, or medical advice.";
  if (industry === "Law Firms") return "Intake and routing only. No legal advice or attorney-client relationship claim.";
  if (industry === "Insurance") return "Licensed staff handle advice, coverage interpretation, binding, and final claim decisions.";
  if (industry === "Cannabis") return "Age, jurisdiction, product, and compliance rules must be configured before launch.";
  return "The agent answers within approved scope and stops when confidence, sensitivity, or authority is insufficient.";
}

function goalForIndustry(industry: string) {
  if (["Customer Service", "Insurance"].includes(industry)) return "Answer customer questions";
  if (["Medical", "Restaurants"].includes(industry)) return "Book appointments";
  if (["Cannabis", "Ecommerce"].includes(industry)) return "Recommend products or services";
  if (industry === "Law Firms") return "Triage support requests";
  return "Capture and qualify leads";
}
