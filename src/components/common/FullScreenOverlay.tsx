"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { FC, ReactNode, useEffect } from "react";
import { Button } from "../ui/button";

interface FullscreenOverlayProps {
  onClose: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const FullscreenOverlay: FC<FullscreenOverlayProps> = ({
  onClose,
  children,
  className,
  contentClassName,
}) => {
  useEffect(() => {
    // Save current overflow style
    const originalOverflow = document.body.style.overflow;

    // Lock scroll
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll on unmount
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  return (
    <div
      className={cn(
        "fixed inset-0 bg-background/30 backdrop-blur-sm z-30",
        className
      )}
      onClick={onClose}
    >
      <Button
        variant="outline"
        onClick={onClose}
        className="absolute z-50 top-4 end-4"
      >
        <X className="h-5 w-5" />
      </Button>

      <div
        className={cn(contentClassName)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
