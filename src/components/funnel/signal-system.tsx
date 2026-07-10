import {
  BookOpenCheck,
  CalendarCheck2,
  Check,
  CircleUserRound,
  ListChecks,
  MessageSquareText,
  Route,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SignalSystemProps = {
  compact?: boolean;
  industry?: string;
  message?: string;
  outcome?: string;
};

const stages = [
  { label: "Answer", detail: "Approved knowledge", icon: BookOpenCheck, tone: "bamboo" },
  { label: "Qualify", detail: "Fit, urgency, use case", icon: ListChecks, tone: "amber" },
  { label: "Route", detail: "Calendar + CRM summary", icon: Route, tone: "cyan" },
] as const;

export function SignalSystem({
  compact = false,
  industry = "Sales",
  message = "We need an AI assistant for inbound demos.",
  outcome = "Qualified. Demo ready.",
}: SignalSystemProps) {
  return (
    <div
      role="img"
      aria-label={`A ${industry} visitor asks for help. Bamboo answers from approved knowledge, qualifies the request, and routes a qualified outcome to the calendar and CRM.`}
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/12 bg-[oklch(0.135_0.03_158/0.96)]",
        compact ? "p-4" : "p-4 sm:p-6 lg:p-7"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-bamboo opacity-40 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2.5 rounded-full bg-bamboo" />
          </span>
          <span className="text-sm font-semibold text-white">Live conversion system</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-white/62">
          <span className="text-cyan-soft">{industry}</span>
          <span aria-hidden className="text-white/24">/</span>
          human control on
        </div>
      </div>

      <div className={cn("grid items-stretch", compact ? "mt-4 gap-4" : "mt-5 gap-5 lg:grid-cols-[0.95fr_1.1fr_0.95fr]")}>
        <div className="flex min-h-48 flex-col justify-between bg-black/18 p-4 ring-1 ring-white/10">
          <div className="flex items-center gap-2 text-xs font-medium text-white/62">
            <CircleUserRound aria-hidden className="size-4 text-cyan-soft" />
            Visitor input
          </div>
          <p className="my-7 max-w-sm font-heading text-xl font-semibold leading-7 text-white sm:text-2xl">
            “{message}”
          </p>
          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs text-white/58">
            <span>Website chat</span>
            <span className="font-mono text-cyan-soft">signal received</span>
          </div>
        </div>

        <div className="relative flex flex-col justify-center py-1">
          <div aria-hidden className="absolute bottom-[12%] left-[1.15rem] top-[12%] w-px bg-white/12">
            <span className="signal-travel absolute left-[-2px] top-0 h-8 w-[5px] bg-[linear-gradient(to_bottom,transparent,var(--bamboo),transparent)]" />
          </div>
          <div className="space-y-3">
            {stages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div key={stage.label} className="relative flex items-center gap-4 bg-white/[0.035] px-3 py-3 ring-1 ring-white/10">
                  <div
                    className={cn(
                      "z-10 flex size-9 shrink-0 items-center justify-center rounded-md border bg-background",
                      stage.tone === "bamboo" && "border-bamboo/40 text-bamboo",
                      stage.tone === "amber" && "border-signal-amber/40 text-signal-amber",
                      stage.tone === "cyan" && "border-cyan-soft/40 text-cyan-soft"
                    )}
                  >
                    <Icon aria-hidden className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{stage.label}</p>
                    <p className="mt-0.5 truncate text-xs text-white/60">{stage.detail}</p>
                  </div>
                  <Check aria-hidden className="ml-auto size-4 text-bamboo" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="signal-resolve flex min-h-48 flex-col justify-between border border-bamboo/28 bg-bamboo/[0.07] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-white/64">
              <CalendarCheck2 aria-hidden className="size-4 text-bamboo" />
              Qualified outcome
            </div>
            <span className="rounded-full bg-bamboo/12 px-2.5 py-1 font-mono text-[11px] text-bamboo">READY</span>
          </div>
          <div className="my-6">
            <p className="font-heading text-2xl font-semibold text-white">{outcome}</p>
            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              <SignalField label="Use case" value="Inbound demos" />
              <SignalField label="Team size" value="10-50" />
              <SignalField label="Urgency" value="This month" />
              <SignalField label="Destination" value="Sales calendar" />
            </dl>
          </div>
          <div className="flex items-center gap-2 border-t border-bamboo/18 pt-3 text-xs text-white/64">
            <MessageSquareText aria-hidden className="size-3.5 text-bamboo" />
            CRM summary attached
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-white/52">{label}</dt>
      <dd className="mt-1 font-medium text-white/82">{value}</dd>
    </div>
  );
}
