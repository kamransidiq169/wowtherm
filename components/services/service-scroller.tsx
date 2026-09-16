

// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { useEffect, useRef, useState, type ReactNode } from "react";
// import { ScrollTrigger } from "@/lib/gsap";
// import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

// export interface ScrollerService {
//   id: string;
//   icon: ReactNode;
//   title: string;
//   summary: string;
// }

// const EASE = [0.22, 1, 0.36, 1] as const;

// /**
//  * Services as a sticky split panel: the left side holds while the six services
//  * scroll past on the right. A single copper rail runs beside the list and its
//  * marker travels to whichever service is centred — the same structural device
//  * used in <Process>, so the two sections read as one system rather than two
//  * unrelated components.
//  */
// export function ServiceScroller({
//   services,
//   className,
// }: {
//   services: ScrollerService[];
//   className?: string;
// }) {
//   const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
//   const [active, setActive] = useState(0);
//   const reduced = usePrefersReducedMotion();

//   useEffect(() => {
//     if (reduced) return;

//     const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
//     if (items.length === 0) return;

//     const triggers = items.map((el, i) =>
//       ScrollTrigger.create({
//         trigger: el,
//         start: "top center",
//         end: "bottom center",
//         onToggle: (self) => {
//           if (self.isActive) setActive(i);
//         },
//       }),
//     );

//     return () => triggers.forEach((t) => t.kill());
//   }, [reduced, services.length]);

//   const current = services[active] ?? services[0];
//   const step = 100 / services.length;

//   return (
//     <div className={className}>
//       <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
//         {/* Held panel — swaps to whichever service is centred. */}
//         <div className="lg:sticky lg:top-28 lg:h-fit">
//           <div className="relative min-h-64 overflow-hidden">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={current.id}
//                 initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
//                 animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
//                 exit={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
//                 transition={{ duration: 0.55, ease: EASE }}
//               >
//                 <span className="grid size-14 place-items-center rounded-xl bg-copper-100 text-copper-600">
//                   {current.icon}
//                 </span>
//                 <p className="mt-8 font-display text-[clamp(3.5rem,9vw,6rem)] leading-none text-copper-500/20">
//                   {String(active + 1).padStart(2, "0")}
//                 </p>
//                 <h3 className="mt-4 font-display text-3xl text-charcoal-900 md:text-4xl">
//                   {current.title}
//                 </h3>
//                 <p className="mt-4 max-w-md leading-relaxed text-charcoal-600">
//                   {current.summary}
//                 </p>
//                 <a
//                   href={`#${current.id}`}
//                   className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-copper-600 transition-colors hover:text-copper-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-500"
//                 >
//                   Read the detail
//                   <ArrowRight className="size-4" aria-hidden />
//                 </a>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Progress through the set — single label, not decoration. */}
//           <p className="mt-10 font-display text-sm text-charcoal-400">
//             {String(active + 1).padStart(2, "0")}
//             <span className="text-charcoal-300"> / {String(services.length).padStart(2, "0")}</span>
//           </p>
//         </div>

//         {/* The list that drives it, with a copper rail tracking progress. */}
//         <div className="relative">
//           <div aria-hidden className="absolute top-1 bottom-1 left-0 w-px bg-charcoal-900/8" />
//           <motion.div
//             aria-hidden
//             className="absolute left-0 w-px bg-copper-500"
//             animate={{ top: `${active * step}%`, height: `${step}%` }}
//             transition={{ duration: 0.5, ease: EASE }}
//           />

//           <ol className="space-y-4 pl-8">
//             {services.map((service, i) => (
//               <li
//                 key={service.id}
//                 ref={(el) => {
//                   itemRefs.current[i] = el;
//                 }}
//                 className="flex min-h-[46svh] flex-col justify-center"
//               >
//                 <a
//                   href={`#${service.id}`}
//                   data-active={i === active}
//                   className="group py-1 transition-opacity duration-500 ease-(--ease-out-quart) data-[active=false]:opacity-40 data-[active=true]:opacity-100"
//                 >
//                   <div className="flex items-baseline gap-4">
//                     <span className="font-display text-sm text-copper-600">
//                       {String(i + 1).padStart(2, "0")}
//                     </span>
//                     <h4 className="font-display text-xl text-charcoal-900 transition-colors group-hover:text-copper-700">
//                       {service.title}
//                     </h4>
//                   </div>
//                   <p className="mt-3 max-w-sm text-sm leading-relaxed text-charcoal-500">
//                     {service.summary}
//                   </p>
//                 </a>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Circle,
  Plus,
} from "lucide-react";
import {
  useRef,
  type ReactNode,
} from "react";

export interface ScrollerService {
  id: string;
  icon: ReactNode;
  title: string;
  summary: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICE_TYPES = [
  "Assessment",
  "Installation",
  "Installation",
  "Control",
  "Preparation",
  "Support",
];

const SERVICE_CODES = [
  "WT / 01",
  "WT / 02",
  "WT / 03",
  "WT / 04",
  "WT / 05",
  "WT / 06",
];

const SERVICE_POINTS = [
  ["Heat-loss review", "Room-by-room planning", "System specification"],
  ["Electric heating", "Professional installation", "Testing & commissioning"],
  ["Pipework design", "Heat-source integration", "System balancing"],
  ["Smart thermostats", "Room zoning", "Temperature scheduling"],
  ["Insulation systems", "Subfloor preparation", "Thermal efficiency"],
  ["Warranty support", "System guidance", "Aftercare"],
];

function ServiceStage({
  service,
  index,
  total,
}: {
  service: ScrollerService;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLElement>(null);

  const isInView = useInView(ref, {
    margin: "-35% 0px -35% 0px",
    once: false,
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -70]);
  const numberY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  const points = SERVICE_POINTS[index] ?? SERVICE_POINTS[0];

  return (
    <article
      ref={ref}
      id={service.id}
      className="group relative min-h-[88svh] border-t border-charcoal-950/[0.10]"
    >
      {/* =====================================================
          BACKGROUND NUMBER
      ===================================================== */}

      <motion.div
        style={{ y: numberY }}
        aria-hidden
        className="pointer-events-none absolute right-[-2vw] top-[8%] select-none font-display text-[clamp(9rem,24vw,25rem)] leading-none tracking-[-0.12em] text-copper-500/[0.055]"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* =====================================================
          ARCHITECTURAL CROSS MARK
      ===================================================== */}

      <div
        aria-hidden
        className="absolute right-0 top-0 hidden size-8 -translate-y-1/2 md:block"
      >
        <span className="absolute left-1/2 top-0 h-full w-px bg-copper-500/30" />
        <span className="absolute left-0 top-1/2 h-px w-full bg-copper-500/30" />
      </div>

      <div className="mx-auto grid min-h-[88svh] max-w-[1500px] grid-cols-1 lg:grid-cols-[120px_minmax(0,1fr)_340px]">
        {/* =====================================================
            LEFT — INDEX
        ===================================================== */}

        <div className="hidden border-r border-charcoal-950/[0.08] lg:block">
          <div className="sticky top-32 flex flex-col items-center">
            <span className="font-display text-lg text-copper-600">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="mt-5 h-24 w-px bg-charcoal-950/[0.10]" />

            <span
              className="mt-5 text-[8px] uppercase tracking-[0.3em] text-charcoal-950/35"
              style={{ writingMode: "vertical-rl" }}
            >
              {SERVICE_TYPES[index] ?? "Service"}
            </span>
          </div>
        </div>

        {/* =====================================================
            CENTER — MAIN EDITORIAL CONTENT
        ===================================================== */}

        <div className="relative flex items-center px-6 py-20 md:px-12 lg:px-20 lg:py-24">
          <motion.div
            style={{ y: visualY }}
            className="w-full"
          >
            {/* mobile / desktop code */}
            <div className="mb-10 flex items-center gap-4 lg:mb-14">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-copper-600">
                {SERVICE_CODES[index]}
              </span>

              <span className="h-px w-12 bg-copper-500/35" />

              <span className="text-[9px] uppercase tracking-[0.24em] text-charcoal-950/35">
                {SERVICE_TYPES[index] ?? "Service"}
              </span>
            </div>

            {/* title */}
            <div className="relative">
              <motion.h3
                initial={false}
                animate={{
                  opacity: isInView ? 1 : 0.38,
                  x: isInView ? 0 : 12,
                }}
                transition={{
                  duration: 0.7,
                  ease: EASE,
                }}
                className="max-w-[850px] font-display text-[clamp(3.4rem,7vw,8rem)] font-medium leading-[0.86] tracking-[-0.065em] text-charcoal-950"
              >
                {service.title}
              </motion.h3>

              {/* copper underline */}
              <motion.div
                initial={false}
                animate={{
                  width: isInView ? "18%" : "6%",
                  opacity: isInView ? 1 : 0.35,
                }}
                transition={{
                  duration: 0.8,
                  ease: EASE,
                }}
                className="mt-10 h-[2px] min-w-16 bg-copper-500"
              />
            </div>

            {/* summary */}
            <motion.p
              initial={false}
              animate={{
                opacity: isInView ? 1 : 0.45,
                y: isInView ? 0 : 8,
              }}
              transition={{
                duration: 0.65,
                delay: 0.05,
                ease: EASE,
              }}
              className="mt-10 max-w-[620px] text-[clamp(1rem,1.5vw,1.25rem)] leading-[1.8] text-charcoal-950/55"
            >
              {service.summary}
            </motion.p>

            {/* =================================================
                SERVICE DETAILS
            ================================================= */}

            <div className="mt-14 max-w-[760px] border-t border-charcoal-950/[0.10]">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {points.map((point, pointIndex) => (
                  <div
                    key={point}
                    className={[
                      "relative py-6",
                      pointIndex !== 0
                        ? "border-t border-charcoal-950/[0.08] md:border-l md:border-t-0 md:pl-7"
                        : "",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-copper-600"
                        strokeWidth={1.5}
                        aria-hidden
                      />

                      <span className="text-[11px] uppercase leading-5 tracking-[0.08em] text-charcoal-950/55">
                        {point}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                BOTTOM CTA
            ================================================= */}

            <a
              href={`#${service.id}`}
              className="group/link mt-12 inline-flex items-center gap-5"
            >
              <span className="relative text-[9px] font-medium uppercase tracking-[0.24em] text-charcoal-950/55">
                Explore this service

                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-copper-500 transition-transform duration-500 group-hover/link:scale-x-100" />
              </span>

              <span className="flex size-11 items-center justify-center border border-charcoal-950/[0.15] transition-all duration-500 group-hover/link:border-copper-500 group-hover/link:bg-copper-500 group-hover/link:text-white">
                <ArrowUpRight
                  className="size-4 transition-transform duration-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </a>
          </motion.div>
        </div>

        {/* =====================================================
            RIGHT — TECHNICAL INFORMATION
        ===================================================== */}

        <div className="relative hidden border-l border-charcoal-950/[0.08] lg:block">
          <div className="sticky top-32 p-10">
            {/* heading */}
            <div className="flex items-center gap-3">
              <Circle
                className="size-2 fill-copper-500 text-copper-500"
                aria-hidden
              />

              <span className="text-[8px] uppercase tracking-[0.28em] text-charcoal-950/35">
                Specification
              </span>
            </div>

            {/* rule */}
            <div className="mt-7 h-px w-full bg-charcoal-950/[0.10]" />

            {/* icon */}
            <div className="mt-10 flex size-14 items-center justify-center border border-copper-500/30 text-copper-600">
              {service.icon}
            </div>

            {/* service label */}
            <p className="mt-8 text-[9px] uppercase tracking-[0.24em] text-copper-600">
              {SERVICE_CODES[index]}
            </p>

            <p className="mt-2 max-w-[220px] font-display text-xl leading-tight text-charcoal-950">
              {SERVICE_TYPES[index] ?? "Service"} / engineered for warmth
            </p>

            {/* technical rows */}
            <div className="mt-10 border-t border-charcoal-950/[0.10]">
              <div className="flex items-center justify-between border-b border-charcoal-950/[0.08] py-4">
                <span className="text-[8px] uppercase tracking-[0.2em] text-charcoal-950/30">
                  System
                </span>

                <span className="text-[10px] uppercase tracking-[0.12em] text-charcoal-950/60">
                  WOWTHERM
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-charcoal-950/[0.08] py-4">
                <span className="text-[8px] uppercase tracking-[0.2em] text-charcoal-950/30">
                  Stage
                </span>

                <span className="text-[10px] uppercase tracking-[0.12em] text-copper-600">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(total).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-charcoal-950/[0.08] py-4">
                <span className="text-[8px] uppercase tracking-[0.2em] text-charcoal-950/30">
                  Process
                </span>

                <span className="text-[10px] uppercase tracking-[0.12em] text-charcoal-950/60">
                  {SERVICE_TYPES[index] ?? "Service"}
                </span>
              </div>
            </div>

            {/* side quote */}
            <div className="mt-12 border-l-2 border-copper-500/30 pl-5">
              <p className="font-display text-lg leading-[1.35] text-charcoal-950/60">
                Precision first.
                <br />
                Warmth follows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ServiceScroller({
  services,
  className,
}: {
  services: ScrollerService[];
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  if (!services.length) return null;

  return (
    <section
      ref={sectionRef}
      className={[
        "relative overflow-hidden bg-[#f6f2eb] text-charcoal-950",
        className ?? "",
      ].join(" ")}
    >
      {/* =====================================================
          AMBIENT ARCHITECTURAL BACKGROUND
      ===================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        {/* fine grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(0,0,0,0.8) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.8) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* copper atmosphere */}
        <div className="absolute -left-[15%] top-[8%] size-[520px] rounded-full bg-copper-500/[0.035] blur-[130px]" />

        <div className="absolute -right-[15%] top-[42%] size-[600px] rounded-full bg-copper-500/[0.025] blur-[150px]" />

        {/* vertical architectural guides */}
        <div className="absolute bottom-0 left-[7.5%] top-0 w-px bg-charcoal-950/[0.035]" />
        <div className="absolute bottom-0 right-[7.5%] top-0 w-px bg-charcoal-950/[0.035]" />
      </div>

      {/* =====================================================
          SECTION INTRO
      ===================================================== */}

      <div className="relative mx-auto max-w-[1500px] px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-40 lg:px-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
          {/* eyebrow */}
          <div className="flex items-start gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-copper-600">
              04
            </span>

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-copper-500" />

                <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-charcoal-950/40">
                  Our services
                </span>
              </div>

              <p className="mt-5 max-w-[180px] text-xs leading-6 text-charcoal-950/40">
                From the first measurement to the final degree of warmth.
              </p>
            </div>
          </div>

          {/* heading */}
          <div>
            <h2 className="max-w-[1050px] font-display text-[clamp(3.5rem,7vw,8.5rem)] font-medium leading-[0.84] tracking-[-0.07em] text-charcoal-950">
              Warmth,
              <br />
              <span className="text-copper-500/75">properly</span> engineered.
            </h2>

            <div className="mt-10 flex max-w-[680px] items-start gap-5">
              <span className="mt-3 h-px w-16 shrink-0 bg-copper-500/50" />

              <p className="text-sm leading-7 text-charcoal-950/50 md:text-base md:leading-8">
                Every WOWTHERM system begins with understanding the space,
                continues through precise engineering and installation, and
                ends with support long after the floor is warm.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SERVICE STAGES
      ===================================================== */}

      <div className="relative">
        {services.map((service, index) => (
          <ServiceStage
            key={service.id}
            service={service}
            index={index}
            total={services.length}
          />
        ))}
      </div>

      {/* =====================================================
          CLOSING STATEMENT
      ===================================================== */}

      <div className="relative mx-auto max-w-[1500px] border-t border-charcoal-950/[0.10] px-6 py-24 md:px-12 md:py-36 lg:px-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="flex items-start gap-3">
            <Plus
              className="size-4 text-copper-500"
              strokeWidth={1}
              aria-hidden
            />

            <span className="text-[9px] uppercase tracking-[0.24em] text-charcoal-950/35">
              End to end
            </span>
          </div>

          <div>
            <p className="max-w-[900px] font-display text-[clamp(2.4rem,5vw,5.8rem)] leading-[0.92] tracking-[-0.055em] text-charcoal-950">
              One system.
              <br />
              <span className="text-copper-500/70">
                Considered completely.
              </span>
            </p>

            <div className="mt-12 flex items-center gap-5">
              <ArrowDownRight
                className="size-5 text-copper-500"
                strokeWidth={1.25}
                aria-hidden
              />

              <span className="text-[9px] uppercase tracking-[0.24em] text-charcoal-950/35">
                Designed for the room. Built for the years ahead.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}