import type { Metadata } from "next";
import { StrategyCallForm } from "@/components/funnel/forms";

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description:
    "A 25–30 minute working session: workflow review, launch requirements, and plan fit. No obligation.",
  openGraph: {
    title: "Book a Strategy Call | Bamboo AI",
    description:
      "A 25–30 minute working session: workflow review, launch requirements, and plan fit. No obligation.",
    url: "/book-demo",
  },
};

const outputs = [
  {
    title: "Workflow recommendation",
    detail: "Which single workflow should go live first, and why it beats the alternatives.",
  },
  {
    title: "Launch requirements",
    detail: "The knowledge sources, integrations, and routing rules your deployment actually needs.",
  },
  {
    title: "Plan fit",
    detail: "An honest read on which plan matches the workflow — including “not yet.”",
  },
];

export default function BookDemoPage() {
  return (
    <main id="main-content" className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h1 className="font-heading text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-1">
            Map the first agent worth launching.
          </h1>
          <p className="mt-4 text-base leading-7 text-ink-2">
            25–30 minutes, working session, no obligation. We review your workflow — and your
            blueprint, if you built one — and you leave with a clear next-step plan either way.
          </p>
          <dl className="mt-8 grid gap-0">
            {outputs.map((output, index) => (
              <div key={output.title} className="relative pb-6 pl-8 last:pb-0">
                <span
                  className="absolute left-0 top-0.5 flex size-5 items-center justify-center rounded-full border border-bamboo-deep font-mono text-[10px] text-bamboo"
                  aria-hidden
                >
                  {index + 1}
                </span>
                {index < outputs.length - 1 ? (
                  <span className="absolute left-[9.5px] top-6 h-[calc(100%-20px)] w-px bg-line" aria-hidden />
                ) : null}
                <dt className="font-heading text-base font-semibold tracking-[-0.01em] text-ink-1">
                  {output.title}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-ink-2">{output.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-lg border border-line bg-bg-1 p-5 md:p-7">
          <StrategyCallForm />
        </div>
      </div>
    </main>
  );
}
