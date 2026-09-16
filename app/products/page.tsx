"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { products, categories, type ProductCategory } from "@/lib/products";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal-950 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-site">
          <Reveal>
            <p className="text-eyebrow text-copper-400 mb-4">Products</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display-xl text-white max-w-3xl">
              Heating systems, precision-engineered.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg text-white/50 mt-6 max-w-xl">
              Every product in our range is designed to deliver invisible warmth
              with zero compromise on architectural integrity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-ivory-100 py-16 md:py-24">
        <div className="container-site">
          {/* Category filter */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActive(cat.value)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                    active === cat.value
                      ? "bg-charcoal-900 text-white"
                      : "bg-ivory-200 text-charcoal-600 hover:bg-ivory-300",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Product grid */}
          <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <RevealItem key={product.slug} className="h-full">
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[var(--shadow-card)] transition-all duration-500 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-eyebrow text-copper-500 mb-2">
                      {product.category}
                    </p>
                    <h2 className="text-heading-lg text-charcoal-900 mb-2">
                      {product.name}
                    </h2>
                    <p className="text-body-sm text-charcoal-500 flex-1">
                      {product.tagline}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-medium tracking-[0.1em] text-copper-500 uppercase">
                      <span>View details</span>
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </div>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
