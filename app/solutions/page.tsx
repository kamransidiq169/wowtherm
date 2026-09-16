"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { solutions } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal-950 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-site">
          <Reveal>
            <p className="text-eyebrow text-copper-400 mb-4">Solutions</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display-xl text-white max-w-3xl">
              Heating designed for every space.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg text-white/50 mt-6 max-w-xl">
              From luxury residences to five-star hotels, our systems adapt to
              the unique demands of every environment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-ivory-100 py-20 md:py-28">
        <div className="container-site space-y-24">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.slug}
              id={solution.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid gap-12 lg:grid-cols-2 lg:items-center"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-eyebrow text-copper-500 mb-4">
                  {solution.subtitle}
                </p>
                <h2 className="text-display-md text-charcoal-900 mb-6">
                  {solution.title}
                </h2>
                <p className="text-body-lg text-charcoal-500 mb-8">
                  {solution.description}
                </p>
                <Button asChild variant="outline">
                  <Link href="/contact">
                    Discuss your project
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-950 py-20 md:py-28">
        <div className="container-site text-center">
          <Reveal>
            <h2 className="text-display-md text-white mb-8">
              Not sure which solution fits?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg text-white/50 mb-8 max-w-lg mx-auto">
              Our team will assess your space and recommend the optimal system
              configuration.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Talk to an Expert
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
