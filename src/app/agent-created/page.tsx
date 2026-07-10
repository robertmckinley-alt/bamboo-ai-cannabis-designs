import type { Metadata } from "next";
import { CreatedAgentSummary } from "@/components/funnel/created-agent-summary";

export const metadata: Metadata = {
  title: "Agent Blueprint",
  description: "Review, copy, download, and continue your saved Bamboo AI agent blueprint.",
  openGraph: { title: "Agent Blueprint | Bamboo AI", description: "Your Bamboo AI agent operating plan and launch checklist.", url: "/agent-created" },
};

export default function AgentCreatedPage() {
  return <main id="main-content" className="page-shell section-space pt-12 md:pt-16"><CreatedAgentSummary /></main>;
}
