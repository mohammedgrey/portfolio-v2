"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

interface FullscreenOverlayProps {
  onClose: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

let overlayIdSequence = 0;
let overlayStack: number[] = [];
let bodyScrollLockCount = 0;
let bodyOriginalOverflow: string | null = null;
const overlaySubscribers = new Set<() => void>();

const notifyOverlaySubscribers = () => {
  overlaySubscribers.forEach((subscriber) => subscriber());
};

const lockBodyScroll = () => {
  if (bodyScrollLockCount === 0) {
    bodyOriginalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  bodyScrollLockCount += 1;
};

const unlockBodyScroll = () => {
  bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);
  if (bodyScrollLockCount === 0) {
    document.body.style.overflow = bodyOriginalOverflow ?? "";
    bodyOriginalOverflow = null;
  }
};

export const FullscreenOverlay: FC<FullscreenOverlayProps> = ({
  onClose,
  children,
  className,
  contentClassName,
}) => {
  const VISIBLE_STYLES = "opacity-100 scale-100 translate-y-0";
  const HIDDEN_STYLES = "opacity-0 scale-95 translate-y-4";

  const [isVisible, setIsVisible] = useState(false);
  const [zIndex, setZIndex] = useState(30);
  const [isTopMost, setIsTopMost] = useState(false);
  const [isStackedTopMost, setIsStackedTopMost] = useState(false);
  const overlayIdRef = useRef<number>(++overlayIdSequence);
  const onCloseRef = useRef(onClose);
  const isTopMostRef = useRef(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const syncOverlayState = () => {
    const overlayIndex = overlayStack.indexOf(overlayIdRef.current);
    const topMost =
      overlayStack[overlayStack.length - 1] === overlayIdRef.current;
    const stackedTopMost = topMost && overlayStack.length > 1;
    isTopMostRef.current = topMost;
    setIsTopMost(topMost);
    setIsStackedTopMost(stackedTopMost);
    setZIndex(overlayIndex >= 0 ? 30 + (overlayIndex + 1) * 2 : 30);
  };

  const handleClose = () => {
    if (!isTopMostRef.current) {
      return;
    }

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }

    setIsVisible(false);
    onCloseRef.current();
  };

  useEffect(() => {
    overlayStack.push(overlayIdRef.current);
    overlaySubscribers.add(syncOverlayState);
    notifyOverlaySubscribers();
    lockBodyScroll();

    // Trigger animation after mount
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // Handle Escape key press
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isTopMostRef.current) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      overlayStack = overlayStack.filter((id) => id !== overlayIdRef.current);
      overlaySubscribers.delete(syncOverlayState);
      notifyOverlaySubscribers();
      unlockBodyScroll();
      document.removeEventListener("keydown", handleEscapeKey);
    };
    // Register once per mounted overlay instance.
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-30 transition-opacity duration-300",
        isStackedTopMost
          ? "bg-background/85 backdrop-blur-2xl"
          : "bg-background/60 backdrop-blur-md",
        isTopMost ? "pointer-events-auto" : "pointer-events-none",
        isVisible ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{ zIndex }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <Button
        variant="outline"
        onClick={(event) => {
          event.stopPropagation();
          handleClose();
        }}
        className={cn(
          "absolute z-50 top-4 end-4 transition-all duration-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4",
        )}
      >
        <X className="h-5 w-5" />
      </Button>

      <div
        className={cn(
          "transition-all duration-300",
          isVisible ? VISIBLE_STYLES : HIDDEN_STYLES,
          contentClassName,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
