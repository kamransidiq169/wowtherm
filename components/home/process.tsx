

// "use client";

// import { useRef } from "react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   type MotionValue,
// } from "framer-motion";

// const steps = [
//   {
//     number: "01",
//     title: "Consultation",
//     description:
//       "We begin with understanding your space, your vision, and how you want to feel in it.",
//   },
//   {
//     number: "02",
//     title: "Site Assessment",
//     description:
//       "Our engineers survey your space, measure heat loss, and identify the optimal system configuration.",
//   },
//   {
//     number: "03",
//     title: "System Design",
//     description:
//       "Detailed CAD layouts, heat-loss calculations, and material specifications — approved before any work begins.",
//   },
//   {
//     number: "04",
//     title: "Installation",
//     description:
//       "Our certified installers work with precision, following the approved design with minimal disruption.",
//   },
//   {
//     number: "05",
//     title: "Commissioning",
//     description:
//       "Every circuit is tested, every zone is calibrated, and the system is handover-ready.",
//   },
  
// ];

// const HEADING = "OUR PROCESS";
// const OUR_LENGTH = 3; // "OUR" -> white, rest ("PROCESS") -> orange
// const WHITE_COLOR = "#FFFFFF";
// const ORANGE_COLOR = "#F97316"; // swap for your exact copper/orange token if different

// // ---- Scroll choreography (0 -> 1 across the whole pinned section) ----
// const HEADING_FILL_END = 0.55; // last letter has landed in place by here
// const CARDS_START = 0.14; // cards start climbing early — overlaps the heading
// const CARDS_END = 1.0;
// const CARD_STAGGER = 0.85; // 0 = fully overlapping, 1 = fully sequential
// const CARD_WINDOW_SCALE = 1.7;

// // Scattered, rotated floating positions for each card (desktop). Percentages
// // are relative to the stage; rotation gives the moodboard/award-wall feel.
// const CARD_LAYOUT = [
//   { top: "6%", left: "58%", rotate: -6, width: 250 },
//   { top: "14%", left: "10%", rotate: 5, width: 230 },
//   { top: "46%", left: "76%", rotate: 4, width: 250 },
//   { top: "58%", left: "16%", rotate: -7, width: 240 },
//   { top: "74%", left: "46%", rotate: 3, width: 230 },
//   { top: "30%", left: "40%", rotate: -3, width: 220 },
// ];

// function HeadingChar({
//   char,
//   progress,
//   range,
//   color,
// }: {
//   char: string;
//   progress: MotionValue<number>;
//   range: [number, number];
//   color: string;
// }) {
//   const y = useTransform(progress, range, [220, 0]);
//   const scale = useTransform(progress, range, [2.6, 1]);
//   const opacity = useTransform(progress, range, [0, 1]);

//   return (
//     <motion.span
//       style={{ y, scale, opacity, color }}
//       className="inline-block"
//     >
//       {char === " " ? "\u00A0" : char}
//     </motion.span>
//   );
// }

// function ScrollHeading({ progress }: { progress: MotionValue<number> }) {
//   const chars = HEADING.split("");

//   return (
//     <h2 className="relative z-20 flex flex-wrap justify-center font-display text-3xl font-semibold uppercase leading-none tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
//       {chars.map((char, i) => {
//         const start = (i / chars.length) * HEADING_FILL_END;
//         const end = ((i + 1) / chars.length) * HEADING_FILL_END;
//         const color = i < OUR_LENGTH ? WHITE_COLOR : ORANGE_COLOR;

//         return (
//           <HeadingChar
//             key={`${char}-${i}`}
//             char={char}
//             progress={progress}
//             range={[start, end]}
//             color={color}
//           />
//         );
//       })}
//     </h2>
//   );
// }

// function FloatingCard({
//   step,
//   index,
//   progress,
// }: {
//   step: (typeof steps)[number];
//   index: number;
//   progress: MotionValue<number>;
// }) {
//   const total = steps.length;
//   const span = CARDS_END - CARDS_START;
//   const perCard = span / total;
//   const start = CARDS_START + index * perCard * CARD_STAGGER;
//   const end = Math.min(start + perCard * CARD_WINDOW_SCALE, CARDS_END);

//   const layout = CARD_LAYOUT[index % CARD_LAYOUT.length];

//   const y = useTransform(progress, [start, end], [140, 0]);
//   const opacity = useTransform(progress, [start, end], [0, 1]);
//   const scale = useTransform(progress, [start, end], [0.85, 1]);

//   return (
//     <motion.div
//       style={{
//         y,
//         opacity,
//         scale,
//         rotate: layout.rotate,
//         top: layout.top,
//         left: layout.left,
//         width: layout.width,
//       }}
//       className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-white/10 bg-charcoal-900 p-5 shadow-2xl"
//     >
//       <div className="mb-3 flex size-9 shrink-0 items-center justify-center rounded-full bg-copper-500 text-xs font-medium text-white">
//         {step.number}
//       </div>
//       <h3 className="text-base font-semibold text-white md:text-lg">
//         {step.title}
//       </h3>
//       <p className="mt-2 text-xs leading-relaxed text-white/50 md:text-sm">
//         {step.description}
//       </p>
//     </motion.div>
//   );
// }

// export function Process() {
//   const pinRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: pinRef,
//     offset: ["start start", "end end"],
//   });

//   return (
//     <section className="bg-charcoal-950">
//       <div ref={pinRef} className="relative h-[600vh]">
//         <div className="sticky top-0 h-screen overflow-hidden">
//           {/* Stage: heading centered, cards scattered around it */}
//           <div className="relative mx-auto h-full max-w-[1400px] px-6">
//             <div className="absolute inset-0 flex items-center justify-center">
//               <ScrollHeading progress={scrollYProgress} />
//             </div>

//             {steps.map((step, i) => (
//               <FloatingCard
//                 key={step.number}
//                 step={step}
//                 index={i}
//                 progress={scrollYProgress}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We begin with understanding your space, your vision, and how you want to feel in it.",
  },
  {
    number: "02",
    title: "Site Assessment",
    description:
      "Our engineers survey your space, measure heat loss, and identify the optimal system configuration.",
  },
  {
    number: "03",
    title: "System Design",
    description:
      "Detailed CAD layouts, heat-loss calculations, and material specifications — approved before any work begins.",
  },
  {
    number: "04",
    title: "Installation",
    description:
      "Our certified installers work with precision, following the approved design with minimal disruption.",
  },
  {
    number: "05",
    title: "Commissioning",
    description:
      "Every circuit is tested, every zone is calibrated, and the system is handover-ready.",
  },
];

const HEADING = "OUR PROCESS";
const OUR_LENGTH = 3; // "OUR" -> white, rest ("PROCESS") -> orange
const WHITE_COLOR = "#FFFFFF";
const ORANGE_COLOR = "#F97316"; // swap for your exact copper/orange token if different

// ---- Scroll choreography (0 -> 1 across the whole pinned section) ----
const HEADING_FILL_END = 0.55; // last letter has landed in place by here
const CARDS_START = 0.14; // cards start climbing early — overlaps the heading
const CARDS_END = 1.0;
const CARD_STAGGER = 0.85; // 0 = fully overlapping, 1 = fully sequential
const CARD_WINDOW_SCALE = 1.7;

// Scattered, rotated floating positions for each card (desktop). Percentages
// are relative to the stage; rotation gives the moodboard/award-wall feel.
const CARD_LAYOUT = [
  { top: "6%", left: "58%", rotate: -6, width: 250 },
  { top: "14%", left: "10%", rotate: 5, width: 230 },
  { top: "46%", left: "76%", rotate: 4, width: 250 },
  { top: "58%", left: "16%", rotate: -7, width: 240 },
  { top: "74%", left: "46%", rotate: 3, width: 230 },
  { top: "30%", left: "40%", rotate: -3, width: 220 },
];

// Shared threshold helper so heading letters and their chime land together.
function getCharRange(index: number, total: number): [number, number] {
  const start = (index / total) * HEADING_FILL_END;
  const end = ((index + 1) / total) * HEADING_FILL_END;
  return [start, end];
}

// Shared helper so each floating card and its "pop" sound land together.
function getCardRange(index: number, total: number): [number, number] {
  const span = CARDS_END - CARDS_START;
  const perCard = span / total;
  const start = CARDS_START + index * perCard * CARD_STAGGER;
  const end = Math.min(start + perCard * CARD_WINDOW_SCALE, CARDS_END);
  return [start, end];
}

/* ------------------------------------------------------------------ */
/* Sound — letters chime in ascending pitch as OUR PROCESS lands, and  */
/* each floating card gets a soft "pop" as it settles into place.      */
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
  return sharedAudioCtx;
}

// One-time global unlock — browsers won't start/resume audio from a
// scroll event alone, only from a real click/keydown/touch gesture.
function unlockAudioContext() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const buffer = ctx.createBuffer(1, 1, 22050);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);
}

if (typeof window !== "undefined") {
  const unlock = () => {
    unlockAudioContext();
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
    window.removeEventListener("touchstart", unlock);
  };
  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
  window.addEventListener("touchstart", unlock);
}

const CHIME_SCALE = [
  659.25, // E5
  783.99, // G5
  880.0, // A5
  1046.5, // C6
  1174.66, // D6
  1318.51, // E6
  1567.98, // G6
  1760.0, // A6
  1975.53, // B6
  2093.0, // C7
];

function playLetterChime(index: number) {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  const now = ctx.currentTime;
  const freq = CHIME_SCALE[index % CHIME_SCALE.length];

  const master = ctx.createGain();
  master.gain.value = 0.045;
  master.connect(ctx.destination);

  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq * 0.97, now);
  osc.frequency.exponentialRampToValueAtTime(freq, now + 0.035);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.65, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 4500;

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.24);
}

function playCardPop() {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = 0.06;
  master.connect(ctx.destination);

  // Warm, soft "pop" — quick pitch-rise thump, rounded with a low-pass
  const body = ctx.createOscillator();
  body.type = "sine";
  body.frequency.setValueAtTime(160, now);
  body.frequency.exponentialRampToValueAtTime(340, now + 0.05);
  body.frequency.exponentialRampToValueAtTime(220, now + 0.11);

  const bodyGain = ctx.createGain();
  bodyGain.gain.setValueAtTime(0, now);
  bodyGain.gain.linearRampToValueAtTime(0.75, now + 0.008);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

  const bodyFilter = ctx.createBiquadFilter();
  bodyFilter.type = "lowpass";
  bodyFilter.frequency.value = 1400;

  body.connect(bodyFilter);
  bodyFilter.connect(bodyGain);
  bodyGain.connect(master);
  body.start(now);
  body.stop(now + 0.18);

  // Whisper-quiet shimmer overtone
  const overtone = ctx.createOscillator();
  overtone.type = "triangle";
  overtone.frequency.setValueAtTime(980, now);
  overtone.frequency.exponentialRampToValueAtTime(760, now + 0.09);

  const overtoneGain = ctx.createGain();
  overtoneGain.gain.setValueAtTime(0, now);
  overtoneGain.gain.linearRampToValueAtTime(0.1, now + 0.008);
  overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

  overtone.connect(overtoneGain);
  overtoneGain.connect(master);
  overtone.start(now);
  overtone.stop(now + 0.12);
}

function HeadingChar({
  char,
  progress,
  range,
  color,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  color: string;
}) {
  const y = useTransform(progress, range, [220, 0]);
  const scale = useTransform(progress, range, [2.6, 1]);
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <motion.span
      style={{ y, scale, opacity, color }}
      className="inline-block"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

function ScrollHeading({ progress }: { progress: MotionValue<number> }) {
  const chars = HEADING.split("");

  return (
    <h2 className="relative z-20 flex flex-wrap justify-center font-display text-3xl font-semibold uppercase leading-none tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
      {chars.map((char, i) => {
        const range = getCharRange(i, chars.length);
        const color = i < OUR_LENGTH ? WHITE_COLOR : ORANGE_COLOR;

        return (
          <HeadingChar
            key={`${char}-${i}`}
            char={char}
            progress={progress}
            range={range}
            color={color}
          />
        );
      })}
    </h2>
  );
}

function FloatingCard({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const [start, end] = getCardRange(index, steps.length);
  const layout = CARD_LAYOUT[index % CARD_LAYOUT.length];

  const y = useTransform(progress, [start, end], [140, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.85, 1]);

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        rotate: layout.rotate,
        top: layout.top,
        left: layout.left,
        width: layout.width,
      }}
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-white/10 bg-charcoal-900 p-5 shadow-2xl"
    >
      <div className="mb-3 flex size-9 shrink-0 items-center justify-center rounded-full bg-copper-500 text-xs font-medium text-white">
        {step.number}
      </div>
      <h3 className="text-base font-semibold text-white md:text-lg">
        {step.title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-white/50 md:text-sm">
        {step.description}
      </p>
    </motion.div>
  );
}

export function Process() {
  const pinRef = useRef<HTMLDivElement>(null);
  const firedLetters = useRef<boolean[]>(new Array(HEADING.length).fill(false));
  const firedCards = useRef<boolean[]>(new Array(steps.length).fill(false));

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  // Chime each heading letter as it lands, and pop each card as it
  // settles into place — both keyed off the exact same thresholds the
  // visuals use, so sound and motion stay perfectly synced. Resets on
  // scroll-back so it can replay if the user scrolls up and down again.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    HEADING.split("").forEach((_, i) => {
      const [start, end] = getCharRange(i, HEADING.length);
      const mid = (start + end) / 2;

      if (!firedLetters.current[i] && latest >= mid) {
        firedLetters.current[i] = true;
        playLetterChime(i);
      } else if (firedLetters.current[i] && latest < start - 0.008) {
        firedLetters.current[i] = false;
      }
    });

    steps.forEach((_, i) => {
      const [start, end] = getCardRange(i, steps.length);
      const mid = start + (end - start) * 0.4;

      if (!firedCards.current[i] && latest >= mid) {
        firedCards.current[i] = true;
        playCardPop();
      } else if (firedCards.current[i] && latest < start - 0.008) {
        firedCards.current[i] = false;
      }
    });
  });

  return (
    <section className="bg-charcoal-950">
      <div ref={pinRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Stage: heading centered, cards scattered around it */}
          <div className="relative mx-auto h-full max-w-[1400px] px-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <ScrollHeading progress={scrollYProgress} />
            </div>

            {steps.map((step, i) => (
              <FloatingCard
                key={step.number}
                step={step}
                index={i}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
