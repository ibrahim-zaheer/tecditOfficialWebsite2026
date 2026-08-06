"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectModal } from "@/components/portfolio/ProjectModal";
import { projects } from "@/data/projects";
import { Project } from "@/lib/types";

export function FeaturedWork() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our Work"
          title="Websites Built to Grow Local Businesses"
          description="We create high-performing websites that don't just look great. They help local businesses attract customers, build trust, and generate more leads. Every project is designed with performance, user experience, getting found by local customers, and conversions in mind."
        />

        <div className="mt-16 flex flex-col gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onView={setSelected}
              delay={index * 0.08}
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button href="/portfolio" variant="secondary" size="lg" showArrow>
            View All Projects
          </Button>
        </div>
      </Container>

      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
        onSelect={setSelected}
      />
    </section>
  );
}
