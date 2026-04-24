import { CalendarIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface TypeBadgeProps {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export const TypeBadge: FC<TypeBadgeProps> = ({ label, icon, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium bg-primary/5 text-primary dark:bg-primary/10 dark:text-primary px-3 py-1.5 rounded-full border border-primary/10 dark:border-primary/20",
        className,
      )}
    >
      {icon}
      {label}
    </span>
  );
};

interface YearChipProps {
  year: number;
  className?: string;
}

export const YearChip: FC<YearChipProps> = ({ year, className }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium bg-muted/50 dark:bg-muted/30 text-foreground px-3 py-1.5 rounded-full border border-border/50",
        className,
      )}
    >
      <CalendarIcon className="w-4 h-4 scale-80 shrink-0" />
      {year}
    </span>
  );
};

interface TechChipProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

export const TechChip: FC<TechChipProps> = ({ label, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 bg-muted/50 dark:bg-muted/30 text-foreground px-2.5 py-1 rounded-md text-xs font-medium border border-border/50 transition-colors",
        className,
        !!onClick && "cursor-pointer hover:bg-muted dark:hover:bg-muted/50",
      )}
    >
      <span>{label}</span>
    </div>
  );
};
