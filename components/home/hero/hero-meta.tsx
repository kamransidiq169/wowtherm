

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
      
      </div>

      {/* Top-right: brand region */}
      <div className="right-6 top-24 text-right md:right-10 md:top-28">
    
      </div>

      {/* Bottom-left: output specification */}
      <div className="absolute bottom-28 left-6 md:bottom-32 md:left-10">
       
        
      </div>

      {/* Bottom-right: thickness callout */}
      <div className="bottom-28 right-6 text-right md:bottom-32 md:right-10">
        
       
      </div>
    </div>
  );
}
