import { EducationItem } from "@/types/common";

const useEducation = () => {
  const educationItems: EducationItem[] = [
    {
      id: "cairo-university",
      degree: "Bachelor of Computer Engineering",
      institution: "Cairo University",
      location: "Cairo",
      graduationDate: new Date(2022, 6), // July 2022
      gpa: "3.85/4.00",
    },
    {
      id: "high-school",
      degree: "High School",
      institution: "Ibn El-Nafees Language School",
      location: "Cairo",
      graduationDate: new Date(2017, 5), // June 2017
      score: "98/100",
    },
  ];

  return {
    educationItems,
  };
};

export default useEducation;

export type UseEducationReturn = ReturnType<typeof useEducation>;
