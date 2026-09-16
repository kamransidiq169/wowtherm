"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { Insight } from "@/lib/insights";
import { formatDate } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function InsightDetail({
  insight,
  content,
}: {
  insight: Insight;
  content: string;
}) {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal-950 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-site">
          <Reveal>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.1em] text-white/50 uppercase hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Back to Insights
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 text-caption text-copper-400 mb-4">
              <span>{insight.category}</span>
              <span className="size-1 rounded-full bg-copper-400/50" />
              <span>{insight.readingTime}</span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="text-display-lg text-white max-w-4xl">
              {insight.title}
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-6 flex items-center gap-4 text-body-sm text-white/50">
              <span>{insight.author}</span>
              <span className="size-1 rounded-full bg-white/20" />
              <span>{formatDate(insight.date)}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured image */}
      {insight.image && (
        <section className="bg-charcoal-950 pb-16">
          <div className="container-site">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius-card)]"
            >
              <Image
                src={insight.image}
                alt={insight.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="bg-ivory-100 py-16 md:py-24">
        <div className="container-site max-w-3xl">
          <Reveal>
            <article className="prose prose-lg prose-charcoal max-w-none">
              {content ? (
                <div
                  dangerouslySetInnerHTML={{ __html: simpleMarkdown(content) }}
                />
              ) : (
                <p className="text-body-lg text-charcoal-500">
                  This article is being prepared. Check back soon.
                </p>
              )}
            </article>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-950 py-16 md:py-20">
        <div className="container-site text-center">
          <Reveal>
            <p className="text-heading-lg text-white mb-6">
              Have a question about heating?
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-copper-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-copper-600"
            >
              Talk to an Expert
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Very simple markdown to HTML conversion for blog content. */
function simpleMarkdown(md: string): string {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*<\/li>)/g, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hulo])/gm, '<p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[1-3]>)/g, '$1')
    .replace(/(<\/h[1-3]>)<\/p>/g, '$1')
    .replace(/<p>(<ul>)/g, '$1')
    .replace(/(<\/ul>)<\/p>/g, '$1');
}
