// Type-safe translation utilities
export { getAppTranslations } from "./getAppTranslations";
export { useAppTranslations } from "./useAppTranslations";

// Types
export type { AppMessages, TranslationKey, TranslationValue } from "./types";

// Navigation utilities
export {
  getPathname,
  Link,
  redirect,
  usePathname,
  useRouter,
} from "./navigation";

// Routing configuration and types
export { routing } from "./routing";
export type { Locale } from "./routing";

// All locale messages in one place
export { messages } from "./messages";

// Request configuration (default export)
export { default as requestConfig } from "./request";
