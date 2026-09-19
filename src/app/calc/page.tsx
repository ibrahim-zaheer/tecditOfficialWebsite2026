import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";

const siteUrl = "https://www.tecdit.com";
const pageUrl = `${siteUrl}/calc`;
const pageTitle = "Free Online Tools & Calculators";
const pageDescription =
  "Free, browser-based calculators from TecDit. No sign-up, no downloads, just fast, accurate tools you can use instantly.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    siteName: "TecDit",
    title: `${pageTitle} | TecDit`,
    description: pageDescription,
    images: ["/logo.jpeg"],
  },
  twitter: {
    card: "summary",
    title: `${pageTitle} | TecDit`,
    description: pageDescription,
    images: ["/logo.jpeg"],
  },
};

const tools = [
  {
    name: "Body Surface Area (BSA) Calculator",
    description:
      "Calculate body surface area using 9 formulas, including Mosteller, Du Bois, and Haycock, with metric and imperial unit support.",
    href: "/calc/body-surface-area-calculator",
    icon: Ruler,
  },
];

export default function ToolsHubPage() {
  // Names below must match the visible breadcrumb trail exactly (see <nav aria-label="Breadcrumb"> below).
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tools", item: pageUrl },
    ],
  };

  return (
    <div className="pt-28 pb-24 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Container className="max-w-3xl">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-400">
            <li className="flex items-center gap-1.5">
              <Link href="/" className="transition-colors hover:text-brand-600">
                Home
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </li>
            <li aria-current="page" className="font-medium text-ink-900">
              Tools
            </li>
          </ol>
        </nav>

        <h1 className="font-display mt-6 text-balance text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
          Free Online Tools
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-500">
          A growing collection of free, browser-based calculators built by
          TecDit. No sign-up, no downloads, just fast, accurate tools you can
          use instantly.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-white p-6 transition-colors hover:border-brand-200 hover:bg-muted"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <tool.icon className="size-5" />
                </span>
                <div>
                  <h2 className="font-display text-base font-semibold text-ink-900">
                    {tool.name}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">
                    {tool.description}
                  </p>
                </div>
              </div>
              <ArrowRight className="size-5 shrink-0 text-ink-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-600" />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
