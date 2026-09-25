

"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const benefits = [
  {
    number: "01",
    title: "Invisible comfort",
    description:
      "No radiators, no vents, no visible hardware. Just warmth that fills the room from below.",
    image: u("photo-1600585154340-be6161a56a0c"),
  },
  {
    number: "02",
    title: "Precision control",
    description:
      "Smart thermostats learn your routine and maintain temperature within ±0.5°C of your target.",
    image: u("photo-1585060544812-6b45742d762f"),
  },
  {
    number: "03",
    title: "Energy-conscious",
    description:
      "Radiant heating uses up to 40% less energy than conventional forced-air systems.",
    image: u("photo-1560448204-e02f11c3d0e2"),
  },
  {
    number: "04",
    title: "Silent operation",
    description:
      "Zero moving parts means zero noise. The perfect environment for rest and concentration.",
    image: u("photo-1615873968403-89e068629265"),
  },
  {
    number: "05",
    title: "Designed around architecture",
    description:
      "Systems integrate into any floor build-up without compromising design intent.",
    image: u("photo-1631679706909-1844bbd07221"),
  },
];

// "WOW" fills white, "THERM" fills orange.
const WORD = "WOWTHERM";
const WOW_LENGTH = 3;
const DIM_COLOR = "rgba(255, 255, 255, 0.12)";
const WHITE_COLOR = "#FFFFFF";
const ORANGE_COLOR = "#F97316"; // swap for your exact copper/orange token if different

// ---- Scroll choreography (0 -> 1 across the whole pinned section) ----
const WORD_FILL_END = 0.16; // characters finish filling by here
const WORD_RECEDE_START = 0.14; // "Why" + WOWTHERM start receding together
const WORD_RECEDE_END = 0.24; // fully settled as a faint watermark
const CARDS_START = 0.26; // first card starts entering
const CARDS_END = 1.0; // last card fully settled
const CARD_STAGGER = 0.7; // 0 = fully overlapping, 1 = fully sequential
const CARD_WINDOW_SCALE = 1.7; // how wide each card's own reveal window is

// zigzag resting offsets (px, desktop) — up / down / up / down...
const ZIGZAG_Y = [-36, 28, -18, 34, -26, 20];

// Shared threshold calculation so both the visual fill and the sound
// trigger stay perfectly in sync on the same scroll range.
function getCharRange(index: number, total: number): [number, number] {
  const start = (index / total) * WORD_FILL_END;
  const end = ((index + 1) / total) * WORD_FILL_END;
  return [start, end];
}

/* ------------------------------------------------------------------ */
/* Letter-fill sound — a short ascending chime per letter, forming a   */
/* pleasant rising scale as WOWTHERM fills in while scrolling.         */
/* ------------------------------------------------------------------ */
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;
    sharedAudioCtx = new Ctx();
  }
  if (sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

// A pleasant ascending pentatonic run — one note per letter of WOWTHERM.
const CHIME_SCALE = [
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.0, // A5
  1046.5, // C6
  1174.66, // D6
  1318.51, // E6
];

function playLetterChime(index: number) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freq = CHIME_SCALE[index % CHIME_SCALE.length];

  const master = ctx.createGain();
  master.gain.value = 0.05;
  master.connect(ctx.destination);

  // Core tone — soft sine, gentle pitch-up for a "glassy chime" character
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq * 0.98, now);
  osc.frequency.exponentialRampToValueAtTime(freq, now + 0.04);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.7, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 4200;

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.3);

  // A whisper-quiet octave overtone for shimmer
  const overtone = ctx.createOscillator();
  overtone.type = "sine";
  overtone.frequency.value = freq * 2;

  const overtoneGain = ctx.createGain();
  overtoneGain.gain.setValueAtTime(0, now);
  overtoneGain.gain.linearRampToValueAtTime(0.12, now + 0.01);
  overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

  overtone.connect(overtoneGain);
  overtoneGain.connect(master);
  overtone.start(now);
  overtone.stop(now + 0.2);
}

function ScrollFillChar({
  char,
  progress,
  range,
  finalColor,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  finalColor: string;
}) {
  const color = useTransform(progress, range, [DIM_COLOR, finalColor]);
  return (
    <motion.span style={{ color }} className="inline-block">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

function ScrollFillHeading({ progress }: { progress: MotionValue<number> }) {
  const chars = WORD.split("");

  // "Why" + WOWTHERM recede together into a faint background watermark —
  // never fully disappearing, just stepping out of focus.
  const opacity = useTransform(
    progress,
    [WORD_RECEDE_START, WORD_RECEDE_END],
    [1, 0.07]
  );
  const scale = useTransform(
    progress,
    [WORD_RECEDE_START, WORD_RECEDE_END],
    [1, 0.82]
  );
  const y = useTransform(
    progress,
    [WORD_RECEDE_START, WORD_RECEDE_END],
    [0, -70]
  );
  const blur = useTransform(
    progress,
    [WORD_RECEDE_START, WORD_RECEDE_END],
    [0, 3]
  );
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{ opacity, scale, y, filter }}
      className="flex flex-col items-center select-none"
    >
      <span className="mb-2 font-display text-2xl uppercase tracking-[0.2em] text-copper-400 md:mb-4 md:text-4xl">
        Why
      </span>

      <h2 className="font-display font-semibold text-[16vw] leading-none tracking-tight md:text-[10vw]">
        {chars.map((char, i) => {
          const range = getCharRange(i, chars.length);
          const finalColor = i < WOW_LENGTH ? WHITE_COLOR : ORANGE_COLOR;

          return (
            <ScrollFillChar
              key={`${char}-${i}`}
              char={char}
              progress={progress}
              range={range}
              finalColor={finalColor}
            />
          );
        })}
      </h2>
    </motion.div>
  );
}

function BenefitCard({
  benefit,
  index,
  progress,
}: {
  benefit: (typeof benefits)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const total = benefits.length;
  const span = CARDS_END - CARDS_START;
  const step = (span / total) * CARD_STAGGER;
  const windowLength = (span / total) * CARD_WINDOW_SCALE;

  const start = CARDS_START + index * step;
  const end = Math.min(start + windowLength, CARDS_END);

  const finalY = ZIGZAG_Y[index % ZIGZAG_Y.length];
  const enterY = finalY + 110;
  const rotate = index % 2 === 0 ? -4 : 4;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [enterY, finalY]);
  const scale = useTransform(progress, [start, end], [0.82, 1]);
  const cardRotate = useTransform(progress, [start, end], [rotate, 0]);

  return (
    <motion.div
      style={{ opacity, y, scale, rotate: cardRotate }}
      className="group shrink-0"
    >
      {/* Gradient-ring border: soft copper ring at rest, deepens on hover */}
      <div className="rounded-[1.75rem] bg-gradient-to-b from-copper-500/25 via-black/[0.04] to-transparent p-[1px] transition-colors duration-500 group-hover:from-copper-500/70 group-hover:via-copper-400/15">
        <div className="relative flex w-[220px] flex-col overflow-hidden rounded-[calc(1.75rem-1px)] bg-[#fdf6ee] p-5 shadow-[0_30px_70px_-25px_rgba(120,70,30,0.35)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 md:w-[270px] md:p-6">
          {/* Oversized faint number — premium background typography accent */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-3 right-3 font-display text-7xl font-bold leading-none text-black/[0.05] select-none md:-top-4 md:text-8xl"
          >
            {benefit.number}
          </span>

          {/* Soft copper glow that blooms in on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 15% 0%, rgba(217,119,6,0.14) 0%, transparent 55%)",
            }}
          />

          {/* Image */}
          <div className="relative mb-5 h-24 w-full overflow-hidden rounded-2xl ring-1 ring-black/[0.06] md:h-28">
            <Image
              src={benefit.image}
              alt={benefit.title}
              fill
              sizes="270px"
              className="object-cover brightness-95 saturate-[0.9] transition-all duration-700 ease-out group-hover:scale-[1.07] group-hover:brightness-100 group-hover:saturate-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-copper-500/10 via-transparent to-transparent" />
          </div>

          {/* Rule badge */}
          <div className="relative mb-3 flex items-center gap-2">
            <span className="flex size-4 items-center justify-center rounded-full border border-copper-500/50 transition-colors duration-500 group-hover:border-copper-500">
              <span className="size-1.5 rounded-full bg-copper-500" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-charcoal-900/45">
              Benefit
            </span>
          </div>

          <h3 className="relative font-display text-lg uppercase leading-tight tracking-tight text-charcoal-900 transition-colors duration-500 group-hover:text-copper-600 md:text-xl">
            {benefit.title}
          </h3>

          {/* Thin gradient divider */}
          <span className="relative my-3 block h-px w-full bg-gradient-to-r from-black/10 via-black/5 to-transparent" />

          <p className="relative text-xs leading-relaxed text-charcoal-900/55 md:text-sm">
            {benefit.description}
          </p>

          {/* Discreet arrow cue, fades in on hover */}
          <div className="relative mt-4 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-copper-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span>Learn more</span>
            <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Benefits() {
  const pinRef = useRef<HTMLDivElement>(null);
  const firedLetters = useRef<boolean[]>(new Array(WORD.length).fill(false));

  // Progress goes 0 -> 1 across the full height of the pinned wrapper below.
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  // Fire one chime per letter, exactly as it crosses the midpoint of its
  // own fill window — same timing math the heading uses, so sound and
  // color change land together. Resets on scroll-back so it can replay.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    WORD.split("").forEach((_, i) => {
      const [start, end] = getCharRange(i, WORD.length);
      const mid = (start + end) / 2;

      if (!firedLetters.current[i] && latest >= mid) {
        firedLetters.current[i] = true;
        playLetterChime(i);
      } else if (firedLetters.current[i] && latest < start - 0.008) {
        firedLetters.current[i] = false;
      }
    });
  });

  return (
    <section className="bg-charcoal-950">
      {/* Pinned: "Why" + word fill -> recede to watermark -> cards reveal one by one */}
      <div ref={pinRef} className="relative h-[650vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Watermark layer */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <ScrollFillHeading progress={scrollYProgress} />
          </div>

          {/* Cards layer */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-5 px-6 md:flex-nowrap md:gap-8">
              {benefits.map((benefit, i) => (
                <BenefitCard
                  key={benefit.number}
                  benefit={benefit}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}