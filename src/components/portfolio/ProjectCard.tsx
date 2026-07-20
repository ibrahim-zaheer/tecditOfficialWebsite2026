"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BrowserMockup, PhoneMockup } from "@/components/ui/DeviceMockup";
import { Reveal } from "@/components/ui/Reveal";
import { Project } from "@/lib/types";

export function ProjectCard({
  project,
  onView,
  delay = 0,
  reverse = false,
}: {
  project: Project;
  onView: (project: Project) => void;
  delay?: number;
  reverse?: boolean;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group grid items-center gap-10 rounded-3xl border border-border bg-white p-6 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(15,20,35,0.25)] sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10">
        <div
          className={
            reverse ? "relative order-1 lg:order-2" : "relative order-1"
          }
        >
          <button
            type="button"
            onClick={() => onView(project)}
            className="relative block w-full text-left"
            aria-label={`View ${project.name} project details`}
          >
            <BrowserMockup
              gradient={project.gradient}
              image={project.screenshots.desktop}
              alt={`${project.name} desktop preview`}
              className="w-full transition-transform duration-500 ease-out group-hover:-translate-y-1"
            />
            <div className="absolute -bottom-8 -right-4 w-24 sm:-right-6 sm:w-28">
              <PhoneMockup
                gradient={project.gradient}
                image={project.screenshots.mobile}
                alt={`${project.name} mobile preview`}
              />
            </div>
          </button>
        </div>

        <div className={reverse ? "order-2 lg:order-1" : "order-2"}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand">{project.category}</Badge>
            {project.status === "concept" && (
              <Badge variant="neutral">Concept Project</Badge>
            )}
          </div>

          <h3 className="font-display mt-4 text-2xl font-semibold text-ink-900">
            {project.name}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-ink-500">
            {project.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-ink-500"
              >
                {highlight}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onView(project)}
            className="group/btn mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600"
          >
            {project.ctaLabel}
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </Reveal>
  );
}
