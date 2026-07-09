"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pricingPlans, comparisonRows } from "@/data/funnel";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/funnel/cta-button";

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  useEffect(() => {
    trackEvent("pricing_viewed", { plan_count: pricingPlans.length });
  }, []);

  const plans = useMemo(
    () =>
      pricingPlans.map((plan) => {
        if (!annual || plan.price === "$0" || plan.price === "Custom") {
          return plan;
        }
        const monthly = Number(plan.price.replace(/\D/g, ""));
        return {
          ...plan,
          price: `$${Math.round(monthly * 0.8)}`,
          cadence: "per month, billed annually",
        };
      }),
    [annual]
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge className="border-bamboo/25 bg-bamboo/10 text-bamboo hover:bg-bamboo/10">
            Pricing
          </Badge>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-normal text-white md:text-6xl">
            Start free. Upgrade when the agent proves demand.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/62">
            Sample packaging for the front-end funnel. Replace this data with official pricing when plans are finalized.
          </p>
        </div>
        <div className="inline-flex w-fit rounded-lg border border-white/10 bg-white/[0.045] p-1">
          {([
            ["Monthly", false],
            ["Annual", true],
          ] as const).map(([label, value]) => (
            <Button
              key={label}
              type="button"
              variant="ghost"
              className={cn(
                "h-9 rounded-md px-4 text-sm text-white/62 hover:bg-white/10 hover:text-white",
                annual === value && "bg-bamboo text-black hover:bg-bamboo hover:text-black"
              )}
              onClick={() => setAnnual(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "rounded-lg border-white/10 bg-white/[0.045] shadow-none",
              plan.featured && "border-bamboo/35 bg-bamboo/10 shadow-[0_0_54px_rgba(89,255,139,0.12)]"
            )}
          >
            <CardContent className="flex h-full flex-col p-5">
              {plan.featured ? (
                <Badge className="mb-4 w-fit border-bamboo/25 bg-bamboo text-black hover:bg-bamboo">
                  Recommended
                </Badge>
              ) : null}
              <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
              <p className="mt-3 min-h-16 text-sm leading-7 text-white/58">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-semibold text-white">{plan.price}</span>
                <span className="ml-2 text-sm text-white/42">{plan.cadence}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-6 text-white/68">
                    <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-bamboo" />
                    {feature}
                  </li>
                ))}
              </ul>
              <CTAButton
                href={plan.href}
                event="pricing_plan_clicked"
                payload={{ plan: plan.name, billing: annual ? "annual" : "monthly" }}
                icon={plan.name === "Free Builder" ? "sparkles" : "calendar"}
                tone={plan.featured ? "primary" : "secondary"}
                className="mt-7 w-full"
              >
                {plan.cta}
              </CTAButton>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-10 rounded-lg border-white/10 bg-white/[0.04] shadow-none">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 border-b border-white/10 p-5">
            <Sparkles aria-hidden className="size-5 text-bamboo" />
            <h2 className="text-lg font-semibold text-white">Feature comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="min-w-56 text-white/56">Feature</TableHead>
                  <TableHead className="text-white/56">Free</TableHead>
                  <TableHead className="text-white/56">Growth</TableHead>
                  <TableHead className="text-white/56">Scale</TableHead>
                  <TableHead className="text-white/56">Enterprise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonRows.map((row) => (
                  <TableRow key={row.feature} className="border-white/10 hover:bg-white/[0.03]">
                    <TableCell className="font-medium text-white">{row.feature}</TableCell>
                    <TableCell className="text-white/58">{row.free}</TableCell>
                    <TableCell className="text-white/58">{row.growth}</TableCell>
                    <TableCell className="text-white/58">{row.scale}</TableCell>
                    <TableCell className="text-white/58">{row.enterprise}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
