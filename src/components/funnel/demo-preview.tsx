"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, CheckCircle2, Clock3, MessagesSquare, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trackEvent } from "@/lib/analytics";

export function DemoPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (inView) {
      trackEvent("agent_preview_viewed", { surface: "homepage_demo_preview" });
    }
  }, [inView]);

  return (
    <Card
      ref={ref}
      className="relative overflow-hidden rounded-lg border-white/10 bg-[#07100d]/86 shadow-[0_24px_120px_rgba(0,0,0,0.45)]"
    >
      <CardContent className="p-0">
        <div className="border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-md bg-bamboo text-black">
                <Bot aria-hidden className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Lead Concierge</p>
                <p className="text-xs text-white/45">Website chat agent</p>
              </div>
            </div>
            <Badge className="border-bamboo/25 bg-bamboo/10 text-bamboo hover:bg-bamboo/10">
              Ready 86%
            </Badge>
          </div>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1fr_0.82fr]">
          <div className="space-y-4 p-4 md:p-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Sparkles aria-hidden className="size-4 text-bamboo" />
                Smart greeting
              </div>
              <p className="mt-3 text-sm leading-7 text-white/62">
                Hi, I am Bamboo. I can answer questions, qualify your project, and help you book the right next step.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.5 }}
              className="ml-auto max-w-[88%] rounded-lg border border-cyan-soft/20 bg-cyan-soft/10 p-4"
            >
              <p className="text-sm leading-7 text-white/72">
                We need an AI assistant for sales inquiries and booking demos.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.5 }}
              className="rounded-lg border border-bamboo/20 bg-bamboo/10 p-4"
            >
              <p className="text-sm leading-7 text-white/72">
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
              <div className="mb-2 flex items-center justify-between text-xs text-white/50">
                <span>Agent readiness</span>
                <span>86%</span>
              </div>
              <Progress value={86} className="h-2 bg-white/10 [&>div]:bg-bamboo" />
            </div>
            <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/36">
                Draft summary
              </p>
              <p className="mt-3 text-sm leading-7 text-white/62">
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
    <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3">
      <div className="flex size-8 items-center justify-center rounded-md bg-white/10 text-bamboo">
        {icon}
      </div>
      <div>
        <p className="text-xs text-white/42">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}
