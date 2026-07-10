"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, CheckCircle2, Clock3, MessagesSquare, Route, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trackEvent } from "@/lib/analytics";

export function DemoPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (inView) {
      trackEvent("agent_preview_viewed", { surface: "homepage_demo_preview" });
    }
  }, [inView]);

  const motionInitial = shouldReduceMotion ? false : { opacity: 0, y: 16 };
  const motionTransition = (delay = 0) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { delay, duration: 0.48, ease: "easeOut" as const };

  return (
    <Card
      ref={ref}
      className="relative overflow-hidden rounded-lg border-white/10 bg-[oklch(0.13_0.026_156/0.92)] py-0 shadow-none"
    >
      <CardContent className="p-0">
        <div className="border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-md bg-bamboo text-black">
                <Bot aria-hidden className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Lead Concierge Blueprint</p>
                <p className="text-xs text-white/52">Website agent draft</p>
              </div>
            </div>
            <Badge className="border-bamboo/25 bg-bamboo/10 text-bamboo hover:bg-bamboo/10">
              Ready 86%
            </Badge>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1fr_0.84fr]">
          <div className="space-y-4 p-4 md:p-5">
            <motion.div
              initial={motionInitial}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTransition()}
              className="rounded-lg bg-white/[0.055] p-4 ring-1 ring-white/10"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Sparkles aria-hidden className="size-4 text-bamboo" />
                Smart greeting
              </div>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Hi, I am Bamboo. I can answer questions, qualify your project, and help you book the right next step.
              </p>
            </motion.div>
            <motion.div
              initial={motionInitial}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTransition(0.1)}
              className="ml-auto max-w-[88%] rounded-lg bg-cyan-soft/12 p-4 ring-1 ring-cyan-soft/20"
            >
              <p className="text-sm leading-7 text-white/78">
                We need an AI assistant for sales inquiries and booking demos.
              </p>
            </motion.div>
            <motion.div
              initial={motionInitial}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTransition(0.2)}
              className="rounded-lg bg-bamboo/12 p-4 ring-1 ring-bamboo/22"
            >
              <p className="text-sm leading-7 text-white/78">
                Great. I will ask three quick questions, score fit, and route qualified leads to a demo.
              </p>
            </motion.div>
          </div>
          <div className="border-t border-white/10 p-4 lg:border-l lg:border-t-0 md:p-5">
            <div className="grid gap-3">
              <PreviewMetric icon={<MessagesSquare className="size-4" />} label="Conversation path" value="Lead capture" />
              <PreviewMetric icon={<Clock3 className="size-4" />} label="Launch estimate" value="Under 5 minutes" />
              <PreviewMetric icon={<CheckCircle2 className="size-4" />} label="Next step" value="Book optimization call" />
            </div>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs text-white/56">
                <span>Agent readiness</span>
                <span>86%</span>
              </div>
              <Progress value={86} className="h-2 bg-white/10 [&>div]:bg-bamboo" />
            </div>
            <div className="mt-6 rounded-lg bg-background/48 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-xs font-medium text-white/52">
                <Route aria-hidden className="size-3.5 text-bamboo" />
                Draft summary
              </div>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Capture inbound demand, qualify company size and urgency, then route high-fit leads to the calendar.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PreviewMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-white/[0.045] p-3 ring-1 ring-white/10">
      <div className="flex size-8 items-center justify-center rounded-md bg-bamboo/12 text-bamboo">
        {icon}
      </div>
      <div>
        <p className="text-xs text-white/50">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}
