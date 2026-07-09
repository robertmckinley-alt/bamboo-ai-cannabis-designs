"use client";

import { useEffect, useState } from "react";
import { Bot, CheckCircle2, Globe2, Mail, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type SavedAgent = {
  agent?: {
    name?: string;
    greeting?: string;
    summary?: string;
  };
  readiness?: number;
  state?: {
    industry?: string;
    goal?: string;
    channel?: string;
    voice?: string;
    website?: string;
  };
  lead?: {
    name?: string;
    email?: string;
    company?: string;
  };
};

export function CreatedAgentSummary() {
  const [saved, setSaved] = useState<SavedAgent | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("bamboo-agent");
    if (!raw) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      try {
        setSaved(JSON.parse(raw));
      } catch {
        setSaved(null);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const readiness = saved?.readiness ?? 72;
  const name = saved?.agent?.name ?? "Bamboo Preview Agent";
  const greeting =
    saved?.agent?.greeting ??
    "Hi, I am your Bamboo AI assistant. I can answer questions, capture details, and help visitors take the next best step.";
  const summary =
    saved?.agent?.summary ??
    "A saved agent preview is ready for optimization, production setup, and integration planning.";

  return (
    <Card className="rounded-lg border-white/10 bg-white/[0.045] shadow-none">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-lg bg-bamboo text-black">
            <Bot aria-hidden className="size-6" />
          </div>
          <div>
            <p className="text-sm text-white/44">Agent preview</p>
            <h2 className="text-xl font-semibold text-white">{name}</h2>
          </div>
        </div>
        <div className="mt-6 rounded-lg border border-bamboo/20 bg-bamboo/10 p-4">
          <p className="text-sm leading-7 text-white/70">{greeting}</p>
        </div>
        <p className="mt-5 text-sm leading-7 text-white/58">{summary}</p>
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs text-white/48">
            <span>Readiness score</span>
            <span>{readiness}%</span>
          </div>
          <Progress value={readiness} className="h-2 bg-white/10 [&>div]:bg-bamboo" />
        </div>
        <div className="mt-5 flex gap-3 rounded-md border border-white/10 bg-black/20 p-3 text-sm text-white/62">
          <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-bamboo" />
          The next call should confirm knowledge sources, handoff rules, and production integrations.
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <SummaryRow
            icon={<UserRound aria-hidden className="size-4" />}
            label="Lead"
            value={saved?.lead?.name ?? "Demo lead"}
          />
          <SummaryRow
            icon={<Mail aria-hidden className="size-4" />}
            label="Email"
            value={saved?.lead?.email ?? "demo@example.com"}
          />
          <SummaryRow
            icon={<Bot aria-hidden className="size-4" />}
            label="Workflow"
            value={saved?.state?.goal ?? "Capture qualified conversations"}
          />
          <SummaryRow
            icon={<Globe2 aria-hidden className="size-4" />}
            label="Channel"
            value={saved?.state?.channel ?? "Website chat"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-bamboo/10 text-bamboo">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-white/40">{label}</p>
        <p className="truncate text-sm font-medium text-white/72">{value}</p>
      </div>
    </div>
  );
}
