import PageBackground from "@/components/common/PageBackground";
import ModalManager from "@/components/modules/modal/ModalManager";
import { Toaster } from "@/components/ui/sonner";
import LocaleProvider from "@/components/wrappers/LocaleProvider";
import { PrimaryColorProvider } from "@/components/wrappers/PrimaryColorProvider";
import PrimaryFaviconSync from "@/components/wrappers/PrimaryFaviconSync";
import ScrollToTopOnReload from "@/components/wrappers/ScrollToTopOnReload";
import StoreProvider from "@/components/wrappers/StoreProvider";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";
import { getAppTranslations } from "@/i18n";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/react";
import "./globals.css";

const font = Raleway({
  subsets: ["latin"],
  variable: "--font-app-font",
  display: "swap",
  weight: "400",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getAppTranslations({ locale, namespace: "Metadata" });

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.mohammeddawood.com";
  const baseUrl = new URL(siteUrl);
  const canonicalPath = locale === routing.defaultLocale ? "/" : `/${locale}`;
  const canonicalUrl = new URL(canonicalPath, baseUrl).toString();

  const languages = Object.fromEntries(
    routing.locales.map((localeItem) => [
      localeItem,
      localeItem === routing.defaultLocale ? "/" : `/${localeItem}`,
    ]),
  );

  const keywords = t("keywords")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
  const previewImageUrl = new URL(
    "/assets/images/og-preview.jpg?v=1",
    baseUrl,
  ).toString();

  return {
    title: t("title"),
    description: t("description"),
    keywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      siteName: "Mohammed Dawood Portfolio",
      locale,
      images: [
        {
          url: previewImageUrl,
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: t("title"),
        },
      ],
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [previewImageUrl],
    },
    metadataBase: baseUrl,
    alternates: {
      canonical: canonicalPath,
      languages,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`${font.variable} antialiased`}>
        <PageBackground />
        <LocaleProvider locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <StoreProvider>
              <NuqsAdapter>
                <PrimaryColorProvider>
                  <PrimaryFaviconSync />
                  <ScrollToTopOnReload>
                    {children}
                    <ModalManager />
                    <Toaster position="top-right" />
                  </ScrollToTopOnReload>
                </PrimaryColorProvider>
              </NuqsAdapter>
            </StoreProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
