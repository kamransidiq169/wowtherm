"use client";

import { useRef, useEffect } from "react";

/**
 * 2.5D architectural heating mat visual.
 *
 * Layered CSS construction with perspective — not a 3D product render,
 * but a sophisticated material object that communicates:
 * "precision electric heating installed beneath the floor."
 *
 * The mat is the visual hero of the composition — it replaces the
 * abstract object from the reference with a premium architectural element.
 */

/* ------------------------------------------------------------------ */
/* Cable path data for the SVG serpentine routing                      */
/* ------------------------------------------------------------------ */

const MAT = { w: 520, h: 380 } as const;
const P = 38;
const CX = 6;
const SG = 16;
const COLS = 10;
const ROWS = 6;

function buildCablePath(): string {
  const parts: string[] = [];
  for (let r = 0; r < ROWS; r++) {
    const y = P + r * SG + SG / 2;
    const x0 = P + CX;
    const x1 = MAT.w - P - CX;
    if (r % 2 === 0) {
      parts.push(r === 0 ? `M${x0},${y}` : `L${x0},${y}`);
      parts.push(`L${x1},${y}`);
    } else {
      parts.push(`L${x1},${y}`);
      parts.push(`L${x0},${y}`);
    }
  }
  return parts.join(" ");
}

const CABLE_PATH = buildCablePath();

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

interface HeatingMatVisualProps {
  /** 0–1 drive for the thermal pulse effect */
  thermal?: number;
  /** 0–1 drive for reveal/opacity */
  reveal?: number;
  className?: string;
}

export function HeatingMatVisual({
  thermal = 0,
  reveal = 1,
  className = "",
}: HeatingMatVisualProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Log cable length for reference (dev only)
  useEffect(() => {
    if (svgRef.current && process.env.NODE_ENV === "development") {
      const path = svgRef.current.querySelector<SVGPathElement>("#hm-cable");
      if (path) {
        const len = path.getTotalLength();
        if (len > 0) console.log("[WowTherm] Heating mat cable length:", Math.ceil(len));
      }
    }
  }, []);

  return (
    <div
      className={`relative ${className}`}
      style={{ opacity: reveal }}
    >
      {/* Main mat container with perspective */}
      <div
        className="relative"
        style={{
          width: "100%",
          maxWidth: 520,
          aspectRatio: `${MAT.w} / ${MAT.h}`,
          perspective: 800,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer shadow — floor contact shadow */}
        <div
          className="absolute -inset-4 rounded-sm"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 55%, rgba(0,0,0,0.22) 0%, transparent 65%)",
            transform: "translateZ(-6px) rotateX(2deg)",
            filter: "blur(8px)",
          }}
        />

        {/* Main mat body — perspective transform */}
        <div
          className="absolute inset-0 overflow-hidden rounded-sm"
          style={{
            transform: "rotateX(12deg) rotateY(-3deg) rotateZ(0.5deg)",
            transformOrigin: "center 70%",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 50px -15px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {/* Substrate — warm architectural base */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(145deg, #2a2420 0%, #231f1b 40%, #1e1b17 100%)",
            }}
          />

          {/* Mesh grid texture */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${MAT.w} ${MAT.h}`}
            preserveAspectRatio="none"
          >
            {/* Vertical mesh lines */}
            {Array.from({ length: COLS + 1 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={P + (i * (MAT.w - 2 * P)) / COLS}
                y1={P}
                x2={P + (i * (MAT.w - 2 * P)) / COLS}
                y2={MAT.h - P}
                stroke="rgba(120,105,85,0.12)"
                strokeWidth="0.5"
              />
            ))}
            {/* Horizontal mesh lines */}
            {Array.from({ length: ROWS + 1 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={P}
                y1={P + (i * (MAT.h - 2 * P)) / ROWS}
                x2={MAT.w - P}
                y2={P + (i * (MAT.h - 2 * P)) / ROWS}
                stroke="rgba(120,105,85,0.12)"
                strokeWidth="0.5"
              />
            ))}
          </svg>

          {/* Heating cable SVG */}
          <svg
            ref={svgRef}
            className="absolute inset-0 h-full w-full"
            viewBox={`0 0 ${MAT.w} ${MAT.h}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Cable glow (thermal pulse) */}
            {thermal > 0 && (
              <path
                d={CABLE_PATH}
                fill="none"
                stroke="#ff9944"
                strokeWidth={CX * 2.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={thermal * 0.35}
                style={{ filter: "blur(5px)" }}
              />
            )}

            {/* Cable shadow */}
            <path
              d={CABLE_PATH}
              fill="none"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth={CX + 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(0.5, 0.8)"
            />

            {/* Main heating cable */}
            <path
              id="hm-cable"
              d={CABLE_PATH}
              fill="none"
              stroke={thermal > 0.1 ? "#e08844" : "#c1652e"}
              strokeWidth={CX}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.85}
            />

            {/* Cable highlight */}
            <path
              d={CABLE_PATH}
              fill="none"
              stroke="rgba(255,220,180,0.12)"
              strokeWidth={CX * 0.35}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-0.3, -0.4)"
            />
          </svg>

          {/* Thermal gradient overlay */}
          {thermal > 0 && (
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,140,50,${thermal * 0.12}) 0%, transparent 70%)`,
              }}
            />
          )}

          {/* Top edge highlight — architectural surface feel */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 70%, transparent 95%)",
            }}
          />

          {/* Left edge highlight */}
          <div
            className="absolute inset-y-0 left-0 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.06) 60%, transparent 95%)",
            }}
          />
        </div>

        {/* Thickness indicator — communicates "3mm" thinness */}
        <div
          className="absolute bottom-0 left-[15%] right-[15%]"
          style={{
            height: 3,
            transform: "rotateX(12deg) rotateY(-3deg) translateZ(-1px)",
            transformOrigin: "center top",
            background:
              "linear-gradient(90deg, transparent, rgba(160,140,115,0.25) 15%, rgba(160,140,115,0.35) 50%, rgba(160,140,115,0.25) 85%, transparent)",
          }}
        />
      </div>
    </div>
  );
}
