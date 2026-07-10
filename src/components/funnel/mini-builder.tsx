"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { builderChannels, builderGoals, builderIndustries } from "@/data/funnel";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Condensed working builder: three decisions, a live blueprint line, and a
 * CTA that transfers the selections into /free-agent-builder via URL params.
 */

const miniIndustries = builderIndustries.slice(0, 6);
const miniGoals = builderGoals.slice(0, 4);
const miniChannels = builderChannels.slice(0, 3).map((channel) => channel.name);

export function MiniBuilder() {
  const [industry, setIndustry] = useState("");
  const [goal, setGoal] = useState("");
  const [channel, setChannel] = useState("");

  const href = useMemo(() => {
    const params = new URLSearchParams();
    if (industry) params.set("industry", industry);
    if (goal) params.set("goal", goal);
    if (channel) params.set("channel", channel);
    const query = params.toString();
    return query ? `/free-agent-builder?${query}` : "/free-agent-builder";
  }, [industry, goal, channel]);

  const picks = [industry, goal, channel].filter(Boolean).length;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-7">
        <MiniChoice
          legend="1. Industry"
          options={miniIndustries}
          value={industry}
          onChange={(value) => {
            setIndustry(value);
            trackEvent("industry_selected", { industry: value, surface: "homepage_mini_builder" });
          }}
        />
        <MiniChoice legend="2. Primary outcome" options={miniGoals} value={goal} onChange={setGoal} />
        <MiniChoice legend="3. Channel" options={miniChannels} value={channel} onChange={setChannel} />
      </div>

      <div className="flex flex-col justify-between gap-6 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        <div>
          <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Blueprint forming</div>
          <p className="mt-3 min-h-24 text-base leading-7 text-ink-1" aria-live="polite">
            {picks === 0 ? (
              <span className="text-ink-3">
                Make the three decisions and watch the agent take shape here.
              </span>
            ) : (
              <>
                A{industry ? <Highlight> {industry.toLowerCase()}</Highlight> : <Dim> …</Dim>} agent
                whose first job is to
                {goal ? <Highlight> {goal.toLowerCase()}</Highlight> : <Dim> …</Dim>}, running on
                {channel ? <Highlight> {channel.toLowerCase()}</Highlight> : <Dim> …</Dim>}.
              </>
            )}
          </p>
          <div className="mt-2 font-mono text-xs text-ink-3">
            {picks}/3 decisions · the full builder adds voice, context, knowledge, and guardrails
          </div>
        </div>
        <Link
          href={href}
          onClick={() =>
            trackEvent("agent_builder_started", {
              source: "homepage_mini_builder",
              preselected: picks,
            })
          }
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-bamboo px-5 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-bamboo/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Continue in the full builder
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-bamboo">{children}</strong>;
}

function Dim({ children }: { children: React.ReactNode }) {
  return <span className="text-ink-3">{children}</span>;
}

function MiniChoice({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-mono text-xs uppercase tracking-wide text-ink-3">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={cn(
                "h-11 rounded-md border px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-bamboo bg-bamboo/12 text-bamboo"
                  : "border-line-strong text-ink-2 hover:border-bamboo-deep hover:text-ink-1"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
