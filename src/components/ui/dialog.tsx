import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

type Position =
  | "center"
  | "top-end"
  | "bottom-end"
  | "top-start"
  | "bottom-start";

function DialogContent({
  className,
  children,
  showCloseButton = true,
  position = "center",
  maxWidth = "100%",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  position?: Position;
  maxWidth?: string | false;
}) {
  // client-only dir detection (safe fallback to "ltr")
  const dir = typeof document !== "undefined" ? document.dir || "ltr" : "ltr";
  const isRtl = dir === "rtl";

  // positioning classes (center uses physical `left` so it centers in both LTR/RTL)
  const positionClasses: Record<Position, string> = {
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-start": isRtl ? "top-4 right-4" : "top-4 left-4",
    "top-end": isRtl ? "top-4 left-4" : "top-4 right-4",
    "bottom-start": isRtl ? "bottom-4 right-4" : "bottom-4 left-4",
    "bottom-end": isRtl ? "bottom-4 left-4" : "bottom-4 right-4",
  };

  // animations:
  // - center: zoom + fade (keeps the modal feel)
  // - top/bottom corners: slide in/out from top/bottom (no fade/zoom)
  const animationClasses: Record<Position, string> = {
    center:
      "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
    "top-start":
      "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
    "top-end":
      "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
    "bottom-start":
      "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
    "bottom-end":
      "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
  };

  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          // base styles
          "bg-background fixed z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border p-6 shadow-lg duration-200",
          // apply default max-width unless explicitly disabled or custom maxWidth is provided
          maxWidth !== false && "sm:max-w-lg",
          // position & animation classes
          positionClasses[position],
          animationClasses[position],
          // any additional classes passed in
          className
        )}
        style={{
          // apply custom maxWidth if provided
          ...(typeof maxWidth === "string" && { maxWidth }),
          ...props.style,
        }}
        {...props}
      >
        {children}

        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 end-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-start", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
