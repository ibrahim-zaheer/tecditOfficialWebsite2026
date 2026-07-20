import { Check, Globe, Bot, Megaphone, CreditCard } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";

const icons = [Globe, Bot, Megaphone, CreditCard];

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="One Agency, Built to Grow With Your Business"
          description="We're starting with what local businesses need most: a website that brings in customers. AI Agents, Marketing, and POS are coming next as part of the same platform."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = icons[index];
            const isAvailable = service.status === "available";

            return (
              <Reveal key={service.name} delay={index * 0.06}>
                <div
                  className={
                    isAvailable
                      ? "flex h-full flex-col rounded-2xl border border-brand-600 bg-ink-900 p-7 text-white shadow-[0_24px_48px_-24px_rgba(11,14,23,0.5)]"
                      : "flex h-full flex-col rounded-2xl border border-border bg-muted p-7"
                  }
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={
                        isAvailable
                          ? "flex size-11 items-center justify-center rounded-xl bg-white/10"
                          : "flex size-11 items-center justify-center rounded-xl bg-white"
                      }
                    >
                      <Icon
                        className={isAvailable ? "size-5 text-white" : "size-5 text-brand-600"}
                      />
                    </div>
                    <Badge variant={isAvailable ? "dark" : "neutral"}>
                      {isAvailable ? "Available Now" : "Coming Soon"}
                    </Badge>
                  </div>

                  <h3
                    className={
                      isAvailable
                        ? "font-display mt-5 text-xl font-semibold text-white"
                        : "font-display mt-5 text-xl font-semibold text-ink-900"
                    }
                  >
                    {service.name}
                  </h3>
                  <p
                    className={
                      isAvailable
                        ? "mt-3 text-sm leading-relaxed text-white/70"
                        : "mt-3 text-sm leading-relaxed text-ink-500"
                    }
                  >
                    {service.description}
                  </p>

                  <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className={
                          isAvailable
                            ? "flex items-start gap-2 text-sm text-white/80"
                            : "flex items-start gap-2 text-sm text-ink-500"
                        }
                      >
                        <Check
                          className={
                            isAvailable
                              ? "mt-0.5 size-4 shrink-0 text-brand-300"
                              : "mt-0.5 size-4 shrink-0 text-brand-500"
                          }
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {isAvailable && (
                    <Button href="/#pricing" variant="secondary" className="mt-7 !bg-white">
                      See Pricing
                    </Button>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
