import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { pricingTiers, carePlan } from "@/data/pricing";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple Packages, No Surprises"
          description="Clear starting prices so you know what to expect. Every project starts with a free call to make sure you get exactly what your business needs."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-start">
          {pricingTiers.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.08}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-8",
                  tier.featured
                    ? "border-brand-600 bg-ink-900 text-white shadow-[0_30px_60px_-24px_rgba(11,14,23,0.5)] lg:scale-[1.03]"
                    : "border-border bg-white"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={cn(
                      "font-display text-xl font-semibold",
                      tier.featured ? "text-white" : "text-ink-900"
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.featured && <Badge variant="dark">Most Popular</Badge>}
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span
                    className={cn(
                      "font-display text-4xl font-semibold",
                      tier.featured ? "text-white" : "text-ink-900"
                    )}
                  >
                    {tier.price}
                  </span>
                  {tier.cadence && (
                    <span className={tier.featured ? "text-white/60" : "text-ink-400"}>
                      /{tier.cadence}
                    </span>
                  )}
                </div>

                <p
                  className={cn(
                    "mt-4 text-sm leading-relaxed",
                    tier.featured ? "text-white/70" : "text-ink-500"
                  )}
                >
                  {tier.description}
                </p>

                <ul className="mt-7 flex flex-1 flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-start gap-2.5 text-sm",
                        tier.featured ? "text-white/85" : "text-ink-500"
                      )}
                    >
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          tier.featured ? "text-brand-300" : "text-brand-500"
                        )}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href="/#book-a-call"
                  size="lg"
                  variant={tier.featured ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {tier.ctaLabel}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-muted p-6 sm:flex-row">
            <div>
              <h4 className="font-display text-base font-semibold text-ink-900">
                {carePlan.name} — {carePlan.price}
              </h4>
              <p className="mt-1 text-sm text-ink-500">{carePlan.description}</p>
            </div>
            <Button href="/#book-a-call" variant="secondary">
              Ask About Care Plans
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
