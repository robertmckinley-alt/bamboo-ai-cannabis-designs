import type { Metadata } from "next";
import { CalendarDays, CheckCircle2, Clock3, Sparkles } from "lucide-react";
import { BookingForm } from "@/components/funnel/forms";
import { SectionHeader, TrustBadges } from "@/components/funnel/blocks";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Book a Bamboo AI demo to map your first agent, launch workflow, integrations, and conversion plan.",
  openGraph: {
    title: "Book a Demo | Bamboo AI",
    description: "Turn a free agent preview into a paid Bamboo AI launch plan.",
    url: "/book-demo",
  },
};

export default function BookDemoPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Book a demo"
            title="Map your first agent with a Bamboo specialist."
            description="We will review your workflow, identify the fastest launch path, and show where Bamboo can capture more demand."
          />
          <div className="mt-8 grid gap-4">
            {[
              {
                icon: <Sparkles className="size-5" />,
                title: "Review the agent opportunity",
                text: "Clarify the first workflow that should answer, capture, book, or route.",
              },
              {
                icon: <Clock3 className="size-5" />,
                title: "Design the launch path",
                text: "Map the knowledge source, channel, handoff, and success metric.",
              },
              {
                icon: <CalendarDays className="size-5" />,
                title: "Choose the next step",
                text: "Leave with a clear production plan, pricing fit, or proof-of-concept path.",
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-lg border-white/10 bg-white/[0.045] shadow-none">
                <CardContent className="flex gap-4 p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-bamboo/10 text-bamboo">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="font-semibold text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-white/58">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <TrustBadges />
          </div>
        </div>
        <div>
          <BookingForm />
          <div className="mt-5 flex gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-white/58">
            <CheckCircle2 aria-hidden className="mt-1 size-4 shrink-0 text-bamboo" />
            Qualified teams can bring an existing website, FAQs, CRM notes, or current intake form to the call.
          </div>
        </div>
      </div>
    </main>
  );
}
