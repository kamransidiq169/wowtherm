


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { ArrowRight, ArrowUpRight } from "lucide-react";
// import { Reveal } from "@/components/motion/reveal";
// import { solutions } from "@/lib/site";

// const EASE = [0.22, 1, 0.36, 1] as const;

// export default function SolutionsPage() {
//   const { scrollYProgress } = useScroll();

//   const heroImageY = useTransform(scrollYProgress, [0, 0.18], [0, 70]);
//   const heroImageScale = useTransform(
//     scrollYProgress,
//     [0, 0.18],
//     [1.06, 1],
//   );

//   return (
//     <main className="overflow-hidden bg-ivory-100">
//       {/* ================================================================
//           HERO
//       ================================================================= */}
//       <section className="relative isolate min-h-[92svh] overflow-hidden bg-charcoal-950 text-white">
//         {/* Architectural grid */}
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-0 opacity-[0.045]"
//           style={{
//             backgroundImage: `
//               linear-gradient(
//                 to right,
//                 rgba(255,255,255,0.9) 1px,
//                 transparent 1px
//               ),
//               linear-gradient(
//                 to bottom,
//                 rgba(255,255,255,0.9) 1px,
//                 transparent 1px
//               )
//             `,
//             backgroundSize: "90px 90px",
//           }}
//         />

//         {/* Atmosphere */}
//         <div
//           aria-hidden
//           className="pointer-events-none absolute -right-40 top-1/4 size-[520px] rounded-full bg-copper-500/[0.07] blur-[150px]"
//         />

//         <div className="container-site relative z-10 flex min-h-[92svh] flex-col">
//           {/* Top bar */}
//           <div className="flex items-center justify-between border-b border-white/10 py-5">
//             <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/40">
//               WOWTHERM
//             </span>

//             <span className="text-[10px] uppercase tracking-[0.22em] text-copper-400">
//               Solutions
//             </span>
//           </div>

//           <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
//             {/* Editorial copy */}
//             <div className="relative z-20 max-w-3xl">
//               <Reveal>
//                 <div className="mb-7 flex items-center gap-3">
//                   <span className="h-px w-10 bg-copper-400" />
//                   <span className="text-[11px] uppercase tracking-[0.24em] text-copper-400">
//                     01 / Spaces
//                   </span>
//                 </div>
//               </Reveal>

//               <Reveal delay={0.08}>
//                 <h1 className="font-display text-[clamp(3.5rem,7vw,7.8rem)] font-medium leading-[0.86] tracking-[-0.06em] text-white">
//                   Warmth,
//                   <br />
//                   <span className="text-copper-400">properly placed.</span>
//                 </h1>
//               </Reveal>

//               <Reveal delay={0.16}>
//                 <div className="mt-9 h-px w-20 bg-copper-400/70" />
//               </Reveal>

//               <Reveal delay={0.22}>
//                 <p className="mt-7 max-w-xl text-[1.05rem] leading-8 text-white/50 md:text-[1.15rem]">
//                   Every space asks something different of a heating system.
//                   We design the warmth around the architecture, not the other
//                   way around.
//                 </p>
//               </Reveal>

//               <Reveal delay={0.28}>
//                 <Link
//                   href="#spaces"
//                   className="group mt-10 inline-flex items-center gap-3 border-b border-white/20 pb-3 text-xs uppercase tracking-[0.18em] text-white/75 transition-colors hover:border-copper-400 hover:text-white"
//                 >
//                   Explore solutions
//                   <ArrowRight
//                     className="size-4 text-copper-400 transition-transform duration-300 group-hover:translate-x-1"
//                     aria-hidden
//                   />
//                 </Link>
//               </Reveal>
//             </div>

//             {/* Hero visual */}
//             <motion.div
//               style={{
//                 y: heroImageY,
//                 scale: heroImageScale,
//               }}
//               className="relative lg:-mr-[8vw]"
//             >
//               <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
//                 <Image
//                   src={solutions[0]?.image ?? "/service.png"}
//                   alt=""
//                   fill
//                   priority
//                   sizes="(max-width: 1024px) 100vw, 60vw"
//                   className="object-cover"
//                 />

//                 <div className="absolute inset-0 bg-gradient-to-tr from-charcoal-950/45 via-transparent to-white/[0.04]" />

//                 <div className="absolute left-5 top-5 border-l border-t border-copper-400/60 p-3">
//                   <span className="text-[9px] uppercase tracking-[0.2em] text-white/55">
//                     Engineered comfort
//                   </span>
//                 </div>

//                 <div className="absolute bottom-5 right-5 flex items-center gap-2">
//                   <span className="size-1.5 rounded-full bg-copper-400" />
//                   <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
//                     Application / 01
//                   </span>
//                 </div>
//               </div>

//               <div
//                 aria-hidden
//                 className="absolute -bottom-5 -left-5 -z-10 size-28 border-b border-l border-copper-400/35"
//               />
//             </motion.div>
//           </div>

//           {/* Bottom metadata */}
//           <div className="grid grid-cols-2 border-t border-white/10 py-5 md:grid-cols-4">
//             {[
//               ["01", "Residential", "Homes & apartments"],
//               ["02", "Hospitality", "Hotels & guest spaces"],
//               ["03", "Wellness", "Bathrooms & retreats"],
//               ["04", "Commercial", "Work & public spaces"],
//             ].map(([number, label, value]) => (
//               <div
//                 key={number}
//                 className="border-white/10 py-3 md:border-l md:px-6 md:first:border-l-0"
//               >
//                 <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
//                   {number} / {label}
//                 </p>
//                 <p className="mt-2 text-xs text-white/60">{value}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================================================================
//           INTRO
//       ================================================================= */}
//       <section className="relative bg-ivory-100 py-24 md:py-36">
//         <div
//           aria-hidden
//           className="pointer-events-none absolute right-[10%] top-0 h-full w-px bg-copper-500/[0.08]"
//         />

//         <div className="container-site">
//           <div className="grid gap-14 lg:grid-cols-[0.55fr_1.45fr]">
//             <Reveal>
//               <div>
//                 <div className="flex items-center gap-3">
//                   <span className="h-px w-8 bg-copper-500" />
//                   <span className="text-[10px] uppercase tracking-[0.24em] text-copper-600">
//                     02 / The approach
//                   </span>
//                 </div>

//                 <p className="mt-8 max-w-[200px] text-sm leading-6 text-charcoal-400">
//                   Different architecture. Different requirements. One
//                   considered approach to warmth.
//                 </p>
//               </div>
//             </Reveal>

//             <Reveal delay={0.08}>
//               <h2 className="max-w-5xl font-display text-[clamp(2.4rem,5vw,5.4rem)] leading-[0.98] tracking-[-0.05em] text-charcoal-950">
//                 We don't start with a product.
//                 <br />
//                 <span className="text-copper-500/70">
//                   We start with the space.
//                 </span>
//               </h2>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* ================================================================
//           SOLUTIONS
//       ================================================================= */}
//       <section id="spaces" className="bg-white">
//         <div className="container-site">
//           <div className="border-t border-charcoal-900/15">
//             {solutions.map((solution, index) => {
//               const reversed = index % 2 === 1;

//               return (
//                 <motion.article
//                   key={solution.slug}
//                   id={solution.slug}
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-100px" }}
//                   transition={{
//                     duration: 0.8,
//                     ease: EASE,
//                   }}
//                   className="grid min-h-[75svh] border-b border-charcoal-900/15 lg:grid-cols-12"
//                 >
//                   {/* Image */}
//                   <div
//                     className={`relative min-h-[55vh] overflow-hidden lg:col-span-7 ${
//                       reversed ? "lg:order-2" : "lg:order-1"
//                     }`}
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.025 }}
//                       transition={{ duration: 1, ease: EASE }}
//                       className="absolute inset-0"
//                     >
//                       <Image
//                         src={solution.image}
//                         alt={solution.title}
//                         fill
//                         sizes="(max-width: 1024px) 100vw, 58vw"
//                         className="object-cover"
//                       />
//                     </motion.div>

//                     {/* Image shade */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent" />

//                     {/* Image number */}
//                     <div className="absolute bottom-6 left-6 flex items-center gap-3">
//                       <span className="text-5xl font-display text-white/75">
//                         {String(index + 1).padStart(2, "0")}
//                       </span>

//                       <span className="h-px w-10 bg-copper-400" />
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div
//                     className={`flex items-center lg:col-span-5 ${
//                       reversed ? "lg:order-1" : "lg:order-2"
//                     }`}
//                   >
//                     <div className="w-full px-0 py-16 lg:px-14 lg:py-20 xl:px-20">
//                       <div className="mb-8 flex items-center gap-3">
//                         <span className="h-px w-8 bg-copper-500" />

//                         <span className="text-[10px] uppercase tracking-[0.22em] text-copper-600">
//                           {solution.subtitle}
//                         </span>
//                       </div>

//                       <h2 className="max-w-xl font-display text-[clamp(2.6rem,4.5vw,5rem)] leading-[0.92] tracking-[-0.045em] text-charcoal-950">
//                         {solution.title}
//                       </h2>

//                       <div className="mt-8 h-px w-14 bg-charcoal-900/15" />

//                       <p className="mt-7 max-w-lg text-base leading-8 text-charcoal-500 md:text-lg">
//                         {solution.description}
//                       </p>

//                       <Link
//                         href="/contact"
//                         className="group mt-10 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-charcoal-900"
//                       >
//                         Discuss your project

//                         <span className="flex size-9 items-center justify-center rounded-full border border-charcoal-900/15 transition-all duration-300 group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white">
//                           <ArrowUpRight
//                             className="size-4 text-copper-500 transition-colors group-hover:text-white"
//                             aria-hidden
//                           />
//                         </span>
//                       </Link>
//                     </div>
//                   </div>
//                 </motion.article>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ================================================================
//           DESIGN PRINCIPLE
//       ================================================================= */}
//       <section className="relative overflow-hidden bg-ivory-100 py-24 md:py-36">
//         <div
//           aria-hidden
//           className="absolute left-1/2 top-0 h-full w-px bg-copper-500/[0.08]"
//         />

//         <div className="container-site">
//           <div className="grid gap-14 lg:grid-cols-[0.5fr_1.5fr]">
//             <Reveal>
//               <div className="flex items-center gap-3">
//                 <span className="h-px w-8 bg-copper-500" />
//                 <span className="text-[10px] uppercase tracking-[0.24em] text-copper-600">
//                   03 / Design principle
//                 </span>
//               </div>
//             </Reveal>

//             <Reveal delay={0.08}>
//               <div>
//                 <p className="font-display text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.98] tracking-[-0.05em] text-charcoal-950">
//                   The best heating system is the one you{" "}
//                   <span className="text-copper-500">never have to see.</span>
//                 </p>

//                 <div className="mt-12 grid gap-8 border-t border-charcoal-900/15 pt-8 md:grid-cols-3">
//                   {[
//                     ["01", "Invisible", "Technology beneath the architecture."],
//                     ["02", "Considered", "Designed around how the space is used."],
//                     ["03", "Comfortable", "Consistent warmth where it matters."],
//                   ].map(([number, title, text]) => (
//                     <div key={number}>
//                       <span className="text-[10px] tracking-[0.18em] text-copper-500">
//                         {number}
//                       </span>

//                       <h3 className="mt-4 font-display text-2xl text-charcoal-950">
//                         {title}
//                       </h3>

//                       <p className="mt-3 text-sm leading-6 text-charcoal-500">
//                         {text}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       {/* ================================================================
//           CTA
//       ================================================================= */}
//       <section className="relative isolate overflow-hidden bg-charcoal-950 py-28 text-white md:py-40">
//         <div
//           aria-hidden
//           className="absolute inset-0 opacity-[0.045]"
//           style={{
//             backgroundImage: `
//               linear-gradient(
//                 to right,
//                 rgba(255,255,255,0.8) 1px,
//                 transparent 1px
//               ),
//               linear-gradient(
//                 to bottom,
//                 rgba(255,255,255,0.8) 1px,
//                 transparent 1px
//               )
//             `,
//             backgroundSize: "90px 90px",
//           }}
//         />

//         <div
//           aria-hidden
//           className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-500/[0.055] blur-[130px]"
//         />

//         <div className="container-site relative z-10 text-center">
//           <Reveal>
//             <p className="text-[10px] uppercase tracking-[0.25em] text-copper-400">
//               04 / Your space
//             </p>
//           </Reveal>

//           <Reveal delay={0.08}>
//             <h2 className="mx-auto mt-7 max-w-5xl font-display text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.055em]">
//               Tell us about
//               <br />
//               <span className="text-copper-400">your space.</span>
//             </h2>
//           </Reveal>

//           <Reveal delay={0.16}>
//             <p className="mx-auto mt-8 max-w-xl text-base leading-7 text-white/45 md:text-lg">
//               Whether you are building, renovating or simply looking for a
//               better way to heat a room, we can help you find the right
//               approach.
//             </p>
//           </Reveal>

//           <Reveal delay={0.24}>
//             <Link
//               href="/contact"
//               className="group mt-10 inline-flex h-14 items-center gap-4 bg-copper-500 px-7 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-copper-400"
//             >
//               Discuss your project
//               <ArrowRight
//                 className="size-4 transition-transform duration-300 group-hover:translate-x-1"
//                 aria-hidden
//               />
//             </Link>
//           </Reveal>
//         </div>
//       </section>
//     </main>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { solutions } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ================================================================
   FEATURED APPLICATIONS
   ================================================================ */

const applications = [
  {
    slug: "luxury-residence-srinagar",
    title: "Luxury Residence",
    location: "Srinagar, Kashmir",
    type: "Residential",
    solution: "AquaBoard Low-Profile",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    slug: "cedar-house-manali",
    title: "Cedar House Hotel",
    location: "Manali, Himachal Pradesh",
    type: "Hospitality",
    solution: "AquaFlow Screed System",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
  },
  {
    slug: "penthouse-mumbai",
    title: "Penthouse Residence",
    location: "Mumbai, Maharashtra",
    type: "Residential",
    solution: "StickyMat 200W + SenseWarm Pro",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
  },
  {
    slug: "hillside-chalet-shimla",
    title: "Hillside Chalet",
    location: "Shimla, Himachal Pradesh",
    type: "Residential",
    solution: "WowTherm ClimaBoard",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85",
  },
  {
    slug: "heritage-haveli-jaipur",
    title: "Heritage Haveli Restoration",
    location: "Jaipur, Rajasthan",
    type: "Residential",
    solution: "AquaBoard XT",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
  },
  {
    slug: "tech-park-bengaluru",
    title: "Tech Park Office Fit-Out",
    location: "Bengaluru, Karnataka",
    type: "Commercial",
    solution: "AquaFlow ScreedPro",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85",
  },
  {
    slug: "beachfront-villa-goa",
    title: "Beachfront Villa",
    location: "Anjuna, Goa",
    type: "Residential",
    solution: "StickyMat 150W",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=85",
  },
  {
    slug: "wellness-spa-delhi",
    title: "Boutique Wellness Spa",
    location: "New Delhi, India",
    type: "Hospitality",
    solution: "SenseWarm Zone Control",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85",
  },
];

export default function SolutionsPage() {
  const { scrollYProgress } = useScroll();

  const heroImageY = useTransform(
    scrollYProgress,
    [0, 0.18],
    [0, 70],
  );

  const heroImageScale = useTransform(
    scrollYProgress,
    [0, 0.18],
    [1.06, 1],
  );

  return (
    <main className="overflow-hidden bg-ivory-100">
      {/* ================================================================
          HERO
      ================================================================ */}

      <section className="relative isolate min-h-[92svh] overflow-hidden bg-charcoal-950 text-white">
        {/* Architectural grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.9) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,0.9) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "90px 90px",
          }}
        />

        {/* Atmosphere */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/4 size-[520px] rounded-full bg-copper-500/[0.07] blur-[150px]"
        />

        <div className="container-site relative z-10 flex min-h-[92svh] flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-white/10 py-5">
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/40">
              WOWTHERM
            </span>

            <span className="text-[10px] uppercase tracking-[0.22em] text-copper-400">
              Solutions
            </span>
          </div>

          <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
            {/* Editorial copy */}
            <div className="relative z-20 max-w-3xl">
              <Reveal>
                <div className="mb-7 flex items-center gap-3">
                  <span className="h-px w-10 bg-copper-400" />

                  <span className="text-[11px] uppercase tracking-[0.24em] text-copper-400">
                    01 / Spaces
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="font-display text-[clamp(3.5rem,7vw,7.8rem)] font-medium leading-[0.86] tracking-[-0.06em] text-white">
                  Warmth,
                  <br />
                  <span className="text-copper-400">
                    properly placed.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-9 h-px w-20 bg-copper-400/70" />
              </Reveal>

              <Reveal delay={0.22}>
                <p className="mt-7 max-w-xl text-[1.05rem] leading-8 text-white/50 md:text-[1.15rem]">
                  Every space asks something different of a heating system.
                  We design the warmth around the architecture, not the other
                  way around.
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <Link
                  href="#spaces"
                  className="group mt-10 inline-flex items-center gap-3 border-b border-white/20 pb-3 text-xs uppercase tracking-[0.18em] text-white/75 transition-colors hover:border-copper-400 hover:text-white"
                >
                  Explore solutions

                  <ArrowRight
                    className="size-4 text-copper-400 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            </div>

            {/* Hero visual */}
            <motion.div
              style={{
                y: heroImageY,
                scale: heroImageScale,
              }}
              className="relative lg:-mr-[8vw]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
                <Image
                  src={solutions[0]?.image ?? "/service.png"}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-charcoal-950/45 via-transparent to-white/[0.04]" />

                <div className="absolute left-5 top-5 border-l border-t border-copper-400/60 p-3">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/55">
                    Engineered comfort
                  </span>
                </div>

                <div className="absolute bottom-5 right-5 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-copper-400" />

                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/60">
                    Application / 01
                  </span>
                </div>
              </div>

              <div
                aria-hidden
                className="absolute -bottom-5 -left-5 -z-10 size-28 border-b border-l border-copper-400/35"
              />
            </motion.div>
          </div>

          {/* Bottom metadata */}
          <div className="grid grid-cols-2 border-t border-white/10 py-5 md:grid-cols-4">
            {[
              ["01", "Residential", "Homes & apartments"],
              ["02", "Hospitality", "Hotels & guest spaces"],
              ["03", "Wellness", "Bathrooms & retreats"],
              ["04", "Commercial", "Work & public spaces"],
            ].map(([number, label, value]) => (
              <div
                key={number}
                className="border-white/10 py-3 md:border-l md:px-6 md:first:border-l-0"
              >
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  {number} / {label}
                </p>

                <p className="mt-2 text-xs text-white/60">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          INTRO
      ================================================================ */}

      <section className="relative bg-ivory-100 py-24 md:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[10%] top-0 h-full w-px bg-copper-500/[0.08]"
        />

        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-[0.55fr_1.45fr]">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-copper-500" />

                  <span className="text-[10px] uppercase tracking-[0.24em] text-copper-600">
                    02 / The approach
                  </span>
                </div>

                <p className="mt-8 max-w-[200px] text-sm leading-6 text-charcoal-400">
                  Different architecture. Different requirements. One
                  considered approach to warmth.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="max-w-5xl font-display text-[clamp(2.4rem,5vw,5.4rem)] leading-[0.98] tracking-[-0.05em] text-charcoal-950">
                We don't start with a product.
                <br />
                <span className="text-copper-500/70">
                  We start with the space.
                </span>
              </h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SOLUTIONS
      ================================================================ */}

     

      {/* ================================================================
          FEATURED APPLICATIONS / LOCATIONS
      ================================================================ */}

      <section className="relative overflow-hidden bg-charcoal-950 py-24 text-white md:py-36">
        {/* Architectural grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.9) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,0.9) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "90px 90px",
          }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/3 size-[500px] rounded-full bg-copper-500/[0.06] blur-[150px]"
        />

        <div className="container-site relative z-10">
          {/* Section heading */}
          <div className="grid gap-12 lg:grid-cols-[0.45fr_1.55fr]">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-copper-400" />

                  <span className="text-[10px] uppercase tracking-[0.24em] text-copper-400">
                    03 / Where we work
                  </span>
                </div>

                <p className="mt-8 max-w-[220px] text-sm leading-6 text-white/35">
                  From mountain residences to coastal villas, our systems are
                  designed around the character and demands of each space.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="max-w-5xl font-display text-[clamp(2.7rem,5.5vw,6rem)] leading-[0.92] tracking-[-0.055em]">
                Solutions for
                <br />
                <span className="text-copper-400">
                  every kind of space.
                </span>
              </h2>
            </Reveal>
          </div>

          {/* Applications */}
          <div className="mt-20 border-t border-white/10">
            {applications.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.7,
                  delay: Math.min(index * 0.03, 0.2),
                  ease: EASE,
                }}
                className="group grid border-b border-white/10 py-8 md:grid-cols-[80px_1fr_1.2fr_180px] md:items-center md:gap-8 md:py-9"
              >
                {/* Number */}
                <div className="mb-5 md:mb-0">
                  <span className="font-display text-3xl text-copper-400/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Image + title */}
                <div className="flex items-center gap-5">
                  <div className="relative hidden size-20 shrink-0 overflow-hidden md:block">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                    />
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-copper-400/70">
                      {project.type}
                    </p>

                    <h3 className="mt-2 font-display text-2xl leading-tight text-white transition-colors duration-300 group-hover:text-copper-300 md:text-3xl">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Location + system */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 md:mt-0">
                  <div>
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/25">
                      <MapPin className="size-3" aria-hidden />
                      Location
                    </div>

                    <p className="mt-2 text-sm text-white/60">
                      {project.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                      System
                    </p>

                    <p className="mt-2 text-sm text-white/60">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Year / CTA */}
                <div className="mt-6 flex items-center justify-between md:mt-0 md:justify-end md:gap-6">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                    {project.year}
                  </span>

                  <span className="flex size-9 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-copper-400 group-hover:bg-copper-400">
                    <ArrowUpRight
                      className="size-4 text-copper-400 transition-colors group-hover:text-white"
                      aria-hidden
                    />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Bottom statement */}
          <Reveal>
            <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl text-sm leading-6 text-white/35">
                Residential, hospitality and commercial environments require
                different approaches. We engineer the system accordingly.
              </p>

              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/70"
              >
                Talk to our team

                <span className="flex size-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 group-hover:border-copper-400 group-hover:bg-copper-400">
                  <ArrowUpRight
                    className="size-4 text-copper-400 transition-colors group-hover:text-white"
                    aria-hidden
                  />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================
          DESIGN PRINCIPLE
      ================================================================ */}

      <section className="relative overflow-hidden bg-ivory-100 py-24 md:py-36">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-full w-px bg-copper-500/[0.08]"
        />

        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-[0.5fr_1.5fr]">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-copper-500" />

                <span className="text-[10px] uppercase tracking-[0.24em] text-copper-600">
                  04 / Design principle
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <p className="font-display text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.98] tracking-[-0.05em] text-charcoal-950">
                  The best heating system is the one you{" "}
                  <span className="text-copper-500">
                    never have to see.
                  </span>
                </p>

                <div className="mt-12 grid gap-8 border-t border-charcoal-900/15 pt-8 md:grid-cols-3">
                  {[
                    [
                      "01",
                      "Invisible",
                      "Technology beneath the architecture.",
                    ],
                    [
                      "02",
                      "Considered",
                      "Designed around how the space is used.",
                    ],
                    [
                      "03",
                      "Comfortable",
                      "Consistent warmth where it matters.",
                    ],
                  ].map(([number, title, text]) => (
                    <div key={number}>
                      <span className="text-[10px] tracking-[0.18em] text-copper-500">
                        {number}
                      </span>

                      <h3 className="mt-4 font-display text-2xl text-charcoal-950">
                        {title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-charcoal-500">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
      ================================================================ */}

      <section className="relative isolate overflow-hidden bg-charcoal-950 py-28 text-white md:py-40">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "90px 90px",
          }}
        />

        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-500/[0.055] blur-[130px]"
        />

        <div className="container-site relative z-10 text-center">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.25em] text-copper-400">
              05 / Your space
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-7 max-w-5xl font-display text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.055em]">
              Tell us about
              <br />
              <span className="text-copper-400">
                your space.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-8 max-w-xl text-base leading-7 text-white/45 md:text-lg">
              Whether you are building, renovating or simply looking for a
              better way to heat a room, we can help you find the right
              approach.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <Link
              href="/contact"
              className="group mt-10 inline-flex h-14 items-center gap-4 bg-copper-500 px-7 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-copper-400"
            >
              Discuss your project

              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}