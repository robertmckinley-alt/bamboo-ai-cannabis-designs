"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { Industry } from "@/data/funnel";

export function IndustrySelector({ industries }: { industries: Industry[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {industries.slice(0, 9).map((industry) => (
        <Link
          key={industry.slug}
          href={`/industries/${industry.slug}`}
          onClick={() => trackEvent("industry_selected", { industry: industry.slug })}
          className="group rounded-lg bg-background/42 p-5 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-bamboo/10 hover:ring-bamboo/38 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo/70"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-bamboo">{industry.eyebrow}</p>
              <h3 className="mt-2 font-heading text-lg font-semibold tracking-[-0.01em] text-white">{industry.name}</h3>
            </div>
            <ArrowRight
              aria-hidden
              className="size-4 text-white/35 transition group-hover:translate-x-1 group-hover:text-bamboo"
            />
          </div>
          <p className="mt-4 line-clamp-2 text-sm leading-7 text-white/64">{industry.headline}</p>
        </Link>
      ))}
    </div>
  );
}
