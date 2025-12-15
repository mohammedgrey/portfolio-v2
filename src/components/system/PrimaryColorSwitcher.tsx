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
    <WhenHydrated fallback={<div className="w-30 h-10" />}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-10 flex justify-between w-30 px-3 gap-2"
          >
            <Palette className="h-4 w-4" />
            <span>{t(currentColor.name)}</span>
            <div className={`w-3 h-3 rounded-full ${currentColor.class}`} />
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
