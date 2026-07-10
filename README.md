# Bamboo AI — Funnel Prototypes

Static site with the conversion funnel deliverables for [mybamboo.ai](https://mybamboo.ai).

| Path | What it is |
| --- | --- |
| `/` | Homepage prototype — demo-first hero (simulated test call), live transcript, industry agents, pricing, FAQ |
| `/build` | Free agent builder prototype — 8-step onboarding with readiness ring, email gate, test call, publish flow |
| `/blueprint` | The full 14-part funnel blueprint document (strategy, copy, wireframes, design system, analytics spec) |

No build step — plain HTML/CSS/JS. Deploys anywhere static hosting works (Vercel: just import the repo, framework preset "Other", no build command, output directory `./`).

**Design system: "Field & Line" (v2, 2026-07-09).** Bricolage Grotesque display + Instrument Sans body (inlined as woff2 data URIs — no font requests), mono reserved for what machines say, field/night grounds with a voicemail-lamp amber accent. Signature motifs: the node (section markers, the how-it-works line) and the builder's bamboo-culm readiness meter. Spec lives in `/blueprint` Part 08.

Demo interactions (the phone call, voice previews, website scrape, checkout) are simulated front-end only.
