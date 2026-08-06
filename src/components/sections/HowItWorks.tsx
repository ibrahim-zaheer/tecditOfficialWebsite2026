import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { processSteps } from "@/data/process";
import { CAL_LINK } from "@/lib/cal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From Free Call to Live Website"
          description="A simple, guided process, so you always know what's happening next."
        />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-border lg:block" />

          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div className="relative flex flex-col">
                <div className="relative z-10 flex size-12 items-center justify-center rounded-full border border-brand-600 bg-white font-display text-sm font-semibold text-brand-600">
                  {step.number}
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 flex justify-center">
            <Button calLink={CAL_LINK} size="lg" showArrow>
              Book a Free Call
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
