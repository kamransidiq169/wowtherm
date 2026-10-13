
// "use client";

// import { useRef } from "react";
// import Image from "next/image";
// import { ArrowUpRight } from "lucide-react";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useMotionValueEvent,
//   type MotionValue,
// } from "framer-motion";

// /* -------------------------------------------------------------------------- */
// /* IMAGE HELPER                                                               */
// /* -------------------------------------------------------------------------- */

// const u = (id: string, w = 1600) =>
//   `https://images.unsplash.com/${id}?q=90&w=${w}&auto=format&fit=crop`;

// /* -------------------------------------------------------------------------- */
// /* BENEFITS                                                                   */
// /* -------------------------------------------------------------------------- */

// const benefits = [
//   {
//     number: "01",
//     title: "Invisible comfort",
//     description:
//       "No radiators, no vents, no visible hardware. Just warmth that fills the room from below.",
//     image: u("photo-1600585154340-be6161a56a0c"),
//   },
//   {
//     number: "02",
//     title: "Precision control",
//     description:
//       "Smart thermostats learn your routine and maintain temperature within ±0.5°C of your target.",
//     image: u("photo-1585060544812-6b45742d762f"),
//   },
//   {
//     number: "03",
//     title: "Energy-conscious",
//     description:
//       "Radiant heating uses up to 40% less energy than conventional forced-air systems.",
//     image: u("photo-1560448204-e02f11c3d0e2"),
//   },
//   {
//     number: "04",
//     title: "Silent operation",
//     description:
//       "Zero moving parts means zero noise. The perfect environment for rest and concentration.",
//     image: u("photo-1615873968403-89e068629265"),
//   },
//   {
//     number: "05",
//     title: "Designed around architecture",
//     description:
//       "Systems integrate into any floor build-up without compromising design intent.",
//     image: u("photo-1631679706909-1844bbd07221"),
//   },
// ];

// /* -------------------------------------------------------------------------- */
// /* WORD                                                                       */
// /* -------------------------------------------------------------------------- */

// const WORD = "WOWTHERM";
// const WOW_LENGTH = 3;

// const DIM_COLOR = "rgba(255, 255, 255, 0.10)";
// const WHITE_COLOR = "#FFFFFF";
// const ORANGE_COLOR = "#F97316";

// /* -------------------------------------------------------------------------- */
// /* NORMALIZED SCROLL CHOREOGRAPHY                                             */
// /*                                                                            */
// /* Everything stays safely between 0 and 1.                                  */
// /*                                                                            */
// /* 0.00 ─ intro                                                              */
// /* 0.04 ─ WOWTHERM begins                                                     */
// /* 0.72 ─ WOWTHERM sequence complete                                          */
// /* 0.72 ─ 1.00 ─ cards settle / outro                                         */
// /* -------------------------------------------------------------------------- */

// const SEQUENCE_START = 0.04;
// const SEQUENCE_END = 0.72;

// const SEQUENCE_LENGTH =
//   SEQUENCE_END - SEQUENCE_START;

// const LETTER_SLOT =
//   SEQUENCE_LENGTH / WORD.length;

// /*
//  * Each letter gets ~62% of its slot for the actual fill.
//  */
// const LETTER_LENGTH =
//   LETTER_SLOT * 0.62;

// /*
//  * Small pause between completed letter and card.
//  */
// const CARD_GAP =
//   LETTER_SLOT * 0.08;

// /*
//  * Card reveal takes the remaining ~30%.
//  */
// const CARD_LENGTH =
//   LETTER_SLOT * 0.30;

// /* -------------------------------------------------------------------------- */
// /* SAFE RANGE HELPERS                                                         */
// /* -------------------------------------------------------------------------- */

// function clamp01(value: number) {
//   return Math.min(1, Math.max(0, value));
// }

// function getLetterRange(
//   index: number
// ): [number, number] {
//   const start =
//     SEQUENCE_START +
//     index * LETTER_SLOT;

//   const end =
//     start +
//     LETTER_LENGTH;

//   return [
//     clamp01(start),
//     clamp01(end),
//   ];
// }

// function getCardRange(
//   index: number
// ): [number, number] {
//   const letterStart =
//     SEQUENCE_START +
//     index * LETTER_SLOT;

//   const start =
//     letterStart +
//     LETTER_LENGTH +
//     CARD_GAP;

//   const end =
//     start +
//     CARD_LENGTH;

//   return [
//     clamp01(start),
//     clamp01(end),
//   ];
// }

// /* -------------------------------------------------------------------------- */
// /* AUDIO                                                                      */
// /* -------------------------------------------------------------------------- */

// let sharedAudioCtx: AudioContext | null = null;

// function getAudioContext(): AudioContext | null {
//   if (typeof window === "undefined") {
//     return null;
//   }

//   if (!sharedAudioCtx) {
//     const Ctx =
//       window.AudioContext ||
//       (
//         window as unknown as {
//           webkitAudioContext: typeof AudioContext;
//         }
//       ).webkitAudioContext;

//     if (!Ctx) {
//       return null;
//     }

//     sharedAudioCtx = new Ctx();
//   }

//   if (sharedAudioCtx.state === "suspended") {
//     void sharedAudioCtx.resume();
//   }

//   return sharedAudioCtx;
// }

// /*
//  * One note for each letter.
//  */
// const CHIME_SCALE = [
//   523.25,
//   587.33,
//   659.25,
//   783.99,
//   880.0,
//   1046.5,
//   1174.66,
//   1318.51,
// ];

// function playLetterChime(index: number) {
//   const ctx = getAudioContext();

//   if (!ctx) {
//     return;
//   }

//   const now = ctx.currentTime;

//   const frequency =
//     CHIME_SCALE[index % CHIME_SCALE.length];

//   const master = ctx.createGain();

//   master.gain.setValueAtTime(
//     0.045,
//     now
//   );

//   master.connect(ctx.destination);

//   /* ---------------------------------------------------------------------- */
//   /* MAIN TONE                                                               */
//   /* ---------------------------------------------------------------------- */

//   const oscillator =
//     ctx.createOscillator();

//   oscillator.type = "sine";

//   oscillator.frequency.setValueAtTime(
//     frequency * 0.985,
//     now
//   );

//   oscillator.frequency.exponentialRampToValueAtTime(
//     frequency,
//     now + 0.055
//   );

//   const gain =
//     ctx.createGain();

//   gain.gain.setValueAtTime(
//     0.0001,
//     now
//   );

//   gain.gain.exponentialRampToValueAtTime(
//     0.72,
//     now + 0.018
//   );

//   gain.gain.exponentialRampToValueAtTime(
//     0.0001,
//     now + 0.42
//   );

//   const filter =
//     ctx.createBiquadFilter();

//   filter.type = "lowpass";
//   filter.frequency.setValueAtTime(
//     4600,
//     now
//   );
//   filter.Q.setValueAtTime(
//     0.6,
//     now
//   );

//   oscillator.connect(filter);
//   filter.connect(gain);
//   gain.connect(master);

//   oscillator.start(now);
//   oscillator.stop(now + 0.45);

//   /* ---------------------------------------------------------------------- */
//   /* SOFT HARMONIC                                                           */
//   /* ---------------------------------------------------------------------- */

//   const harmonic =
//     ctx.createOscillator();

//   harmonic.type = "sine";

//   harmonic.frequency.setValueAtTime(
//     frequency * 2,
//     now
//   );

//   const harmonicGain =
//     ctx.createGain();

//   harmonicGain.gain.setValueAtTime(
//     0.0001,
//     now
//   );

//   harmonicGain.gain.exponentialRampToValueAtTime(
//     0.10,
//     now + 0.012
//   );

//   harmonicGain.gain.exponentialRampToValueAtTime(
//     0.0001,
//     now + 0.24
//   );

//   harmonic.connect(harmonicGain);
//   harmonicGain.connect(master);

//   harmonic.start(now);
//   harmonic.stop(now + 0.27);
// }

// /* -------------------------------------------------------------------------- */
// /* LETTER COMPONENT                                                           */
// /* -------------------------------------------------------------------------- */

// function ScrollFillChar({
//   char,
//   progress,
//   range,
//   finalColor,
// }: {
//   char: string;
//   progress: MotionValue<number>;
//   range: [number, number];
//   finalColor: string;
// }) {
//   const color = useTransform(
//     progress,
//     range,
//     [DIM_COLOR, finalColor]
//   );

//   const opacity = useTransform(
//     progress,
//     range,
//     [0.65, 1]
//   );

//   const blur = useTransform(
//     progress,
//     range,
//     [1.5, 0]
//   );

//   const filter = useTransform(
//     blur,
//     (value) => `blur(${value}px)`
//   );

//   return (
//     <motion.span
//       style={{
//         color,
//         opacity,
//         filter,
//       }}
//       className="
//         relative
//         inline-block
//         will-change-[color,filter,opacity]
//       "
//     >
//       {char}
//     </motion.span>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* WOWTHERM HEADING                                                           */
// /* -------------------------------------------------------------------------- */

// function ScrollFillHeading({
//   progress,
// }: {
//   progress: MotionValue<number>;
// }) {
//   const chars = WORD.split("");

//   /*
//    * After the full word sequence, the typography
//    * gradually retreats into the background.
//    */

//   const opacity = useTransform(
//     progress,
//     [0.72, 0.84, 0.98],
//     [1, 0.16, 0.035]
//   );

//   const scale = useTransform(
//     progress,
//     [0.72, 0.98],
//     [1, 0.84]
//   );

//   const y = useTransform(
//     progress,
//     [0.72, 0.98],
//     [0, -105]
//   );

//   const blur = useTransform(
//     progress,
//     [0.72, 0.98],
//     [0, 4]
//   );

//   const filter = useTransform(
//     blur,
//     (value) => `blur(${value}px)`
//   );

//   return (
//     <motion.div
//       style={{
//         opacity,
//         scale,
//         y,
//         filter,
//       }}
//       className="
//         pointer-events-none
//         flex
//         select-none
//         flex-col
//         items-center
//         justify-center
//       "
//     >
//       {/* WHY */}

//       <span
//         className="
//           mb-4
//           font-display
//           text-[11px]
//           font-medium
//           uppercase
//           tracking-[0.55em]
//           text-copper-400
//           md:mb-6
//           md:text-sm
//         "
//       >
//         Why
//       </span>

//       {/* WOWTHERM */}

//       <h2
//         className="
//           whitespace-nowrap
//           font-display
//           text-[17vw]
//           font-medium
//           leading-[0.82]
//           tracking-[-0.075em]
//           md:text-[11vw]
//         "
//       >
//         {chars.map(
//           (char, index) => {
//             const range =
//               getLetterRange(index);

//             const finalColor =
//               index < WOW_LENGTH
//                 ? WHITE_COLOR
//                 : ORANGE_COLOR;

//             return (
//               <ScrollFillChar
//                 key={`${char}-${index}`}
//                 char={char}
//                 progress={progress}
//                 range={range}
//                 finalColor={finalColor}
//               />
//             );
//           }
//         )}
//       </h2>

//       {/* UNDERLINE */}

//       <motion.div
//         className="
//           mt-7
//           h-px
//           w-24
//           bg-white/10
//           md:mt-10
//           md:w-32
//         "
//       />
//     </motion.div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* BENEFIT CARD                                                               */
// /* -------------------------------------------------------------------------- */

// function BenefitCard({
//   benefit,
//   index,
//   progress,
// }: {
//   benefit: (typeof benefits)[number];
//   index: number;
//   progress: MotionValue<number>;
// }) {
//   const [
//     start,
//     end,
//   ] = getCardRange(index);

//   /* ---------------------------------------------------------------------- */
//   /* CARD MOVEMENT                                                           */
//   /* ---------------------------------------------------------------------- */

//   const x = useTransform(
//     progress,
//     [start, end],
//     [520, 0]
//   );

//   const y = useTransform(
//     progress,
//     [start, end],
//     [
//       40,
//       index % 2 === 0
//         ? -8
//         : 8,
//     ]
//   );

//   const scale = useTransform(
//     progress,
//     [start, end],
//     [0.84, 1]
//   );

//   const rotate = useTransform(
//     progress,
//     [start, end],
//     [
//       index % 2 === 0
//         ? 7
//         : -7,
//       0,
//     ]
//   );

//   const opacity = useTransform(
//     progress,
//     [start, end],
//     [0, 1]
//   );

//   const blur = useTransform(
//     progress,
//     [start, end],
//     [16, 0]
//   );

//   /* ---------------------------------------------------------------------- */
//   /* CARD CLIP                                                               */
//   /* ---------------------------------------------------------------------- */

//   const clip = useTransform(
//     progress,
//     [start, end],
//     [
//       "inset(0 0 0 100%)",
//       "inset(0 0 0 0%)",
//     ]
//   );

//   /* ---------------------------------------------------------------------- */
//   /* IMAGE                                                                    */
//   /* ---------------------------------------------------------------------- */

//   const imageScale = useTransform(
//     progress,
//     [start, end],
//     [1.18, 1]
//   );

//   const imageX = useTransform(
//     progress,
//     [start, end],
//     [35, 0]
//   );

//   /* ---------------------------------------------------------------------- */
//   /* CONTENT                                                                  */
//   /* ---------------------------------------------------------------------- */

//   const contentY = useTransform(
//     progress,
//     [start, end],
//     [26, 0]
//   );

//   const lineScale = useTransform(
//     progress,
//     [start, end],
//     [0, 1]
//   );

//   return (
//     <motion.article
//       style={{
//         x,
//         y,
//         scale,
//         rotate,
//         opacity,
//         filter: blur,
//       }}
//       className="
//         pointer-events-auto
//         absolute
//         right-[5vw]
//         top-1/2
//         w-[min(74vw,430px)]
//         -translate-y-1/2
//         will-change-transform
//         md:right-[8vw]
//         lg:right-[10vw]
//         xl:right-[12vw]
//       "
//     >
//       {/* ------------------------------------------------------------------ */}
//       {/* MASK                                                                */}
//       {/* ------------------------------------------------------------------ */}

//       <motion.div
//         style={{
//           clipPath: clip,
//         }}
//         className="
//           relative
//           overflow-hidden
//           rounded-[2rem]
//           border
//           border-white/[0.10]
//           bg-[#f4eee7]
//           shadow-[0_45px_120px_-35px_rgba(0,0,0,0.65)]
//         "
//       >
//         {/* INNER BORDER */}

//         <div
//           aria-hidden
//           className="
//             pointer-events-none
//             absolute
//             inset-[1px]
//             z-30
//             rounded-[calc(2rem-1px)]
//             border
//             border-black/[0.05]
//           "
//         />

//         {/* ---------------------------------------------------------------- */}
//         {/* META                                                               */}
//         {/* ---------------------------------------------------------------- */}

//         <div
//           className="
//             relative
//             z-20
//             flex
//             items-center
//             justify-between
//             px-6
//             pt-6
//             md:px-8
//             md:pt-8
//           "
//         >
//           <span
//             className="
//               font-display
//               text-[10px]
//               font-medium
//               uppercase
//               tracking-[0.35em]
//               text-black/45
//             "
//           >
//             Benefit
//           </span>

//           <span
//             className="
//               font-display
//               text-5xl
//               font-medium
//               leading-none
//               tracking-[-0.07em]
//               text-black/[0.09]
//               md:text-6xl
//             "
//           >
//             {benefit.number}
//           </span>
//         </div>

//         {/* ---------------------------------------------------------------- */}
//         {/* IMAGE                                                              */}
//         {/* ---------------------------------------------------------------- */}

//         <div
//           className="
//             relative
//             mx-4
//             mt-5
//             h-[190px]
//             overflow-hidden
//             rounded-[1.35rem]
//             md:mx-6
//             md:mt-6
//             md:h-[220px]
//           "
//         >
//           <motion.div
//             style={{
//               scale: imageScale,
//               x: imageX,
//             }}
//             className="
//               absolute
//               inset-0
//               will-change-transform
//             "
//           >
//             <Image
//               src={benefit.image}
//               alt={benefit.title}
//               fill
//               sizes="430px"
//               className="
//                 object-cover
//                 brightness-[0.92]
//                 saturate-[0.78]
//               "
//             />
//           </motion.div>

//           {/* IMAGE GRADIENT */}

//           <div
//             className="
//               absolute
//               inset-0
//               bg-gradient-to-t
//               from-black/45
//               via-black/5
//               to-transparent
//             "
//           />

//           {/* ORANGE ATMOSPHERE */}

//           <div
//             className="
//               absolute
//               inset-0
//               bg-gradient-to-br
//               from-orange-400/10
//               via-transparent
//               to-transparent
//             "
//           />

//           {/* IMAGE LABEL */}

//           <span
//             className="
//               absolute
//               bottom-4
//               left-4
//               font-mono
//               text-[9px]
//               uppercase
//               tracking-[0.25em]
//               text-white/70
//             "
//           >
//             WOWTHERM / {benefit.number}
//           </span>
//         </div>

//         {/* ---------------------------------------------------------------- */}
//         {/* CONTENT                                                            */}
//         {/* ---------------------------------------------------------------- */}

//         <motion.div
//           style={{
//             y: contentY,
//           }}
//           className="
//             relative
//             z-20
//             px-6
//             pb-7
//             pt-6
//             md:px-8
//             md:pb-9
//             md:pt-7
//           "
//         >
//           {/* MICRO LABEL */}

//           <div
//             className="
//               mb-5
//               flex
//               items-center
//               gap-3
//             "
//           >
//             <span
//               className="
//                 size-1.5
//                 rounded-full
//                 bg-copper-500
//                 shadow-[0_0_16px_rgba(249,115,22,0.7)]
//               "
//             />

//             <span
//               className="
//                 text-[9px]
//                 font-medium
//                 uppercase
//                 tracking-[0.32em]
//                 text-black/40
//               "
//             >
//               Engineered comfort
//             </span>
//           </div>

//           {/* TITLE */}

//           <h3
//             className="
//               max-w-[360px]
//               font-display
//               text-[2rem]
//               font-medium
//               uppercase
//               leading-[0.92]
//               tracking-[-0.045em]
//               text-[#151515]
//               md:text-[2.35rem]
//             "
//           >
//             {benefit.title}
//           </h3>

//           {/* DIVIDER */}

//           <motion.div
//             className="
//               my-5
//               h-px
//               w-full
//               origin-left
//               bg-black/10
//             "
//             style={{
//               scaleX: lineScale,
//             }}
//           />

//           {/* DESCRIPTION */}

//           <p
//             className="
//               max-w-[330px]
//               text-[12px]
//               leading-[1.7]
//               text-black/50
//               md:text-[13px]
//             "
//           >
//             {benefit.description}
//           </p>

//           {/* FOOTER */}

//           <div
//             className="
//               mt-7
//               flex
//               items-center
//               justify-between
//             "
//           >
//             <span
//               className="
//                 text-[9px]
//                 font-medium
//                 uppercase
//                 tracking-[0.28em]
//                 text-black/35
//               "
//             >
//               Designed around you
//             </span>

//             <span
//               className="
//                 flex
//                 size-9
//                 items-center
//                 justify-center
//                 rounded-full
//                 border
//                 border-black/10
//               "
//             >
//               <ArrowUpRight
//                 className="
//                   size-4
//                   text-black/60
//                 "
//               />
//             </span>
//           </div>
//         </motion.div>

//         {/* ---------------------------------------------------------------- */}
//         {/* BOTTOM ACCENT                                                     */}
//         {/* ---------------------------------------------------------------- */}

//         <div
//           aria-hidden
//           className="
//             absolute
//             bottom-0
//             left-0
//             h-[2px]
//             w-full
//             bg-gradient-to-r
//             from-transparent
//             via-orange-500/80
//             to-transparent
//           "
//         />
//       </motion.div>
//     </motion.article>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* PROGRESS MARKER                                                            */
// /* -------------------------------------------------------------------------- */

// function ProgressMarker({
//   progress,
// }: {
//   progress: MotionValue<number>;
// }) {
//   const scaleX = useTransform(
//     progress,
//     [0, 1],
//     [0, 1]
//   );

//   const percentage = useTransform(
//     progress,
//     (value) =>
//       `${Math.round(value * 100)}`
//   );

//   return (
//     <div
//       className="
//         absolute
//         bottom-7
//         left-1/2
//         z-50
//         flex
//         w-[min(84vw,340px)]
//         -translate-x-1/2
//         items-center
//         gap-4
//         md:bottom-9
//       "
//     >
//       <span
//         className="
//           font-mono
//           text-[8px]
//           tracking-[0.2em]
//           text-white/30
//         "
//       >
//         00
//       </span>

//       <div
//         className="
//           relative
//           h-px
//           flex-1
//           overflow-hidden
//           bg-white/[0.10]
//         "
//       >
//         <motion.div
//           style={{
//             scaleX,
//           }}
//           className="
//             absolute
//             inset-y-0
//             left-0
//             w-full
//             origin-left
//             bg-orange-400
//           "
//         />
//       </div>

//       <motion.span
//         className="
//           min-w-[22px]
//           text-right
//           font-mono
//           text-[8px]
//           tracking-[0.2em]
//           text-white/40
//         "
//       >
//         {percentage}
//       </motion.span>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* MAIN BENEFITS                                                              */
// /* -------------------------------------------------------------------------- */

// export function Benefits() {
//   const pinRef =
//     useRef<HTMLDivElement>(null);

//   const firedLetters =
//     useRef<boolean[]>(
//       new Array(WORD.length).fill(false)
//     );

//   const {
//     scrollYProgress,
//   } = useScroll({
//     target: pinRef,
//     offset: [
//       "start start",
//       "end end",
//     ],
//   });

//   /* ---------------------------------------------------------------------- */
//   /* LETTER AUDIO                                                            */
//   /* ---------------------------------------------------------------------- */

//   useMotionValueEvent(
//     scrollYProgress,
//     "change",
//     (latest) => {
//       WORD.split("").forEach(
//         (_, index) => {
//           const [
//             start,
//           ] =
//             getLetterRange(index);

//           /*
//            * Trigger exactly when the
//            * letter starts filling.
//            */

//           if (
//             !firedLetters.current[
//               index
//             ] &&
//             latest >= start
//           ) {
//             firedLetters.current[
//               index
//             ] = true;

//             playLetterChime(index);
//           }

//           /*
//            * Reset when scrolling backwards
//            * far enough before the letter.
//            */

//           if (
//             firedLetters.current[
//               index
//             ] &&
//             latest <
//               start - 0.008
//           ) {
//             firedLetters.current[
//               index
//             ] = false;
//           }
//         }
//       );
//     }
//   );

//   return (
//     <section
//       className="
//         relative
//         bg-[#080808]
//         text-white
//       "
//     >
//       {/* ================================================================== */}
//       {/* LONG SCROLL                                                        */}
//       {/* ================================================================== */}

//       <div
//         ref={pinRef}
//         className="
//           relative
//           h-[900vh]
//         "
//       >
//         {/* ================================================================= */}
//         {/* STICKY VIEWPORT                                                   */}
//         {/* ================================================================= */}

//         <div
//           className="
//             sticky
//             top-0
//             h-screen
//             overflow-hidden
//           "
//         >
//           {/* =============================================================== */}
//           {/* ATMOSPHERE                                                       */}
//           {/* =============================================================== */}

//           <div
//             aria-hidden
//             className="
//               pointer-events-none
//               absolute
//               inset-0
//               z-0
//               overflow-hidden
//             "
//           >
//             {/* CENTRAL ORANGE ATMOSPHERE */}

//             <div
//               className="
//                 absolute
//                 left-1/2
//                 top-1/2
//                 size-[55vw]
//                 -translate-x-1/2
//                 -translate-y-1/2
//                 rounded-full
//                 bg-orange-500/[0.025]
//                 blur-[120px]
//               "
//             />

//             {/* TOP LIGHT */}

//             <div
//               className="
//                 absolute
//                 left-1/2
//                 top-[-25%]
//                 h-[50vh]
//                 w-[50vw]
//                 -translate-x-1/2
//                 rounded-full
//                 bg-white/[0.018]
//                 blur-[100px]
//               "
//             />

//             {/* GRAIN */}

//             <div
//               className="
//                 absolute
//                 inset-0
//                 opacity-[0.025]
//                 mix-blend-screen
//               "
//               style={{
//                 backgroundImage:
//                   "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
//               }}
//             />
//           </div>

//           {/* =============================================================== */}
//           {/* WOWTHERM                                                         */}
//           {/* =============================================================== */}

//           <div
//             className="
//               absolute
//               inset-0
//               z-10
//               flex
//               items-center
//               justify-center
//               px-4
//             "
//           >
//             <ScrollFillHeading
//               progress={
//                 scrollYProgress
//               }
//             />
//           </div>

//           {/* =============================================================== */}
//           {/* CARDS                                                            */}
//           {/* =============================================================== */}

//           <div
//             className="
//               pointer-events-none
//               absolute
//               inset-0
//               z-20
//             "
//           >
//             {benefits.map(
//               (
//                 benefit,
//                 index
//               ) => (
//                 <BenefitCard
//                   key={
//                     benefit.number
//                   }
//                   benefit={
//                     benefit
//                   }
//                   index={
//                     index
//                   }
//                   progress={
//                     scrollYProgress
//                   }
//                 />
//               )
//             )}
//           </div>

//           {/* =============================================================== */}
//           {/* TOP LABEL                                                        */}
//           {/* =============================================================== */}

//           <div
//             className="
//               absolute
//               left-6
//               top-7
//               z-40
//               md:left-10
//               md:top-9
//             "
//           >
//             <div
//               className="
//                 flex
//                 items-center
//                 gap-3
//               "
//             >
//               <span
//                 className="
//                   size-1.5
//                   rounded-full
//                   bg-orange-500
//                   shadow-[0_0_14px_rgba(249,115,22,0.8)]
//                 "
//               />

//               <span
//                 className="
//                   text-[9px]
//                   font-medium
//                   uppercase
//                   tracking-[0.35em]
//                   text-white/35
//                 "
//               >
//                 The WOWTHERM difference
//               </span>
//             </div>
//           </div>

//           {/* =============================================================== */}
//           {/* SIDE LABEL                                                       */}
//           {/* =============================================================== */}

//           <div
//             className="
//               absolute
//               right-6
//               top-1/2
//               z-40
//               hidden
//               -translate-y-1/2
//               rotate-90
//               md:right-10
//               md:block
//             "
//           >
//             <span
//               className="
//                 font-mono
//                 text-[8px]
//                 uppercase
//                 tracking-[0.4em]
//                 text-white/20
//               "
//             >
//               Engineered for living
//             </span>
//           </div>

//           {/* =============================================================== */}
//           {/* PROGRESS                                                         */}
//           {/* =============================================================== */}

//           <ProgressMarker
//             progress={
//               scrollYProgress
//             }
//           />

//           {/* =============================================================== */}
//           {/* SCROLL                                                           */}
//           {/* =============================================================== */}

//           <div
//             className="
//               absolute
//               bottom-7
//               right-6
//               z-40
//               hidden
//               items-center
//               gap-3
//               md:flex
//             "
//           >
//             <span
//               className="
//                 text-[8px]
//                 uppercase
//                 tracking-[0.35em]
//                 text-white/25
//               "
//             >
//               Scroll
//             </span>

//             <span
//               className="
//                 block
//                 h-px
//                 w-8
//                 bg-white/15
//               "
//             />
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
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ==========================================================================
   WOWTHERM BENEFITS / CIRCULAR TYPOGRAPHY EXPERIENCE
   ========================================================================== */

const WORD = "WOWTHERM";
const WOW_LENGTH = 3;

const WHITE = "#FFFFFF";
const ORANGE = "#F97316";
const DIM = "rgba(255,255,255,0.14)";

/*
  One word = one scroll stage.

  Once a word appears, it remains visible
  permanently in its circular position.
*/
const SENTENCE = [
  "THE",
  "FUTURE",
  "OF",
  "COMFORT",
  "IS",
  "DESIGNED",
  "AROUND",
  "YOU",
];

/*
  Circular positions.

  8 words around WOWTHERM.

  -90  = top
  -45  = top-right
   0   = right
   45  = bottom-right
   90  = bottom
   135 = bottom-left
   180 = left
   225 = top-left
*/
const ORBIT_ANGLES = [
  -90,
  -45,
  0,
  45,
  90,
  135,
  180,
  225,
];

/* ==========================================================================
   SCROLL CHOREOGRAPHY
   ========================================================================== */

const WORD_FILL_END = 0.16;

const WOW_SETTLE_START = 0.16;
const WOW_SETTLE_END = 0.27;

const SENTENCE_START = 0.30;
const SENTENCE_END = 0.91;

/* ==========================================================================
   AUDIO
   ========================================================================== */

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (!sharedAudioCtx) {
    const Ctx =
      window.AudioContext ||
      (
        window as unknown as {
          webkitAudioContext: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!Ctx) {
      return null;
    }

    sharedAudioCtx = new Ctx();
  }

  if (sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume();
  }

  return sharedAudioCtx;
}

/* ==========================================================================
   WOWTHERM LETTER SOUND
   ========================================================================== */

const LETTER_SCALE = [
  523.25,
  587.33,
  659.25,
  783.99,
  880,
  1046.5,
  1174.66,
  1318.51,
];

function playLetterChime(index: number) {
  const ctx = getAudioContext();

  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;

  const frequency =
    LETTER_SCALE[
      index % LETTER_SCALE.length
    ];

  const master = ctx.createGain();

  master.gain.value = 0.045;
  master.connect(ctx.destination);

  const oscillator = ctx.createOscillator();

  oscillator.type = "sine";

  oscillator.frequency.setValueAtTime(
    frequency * 0.98,
    now
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    frequency,
    now + 0.04
  );

  const gain = ctx.createGain();

  gain.gain.setValueAtTime(0, now);

  gain.gain.linearRampToValueAtTime(
    0.65,
    now + 0.012
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.28
  );

  const filter = ctx.createBiquadFilter();

  filter.type = "lowpass";
  filter.frequency.value = 4200;

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  oscillator.start(now);
  oscillator.stop(now + 0.3);

  /* ------------------------------------------------------------------------
     OVERTONE
     ------------------------------------------------------------------------ */

  const overtone = ctx.createOscillator();

  overtone.type = "sine";
  overtone.frequency.value =
    frequency * 2;

  const overtoneGain = ctx.createGain();

  overtoneGain.gain.setValueAtTime(
    0,
    now
  );

  overtoneGain.gain.linearRampToValueAtTime(
    0.1,
    now + 0.01
  );

  overtoneGain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.18
  );

  overtone.connect(overtoneGain);
  overtoneGain.connect(master);

  overtone.start(now);
  overtone.stop(now + 0.2);
}

/* ==========================================================================
   SENTENCE SOUND
   ========================================================================== */

const SENTENCE_SCALE = [
  392,
  440,
  493.88,
  523.25,
  587.33,
  659.25,
  698.46,
  783.99,
];

function playSentenceChime(index: number) {
  const ctx = getAudioContext();

  if (!ctx) {
    return;
  }

  const now = ctx.currentTime;

  const frequency =
    SENTENCE_SCALE[
      index % SENTENCE_SCALE.length
    ];

  const master = ctx.createGain();

  master.gain.value = 0.032;
  master.connect(ctx.destination);

  const oscillator = ctx.createOscillator();

  oscillator.type = "sine";

  oscillator.frequency.setValueAtTime(
    frequency * 0.98,
    now
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    frequency,
    now + 0.055
  );

  const gain = ctx.createGain();

  gain.gain.setValueAtTime(
    0,
    now
  );

  gain.gain.linearRampToValueAtTime(
    0.48,
    now + 0.018
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.42
  );

  const filter = ctx.createBiquadFilter();

  filter.type = "lowpass";
  filter.frequency.value = 3000;

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  oscillator.start(now);
  oscillator.stop(now + 0.45);
}

/* ==========================================================================
   HELPERS
   ========================================================================== */

function getLetterRange(
  index: number,
  total: number
): [number, number] {
  const slot =
    WORD_FILL_END / total;

  return [
    index * slot,
    (index + 1) * slot,
  ];
}

/*
  Every sentence word gets one scroll slot.
*/
function getSentenceRange(
  index: number
): [number, number] {
  const totalLength =
    SENTENCE_END - SENTENCE_START;

  const slot =
    totalLength / SENTENCE.length;

  const start =
    SENTENCE_START +
    index * slot;

  /*
    Word enters during the first 72%
    of its scroll slot.
  */

  const revealLength =
    slot * 0.72;

  return [
    start,
    Math.min(
      start + revealLength,
      SENTENCE_END
    ),
  ];
}

/* ==========================================================================
   WOWTHERM LETTER
   ========================================================================== */

function ScrollLetter({
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
  const color = useTransform(
    progress,
    range,
    [DIM, finalColor]
  );

  return (
    <motion.span
      style={{
        color,
        display: "inline-block",
      }}
    >
      {char}
    </motion.span>
  );
}

/* ==========================================================================
   CENTER WOWTHERM
   ========================================================================== */

function CenterWOWTHERM({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const chars = WORD.split("");

  /*
    WOWTHERM becomes slightly smaller
    after its letter animation finishes.
  */

  const scale = useTransform(
    progress,
    [
      WOW_SETTLE_START,
      WOW_SETTLE_END,
    ],
    [1, 0.72]
  );

  const opacity = useTransform(
    progress,
    [
      WOW_SETTLE_START,
      WOW_SETTLE_END,
    ],
    [1, 1]
  );

  const lineScale = useTransform(
    progress,
    [
      WOW_SETTLE_START,
      WOW_SETTLE_END,
    ],
    [1, 0.7]
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
      }}
      className="
        absolute
        left-1/2
        top-1/2
        z-30
        -translate-x-1/2
        -translate-y-1/2
        select-none
      "
    >
      {/* ==================================================================
          WHY
          ================================================================== */}

      <div
        className="
          mb-3
          text-center
          text-[10px]
          font-medium
          uppercase
          tracking-[0.38em]
          text-white/45
          md:mb-5
          md:text-xs
        "
      >
        WHY
      </div>

      {/* ==================================================================
          WOWTHERM
          ================================================================== */}

      <h2
        className="
          whitespace-nowrap
          text-[14vw]
          font-semibold
          leading-[0.9]
          tracking-[-0.018em]
          md:text-[8vw]
          md:tracking-[-0.012em]
        "
        style={{
          fontKerning: "normal",
          textRendering:
            "geometricPrecision",
        }}
      >
        {chars.map(
          (char, index) => {
            const range =
              getLetterRange(
                index,
                chars.length
              );

            /*
              WOW = white
              THERM = orange
            */

            const finalColor =
              index < WOW_LENGTH
                ? WHITE
                : ORANGE;

            return (
              <ScrollLetter
                key={`${char}-${index}`}
                char={char}
                progress={progress}
                range={range}
                finalColor={
                  finalColor
                }
              />
            );
          }
        )}
      </h2>

      {/* ==================================================================
          ORANGE ARCHITECTURAL LINE
          ================================================================== */}

      <motion.div
        style={{
          scaleX: lineScale,
        }}
        className="
          mx-auto
          mt-5
          h-px
          w-10
          bg-[#F97316]
          md:mt-7
          md:w-16
        "
      />
    </motion.div>
  );
}

/* ==========================================================================
   ORBIT RINGS
   ========================================================================== */

function OrbitRing() {
  return (
    <>
      {/* ==================================================================
          MAIN ORBIT
          ================================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[min(72vw,72vh)]
          w-[min(72vw,72vh)]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/[0.055]
        "
      />

      {/* ==================================================================
          INNER ORBIT
          ================================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[min(50vw,50vh)]
          w-[min(50vw,50vh)]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/[0.025]
        "
      />
    </>
  );
}

/* ==========================================================================
   CIRCULAR WORD
   ========================================================================== */

function CircularWord({
  word,
  index,
  progress,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const [
    start,
    end,
  ] = getSentenceRange(index);

  const angle =
    ORBIT_ANGLES[index] ?? 0;

  const radians =
    (angle * Math.PI) / 180;

  /*
    ================================================================
    SAFE ORBIT
    ================================================================

    We intentionally use separate X/Y radii.

    This keeps:

      THE
        safely inside top

      IS
        safely inside bottom

    even on large desktop screens.
  */

  const ORBIT_X =
    "min(39vw, 39vh)";

  const ORBIT_Y =
    "min(34vh, 39vw)";

  /*
    ================================================================
    RADIUS
    ================================================================

    Starts near center.

    Ends at permanent circular position.
  */

  const radius = useTransform(
    progress,
    [start, end],
    [0.28, 1]
  );

  /*
    ================================================================
    REVEAL OPACITY
    ================================================================

    IMPORTANT:

    There is NO fade-out logic.

    Once the word reaches opacity 1,
    it stays there.
  */

  const opacity = useTransform(
    progress,
    [start, end],
    [0, 1]
  );

  /*
    ================================================================
    SCALE
    ================================================================
  */

  const scale = useTransform(
    progress,
    [start, end],
    [0.42, 1]
  );

  /*
    ================================================================
    BLUR
    ================================================================
  */

  const blur = useTransform(
    progress,
    [start, end],
    [8, 0]
  );

  const filter = useTransform(
    blur,
    (value) =>
      `blur(${value}px)`
  );

  /*
    ================================================================
    CIRCULAR POSITION
    ================================================================
  */

  const x = useTransform(
    radius,
    (value) =>
      `calc(
        -50% +
        ${Math.cos(radians)}
        * ${ORBIT_X}
        * ${value}
      )`
  );

  const y = useTransform(
    radius,
    (value) =>
      `calc(
        -50% +
        ${Math.sin(radians)}
        * ${ORBIT_Y}
        * ${value}
      )`
  );

  /*
    ================================================================
    DIRECTIONAL ENTRY
    ================================================================

    The word slightly follows the direction
    of its orbital position as it enters.
  */

  const translateX =
    useTransform(
      progress,
      [start, end],
      [
        -Math.cos(radians) * 16,
        0,
      ]
    );

  const translateY =
    useTransform(
      progress,
      [start, end],
      [
        -Math.sin(radians) * 16,
        0,
      ]
    );

  return (
    <motion.div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-20
        flex
        items-center
        justify-center
        whitespace-nowrap
      "
      style={{
        opacity,
        scale,
        filter,
        x,
        y,
      }}
    >
      <motion.div
        style={{
          x: translateX,
          y: translateY,
        }}
        className="
          relative
          text-center
          text-[clamp(0.95rem,2.45vw,2.65rem)]
          font-medium
          uppercase
          leading-none
          tracking-[0.075em]
          text-[#F97316]
        "
      >
        {word}

        {/* ==================================================================
            TINY ORANGE MARKER
            ================================================================== */}

        <span
          className="
            absolute
            -right-3
            top-1/2
            h-1
            w-1
            -translate-y-1/2
            rounded-full
            bg-[#F97316]
            md:-right-4
            md:h-1.5
            md:w-1.5
          "
        />
      </motion.div>
    </motion.div>
  );
}

/* ==========================================================================
   WORD COUNTER
   ========================================================================== */

function SequenceCounter({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const total =
    SENTENCE.length;

  const progressValue =
    useTransform(
      progress,
      [
        SENTENCE_START,
        SENTENCE_END,
      ],
      [0, total]
    );

  const current =
    useTransform(
      progressValue,
      (value) =>
        Math.min(
          total,
          Math.max(
            0,
            Math.floor(
              value + 0.01
            )
          )
        )
    );

  return (
    <div
      className="
        absolute
        bottom-8
        left-8
        z-40
        hidden
        items-center
        gap-3
        md:flex
      "
    >
      <span
        className="
          text-[9px]
          font-medium
          uppercase
          tracking-[0.28em]
          text-white/30
        "
      >
        BUILD
      </span>

      <motion.span
        className="
          min-w-[26px]
          text-[10px]
          font-medium
          tabular-nums
          text-white/65
        "
      >
        {current}
      </motion.span>

      <span
        className="
          text-white/15
        "
      >
        /
      </span>

      <span
        className="
          text-[10px]
          font-medium
          tabular-nums
          text-white/25
        "
      >
        {total}
      </span>
    </div>
  );
}

/* ==========================================================================
   TOP LABEL
   ========================================================================== */

function TopLabel() {
  return (
    <div
      className="
        absolute
        left-8
        top-8
        z-40
        md:left-12
        md:top-10
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          text-[9px]
          font-medium
          uppercase
          tracking-[0.28em]
          text-white/35
        "
      >
        <span
          className="
            h-px
            w-7
            bg-[#F97316]/70
          "
        />

        WHY WOWTHERM
      </div>
    </div>
  );
}

/* ==========================================================================
   SENTENCE INTRO
   ========================================================================== */

function SentenceHint({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const opacity =
    useTransform(
      progress,
      [
        WOW_SETTLE_END,
        SENTENCE_START,
      ],
      [0, 0.6]
    );

  const y =
    useTransform(
      progress,
      [
        WOW_SETTLE_END,
        SENTENCE_START,
      ],
      [12, 0]
    );

  return (
    <motion.div
      style={{
        opacity,
        y,
      }}
      className="
        absolute
        bottom-12
        left-1/2
        z-40
        -translate-x-1/2
        whitespace-nowrap
        text-[9px]
        font-medium
        uppercase
        tracking-[0.32em]
        text-white/25
      "
    >
      Scroll to discover
    </motion.div>
  );
}

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

export function Benefits() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const lastLetterRef =
    useRef(-1);

  const lastSentenceRef =
    useRef(-1);

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      "start start",
      "end end",
    ],
  });

  /* =========================================================================
     SOUND SYNCHRONIZATION
     ========================================================================= */

  useMotionValueEvent(
    scrollYProgress,
    "change",
    (latest) => {
      /* ----------------------------------------------------------------------
         WOWTHERM LETTERS
         ---------------------------------------------------------------------- */

      if (
        latest <=
        WORD_FILL_END
      ) {
        const letterIndex =
          Math.min(
            WORD.length - 1,
            Math.floor(
              (latest /
                WORD_FILL_END) *
                WORD.length
            )
          );

        if (
          letterIndex !==
          lastLetterRef.current
        ) {
          lastLetterRef.current =
            letterIndex;

          playLetterChime(
            letterIndex
          );
        }
      }

      /* ----------------------------------------------------------------------
         SENTENCE WORDS
         ---------------------------------------------------------------------- */

      if (
        latest >=
        SENTENCE_START
      ) {
        const sentenceProgress =
          (latest -
            SENTENCE_START) /
          (SENTENCE_END -
            SENTENCE_START);

        const wordIndex =
          Math.min(
            SENTENCE.length - 1,
            Math.floor(
              sentenceProgress *
                SENTENCE.length
            )
          );

        const wordRange =
          getSentenceRange(
            wordIndex
          );

        if (
          latest >=
            wordRange[0] &&
          wordIndex !==
            lastSentenceRef.current
        ) {
          lastSentenceRef.current =
            wordIndex;

          playSentenceChime(
            wordIndex
          );
        }
      }

      /* ----------------------------------------------------------------------
         RESET
         ---------------------------------------------------------------------- */

      if (
        latest < 0.01
      ) {
        lastLetterRef.current =
          -1;

        lastSentenceRef.current =
          -1;
      }
    }
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[1100vh]
        bg-[#050505]
      "
    >
      {/* ====================================================================
          STICKY STAGE
          ==================================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
          bg-[#050505]
        "
      >
        {/* ==================================================================
            SUBTLE BACKGROUND
            ================================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.045),transparent_42%)]
          "
        />

        {/* ==================================================================
            ARCHITECTURAL GRID
            ================================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />

        {/* ==================================================================
            TOP LABEL
            ================================================================== */}

        <TopLabel />

        {/* ==================================================================
            WORD COUNTER
            ================================================================== */}

        <SequenceCounter
          progress={
            scrollYProgress
          }
        />

        {/* ==================================================================
            SENTENCE HINT
            ================================================================== */}

        <SentenceHint
          progress={
            scrollYProgress
          }
        />

        {/* ==================================================================
            ORBIT
            ================================================================== */}

        <OrbitRing />

        {/* ==================================================================
            SENTENCE WORDS
            ==================================================================

            Every word stays mounted.

            Every word has its own scroll
            entrance.

            Once visible, it stays in place.
        */}

        <div
          className="
            absolute
            inset-0
          "
        >
          {SENTENCE.map(
            (
              word,
              index
            ) => (
              <CircularWord
                key={`${word}-${index}`}
                word={word}
                index={index}
                progress={
                  scrollYProgress
                }
              />
            )
          )}
        </div>

        {/* ==================================================================
            CENTER WOWTHERM
            ================================================================== */}

        <CenterWOWTHERM
          progress={
            scrollYProgress
          }
        />

        {/* ==================================================================
            SCROLL INDICATOR
            ================================================================== */}

        <motion.div
          className="
            absolute
            bottom-8
            right-8
            z-40
            flex
            items-center
            gap-3
            md:right-12
          "
          style={{
            opacity:
              useTransform(
                scrollYProgress,
                [
                  0,
                  0.08,
                  0.18,
                ],
                [1, 1, 0]
              ),
          }}
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/30
            "
          >
            Scroll
          </span>

          <span
            className="
              h-px
              w-8
              bg-white/20
            "
          />
        </motion.div>
      </div>
    </section>
  );
}