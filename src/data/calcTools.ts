import { Activity, Ruler, type LucideIcon } from "lucide-react";

export interface CalcTool {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export const calcTools: CalcTool[] = [
  {
    name: "Body Surface Area (BSA) Calculator",
    description:
      "Calculate body surface area using 9 formulas, including Mosteller, Du Bois, and Haycock, with metric and imperial unit support.",
    href: "/calc/body-surface-area-calculator",
    icon: Ruler,
  },
  {
    name: "US Navy Body Fat Calculator",
    description:
      "Estimate body fat percentage from tape measurements using the US Navy method, with standards and category charts for men and women.",
    href: "/calc/navy-body-fat-calculator",
    icon: Activity,
  },
];
