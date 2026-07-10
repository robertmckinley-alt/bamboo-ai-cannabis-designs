import type { Metadata } from "next";
import { CalendarCheck, Share2, Sparkles, UsersRound } from "lucide-react";
import { SuccessState } from "@/components/funnel/blocks";
import { CTAButton } from "@/components/funnel/cta-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thanks for contacting Bamboo AI. Review the next steps and continue building your AI agent.",
  openGraph: {
    title: "Thank You | Bamboo AI",
    description: "Your Bamboo AI demo request was received.",
    url: "/thank-you",
  },
};

export default function ThankYouPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SuccessState
          title="You are on the list."
          description="Thanks for requesting a Bamboo AI demo. Your next step is to bring one workflow, one customer pain point, and any current intake or FAQ material."
          ctaHref="/free-agent-builder"
          ctaLabel="Build Free Agent"
        />
        <Card className="rounded-lg border-white/10 bg-white/[0.05] py-0 shadow-none">
          <CardContent className="p-5">
            <h2 className="font-heading text-xl font-semibold tracking-[-0.01em] text-white">What happens next</h2>
            <div className="mt-6 grid gap-4">
              <NextStep
                icon={<CalendarCheck className="size-5" />}
                title="Confirmation"
                text="Your request is saved locally in this front-end build. Connect a backend to send it to your calendar or CRM."
              />
              <NextStep
                icon={<Sparkles className="size-5" />}
                title="Agent preview"
                text="Create or revisit the free builder to give the call a concrete agent draft."
              />
              <NextStep
                icon={<UsersRound className="size-5" />}
                title="Optimization call"
                text="Map launch fit, buyer journey, approved knowledge, integrations, and upgrade timing."
              />
            </div>
            <div className="mt-6 rounded-lg border border-cyan-soft/20 bg-cyan-soft/10 p-5">
              <div className="flex items-center gap-3">
                <Share2 aria-hidden className="size-5 text-cyan-soft" />
                <h3 className="font-heading font-semibold tracking-[-0.01em] text-white">Share Bamboo</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Send the free builder to a teammate who owns sales, support, operations, or customer success.
              </p>
              <div className="mt-5">
                <CTAButton href="/free-agent-builder" event="secondary_cta_clicked" tone="secondary" icon="sparkles">
                  Open Builder
                </CTAButton>
              </div>
            </div>
          </CardContent>
        </Card>
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
    <div className="flex gap-4 rounded-md border border-white/10 bg-black/20 p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-bamboo/10 text-bamboo">
        {icon}
      </div>
      <div>
        <h3 className="font-heading font-semibold tracking-[-0.01em] text-white">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-white/64">{text}</p>
      </div>
    </div>
  );
}
