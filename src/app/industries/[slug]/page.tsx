import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPageTemplate } from "@/components/funnel/industry-page-template";
import { getIndustry, industries } from "@/data/funnel";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return {
      title: "Industry | Bamboo AI",
    };
  }

  return {
    title: `${industry.name} AI Agents`,
    description: industry.description,
    openGraph: {
      title: `${industry.name} AI Agents | Bamboo AI`,
      description: industry.description,
      url: `/industries/${industry.slug}`,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  return <IndustryPageTemplate industry={industry} />;
}
