import { SkillCategory } from "@/types/common";
import { TechEnum } from "@/types/enums";

const useSkills = () => {
  const skillCategories: SkillCategory[] = [
    {
      id: "frontend",
      category: "Frontend",
      skills: [
        TechEnum.Typescript,
        TechEnum.React,
        TechEnum.NextJS,
        TechEnum.JavaScript,
        TechEnum.Vue,
        TechEnum.Nuxt,
        TechEnum.HTML,
        TechEnum.CSS_SASS,
      ],
    },
    {
      id: "mobile",
      category: "Mobile",
      skills: [TechEnum.ReactNative, TechEnum.Flutter],
    },
    {
      id: "backend",
      category: "Backend",
      skills: [
        TechEnum.NodeJS,
        TechEnum.NextJS,
        TechEnum.MongoDB,
        TechEnum.SQL,
        TechEnum.Python,
      ],
    },
    {
      id: "other",
      category: "Other",
      skills: [
        TechEnum.AI,
        TechEnum.OOP,
        TechEnum.Cpp,
        TechEnum.Docker,
        TechEnum.CI_CD,
        TechEnum.Git,
      ],
    },
  ];

  return {
    skillCategories,
  };
};

export default useSkills;

export type UseSkillsReturn = ReturnType<typeof useSkills>;
