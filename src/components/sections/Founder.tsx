import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CAL_LINK } from "@/lib/cal";

export function Founder() {
  return (
    <section id="founder" className="py-24 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Reveal>
            <Image
              src="/founder.png"
              alt="Ibrahim Zaheer, Founder of TecDit"
              width={480}
              height={600}
              className="h-auto w-full rounded-3xl border border-border object-cover"
            />
          </Reveal>
          <div>
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                Who You&apos;ll Be Working With
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
                Ibrahim Zaheer
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-1.5 text-sm font-medium text-brand-600">
                Founder &amp; Lead Developer
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-ink-500 sm:text-lg">
                I&apos;m Ibrahim, and I&apos;m the one who&apos;ll actually
                build your site, not a salesperson who hands you off to a
                team you never meet. I got tired of watching good local
                businesses lose customers to competitors with better
                websites, so I started TecDit to build sites that are fast,
                mobile-first, and designed to bring in calls. When you email
                or call, you&apos;re talking to me.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Button calLink={CAL_LINK} size="lg" showArrow className="mt-8">
                Book a Free Call
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
