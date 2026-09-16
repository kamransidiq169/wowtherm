"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  projectType: z.string().min(1, "Please select a project type"),
  location: z.string().min(2, "Please enter your location"),
  area: z.string().optional(),
  message: z.string().min(10, "Please provide more details about your project"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  "Residential — New Build",
  "Residential — Renovation",
  "Hospitality",
  "Commercial",
  "Wellness / Spa",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // TODO: Integrate with backend/email service
    console.log("Form submitted:", data);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal-950 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-site">
          <Reveal>
            <p className="text-eyebrow text-copper-400 mb-4">Contact</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display-xl text-white max-w-3xl">
              Let&apos;s talk about
              <br />
              your space.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="bg-ivory-100 py-20 md:py-28">
        <div className="container-site">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left — info */}
            <Reveal>
              <div>
                <p className="text-eyebrow text-copper-500 mb-6">Get in Touch</p>
                <h2 className="text-display-md text-charcoal-900 mb-6">
                  Start your project with a conversation.
                </h2>
                <p className="text-body-lg text-charcoal-500 mb-8">
                  Whether you&apos;re planning a new build, renovating a single room,
                  or outfitting an entire hotel, we&apos;ll help you find the right
                  heating solution.
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="text-eyebrow text-charcoal-400 mb-2">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-body-md text-charcoal-900 hover:text-copper-500 transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-eyebrow text-charcoal-400 mb-2">Phone</p>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="text-body-md text-charcoal-900 hover:text-copper-500 transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-eyebrow text-charcoal-400 mb-2">
                      Office
                    </p>
                    <p className="text-body-md text-charcoal-900">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal delay={0.1}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center rounded-[var(--radius-card)] bg-white p-12 text-center shadow-[var(--shadow-card)]"
                >
                  <div className="flex size-16 items-center justify-center rounded-full bg-green-50 text-green-600 mb-6">
                    <Check className="size-8" />
                  </div>
                  <h3 className="text-heading-xl text-charcoal-900 mb-4">
                    Message sent
                  </h3>
                  <p className="text-body-md text-charcoal-500">
                    Thank you for reaching out. Our team will review your inquiry
                    and get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="rounded-[var(--radius-card)] bg-white p-8 shadow-[var(--shadow-card)] md:p-10"
                >
                  <div className="space-y-6">
                    <Input
                      label="Name"
                      placeholder="Your full name"
                      error={errors.name?.message}
                      {...register("name")}
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                      <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                      <Input
                        label="Phone"
                        type="tel"
                        placeholder="+91 98110 40040"
                        error={errors.phone?.message}
                        {...register("phone")}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-charcoal-700">
                        Project Type
                      </label>
                      <select
                        {...register("projectType")}
                        className="flex h-11 w-full rounded-[var(--radius-field)] border border-charcoal-200 bg-white px-4 text-sm text-charcoal-900 transition-colors focus:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p className="text-sm text-danger">
                          {errors.projectType.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <Input
                        label="Location"
                        placeholder="City, State"
                        error={errors.location?.message}
                        {...register("location")}
                      />
                      <Input
                        label="Approximate Area (sq ft)"
                        placeholder="e.g., 2,500"
                        {...register("area")}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-charcoal-700">
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                        className="flex w-full rounded-[var(--radius-field)] border border-charcoal-200 bg-white px-4 py-3 text-sm text-charcoal-900 placeholder:text-charcoal-400 transition-colors focus:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20 resize-none"
                      />
                      {errors.message && (
                        <p className="text-sm text-danger">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      variant="secondary"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <ArrowRight aria-hidden className="size-4" />
                    </Button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
