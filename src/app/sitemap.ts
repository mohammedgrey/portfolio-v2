import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return [];

  return routing.locales.map((locale) => {
    const path = locale === routing.defaultLocale ? "/" : `/${locale}`;

    return {
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: locale === routing.defaultLocale ? 1 : 0.9,
    };
  });
}
