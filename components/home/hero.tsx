
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { HERO_WORDMARK, LETTER_CHOREOGRAPHY } from "@/lib/hero-motion";
import { HeroMeta } from "./hero/hero-meta";

const EASE_SMOOTH = "power3.out";
const LETTER_COUNT = HERO_WORDMARK.length;
// "WOW" = first 3 letters, "THERM" = remaining — adjust if your wordmark differs
const SPLIT_INDEX = 3;

const WORDMARK_HOLD = 0.5;
const WORDMARK_SUPPORT_DELAY = 0.3;
const WORDMARK_SUPPORT_DUR = 0.8;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function ScrollIndicator({ visible }: { visible: boolean }) {
  return (
    <a
      href="#next"
      aria-label="Scroll to explore"
      className="absolute bottom-10 right-6 z-30 flex flex-col items-center gap-3 text-white/50 transition-colors hover:text-white md:right-10"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <span className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase">
        Scroll
      </span>
      <span className="flex size-8 items-center justify-center rounded-full border border-white/25">
        <span className="size-1 rounded-full bg-current animate-bounce motion-reduce:animate-none" />
      </span>
    </a>
  );
}

function HeroCta({ visible }: { visible: boolean }) {
  return (
    <div
      className="pointer-events-auto"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition:
          "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <Link
        href="/products"
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 font-sans text-xs font-medium tracking-[0.15em] text-white/80 uppercase backdrop-blur-sm transition-all duration-500 hover:border-copper-400/50 hover:bg-white/[0.06] hover:text-white"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-copper-400/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span className="relative">Explore Heating Systems</span>
        <span className="relative flex size-5 items-center justify-center rounded-full bg-copper-500/15 transition-all duration-500 group-hover:bg-copper-500 group-hover:text-charcoal-950">
          <span className="inline-block text-sm leading-none transition-transform duration-300 ease-out group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </Link>
    </div>
  );
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const assemblyTlRef = useRef<gsap.core.Timeline | null>(null);
  const crackTlRef = useRef<gsap.core.Timeline | null>(null);

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wowGroupRef = useRef<HTMLSpanElement>(null);
  const thermGroupRef = useRef<HTMLSpanElement>(null);

  const bgRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const wordmarkSubCopyRef = useRef<HTMLDivElement>(null);
  const wordmarkCtaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const crackPathRef = useRef<SVGPathElement>(null);
  const crackGlowRef = useRef<SVGPathElement>(null);

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    if (reducedMotion || isMobile) return;

    const container = containerRef.current;
    const pinned = pinnedRef.current;
    if (!container || !pinned) return;

    assemblyTlRef.current?.kill();
    crackTlRef.current?.kill();
    ScrollTrigger.getAll().forEach((st) => st.kill());

    /* -------------------------------------------------------------- */
    /* Initial states                                                  */
    /* -------------------------------------------------------------- */
    gsap.set(pinned, { opacity: 1 });
    gsap.set(bgRef.current, { scale: 1.05, opacity: 0 });
    gsap.set(ambientRef.current, { opacity: 1 });
    gsap.set(wordmarkRef.current, { opacity: 1 });
    gsap.set(wordmarkSubCopyRef.current, { opacity: 0, y: 12 });
    gsap.set(wordmarkCtaRef.current, { opacity: 0, y: 12 });
    gsap.set(metaRef.current, { opacity: 0 });
    gsap.set(wowGroupRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
    });
    gsap.set(thermGroupRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
    });

    if (crackPathRef.current) {
      const len = crackPathRef.current.getTotalLength();
      gsap.set(crackPathRef.current, {
        strokeDasharray: len,
        strokeDashoffset: len,
        opacity: 0,
      });
    }
    if (crackGlowRef.current) {
      const lenGlow = crackGlowRef.current.getTotalLength();
      gsap.set(crackGlowRef.current, {
        strokeDasharray: lenGlow,
        strokeDashoffset: lenGlow,
        opacity: 0,
      });
    }

    LETTER_CHOREOGRAPHY.forEach((ch, i) => {
      const el = letterRefs.current[i];
      if (!el) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      gsap.set(el, {
        x: ch.enter.x * vw * 0.5,
        y: ch.enter.y * vh * 0.5,
        rotation: ch.rotation,
        scale: ch.scaleFrom,
        filter: `blur(${ch.blur}px)`,
        opacity: 0,
      });
    });

    /* -------------------------------------------------------------- */
    /* ACT 0: Letter assembly — autoplay, not scroll-driven            */
    /* -------------------------------------------------------------- */
    const tl = gsap.timeline({ paused: true });

    tl.to(bgRef.current, { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out" }, 0);

    LETTER_CHOREOGRAPHY.forEach((ch, i) => {
      const el = letterRefs.current[i];
      if (!el) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const driftX = ch.enter.x * vw * 0.5 * ch.drift;
      const driftY = ch.enter.y * vh * 0.5 * ch.drift;

      tl.to(el, {
        x: driftX,
        y: driftY,
        opacity: 0.6,
        scale: ch.scaleFrom + (1 - ch.scaleFrom) * 0.5,
        filter: `blur(${ch.blur * 0.5}px)`,
        duration: ch.duration * 0.2,
        ease: "power1.in",
      }, ch.delay);

      tl.to(el, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        duration: ch.duration * 0.65,
        ease: "power3.out",
      }, ch.delay + ch.duration * 0.2);
    });

    const assemblySettleTime = Math.max(
      ...LETTER_CHOREOGRAPHY.map((c) => c.delay + c.duration * 0.85),
    );

    tl.to(wordmarkRef.current, { letterSpacing: "-0.03em", duration: 0.3, ease: "power2.inOut" }, assemblySettleTime);
    tl.to(wordmarkRef.current, { letterSpacing: "-0.02em", duration: 0.4, ease: "power2.out" }, assemblySettleTime + 0.3);

    const supportStart = assemblySettleTime + WORDMARK_HOLD;
    tl.to(wordmarkSubCopyRef.current, {
      opacity: 1, y: 0, duration: WORDMARK_SUPPORT_DUR, ease: EASE_SMOOTH,
    }, supportStart + WORDMARK_SUPPORT_DELAY);
    tl.to(wordmarkCtaRef.current, {
      opacity: 1, y: 0, duration: WORDMARK_SUPPORT_DUR * 0.8, ease: EASE_SMOOTH,
    }, supportStart + WORDMARK_SUPPORT_DELAY + 0.15);
    tl.to(metaRef.current, { opacity: 1, duration: 1.0, ease: "power2.out" }, supportStart + 0.2);

    tl.call(() => setShowScroll(true));

    // Lock scroll only while the assembly is playing
    const assemblyTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${Math.max(tl.duration(), 0.1) * window.innerHeight * 0.35}`,
      pin: pinned,
      pinSpacing: false,
      anticipatePin: 1,
      id: "assembly-lock",
    });

    tl.play();
    assemblyTlRef.current = tl;

    /* -------------------------------------------------------------- */
    /* ACT 1: Scroll-driven crack + corner-split — created once        */
    /* ACT 0 ends                                                       */
    /* -------------------------------------------------------------- */
    tl.eventCallback("onComplete", () => {
      assemblyTrigger.kill();
      gsap.set(pinned, { clearProps: "opacity" });

      const crackTl = gsap.timeline({ paused: true });

      // Stage A (0 → 0.35): crack draws in, wordmark shudders slightly
      crackTl.to([crackPathRef.current, crackGlowRef.current], {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power1.inOut",
      }, 0);
      crackTl.to(wordmarkRef.current, {
        keyframes: [{ x: -3 }, { x: 3 }, { x: -1.5 }, { x: 0 }],
        duration: 0.35,
        ease: "power1.inOut",
      }, 0);

      // Stage B (0.35 → 1.0): WOW drifts to top-left corner,
      // THERM drifts to bottom-right corner — premium diagonal split
      crackTl.to(wowGroupRef.current, {
        x: -520,
        y: -260,
        rotation: -8,
        scale: 0.75,
        opacity: 0,
        filter: "blur(18px)",
        duration: 0.65,
        ease: "power2.in",
      }, 0.35);
      crackTl.to(thermGroupRef.current, {
        x: 520,
        y: 260,
        rotation: 8,
        scale: 0.75,
        opacity: 0,
        filter: "blur(18px)",
        duration: 0.65,
        ease: "power2.in",
      }, 0.35);
      crackTl.to([wordmarkSubCopyRef.current, wordmarkCtaRef.current, metaRef.current], {
        opacity: 0, y: -14, duration: 0.35, ease: "power2.in",
      }, 0.4);
      crackTl.to([crackPathRef.current, crackGlowRef.current], {
        opacity: 0, scaleY: 1.6, duration: 0.4, ease: "power2.in",
      }, 0.4);

      // Background + ambient orange tint fade out together, finishing
      // at the exact same moment (progress 1.0) as the letters —
      // no leftover blank/orange frame after the split completes.
      crackTl.to([bgRef.current, ambientRef.current], {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      }, 0.5);

      crackTlRef.current = crackTl;

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=200%",
        pin: pinned,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
        id: "crack-split",
        onUpdate: (self) => {
          crackTl.progress(self.progress);
          setShowScroll(self.progress < 0.02);
        },
        onEnterBack: () => setShowScroll(true),
      });

      ScrollTrigger.refresh();
    });

    return () => {
      tl.kill();
      crackTlRef.current?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [reducedMotion, isMobile]);

  /* ================================================================ */
  /* Next-section premium reveal — fires when #next scrolls into view */
  /* ================================================================ */
  useEffect(() => {
    if (reducedMotion) return;

    const target = document.querySelector("#next");
    if (!target) return;

    const ctx = gsap.context(() => {
      gsap.set(target, { willChange: "transform, filter, opacity" });
      gsap.fromTo(
        target,
        { opacity: 0, y: 70, scale: 0.96, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          clearProps: "willChange,filter,transform",
          scrollTrigger: {
            trigger: target,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  /* ================================================================ */
  /* Reduced motion / mobile: static settled state, no crack effect   */
  /* ================================================================ */
  if (reducedMotion || isMobile) {
    return (
      <section className="relative min-h-[100svh] overflow-hidden bg-charcoal-950">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #2a2a28 0%, #1c1c1a 40%, #161614 100%)",
          }}
        />
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pt-24 pb-16 text-center md:px-10 md:pt-28">
          <div
            className="mb-8 flex font-display"
            style={{
              fontSize: "clamp(2.5rem, 1.5rem + 6vw, 5.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="text-white">
              {HERO_WORDMARK.slice(0, SPLIT_INDEX).join("")}
            </span>
            <span className="text-copper-400">
              {HERO_WORDMARK.slice(SPLIT_INDEX).join("")}
            </span>
          </div>
          <div className="mb-8 flex items-center gap-4">
            <span className="block h-px w-12 bg-copper-500/40" />
            <p className="max-w-sm font-sans text-sm leading-relaxed text-white/45">
              Beautiful floors above. Precision engineering.
            </p>
            <span className="block h-px w-12 bg-copper-500/40" />
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 border-b border-white/20 pb-1 font-sans text-xs font-medium tracking-[0.15em] text-white/50 uppercase transition-colors hover:border-white/40 hover:text-white/80"
          >
            EXPLORE HEATING SYSTEMS <span>→</span>
          </Link>
        </div>
        <HeroMeta opacity={0.6} />
        <ScrollIndicator visible={true} />
      </section>
    );
  }

  /* ================================================================ */
  /* Desktop: assembly → hold → scroll-driven crack + corner-split     */
  /* ================================================================ */
  return (
    <section ref={containerRef} className="relative">
      <div
        ref={pinnedRef}
        className="relative h-screen w-full overflow-hidden bg-charcoal-950"
      >
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/her.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,26,24,0.75) 0%, rgba(20,20,18,0.55) 40%, rgba(16,16,14,0.85) 100%)",
            }}
          />
        </div>

        <div
          ref={ambientRef}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 65% 45%, rgba(193,101,46,0.03) 0%, transparent 70%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-3 z-20 border border-white/[0.03] md:inset-5"
          style={{ borderRadius: 1 }}
        />

        <div
          ref={wordmarkRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center will-change-transform"
        >
          <div className="relative flex items-center justify-center">
            <div
              className="flex items-center font-display"
              style={{
                fontSize: "clamp(4.5rem, 3rem + 8.5vw, 11rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.01em",
              }}
            >
              <span
                ref={wowGroupRef}
                className="inline-flex text-white will-change-transform"
              >
                {HERO_WORDMARK.slice(0, SPLIT_INDEX).map((letter, i) => (
                  <span
                    key={`${letter}-${i}`}
                    ref={(el) => { letterRefs.current[i] = el; }}
                    className="inline-block will-change-transform"
                  >
                    {letter}
                  </span>
                ))}
              </span>

              {/* Crack — sits in normal flex flow, exactly between the words */}
              <svg
                className="pointer-events-none shrink-0 self-stretch"
                width="52"
                viewBox="0 0 52 240"
                preserveAspectRatio="none"
                fill="none"
                style={{ margin: "0 clamp(0.75rem, 1.2vw, 1.75rem)" }}
              >
                <path
                  ref={crackGlowRef}
                  d="M26 0 L18 30 L34 56 L14 86 L32 116 L16 146 L30 176 L20 206 L26 240"
                  stroke="#d5945e"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0"
                  style={{ filter: "blur(7px)" }}
                />
                <path
                  ref={crackPathRef}
                  d="M26 0 L18 30 L34 56 L14 86 L32 116 L16 146 L30 176 L20 206 L26 240"
                  stroke="#fdfcfa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0"
                />
              </svg>

              {/* <span
  ref={thermGroupRef}
  className="inline-flex text-[#B85F2E] will-change-transform"
> */}

<span
  ref={thermGroupRef}
  className="inline-flex text-[#FF7B00] will-change-transform"
>
  {HERO_WORDMARK.slice(SPLIT_INDEX).map((letter, i) => (
    <span
      key={`${letter}-${i + SPLIT_INDEX}`}
      ref={(el) => {
        letterRefs.current[i + SPLIT_INDEX] = el;
      }}
      className="inline-block will-change-transform"
    >
      {letter}
    </span>
  ))}
</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-5">
                        <div ref={wordmarkSubCopyRef} className="will-change-transform text-center">
            </div>
            <div ref={wordmarkCtaRef} className="will-change-transform">
              <HeroCta visible={true} />
            </div>
          </div>
        </div>

        <div ref={metaRef} className="will-change-transform">
          <HeroMeta />
        </div>

        <ScrollIndicator visible={showScroll} />
      </div>
    </section>
  );
}




