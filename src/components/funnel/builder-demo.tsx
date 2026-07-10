"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, MessageSquareText, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const choices = {
  industry: ["Sales", "Customer service", "Real estate"],
  goal: ["Qualify leads", "Answer questions", "Book appointments"],
  channel: ["Website chat", "SMS", "Email"],
};

export function BuilderDemo() {
  const [industry, setIndustry] = useState("Sales");
  const [goal, setGoal] = useState("Qualify leads");
  const [channel, setChannel] = useState("Website chat");
  const href = useMemo(
    () => `/free-agent-builder?industry=${encodeURIComponent(industry)}&goal=${encodeURIComponent(goal)}&channel=${encodeURIComponent(channel)}`,
    [channel, goal, industry]
  );

  return (
    <div className="grid overflow-hidden rounded-lg border border-white/12 bg-surface-raised lg:grid-cols-[0.92fr_1.08fr]">
      <div className="p-5 sm:p-7">
        <div className="grid gap-6">
          <ChoiceGroup label="Industry" options={choices.industry} value={industry} onChange={setIndustry} />
          <ChoiceGroup label="Primary outcome" options={choices.goal} value={goal} onChange={setGoal} />
          <ChoiceGroup label="First channel" options={choices.channel} value={channel} onChange={setChannel} />
        </div>
        <Button asChild className="mt-7 h-12 w-full rounded-md bg-bamboo font-semibold text-background hover:bg-bamboo/90 sm:w-auto">
          <Link href={href}>
            Continue This Blueprint <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="border-t border-white/10 bg-black/20 p-5 sm:p-7 lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-white/54">Live blueprint</p>
            <h3 className="mt-1 font-heading text-xl font-semibold text-white">{industry} {goal.split(" ")[0]} Agent</h3>
          </div>
          <span className="rounded-full bg-signal-amber/12 px-2.5 py-1 font-mono text-xs text-signal-amber">68% ready</span>
        </div>
        <div className="mt-6 border-y border-white/10 py-5">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <MessageSquareText aria-hidden className="size-4 text-bamboo" /> Greeting
          </div>
          <p className="mt-3 text-sm leading-7 text-white/70">
            Hi, I’m your {industry.toLowerCase()} assistant. I can help you {goal.toLowerCase()} and connect you with the right next step.
          </p>
        </div>
        <dl className="mt-5 grid gap-3 text-sm">
          <PreviewRow label="Channel" value={channel} />
          <PreviewRow label="Capture" value="Fit, urgency, contact" />
          <PreviewRow label="Route" value="Human when high intent" icon />
        </dl>
      </div>
    </div>
  );
}

function ChoiceGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-white">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "focus-ring flex min-h-11 items-center gap-2 rounded-md border px-3.5 text-sm transition",
              value === option
                ? "border-bamboo/60 bg-bamboo/10 text-white"
                : "border-white/12 bg-white/[0.025] text-white/64 hover:border-white/24 hover:text-white"
            )}
          >
            {value === option ? <Check aria-hidden className="size-3.5 text-bamboo" /> : null}
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function PreviewRow({ label, value, icon = false }: { label: string; value: string; icon?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 last:border-0 last:pb-0">
      <dt className="text-white/54">{label}</dt>
      <dd className="flex items-center gap-2 text-right font-medium text-white/78">
        {icon ? <Route aria-hidden className="size-3.5 text-cyan-soft" /> : null}{value}
      </dd>
    </div>
  );
}
