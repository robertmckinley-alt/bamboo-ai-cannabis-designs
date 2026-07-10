import type { Metadata } from "next";
import { Suspense } from "react";
import { AgentBuilderWizard } from "@/components/funnel/agent-builder-wizard";

export const metadata: Metadata = {
  title: "Free Agent Builder",
  description:
    "Describe the workflow, review the agent blueprint, save it and map the launch. Free, no code, no credit card.",
  openGraph: {
    title: "Free Agent Builder | Bamboo AI",
    description:
      "Describe the workflow, review the agent blueprint, save it and map the launch. Free, no code, no credit card.",
    url: "/free-agent-builder",
  },
};

export default function FreeAgentBuilderPage() {
  return (
    <main id="main-content" className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <Suspense
        fallback={
          <div aria-busy="true" className="grid gap-4">
            <div className="h-8 w-2/3 animate-pulse rounded-md bg-surface-1" />
            <div className="h-40 animate-pulse rounded-md bg-surface-1" />
          </div>
        }
      >
        <AgentBuilderWizard />
      </Suspense>
    </main>
  );
}
