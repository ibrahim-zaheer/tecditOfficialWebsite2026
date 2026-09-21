import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { calcTools } from "@/data/calcTools";

export function RelatedTools({ currentHref }: { currentHref: string }) {
  const others = calcTools.filter((tool) => tool.href !== currentHref);
  if (others.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="related-tools-heading">
      <h2
        id="related-tools-heading"
        className="font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl"
      >
        More free tools
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {others.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-white p-5 transition-colors hover:border-brand-200 hover:bg-muted"
          >
            <div className="flex items-start gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <tool.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink-900">
                  {tool.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">
                  {tool.description}
                </p>
              </div>
            </div>
            <ArrowRight className="size-5 shrink-0 text-ink-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-600" />
          </Link>
        ))}
      </div>
    </section>
  );
}
