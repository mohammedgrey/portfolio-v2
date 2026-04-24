import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { ExternalLink, FileText, Github, Smartphone } from "lucide-react";
import { FC } from "react";

import useDomainIcons from "@/hooks/logic/useDomainIcons";
import { ProjectType } from "@/types/common";
import { ProjectTypeEnum } from "@/types/enums";
import { TechChip, TypeBadge, YearChip } from "./ProjectBadges";

interface ProjectDetailsOverlayProps {
  project: ProjectType;
  onClose: () => void;
}

const ProjectDetailsOverlay: FC<ProjectDetailsOverlayProps> = ({ project }) => {
  const { title, details, year, type, link } = project;
  const domainIcons = useDomainIcons();
  const briefLines = details?.brief
    ? details.brief
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];
  const briefIntro = briefLines.find((line) => !line.startsWith("- "));
  const briefBullets = briefLines
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2));

  return (
    <div className="w-full max-h-[calc(100dvh-env(safe-area-inset-top)-4rem)] overflow-y-auto">
      <div className="mx-auto flex min-h-[calc(100dvh-env(safe-area-inset-top)-4rem)] w-full max-w-2xl items-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="relative w-full flex flex-col gap-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold mb-2">
                  {title}
                </CardTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  <TypeBadge
                    label={type.label}
                    icon={domainIcons[type.value as ProjectTypeEnum]}
                  />
                  <YearChip year={year} />
                </div>
              </div>
              {link && (
                <Button
                  size="sm"
                  className="shrink-0 gap-2"
                  onClick={() =>
                    window.open(link, "_blank", "noopener,noreferrer")
                  }
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Project
                </Button>
              )}
            </div>
          </div>

          {details?.brief && (
            <div className="text-base text-foreground/90 dark:text-foreground/80 font-medium bg-muted/50 dark:bg-muted/30 rounded-lg px-4 py-3 border border-border/50">
              {briefIntro && <p>{briefIntro}</p>}
              {briefBullets.length > 0 && (
                <ul className="mt-2 list-disc ps-5 space-y-1">
                  {briefBullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {details?.techs && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {details.techs.map((tech) => (
                  <TechChip key={tech.value} label={tech.label} />
                ))}
              </div>
            </div>
          )}

          {/* Render links, PDFs, git, etc. */}
          {(details?.PDF ||
            details?.client ||
            details?.android ||
            details?.ios ||
            details?.extension ||
            details?.API ||
            details?.git) && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Links & Resources
              </h3>
              <div className="flex flex-wrap gap-2">
                {details?.PDF && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2"
                    onClick={() =>
                      window.open(details.PDF, "_blank", "noopener,noreferrer")
                    }
                  >
                    <FileText className="w-4 h-4" />
                    PDF
                  </Button>
                )}
                {details?.client && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2"
                    onClick={() =>
                      window.open(
                        details.client,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <ExternalLink className="w-4 h-4" />
                    Client
                  </Button>
                )}
                {details?.android && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2"
                    onClick={() =>
                      window.open(
                        details.android,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <Smartphone className="w-4 h-4" />
                    Android
                  </Button>
                )}
                {details?.ios && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2"
                    onClick={() =>
                      window.open(details.ios, "_blank", "noopener,noreferrer")
                    }
                  >
                    <Smartphone className="w-4 h-4" />
                    iOS
                  </Button>
                )}
                {details?.extension && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2"
                    onClick={() =>
                      window.open(
                        details.extension,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <ExternalLink className="w-4 h-4" />
                    Extension
                  </Button>
                )}
                {details?.API && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start gap-2"
                    onClick={() =>
                      window.open(details.API, "_blank", "noopener,noreferrer")
                    }
                  >
                    <ExternalLink className="w-4 h-4" />
                    API
                  </Button>
                )}
                {details?.git &&
                  Object.entries(details.git).map(
                    ([key, url]: [string, string]) => (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        className="justify-start gap-2"
                        onClick={() =>
                          window.open(url, "_blank", "noopener,noreferrer")
                        }
                      >
                        <Github className="w-4 h-4" />
                        {key === "both" ? "Git" : `Git (${key})`}
                      </Button>
                    ),
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsOverlay;
