/**
 * Example usage of the unified getAppTranslations and useAppTranslations functions
 *
 * Both functions support multiple usage patterns:
 * 1. Namespace-specific access
 * 2. Global access to all translation keys
 * 3. Options object with locale and namespace
 * 4. Global access with locale
 */

// Server Component Examples (getAppTranslations)
export async function ServerComponentExamples() {
  // Pattern 1: Namespace-specific access
  const homePageT = await getAppTranslations("HomePage");
  homePageT("title"); // ✅ "To get started, edit the page.tsx file."
  homePageT("nested.text"); // ✅ "This is nested text" (nested keys supported)
  homePageT.rich("description", {
    /* rich text values */
  }); // ✅ Rich text support

  // Pattern 2: Global access (no namespace)
  const globalT = await getAppTranslations();
  globalT("HomePage.title"); // ✅ "To get started, edit the page.tsx file."
  globalT("ThemeSwitcher.dark"); // ✅ "Dark"
  globalT("HomePage.nested.text"); // ✅ "This is nested text"

  // Pattern 3: With options object (locale + namespace)
  const arabicHomePageT = await getAppTranslations({
    locale: "ar",
    namespace: "HomePage",
  });
  arabicHomePageT("title"); // ✅ Arabic translation of title

  // Pattern 4: Global with locale
  const arabicGlobalT = await getAppTranslations("ar");
  arabicGlobalT("HomePage.title"); // ✅ Arabic translation
  arabicGlobalT("ThemeSwitcher.dark"); // ✅ Arabic translation
}

// Client Component Examples (useAppTranslations)
export function ClientComponentExamples() {
  // Pattern 1: Namespace-specific access
  const homePageT = useAppTranslations("HomePage");
  homePageT("title"); // ✅ "To get started, edit the page.tsx file."
  homePageT("nested.text"); // ✅ "This is nested text"
  homePageT.rich("description", {
    /* rich text values */
  }); // ✅ Rich text support

  // Pattern 2: Global access (no namespace)
  const globalT = useAppTranslations();
  globalT("HomePage.title"); // ✅ "To get started, edit the page.tsx file."
  globalT("ThemeSwitcher.dark"); // ✅ "Dark"
  globalT("HomePage.nested.text"); // ✅ "This is nested text"

  // Both patterns provide:
  // - Full TypeScript IntelliSense
  // - Auto-completion for all valid keys
  // - Type safety with compile-time error checking
  // - Support for nested keys using dot notation
  // - Rich text formatting with .rich() method
  // - Access to raw translator with .raw property

  return (
    <div>
      <h1>{homePageT("title")}</h1>
      <p>{globalT("HomePage.nested.text")}</p>
    </div>
  );
}

// Type Examples - All these provide full IntelliSense:
/*
For namespace-specific:
- t("title") ✅
- t("nested.text") ✅
- t("button") ✅
- t("invalid") ❌ TypeScript error

For global access:
- t("HomePage.title") ✅
- t("HomePage.nested.text") ✅
- t("ThemeSwitcher.dark") ✅
- t("Metadata.title") ✅
- t("HomePage.invalid") ❌ TypeScript error
- t("InvalidNamespace.title") ❌ TypeScript error
*/

import { getAppTranslations, useAppTranslations } from "@/i18n";
