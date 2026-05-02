"use client";

import { Button } from "@/components/ui/button";
import { useProjectsFilter } from "@/hooks/logic/useProjectsFilter";
import { useAppTranslations } from "@/i18n";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ProjectType } from "@/types/common";
import { SearchX } from "lucide-react";
import { FC, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectsFilters from "./ProjectsFilters";

interface ProjectsGridProps {
  projects: ProjectType[];
  initialCount?: number;
}

const ProjectsGrid: FC<ProjectsGridProps> = ({
  projects,
  initialCount = 6,
}) => {
  const t = useAppTranslations("HomePage");
  const [showAll, setShowAll] = useState(false);
  const {
    filteredProjects,
    resetFilters,
    hasActiveFilters,
    ...projectFilterProps
  } = useProjectsFilter(projects);

  const hasNoProjects = filteredProjects.length === 0;
  const hasMoreProjects = filteredProjects.length > initialCount;
  const isCollapsed = !showAll && hasMoreProjects;

  const handleEmailDirectly = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      const firstNameInput = document.querySelector<HTMLInputElement>(
        "#contact input#name",
      );
      firstNameInput?.focus();
    }, 450);
  };

  const handleAskAiAssistant = () => {
    const heroSection = document.getElementById("hero");
    heroSection?.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      window.dispatchEvent(new Event("open-ai-assistant"));
    }, 350);
  };

  return (
    <>
      <ProjectsFilters {...projectFilterProps} />
      {hasNoProjects ? (
        <div className="rounded-xl border border-border/70 bg-card/60 p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <SearchX className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            {t("projects.empty.title")}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {t("projects.empty.message")}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                resetFilters();
                setShowAll(false);
              }}
              disabled={!hasActiveFilters}
            >
              {t("projects.empty.resetFilters")}
            </Button>
            <Button variant="outline" onClick={handleEmailDirectly}>
              {t("projects.empty.emailMeDirectly")}
            </Button>
            <Button onClick={handleAskAiAssistant}>
              {t("projects.empty.askAiAssistant")}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative overflow-hidden transition-[max-height] duration-500",
            isCollapsed && "max-h-320 sm:max-h-248 lg:max-h-168",
          )}
          style={
            isCollapsed
              ? {
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
                }
              : undefined
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      )}
      {!hasNoProjects && hasMoreProjects && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => {
              setShowAll((prev) => {
                trackEvent(AnalyticsEvent.ProjectsShowMoreClick, {
                  direction: prev ? "less" : "more",
                  totalProjects: filteredProjects.length,
                });
                return !prev;
              });
            }}
          >
            {showAll ? t("projects.showLess") : t("projects.showMore")}
          </Button>
        </div>
      )}
    </>
  );
};

export default ProjectsGrid;
