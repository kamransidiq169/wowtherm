import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";

import { ProductShowcase } from "@/components/home/product-showcase";

import { Benefits } from "@/components/home/benefits";

import { Projects } from "@/components/home/projects";
import { Process } from "@/components/home/process";
import { Testimonials } from "@/components/home/testimonials";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Premium Heating Technology — Comfort, engineered into every surface",
  description:
    "WowTherm designs and installs premium heating systems for modern homes, hospitality spaces and architectural interiors. Invisible warmth, precise control.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <div id="next">
        <Projects />
        <Benefits />
        <ProductShowcase />
        
        <Process />
        <Testimonials />
        <FinalCta />
      </div>
    </>
  );
}
