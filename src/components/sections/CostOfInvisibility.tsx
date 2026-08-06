import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CostOfInvisibility() {
  return (
    <section id="why-it-matters" className="bg-muted py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why It Matters"
          title="The Cost of Being Invisible"
          description="Right now, someone in your area is searching for exactly what you offer, and finding your competitor instead. Not because they're better. Because they're the one Google shows up. Every missed search is a missed job, a missed booking: money that was already looking for you, going somewhere else. We build websites that put you in front of that search, so the customers already looking for your business can actually find it."
        />
      </Container>
    </section>
  );
}
