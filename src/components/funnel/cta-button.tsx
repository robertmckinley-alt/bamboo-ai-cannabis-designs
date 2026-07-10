"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  event: AnalyticsEvent;
  className?: string;
  tone?: "primary" | "secondary" | "ghost";
  icon?: "sparkles" | "calendar" | "arrow" | "none";
  payload?: Record<string, string | number | boolean | null | undefined>;
};

const iconMap = {
  sparkles: Sparkles,
  calendar: CalendarDays,
  arrow: ArrowRight,
  none: null,
};

export function CTAButton({
  href,
  children,
  event,
  className,
  tone = "primary",
  icon = "arrow",
  payload,
}: CTAButtonProps) {
  const Icon = iconMap[icon];

  return (
    <Button
      asChild
      variant={tone === "ghost" ? "ghost" : tone === "secondary" ? "outline" : "default"}
      className={cn(
        "h-12 rounded-md px-5 text-sm font-semibold transition-[background,border-color,color,transform] duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-bamboo focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        tone === "primary" &&
          "border-bamboo bg-bamboo text-background hover:bg-[oklch(0.9_0.2_141)]",
        tone === "secondary" &&
          "border-white/16 bg-surface-raised/70 text-white hover:border-bamboo/45 hover:bg-surface-strong hover:text-white",
        tone === "ghost" && "text-white hover:bg-white/10 hover:text-white",
        className
      )}
      onClick={() => trackEvent(event, payload)}
    >
      <Link href={href}>
        {Icon ? <Icon aria-hidden className="size-4" /> : null}
        <span>{children}</span>
      </Link>
    </Button>
  );
}
