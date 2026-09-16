

import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  HeartHandshake,
  Home,
  Ruler,
  ShieldCheck,
  Waves,
} from "lucide-react";

import { SpiralTimeline } from "@/components/about/spiral-timeline";
import { Team } from "@/components/about/team";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { SectionHeading } from "@/components/ui/section-heading";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "ProWarm India began with one freezing Srinagar winter. A decade later, we've warmed 12,500+ Indian homes with electric and hydronic underfloor heating.",
};

const values = [
  {
    Icon: Ruler,
    title: "Measure, then promise",
    text: "Every quote starts with a heat-loss calculation, not a rate card. If the numbers say you don't need our biggest system, we'll tell you.",
  },
  {
    Icon: ShieldCheck,
    title: "Hide nothing under the floor",
    text: "Three logged resistance tests, photographs of every cable run, and a handover pack you could give the next owner of your home.",
  },
  {
    Icon: HeartHandshake,
    title: "Answer the phone",
    text: "Support is our own engineers in Mumbai — the people who designed your system, one call away for its entire warranted life.",
  },
  {
    Icon: Compass,
    title: "Design for this country",
    text: "Indian tariffs, Indian floor build-ups, Indian winters — from a Delhi bathroom to a Leh homestay. We don't import assumptions.",
  },
];

const milestones = [
  {
    year: "2012",
    text: "Founded in Mumbai after one unforgettably cold Srinagar winter; three installers, one van.",
  },
  {
    year: "2015",
    text: "First whole-home hydronic project in Shimla — still running on its original manifold.",
  },
  {
    year: "2018",
    text: "SenseWarm thermostat line launches; the 10-year full-replacement warranty becomes standard.",
  },
  {
    year: "2021",
    text: "Crossed 5,000 installations and opened the Manali cold-climate demonstration home.",
  },
  {
    year: "2024",
    text: "Heat-pump hydronic packages launch; hotel division warms its 500th guest room.",
  },
  {
    year: "2026",
    text: "12,500 installations, 60 people, and floors warming in 23 states.",
  },
];

/* =========================================================
   ABOUT HERO
========================================================= */

function AboutHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-charcoal-950 text-white">
      {/* =====================================================
          SUBTLE ARCHITECTURAL GRID
      ====================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "90px 90px",
          maskImage:
            "linear-gradient(to right, black 0%, transparent 72%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, transparent 72%)",
        }}
      />

      {/* =====================================================
          VERY SUBTLE WARM ATMOSPHERE
      ====================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute left-[44%] top-[45%] z-[2] size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-500/[0.035] blur-[120px]"
      />

      {/* =====================================================
          HERO IMAGE
      ====================================================== */}

      <div className="absolute inset-0 z-[1] lg:left-[27%]">
        <Parallax
          amount={5}
          className="absolute inset-[-2%]"
        >
          <Image
            src="/about.png"
            alt="Warm, softly lit living room with heated flooring"
            fill
            priority
            sizes="(min-width: 1024px) 75vw, 100vw"
            className="object-cover object-center"
          />
        </Parallax>

        {/* Very subtle image treatment.
            Kept intentionally light so the photograph remains visible. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black/[0.06]"
        />
      </div>

      {/* =====================================================
          TEXT READABILITY / CINEMATIC GRADIENT
      ====================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(17,16,15,0.86) 0%,
              rgba(17,16,15,0.66) 18%,
              rgba(17,16,15,0.32) 40%,
              rgba(17,16,15,0.08) 60%,
              rgba(17,16,15,0) 78%
            ),
            linear-gradient(
              0deg,
              rgba(17,16,15,0.58) 0%,
              rgba(17,16,15,0.20) 18%,
              rgba(17,16,15,0) 42%
            )
          `,
        }}
      />

      {/* =====================================================
          MOBILE READABILITY
      ====================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] lg:hidden"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(17,16,15,0.60) 0%,
              rgba(17,16,15,0.12) 32%,
              rgba(17,16,15,0.12) 58%,
              rgba(17,16,15,0.72) 100%
            )
          `,
        }}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="container-site relative z-10 flex min-h-[100svh] flex-col">
        {/* ===================================================
            MAIN HERO
        ==================================================== */}

        <div className="relative flex flex-1 items-center py-20 md:py-24 lg:py-28">
          <div className="relative w-full max-w-[1100px]">
            {/* =================================================
                EYEBROW
            ================================================== */}

            <Reveal delay={0.05}>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-10 bg-copper-400" />

                <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/60">
                  Engineering warmth beneath architecture
                </span>
              </div>
            </Reveal>

            {/* =================================================
                HEADLINE
            ================================================== */}

            <Reveal delay={0.12}>
              <h1 className="max-w-[1100px] font-display text-[clamp(4rem,10vw,10.5rem)] font-medium leading-[0.78] tracking-[-0.065em]">
                <span className="block text-white">
                  Indian
                </span>

                <span className="relative block pl-[7vw] text-white/95">
                  winters
                </span>

                <span className="relative mt-2 block font-serif italic tracking-[-0.055em] text-copper-400">
                  end here.
                </span>
              </h1>
            </Reveal>

            {/* =================================================
                SUPPORTING CONTENT
            ================================================== */}

            <div className="mt-12 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-end lg:ml-[7vw] lg:mt-16">
              <Reveal delay={0.22}>
                <p className="max-w-[500px] text-[15px] leading-[1.8] text-white/65 md:text-base">
                  ProWarm India designs, installs and stands behind
                  underfloor heating that disappears into the architecture —
                  delivering warmth where you actually live.
                </p>
              </Reveal>
            </div>
          </div>

          {/* =================================================
              FLOATING TECHNICAL PANEL
          ================================================== */}

          <Reveal
            delay={0.35}
            className="absolute bottom-10 right-0 hidden w-[230px] xl:block"
          >
            <div className="border-l border-white/15 pl-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                  System / 01
                </span>

                <ArrowUpRight
                  className="size-3 text-copper-400"
                  aria-hidden
                />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-display text-2xl text-white">
                    Invisible
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Architecture
                  </p>
                </div>

                <div className="h-px w-full bg-white/10" />

                <div>
                  <p className="font-display text-2xl text-white">
                    Radiant
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Comfort
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ===================================================
            BOTTOM INFORMATION BAR
        ==================================================== */}

        <Reveal delay={0.4}>
          <div className="grid border-t border-white/10 py-6 sm:grid-cols-3">
            {/* Homes */}
            <div className="flex items-center gap-3 border-white/10 sm:border-r sm:pr-8">
              <Home
                className="size-4 shrink-0 text-copper-400"
                strokeWidth={1.5}
                aria-hidden
              />

              <div>
                <p className="text-[11px] font-medium text-white">
                  12,500+
                </p>

                <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/40">
                  Homes warmed
                </p>
              </div>
            </div>

            {/* States */}
            <div className="mt-5 flex items-center gap-3 border-white/10 sm:mt-0 sm:border-r sm:px-8">
              <Waves
                className="size-4 shrink-0 text-copper-400"
                strokeWidth={1.5}
                aria-hidden
              />

              <div>
                <p className="text-[11px] font-medium text-white">
                  23 states
                </p>

                <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/40">
                  Across India
                </p>
              </div>
            </div>

            {/* Since */}
            <div className="mt-5 flex items-center gap-3 sm:mt-0 sm:pl-8">
              <ShieldCheck
                className="size-4 shrink-0 text-copper-400"
                strokeWidth={1.5}
                aria-hidden
              />

              <div>
                <p className="text-[11px] font-medium text-white">
                  Since 2012
                </p>

                <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/40">
                  Engineering warmth
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* =====================================================
          DESKTOP SCROLL MARKER
      ====================================================== */}

      <div className="absolute bottom-7 right-7 z-20 hidden flex-col items-center gap-3 md:flex">
        <span className="text-[8px] uppercase tracking-[0.35em] text-white/40 [writing-mode:vertical-rl]">
          Scroll
        </span>

        <div className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="absolute left-0 top-0 h-5 w-px animate-[scrollLine_2.2s_ease-in-out_infinite] bg-copper-400" />
        </div>
      </div>

      {/* =====================================================
          MOBILE SCROLL MARKER
      ====================================================== */}

      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 md:hidden">
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/40">
          Scroll to explore
        </span>

        <ArrowDown
          className="size-3 text-copper-400"
          aria-hidden
        />
      </div>
    </section>
  );
}

/* =========================================================
   ABOUT PAGE
========================================================= */

export default function AboutPage() {
  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}

      <AboutHero />

      {/* =====================================================
          TIMELINE
      ====================================================== */}

      <section
        id="journey"
        className="container-site py-24 md:py-32"
      >
        <SectionHeading
          eyebrow="The journey"
          title="Fourteen years, one warm line"
          align="center"
        />

        <SpiralTimeline
          milestones={milestones}
          className="mt-16"
        />
      </section>

      {/* =====================================================
          STORY
      ====================================================== */}

      <section className="container-site grid items-center gap-12 py-24 md:py-32 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-card shadow-card">
            <Parallax
              amount={8}
              className="absolute inset-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1400&auto=format&fit=crop"
                alt="Warm timber-and-stone interior of a Himalayan home with heated floors"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="scale-110 object-cover"
              />
            </Parallax>
          </div>

          <div className="absolute -bottom-6 -right-4 rounded-card bg-copper-500 px-6 py-5 text-white shadow-card-hover md:-right-8">
            <p className="font-display text-3xl">
              Since 2012
            </p>

            <p className="mt-1 text-sm text-white/80">
              Warming Indian floors
            </p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Our story"
            title="It started with cold feet"
            lead="In January 2011, our founder spent a winter in his grandmother's Srinagar home — a beautiful house of deodar and stone that no bukhari or blower could make comfortable."
          />

          <Reveal delay={0.1}>
            <div className="mt-6 space-y-5 leading-relaxed text-charcoal-600">
              <p>
                The floors were the problem. Stone that held the night's
                cold until noon, in rooms where three generations had always
                lived close to the ground — eating, praying, sleeping on
                mattresses laid out each night. Heating the air did nothing
                for a life lived on the floor.
              </p>

              <p>
                Radiant floor heating was solving exactly this problem in
                Scandinavia and Canada, but in India it was an importer's
                afterthought: foreign mats sold at foreign prices, with no
                design, no installation discipline and no one to call in
                February. Arjun founded ProWarm in 2012 to do it properly —
                engineering first, for Indian homes, tariffs and winters.
              </p>

              <p>
                A decade on, we're sixty people: thermal engineers, our own
                trained installation crews, and a support line the founders
                still answer on busy mornings. The mission hasn't moved an
                inch — warmth you feel, heating you never see.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ====================================================== */}

      {/* <section className="bg-charcoal-950 py-24 text-white md:py-32">
        <div className="container-site">
          <SectionHeading
            
            eyebrow="What we won't compromise"
            title="Four rules on every job"
          />

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }) => (
              <RevealItem
                key={title}
                className="h-full"
              >
                <div className="group h-full rounded-card border border-white/10 bg-white/5 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-copper-500/50 hover:bg-white/[0.07]">
                  <span className="grid size-12 place-items-center rounded-xl bg-copper-500/15 text-copper-400 transition-transform duration-500 group-hover:scale-105">
                    <Icon
                      className="size-6"
                      aria-hidden
                    />
                  </span>

                  <h3 className="mt-5 font-display text-xl">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section> */}

<section className="relative overflow-hidden bg-charcoal-950 py-28 text-white md:py-40">
  {/* =====================================================
      BACKGROUND ARCHITECTURAL DETAILS
  ====================================================== */}

  <div
    aria-hidden
    className="pointer-events-none absolute inset-0"
  >
    {/* Fine grid */}
    <div
      className="absolute inset-0 opacity-[0.045]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(196,98,42,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(196,98,42,1) 1px, transparent 1px)
        `,
        backgroundSize: "100px 100px",
      }}
    />

    {/* Warm orange atmosphere */}
    <div className="absolute left-1/2 top-[45%] size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-500/[0.055] blur-[150px]" />

    {/* Vertical architectural lines */}
    <div className="absolute left-[8%] top-0 hidden h-full w-px bg-copper-400/[0.16] lg:block" />

    <div className="absolute right-[8%] top-0 hidden h-full w-px bg-copper-400/[0.16] lg:block" />
  </div>

  <div className="container-site relative z-10">

    {/* ===================================================
        SECTION INTRO
    ==================================================== */}

    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-24">

      {/* Small label column */}

      <Reveal>
        <div className="flex items-start gap-5">

          <span className="mt-1 font-mono text-[10px] tracking-[0.25em] text-copper-400/70">
            02
          </span>

          <div>

            <div className="flex items-center gap-3">

              <span className="h-px w-8 bg-copper-400" />

              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-copper-400">
                Our principles
              </span>

            </div>

            <p className="mt-5 max-w-[180px] text-xs leading-relaxed text-copper-200/45">
              The standards behind every system we design, install and
              support.
            </p>

          </div>
        </div>
      </Reveal>

      {/* Main heading */}

      <Reveal delay={0.08}>
        <div>

          <h2 className="max-w-4xl font-display text-[clamp(3rem,6.5vw,7rem)] font-medium leading-[0.88] tracking-[-0.055em]">

            What we{" "}

            <span className="text-copper-400/55">
              won't
            </span>{" "}

            compromise.

          </h2>

          <div className="mt-9 flex items-center gap-5">

            <span className="h-px w-16 bg-copper-400/80" />

            <p className="max-w-xl text-sm leading-[1.8] text-copper-100/55 md:text-[15px]">
              Good heating should disappear beneath the architecture.
              The engineering behind it shouldn't.
            </p>

          </div>

        </div>
      </Reveal>
    </div>

    {/* ===================================================
        PRINCIPLES
    ==================================================== */}

    <div className="mt-24 border-t border-copper-400/20 md:mt-32">

      {values.map(({ Icon, title, text }, index) => (

        <Reveal
          key={title}
          delay={index * 0.06}
        >

          <div
            className="
              group relative
              grid
              border-b border-copper-400/20
              py-9
              transition-colors duration-500
              hover:bg-copper-500/[0.035]
              md:grid-cols-[100px_1fr_1.2fr_80px]
              md:items-center
              md:gap-10
              md:py-12
              lg:grid-cols-[120px_1fr_1.4fr_100px]
            "
          >

            {/* ============================================
                NUMBER
            ============================================= */}

            <div className="mb-6 flex items-center gap-4 md:mb-0">

              <span className="font-mono text-[11px] tracking-[0.18em] text-copper-400">
                0{index + 1}
              </span>

              <span
                className="
                  h-px w-8
                  bg-copper-400/25
                  transition-all duration-500
                  group-hover:w-12
                  group-hover:bg-copper-400/70
                "
              />

            </div>

            {/* ============================================
                ICON + TITLE
            ============================================= */}

            <div className="flex items-center gap-5">

              <div
                className="
                  relative grid size-12 shrink-0 place-items-center
                  rounded-full
                  border border-copper-400/25
                  bg-copper-500/[0.035]
                  transition-all duration-500
                  group-hover:border-copper-400/70
                  group-hover:bg-copper-400/10
                  group-hover:shadow-[0_0_30px_rgba(196,98,42,0.10)]
                "
              >

                <Icon
                  className="
                    size-[18px]
                    text-copper-400/70
                    transition-colors duration-500
                    group-hover:text-copper-400
                  "
                  strokeWidth={1.3}
                  aria-hidden
                />

                {/* Orbit dot */}

                <span
                  aria-hidden
                  className="
                    absolute -right-1 -top-1
                    size-1.5 rounded-full
                    bg-transparent
                    transition-all duration-500
                    group-hover:bg-copper-400
                    group-hover:shadow-[0_0_12px_rgba(196,98,42,0.7)]
                  "
                />

              </div>

              <h3
                className="
                  font-display
                  text-[clamp(1.5rem,2.2vw,2.2rem)]
                  font-medium
                  leading-none
                  tracking-[-0.025em]
                  text-white
                  transition-transform duration-500
                  group-hover:translate-x-1
                "
              >
                {title}
              </h3>

            </div>

            {/* ============================================
                DESCRIPTION
            ============================================= */}

            <p
              className="
                mt-5 max-w-xl
                text-sm leading-[1.8]
                text-copper-100/45
                transition-colors duration-500
                group-hover:text-copper-100/70
                md:mt-0
              "
            >
              {text}
            </p>

            {/* ============================================
                ARROW
            ============================================= */}

            <div className="mt-7 flex justify-start md:mt-0 md:justify-end">

              <span
                className="
                  grid size-10 place-items-center
                  rounded-full
                  border border-copper-400/25
                  text-copper-400/50
                  transition-all duration-500
                  group-hover:border-copper-400
                  group-hover:bg-copper-400
                  group-hover:text-white
                  group-hover:shadow-[0_0_25px_rgba(196,98,42,0.18)]
                "
              >

                <svg
                  viewBox="0 0 16 16"
                  className="
                    size-3.5
                    transition-transform duration-500
                    group-hover:rotate-45
                  "
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M4 12L12 4M5 4H12V11"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </span>

            </div>

            {/* ============================================
                HOVER ACCENT
            ============================================= */}

            <span
              aria-hidden
              className="
                absolute bottom-0 left-0
                h-px w-0
                bg-copper-400
                shadow-[0_0_12px_rgba(196,98,42,0.5)]
                transition-all duration-700
                group-hover:w-24
              "
            />

          </div>

        </Reveal>

      ))}

    </div>

    {/* ===================================================
        BOTTOM STATEMENT
    ==================================================== */}

    <Reveal delay={0.2}>

      <div className="mt-16 flex flex-col gap-6 md:mt-20 md:flex-row md:items-center md:justify-between">

        <p className="max-w-md font-display text-xl leading-relaxed text-copper-100/70 md:text-2xl">

          "Warmth should be felt.

          <span className="text-copper-400/45">
            {" "}
            Good engineering should be invisible."
          </span>

        </p>

        <div className="flex items-center gap-4">

          <span className="h-px w-12 bg-copper-400/70" />

          <span className="text-[9px] uppercase tracking-[0.28em] text-copper-400/45">
            Engineered for India
          </span>

        </div>

      </div>

    </Reveal>

  </div>
</section>

      {/* =====================================================
          TEAM
      ====================================================== */}

      <Team />

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <FinalCta />
    </>
  );
}