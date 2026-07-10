"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CalendarCheck2, CornerDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The hero product scene: one visitor signal travels a vertical path —
 * message → grounded answer → qualification → route — and resolves into
 * a booked outcome. The path grows like a bamboo culm: segment by segment,
 * joint by joint. With reduced motion the completed state renders statically.
 */

const STAGE_HOLD_MS = [900, 1650, 2400, 1650];
const LOOP_PAUSE_MS = 4200;

type Stage = 0 | 1 | 2 | 3 | 4;

const qualifyFields = [
  ["Use case", "Inbound demos"],
  ["Team size", "12 people"],
  ["Urgency", "This quarter"],
  ["Destination", "Demo calendar"],
] as const;

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function LiveSystemScene({ className }: { className?: string }) {
  const [animatedStage, setAnimatedStage] = useState<Stage>(0);
  const reduced = useReducedMotion();
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    function runLoop() {
      if (cancelled) return;
      setAnimatedStage(0);
      let elapsed = 250;
      ([1, 2, 3, 4] as Stage[]).forEach((next, index) => {
        elapsed += STAGE_HOLD_MS[index];
        timers.current.push(window.setTimeout(() => setAnimatedStage(next), elapsed));
      });
      timers.current.push(window.setTimeout(runLoop, elapsed + LOOP_PAUSE_MS));
    }
    timers.current.push(window.setTimeout(runLoop, 0));

    const currentTimers = timers.current;
    return () => {
      cancelled = true;
      currentTimers.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, [reduced]);

  const stage: Stage = reduced ? 4 : animatedStage;

  return (
    <div
      className={cn("relative", className)}
      role="img"
      aria-label="Product demonstration: a visitor message is answered from approved knowledge, qualified for use case, team size, urgency and destination, then routed to the demo calendar with a CRM summary. Final state: qualified, demo ready."
    >
      <div className="grid grid-cols-[20px_1fr] gap-x-4 sm:grid-cols-[24px_1fr] sm:gap-x-5">
        <SceneStep
          index={0}
          stage={stage}
          reduced={reduced}
          nodeLabel="IN"
          title="Visitor"
          meta="live on your site"
        >
          <p className="rounded-md rounded-tl-sm bg-surface-2 px-3.5 py-2.5 text-sm leading-6 text-ink-1">
            We need an AI assistant for inbound demos. Does this work with our CRM?
          </p>
        </SceneStep>

        <SceneStep
          index={1}
          stage={stage}
          reduced={reduced}
          nodeLabel="A"
          title="Answer"
          meta="grounded in approved knowledge"
        >
          <p className="border-l-2 border-bamboo-deep pl-3.5 text-sm leading-6 text-ink-2">
            That&apos;s exactly the workflow Bamboo starts with. Which CRM do you run, and
            roughly how many inbound conversations land per month?
          </p>
        </SceneStep>

        <SceneStep
          index={2}
          stage={stage}
          reduced={reduced}
          nodeLabel="Q"
          title="Qualify"
          meta="your rules, not a form"
        >
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
            {qualifyFields.map(([label, value], i) => (
              <div
                key={label}
                className={cn(
                  "flex items-baseline justify-between gap-2 border-b border-line pb-1.5 transition-opacity duration-300",
                  stage >= 2 ? "opacity-100" : "opacity-30"
                )}
                style={stage === 2 && !reduced ? { transitionDelay: `${i * 260}ms` } : undefined}
              >
                <dt className="text-xs text-ink-3">{label}</dt>
                <dd className="font-mono text-xs text-ink-1">{value}</dd>
              </div>
            ))}
          </dl>
        </SceneStep>

        <SceneStep
          index={3}
          stage={stage}
          reduced={reduced}
          nodeLabel="R"
          title="Route"
          meta="decisive handoff"
          last
        >
          <div className="flex items-center gap-2 font-mono text-xs text-signal-cyan">
            <CornerDownRight aria-hidden className="size-3.5 shrink-0" />
            High intent → Demo calendar + CRM summary
          </div>
          <div
            className={cn(
              "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 transition-opacity duration-300",
              stage >= 4 ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-bamboo px-3 py-1 text-xs font-semibold text-primary-foreground">
              <CalendarCheck2 aria-hidden className="size-3.5" />
              Qualified. Demo ready.
            </span>
            <span className="font-mono text-xs text-ink-3">
              blueprint readiness <span className="text-bamboo">92%</span>
            </span>
          </div>
        </SceneStep>
      </div>
    </div>
  );
}

function SceneStep({
  index,
  stage,
  reduced,
  nodeLabel,
  title,
  meta,
  last,
  children,
}: {
  index: number;
  stage: number;
  reduced: boolean;
  nodeLabel: string;
  title: string;
  meta: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  const reached = stage >= index;
  const isActive = stage === index;

  return (
    <>
      {/* Rail column: joint node + growing segment */}
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded-full border font-mono text-[9px] font-semibold transition-colors duration-300 sm:size-6 sm:text-[10px]",
            reached
              ? "border-bamboo bg-bamboo text-primary-foreground"
              : "border-line-strong bg-bg-1 text-ink-3",
            isActive && !reduced && "animate-node-ping"
          )}
          aria-hidden
        >
          {nodeLabel}
        </span>
        {!last ? (
          <span className="relative my-1 w-px flex-1 bg-line" aria-hidden>
            <span
              className={cn(
                "absolute inset-x-0 top-0 origin-top bg-bamboo-deep transition-transform duration-700 ease-out",
                stage > index ? "h-full scale-y-100" : "h-full scale-y-0"
              )}
            />
          </span>
        ) : null}
      </div>

      {/* Stage content */}
      <div className={cn("pb-6 sm:pb-7", last && "pb-0 sm:pb-0")}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <h3
            className={cn(
              "font-heading text-sm font-semibold tracking-[-0.01em] transition-colors duration-300",
              reached ? "text-ink-1" : "text-ink-3"
            )}
          >
            {title}
          </h3>
          <span className="font-mono text-[11px] text-ink-3">{meta}</span>
        </div>
        <div
          className={cn(
            "mt-2 transition-all duration-300",
            reached ? "translate-y-0 opacity-100" : "translate-y-1 opacity-25"
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
