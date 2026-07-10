"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  Globe2,
  MessageSquareText,
  Radio,
  Sparkles,
  UserRound,
  WandSparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { builderChoices } from "@/data/funnel";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { LeadCaptureForm } from "@/components/funnel/forms";

type BuilderState = {
  industry: string;
  goals: string[];
  channel: string;
  voice: string;
  businessName: string;
  businessInfo: string;
  website: string;
  knowledgeSource: string;
};

const storageKey = "bamboo-agent-builder";

const defaults: BuilderState = {
  industry: "",
  goals: [],
  channel: "",
  voice: "",
  businessName: "",
  businessInfo: "",
  website: "",
  knowledgeSource: "",
};

const demoPreset: BuilderState = {
  industry: "Sales",
  goals: ["Capture and qualify leads", "Book appointments"],
  channel: "Website chat",
  voice: "Helpful expert",
  businessName: "Bamboo Demo Co",
  businessInfo:
    "We help growing teams automate inbound sales and support conversations. The agent should qualify company size, urgency, and the workflow they want to automate.",
  website: "https://mybamboo.ai",
  knowledgeSource:
    "Use the homepage, pricing page, FAQ, customer support notes, and demo booking rules as approved knowledge sources.",
};

const steps = [
  { id: "industry", title: "Choose industry", icon: Building2 },
  { id: "goals", title: "Choose 1-2 goals", icon: WandSparkles },
  { id: "channel", title: "Choose channel", icon: Radio },
  { id: "voice", title: "Choose voice", icon: UserRound },
  { id: "business", title: "Add business info", icon: Building2 },
  { id: "knowledge", title: "Add knowledge source", icon: Globe2 },
  { id: "preview", title: "Preview agent", icon: Bot },
  { id: "lead", title: "Create account", icon: CheckCircle2 },
];

type StepId = (typeof steps)[number]["id"];

const stepDefaults: Record<StepId, Partial<BuilderState>> = {
  industry: { industry: demoPreset.industry },
  goals: { goals: demoPreset.goals },
  channel: { channel: demoPreset.channel },
  voice: { voice: demoPreset.voice },
  business: {
    businessName: demoPreset.businessName,
    businessInfo: demoPreset.businessInfo,
  },
  knowledge: {
    website: demoPreset.website,
    knowledgeSource: demoPreset.knowledgeSource,
  },
  preview: {},
  lead: {},
};

function normalizeSavedState(saved: string): BuilderState {
  const parsed = JSON.parse(saved) as Partial<BuilderState> & { goal?: string };

  return {
    ...defaults,
    ...parsed,
    goals: Array.isArray(parsed.goals)
      ? parsed.goals.filter(Boolean).slice(0, 2)
      : parsed.goal
        ? [parsed.goal]
        : [],
  };
}

export function AgentBuilderWizard() {
  const router = useRouter();
  const [state, setState] = useState<BuilderState>(defaults);
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    window.setTimeout(() => {
      if (saved) {
        try {
          setState(normalizeSavedState(saved));
        } catch {
          setState(defaults);
        }
      }
      setLoaded(true);
    }, 0);
    trackEvent("agent_builder_started", { source: "free_agent_builder" });
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }, [loaded, state]);

  const readiness = useMemo(() => {
    const checks = [
      Boolean(state.industry),
      state.goals.length > 0,
      Boolean(state.channel),
      Boolean(state.voice),
      Boolean(state.businessName),
      Boolean(state.businessInfo),
      Boolean(state.website),
      Boolean(state.knowledgeSource),
    ];
    const filled = checks.filter(Boolean).length;
    return Math.min(100, 18 + filled * 10);
  }, [state]);

  const agent = useMemo(() => {
    const industry = state.industry || "your industry";
    const primaryGoal = state.goals[0] || "capture qualified conversations";
    const secondaryGoal = state.goals[1];
    const goalSummary = secondaryGoal
      ? `${primaryGoal.toLowerCase()} and ${secondaryGoal.toLowerCase()}`
      : primaryGoal.toLowerCase();
    const channel = state.channel || "Website chat";
    const voice = state.voice || "Helpful expert";
    const business = state.businessName || "Your business";

    return {
      name: `${business} ${primaryGoal.split(" ")[0]} Agent`,
      greeting: `Hi, I am the ${business} AI assistant. I can help you ${goalSummary} and connect you with the right next step.`,
      summary: `A ${voice.toLowerCase()} agent for ${industry.toLowerCase()} teams, designed for ${channel.toLowerCase()}.`,
      nextStep:
        readiness > 78
          ? "Ready for launch planning and integration mapping."
          : "Add more business details to improve launch readiness.",
    };
  }, [readiness, state]);

  function update(field: Exclude<keyof BuilderState, "goals">, value: string) {
    setState((current) => ({ ...current, [field]: value }));
  }

  function chooseSingle(field: "industry" | "channel" | "voice", value: string) {
    setState((current) => ({ ...current, [field]: value }));
    trackEvent(field === "industry" ? "industry_selected" : "builder_step_completed", {
      step: steps[step].id,
      value,
      index: step + 1,
    });
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function toggleGoal(goal: string) {
    setState((current) => {
      const alreadySelected = current.goals.includes(goal);
      const goals = alreadySelected
        ? current.goals.filter((item) => item !== goal)
        : [...current.goals, goal].slice(0, 2);

      return { ...current, goals };
    });
  }

  function fillDemoPreset(targetStep = step) {
    setState(demoPreset);
    setStep(targetStep);
    trackEvent("builder_step_skipped", { step: "demo_preset", index: targetStep + 1 });
  }

  function fillCurrentStepDefaults() {
    const currentStep = steps[step].id;
    const currentDefaults = stepDefaults[currentStep];

    setState((current) => {
      const next = { ...current };
      for (const [key, value] of Object.entries(currentDefaults) as [
        keyof BuilderState,
        BuilderState[keyof BuilderState],
      ][]) {
        if (key === "goals") {
          if (next.goals.length === 0 && Array.isArray(value)) {
            next.goals = value.slice(0, 2);
          }
          continue;
        }

        if (typeof value === "string" && typeof next[key] === "string" && !next[key].trim()) {
          next[key] = value as never;
        }
      }
      return next;
    });
  }

  function goNext() {
    fillCurrentStepDefaults();
    trackEvent("builder_step_completed", { step: steps[step].id, index: step + 1 });
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function goBack() {
    trackEvent("builder_step_back", { step: steps[step].id, index: step + 1 });
    setStep((current) => Math.max(current - 1, 0));
  }

  function skipStep() {
    const current = steps[step].id;
    fillCurrentStepDefaults();
    trackEvent("builder_step_skipped", { step: current, index: step + 1 });
    setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  const progress = Math.round(((step + 1) / steps.length) * 100);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_0.75fr]">
      <Card className="rounded-lg border-white/10 bg-white/[0.045] shadow-none">
        <CardContent className="p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge className="border-bamboo/25 bg-bamboo/10 text-bamboo hover:bg-bamboo/10">
                Step {step + 1} of {steps.length}
              </Badge>
              <h1 className="mt-4 font-heading text-balance text-3xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
                {steps[step].title}
              </h1>
            </div>
            <div className="min-w-40">
              <div className="mb-2 flex items-center justify-between text-xs text-white/56">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <ProgressBar value={progress} />
            </div>
          </div>

          <div className="mt-6 grid gap-4 rounded-lg border border-bamboo/20 bg-bamboo/10 p-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold text-white">Demo mode</p>
              <p className="mt-1 text-sm leading-6 text-white/64">
                You can click through normally, or preload sample data and still visit every step.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="h-10 border-bamboo/30 bg-black/20 text-white hover:bg-bamboo/10 hover:text-white"
                onClick={() => fillDemoPreset(step)}
              >
                <Sparkles aria-hidden className="size-4" />
                Fill Demo Data
              </Button>
              <Button
                type="button"
                className="h-10 bg-bamboo text-black hover:bg-bamboo/90"
                onClick={() => fillDemoPreset(6)}
              >
                Preview Demo Agent
              </Button>
            </div>
          </div>

          <StepRail currentStep={step} state={state} onStepChange={setStep} />

          <div className="mt-8">
            {step === 0 ? (
              <SingleChoiceGrid
                options={builderChoices.industries}
                selected={state.industry}
                onSelect={(value) => chooseSingle("industry", value)}
                prompt="Pick an industry to move to goals."
              />
            ) : null}
            {step === 1 ? (
              <GoalChoiceGrid
                options={builderChoices.goals}
                selected={state.goals}
                onToggle={toggleGoal}
                onContinue={goNext}
              />
            ) : null}
            {step === 2 ? (
              <SingleChoiceGrid
                options={builderChoices.channels}
                selected={state.channel}
                onSelect={(value) => chooseSingle("channel", value)}
                prompt="Pick the first channel. We will move you forward."
              />
            ) : null}
            {step === 3 ? (
              <SingleChoiceGrid
                options={builderChoices.voices}
                selected={state.voice}
                onSelect={(value) => chooseSingle("voice", value)}
                prompt="Pick the agent personality. Next is business info."
              />
            ) : null}
            {step === 4 ? (
              <div className="grid gap-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 border-white/10 bg-white/[0.035] text-white hover:bg-white/10 hover:text-white"
                    onClick={() =>
                      setState((current) => ({
                        ...current,
                        businessName: demoPreset.businessName,
                        businessInfo: demoPreset.businessInfo,
                      }))
                    }
                  >
                    Use Demo Business Info
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="business-name" className="text-white/72">
                    Business name
                  </Label>
                  <Input
                    id="business-name"
                    value={state.businessName}
                    onChange={(event) => update("businessName", event.target.value)}
                    className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/58"
                    placeholder="Bamboo Labs"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="business-info" className="text-white/72">
                    What should the agent know?
                  </Label>
                  <Textarea
                    id="business-info"
                    value={state.businessInfo}
                    onChange={(event) => update("businessInfo", event.target.value)}
                    className="min-h-32 border-white/10 bg-white/[0.06] text-white placeholder:text-white/58"
                    placeholder="Describe your offer, customers, key qualification rules, and what should happen after a good conversation."
                  />
                </div>
              </div>
            ) : null}
            {step === 5 ? (
              <div className="grid gap-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 border-white/10 bg-white/[0.035] text-white hover:bg-white/10 hover:text-white"
                    onClick={() =>
                      setState((current) => ({
                        ...current,
                        website: demoPreset.website,
                        knowledgeSource: demoPreset.knowledgeSource,
                      }))
                    }
                  >
                    Use Demo Knowledge
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website" className="text-white/72">
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={state.website}
                    onChange={(event) => update("website", event.target.value)}
                    className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/58"
                    placeholder="https://mybamboo.ai"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="knowledge" className="text-white/72">
                    Knowledge source
                  </Label>
                  <Textarea
                    id="knowledge"
                    value={state.knowledgeSource}
                    onChange={(event) => update("knowledgeSource", event.target.value)}
                    className="min-h-28 border-white/10 bg-white/[0.06] text-white placeholder:text-white/58"
                    placeholder="Paste FAQ links, help docs, policy notes, or a short list of approved answers."
                  />
                </div>
              </div>
            ) : null}
            {step === 6 ? (
              <div className="grid gap-5">
                <StepCard
                  active
                  icon={<Bot aria-hidden className="size-5" />}
                  title={agent.name}
                  description={agent.summary}
                  meta={`Readiness ${readiness}%`}
                />
                <div className="rounded-lg border border-white/10 bg-black/20 p-5">
                  <p className="text-xs font-medium text-white/54">
                    Preview greeting
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/68">{agent.greeting}</p>
                </div>
                <div className="rounded-lg border border-bamboo/20 bg-bamboo/10 p-5">
                  <p className="text-sm font-medium text-white">Launch note</p>
                  <p className="mt-2 text-sm leading-7 text-white/64">{agent.nextStep}</p>
                </div>
              </div>
            ) : null}
            {step === 7 ? (
              <div>
                <p className="mb-5 text-sm leading-7 text-white/68">
                  Save the draft and create a lead profile. The production app can send this to your CRM or account system.
                </p>
                <LeadCaptureForm
                  initial={{
                    company: state.businessName,
                    website: state.website,
                    industry: state.industry,
                  }}
                  demoLead={{
                    name: "Jordan Lee",
                    email: "jordan@bamboodemo.co",
                    phone: "(555) 019-4432",
                    company: state.businessName || demoPreset.businessName,
                    website: state.website || demoPreset.website,
                    industry: state.industry || demoPreset.industry,
                  }}
                  onSubmit={(lead) => {
                    localStorage.setItem(
                      "bamboo-agent",
                      JSON.stringify({ agent, state, readiness, lead })
                    );
                    router.push("/agent-created");
                  }}
                />
              </div>
            ) : null}
          </div>

          {step < 7 ? (
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 border-white/10 bg-white/[0.035] text-white hover:bg-white/10 hover:text-white"
                  onClick={goBack}
                  disabled={step === 0}
                >
                  <ArrowLeft aria-hidden className="size-4" />
                  Back
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-11 text-white/58 hover:bg-white/10 hover:text-white"
                  onClick={skipStep}
                >
                  Skip for now
                </Button>
              </div>
              <Button
                type="button"
                className="h-11 bg-bamboo text-black hover:bg-bamboo/90"
                onClick={goNext}
              >
                Continue
                <ArrowRight aria-hidden className="size-4" />
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <LivePreview agent={agent} readiness={readiness} state={state} />
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return <Progress value={value} className="h-2 bg-white/10 [&>div]:bg-bamboo" />;
}

function StepRail({
  currentStep,
  state,
  onStepChange,
}: {
  currentStep: number;
  state: BuilderState;
  onStepChange: (step: number) => void;
}) {
  const completed: Record<StepId, boolean> = {
    industry: Boolean(state.industry),
    goals: state.goals.length > 0,
    channel: Boolean(state.channel),
    voice: Boolean(state.voice),
    business: Boolean(state.businessName || state.businessInfo),
    knowledge: Boolean(state.website || state.knowledgeSource),
    preview: currentStep > 6,
    lead: false,
  };

  return (
    <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((item, index) => {
        const Icon = item.icon;
        const isActive = currentStep === index;
        const isComplete = completed[item.id];

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onStepChange(index)}
            className={cn(
              "flex min-h-14 items-center gap-3 rounded-lg border px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo/70",
              isActive
                ? "border-bamboo/45 bg-bamboo/10"
                : "border-white/10 bg-white/[0.03] hover:border-bamboo/30 hover:bg-white/[0.05]"
            )}
            aria-current={isActive ? "step" : undefined}
          >
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-md",
                isComplete ? "bg-bamboo text-black" : "bg-white/10 text-bamboo"
              )}
            >
              {isComplete ? <CheckCircle2 aria-hidden className="size-4" /> : <Icon aria-hidden className="size-4" />}
            </span>
            <span>
              <span className="block text-xs text-white/54">Step {index + 1}</span>
              <span className="block text-sm font-medium text-white">{item.title}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function StepCard({
  icon,
  title,
  description,
  meta,
  active,
  disabled,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  meta?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const className = cn(
    "w-full rounded-lg border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bamboo/70",
    active
      ? "border-bamboo/35 bg-bamboo/10"
      : "border-white/10 bg-white/[0.035] hover:border-bamboo/30 hover:bg-bamboo/10",
    disabled && "cursor-not-allowed opacity-45 hover:border-white/10 hover:bg-white/[0.035]"
  );
  const content = (
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-md",
            active ? "bg-bamboo text-black" : "bg-white/10 text-bamboo"
          )}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-white/64">{description}</p>
          {meta ? <p className="mt-3 text-xs font-medium text-bamboo">{meta}</p> : null}
        </div>
      </div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className} disabled={disabled}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}

function SingleChoiceGrid({
  options,
  selected,
  onSelect,
  prompt,
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  prompt: string;
}) {
  return (
    <div className="grid gap-4">
      <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/68">
        {selected ? `Selected: ${selected}. Choosing another option will move you forward.` : prompt}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <StepCard
            key={option}
            active={selected === option}
            onClick={() => onSelect(option)}
            icon={<Sparkles aria-hidden className="size-5" />}
            title={option}
            description="Select this and Bamboo will guide you to the next step."
          />
        ))}
      </div>
    </div>
  );
}

function GoalChoiceGrid({
  options,
  selected,
  onToggle,
  onContinue,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  onContinue: () => void;
}) {
  const maxSelected = selected.length >= 2;

  return (
    <div className="grid gap-4">
      <div className="rounded-lg border border-bamboo/20 bg-bamboo/10 p-4">
        <p className="text-sm font-semibold text-white">Select 1 or 2 goals.</p>
        <p className="mt-1 text-sm leading-6 text-white/68">
          {selected.length === 0
            ? "Pick your primary goal. You can add one more before continuing."
            : selected.length === 1
              ? "Good. Add one more goal or continue to channel."
              : "Two goals selected. Continue to channel when ready."}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = selected.includes(option);
          const disabled = maxSelected && !active;

          return (
            <StepCard
              key={option}
              active={active}
              disabled={disabled}
              onClick={() => onToggle(option)}
              icon={<Sparkles aria-hidden className="size-5" />}
              title={option}
              description={
                disabled
                  ? "Remove a selected goal before choosing this one."
                  : active
                    ? "Selected. Click again to remove it."
                    : "Add this as a goal for your agent."
              }
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-white/68">
          {selected.length > 0
            ? `Selected: ${selected.join(" + ")}`
            : "Choose at least one goal to keep going."}
        </div>
        <Button
          type="button"
          className="h-10 bg-bamboo text-black hover:bg-bamboo/90"
          onClick={onContinue}
          disabled={selected.length === 0}
        >
          Continue to Channel
          <ArrowRight aria-hidden className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function LivePreview({
  agent,
  readiness,
  state,
}: {
  agent: { name: string; greeting: string; summary: string; nextStep: string };
  readiness: number;
  state: BuilderState;
}) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <Card className="rounded-lg border-white/10 bg-[oklch(0.13_0.026_156/0.94)] py-0 shadow-none">
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-bamboo text-black">
                <Bot aria-hidden className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Live Preview</p>
                <p className="text-xs text-white/54">Autosaved locally</p>
              </div>
            </div>
            <Badge className="border-bamboo/25 bg-bamboo/10 text-bamboo hover:bg-bamboo/10">
              {readiness}%
            </Badge>
          </div>
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-white/56">
              <span>Readiness score</span>
              <span>{readiness}%</span>
            </div>
            <ProgressBar value={readiness} />
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <MessageSquareText aria-hidden className="size-4 text-bamboo" />
                {agent.name}
              </div>
              <p className="mt-3 text-sm leading-7 text-white/68">{agent.greeting}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-medium text-white/54">
                Configuration
              </p>
              <dl className="mt-4 grid gap-3 text-sm">
                <PreviewRow label="Industry" value={state.industry || "Choose industry"} />
                <PreviewRow
                  label="Goals"
                  value={state.goals.length > 0 ? state.goals.join(" + ") : "Choose 1-2 goals"}
                />
                <PreviewRow label="Channel" value={state.channel || "Choose channel"} />
                <PreviewRow label="Voice" value={state.voice || "Choose voice"} />
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-white/56">{label}</dt>
      <dd className="text-right font-medium text-white/72">{value}</dd>
    </div>
  );
}
