import { ArrowDown, CheckCircle2 } from "lucide-react";
import { CTAButton } from "@/components/funnel/cta-button";
import { SignalSystem } from "@/components/funnel/signal-system";

export function HeroSection() {
  return (
    <section className="page-shell flex min-h-[calc(88svh-4.25rem)] flex-col justify-center pb-12 pt-12 md:pb-16 md:pt-16">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-9">
          <div className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-bamboo">
            <span aria-hidden className="h-px w-8 bg-bamboo/70" />
            Free agent blueprint in under five minutes
          </div>
          <h1 className="font-heading text-[clamp(3rem,7.2vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.03em] text-white">
            Bamboo AI turns every visitor into a qualified next step.
          </h1>
        </div>
        <p className="max-w-xl text-base leading-8 text-white/72 sm:text-lg lg:col-span-3 lg:pb-2">
          Build a no-code agent that answers questions, qualifies intent, books the right action, and hands your team the context.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="sparkles">
          Build My Free Agent
        </CTAButton>
        <CTAButton href="/book-demo" event="secondary_cta_clicked" tone="secondary" icon="calendar">
          Book a Strategy Call
        </CTAButton>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/60 sm:ml-2">
          {["No code", "No credit card", "Human control"].map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5">
              <CheckCircle2 aria-hidden className="size-3.5 text-bamboo" /> {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 lg:mt-12">
        <SignalSystem />
      </div>
      <a href="#how-it-works" className="focus-ring mt-6 inline-flex w-fit items-center gap-2 rounded-sm text-sm text-white/58 transition hover:text-white">
        Follow the signal <ArrowDown aria-hidden className="size-4 text-bamboo" />
      </a>
    </section>
  );
}
