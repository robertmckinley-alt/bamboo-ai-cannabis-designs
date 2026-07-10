"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const flows = [
  {
    id: "qualify",
    label: "Qualify leads",
    trigger: "A visitor asks if the offer fits their team.",
    actions: ["Answer buying questions", "Collect fit and urgency", "Route high-intent demand"],
    capture: "Use case, team size, timing, contact",
    handoff: "High fit or ready this quarter",
    outcome: "A sales-ready conversation",
    industries: "Sales, real estate, automotive, construction",
  },
  {
    id: "support",
    label: "Answer support",
    trigger: "A customer needs help outside queue hours.",
    actions: ["Search approved knowledge", "Resolve common questions", "Summarize exceptions"],
    capture: "Issue, account context, urgency",
    handoff: "Low confidence, sensitive, or blocked",
    outcome: "Faster resolution with context",
    industries: "Customer service, ecommerce, insurance",
  },
  {
    id: "book",
    label: "Book appointments",
    trigger: "A visitor is ready to choose a time.",
    actions: ["Check service fit", "Gather intake details", "Offer the right calendar"],
    capture: "Service, availability, contact, notes",
    handoff: "Complex scheduling or urgent need",
    outcome: "A prepared appointment",
    industries: "Medical, restaurants, law firms",
  },
  {
    id: "recommend",
    label: "Recommend offers",
    trigger: "A buyer needs help choosing an option.",
    actions: ["Clarify preferences", "Compare approved options", "Guide the next action"],
    capture: "Need, budget, constraints, preference",
    handoff: "Custom quote or sensitive decision",
    outcome: "A confident product choice",
    industries: "Ecommerce, cannabis, automotive",
  },
] as const;

export function UseCaseExplorer() {
  const [activeId, setActiveId] = useState<(typeof flows)[number]["id"]>("qualify");
  const active = flows.find((flow) => flow.id === activeId) ?? flows[0];

  return (
    <div>
      <div role="tablist" aria-label="Agent use cases" className="flex gap-2 overflow-x-auto pb-3">
        {flows.map((flow) => (
          <button
            key={flow.id}
            type="button"
            role="tab"
            aria-selected={active.id === flow.id}
            aria-controls="use-case-panel"
            onClick={() => setActiveId(flow.id)}
            className={cn(
              "focus-ring min-h-11 shrink-0 rounded-md border px-4 text-sm font-semibold transition",
              active.id === flow.id
                ? "border-bamboo bg-bamboo text-background"
                : "border-white/12 bg-white/[0.035] text-white/70 hover:border-white/24 hover:text-white"
            )}
          >
            {flow.label}
          </button>
        ))}
      </div>

      <div id="use-case-panel" role="tabpanel" className="mt-5 border-y border-white/12 py-6 lg:py-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-medium text-cyan-soft">Trigger</p>
            <p className="mt-3 font-heading text-2xl font-semibold leading-8 text-white">{active.trigger}</p>
            <p className="mt-6 text-sm leading-7 text-white/64">Best fit: {active.industries}</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-md bg-white/10 sm:grid-cols-[1fr_1fr_1fr]">
            <FlowColumn title="Agent actions">
              {active.actions.map((action) => (
                <span key={action} className="flex gap-2 text-sm leading-6 text-white/74">
                  <CheckCircle2 aria-hidden className="mt-1 size-3.5 shrink-0 text-bamboo" /> {action}
                </span>
              ))}
            </FlowColumn>
            <FlowColumn title="Captured + handoff">
              <p className="text-sm leading-6 text-white/76">{active.capture}</p>
              <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-white/58">Route when: {active.handoff}</p>
            </FlowColumn>
            <FlowColumn title="Business outcome" accent>
              <ArrowRight aria-hidden className="size-5 text-bamboo" />
              <p className="mt-4 font-heading text-xl font-semibold leading-7 text-white">{active.outcome}</p>
            </FlowColumn>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowColumn({ title, accent = false, children }: { title: string; accent?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("min-h-48 bg-surface-raised p-5", accent && "bg-bamboo/[0.07]")}>
      <p className="mb-5 text-xs font-semibold text-white/54">{title}</p>
      {children}
    </div>
  );
}
