

import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Droplets,
  Headphones,
  Layers,
  LifeBuoy,
  Ruler,
  ShieldCheck,
  SmartphoneNfc,
  Thermometer,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/page-hero";
import { Process } from "@/components/home/process";
import { FloorAnatomy } from "@/components/services/floor-anatomy";
import { SystemComparison } from "@/components/services/system-comparison";
import { ServiceScroller } from "@/components/services/service-scroller";
import { SectionHeading } from "@/components/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Free heat-loss surveys, electric and hydronic system design, installation by our own crews, smart zoning, and 10–25 year aftercare. How ProWarm works.",
};

const services = [
  {
    id: "survey",
    Icon: ClipboardCheck,
    title: "Survey & heat-loss assessment",
    summary: "Free, measured, and the foundation of every honest quote.",
    detail:
      "An engineer visits your site (or works from architect's drawings) and measures what your rooms actually lose: floor build-up, glazing, orientation, insulation. The output is a per-room wattage requirement — the number every other decision hangs on. If underfloor heating isn't right for a space, this is where we say so.",
  },
  {
    id: "electric",
    Icon: Zap,
    title: "Electric system design & installation",
    summary: "Mats, cables and foil for renovations and single rooms.",
    detail:
      "From a 2 m² pooja room to a full apartment, we design the mat and cable layout around your fixed furniture, install over insulation boards, and encapsulate in flexible leveller. Most bathrooms are done in two days including tiling handover. Every circuit is resistance-tested three times and photographed before it disappears.",
  },
  {
    id: "hydronic",
    Icon: Droplets,
    title: "Hydronic system design & installation",
    summary: "Whole-home water-based heating for new builds and retrofits.",
    detail:
      "Screeded systems for new construction, 18 mm low-profile boards for renovations — designed circuit by circuit, pressure-tested before any pour, and balanced at the manifold. We size and commission the heat source too, with heat-pump packages that run radiant floors at their efficiency sweet spot.",
  },
  {
    id: "controls",
    Icon: SmartphoneNfc,
    title: "Smart controls & zoning",
    summary: "SenseWarm thermostats, schedules and whole-home zoning.",
    detail:
      "One warm floor is nice; the right rooms warm at the right hours is transformative for the bill. We zone every project room-by-room, program schedules around your household on commissioning day, and set floor-temperature limits that protect wooden finishes automatically.",
  },
  {
    id: "insulation",
    Icon: Layers,
    title: "Insulation & subfloor preparation",
    summary: "The unglamorous layer that halves your running cost.",
    detail:
      "Priming, levelling and ThermaBase insulation boards — specified for your exact subfloor. On cold concrete slabs this layer typically halves heat-up time and cuts running costs by up to 50%, which is why it appears on every quotation we issue.",
  },
  {
    id: "aftercare",
    Icon: LifeBuoy,
    title: "Warranty & after-sales support",
    summary: "10–25 year warranties, honoured by the people who installed it.",
    detail:
      "Your handover pack includes logged test results, photographs of every cable and pipe run, and registered warranty documents. Support is our own Mumbai engineering team — the same people who designed the system — plus annual health checks for hydronic installations.",
  },
];

export default function ServicesPage() {
  return (
    <>

      <section className="relative isolate min-h-[92svh] overflow-hidden bg-charcoal-950 text-white">
  {/* =========================================================
      BACKGROUND IMAGE
  ========================================================= */}
  <div className="absolute inset-0">
    <img
      src="/service.png"
      alt="Installers preparing a floor for underfloor heating installation"
      className="absolute inset-0 h-full w-full object-cover object-center"
    />

    {/* Deep editorial overlay */}
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background: `
          linear-gradient(
            90deg,
            rgba(17,16,15,0.96) 0%,
            rgba(17,16,15,0.86) 22%,
            rgba(17,16,15,0.48) 48%,
            rgba(17,16,15,0.12) 72%,
            rgba(17,16,15,0.30) 100%
          ),
          linear-gradient(
            0deg,
            rgba(17,16,15,0.88) 0%,
            rgba(17,16,15,0.10) 42%,
            rgba(17,16,15,0.35) 100%
          )
        `,
      }}
    />

    {/* Soft copper atmosphere */}
    <div
      aria-hidden
      className="absolute left-[28%] top-[45%] size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper-500/[0.055] blur-[150px]"
    />
  </div>

  {/* =========================================================
      ARCHITECTURAL GRID
  ========================================================= */}
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-[0.045]"
    style={{
      backgroundImage: `
        linear-gradient(
          to right,
          rgba(255,255,255,1) 1px,
          transparent 1px
        ),
        linear-gradient(
          to bottom,
          rgba(255,255,255,1) 1px,
          transparent 1px
        )
      `,
      backgroundSize: "120px 120px",
    }}
  />

  {/* =========================================================
      MAIN CONTAINER
  ========================================================= */}
  <div className="container-site relative z-10 flex min-h-[92svh] flex-col justify-between py-8 md:py-10">
    {/* =======================================================
        TOP BAR
    ======================================================= */}
    <div className="flex items-center justify-between border-b border-white/10 pb-5">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-copper-400" />

       
      </div>

     
    </div>

    {/* =======================================================
        HERO CONTENT
    ======================================================= */}
    <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8">
      {/* LEFT — EDITORIAL COPY */}
      <div className="lg:col-span-8 xl:col-span-7">
        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-sm text-copper-400">
            01
          </span>

          <span className="h-px w-10 bg-copper-400/70" />

          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-copper-100/60">
            Services
          </span>
        </div>

        {/* Main heading */}
        <h1 className="max-w-5xl font-display text-[clamp(4rem,9vw,9.5rem)] leading-[0.84] tracking-[-0.04em] text-white">
          Designed,
          <br />
          installed,
          <br />
          <span className="text-copper-400">
            answered for.
          </span>
        </h1>

        {/* Rule */}
        <div className="mt-10 flex items-center gap-4">
          <span className="h-px w-20 bg-copper-400/80" />

          <span className="size-1.5 rotate-45 border border-copper-400/80" />

          <span className="h-px w-8 bg-white/20" />
        </div>

        {/* Lead */}
        <p className="mt-8 max-w-xl text-base leading-8 text-white/60 md:text-lg md:leading-9">
          We don't sell boxes of heating mat. We deliver warm floors —
          surveyed, engineered, installed by our own crews and supported
          for decades.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="group">
            <Link href="/contact">
              Book a Site Survey
              <ArrowRight
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline-light"
            className="group border-white/20 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.08]"
          >
            <Link href="/projects">
              Explore Our Work
              <ArrowRight
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Button>
        </div>
      </div>

      {/* RIGHT — TECHNICAL MARKER */}
      <div className="hidden lg:col-span-4 lg:flex lg:justify-end">
        <div className="relative w-[250px]">
          {/* vertical line */}
          <div className="absolute -left-6 top-0 h-full w-px bg-white/10" />

        

          
        </div>
      </div>
    </div>

    {/* =======================================================
        BOTTOM FEATURE STRIP
    ======================================================= */}
    <div className="border-t border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {[
          {
            icon: Ruler,
            title: "Engineered for Performance",
          },
          {
            icon: ShieldCheck,
            title: "Installed by Experts",
          },
          {
            icon: Thermometer,
            title: "Built for Indian Homes",
          },
          {
            icon: Headphones,
            title: "Backed by Support",
          },
        ].map(({ icon: Icon, title }, index) => (
          <div
            key={title}
            className={[
              "group flex items-center gap-4 py-5",
              index !== 0 ? "border-l border-white/10 pl-5 md:pl-6" : "",
              index >= 2 ? "border-t border-white/10 md:border-t-0" : "",
            ].join(" ")}
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-copper-400/30 text-copper-400 transition-colors duration-300 group-hover:border-copper-400/70">
              <Icon
                className="size-4"
                strokeWidth={1.5}
                aria-hidden
              />
            </div>

            <span className="max-w-[150px] text-[10px] font-medium uppercase leading-4 tracking-[0.12em] text-white/45 transition-colors duration-300 group-hover:text-white/80">
              {title}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* =========================================================
      CORNER DETAILS
  ========================================================= */}
  <div
    aria-hidden
    className="absolute bottom-6 right-6 hidden size-20 border-b border-r border-copper-400/25 md:block"
  />

  <div
    aria-hidden
    className="absolute left-6 top-1/2 hidden h-20 w-px bg-copper-400/30 md:block"
  />
</section>

      {/* 1. Ground it — what's physically under the tile */}
      <FloorAnatomy />

      {/* 2. Help them decide — electric or hydronic */}
      <SystemComparison />

      {/* 3. What we do, end to end */}
      <section className="container-site py-24 md:py-32">
        <SectionHeading
          eyebrow="What we do"
          title="Six services, one warm outcome"
          lead="Expand any service for the detail — or skip straight to booking a survey and we'll walk you through it in person."
        />
        <ServiceScroller
          services={services.map(({ id, Icon, title, summary }) => ({
            id,
            title,
            summary,
            icon: <Icon className="size-7" aria-hidden />,
          }))}
          className="mt-14"
        />
      </section>

      

      {/* 5. How we run the job */}
      <Process />

      <FinalCta />
    </>
  );
}