"use client";

import { useId, useState } from "react";
import { estimatorAssumptions, type EstimatorInputs } from "@/data/funnel";
import { cn } from "@/lib/utils";

/**
 * Compact interactive value model. Outputs are clearly labeled estimates
 * computed only from the visitor's own inputs — no invented benchmarks.
 */

const HANDLING_MINUTES_SAVED = 6;

function formatNumber(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

function formatCurrency(value: number) {
  return `$${formatNumber(value)}`;
}

export function ROIEstimator({
  defaults,
  compact,
}: {
  defaults: EstimatorInputs;
  compact?: boolean;
}) {
  const [inputs, setInputs] = useState<EstimatorInputs>(defaults);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const baseId = useId();

  const afterHoursConversations = inputs.monthlyConversations * (inputs.afterHoursPct / 100);
  const hoursReturned = (inputs.monthlyConversations * HANDLING_MINUTES_SAVED) / 60;
  const valueInfluenced =
    afterHoursConversations * (inputs.qualifiedRatePct / 100) * inputs.opportunityValue;

  function update(field: keyof EstimatorInputs, raw: string) {
    const value = Number(raw);
    if (Number.isNaN(value)) return;
    setInputs((current) => ({ ...current, [field]: Math.max(0, value) }));
  }

  return (
    <div className={cn("grid gap-10", !compact && "lg:grid-cols-[1fr_1fr]")}>
      <div className="grid content-start gap-5">
        <EstimatorField
          id={`${baseId}-conversations`}
          label="Monthly website conversations or inquiries"
          value={inputs.monthlyConversations}
          onChange={(value) => update("monthlyConversations", value)}
        />
        <EstimatorField
          id={`${baseId}-qualified`}
          label="Current qualified-lead rate"
          suffix="%"
          max={100}
          value={inputs.qualifiedRatePct}
          onChange={(value) => update("qualifiedRatePct", value)}
        />
        <EstimatorField
          id={`${baseId}-value`}
          label="Average opportunity value"
          prefix="$"
          value={inputs.opportunityValue}
          onChange={(value) => update("opportunityValue", value)}
        />
        <EstimatorField
          id={`${baseId}-afterhours`}
          label="Share arriving after hours"
          suffix="%"
          max={100}
          value={inputs.afterHoursPct}
          onChange={(value) => update("afterHoursPct", value)}
        />
      </div>

      <div className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        <div className="font-mono text-xs uppercase tracking-wide text-ink-3">
          Illustrative monthly estimate
        </div>
        <dl className="mt-4 grid gap-5" aria-live="polite">
          <EstimateRow
            label="Additional conversations captured"
            value={formatNumber(afterHoursConversations)}
            detail="after-hours inquiries answered instead of aging out"
          />
          <EstimateRow
            label="Team hours potentially returned"
            value={`${formatNumber(hoursReturned)} hrs`}
            detail={`at ~${HANDLING_MINUTES_SAVED} min of handling saved per conversation`}
          />
          <EstimateRow
            label="Opportunity value influenced"
            value={formatCurrency(valueInfluenced)}
            detail="captured conversations × your qualified rate × your value"
            emphasis
          />
        </dl>
        <p className="mt-6 text-xs leading-5 text-ink-3">
          Illustrative estimate based on your inputs. Actual results vary.
        </p>
        <button
          type="button"
          className="mt-2 text-xs font-medium text-signal-cyan underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-expanded={showAssumptions}
          onClick={() => setShowAssumptions((current) => !current)}
        >
          {showAssumptions ? "Hide assumptions" : "Show assumptions"}
        </button>
        {showAssumptions ? (
          <ul className="mt-3 grid gap-2">
            {estimatorAssumptions.map((assumption) => (
              <li key={assumption} className="text-xs leading-5 text-ink-3">
                — {assumption}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function EstimatorField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  max,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  max?: number;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink-2">
        {label}
      </label>
      <div className="flex h-12 items-center rounded-md border border-line-strong bg-surface-1 px-3 transition-colors focus-within:border-bamboo-deep focus-within:ring-2 focus-within:ring-ring/40">
        {prefix ? <span className="pr-1 font-mono text-sm text-ink-3">{prefix}</span> : null}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={0}
          max={max}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent font-mono text-sm text-ink-1 outline-none"
        />
        {suffix ? <span className="pl-1 font-mono text-sm text-ink-3">{suffix}</span> : null}
      </div>
    </div>
  );
}

function EstimateRow({
  label,
  value,
  detail,
  emphasis,
}: {
  label: string;
  value: string;
  detail: string;
  emphasis?: boolean;
}) {
  return (
    <div className="border-b border-line pb-4 last:border-b-0">
      <dt className="text-sm text-ink-2">{label}</dt>
      <dd className="mt-1 flex flex-wrap items-baseline gap-x-3">
        <span
          className={cn(
            "font-heading text-2xl font-semibold tracking-[-0.02em]",
            emphasis ? "text-bamboo" : "text-ink-1"
          )}
        >
          {value}
        </span>
        <span className="text-xs text-ink-3">{detail}</span>
      </dd>
    </div>
  );
}
