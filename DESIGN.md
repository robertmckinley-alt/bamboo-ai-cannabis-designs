# Design System

## Theme

### Living Control System

Bamboo AI is a dark, high-performance control surface organized by the growth logic of bamboo. Vertical segmented signal paths connect visitor input, agent action, qualification, routing, and outcome. The aesthetic is structural and intelligent, not rustic, tropical, wellness themed, or cyberpunk.

Physical scene: a growth operator in a dark, quiet command center at dusk, watching one incoming customer signal become a qualified opportunity across a precise living system.

## Principles

- Product evidence leads; marketing copy supports it.
- Bamboo motifs communicate stages and handoffs rather than decorate surfaces.
- Broad unframed layouts carry the narrative; cards are reserved for choices, plans, forms, and records.
- Green marks successful active states, cyan information and routing, amber incomplete decisions, and coral errors or blocked paths.
- Motion exposes cause and effect and never blocks reading or interaction.

## Color

All tokens use OKLCH.

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `oklch(0.105 0.024 158)` | Page canvas |
| `--background-raised` | `oklch(0.135 0.030 158)` | Raised bands |
| `--surface-1` | `oklch(0.175 0.032 158)` | Primary tool surface |
| `--surface-2` | `oklch(0.215 0.036 160)` | Active or selected surface |
| `--foreground` | `oklch(0.970 0.010 145)` | Primary text |
| `--foreground-muted` | `oklch(0.800 0.025 150)` | Secondary text |
| `--foreground-subtle` | `oklch(0.680 0.025 150)` | Metadata with verified contrast |
| `--bamboo` | `oklch(0.850 0.205 141)` | Primary action and success |
| `--bamboo-deep` | `oklch(0.590 0.155 149)` | Green structural tone |
| `--signal-cyan` | `oklch(0.790 0.120 205)` | Information and routing |
| `--signal-amber` | `oklch(0.835 0.145 86)` | Incomplete or attention |
| `--signal-coral` | `oklch(0.720 0.175 28)` | Error or blocked path |
| `--line` | `oklch(0.970 0.010 145 / 0.12)` | Dividers and rings |

Never use gradient text. Tonal gradients are permitted only as restrained background depth behind a real product visualization.

## Typography

- Display: Bricolage Grotesque, 600-700 weight.
- Body and interface: Geist, 400-700 weight.
- System metadata: Geist Mono, used sparingly.
- Hero: `clamp(3rem, 6vw, 5.5rem)`, line-height 0.94-1, tracking `-0.03em`.
- Section title: `clamp(2.1rem, 4vw, 3.75rem)`, tracking `-0.025em`.
- Body large: 18/30.
- Body: 16/27.
- Interface: 14/20.
- Metadata: 12-13/18.
- Headings use balanced wrapping; prose uses pretty wrapping and stays under 68ch.

## Layout

- Content width: 1200-1280px on a 12-column grid.
- Page padding: 20px mobile, 32px tablet, 40px desktop.
- Section rhythm: 72-88px mobile, 104-144px desktop.
- Hero: 82-90svh with the next band visible.
- Mobile-first composition with structural reflow at 640px, 768px, and 1024px.
- Cards: 6-8px radius; dialogs and bounded tools: 8-12px maximum.
- Controls: 44px minimum target; primary actions 48px high.
- Shadows are not decorative. Prefer crisp rings, separators, tonal shifts, and inset highlights.

## Components

### Brand Mark

Three segmented vertical stems form a simple technical bamboo mark. Pair with the `Bamboo AI` wordmark. Do not use a generic robot icon as the logo.

### Buttons

- Primary: bamboo fill, near-black text, 48px high, 6px radius.
- Secondary: transparent dark surface, crisp light ring, white text.
- Ghost: text or icon with a visible hover/focus surface.
- Hover movement is at most 2px. Loading states keep width stable.

### Product Signal Scene

An unframed visualization connects visitor input, approved answer, qualification, route, and outcome. Connector lines map real relationships. A localized pulse moves along the active path. On mobile it becomes a vertical sequence.

### Builder

Desktop uses a task surface with a sticky live blueprint. Mobile uses a compact progress header, one task at a time, and a collapsible preview summary. Readiness is broken into Outcome, Context, Knowledge, Guardrails, and Destination.

### Forms

Visible labels, high-contrast placeholders, stable helper/error space, inline validation, loading, disabled, and retry states. Errors identify what happened and how to fix it.

### Status

Compact tags may be pill-shaped. Status always includes an icon or text label in addition to color.

## Motion

- Coordinated first load: navigation, clipped hero copy, incoming signal, staged agent action, resolved outcome.
- Hover: 140-180ms.
- Selection: 180-260ms.
- Drawer/dialog: 240-360ms.
- Hero stages: up to 650ms each; total sequence 900-1400ms.
- Easing: ease-out quart, quint, or expo. No bounce or elastic motion.
- Animate transforms, opacity, clip-path, filter, or stroke progress; avoid layout properties.
- Reduced motion uses instant state changes or short crossfades.

## Responsive

- Verify 360, 390, 768, 1024, 1280, 1440, and 1728px widths.
- No horizontal page overflow or clipped labels.
- Sticky elements never collide.
- Tables preserve a readable feature column and an explicit horizontal-scroll cue on small screens.
- Mobile sticky CTA appears only on marketing and industry routes after the hero CTA leaves view.
- Respect safe-area insets and mobile keyboard reachability.

## Prohibited Patterns

- Purple AI gradients, gradient text, or decorative grids.
- Glowing orbs, particles, excessive glass, or giant soft shadows.
- Split hero with a generic floating dashboard card.
- Repeated identical icon-card grids or nested cards.
- Repeated tiny uppercase section eyebrows.
- Fake customer proof or unverified metrics.
- Literal bamboo decoration, mascot robots, or hand-drawn illustrations.
