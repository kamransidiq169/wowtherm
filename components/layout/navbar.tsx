

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const isActive = (href: string, pathname: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      {/* ================================================================
          SKIP LINK
      ================================================================ */}

      <a
        href="#main"
        className="pointer-events-auto absolute left-6 -top-14 z-[100] rounded-full bg-copper-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-[top] focus-visible:top-4"
      >
        Skip to content
      </a>

      {/* ================================================================
          NAVBAR
      ================================================================ */}

      <nav
        aria-label="Main navigation"
        className={cn(
          "pointer-events-auto relative mx-auto flex items-center justify-between",
          "px-5 py-4 md:px-8 md:py-5 lg:px-10",
          "transition-all duration-500",
          "ease-(--ease-out-quart)",
          scrolled
            ? [
                "mx-3 mt-3 rounded-2xl",
                "border border-charcoal-900/[0.07]",
                "bg-ivory-100/90",
                "shadow-[0_12px_45px_-25px_rgba(20,18,16,0.28)]",
                "backdrop-blur-2xl",
                "md:mx-5 md:mt-4",
              ].join(" ")
            : [
                "border-b border-white/[0.08]",
                "bg-linear-to-b from-black/35 via-black/10 to-transparent",
              ].join(" "),
        )}
      >
        {/* ================================================================
            LOGO
        ================================================================ */}

        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="group relative z-20 flex shrink-0 items-center"
        >
          <Image
            src="/logo.png"
            alt="WOWTHERM"
            width={160}
            height={46}
            priority
            className={cn(
              "h-auto w-[122px] object-contain",
              "transition-transform duration-500 ease-(--ease-out-quart)",
              "group-hover:scale-[1.025]",
              "sm:w-[132px] lg:w-[142px]",
            )}
          />
        </Link>

        {/* ================================================================
            DESKTOP NAVIGATION
        ================================================================ */}

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-9">
          {navLinks.map((link) => {
            const active = isActive(link.href, pathname);

            return (
              <li
                key={link.href}
                className="relative flex items-center"
              >
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-1 py-3",
                    "text-[10px] font-medium uppercase tracking-[0.12em]",
                    "transition-colors duration-300",
                    active
                      ? scrolled
                        ? "text-charcoal-950"
                        : "text-white"
                      : scrolled
                        ? "text-charcoal-500 hover:text-charcoal-950"
                        : "text-white/55 hover:text-white",
                  )}
                >
                  {link.label}

                  {/* Animated underline */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute bottom-1 left-1/2 h-px -translate-x-1/2",
                      "bg-copper-500",
                      "transition-all duration-400 ease-(--ease-out-quart)",
                      active
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full",
                    )}
                  />
                </Link>

                {/* Active marker */}
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{
                    scale: active ? 1 : 0,
                    opacity: active ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: EASE,
                  }}
                  className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-copper-500"
                />
              </li>
            );
          })}
        </ul>

        {/* ================================================================
            RIGHT ACTIONS
        ================================================================ */}

        <div className="relative z-20 flex items-center gap-2.5">
          {/* Desktop CTA */}
          <Magnetic className="hidden lg:block">
            <Link
              href="/contact"
              className={cn(
                "group relative inline-flex h-11 items-center gap-3 overflow-hidden rounded-full px-5",
                "text-[10px] font-semibold uppercase tracking-[0.16em]",
                "transition-all duration-400",
                scrolled
                  ? "bg-charcoal-950 text-white hover:bg-charcoal-800"
                  : "border border-white/20 bg-white/[0.08] text-white backdrop-blur-md hover:border-white/30 hover:bg-white/[0.14]",
              )}
            >
              <span className="relative z-10">
                Start a Project
              </span>

              <span className="relative z-10 flex size-6 items-center justify-center rounded-full bg-copper-500 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowUpRight
                  className="size-3"
                  strokeWidth={1.8}
                  aria-hidden
                />
              </span>

              {/* Copper sweep */}
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-copper-500 transition-transform duration-500 ease-(--ease-out-quart) group-hover:translate-x-0"
              />

              <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span>Start a Project</span>

                <span className="flex size-6 items-center justify-center rounded-full bg-white/15">
                  <ArrowUpRight
                    className="size-3"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                </span>
              </span>
            </Link>
          </Magnetic>

          {/* ============================================================
              MOBILE MENU
          ============================================================ */}

          <Dialog.Root
            open={open}
            onOpenChange={setOpen}
          >
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className={cn(
                  "group relative flex size-11 items-center justify-center rounded-full",
                  "border transition-all duration-300",
                  "lg:hidden",
                  scrolled
                    ? "border-charcoal-900/10 bg-white/60 text-charcoal-950 hover:border-charcoal-900/20"
                    : "border-white/20 bg-white/[0.06] text-white backdrop-blur-md hover:border-white/35 hover:bg-white/[0.1]",
                )}
              >
                <Menu
                  className="size-[17px] transition-transform duration-300 group-hover:scale-90"
                  strokeWidth={1.6}
                  aria-hidden
                />
              </button>
            </Dialog.Trigger>

            <AnimatePresence>
              {open && (
                <Dialog.Portal forceMount>
                  {/* Overlay */}
                  <Dialog.Overlay asChild forceMount>
                    <motion.div
                      className="fixed inset-0 z-[60] bg-charcoal-950/65 backdrop-blur-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.35,
                      }}
                    />
                  </Dialog.Overlay>

                  {/* Drawer */}
                  <Dialog.Content
                    asChild
                    forceMount
                    aria-describedby={undefined}
                  >
                    <motion.aside
                      initial={{
                        x: "100%",
                      }}
                      animate={{
                        x: 0,
                      }}
                      exit={{
                        x: "100%",
                      }}
                      transition={{
                        duration: 0.55,
                        ease: EASE,
                      }}
                      className={cn(
                        "fixed inset-y-0 right-0 z-[70]",
                        "flex w-full max-w-[430px] flex-col",
                        "overflow-hidden",
                        "bg-charcoal-950 text-white",
                        "shadow-[-20px_0_80px_-35px_rgba(0,0,0,0.8)]",
                      )}
                    >
                      {/* Decorative architecture */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.035]"
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
                          backgroundSize: "72px 72px",
                        }}
                      />

                      {/* Copper atmosphere */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -right-32 -top-32 size-80 rounded-full bg-copper-500/[0.12] blur-[100px]"
                      />

                      <div
                        aria-hidden
                        className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-copper-500/[0.05] blur-[120px]"
                      />

                      {/* Drawer header */}
                      <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
                        <div className="flex items-center gap-3">
                          <span className="h-px w-7 bg-copper-400" />

                          <Dialog.Title className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">
                            Navigation
                          </Dialog.Title>
                        </div>

                        <Dialog.Close asChild>
                          <button
                            type="button"
                            aria-label="Close navigation menu"
                            className="group flex size-11 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-copper-400/50 hover:bg-white/5"
                          >
                            <X
                              className="size-5 text-white/70 transition-transform duration-300 group-hover:rotate-90 group-hover:text-white"
                              strokeWidth={1.5}
                              aria-hidden
                            />
                          </button>
                        </Dialog.Close>
                      </div>

                      {/* Navigation */}
                      <div className="relative flex flex-1 flex-col px-6 pt-10 sm:px-8">
                        <div className="mb-8 flex items-center justify-between">
                          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/25">
                            WOWTHERM
                          </span>

                          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-copper-400">
                            01 — 05
                          </span>
                        </div>

                        <nav aria-label="Mobile navigation">
                          <ul className="flex flex-col">
                            {navLinks.map((link, i) => {
                              const active = isActive(
                                link.href,
                                pathname,
                              );

                              return (
                                <motion.li
                                  key={link.href}
                                  initial={{
                                    opacity: 0,
                                    x: 35,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    x: 0,
                                  }}
                                  transition={{
                                    delay: 0.1 + i * 0.055,
                                    duration: 0.5,
                                    ease: EASE,
                                  }}
                                >
                                  <Link
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={cn(
                                      "group flex items-center justify-between",
                                      "border-b border-white/[0.08]",
                                      "py-5",
                                      "transition-colors duration-300",
                                      active
                                        ? "text-copper-400"
                                        : "text-white/70 hover:text-white",
                                    )}
                                  >
                                    <div className="flex items-baseline gap-5">
                                      <span className="font-mono text-[9px] text-white/20">
                                        {String(i + 1).padStart(2, "0")}
                                      </span>

                                      <span className="font-display text-[2rem] leading-none tracking-[-0.035em]">
                                        {link.label}
                                      </span>
                                    </div>

                                    <motion.span
                                      animate={{
                                        x: active ? 0 : -5,
                                        opacity: active ? 1 : 0,
                                      }}
                                      className="flex size-9 items-center justify-center rounded-full border border-copper-400/30 bg-copper-400/10"
                                    >
                                      <ArrowUpRight
                                        className="size-4"
                                        aria-hidden
                                      />
                                    </motion.span>
                                  </Link>
                                </motion.li>
                              );
                            })}
                          </ul>
                        </nav>

                        {/* Bottom */}
                        <div className="relative mt-auto pb-7 pt-10">
                          <Link
                            href="/contact"
                            onClick={closeMenu}
                            className="group relative flex h-14 w-full items-center justify-between overflow-hidden bg-copper-500 px-5 text-[10px] font-semibold uppercase tracking-[0.17em] text-white"
                          >
                            <span>
                              Start a Project
                            </span>

                            <span className="flex size-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                              <ArrowRight
                                className="size-4"
                                aria-hidden
                              />
                            </span>
                          </Link>

                          <div className="mt-5 flex items-center justify-between">
                            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/20">
                              Engineered warmth
                            </span>

                            <span className="text-xs text-white/45">
                              {siteConfig.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Corner detail */}
                      <div
                        aria-hidden
                        className="absolute bottom-0 right-0 size-24 border-b border-r border-copper-400/20"
                      />
                    </motion.aside>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}