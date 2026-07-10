"use client";

import { useMemo, useState } from "react";

export function ROIEstimator() {
  const [inquiries, setInquiries] = useState(800);
  const [qualifiedRate, setQualifiedRate] = useState(12);
  const [opportunityValue, setOpportunityValue] = useState(180);
  const [afterHours, setAfterHours] = useState(35);

  const result = useMemo(() => {
    const newlyCaptured = Math.round(inquiries * (afterHours / 100) * 0.16);
    const hours = Math.round(newlyCaptured * 0.15);
    const influenced = Math.round(newlyCaptured * (qualifiedRate / 100) * opportunityValue);
    return { newlyCaptured, hours, influenced };
  }, [afterHours, inquiries, opportunityValue, qualifiedRate]);

  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="bg-surface-raised p-5 sm:p-7">
        <div className="grid gap-6">
          <RangeField label="Monthly inquiries" value={inquiries} min={100} max={5000} step={100} onChange={setInquiries} display={inquiries.toLocaleString()} />
          <RangeField label="Current qualified-lead rate" value={qualifiedRate} min={2} max={40} step={1} onChange={setQualifiedRate} display={`${qualifiedRate}%`} />
          <RangeField label="Average opportunity value" value={opportunityValue} min={50} max={2000} step={50} onChange={setOpportunityValue} display={`$${opportunityValue.toLocaleString()}`} />
          <RangeField label="Inquiries arriving after hours" value={afterHours} min={5} max={80} step={5} onChange={setAfterHours} display={`${afterHours}%`} />
        </div>
      </div>
      <div className="bg-bamboo/[0.07] p-5 sm:p-7">
        <p className="text-sm font-semibold text-bamboo">Illustrative monthly model</p>
        <dl className="mt-8 divide-y divide-white/10">
          <ResultRow value={result.newlyCaptured.toLocaleString()} label="additional conversations captured" />
          <ResultRow value={`${result.hours} hrs`} label="team time potentially returned" />
          <ResultRow value={`$${result.influenced.toLocaleString()}`} label="opportunity value influenced" />
        </dl>
        <p className="mt-7 text-xs leading-6 text-white/56">
          Illustrative estimate based on your inputs and a 16% after-hours capture assumption. Actual results vary.
        </p>
      </div>
    </div>
  );
}

function RangeField({ label, value, min, max, step, onChange, display }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void; display: string }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-white/74">{label}</span>
        <output className="font-mono text-bamboo">{display}</output>
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 h-11 w-full cursor-pointer accent-[var(--bamboo)]"
      />
    </label>
  );
}

function ResultRow({ value, label }: { value: string; label: string }) {
  return (
    <div className="py-5 first:pt-0 last:pb-0">
      <dt className="font-heading text-3xl font-semibold tracking-[-0.02em] text-white">{value}</dt>
      <dd className="mt-1 text-sm text-white/64">{label}</dd>
    </div>
  );
}
