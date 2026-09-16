import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variant === "default" && "bg-charcoal-900 text-white",
        variant === "secondary" && "bg-ivory-200 text-charcoal-700",
        variant === "outline" && "border border-charcoal-200 text-charcoal-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
