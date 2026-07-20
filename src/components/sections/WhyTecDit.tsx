import { MapPin, TrendingUp, MessageSquare, Handshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { differentiators } from "@/data/process";

const icons = [MapPin, TrendingUp, MessageSquare, Handshake];

export function WhyTecDit() {
  return (
    <section id="why-tecdit" className="bg-muted py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why TecDit"
          title="A Website Partner That Actually Gets Local Business"
          description="You don't need a technical dictionary or a marketing degree to work with us — just a business you're proud of and customers you want to reach."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {differentiators.map((item, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="flex h-full gap-5 rounded-2xl border border-border bg-white p-7">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                    <Icon className="size-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
