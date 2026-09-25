


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const active = testimonials[current];

  return (
    <section className="bg-[#F4F1EA] py-24 md:py-32 lg:py-40">
      <div className="container-site">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say"
        />

        <div className="mt-16 grid gap-x-16 gap-y-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          {/* Quote side — one large, editorial pull-quote */}
          <div className="relative min-h-[260px] md:min-h-[220px]">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-6 select-none font-display text-[7rem] leading-none text-copper-500/15 md:text-[9rem]"
            >
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative"
              >
                <p className="font-display text-2xl leading-snug text-charcoal-900 md:text-3xl lg:text-4xl">
                  {active.quote}
                </p>

                <footer className="mt-8 flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-charcoal-900 text-xs font-medium tracking-wide text-white">
                    {initials(active.name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-charcoal-900">
                        {active.name}
                      </p>
                      <BadgeCheck
                        className="size-4 text-copper-500"
                        aria-label="Verified client"
                      />
                    </div>
                    <p className="text-sm text-charcoal-400">
                      {active.role} · {active.project}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Reviewer picker — who's talking, not just "1 of 5" */}
          <div className="flex flex-col border-t border-charcoal-900/10 lg:border-l lg:border-t-0 lg:pl-10">
            {testimonials.map((t, i) => {
              const isActive = i === current;
              return (
                <button
                  key={t.name}
                  onClick={() => setCurrent(i)}
                  className={`group flex items-center gap-3 border-b border-charcoal-900/10 py-4 text-left transition-colors first:pt-0 last:border-b-0 ${
                    isActive ? "" : "opacity-60 hover:opacity-100"
                  }`}
                  aria-current={isActive}
                >
                  <span
                    className={`h-8 w-0.5 shrink-0 rounded-full transition-colors duration-300 ${
                      isActive ? "bg-copper-500" : "bg-transparent"
                    }`}
                    aria-hidden
                  />
                  <div>
                    <p
                      className={`text-sm font-medium transition-colors ${
                        isActive ? "text-charcoal-900" : "text-charcoal-600"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-charcoal-400">{t.role}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
