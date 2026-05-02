"use client";

import { FullscreenOverlay } from "@/components/common/FullScreenOverlay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDomainIcons from "@/hooks/logic/useDomainIcons";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ProjectType } from "@/types/common";
import { ProjectTypeEnum } from "@/types/enums";
import { ExternalLink } from "lucide-react";
import { FC, useState } from "react";
import { TechChip, TypeBadge, YearChip } from "./ProjectBadges";
import ProjectDetailsOverlay from "./ProjectDetailsOverlay";

interface ProjectCardProps {
  project: ProjectType;
  className?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, className }) => {
  // Destructure non-details fields
  const { title, type, link, year, details } = project;
  const domainIcons = useDomainIcons();
  const briefPreview = details?.brief
    ?.split("\n")
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith("- "));
  const [overlayOpen, setOverlayOpen] = useState(false);
  const closeOverlay = () => setOverlayOpen(false);
  const openOverlay = () => {
    setOverlayOpen(true);
    trackEvent(AnalyticsEvent.ProjectOpen, {
      projectTitle: title,
      projectType: type.value,
      projectYear: year,
    });
  };

  return (
    <>
      <Card
        onClick={openOverlay}
        className={cn(
          "group relative isolate h-full cursor-pointer overflow-hidden border border-border/60 bg-card text-card-foreground transition-colors duration-200 focus-visible:outline-none flex flex-col",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, color-mix(in srgb, var(--color-background) 68%, transparent), transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200 group-hover:opacity-70 dark:hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 65%, color-mix(in oklch, var(--color-primary) 18%, white), transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 hidden opacity-0 transition-opacity duration-200 dark:block dark:group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 65%, color-mix(in srgb, var(--color-primary) 15%, transparent), transparent 70%)",
          }}
        />
        <CardHeader className="relative z-10 flex-1 pb-3">
          <div className="flex items-start justify-between gap-2 mb-3">
            <CardTitle className="text-lg font-bold line-clamp-1 flex-1">
              {title}
            </CardTitle>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors shrink-0"
                onClick={(e) => e.stopPropagation()}
                title="Visit project"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-3">
            <TypeBadge
              label={type.label}
              icon={domainIcons[type.value as ProjectTypeEnum]}
            />
            <YearChip year={year} />
          </div>

          {briefPreview && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {briefPreview}
            </p>
          )}
        </CardHeader>

        <CardContent className="relative z-10 pt-0 pb-4">
          {/* Tech Stack Chips */}
          {details?.techs && details.techs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {details.techs.slice(0, 4).map((tech) => (
                <TechChip key={tech.value} label={tech.label} />
              ))}
              {details.techs.length > 4 && (
                <div className="inline-flex items-center justify-center bg-muted/50 dark:bg-muted/30 text-muted-foreground px-2.5 py-1 rounded-md text-xs font-medium border border-border/50">
                  +{details.techs.length - 4}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {overlayOpen && (
        <FullscreenOverlay onClose={closeOverlay}>
          <ProjectDetailsOverlay project={project} onClose={closeOverlay} />
        </FullscreenOverlay>
      )}
    </>
  );
};

export default ProjectCard;
