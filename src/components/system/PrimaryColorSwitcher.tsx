"use client";

import { Check, Palette } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePrimaryColor } from "@/components/wrappers/PrimaryColorProvider";
import { WhenHydrated } from "@/components/wrappers/WhenHydrated";

export function PrimaryColorSwitcher() {
  const { primaryColors, currentColor, setCurrentColor } = usePrimaryColor();
  const t = useTranslations("PrimaryColorSwitcher");

  return (
    <WhenHydrated fallback={<div className="h-10 w-10 sm:w-30" />}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 w-10 px-0 flex justify-center gap-2 sm:w-30 sm:px-3 sm:justify-between"
          >
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">{t(currentColor.name)}</span>
            <div
              className={`hidden w-3 h-3 rounded-full sm:block ${currentColor.class}`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {primaryColors.map((color) => {
            const isSelected = currentColor.name === color.name;
            return (
              <DropdownMenuItem
                key={color.name}
                onClick={() => setCurrentColor(color)}
                selected={isSelected}
              >
                <div className={`me-2 h-4 w-4 rounded-full ${color.class}`} />
                <span>{t(color.name)}</span>
                {isSelected && <Check className="ms-auto h-4 w-4" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </WhenHydrated>
  );
}
