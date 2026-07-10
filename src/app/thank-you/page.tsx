import type { Metadata } from "next";
import { BookOpenCheck, CheckCircle2, Route, Target } from "lucide-react";
import { CTAButton } from "@/components/funnel/cta-button";

export const metadata: Metadata = {
  title: "Strategy Request Saved",
  description: "Prepare one workflow, approved source material, and a measurable outcome for your Bamboo AI strategy call.",
  openGraph: { title: "Strategy Request Saved | Bamboo AI", description: "Your next Bamboo AI planning step is ready.", url: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <main id="main-content" className="page-shell section-space pt-12 md:pt-16">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="border-y border-bamboo/24 bg-bamboo/[0.06] py-8">
          <div className="flex size-11 items-center justify-center rounded-md bg-bamboo text-background"><CheckCircle2 aria-hidden className="size-5" /></div>
          <h1 className="mt-6 font-heading text-4xl font-semibold leading-tight tracking-[-0.025em] text-white md:text-6xl">Your strategy request is ready.</h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/68">Your details are saved on this browser. Connect the production calendar or CRM before launch to confirm and deliver meeting times automatically.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><CTAButton href="/free-agent-builder" event="secondary_cta_clicked" icon="sparkles">Build the Blueprint</CTAButton><CTAButton href="/" event="secondary_cta_clicked" tone="secondary" icon="arrow">Return Home</CTAButton></div>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-semibold text-white">Bring these three things</h2>
          <div className="mt-5 border-y border-white/12">
            <PrepItem icon={Target} title="One workflow" text="Choose the conversation that currently loses time, context, or demand." />
            <PrepItem icon={BookOpenCheck} title="Approved source material" text="Bring a website, FAQ, policy, intake form, or notes the agent may use." />
            <PrepItem icon={Route} title="Desired business outcome" text="Define what a qualified next step should look like and who receives it." />
          </div>
        </div>
      </div>
    </main>
  );
}

function PrepItem({ icon: Icon, title, text }: { icon: typeof Target; title: string; text: string }) {
  return <div className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-white/10 py-5 last:border-0"><div className="flex size-11 items-center justify-center rounded-md bg-white/[0.045] text-bamboo ring-1 ring-white/10"><Icon aria-hidden className="size-5" /></div><div><h3 className="font-heading font-semibold text-white">{title}</h3><p className="mt-1 text-sm leading-7 text-white/62">{text}</p></div></div>;
}
