"use client";

import { useEffect, useRef, useState } from "react";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * "Cost of the Gap": one wide before/after flow. A single event dot crosses
 * both states when the section scrolls into view, showing where the lead
 * dies today and where it lands with Bamboo.
 */

const beforeSteps = [
  "Visitor asks a real question",
  "Gets a form, no answer",
  "Waits… goes cold after hours",
  "Team repeats discovery — or never calls",
];

const withSteps = [
  "Visitor gets an answer immediately",
  "Intent is qualified against your rules",
  "The right next step is booked",
  "Your team receives a summary",
];

export function GapFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Reduced motion needs no branch: the observer still fires on scroll and
  // the global reduced-motion CSS collapses every transition to instant.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
      <FlowLane
        label="Today"
        labelClass="text-signal-amber"
        steps={beforeSteps}
        terminal="Lead disappears. Nobody logs why."
        terminalClass="text-signal-coral"
        inView={inView}
        stagger={0}
        dotClass="bg-signal-amber"
      />
      <FlowLane
        label="With Bamboo"
        labelClass="text-bamboo"
        steps={withSteps}
        terminal="Qualified next step, context attached."
        terminalClass="text-bamboo"
        inView={inView}
        stagger={600}
        dotClass="bg-bamboo"
      />
    </div>
  );
}

function FlowLane({
  label,
  labelClass,
  steps,
  terminal,
  terminalClass,
  inView,
  stagger,
  dotClass,
}: {
  label: string;
  labelClass: string;
  steps: string[];
  terminal: string;
  terminalClass: string;
  inView: boolean;
  stagger: number;
  dotClass: string;
}) {
  return (
    <div className="bg-bg-1 p-6 md:p-8">
      <div className={cn("font-mono text-xs font-semibold uppercase tracking-wide", labelClass)}>
        {label}
      </div>
      <ol className="mt-5 grid gap-0">
        {steps.map((step, index) => (
          <li key={step} className="relative pb-5 pl-6 last:pb-0">
            <span
              className={cn(
                "absolute left-0 top-1.5 size-2 rounded-full transition-all duration-500",
                inView ? cn("scale-100 opacity-100", dotClass) : "scale-0 opacity-0 bg-ink-3"
              )}
              style={{ transitionDelay: inView ? `${stagger + index * 350}ms` : undefined }}
              aria-hidden
            />
            {index < steps.length - 1 ? (
              <span className="absolute left-[3.5px] top-4 h-[calc(100%-14px)] w-px bg-line" aria-hidden />
            ) : null}
            <span
              className={cn(
                "block text-sm leading-6 text-ink-2 transition-opacity duration-500",
                inView ? "opacity-100" : "opacity-40"
              )}
              style={{ transitionDelay: inView ? `${stagger + index * 350}ms` : undefined }}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
      <div
        className={cn(
          "mt-6 flex items-center gap-2 border-t border-line pt-4 text-sm font-medium transition-opacity duration-500",
          terminalClass,
          inView ? "opacity-100" : "opacity-0"
        )}
        style={{ transitionDelay: inView ? `${stagger + steps.length * 350}ms` : undefined }}
      >
        <MoveRight aria-hidden className="size-4 shrink-0" />
        {terminal}
      </div>
    </div>
  );
}
