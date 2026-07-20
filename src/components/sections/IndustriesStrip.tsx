import { industryStripItems } from "@/data/industries";

export function IndustriesStrip() {
  const items = [...industryStripItems, ...industryStripItems];

  return (
    <section id="industries" className="border-y border-border bg-muted py-8">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
          Built for local businesses like yours
        </p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-3">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="whitespace-nowrap rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-ink-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
