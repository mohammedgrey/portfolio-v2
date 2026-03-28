import { personalInfo } from "@/data/personalInfo";
import { socials } from "@/data/socials";
import { ProjectNameEnum, TechEnum } from "@/types/enums";
import { useMemo } from "react";

export type UseAssistantResponseReferencesInput = {
  content: string;
};

const useAssistantResponseReferences = ({
  content,
}: UseAssistantResponseReferencesInput) => {
  const includesAny = (str: string, arr: string[]) =>
    arr.some((item) => str.includes(item));

  const thereIsContactInfoReference = useMemo(
    () =>
      includesAny(content.toLowerCase(), [
        personalInfo.email.toLowerCase(),
        personalInfo.phone.toLowerCase(),
        ...Object.values(personalInfo.location).map((location) =>
          location.toLowerCase(),
        ),
        ...socials.map((social) => social.link.toLowerCase()),
        ...socials.map((social) => social.title.toLowerCase()),
      ]),
    [content],
  );

  const techReferences: TechEnum[] = useMemo(
    () =>
      Object.values(TechEnum).filter((tech) =>
        content.toLowerCase().includes(tech.toLowerCase()),
      ),
    [content],
  );
  const projectReferences: ProjectNameEnum[] = useMemo(
    () =>
      Object.values(ProjectNameEnum).filter((project) =>
        content.toLowerCase().includes(project.toLowerCase()),
      ),
    [content],
  );

  const thereAreTechReferences = Boolean(techReferences?.length);
  const thereAreProjectReferences = Boolean(projectReferences?.length);

  const noReferences =
    !thereIsContactInfoReference &&
    !thereAreTechReferences &&
    !thereAreProjectReferences;

  return {
    thereIsContactInfoReference,
    thereAreTechReferences,
    thereAreProjectReferences,
    techReferences,
    projectReferences,
    noReferences,
  };
};
export default useAssistantResponseReferences;

export type UseAssistantResponseReferencesReturn = ReturnType<
  typeof useAssistantResponseReferences
>;
