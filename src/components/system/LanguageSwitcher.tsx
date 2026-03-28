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
import { Check, ChevronDown, Globe } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { WhenHydrated } from "../wrappers/WhenHydrated";

const localeNames = {
  en: "English",
  ar: "العربية",
};

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = params.locale as string;

  const handleLocaleChange = (locale: string) => {
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
            disabled={isPending}
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
              {localeNames[currentLocale as keyof typeof localeNames]}
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
