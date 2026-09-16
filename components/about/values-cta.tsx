"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

/**
 * Values grid + closing CTA banner.
 *
 * All content is placeholder — flagged with [PLACEHOLDER].
 */

const VALUES = [
  {
    title: "Precision",
    description:
      "Every system is designed with heat-loss calculations, CAD layouts, and material specifications — not guesswork.",
  },
  {
    title: "Integrity",
    description:
      "We recommend what your space actually needs, not what maximizes our invoice. Honest engineering, always.",
  },
  {
    title: "Longevity",
    description:
      "We build for decades. Premium materials, rigorous warranties, and systems that improve with age.",
  },
  {
    title: "Invisibility",
    description:
      "The best heating system is one you never see. Our entire philosophy is built around disappearing into architecture.",
  },
];

export function ValuesCta() {
  return (
    <>
      {/* Values */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-site">
          <Reveal className="mb-16 md:mb-20">
            <p className="text-eyebrow text-copper-500 mb-4">Values</p>
            <h2 className="text-display-md text-charcoal-900 max-w-2xl">
              What drives every decision.
            </h2>
          </Reveal>

          <RevealGroup
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            stagger={0.08}
          >
            {VALUES.map((value) => (
              <RevealItem key={value.title}>
                <div className="border-t border-charcoal-100 pt-8">
                  <h3 className="text-heading-lg text-charcoal-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-body-md text-charcoal-500">
                    {value.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-charcoal-950 py-24 md:py-32">
        <div className="container-site text-center">
          <Reveal>
            <h2 className="text-display-md text-white mb-6">
              {/* [PLACEHOLDER — replace with WowTherm's actual CTA copy] */}
              Ready to work with us?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg text-white/40 max-w-lg mx-auto mb-10">
              Whether it&apos;s a single room or an entire building, we&apos;d
              love to hear about your project.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Start a Project
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
