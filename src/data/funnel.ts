export type IndustrySlug =
  | "customer-service"
  | "sales"
  | "real-estate"
  | "medical"
  | "cannabis"
  | "automotive"
  | "law-firms"
  | "insurance"
  | "restaurants"
  | "ecommerce"
  | "construction";

export type FAQ = {
  question: string;
  answer: string;
};

export type IndustryConversation = {
  visitor: string;
  agent: string;
  qualified: string[];
  route: string;
  outcome: string;
};

export type Industry = {
  slug: IndustrySlug;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  pains: string[];
  useCases: string[];
  agentExamples: string[];
  workflow: [string, string, string];
  conversation: IndustryConversation;
  /** Regulated-industry boundaries shown verbatim on the page. */
  compliance?: string[];
  /** Outcome tags used by the homepage industry explorer. */
  outcomes: OutcomeId[];
  estimatorDefaults: EstimatorInputs;
  faqs: FAQ[];
};

export const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#use-cases", label: "Use Cases" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#industries", label: "Industries" },
];

export const integrations = [
  "Website chat",
  "CRM",
  "Calendar",
  "Email",
  "SMS",
  "Forms",
  "Knowledge base",
  "Help desk",
];

/* ------------------------------------------------------------------ */
/* Use-case explorer (homepage section 4)                              */
/* ------------------------------------------------------------------ */

export type OutcomeId =
  | "qualify-leads"
  | "answer-questions"
  | "book-appointments"
  | "recommend"
  | "route-sensitive"
  | "follow-up";

export type Outcome = {
  id: OutcomeId;
  label: string;
  trigger: string;
  actions: [string, string, string];
  captured: string[];
  handoff: string;
  result: string;
  industries: string[];
};

export const outcomes: Outcome[] = [
  {
    id: "qualify-leads",
    label: "Qualify leads",
    trigger: "A visitor asks about pricing, fit, or availability.",
    actions: [
      "Answers the question from approved knowledge",
      "Asks for use case, team size, and urgency",
      "Scores intent against your qualification rules",
    ],
    captured: ["Use case", "Team size", "Urgency", "Contact"],
    handoff: "High intent routes to your calendar with a summary. Everything else lands in your inbox as structured context.",
    result: "Qualified conversation, booked next step",
    industries: ["Sales", "Real estate", "Automotive", "Construction", "Insurance"],
  },
  {
    id: "answer-questions",
    label: "Answer support questions",
    trigger: "A customer asks about hours, policies, orders, or how something works.",
    actions: [
      "Resolves the question from your approved content",
      "Collects account or order context when needed",
      "Flags low-confidence answers instead of guessing",
    ],
    captured: ["Question topic", "Account context", "Resolution status"],
    handoff: "Unresolved or urgent cases escalate to your team with the full exchange attached.",
    result: "Fewer repetitive tickets, cleaner escalations",
    industries: ["Customer service", "Ecommerce", "Restaurants", "Medical"],
  },
  {
    id: "book-appointments",
    label: "Book appointments",
    trigger: "A visitor wants a demo, consultation, showing, or service slot.",
    actions: [
      "Explains what the appointment covers",
      "Collects the details your team needs beforehand",
      "Offers the right booking path by request type",
    ],
    captured: ["Appointment type", "Preferred timing", "Prep details"],
    handoff: "The booking lands on your calendar with intake context so nobody starts the meeting cold.",
    result: "Fewer missed bookings, prepared meetings",
    industries: ["Medical", "Real estate", "Automotive", "Restaurants", "Law firms"],
  },
  {
    id: "recommend",
    label: "Recommend products or services",
    trigger: "A shopper describes a need but doesn't know which option fits.",
    actions: [
      "Asks two or three narrowing questions",
      "Recommends from your approved catalog rules",
      "Explains the why behind the recommendation",
    ],
    captured: ["Need described", "Options shown", "Choice made"],
    handoff: "High-value carts or complex requests route to a human with the conversation attached.",
    result: "Guided choice instead of bounce",
    industries: ["Ecommerce", "Cannabis", "Restaurants", "Insurance"],
  },
  {
    id: "route-sensitive",
    label: "Route sensitive requests",
    trigger: "A conversation touches an urgent, regulated, or high-stakes topic.",
    actions: [
      "Recognizes the topic against your escalation rules",
      "Stops answering and explains the handoff",
      "Collects only what your team approved for intake",
    ],
    captured: ["Topic category", "Urgency", "Callback details"],
    handoff: "The request reaches the right person immediately, marked urgent, with nothing improvised.",
    result: "Sensitive cases reach humans fast",
    industries: ["Medical", "Law firms", "Insurance", "Customer service"],
  },
  {
    id: "follow-up",
    label: "Follow up after inquiries",
    trigger: "A form fill, missed call, or stalled conversation needs a next touch.",
    actions: [
      "Re-opens the thread with the prior context",
      "Answers the open question or offers times",
      "Marks the outcome so nothing gets re-worked",
    ],
    captured: ["Original inquiry", "Response status", "Next step"],
    handoff: "Warm replies route to your team; no-responses close with a clean record instead of a mystery.",
    result: "No inquiry ages out silently",
    industries: ["Sales", "Construction", "Real estate", "Automotive"],
  },
];

/* ------------------------------------------------------------------ */
/* Builder choices                                                     */
/* ------------------------------------------------------------------ */

export const builderIndustries = [
  "Customer service",
  "Sales",
  "Real estate",
  "Medical",
  "Cannabis",
  "Automotive",
  "Law firms",
  "Insurance",
  "Restaurants",
  "Ecommerce",
  "Construction",
  "Other",
];

export const builderGoals = [
  "Capture and qualify leads",
  "Answer customer questions",
  "Book appointments",
  "Triage support requests",
  "Recommend products or services",
  "Follow up after inquiries",
];

export type Channel = {
  name: string;
  note: string;
};

export const builderChannels: Channel[] = [
  { name: "Website chat", note: "Included with every launch plan" },
  { name: "SMS", note: "Integration-dependent — mapped at launch" },
  { name: "Email", note: "Integration-dependent — mapped at launch" },
  { name: "Facebook/Instagram", note: "Planned — join the waitlist at launch review" },
  { name: "CRM inbox", note: "Integration-dependent — mapped at launch" },
];

export type Voice = {
  name: string;
  sample: string;
};

export const builderVoices: Voice[] = [
  {
    name: "Helpful expert",
    sample: "Good question — here's how that works, and what I'd check first for a team your size.",
  },
  {
    name: "Warm concierge",
    sample: "Happy to help with that. Let me find the right option for you — it'll take two quick questions.",
  },
  {
    name: "Direct sales assistant",
    sample: "Yes, we handle that. If timing matters, I can hold a slot on the calendar right now.",
  },
  {
    name: "Calm support guide",
    sample: "I can sort this out with you. First, let me confirm what happened so nothing gets repeated later.",
  },
];

/* ------------------------------------------------------------------ */
/* ROI estimator                                                       */
/* ------------------------------------------------------------------ */

export type EstimatorInputs = {
  monthlyConversations: number;
  qualifiedRatePct: number;
  opportunityValue: number;
  afterHoursPct: number;
};

export const estimatorDefaults: EstimatorInputs = {
  monthlyConversations: 300,
  qualifiedRatePct: 20,
  opportunityValue: 1200,
  afterHoursPct: 35,
};

export const estimatorAssumptions = [
  "Assumes the agent responds to every inbound conversation, including after hours.",
  "Captured after-hours conversations are counted as newly answered, not newly created.",
  "Hours returned assumes roughly 6 minutes of human handling saved per answered conversation.",
  "Opportunity value influenced multiplies newly captured conversations by your qualified rate and value.",
];

/* ------------------------------------------------------------------ */
/* Guardrail flow (homepage section 7)                                 */
/* ------------------------------------------------------------------ */

export const guardrailFlow = [
  {
    stage: "Approved knowledge",
    detail: "Your site, docs, FAQs, and notes — nothing outside what you provide.",
  },
  {
    stage: "Agent rules",
    detail: "Topics it may answer, questions it asks, and the qualification logic it follows.",
  },
  {
    stage: "Confidence check",
    detail: "Low-confidence answers stop; the agent says so instead of guessing.",
  },
  {
    stage: "Human handoff",
    detail: "Sensitive or escalated conversations route to your team with full context.",
  },
  {
    stage: "Logged outcome",
    detail: "Every conversation ends as a readable record: what was asked, answered, and routed.",
  },
];

/* ------------------------------------------------------------------ */
/* Blueprint artifact (proof-replacement section)                      */
/* ------------------------------------------------------------------ */

export const blueprintIncludes = [
  { label: "Objective", example: "Qualify inbound demo requests for a B2B services team" },
  { label: "Greeting", example: "Written in your chosen voice, referencing your actual offer" },
  { label: "Qualification fields", example: "Use case · team size · urgency · destination" },
  { label: "Approved knowledge", example: "Your website, FAQ, and the notes you provide" },
  { label: "Guardrails", example: "Topics excluded, escalation triggers, confidence rules" },
  { label: "Handoff", example: "Who receives the conversation and what summary they see" },
  { label: "Readiness breakdown", example: "Outcome · context · knowledge · guardrails · destination" },
  { label: "Launch checklist", example: "The exact gaps to close before the agent goes live" },
];

/* ------------------------------------------------------------------ */
/* Homepage FAQ                                                        */
/* ------------------------------------------------------------------ */

export const homepageFAQs: FAQ[] = [
  {
    question: "Can I build an agent without code?",
    answer:
      "Yes. The free builder asks plain business questions — industry, outcome, channel, voice, context — and turns the answers into a structured agent blueprint. No automation platform to learn.",
  },
  {
    question: "What do I receive from the free builder?",
    answer:
      "A complete agent blueprint: objective, greeting, qualification questions, approved-knowledge summary, guardrails, handoff rule, and a readiness breakdown showing exactly what's left before launch. You can copy or download it.",
  },
  {
    question: "Does Bamboo replace my team?",
    answer:
      "No. Bamboo handles the repetitive first mile — answering, qualifying, routing, following up — and hands your team a summary so they start every conversation with context instead of discovery.",
  },
  {
    question: "How does the agent know what it can say?",
    answer:
      "It answers only from knowledge you approve: your website, docs, FAQs, and notes. You also set excluded topics and a confidence rule, so when the agent isn't sure, it says so and escalates rather than guessing.",
  },
  {
    question: "Can it hand off to a human?",
    answer:
      "Yes — that's a core design rule. You define the handoff condition (topic, urgency, or low confidence) and the agent transfers with a readable summary so the customer never repeats themselves.",
  },
  {
    question: "Which systems can it connect to?",
    answer:
      "Website chat is included. CRM, calendar, email, SMS, forms, knowledge bases, and help desks are mapped during launch depending on your stack — the strategy call covers exactly which connections your workflow needs.",
  },
  {
    question: "How long does a launch take?",
    answer:
      "The blueprint takes about five minutes. A production launch depends on your integrations — most single-workflow launches are measured in days, and the launch checklist in your blueprint shows the exact remaining steps.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Building and saving a blueprint is free. Paid plans start when you launch a production agent, and scale by the number of agents and integration depth. There are no usage surprises — the pricing page lists what each plan includes.",
  },
  {
    question: "Can regulated industries use it?",
    answer:
      "Yes, with explicit boundaries. Medical, legal, insurance, and cannabis deployments are configured for administrative workflows only — the agent never gives professional advice, and sensitive topics escalate to licensed humans by rule.",
  },
];

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export const pricingPlans = [
  {
    name: "Free Builder",
    price: "$0",
    cadence: "no credit card",
    bestFor: "Best for proving the workflow before anything is deployed.",
    description: "Create the agent blueprint and map the best first workflow for your business.",
    features: [
      "Full agent blueprint",
      "Live preview while you build",
      "Readiness breakdown",
      "Autosave and resume",
      "Copy or download the blueprint",
    ],
    cta: "Build My Free Agent",
    href: "/free-agent-builder",
  },
  {
    name: "Growth",
    price: "$99",
    cadence: "per month",
    bestFor: "Best for launching one customer-facing workflow.",
    description: "Launch one production agent for leads, support, or scheduling.",
    features: [
      "1 production agent",
      "Website chat embed",
      "Lead capture and routing",
      "Knowledge source setup",
      "Email support",
    ],
    cta: "Start with Growth",
    href: "/book-demo",
    featured: true,
  },
  {
    name: "Scale",
    price: "$299",
    cadence: "per month",
    bestFor: "Best for teams running agents across several channels.",
    description: "Run multiple agents with deeper routing, integrations, and reporting.",
    features: [
      "Up to 5 agents",
      "CRM and calendar handoff",
      "Advanced qualification rules",
      "Team workflow design",
      "Priority support",
    ],
    cta: "Talk Through Scale",
    href: "/book-demo",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual",
    bestFor: "Best for complex teams with security and volume requirements.",
    description: "Custom deployment for security review, high volume, and bespoke integrations.",
    features: [
      "Unlimited agent workflows",
      "Security review",
      "Custom integrations",
      "Dedicated launch plan",
      "Executive reporting",
    ],
    cta: "Book a Strategy Call",
    href: "/book-demo",
  },
];

export const comparisonRows = [
  { feature: "Agent blueprint and preview", free: "Included", growth: "Included", scale: "Included", enterprise: "Included" },
  { feature: "Production website agent", free: "—", growth: "1", scale: "5", enterprise: "Custom" },
  { feature: "Lead capture and routing", free: "Blueprint only", growth: "Included", scale: "Advanced", enterprise: "Custom" },
  { feature: "CRM and calendar integrations", free: "—", growth: "Starter", scale: "Included", enterprise: "Custom" },
  { feature: "Qualification rules", free: "Draft", growth: "Standard", scale: "Advanced", enterprise: "Custom" },
  { feature: "Launch support", free: "Self guided", growth: "Email", scale: "Priority", enterprise: "Dedicated" },
];

export const pricingFAQs: FAQ[] = [
  {
    question: "What happens between the free blueprint and a paid plan?",
    answer:
      "A strategy call maps your blueprint to launch requirements: knowledge sources, integrations, routing, and measurement. You choose a plan only when the workflow is worth deploying.",
  },
  {
    question: "Do plans require a contract?",
    answer:
      "Growth and Scale are monthly. Enterprise deployments are scoped annually because they include security review and custom integration work.",
  },
  {
    question: "How is my data handled?",
    answer:
      "Your blueprint content stays yours. Production data handling, retention, and access controls are reviewed during launch — and in writing for Enterprise deployments.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. Plans map to the number of live agents and integration depth, so upgrading is a scope change, not a rebuild.",
  },
];

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

export const industries: Industry[] = [
  {
    slug: "customer-service",
    name: "Customer Service",
    eyebrow: "Support automation",
    headline: "Resolve repetitive customer questions before they hit the queue.",
    description:
      "Bamboo creates support agents that answer FAQs, collect context, route urgent issues, and keep customers moving without burying your team in tickets.",
    pains: [
      "First response times stretch while easy questions clog the queue",
      "The same ten FAQs consume hours that complex cases need",
      "Escalations arrive with no context, so customers repeat themselves",
    ],
    useCases: ["FAQ resolution", "Order and account triage", "Escalation summaries"],
    agentExamples: ["Support Triage Agent", "Policy Answer Agent", "Escalation Intake Agent"],
    workflow: [
      "Customer asks a question in chat",
      "Agent answers from approved content or collects context",
      "Urgent cases route to your team with a summary",
    ],
    conversation: {
      visitor: "My order says delivered but nothing arrived. Can someone help?",
      agent: "I can help with that. Let me pull the details — what's the order number or the email on the order?",
      qualified: ["Order reference", "Delivery status", "Urgency: high"],
      route: "Escalated to support with full context",
      outcome: "Human picks up mid-thread — no repetition",
    },
    outcomes: ["answer-questions", "route-sensitive"],
    estimatorDefaults: { monthlyConversations: 600, qualifiedRatePct: 10, opportunityValue: 180, afterHoursPct: 30 },
    faqs: [
      {
        question: "Can it escalate to a human?",
        answer:
          "Yes. You define the escalation rule — topic, urgency, or low confidence — and the agent transfers with context and a summary.",
      },
      {
        question: "Can it use our help center?",
        answer: "Yes. Add your site, FAQs, docs, and approved knowledge sources during setup; the agent answers only from those.",
      },
    ],
  },
  {
    slug: "sales",
    name: "Sales",
    eyebrow: "Pipeline acceleration",
    headline: "Turn anonymous visitors into qualified sales conversations.",
    description:
      "Bamboo agents ask the right questions, explain your offer, qualify urgency, and push high-intent buyers toward demos or checkout.",
    pains: [
      "Leads arrive after hours and go cold before anyone responds",
      "Demo calendars fill with unqualified conversations",
      "Follow-up depends on whoever remembers to do it",
    ],
    useCases: ["Lead qualification", "Demo routing", "Offer explanation"],
    agentExamples: ["Inbound SDR Agent", "Demo Qualifier", "Proposal Follow-up Agent"],
    workflow: [
      "Visitor asks about fit or pricing",
      "Agent qualifies use case, team size, and timing",
      "High intent books a demo; the rest lands as structured context",
    ],
    conversation: {
      visitor: "We need an AI assistant for inbound demos. Does this work with our CRM?",
      agent: "That's exactly the workflow Bamboo starts with. Which CRM do you run, and roughly how many inbound conversations land per month?",
      qualified: ["Use case: inbound demos", "CRM named", "Volume estimated", "Urgency: this quarter"],
      route: "High intent → demo calendar + CRM summary",
      outcome: "Qualified. Demo ready.",
    },
    outcomes: ["qualify-leads", "follow-up"],
    estimatorDefaults: { monthlyConversations: 300, qualifiedRatePct: 20, opportunityValue: 2500, afterHoursPct: 35 },
    faqs: [
      {
        question: "Can Bamboo score leads?",
        answer:
          "Yes. Your qualification rules map answers to intent, and the blueprint defines exactly which responses count as high intent.",
      },
      {
        question: "Can it book meetings?",
        answer: "Yes. Calendar routing is mapped when you connect your scheduling stack at launch.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    eyebrow: "Property lead capture",
    headline: "Qualify buyers, sellers, renters, and investors around the clock.",
    description:
      "Bamboo answers listing questions, collects preferences, explains process steps, and routes hot prospects to the right agent.",
    pains: [
      "Listing inquiries arrive at 9pm and get answered at 10am",
      "Qualification happens manually, one text thread at a time",
      "Showing coordination eats hours that should go to closings",
    ],
    useCases: ["Buyer intake", "Seller valuation interest", "Showing request routing"],
    agentExamples: ["Buyer Concierge", "Listing Q&A Agent", "Seller Intake Agent"],
    workflow: [
      "Lead asks about a listing or shares criteria",
      "Agent captures budget, timeline, and financing status",
      "Hot prospects route to the right agent with a summary",
    ],
    conversation: {
      visitor: "Is the Maple Street listing still available? We'd want to see it this weekend.",
      agent: "It is. I can help set that up — are you already pre-approved, and is Saturday or Sunday better for you?",
      qualified: ["Listing interest", "Pre-approval status", "Timing: this weekend"],
      route: "Showing request → listing agent's calendar",
      outcome: "Showing scheduled with context attached",
    },
    outcomes: ["qualify-leads", "book-appointments"],
    estimatorDefaults: { monthlyConversations: 200, qualifiedRatePct: 15, opportunityValue: 9000, afterHoursPct: 45 },
    faqs: [
      {
        question: "Can it discuss listings?",
        answer: "Yes. Give Bamboo listing content and guardrails for what it should and should not answer.",
      },
      {
        question: "Can it capture seller leads?",
        answer: "Yes. The agent can ask location, timeline, property type, and preferred follow-up method.",
      },
    ],
  },
  {
    slug: "medical",
    name: "Medical",
    eyebrow: "Patient intake",
    headline: "Help patients find answers, appointments, and next steps faster.",
    description:
      "Bamboo supports non-emergency intake, appointment routing, service FAQs, and front-desk workflows with clear guardrails and escalation.",
    pains: [
      "Phone volume buries the front desk in routine questions",
      "Appointment requests stack up in voicemail",
      "Insurance questions get answered forty times a day",
    ],
    useCases: ["Appointment intake", "Service FAQs", "Insurance pre-screening"],
    agentExamples: ["Patient Intake Agent", "Procedure FAQ Agent", "Front Desk Assistant"],
    workflow: [
      "Patient asks a service or scheduling question",
      "Agent provides approved administrative guidance",
      "Appointment requests and clinical questions route to staff",
    ],
    conversation: {
      visitor: "Do you take Delta Dental, and can I get a cleaning next week?",
      agent: "We do accept Delta Dental. For scheduling, I'll take a few details and the front desk will confirm your slot — what days work best?",
      qualified: ["Insurance named", "Service: cleaning", "Timing: next week"],
      route: "Appointment request → front-desk queue",
      outcome: "Intake complete before staff pick up",
    },
    compliance: [
      "Administrative assistance only — the agent never gives diagnosis or medical advice.",
      "Clinical and urgent-symptom topics escalate to staff immediately, by rule.",
      "Intake collects only the fields your practice approves.",
    ],
    outcomes: ["book-appointments", "answer-questions", "route-sensitive"],
    estimatorDefaults: { monthlyConversations: 400, qualifiedRatePct: 25, opportunityValue: 250, afterHoursPct: 40 },
    faqs: [
      {
        question: "Does it give medical advice?",
        answer:
          "No. Bamboo is configured for administrative and approved informational workflows only, with escalation for anything clinical.",
      },
      {
        question: "Can it collect intake details?",
        answer: "Yes. You approve exactly which appointment and service-fit fields are collected before human review.",
      },
    ],
  },
  {
    slug: "cannabis",
    name: "Cannabis",
    eyebrow: "Retail guidance",
    headline: "Guide compliant product discovery and reduce repetitive store questions.",
    description:
      "Bamboo helps cannabis retailers answer store, menu, pickup, policy, and education questions while keeping guardrails explicit.",
    pains: [
      "Menu and availability questions dominate the phone line",
      "Policy questions repeat across every channel",
      "Education requests take staff time the sales floor needs",
    ],
    useCases: ["Product discovery", "Pickup guidance", "Store policy FAQs"],
    agentExamples: ["Dispensary Guide", "Menu Assistant", "Pickup FAQ Agent"],
    workflow: [
      "Shopper asks about a category or policy",
      "Agent shares approved, jurisdiction-aware guidance",
      "Shopper moves to store, pickup, or staff follow-up",
    ],
    conversation: {
      visitor: "Do you have anything low-dose for sleep, and can I order for pickup?",
      agent: "We can talk through the low-dose options our menu lists for evening use. Pickup ordering is available — want me to walk you through it?",
      qualified: ["Category: low-dose", "Intent: pickup order", "Jurisdiction confirmed"],
      route: "Pickup guidance → store workflow",
      outcome: "Guided visit instead of a missed call",
    },
    compliance: [
      "Age, jurisdiction, product, and compliance rules are configurable and enforced in the agent's guardrails.",
      "The agent shares approved product education only — no medical claims.",
      "Regulated topics route to staff rather than being improvised.",
    ],
    outcomes: ["recommend", "answer-questions"],
    estimatorDefaults: { monthlyConversations: 500, qualifiedRatePct: 30, opportunityValue: 80, afterHoursPct: 25 },
    faqs: [
      {
        question: "Can we control what it says?",
        answer: "Yes. Use approved content, age-gate messaging, and escalation rules appropriate for your market.",
      },
      {
        question: "Can it connect to menus?",
        answer: "Menu and ecommerce connections are mapped at launch depending on your platform.",
      },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    eyebrow: "Dealer and service workflows",
    headline: "Capture shoppers and service requests before competitors respond.",
    description:
      "Bamboo agents answer inventory questions, gather trade-in details, qualify finance interest, and route service appointments.",
    pains: [
      "Shoppers message three dealerships and buy from the fastest reply",
      "Trade-in intake happens by phone tag",
      "Service scheduling bottlenecks at the front desk",
    ],
    useCases: ["Vehicle inquiry", "Trade-in capture", "Service booking"],
    agentExamples: ["Inventory Agent", "Trade-in Intake Agent", "Service Scheduler"],
    workflow: [
      "Shopper asks about a vehicle or service",
      "Agent captures intent, trade-in, and timeline details",
      "Sales or service receives a clean, structured handoff",
    ],
    conversation: {
      visitor: "Is the 2022 Tacoma still on the lot? I'd trade in my 2018 Civic.",
      agent: "Let me check that for you. For the trade-in, can you tell me the Civic's mileage and condition? That way the desk has real numbers ready when you come in.",
      qualified: ["Vehicle interest", "Trade-in details", "Visit intent"],
      route: "Qualified shopper → sales desk with trade-in context",
      outcome: "Appointment set, numbers prepped",
    },
    outcomes: ["qualify-leads", "book-appointments", "follow-up"],
    estimatorDefaults: { monthlyConversations: 350, qualifiedRatePct: 18, opportunityValue: 2800, afterHoursPct: 40 },
    faqs: [
      {
        question: "Can it ask about trade-ins?",
        answer: "Yes. It can collect year, make, model, condition, payoff status, and contact info.",
      },
      {
        question: "Can it route to service?",
        answer: "Yes. Service requests follow their own routing rule, and calendar connection is mapped at launch.",
      },
    ],
  },
  {
    slug: "law-firms",
    name: "Law Firms",
    eyebrow: "Intake and qualification",
    headline: "Screen potential matters without slowing down your intake team.",
    description:
      "Bamboo collects case details, practice-area fit, urgency, location, and contact information while using clear legal disclaimers.",
    pains: [
      "Unqualified inquiries consume paralegal hours",
      "Intake forms arrive half-complete",
      "Urgent matters wait in the same queue as everything else",
    ],
    useCases: ["Matter pre-screening", "Practice-area routing", "Consultation booking"],
    agentExamples: ["Legal Intake Agent", "Consultation Qualifier", "Case Routing Agent"],
    workflow: [
      "Prospect describes their situation",
      "Agent collects core facts and practice-area fit",
      "Matter routes to the right attorney's intake queue",
    ],
    conversation: {
      visitor: "I was rear-ended last month and the insurance offer seems low. Do you handle this?",
      agent: "We do handle personal injury matters. I can't give legal advice here, but I can take the details so an attorney reviews your situation — when did the accident happen, and have you signed anything with the insurer?",
      qualified: ["Practice area: personal injury", "Timeline", "No agreement signed"],
      route: "Matter → personal injury intake, marked time-sensitive",
      outcome: "Attorney reviews a complete brief",
    },
    compliance: [
      "Intake and routing only — the agent never gives legal advice.",
      "No attorney-client relationship is created or implied by the conversation.",
      "Conflict-sensitive details are collected only per your firm's intake rules.",
    ],
    outcomes: ["route-sensitive", "book-appointments"],
    estimatorDefaults: { monthlyConversations: 150, qualifiedRatePct: 20, opportunityValue: 5000, afterHoursPct: 45 },
    faqs: [
      {
        question: "Does it provide legal advice?",
        answer: "No. Bamboo collects intake information and routes next steps with appropriate disclaimers.",
      },
      {
        question: "Can it handle multiple practice areas?",
        answer: "Yes. Create routing rules for personal injury, family law, business, estate, and other areas.",
      },
    ],
  },
  {
    slug: "insurance",
    name: "Insurance",
    eyebrow: "Policy and quote support",
    headline: "Guide prospects and policyholders to the right next action.",
    description:
      "Bamboo agents explain policy options, capture quote intent, collect claim basics, and route complex questions to licensed staff.",
    pains: [
      "Quote forms get abandoned halfway",
      "Policyholders can't tell which product page answers their question",
      "Claims triage starts with a voicemail backlog",
    ],
    useCases: ["Quote intake", "Policy FAQs", "Claims pre-triage"],
    agentExamples: ["Quote Concierge", "Policy Guide", "Claims Intake Agent"],
    workflow: [
      "Prospect shares a coverage need or question",
      "Agent collects risk and situation details",
      "Licensed staff receive the reviewed next step",
    ],
    conversation: {
      visitor: "We just bought a house — do we need to update our policy before closing?",
      agent: "Congratulations. That's a licensed-agent question, so I'll route you directly — first, can I get the closing date and your current policy type so they call you prepared?",
      qualified: ["Life event: home purchase", "Closing date", "Policy type"],
      route: "Escalated to licensed agent, marked time-sensitive",
      outcome: "Licensed call scheduled before closing",
    },
    compliance: [
      "Licensed staff handle all advice and binding decisions.",
      "The agent collects situation details and routes — it never quotes or binds coverage.",
      "Claims conversations follow your approved intake script only.",
    ],
    outcomes: ["qualify-leads", "route-sensitive", "answer-questions"],
    estimatorDefaults: { monthlyConversations: 250, qualifiedRatePct: 22, opportunityValue: 900, afterHoursPct: 35 },
    faqs: [
      {
        question: "Can it quote policies?",
        answer:
          "No — it captures quote intent and routes to licensed staff. Production quoting depends on your rating and compliance systems.",
      },
      {
        question: "Can it route to licensed agents?",
        answer: "Yes. Bamboo escalates by product, location, urgency, or lead quality.",
      },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    eyebrow: "Hospitality assistance",
    headline: "Answer menu, booking, catering, and event questions instantly.",
    description:
      "Bamboo helps restaurants reduce phone interruptions, capture catering leads, explain menus, and guide guests to reservations.",
    pains: [
      "The phone rings through dinner service with bookable questions",
      "Catering inquiries land in voicemail and die there",
      "Menu and allergy questions repeat every single day",
    ],
    useCases: ["Reservation guidance", "Catering intake", "Menu FAQs"],
    agentExamples: ["Guest Concierge", "Catering Intake Agent", "Menu Guide"],
    workflow: [
      "Guest asks about availability, menu, or events",
      "Agent answers or collects the booking details",
      "Catering and event leads route to the manager with specifics",
    ],
    conversation: {
      visitor: "Can you do a party of 25 for a rehearsal dinner next month?",
      agent: "We'd love to. Let me grab the details for our events manager — what date are you looking at, and do you want the private room or the patio?",
      qualified: ["Event: rehearsal dinner", "Headcount: 25", "Date + space preference"],
      route: "Catering lead → events manager",
      outcome: "Complete event brief, same night",
    },
    outcomes: ["book-appointments", "answer-questions", "recommend"],
    estimatorDefaults: { monthlyConversations: 450, qualifiedRatePct: 15, opportunityValue: 400, afterHoursPct: 30 },
    faqs: [
      {
        question: "Can it handle catering leads?",
        answer: "Yes. It can collect headcount, date, budget, dietary needs, and follow-up details.",
      },
      {
        question: "Can it answer menu questions?",
        answer: "Yes. Add your menu, allergy notes, hours, and policy content as approved knowledge.",
      },
    ],
  },
  {
    slug: "ecommerce",
    name: "Ecommerce",
    eyebrow: "Shopper conversion",
    headline: "Help shoppers choose, compare, and buy with less friction.",
    description:
      "Bamboo agents recommend products, answer shipping and return questions, recover hesitation, and capture high-value purchase intent.",
    pains: [
      "Shoppers bounce when the right product isn't obvious",
      "Shipping and return questions interrupt checkout momentum",
      "High-intent carts abandon with no follow-up path",
    ],
    useCases: ["Product recommendation", "Policy Q&A", "Order intent capture"],
    agentExamples: ["Shopping Advisor", "Returns Guide", "VIP Lead Capture Agent"],
    workflow: [
      "Shopper describes a need or asks a policy question",
      "Agent recommends from approved catalog rules",
      "High-value or complex requests route to your team",
    ],
    conversation: {
      visitor: "Which of these two jackets is warmer? It's for Chicago winters.",
      agent: "For Chicago, the Ridge Parka is the warmer build — it's rated for well below freezing, while the Trail Shell is a layering piece. Want the sizing notes for the Parka?",
      qualified: ["Use case: cold climate", "Products compared", "Purchase intent"],
      route: "Guided to product page with sizing context",
      outcome: "Confident choice instead of a bounce",
    },
    outcomes: ["recommend", "answer-questions", "follow-up"],
    estimatorDefaults: { monthlyConversations: 800, qualifiedRatePct: 12, opportunityValue: 120, afterHoursPct: 40 },
    faqs: [
      {
        question: "Can it recommend products?",
        answer: "Yes. Use approved product data and recommendation rules for your catalog.",
      },
      {
        question: "Can it help with order questions?",
        answer: "Yes. Order status and support tools are connected at launch depending on your platform.",
      },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    eyebrow: "Project intake",
    headline: "Turn project inquiries into scoped, qualified opportunities.",
    description:
      "Bamboo asks the right project questions, captures timelines, budget bands, location, and job type before routing to estimators or sales.",
    pains: [
      "Quote requests arrive as one-line emails with no scope",
      "Low-fit inquiries eat estimator hours",
      "Follow-up depends on a whiteboard and memory",
    ],
    useCases: ["Project qualification", "Estimate intake", "Service-area routing"],
    agentExamples: ["Estimate Intake Agent", "Project Qualifier", "Service Dispatch Agent"],
    workflow: [
      "Prospect describes the project",
      "Agent captures scope, location, timeline, and budget band",
      "Estimator receives a structured project brief",
    ],
    conversation: {
      visitor: "We need our warehouse roof replaced — maybe 20,000 sq ft. Can you quote it?",
      agent: "That's in our wheelhouse. To get you a real estimate, I'll take a few specifics — where's the building, what's the current roof material, and what's your timeline?",
      qualified: ["Scope: 20k sq ft roof", "Location in service area", "Timeline"],
      route: "Project brief → estimating queue",
      outcome: "Estimator starts with a complete brief",
    },
    outcomes: ["qualify-leads", "follow-up"],
    estimatorDefaults: { monthlyConversations: 120, qualifiedRatePct: 25, opportunityValue: 15000, afterHoursPct: 30 },
    faqs: [
      {
        question: "Can it pre-qualify by location?",
        answer: "Yes. Add service areas and routing rules so out-of-area requests are handled clearly.",
      },
      {
        question: "Can it collect project photos?",
        answer: "File upload is mapped at launch with your storage or intake system.",
      },
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
