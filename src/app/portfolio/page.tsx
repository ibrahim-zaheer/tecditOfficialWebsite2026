import type { Metadata } from "next";
import { PortfolioExplorer } from "@/components/portfolio/PortfolioExplorer";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse TecDit's website projects for local businesses, filterable by industry.",
};

export default function PortfolioPage() {
  return <PortfolioExplorer />;
}
