"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectGridCard } from "@/components/portfolio/ProjectGridCard";
import { ProjectModal } from "@/components/portfolio/ProjectModal";
import { projects } from "@/data/projects";
import { industries } from "@/data/industries";
import { Project, Industry } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: Array<Industry | "All"> = ["All", ...industries];

export function PortfolioExplorer() {
  const [activeFilter, setActiveFilter] = useState<Industry | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const visibleProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.industry === activeFilter),
    [activeFilter]
  );

  return (
    <section className="py-32 sm:py-36">
      <Container>
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              Full Portfolio
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
              Every Project, By Industry
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-ink-500 sm:text-lg">
              Filter by industry to see how we approach websites for
              businesses like yours. As we complete real client work, it will
              be added here alongside our concept projects.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  activeFilter === filter
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-border bg-white text-ink-500 hover:border-ink-900/20 hover:text-ink-900"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-16">
          {visibleProjects.length > 0 ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project, index) => (
                <ProjectGridCard
                  key={project.slug}
                  project={project}
                  onView={setSelected}
                  delay={index * 0.06}
                />
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-border bg-muted px-8 py-16 text-center">
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  More {activeFilter} projects coming soon
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  We&apos;re actively adding case studies for this industry.
                  Book a free call and we&apos;ll show you how we&apos;d
                  approach your website.
                </p>
                <Button href="/#book-a-call" className="mt-6">
                  Book a Free Call
                </Button>
              </div>
            </Reveal>
          )}
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
