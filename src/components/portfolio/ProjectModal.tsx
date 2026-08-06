"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Target,
  Palette,
  Sparkles,
  Search,
  MousePointerClick,
  Wrench,
} from "lucide-react";
import { BrowserMockup, PhoneMockup } from "@/components/ui/DeviceMockup";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Project } from "@/lib/types";
import { getAdjacentProjects } from "@/data/projects";
import { CAL_LINK } from "@/lib/cal";

export function ProjectModal({
  project,
  onClose,
  onSelect,
}: {
  project: Project | null;
  onClose: () => void;
  onSelect: (project: Project) => void;
}) {
  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  const adjacent = project ? getAdjacentProjects(project.slug) : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink-900/60 px-4 py-8 backdrop-blur-sm sm:py-14"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} project details`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 z-20 flex size-9 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-md transition-colors hover:bg-white"
            >
              <X className="size-4.5" />
            </button>

            <div
              className="relative flex flex-col justify-end gap-4 overflow-hidden px-8 pb-10 pt-14 sm:px-12"
              style={{
                background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
              }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="dark">{project.category}</Badge>
                {project.status === "concept" && (
                  <Badge variant="dark">Concept Project</Badge>
                )}
              </div>
              <h2 className="font-display max-w-lg text-3xl font-semibold text-white sm:text-4xl">
                {project.name}
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                {project.summary}
              </p>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-8 py-10 sm:px-12">
              <div className="grid gap-6 sm:grid-cols-[1.4fr_1fr]">
                <BrowserMockup
                  gradient={project.gradient}
                  image={project.screenshots.desktop}
                  alt={`${project.name} desktop preview`}
                  className="w-full"
                  priority
                />
                <div className="mx-auto w-full max-w-[220px] sm:mx-0">
                  <PhoneMockup
                    gradient={project.gradient}
                    image={project.screenshots.mobile}
                    alt={`${project.name} mobile preview`}
                    className="w-full"
                  />
                </div>
              </div>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600"
              >
                Visit Live Site
                <ArrowRight className="size-4" />
              </a>

              <div className="mt-12 grid gap-10 sm:grid-cols-2">
                <DetailBlock icon={Target} title="Business Goals">
                  <ul className="flex flex-col gap-2">
                    {project.goals.map((goal) => (
                      <li key={goal} className="text-sm text-ink-500">
                        • {goal}
                      </li>
                    ))}
                  </ul>
                </DetailBlock>

                <DetailBlock icon={Wrench} title="Key Features">
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-ink-500"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </DetailBlock>

                <DetailBlock icon={Sparkles} title="Design Approach">
                  <p className="text-sm leading-relaxed text-ink-500">
                    {project.designApproach}
                  </p>
                </DetailBlock>

                <DetailBlock icon={Palette} title="Brand & Color Palette">
                  <div className="flex flex-wrap items-center gap-2">
                    {project.palette.map((color) => (
                      <span
                        key={color}
                        className="size-8 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-ink-500">
                    Typography: <span className="font-medium text-ink-700">{project.typography.heading}</span> for
                    headings, <span className="font-medium text-ink-700">{project.typography.body}</span> for body text.
                  </p>
                </DetailBlock>

                <DetailBlock icon={MousePointerClick} title="UX Highlights">
                  <ul className="flex flex-col gap-2">
                    {project.uxHighlights.map((point) => (
                      <li key={point} className="text-sm text-ink-500">
                        • {point}
                      </li>
                    ))}
                  </ul>
                </DetailBlock>

                <DetailBlock icon={Search} title="SEO Strategy">
                  <ul className="flex flex-col gap-2">
                    {project.seoStrategy.map((point) => (
                      <li key={point} className="text-sm text-ink-500">
                        • {point}
                      </li>
                    ))}
                  </ul>
                </DetailBlock>
              </div>

              <DetailBlock icon={Target} title="Conversion Strategy" className="mt-10">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {project.conversionStrategy.map((point) => (
                    <li key={point} className="text-sm text-ink-500">
                      • {point}
                    </li>
                  ))}
                </ul>
              </DetailBlock>

              <div className="mt-10 border-t border-border pt-8">
                <h3 className="text-sm font-semibold text-ink-900">Technologies Used</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-muted p-6">
                <h3 className="text-sm font-semibold text-ink-900">Business Outcome</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{project.outcome}</p>
                {project.status === "concept" && (
                  <p className="mt-3 text-xs text-ink-400">
                    This is a concept project built to demonstrate our approach, not a
                    completed client engagement.
                  </p>
                )}
              </div>

              {adjacent && (
                <div className="mt-10 flex items-center justify-between border-t border-border pt-8">
                  <button
                    type="button"
                    onClick={() => onSelect(adjacent.previous)}
                    className="flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-brand-600"
                  >
                    <ArrowLeft className="size-4" />
                    {adjacent.previous.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelect(adjacent.next)}
                    className="flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-brand-600"
                  >
                    {adjacent.next.name}
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              )}

              <div className="mt-10 flex justify-center">
                <Button calLink={CAL_LINK} size="lg" showArrow onClick={onClose}>
                  Book a Free Call
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailBlock({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-brand-600" />
        <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
