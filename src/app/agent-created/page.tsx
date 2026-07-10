import type { Metadata } from "next";
import { Gift, Rocket, Share2, TrendingUp } from "lucide-react";
import { CreatedAgentSummary } from "@/components/funnel/created-agent-summary";
import { SuccessState } from "@/components/funnel/blocks";
import { CTAButton } from "@/components/funnel/cta-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Agent Created",
  description:
    "Your Bamboo AI agent preview has been created. Book an optimization call to prepare launch and integrations.",
  openGraph: {
    title: "Agent Created | Bamboo AI",
    description: "Preview your Bamboo AI agent and choose the next launch step.",
    url: "/agent-created",
  },
};

export default function AgentCreatedPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SuccessState
          title="Your Bamboo agent draft is ready."
          description="You now have a saved AI agent preview. The highest-leverage next step is an optimization call to map integrations, launch rules, and paid rollout."
          ctaHref="/book-demo"
          ctaLabel="Book Optimization Call"
        />
        <CreatedAgentSummary />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <NextStep
          icon={<Rocket className="size-5" />}
          title="Launch plan"
          text="Review workflow, knowledge source, channel, and human handoff rules."
        />
        <NextStep
          icon={<TrendingUp className="size-5" />}
          title="Upgrade prompt"
          text="Move from preview to a paid plan when you are ready to embed, route, and measure the agent."
        />
        <NextStep
          icon={<Share2 className="size-5" />}
          title="Share/referral"
          text="Send the builder to a teammate so they can draft agents for other departments."
        />
      </div>
      <div className="mt-8 rounded-lg border border-bamboo/25 bg-bamboo/10 p-6">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-bamboo text-black">
              <Gift aria-hidden className="size-5" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold tracking-[-0.01em] text-white">Ready to make it production-grade?</h2>
              <p className="mt-2 text-sm leading-7 text-white/68">
                Upgrade planning covers embed placement, analytics, CRM capture, calendar routing, and approved knowledge.
              </p>
            </div>
          </div>
          <CTAButton href="/pricing" event="pricing_plan_clicked" payload={{ plan: "upgrade_prompt" }} icon="arrow">
            View Plans
          </CTAButton>
        </div>
      </div>
    </main>
  );
}

function NextStep({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Card className="rounded-lg border-white/10 bg-white/[0.05] py-0 shadow-none">
      <CardContent className="p-5">
        <div className="flex size-10 items-center justify-center rounded-md bg-bamboo/10 text-bamboo">
          {icon}
        </div>
        <h2 className="mt-4 font-heading font-semibold tracking-[-0.01em] text-white">{title}</h2>
        <p className="mt-2 text-sm leading-7 text-white/64">{text}</p>
      </CardContent>
    </Card>
  );
}
