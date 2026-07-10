import type { Metadata } from "next";
import { CreatedBlueprint } from "@/components/funnel/created-blueprint";

export const metadata: Metadata = {
  title: "Your Agent Blueprint",
  description:
    "Your Bamboo agent blueprint: objective, greeting, qualification, guardrails, readiness, and the next step toward launch.",
  openGraph: {
    title: "Your Agent Blueprint | Bamboo AI",
    description: "Review your saved agent blueprint and map the launch.",
    url: "/agent-created",
  },
};

export default function AgentCreatedPage() {
  return (
    <main id="main-content" className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <CreatedBlueprint />
    </main>
  );
}
