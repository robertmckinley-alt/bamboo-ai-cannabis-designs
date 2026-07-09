import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  CheckCircle2,
  Clock3,
  DatabaseZap,
  LockKeyhole,
  MessagesSquare,
  PlugZap,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/funnel/cta-button";
import type { Industry } from "@/data/funnel";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <Badge className="mb-4 border-bamboo/25 bg-bamboo/10 text-bamboo hover:bg-bamboo/10">
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-normal text-white md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-base leading-8 text-white/64 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="rounded-lg border-white/10 bg-white/[0.045] shadow-none backdrop-blur">
      <CardContent className="p-5">
        <div className="mb-5 flex size-10 items-center justify-center rounded-md border border-bamboo/20 bg-bamboo/10 text-bamboo">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-white/58">{description}</p>
      </CardContent>
    </Card>
  );
}

export function StatsBar({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid rounded-lg border border-white/10 bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={stat.label} className="p-5">
          <div className="text-3xl font-semibold text-white">{stat.value}</div>
          <div className="mt-2 text-sm text-white/54">{stat.label}</div>
          {index < stats.length - 1 ? (
            <Separator className="mt-5 bg-white/10 lg:hidden" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function LogoCloud({ logos }: { logos: string[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 px-5 py-4">
      <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-white/38">
        Built for teams that need speed without chaos
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {logos.map((logo) => (
          <div
            key={logo}
            className="flex min-h-12 items-center justify-center rounded-md border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-white/58"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AgentTemplateCard({
  title,
  description,
  outcome,
}: {
  title: string;
  description: string;
  outcome: string;
}) {
  return (
    <Card className="rounded-lg border-white/10 bg-white/[0.045] shadow-none">
      <CardContent className="flex h-full flex-col p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-md bg-cyan-soft/12 text-cyan-soft">
            <Bot aria-hidden className="size-5" />
          </div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
        </div>
        <p className="mt-4 flex-1 text-sm leading-7 text-white/58">{description}</p>
        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-bamboo">
          <TrendingUp aria-hidden className="size-4" />
          {outcome}
        </div>
      </CardContent>
    </Card>
  );
}

export function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <Card className="rounded-lg border-white/10 bg-white/[0.045] shadow-none">
      <CardContent className="p-5">
        <p className="text-base leading-8 text-white/78">&quot;{quote}&quot;</p>
        <div className="mt-6">
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-white/45">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group block rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-bamboo/40 hover:bg-bamboo/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo/70"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-bamboo">{industry.eyebrow}</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{industry.name}</h3>
        </div>
        <ArrowRight
          aria-hidden
          className="mt-1 size-4 text-white/35 transition group-hover:translate-x-1 group-hover:text-bamboo"
        />
      </div>
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/56">{industry.description}</p>
    </Link>
  );
}

export function TrustBadges() {
  const badges = [
    { icon: <ShieldCheck className="size-4" />, label: "Approved knowledge controls" },
    { icon: <LockKeyhole className="size-4" />, label: "Human handoff rules" },
    { icon: <DatabaseZap className="size-4" />, label: "CRM-ready capture" },
    { icon: <BadgeCheck className="size-4" />, label: "No-code launch path" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/72"
        >
          <span className="text-bamboo">{badge.icon}</span>
          {badge.label}
        </div>
      ))}
    </div>
  );
}

export function SecuritySection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeader
          align="left"
          eyebrow="Security and trust"
          title="Guardrails before growth."
          description="Bamboo is designed around approved knowledge, clear escalation, and structured capture so automation helps your team without creating brand risk."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FeatureCard
            icon={<ShieldCheck aria-hidden className="size-5" />}
            title="Knowledge-bound responses"
            description="Agents can be trained from approved pages, FAQs, docs, and policy content instead of improvising."
          />
          <FeatureCard
            icon={<UsersRound aria-hidden className="size-5" />}
            title="Human handoff"
            description="Escalate high-value, sensitive, or low-confidence conversations with a clean summary."
          />
          <FeatureCard
            icon={<PlugZap aria-hidden className="size-5" />}
            title="Integration ready"
            description="The front end is ready for CRM, calendar, forms, and analytics providers when backend wiring is added."
          />
          <FeatureCard
            icon={<Clock3 aria-hidden className="size-5" />}
            title="Launch without delay"
            description="Start with a focused agent, measure demand, then expand into additional workflows."
          />
        </div>
      </div>
    </section>
  );
}

export function ROIBlock() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-6 rounded-lg border border-white/10 bg-white/[0.045] p-6 md:grid-cols-[1fr_0.8fr] md:p-8">
        <div>
          <Badge className="border-bamboo/25 bg-bamboo/10 text-bamboo hover:bg-bamboo/10">
            ROI model
          </Badge>
          <h2 className="mt-5 text-balance text-3xl font-semibold text-white md:text-5xl">
            Capture the demand you already paid to create.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/62">
            Traffic, ads, referrals, and content all leak value when visitors wait, wonder, or leave.
            Bamboo turns that attention into structured conversations your team can actually use.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            ["Missed lead", "$180", "average lost opportunity value"],
            ["Manual triage", "9 min", "saved on common questions"],
            ["After-hours lift", "24/7", "coverage without new headcount"],
          ].map(([label, value, detail]) => (
            <div key={label} className="rounded-md border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/45">{label}</div>
              <div className="mt-2 text-3xl font-semibold text-bamboo">{value}</div>
              <div className="mt-1 text-sm text-white/56">{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BeforeAfterBlock() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader
        eyebrow="Before and after"
        title="Replace passive forms with guided momentum."
        description="Bamboo gives every visitor a useful next step, even when your team is busy."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Card className="rounded-lg border-white/10 bg-white/[0.035] shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-white">
              <MessagesSquare aria-hidden className="size-5 text-white/42" />
              <h3 className="text-xl font-semibold">Before Bamboo</h3>
            </div>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/56">
              <li>Static pages ask visitors to figure out fit alone.</li>
              <li>Long forms collect too little context or get abandoned.</li>
              <li>Your team follows up later with the same first questions.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="rounded-lg border-bamboo/25 bg-bamboo/10 shadow-[0_0_40px_rgba(89,255,139,0.08)]">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-white">
              <Zap aria-hidden className="size-5 text-bamboo" />
              <h3 className="text-xl font-semibold">After Bamboo</h3>
            </div>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/68">
              <li>Agents answer, qualify, and guide visitors in real time.</li>
              <li>Every capture includes useful context and next-step intent.</li>
              <li>Your team starts with the summary instead of the blank page.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function FinalCTA({
  title = "Build your first Bamboo agent now.",
  description = "Start with a free agent draft, see the workflow, and decide what to launch next.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,rgba(89,255,139,0.14),rgba(62,220,255,0.08),rgba(255,255,255,0.035))] p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Badge className="border-white/15 bg-black/20 text-white hover:bg-black/20">
              Free builder
            </Badge>
            <h2 className="mt-5 text-balance text-3xl font-semibold text-white md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="sparkles">
              Build Your Free AI Agent
            </CTAButton>
            <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="calendar">
              Book a Demo
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-white/16 bg-white/[0.03] p-8 text-center">
      <Sparkles aria-hidden className="mx-auto size-8 text-bamboo" />
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-white/56">{description}</p>
    </div>
  );
}

export function SuccessState({
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="rounded-lg border border-bamboo/25 bg-bamboo/10 p-6">
      <div className="flex size-12 items-center justify-center rounded-lg bg-bamboo text-black">
        <CheckCircle2 aria-hidden className="size-6" />
      </div>
      <h1 className="mt-6 text-balance text-3xl font-semibold text-white md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-white/64">{description}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CTAButton href={ctaHref} event="book_demo_clicked" icon="calendar">
          {ctaLabel}
        </CTAButton>
        <CTAButton href="/free-agent-builder" event="secondary_cta_clicked" tone="secondary" icon="sparkles">
          Build Another Agent
        </CTAButton>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: <Sparkles aria-hidden className="size-5" />,
      title: "Describe the business",
      description: "Pick the industry, goal, channel, and agent voice in a guided builder.",
    },
    {
      icon: <Bot aria-hidden className="size-5" />,
      title: "Preview the agent",
      description: "See the greeting, qualification logic, next steps, and readiness score update live.",
    },
    {
      icon: <Rocket aria-hidden className="size-5" />,
      title: "Launch the next step",
      description: "Capture the lead, book an optimization call, and connect production systems.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeader
        eyebrow="How it works"
        title="From blank page to agent blueprint in minutes."
        description="The builder turns your business context into an editable agent preview your team can launch from."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <FeatureCard
            key={step.title}
            icon={
              <span className="flex items-center gap-2">
                <span className="font-mono text-xs">{index + 1}</span>
                {step.icon}
              </span>
            }
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
}
