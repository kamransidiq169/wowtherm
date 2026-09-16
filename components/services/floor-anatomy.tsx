// import { Reveal } from "@/components/motion/reveal";
// import { SectionHeading } from "@/components/section-heading";

// const layers = [
//   {
//     name: "Subfloor or slab",
//     note: "Primed and levelled first. Every other layer's performance depends on what this one starts flat.",
//   },
//   {
//     name: "ThermaBase insulation",
//     note: "Stops heat travelling down into the slab instead of up into the room. Typically halves heat-up time.",
//   },
//   {
//     name: "Heating element",
//     note: "Electric mat or cable, or hydronic pipe loops — laid to the room-by-room design from your survey.",
//   },
//   {
//     name: "Levelling compound / screed",
//     note: "Encapsulates the element and gives tile or stone a true, even bed to sit on.",
//   },
//   {
//     name: "Finish floor",
//     note: "Tile, stone, engineered wood — commissioned and temperature-limited to suit whatever you've chosen.",
//   },
// ];

// /**
//  * Bottom-to-top cutaway of a warm floor, read in the order it's actually
//  * built: subfloor first, finish last. The rail matches the numbered lists
//  * used elsewhere on the page, but stays static — Process owns the one
//  * scroll-scrubbed animation on this page.
//  */
// export function FloorAnatomy() {
//   return (
//     <section className="bg-charcoal-950 py-24 text-white md:py-32">
//       <div className="container-site">
//         <SectionHeading
//           dark
//           eyebrow="What's under the tile"
//           title="Anatomy of a warm floor"
//           lead="Five layers, built bottom to top. Nothing here is optional — leave one out and the system underperforms or fails early."
//         />

//         <div className="mx-auto mt-16 max-w-xl">
//           <div className="flex flex-col-reverse">
//             {layers.map((layer, i) => (
//               <Reveal key={layer.name} delay={i * 0.04}>
//                 <div className="group flex gap-6 border-t border-white/10 py-7 first:border-t-0">
//                   <div className="flex w-8 shrink-0 items-start justify-center pt-1">
//                     <span className="font-display text-sm text-copper-400">
//                       {i + 1}
//                     </span>
//                   </div>
//                   <div>
//                     <h4 className="font-display text-xl text-white transition-colors duration-300 group-hover:text-copper-300">
//                       {layer.name}
//                     </h4>
//                     <p className="mt-2 max-w-md leading-relaxed text-white/55">
//                       {layer.note}
//                     </p>
//                   </div>
//                 </div>
//               </Reveal>
//             ))}
//           </div>
//           <p className="mt-2 pl-14 text-xs tracking-wide text-white/35">
//             Read from the bottom — that's the order it goes into your floor.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }


import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const layers = [
  {
    name: "Subfloor or slab",
    short: "FOUNDATION",
    note: "Primed and levelled first. Every other layer's performance depends on what this one starts flat.",
  },
  {
    name: "ThermaBase insulation",
    short: "INSULATION",
    note: "Stops heat travelling down into the slab instead of up into the room. Typically halves heat-up time.",
  },
  {
    name: "Heating element",
    short: "HEAT SOURCE",
    note: "Electric mat or cable, or hydronic pipe loops — laid to the room-by-room design from your survey.",
  },
  {
    name: "Levelling compound / screed",
    short: "ENCAPSULATION",
    note: "Encapsulates the element and gives tile or stone a true, even bed to sit on.",
  },
  {
    name: "Finish floor",
    short: "SURFACE",
    note: "Tile, stone, engineered wood — commissioned and temperature-limited to suit whatever you've chosen.",
  },
];

export function FloorAnatomy() {
  return (
    <section className="relative overflow-hidden bg-charcoal-950 py-24 text-white md:py-32">
      {/* =====================================================
          ARCHITECTURAL BACKGROUND
      ===================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(196, 98, 42, 1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(196, 98, 42, 1) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Copper atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[45%] size-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-500/[0.045] blur-[150px]"
      />

      {/* Technical vertical line */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-0 hidden h-full w-px bg-copper-400/[0.08] lg:block"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-0 hidden h-full w-px bg-copper-400/[0.08] lg:block"
      />

      <div className="container-site relative z-10">
        {/* ===================================================
            HEADER
        =================================================== */}

        <Reveal>
          <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-8">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm text-copper-400">
                02
              </span>

              <span className="h-px w-8 bg-copper-400/60" />

              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                What's under the tile
              </span>
            </div>

            <span className="hidden text-[10px] uppercase tracking-[0.22em] text-white/25 md:block">
              Floor construction / Section A
            </span>
          </div>
        </Reveal>

        {/* ===================================================
            EDITORIAL HEADING
        =================================================== */}

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.055em] text-white">
                Anatomy of
                <br />
                <span className="text-copper-400/70">
                  a warm floor.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="flex items-end lg:col-span-5">
            <Reveal>
              <div className="max-w-md border-l border-copper-400/30 pl-6">
                <p className="text-base leading-8 text-white/50 md:text-lg">
                  Five layers, built from the ground up. Every layer has
                  a purpose — together they turn an ordinary floor into
                  a controlled source of radiant warmth.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ===================================================
            FLOOR CUTAWAY
        =================================================== */}

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — VISUAL STACK */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative mx-auto max-w-md lg:sticky lg:top-32">
                {/* vertical measurement rail */}
                <div
                  aria-hidden
                  className="absolute -left-5 top-0 hidden h-full w-px bg-copper-400/20 sm:block"
                />

                {/* rail marker */}
                <div
                  aria-hidden
                  className="absolute -left-[23px] top-0 hidden size-[5px] rounded-full bg-copper-400 sm:block"
                />

                {/* floor stack */}
                <div className="space-y-[3px]">
                  {layers.map((layer, i) => (
                    <div
                      key={layer.name}
                      className="group relative"
                    >
                      {/* Layer */}
                      <div
                        className={[
                          "relative overflow-hidden border transition-all duration-500",
                          i === 2
                            ? "border-copper-400/50 bg-copper-500/[0.14] py-8"
                            : "border-white/10 bg-white/[0.035] py-6",
                        ].join(" ")}
                      >
                        {/* copper sweep */}
                        <div
                          aria-hidden
                          className="absolute inset-y-0 left-0 w-px bg-copper-400/60 transition-all duration-500 group-hover:w-[3px]"
                        />

                        <div className="flex items-center gap-5 px-6">
                          {/* number */}
                          <span
                            className={[
                              "font-display text-sm",
                              i === 2
                                ? "text-copper-300"
                                : "text-white/35",
                            ].join(" ")}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          {/* layer info */}
                          <div className="flex-1">
                            <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-copper-400/60">
                              {layer.short}
                            </p>

                            <p
                              className={[
                                "font-display text-lg",
                                i === 2
                                  ? "text-copper-100"
                                  : "text-white/80",
                              ].join(" ")}
                            >
                              {layer.name}
                            </p>
                          </div>

                          {/* dimension marker */}
                          <span className="hidden text-[9px] tracking-[0.16em] text-white/20 sm:block">
                            LAYER {i + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* bottom technical label */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                    Finished floor
                  </span>

                  <span className="text-[9px] uppercase tracking-[0.2em] text-copper-400/50">
                    ↑ Heat
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — EXPLANATION */}
          <div className="lg:col-span-7">
            <div className="border-t border-white/10">
              {layers.map((layer, i) => (
                <Reveal
                  key={layer.name}
                  delay={i * 0.05}
                >
                  <div className="group grid gap-5 border-b border-white/10 py-8 md:grid-cols-[72px_1fr] md:py-10">
                    {/* number */}
                    <div className="flex items-start">
                      <span className="font-display text-sm text-copper-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* content */}
                    <div>
                      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                        <h3 className="font-display text-2xl tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-copper-300 md:text-3xl">
                          {layer.name}
                        </h3>

                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/25 transition-colors duration-300 group-hover:text-copper-400/60">
                          {layer.short}
                        </span>
                      </div>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-white/45 md:text-base md:leading-8">
                        {layer.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Closing statement */}
            <Reveal>
              <div className="mt-10 flex items-start gap-5">
                <div className="mt-2 size-2 shrink-0 rotate-45 border border-copper-400" />

                <p className="max-w-xl font-display text-lg leading-7 text-copper-100/55 md:text-xl">
                  Read from the bottom — that's the order the floor is
                  built. The result should feel simple. The engineering
                  underneath is anything but.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}