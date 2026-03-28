import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

function Input({
  className,
  type,
  startAdornment,
  endAdornment,
  ...props
}: InputProps) {
  return (
    <div
      data-slot="input-container"
      className={cn("h-11 w-full rounded-md relative", className)}
    >
      {startAdornment && (
        <div className="flex absolute items-center top-1/2 -translate-y-1/2 ps-3 pe-2 text-muted-foreground">
          {startAdornment}
        </div>
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-background/60 dark:bg-input/30 backdrop-blur-md h-full w-full min-w-0 rounded-md border px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "border-input",
          "focus-visible:border-primary focus-visible:ring-primary/10 focus-visible:ring-[3px]",
          "aria-invalid:border-destructive aria-invalid:bg-destructive/10",
          "aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/10",
          startAdornment ? "ps-10" : "ps-3",
          endAdornment ? "pe-10" : "pe-3",
          className,
        )}
        {...props}
      />

      {endAdornment && (
        <div className="flex absolute end-0 top-1/2 -translate-y-1/2 items-center ps-2 pe-3 text-muted-foreground">
          {endAdornment}
        </div>
      )}
    </div>
  );
}

export { Input };
