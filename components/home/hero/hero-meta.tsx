/**
 * Small editorial metadata elements for the hero composition.
 *
 * These appear in corners and edges of the viewport —
 * tiny, uppercase, tracked, low-contrast text that adds
 * architectural context without competing with the headline.
 *
 * "Like annotations on an architect's drawing."
 */

interface HeroMetaProps {
  /** 0–1 overall opacity drive */
  opacity?: number;
  className?: string;
}

export function HeroMeta({ opacity = 1, className = "" }: HeroMetaProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 ${className}`}
      style={{ opacity }}
    >
      {/* Top-left: system identifier */}
      <div className="absolute left-6 top-24 md:left-10 md:top-28">
        <p className="font-sans text-[9px] tracking-[0.28em] text-white/25 uppercase md:text-[10px]">
          ELECTRIC UNDERFLOOR HEATING
        </p>
        <p className="mt-1 font-sans text-[9px] tracking-[0.22em] text-white/18 uppercase md:text-[10px]">
          SYSTEM / 01
        </p>
      </div>

      {/* Top-right: brand region */}
      <div className="right-6 top-24 text-right md:right-10 md:top-28">
        <p className="font-sans text-[9px] tracking-[0.22em] text-white/25 uppercase md:text-[10px]">
          DESIGNED FOR INTERIORS
        </p>
        <p className="mt-1 font-sans text-[9px] tracking-[0.15em] text-white/18 uppercase md:text-[10px]">
          SRINAGAR / INDIA
        </p>
      </div>

      {/* Bottom-left: output specification */}
      <div className="absolute bottom-28 left-6 md:bottom-32 md:left-10">
        <p className="font-sans text-[9px] tracking-[0.2em] text-white/18 uppercase md:text-[10px]">
          OUTPUT
        </p>
        <p className="mt-1 font-display text-lg text-copper-500/45 md:text-xl">
          200
          <span className="font-sans text-[9px] tracking-[0.15em] text-white/20">
            {" "}W/m²
          </span>
        </p>
      </div>

      {/* Bottom-right: thickness callout */}
      <div className="bottom-28 right-6 text-right md:bottom-32 md:right-10">
        <p className="font-sans text-[9px] tracking-[0.2em] text-white/18 uppercase md:text-[10px]">
          THICKNESS
        </p>
        <p className="mt-1 font-display text-lg text-white/30 md:text-xl">
          3
          <span className="font-sans text-[9px] tracking-[0.15em] text-white/20">
            {" "}mm
          </span>
        </p>
      </div>
    </div>
  );
}
