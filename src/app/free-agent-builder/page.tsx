import type { Metadata } from "next";
import { AgentBuilderWizard } from "@/components/funnel/agent-builder-wizard";

export const metadata: Metadata = {
  title: "Free AI Agent Builder",
  description: "Create a business-specific Bamboo AI agent blueprint in under five minutes.",
  openGraph: { title: "Free AI Agent Builder | Bamboo AI", description: "Choose the workflow, preview the agent, and save a launch-ready blueprint.", url: "/free-agent-builder" },
};

export default function FreeAgentBuilderPage() {
  return (
    <main id="main-content" className="page-shell section-space pt-12 md:pt-16">
      <div className="mb-10 max-w-4xl">
        <div className="mb-4 flex items-center gap-3 text-sm font-medium text-bamboo"><span aria-hidden className="h-px w-8 bg-bamboo/60" />Free agent builder</div>
        <h1 className="font-heading text-[clamp(2.75rem,5.5vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white">Turn one business workflow into an agent blueprint.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">Make eight focused decisions. Bamboo turns them into an objective, greeting, qualification plan, guardrails, handoff, and launch checklist.</p>
      </div>
      <AgentBuilderWizard />
    </main>
  );
}
