"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { Industry } from "@/data/funnel";

export function IndustrySelector({ industries }: { industries: Industry[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {industries.slice(0, 9).map((industry) => (
        <Link
          key={industry.slug}
          href={`/industries/${industry.slug}`}
          onClick={() => trackEvent("industry_selected", { industry: industry.slug })}
          className="group rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-bamboo/40 hover:bg-bamboo/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo/70"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-bamboo">{industry.eyebrow}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{industry.name}</h3>
            </div>
            <ArrowRight
              aria-hidden
              className="size-4 text-white/35 transition group-hover:translate-x-1 group-hover:text-bamboo"
            />
          </div>
          <p className="mt-4 line-clamp-2 text-sm leading-7 text-white/58">{industry.headline}</p>
        </Link>
      ))}
    </div>
  );
}
