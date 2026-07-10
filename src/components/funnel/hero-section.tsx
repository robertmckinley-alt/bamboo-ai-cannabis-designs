import { ArrowDownRight, CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/funnel/cta-button";
import { DemoPreview } from "@/components/funnel/demo-preview";
import { LogoCloud, StatsBar, TrustBadges } from "@/components/funnel/blocks";
import { logos, stats } from "@/data/funnel";

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-14 md:pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
      <div>
        <Badge className="border-bamboo/25 bg-bamboo/12 text-bamboo hover:bg-bamboo/12">
          <Sparkles aria-hidden className="size-3.5" />
          Free AI Agent Builder
        </Badge>
        <h1 className="mt-6 font-heading text-balance text-[clamp(3.35rem,8.4vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.03em] text-white">
          Bamboo AI Agent Funnel.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/72">
          Turn a visitor into a working agent draft, a qualified lead, and a clean next step before your team opens a tab.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="sparkles">
            Build Your Free AI Agent
          </CTAButton>
          <CTAButton href="/book-demo" event="secondary_cta_clicked" tone="secondary" icon="calendar">
            Book a Demo
          </CTAButton>
        </div>
        <div className="mt-8 flex items-center gap-3 text-sm text-white/60">
          <ArrowDownRight aria-hidden className="size-4 text-bamboo" />
          No code required. Preview first. Upgrade when the workflow is worth launching.
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {["Ask better first questions", "Route qualified demand", "Keep approved guardrails"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-white/68">
              <CheckCircle2 aria-hidden className="size-4 shrink-0 text-bamboo" />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <DemoPreview />
        <StatsBar stats={stats} />
      </div>
      <div className="lg:col-span-2">
        <LogoCloud logos={logos} />
        <div className="mt-5">
          <TrustBadges />
        </div>
      </div>
    </section>
  );
}
