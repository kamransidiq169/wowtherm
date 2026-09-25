

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 py-32 md:py-40">
      {/* Literal subject-matter visual: a heating-grid pattern with a
          copper glow rising through it — warmth from below, made visible
          only here, at the close of the page. */}
      <div className="absolute inset-0" aria-hidden>
        <svg className="absolute inset-0 h-full w-full opacity-[0.18]">
          <defs>
            <pattern
              id="warmth-grid"
              width="34"
              height="34"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#EADFCC" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#warmth-grid)" />
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute bottom-0 left-1/2 h-[70%] w-[80%] -translate-x-1/2 rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(193,101,46,0.35), transparent 70%)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-transparent to-charcoal-950" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="container-site relative z-10 text-center"
      >
        <h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.1] text-white md:text-6xl">
          Let&apos;s design the warmth
          <br />
          into your next space.
        </h2>

        <p className="mx-auto mt-6 max-w-md text-base text-white/50">
          Tell us about the room, and we'll tell you exactly what it takes
          to make it disappear underfoot.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">
              Start a project
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline-light">
            <Link href="/contact">Talk to an expert</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
