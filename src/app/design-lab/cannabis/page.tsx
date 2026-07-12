import type { Metadata } from "next";
import { CannabisDesignIndex } from "@/components/funnel/cannabis-design-index";

export const metadata: Metadata = {
  title: "Cannabis landing page design lab",
  description: "Five conversion-led landing page directions for Sage, Bamboo AI's dispensary phone agent.",
};

export default function CannabisDesignLabPage() {
  return <CannabisDesignIndex />;
}
