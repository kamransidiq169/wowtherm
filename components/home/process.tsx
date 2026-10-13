"use client";

import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import ProcessHeatingSystem from "./ProcessHeatingSystem";

/* ============================================================
   PROCESS DATA
============================================================ */

const STEPS = [
  {
    number: "01",
    eyebrow: "DISCOVERY",
    title: "Consultation",
    description:
      "We begin by understanding the property, the architecture and the comfort requirements that will shape the system.",
    meta: "BRIEF  /  REQUIREMENTS  /  DIRECTION",
  },
  {
    number: "02",
    eyebrow: "SURVEY",
    title: "Site Assessment",
    description:
      "The site is studied in detail to understand floor construction, insulation, zones and installation conditions.",
    meta: "SURVEY  /  FLOOR BUILD-UP  /  ZONING",
  },
  {
    number: "03",
    eyebrow: "ENGINEERING",
    title: "System Design",
    description:
      "Site information is translated into a precise heating layout with considered circuits, spacing, controls and heat distribution.",
    meta: "LAYOUT  /  CIRCUITS  /  CONTROLS",
  },
  {
    number: "04",
    eyebrow: "EXECUTION",
    title: "Installation",
    description:
      "The designed system is installed with precision, from routing and spacing through to manifold connections and floor integration.",
    meta: "PIPEWORK  /  MANIFOLD  /  INTEGRATION",
  },
  {
    number: "05",
    eyebrow: "HANDOVER",
    title: "Commissioning",
    description:
      "The completed system is tested, balanced and commissioned so every zone is ready to perform as intended.",
    meta: "TESTING  /  BALANCING  /  HANDOVER",
  },
] as const;

/* ============================================================
   TIMELINE
============================================================ */

const HEADING_START = 0.025;
const HEADING_END = 0.16;

const PROCESS_START = 0.19;
const PROCESS_END = 0.94;

const STEP_SLOT =
  (PROCESS_END - PROCESS_START) / STEPS.length;

/* ============================================================
   COLORS
============================================================ */

const COPPER = "#C45A19";
const COPPER_BRIGHT = "#E87528";

/* ============================================================
   AUDIO
============================================================ */

let audioContext: AudioContext | null = null;

const HEADING_NOTES = [
  220,
  246.94,
  293.66,
  329.63,
  369.99,
  440,
  493.88,
  554.37,
  659.25,
  739.99,
];

const STEP_NOTES = [
  261.63,
  329.63,
  392,
  493.88,
  587.33,
];

function getAudioContext() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) {
      return null;
    }

    audioContext = new AudioContextClass();
  }

  return audioContext;
}

function playTone(
  frequency: number,
  duration = 0.18,
  volume = 0.025,
) {
  const ctx = getAudioContext();

  if (!ctx) return;

  if (ctx.state === "suspended") {
    void ctx.resume();
  }

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sine";

  oscillator.frequency.setValueAtTime(
    frequency,
    ctx.currentTime,
  );

  gain.gain.setValueAtTime(
    0.0001,
    ctx.currentTime,
  );

  gain.gain.exponentialRampToValueAtTime(
    volume,
    ctx.currentTime + 0.025,
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    ctx.currentTime + duration,
  );

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start();

  oscillator.stop(
    ctx.currentTime + duration + 0.025,
  );
}

function playHeadingChime(index: number) {
  const note =
    HEADING_NOTES[
      index % HEADING_NOTES.length
    ];

  playTone(note, 0.16, 0.022);
}

function playStepChime(index: number) {
  const note =
    STEP_NOTES[index % STEP_NOTES.length];

  playTone(note, 0.24, 0.035);

  window.setTimeout(() => {
    playTone(note * 2, 0.16, 0.012);
  }, 55);
}

/* ============================================================
   HELPERS
============================================================ */

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function getStepRange(index: number) {
  const start =
    PROCESS_START + index * STEP_SLOT;

  const end = start + STEP_SLOT;

  return {
    start: clamp01(start),
    end: clamp01(end),
  };
}

/* ============================================================
   HEADING LETTER
============================================================ */

interface HeadingLetterProps {
  character: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function HeadingLetter({
  character,
  index,
  total,
  progress,
}: HeadingLetterProps) {
  const start =
    HEADING_START +
    ((HEADING_END - HEADING_START) * index) /
      total;

  const end =
    HEADING_START +
    ((HEADING_END - HEADING_START) *
      (index + 1)) /
      total;

  const y = useTransform(
    progress,
    [start, end],
    [22, 0],
  );

  const opacity = useTransform(
    progress,
    [start, end],
    [0, 1],
  );

  const scale = useTransform(
    progress,
    [start, end],
    [0.97, 1],
  );

  const color = useTransform(
    progress,
    [HEADING_START, end],
    [
      index < 4
        ? "rgba(255,255,255,0.15)"
        : "rgba(196,90,25,0.15)",
      index < 4 ? "#F1F1EF" : COPPER,
    ],
  );

  if (character === " ") {
    return (
      <span
        aria-hidden="true"
        className="inline-block w-[0.25em]"
      />
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      className="inline-block"
      style={{
        y,
        opacity,
        scale,
        color,
      }}
    >
      {character}
    </motion.span>
  );
}

/* ============================================================
   MAIN HEADING
============================================================ */

function ProcessHeading({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const heading = "OUR PROCESS";

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-x-0
        top-[7vh]
        z-40
        flex
        justify-center
        px-6
        md:top-[8vh]
      "
    >
      <div className="text-center">
        <div
          className="
            font-sans
            text-[clamp(2.6rem,6.6vw,7.2rem)]
            font-light
            uppercase
            leading-[0.84]
            tracking-[-0.065em]
          "
        >
          {heading.split("").map(
            (character, index) => (
              <HeadingLetter
                key={`${character}-${index}`}
                character={character}
                index={index}
                total={heading.length}
                progress={progress}
              />
            ),
          )}
        </div>

        <motion.div
          className="
            mx-auto
            mt-6
            h-px
            w-16
            origin-center
            bg-[#C45A19]
            md:mt-7
            md:w-24
          "
          style={{
            opacity: useTransform(
              progress,
              [HEADING_START, HEADING_END],
              [0, 1],
            ),
            scaleX: useTransform(
              progress,
              [HEADING_START, HEADING_END],
              [0, 1],
            ),
          }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   STEP CONTENT
============================================================ */

function ProcessStepContent({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const step = STEPS[index];

  const { start, end } =
    getStepRange(index);

  const duration = Math.max(
    0.001,
    end - start,
  );

  const enterStart = start;

  const enterEnd = Math.min(
    end,
    start + duration * 0.22,
  );

  const holdStart = Math.min(
    end,
    start + duration * 0.32,
  );

  const exitStart = Math.min(
    end,
    start + duration * 0.76,
  );

  const exitEnd = Math.min(
    1,
    end + duration * 0.24,
  );

  /*
    Content stays completely independent
    from the heating mat.
  */

  const x = useTransform(
    progress,
    [
      enterStart,
      enterEnd,
      holdStart,
      exitStart,
      exitEnd,
    ],
    [
      110,
      0,
      0,
      0,
      -90,
    ],
  );

  const opacity = useTransform(
    progress,
    [
      enterStart,
      enterEnd,
      exitStart,
      exitEnd,
    ],
    [
      0,
      1,
      1,
      0,
    ],
  );

  const scale = useTransform(
    progress,
    [
      enterStart,
      enterEnd,
      exitStart,
      exitEnd,
    ],
    [
      0.96,
      1,
      1,
      0.985,
    ],
  );

  const numberY = useTransform(
    progress,
    [enterStart, enterEnd],
    [20, 0],
  );

  const lineScale = useTransform(
    progress,
    [enterStart, enterEnd],
    [0, 1],
  );

  return (
    <motion.div
      className="
        pointer-events-none
        absolute
        right-[6vw]
        top-1/2
        z-30
        w-[min(31rem,30vw)]
        -translate-y-1/2

        max-md:left-6
        max-md:right-6
        max-md:top-auto
        max-md:bottom-[8vh]
        max-md:w-auto
        max-md:translate-y-0
      "
      style={{
        x,
        opacity,
        scale,
      }}
    >
      {/* tiny category */}

      <div
        className="
          flex
          items-center
          gap-3
          font-mono
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-white/35
        "
      >
        <span>
          {step.eyebrow}
        </span>

        <span className="h-px w-8 bg-white/15" />
      </div>

      {/* number */}

      <motion.div
        className="
          mt-8
          font-mono
          text-[11px]
          tracking-[0.18em]
          text-[#C45A19]
        "
        style={{
          y: numberY,
        }}
      >
        {step.number}
      </motion.div>

      {/* title */}

      <h2
        className="
          mt-3
          font-sans
          text-[clamp(2.7rem,4vw,5rem)]
          font-light
          leading-[0.88]
          tracking-[-0.055em]
          text-[#F1F1EF]
        "
      >
        {step.title}
      </h2>

      {/* editorial line */}

      <motion.div
        className="
          mt-8
          h-px
          w-full
          origin-left
          bg-[#C45A19]
        "
        style={{
          scaleX: lineScale,
        }}
      />

      {/* description */}

      <p
        className="
          mt-6
          max-w-[29rem]
          font-sans
          text-[clamp(0.88rem,0.95vw,1.02rem)]
          font-light
          leading-[1.6]
          tracking-[-0.01em]
          text-white/48
        "
      >
        {step.description}
      </p>

      {/* technical metadata */}

      <div
        className="
          mt-8
          font-mono
          text-[8px]
          uppercase
          tracking-[0.15em]
          text-white/25
        "
      >
        {step.meta}
      </div>
    </motion.div>
  );
}

/* ============================================================
   BOTTOM TIMELINE
============================================================ */

function ProcessTimeline({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <div
      className="
        pointer-events-none
        absolute
        bottom-[5.5vh]
        right-[6vw]
        z-40
        hidden
        md:block
      "
    >
      <div className="mb-3 font-mono text-[8px] uppercase tracking-[0.18em] text-white/20">
        Process
      </div>

      <div className="flex items-center">
        {STEPS.map((step, index) => {
          const { start, end } =
            getStepRange(index);

          const activeOpacity =
            useTransform(
              progress,
              [start, end],
              [0.18, 1],
            );

          const lineScale =
            useTransform(
              progress,
              [start, end],
              [0, 1],
            );

          return (
            <div
              key={step.number}
              className="flex items-center"
            >
              <motion.span
                className="
                  font-mono
                  text-[8px]
                  tracking-[0.08em]
                "
                style={{
                  opacity: activeOpacity,
                  color: COPPER,
                }}
              >
                {step.number}
              </motion.span>

              {index !==
                STEPS.length - 1 && (
                <div
                  className="
                    relative
                    mx-3
                    h-px
                    w-10
                    overflow-hidden
                    bg-white/[0.12]
                    lg:w-14
                  "
                >
                  <motion.div
                    className="
                      absolute
                      inset-y-0
                      left-0
                      w-full
                      origin-left
                      bg-[#C45A19]
                    "
                    style={{
                      scaleX: lineScale,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   PROCESS
============================================================ */

export function Process() {
  const rootRef =
    useRef<HTMLElement | null>(null);

  const previousProgress =
    useRef(0);

  const audioPlayed =
    useRef<Set<string>>(new Set());

  const { scrollYProgress } =
    useScroll({
      target: rootRef,
      offset: [
        "start start",
        "end end",
      ],
    });

  /* ==========================================================
     AUDIO / SCROLL
  ========================================================== */

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      const previous =
        previousProgress.current;

      /*
        Only trigger sounds while moving DOWN.
        When scrolling back up, thresholds are
        cleared so they can play again.
      */

      if (latest > previous) {
        /* heading */

        const heading =
          "OURPROCESS";

        heading.split("").forEach(
          (_, index) => {
            const threshold =
              HEADING_START +
              ((HEADING_END -
                HEADING_START) *
                index) /
                heading.length;

            const key =
              `heading-${index}`;

            if (
              latest >= threshold &&
              !audioPlayed.current.has(key)
            ) {
              audioPlayed.current.add(key);

              playHeadingChime(index);
            }
          },
        );

        /* steps */

        STEPS.forEach(
          (_, index) => {
            const { start } =
              getStepRange(index);

            const key =
              `step-${index}`;

            if (
              latest >= start &&
              !audioPlayed.current.has(key)
            ) {
              audioPlayed.current.add(key);

              playStepChime(index);
            }
          },
        );
      }

      /*
        Reset once the user scrolls back above
        the relevant threshold.
      */

      audioPlayed.current.forEach(
        (key) => {
          if (key.startsWith("heading-")) {
            const index = Number(
              key.replace(
                "heading-",
                "",
              ),
            );

            const heading =
              "OURPROCESS";

            const threshold =
              HEADING_START +
              ((HEADING_END -
                HEADING_START) *
                index) /
                heading.length;

            if (
              latest <
              threshold - 0.012
            ) {
              audioPlayed.current.delete(
                key,
              );
            }
          }

          if (key.startsWith("step-")) {
            const index = Number(
              key.replace(
                "step-",
                "",
              ),
            );

            const { start } =
              getStepRange(index);

            if (
              latest <
              start - 0.012
            ) {
              audioPlayed.current.delete(
                key,
              );
            }
          }
        },
      );

      previousProgress.current =
        latest;
    },
  );

  /* ==========================================================
     ENABLE AUDIO AFTER USER INTERACTION
  ========================================================== */

  const enableAudio = useCallback(() => {
    const ctx =
      getAudioContext();

    if (
      ctx &&
      ctx.state === "suspended"
    ) {
      void ctx.resume();
    }
  }, []);

  useEffect(() => {
    window.addEventListener(
      "pointerdown",
      enableAudio,
      { passive: true },
    );

    window.addEventListener(
      "wheel",
      enableAudio,
      { passive: true },
    );

    window.addEventListener(
      "touchstart",
      enableAudio,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "pointerdown",
        enableAudio,
      );

      window.removeEventListener(
        "wheel",
        enableAudio,
      );

      window.removeEventListener(
        "touchstart",
        enableAudio,
      );
    };
  }, [enableAudio]);

  /* ==========================================================
     AMBIENT EFFECTS
  ========================================================== */

  const glowOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.3, 0.65, 1],
      [0.035, 0.075, 0.055, 0.025],
    );

  return (
    <section
      ref={rootRef}
      aria-label="Our process"
      className="
        relative
        h-[900vh]
        w-full
        bg-[#080808]
      "
    >
      <div
        className="
          sticky
          top-0
          h-[100svh]
          min-h-[42rem]
          w-full
          overflow-hidden
          bg-[#080808]
        "
      >
        {/* ======================================================
           AMBIENT LIGHT
        ====================================================== */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[28%]
            top-[53%]
            z-0
            h-[50vmin]
            w-[50vmin]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#C45A19]
            blur-[150px]
          "
          style={{
            opacity: glowOpacity,
          }}
        />

        {/* ======================================================
           ULTRA SUBTLE ARCHITECTURAL GRID
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            opacity-[0.022]
            [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
            [background-size:100px_100px]
          "
        />

        {/* ======================================================
           TOP BRAND LINE
        ====================================================== */}

        <div
          className="
            absolute
            left-6
            right-6
            top-5
            z-50
            flex
            items-center
            justify-between
            md:left-[4vw]
            md:right-[4vw]
            md:top-7
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/22
            "
          >
            WOWTHERM
          </span>

          <span
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/20
            "
          >
            UNDERFLOOR HEATING / SYSTEM
          </span>
        </div>

        {/* ======================================================
           HEADING
        ====================================================== */}

        <ProcessHeading
          progress={scrollYProgress}
        />

        {/* ======================================================
           HEATING SYSTEM — LEFT
        ====================================================== */}

        <div
          className="
            absolute
            left-[3.5vw]
            top-[54%]
            z-10
            w-[min(59vw,63rem)]
            -translate-y-1/2

            max-md:left-1/2
            max-md:top-[42%]
            max-md:w-[91vw]
            max-md:-translate-x-1/2
          "
        >
          <ProcessHeatingSystem
            progress={scrollYProgress}
          />
        </div>

        {/* ======================================================
           CONTENT — RIGHT
           IMPORTANT: completely separate from the mat
        ====================================================== */}

        <div className="absolute inset-0 z-30">
          {STEPS.map((step, index) => (
            <ProcessStepContent
              key={step.number}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* ======================================================
           TIMELINE
        ====================================================== */}

        <ProcessTimeline
          progress={scrollYProgress}
        />

        {/* ======================================================
           SMALL BOTTOM LABEL
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-6
            left-6
            z-40
            font-mono
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/18
            md:bottom-7
            md:left-[4vw]
          "
        >
          ENGINEERED COMFORT
        </div>

        {/* ======================================================
           MOBILE INDEX
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-6
            right-6
            z-40
            font-mono
            text-[8px]
            tracking-[0.15em]
            text-white/18
            md:hidden
          "
        >
          01 — 05
        </div>
      </div>
    </section>
  );
}