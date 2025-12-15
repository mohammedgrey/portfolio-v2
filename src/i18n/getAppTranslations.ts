import { getTranslations } from "next-intl/server";
import type {
  AppMessages,
  NestedTranslationKey,
  TranslationKey,
} from "./types";

// Overloaded function signatures
export async function getAppTranslations<T extends keyof AppMessages>(
  namespace: T
): Promise<
  (<K extends NestedTranslationKey<T>>(
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
    raw: Awaited<ReturnType<typeof getTranslations>>;
  }
>;

export async function getAppTranslations<T extends keyof AppMessages>(options: {
  locale?: string;
  namespace: T;
}): Promise<
  (<K extends NestedTranslationKey<T>>(
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
    raw: Awaited<ReturnType<typeof getTranslations>>;
  }
>;

export async function getAppTranslations(locale?: string): Promise<
  (<K extends TranslationKey>(
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
    raw: Awaited<ReturnType<typeof getTranslations>>;
  }
>;

/**
 * Type-safe version of getTranslations for server components.
 *
 * Usage patterns:
 * 1. Namespace-specific: getAppTranslations("HomePage") -> t("title"), t("nested.text")
 * 2. With options: getAppTranslations({ locale: "ar", namespace: "HomePage" })
 * 3. Global access: getAppTranslations() -> t("HomePage.title"), t("ThemeSwitcher.dark")
 * 4. Global with locale: getAppTranslations("ar") -> t("HomePage.title"), t("ThemeSwitcher.dark")
 */
export async function getAppTranslations<T extends keyof AppMessages>(
  namespaceOrLocale?: T | { locale?: string; namespace: T } | string
) {
  // Case 1: No arguments - global access
  if (namespaceOrLocale === undefined) {
    const t = await getTranslations();
    return createGlobalTranslateFunction(t);
  }

  // Case 2: String argument
  if (typeof namespaceOrLocale === "string") {
    // If it looks like a locale (short string), treat as global with locale
    if (
      namespaceOrLocale.length <= 3 &&
      /^[a-z]{2}(-[A-Z]{2})?$/.test(namespaceOrLocale)
    ) {
      const t = await getTranslations({ locale: namespaceOrLocale });
      return createGlobalTranslateFunction(t);
    }

    // Otherwise treat as namespace
    const t = await getTranslations(namespaceOrLocale as T);
    return createNamespaceTranslateFunction(t);
  }

  // Case 3: Options object
  if (
    typeof namespaceOrLocale === "object" &&
    "namespace" in namespaceOrLocale
  ) {
    const { locale, namespace } = namespaceOrLocale;
    const t = locale
      ? await getTranslations({ locale, namespace })
      : await getTranslations(namespace);
    return createNamespaceTranslateFunction(t);
  }

  // Fallback - treat as namespace
  const t = await getTranslations(namespaceOrLocale as T);
  return createNamespaceTranslateFunction(t);
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
