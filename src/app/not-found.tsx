import Link from "next/link";
import { CTAButton } from "@/components/funnel/cta-button";
import { industries } from "@/data/funnel";

export default function NotFound() {
  return (
    <main id="main-content" className="mx-auto max-w-2xl px-5 py-20 md:py-28">
      <p className="font-mono text-xs uppercase tracking-wide text-signal-amber">404 — no route here</p>
      <h1 className="mt-3 font-heading text-[clamp(2.2rem,4.5vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.026em] text-ink-1">
        This page doesn&apos;t exist, but the funnel does.
      </h1>
      <p className="mt-4 text-base leading-7 text-ink-2">
        If you were looking for an industry playbook, these are all of them:
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {industries.map((industry) => (
          <li key={industry.slug}>
            <Link
              href={`/industries/${industry.slug}`}
              className="inline-flex h-10 items-center rounded-md border border-line-strong px-3.5 text-sm text-ink-2 transition-colors hover:border-bamboo-deep hover:text-ink-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {industry.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <CTAButton href="/" event="secondary_cta_clicked" icon="none" payload={{ source: "not_found" }}>
          Back to the homepage
        </CTAButton>
      </div>
    </main>
  );
}
