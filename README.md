# Bamboo AI Funnel Front End

Production-ready front-end funnel for Bamboo AI, built with Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui source components, Framer Motion, and Lucide icons.

## What Was Built

- Premium dark-mode marketing funnel with homepage, pricing, demo booking, success pages, and 11 industry pages.
- Free AI Agent Builder wizard with progress, step cards, smart defaults, skip/back actions, local autosave, live preview, readiness score, and final lead capture.
- Reusable component system for navigation, CTAs, section headers, cards, FAQ, pricing, comparison table, trust/security, ROI, before/after, demo preview, forms, success states, floating CTAs, mobile sticky CTA, and exit intent.
- Generic analytics helper for all requested event names.
- Route metadata and OpenGraph data for SEO.

## Routes

- `/`
- `/free-agent-builder`
- `/pricing`
- `/book-demo`
- `/thank-you`
- `/agent-created`
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

## Customize Copy

Edit `src/data/funnel.ts`. Homepage FAQs, testimonials, pricing plans, comparison rows, builder choices, templates, integrations, stats, logos, and industry page copy all live there.

## Connect Backend

The current build intentionally stores demo/builder submissions in `localStorage`. Replace the TODO sections in `src/components/funnel/forms.tsx` and `src/components/funnel/agent-builder-wizard.tsx` with API routes, Server Actions, or CRM/calendar integrations.

## Connect Analytics

Use `src/lib/analytics.ts`. `trackEvent()` currently pushes to `window.dataLayer`, calls `window.analytics.track()` when present, and logs in development. Swap or extend that function for Segment, HubSpot, GA4, PostHog, or another provider.

## Edit Industry Pages

Add or modify entries in the `industries` array in `src/data/funnel.ts`. The dynamic route at `src/app/industries/[slug]/page.tsx` automatically generates pages and metadata from that data.

## Development

```bash
npm run dev
npm run lint
npm run build
```
