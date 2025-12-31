import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/10 focus-visible:ring-[3px] aria-invalid:ring-destructive/10 dark:aria-invalid:ring-destructive/30 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/10 dark:focus-visible:ring-destructive/10 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        "subtle-destructive":
          " border-transparent bg-destructive/10 text-destructive [a&]:hover:bg-destructive/20 focus-visible:ring-destructive/10 dark:focus-visible:ring-destructive/30 dark:bg-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
