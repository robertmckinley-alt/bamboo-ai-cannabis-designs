"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries, outcomes, type OutcomeId } from "@/data/funnel";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Filterable industry matrix: eleven industries as compact rows with outcome
 * tags, filterable by outcome. Each row links to its industry route.
 */
export function IndustryExplorer() {
  const [filter, setFilter] = useState<OutcomeId | "all">("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? industries
        : industries.filter((industry) => industry.outcomes.includes(filter)),
    [filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter industries by outcome">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All industries
        </FilterChip>
        {outcomes.map((outcome) => (
          <FilterChip
            key={outcome.id}
            active={filter === outcome.id}
            onClick={() => setFilter(outcome.id)}
          >
            {outcome.label}
          </FilterChip>
        ))}
      </div>

      <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line">
        {visible.map((industry) => (
          <li key={industry.slug}>
            <Link
              href={`/industries/${industry.slug}`}
              onClick={() =>
                trackEvent("industry_selected", { industry: industry.slug, surface: "homepage_explorer" })
              }
              className="group grid items-baseline gap-x-6 gap-y-1 bg-bg-1 px-5 py-4 transition-colors duration-150 hover:bg-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[200px_1fr_auto] md:px-6"
            >
              <span className="font-heading text-base font-semibold tracking-[-0.01em] text-ink-1">
                {industry.name}
              </span>
              <span className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-ink-3">
                {industry.outcomes.map((outcomeId) => (
                  <span key={outcomeId}>{outcomes.find((o) => o.id === outcomeId)?.label}</span>
                ))}
              </span>
              <span className="hidden items-center gap-1 text-sm font-medium text-ink-3 transition-colors group-hover:text-bamboo sm:flex">
                Open
                <ArrowUpRight aria-hidden className="size-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {visible.length === 0 ? (
        <p className="mt-4 text-sm text-ink-3">No industry uses that outcome as a starting workflow yet.</p>
      ) : null}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "h-10 rounded-full border px-3.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-bamboo bg-bamboo/12 text-bamboo"
          : "border-line-strong text-ink-2 hover:border-bamboo-deep hover:text-ink-1"
      )}
    >
      {children}
    </button>
  );
}
