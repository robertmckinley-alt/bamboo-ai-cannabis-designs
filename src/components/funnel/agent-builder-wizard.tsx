"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  LockKeyhole,
  MessageSquareText,
  Radio,
  Save,
  ShieldCheck,
  UserRound,
  WandSparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  offer: string;
  idealCustomer: string;
  qualificationRules: string;
  desiredAction: string;
  website: string;
  knowledgeSource: string;
  blockedTopics: string;
  handoffCondition: string;
  sensitiveReview: boolean;
};

type AgentBlueprint = {
  name: string;
  role: string;
  objective: string;
  greeting: string;
  qualificationQuestions: string[];
  captureFields: string[];
  guardrails: string[];
  handoff: string;
  destination: string;
  launchChecklist: string[];
};

const storageKey = "bamboo-agent-builder-v4";

const defaults: BuilderState = {
  industry: "",
  goals: [],
  channel: "",
  voice: "",
  businessName: "",
  offer: "",
  idealCustomer: "",
  qualificationRules: "",
  desiredAction: "",
  website: "",
  knowledgeSource: "",
  blockedTopics: "",
  handoffCondition: "",
  sensitiveReview: false,
};

const steps = [
  { id: "industry", title: "Choose your industry", hint: "This sets the first workflow assumptions.", icon: Building2 },
  { id: "outcomes", title: "Choose the outcome", hint: "Pick one primary job and an optional second.", icon: WandSparkles },
  { id: "channel", title: "Choose the first channel", hint: "Start where customer intent already appears.", icon: Radio },
  { id: "voice", title: "Set the agent voice", hint: "Choose how the same answer should feel.", icon: UserRound },
  { id: "context", title: "Add business context", hint: "Give the agent enough detail to qualify fit.", icon: Building2 },
  { id: "knowledge", title: "Set knowledge and guardrails", hint: "Define what the agent can use and when it stops.", icon: ShieldCheck },
  { id: "preview", title: "Review your agent blueprint", hint: "Inspect the job, capture plan, rules, and launch gaps.", icon: Bot },
  { id: "save", title: "Save your agent blueprint", hint: "Attach an owner so this work stays actionable.", icon: Save },
] as const;

const voiceOptions = [
  { label: "Helpful expert", sample: "I can help you compare the options and choose the right next step." },
  { label: "Warm concierge", sample: "Tell me what you need, and I’ll make the next step easy." },
  { label: "Direct sales assistant", sample: "Let’s confirm fit, timing, and who should join the next call." },
  { label: "Calm support guide", sample: "I’ll work through this with you and route anything that needs a person." },
];

function normalizeSavedState(raw: string): BuilderState {
  const parsed = JSON.parse(raw) as Partial<BuilderState> & { businessInfo?: string; goal?: string };
  return {
    ...defaults,
    ...parsed,
    offer: parsed.offer ?? parsed.businessInfo ?? "",
    goals: Array.isArray(parsed.goals) ? parsed.goals.filter(Boolean).slice(0, 2) : parsed.goal ? [parsed.goal] : [],
    sensitiveReview: Boolean(parsed.sensitiveReview),
  };
}

function stateFromQuery(): BuilderState {
  if (typeof window === "undefined") return defaults;
  const params = new URLSearchParams(window.location.search);
  const goalAliases: Record<string, string> = {
    "Qualify leads": "Capture and qualify leads",
    "Answer questions": "Answer customer questions",
    "Book appointments": "Book appointments",
  };
  const goal = params.get("goal") ?? "";
  return {
    ...defaults,
    industry: params.get("industry") ?? "",
    channel: params.get("channel") ?? "",
    goals: goal ? [goalAliases[goal] ?? goal] : [],
  };
}

export function AgentBuilderWizard() {
  const router = useRouter();
  const [state, setState] = useState<BuilderState>(defaults);
  const [step, setStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [resumeState, setResumeState] = useState<BuilderState | null>(null);
  const [goalNotice, setGoalNotice] = useState("");
  const autoAdvanceRef = useRef<number | null>(null);

  useEffect(() => {
    const queryState = stateFromQuery();
    const timer = window.setTimeout(() => {
      setState(queryState);
      const saved = localStorage.getItem(storageKey) ?? localStorage.getItem("bamboo-agent-builder");
      if (saved) {
        try {
          setResumeState(normalizeSavedState(saved));
        } catch {
          localStorage.removeItem(storageKey);
        }
      }
      setLoaded(true);
    }, 0);
    trackEvent("agent_builder_started", {
      source: "free_agent_builder",
      preselected: Boolean(queryState.industry || queryState.goals.length || queryState.channel),
    });
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded && !resumeState) localStorage.setItem(storageKey, JSON.stringify(state));
  }, [loaded, resumeState, state]);

  useEffect(() => () => {
    if (autoAdvanceRef.current) window.clearTimeout(autoAdvanceRef.current);
  }, []);

  const readiness = useMemo(() => getReadiness(state), [state]);
  const agent = useMemo<AgentBlueprint>(() => createBlueprint(state), [state]);
  const progress = Math.round(((step + 1) / steps.length) * 100);
  const canContinue = step !== 4 || Boolean(state.businessName.trim() && state.offer.trim() && state.desiredAction.trim());
  const websiteValid = !state.website.trim() || /^https?:\/\//i.test(state.website.trim());

  function update<K extends keyof BuilderState>(field: K, value: BuilderState[K]) {
    setState((current) => ({ ...current, [field]: value }));
  }

  function selectSingle(field: "industry" | "channel" | "voice", value: string) {
    update(field, value);
    trackEvent(field === "industry" ? "industry_selected" : "builder_step_completed", {
      step: steps[step].id,
      value,
      index: step + 1,
    });
    if (autoAdvanceRef.current) window.clearTimeout(autoAdvanceRef.current);
    autoAdvanceRef.current = window.setTimeout(() => setStep((current) => Math.min(current + 1, steps.length - 1)), 200);
  }

  function toggleGoal(goal: string) {
    setGoalNotice("");
    setState((current) => {
      if (current.goals.includes(goal)) return { ...current, goals: current.goals.filter((item) => item !== goal) };
      if (current.goals.length >= 2) {
        setGoalNotice("Two outcomes are already selected. Remove one before adding another.");
        return current;
      }
      return { ...current, goals: [...current.goals, goal] };
    });
  }

  function goNext() {
    trackEvent("builder_step_completed", { step: steps[step].id, index: step + 1, readiness: readiness.total });
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function goBack() {
    trackEvent("builder_step_back", { step: steps[step].id, index: step + 1 });
    setStep((current) => Math.max(current - 1, 0));
  }

  function skipStep() {
    trackEvent("builder_step_skipped", { step: steps[step].id, index: step + 1 });
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  if (!loaded) {
    return <div className="min-h-[34rem] animate-pulse rounded-lg border border-white/10 bg-white/[0.035] motion-reduce:animate-none" aria-label="Loading your saved blueprint" />;
  }

  return (
    <div>
      {resumeState ? (
        <div className="mb-6 grid gap-4 rounded-lg border border-cyan-soft/25 bg-cyan-soft/[0.07] p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-heading text-lg font-semibold text-white">Resume your saved blueprint?</p>
            <p className="mt-1 text-sm leading-6 text-white/66">A previous draft is stored on this browser. Continue it or start a clean version.</p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="h-11 border-white/14 bg-transparent text-white hover:bg-white/8 hover:text-white" onClick={() => { localStorage.removeItem(storageKey); localStorage.removeItem("bamboo-agent-builder"); setResumeState(null); setState(stateFromQuery()); setStep(0); }}>Start Over</Button>
            <Button type="button" className="h-11 bg-cyan-soft text-background hover:bg-cyan-soft/90" onClick={() => { setState(resumeState); setResumeState(null); }}>Continue Draft</Button>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_23rem]">
        <Card className="rounded-lg border-white/12 bg-white/[0.04] shadow-none">
          <CardContent className="p-5 sm:p-7">
            <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge className="border-bamboo/25 bg-bamboo/10 text-bamboo hover:bg-bamboo/10">Step {step + 1} of {steps.length}</Badge>
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl">{steps[step].title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/62">{steps[step].hint}</p>
              </div>
              <div className="min-w-40">
                <div className="mb-2 flex justify-between text-xs text-white/58"><span>Progress</span><span>{progress}%</span></div>
                <ProgressBar value={progress} />
              </div>
            </div>

            <StepRail currentStep={step} state={state} onStepChange={setStep} />

            <div className="mt-8 min-h-[19rem]">
              {step === 0 ? <SingleChoiceGrid options={[...builderChoices.industries, "Other"]} selected={state.industry} onSelect={(value) => selectSingle("industry", value)} /> : null}
              {step === 1 ? (
                <div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {builderChoices.goals.map((goal) => <ChoiceButton key={goal} label={goal} selected={state.goals.includes(goal)} onClick={() => toggleGoal(goal)} detail={state.goals[0] === goal ? "Primary outcome" : state.goals[1] === goal ? "Secondary outcome" : undefined} />)}
                  </div>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p aria-live="polite" className={cn("text-sm", goalNotice ? "text-signal-amber" : "text-white/58")}>{goalNotice || `${state.goals.length} of 2 outcomes selected`}</p>
                    <Button type="button" disabled={state.goals.length === 0} onClick={goNext} className="h-11 bg-bamboo text-background hover:bg-bamboo/90">Continue to Channel <ArrowRight aria-hidden className="size-4" /></Button>
                  </div>
                </div>
              ) : null}
              {step === 2 ? <SingleChoiceGrid options={builderChoices.channels} selected={state.channel} onSelect={(value) => selectSingle("channel", value)} /> : null}
              {step === 3 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {voiceOptions.map((voice) => <ChoiceButton key={voice.label} label={voice.label} detail={voice.sample} selected={state.voice === voice.label} onClick={() => selectSingle("voice", voice.label)} />)}
                </div>
              ) : null}
              {step === 4 ? <BusinessContext state={state} update={update} /> : null}
              {step === 5 ? <KnowledgeGuardrails state={state} update={update} /> : null}
              {step === 6 ? <BlueprintPreview agent={agent} readiness={readiness} onEdit={setStep} /> : null}
              {step === 7 ? (
                <div>
                  <p className="mb-6 max-w-2xl text-sm leading-7 text-white/68">Save the blueprint with an owner. The agent, readiness breakdown, guardrails, and launch checklist stay attached to this record.</p>
                  <LeadCaptureForm
                    initial={{ company: state.businessName, website: state.website, industry: state.industry }}
                    onSubmit={(lead) => {
                      localStorage.setItem("bamboo-agent", JSON.stringify({ agent, state, readiness: readiness.total, readinessBreakdown: readiness.categories, lead }));
                      trackEvent("agent_blueprint_saved", { readiness: readiness.total, industry: state.industry, workflow: state.goals[0] });
                      router.push("/agent-created");
                    }}
                  />
                </div>
              ) : null}
            </div>

            {step < 7 && step !== 1 ? (
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2">
                  <Button type="button" variant="outline" disabled={step === 0} onClick={goBack} className="h-11 border-white/12 bg-transparent text-white hover:bg-white/8 hover:text-white"><ArrowLeft aria-hidden className="size-4" /> Back</Button>
                  {step !== 6 ? <Button type="button" variant="ghost" onClick={skipStep} className="h-11 text-white/62 hover:bg-white/8 hover:text-white">Skip for Now</Button> : null}
                </div>
                <Button type="button" disabled={!canContinue || !websiteValid} onClick={goNext} className="h-11 bg-bamboo text-background hover:bg-bamboo/90">{step === 6 ? "Save This Blueprint" : "Continue"}<ArrowRight aria-hidden className="size-4" /></Button>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div>
          <details className="group rounded-lg border border-white/12 bg-surface-raised p-4 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-white">Preview blueprint <ChevronDown aria-hidden className="size-4 transition group-open:rotate-180" /></summary>
            <div className="mt-4"><LivePreview agent={agent} readiness={readiness} state={state} mobile /></div>
          </details>
          <div className="hidden lg:block"><LivePreview agent={agent} readiness={readiness} state={state} /></div>
        </div>
      </div>
    </div>
  );
}

function BusinessContext({ state, update }: { state: BuilderState; update: <K extends keyof BuilderState>(field: K, value: BuilderState[K]) => void }) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Business name" id="business-name" required value={state.businessName} onChange={(value) => update("businessName", value)} placeholder="Bamboo Labs" />
        <TextField label="Ideal customer" id="ideal-customer" value={state.idealCustomer} onChange={(value) => update("idealCustomer", value)} placeholder="Growing service teams with inbound demand" />
      </div>
      <TextAreaField label="What do you sell or provide?" id="business-offer" required value={state.offer} onChange={(value) => update("offer", value)} placeholder="Describe the offer, the customer problem, and what makes a good fit." />
      <TextAreaField label="Qualification rules" id="qualification-rules" value={state.qualificationRules} onChange={(value) => update("qualificationRules", value)} placeholder="Company size, location, budget, urgency, service fit, or any reason to route differently." />
      <TextField label="Desired next action" id="desired-action" required value={state.desiredAction} onChange={(value) => update("desiredAction", value)} placeholder="Book a strategy call" />
    </div>
  );
}

function KnowledgeGuardrails({ state, update }: { state: BuilderState; update: <K extends keyof BuilderState>(field: K, value: BuilderState[K]) => void }) {
  return (
    <div className="grid gap-5">
      <TextField label="Website" id="website" value={state.website} onChange={(value) => update("website", value)} placeholder="https://example.com" type="url" error={state.website && !/^https?:\/\//i.test(state.website) ? "Start the website address with http:// or https://." : undefined} />
      <TextAreaField label="Approved knowledge" id="knowledge" value={state.knowledgeSource} onChange={(value) => update("knowledgeSource", value)} placeholder="Paste approved FAQ links, policy notes, service details, or a short answer set." />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextAreaField label="Topics the agent must not answer" id="blocked-topics" value={state.blockedTopics} onChange={(value) => update("blockedTopics", value)} placeholder="Pricing exceptions, professional advice, private account changes" compact />
        <TextAreaField label="When should a human take over?" id="handoff-condition" value={state.handoffCondition} onChange={(value) => update("handoffCondition", value)} placeholder="Low confidence, sensitive topic, urgent request, or high-value lead" compact />
      </div>
      <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-md border border-white/12 bg-white/[0.035] p-4 text-sm leading-6 text-white/72">
        <input type="checkbox" checked={state.sensitiveReview} onChange={(event) => update("sensitiveReview", event.target.checked)} className="mt-1 size-4 accent-[var(--bamboo)]" />
        Sensitive or regulated requests require human review before a final decision.
      </label>
    </div>
  );
}

function BlueprintPreview({ agent, readiness, onEdit }: { agent: AgentBlueprint; readiness: ReturnType<typeof getReadiness>; onEdit: (step: number) => void }) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-5 border-y border-white/10 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div><p className="text-xs text-white/52">Agent role</p><h3 className="mt-1 font-heading text-2xl font-semibold text-white">{agent.name}</h3><p className="mt-2 text-sm leading-6 text-white/64">{agent.role}</p></div>
        <div><p className="font-mono text-3xl font-semibold text-bamboo">{readiness.total}%</p><p className="text-xs text-white/52">launch readiness</p></div>
      </div>
      <BlueprintSection icon={MessageSquareText} title="Greeting"><p>{agent.greeting}</p></BlueprintSection>
      <div className="grid gap-5 sm:grid-cols-2">
        <BlueprintSection icon={BookOpenCheck} title="Qualification questions"><ul className="space-y-2">{agent.qualificationQuestions.map((item) => <li key={item}>• {item}</li>)}</ul></BlueprintSection>
        <BlueprintSection icon={LockKeyhole} title="Guardrails"><ul className="space-y-2">{agent.guardrails.map((item) => <li key={item}>• {item}</li>)}</ul></BlueprintSection>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-white">Readiness breakdown</p>
        <div className="grid gap-2 sm:grid-cols-5">
          {readiness.categories.map((category) => (
            <button key={category.label} type="button" onClick={() => onEdit(category.step)} className="focus-ring rounded-md border border-white/10 bg-white/[0.035] p-3 text-left transition hover:border-bamboo/35">
              <span className="font-mono text-sm text-bamboo">{category.score}%</span><span className="mt-1 block text-xs text-white/60">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LivePreview({ agent, readiness, state, mobile = false }: { agent: AgentBlueprint; readiness: ReturnType<typeof getReadiness>; state: BuilderState; mobile?: boolean }) {
  return (
    <aside className={cn(!mobile && "sticky top-24")}>
      <div className={cn("rounded-lg border border-white/12 bg-surface-raised", mobile ? "border-0 bg-transparent" : "p-5")}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-md bg-bamboo text-background"><Bot aria-hidden className="size-5" /></div><div><p className="text-sm font-semibold text-white">Live blueprint</p><p className="text-xs text-white/54">Autosaved on this browser</p></div></div>
          <span className="font-mono text-sm text-bamboo">{readiness.total}%</span>
        </div>
        <div className="mt-5"><ProgressBar value={readiness.total} /></div>
        <div className="mt-6 border-y border-white/10 py-5"><p className="font-heading text-lg font-semibold text-white">{agent.name}</p><p className="mt-3 text-sm leading-7 text-white/66">{agent.greeting}</p></div>
        <dl className="mt-5 grid gap-3 text-sm"><PreviewRow label="Industry" value={state.industry || "Not selected"} /><PreviewRow label="Outcome" value={state.goals[0] || "Not selected"} /><PreviewRow label="Channel" value={state.channel || "Not selected"} /><PreviewRow label="Handoff" value={state.handoffCondition || "Needs a rule"} /></dl>
        {readiness.total < 80 ? <div className="mt-5 flex gap-3 rounded-md bg-signal-amber/[0.08] p-3 text-xs leading-5 text-white/66 ring-1 ring-signal-amber/20"><CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-signal-amber" />Add context, knowledge, and guardrails to strengthen launch readiness.</div> : null}
      </div>
    </aside>
  );
}

function StepRail({ currentStep, state, onStepChange }: { currentStep: number; state: BuilderState; onStepChange: (step: number) => void }) {
  const maxUnlocked = Math.max(currentStep, firstIncompleteStep(state));
  return (
    <div className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Builder steps">
      {steps.map((item, index) => {
        const Icon = item.icon;
        const unlocked = index <= maxUnlocked;
        return (
          <button key={item.id} type="button" disabled={!unlocked} onClick={() => onStepChange(index)} aria-current={index === currentStep ? "step" : undefined} className={cn("focus-ring flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-3 text-xs transition", index === currentStep ? "border-bamboo/50 bg-bamboo/10 text-white" : index < currentStep ? "border-white/12 bg-white/[0.035] text-white/64 hover:text-white" : "border-white/8 text-white/36 disabled:cursor-not-allowed")}>
            {index < currentStep ? <Check aria-hidden className="size-3.5 text-bamboo" /> : <Icon aria-hidden className="size-3.5" />}{index + 1}
          </button>
        );
      })}
    </div>
  );
}

function SingleChoiceGrid({ options, selected, onSelect }: { options: readonly string[]; selected: string; onSelect: (value: string) => void }) {
  return <div className="grid gap-3 sm:grid-cols-2">{options.map((option) => <ChoiceButton key={option} label={option} selected={selected === option} onClick={() => onSelect(option)} />)}</div>;
}

function ChoiceButton({ label, detail, selected, onClick }: { label: string; detail?: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} className={cn("focus-ring min-h-16 rounded-md border p-4 text-left transition", selected ? "border-bamboo/55 bg-bamboo/10" : "border-white/12 bg-white/[0.025] hover:border-white/24 hover:bg-white/[0.045]")}>
      <span className="flex items-start justify-between gap-3"><span className="font-semibold text-white">{label}</span>{selected ? <CheckCircle2 aria-hidden className="size-4 shrink-0 text-bamboo" /> : null}</span>
      {detail ? <span className="mt-2 block text-xs leading-5 text-white/58">{detail}</span> : null}
    </button>
  );
}

function BlueprintSection({ icon: Icon, title, children }: { icon: typeof Bot; title: string; children: React.ReactNode }) {
  return <div className="rounded-md border border-white/10 bg-white/[0.03] p-4"><div className="flex items-center gap-2 text-sm font-semibold text-white"><Icon aria-hidden className="size-4 text-bamboo" />{title}</div><div className="mt-3 text-sm leading-7 text-white/66">{children}</div></div>;
}

function TextField({ label, id, value, onChange, placeholder, required = false, type = "text", error }: { label: string; id: string; value: string; onChange: (value: string) => void; placeholder: string; required?: boolean; type?: "text" | "url"; error?: string }) {
  return <div className="grid gap-2"><Label htmlFor={id} className="text-white/78">{label}{required ? <span className="text-bamboo"> *</span> : null}</Label><Input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="h-11 border-white/14 bg-white/[0.055] text-white placeholder:text-white/60" placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} />{error ? <p id={`${id}-error`} role="alert" className="text-xs leading-5 text-signal-coral">{error}</p> : null}</div>;
}

function TextAreaField({ label, id, value, onChange, placeholder, required = false, compact = false }: { label: string; id: string; value: string; onChange: (value: string) => void; placeholder: string; required?: boolean; compact?: boolean }) {
  return <div className="grid gap-2"><Label htmlFor={id} className="text-white/78">{label}{required ? <span className="text-bamboo"> *</span> : null}</Label><Textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} className={cn("border-white/14 bg-white/[0.055] text-white placeholder:text-white/60", compact ? "min-h-24" : "min-h-28")} placeholder={placeholder} /></div>;
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-3 last:border-0 last:pb-0"><dt className="text-white/52">{label}</dt><dd className="max-w-[64%] text-right font-medium text-white/72">{value}</dd></div>;
}

export function ProgressBar({ value }: { value: number }) {
  return <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-bamboo transition-[width] duration-300" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}

function firstIncompleteStep(state: BuilderState) {
  if (!state.industry) return 0;
  if (!state.goals.length) return 1;
  if (!state.channel) return 2;
  if (!state.voice) return 3;
  if (!state.businessName || !state.offer || !state.desiredAction) return 4;
  if (!state.knowledgeSource || !state.handoffCondition) return 5;
  return 6;
}

function getReadiness(state: BuilderState) {
  const categories = [
    { label: "Outcome", score: Math.round(([state.industry, state.goals.length, state.voice].filter(Boolean).length / 3) * 100), step: 0 },
    { label: "Context", score: Math.round(([state.businessName, state.offer, state.desiredAction].filter(Boolean).length / 3) * 100), step: 4 },
    { label: "Knowledge", score: Math.round(([state.website, state.knowledgeSource].filter(Boolean).length / 2) * 100), step: 5 },
    { label: "Guardrails", score: Math.round(([state.blockedTopics, state.handoffCondition, state.sensitiveReview].filter(Boolean).length / 3) * 100), step: 5 },
    { label: "Destination", score: Math.round(([state.channel, state.desiredAction].filter(Boolean).length / 2) * 100), step: 2 },
  ];
  return { total: Math.round(categories.reduce((sum, category) => sum + category.score, 0) / categories.length), categories };
}

function createBlueprint(state: BuilderState): AgentBlueprint {
  const business = state.businessName || "Your business";
  const primary = state.goals[0] || "capture qualified conversations";
  const secondary = state.goals[1];
  const objective = secondary ? `${primary} and ${secondary.toLowerCase()}` : primary;
  return {
    name: `${business} ${primary.split(" ")[0]} Agent`,
    role: `${state.voice || "Helpful expert"} for ${state.industry || "your industry"} on ${state.channel || "your first channel"}.`,
    objective,
    greeting: `Hi, I’m the ${business} AI assistant. I can help you ${objective.toLowerCase()} and guide you to ${state.desiredAction || "the right next step"}.`,
    qualificationQuestions: ["What are you trying to accomplish?", state.qualificationRules ? "Which qualification details apply?" : "What is your timing and level of urgency?", "Who should receive the next step?"],
    captureFields: ["Need and use case", "Fit and urgency", "Contact and preferred next step"],
    guardrails: [state.knowledgeSource ? "Answer from approved knowledge only" : "Add an approved knowledge source", state.blockedTopics || "Define topics the agent must not answer", state.sensitiveReview ? "Sensitive requests require human review" : "Confirm sensitive-request review"],
    handoff: state.handoffCondition || "Define when a human should take over",
    destination: state.desiredAction || state.channel || "Choose a destination",
    launchChecklist: ["Confirm approved knowledge", "Test qualification questions", "Connect the destination", "Review escalation behavior"],
  };
}
