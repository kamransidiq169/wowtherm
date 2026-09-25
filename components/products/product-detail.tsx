
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { Product } from "@/lib/products";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductDetail({ product }: { product: Product }) {
  const { scrollYProgress } = useScroll();

  const heroImageY = useTransform(scrollYProgress, [0, 0.18], [0, 90]);
  const heroImageScale = useTransform(
    scrollYProgress,
    [0, 0.18],
    [1.04, 1],
  );

  return (
    <main className="overflow-hidden bg-ivory-100">
      {/* ================================================================
          HERO
      ================================================================= */}
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

        {/* Copper atmosphere */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/4 size-[520px] rounded-full bg-copper-500/[0.07] blur-[150px]"
        />

        <div className="container-site relative z-10 flex min-h-[92svh] flex-col">
          {/* Top technical bar */}
          <div className="flex items-center justify-between border-b border-white/10 py-5">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
              WOWTHERM
            </span>

            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-copper-400">
              Product / {product.category}
            </span>
          </div>

          <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:py-20">
            {/* Left editorial content */}
            <div className="relative z-20 max-w-2xl">
              <Reveal>
                <div className="mb-7 flex items-center gap-3">
                  <span className="h-px w-10 bg-copper-400" />
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-copper-400">
                    {product.category}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="max-w-3xl font-display text-[clamp(3.4rem,7vw,7.5rem)] leading-[0.88] tracking-[-0.04em] text-white">
                  {product.name}
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-8 h-px w-20 bg-copper-400/70" />
              </Reveal>

              <Reveal delay={0.22}>
                <p className="mt-7 max-w-lg text-[1.05rem] leading-8 text-white/55 md:text-[1.15rem]">
                  {product.tagline}
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <Link
                  href="/contact"
                  className="group mt-10 inline-flex items-center gap-3 border-b border-copper-400/50 pb-3 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-copper-400"
                >
                  Discuss this system
                  <ArrowUpRight
                    className="size-4 text-copper-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            </div>

            {/* Hero product image */}
            <motion.div
              style={{
                y: heroImageY,
                scale: heroImageScale,
              }}
              className="relative z-10 lg:-mr-[8vw]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
                <Image
                  src={product.gallery[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                />

                {/* Image treatment */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-tr from-charcoal-950/35 via-transparent to-white/[0.05]"
                />

                {/* Technical corner */}
                <div className="absolute left-5 top-5 border-l border-t border-copper-400/60 p-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/60">
                    Engineered warmth
                  </span>
                </div>

                <div className="absolute bottom-5 right-5 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-copper-400" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/60">
                    Product / 01
                  </span>
                </div>
              </div>

              {/* Offset architectural frame */}
              <div
                aria-hidden
                className="absolute -bottom-5 -left-5 -z-10 size-28 border-b border-l border-copper-400/35"
              />
            </motion.div>
          </div>

          {/* Bottom metadata */}
          <div className="grid grid-cols-2 border-t border-white/10 py-5 md:grid-cols-4">
            {[
              ["01", "Product category", product.category],
              ["02", "Product range", "WOWTHERM"],
              ["03", "Application", "Underfloor heating"],
              ["04", "Enquiry", "Project specific"],
            ].map(([number, label, value]) => (
              <div
                key={number}
                className="border-white/10 py-3 first:border-0 md:border-l md:px-6 md:first:border-l"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">
                  {number} / {label}
                </p>
                <p className="mt-2 text-xs text-white/65">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          INTRO / OVERVIEW
      ================================================================= */}
      <section className="relative bg-ivory-100 py-24 md:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-px bg-copper-500/10"
        />

        <div className="container-site">
          <div className="grid gap-16 lg:grid-cols-[0.55fr_1.45fr]">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-copper-500" />
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-copper-600">
                    01 / Overview
                  </span>
                </div>

                <p className="mt-8 max-w-[180px] text-sm leading-6 text-charcoal-400">
                  Designed to disappear beneath the architecture while making
                  the comfort impossible to miss.
                </p>
              </div>
            </Reveal>

            <div className="max-w-5xl">
              {product.description.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <p
                    className={
                      index === 0
                        ? "font-display text-[clamp(2rem,4vw,4rem)] leading-[1.08] tracking-[-0.025em] text-charcoal-900"
                        : "mt-8 max-w-3xl text-[1rem] leading-8 text-charcoal-500 md:text-[1.1rem]"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          GALLERY
      ================================================================= */}
      {product.gallery.length > 1 && (
        <section className="bg-charcoal-950 py-6 md:py-10">
          <div className="container-site">
            <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-copper-400">
                  02 / In detail
                </p>
                <h2 className="mt-3 font-display text-3xl tracking-[-0.03em] text-white md:text-5xl">
                  Built beneath the surface.
                </h2>
              </div>

              <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/25 md:block">
                Visual study
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-12">
              {product.gallery.slice(1).map((src, index) => {
                const isLarge = index === 0;

                return (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.75,
                      ease: EASE,
                    }}
                    className={`group relative overflow-hidden ${
                      isLarge
                        ? "aspect-[16/10] md:col-span-8"
                        : "aspect-[16/10] md:col-span-4"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} — detail ${index + 2}`}
                      fill
                      sizes={
                        isLarge
                          ? "(max-width: 768px) 100vw, 66vw"
                          : "(max-width: 768px) 100vw, 33vw"
                      }
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/45 via-transparent to-transparent opacity-60" />

                    <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.12em] text-white/60">
                      Detail / 0{index + 2}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================
          FEATURES
      ================================================================= */}
      <section className="relative overflow-hidden bg-ivory-100 py-24 md:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-copper-500/[0.08]"
        />

        <div className="container-site">
          <div className="grid gap-16 lg:grid-cols-[0.65fr_1.35fr]">
            <Reveal>
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-copper-500" />
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-copper-600">
                    03 / Why it matters
                  </span>
                </div>

                <h2 className="mt-7 max-w-md font-display text-[clamp(2.8rem,5vw,5rem)] leading-[0.95] tracking-[-0.03em] text-charcoal-950">
                  Details that make the difference.
                </h2>
              </div>
            </Reveal>

            <div className="border-t border-charcoal-900/15">
              {product.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: index * 0.06,
                    duration: 0.6,
                    ease: EASE,
                  }}
                  className="group grid grid-cols-[60px_1fr_auto] items-center gap-5 border-b border-charcoal-900/15 py-7 md:grid-cols-[80px_1fr_auto] md:py-9"
                >
                  <span className="font-display text-2xl text-copper-500/70 md:text-3xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="max-w-2xl text-[1rem] leading-7 text-charcoal-700 md:text-[1.1rem]">
                    {feature}
                  </p>

                  <span className="flex size-9 items-center justify-center rounded-full border border-charcoal-900/10 transition-all duration-300 group-hover:border-copper-500 group-hover:bg-copper-500 group-hover:text-white">
                    <Check
                      className="size-4 text-copper-500 transition-colors group-hover:text-white"
                      aria-hidden
                    />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SPECIFICATIONS
      ================================================================= */}
      <section className="bg-white py-24 md:py-36">
        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-[0.6fr_1.4fr]">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-copper-500" />
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-copper-600">
                    04 / Specifications
                  </span>
                </div>

                <h2 className="mt-7 font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-charcoal-950">
                  The technical side of warmth.
                </h2>
              </div>
            </Reveal>

            <div className="border-t border-charcoal-900/15">
              {product.specifications.map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.5,
                    ease: EASE,
                  }}
                  className="grid gap-2 border-b border-charcoal-900/15 py-6 md:grid-cols-[0.75fr_1.25fr] md:py-7"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-medium tracking-[0.18em] text-copper-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm uppercase tracking-[0.08em] text-charcoal-400">
                      {spec.label}
                    </span>
                  </div>

                  <span className="text-[1rem] font-medium text-charcoal-900 md:text-right">
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
      ================================================================= */}
      <section className="relative isolate overflow-hidden bg-charcoal-950 py-28 text-white md:py-40">
        {/* Grid */}
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
              05 / Start a conversation
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-7 max-w-4xl font-display text-[clamp(3rem,7vw,7rem)] leading-[0.9] tracking-[-0.04em] text-white">
              Warmth starts
              <br />
              <span className="text-copper-400">with the right system.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-8 max-w-xl text-base leading-7 text-white/45 md:text-lg">
              Tell us about your space. We&apos;ll help you understand the
              system, the installation and what it takes to make the warmth
              work beautifully.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center gap-4 bg-copper-500 px-7 text-xs font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-copper-400"
              >
                Start a Project
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>

              <Link
                href="/products"
                className="inline-flex h-14 items-center border border-white/15 px-7 text-xs font-medium uppercase tracking-[0.16em] text-white/75 transition-all duration-300 hover:border-copper-400/60 hover:text-white"
              >
                View All Products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}