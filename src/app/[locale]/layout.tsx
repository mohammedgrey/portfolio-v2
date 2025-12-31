import ModalManager from "@/components/modules/modal/ModalManager";
import LocaleProvider from "@/components/wrappers/LocaleProvider";
import { PrimaryColorProvider } from "@/components/wrappers/PrimaryColorProvider";
import StoreProvider from "@/components/wrappers/StoreProvider";
import { ThemeProvider } from "@/components/wrappers/ThemeProvider";
import { getAppTranslations } from "@/i18n";
import { routing } from "@/i18n/routing";
import { Raleway } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Toaster } from "sonner";
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
}) {
  const { locale } = await params;
  const t = await getAppTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
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
                  {children}
                  <ModalManager />
                  <Toaster position="top-right" />
                </PrimaryColorProvider>
              </NuqsAdapter>
            </StoreProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
