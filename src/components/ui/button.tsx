import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";

import { buttonVariants } from "@/components/ui/variants/buttonVariants";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  startIcon = null,
  endIcon = null,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      disabled={props.disabled || loading}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {asChild ? (
        props.children
      ) : (
        <>
          {loading ? <Loader2 className="animate-spin w-4! h-4!" /> : startIcon}
          {props.children}
          {endIcon}
        </>
      )}
    </Comp>
  );
}

export { Button };
