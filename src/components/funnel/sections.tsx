import { CTAButton } from "@/components/funnel/cta-button";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  description,
  align = "left",
  className,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <h2 className="font-heading text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink-1">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-ink-2 md:text-lg md:leading-[1.75]">{description}</p>
      ) : null}
    </div>
  );
}

export function FinalCTA() {
  return (
    <section className="border-t border-line bg-bg-1">
      <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <h2 className="font-heading text-[clamp(2.1rem,4vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink-1">
            Your first useful agent starts with one workflow.
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink-2">
            Build the blueprint now. Bring it to a strategy call only when you can see what is
            worth launching.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/free-agent-builder" event="hero_cta_clicked" icon="none" payload={{ source: "final_cta" }}>
              Build My Free Agent
            </CTAButton>
            <CTAButton href="/book-demo" event="book_demo_clicked" tone="secondary" icon="none" payload={{ source: "final_cta" }}>
              Book a Strategy Call
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
