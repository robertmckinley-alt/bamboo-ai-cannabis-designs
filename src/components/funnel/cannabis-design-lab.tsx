"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Headphones,
  PhoneCall,
  ShieldCheck,
  ShoppingBag,
  Store,
  UserRoundCheck,
} from "lucide-react";
import styles from "./cannabis-design-lab.module.css";

const concepts = [
  { id: "live", short: "Live dispensary", number: "01", summary: "Product-first · Best overall" },
  { id: "shifts", short: "Two shifts", number: "02", summary: "Before / after · Most emotional" },
  { id: "journey", short: "Call to sale", number: "03", summary: "Outcome-led · Best for owners" },
  { id: "counter", short: "Digital counter", number: "04", summary: "Human and warm · Best for trust" },
  { id: "console", short: "Operations console", number: "05", summary: "Control-led · Best for multi-location" },
] as const;

export type ConceptId = (typeof concepts)[number]["id"];
export const conceptNames: Record<ConceptId, string> = {
  live: "The Live Dispensary",
  shifts: "The Two Shifts",
  journey: "The Call-to-Sale Journey",
  counter: "The Digital Counter",
  console: "The Operations Console",
};

const scenarios = [
  { label: "Live menu", question: "Do you still have the sour gummies?", answer: "I can check the Downtown menu now. Are you shopping there today?", detail: "Location confirmed · menu checked" },
  { label: "Today’s deal", question: "Are edibles part of today’s special?", answer: "The Downtown store has an approved edible promotion today. I can explain the offer and purchase rules.", detail: "Promotion verified · approved language" },
  { label: "Pickup", question: "Is my pickup ready yet?", answer: "I found your pickup and can text the current status to the number on the order.", detail: "Order found · status sent" },
  { label: "First visit", question: "I’ve never been in. What do I need?", answer: "Bring a valid government-issued ID. I can also share parking and entry details for your store.", detail: "Policy answered · directions offered" },
];

export function CannabisDesignLab({ initialConcept = "live", compactHeader = false }: { initialConcept?: ConceptId; compactHeader?: boolean }) {
  const [concept, setConcept] = useState<ConceptId>(initialConcept);
  const [scenario, setScenario] = useState(0);

  return (
    <main id="main-content" className={styles.lab}>
      <header className={styles.labHeader}>
        <div>
          <span className={styles.labKicker}>Bamboo AI · Design lab</span>
          <h1>{compactHeader ? conceptNames[concept] : "Five ways to sell Sage."}</h1>
        </div>
        <p>{compactHeader ? "A complete responsive direction for Sage, Bamboo AI’s dispensary phone agent." : "Same product. Five different conversion arguments. Switch directions to compare the hierarchy, tone, and signature interaction."}</p>
      </header>

      <nav className={styles.switcher} aria-label="Landing page concepts">
        {concepts.map((item) => (
          <button key={item.id} onClick={() => setConcept(item.id)} className={concept === item.id ? styles.activeConcept : ""} aria-pressed={concept === item.id}>
            <span>{item.number}</span><strong>{item.short}</strong><small>{item.summary}</small>
          </button>
        ))}
      </nav>

      <div className={styles.viewport} data-concept={concept}>
        <ConceptNav />
        {concept === "live" && <LiveConcept scenario={scenario} setScenario={setScenario} />}
        {concept === "shifts" && <ShiftsConcept />}
        {concept === "journey" && <JourneyConcept />}
        {concept === "counter" && <CounterConcept scenario={scenario} setScenario={setScenario} />}
        {concept === "console" && <ConsoleConcept />}
        <SharedStory concept={concept} />
      </div>
    </main>
  );
}

function ConceptNav() {
  return <div className={styles.conceptNav}><div className={styles.wordmark}><i /><b>Bamboo</b><span>for dispensaries</span></div><div className={styles.navLinks}><a href="#handles">What Sage handles</a><a href="#control">Control</a><a href="#questions">Questions</a></div><a className={styles.navCta} href="/free-agent-builder?industry=Cannabis">Build Sage <ArrowRight /></a></div>;
}

function LiveConcept({ scenario, setScenario }: { scenario: number; setScenario: (value: number) => void }) {
  return <>
    <section className={`${styles.hero} ${styles.liveHero}`}>
      <div className={styles.heroCopy}><span className={styles.signalLabel}><i /> Sage is answering</span><h2>The line is out the door. <em>The phone still gets answered.</em></h2><p>Sage handles hours, directions, menu availability, pickup, loyalty, and today’s specials—so your budtenders can stay with the customers in front of them.</p><HeroActions /><div className={styles.trustLine}><ShieldCheck /> Built around your approved information, policies, and handoff rules.</div></div>
      <CallStage scenario={scenario} setScenario={setScenario} />
    </section>
    <div className={styles.capabilityRail}><span><Clock3 /> Answers during rush</span><span><ShoppingBag /> Checks current store info</span><span><ShieldCheck /> Follows approved rules</span><span><Headphones /> Hands off with context</span></div>
  </>;
}

function ShiftsConcept() {
  const rows = [
    ["4:20", "The phone rings", "Sage answers"],
    ["4:21", "A budtender leaves the counter", "Downtown is confirmed"],
    ["4:22", "The in-store customer waits", "The menu is checked"],
    ["4:23", "The caller goes on hold", "The promotion is explained"],
    ["4:24", "The caller gives up", "Pickup intent is captured"],
  ];
  return <section className={styles.shiftsHero}><div className={styles.shiftsIntro}><span>One store. Two Friday nights.</span><h2>Your rush hour doesn’t have to sound like one.</h2><p>Compare five minutes at the counter—with the same customers, the same staff, and one operational difference.</p><HeroActions /></div><div className={styles.timeline}><div className={styles.timelineHead}><span>Time</span><b>Without Sage</b><b>With Sage</b></div>{rows.map(([time, before, after]) => <div className={styles.timelineRow} key={time}><time>{time}</time><span>{before}</span><strong><Check />{after}</strong></div>)}</div></section>;
}

function JourneyConcept() {
  const stages = ["Question", "Store found", "Menu checked", "Intent captured", "Outcome logged"];
  return <section className={styles.journeyHero}><div className={styles.journeyHeadline}><span>From question to customer</span><h2>Turn “Do you have this?” into <strong>“I’m on my way.”</strong></h2><p>Every call becomes a clear next step—for the customer, the budtender, or the manager who needs to take over.</p><HeroActions /></div><div className={styles.journeyPath}>{stages.map((stage, index) => <div key={stage} className={styles.pathStage}><i>{index + 1}</i><span>{stage}</span>{index < stages.length - 1 && <ArrowRight />}</div>)}</div><OutcomeReceipt /></section>;
}

function CounterConcept({ scenario, setScenario }: { scenario: number; setScenario: (value: number) => void }) {
  const active = scenarios[scenario];
  return <section className={styles.counterHero}><div className={styles.counterCopy}><span>A better first conversation</span><h2>Patient on the phone. Present at the counter.</h2><p>Sage gives every routine question the time it deserves—without taking your team away from the store.</p><HeroActions /></div><div className={styles.tray}><div className={styles.trayTabs}>{scenarios.map((item, index) => <button key={item.label} onClick={() => setScenario(index)} className={index === scenario ? styles.activeTray : ""}>{item.label}</button>)}</div><div className={styles.trayConversation}><div><small>Caller</small><p>“{active.question}”</p></div><div><small>Sage · Bamboo agent</small><p>“{active.answer}”</p></div></div><div className={styles.boundary}><span><Check /> What Sage did</span><b>{active.detail}</b><span><ShieldCheck /> Boundary</span><b>No medical claims · approved store language</b></div></div></section>;
}

function ConsoleConcept() {
  return <section className={styles.consoleHero}><div className={styles.consoleCopy}><span>Configured, not improvised</span><h2>Control every answer. Protect every conversation.</h2><p>Sage works inside your approved store knowledge, location policies, customer permissions, and escalation rules.</p><HeroActions /></div><div className={styles.console}><div className={styles.consoleTop}><b>Store operations</b><span><i /> 3 locations active</span></div><div className={styles.consoleBody}><aside><button className={styles.consoleActive}>Overview</button><button>Knowledge</button><button>Boundaries</button><button>Escalations</button></aside><div className={styles.consoleMain}><div className={styles.statusLine}><span>Downtown</span><b>Menu connected</b><i>Active</i></div><div className={styles.statusLine}><span>Northside</span><b>Policies approved</b><i>Active</i></div><div className={styles.statusLine}><span>Airport</span><b>Human handoff</b><i>Active</i></div><div className={styles.policyBox}><span>Conversation boundary</span><strong>No diagnosis, treatment advice, or medical claims.</strong><small>Uncertain questions route to a manager with the transcript attached.</small></div></div></div></div></section>;
}

function HeroActions() {
  return <div className={styles.heroActions}><a className={styles.primaryButton} href="/free-agent-builder?industry=Cannabis">Build your dispensary agent <ArrowRight /></a><button className={styles.secondaryButton}><PhoneCall /> Hear Sage answer</button></div>;
}

function CallStage({ scenario, setScenario }: { scenario: number; setScenario: (value: number) => void }) {
  const active = scenarios[scenario];
  return <div className={styles.callStage}><div className={styles.callTop}><span><i /> Live call · Downtown</span><time>04:20</time></div><div className={styles.waveform}>{Array.from({ length: 24 }, (_, index) => <i key={index} style={{ height: `${18 + ((index * 17) % 42)}%` }} />)}</div><div className={styles.transcript}><div><small>Caller</small><p>“{active.question}”</p></div><div><small>Sage</small><p>“{active.answer}”</p></div></div><div className={styles.callResult}><Check /><span>{active.detail}</span><b>No staff action needed</b></div><div className={styles.scenarioDots}>{scenarios.map((item, index) => <button key={item.label} onClick={() => setScenario(index)} className={index === scenario ? styles.activeDot : ""} aria-label={`Show ${item.label} scenario`} />)}</div></div>;
}

function OutcomeReceipt() {
  return <div className={styles.receipt}><div><span>Call outcome</span><b>Resolved by Sage</b></div><dl><dt>Location</dt><dd>Downtown</dd><dt>Question</dt><dd>Edible availability</dd><dt>Promotion</dt><dd>Approved weekend offer</dd><dt>Intent</dt><dd>Visiting within 30 minutes</dd><dt>Follow-up</dt><dd>Directions sent by text</dd></dl><footer><Check /> Staff action required: none</footer></div>;
}

function SharedStory({ concept }: { concept: ConceptId }) {
  return <>
    <section id="handles" className={styles.problemSection}><div><span className={styles.sectionIndex}>The operational gap</span><h2>Your budtenders should serve the customer in front of them.</h2></div><div className={styles.problemCopy}><p>The phone rings during a rush. A budtender leaves the counter to answer the same question they answered ten minutes ago. The line grows. The caller waits. Neither customer gets your team’s full attention.</p><p>With Sage, the routine call gets a useful answer and the unusual call reaches the right person—with the context already attached.</p></div></section>
    <section className={styles.handlesSection}><div className={styles.handlesTitle}><Store /><h2>One phone agent.<br />The store knowledge callers need.</h2></div><div className={styles.handlesList}>{[
      ["Menu and availability", "Check supported menu and inventory information for the correct store."],
      ["Deals and loyalty", "Explain active promotions and loyalty details using approved language."],
      ["Pickup and directions", "Answer order-status questions, hours, parking, and location details."],
      ["Known customers", "Personalize permitted interactions using connected data and customer permissions."],
    ].map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowRight /></article>)}</div></section>
    <section id="control" className={styles.controlSection}><div className={styles.controlCopy}><span>Useful answers. Explicit limits.</span><h2>You decide what Sage may say—and when a human takes over.</h2><p>Configure approved information, prohibited topics, location rules, and escalation conditions before the agent goes live.</p><a href="/free-agent-builder?industry=Cannabis">Set Sage’s boundaries <ArrowRight /></a></div><div className={styles.controlRules}><div><ShieldCheck /><span><b>Approved knowledge</b><small>Hours, menu, promotions, pickup, loyalty, and store policies</small></span><Check /></div><div><UserRoundCheck /><span><b>Age-gated flow</b><small>Configured around store policy and jurisdiction requirements</small></span><Check /></div><div><Headphones /><span><b>Human escalation</b><small>Sensitive or uncertain calls arrive with a clear summary</small></span><Check /></div></div></section>
    <section className={styles.finalCta}><CircleDot /><span>{concepts.find((item) => item.id === concept)?.short} direction</span><h2>Let your budtenders work the counter. Sage will work the phone.</h2><p>Build with your hours, policies, menu, promotions, and handoff rules. Then call Sage yourself before you decide to go live.</p><a href="/free-agent-builder?industry=Cannabis">Start building Sage <ArrowRight /></a><small>Capabilities vary by jurisdiction, retailer policy, connected systems, and implementation.</small></section>
    <section id="questions" className={styles.faqPreview}><h2>Questions operators ask before launch.</h2>{["Can Sage access our live menu?", "How does age gating work?", "What happens when Sage doesn’t know?"].map((question) => <button key={question}><span>{question}</span><ChevronDown /></button>)}</section>
  </>;
}
