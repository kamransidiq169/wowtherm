// import { Reveal } from "@/components/motion/reveal";
// import { SectionHeading } from "@/components/section-heading";

// const columns = [
//   {
//     name: "Electric",
//     rows: [
//       { label: "Best for", value: "Single rooms, renovations, bathrooms & kitchens" },
//       { label: "Heat-up time", value: "15–30 minutes to temperature" },
//       { label: "Install disruption", value: "Low — no boiler or manifold work" },
//       { label: "Warranty", value: "10 years" },
//     ],
//   },
//   {
//     name: "Hydronic",
//     rows: [
//       { label: "Best for", value: "Whole-home, new builds, large open-plan areas" },
//       { label: "Heat-up time", value: "1–2 hours, holds heat far longer" },
//       { label: "Install disruption", value: "Higher — manifold and heat-source sizing" },
//       { label: "Warranty", value: "25 years on pipework" },
//     ],
//   },
// ];

// /**
//  * Two columns, one dividing rule down the centre — read as a spec sheet
//  * someone's actually deciding between, not a pair of marketing cards.
//  */
// export function SystemComparison() {
//   return (
//     <section className="bg-cream-50 py-24 md:py-32">
//       <div className="container-site">
//         <SectionHeading
//           eyebrow="Choosing a system"
//           title="Electric, or hydronic?"
//           lead="Both outperform any surface heater. The right one depends on how much of the home you're heating, and how it's built."
//         />

//         <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-charcoal-900/10">
//           {columns.map((col, ci) => (
//             <Reveal key={col.name} delay={ci * 0.08}>
//               <div className={ci === 0 ? "md:pr-14" : "md:pl-14"}>
//                 <h3 className="font-display text-2xl text-charcoal-900">
//                   {col.name}
//                 </h3>
//                 <dl className="mt-8 space-y-6">
//                   {col.rows.map((row) => (
//                     <div key={row.label} className="border-t border-charcoal-900/10 pt-4">
//                       <dt className="text-sm text-charcoal-400">{row.label}</dt>
//                       <dd className="mt-1.5 text-charcoal-800">{row.value}</dd>
//                     </div>
//                   ))}
//                 </dl>
//               </div>
//             </Reveal>
//           ))}
//         </div>

//         <p className="mt-14 max-w-md text-charcoal-500">
//           Not sure yet? That's exactly what the free survey settles —
//           no guessing, no upsell either way.
//         </p>
//       </div>
//     </section>
//   );
// }


import { Reveal } from "@/components/motion/reveal";

const columns = [
  {
    number: "01",
    name: "Electric",
    descriptor: "Precise warmth, where you need it.",
    rows: [
      {
        label: "Best for",
        value: "Single rooms, renovations, bathrooms & kitchens",
      },
      {
        label: "Heat-up time",
        value: "15–30 minutes to temperature",
      },
      {
        label: "Install disruption",
        value: "Low — no boiler or manifold work",
      },
      {
        label: "Warranty",
        value: "10 years",
      },
    ],
  },
  {
    number: "02",
    name: "Hydronic",
    descriptor: "Whole-home warmth, built into the system.",
    rows: [
      {
        label: "Best for",
        value: "Whole-home, new builds, large open-plan areas",
      },
      {
        label: "Heat-up time",
        value: "1–2 hours, holds heat far longer",
      },
      {
        label: "Install disruption",
        value: "Higher — manifold and heat-source sizing",
      },
      {
        label: "Warranty",
        value: "25 years on pipework",
      },
    ],
  },
];

export function SystemComparison() {
  return (
    <section className="relative overflow-hidden bg-cream-50 py-24 md:py-32">
      {/* =====================================================
          ARCHITECTURAL GRID
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

      {/* Subtle central atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-500/[0.035] blur-[140px]"
      />

      <div className="container-site relative z-10">
        {/* ===================================================
            SECTION INTRO
        =================================================== */}

        <Reveal>
          <div className="mb-16 flex items-end justify-between border-b border-charcoal-900/10 pb-8">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm text-copper-500">
                03
              </span>

              <span className="h-px w-8 bg-copper-500/60" />

              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-charcoal-900/45">
                Choosing a system
              </span>
            </div>

            <span className="hidden text-[10px] uppercase tracking-[0.22em] text-charcoal-900/30 md:block">
              Technical comparison / 01—02
            </span>
          </div>
        </Reveal>

        {/* ===================================================
            HERO HEADING
        =================================================== */}

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="font-display text-[clamp(3.2rem,7vw,7.5rem)] font-medium leading-[0.86] tracking-[-0.06em] text-charcoal-950">
                Electric,
                <br />
                <span className="text-copper-500/65">
                  or hydronic?
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="flex items-end lg:col-span-4">
            <Reveal>
              <div className="max-w-sm border-l border-copper-500/30 pl-6">
                <p className="text-base leading-8 text-charcoal-900/55 md:text-lg">
                  Both deliver radiant warmth from below. The right
                  system depends on the size of the space, the building
                  and how you plan to use it.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ===================================================
            COMPARISON
        =================================================== */}

        <div className="relative mt-20">
          {/* Centre axis */}
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-charcoal-900/10 md:block"
          />

          {/* centre marker */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-copper-500/60 bg-cream-50 md:block"
          />

          <div className="grid md:grid-cols-2">
            {columns.map((column, ci) => (
              <Reveal
                key={column.name}
                delay={ci * 0.08}
              >
                <article
                  className={[
                    "group relative",
                    ci === 0
                      ? "md:pr-16 lg:pr-20"
                      : "mt-16 md:mt-0 md:pl-16 lg:pl-20",
                  ].join(" ")}
                >
                  {/* =================================================
                      SYSTEM HEADER
                  ================================================= */}

                  <div className="relative border-t border-charcoal-900/15 pt-7">
                    {/* copper active line */}
                    <div
                      aria-hidden
                      className="absolute left-0 top-[-1px] h-px w-16 bg-copper-500 transition-all duration-500 group-hover:w-28"
                    />

                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="mb-4 flex items-center gap-3">
                          <span className="font-display text-sm text-copper-500">
                            {column.number}
                          </span>

                          <span className="h-px w-6 bg-copper-500/30" />

                          <span className="text-[9px] uppercase tracking-[0.22em] text-charcoal-900/35">
                            Heating system
                          </span>
                        </div>

                        <h3 className="font-display text-[clamp(2.4rem,4vw,4.5rem)] font-medium leading-none tracking-[-0.045em] text-charcoal-950">
                          {column.name}
                        </h3>

                        <p className="mt-4 max-w-xs font-display text-base leading-6 text-copper-600/65">
                          {column.descriptor}
                        </p>
                      </div>

                      {/* technical circle */}
                      <div className="hidden size-14 shrink-0 items-center justify-center rounded-full border border-charcoal-900/10 sm:flex">
                        <span className="text-[9px] uppercase tracking-[0.15em] text-charcoal-900/35">
                          {column.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      SPECIFICATION ROWS
                  ================================================= */}

                  <dl className="mt-10">
                    {column.rows.map((row, rowIndex) => (
                      <div
                        key={row.label}
                        className="group/row grid gap-3 border-t border-charcoal-900/10 py-6 sm:grid-cols-[130px_1fr]"
                      >
                        {/* label */}
                        <dt className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal-900/35">
                          {row.label}
                        </dt>

                        {/* value */}
                        <dd className="max-w-md text-sm leading-6 text-charcoal-900/70 transition-colors duration-300 group-hover/row:text-charcoal-950 md:text-[15px]">
                          {row.value}
                        </dd>

                        {/* row marker */}
                        <div
                          aria-hidden
                          className="absolute"
                        />
                      </div>
                    ))}
                  </dl>

                  {/* Bottom system marker */}
                  <div className="mt-2 flex items-center justify-between border-t border-charcoal-900/10 pt-5">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal-900/25">
                      Specification {column.number}
                    </span>

                    <span className="size-1.5 rotate-45 bg-copper-500/50 transition-transform duration-300 group-hover:rotate-90" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ===================================================
            DECISION NOTE
        =================================================== */}

        <Reveal>
          <div className="mt-20 border-t border-charcoal-900/10 pt-8 md:mt-24">
            <div className="grid gap-8 md:grid-cols-12 md:items-start">
              <div className="md:col-span-3">
                <div className="flex items-center gap-3">
                  <span className="size-2 rotate-45 border border-copper-500" />

                  <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-copper-600">
                    Need a decision?
                  </span>
                </div>
              </div>

              <div className="md:col-span-7">
                <p className="font-display text-xl leading-8 tracking-[-0.015em] text-charcoal-900/70 md:text-2xl">
                  Not sure which system belongs in your home? That's
                  exactly what the free survey settles — no guessing,
                  and no upsell either way.
                </p>
              </div>

              <div className="hidden justify-end md:col-span-2 md:flex">
                <span className="font-display text-[10px] uppercase tracking-[0.18em] text-charcoal-900/25">
                  Measure first
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}