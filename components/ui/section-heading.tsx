import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-eyebrow text-copper-500 mb-4">{eyebrow}</p>
      )}
      <h2 className="text-display-md text-charcoal-900">{title}</h2>
      {lead && (
        <p className="text-body-lg text-charcoal-500 mt-4 max-w-xl leading-relaxed">
          {lead}
        </p>
      )}
    </Reveal>
  );
}
