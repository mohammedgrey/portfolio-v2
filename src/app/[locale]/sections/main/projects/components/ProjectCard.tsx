"use client";

import { CalendarIcon, LinkIcon } from "@/assets/icons";
import { FullscreenOverlay } from "@/components/common/FullScreenOverlay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ProjectType } from "@/types/common";
import { FC, useState } from "react";
import ProjectDetailsOverlay from "./ProjectDetailsOverlay";

interface ProjectCardProps {
  project: ProjectType;
  className?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, className }) => {
  // Destructure non-details fields
  const { title, type, link, year } = project;
  const [overlayOpen, setOverlayOpen] = useState(false);
  const closeOverlay = () => setOverlayOpen(false);
  const openOverlay = () => setOverlayOpen(true);

  return (
    <>
      <Card
        onClick={openOverlay}
        className={cn(
          "cursor-pointer shadow-none transition-transform duration-200 bg-card text-card-foreground border border-border relative overflow-hidden",
          className
        )}
      >
        <CardHeader className="flex flex-row items-center gap-4 border-b border-border/60 pb-4">
          {/* Optionally, add an image preview here if desired */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              {title}
              <span className="ml-2 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {type}
              </span>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <CalendarIcon className="w-4 h-4 opacity-70" />
              <span>{year}</span>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 flex items-center gap-1 text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LinkIcon className="w-4 h-4" />
                  Visit
                </a>
              )}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-2">
          {/* Optionally, add a short summary or icons here */}
          {/* Could add a tech stack preview, or a star icon, etc. */}
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
