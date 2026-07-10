"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";
import type { FAQ } from "@/data/funnel";

export function FAQAccordion({ items }: { items: FAQ[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="border-y border-white/12"
      onValueChange={(value) => {
        if (value) {
          trackEvent("faq_opened", { question: value });
        }
      }}
    >
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question} className="border-white/10 px-1">
          <AccordionTrigger className="min-h-16 text-left font-heading text-base font-semibold text-white hover:text-bamboo">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-5 text-sm leading-7 text-white/68">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
