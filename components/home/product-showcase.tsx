
"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getFeaturedProducts } from "@/lib/products";

/**
 * ProductShowcase
 * ----------------
 * A 3D "coverflow" style carousel. The active card sits centered, full
 * brightness and full size. Neighbouring cards fan out to either side,
 * shrinking, rotating in perspective, fading, and blurring the further
 * they get from the active card — exactly like the reference design.
 */

const CARD_WIDTH = 320; // px, mirrors md breakpoint from reference
const CARD_HEIGHT = 500;
const X_STEP = 220; // horizontal offset per step away from center
const ROTATE_STEP = 8; // deg
const SCALE_STEP = 0.08;
const BLUR_STEP = 1.6; // px
const MAX_VISIBLE_STEPS = 3; // cards further than this are fully hidden

export function ProductShowcase() {
  const featured = getFeaturedProducts();
  const [activeIndex, setActiveIndex] = useState(0);
  const count = featured.length;

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % count) + count) % count;
      setActiveIndex(next);
    },
    [count]
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Precompute the transform / style for every card relative to activeIndex.
  const cardStyles = useMemo(() => {
    return featured.map((_, i) => {
      // Signed distance from the active card, wrapped to the shortest path.
      let diff = i - activeIndex;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;

      const absDiff = Math.abs(diff);
      const isActive = diff === 0;
      const clamped = Math.min(absDiff, MAX_VISIBLE_STEPS);

      const translateX = diff * X_STEP;
      const scale = Math.max(1 - clamped * SCALE_STEP, 0.72);
      const rotateY = -diff * ROTATE_STEP;
      const blur = clamped * BLUR_STEP;
      const opacity = isActive ? 1 : Math.max(0.45 - clamped * 0.14, 0);
      const zIndex = 100 - clamped;
      const pointerEvents = opacity > 0.05 ? ("auto" as const) : ("none" as const);

      return {
        diff,
        isActive,
        style: {
          transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
          opacity,
          zIndex,
          filter: blur > 0 ? `blur(${blur}px)` : "none",
          pointerEvents,
        },
      };
    });
  }, [featured, activeIndex, count]);

  return (
    <section className="bg-[#F7F2E9] py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="block h-px w-8 bg-copper-500/50" />
            <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-copper-600 uppercase">
              The Systems
            </span>
            <span className="block h-px w-8 bg-copper-500/50" />
          </div>
          <h2 className="font-display text-4xl leading-tight text-charcoal-900 sm:text-5xl md:text-6xl">
            One <span className="font-accent text-[0.85em] text-copper-500">warm floor</span>,
            <br className="hidden sm:block" /> multiple ways to get there
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-charcoal-900/55 md:text-base">
            Electric mats for quick renovations, water-based systems for whole homes, and smart controls that tie them together.
          </p>
        </div>

        <RevealGroup>
          <RevealItem>
            <div className="relative mt-16 md:mt-20">
              {/* Stage */}
              <div
                className="relative mx-auto h-[440px] md:h-[560px]"
                style={{ perspective: "1400px" }}
              >
                {featured.map((product, i) => {
                  const { isActive, style } = cardStyles[i];

                  return (
                    <button
                      key={product.slug}
                      type="button"
                      aria-label={`Show ${product.name}`}
                      aria-current={isActive}
                      onClick={() => goTo(i)}
                      className="absolute top-1/2 left-1/2 text-left rounded-[var(--radius-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-400"
                      style={{
                        width: CARD_WIDTH,
                        height: CARD_HEIGHT,
                        marginLeft: -CARD_WIDTH / 2,
                        marginTop: -CARD_HEIGHT / 2,
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                        transition:
                          "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease, filter 450ms ease",
                        ...style,
                      }}
                    >
                      <div className="group relative h-full w-full overflow-hidden rounded-[var(--radius-card)] bg-charcoal-900 shadow-2xl">
                        {/* Image */}
                        <div className="absolute inset-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="320px"
                            className={`object-cover transition-transform duration-700 ease-out ${
                              isActive ? "group-hover:scale-105" : ""
                            }`}
                            priority={isActive}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-7">
                          <p className="text-eyebrow text-copper-400 mb-2">
                            {product.category}
                          </p>
                          <h3 className="text-heading-lg text-white mb-2">
                            {product.name}
                          </h3>
                          <p className="text-body-sm text-white/60 line-clamp-2">
                            {product.tagline}
                          </p>

                          {isActive ? (
                            <Link
                              href={`/products/${product.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-medium tracking-[0.1em] text-copper-400 uppercase transition-colors hover:text-copper-300"
                            >
                              <span>Explore</span>
                              <ArrowUpRight
                                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden
                              />
                            </Link>
                          ) : (
                            <span className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-medium tracking-[0.1em] text-white/40 uppercase">
                              Tap to view
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Nav arrows */}
              <button
                type="button"
                aria-label="Previous product"
                onClick={goPrev}
                className="absolute left-0 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-md transition-colors hover:bg-black/5 md:left-4"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next product"
                onClick={goNext}
                className="absolute right-0 top-1/2 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-md transition-colors hover:bg-black/5 md:right-4"
              >
                <ChevronRight className="size-5" />
              </button>

              {/* Dots */}
              <div className="mt-8 flex items-center justify-center gap-2">
                {featured.map((product, i) => (
                  <button
                    key={product.slug}
                    type="button"
                    aria-label={`Go to ${product.name}`}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-8 bg-copper-500"
                        : "w-1.5 bg-black/15 hover:bg-black/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}