"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import type { Insight } from "@/lib/insights";
import { cn, formatDate } from "@/lib/utils";

export function InsightsList({
  initialInsights,
}: {
  initialInsights: Insight[];
}) {
  const allInsights =
    initialInsights.length > 0
      ? initialInsights
      : [
          {
            slug: "underfloor-heating-guide",
            title: "The Complete Guide to Underfloor Heating",
            description:
              "Everything you need to know about underfloor heating systems.",
            date: "2024-11-15",
            author: "WowTherm Engineering Team",
            category: "Technology",
            readingTime: "8 min read",
            image:
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
          },
          {
            slug: "thermal-comfort-wellness",
            title: "Thermal Comfort in Wellness Spaces",
            description:
              "How heated floors transform the wellness experience in spas and treatment rooms.",
            date: "2024-10-28",
            author: "WowTherm Team",
            category: "Wellness",
            readingTime: "6 min read",
            image:
              "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1200&auto=format&fit=crop&q=80",
          },
          {
            slug: "smart-thermostats-explained",
            title: "Smart Thermostats: What Actually Matters",
            description:
              "Beyond the marketing — the features that genuinely improve comfort and reduce costs.",
            date: "2024-09-12",
            author: "WowTherm Team",
            category: "Technology",
            readingTime: "5 min read",
            image:
              "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=1200&auto=format&fit=crop&q=80",
          },
        ];

  const categories = [...new Set(allInsights.map((i) => i.category))];
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all"
      ? allInsights
      : allInsights.filter((i) => i.category === active);

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal-950 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-site">
          <Reveal>
            <p className="text-eyebrow text-copper-400 mb-4">Insights</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display-xl text-white max-w-3xl">
              Knowledge that
              <br />
              warms your decisions.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg text-white/50 mt-6 max-w-xl">
              Expert guides, design insights, and engineering notes from a
              decade of heating installations.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-ivory-100 py-16 md:py-24">
        <div className="container-site">
          {/* Category filter */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-12">
              <button
                onClick={() => setActive("all")}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  active === "all"
                    ? "bg-charcoal-900 text-white"
                    : "bg-ivory-200 text-charcoal-600 hover:bg-ivory-300",
                )}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                    active === cat
                      ? "bg-charcoal-900 text-white"
                      : "bg-ivory-200 text-charcoal-600 hover:bg-ivory-300",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Articles grid */}
          <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((insight) => (
              <RevealItem key={insight.slug} className="h-full">
                <Link
                  href={`/insights/${insight.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] transition-all duration-500 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={insight.image}
                      alt={insight.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-caption text-charcoal-400 mb-3">
                      <span>{insight.category}</span>
                      <span className="size-1 rounded-full bg-charcoal-300" />
                      <span>{insight.readingTime}</span>
                    </div>
                    <h2 className="text-heading-lg text-charcoal-900 mb-2">
                      {insight.title}
                    </h2>
                    <p className="text-body-sm text-charcoal-500 flex-1">
                      {insight.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-caption text-charcoal-400">
                        {formatDate(insight.date)}
                      </span>
                      <ArrowUpRight
                        className="size-4 text-copper-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </div>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
