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
      className={cn("h-9 w-full rounded-md relative", className)}
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
          className,
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-full w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/10 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/10 dark:aria-invalid:ring-destructive/30 aria-invalid:border-destructive",
          startAdornment ? "ps-10" : "ps-3",
          endAdornment ? "pe-10" : "pe-3"
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
