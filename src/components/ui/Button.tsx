import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(33,69,224,0.55)] hover:bg-brand-700",
  secondary:
    "bg-white text-ink-900 border border-border hover:border-ink-900/30 hover:bg-muted",
  ghost: "text-ink-900 hover:text-brand-600",
};

const sizeStyles: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  showArrow?: boolean;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  onClick?: () => void;
}

interface ClickButtonProps extends BaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
}

interface CalButtonProps extends BaseProps {
  href?: never;
  onClick?: () => void;
  calLink: string;
  calNamespace?: string;
  calConfig?: Record<string, string>;
}

type ButtonProps = LinkButtonProps | ClickButtonProps | CalButtonProps;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  showArrow = false,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out active:scale-[0.98] whitespace-nowrap",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if ("calLink" in props && props.calLink) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        data-cal-namespace={props.calNamespace ?? "15min"}
        data-cal-link={props.calLink}
        data-cal-config={JSON.stringify(props.calConfig ?? { layout: "month_view" })}
        className={cn(classes, "group")}
      >
        {content}
      </button>
    );
  }

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} onClick={props.onClick} className={cn(classes, "group")}>
        {content}
      </Link>
    );
  }

  const { onClick, type = "button" } = props as ClickButtonProps;

  return (
    <button type={type} onClick={onClick} className={cn(classes, "group")}>
      {content}
    </button>
  );
}
