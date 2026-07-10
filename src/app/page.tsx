import { ArrowRight, CheckCircle2, CircleAlert, DatabaseZap, LockKeyhole, Route, ShieldCheck, UserRoundCheck } from "lucide-react";
import { BuilderDemo } from "@/components/funnel/builder-demo";
import { FinalCTA, SectionHeader } from "@/components/funnel/blocks";
import { CTAButton } from "@/components/funnel/cta-button";
import { FAQAccordion } from "@/components/funnel/faq-accordion";
import { HeroSection } from "@/components/funnel/hero-section";
import { IndustrySelector } from "@/components/funnel/industry-selector";
import { ROIEstimator } from "@/components/funnel/roi-estimator";
import { UseCaseExplorer } from "@/components/funnel/use-case-explorer";
import { homepageFAQs, industries } from "@/data/funnel";

const connections = ["Website chat", "CRM", "Calendar", "Email", "SMS", "Forms", "Knowledge bases", "Help desks"];

export default function Home() {
  return (
    <main id="main-content" className="overflow-hidden">
      <HeroSection />

      <section className="border-y border-white/10 bg-black/14">
        <div className="page-shell flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm font-medium text-white/74">Designed to connect with the systems already in your funnel.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {connections.map((connection) => <span key={connection} className="text-xs text-white/54">{connection}</span>)}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="page-shell section-space scroll-mt-24">
        <SectionHeader
          align="left"
          title="The lead usually disappears between interest and follow-up."
          description="Bamboo closes that gap while intent is still warm, then gives the receiving human a useful starting point."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/10 lg:grid-cols-[1fr_auto_1fr]">
          <div className="bg-surface-raised p-6 sm:p-8">
            <div className="flex items-center gap-3 text-white/72"><CircleAlert aria-hidden className="size-5 text-signal-coral" /><span className="font-semibold">Without Bamboo</span></div>
            <ul className="mt-7 space-y-5 text-sm leading-7 text-white/64">
              <li>Visitors wait or search for fit alone.</li>
              <li>Static forms miss urgency and business context.</li>
              <li>Your team repeats the same discovery later.</li>
            </ul>
          </div>
          <div className="hidden w-20 items-center justify-center bg-background lg:flex"><ArrowRight aria-hidden className="size-6 text-bamboo" /></div>
          <div className="bg-bamboo/[0.07] p-6 sm:p-8">
            <div className="flex items-center gap-3 text-white"><UserRoundCheck aria-hidden className="size-5 text-bamboo" /><span className="font-semibold">With Bamboo</span></div>
            <ul className="mt-7 space-y-5 text-sm leading-7 text-white/76">
              {["Answer the question now.", "Qualify fit, timing, and need.", "Route the next step with a clean summary."].map((item) => (
                <li key={item} className="flex gap-3"><CheckCircle2 aria-hidden className="mt-1 size-4 shrink-0 text-bamboo" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="use-cases" className="border-y border-white/10 bg-black/14 scroll-mt-24">
        <div className="page-shell section-space">
          <SectionHeader
            align="left"
            title="Give the first agent one job worth doing."
            description="Choose the outcome. Bamboo turns it into a visible trigger, action path, capture plan, and human handoff."
          />
          <div className="mt-10"><UseCaseExplorer /></div>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionHeader
            align="left"
            title="Build the blueprint before you book the call."
            description="Make three decisions and watch the agent take shape. Your selections carry into the full builder."
          />
          <ol className="grid gap-3 text-sm text-white/66 sm:grid-cols-3">
            {["Describe the workflow", "Review the blueprint", "Save and map the launch"].map((item, index) => (
              <li key={item} className="flex items-center gap-3 border-t border-white/12 pt-3"><span className="font-mono text-bamboo">{index + 1}</span>{item}</li>
            ))}
          </ol>
        </div>
        <div className="mt-10"><BuilderDemo /></div>
      </section>

      <section className="border-y border-white/10 bg-black/14">
        <div className="page-shell section-space">
          <SectionHeader
            align="left"
            title="Model the value with your numbers."
            description="Change the assumptions and see where faster response and after-hours coverage could influence demand."
          />
          <div className="mt-10"><ROIEstimator /></div>
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <SectionHeader
            align="left"
            title="Automation your team can inspect."
            description="Approved knowledge, explicit rules, confidence checks, and human escalation keep the system useful without giving up control."
          />
          <div className="relative grid gap-3">
            {[
              [DatabaseZap, "Approved knowledge", "Pages, FAQs, policies, and notes your team controls."],
              [LockKeyhole, "Agent rules", "What to answer, what to capture, and what to avoid."],
              [ShieldCheck, "Confidence check", "Sensitive or uncertain requests stop before improvisation."],
              [Route, "Human handoff", "The right person receives context and the next requested action."],
            ].map(([Icon, title, text], index) => (
              <div key={title as string} className="grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-white/10 py-4 first:pt-0 last:border-0">
                <div className="flex size-11 items-center justify-center rounded-md bg-white/[0.045] text-bamboo ring-1 ring-white/10"><Icon aria-hidden className="size-5" /></div>
                <div><h3 className="font-heading font-semibold text-white">{title as string}</h3><p className="mt-1 text-sm leading-6 text-white/62">{text as string}</p></div>
                <span className="font-mono text-xs text-white/32">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="border-y border-white/10 bg-black/14 scroll-mt-24">
        <div className="page-shell section-space grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              align="left"
              title="Start with the workflow your market already needs."
              description="Each industry path opens a specific example, guardrail model, and preselected builder flow."
            />
          </div>
          <IndustrySelector industries={industries} />
        </div>
      </section>

      <section className="page-shell section-space">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <SectionHeader
            align="left"
            title="The blueprint is the proof."
            description="Before a sales conversation, you can inspect the agent’s objective, greeting, capture fields, guardrails, handoff, and launch gaps."
          />
          <div className="border-y border-white/12 py-2">
            {["Primary objective", "Opening greeting", "Qualification questions", "Approved knowledge", "Guardrails and escalation", "Destination and launch checklist"].map((item, index) => (
              <div key={item} className="flex items-center justify-between gap-4 border-b border-white/8 py-4 last:border-0">
                <span className="text-sm text-white/72">{item}</span>
                <span className="flex items-center gap-2 font-mono text-xs text-bamboo"><CheckCircle2 aria-hidden className="size-3.5" /> INCLUDED {String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-bamboo/20 bg-bamboo/[0.06]">
        <div className="page-shell grid gap-7 py-12 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-white">Prove the workflow free. Pay when it is ready to work.</h2>
            <p className="mt-3 text-sm leading-7 text-white/66">Build the artifact first, then choose the launch depth that fits the demand.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/pricing" event="secondary_cta_clicked" icon="arrow">View Launch Plans</CTAButton>
            <CTAButton href="/free-agent-builder" event="hero_cta_clicked" tone="secondary" icon="sparkles">Build Free</CTAButton>
          </div>
        </div>
      </section>

      <section className="page-shell section-space max-w-4xl">
        <SectionHeader title="Questions before the first agent." description="Clear answers about the blueprint, launch path, guardrails, and human handoff." />
        <div className="mt-10"><FAQAccordion items={homepageFAQs} /></div>
      </section>

      <FinalCTA />
    </main>
  );
}
