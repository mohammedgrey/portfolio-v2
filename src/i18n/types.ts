/**
 * Auto-generated types based on your translation messages.
 * This ensures type safety across your application.
 */

import type en from "../../messages/en.json";
import type { Path } from "react-hook-form";

/**
 * Inferred types from the English JSON messages file.
 * This automatically updates when you change your messages.
 */
export type AppMessages = typeof en;

/**
 * Helper type for nested translation keys within a namespace using react-hook-form's Path utility
 */
export type NestedTranslationKey<T extends keyof AppMessages> = Path<
  AppMessages[T]
>;

/**
 * Helper type to extract all possible translation keys using react-hook-form's Path utility
 */
export type TranslationKey = {
  [K in keyof AppMessages]: Path<AppMessages[K]> extends string
    ? `${K & string}.${Path<AppMessages[K]>}`
    : never;
}[keyof AppMessages];

/**
 * Helper type to get the value type for a specific translation key
 */
export type TranslationValue<T extends TranslationKey> =
  T extends `${infer Namespace}.${infer Key}`
    ? Namespace extends keyof AppMessages
      ? Key extends Path<AppMessages[Namespace]>
        ? string
        : never
      : never
    : never;
