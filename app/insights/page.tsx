import type { Metadata } from "next";
import { InsightsList } from "@/components/insights/insights-list";
import { getAllInsights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Expert guides, design insights, and engineering notes from a decade of heating installations.",
};

export default function InsightsPage() {
  const insights = getAllInsights();
  return <InsightsList initialInsights={insights} />;
}
