import { CheckCircle2, DatabaseZap, LockKeyhole, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { CTAButton } from "@/components/funnel/cta-button";
import { cn } from "@/lib/utils";

export function SectionHeader({ eyebrow, title, description, align = "center", className }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <div className={cn("mb-4 flex items-center gap-3 text-sm font-medium text-bamboo", align === "center" && "justify-center")}>
          <span aria-hidden className="h-px w-7 bg-bamboo/60" /> {eyebrow}
        </div>
      ) : null}
      <h2 className="section-title text-white">{title}</h2>
      {description ? <p className="mt-5 max-w-[68ch] text-base leading-8 text-white/68 sm:text-lg">{description}</p> : null}
    </div>
  );
}

export function TrustBadges() {
  const items = [
    [ShieldCheck, "Approved knowledge"],
    [LockKeyhole, "Guardrail controls"],
    [UsersRound, "Human handoff"],
    [DatabaseZap, "Structured capture"],
  ] as const;
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 border-y border-white/10 py-4">
      {items.map(([Icon, label]) => (
        <span key={label} className="inline-flex items-center gap-2 text-sm text-white/66">
          <Icon aria-hidden className="size-4 text-bamboo" /> {label}
        </span>
      ))}
    </div>
  );
}

export function FinalCTA({ title = "Your first useful agent starts with one workflow.", description = "Build the blueprint now. Bring it to a strategy call when you can see what is worth launching." }: { title?: string; description?: string }) {
  return (
    <section className="border-t border-white/10 bg-bamboo/[0.07]">
      <div className="page-shell section-space grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-4xl">
          <Sparkles aria-hidden className="mb-5 size-6 text-bamboo" />
          <h2 className="section-title text-white">{title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="sparkles">Build My Free Agent</CTAButton>
          <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="calendar">Book a Strategy Call</CTAButton>
        </div>
      </div>
    </section>
  );
}

export function SuccessState({ title, description, ctaHref, ctaLabel }: { title: string; description: string; ctaHref: string; ctaLabel: string }) {
  return (
    <div className="border-y border-bamboo/25 bg-bamboo/[0.07] py-7">
      <div className="flex size-11 items-center justify-center rounded-md bg-bamboo text-background">
        <CheckCircle2 aria-hidden className="size-5" />
      </div>
      <h1 className="mt-6 font-heading text-4xl font-semibold leading-tight tracking-[-0.025em] text-white md:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">{description}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CTAButton href={ctaHref} event="book_demo_clicked" icon="calendar">{ctaLabel}</CTAButton>
        <CTAButton href="/free-agent-builder" event="secondary_cta_clicked" tone="secondary" icon="sparkles">Edit Blueprint</CTAButton>
      </div>
    </div>
  );
}
