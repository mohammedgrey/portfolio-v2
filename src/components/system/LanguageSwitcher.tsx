"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Check, ChevronDown, Globe, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { WhenHydrated } from "../wrappers/WhenHydrated";

const localeNames = {
  en: "English",
  ar: "العربية",
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [optimisticLocale, setOptimisticLocale] = useState(currentLocale);

  useEffect(() => {
    setOptimisticLocale(currentLocale);
  }, [currentLocale]);

  useEffect(() => {
    routing.locales.forEach((locale) => {
      if (locale !== currentLocale) {
        router.prefetch(pathname, { locale });
      }
    });
  }, [currentLocale, pathname, router]);

  const handleLocaleChange = (locale: string) => {
    if (locale === currentLocale || isPending) return;

    setOptimisticLocale(locale);

    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <WhenHydrated fallback={<div className="h-10 w-10 sm:w-30" />}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 px-0 flex justify-center gap-2 sm:w-30 sm:px-3 sm:justify-between"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Globe className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {localeNames[optimisticLocale as keyof typeof localeNames]}
            </span>
            <ChevronDown className="hidden h-3 w-3 sm:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {routing.locales.map((locale) => {
            const isSelected = currentLocale === locale;
            return (
              <DropdownMenuItem
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                selected={isSelected}
              >
                <Globe className="me-2 h-4 w-4" />
                <span>{localeNames[locale as keyof typeof localeNames]}</span>
                {isSelected && <Check className="ms-auto h-4 w-4" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </WhenHydrated>
  );
}
