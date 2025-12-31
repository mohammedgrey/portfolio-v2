export type Message = {
  id: string;
  role: "user" | "assistant" | "loading" | "error";
  content: string;
};

export type StackItem = {
  id: string;
  title: string;
  description: string;
  model: string; // path to .glb
  color: string;
};

export type ProjectType = {
  id: string;
  title: string;
  type: string;
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
    techs: string[];
    git?: {
      both?: string;
      server?: string;
      client?: string;
    };
    carousel?: string[];
  };
  year: number;
};
