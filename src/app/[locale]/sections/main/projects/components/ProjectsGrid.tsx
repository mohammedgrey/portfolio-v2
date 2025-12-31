"use client";

import { Button } from "@/components/ui/button";
import { ProjectType } from "@/types/common";
import { FC, useState } from "react";
import ProjectCard from "./ProjectCard";

interface ProjectsGridProps {
  projects: ProjectType[];
  initialCount?: number;
}

const ProjectsGrid: FC<ProjectsGridProps> = ({
  projects,
  initialCount = 3,
}) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => {
          const isVisible = showAll || idx < initialCount;
          return (
            <div key={project.id} className={isVisible ? "" : "hidden"}>
              <ProjectCard project={project} />
            </div>
          );
        })}
      </div>
      {!showAll && projects.length > initialCount && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={() => setShowAll(true)}>
            Show More
          </Button>
        </div>
      )}
    </>
  );
};

export default ProjectsGrid;
