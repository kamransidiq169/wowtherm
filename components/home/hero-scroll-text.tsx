"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { Button } from "@/components/ui/button";

interface HeroScrollTextProps {
  progressRef: React.RefObject<number>;
}

/**
 * Smoothly interpolates opacity based on scroll progress ranges.
 */
function useTextVisibility(
  progressRef: React.RefObject<number>,
  showAt: number,
  hideAt: number,
  fadeIn?: number,
  fadeOut?: number,
) {
  const [opacity, setOpacity] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const fi = fadeIn ?? 0.03;
    const fo = fadeOut ?? 0.03;

    const tick = () => {
      const p = progressRef.current;
      let o = 0;

      if (p >= showAt && p <= hideAt) {
        if (p < showAt + fi) {
          o = (p - showAt) / fi;
        } else if (p > hideAt - fo) {
          o = (hideAt - p) / fo;
        } else {
          o = 1;
        }
      }

      setOpacity(Math.max(0, Math.min(1, o)));
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [progressRef, showAt, hideAt, fadeIn, fadeOut]);

  return opacity;
}

/**
 * Text layer component that fades based on scroll progress.
 */
function TextLayer({
  children,
  className = "",
  opacity,
}: {
  children: React.ReactNode;
  className?: string;
  opacity: number;
}) {
  if (opacity <= 0.001) return null;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      style={{ opacity, pointerEvents: opacity > 0.1 ? "auto" : "none" }}
    >
      {children}
    </div>
  );
}

/**
 * Scroll-choreographed text overlays for the hero experience.
 */
export function HeroScrollText({ progressRef }: HeroScrollTextProps) {
  const reducedMotion = usePrefersReducedMotion();

  const heroTextOpacity = useTextVisibility(progressRef, 0, 0.08, 0.04, 0.04);
  const floorMessageOpacity = useTextVisibility(progressRef, 0.08, 0.2, 0.04, 0.04);
  const warmthTextOpacity = useTextVisibility(progressRef, 0.32, 0.48, 0.04, 0.04);
  const heatTextOpacity = useTextVisibility(progressRef, 0.5, 0.62, 0.04, 0.04);
  const controlTextOpacity = useTextVisibility(progressRef, 0.64, 0.76, 0.04, 0.04);
  const invisibleTextOpacity = useTextVisibility(progressRef, 0.82, 0.98, 0.04, 0.04);

  if (reducedMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* STAGE 0: Hero text */}
      <TextLayer opacity={heroTextOpacity}>
        <div className="container-site flex flex-col items-start justify-center">
          <p className="text-eyebrow text-copper-400">PRECISION HEATING TECHNOLOGY</p>
          <h1 className="mt-6 max-w-3xl text-display-xl text-white">
            Comfort,
            <br />
            engineered into
            <br />
            every surface.
          </h1>
          <span className="mt-8 block h-px w-14 bg-white/25" aria-hidden />
          <p className="mt-6 max-w-md text-body-lg text-white/60">
            Premium heating technology designed to disappear into the
            architecture and transform how a space feels.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6 pointer-events-auto">
            <Button asChild size="lg" variant="secondary">
              <Link href="/solutions">
                Explore the Technology
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
          </div>
        </div>
      </TextLayer>

      {/* STAGE 1: Floor message */}
      <TextLayer opacity={floorMessageOpacity} className="items-end pb-32">
        <p className="text-heading-lg text-white/70 text-center">
          Beautiful spaces should feel as good as they look.
        </p>
      </TextLayer>

      {/* STAGE 2: Warmth statement */}
      <TextLayer opacity={warmthTextOpacity}>
        <div className="text-center">
          <h2 className="text-display-lg text-white">
            Warmth,
            <br />
            from the ground up.
          </h2>
          <p className="mt-6 max-w-lg mx-auto text-body-lg text-white/50">
            Engineered to distribute heat evenly across the surface —
            quietly, efficiently and precisely.
          </p>
        </div>
      </TextLayer>

      {/* STAGE 3: Even heat */}
      <TextLayer opacity={heatTextOpacity}>
        <div className="text-center">
          <h2 className="text-display-lg text-white">
            Even heat.
            <br />
            Everywhere.
          </h2>
        </div>
      </TextLayer>

      {/* STAGE 4: Smart control */}
      <TextLayer opacity={controlTextOpacity}>
        <div className="text-center">
          <div className="mb-6">
            <span className="text-display-xl text-copper-400 font-display">
              22°
            </span>
          </div>
          <p className="text-heading-md text-white/60">
            Precise control at your fingertips.
          </p>
        </div>
      </TextLayer>

      {/* STAGE 5: Final statement */}
      <TextLayer opacity={invisibleTextOpacity}>
        <div className="text-center">
          <h2 className="text-display-lg text-white">
            Technology you don&apos;t see.
            <br />
            Comfort you always feel.
          </h2>
        </div>
      </TextLayer>
    </div>
  );
}
