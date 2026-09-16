"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const projects = [
  {
    slug: "luxury-residence-srinagar",
    title: "Luxury Residence",
    location: "Srinagar, Kashmir",
    type: "Residential",
    solution: "AquaBoard Low-Profile",
    year: "2024",
    area: "4,200 sq ft",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
    description:
      "A heritage home renovation in the heart of Srinagar, where underfloor heating replaced traditional kanger-based heating. AquaBoard low-profile system installed under engineered oak throughout three floors.",
  },
  {
    slug: "boutique-hotel-manali",
    title: "Cedar House Hotel",
    location: "Manali, Himachal Pradesh",
    type: "Hospitality",
    solution: "AquaFlow Screed System",
    year: "2023",
    area: "12,000 sq ft",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
    description:
      "A 22-room boutique hotel with full hydronic underfloor heating. Each room independently controlled via smart thermostats, delivering consistent warmth across multiple floor levels.",
  },
  {
    slug: "penthouse-mumbai",
    title: "Penthouse Residence",
    location: "Mumbai, Maharashtra",
    type: "Residential",
    solution: "StickyMat 200W + SenseWarm Pro",
    year: "2024",
    area: "3,800 sq ft",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
    description:
      "A penthouse renovation in Lower Parel featuring electric underfloor heating in all living spaces and bathrooms. Smart home integration via SenseWarm Pro thermostats.",
  },
  {
    slug: "spa-resort-uttarakhand",
    title: "Mountain Spa Resort",
    location: "Mussoorie, Uttarakhand",
    type: "Wellness",
    solution: "AquaFlow + ThermaBase XPS",
    year: "2023",
    area: "8,500 sq ft",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1200&auto=format&fit=crop&q=80",
    description:
      "A luxury spa with heated treatment rooms, pool surrounds, and relaxation areas. Hydronic system connected to a heat pump for energy-efficient year-round operation.",
  },
  {
    slug: "villa-bengaluru",
    title: "Modern Villa",
    location: "Bengaluru, Karnataka",
    type: "Residential",
    solution: "WarmFoil Underlaminate",
    year: "2024",
    area: "2,800 sq ft",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&auto=format&fit=crop&q=80",
    description:
      "A contemporary villa with engineered wood flooring throughout. WarmFoil dry-fit system installed for quick installation with zero disruption to the existing structure.",
  },
  {
    slug: "office-complex-delhi",
    title: "Corporate Headquarters",
    location: "New Delhi",
    type: "Commercial",
    solution: "AquaFlow Screed System",
    year: "2023",
    area: "25,000 sq ft",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    description:
      "A premium office complex with hydronic underfloor heating across three floors. Zoned control system optimizes energy usage based on occupancy patterns.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal-950 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-site">
          <Reveal>
            <p className="text-eyebrow text-copper-400 mb-4">Projects</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display-xl text-white max-w-3xl">
              Spaces we&apos;ve transformed.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg text-white/50 mt-6 max-w-xl">
              From Himalayan chalets to Mumbai penthouses, every project is a
              testament to invisible engineering.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Projects grid */}
      <section className="bg-ivory-100 py-20 md:py-28">
        <div className="container-site space-y-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              id={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid gap-8 lg:grid-cols-2 lg:items-center"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-2 text-caption text-charcoal-400 mb-4">
                  <span>{project.type}</span>
                  <span className="size-1 rounded-full bg-charcoal-300" />
                  <span>{project.year}</span>
                  <span className="size-1 rounded-full bg-charcoal-300" />
                  <span>{project.area}</span>
                </div>
                <h2 className="text-heading-xl text-charcoal-900 mb-2">
                  {project.title}
                </h2>
                <p className="text-body-sm text-charcoal-500 mb-4">
                  {project.location}
                </p>
                <p className="text-body-md text-charcoal-600 mb-6">
                  {project.description}
                </p>
                <p className="text-caption text-copper-500">
                  Solution: {project.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
