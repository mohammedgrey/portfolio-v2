import { ExperienceItem } from "@/types/common";
import { TechEnum, WorkTypeEnum } from "@/types/enums";

const useExperience = () => {
  const experienceItems: ExperienceItem[] = [
    {
      id: "lean",
      company: "Lean",
      position: "Senior Software Engineer",
      location: "Riyadh, Saudi Arabia",
      workType: WorkTypeEnum.OnSite,
      startDate: new Date(2025, 2), // March 2025
      endDate: null, // Present
      description:
        "Contributing to multiple healthcare initiatives in Saudi Arabia, including MOH projects, Sehaty, Seha, and related digital health platforms.",
      technologies: [
        { label: "React", value: TechEnum.React },
        { label: "TypeScript", value: TechEnum.Typescript },
        { label: "SQL", value: TechEnum.SQL },
        { label: ".NET", value: TechEnum.DotNet },
      ],
    },
    {
      id: "tetco",
      company: "TETCO",
      position: "Senior Software Engineer",
      location: "Riyadh, Saudi Arabia",
      workType: WorkTypeEnum.Remote,
      startDate: new Date(2024, 2), // March 2024
      endDate: new Date(2025, 1), // February 2025
      description:
        "Built and maintained the Masroof school platform using React Native for mobile applications and React for the admin dashboard.",
      technologies: [
        { label: "React", value: TechEnum.React },
        { label: "React Native", value: TechEnum.ReactNative },
        { label: "TypeScript", value: TechEnum.Typescript },
      ],
    },
    {
      id: "ogoul-technology",
      company: "Ogoul Technology",
      position: "Software Engineer",
      location: "Doha, Qatar",
      workType: WorkTypeEnum.Remote,
      startDate: new Date(2023, 9), // October 2023
      endDate: new Date(2024, 1), // February 2024
      description:
        "Developed the KalamTime chat application with React Native, focusing on reliable messaging flows and mobile performance.",
      technologies: [
        { label: "MongoDB", value: TechEnum.MongoDB },
        { label: "Express", value: TechEnum.Express },
        { label: "React Native", value: TechEnum.ReactNative },
        { label: "Node.js", value: TechEnum.NodeJS },
        { label: "TypeScript", value: TechEnum.Typescript },
      ],
    },
    {
      id: "zeidex",
      company: "Zeidex",
      position: "Software Engineer",
      location: "Cairo, Egypt",
      workType: WorkTypeEnum.Remote,
      startDate: new Date(2022, 9), // October 2022
      endDate: new Date(2023, 9), // October 2023
      description:
        "Delivered features across multiple products, including a hotel booking web/mobile app (React Native, React, Next.js, Node.js), an ERP system (React, Next.js), a virtual office web app (Node.js, React), and the Corners food delivery app (React Native).",
      technologies: [
        { label: "React Native", value: TechEnum.ReactNative },
        { label: "Next.js", value: TechEnum.NextJS },
        { label: "Node.js", value: TechEnum.NodeJS },
        { label: "MongoDB", value: TechEnum.MongoDB },
        { label: "TypeScript", value: TechEnum.Typescript },
      ],
    },
    {
      id: "gebhaly",
      company: "Gebhaly",
      position: "Software Engineer",
      location: "Cairo, Egypt",
      workType: WorkTypeEnum.OnSite,
      startDate: new Date(2021, 6), // July 2021
      endDate: new Date(2022, 8), // September 2022
      description:
        "Contributed to EPX (international shipping web app), Gebhaly (e-commerce web app), and the Gebhaly Chrome extension using React and Next.js.",
      technologies: [
        { label: "React", value: TechEnum.React },
        { label: "Next.js", value: TechEnum.NextJS },
        { label: "TypeScript", value: TechEnum.Typescript },
      ],
    },
    {
      id: "datatec",
      company: "Datatec",
      position: "Software Engineer Intern",
      location: "Cairo, Egypt",
      workType: WorkTypeEnum.Remote,
      startDate: new Date(2020, 8), // September 2020
      endDate: new Date(2020, 9), // October 2020
      description:
        "Supported the EGY Schools system using Flutter, React, and Node.js during a software engineering internship.",
      technologies: [
        { label: "Flutter", value: TechEnum.Flutter },
        { label: "React", value: TechEnum.React },
        { label: "Node.js", value: TechEnum.NodeJS },
      ],
    },
  ];

  return {
    experienceItems,
  };
};

export default useExperience;

export type UseExperienceReturn = ReturnType<typeof useExperience>;
