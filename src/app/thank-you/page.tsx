import type { Metadata } from "next";
import { Check } from "lucide-react";
import { CTAButton } from "@/components/funnel/cta-button";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Your strategy call request was received. Here's what to prepare.",
  openGraph: {
    title: "Request Received | Bamboo AI",
    description: "Your strategy call request was received.",
    url: "/thank-you",
  },
};

const prepare = [
  "One workflow — the single conversation type you most want handled.",
  "Your current FAQ, intake form, or support material, in whatever shape it exists.",
  "The business outcome you'd use to judge success after 30 days.",
];

export default function ThankYouPage() {
  return (
    <main id="main-content" className="mx-auto max-w-2xl px-5 py-16 md:py-24">
      <p className="inline-flex items-center gap-2 rounded-full border border-bamboo-deep/50 bg-bamboo/8 px-3.5 py-1.5 font-mono text-xs text-bamboo">
        <Check aria-hidden className="size-3.5" />
        Request submitted
      </p>
      <h1 className="mt-5 font-heading text-[clamp(2.1rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-1">
        Your strategy call request is in.
      </h1>
      <p className="mt-4 text-base leading-7 text-ink-2">
        The Bamboo team will reply by email to set the exact time — nothing is on the calendar
        until you confirm it. The call runs 25–30 minutes and covers your workflow, launch
        requirements, and plan fit.
      </p>

      <div className="mt-10 border-t border-line pt-8">
        <h2 className="font-heading text-lg font-semibold tracking-[-0.015em] text-ink-1">
          Three things worth preparing
        </h2>
        <ul className="mt-4 grid gap-3">
          {prepare.map((item, index) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-ink-2">
              <span
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-bamboo-deep font-mono text-[10px] text-bamboo"
                aria-hidden
              >
                {index + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <CTAButton href="/agent-created" event="secondary_cta_clicked" tone="secondary" icon="none" payload={{ source: "thank_you" }}>
          Review My Blueprint
        </CTAButton>
        <CTAButton href="/free-agent-builder" event="hero_cta_clicked" tone="secondary" icon="none" payload={{ source: "thank_you" }}>
          Open the Free Builder
        </CTAButton>
      </div>
    </main>
  );
}
