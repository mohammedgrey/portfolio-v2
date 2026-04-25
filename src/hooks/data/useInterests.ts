import { InterestItem } from "@/types/common";

const useInterests = () => {
  const interestItems: InterestItem[] = [
    {
      id: "machathon",
      title: "STP Machathon-3",
      description: "2nd place winner in a computer vision competition",
      date: new Date(2022, 2), // March 2022
      category: "Computer Vision",
    },
    {
      id: "racing-team",
      title: "Cairo University Racing Team",
      description:
        "Autonomous Car Software Engineer - Perception module (Python & ROS)",
      startDate: new Date(2021, 8), // September 2021
      endDate: new Date(2022, 4), // May 2022
      category: "Autonomous Car",
    },
    {
      id: "coding-design",
      title: "UI/UX & Interface Design",
      description:
        "Designing clean, high-clarity interfaces with a strong focus on user experience, from layout and visual hierarchy to production-ready implementation",
      category: "Creative",
    },
  ];

  const languages = [
    { language: "Arabic", proficiency: "Native" },
    { language: "English", proficiency: "Fluent" },
  ];

  return {
    interestItems,
    languages,
  };
};

export default useInterests;

export type UseInterestsReturn = ReturnType<typeof useInterests>;
