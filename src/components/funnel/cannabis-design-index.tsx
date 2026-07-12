import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./cannabis-design-index.module.css";

const options = [
  { slug: "live", name: "The Live Dispensary", note: "Product-first · Best overall conversion", image: "/design-thumbnails/cannabis-live.png" },
  { slug: "shifts", name: "The Two Shifts", note: "Before and after · Most emotional", image: "/design-thumbnails/cannabis-shifts.png" },
  { slug: "journey", name: "The Call-to-Sale Journey", note: "Outcome-led · Best for operators", image: "/design-thumbnails/cannabis-journey.png" },
  { slug: "counter", name: "The Digital Counter", note: "Human and warm · Best for trust", image: "/design-thumbnails/cannabis-counter.png" },
  { slug: "console", name: "The Operations Console", note: "Control-led · Best for multi-location", image: "/design-thumbnails/cannabis-console.png" },
];

export function CannabisDesignIndex() {
  return <main id="main-content" className={styles.index}>
    <header><span>Bamboo AI · Cannabis design study</span><h1>Choose how<br />Sage enters the room.</h1><p>Five complete landing-page directions for the same dispensary phone agent. Open any option to review the responsive page and its conversion story.</p></header>
    <section className={styles.gallery} aria-label="Cannabis landing page designs">
      {options.map((option, index) => <Link href={`/design-lab/cannabis/${option.slug}`} className={styles.card} key={option.slug}>
        <div className={styles.imageWrap}><Image src={option.image} alt={`Preview of ${option.name} landing page`} fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className={styles.cardCopy}><span>0{index + 1}</span><div><h2>{option.name}</h2><p>{option.note}</p></div><ArrowRight /></div>
      </Link>)}
    </section>
  </main>;
}
