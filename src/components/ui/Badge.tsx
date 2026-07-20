import { cn } from "@/lib/utils";

type BadgeVariant = "brand" | "neutral" | "outline" | "dark";

const variantStyles: Record<BadgeVariant, string> = {
  brand: "bg-brand-50 text-brand-700 border border-brand-100",
  neutral: "bg-muted text-ink-500 border border-border",
  outline: "bg-white/90 text-ink-700 border border-border backdrop-blur",
  dark: "bg-white/10 text-white border border-white/15 backdrop-blur",
};

export function Badge({
  children,
  variant = "brand",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
