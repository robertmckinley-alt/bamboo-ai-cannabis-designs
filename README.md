# Bamboo AI V4

Production-grade acquisition funnel for Bamboo AI, built with Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui primitives, Framer Motion, and Lucide icons.

## Experience

- Living Control System visual direction with an input-to-outcome signal scene.
- Conversion-led homepage with use-case explorer, transferable builder demo, editable ROI model, guardrails, industry matrix, pricing path, and FAQ.
- Eight-step AI agent blueprint builder with URL preselection, local autosave, resume/start-over controls, live preview, explainable readiness categories, guardrails, validation, and lead capture.
- Blueprint delivery with copy, JSON download, editing, readiness breakdown, strategy-call CTA, and plan selection.
- Plan selector and feature comparison without a repeated pricing-card wall.
- Strategy-call form, honest local confirmation state, custom not-found page, and 11 typed industry routes.
- Responsive navigation, mobile sticky CTA, reduced-motion handling, WCAG-focused forms, and analytics events that exclude personal field values.

## Routes

- `/`
- `/free-agent-builder`
- `/agent-created`
- `/pricing`
- `/book-demo`
- `/thank-you`
- `/industries/customer-service`
- `/industries/sales`
- `/industries/real-estate`
- `/industries/medical`
- `/industries/cannabis`
- `/industries/automotive`
- `/industries/law-firms`
- `/industries/insurance`
- `/industries/restaurants`
- `/industries/ecommerce`
- `/industries/construction`

## Project Context

- `PRODUCT.md` captures users, purpose, brand personality, anti-references, principles, and accessibility requirements.
- `DESIGN.md` captures the Living Control System theme, OKLCH palette, typography, layout, components, motion, responsive behavior, and prohibited patterns.
- `BAMBOOAI_V4_MASTER_PROMPT.md` is the complete product, design, conversion, implementation, and verification brief.
- `src/data/funnel.ts` contains pricing, FAQ, builder options, and industry content.

## Production Integrations

The front end stores drafts and strategy requests in `localStorage` so the complete journey can be tested without credentials. Before a public production launch, connect the save actions in `src/components/funnel/forms.tsx` and `src/components/funnel/agent-builder-wizard.tsx` to the approved CRM, email, account, and calendar systems. Confirm official pricing, legal copy, security claims, and verified customer proof before publishing them.

Analytics flows through `src/lib/analytics.ts`, which supports `dataLayer` and `window.analytics.track` without sending raw form values.

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```
