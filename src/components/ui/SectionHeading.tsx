import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "font-display text-balance text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]",
            align === "center" ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "text-balance text-base leading-relaxed text-ink-500 sm:text-lg",
              align === "center" ? "max-w-2xl" : "max-w-xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
