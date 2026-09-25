
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { ArrowUpRight } from "lucide-react";

// type Project = {
//   slug: string;
//   title: string;
//   location: string;
//   type: string;
//   solution: string;
//   year: string;
//   image: string;
// };

// const projects: Project[] = [
//   {
//     slug: "luxury-residence-srinagar",
//     title: "Luxury Residence",
//     location: "Srinagar, Kashmir",
//     type: "Residential",
//     solution: "AquaBoard Low-Profile",
//     year: "2024",
//     image:
//       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
//   },
//   {
//     slug: "boutique-hotel-ladakh",
//     title: "Cedar House Hotel",
//     location: "Manali, Himachal Pradesh",
//     type: "Hospitality",
//     solution: "AquaFlow Screed System",
//     year: "2023",
//     image:
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
//   },
//   {
//     slug: "modern-villa-mumbai",
//     title: "Penthouse Residence",
//     location: "Mumbai, Maharashtra",
//     type: "Residential",
//     solution: "StickyMat 200W + SenseWarm Pro",
//     year: "2024",
//     image:
//       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
//   },
//   {
//     slug: "hillside-chalet-shimla",
//     title: "Hillside Chalet",
//     location: "Shimla, Himachal Pradesh",
//     type: "Residential",
//     solution: "WowTherm ClimaBoard",
//     year: "2023",
//     image:
//       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
//   },
//   {
//     slug: "heritage-haveli-jaipur",
//     title: "Heritage Haveli Restoration",
//     location: "Jaipur, Rajasthan",
//     type: "Residential",
//     solution: "AquaBoard XT",
//     year: "2024",
//     image:
//       "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80",
//   },
//   {
//     slug: "corporate-office-bengaluru",
//     title: "Tech Park Office Fit-Out",
//     location: "Bengaluru, Karnataka",
//     type: "Commercial",
//     solution: "AquaFlow ScreedPro",
//     year: "2023",
//     image:
//       "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&auto=format&fit=crop&q=80",
//   },
//   {
//     slug: "beachfront-villa-goa",
//     title: "Beachfront Villa",
//     location: "Anjuna, Goa",
//     type: "Residential",
//     solution: "StickyMat 150W",
//     year: "2024",
//     image:
//       "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200&auto=format&fit=crop&q=80",
//   },
//   {
//     slug: "boutique-spa-delhi",
//     title: "Boutique Wellness Spa",
//     location: "New Delhi",
//     type: "Hospitality",
//     solution: "SenseWarm Zone Control",
//     year: "2023",
//     image:
//       "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&auto=format&fit=crop&q=80",
//   },
// ];

// // How strongly cards tilt/scale/lift/fade as they move away from center.
// const MAX_ROTATE_DEG = 22;
// const MAX_SCALE_DROP = 0.18;
// const MAX_OPACITY_DROP = 0.6;
// const MAX_BLUR_PX = 5;
// const MAX_LIFT_PX = 48; // center card rises this many px above the rest

// /* ------------------------------------------------------------------ */
// /* Hover sound — a soft, synthesized "tick" (no audio file needed).    */
// /* Lazily creates a single shared AudioContext, unlocked on the        */
// /* page's first real gesture (browsers refuse to start/resume audio    */
// /* from a mouseenter/hover alone — only click/keydown/touch count).    */
// /* ------------------------------------------------------------------ */
// let sharedAudioCtx: AudioContext | null = null;

// function getAudioContext(): AudioContext | null {
//   if (typeof window === "undefined") return null;
//   if (!sharedAudioCtx) {
//     const Ctx =
//       window.AudioContext ||
//       (window as unknown as { webkitAudioContext: typeof AudioContext })
//         .webkitAudioContext;
//     if (!Ctx) return null;
//     sharedAudioCtx = new Ctx();
//   }
//   return sharedAudioCtx;
// }

// function unlockAudioContext() {
//   const ctx = getAudioContext();
//   if (!ctx) return;
//   if (ctx.state === "suspended") {
//     ctx.resume();
//   }
//   // Play a silent buffer once — this is what actually "wakes up" audio
//   // on iOS Safari, which needs an audible node to be started, not just
//   // resume(), during the very first real gesture.
//   const buffer = ctx.createBuffer(1, 1, 22050);
//   const source = ctx.createBufferSource();
//   source.buffer = buffer;
//   source.connect(ctx.destination);
//   source.start(0);
// }

// function playHoverTick() {
//   const ctx = getAudioContext();
//   if (!ctx || ctx.state !== "running") return;

//   const now = ctx.currentTime;
//   const master = ctx.createGain();
//   master.gain.value = 0.07;
//   master.connect(ctx.destination);

//   // Warm low "thock" body — a short sine thump with a fast pitch drop
//   const body = ctx.createOscillator();
//   body.type = "sine";
//   body.frequency.setValueAtTime(210, now);
//   body.frequency.exponentialRampToValueAtTime(90, now + 0.09);

//   const bodyGain = ctx.createGain();
//   bodyGain.gain.setValueAtTime(0, now);
//   bodyGain.gain.linearRampToValueAtTime(0.8, now + 0.006);
//   bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

//   // Gentle low-pass so it stays soft/rounded, not tinny
//   const bodyFilter = ctx.createBiquadFilter();
//   bodyFilter.type = "lowpass";
//   bodyFilter.frequency.value = 900;

//   body.connect(bodyFilter);
//   bodyFilter.connect(bodyGain);
//   bodyGain.connect(master);
//   body.start(now);
//   body.stop(now + 0.15);

//   // A whisper-quiet high overtone for a touch of warmth/richness
//   const overtone = ctx.createOscillator();
//   overtone.type = "triangle";
//   overtone.frequency.setValueAtTime(620, now);
//   overtone.frequency.exponentialRampToValueAtTime(500, now + 0.1);

//   const overtoneGain = ctx.createGain();
//   overtoneGain.gain.setValueAtTime(0, now);
//   overtoneGain.gain.linearRampToValueAtTime(0.12, now + 0.008);
//   overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

//   overtone.connect(overtoneGain);
//   overtoneGain.connect(master);
//   overtone.start(now);
//   overtone.stop(now + 0.12);
// }

// function ProjectCard({
//   project,
//   cardRef,
//   onNavigate,
// }: {
//   project: Project;
//   cardRef: (el: HTMLAnchorElement | null) => void;
//   onNavigate: (e: React.MouseEvent) => void;
// }) {
//   // Only fire on real mouse hover — not on touch, and not while the pointer
//   // is still down from a drag gesture.
//   const handlePointerEnter = (e: React.PointerEvent) => {
//     if (e.pointerType !== "mouse") return;
//     playHoverTick();
//   };

//   return (
//     <Link
//       ref={cardRef}
//       href={`/projects#${project.slug}`}
//       onClick={onNavigate}
//       onPointerEnter={handlePointerEnter}
//       draggable={false}
//       className="group relative block w-[300px] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white shadow-[0_20px_50px_-20px_rgba(120,70,30,0.25)] sm:w-[360px]"
//       style={{ willChange: "transform, filter, opacity" }}
//     >
//       <div className="relative aspect-[4/5] overflow-hidden">
//         <Image
//           src={project.image}
//           alt={project.title}
//           fill
//           sizes="360px"
//           draggable={false}
//           className="object-cover transition-[filter] duration-300 ease-out"
//           data-card-image
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
//       </div>

//       <div className="absolute inset-x-0 bottom-0 p-7">
//         <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] text-white/70 uppercase">
//           <span>{project.type}</span>
//           <span className="size-1 rounded-full bg-copper-300/80" />
//           <span>{project.year}</span>
//         </div>
//         <h3 className="mt-3 font-display text-2xl leading-snug text-white">
//           {project.title}
//         </h3>
//         <p className="mt-1 text-sm text-white/70">{project.location}</p>
//         <p className="mt-4 inline-block border-b border-copper-300/60 pb-0.5 text-xs tracking-[0.05em] text-copper-200">
//           {project.solution}
//         </p>
//       </div>
//     </Link>
//   );
// }

// export function Projects() {
//   const scrollerRef = useRef<HTMLDivElement>(null);
//   const cardEls = useRef<Array<HTMLAnchorElement | null>>([]);
//   const [showHint, setShowHint] = useState(true);

//   const dragState = useRef({
//     isDown: false,
//     startX: 0,
//     startScroll: 0,
//     moved: 0,
//   });

//   // Unlock audio on the page's very first real gesture, so hover sounds
//   // (which browsers won't unlock audio for on their own) work right away
//   // for the rest of the visit. Runs once, globally, then removes itself.
//   useEffect(() => {
//     const unlock = () => {
//       unlockAudioContext();
//       window.removeEventListener("pointerdown", unlock);
//       window.removeEventListener("keydown", unlock);
//       window.removeEventListener("touchstart", unlock);
//     };
//     window.addEventListener("pointerdown", unlock);
//     window.addEventListener("keydown", unlock);
//     window.addEventListener("touchstart", unlock);
//     return () => {
//       window.removeEventListener("pointerdown", unlock);
//       window.removeEventListener("keydown", unlock);
//       window.removeEventListener("touchstart", unlock);
//     };
//   }, []);

//   // Recompute each card's tilt/scale/lift/blur/fade from its distance to
//   // the scroller's horizontal center. Runs only in response to real scroll
//   // events (native scroll, drag, wheel) — nothing here runs on its own.
//   const updateCards = useCallback(() => {
//     const scroller = scrollerRef.current;
//     if (!scroller) return;
//     const rect = scroller.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;

//     for (const el of cardEls.current) {
//       if (!el) continue;
//       const cardRect = el.getBoundingClientRect();
//       const cardCenter = cardRect.left + cardRect.width / 2;
//       const raw = (cardCenter - centerX) / (rect.width / 2);
//       const t = Math.max(-1, Math.min(1, raw));
//       const abs = Math.abs(t);
//       const lift = (1 - abs) * MAX_LIFT_PX;

//       el.style.transform = `perspective(1400px) translateY(${-lift}px) rotateY(${t * -MAX_ROTATE_DEG}deg) scale(${1 - abs * MAX_SCALE_DROP})`;
//       el.style.opacity = `${1 - abs * MAX_OPACITY_DROP}`;
//       el.style.filter = `blur(${abs * MAX_BLUR_PX}px)`;
//       el.style.zIndex = `${Math.round((1 - abs) * 10)}`;

//       const img = el.querySelector<HTMLImageElement>("[data-card-image]");
//       if (img) img.style.filter = `grayscale(${Math.min(100, abs * 120)}%)`;
//     }
//   }, []);

//   useEffect(() => {
//     updateCards();
//     const scroller = scrollerRef.current;
//     if (!scroller) return;

//     let raf = 0;
//     const onScroll = () => {
//       cancelAnimationFrame(raf);
//       raf = requestAnimationFrame(updateCards);
//       if (showHint) setShowHint(false);
//     };
//     scroller.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);
//     return () => {
//       scroller.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//       cancelAnimationFrame(raf);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [updateCards]);

//   // Click-and-drag with a mouse (trackpads/touch already scroll natively).
//   const onPointerDown = (e: React.PointerEvent) => {
//     const scroller = scrollerRef.current;
//     if (!scroller) return;
//     dragState.current = {
//       isDown: true,
//       startX: e.clientX,
//       startScroll: scroller.scrollLeft,
//       moved: 0,
//     };
//     scroller.setPointerCapture(e.pointerId);
//     setShowHint(false);
//   };

//   const onPointerMove = (e: React.PointerEvent) => {
//     const scroller = scrollerRef.current;
//     const state = dragState.current;
//     if (!state.isDown || !scroller) return;
//     const delta = e.clientX - state.startX;
//     state.moved = Math.max(state.moved, Math.abs(delta));
//     scroller.scrollLeft = state.startScroll - delta;
//   };

//   const endDrag = (e: React.PointerEvent) => {
//     dragState.current.isDown = false;
//     scrollerRef.current?.releasePointerCapture(e.pointerId);
//   };

//   const onNavigate = (e: React.MouseEvent) => {
//     // A drag of more than a few px was a scroll gesture, not a click.
//     if (dragState.current.moved > 6) e.preventDefault();
//   };

//   return (
//     <section className="relative -mt-16 overflow-hidden bg-[#fbf3ea] pt-28 pb-24 md:-mt-24 md:pt-36 md:pb-32">
//       <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>

//       {/* Light warm base with a soft copper glow — reads as a continuation
//           of the hero's palette while staying bright and airy. */}
//       <div
//         aria-hidden
//         className="absolute inset-0"
//         style={{
//           background:
//             "linear-gradient(180deg, #fdf6ee 0%, #faf0e4 45%, #f6e9da 100%)",
//         }}
//       />
//       <div
//         aria-hidden
//         className="absolute inset-0"
//         style={{
//           background:
//             "radial-gradient(ellipse 55% 45% at 35% 20%, rgba(193,101,46,0.12) 0%, transparent 70%)",
//         }}
//       />

//       <div className="relative">
//         <div className="container-site mb-12 px-6 text-center md:mb-16 md:px-[max(1.5rem,calc((100vw-1280px)/2))]">
//           <div className="mb-4 flex items-center justify-center gap-3">
//             <span className="block h-px w-8 bg-copper-500/50" />
//             <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-copper-600 uppercase">
//               Portfolio
//             </span>
//             <span className="block h-px w-8 bg-copper-500/50" />
//           </div>
//           <h2 className="font-display text-4xl leading-tight text-charcoal-900 sm:text-5xl md:text-6xl">
//             Crafted <span className="font-accent text-[0.85em] text-copper-500">Warmth</span>,
//             <br className="hidden sm:block" /> Delivered Everywhere
//           </h2>
//           <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-charcoal-900/55 md:text-base">
//             A closer look at homes and spaces where our systems work quietly beneath the surface.
//           </p>
//         </div>

//         <div
//           ref={scrollerRef}
//           onPointerDown={onPointerDown}
//           onPointerMove={onPointerMove}
//           onPointerUp={endDrag}
//           onPointerLeave={endDrag}
//           className="no-scrollbar flex snap-x snap-mandatory gap-7 overflow-x-auto px-6 pt-16 pb-6 cursor-grab active:cursor-grabbing md:px-[max(1.5rem,calc((100vw-1280px)/2))]"
//           style={{ perspective: "1400px" }}
//         >
//           {projects.map((project, i) => (
//             <ProjectCard
//               key={`${project.slug}-${i}`}
//               project={project}
//               onNavigate={onNavigate}
//               cardRef={(el) => {
//                 cardEls.current[i] = el;
//               }}
//             />
//           ))}
//           {/* trailing spacer so the last card can reach center */}
//           <div className="w-[1px] shrink-0" aria-hidden />
//         </div>

//         {/* Drag hint — fades out on first interaction */}
//         <div
//           className="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
//           style={{
//             opacity: showHint ? 1 : 0,
//             transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1)",
//           }}
//         >
//           <span className="flex size-20 flex-col items-center justify-center rounded-full bg-copper-500 text-center text-xs font-medium leading-tight text-white shadow-[0_8px_30px_-6px_rgba(200,118,58,0.45)] backdrop-blur-sm">
//             Drag
//             <br />
//             or click
//           </span>
//         </div>

//         <div className="container-site mt-14 flex justify-center">
//           <Link
//             href="/projects"
//             className="group inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-7 py-3.5 text-xs font-medium tracking-[0.12em] text-charcoal-900/80 uppercase backdrop-blur-sm transition-colors hover:border-copper-400/70 hover:bg-white hover:text-charcoal-950"
//           >
//             Discover more of our work
//             <ArrowUpRight
//               className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
//               aria-hidden
//             />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Project = {
  slug: string;
  title: string;
  location: string;
  type: string;
  solution: string;
  year: string;
  image: string;
};

const projects: Project[] = [
  {
    slug: "luxury-residence-srinagar",
    title: "Luxury Residence",
    location: "Srinagar, Kashmir",
    type: "Residential",
    solution: "AquaBoard Low-Profile",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "boutique-hotel-ladakh",
    title: "Cedar House Hotel",
    location: "Manali, Himachal Pradesh",
    type: "Hospitality",
    solution: "AquaFlow Screed System",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "modern-villa-mumbai",
    title: "Penthouse Residence",
    location: "Mumbai, Maharashtra",
    type: "Residential",
    solution: "StickyMat 200W + SenseWarm Pro",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "hillside-chalet-shimla",
    title: "Hillside Chalet",
    location: "Shimla, Himachal Pradesh",
    type: "Residential",
    solution: "WowTherm ClimaBoard",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "heritage-haveli-jaipur",
    title: "Heritage Haveli Restoration",
    location: "Jaipur, Rajasthan",
    type: "Residential",
    solution: "AquaBoard XT",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "corporate-office-bengaluru",
    title: "Tech Park Office Fit-Out",
    location: "Bengaluru, Karnataka",
    type: "Commercial",
    solution: "AquaFlow ScreedPro",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "beachfront-villa-goa",
    title: "Beachfront Villa",
    location: "Anjuna, Goa",
    type: "Residential",
    solution: "StickyMat 150W",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200&auto=format&fit=crop&q=80",
  },
  {
    slug: "boutique-spa-delhi",
    title: "Boutique Wellness Spa",
    location: "New Delhi",
    type: "Hospitality",
    solution: "SenseWarm Zone Control",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&auto=format&fit=crop&q=80",
  },
];

// How strongly cards tilt/scale/lift/fade as they move away from center.
const MAX_ROTATE_DEG = 22;
const MAX_SCALE_DROP = 0.18;
const MAX_OPACITY_DROP = 0.6;
const MAX_BLUR_PX = 5;
const MAX_LIFT_PX = 48; // center card rises this many px above the rest

// --- Entrance animation tuning (the horizontal "slide in from the right"
// that plays once, the first time this section scrolls into view) --------
const ENTRANCE_DISTANCE_PX = 170;
const ENTRANCE_DURATION_MS = 1200;
const ENTRANCE_STAGGER_MS = 70;
const ENTRANCE_STAGGER_MAX_MS = 480;
const ENTRANCE_EASE = "cubic-bezier(0.16,1,0.3,1)";

/* ------------------------------------------------------------------ */
/* Hover sound — a soft, synthesized "tick" (no audio file needed).    */
/* Lazily creates a single shared AudioContext, unlocked on the        */
/* page's first real gesture (browsers refuse to start/resume audio    */
/* from a mouseenter/hover alone — only click/keydown/touch count).    */
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

function unlockAudioContext() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  // Play a silent buffer once — this is what actually "wakes up" audio
  // on iOS Safari, which needs an audible node to be started, not just
  // resume(), during the very first real gesture.
  const buffer = ctx.createBuffer(1, 1, 22050);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);
}

function playHoverTick() {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  const now = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.value = 0.07;
  master.connect(ctx.destination);

  // Warm low "thock" body — a short sine thump with a fast pitch drop
  const body = ctx.createOscillator();
  body.type = "sine";
  body.frequency.setValueAtTime(210, now);
  body.frequency.exponentialRampToValueAtTime(90, now + 0.09);

  const bodyGain = ctx.createGain();
  bodyGain.gain.setValueAtTime(0, now);
  bodyGain.gain.linearRampToValueAtTime(0.8, now + 0.006);
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

  // Gentle low-pass so it stays soft/rounded, not tinny
  const bodyFilter = ctx.createBiquadFilter();
  bodyFilter.type = "lowpass";
  bodyFilter.frequency.value = 900;

  body.connect(bodyFilter);
  bodyFilter.connect(bodyGain);
  bodyGain.connect(master);
  body.start(now);
  body.stop(now + 0.15);

  // A whisper-quiet high overtone for a touch of warmth/richness
  const overtone = ctx.createOscillator();
  overtone.type = "triangle";
  overtone.frequency.setValueAtTime(620, now);
  overtone.frequency.exponentialRampToValueAtTime(500, now + 0.1);

  const overtoneGain = ctx.createGain();
  overtoneGain.gain.setValueAtTime(0, now);
  overtoneGain.gain.linearRampToValueAtTime(0.12, now + 0.008);
  overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

  overtone.connect(overtoneGain);
  overtoneGain.connect(master);
  overtone.start(now);
  overtone.stop(now + 0.12);
}

function ProjectCard({
  project,
  cardRef,
  onNavigate,
}: {
  project: Project;
  cardRef: (el: HTMLAnchorElement | null) => void;
  onNavigate: (e: React.MouseEvent) => void;
}) {
  // Only fire on real mouse hover — not on touch, and not while the pointer
  // is still down from a drag gesture.
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    playHoverTick();
  };

  return (
    <Link
      ref={cardRef}
      href={`/projects#${project.slug}`}
      onClick={onNavigate}
      onPointerEnter={handlePointerEnter}
      draggable={false}
      className="group relative block w-[300px] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-black/[0.06] bg-white shadow-[0_20px_50px_-20px_rgba(120,70,30,0.25)] sm:w-[360px]"
      style={{ willChange: "transform, filter, opacity" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="360px"
          draggable={false}
          className="object-cover transition-[filter] duration-300 ease-out"
          data-card-image
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-7">
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] text-white/70 uppercase">
          <span>{project.type}</span>
          <span className="size-1 rounded-full bg-copper-300/80" />
          <span>{project.year}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl leading-snug text-white">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-white/70">{project.location}</p>
        <p className="mt-4 inline-block border-b border-copper-300/60 pb-0.5 text-xs tracking-[0.05em] text-copper-200">
          {project.solution}
        </p>
      </div>
    </Link>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<Array<HTMLAnchorElement | null>>([]);
  const [showHint, setShowHint] = useState(true);

  // Whether the one-time "cards slide in from the right" entrance has
  // played yet. Starts false so cards render off-screen on first paint.
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  const dragState = useRef({
    isDown: false,
    startX: 0,
    startScroll: 0,
    moved: 0,
  });

  // Unlock audio on the page's very first real gesture, so hover sounds
  // (which browsers won't unlock audio for on their own) work right away
  // for the rest of the visit. Runs once, globally, then removes itself.
  useEffect(() => {
    const unlock = () => {
      unlockAudioContext();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    window.addEventListener("touchstart", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  // Play the horizontal entrance exactly once, the first time this section
  // scrolls into view. Respects reduced-motion users by skipping straight
  // to the settled state.
  // Play the horizontal entrance exactly once, but only once you've
  // properly scrolled to this section — not the moment its top edge
  // peeks into view.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHasAnimatedIn(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimatedIn(true);
          observer.disconnect();
        }
      },
      // threshold 0.5 = at least half the section must be visible;
      // rootMargin pulls the bottom trigger line up by 20% of the
      // viewport, so it fires only once you've scrolled well into it.
      { threshold: 0.5, rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Recompute each card's tilt/scale/lift/blur/fade from its distance to
  // the scroller's horizontal center. Runs only in response to real scroll
  // events (native scroll, drag, wheel) — nothing here runs on its own.
  const updateCards = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const rect = scroller.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    for (const el of cardEls.current) {
      if (!el) continue;
      const cardRect = el.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const raw = (cardCenter - centerX) / (rect.width / 2);
      const t = Math.max(-1, Math.min(1, raw));
      const abs = Math.abs(t);
      const lift = (1 - abs) * MAX_LIFT_PX;

      el.style.transform = `perspective(1400px) translateY(${-lift}px) rotateY(${t * -MAX_ROTATE_DEG}deg) scale(${1 - abs * MAX_SCALE_DROP})`;
      el.style.opacity = `${1 - abs * MAX_OPACITY_DROP}`;
      el.style.filter = `blur(${abs * MAX_BLUR_PX}px)`;
      el.style.zIndex = `${Math.round((1 - abs) * 10)}`;

      const img = el.querySelector<HTMLImageElement>("[data-card-image]");
      if (img) img.style.filter = `grayscale(${Math.min(100, abs * 120)}%)`;
    }
  }, []);

  useEffect(() => {
    updateCards();
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateCards);
      if (showHint) setShowHint(false);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCards]);

  // Click-and-drag with a mouse (trackpads/touch already scroll natively).
  const onPointerDown = (e: React.PointerEvent) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    dragState.current = {
      isDown: true,
      startX: e.clientX,
      startScroll: scroller.scrollLeft,
      moved: 0,
    };
    scroller.setPointerCapture(e.pointerId);
    setShowHint(false);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const scroller = scrollerRef.current;
    const state = dragState.current;
    if (!state.isDown || !scroller) return;
    const delta = e.clientX - state.startX;
    state.moved = Math.max(state.moved, Math.abs(delta));
    scroller.scrollLeft = state.startScroll - delta;
  };

  const endDrag = (e: React.PointerEvent) => {
    dragState.current.isDown = false;
    scrollerRef.current?.releasePointerCapture(e.pointerId);
  };

  const onNavigate = (e: React.MouseEvent) => {
    // A drag of more than a few px was a scroll gesture, not a click.
    if (dragState.current.moved > 6) e.preventDefault();
  };

  return (
    <section
      ref={sectionRef}
      className="relative -mt-16 overflow-hidden bg-[#fbf3ea] pt-28 pb-24 md:-mt-24 md:pt-36 md:pb-32"
    >
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>

      {/* Light warm base with a soft copper glow — reads as a continuation
          of the hero's palette while staying bright and airy. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #fdf6ee 0%, #faf0e4 45%, #f6e9da 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 35% 20%, rgba(193,101,46,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="container-site mb-12 px-6 text-center md:mb-16 md:px-[max(1.5rem,calc((100vw-1280px)/2))]">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="block h-px w-8 bg-copper-500/50" />
            <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-copper-600 uppercase">
              Portfolio
            </span>
            <span className="block h-px w-8 bg-copper-500/50" />
          </div>
          <h2 className="font-display text-4xl leading-tight text-charcoal-900 sm:text-5xl md:text-6xl">
            Crafted <span className="font-accent text-[0.85em] text-copper-500">Warmth</span>,
            <br className="hidden sm:block" /> Delivered Everywhere
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-charcoal-900/55 md:text-base">
            A closer look at homes and spaces where our systems work quietly beneath the surface.
          </p>
        </div>

        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="no-scrollbar flex snap-x snap-mandatory gap-7 overflow-x-auto px-6 pt-16 pb-6 cursor-grab active:cursor-grabbing md:px-[max(1.5rem,calc((100vw-1280px)/2))]"
          style={{ perspective: "1400px" }}
        >
          {projects.map((project, i) => {
            const delay = Math.min(i * ENTRANCE_STAGGER_MS, ENTRANCE_STAGGER_MAX_MS);
            return (
              <div
                key={`wrap-${project.slug}-${i}`}
                className="shrink-0"
                style={{
                  transform: hasAnimatedIn
                    ? "translateX(0)"
                    : `translateX(${ENTRANCE_DISTANCE_PX}px)`,
                  opacity: hasAnimatedIn ? 1 : 0,
                  transition: hasAnimatedIn
                    ? `transform ${ENTRANCE_DURATION_MS}ms ${ENTRANCE_EASE} ${delay}ms, opacity ${ENTRANCE_DURATION_MS - 200}ms ease-out ${delay}ms`
                    : "none",
                  willChange: "transform, opacity",
                }}
              >
                <ProjectCard
                  project={project}
                  onNavigate={onNavigate}
                  cardRef={(el) => {
                    cardEls.current[i] = el;
                  }}
                />
              </div>
            );
          })}
          {/* trailing spacer so the last card can reach center */}
          <div className="w-[1px] shrink-0" aria-hidden />
        </div>

        {/* Drag hint — fades out on first interaction */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          style={{
            opacity: showHint ? 1 : 0,
            transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span className="flex size-20 flex-col items-center justify-center rounded-full bg-copper-500 text-center text-xs font-medium leading-tight text-white shadow-[0_8px_30px_-6px_rgba(200,118,58,0.45)] backdrop-blur-sm">
            Drag
            <br />
            or click
          </span>
        </div>

        <div className="container-site mt-14 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-7 py-3.5 text-xs font-medium tracking-[0.12em] text-charcoal-900/80 uppercase backdrop-blur-sm transition-colors hover:border-copper-400/70 hover:bg-white hover:text-charcoal-950"
          >
            Discover more of our work
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}