"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { comparisonRows, pricingPlans } from "@/data/funnel";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/funnel/cta-button";

export function PricingSection() {
  const [activeName, setActiveName] = useState("Growth");
  const active = pricingPlans.find((plan) => plan.name === activeName) ?? pricingPlans[1];

  useEffect(() => { trackEvent("pricing_viewed", { plan_count: pricingPlans.length }); }, []);

  return (
    <div className="page-shell section-space">
      <div className="max-w-4xl">
        <div className="mb-5 flex items-center gap-3 text-sm font-medium text-bamboo"><span aria-hidden className="h-px w-8 bg-bamboo/60" />Launch plans</div>
        <h1 className="font-heading text-[clamp(3rem,6vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.03em] text-white">Start with the blueprint. Upgrade when the workflow is ready.</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Choose based on deployment depth: preview the idea, launch one focused agent, coordinate multiple workflows, or design a custom rollout.</p>
      </div>

      <div className="mt-12 grid overflow-hidden rounded-lg border border-white/12 bg-white/10 lg:grid-cols-[0.74fr_1.26fr]">
        <div className="bg-surface-raised p-3 sm:p-4">
          <div role="tablist" aria-label="Pricing plans" className="grid gap-1">
            {pricingPlans.map((plan) => (
              <button
                key={plan.name}
                type="button"
                role="tab"
                aria-selected={active.name === plan.name}
                onClick={() => setActiveName(plan.name)}
                className={cn("focus-ring grid min-h-16 grid-cols-[1fr_auto] items-center gap-4 rounded-md px-4 py-3 text-left transition", active.name === plan.name ? "bg-bamboo/10 text-white ring-1 ring-bamboo/35" : "text-white/68 hover:bg-white/[0.045] hover:text-white")}
              >
                <span><span className="block font-heading font-semibold">{plan.name}</span><span className="mt-1 block text-xs text-white/52">{plan.cadence}</span></span>
                <span className="flex items-center gap-2 font-heading text-lg font-semibold"><span>{plan.price}</span><ChevronRight aria-hidden className="size-4 text-bamboo" /></span>
              </button>
            ))}
          </div>
        </div>
        <div role="tabpanel" className="bg-[oklch(0.145_0.03_158)] p-5 sm:p-8">
          <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-bamboo">Best for {planFit(active.name)}</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-white">{active.name}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/66">{active.description}</p>
            </div>
            <div className="sm:text-right"><span className="font-heading text-4xl font-semibold text-white">{active.price}</span><span className="mt-1 block text-xs text-white/52">{active.cadence}</span></div>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {active.features.map((feature) => <li key={feature} className="flex gap-3 text-sm leading-6 text-white/72"><CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-bamboo" />{feature}</li>)}
          </ul>
          <div className="mt-8 max-w-xs">
            <CTAButton href={active.href} event="pricing_plan_clicked" payload={{ plan: active.name, billing: "listed" }} icon={active.name === "Free Builder" ? "sparkles" : "calendar"} className="w-full">{active.cta}</CTAButton>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-6"><h2 className="font-heading text-3xl font-semibold tracking-[-0.02em] text-white">Compare deployment depth</h2><p className="mt-2 text-sm leading-7 text-white/62">Feature availability, routing depth, and launch support by plan.</p></div>
        <div className="overflow-x-auto rounded-lg border border-white/12 bg-white/[0.03]">
          <Table>
            <TableHeader><TableRow className="border-white/10 hover:bg-transparent"><TableHead className="sticky left-0 min-w-56 bg-[oklch(0.13_0.03_158)] text-white/68">Feature</TableHead><TableHead className="text-white/68">Free</TableHead><TableHead className="text-white/68">Growth</TableHead><TableHead className="text-white/68">Scale</TableHead><TableHead className="text-white/68">Enterprise</TableHead></TableRow></TableHeader>
            <TableBody>{comparisonRows.map((row) => <TableRow key={row.feature} className="border-white/10 hover:bg-white/[0.03]"><TableCell className="sticky left-0 bg-[oklch(0.13_0.03_158)] font-medium text-white">{row.feature}</TableCell><TableCell className="text-white/66">{row.free}</TableCell><TableCell className="text-white/66">{row.growth}</TableCell><TableCell className="text-white/66">{row.scale}</TableCell><TableCell className="text-white/66">{row.enterprise}</TableCell></TableRow>)}</TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function planFit(name: string) {
  if (name === "Free Builder") return "testing the first workflow";
  if (name === "Growth") return "launching one customer-facing agent";
  if (name === "Scale") return "coordinating multiple agents and routes";
  return "complex teams, security, and custom deployment";
}
