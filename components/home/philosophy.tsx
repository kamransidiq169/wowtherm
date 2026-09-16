"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Philosophy() {
  return (
    <section className="bg-ivory-100 py-24 md:py-32 lg:py-40">
      <div className="container-site">
        <Reveal>
          <p className="text-eyebrow text-copper-500 mb-6">Our Philosophy</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display-lg text-charcoal-900 max-w-4xl">
            Warmth should never compromise the architecture.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 max-w-2xl">
            <p className="text-body-lg text-charcoal-500 leading-relaxed">
              WowTherm creates discreet heating systems that disappear into the
              architecture while delivering precise, comfortable heat. Every system
              is designed to be invisible — felt, never seen.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "3mm", label: "Ultra-thin heating elements" },
              { value: "0dB", label: "Silent operation" },
              { value: "±0.5°C", label: "Precision temperature control" },
              { value: "∞", label: "Architectural integration" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: EASE }}
                className="border-t border-charcoal-200 pt-6"
              >
                <p className="font-display text-3xl text-charcoal-900 md:text-4xl">
                  {stat.value}
                </p>
                <p className="text-body-sm text-charcoal-400 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
