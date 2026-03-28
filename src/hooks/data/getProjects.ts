import { getAppTranslations } from "@/i18n";
import { generateProjects } from "./generateProjects";
import getDomains from "./getDomains";

const getProjects = async () => {
  const t = await getAppTranslations("Projects");
  const { domains } = await getDomains();

  const projects = generateProjects(t, domains);

  return {
    projects,
  };
};

export default getProjects;

export type GetProjectsReturn = ReturnType<typeof getProjects>;
