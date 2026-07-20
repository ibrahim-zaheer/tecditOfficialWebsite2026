"use client";

import { useEffect, useState } from "react";
import { BrowserMockup, PhoneMockup } from "@/components/ui/DeviceMockup";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const ROTATE_MS = 4500;

export function HeroShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const project = projects[index];

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <BrowserMockup
        gradient={project.gradient}
        image={project.screenshots.desktop}
        alt={`${project.name} desktop preview`}
        className="w-full"
        priority
      />
      <div className="absolute -bottom-10 -right-6 w-28 sm:-right-10 sm:w-36">
        <PhoneMockup
          gradient={project.gradient}
          image={project.screenshots.mobile}
          alt={`${project.name} mobile preview`}
        />
      </div>

      <div className="mt-16 flex items-center justify-center gap-2 sm:mt-20">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${p.name}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === index ? "w-6 bg-brand-600" : "w-1.5 bg-border hover:bg-ink-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}
