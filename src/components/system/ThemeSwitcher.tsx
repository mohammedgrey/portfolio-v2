"use client";

import { Check, ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WhenHydrated } from "@/components/wrappers/WhenHydrated";

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
    <WhenHydrated fallback={<div className="w-30 h-10" />}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 flex justify-between w-30 px-3 gap-2"
          >
            <CurrentIcon className="h-4 w-4" />
            <span>{currentTheme.label}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = theme === themeOption.value;
            return (
              <DropdownMenuItem
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value)}
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
