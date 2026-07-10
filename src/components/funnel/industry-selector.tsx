"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { Industry } from "@/data/funnel";

export function IndustrySelector({ industries }: { industries: Industry[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/12 bg-white/8">
      {industries.map((industry, index) => (
        <Link
          key={industry.slug}
          href={`/industries/${industry.slug}`}
          onClick={() => trackEvent("industry_selected", { industry: industry.slug, surface: "homepage_matrix" })}
          className="focus-ring group grid min-h-16 grid-cols-[1fr_auto] items-center gap-4 bg-surface-raised px-4 py-3 transition hover:bg-surface-strong sm:grid-cols-[0.55fr_1fr_auto] sm:px-5"
          style={{ borderTop: index === 0 ? undefined : "1px solid oklch(0.97 0.01 145 / 0.1)" }}
        >
          <span className="font-heading font-semibold text-white">{industry.name}</span>
          <span className="hidden truncate text-sm text-white/60 sm:block">{industry.useCases.slice(0, 2).join(" · ")}</span>
          <ArrowUpRight aria-hidden className="size-4 text-white/38 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bamboo" />
        </Link>
      ))}
    </div>
  );
}
