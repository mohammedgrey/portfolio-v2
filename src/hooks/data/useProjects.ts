import { useAppTranslations } from "@/i18n";
import { ProjectNameEnum } from "@/types/enums";
import { generateProjects } from "./generateProjects";
import useDomains from "./useDomains";

const useProjects = () => {
  const t = useAppTranslations("Projects");
  const { domains } = useDomains();
  const projects = generateProjects(t, domains);

  const getProjectsFromTitles = (titles: ProjectNameEnum[]) => {
    return projects.filter((project) => titles.includes(project.title));
  };

  return {
    projects,
    getProjectsFromTitles,
  };
};
export default useProjects;

export type UseProjectsReturn = ReturnType<typeof useProjects>;
