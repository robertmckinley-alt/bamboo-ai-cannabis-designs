import type { Metadata } from "next";
import { CheckCircle2, Clock3, Route, ShieldCheck } from "lucide-react";
import { BookingForm } from "@/components/funnel/forms";
import { TrustBadges } from "@/components/funnel/blocks";

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description: "Map the first Bamboo AI agent worth launching, including workflow, guardrails, integrations, and plan fit.",
  openGraph: { title: "Book a Strategy Call | Bamboo AI", description: "Bring one workflow and leave with a clear AI agent launch path.", url: "/book-demo" },
};

export default function BookDemoPage() {
  return (
    <main id="main-content" className="page-shell section-space pt-12 md:pt-16">
      <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <div className="mb-5 flex items-center gap-3 text-sm font-medium text-bamboo"><span aria-hidden className="h-px w-8 bg-bamboo/60" />Bamboo AI strategy call</div>
          <h1 className="font-heading text-[clamp(3rem,5.8vw,5rem)] font-semibold leading-[0.96] tracking-[-0.03em] text-white">Map the first agent worth launching.</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/68">Bring one customer workflow. In 30 minutes, we’ll map what the agent should answer, capture, route, and hand to a person.</p>
          <div className="mt-8 border-y border-white/12">
            <CallOutcome icon={Route} title="Workflow recommendation" text="Choose the narrowest job with visible business value." />
            <CallOutcome icon={ShieldCheck} title="Launch requirements" text="Identify knowledge, guardrails, destinations, and measurement." />
            <CallOutcome icon={Clock3} title="Plan fit" text="Leave with a practical next step, whether or not you launch now." />
          </div>
          <div className="mt-7"><TrustBadges /></div>
        </div>
        <div>
          <BookingForm />
          <p className="mt-4 flex gap-2 text-xs leading-6 text-white/52"><CheckCircle2 aria-hidden className="mt-1 size-3.5 shrink-0 text-bamboo" />No obligation. Bring a website, FAQ, intake form, or current workflow if you have one.</p>
        </div>
      </div>
    </main>
  );
}

function CallOutcome({ icon: Icon, title, text }: { icon: typeof Route; title: string; text: string }) {
  return <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/10 py-5 last:border-0"><div className="flex size-10 items-center justify-center rounded-md bg-white/[0.045] text-bamboo ring-1 ring-white/10"><Icon aria-hidden className="size-4" /></div><div><h2 className="font-heading font-semibold text-white">{title}</h2><p className="mt-1 text-sm leading-6 text-white/62">{text}</p></div></div>;
}
