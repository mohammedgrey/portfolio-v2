import ar from "../../messages/ar.json";
import en from "../../messages/en.json";
import { AppMessages } from "./types";

export const messages = {
  en,
  ar,
} satisfies {
  en: AppMessages;
  ar: AppMessages;
};
