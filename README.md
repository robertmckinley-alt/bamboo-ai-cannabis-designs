# Bamboo AI — Conversion Funnel (V4)

Next.js App Router implementation of the Bamboo AI acquisition funnel for [mybamboo.ai](https://mybamboo.ai), built to the V4 master brief: **the fastest path from an anonymous website visitor to a business-specific agent blueprint and a qualified next step.**

## Routes

| Route | What it is |
| --- | --- |
| `/` | Homepage — live-system hero loop, cost-of-the-gap flow, use-case explorer, working mini-builder, ROI estimator, guardrail diagram, industry explorer, blueprint artifact, pricing teaser, FAQ |
| `/free-agent-builder` | 8-step builder: industry → outcomes → channel → voice → context → knowledge/guardrails → blueprint preview (readiness by category) → save. Autosave, resume banner, URL preselection (`?industry=&goal=&channel=`) |
| `/agent-created` | Blueprint delivery: full summary, readiness breakdown, copy/download/edit, optimization-call CTA. Honest empty state |
| `/pricing` | Free Builder / Growth / Scale / Enterprise, comparison table, implementation FAQ |
| `/book-demo` | Strategy-call request (25–30 min framing, three outputs) → `/thank-you` |
| `/industries/[slug]` | 11 industry playbooks with example conversations, workflows, regulated-industry boundaries, and an editable value estimator |

## Design system — "Living Control System"

Committed dark OKLCH palette (`src/app/globals.css`): bamboo green for active/conversion, cyan for routing, amber for attention, coral for errors. Bricolage Grotesque display / Geist body / Geist Mono for system values. Default radius 6px; connector lines and segmented nodes map real signal flow.

## Honesty rules baked in

- No fake logos, testimonials, or invented benchmarks. The estimator computes only from visitor inputs and labels everything an illustrative estimate.
- Regulated industries (medical, law, insurance, cannabis) state their boundaries on-page.
- Persistence is local (`localStorage`); the save/submit paths are structured for a server action or CRM call to drop in. Nothing claims an email was sent.
- Demo-fill controls render in development only.

## Develop

```bash
npm install
npm run dev     # develop
npm run lint    # eslint
npm run build   # production build
node scripts/check-overflow.mjs   # no horizontal overflow, 6 widths × 7 routes (needs `next start -p 3199`)
node scripts/e2e-flow.mjs         # full funnel journey via Playwright + system Chrome
```

Analytics events fire into `window.dataLayer` (see `src/lib/analytics.ts`); no personal field values are sent.
