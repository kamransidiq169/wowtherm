"use client";

import { useRef, useEffect, useCallback, useState } from "react";

/**
 * Technical SVG drawing of an electric underfloor heating system.
 *
 * The paths literally draw themselves onto the screen using
 * stroke-dasharray / stroke-dashoffset animation driven by GSAP.
 *
 * Different paths have slightly different delays — creating rhythm
 * and visual choreography that communicates "precision engineering."
 */

/* ------------------------------------------------------------------ */
/* SVG geometry                                                        */
/* ------------------------------------------------------------------ */

const W = 560;
const H = 420;
const PAD = 50;
const INNER_W = W - PAD * 2;
const INNER_H = H - PAD * 2;
const CX = 38;

/* ------------------------------------------------------------------ */
/* Cable routing — authentic serpentine heating layout                  */
/* ------------------------------------------------------------------ */

const CABLE_ROWS = 7;
const CABLE_SG = INNER_H / (CABLE_ROWS + 1);

function buildCablePath(): string {
  const parts: string[] = [];
  for (let r = 0; r < CABLE_ROWS; r++) {
    const y = PAD + (r + 1) * CABLE_SG;
    const x0 = PAD + 18;
    const x1 = PAD + INNER_W - 18;
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
/* Measurement tick marks along the edges                              */
/* ------------------------------------------------------------------ */

function MeasurementTicks() {
  const ticks: React.ReactNode[] = [];

  // Top edge ticks
  for (let i = 0; i <= 8; i++) {
    const x = PAD + (i * INNER_W) / 8;
    ticks.push(
      <line
        key={`tt${i}`}
        x1={x}
        y1={PAD - 6}
        x2={x}
        y2={PAD - 2}
        stroke="rgba(180,165,140,0.2)"
        strokeWidth="0.5"
      />,
    );
  }
  // Bottom edge ticks
  for (let i = 0; i <= 8; i++) {
    const x = PAD + (i * INNER_W) / 8;
    ticks.push(
      <line
        key={`tb${i}`}
        x1={x}
        y1={H - PAD + 2}
        x2={x}
        y2={H - PAD + 6}
        stroke="rgba(180,165,140,0.2)"
        strokeWidth="0.5"
      />,
    );
  }
  // Left edge ticks
  for (let i = 0; i <= 6; i++) {
    const y = PAD + (i * INNER_H) / 6;
    ticks.push(
      <line
        key={`tl${i}`}
        x1={PAD - 6}
        y1={y}
        x2={PAD - 2}
        y2={y}
        stroke="rgba(180,165,140,0.2)"
        strokeWidth="0.5"
      />,
    );
  }
  // Right edge ticks
  for (let i = 0; i <= 6; i++) {
    const y = PAD + (i * INNER_H) / 6;
    ticks.push(
      <line
        key={`tr${i}`}
        x1={W - PAD + 2}
        y1={y}
        x2={W - PAD + 6}
        y2={y}
        stroke="rgba(180,165,140,0.2)"
        strokeWidth="0.5"
      />,
    );
  }
  return <>{ticks}</>;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

interface TechnicalDrawingProps {
  /** 0–1 drive for stroke reveal progress */
  drawProgress?: number;
  /** 0–1 thermal pulse intensity */
  thermal?: number;
  /** 0–1 overall opacity */
  opacity?: number;
  className?: string;
}

export function TechnicalDrawing({
  drawProgress = 0,
  thermal = 0,
  opacity = 1,
  className = "",
}: TechnicalDrawingProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cableLen, setCableLen] = useState(2400);
  const [svgReady, setSvgReady] = useState(false);

  useEffect(() => {
    if (svgRef.current) {
      setSvgReady(true);
      const path = svgRef.current.querySelector<SVGPathElement>("#td-cable");
      if (path) {
        const len = path.getTotalLength();
        if (len > 0) setCableLen(Math.ceil(len));
      }
    }
  }, []);

  const strokeOffset = useCallback(
    (progress: number) => cableLen * (1 - Math.min(1, Math.max(0, progress))),
    [cableLen],
  );

  return (
    <div className={className} style={{ opacity }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        style={{ maxWidth: 560 }}
        aria-label="Technical heating system layout drawing"
        role="img"
      >
        {/* Corner marks — architectural drawing convention */}
        <path
          d={`M${PAD},${PAD + 14} L${PAD},${PAD} L${PAD + 14},${PAD}`}
          stroke="rgba(180,165,140,0.18)"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        <path
          d={`M${W - PAD - 14},${PAD} L${W - PAD},${PAD} L${W - PAD},${PAD + 14}`}
          stroke="rgba(180,165,140,0.18)"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        <path
          d={`M${PAD},${H - PAD - 14} L${PAD},${H - PAD} L${PAD + 14},${H - PAD}`}
          stroke="rgba(180,165,140,0.18)"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        <path
          d={`M${W - PAD - 14},${H - PAD} L${W - PAD},${H - PAD} L${W - PAD},${H - PAD - 14}`}
          stroke="rgba(180,165,140,0.18)"
          strokeWidth="0.7"
          strokeLinecap="round"
        />

        {/* Floor boundary */}
        <rect
          x={PAD}
          y={PAD}
          width={INNER_W}
          height={INNER_H}
          stroke="rgba(180,165,140,0.08)"
          strokeWidth="0.5"
          strokeDasharray="3 3"
          opacity={drawProgress > 0.15 ? 1 : 0}
          style={{ transition: "opacity 0.6s ease-out" }}
        />

        {/* Measurement tick marks */}
        <g opacity={drawProgress > 0.25 ? 1 : 0} style={{ transition: "opacity 0.6s ease-out" }}>
          <MeasurementTicks />
        </g>

        {/* Inlet connection box */}
        <rect
          x={PAD + 8}
          y={PAD + CABLE_SG - 14}
          width={10}
          height={28}
          rx={2}
          stroke="rgba(180,165,140,0.18)"
          strokeWidth="0.7"
          fill="none"
          opacity={drawProgress > 0.08 ? 1 : 0}
          style={{ transition: "opacity 0.5s ease-out" }}
        />

        {/* Outlet connection box */}
        <rect
          x={PAD + INNER_W - 18}
          y={PAD + CABLE_SG * CABLE_ROWS - 14}
          width={10}
          height={28}
          rx={2}
          stroke="rgba(180,165,140,0.18)"
          strokeWidth="0.7"
          fill="none"
          opacity={drawProgress > 0.08 ? 1 : 0}
          style={{ transition: "opacity 0.5s ease-out" }}
        />

        {/* Cross-hair center marker */}
        <line
          x1={W / 2 - 6}
          y1={H / 2}
          x2={W / 2 + 6}
          y2={H / 2}
          stroke="rgba(180,165,140,0.15)"
          strokeWidth="0.5"
          opacity={drawProgress > 0.45 ? 1 : 0}
          style={{ transition: "opacity 0.5s ease-out" }}
        />
        <line
          x1={W / 2}
          y1={H / 2 - 6}
          x2={W / 2}
          y2={H / 2 + 6}
          stroke="rgba(180,165,140,0.15)"
          strokeWidth="0.5"
          opacity={drawProgress > 0.45 ? 1 : 0}
          style={{ transition: "opacity 0.5s ease-out" }}
        />

        {/* Thermal pulse glow (behind cable) */}
        {thermal > 0.05 && (
          <path
            d={CABLE_PATH}
            stroke="#ff9944"
            strokeWidth={CX * 2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={thermal * 0.3}
            style={{ filter: "blur(4px)" }}
          />
        )}

        {/* Thermal pulse animated circle traveling along the cable */}
        {thermal > 0.05 && svgReady && (
          <circle r="3" fill="#ffaa55" opacity={thermal * 0.6} style={{ filter: "blur(1.5px)" }}>
            <animateMotion
              dur="2.5s"
              repeatCount="indefinite"
              path={CABLE_PATH}
            />
          </circle>
        )}

        {/* Main heating cable path */}
        <path
          id="td-cable"
          d={CABLE_PATH}
          stroke={
            thermal > 0.1
              ? `rgba(224,136,68,${0.55 + thermal * 0.45})`
              : "rgba(193,101,46,0.55)"
          }
          strokeWidth={CX}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={cableLen}
          strokeDashoffset={strokeOffset(drawProgress * 1.2)}
        />

        {/* Cable highlight line */}
        <path
          d={CABLE_PATH}
          stroke="rgba(255,220,180,0.06)"
          strokeWidth={CX * 0.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={cableLen}
          strokeDashoffset={strokeOffset(drawProgress * 1.2)}
          transform="translate(-0.3, -0.5)"
        />

        {/* Dimension annotation: width */}
        <g
          opacity={drawProgress > 0.55 ? Math.min(1, (drawProgress - 0.55) * 4) : 0}
          style={{ transition: "opacity 0.4s ease-out" }}
        >
          <line
            x1={PAD}
            y1={H - PAD + 16}
            x2={PAD + INNER_W}
            y2={H - PAD + 16}
            stroke="rgba(180,165,140,0.22)"
            strokeWidth="0.5"
          />
          <line
            x1={PAD}
            y1={H - PAD + 12}
            x2={PAD}
            y2={H - PAD + 20}
            stroke="rgba(180,165,140,0.22)"
            strokeWidth="0.5"
          />
          <line
            x1={PAD + INNER_W}
            y1={H - PAD + 12}
            x2={PAD + INNER_W}
            y2={H - PAD + 20}
            stroke="rgba(180,165,140,0.22)"
            strokeWidth="0.5"
          />
          <text
            x={W / 2}
            y={H - PAD + 28}
            textAnchor="middle"
            fill="rgba(180,165,140,0.28)"
            fontSize="7"
            fontFamily="var(--font-sans)"
            letterSpacing="0.08em"
          >
            4200mm
          </text>
        </g>

        {/* Dimension annotation: height */}
        <g
          opacity={drawProgress > 0.6 ? Math.min(1, (drawProgress - 0.6) * 4) : 0}
          style={{ transition: "opacity 0.4s ease-out" }}
        >
          <line
            x1={W - PAD + 16}
            y1={PAD}
            x2={W - PAD + 16}
            y2={PAD + INNER_H}
            stroke="rgba(180,165,140,0.22)"
            strokeWidth="0.5"
          />
          <line
            x1={W - PAD + 12}
            y1={PAD}
            x2={W - PAD + 20}
            y2={PAD}
            stroke="rgba(180,165,140,0.22)"
            strokeWidth="0.5"
          />
          <line
            x1={W - PAD + 12}
            y1={PAD + INNER_H}
            x2={W - PAD + 20}
            y2={PAD + INNER_H}
            stroke="rgba(180,165,140,0.22)"
            strokeWidth="0.5"
          />
          <text
            x={W - PAD + 24}
            y={H / 2 + 3}
            fill="rgba(180,165,140,0.28)"
            fontSize="7"
            fontFamily="var(--font-sans)"
            letterSpacing="0.08em"
          >
            3150mm
          </text>
        </g>

        {/* Cable pitch annotation */}
        <g
          opacity={drawProgress > 0.65 ? Math.min(1, (drawProgress - 0.65) * 4) : 0}
          style={{ transition: "opacity 0.4s ease-out" }}
        >
          <line
            x1={PAD + 28}
            y1={PAD + CABLE_SG}
            x2={PAD + 28}
            y2={PAD + CABLE_SG * 2}
            stroke="rgba(193,101,46,0.2)"
            strokeWidth="0.5"
          />
          <line
            x1={PAD + 24}
            y1={PAD + CABLE_SG}
            x2={PAD + 32}
            y2={PAD + CABLE_SG}
            stroke="rgba(193,101,46,0.2)"
            strokeWidth="0.5"
          />
          <line
            x1={PAD + 24}
            y1={PAD + CABLE_SG * 2}
            x2={PAD + 32}
            y2={PAD + CABLE_SG * 2}
            stroke="rgba(193,101,46,0.2)"
            strokeWidth="0.5"
          />
          <text
            x={PAD + 36}
            y={PAD + CABLE_SG * 1.5 + 2}
            fill="rgba(193,101,46,0.35)"
            fontSize="6.5"
            fontFamily="var(--font-sans)"
            letterSpacing="0.06em"
          >
            75mm
          </text>
        </g>

        {/* Room label */}
        <text
          x={PAD + INNER_W / 2}
          y={PAD + 18}
          textAnchor="middle"
          fill="rgba(180,165,140,0.18)"
          fontSize="7.5"
          fontFamily="var(--font-sans)"
          letterSpacing="0.22em"
          opacity={drawProgress > 0.35 ? 1 : 0}
          style={{ transition: "opacity 0.5s ease-out" }}
        >
          LIVING ROOM / 01
        </text>

        {/* Area label */}
        <text
          x={PAD + INNER_W / 2}
          y={H - PAD - 10}
          textAnchor="middle"
          fill="rgba(180,165,140,0.15)"
          fontSize="6.5"
          fontFamily="var(--font-sans)"
          letterSpacing="0.15em"
          opacity={drawProgress > 0.5 ? 1 : 0}
          style={{ transition: "opacity 0.5s ease-out" }}
        >
          13.23 m² — 2646 W
        </text>
      </svg>
    </div>
  );
}
