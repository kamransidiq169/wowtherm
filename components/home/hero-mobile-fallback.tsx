"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeatingMatVisual } from "./hero/heating-mat-visual";
import { HeroMeta } from "./hero/hero-meta";

const EASE = [0.22, 1, 0.36, 1] as const;

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

/**
 * Premium static fallback for mobile and reduced-motion users.
 *
 * Shows the settled hero state — oversized editorial typography,
 * heating mat visual, and metadata — without the cinematic timeline.
 * The composition itself should look beautifully designed even
 * without animation.
 */
export function HeroMobileFallback() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-charcoal-950">
      {/* Deep warm architectural background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #2a2a28 0%, #1c1c1a 40%, #161614 100%)",
        }}
      />

      {/* Subtle warm ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:              "radial-gradient(ellipse 50% 40% at 65% 45%, rgba(193,101,46,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Viewport frame */}
      <div
        className="pointer-events-none absolute inset-3 z-20 border border-white/[0.03]"
        style={{ borderRadius: 1 }}
      />

      {/* Main content */}
      <div className="container-site relative z-10 flex flex-1 flex-col justify-center pb-4 pt-24 md:pt-28">
        <motion.p
          {...enter(0)}
          className="mb-6 font-sans text-[11px] font-medium tracking-[0.25em] text-copper-400 uppercase"
        >
          PRECISION HEATING TECHNOLOGY
        </motion.p>

        {/* WARMTH — oversized display */}
        <motion.div
          {...enter(0.1)}
          className="font-display font-medium text-white"
          style={{
            fontSize: "clamp(3.5rem, 2.5rem + 6vw, 7rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
          }}
        >
          WARMTH
        </motion.div>

        {/* ENGINEERED. */}
        <motion.div
          {...enter(0.2)}
          className="ml-[8%] font-display font-medium text-white/85"
          style={{
            fontSize: "clamp(2.5rem, 2rem + 4vw, 4.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          ENGINEERED.
        </motion.div>

        {/* Supporting copy */}
        <motion.div {...enter(0.35)} className="mt-8">
          <span className="mb-4 block h-px w-12 bg-copper-500/40" />
          <p className="max-w-sm font-sans text-sm leading-relaxed text-white/45">
            Beautiful floors above.
            <br />
            Precision engineering beneath.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div {...enter(0.45)} className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 border-b border-white/20 pb-1 font-sans text-xs font-medium tracking-[0.15em] text-white/50 uppercase transition-colors hover:border-white/40 hover:text-white/80"
          >
            EXPLORE HEATING SYSTEMS <span>→</span>
          </Link>
        </motion.div>

        {/* Heating mat visual */}
        <motion.div {...enter(0.55)} className="mt-12 flex justify-center">
          <HeatingMatVisual thermal={0} reveal={1} className="w-full max-w-[320px]" />
        </motion.div>
      </div>

      {/* Metadata */}
      <HeroMeta opacity={0.6} />

      {/* Scroll indicator */}
      <motion.a
        {...enter(0.7)}
        href="#next"
        aria-label="Scroll to explore"
        className="container-site relative z-20 flex flex-col items-center gap-3 pb-8 text-white/50 transition-colors hover:text-white"
      >
        <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase">
          Scroll
        </span>
        <span className="flex size-8 items-center justify-center rounded-full border border-white/25">
          <span className="size-1 rounded-full bg-current" />
        </span>
      </motion.a>
    </section>
  );
}
