import type { Metadata } from "next";
import { AgentBuilderWizard } from "@/components/funnel/agent-builder-wizard";
import { SectionHeader } from "@/components/funnel/blocks";

export const metadata: Metadata = {
  title: "Free AI Agent Builder",
  description:
    "Create a free Bamboo AI agent preview with industry, goal, channel, voice, business context, and lead capture.",
  openGraph: {
    title: "Free AI Agent Builder | Bamboo AI",
    description: "Create an AI agent for your business in under five minutes.",
    url: "/free-agent-builder",
  },
};

export default function FreeAgentBuilderPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeader
        eyebrow="Free builder"
        title="Create your first Bamboo agent in under five minutes."
        description="Choose the workflow, add business context, preview the agent, and save the draft for optimization."
      />
      <div className="mt-10">
        <AgentBuilderWizard />
      </div>
    </main>
  );
}
