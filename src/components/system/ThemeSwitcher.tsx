"use client";

import { Check, ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WhenHydrated } from "@/components/wrappers/WhenHydrated";
import { AnalyticsEvent, trackEvent } from "@/lib/analytics";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("ThemeSwitcher");

  const themes = [
    {
      value: "system",
      label: t("system"),
      icon: Monitor,
    },
    {
      value: "light",
      label: t("light"),
      icon: Sun,
    },
    {
      value: "dark",
      label: t("dark"),
      icon: Moon,
    },
  ];

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <WhenHydrated fallback={<div className="h-10 w-10 sm:w-30" />}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 px-0 flex justify-center gap-2 sm:w-30 sm:px-3 sm:justify-between"
          >
            <CurrentIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{currentTheme.label}</span>
            <ChevronDown className="hidden h-3 w-3 sm:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = theme === themeOption.value;
            return (
              <DropdownMenuItem
                key={themeOption.value}
                onClick={() => {
                  if (isSelected) return;
                  setTheme(themeOption.value);
                  trackEvent(AnalyticsEvent.ThemeSwitch, {
                    from: theme ?? "unknown",
                    to: themeOption.value,
                  });
                }}
                selected={isSelected}
              >
                <Icon className="me-2 h-4 w-4" />
                <span>{themeOption.label}</span>
                {isSelected && <Check className="ms-auto h-4 w-4" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </WhenHydrated>
  );
}
