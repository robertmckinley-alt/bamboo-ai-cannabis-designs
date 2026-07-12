import type { Metadata } from "next";
import { CannabisDesignIndex } from "@/components/funnel/cannabis-design-index";

export const metadata: Metadata = {
  title: "Cannabis landing page designs",
  description: "Compare five conversion-led landing page directions for Sage, Bamboo AI's dispensary phone agent.",
};

export default function HomePage() {
  return <CannabisDesignIndex />;
}
