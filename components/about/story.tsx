"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";

/**
 * Story section — asymmetric editorial image grid with parallax.
 *
 * Placeholder images in public/images/about/ — replace with real WowTherm photos.
 * All copy below is placeholder — flagged with [PLACEHOLDER].
 */

const STORY_IMAGES = [
  {
    src: "/images/about/story-1.jpg",
    alt: "[PLACEHOLDER — Replace with real WowTherm photo]",
    caption: "[PLACEHOLDER — Photo caption]",
  },
  {
    src: "/images/about/story-2.jpg",
    alt: "[PLACEHOLDER — Replace with real WowTherm photo]",
    caption: "[PLACEHOLDER — Photo caption]",
  },
  {
    src: "/images/about/story-3.jpg",
    alt: "[PLACEHOLDER — Replace with real WowTherm photo]",
    caption: "[PLACEHOLDER — Photo caption]",
  },
  {
    src: "/images/about/story-4.jpg",
    alt: "[PLACEHOLDER — Replace with real WowTherm photo]",
    caption: "[PLACEHOLDER — Photo caption]",
  },
];

export function Story() {
  return (
    <section className="bg-ivory-100 py-24 md:py-32 lg:py-40">
      <div className="container-site">
        {/* Editorial header */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 mb-20 md:mb-28">
          <Reveal>
            <div>
              <p className="text-eyebrow text-copper-500 mb-6">Our Story</p>
              <h2 className="text-display-md text-charcoal-900 mb-6">
                We believe heating should be felt, never seen.
              </h2>
              <div className="space-y-4">
                <p className="text-body-lg text-charcoal-600">
                  {/* [PLACEHOLDER — replace with WowTherm's actual founding story] */}
                  In [YEAR], we noticed a gap: premium underfloor heating was
                  available, but the expertise to design and install it properly
                  wasn&apos;t.
                </p>
                <p className="text-body-lg text-charcoal-600">
                  We started with a single installation and built our reputation
                  on precision engineering, honest communication, and systems
                  that perform exactly as promised.
                </p>
                <p className="text-body-lg text-charcoal-600">
                  Today, we&apos;ve completed [NUMBER] installations — from mountain
                  chalets to city penthouses, from boutique hotels to corporate
                  headquarters.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="text-eyebrow text-copper-500 mb-6">Philosophy</p>
              <h2 className="text-heading-xl text-charcoal-900 mb-6">
                Technology you don&apos;t see. Comfort you always feel.
              </h2>
              <div className="space-y-4">
                <p className="text-body-lg text-charcoal-600">
                  Every system we design is invisible. No radiators, no vents,
                  no visible hardware. Just warmth that fills the room from
                  below, exactly as architecture intended.
                </p>
                <p className="text-body-lg text-charcoal-600">
                  We don&apos;t believe in compromise. Every project receives the
                  same rigorous engineering, the same attention to detail, and
                  the same commitment to excellence.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Asymmetric image grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Image 1 — large, left, with parallax */}
          <Reveal className="col-span-12 md:col-span-7">
            <Parallax amount={30}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={STORY_IMAGES[0].src}
                  alt={STORY_IMAGES[0].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <p className="text-caption text-charcoal-400 mt-3">
                {STORY_IMAGES[0].caption}
              </p>
            </Parallax>
          </Reveal>

          {/* Image 2 — small, right */}
          <Reveal delay={0.1} className="col-span-12 md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm md:mt-16">
              <Image
                src={STORY_IMAGES[1].src}
                alt={STORY_IMAGES[1].alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="text-caption text-charcoal-400 mt-3">
              {STORY_IMAGES[1].caption}
            </p>
          </Reveal>

          {/* Image 3 — small, left */}
          <Reveal className="col-span-12 md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Image
                src={STORY_IMAGES[2].src}
                alt={STORY_IMAGES[2].alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <p className="text-caption text-charcoal-400 mt-3">
              {STORY_IMAGES[2].caption}
            </p>
          </Reveal>

          {/* Image 4 — large, right, with parallax */}
          <Reveal delay={0.1} className="col-span-12 md:col-span-7">
            <Parallax amount={25}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm md:mt-16">
                <Image
                  src={STORY_IMAGES[3].src}
                  alt={STORY_IMAGES[3].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <p className="text-caption text-charcoal-400 mt-3">
                {STORY_IMAGES[3].caption}
              </p>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
