import { ArrowDownRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CTAButton } from "@/components/funnel/cta-button";
import { DemoPreview } from "@/components/funnel/demo-preview";
import { LogoCloud, StatsBar, TrustBadges } from "@/components/funnel/blocks";
import { logos, stats } from "@/data/funnel";

export function HeroSection() {
  return (
    <section className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl gap-10 px-5 pb-16 pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div>
        <Badge className="border-bamboo/25 bg-bamboo/10 text-bamboo hover:bg-bamboo/10">
          <Sparkles aria-hidden className="size-3.5" />
          Free AI Agent Builder
        </Badge>
        <h1 className="mt-6 text-balance text-5xl font-semibold tracking-normal text-white md:text-7xl">
          Build an AI agent for your business in minutes.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/66">
          Bamboo helps teams create AI agents that answer questions, capture leads, book appointments, and support customers without writing code.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="sparkles">
            Build Your Free AI Agent
          </CTAButton>
          <CTAButton href="/book-demo" event="secondary_cta_clicked" tone="secondary" icon="calendar">
            Book a Demo
          </CTAButton>
        </div>
        <div className="mt-8 flex items-center gap-3 text-sm text-white/48">
          <ArrowDownRight aria-hidden className="size-4 text-bamboo" />
          No code required. Launch fast. Upgrade when you are ready.
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
