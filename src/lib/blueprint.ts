export type BuilderState = {
  industry: string;
  /** goals[0] is the primary outcome; goals[1] the optional secondary. */
  goals: string[];
  channel: string;
  voice: string;
  businessName: string;
  offering: string;
  idealCustomer: string;
  qualificationRules: string;
  nextAction: string;
  website: string;
  knowledgeNotes: string;
  excludedTopics: string;
  handoffCondition: string;
  sensitiveReviewAcknowledged: boolean;
};

export const emptyBuilderState: BuilderState = {
  industry: "",
  goals: [],
  channel: "",
  voice: "",
  businessName: "",
  offering: "",
  idealCustomer: "",
  qualificationRules: "",
  nextAction: "",
  website: "",
  knowledgeNotes: "",
  excludedTopics: "",
  handoffCondition: "",
  sensitiveReviewAcknowledged: false,
};

export type ReadinessCategory = {
  id: "outcome" | "context" | "knowledge" | "guardrails" | "destination";
  label: string;
  /** 0–100 for this category. */
  score: number;
  /** Builder step (1-based) that closes the gap. */
  step: number;
  missing: string[];
};

export type Readiness = {
  total: number;
  categories: ReadinessCategory[];
};

export type Blueprint = {
  agentName: string;
  role: string;
  objective: string;
  greeting: string;
  knowledgeSummary: string;
  qualificationQuestions: string[];
  captured: string[];
  guardrails: string[];
  escalation: string;
  destination: string;
  launchChecklist: string[];
};

const voiceGreetings: Record<string, (business: string) => string> = {
  "Helpful expert": (business) =>
    `Hi — you've reached ${business}. Ask me anything about what we do; if it needs a specialist, I'll route you to the right person with your details already in hand.`,
  "Warm concierge": (business) =>
    `Welcome to ${business}! I'm here to help you find exactly what you need — it usually takes just a couple of quick questions.`,
  "Direct sales assistant": (business) =>
    `This is the ${business} assistant. Tell me what you're looking for and I'll get you an answer or a booked next step — whichever is faster.`,
  "Calm support guide": (business) =>
    `You've reached ${business} support. Tell me what happened and I'll either sort it out with you or hand you to the team with nothing lost.`,
};

function pct(filled: number, total: number) {
  return Math.round((filled / total) * 100);
}

export function computeReadiness(state: BuilderState): Readiness {
  const categories: ReadinessCategory[] = [
    {
      id: "outcome",
      label: "Outcome",
      step: 2,
      score: pct([state.industry, state.goals[0]].filter(Boolean).length, 2),
      missing: [
        !state.industry && "Pick an industry",
        !state.goals[0] && "Choose a primary outcome",
      ].filter((item): item is string => Boolean(item)),
    },
    {
      id: "context",
      label: "Context",
      step: 5,
      score: pct(
        [state.businessName, state.offering, state.nextAction, state.idealCustomer].filter(Boolean).length,
        4
      ),
      missing: [
        !state.businessName && "Add your business name",
        !state.offering && "Describe what you sell or provide",
        !state.nextAction && "Set the desired next action",
        !state.idealCustomer && "Describe your ideal customer (optional, raises accuracy)",
      ].filter((item): item is string => Boolean(item)),
    },
    {
      id: "knowledge",
      label: "Knowledge",
      step: 6,
      score: pct([state.website, state.knowledgeNotes].filter(Boolean).length, 2),
      missing: [
        !state.website && "Add your website so the agent has approved source material",
        !state.knowledgeNotes && "List knowledge sources or approved answers",
      ].filter((item): item is string => Boolean(item)),
    },
    {
      id: "guardrails",
      label: "Guardrails",
      step: 6,
      score: pct(
        [state.excludedTopics, state.handoffCondition, state.sensitiveReviewAcknowledged ? "x" : ""].filter(Boolean).length,
        3
      ),
      missing: [
        !state.excludedTopics && "Name the topics the agent must not answer",
        !state.handoffCondition && "Define the human handoff condition",
        !state.sensitiveReviewAcknowledged && "Confirm sensitive workflows get human review",
      ].filter((item): item is string => Boolean(item)),
    },
    {
      id: "destination",
      label: "Destination",
      step: 3,
      score: pct([state.channel, state.nextAction].filter(Boolean).length, 2),
      missing: [
        !state.channel && "Choose the first channel",
        !state.nextAction && "Set where a qualified conversation should land",
      ].filter((item): item is string => Boolean(item)),
    },
  ];

  const total = Math.round(
    categories.reduce((sum, category) => sum + category.score, 0) / categories.length
  );

  return { total, categories };
}

export function buildBlueprint(state: BuilderState): Blueprint {
  const business = state.businessName.trim() || "Your business";
  const primary = state.goals[0] || "capture qualified conversations";
  const secondary = state.goals[1];
  const industry = state.industry || "your market";
  const voice = state.voice || "Helpful expert";
  const channel = state.channel || "Website chat";

  const greeting = (voiceGreetings[voice] ?? voiceGreetings["Helpful expert"])(business);

  const qualificationQuestions = [
    "What brought you here today?",
    industry === "Other" ? "What kind of business is this for?" : `Which ${industry.toLowerCase()} need does this involve?`,
    "How soon do you need this handled?",
    state.qualificationRules
      ? `Rule-specific: ${state.qualificationRules}`
      : "Who should follow up if this is a fit?",
  ];

  const guardrails = [
    state.excludedTopics
      ? `Never answers: ${state.excludedTopics}`
      : "Excluded topics not yet defined — add them before launch.",
    "Answers only from approved knowledge; low-confidence answers stop and escalate.",
    state.sensitiveReviewAcknowledged
      ? "Sensitive workflows confirmed for human review."
      : "Sensitive-workflow review not yet confirmed.",
  ];

  return {
    agentName: `${business} ${primary.split(" ")[0]} Agent`,
    role: `${voice} for ${industry === "Other" ? "your business" : industry.toLowerCase()} on ${channel.toLowerCase()}`,
    objective: secondary ? `${primary}; secondary: ${secondary.toLowerCase()}` : primary,
    greeting,
    knowledgeSummary: [
      state.website && `Website: ${state.website}`,
      state.knowledgeNotes && `Approved sources: ${state.knowledgeNotes}`,
      state.offering && `Offer context: ${state.offering}`,
    ]
      .filter(Boolean)
      .join(" · ") || "No knowledge sources added yet.",
    qualificationQuestions,
    captured: ["Name and contact", "Need described", "Urgency", state.idealCustomer ? "Fit vs. ideal customer" : "Company context"],
    guardrails,
    escalation:
      state.handoffCondition ||
      "Handoff condition not yet defined — the agent will escalate on low confidence only.",
    destination: state.nextAction
      ? `${state.nextAction} (via ${channel.toLowerCase()})`
      : `Qualified conversations land in your inbox from ${channel.toLowerCase()}.`,
    launchChecklist: [
      !state.website && "Connect a website or knowledge source",
      !state.excludedTopics && "Define excluded topics",
      !state.handoffCondition && "Define the human handoff condition",
      "Connect the production channel and destination systems",
      "Review the greeting and qualification questions with your team",
    ].filter((item): item is string => Boolean(item)),
  };
}

export type SavedAgent = {
  blueprint: Blueprint;
  state: BuilderState;
  readiness: Readiness;
  lead: {
    name: string;
    email: string;
    phone: string;
    company: string;
    website: string;
    industry: string;
  };
  savedAt: string;
};

export const BUILDER_STORAGE_KEY = "bamboo-agent-builder";
export const AGENT_STORAGE_KEY = "bamboo-agent";
