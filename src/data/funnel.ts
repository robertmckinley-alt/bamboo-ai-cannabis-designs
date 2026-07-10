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

export type Industry = {
  slug: IndustrySlug;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  pains: string[];
  useCases: string[];
  agentExamples: string[];
  roi: {
    metric: string;
    label: string;
    description: string;
  };
  workflow: string[];
  testimonial: string;
  faqs: FAQ[];
};

export const navLinks = [
  { href: "/free-agent-builder", label: "Free Builder" },
  { href: "/pricing", label: "Pricing" },
  { href: "/industries/customer-service", label: "Industries" },
  { href: "/book-demo", label: "Book Demo" },
];

export const logos = [
  "ServiceOps",
  "Northline",
  "Foundry CRM",
  "Atlas Dental",
  "Fleetly",
  "Urban Table",
];

export const stats = [
  { value: "5 min", label: "to first agent draft" },
  { value: "24/7", label: "lead and support coverage" },
  { value: "0 code", label: "required to launch" },
  { value: "11", label: "industry playbooks" },
];

export const homepageFAQs: FAQ[] = [
  {
    question: "Can I really build an agent without code?",
    answer:
      "Yes. The free builder asks a few business questions, creates an agent profile, and gives you a launch-ready preview that your team can refine.",
  },
  {
    question: "What happens after I create the free agent?",
    answer:
      "You can review the preview, book an optimization call, and connect the agent to your site, CRM, booking flow, or support workflow when you are ready.",
  },
  {
    question: "Does Bamboo replace my team?",
    answer:
      "No. Bamboo handles repetitive conversations, qualification, routing, and follow-up so your team spends more time on high-value work.",
  },
  {
    question: "Can Bamboo work for regulated or complex industries?",
    answer:
      "Yes. Bamboo can be configured with clear guardrails, escalation rules, approved knowledge, and handoff steps for industries that need more control.",
  },
  {
    question: "Is the pricing final?",
    answer:
      "Start with the free blueprint. Growth supports one production agent, Scale expands routing and integrations, and Enterprise covers custom deployment requirements.",
  },
];

export const agentTemplates = [
  {
    title: "Lead Concierge",
    description: "Qualifies visitors, answers buying questions, and books the next best step.",
    outcome: "More qualified calls",
  },
  {
    title: "Support Triage",
    description: "Resolves common questions, gathers context, and escalates cleanly.",
    outcome: "Faster response times",
  },
  {
    title: "Appointment Setter",
    description: "Handles availability, reminders, intake, and handoff to your calendar.",
    outcome: "Fewer missed bookings",
  },
  {
    title: "Knowledge Guide",
    description: "Turns your site, docs, and FAQs into a searchable customer answer layer.",
    outcome: "Less repetitive work",
  },
];

export const useCases = [
  "Answer product and service questions instantly",
  "Capture and qualify inbound leads",
  "Book appointments and demos",
  "Route urgent conversations to the right team",
  "Follow up after form fills or missed calls",
  "Turn FAQs and website content into guided answers",
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

export const testimonials = [
  {
    quote:
      "Bamboo gave us a polished first-line agent before we had time to write a single automation spec.",
    name: "Maya Chen",
    role: "VP Growth, Northline",
  },
  {
    quote:
      "The builder made the conversation concrete. We could see the exact agent we needed in minutes.",
    name: "Andre Collins",
    role: "Operations Lead, ServiceOps",
  },
  {
    quote:
      "It feels like a sales engineer, support lead, and onboarding specialist sitting in one workflow.",
    name: "Priya Kapoor",
    role: "Founder, Atlas Studio",
  },
];

export const pricingPlans = [
  {
    name: "Free Builder",
    price: "$0",
    cadence: "one-time demo",
    description: "Create a preview agent and map the best workflow for your business.",
    features: [
      "AI agent draft",
      "Live preview",
      "Readiness score",
      "Builder autosave",
      "Optimization call CTA",
    ],
    cta: "Build Free Agent",
    href: "/free-agent-builder",
  },
  {
    name: "Growth",
    price: "$99",
    cadence: "per month",
    description: "Launch one customer-facing agent for leads, support, or scheduling.",
    features: [
      "1 production agent",
      "Website embed",
      "Lead capture",
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
    description: "Run multiple agents across channels with sharper routing and reporting.",
    features: [
      "Up to 5 agents",
      "CRM and calendar handoff",
      "Advanced qualification",
      "Team workflow design",
      "Priority support",
    ],
    cta: "Talk to Sales",
    href: "/book-demo",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "annual",
    description: "Custom deployment for complex teams, security needs, and high volume.",
    features: [
      "Unlimited agent workflows",
      "Security review",
      "Custom integrations",
      "Dedicated launch plan",
      "Executive reporting",
    ],
    cta: "Book Demo",
    href: "/book-demo",
  },
];

export const comparisonRows = [
  {
    feature: "Free agent preview",
    free: "Included",
    growth: "Included",
    scale: "Included",
    enterprise: "Included",
  },
  {
    feature: "Production website agent",
    free: "Preview only",
    growth: "1",
    scale: "5",
    enterprise: "Custom",
  },
  {
    feature: "Lead capture and routing",
    free: "Basic",
    growth: "Included",
    scale: "Advanced",
    enterprise: "Custom",
  },
  {
    feature: "CRM and calendar integrations",
    free: "Not included",
    growth: "Starter",
    scale: "Included",
    enterprise: "Custom",
  },
  {
    feature: "Launch support",
    free: "Self guided",
    growth: "Email",
    scale: "Priority",
    enterprise: "Dedicated",
  },
];

export const builderChoices = {
  industries: [
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
  ],
  goals: [
    "Capture and qualify leads",
    "Answer customer questions",
    "Book appointments",
    "Triage support requests",
    "Recommend products or services",
    "Follow up after inquiries",
  ],
  channels: ["Website chat", "SMS", "Email", "Facebook/Instagram", "CRM inbox"],
  voices: ["Helpful expert", "Warm concierge", "Direct sales assistant", "Calm support guide"],
};

export const industries: Industry[] = [
  {
    slug: "customer-service",
    name: "Customer Service",
    eyebrow: "Support automation",
    headline: "Resolve repetitive customer questions before they hit the queue.",
    description:
      "Bamboo creates support agents that answer FAQs, collect context, route urgent issues, and keep customers moving without burying your team in tickets.",
    pains: ["Slow first response times", "Repeated FAQ tickets", "Inconsistent escalation notes"],
    useCases: ["FAQ resolution", "Order and account triage", "Escalation summaries"],
    agentExamples: ["Support Triage Agent", "Policy Answer Agent", "Escalation Intake Agent"],
    roi: {
      metric: "42%",
      label: "fewer repetitive tickets",
      description: "A well-trained first-line support agent can absorb common questions and prep clean handoffs.",
    },
    workflow: ["Visitor asks a question", "Agent answers from approved content", "Urgent cases route to support"],
    testimonial: "Bamboo made our support desk feel staffed before the first ticket was created.",
    faqs: [
      { question: "Can it escalate to a human?", answer: "Yes. Bamboo can capture context and route conversations to your team when confidence is low or urgency is high." },
      { question: "Can it use our help center?", answer: "Yes. Add your site, FAQs, docs, and approved knowledge sources during setup." },
    ],
  },
  {
    slug: "sales",
    name: "Sales",
    eyebrow: "Pipeline acceleration",
    headline: "Turn anonymous visitors into qualified sales conversations.",
    description:
      "Bamboo agents ask the right questions, explain your offer, qualify urgency, and push high-intent buyers toward demos or checkout.",
    pains: ["Lead leakage after hours", "Unqualified demo requests", "Slow follow-up"],
    useCases: ["Lead qualification", "Demo routing", "Offer explanation"],
    agentExamples: ["Inbound SDR Agent", "Demo Qualifier", "Proposal Follow-up Agent"],
    roi: {
      metric: "3x",
      label: "more after-hours capture",
      description: "Always-on qualification keeps demand warm until your sales team can respond.",
    },
    workflow: ["Visitor asks about fit", "Agent qualifies budget and timing", "Qualified lead books a demo"],
    testimonial: "It gave our sales page the confidence of a live rep without adding another seat.",
    faqs: [
      { question: "Can Bamboo score leads?", answer: "Yes. The builder creates a readiness score and the production flow can map responses to lead quality." },
      { question: "Can it book meetings?", answer: "Yes. Add calendar routing when you connect your scheduling stack." },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    eyebrow: "Property lead capture",
    headline: "Qualify buyers, sellers, renters, and investors around the clock.",
    description:
      "Bamboo can answer listing questions, collect preferences, explain process steps, and route hot prospects to the right agent.",
    pains: ["Missed property inquiries", "Manual qualification", "Slow showing coordination"],
    useCases: ["Buyer intake", "Seller valuation interest", "Showing request routing"],
    agentExamples: ["Buyer Concierge", "Listing Q&A Agent", "Seller Intake Agent"],
    roi: {
      metric: "24/7",
      label: "property inquiry coverage",
      description: "Real estate intent often happens after hours. Bamboo keeps the conversation moving.",
    },
    workflow: ["Lead shares criteria", "Agent captures timeline and budget", "Agent routes to the right specialist"],
    testimonial: "Our listings stopped feeling like static pages and started acting like assistants.",
    faqs: [
      { question: "Can it discuss listings?", answer: "Yes. Give Bamboo listing content and guardrails for what it should and should not answer." },
      { question: "Can it capture seller leads?", answer: "Yes. The agent can ask location, timeline, property type, and preferred follow-up method." },
    ],
  },
  {
    slug: "medical",
    name: "Medical",
    eyebrow: "Patient intake",
    headline: "Help patients find answers, appointments, and next steps faster.",
    description:
      "Bamboo supports non-emergency intake, appointment routing, service FAQs, and front-desk workflows with clear guardrails and escalation.",
    pains: ["Phone volume", "Appointment friction", "Repeated insurance questions"],
    useCases: ["Appointment intake", "Service FAQs", "Insurance pre-screening"],
    agentExamples: ["Patient Intake Agent", "Procedure FAQ Agent", "Front Desk Assistant"],
    roi: {
      metric: "30%",
      label: "front-desk time returned",
      description: "Automating routine intake and FAQs gives staff more space for patients who need direct help.",
    },
    workflow: ["Patient asks service question", "Agent provides approved guidance", "Appointment request routes to staff"],
    testimonial: "The agent gave our front desk breathing room without pretending to be a clinician.",
    faqs: [
      { question: "Does it give medical advice?", answer: "No. Bamboo should be configured for administrative and approved informational workflows, with escalation for clinical questions." },
      { question: "Can it collect intake details?", answer: "Yes. You can collect basic appointment and service-fit information before human review." },
    ],
  },
  {
    slug: "cannabis",
    name: "Cannabis",
    eyebrow: "Retail guidance",
    headline: "Guide compliant product discovery and reduce repetitive store questions.",
    description:
      "Bamboo helps cannabis retailers answer store, menu, pickup, policy, and education questions while keeping guardrails clear.",
    pains: ["Menu confusion", "Policy questions", "High phone volume"],
    useCases: ["Product discovery", "Pickup guidance", "Store policy FAQs"],
    agentExamples: ["Dispensary Guide", "Menu Assistant", "Pickup FAQ Agent"],
    roi: {
      metric: "18%",
      label: "more guided inquiries",
      description: "Clear answers help shoppers understand options before contacting staff or visiting.",
    },
    workflow: ["Shopper asks about category", "Agent shares approved guidance", "Shopper moves to store or pickup next step"],
    testimonial: "Bamboo made our education flow feel polished while keeping compliance at the center.",
    faqs: [
      { question: "Can we control what it says?", answer: "Yes. Use approved content, age-gate messaging, and escalation rules appropriate for your market." },
      { question: "Can it connect to menus?", answer: "The front end includes placeholders; production integration can connect menu or ecommerce systems." },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    eyebrow: "Dealer and service workflows",
    headline: "Capture shoppers and service requests before competitors respond.",
    description:
      "Bamboo agents can answer inventory questions, gather trade-in details, qualify finance interest, and route service appointments.",
    pains: ["Slow shopper response", "Manual trade-in intake", "Service scheduling bottlenecks"],
    useCases: ["Vehicle inquiry", "Trade-in capture", "Service booking"],
    agentExamples: ["Inventory Agent", "Trade-in Intake Agent", "Service Scheduler"],
    roi: {
      metric: "2.4x",
      label: "faster shopper handoff",
      description: "Structured qualification gives sales and service teams cleaner context on every lead.",
    },
    workflow: ["Shopper asks about vehicle", "Agent captures intent and timeline", "Team receives clean handoff"],
    testimonial: "It turned our inventory pages into working lead capture surfaces.",
    faqs: [
      { question: "Can it ask about trade-ins?", answer: "Yes. It can collect year, make, model, condition, payoff status, and contact info." },
      { question: "Can it route to service?", answer: "Yes. Use the booking flow or connect your service calendar in production." },
    ],
  },
  {
    slug: "law-firms",
    name: "Law Firms",
    eyebrow: "Intake and qualification",
    headline: "Screen potential matters without slowing down your intake team.",
    description:
      "Bamboo can collect case details, practice-area fit, urgency, location, and contact information while using clear legal disclaimers.",
    pains: ["Unqualified inquiries", "Incomplete intake forms", "Slow urgent follow-up"],
    useCases: ["Matter pre-screening", "Practice-area routing", "Consultation booking"],
    agentExamples: ["Legal Intake Agent", "Consultation Qualifier", "Case Routing Agent"],
    roi: {
      metric: "55%",
      label: "cleaner intake notes",
      description: "Structured prompts help teams decide what deserves immediate attorney review.",
    },
    workflow: ["Prospect explains need", "Agent collects core facts", "Matter routes by practice area"],
    testimonial: "It made intake feel premium and organized before our team touched the lead.",
    faqs: [
      { question: "Does it provide legal advice?", answer: "No. Bamboo should collect intake information and route next steps with appropriate disclaimers." },
      { question: "Can it handle multiple practice areas?", answer: "Yes. Create routing rules for personal injury, family law, business, estate, and other areas." },
    ],
  },
  {
    slug: "insurance",
    name: "Insurance",
    eyebrow: "Policy and quote support",
    headline: "Guide prospects and policyholders to the right next action.",
    description:
      "Bamboo agents help explain policy options, capture quote intent, collect claim basics, and route complex questions to licensed staff.",
    pains: ["Quote form abandonment", "Policy confusion", "Claims triage delays"],
    useCases: ["Quote intake", "Policy FAQs", "Claims pre-triage"],
    agentExamples: ["Quote Concierge", "Policy Guide", "Claims Intake Agent"],
    roi: {
      metric: "21%",
      label: "higher quote completion",
      description: "Conversational intake reduces friction compared with long static forms.",
    },
    workflow: ["Prospect shares coverage need", "Agent collects risk details", "Licensed team reviews next step"],
    testimonial: "Bamboo helped us make insurance questions feel simple instead of intimidating.",
    faqs: [
      { question: "Can it quote policies?", answer: "The front end can capture quote intent; production quoting depends on your rating and compliance systems." },
      { question: "Can it route to licensed agents?", answer: "Yes. Bamboo can escalate by product, location, urgency, or lead quality." },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    eyebrow: "Hospitality assistance",
    headline: "Answer menu, booking, catering, and event questions instantly.",
    description:
      "Bamboo helps restaurants reduce phone interruptions, capture catering leads, explain menus, and guide guests to reservations.",
    pains: ["Phone interruptions", "Missed catering leads", "Repeated menu questions"],
    useCases: ["Reservation guidance", "Catering intake", "Menu FAQs"],
    agentExamples: ["Guest Concierge", "Catering Intake Agent", "Menu Guide"],
    roi: {
      metric: "12 hrs",
      label: "weekly staff time saved",
      description: "Common guest questions can be handled without pulling staff from service.",
    },
    workflow: ["Guest asks about availability", "Agent answers or routes booking", "Team receives catering or event details"],
    testimonial: "Bamboo made our website feel as attentive as our front-of-house team.",
    faqs: [
      { question: "Can it handle catering leads?", answer: "Yes. It can collect headcount, date, budget, dietary needs, and follow-up details." },
      { question: "Can it answer menu questions?", answer: "Yes. Add your menu, allergy notes, hours, and policy content as approved knowledge." },
    ],
  },
  {
    slug: "ecommerce",
    name: "Ecommerce",
    eyebrow: "Shopper conversion",
    headline: "Help shoppers choose, compare, and buy with less friction.",
    description:
      "Bamboo agents recommend products, answer shipping and return questions, recover hesitation, and capture high-value purchase intent.",
    pains: ["Product indecision", "Cart abandonment", "Shipping and return questions"],
    useCases: ["Product recommendation", "Policy Q&A", "Order intent capture"],
    agentExamples: ["Shopping Advisor", "Returns Guide", "VIP Lead Capture Agent"],
    roi: {
      metric: "16%",
      label: "more guided product clicks",
      description: "Conversational guidance helps shoppers find the right product faster.",
    },
    workflow: ["Shopper shares need", "Agent recommends path", "Shopper moves to product or checkout"],
    testimonial: "It felt like adding a best-in-store associate to every product page.",
    faqs: [
      { question: "Can it recommend products?", answer: "Yes. Use approved product data and recommendation rules for your catalog." },
      { question: "Can it help with order questions?", answer: "Yes. Production integrations can connect order status and support tools." },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    eyebrow: "Project intake",
    headline: "Turn project inquiries into scoped, qualified opportunities.",
    description:
      "Bamboo can ask the right project questions, capture timelines, budget bands, location, and job type before routing to estimators or sales.",
    pains: ["Incomplete quote requests", "Low-fit inquiries", "Manual follow-up"],
    useCases: ["Project qualification", "Estimate intake", "Service-area routing"],
    agentExamples: ["Estimate Intake Agent", "Project Qualifier", "Service Dispatch Agent"],
    roi: {
      metric: "35%",
      label: "faster estimate prep",
      description: "Better intake data shortens the path from inquiry to qualified estimate.",
    },
    workflow: ["Prospect describes project", "Agent captures scope and constraints", "Estimator receives structured summary"],
    testimonial: "Bamboo turned messy quote requests into usable project briefs.",
    faqs: [
      { question: "Can it pre-qualify by location?", answer: "Yes. Add service areas and routing rules so out-of-area requests are handled clearly." },
      { question: "Can it collect project photos?", answer: "The current front end has a knowledge-source placeholder; file upload can be added with a backend or storage integration." },
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
