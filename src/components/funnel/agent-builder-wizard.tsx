"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  builderChannels,
  builderGoals,
  builderIndustries,
  builderVoices,
} from "@/data/funnel";
import {
  AGENT_STORAGE_KEY,
  BUILDER_STORAGE_KEY,
  buildBlueprint,
  computeReadiness,
  emptyBuilderState,
  type BuilderState,
  type SavedAgent,
} from "@/lib/blueprint";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 220;
const isDev = process.env.NODE_ENV === "development";

const stepTitles = [
  "Which industry is this agent for?",
  "What should it accomplish?",
  "Where does it meet customers first?",
  "How should it sound?",
  "Tell it about the business.",
  "Knowledge and guardrails.",
  "Review the blueprint.",
  "Where should we send your agent blueprint?",
] as const;

const stepShortLabels = [
  "Industry",
  "Outcomes",
  "Channel",
  "Voice",
  "Context",
  "Knowledge",
  "Preview",
  "Save",
] as const;

function hasProgress(state: BuilderState) {
  return Boolean(
    state.industry ||
      state.goals.length > 0 ||
      state.channel ||
      state.voice ||
      state.businessName ||
      state.offering
  );
}

function isValidUrl(value: string) {
  if (!value.trim()) return true;
  try {
    new URL(value.startsWith("http") ? value : `https://${value}`);
    return true;
  } catch {
    return false;
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AgentBuilderWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<BuilderState>(emptyBuilderState);
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [resumeOffered, setResumeOffered] = useState(false);
  const [secondaryReplaced, setSecondaryReplaced] = useState("");
  const advanceTimer = useRef<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  /* ---- load saved state + URL preselection ---- */
  useEffect(() => {
    let next = { ...emptyBuilderState };
    let savedProgress = false;
    try {
      const saved = localStorage.getItem(BUILDER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<BuilderState>;
        next = {
          ...next,
          ...parsed,
          goals: Array.isArray(parsed.goals) ? parsed.goals.filter(Boolean).slice(0, 2) : [],
          sensitiveReviewAcknowledged: Boolean(parsed.sensitiveReviewAcknowledged),
        };
        savedProgress = hasProgress(next);
      }
    } catch {
      next = { ...emptyBuilderState };
    }

    // URL params fill only fields the visitor hasn't already set.
    const paramIndustry = searchParams.get("industry");
    const paramGoal = searchParams.get("goal");
    const paramChannel = searchParams.get("channel");
    if (paramIndustry && !next.industry && builderIndustries.includes(paramIndustry)) {
      next.industry = paramIndustry;
    }
    if (paramGoal && next.goals.length === 0 && builderGoals.includes(paramGoal)) {
      next.goals = [paramGoal];
    }
    if (paramChannel && !next.channel && builderChannels.some((c) => c.name === paramChannel)) {
      next.channel = paramChannel;
    }

    // Async so the hydration-boundary load doesn't cascade renders.
    const task = window.setTimeout(() => {
      setState(next);
      setResumeOffered(savedProgress);
      setLoaded(true);
    }, 0);
    trackEvent("agent_builder_started", {
      source: paramIndustry || paramGoal || paramChannel ? "preselected" : "direct",
      resumed: savedProgress,
    });
    return () => window.clearTimeout(task);
  }, [searchParams]);

  /* ---- autosave ---- */
  useEffect(() => {
    if (loaded) {
      localStorage.setItem(BUILDER_STORAGE_KEY, JSON.stringify(state));
    }
  }, [loaded, state]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  const readiness = useMemo(() => computeReadiness(state), [state]);
  const blueprint = useMemo(() => buildBlueprint(state), [state]);

  /* ---- step completion + gating ---- */
  const stepComplete = useMemo(
    () => [
      Boolean(state.industry),
      state.goals.length > 0,
      Boolean(state.channel),
      Boolean(state.voice),
      Boolean(state.businessName.trim() && state.offering.trim() && state.nextAction.trim()),
      true, // knowledge & guardrails is skippable
      true, // preview has no inputs
      false, // save completes by leaving the page
    ],
    [state]
  );

  // A step is reachable if every *required* step before it is complete.
  const maxReachable = useMemo(() => {
    for (let i = 0; i < stepComplete.length - 1; i += 1) {
      if (!stepComplete[i]) return i;
    }
    return stepComplete.length - 1;
  }, [stepComplete]);

  const goTo = useCallback(
    (target: number, direction: "forward" | "back" = "forward", force = false) => {
      const clamped = Math.max(0, Math.min(stepTitles.length - 1, target));
      // `force` bypasses the gate when the advancing step just satisfied its
      // own dependency (the closure's maxReachable is one render stale).
      if (!force && clamped > maxReachable) return;
      setStep(clamped);
      if (direction === "back") {
        trackEvent("builder_step_back", { step: stepShortLabels[clamped], index: clamped + 1 });
      }
      window.requestAnimationFrame(() => headingRef.current?.focus());
      if (clamped === 6) {
        trackEvent("agent_preview_viewed", {
          readiness_band: readiness.total >= 80 ? "high" : readiness.total >= 50 ? "mid" : "low",
          source: "builder",
        });
      }
    },
    [maxReachable, readiness.total]
  );

  function completeAndAdvance(current: number) {
    trackEvent("builder_step_completed", {
      step: stepShortLabels[current],
      step_index: current + 1,
    });
    goTo(current + 1, "forward", true);
  }

  /* ---- selection handlers ---- */
  function chooseSingle(field: "industry" | "channel" | "voice", value: string, currentStep: number) {
    setState((prev) => ({ ...prev, [field]: value }));
    if (field === "industry") {
      trackEvent("industry_selected", { industry: value, surface: "builder" });
    }
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => completeAndAdvance(currentStep), AUTO_ADVANCE_MS);
  }

  function toggleGoal(goal: string) {
    setSecondaryReplaced("");
    setState((prev) => {
      const selected = prev.goals.includes(goal);
      if (selected) {
        return { ...prev, goals: prev.goals.filter((g) => g !== goal) };
      }
      if (prev.goals.length < 2) {
        return { ...prev, goals: [...prev.goals, goal] };
      }
      // Third selection replaces the optional secondary — with visible feedback.
      setSecondaryReplaced(prev.goals[1]);
      return { ...prev, goals: [prev.goals[0], goal] };
    });
  }

  function update<K extends keyof BuilderState>(field: K, value: BuilderState[K]) {
    setState((prev) => ({ ...prev, [field]: value }));
  }

  function startOver() {
    localStorage.removeItem(BUILDER_STORAGE_KEY);
    setState({ ...emptyBuilderState });
    setStep(0);
    setResumeOffered(false);
    trackEvent("builder_step_skipped", { step: "start_over" });
  }

  function skipKnowledge() {
    trackEvent("builder_step_skipped", { step: "Knowledge", step_index: 6 });
    goTo(6);
  }

  if (!loaded) {
    return (
      <div aria-busy="true" className="grid gap-4">
        <div className="h-8 w-2/3 animate-pulse rounded-md bg-surface-1" />
        <div className="h-40 animate-pulse rounded-md bg-surface-1" />
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
      <div>
        {/* Progress header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="font-mono text-xs uppercase tracking-wide text-ink-3">
            Step {step + 1} of {stepTitles.length} · {stepShortLabels[step]}
          </div>
          <div className="font-mono text-xs text-ink-3">autosaved</div>
        </div>
        <div
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={stepTitles.length}
          aria-label={`Builder progress: step ${step + 1} of ${stepTitles.length}`}
          className="mt-3 flex gap-1"
        >
          {stepTitles.map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                index < step ? "bg-bamboo-deep" : index === step ? "bg-bamboo" : "bg-surface-2"
              )}
            />
          ))}
        </div>

        {/* Step navigation (completed steps reachable, future gated) */}
        <nav aria-label="Builder steps" className="mt-4 flex flex-wrap gap-1.5">
          {stepShortLabels.map((label, index) => {
            const reachable = index <= maxReachable;
            const active = index === step;
            return (
              <button
                key={label}
                type="button"
                disabled={!reachable}
                aria-current={active ? "step" : undefined}
                onClick={() => goTo(index, index < step ? "back" : "forward")}
                className={cn(
                  "h-8 rounded-md px-2.5 font-mono text-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "bg-bamboo/15 text-bamboo"
                    : reachable
                      ? "text-ink-3 hover:bg-surface-1 hover:text-ink-1"
                      : "cursor-not-allowed text-ink-3/40"
                )}
              >
                {index + 1} {label}
              </button>
            );
          })}
        </nav>

        {/* Resume banner */}
        {resumeOffered ? (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-bamboo-deep/40 bg-bamboo/8 px-4 py-3">
            <p className="text-sm text-ink-1">
              Resume your blueprint — your earlier answers are still here.
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                className="h-9 bg-bamboo font-semibold text-primary-foreground hover:bg-bamboo/90"
                onClick={() => {
                  setResumeOffered(false);
                  goTo(maxReachable);
                }}
              >
                Continue
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-9 border-line-strong text-ink-2 hover:text-ink-1"
                onClick={startOver}
              >
                Start over
              </Button>
            </div>
          </div>
        ) : null}

        {isDev ? <DevPresetBar onFill={(preset) => setState(preset)} /> : null}

        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-8 font-heading text-[clamp(1.75rem,3.5vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-1 outline-none"
        >
          {stepTitles[step]}
        </h1>

        <div className="mt-6">
          {step === 0 ? (
            <ChoiceGrid
              options={builderIndustries.map((name) => ({ name }))}
              selected={state.industry ? [state.industry] : []}
              onSelect={(value) => chooseSingle("industry", value, 0)}
              columns={3}
            />
          ) : null}

          {step === 1 ? (
            <div>
              <p className="text-sm leading-6 text-ink-2">
                Choose one primary outcome — it decides the agent&apos;s qualification logic and
                greeting. Add one optional secondary if the workflow truly has two jobs.
              </p>
              <div className="mt-5">
                <ChoiceGrid
                  options={builderGoals.map((name) => ({ name }))}
                  selected={state.goals}
                  onSelect={toggleGoal}
                  columns={2}
                  badges={(name) =>
                    state.goals[0] === name ? "Primary" : state.goals[1] === name ? "Secondary" : undefined
                  }
                />
              </div>
              <div aria-live="polite" className="mt-3 min-h-5 text-sm text-signal-amber">
                {secondaryReplaced
                  ? `Replaced "${secondaryReplaced}" as your optional secondary outcome.`
                  : null}
              </div>
              <StepFooter
                onBack={() => goTo(0, "back")}
                onContinue={() => completeAndAdvance(1)}
                continueDisabled={state.goals.length === 0}
                continueLabel="Continue"
              />
            </div>
          ) : null}

          {step === 2 ? (
            <ChoiceGrid
              options={builderChannels.map((channel) => ({ name: channel.name, note: channel.note }))}
              selected={state.channel ? [state.channel] : []}
              onSelect={(value) => chooseSingle("channel", value, 2)}
              columns={2}
              backSlot={<BackLink onClick={() => goTo(1, "back")} />}
            />
          ) : null}

          {step === 3 ? (
            <ChoiceGrid
              options={builderVoices.map((voice) => ({ name: voice.name, note: `“${voice.sample}”` }))}
              selected={state.voice ? [state.voice] : []}
              onSelect={(value) => chooseSingle("voice", value, 3)}
              columns={1}
              backSlot={<BackLink onClick={() => goTo(2, "back")} />}
            />
          ) : null}

          {step === 4 ? (
            <ContextStep
              state={state}
              update={update}
              onBack={() => goTo(3, "back")}
              onContinue={() => completeAndAdvance(4)}
            />
          ) : null}

          {step === 5 ? (
            <KnowledgeStep
              state={state}
              update={update}
              onBack={() => goTo(4, "back")}
              onContinue={() => completeAndAdvance(5)}
              onSkip={skipKnowledge}
            />
          ) : null}

          {step === 6 ? (
            <PreviewStep
              blueprint={blueprint}
              readiness={readiness}
              onJump={(target) => goTo(target - 1, "back")}
              onBack={() => goTo(5, "back")}
              onContinue={() => completeAndAdvance(6)}
            />
          ) : null}

          {step === 7 ? (
            <SaveStep
              state={state}
              onBack={() => goTo(6, "back")}
              onSaved={(lead) => {
                const saved: SavedAgent = {
                  blueprint,
                  state,
                  readiness,
                  lead,
                  savedAt: new Date().toISOString(),
                };
                localStorage.setItem(AGENT_STORAGE_KEY, JSON.stringify(saved));
                trackEvent("agent_blueprint_saved", {
                  readiness_band: readiness.total >= 80 ? "high" : readiness.total >= 50 ? "mid" : "low",
                  workflow: state.goals[0] ?? "",
                  industry: state.industry,
                });
                router.push("/agent-created");
              }}
            />
          ) : null}
        </div>
      </div>

      {/* Live blueprint rail */}
      <BlueprintRail state={state} readinessTotal={readiness.total} />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function DevPresetBar({ onFill }: { onFill: (state: BuilderState) => void }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 rounded-md border border-signal-amber/40 bg-signal-amber/8 px-4 py-2.5">
      <span className="font-mono text-xs text-signal-amber">dev only</span>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-8 border-line-strong text-xs text-ink-2"
        onClick={() =>
          onFill({
            industry: "Sales",
            goals: ["Capture and qualify leads", "Book appointments"],
            channel: "Website chat",
            voice: "Helpful expert",
            businessName: "Bamboo Demo Co",
            offering: "Inbound sales automation for growing service teams.",
            idealCustomer: "10–50 person teams with inbound volume",
            qualificationRules: "Qualify on team size, urgency, and CRM in use.",
            nextAction: "Book a demo on the sales calendar",
            website: "https://mybamboo.ai",
            knowledgeNotes: "Homepage, pricing page, FAQ, demo booking rules.",
            excludedTopics: "Legal advice, competitor pricing claims",
            handoffCondition: "Frustrated tone, enterprise security questions, or low confidence",
            sensitiveReviewAcknowledged: true,
          })
        }
      >
        Fill demo data
      </Button>
    </div>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-ink-3 transition-colors hover:text-ink-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <ArrowLeft aria-hidden className="size-4" />
      Back
    </button>
  );
}

function StepFooter({
  onBack,
  onContinue,
  continueDisabled,
  continueLabel,
  skipSlot,
}: {
  onBack: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueLabel: string;
  skipSlot?: React.ReactNode;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <BackLink onClick={onBack} />
      <Button
        type="button"
        disabled={continueDisabled}
        onClick={onContinue}
        className="h-12 rounded-md bg-bamboo px-6 font-semibold text-primary-foreground hover:bg-bamboo/90 disabled:opacity-40"
      >
        {continueLabel}
        <ArrowRight aria-hidden className="size-4" />
      </Button>
      {skipSlot}
    </div>
  );
}

function ChoiceGrid({
  options,
  selected,
  onSelect,
  columns,
  badges,
  backSlot,
}: {
  options: { name: string; note?: string }[];
  selected: string[];
  onSelect: (value: string) => void;
  columns: 1 | 2 | 3;
  badges?: (name: string) => string | undefined;
  backSlot?: React.ReactNode;
}) {
  return (
    <div>
      <div
        role="radiogroup"
        className={cn(
          "grid gap-2.5",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
          columns === 2 && "sm:grid-cols-2"
        )}
      >
        {options.map((option) => {
          const active = selected.includes(option.name);
          const badge = badges?.(option.name);
          return (
            <button
              key={option.name}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(option.name)}
              className={cn(
                "min-h-12 rounded-md border px-4 py-3 text-left transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-bamboo bg-bamboo/10"
                  : "border-line-strong hover:border-bamboo-deep"
              )}
            >
              <span className="flex items-center justify-between gap-3">
                <span className={cn("text-sm font-medium", active ? "text-bamboo" : "text-ink-1")}>
                  {option.name}
                </span>
                {badge ? (
                  <span className="rounded-full bg-bamboo px-2 py-0.5 font-mono text-[10px] font-semibold text-primary-foreground">
                    {badge}
                  </span>
                ) : active ? (
                  <Check aria-hidden className="size-4 shrink-0 text-bamboo" />
                ) : null}
              </span>
              {option.note ? (
                <span className="mt-1.5 block text-xs leading-5 text-ink-3">{option.note}</span>
              ) : null}
            </button>
          );
        })}
      </div>
      {backSlot ? <div className="mt-6">{backSlot}</div> : null}
    </div>
  );
}

/* ---- Step 5: business context ---- */

function ContextStep({
  state,
  update,
  onBack,
  onContinue,
}: {
  state: BuilderState;
  update: <K extends keyof BuilderState>(field: K, value: BuilderState[K]) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const [attempted, setAttempted] = useState(false);
  const nameInvalid = attempted && !state.businessName.trim();
  const offeringInvalid = attempted && !state.offering.trim();
  const nextActionInvalid = attempted && !state.nextAction.trim();
  const valid = Boolean(state.businessName.trim() && state.offering.trim() && state.nextAction.trim());

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
        if (!valid) {
          const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
          firstInvalid?.focus();
          return;
        }
        onContinue();
      }}
      noValidate
    >
      <FormField
        id="business-name"
        label="Business name"
        required
        error={nameInvalid ? "Add the business name — it appears in the greeting." : undefined}
      >
        <Input
          id="business-name"
          value={state.businessName}
          autoComplete="organization"
          aria-invalid={nameInvalid || undefined}
          aria-describedby={nameInvalid ? "business-name-error" : undefined}
          onChange={(event) => update("businessName", event.target.value)}
          className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
          placeholder="Ridgeline Roofing"
        />
      </FormField>
      <FormField
        id="offering"
        label="What does the business sell or provide?"
        required
        hint="One or two sentences, e.g. “Commercial roofing installation and repair across the Portland metro.”"
        error={offeringInvalid ? "Describe the offer — the agent can't answer questions without it." : undefined}
      >
        <Textarea
          id="offering"
          value={state.offering}
          aria-invalid={offeringInvalid || undefined}
          aria-describedby={offeringInvalid ? "offering-error" : "offering-hint"}
          onChange={(event) => update("offering", event.target.value)}
          className="min-h-24 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
          placeholder="What you do, for whom, and where."
        />
      </FormField>
      <FormField
        id="ideal-customer"
        label="Ideal customer"
        hint="Optional — sharpens qualification, e.g. “building owners and property managers, not homeowners.”"
      >
        <Input
          id="ideal-customer"
          value={state.idealCustomer}
          aria-describedby="ideal-customer-hint"
          onChange={(event) => update("idealCustomer", event.target.value)}
          className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
          placeholder="Who the best conversations come from"
        />
      </FormField>
      <FormField
        id="qualification-rules"
        label="Qualification rules"
        hint="Optional — what makes a lead worth a human's time? Budget floor, service area, timeline…"
      >
        <Textarea
          id="qualification-rules"
          value={state.qualificationRules}
          aria-describedby="qualification-rules-hint"
          onChange={(event) => update("qualificationRules", event.target.value)}
          className="min-h-20 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
          placeholder="e.g. Jobs under $5k route to the standard queue; commercial projects go straight to Sam."
        />
      </FormField>
      <FormField
        id="next-action"
        label="Desired next action"
        required
        hint="Where should a qualified conversation land? A calendar, an inbox, a phone call…"
        error={nextActionInvalid ? "Set the next action — it's the destination the agent routes to." : undefined}
      >
        <Input
          id="next-action"
          value={state.nextAction}
          aria-invalid={nextActionInvalid || undefined}
          aria-describedby={nextActionInvalid ? "next-action-error" : "next-action-hint"}
          onChange={(event) => update("nextAction", event.target.value)}
          className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
          placeholder="Book an estimate call on our calendar"
        />
      </FormField>
      <div className="flex flex-wrap items-center gap-3">
        <BackLink onClick={onBack} />
        <Button
          type="submit"
          className="h-12 rounded-md bg-bamboo px-6 font-semibold text-primary-foreground hover:bg-bamboo/90"
        >
          Continue
          <ArrowRight aria-hidden className="size-4" />
        </Button>
      </div>
    </form>
  );
}

/* ---- Step 6: knowledge & guardrails ---- */

function KnowledgeStep({
  state,
  update,
  onBack,
  onContinue,
  onSkip,
}: {
  state: BuilderState;
  update: <K extends keyof BuilderState>(field: K, value: BuilderState[K]) => void;
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}) {
  const [attempted, setAttempted] = useState(false);
  const urlInvalid = !isValidUrl(state.website);

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setAttempted(true);
        if (urlInvalid) {
          document.getElementById("website")?.focus();
          return;
        }
        onContinue();
      }}
    >
      <FormField
        id="website"
        label="Website URL"
        hint="Optional — the fastest way to give the agent approved source material."
        error={attempted && urlInvalid ? "That doesn't look like a URL. Try something like ridgelineroofing.com." : undefined}
      >
        <Input
          id="website"
          type="url"
          inputMode="url"
          autoComplete="url"
          value={state.website}
          aria-invalid={(attempted && urlInvalid) || undefined}
          aria-describedby={attempted && urlInvalid ? "website-error" : "website-hint"}
          onChange={(event) => update("website", event.target.value)}
          className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
          placeholder="https://yourbusiness.com"
        />
      </FormField>
      <FormField
        id="knowledge-notes"
        label="Knowledge sources or approved answers"
        hint="Links, FAQ notes, policies — whatever the agent may answer from."
      >
        <Textarea
          id="knowledge-notes"
          value={state.knowledgeNotes}
          aria-describedby="knowledge-notes-hint"
          onChange={(event) => update("knowledgeNotes", event.target.value)}
          className="min-h-24 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
          placeholder="Paste FAQ links, help docs, or a short list of approved answers."
        />
      </FormField>
      <FormField
        id="excluded-topics"
        label="Topics the agent must not answer"
        hint="e.g. pricing negotiations, legal questions, medical advice."
      >
        <Input
          id="excluded-topics"
          value={state.excludedTopics}
          aria-describedby="excluded-topics-hint"
          onChange={(event) => update("excludedTopics", event.target.value)}
          className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
          placeholder="Topics that always go to a human"
        />
      </FormField>
      <FormField
        id="handoff-condition"
        label="Human handoff condition"
        hint="When should a person take over? Topic, urgency, tone, or low confidence."
      >
        <Input
          id="handoff-condition"
          value={state.handoffCondition}
          aria-describedby="handoff-condition-hint"
          onChange={(event) => update("handoffCondition", event.target.value)}
          className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
          placeholder="e.g. Any frustrated customer or anything about refunds"
        />
      </FormField>
      <label className="flex cursor-pointer items-start gap-3 rounded-md border border-line-strong px-4 py-3.5 transition-colors has-[:checked]:border-bamboo">
        <input
          type="checkbox"
          checked={state.sensitiveReviewAcknowledged}
          onChange={(event) => update("sensitiveReviewAcknowledged", event.target.checked)}
          className="mt-0.5 size-4 accent-[var(--bamboo)]"
        />
        <span className="text-sm leading-6 text-ink-2">
          I understand that sensitive workflows (medical, legal, financial, urgent) need human
          review before this agent goes live.
        </span>
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <BackLink onClick={onBack} />
        <Button
          type="submit"
          className="h-12 rounded-md bg-bamboo px-6 font-semibold text-primary-foreground hover:bg-bamboo/90"
        >
          Continue
          <ArrowRight aria-hidden className="size-4" />
        </Button>
        <button
          type="button"
          onClick={onSkip}
          className="h-11 rounded-md px-2 text-sm text-ink-3 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Skip for now — lowers readiness
        </button>
      </div>
    </form>
  );
}

/* ---- Step 7: blueprint preview ---- */

function PreviewStep({
  blueprint,
  readiness,
  onJump,
  onBack,
  onContinue,
}: {
  blueprint: ReturnType<typeof buildBlueprint>;
  readiness: ReturnType<typeof computeReadiness>;
  onJump: (step: number) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const [copied, setCopied] = useState<"greeting" | "summary" | null>(null);

  async function copy(kind: "greeting" | "summary") {
    const text =
      kind === "greeting"
        ? blueprint.greeting
        : [
            `${blueprint.agentName} — ${blueprint.role}`,
            `Objective: ${blueprint.objective}`,
            `Greeting: ${blueprint.greeting}`,
            `Knowledge: ${blueprint.knowledgeSummary}`,
            `Escalation: ${blueprint.escalation}`,
            `Destination: ${blueprint.destination}`,
          ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard unavailable — no toast needed, the button state simply doesn't change.
    }
  }

  return (
    <div className="grid gap-7">
      <div className="grid gap-5 rounded-lg border border-line bg-bg-1 p-5 md:p-6">
        <div>
          <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Agent</div>
          <h2 className="mt-1 font-heading text-2xl font-semibold tracking-[-0.02em] text-ink-1">
            {blueprint.agentName}
          </h2>
          <p className="mt-1 text-sm text-ink-2">{blueprint.role}</p>
        </div>
        <BlueprintField label="Primary objective" value={blueprint.objective} />
        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Greeting</div>
            <CopyButton copied={copied === "greeting"} onClick={() => copy("greeting")} label="Copy greeting" />
          </div>
          <p className="mt-1.5 border-l-2 border-bamboo-deep pl-3 text-sm leading-6 text-ink-1">
            {blueprint.greeting}
          </p>
        </div>
        <BlueprintField label="Approved knowledge" value={blueprint.knowledgeSummary} />
        <div>
          <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Qualification questions</div>
          <ul className="mt-1.5 grid gap-1">
            {blueprint.qualificationQuestions.map((question) => (
              <li key={question} className="text-sm leading-6 text-ink-2">
                — {question}
              </li>
            ))}
          </ul>
        </div>
        <BlueprintField label="Information captured" value={blueprint.captured.join(" · ")} />
        <div>
          <div className="font-mono text-xs uppercase tracking-wide text-ink-3">Guardrails</div>
          <ul className="mt-1.5 grid gap-1">
            {blueprint.guardrails.map((guardrail) => (
              <li key={guardrail} className="text-sm leading-6 text-ink-2">
                — {guardrail}
              </li>
            ))}
          </ul>
        </div>
        <BlueprintField label="Escalation rule" value={blueprint.escalation} />
        <BlueprintField label="Destination" value={blueprint.destination} />
        <div className="flex justify-end">
          <CopyButton copied={copied === "summary"} onClick={() => copy("summary")} label="Copy full summary" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-heading text-lg font-semibold tracking-[-0.015em] text-ink-1">
            Readiness — {readiness.total}%
          </h3>
          <span className="font-mono text-xs text-ink-3">select a category to close its gap</span>
        </div>
        <div className="mt-4 grid gap-2">
          {readiness.categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onJump(category.step)}
              className="grid grid-cols-[110px_1fr_44px] items-center gap-4 rounded-md border border-line px-4 py-3 text-left transition-colors hover:border-bamboo-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`${category.label}: ${category.score}%. ${category.missing[0] ?? "Complete."} Opens step ${category.step}.`}
            >
              <span className="text-sm font-medium text-ink-1">{category.label}</span>
              <span className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                <span
                  className={cn(
                    "block h-full rounded-full transition-[width] duration-500",
                    category.score >= 100 ? "bg-bamboo" : category.score >= 50 ? "bg-bamboo-deep" : "bg-signal-amber"
                  )}
                  style={{ width: `${Math.max(4, category.score)}%` }}
                />
              </span>
              <span className="text-right font-mono text-xs text-ink-2">{category.score}%</span>
              {category.missing.length > 0 ? (
                <span className="col-span-3 text-xs leading-5 text-ink-3">{category.missing[0]}</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {blueprint.launchChecklist.length > 0 ? (
        <div className="rounded-md border border-signal-amber/35 bg-signal-amber/6 px-4 py-3.5">
          <div className="font-mono text-xs uppercase tracking-wide text-signal-amber">Launch checklist</div>
          <ul className="mt-2 grid gap-1">
            {blueprint.launchChecklist.map((item) => (
              <li key={item} className="text-sm leading-6 text-ink-2">
                — {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <StepFooter onBack={onBack} onContinue={onContinue} continueLabel="Save this blueprint" />
    </div>
  );
}

function BlueprintField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-wide text-ink-3">{label}</div>
      <p className="mt-1.5 text-sm leading-6 text-ink-1">{value}</p>
    </div>
  );
}

function CopyButton({
  copied,
  onClick,
  label,
}: {
  copied: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center gap-1.5 rounded-md border border-line-strong px-3 text-xs font-medium text-ink-2 transition-colors hover:border-bamboo-deep hover:text-ink-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {copied ? <Check aria-hidden className="size-3.5 text-bamboo" /> : <Copy aria-hidden className="size-3.5" />}
      {copied ? "Copied" : label}
    </button>
  );
}

/* ---- Step 8: save blueprint ---- */

type LeadFields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  industry: string;
};

function SaveStep({
  state,
  onBack,
  onSaved,
}: {
  state: BuilderState;
  onBack: () => void;
  onSaved: (lead: LeadFields) => void;
}) {
  const [lead, setLead] = useState<LeadFields>({
    name: "",
    email: "",
    phone: "",
    company: state.businessName,
    website: state.website,
    industry: state.industry,
  });
  const [attempted, setAttempted] = useState(false);
  const [pending, setPending] = useState(false);
  const started = useRef(false);

  function update(field: keyof LeadFields, value: string) {
    if (!started.current) {
      started.current = true;
      trackEvent("lead_form_started", { source: "builder_save_step" });
    }
    setLead((prev) => ({ ...prev, [field]: value }));
  }

  const nameInvalid = attempted && !lead.name.trim();
  const emailInvalid = attempted && !emailPattern.test(lead.email.trim());

  return (
    <form
      className="grid gap-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (pending) return;
        setAttempted(true);
        if (!lead.name.trim() || !emailPattern.test(lead.email.trim())) {
          const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
          firstInvalid?.focus();
          return;
        }
        setPending(true);
        trackEvent("lead_form_submitted", {
          source: "builder_save_step",
          industry: lead.industry,
          workflow: state.goals[0] ?? "",
        });
        // Persistence is local in this build; the save path is structured so a
        // server action or CRM call can replace it without UI changes.
        onSaved(lead);
      }}
    >
      <p className="text-sm leading-6 text-ink-2">
        Your blueprint stays exactly as you built it. Saving attaches it to your contact details
        so the strategy call starts from the real thing.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="lead-name" label="Name" required error={nameInvalid ? "Your name is required." : undefined}>
          <Input
            id="lead-name"
            value={lead.name}
            autoComplete="name"
            aria-invalid={nameInvalid || undefined}
            aria-describedby={nameInvalid ? "lead-name-error" : undefined}
            onChange={(event) => update("name", event.target.value)}
            className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
            placeholder="Jordan Lee"
          />
        </FormField>
        <FormField
          id="lead-email"
          label="Work email"
          required
          error={emailInvalid ? "Enter a valid email — it's where the blueprint lives." : undefined}
        >
          <Input
            id="lead-email"
            type="email"
            autoComplete="email"
            value={lead.email}
            aria-invalid={emailInvalid || undefined}
            aria-describedby={emailInvalid ? "lead-email-error" : undefined}
            onChange={(event) => update("email", event.target.value)}
            className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
            placeholder="jordan@company.com"
          />
        </FormField>
        <FormField id="lead-phone" label="Phone">
          <Input
            id="lead-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={lead.phone}
            onChange={(event) => update("phone", event.target.value)}
            className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
            placeholder="(555) 019-4432"
          />
        </FormField>
        <FormField id="lead-company" label="Company">
          <Input
            id="lead-company"
            autoComplete="organization"
            value={lead.company}
            onChange={(event) => update("company", event.target.value)}
            className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
            placeholder="Company"
          />
        </FormField>
        <FormField id="lead-website" label="Website">
          <Input
            id="lead-website"
            type="url"
            inputMode="url"
            value={lead.website}
            onChange={(event) => update("website", event.target.value)}
            className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
            placeholder="https://company.com"
          />
        </FormField>
        <FormField id="lead-industry" label="Industry">
          <Input
            id="lead-industry"
            value={lead.industry}
            onChange={(event) => update("industry", event.target.value)}
            className="h-12 border-line-strong bg-surface-1 text-ink-1 placeholder:text-ink-3"
            placeholder="Industry"
          />
        </FormField>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <BackLink onClick={onBack} />
        <Button
          type="submit"
          disabled={pending}
          className="h-12 min-w-56 rounded-md bg-bamboo px-6 font-semibold text-primary-foreground hover:bg-bamboo/90"
        >
          {pending ? "Saving…" : "Save My Agent Blueprint"}
        </Button>
      </div>
      <p aria-live="polite" className="sr-only">
        {pending ? "Saving your blueprint" : ""}
      </p>
    </form>
  );
}

function FormField({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-ink-2">
        {label}
        {required ? <span className="text-bamboo"> *</span> : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs leading-5 text-signal-coral">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs leading-5 text-ink-3">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* ---- Live blueprint rail ---- */

function BlueprintRail({ state, readinessTotal }: { state: BuilderState; readinessTotal: number }) {
  const rows: [string, string][] = [
    ["Industry", state.industry || "—"],
    ["Primary outcome", state.goals[0] || "—"],
    ["Secondary", state.goals[1] || "—"],
    ["Channel", state.channel || "—"],
    ["Voice", state.voice || "—"],
    ["Business", state.businessName || "—"],
    ["Next action", state.nextAction || "—"],
  ];

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Live blueprint">
      <div className="rounded-lg border border-line bg-bg-1 p-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-wide text-ink-3">Live blueprint</span>
          <span className="font-mono text-sm text-bamboo">{readinessTotal}%</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden>
          <div
            className="h-full rounded-full bg-bamboo transition-[width] duration-500"
            style={{ width: `${Math.max(3, readinessTotal)}%` }}
          />
        </div>
        <dl className="mt-5 grid gap-2.5">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line pb-2 last:border-b-0 last:pb-0">
              <dt className="text-xs text-ink-3">{label}</dt>
              <dd
                className={cn(
                  "max-w-[60%] truncate text-right text-xs font-medium",
                  value === "—" ? "text-ink-3" : "text-ink-1"
                )}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
