"use client";

import { useTranslations } from "next-intl";
import type {
  AppMessages,
  NestedTranslationKey,
  TranslationKey,
} from "./types";

// Overloaded function signatures
export function useAppTranslations<T extends keyof AppMessages>(
  namespace: T
): (<K extends NestedTranslationKey<T>>(
  key: K,
  values?: Record<string, string | number>
) => string) & {
  rich: <K extends NestedTranslationKey<T>>(
    key: K,
    values?: Record<
      string,
      React.ReactNode | ((chunks: React.ReactNode) => React.ReactNode)
    >
  ) => React.ReactNode;
  raw: ReturnType<typeof useTranslations>;
};

export function useAppTranslations(): (<K extends TranslationKey>(
  key: K,
  values?: Record<string, string | number>
) => string) & {
  rich: <K extends TranslationKey>(
    key: K,
    values?: Record<
      string,
      React.ReactNode | ((chunks: React.ReactNode) => React.ReactNode)
    >
  ) => React.ReactNode;
  raw: ReturnType<typeof useTranslations>;
};

/**
 * Type-safe version of useTranslations for client components.
 *
 * Usage patterns:
 * 1. Namespace-specific: useAppTranslations("HomePage") -> t("title"), t("nested.text")
 * 2. Global access: useAppTranslations() -> t("HomePage.title"), t("ThemeSwitcher.dark")
 */
export function useAppTranslations<T extends keyof AppMessages>(namespace?: T) {
  // Always call hooks at the top level
  const globalT = useTranslations();
  const namespacedT = useTranslations(namespace);

  // Determine which function to create based on namespace presence
  if (namespace === undefined) {
    return createGlobalTranslateFunction(globalT);
  }

  return createNamespaceTranslateFunction(namespacedT);
}

function createNamespaceTranslateFunction(t: unknown) {
  const translate = ((
    key: string,
    values?: Record<string, string | number>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return values ? (t as any)(key, values) : (t as any)(key);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

  Object.defineProperty(translate, "rich", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: (key: string, values?: any) => (t as any).rich(key, values),
    enumerable: true,
    configurable: true,
  });

  Object.defineProperty(translate, "raw", {
    value: t,
    enumerable: true,
    configurable: true,
  });

  return translate;
}

function createGlobalTranslateFunction(t: unknown) {
  const translate = ((
    key: string,
    values?: Record<string, string | number>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return values ? (t as any)(key, values) : (t as any)(key);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

  Object.defineProperty(translate, "rich", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: (key: string, values?: any) => (t as any).rich(key, values),
    enumerable: true,
    configurable: true,
  });

  Object.defineProperty(translate, "raw", {
    value: t,
    enumerable: true,
    configurable: true,
  });

  return translate;
}
