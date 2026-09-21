"use client";

import { cn } from "@/lib/utils";

export function SegmentedToggle<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  ariaLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex rounded-full border border-border bg-muted p-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            value === option.value
              ? "bg-white text-ink-900 shadow-sm"
              : "text-ink-500 hover:text-ink-900"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
