"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, CircleCheck, Headphones, LockKeyhole, MapPin, Menu, PhoneCall, ShieldCheck, ShoppingBag, Store, UserRoundCheck } from "lucide-react";
import styles from "./cannabis-design-lab.module.css";

export type ConceptId = "after-hours" | "sale-in-call" | "calm-control";
export const conceptNames: Record<ConceptId, string> = { "after-hours": "After Hours", "sale-in-call": "The Sale in the Call", "calm-control": "Calm Control" };

const scenarios = [
  { tab: "Menu", q: "Do you still have Blue Dream?", a: "The Downtown menu shows three options in stock. Want the current sizes and prices?", outcome: "Menu checked · visit intent captured" },
  { tab: "Deals", q: "What’s on special today?", a: "Downtown has an approved flower offer today. I can explain it and text the details.", outcome: "Promotion verified · details sent" },
  { tab: "Pickup", q: "Is my pickup ready?", a: "I found your order. It’s ready at the Downtown counter until 9 PM.", outcome: "Order found · status confirmed" },
  { tab: "First visit", q: "I’ve never been in. What do I need?", a: "Bring a valid government-issued ID. I can also text parking and entry directions.", outcome: "Policy answered · directions offered" },
];

export function CannabisDesignLab({ initialConcept = "after-hours" }: { initialConcept?: ConceptId }) {
  const [scenario, setScenario] = useState(0);
  const concept = initialConcept;
  return <main id="main-content" className={`${styles.page} ${styles[camel(concept)]}`}>
    <LocalNav concept={concept} />
    <Hero concept={concept} />
    <Pain concept={concept} />
    <Outcomes concept={concept} />
    <Scenarios active={scenario} setActive={setScenario} concept={concept} />
    <Integrations concept={concept} />
    <Personalization />
    <Compliance concept={concept} />
    <Setup concept={concept} />
    <FAQ />
    <Close concept={concept} />
  </main>;
}

function LocalNav({ concept }: { concept: ConceptId }) {
  return <nav className={styles.nav}><Link href="/" className={styles.logo}><i />BAMBOO AI</Link><div className={styles.navLinks}><a href="#calls">How Sage works</a><a href="#integrations">Integrations</a><a href="#control">Compliance</a><a href="#faq">FAQ</a></div><a href="/free-agent-builder?industry=Cannabis" className={styles.navButton}>Build Sage <ArrowRight /></a><button className={styles.menuButton} aria-label="Open menu"><Menu /></button><span className={styles.conceptName}>{conceptNames[concept]}</span></nav>;
}

function Hero({ concept }: { concept: ConceptId }) {
  if (concept === "sale-in-call") return <section className={styles.heroSale}><div className={styles.saleCopy}><span>Sage · AI phone agent for dispensaries</span><h1>Turn “Do you have this?” into “I’m on my way.”</h1><p>Sage answers every call, checks the right store information, and gives every caller a useful next step.</p><Actions /></div><CallPath /></section>;
  if (concept === "calm-control") return <section className={styles.heroCalm}><div className={styles.calmCopy}><span>Sage</span><h1>The phone agent your store can actually control.</h1><p>Sage answers menu questions, explains promotions and loyalty, handles pickup and directions, and takes care of routine calls—so your staff can stay with the customers in front of them.</p><Actions /></div><div className={styles.heroPhoto}><CallTranscript /></div></section>;
  return <section className={styles.heroAfter}><div className={styles.afterShade} /><div className={styles.afterCopy}><span>Sage · AI phone agent for dispensaries</span><h1>After hours,<br />sales <em>don’t</em> sleep.</h1><p>Sage answers every call, books the visit, and keeps your in-store experience exactly how it should be.</p><Actions /></div><CallTranscript /></section>;
}

function Actions() { return <div className={styles.actions}><a href="/free-agent-builder?industry=Cannabis">Build and test Sage <ArrowRight /></a><button><PhoneCall /> Hear Sage answer</button></div>; }

function CallTranscript() { return <div className={styles.transcript}><header><span><i /> Live call</span><time>00:37</time></header><p><b>Caller</b> Do you have Blue Dream in stock?</p><p><b>Sage</b> Downtown has three options available. Want the current sizes and today’s offer?</p><p><b>Caller</b> Yes. I’ll stop by after work.</p><footer><CircleCheck /> Visit intent captured · directions sent</footer></div>; }

function CallPath() { return <div className={styles.callPath}>{["Caller question", "Location confirmed", "Menu checked", "Deal verified", "Directions sent", "Visit intent captured"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span>{i===5?<Check />:<i />}</div>)}</div>; }

function Pain({ concept }: { concept: ConceptId }) { return <section className={styles.pain}><div><span>The response problem</span><h2>{concept === "calm-control" ? "Your team in front. Sage in the background." : "Missed calls are missed visits."}</h2><p>When no one answers, shoppers do not wait. They call the next store. Sage handles the routine questions while your team protects the experience inside.</p></div><div className={styles.compare}><article><b>Without Sage</b><p>Calls pull staff off the floor</p><p>Questions wait or go unanswered</p><p>Promotions go unnoticed</p></article><article><b>With Sage</b><p><Check /> Routine calls handled end to end</p><p><Check /> Accurate answers from store data</p><p><Check /> Every caller gets a next step</p></article></div></section>; }

function Outcomes({ concept }: { concept: ConceptId }) { return <section className={styles.outcomes}><div className={styles.sectionLead}><span>What changes</span><h2>{concept === "after-hours" ? "Sage is your after-hours advantage." : "Four outcomes. One phone call."}</h2></div><div className={styles.outcomeRow}>{[["Answer","Pick up instantly, even during the rush."],["Know","Use the right menu, location and policy."],["Sell","Turn questions into visits and pickup intent."],["Hand off","Bring in staff only when a person is needed."]].map(([h,p],i)=><article key={h}><b>{String(i+1).padStart(2,"0")}</b><h3>{h}</h3><p>{p}</p></article>)}</div></section>; }

function Scenarios({ active, setActive, concept }: { active:number; setActive:(n:number)=>void; concept:ConceptId }) { const s=scenarios[active]; return <section id="calls" className={styles.scenarios}><div className={styles.sectionLead}><span>Real calls. Useful outcomes.</span><h2>{concept === "calm-control" ? "Pre-built. Store-specific. Always on brand." : "Hear what Sage does with the calls you already get."}</h2></div><div className={styles.scenarioTabs}>{scenarios.map((x,i)=><button onClick={()=>setActive(i)} className={i===active?styles.active:""} key={x.tab}>{x.tab}</button>)}</div><div className={styles.conversation}><div><small>Caller</small><p>“{s.q}”</p></div><div><small>Sage</small><p>“{s.a}”</p></div><footer><Check /> {s.outcome}</footer></div></section>; }

function Integrations({ concept }: { concept: ConceptId }) { return <section id="integrations" className={styles.integrations}><div className={styles.sectionLead}><span>Connected to your store</span><h2>{concept === "calm-control" ? "One trusted source. Every system." : "Works where you work."}</h2><p>Sage connects to the tools you already use, so store information stays current and every call leaves a usable record.</p></div><div className={styles.integrationLine}>{[[Store,"POS & menu"],[ShoppingBag,"Promotions"],[UserRoundCheck,"Loyalty"],[PhoneCall,"Sage"],[Headphones,"SMS & reports"]].map(([Icon,label],i)=>{const I=Icon as typeof Store;return <div key={label as string}><I /><b>{label as string}</b>{i<4&&<ArrowRight />}</div>})}</div></section>; }

function Personalization() { return <section className={styles.personal}><div className={styles.personalImage} /><div><span>Personal, with permission</span><h2>Greet returning customers. Respect their privacy.</h2><p>When connected data, customer permission, and store policy allow it, Sage can recognize a preferred location, explain loyalty information, and make the next conversation more useful.</p><ul><li><Check /> Use only approved customer context</li><li><Check /> Keep recommendations inside store rules</li><li><Check /> Let customers opt out at any time</li></ul></div></section>; }

function Compliance({ concept }: { concept: ConceptId }) { return <section id="control" className={styles.compliance}><div className={styles.sectionLead}><span>Compliance, built in</span><h2>{concept === "calm-control" ? "Control every answer. Stay audit ready." : "Enterprise-grade. Dispensary-controlled."}</h2><p>You choose what Sage may say, what it must never say, and when a manager takes over.</p></div><div className={styles.rules}>{[[ShieldCheck,"Approved knowledge","Only content your team approves and maintains."],[LockKeyhole,"Age-gated flow","Configured around location policy and jurisdiction."],[MapPin,"Location rules","Local hours, offers, inventory and handoffs."],[Headphones,"Human escalation","Sensitive calls reach your team with context."]].map(([Icon,h,p])=>{const I=Icon as typeof ShieldCheck;return <article key={h as string}><I/><div><h3>{h as string}</h3><p>{p as string}</p></div></article>})}</div><div className={styles.noClaims}><b>No medical claims</b><span>No diagnosis · no treatment advice · no guessing</span></div></section>; }

function Setup({ concept }: { concept: ConceptId }) { return <section className={styles.setup}><div className={styles.sectionLead}><span>Build, test, then launch</span><h2>{concept === "after-hours" ? "From setup to sales—fast." : "Go live in four controlled stages."}</h2></div><div>{[["Discover","Add stores, hours, policies and common calls."],["Build","Connect supported systems and approve answers."],["Test","Call Sage yourself and tune every response."],["Launch","Go live when your team is satisfied."]].map(([h,p],i)=><article key={h}><b>0{i+1}</b><h3>{h}</h3><p>{p}</p></article>)}</div></section>; }

function FAQ() { const [open,setOpen]=useState(0); const qs=["Can Sage access our live menu?","How does age gating work?","What happens when Sage does not know?","Can Sage recognize returning customers?","Does Sage replace our budtenders?"]; return <section id="faq" className={styles.faq}><h2>Questions operators ask before launch.</h2><div>{qs.map((q,i)=><article key={q}><button onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}><span>{q}</span><ChevronDown /></button>{open===i&&<p>{answer(i)}</p>}</article>)}</div></section>; }

function Close({ concept }: { concept: ConceptId }) { return <section className={styles.close}><div><span>{conceptNames[concept]}</span><h2>{concept === "sale-in-call" ? "Every call gets a next step." : concept === "calm-control" ? "Your staff takes care of the store. Sage takes care of the phone." : "You handle the experience. Sage handles the phone."}</h2><p>Build Sage with your store information, approved language, and handoff rules. Then call it yourself before going live.</p><Actions /></div></section>; }

function answer(i:number){return ["Sage can read supported menu and inventory sources for the correct store. Integration availability depends on your current platform.","Age-gated flows are configured around retailer policy and jurisdiction requirements before product discussion.","Sage acknowledges uncertainty and routes the call to the right person with a conversation summary.","When permission, connected data and policy allow it, Sage can use approved customer context without exposing private information.","No. Sage handles repetitive phone work so budtenders can spend more time with in-store customers."][i]}
function camel(id:ConceptId){return id.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}
