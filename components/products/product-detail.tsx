"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProductDetail({ product }: { product: Product }) {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal-950 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-site">
          <Reveal>
            <p className="text-eyebrow text-copper-400 mb-4">
              {product.category}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display-xl text-white max-w-3xl">
              {product.name}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg text-white/50 mt-6 max-w-xl">
              {product.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Image gallery */}
      <section className="bg-charcoal-950 pb-20">
        <div className="container-site">
          <div className="grid gap-4 md:grid-cols-2">
            {product.gallery.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]"
              >
                <Image
                  src={src}
                  alt={`${product.name} — image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description + Features */}
      <section className="bg-ivory-100 py-20 md:py-28">
        <div className="container-site grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-eyebrow text-copper-500 mb-6">Overview</p>
              {product.description.map((para, i) => (
                <p key={i} className="text-body-lg text-charcoal-600 mb-4">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="text-eyebrow text-copper-500 mb-6">Key Features</p>
              <ul className="space-y-4">
                {product.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + i * 0.05,
                      duration: 0.5,
                      ease: EASE,
                    }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-copper-500/10 text-copper-500">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <span className="text-body-md text-charcoal-700">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-site max-w-3xl">
          <Reveal>
            <p className="text-eyebrow text-copper-500 mb-6">Specifications</p>
          </Reveal>

          <div className="divide-y divide-charcoal-100">
            {product.specifications.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                className="flex items-baseline justify-between gap-4 py-4"
              >
                <span className="text-body-sm text-charcoal-500">
                  {spec.label}
                </span>
                <span className="text-body-md font-medium text-charcoal-900 text-right">
                  {spec.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-950 py-20 md:py-28">
        <div className="container-site text-center">
          <Reveal>
            <h2 className="text-display-md text-white mb-8">
              Ready to warm your space?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">
                  Start a Project
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline-light">
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
