# Bamboo AI V4: Master Redesign and Conversion Build Prompt

## Role and Mission

You are a principal product designer, conversion strategist, UX writer, and senior Next.js engineer working as one integrated team. Redesign and implement the complete Bamboo AI acquisition funnel in the existing repository. This is not a mood board, a wireframe, or a generic SaaS landing page. Deliver the finished, production-grade experience across every existing route.

The result must feel like a category-defining AI product: precise, alive, fast, credible, and commercially sharp. It must make a visitor understand the offer in seconds, experience the product before being asked to buy, and move naturally from curiosity to a saved agent blueprint, pricing, or a strategy call.

Do not claim or imply guaranteed sales. Increase conversion through clarity, relevance, proof, reduced friction, and a genuinely useful free experience.

## Inspect Before Building

Before editing anything:

1. Read the existing repository, route structure, data model, components, styles, analytics helper, and current builder behavior.
2. Preserve working functionality unless this brief explicitly improves it.
3. Reuse the existing stack and local component conventions: Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, and Lucide icons.
4. Keep centralized content in `src/data/funnel.ts` or a clearly improved typed equivalent.
5. Do not replace the real application with a static mockup.
6. Do not stop after the homepage. Complete and verify the full funnel.

## Product Positioning

### The Category

Bamboo AI is a no-code AI agent funnel for businesses that need to answer questions, qualify leads, schedule appointments, route requests, and hand useful context to a human team.

### The Positioning Wedge

Competing AI-agent platforms often sell broad builders, generic automation, or an abstract AI workforce. Bamboo must own a narrower and more immediately valuable promise:

> The fastest path from an anonymous website visitor to a business-specific agent blueprint and a qualified next step.

Bamboo is not selling another chatbot. It is selling a conversion system that gives the visitor an answer and gives the business structured intent.

### Audience

Primary audiences:

- Owners and operators of small and midsize businesses.
- Heads of sales, support, customer success, and operations.
- Teams losing leads after hours or repeating the same intake questions.
- Nontechnical buyers who want a useful first agent without learning an automation platform.

Audience state on arrival:

- Curious about AI but skeptical of vague claims.
- Unsure which workflow to automate first.
- Worried about setup effort, accuracy, integrations, and losing human control.
- Motivated by faster response, more qualified conversations, lower manual workload, and clearer handoffs.

### Brand Voice

Use these three voice words for every visual and copy decision:

- Engineered
- Alive
- Decisive

The voice is concise, concrete, calm, and commercially confident. Explain outcomes in normal business language. Avoid hype phrases such as "revolutionary," "game-changing," "unlock the power," "10x everything," "seamless," and "the future is here." Never describe the design itself in visible page copy.

## Creative Direction: The Living Control System

The core visual idea is a high-performance control room organized by the growth logic of bamboo. Bamboo should feel structural and intelligent, not decorative, rustic, tropical, eco-spa, or wellness themed.

Translate bamboo into the product language through:

- Vertical signal paths that grow from visitor input to business outcome.
- Segmented nodes inspired by bamboo joints, used only where they communicate stages or handoffs.
- Fine directional lines that connect conversations, qualification rules, knowledge, and destinations.
- Controlled pulses that show an event moving through the system.
- A strong electric bamboo green used for active states, successful routing, and primary conversion.
- Product-native visualizations that reveal what the agent is doing.

The experience should feel futuristic because it reveals live intelligence and cause-and-effect, not because it uses excessive neon, floating glass panels, random particles, or science-fiction decoration.

Physical scene reference: a growth operator in a dark, quiet command center at dusk, watching one incoming customer signal become a qualified opportunity across a precise living system.

## Nonnegotiable Anti-Slop Rules

Do not ship any of the following:

- Purple or blue-purple AI gradients.
- Gradient text.
- Decorative glowing orbs, bokeh blobs, star fields, or particle snow.
- A two-axis decorative grid background.
- Generic glassmorphism or blurred cards everywhere.
- A hero made from a split text block and a generic floating dashboard card.
- Huge empty headline typography with no product evidence in the first viewport.
- Repeated icon-card grids as the default structure for every section.
- Cards nested inside cards.
- Cards or sections with radii above 12px. Default repeated-item radius is 6-8px.
- A one-pixel border paired with a wide, soft drop shadow on the same component.
- Tiny uppercase tracked labels above every section heading.
- Numbered labels unless the content is a real ordered process.
- Fake customer logos, fake testimonials, fake awards, fake security badges, or invented performance metrics.
- Internal implementation notes such as "sample copy," "placeholder," or "front-end prototype" shown to visitors.
- Mascot robots, illustrated brains, sparkly magic-wand clutter, bamboo leaf wallpaper, or literal stock bamboo forests.
- Identical fade-up animation on every section.
- Scroll hijacking, bounce easing, excessive parallax, or motion that blocks reading.
- Mobile layouts that merely stack the desktop version without reconsidering order and controls.
- Long marketing paragraphs, redundant sections, or repeated claims.

If a visual element does not explain the product, improve navigation, provide proof, or increase comprehension, remove it.

## Visual System

### Color Strategy

Use a committed dark palette with multiple functional color roles. Define all colors as OKLCH design tokens.

Recommended starting tokens, adjusted only when contrast testing requires it:

```css
--bg-0: oklch(0.105 0.024 158);
--bg-1: oklch(0.135 0.030 158);
--surface-1: oklch(0.175 0.032 158);
--surface-2: oklch(0.215 0.036 160);
--ink-1: oklch(0.970 0.010 145);
--ink-2: oklch(0.800 0.025 150);
--ink-3: oklch(0.680 0.025 150);
--bamboo: oklch(0.850 0.205 141);
--bamboo-deep: oklch(0.590 0.155 149);
--signal-cyan: oklch(0.790 0.120 205);
--signal-amber: oklch(0.835 0.145 86);
--signal-coral: oklch(0.720 0.175 28);
--danger: oklch(0.690 0.190 25);
--line: oklch(0.970 0.010 145 / 0.12);
```

Rules:

- Bamboo green is the dominant brand signal but not the color of every element.
- Cyan represents information and system routing.
- Amber represents incomplete setup or attention.
- Coral represents errors or blocked paths.
- White and green text must meet WCAG AA contrast.
- Body text must meet at least 4.5:1 against its background.
- Avoid low-contrast gray text on dark green surfaces.
- Never use color alone to communicate status.

### Typography

Preserve the existing Bricolage Grotesque and Geist pairing unless a clearly superior, licensed alternative is already available in the repo.

- Bricolage Grotesque: display headlines, key outcome statements, product names.
- Geist: navigation, body text, forms, buttons, tables, and interface labels.
- Geist Mono: only for short system values, event names, readiness details, and technical metadata.
- H1 desktop maximum: 88px. Never exceed 96px.
- Display tracking floor: `-0.04em`; target `-0.02em` to `-0.03em`.
- Use `text-wrap: balance` on headings and `text-wrap: pretty` on body copy.
- Body copy maximum width: 68ch.
- Do not scale type directly with viewport width. Use bounded `clamp()` values.

Suggested type scale:

- Hero: `clamp(3rem, 6vw, 5.5rem)` with 0.94-1.0 line height.
- Section title: `clamp(2.1rem, 4vw, 3.75rem)`.
- Subsection title: 24-32px.
- Body large: 18px/30px.
- Body: 16px/27px.
- UI text: 14px/20px.
- Metadata: 12-13px/18px.

### Layout and Spacing

- Use a 12-column desktop grid with a content width of 1200-1280px.
- Side padding: 20px mobile, 32px tablet, 40px desktop.
- Section spacing: 72-88px mobile and 104-144px desktop, varied by narrative rhythm.
- The hero should fill roughly 82-90svh while leaving a visible hint of the next section.
- Use broad full-width bands and unframed layouts. Reserve cards for actual selectable items, plans, forms, summaries, and reusable records.
- Use asymmetry deliberately, then restore strong alignment at reading edges.
- Keep control heights stable: 44px minimum, 48px for primary actions.
- Use a semantic z-index scale for header, popover, modal backdrop, modal, toast, and tooltip.

### Shape, Lines, and Surfaces

- Default corner radius: 6px.
- Large bounded tools and dialogs: 8-12px maximum.
- Full pills are allowed only for status tags, segmented controls, and compact filters.
- Prefer rings, separators, tonal surface shifts, and crisp inset lines over large shadows.
- Use one restrained highlight edge on interactive surfaces; do not make every block glow.
- Directional connector lines must map a real input, transformation, or destination.

### Icons and Brand Mark

- Use Lucide icons for familiar actions and statuses.
- Icon-only buttons must have accessible labels and tooltips.
- Replace the generic robot-in-a-square logo treatment with a simple, distinct Bamboo AI mark built from three vertical segmented stems or a professionally supplied logo asset.
- Do not hand-draw a complex mascot or illustrative SVG.
- The brand name "Bamboo AI" must be a first-viewport signal on every top-level marketing route.

## Motion System

Motion should show state change and information flow.

### Page Load

Create one coordinated first-load sequence:

1. The brand mark and navigation resolve immediately.
2. Hero copy appears with a short clipped reveal, never hidden for more than 300ms.
3. A visitor signal enters the live system scene.
4. The signal travels through answer, qualify, and route stages.
5. The output panel resolves into a booked or captured outcome.

Total hero choreography: 900-1400ms. Content must remain usable if animation does not run.

### Interaction Motion

- Hover: 140-180ms.
- Selection and panel transitions: 180-260ms.
- Drawer and modal transitions: 240-360ms.
- Complex hero sequence: up to 650ms per stage.
- Use ease-out quart, quint, or expo curves.
- Animate transform, opacity, clip-path, filter, or stroke progress. Avoid layout-thrashing properties.
- Buttons may move up by at most 2px on hover.
- The builder preview should update with a localized highlight, not reanimate the full panel.
- Progress changes should be smooth and announced accessibly where useful.
- Support `prefers-reduced-motion`; replace movement with instant state changes or short crossfades.

## Conversion Architecture

### Primary Conversion

`Build My Free Agent` leads to `/free-agent-builder`.

### Secondary Conversion

`Book a Strategy Call` leads to `/book-demo`.

### Funnel Sequence

```text
Homepage or industry page
  -> Free builder starts with context
  -> Visitor makes low-friction choices
  -> Live blueprint gains specificity
  -> Preview proves usefulness
  -> Name and work email save the blueprint
  -> Agent-created page shows deliverable and readiness gaps
  -> Visitor books an optimization call or chooses a plan
  -> Thank-you page confirms the next action
```

Do not lead with a high-friction sales form. The free builder is the core product demonstration and lead magnet.

### Conversion Principles

- Show value before requesting contact information.
- Ask one decision at a time.
- Keep the primary CTA language consistent throughout the site.
- Use one primary and one secondary action per major decision surface.
- Explain exactly what happens after a click or form submission.
- Place objection handling near the decision it affects.
- Use ethical urgency only when it is factual. Do not use fake countdowns or fake scarcity.
- Do not show exit-intent UI on builder, pricing, booking, confirmation, or agent-created routes.

## Global Navigation

### Desktop Header

- Sticky, 64-68px high, solid enough for text contrast.
- Left: Bamboo AI mark and wordmark.
- Center: `How It Works`, `Use Cases`, `Pricing`, `Results` if verified.
- Right: secondary `Book a Strategy Call`, primary `Build My Free Agent`.
- Use anchor links on the homepage where appropriate and route links elsewhere.
- Active route or section state must be visible without relying only on color.

### Mobile Header

- Wordmark left, menu icon right.
- Menu opens a full-height sheet with route links, a concise value statement, and both CTAs at the bottom.
- Use a sticky bottom CTA only on the homepage and industry pages after the hero has scrolled out of view.
- Never cover form controls, cookie notices, or page content.

### Footer

Include:

- Short product statement.
- Product, use-case, industry, resource, and legal columns as routes exist.
- Contact or demo path.
- Privacy and terms links when available.
- Copyright only. Remove "prototype" language.

## Homepage: Exact Narrative and Section Map

### 1. Hero: Product Experience First

The hero is a full-bleed interactive product scene, not a generic dashboard card beside the copy.

Use this copy direction:

**H1:** `Bamboo AI turns every visitor into a qualified next step.`

**Supporting copy:** `Build a no-code agent that answers questions, qualifies intent, books the right action, and hands your team the context. Create the first blueprint in under five minutes.`

**Primary CTA:** `Build My Free Agent`

**Secondary CTA:** `Book a Strategy Call`

**Trust line:** `No code. No credit card. Keep human control.`

The immersive hero scene must show one complete loop:

- Incoming visitor message: `We need an AI assistant for inbound demos.`
- Agent answer grounded in approved knowledge.
- Qualification fields: use case, team size, urgency, destination.
- Visible route: `High intent -> Demo calendar + CRM summary`.
- Final state: `Qualified. Demo ready.`
- Readiness value integrated inside the product surface, not displayed as a detached hero statistic.

On mobile, the copy comes first, CTA pair second, then a simplified vertical version of the live system. The scene must not become illegible or horizontally scroll.

### 2. Integration Capability Strip

Immediately below the hero, show a restrained strip:

`Designed to connect with website chat, CRM, calendar, email, SMS, forms, knowledge bases, and help desks.`

Do not use third-party logos unless those integrations are real and approved. Do not imply native integrations that do not exist.

### 3. Cost of the Gap

Headline: `The lead usually disappears between interest and follow-up.`

Use one wide before-and-after flow rather than two decorative cards:

- Before: visitor waits, form lacks context, team repeats discovery, after-hours demand goes cold.
- With Bamboo: visitor gets an answer, intent is qualified, next step is booked, human receives a summary.

Animate a single event crossing both states when in view. The section should make the operational difference obvious in under ten seconds.

### 4. Interactive Use-Case Explorer

Headline: `Give the first agent one job worth doing.`

Use a segmented control or tabs for these initial outcomes:

- Qualify leads
- Answer support questions
- Book appointments
- Recommend products or services
- Route sensitive requests
- Follow up after inquiries

Each selection updates one shared product canvas with:

- Trigger
- Three agent actions
- Information captured
- Human handoff rule
- Business outcome
- Relevant industries

Do not render six identical cards. One interactive canvas should communicate depth better than a grid of summaries.

### 5. Builder Demonstration

Headline: `Build the blueprint before you book the call.`

Show a condensed, working version of the builder with three decisions: industry, primary outcome, and channel. The live preview must update immediately. A CTA transfers the selections into `/free-agent-builder` through URL params or persisted state.

Explain the sequence in three factual stages:

1. Describe the workflow.
2. Review the agent blueprint.
3. Save it and map the launch.

### 6. Outcome and ROI Model

Headline: `Model the value with your numbers.`

Create a compact interactive estimator with these inputs:

- Monthly website conversations or inquiries.
- Current qualified-lead rate.
- Average opportunity value.
- Percentage arriving after hours.

Outputs must be clearly labeled estimates, not guarantees:

- Additional conversations captured.
- Team hours potentially returned.
- Estimated opportunity value influenced.

Show assumptions, allow editing, and include a disclaimer: `Illustrative estimate based on your inputs. Actual results vary.` Never invent an industry benchmark without a source.

### 7. Knowledge, Guardrails, and Handoff

Headline: `Automation your team can inspect.`

Use a horizontal system diagram that connects:

`Approved knowledge -> Agent rules -> Confidence check -> Human handoff -> Logged outcome`

Explain:

- Approved knowledge sources.
- Topics the agent may and may not answer.
- Qualification and routing rules.
- Low-confidence and sensitive-topic escalation.
- A readable summary for the receiving human.

For medical, legal, insurance, and cannabis use cases, clearly distinguish administrative guidance from professional advice and show the escalation boundary.

### 8. Industry Explorer

Headline: `Start with the workflow your market already needs.`

Include all 11 existing industries:

- Customer service
- Sales
- Real estate
- Medical
- Cannabis
- Automotive
- Law firms
- Insurance
- Restaurants
- Ecommerce
- Construction

Use a filterable list or compact matrix with outcome tags. Each item links to its industry route. Avoid a field of eleven oversized cards.

### 9. Proof

Use only verified customer proof. A valid proof module contains:

- Customer name and approved logo.
- Specific workflow.
- Time window.
- Measured outcome.
- Link to a case study or source.

If verified proof is not available, do not invent it. Replace the section with a `What your blueprint includes` product artifact showing a realistic output: objective, greeting, qualification fields, guardrails, handoff, and launch checklist.

### 10. Pricing Teaser

Headline: `Prove the workflow free. Pay when it is ready to work.`

Show the free builder and the most likely paid starting plan. Link to the complete pricing page. Do not force all four plan cards onto the homepage.

### 11. FAQ

Answer real purchase objections:

- Can I build an agent without code?
- What do I receive from the free builder?
- Does Bamboo replace my team?
- How does the agent know what it can say?
- Can it hand off to a human?
- Which systems can it connect to?
- How long does a launch take?
- How does pricing work?
- Can regulated industries use it?

The accordion must be keyboard accessible, animate height without jank, and track the opened question.

### 12. Final CTA

Headline: `Your first useful agent starts with one workflow.`

Supporting copy: `Build the blueprint now. Bring it to a strategy call only when you can see what is worth launching.`

Primary: `Build My Free Agent`

Secondary: `Book a Strategy Call`

## Free Agent Builder: Complete Eight-Step Flow

Route: `/free-agent-builder`

The builder is the product demonstration and the highest-priority conversion experience. It must feel more like configuring a living system than filling out a long form.

### Builder Shell

- Desktop: step navigation and current task on the left; sticky live blueprint on the right.
- Mobile: compact progress header, current task, then a collapsible or sticky preview summary that never hides the primary control.
- Show `Step X of 8`, a labeled progress bar, and the current step title.
- Autosave after every meaningful change.
- If saved state exists, show a small `Resume your blueprint` message with `Continue` and `Start over` choices. Never silently overwrite a previous draft.
- Allow navigation back to completed steps.
- Do not allow future-step navigation until dependencies are satisfied.
- URL params from homepage or industry pages should preselect known context.

### Step 1: Industry

- Single selection.
- Include all 11 current industries plus `Other`.
- Search or group options if needed on mobile.
- After selection, wait 180-250ms for visible confirmation, then advance.
- Persist the selected industry.

### Step 2: Outcomes

- Choose one primary outcome and one optional secondary outcome.
- Maximum two choices.
- Explain why the primary outcome matters to the blueprint.
- `Continue` remains disabled until one outcome is selected.
- If a third outcome is selected, replace the optional secondary only after clear feedback; never fail silently.

### Step 3: Channel

- Single selection: website chat, SMS, email, Facebook/Instagram, or CRM inbox.
- Label unimplemented destinations as planned or integration-dependent. Do not imply they are live.
- Auto-advance after selection.

### Step 4: Voice

- Single selection: helpful expert, warm concierge, direct sales assistant, or calm support guide.
- Show a one-line sample response for each voice so the choice is meaningful.
- Auto-advance after selection.

### Step 5: Business Context

Fields:

- Business name, required.
- What the business sells or provides, required.
- Ideal customer, optional.
- Qualification rules, optional.
- Desired next action, required.

Use clear helper text and live character guidance. Do not use vague labels such as `Business info` without examples.

### Step 6: Knowledge and Guardrails

Fields and controls:

- Website URL, optional with URL validation.
- Knowledge-source notes or approved links.
- Topics the agent must not answer.
- Human handoff condition.
- Checkbox confirming that sensitive workflows need human review.

Allow skip, but explain that skipped inputs lower readiness. Skipping must never silently inject demo data in production.

### Step 7: Blueprint Preview

Generate a structured, editable preview containing:

- Agent name and role.
- Primary objective.
- Greeting.
- Approved knowledge summary.
- Qualification questions.
- Information captured.
- Guardrails.
- Escalation rule.
- Destination or handoff.
- Readiness score with a breakdown.
- Launch checklist.

Readiness must not be an unexplained vanity score. Show categories such as `Outcome`, `Context`, `Knowledge`, `Guardrails`, and `Destination`. Selecting a missing category returns the visitor to the relevant step.

Allow the user to copy the greeting and summary. If practical, offer a client-side JSON or text blueprint download after lead capture.

### Step 8: Save Blueprint

Do not call this step `Create account` unless real authentication exists.

Headline: `Where should we send your agent blueprint?`

Fields:

- Name, required.
- Work email, required.
- Phone, optional.
- Company, prefilled when available.
- Website, prefilled when available.
- Industry, prefilled and editable.
- Consent checkbox when required by the applicable email workflow.

The submit CTA is `Save My Agent Blueprint`.

On submit:

- Validate inline and focus the first invalid field.
- Prevent duplicate submissions.
- Show a clear loading state without changing button width.
- Save the complete agent, state, readiness, and lead object.
- Send to the real backend or CRM when configured.
- If only local persistence exists, keep the architecture ready for a server action and never claim an email was sent.
- Navigate to `/agent-created` only after successful persistence.

### Builder Test Mode

Demo presets are useful for development but must not appear in production. Gate `Fill Demo Data`, `Use Demo Lead`, and similar controls behind a development environment flag.

## Agent-Created Page

Route: `/agent-created`

The page must feel like delivery of a valuable artifact, not a generic success message.

Order:

1. Confirmation: `Your Bamboo agent blueprint is ready.`
2. Full blueprint summary.
3. Readiness breakdown and the highest-priority missing items.
4. Actions: copy summary, download blueprint, edit blueprint.
5. Primary next step: `Book an Optimization Call`.
6. Secondary next step: `View Launch Plans`.

Explain that the call covers knowledge sources, integrations, routing, measurement, and production launch. Do not use fake referral rewards or vague upgrade pressure.

If no saved agent exists, show a useful empty state with `Build My Free Agent`; never render fake fallback lead data as if it belonged to the visitor.

## Pricing Page

Route: `/pricing`

### Purpose

Help a visitor choose based on deployment complexity, not just feature quantity.

### Structure

1. Headline: `Start with the blueprint. Upgrade when the workflow is ready.`
2. Monthly/annual segmented control only if both billing options are real.
3. Plan selector with Free Builder, Growth, Scale, and Enterprise.
4. A compact `Best for` line on each plan.
5. Clear inclusions, usage limits, support level, and integration depth.
6. Feature comparison table.
7. Implementation and security FAQ.
8. CTA to build free or book a strategy call.

Preserve current plan values only if they are the approved commercial values. Do not invent discounts, annual savings, limits, compliance claims, or enterprise features. Keep pricing data centralized and typed.

On mobile:

- Use a plan selector or horizontally snap only if every control remains keyboard accessible.
- The comparison table may scroll horizontally with a visible cue and sticky feature column.
- Do not shrink four desktop cards until the text becomes unreadable.

## Book Demo Page

Route: `/book-demo`

Use `Book a Strategy Call` consistently unless the business explicitly prefers `Demo`.

### Left Side

- Headline: `Map the first agent worth launching.`
- Set expectations: 25-30 minutes, workflow review, no obligation, clear next-step plan.
- Show three outputs: workflow recommendation, launch requirements, plan fit.
- Add verified trust or security proof only when available.

### Form

Fields:

- Name, required.
- Work email, required.
- Company, required.
- Website, optional.
- Team size, selectable.
- Primary workflow, selectable.
- What should Bamboo help with first?, optional textarea.

Use a real calendar embed when configured. Otherwise submit the request to a real endpoint and show honest confirmation. Development autofill controls must be hidden in production.

Validation, loading, errors, and success behavior must match the builder form. Route successful submissions to `/thank-you`.

## Thank-You Page

Route: `/thank-you`

Confirm exactly what happened. Do not say a meeting is booked unless a calendar booking is confirmed.

Show:

- Submission status.
- Expected response time if the business has approved one.
- Three items to prepare: one workflow, current FAQ or intake material, desired business outcome.
- Link back to the saved blueprint or free builder.
- Calendar details only when they exist.

Do not show implementation placeholders to the visitor.

## Industry Pages

Routes:

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

Every industry page must use shared structure while feeling specific through copy, workflow logic, proof, and the live product scene.

### Industry Page Structure

1. Brand and industry-specific hero.
2. Three real pains stated in the language of that buyer.
3. Live example conversation and routed outcome.
4. A three-stage workflow.
5. Guardrails and human escalation relevant to the industry.
6. Use cases and agent examples.
7. Verified ROI or an editable estimate, never an invented statistic.
8. Industry-specific FAQ.
9. CTA to open the builder with the industry preselected.

Do not show `Testimonial placeholder` or the current sample ROI as factual proof. Put all industry-specific claims in the typed data layer and mark unverified content for internal review, not public display.

Regulated categories must include clear boundaries:

- Medical: administrative assistance only; no diagnosis or medical advice.
- Law firms: intake and routing only; no legal advice or attorney-client relationship claim.
- Insurance: licensed staff handle advice and binding decisions.
- Cannabis: age, jurisdiction, product, and compliance rules must be configurable.

## Forms and State Design

Every input must include:

- Visible label.
- Helpful placeholder that is not the only label.
- Hover, focus, filled, disabled, error, and success states.
- A 44px minimum hit target.
- High-contrast placeholder and helper text.
- Correct input type, autocomplete attribute, and mobile keyboard behavior.
- Inline error text connected with `aria-describedby`.

Form behavior:

- Preserve entered data after validation errors.
- Never clear a form on a failed request.
- Disable duplicate submission while pending.
- Provide retry for recoverable server errors.
- Use a polite live region for asynchronous status.
- Keep error summaries concise and actionable.
- Never use a toast as the only place an error appears.

## Empty, Loading, Error, and Offline States

Design all expected states:

- Builder loading saved state.
- No saved blueprint.
- Corrupt local saved data.
- Network submission pending.
- Network failure and retry.
- Invalid URL or email.
- Pricing data unavailable.
- Industry slug not found.
- Calendar embed unavailable.
- Analytics blocked without affecting functionality.
- JavaScript animation unavailable while content remains visible.

Use skeletons only when content is truly loading. Keep their geometry stable to avoid layout shift.

## Analytics and Measurement

Preserve existing event names where possible and add only the missing events needed to measure the funnel.

Required events and useful properties:

- `page_view`: path, referrer, campaign parameters.
- `hero_cta_clicked`: CTA label, surface, destination.
- `secondary_cta_clicked`: CTA label, surface, destination.
- `industry_selected`: industry, surface.
- `agent_builder_started`: source, preselected context.
- `builder_step_completed`: step, step index, time on step, non-sensitive selection summary.
- `builder_step_back`: step, destination.
- `builder_step_skipped`: step.
- `agent_preview_viewed`: readiness band, source.
- `lead_form_started`: source.
- `lead_form_submitted`: source, industry, workflow. Never send raw personal data to analytics.
- `agent_blueprint_saved`: readiness band, workflow, industry.
- `book_demo_clicked`: source, blueprint present.
- `demo_form_started`: source.
- `demo_form_submitted`: source, workflow, team-size band.
- `pricing_viewed`: billing mode.
- `pricing_plan_clicked`: plan, billing mode, source.
- `faq_opened`: question identifier, route.
- `exit_intent_shown`: route, time on page, scroll depth.
- `exit_intent_submitted`: route. Never send the email address.
- `mobile_sticky_cta_clicked`: route, CTA label.

Track the journey without collecting sensitive form values. The site must work when analytics is absent or blocked.

### Primary Funnel Metrics

- Homepage primary CTA click-through rate.
- Builder start rate.
- Completion rate by step.
- Preview-to-save rate.
- Save-to-strategy-call rate.
- Pricing plan click rate.
- Demo request completion rate.
- Conversion rate by industry source.

## Exit Intent and Persistent CTAs

If exit intent is retained:

- Desktop only.
- Show once per session.
- Arm after at least 30 seconds and meaningful engagement or 50% scroll.
- Never show within the first eight seconds.
- Never show on builder, pricing, booking, agent-created, or thank-you routes.
- Close with Escape, close button, backdrop click, and visible focus management.
- Offer a real benefit: save the builder link or receive a useful launch checklist only if email delivery exists.

The mobile sticky CTA appears only after the hero CTA is out of view and must respect safe-area insets.

## Responsive Behavior

Design and verify at minimum:

- 360x800
- 390x844
- 768x1024
- 1024x768
- 1280x800
- 1440x900
- 1728x1117

Rules:

- No horizontal page overflow at any width.
- No heading may overflow or collide with adjacent content.
- The longest industry, plan, and workflow labels must wrap cleanly.
- Hero H1 and product scene must fit the first viewport with a hint of the next section.
- Desktop hover behavior must have an equivalent touch and keyboard state.
- Tables, step rails, and tabs must remain usable without microscopic text.
- Builder primary actions remain reachable when the mobile keyboard is open.
- Sticky elements must not overlap each other.
- Honor `env(safe-area-inset-bottom)` on mobile.

## Accessibility

Meet WCAG 2.2 AA.

- Semantic headings in logical order.
- Landmark elements for header, navigation, main, sections, and footer.
- Skip-to-content link.
- Visible focus on every interactive element.
- Full keyboard operation for menus, dialogs, tabs, accordions, builder choices, pricing toggle, and forms.
- Correct dialog focus trap and focus return.
- Status is never communicated only by color.
- Decorative visuals are hidden from assistive technology.
- Product visuals receive useful accessible descriptions when they communicate content.
- Form errors are announced and connected to inputs.
- Touch targets are at least 44x44px.
- Reduced-motion behavior is complete.
- Text supports 200% zoom without loss of function.

## Performance

Targets on a representative mobile connection:

- LCP under 2.5 seconds.
- CLS under 0.1.
- INP under 200ms.
- No autoplay video required for the primary message.
- No heavy 3D library unless the result materially improves comprehension and remains performant.
- Prefer product-native HTML/CSS/canvas visuals over large decorative media.
- Lazy-load below-the-fold motion and media.
- Use `next/font` and avoid unnecessary font weights.
- Use `next/image` for raster assets with stable dimensions.
- Keep client components narrow; use server components for static page structure.
- Avoid large JavaScript dependencies for effects that CSS can handle.

## SEO and Sharing

- Unique metadata for every route.
- Canonical URLs.
- Open Graph image that shows the actual Bamboo AI product experience, not abstract gradients.
- Organization and SoftwareApplication structured data when claims are accurate.
- FAQ structured data only for visible FAQ content and when policy-compliant.
- Descriptive page titles based on user intent.
- Industry pages must not be thin duplicates; each needs distinct copy and workflows.
- Add a meaningful not-found experience for invalid industry routes.

## Implementation Quality

- Strict TypeScript; do not use `any` as a shortcut.
- Preserve typed industry and pricing data.
- Keep server and client responsibilities explicit.
- Use stable keys and predictable state transitions.
- Avoid unnecessary effects and state duplication.
- Use semantic controls: buttons for actions, links for navigation, checkboxes for binary choices, radios or listbox behavior for single selection, segmented controls for modes.
- Tooltips name unfamiliar icon buttons.
- Do not hand-draw icons when Lucide provides one.
- Keep comments concise and only where logic is not self-explanatory.
- Do not add an abstraction unless it removes real duplication or clarifies a shared contract.

## Acceptance Checklist

Do not consider the redesign complete until all items pass.

### Experience

- A new visitor can state what Bamboo does within five seconds.
- The primary action is unambiguous in the first viewport.
- The hero shows a real input-to-outcome product loop.
- The free builder provides value before asking for contact information.
- Every route has a clear next action.
- No public-facing placeholder, test control, fake proof, or internal note remains.
- The site feels like one product across all routes.

### Visual

- The design is recognizably Bamboo without literal bamboo decoration.
- The color system is not one-note green and does not drift into purple AI cliches.
- Typography, spacing, alignment, and component dimensions are consistent.
- Cards are used only where they are the correct affordance.
- No nested cards, oversized radii, gradient text, floating orbs, decorative grids, or excessive glass appear.
- The product visualization is legible and useful on desktop and mobile.
- Motion feels intentional and reduced-motion is complete.

### Functional

- All existing routes load.
- Navigation links and CTAs reach the correct destination.
- Builder autosave, resume, back, skip, validation, preview, readiness, and final persistence work.
- URL preselection from homepage and industry pages works.
- Pricing toggle and plan CTAs work only with approved pricing logic.
- Booking form handles success and failure honestly.
- Agent-created and thank-you pages reflect actual saved state.
- No form submits twice.
- Analytics does not capture personal field values.

### Verification

- Run lint and production build.
- Test the complete homepage -> builder -> agent-created -> booking -> thank-you journey.
- Test pricing and at least one regulated and one nonregulated industry route.
- Verify desktop and mobile screenshots at the required sizes.
- Check browser console and network errors.
- Check keyboard navigation and focus order.
- Check reduced motion.
- Check 200% zoom.
- Check contrast.
- Check no horizontal overflow.
- Check no text overlaps, clipped labels, layout shifts, blank animated sections, or sticky-control collisions.

## Final Delivery Standard

Implement the complete redesign in the existing codebase. Make decisive design choices within this brief. Do not return a generic explanation of what could be built. Build it, verify it, and report:

1. What changed.
2. Which routes and flows were completed.
3. Which tests passed.
4. Any remaining dependency that requires real business input, such as official pricing, verified customer proof, legal copy, CRM credentials, or calendar configuration.

The final product should be bold enough to be memorable, controlled enough to be trusted, and useful enough that the builder itself earns the conversion.
