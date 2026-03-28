import AppSection from "@/components/common/AppSection";
import { getAppTranslations } from "@/i18n";
import { FC } from "react";

import getProjects from "@/hooks/data/getProjects";
import ProjectsGrid from "./components/ProjectsGrid";

const ProjectsSection: FC = async () => {
  const t = await getAppTranslations("HomePage");
  const { projects } = await getProjects();

  return (
    <AppSection id="projects" className="py-12">
      <div className="text-center mb-10">
        <AppSection.Title className="mb-4">
          {t("projects.title")}
        </AppSection.Title>
        <AppSection.Description className="text-lg max-w-2xl mx-auto">
          {t("projects.description")}
        </AppSection.Description>
      </div>
      <ProjectsGrid projects={projects} />
    </AppSection>
  );
};

export default ProjectsSection;
