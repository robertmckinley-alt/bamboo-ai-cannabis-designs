"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";
import type { FAQ } from "@/data/funnel";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="rounded-lg border border-white/10 bg-white/[0.035] px-4"
      onValueChange={(value) => {
        if (value) {
          trackEvent("faq_opened", { question: value });
        }
      }}
    >
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question} className="border-white/10">
          <AccordionTrigger className="text-left text-base text-white hover:text-bamboo">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-7 text-white/60">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
