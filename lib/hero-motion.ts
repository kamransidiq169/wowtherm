/**
 * Centralized motion configuration for the WOWTHERM hero intro.
 *
 * Single source of truth for the load-time cinematic: the letter
 * choreography, its timings, and the shared easing vocabulary.
 * No component defines its own durations or offsets — the intro is
 * one choreographed sequence, described once, here.
 */

/* ------------------------------------------------------------------ */
/* Easing                                                              */
/* ------------------------------------------------------------------ */

/**
 * The brand curve. A quart-out with a slightly softer start than pure
 * `power2.out` — confident deceleration, no bounce, no overshoot.
 * Used everywhere in the intro for one coherent motion language.
 */
export const HERO_EASE = "wowtherm";

/** GSAP CustomEase path equivalent of cubic-bezier(0.22, 1, 0.36, 1). */
export const HERO_EASE_PATH = "M0,0 C0.22,0.61 0.36,1 1,1";

/** Framer Motion's cubic-bezier form of the same curve (UI micro-motion). */
export const HERO_EASE_CSS = [0.22, 1, 0.36, 1] as const;

/** Standard GSAP fallback wherever a named string is required. */
export const EASE_OUT_QUART = "power2.out";

/* ------------------------------------------------------------------ */
/* The word                                                            */
/* ------------------------------------------------------------------ */

/** The wordmark, letter by letter. Exactly eight entries — keep it that way. */
export const HERO_WORDMARK = ["W", "O", "W", "T", "H", "E", "R", "M"] as const;

/* ------------------------------------------------------------------ */
/* Letter choreography                                                 */
/* ------------------------------------------------------------------ */

/**
 * Per-letter choreography for the assembly.
 *
 * `enter` is the normalized off-stage origin, expressed as a fraction of
 * viewport width/height (positive x → from the right). Letters start
 * outside the composition and converge toward their position in the
 * wordmark. The values are the creative direction: each letter arrives
 * from its own direction — nothing travels straight down the middle.
 */
export interface LetterChoreography {
  /** Viewport-fraction offset the letter travels from (positive x = right). */
  enter: { x: number; y: number };
  /** Delay before this letter departs, in seconds (staggered departures). */
  delay: number;
  /** Travel duration in seconds — deliberately varied, never uniform. */
  duration: number;
  /** Final rotation in degrees — extremely subtle, one direction. */
  rotation: number;
  /** Starting scale — deep-z feels spatial without being cartoonish. */
  scaleFrom: number;
  /** Starting blur radius in px; resolves to perfectly sharp. */
  blur: number;
  /** Extra drift along the origin direction, applied before the main travel. */
  drift: number;
}

const CHOREOGRAPHY: readonly LetterChoreography[] = [
  { enter: { x: -1.25, y: 0.05 }, delay: 0.0, duration: 2.05, rotation: -1.8, scaleFrom: 0.92, blur: 6, drift: 0.06 }, // W — far left
  { enter: { x: -0.62, y: -0.85 }, delay: 0.16, duration: 1.85, rotation: 1.6, scaleFrom: 1.14, blur: 5, drift: 0.05 }, // O — upper left
  { enter: { x: -0.55, y: 1.05 }, delay: 0.3, duration: 1.95, rotation: -1.4, scaleFrom: 0.95, blur: 5, drift: 0.05 }, // W — bottom left
  { enter: { x: 0.08, y: -1.2 }, delay: 0.44, duration: 1.75, rotation: 1.8, scaleFrom: 1.12, blur: 6, drift: 0.04 }, // T — top
  { enter: { x: -0.05, y: 1.3 }, delay: 0.58, duration: 1.8, rotation: -1.6, scaleFrom: 0.94, blur: 5, drift: 0.04 }, // H — bottom
  { enter: { x: 0.68, y: -0.75 }, delay: 0.72, duration: 1.9, rotation: 1.5, scaleFrom: 1.1, blur: 5, drift: 0.05 }, // E — upper right
  { enter: { x: 1.28, y: 0.1 }, delay: 0.86, duration: 2.1, rotation: -1.7, scaleFrom: 0.9, blur: 7, drift: 0.06 }, // R — right
  { enter: { x: 0.72, y: 1.15 }, delay: 1.0, duration: 2.0, rotation: 1.7, scaleFrom: 0.96, blur: 6, drift: 0.05 }, // M — bottom right
];

export const LETTER_CHOREOGRAPHY = CHOREOGRAPHY;

/* ------------------------------------------------------------------ */
/* Timeline (seconds, from navigation)                                 */
/* ------------------------------------------------------------------ */

/**
 * The load-time sequence, as authored (before the loader overlaps it):
 *
 *   0.00  quiet architectural field establishes
 *   0.70  first letter departs
 *   0.70–3.4 letters travel, staggered departures, varied speeds
 *   3.30  final alignment — tracking resolves
 *   4.20  settle completes; wordmark perfectly still
 *   4.40  content cascade begins (eyebrow → headline → rule → copy → CTAs)
 *   6.60  everything stable — silence
 */
export const HERO_TIMELINE = {
  /** Quiet field beat before the first letter departs. */
  fieldEstablish: 0.3,
  /** First letter's delay, relative to field establish. */
  lettersStart: 0.7,
  /** Duration of the tracking resolve (final alignment). */
  trackingResolve: 0.9,
  /** Duration of the settle movement after alignment. */
  settle: 0.9,
  /** Rest between settle and the first content element. */
  contentRest: 0.2,
  /** Cascade stagger for content elements. */
  contentStagger: 0.15,
  /** Duration of each content element's entrance. */
  contentDuration: 1.0,
  /** Extra wait applied on small viewports (more letters travel visibly). */
  mobilePad: 0.35,
} as const;

/* ------------------------------------------------------------------ */
/* Scroll choreography (GSAP ScrollTrigger, desktop full experience)   */
/* ------------------------------------------------------------------ */

/**
 * Scroll progress (0–1 across the hero's 350vh journey) at which the
 * intro composition hands over to the scroll narrative. The wordmark
 * completes at ~1.5% of the journey and the content cascade completes
 * shortly after, so the handoff is never visible.
 */
export const HERO_INTRO_SCROLL_FADE = {
  start: 0.01,
  end: 0.09,
} as const;

/* ------------------------------------------------------------------ */
/* Cursor micro-parallax                                               */
/* ------------------------------------------------------------------ */

/** Max cursor parallax for the wordmark, in px. §20: restrained. */
export const WORDMARK_PARALLAX_PX = 3;
/** Max cursor parallax for the background image, in px. */
export const BACKGROUND_PARALLAX_PX = 12;
/** Lerp factor for cursor parallax smoothing (per 60fps frame). */
export const PARALLAX_LERP = 0.06;

/* ------------------------------------------------------------------ */
/* Loader                                                              */
/* ------------------------------------------------------------------ */

/**
 * Loader visuals, shared by the DOM overlay and (intentionally) the
 * early-paint inline script in app/page.tsx so both render the same mark.
 */
export const LOADER = {
  /** Wordmark shown in the loader. */
  wordmark: "WOWTHERM",
  /** Accent color of the loader mark (copper-500). */
  accent: "#d97a3f",
  /** Ivory field behind the mark. */
  field: "#faf7f2",
  /** Duration of the loader fade-out, ms. */
  fadeMs: 600,
  /** Base multiplier for the indeterminate progress loop. */
  pace: 1,
} as const;
