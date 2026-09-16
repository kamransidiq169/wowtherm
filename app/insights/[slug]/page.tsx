import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InsightDetail } from "@/components/insights/insight-detail";
import { getAllInsights, getInsight, getInsightContent } from "@/lib/insights";
import { siteConfig } from "@/lib/site";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const insights = getAllInsights();
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};

  return {
    title: insight.title,
    description: insight.description,
    openGraph: {
      title: `${insight.title} · ${siteConfig.name}`,
      description: insight.description,
      url: `${siteConfig.url}/insights/${insight.slug}`,
    },
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const content = getInsightContent(slug);

  return <InsightDetail insight={insight} content={content} />;
}
