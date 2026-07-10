"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy, Download, PencilLine } from "lucide-react";
import { CTAButton } from "@/components/funnel/cta-button";
import { AGENT_STORAGE_KEY, type SavedAgent } from "@/lib/blueprint";
import { cn } from "@/lib/utils";

/**
 * The agent-created delivery surface. Reads the saved agent from local
 * persistence; renders an honest empty state when none exists — never
 * fake fallback data.
 */
export function CreatedBlueprint() {
  const [saved, setSaved] = useState<SavedAgent | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Async so the hydration-boundary load doesn't cascade renders.
    const task = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(AGENT_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as SavedAgent;
          if (parsed?.blueprint?.agentName) {
            setSaved(parsed);
          }
        }
      } catch {
        setSaved(null);
      }
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(task);
  }, []);

  if (!loaded) {
    return (
      <div aria-busy="true" className="grid gap-4">
        <div className="h-8 w-1/2 animate-pulse rounded-md bg-surface-1" />
        <div className="h-64 animate-pulse rounded-md bg-surface-1" />
      </div>
    );
  }

  if (!saved) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-[-0.025em] text-ink-1">
          No saved blueprint yet.
        </h1>
        <p className="mt-4 text-base leading-7 text-ink-2">
          This page shows your agent blueprint after you build and save one. It takes about five
          minutes and doesn&apos;t need a credit card.
        </p>
        <div className="mt-8 flex justify-center">
          <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="none" payload={{ source: "agent_created_empty" }}>
            Build My Free Agent
          </CTAButton>
        </div>
      </div>
    );
  }

  const { blueprint, readiness, lead } = saved;
  const topGaps = readiness.categories
    .filter((category) => category.missing.length > 0)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  async function copySummary() {
    const text = [
      `${blueprint.agentName} — ${blueprint.role}`,
      `Objective: ${blueprint.objective}`,
      `Greeting: ${blueprint.greeting}`,
      `Knowledge: ${blueprint.knowledgeSummary}`,
      `Qualification: ${blueprint.qualificationQuestions.join(" | ")}`,
      `Guardrails: ${blueprint.guardrails.join(" | ")}`,
      `Escalation: ${blueprint.escalation}`,
      `Destination: ${blueprint.destination}`,
      `Readiness: ${readiness.total}%`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; button state simply stays unchanged.
    }
  }

  function downloadBlueprint() {
    const blob = new Blob([JSON.stringify(saved, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${blueprint.agentName.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-blueprint.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-bamboo">Delivered</p>
        <h1 className="mt-2 font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-1">
          Your Bamboo agent blueprint is ready.
        </h1>
        <p className="mt-3 text-base leading-7 text-ink-2">
          Saved for {lead.name}
          {lead.company ? ` · ${lead.company}` : ""}. Everything below is yours to copy, download,
          or keep editing.
        </p>

        <div className="mt-8 grid gap-5 rounded-lg border border-line bg-bg-1 p-5 md:p-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Agent</div>
            <h2 className="mt-1 font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-1">
              {blueprint.agentName}
            </h2>
            <p className="mt-1 text-sm text-ink-2">{blueprint.role}</p>
          </div>
          <Field label="Primary objective" value={blueprint.objective} />
          <div>
            <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Greeting</div>
            <p className="mt-1.5 border-l-2 border-bamboo-deep pl-3 text-sm leading-6 text-ink-1">
              {blueprint.greeting}
            </p>
          </div>
          <Field label="Approved knowledge" value={blueprint.knowledgeSummary} />
          <ListField label="Qualification questions" items={blueprint.qualificationQuestions} />
          <Field label="Information captured" value={blueprint.captured.join(" · ")} />
          <ListField label="Guardrails" items={blueprint.guardrails} />
          <Field label="Escalation rule" value={blueprint.escalation} />
          <Field label="Destination" value={blueprint.destination} />
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <ActionButton onClick={copySummary}>
            {copied ? <Check aria-hidden className="size-4 text-bamboo" /> : <Copy aria-hidden className="size-4" />}
            {copied ? "Copied" : "Copy summary"}
          </ActionButton>
          <ActionButton onClick={downloadBlueprint}>
            <Download aria-hidden className="size-4" />
            Download blueprint
          </ActionButton>
          <Link
            href="/free-agent-builder"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-line-strong px-4 text-sm font-medium text-ink-2 transition-colors hover:border-bamboo-deep hover:text-ink-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <PencilLine aria-hidden className="size-4" />
            Edit blueprint
          </Link>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border border-line bg-bg-1 p-5">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-xs uppercase tracking-wide text-ink-3">Readiness</span>
            <span className="font-heading text-2xl font-semibold text-bamboo">{readiness.total}%</span>
          </div>
          <div className="mt-4 grid gap-3">
            {readiness.categories.map((category) => (
              <div key={category.id}>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-ink-2">{category.label}</span>
                  <span className="font-mono text-ink-3">{category.score}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      category.score >= 100 ? "bg-bamboo" : category.score >= 50 ? "bg-bamboo-deep" : "bg-signal-amber"
                    )}
                    style={{ width: `${Math.max(4, category.score)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {topGaps.length > 0 ? (
            <div className="mt-5 border-t border-line pt-4">
              <div className="font-mono text-xs uppercase tracking-wide text-signal-amber">
                Highest-priority gaps
              </div>
              <ul className="mt-2 grid gap-1.5">
                {topGaps.map((gap) => (
                  <li key={gap.id} className="text-xs leading-5 text-ink-2">
                    — {gap.missing[0]}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-6 grid gap-2.5">
            <CTAButton href="/book-demo" event="book_demo_clicked" icon="none" payload={{ source: "agent_created", blueprint: true }}>
              Book an Optimization Call
            </CTAButton>
            <CTAButton href="/pricing" event="pricing_plan_clicked" tone="secondary" icon="none" payload={{ source: "agent_created" }}>
              View Launch Plans
            </CTAButton>
          </div>
          <p className="mt-4 text-xs leading-5 text-ink-3">
            The call covers knowledge sources, integrations, routing, measurement, and the
            production launch — bring this blueprint.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-wide text-ink-3">{label}</div>
      <p className="mt-1.5 text-sm leading-6 text-ink-1">{value}</p>
    </div>
  );
}

function ListField({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-wide text-ink-3">{label}</div>
      <ul className="mt-1.5 grid gap-1">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-ink-2">
            — {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActionButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center gap-2 rounded-md border border-line-strong px-4 text-sm font-medium text-ink-2 transition-colors hover:border-bamboo-deep hover:text-ink-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </button>
  );
}
