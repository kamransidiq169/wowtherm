"use client";

import {
  useMemo,
} from "react";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ============================================================
   TYPES
============================================================ */

interface ProcessHeatingSystemProps {
  progress: MotionValue<number>;
}

interface HeatingStringProps {
  path: string;
  index: number;
  progress: MotionValue<number>;
}

/* ============================================================
   FIVE REALISTIC CIRCUITS
============================================================ */

/*
  EXACTLY FIVE circuits.

  Each circuit is one continuous serpentine path.
  They remain physically close to the mesh rather than
  becoming giant floating neon tubes.
*/

const HEATING_PATHS = [
  `
    M 135 145
    H 1465
    C 1490 145 1490 178 1465 178
    H 135
    C 110 178 110 211 135 211
    H 1465
  `,

  `
    M 135 285
    H 1465
    C 1490 285 1490 318 1465 318
    H 135
    C 110 318 110 351 135 351
    H 1465
  `,

  `
    M 135 425
    H 1465
    C 1490 425 1490 458 1465 458
    H 135
    C 110 458 110 491 135 491
    H 1465
  `,

  `
    M 135 565
    H 1465
    C 1490 565 1490 598 1465 598
    H 135
    C 110 598 110 631 135 631
    H 1465
  `,

  `
    M 135 705
    H 1465
    C 1490 705 1490 738 1465 738
    H 135
    C 110 738 110 771 135 771
    H 1465
  `,
];

/* ============================================================
   HEATING STRING
============================================================ */

function HeatingString({
  path,
  index,
  progress,
}: HeatingStringProps) {
  const start = index * 0.2;

  const end =
    index === 4
      ? 1
      : (index + 1) * 0.2;

  const revealStart = Math.max(
    0,
    start - 0.028,
  );

  const reveal =
    useTransform(
      progress,
      [revealStart, end],
      [0, 1],
    );

  const glow =
    useTransform(
      progress,
      [
        Math.max(0, start - 0.045),
        start,
        end,
        Math.min(1, end + 0.045),
      ],
      [
        0.015,
        0.32,
        0.15,
        0.045,
      ],
    );

  const cableOpacity =
    useTransform(
      progress,
      [
        Math.max(0, start - 0.025),
        start,
        end,
      ],
      [
        0.12,
        0.95,
        0.42,
      ],
    );

  const highlightOpacity =
    useTransform(
      progress,
      [
        Math.max(0, start - 0.02),
        start,
        end,
      ],
      [
        0.02,
        0.26,
        0.08,
      ],
    );

  return (
    <g>
      {/* soft warmth */}
      <motion.path
        d={path}
        fill="none"
        stroke="#B94F15"
        strokeWidth="17"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#softHeat)"
        style={{
          opacity: glow,
          pathLength: reveal,
        }}
      />

      {/* dark physical cable body */}
      <motion.path
        d={path}
        fill="none"
        stroke="#61270D"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: cableOpacity,
          pathLength: reveal,
        }}
      />

      {/* copper cable */}
      <motion.path
        d={path}
        fill="none"
        stroke="url(#copper)"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: cableOpacity,
          pathLength: reveal,
        }}
      />

      {/* subtle metallic highlight */}
      <motion.path
        d={path}
        fill="none"
        stroke="#F4B17B"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: highlightOpacity,
          pathLength: reveal,
        }}
      />
    </g>
  );
}

/* ============================================================
   MESH
============================================================ */

function Mesh() {
  const verticalLines = useMemo(
    () =>
      Array.from(
        { length: 54 },
        (_, index) =>
          45 + index * 29,
      ),
    [],
  );

  const horizontalLines = useMemo(
    () =>
      Array.from(
        { length: 29 },
        (_, index) =>
          12 + index * 29,
      ),
    [],
  );

  return (
    <g
      stroke="#B7B7B7"
      strokeWidth="0.55"
      opacity="0.12"
    >
      {verticalLines.map((x) => (
        <line
          key={`vertical-${x}`}
          x1={x}
          y1="0"
          x2={x}
          y2="820"
        />
      ))}

      {horizontalLines.map((y) => (
        <line
          key={`horizontal-${y}`}
          x1="0"
          y1={y}
          x2="1600"
          y2={y}
        />
      ))}
    </g>
  );
}

/* ============================================================
   WEAVE
============================================================ */

function Weave() {
  return (
    <g
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="0.45"
      opacity="0.035"
    >
      <path d="M0 0 L1600 820" />
      <path d="M-100 0 L1500 820" />
      <path d="M100 0 L1700 820" />

      <path d="M1600 0 L0 820" />
      <path d="M1700 0 L100 820" />
      <path d="M1500 0 L-100 820" />
    </g>
  );
}

/* ============================================================
   MAIN
============================================================ */

export default function ProcessHeatingSystem({
  progress,
}: ProcessHeatingSystemProps) {
  const rotateX =
    useTransform(
      progress,
      [0, 0.5, 1],
      [18, 15, 12],
    );

  const rotateZ =
    useTransform(
      progress,
      [0, 0.5, 1],
      [-0.55, 0, 0.55],
    );

  const scale =
    useTransform(
      progress,
      [0, 0.5, 1],
      [0.965, 1, 1.012],
    );

  const y =
    useTransform(
      progress,
      [0, 0.5, 1],
      [16, 0, -8],
    );

  const shadowScale =
    useTransform(
      progress,
      [0, 0.5, 1],
      [0.95, 1, 1.02],
    );

  const shadowOpacity =
    useTransform(
      progress,
      [0, 0.5, 1],
      [0.22, 0.34, 0.22],
    );

  return (
    <div
      className="
        relative
        w-full
        [perspective:1800px]
      "
    >
      {/* ========================================================
         SHADOW
      ======================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-6%]
          left-[7%]
          h-[14%]
          w-[86%]
          rounded-[50%]
          bg-black
          blur-[28px]
        "
        style={{
          scaleX: shadowScale,
          opacity: shadowOpacity,
        }}
      />

      {/* ========================================================
         MAT
      ======================================================== */}

      <motion.div
        className="
          relative
          aspect-[1.95/1]
          w-full
          overflow-hidden
          rounded-[10px]
          border
          border-white/[0.075]
          bg-[#111]
        "
        style={{
          rotateX,
          rotateZ,
          scale,
          y,
          transformStyle:
            "preserve-3d",
          boxShadow:
            "0 35px 90px rgba(0,0,0,.52), inset 0 1px 0 rgba(255,255,255,.055)",
        }}
      >
        {/* physical thickness */}

        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-[0.5%]
            bottom-[-8px]
            h-[11px]
            rounded-b-[9px]
            bg-[#080808]
          "
        />

        {/* ======================================================
           SVG
        ====================================================== */}

        <svg
          viewBox="0 0 1600 820"
          preserveAspectRatio="none"
          className="
            absolute
            inset-0
            h-full
            w-full
          "
          aria-hidden="true"
        >
          <defs>
            {/* base */}

            <linearGradient
              id="matBase"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#191919"
              />

              <stop
                offset="48%"
                stopColor="#111111"
              />

              <stop
                offset="100%"
                stopColor="#090909"
              />
            </linearGradient>

            {/* copper */}

            <linearGradient
              id="copper"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#75300F"
              />

              <stop
                offset="35%"
                stopColor="#B94F15"
              />

              <stop
                offset="65%"
                stopColor="#D96822"
              />

              <stop
                offset="100%"
                stopColor="#8E370D"
              />
            </linearGradient>

            {/* surface light */}

            <radialGradient
              id="surfaceLight"
              cx="48%"
              cy="40%"
              r="78%"
            >
              <stop
                offset="0%"
                stopColor="#FFFFFF"
                stopOpacity="0.045"
              />

              <stop
                offset="55%"
                stopColor="#FFFFFF"
                stopOpacity="0.008"
              />

              <stop
                offset="100%"
                stopColor="#000000"
                stopOpacity="0.35"
              />
            </radialGradient>

            {/* heat */}

            <filter
              id="softHeat"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                stdDeviation="12"
              />
            </filter>

            {/* vignette */}

            <radialGradient
              id="vignette"
              cx="50%"
              cy="45%"
              r="76%"
            >
              <stop
                offset="50%"
                stopColor="#000"
                stopOpacity="0"
              />

              <stop
                offset="100%"
                stopColor="#000"
                stopOpacity="0.38"
              />
            </radialGradient>
          </defs>

          {/* base */}

          <rect
            width="1600"
            height="820"
            fill="url(#matBase)"
          />

          {/* woven mesh */}

          <Mesh />

          <Weave />

          {/* surface */}

          <rect
            width="1600"
            height="820"
            fill="url(#surfaceLight)"
          />

          {/* ====================================================
             EXACTLY FIVE CIRCUITS
          ==================================================== */}

          {HEATING_PATHS.map(
            (path, index) => (
              <HeatingString
                key={`circuit-${index}`}
                path={path}
                index={index}
                progress={progress}
              />
            ),
          )}

          {/* vignette */}

          <rect
            width="1600"
            height="820"
            fill="url(#vignette)"
          />
        </svg>

        {/* ======================================================
           VERY SUBTLE MICRO MESH
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.055]
            [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.18)_0px,rgba(255,255,255,.18)_1px,transparent_1px,transparent_4px),repeating-linear-gradient(90deg,rgba(0,0,0,.5)_0px,rgba(0,0,0,.5)_1px,transparent_1px,transparent_4px)]
            mix-blend-mode:soft-light
          "
        />

        {/* ======================================================
           SOFT TOP REFLECTION
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-[5%]
            right-[5%]
            top-[5%]
            h-[15%]
            rounded-full
            bg-white/[0.018]
            blur-[18px]
          "
        />

        {/* ======================================================
           TECHNICAL MARKINGS
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-[3.4%]
            top-[6%]
            font-mono
            text-[7px]
            uppercase
            tracking-[0.2em]
            text-white/18
          "
        >
          WOWTHERM
        </div>

        <div
          className="
            pointer-events-none
            absolute
            right-[3.4%]
            top-[6%]
            font-mono
            text-[7px]
            uppercase
            tracking-[0.18em]
            text-white/16
          "
        >
          HEATING SYSTEM / 01
        </div>

        <div
          className="
            pointer-events-none
            absolute
            bottom-[6%]
            left-[3.4%]
            font-mono
            text-[6px]
            uppercase
            tracking-[0.16em]
            text-white/14
          "
        >
          ENGINEERED COMFORT
        </div>

        <div
          className="
            pointer-events-none
            absolute
            bottom-[6%]
            right-[3.4%]
            font-mono
            text-[6px]
            uppercase
            tracking-[0.16em]
            text-white/14
          "
        >
          UNDERFLOOR SYSTEM
        </div>

        {/* ======================================================
           OUTER EDGE
        ====================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[10px]
            border
            border-white/[0.035]
          "
        />
      </motion.div>
    </div>
  );
}