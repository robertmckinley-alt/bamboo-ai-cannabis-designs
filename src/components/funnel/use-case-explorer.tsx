"use client";

import { useState } from "react";
import { CornerDownRight, Zap } from "lucide-react";
import { outcomes, type Outcome } from "@/data/funnel";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * One shared product canvas driven by a segmented control. Selecting an
 * outcome swaps the canvas content with a localized highlight — the panel
 * itself never reanimates.
 */
export function UseCaseExplorer() {
  const [selected, setSelected] = useState<Outcome>(outcomes[0]);

  return (
    <div>
      <div
        role="tablist"
        aria-label="First agent outcomes"
        className="flex flex-wrap gap-2"
      >
        {outcomes.map((outcome) => {
          const active = outcome.id === selected.id;
          return (
            <button
              key={outcome.id}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => {
                setSelected(outcome);
                trackEvent("secondary_cta_clicked", { cta: "use_case_tab", value: outcome.id });
              }}
              className={cn(
                "h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-bamboo bg-bamboo text-primary-foreground"
                  : "border-line-strong bg-transparent text-ink-2 hover:border-bamboo-deep hover:text-ink-1"
              )}
            >
              {outcome.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="mt-8 grid gap-x-12 gap-y-8 border-t border-line pt-8 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <div className="flex items-start gap-3">
            <Zap aria-hidden className="mt-1 size-4 shrink-0 text-signal-cyan" />
            <div>
              <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Trigger</div>
              <p key={`trigger-${selected.id}`} className="clip-reveal mt-1 text-base leading-7 text-ink-1">
                {selected.trigger}
              </p>
            </div>
          </div>

          <div className="mt-7">
            <div className="font-mono text-xs uppercase tracking-wide text-ink-3">What the agent does</div>
            <ol key={`actions-${selected.id}`} className="clip-reveal mt-3 grid gap-0">
              {selected.actions.map((action, index) => (
                <li key={action} className="relative pb-4 pl-7 last:pb-0">
                  <span
                    className="absolute left-0 top-0.5 flex size-4.5 items-center justify-center rounded-full border border-bamboo-deep font-mono text-[10px] text-bamboo"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  {index < selected.actions.length - 1 ? (
                    <span className="absolute left-[8.5px] top-6 h-[calc(100%-22px)] w-px bg-line" aria-hidden />
                  ) : null}
                  <span className="text-sm leading-6 text-ink-2">{action}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-7 flex items-start gap-2 border-l-2 border-signal-cyan pl-4">
            <CornerDownRight aria-hidden className="mt-1 size-3.5 shrink-0 text-signal-cyan" />
            <p key={`handoff-${selected.id}`} className="clip-reveal text-sm leading-6 text-ink-2">
              {selected.handoff}
            </p>
          </div>
        </div>

        <div className="lg:border-l lg:border-line lg:pl-12">
          <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Information captured</div>
          <ul key={`captured-${selected.id}`} className="clip-reveal mt-3 flex flex-wrap gap-2">
            {selected.captured.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-ink-2"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Business outcome</div>
            <p key={`result-${selected.id}`} className="clip-reveal mt-2 font-heading text-xl font-semibold tracking-[-0.015em] text-bamboo">
              {selected.result}
            </p>
          </div>

          <div className="mt-7">
            <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Common in</div>
            <p key={`industries-${selected.id}`} className="clip-reveal mt-2 text-sm leading-6 text-ink-2">
              {selected.industries.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
