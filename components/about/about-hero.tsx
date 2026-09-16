/**
 * About page hero — dark section with R3F cross-section scene and staggered text.
 *
 * Text paints independent of canvas mount (no LCP regression).
 * No ScrollTrigger pin — avoids the multi-scroll bug from homepage.
 */

import { Reveal } from "@/components/motion/reveal";
import { HeroScene } from "./hero-scene";

export function AboutHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-charcoal-950">
      {/* R3F cross-section scene — behind text */}
      <HeroScene />

      {/* Dark overlay to ensure text legibility over 3D */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(17,17,16,0.7) 0%, rgba(17,17,16,0.5) 50%, rgba(17,17,16,0.8) 100%)",
        }}
      />

      {/* Text content — independent of canvas */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 md:pb-28">
        <div className="container-site">
          <Reveal>
            <p className="text-eyebrow text-copper-400 mb-4">About WowTherm</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display-xl text-white max-w-3xl">
              Engineering comfort,
              <br />
              one surface at a time.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg text-white/50 mt-6 max-w-xl">
              {/* [PLACEHOLDER — replace with WowTherm's actual founding story] */}
              WowTherm was born from a simple conviction: warmth should never
              compromise architecture. We design invisible heating systems that
              perform beneath the surfaces you already love.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-[10px] font-medium tracking-[0.25em] uppercase font-sans">
            Scroll
          </span>
          <span className="block h-8 w-px bg-white/20" />
        </div>
      </div>
    </section>
  );
}
