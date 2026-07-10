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
        "h-12 rounded-lg px-5 text-sm font-semibold transition-[background,border-color,color,transform] duration-200 hover:-translate-y-0.5 focus-visible:ring-bamboo/50",
        tone === "primary" &&
          "border-bamboo bg-bamboo text-black hover:bg-bamboo/90",
        tone === "secondary" &&
          "border-white/15 bg-white/[0.055] text-white hover:border-bamboo/45 hover:bg-bamboo/12 hover:text-white",
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
