import AppSection from "@/components/common/AppSection";
import { FC } from "react";

import getProjects from "@/hooks/data/getProjects";
import ProjectsGrid from "./components/ProjectsGrid";

const ProjectsSection: FC = async () => {
  const { projects } = await getProjects();

  return (
    <AppSection id="projects" className="py-12">
      <AppSection.Title className="mb-10">Projects</AppSection.Title>
      <ProjectsGrid projects={projects} initialCount={3} />
    </AppSection>
  );
};

export default ProjectsSection;
