import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CannabisDesignLab, type ConceptId } from "@/components/funnel/cannabis-design-lab";

const conceptIds: ConceptId[] = ["after-hours", "sale-in-call", "calm-control"];
const conceptNames: Record<ConceptId, string> = {
  "after-hours": "After Hours",
  "sale-in-call": "The Sale in the Call",
  "calm-control": "Calm Control",
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
  return <CannabisDesignLab initialConcept={concept as ConceptId} />;
}
