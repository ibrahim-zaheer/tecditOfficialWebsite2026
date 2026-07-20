"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BrowserMockup } from "@/components/ui/DeviceMockup";
import { Reveal } from "@/components/ui/Reveal";
import { Project } from "@/lib/types";

export function ProjectGridCard({
  project,
  onView,
  delay = 0,
}: {
  project: Project;
  onView: (project: Project) => void;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <button
        type="button"
        onClick={() => onView(project)}
        className="group block w-full text-left"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <BrowserMockup
            gradient={project.gradient}
            image={project.screenshots.desktop}
            alt={`${project.name} desktop preview`}
            className="w-full transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_36px_60px_-24px_rgba(15,20,35,0.4)]"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge variant="brand">{project.category}</Badge>
          {project.status === "concept" && <Badge variant="neutral">Concept Project</Badge>}
        </div>

        <h3 className="font-display mt-3 text-lg font-semibold text-ink-900">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">
          {project.summary}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          {project.ctaLabel}
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </button>
    </Reveal>
  );
}
