import { ExperienceItem } from "@/types/common";
import { TechEnum, WorkTypeEnum } from "@/types/enums";

const useExperience = () => {
  const experienceItems: ExperienceItem[] = [
    {
      id: "lean",
      company: "Lean",
      position: "Senior Software Engineer | Squad Lead",
      location: "Riyadh, Saudi Arabia",
      workType: WorkTypeEnum.OnSite,
      startDate: new Date(2025, 2), // March 2025
      endDate: null, // Present
      description:
        "Worked on national-scale Saudi healthcare platforms including Sehaty and Seha, two of the most widely used MOH initiatives in the country, using React, Next.js, TypeScript, SQL, and .NET.\n\nLed a squad of 3-5 engineers across multiple related projects, coordinating delivery, removing blockers, and aligning execution across team members.\n\nBuilt an internal role-based login tool for Seha that reduced manual testing setup time by 70%, with the improvement benefiting both the development and QA teams.\n\nIncorporated AI-assisted development workflows using Cursor, Claude Code, GitHub Copilot, and Codex to accelerate delivery and improve code quality.\n\nIntroduced lightweight tracking and documentation that improved team visibility and cut documentation-based onboarding time from roughly a day to under an hour.\n\nConducted interviews for senior frontend roles and helped evaluate candidates for technical and team fit.",
      technologies: [
        { label: "React", value: TechEnum.React },
        { label: "Next.js", value: TechEnum.NextJS },
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
        "Built and maintained Masroof, a Ministry of Education-backed school management platform serving 250,000+ students and 1,350+ schools across Saudi Arabia, with a React Native mobile app and a React admin dashboard.\n\nPerformed code reviews to uphold code quality, consistency, and engineering standards across the codebase.\n\nWorked in an Agile environment with iterative planning and delivery cycles.",
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
      workType: WorkTypeEnum.RemoteContract,
      startDate: new Date(2023, 9), // October 2023
      endDate: new Date(2024, 1), // February 2024
      description:
        "Developed the KalamTime chat application with React Native, focusing on reliable messaging flows and mobile performance.\n\nImplemented real-time messaging using WebSockets and integrated native device modules for location access, camera, and contacts syncing.",
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
        "Shipped features across four distinct products spanning hotel booking, ERP, virtual office, and food delivery, demonstrating versatility across product domains using React, React Native, Next.js, Node.js, MongoDB, and TypeScript.\n\nContributed to frontend hiring decisions through candidate interviews and technical evaluations.",
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
        "Contributed to EPX (international shipping web app), Gebhaly (e-commerce web app), and the Gebhaly Chrome extension using React and Next.js.\n\nTook full ownership of EPX and the Chrome extension, leading feature development on both products end to end.",
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
