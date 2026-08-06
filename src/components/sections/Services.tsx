import { Check, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { service } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                What We Do
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-5 flex size-11 items-center justify-center rounded-xl bg-brand-50">
                <Globe className="size-5 text-brand-600" />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-5 text-balance text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
                One Thing. Done Exceptionally Well.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-lg text-balance text-base leading-relaxed text-ink-500 sm:text-lg">
                A great website is the foundation everything else depends
                on: more calls, more bookings, more customers. That&apos;s
                the one thing we focus on, and we do it end to end: design,
                build, and launch.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <Button href="/#pricing" variant="secondary" size="lg" className="mt-8">
                See Pricing
              </Button>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {service.points.map((point, index) => (
              <Reveal key={point} delay={0.06 + index * 0.06}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-white p-5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50">
                    <Check className="size-4 text-brand-600" />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-700">
                    {point}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
