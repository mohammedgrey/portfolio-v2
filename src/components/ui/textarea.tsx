import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  rows = 4,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      className={cn(
        "placeholder:text-muted-foreground focus-visible:ring-primary/10 bg-background/60 dark:bg-input/30 backdrop-blur-md flex min-h-16 w-full resize-none rounded-md border px-3 py-2.5 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "border-input",
        "focus-visible:border-primary",
        "aria-invalid:border-destructive aria-invalid:bg-destructive/10",
        "aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/10",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
