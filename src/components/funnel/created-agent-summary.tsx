"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bot, Check, Clipboard, Download, Edit3, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTAButton } from "@/components/funnel/cta-button";

type SavedAgent = {
  agent?: {
    name?: string; role?: string; objective?: string; greeting?: string; qualificationQuestions?: string[]; captureFields?: string[]; guardrails?: string[]; handoff?: string; destination?: string; launchChecklist?: string[];
  };
  readiness?: number;
  readinessBreakdown?: { label: string; score: number; step: number }[];
  state?: { industry?: string; goals?: string[]; channel?: string };
  lead?: { name?: string; email?: string; company?: string };
};

export function CreatedAgentSummary() {
  const [saved, setSaved] = useState<SavedAgent | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const raw = localStorage.getItem("bamboo-agent");
      if (!raw) { setSaved(null); return; }
      try { setSaved(JSON.parse(raw) as SavedAgent); } catch { setSaved(null); }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (saved === undefined) return <div className="min-h-[30rem] animate-pulse rounded-lg bg-white/[0.035] motion-reduce:animate-none" aria-label="Loading your saved blueprint" />;
  if (!saved?.agent?.name) {
    return <div className="border-y border-white/12 py-14 text-center"><Bot aria-hidden className="mx-auto size-10 text-bamboo" /><h1 className="mt-5 font-heading text-4xl font-semibold text-white">No saved blueprint yet.</h1><p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/66">Build the workflow first. Your agent objective, guardrails, handoff, and launch checklist will appear here.</p><Button asChild className="mt-7 h-12 rounded-md bg-bamboo font-semibold text-background hover:bg-bamboo/90"><Link href="/free-agent-builder">Build My Free Agent</Link></Button></div>;
  }

  const agent = saved.agent;
  const summary = [agent.name, agent.role, agent.objective, agent.greeting, `Handoff: ${agent.handoff}`, `Destination: ${agent.destination}`].filter(Boolean).join("\n\n");

  function downloadBlueprint() {
    const blob = new Blob([JSON.stringify(saved, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = "bamboo-agent-blueprint.json"; link.click(); URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="grid gap-8 border-b border-white/12 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div><div className="flex items-center gap-2 text-sm font-medium text-bamboo"><Check aria-hidden className="size-4" />Blueprint saved</div><h1 className="mt-5 font-heading text-4xl font-semibold leading-tight tracking-[-0.025em] text-white md:text-6xl">Your Bamboo agent blueprint is ready.</h1><p className="mt-5 max-w-2xl text-base leading-8 text-white/68">Inspect the operating plan, close the readiness gaps, or bring this artifact into a strategy call.</p></div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => { navigator.clipboard.writeText(summary); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }} className="h-11 border-white/14 bg-transparent text-white hover:bg-white/8 hover:text-white">{copied ? <Check aria-hidden className="size-4 text-bamboo" /> : <Clipboard aria-hidden className="size-4" />}{copied ? "Copied" : "Copy Summary"}</Button>
          <Button type="button" variant="outline" onClick={downloadBlueprint} className="h-11 border-white/14 bg-transparent text-white hover:bg-white/8 hover:text-white"><Download aria-hidden className="size-4" />Download</Button>
          <Button asChild variant="outline" className="h-11 border-white/14 bg-transparent text-white hover:bg-white/8 hover:text-white"><Link href="/free-agent-builder"><Edit3 aria-hidden className="size-4" />Edit</Link></Button>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-lg border border-white/12 bg-surface-raised p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs text-white/52">Agent blueprint</p><h2 className="mt-1 font-heading text-2xl font-semibold text-white">{agent.name}</h2><p className="mt-2 text-sm text-white/60">{agent.role}</p></div><span className="font-mono text-lg text-bamboo">{saved.readiness ?? 0}%</span></div>
          <div className="mt-6 border-y border-white/10 py-5"><p className="text-xs font-semibold text-white/52">OPENING GREETING</p><p className="mt-3 text-sm leading-7 text-white/72">{agent.greeting}</p></div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2"><SummaryList title="Qualification" items={agent.qualificationQuestions} /><SummaryList title="Guardrails" items={agent.guardrails} /><SummaryList title="Captured context" items={agent.captureFields} /><SummaryList title="Launch checklist" items={agent.launchChecklist} /></div>
          <div className="mt-6 flex gap-3 rounded-md border border-cyan-soft/20 bg-cyan-soft/[0.06] p-4 text-sm leading-7 text-white/70"><Route aria-hidden className="mt-1 size-4 shrink-0 text-cyan-soft" /><span><strong className="text-white">Handoff:</strong> {agent.handoff}<br /><strong className="text-white">Destination:</strong> {agent.destination}</span></div>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-semibold text-white">Readiness breakdown</h2>
          <div className="mt-5 border-y border-white/12">{(saved.readinessBreakdown ?? []).map((item) => <div key={item.label} className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/8 py-4 last:border-0"><div><p className="text-sm font-medium text-white/74">{item.label}</p><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-bamboo" style={{ width: `${item.score}%` }} /></div></div><span className="font-mono text-sm text-bamboo">{item.score}%</span></div>)}</div>
          <div className="mt-7 grid gap-3"><CTAButton href="/book-demo" event="book_demo_clicked" icon="calendar">Book an Optimization Call</CTAButton><CTAButton href="/pricing" event="pricing_plan_clicked" payload={{ plan: "from_blueprint" }} tone="secondary" icon="arrow">View Launch Plans</CTAButton></div>
        </div>
      </div>
    </div>
  );
}

function SummaryList({ title, items }: { title: string; items?: string[] }) {
  return <div><h3 className="text-sm font-semibold text-white">{title}</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-white/62">{(items ?? []).map((item) => <li key={item} className="flex gap-2"><Check aria-hidden className="mt-1 size-3.5 shrink-0 text-bamboo" />{item}</li>)}</ul></div>;
}
