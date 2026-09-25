

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";

import { products, categories, type ProductCategory } from "@/lib/products";
import { cn } from "@/lib/utils";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const PRODUCT_NUMBERS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
];

export default function ProductsPage() {
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const filtered =
    active === "all"
      ? products
      : products.filter((product) => product.category === active);

  return (
    <main className="overflow-hidden bg-[#f6f2eb] text-charcoal-950">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative isolate min-h-[88svh] overflow-hidden bg-charcoal-950 text-white">
        {/* architectural grid */}
      <div
  aria-hidden
  className="absolute inset-0"
>
  <Image
    src="/product.png"
    alt=""
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
  />

  {/* dark editorial overlay */}
  <div className="absolute inset-0 bg-charcoal-950/55" />

  {/* left-side gradient for typography */}
  <div
    className="absolute inset-0"
    style={{
      background: `
        linear-gradient(
          90deg,
          rgba(17,16,15,0.92) 0%,
          rgba(17,16,15,0.72) 30%,
          rgba(17,16,15,0.30) 62%,
          rgba(17,16,15,0.12) 100%
        )
      `,
    }}
  />

  {/* subtle copper atmosphere */}
  <div className="absolute inset-0 bg-copper-500/[0.035]" />
</div>

        {/* copper atmosphere */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[10%] top-[15%] size-[650px] rounded-full bg-copper-500/[0.08] blur-[160px]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -left-[15%] bottom-[-20%] size-[500px] rounded-full bg-copper-500/[0.045] blur-[140px]"
        />

        {/* architectural vertical guides */}
        <div
          aria-hidden
          className="absolute bottom-0 left-[7.5%] top-0 hidden w-px bg-white/[0.07] md:block"
        />

        <div
          aria-hidden
          className="absolute bottom-0 right-[7.5%] top-0 hidden w-px bg-white/[0.07] md:block"
        />

        <div className="container-site relative flex min-h-[88svh] flex-col justify-between pb-10 pt-32 md:pt-40">
          {/* top metadata */}
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-copper-400">
                05
              </span>

              <span className="h-px w-10 bg-copper-500/60" />

              <span className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">
                Product catalogue
              </span>
            </div>
          </Reveal>

          {/* main heading */}
          <div className="relative mt-20">
            <Reveal delay={0.08}>
              <h1 className="max-w-[1150px] font-display text-[clamp(3.75rem,9vw,10.5rem)] leading-[0.82] tracking-[-0.05em] sm:text-[clamp(4rem,9vw,10.5rem)]">
                Engineered
                <br />
                <span className="text-copper-400/90">beneath.</span>
              </h1>
            </Reveal>

            <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
              <Reveal delay={0.16}>
                <div className="h-px w-20 bg-copper-500" />
              </Reveal>

              <Reveal delay={0.22}>
                <p className="max-w-[520px] text-sm leading-7 text-white/45 md:text-base md:leading-8">
                  Heating systems designed to disappear beneath the
                  architecture — precise, efficient and built around the way
                  each space is used.
                </p>
              </Reveal>
            </div>
          </div>

          {/* bottom information */}
          <Reveal delay={0.3}>
            <div className="mt-20 flex flex-col justify-between gap-6 border-t border-white/[0.10] pt-5 md:flex-row md:items-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">
                Electric / Hydronic / Controls / Insulation
              </span>

              <div className="flex items-center gap-3">
                <ArrowDownRight
                  className="size-4 text-copper-400"
                  strokeWidth={1.25}
                  aria-hidden
                />

                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">
                  Explore the collection
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          CATALOGUE INTRO + FILTER
      ===================================================== */}

      <section className="relative bg-[#f6f2eb] py-24 md:py-32">
        {/* subtle grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(0,0,0,0.8) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "100px 100%",
          }}
        />

        <div className="container-site relative">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            {/* section marker */}
            <Reveal>
              <div className="flex items-start gap-4">
                <span className="font-mono text-[9px] text-copper-600">
                  01
                </span>

                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-copper-500" />

                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-charcoal-950/35">
                      The collection
                    </span>
                  </div>

                  <p className="mt-5 max-w-[190px] text-xs leading-6 text-charcoal-950/40">
                    Systems selected to work quietly beneath exceptional
                    interiors.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* catalogue heading */}
            <Reveal delay={0.1}>
              <div>
                <h2 className="max-w-[900px] font-display text-[clamp(3rem,6vw,7rem)] leading-[0.86] tracking-[-0.04em]">
                  Every layer has
                  <br />
                  <span className="text-copper-500/75">
                    a purpose.
                  </span>
                </h2>

               
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="relative bg-[#f6f2eb] pb-28 md:pb-44">
        <div className="container-site">
          <RevealGroup className="border-t border-charcoal-950/[0.10]">
            {filtered.map((product, index) => {
              const number =
                PRODUCT_NUMBERS[index] ??
                String(index + 1).padStart(2, "0");

              const reverse = index % 2 === 1;

              return (
                <RevealItem key={product.slug}>
                  <article
                    className={cn(
                      "group relative border-b border-charcoal-950/[0.10]",
                      "grid min-h-[650px] items-center gap-12 py-20 md:py-28 lg:min-h-[720px] lg:grid-cols-2 lg:gap-24",
                    )}
                  >
                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <Link
                      href={`/products/${product.slug}`}
                      className={cn(
                        "relative block aspect-[4/3] overflow-hidden bg-[#eae4da]",
                        reverse ? "lg:order-2" : "lg:order-1",
                      )}
                    >
                      {/* image */}
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
                      />

                      {/* image treatment */}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-charcoal-950/20 via-transparent to-transparent opacity-70"
                      />

                      {/* image code */}
                      <div className="absolute left-5 top-5 flex items-center gap-3">
                        <span className="bg-[#f6f2eb] px-3 py-2 font-mono text-[9px] tracking-[0.16em] text-charcoal-950">
                          WT / {number}
                        </span>
                      </div>

                      {/* image arrow */}
                      <div className="absolute bottom-5 right-5 flex size-12 items-center justify-center bg-[#f6f2eb] text-charcoal-950 transition-all duration-500 group-hover:bg-copper-500 group-hover:text-white">
                        <ArrowUpRight
                          className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </div>
                    </Link>

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div
                      className={cn(
                        "relative",
                        reverse ? "lg:order-1" : "lg:order-2",
                      )}
                    >
                      {/* huge background number */}
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute -top-20 select-none font-display text-[clamp(8rem,15vw,14rem)] leading-none tracking-[-0.06em] text-copper-500/[0.055]",
                          reverse ? "right-0" : "left-0",
                        )}
                      >
                        {number}
                      </span>

                      {/* category */}
                      <div className="relative flex items-center gap-4">
                        <span className="font-mono text-[9px] text-copper-600">
                          {number}
                        </span>

                        <span className="h-px w-8 bg-copper-500/60" />

                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-charcoal-950/35">
                          {product.category}
                        </span>
                      </div>

                      {/* product name */}
                      <h3 className="relative mt-8 max-w-[680px] font-display text-[clamp(2.8rem,5vw,6rem)] leading-[0.88] tracking-[-0.04em] text-charcoal-950">
                        {product.name}
                      </h3>

                      {/* tagline */}
                      <p className="relative mt-8 max-w-[500px] text-base leading-8 text-charcoal-950/50 md:text-lg">
                        {product.tagline}
                      </p>

                      {/* specification line */}
                      <div className="relative mt-12 max-w-[520px] border-t border-charcoal-950/[0.10]">
                        <div className="flex items-center justify-between py-5">
                          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-charcoal-950/30">
                            System
                          </span>

                          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-charcoal-950/55">
                            WOWTHERM
                          </span>
                        </div>

                        <div className="flex items-center justify-between border-t border-charcoal-950/[0.08] py-5">
                          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-charcoal-950/30">
                            Application
                          </span>

                          <span className="text-right font-mono text-[9px] uppercase tracking-[0.14em] text-charcoal-950/55">
                            {product.category}
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/products/${product.slug}`}
                        className="group/link relative mt-10 inline-flex items-center gap-5"
                      >
                        <span className="relative font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-charcoal-950/60">
                          View product

                          <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-copper-500 transition-transform duration-500 group-hover/link:scale-x-100" />
                        </span>

                        <span className="flex size-11 items-center justify-center border border-charcoal-950/[0.15] transition-all duration-500 group-hover/link:border-copper-500 group-hover/link:bg-copper-500 group-hover/link:text-white">
                          <ArrowUpRight
                            className="size-4 transition-transform duration-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                            aria-hidden
                          />
                        </span>
                      </Link>
                    </div>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>

          {/* =====================================================
              EMPTY STATE
          ===================================================== */}

          {filtered.length === 0 && (
            <div className="border-b border-charcoal-950/[0.10] py-32 text-center">
              <p className="font-display text-3xl text-charcoal-950/50">
                No products in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          CLOSING
      ===================================================== */}

      <section className="relative overflow-hidden bg-charcoal-950 py-28 text-white md:py-40">
        {/* grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
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
          className="absolute -right-[10%] top-1/2 size-[500px] -translate-y-1/2 rounded-full bg-copper-500/[0.07] blur-[140px]"
        />

        <div className="container-site relative">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <Reveal>
              <div className="flex items-start gap-4">
                <Plus
                  className="size-4 text-copper-400"
                  strokeWidth={1}
                  aria-hidden
                />

                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">
                  Beyond the product
                </span>
              </div>
            </Reveal>

            <div>
              <Reveal delay={0.08}>
                <h2 className="max-w-[1000px] font-display text-[clamp(3rem,6vw,7rem)] leading-[0.86] tracking-[-0.04em]">
                  The right system
                  <br />
                  starts with the
                  <br />
                  <span className="text-copper-400">
                    right space.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-12 flex items-start gap-5">
                  <span className="mt-3 h-px w-14 bg-copper-500" />

                  <p className="max-w-[600px] text-sm leading-7 text-white/40 md:text-base md:leading-8">
                    Products are only one part of the system. Our team can
                    help specify the right heating approach for your floor,
                    room and project.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <Link
                  href="/contact"
                  className="group mt-12 inline-flex items-center gap-5"
                >
                  <span className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/65">
                    Discuss your project
                  </span>

                  <span className="flex size-12 items-center justify-center border border-white/15 transition-all duration-500 group-hover:border-copper-500 group-hover:bg-copper-500">
                    <ArrowUpRight
                      className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}