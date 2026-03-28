import type { GeminiApiErrorCode } from "@/app/api/gemini/types";
import { ProjectNameEnum, TechEnum, WorkTypeEnum } from "./enums";

export type Message = {
  id: string;
  role: "user" | "assistant" | "loading" | "error";
  content: string;
  errorCode?: GeminiApiErrorCode;
  resetTime?: string;
  remaining?: number;
};

export type StackItem = {
  id: string;
  title: TechEnum;
  description: string;
  model: string; // path to .glb
  color: string;
  expertise: number; // 1-5 rating
};

export type ProjectType = {
  id: string;
  title: ProjectNameEnum;
  type: {
    label: string;
    value: string;
  };
  image?: string;
  link?: string;
  containImage?: boolean;
  details: {
    PDF?: string;
    API?: string;
    android?: string;
    ios?: string;
    brief: string;
    extension?: string;
    techs: Array<{
      label: string;
      value: string;
    }>;
    git?: {
      both?: string;
      server?: string;
      client?: string;
    };
    carousel?: string[];
  };
  year: number;
};

export type SocialType = {
  title: string;
  link: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconPngPath: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  position: string;
  location: string;
  workType: WorkTypeEnum;
  startDate: Date;
  endDate: Date | null;
  description: string;
  technologies: Array<{
    label: string;
    value: TechEnum;
  }>;
};

export type SkillCategory = {
  id: string;
  category: string;
  skills: string[];
};

export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: Date;
  gpa?: string;
  score?: string;
};

export type InterestItem = {
  id: string;
  title: string;
  description: string;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  category: string;
};
