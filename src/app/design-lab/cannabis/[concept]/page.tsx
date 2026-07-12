import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CannabisDesignLab, type ConceptId } from "@/components/funnel/cannabis-design-lab";

const conceptIds: ConceptId[] = ["live", "shifts", "journey", "counter", "console"];
const conceptNames: Record<ConceptId, string> = {
  live: "The Live Dispensary",
  shifts: "The Two Shifts",
  journey: "The Call-to-Sale Journey",
  counter: "The Digital Counter",
  console: "The Operations Console",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return conceptIds.map((concept) => ({ concept }));
}

export async function generateMetadata({ params }: { params: Promise<{ concept: string }> }): Promise<Metadata> {
  const { concept } = await params;
  if (!conceptIds.includes(concept as ConceptId)) return { title: "Cannabis design | Bamboo AI" };
  return { title: `${conceptNames[concept as ConceptId]} cannabis landing page` };
}

export default async function CannabisConceptPage({ params }: { params: Promise<{ concept: string }> }) {
  const { concept } = await params;
  if (!conceptIds.includes(concept as ConceptId)) notFound();
  return <CannabisDesignLab initialConcept={concept as ConceptId} compactHeader />;
}
