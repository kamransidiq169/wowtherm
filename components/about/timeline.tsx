"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useScroll, motion, useMotionValueEvent } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

/**
 * Timeline section — cross-section motif with milestone cards.
 *
 * Uses the same layered-cross-section language as the homepage:
 * as the user scrolls, the layers separate and milestone cards
 * fade in at each layer's position.
 *
 * No R3F here — pure DOM + CSS for performance and simplicity.
 * The cross-section is represented as stacked colored bars that
 * "explode" on scroll, with milestone cards appearing alongside.
 *
 * All content is placeholder — flagged with [PLACEHOLDER].
 */

const MILESTONES = [
  {
    year: "[YEAR]",
    title: "Founded",
    description:
      "[PLACEHOLDER — WowTherm founding story. Replace with real copy.]",
    layer: "finish",
  },
  {
    year: "[YEAR]",
    title: "[Milestone title]",
    description:
      "[PLACEHOLDER — First major milestone. Replace with real copy.]",
    layer: "mat",
  },
  {
    year: "[YEAR]",
    title: "[Milestone title]",
    description:
      "[PLACEHOLDER — Growth milestone. Replace with real copy.]",
    layer: "insulation",
  },
  {
    year: "[YEAR]",
    title: "[Milestone title]",
    description:
      "[PLACEHOLDER — Expansion milestone. Replace with real copy.]",
    layer: "subfloor",
  },
  {
    year: "[YEAR]",
    title: "[Milestone title]",
    description:
      "[PLACEHOLDER — Recent milestone. Replace with real copy.]",
    layer: "finish",
  },
  {
    year: "[YEAR]",
    title: "Today",
    description:
      "[PLACEHOLDER — Current state of WowTherm. Replace with real copy.]",
    layer: "mat",
  },
];

const LAYER_COLORS = {
  subfloor: "#6B6153",
  insulation: "#D9CDBB",
  mat: "#3A342C",
  finish: "#EADFCC",
};

const LAYER_LABELS = {
  subfloor: "Subfloor",
  insulation: "Insulation",
  mat: "Heating Mat",
  finish: "Finish Surface",
};

function CrossSectionBar({
  color,
  label,
  progress,
  index,
  total,
}: {
  color: string;
  label: string;
  progress: number;
  index: number;
  total: number;
}) {
  // Stack at progress=0, explode at progress=1
  const stackedGap = 4;
  const explodedGap = 52;
  const gap = stackedGap + (explodedGap - stackedGap) * progress;
  const y = index * gap;

  return (
    <div
      className="relative w-full transition-none"
      style={{ transform: `translateY(${y}px)` }}
    >
      <div
        className="h-8 md:h-10 rounded-sm"
        style={{ backgroundColor: color, opacity: 0.15 + progress * 0.85 }}
      />
      {progress > 0.3 && (
        <span
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-medium tracking-widest uppercase font-sans transition-opacity"
          style={{ opacity: Math.min(1, (progress - 0.3) * 3), color: "#fff" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
  });

  // Which milestone is "active" based on scroll progress
  const activeIndex = Math.min(
    MILESTONES.length - 1,
    Math.floor(progress * MILESTONES.length),
  );

  return (
    <section ref={containerRef} className="relative bg-charcoal-950 py-24 md:py-32 lg:py-40">
      <div className="container-site">
        {/* Header */}
        <Reveal className="mb-16 md:mb-24">
          <p className="text-eyebrow text-copper-400 mb-4">Timeline</p>
          <h2 className="text-display-md text-white max-w-2xl">
            Building warmth,
            <br />
            layer by layer.
          </h2>
        </Reveal>

        {/* Cross-section + Milestones */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Cross-section visualization */}
          <div className="relative flex items-center justify-center min-h-[320px] md:min-h-[400px]">
            <div className="relative w-full max-w-md space-y-1">
              {(
                Object.entries(LAYER_COLORS) as [
                  keyof typeof LAYER_COLORS,
                  string,
                ][]
              ).map(([key, color], i) => (
                <CrossSectionBar
                  key={key}
                  color={color}
                  label={LAYER_LABELS[key]}
                  progress={progress}
                  index={i}
                  total={4}
                />
              ))}
            </div>
          </div>

          {/* Right: Milestone cards */}
          <div className="space-y-8 md:space-y-12">
            {MILESTONES.map((milestone, i) => {
              const cardProgress = Math.max(
                0,
                Math.min(1, (progress - i * 0.15) * 4),
              );

              return (
                <motion.div
                  key={i}
                  style={{
                    opacity: cardProgress,
                    y: 20 - cardProgress * 20,
                  }}
                  className="border-t border-white/10 pt-6"
                >
                  <span className="text-eyebrow text-copper-400 block mb-2">
                    {milestone.year}
                  </span>
                  <h3 className="text-heading-lg text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-body-md text-white/50">
                    {milestone.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
