"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
let htmlOriginalOverflow: string | null = null;
const overlaySubscribers = new Set<() => void>();

const notifyOverlaySubscribers = () => {
  overlaySubscribers.forEach((subscriber) => subscriber());
};

let htmlOriginalOverscroll: string | null = null;

const lockBodyScroll = () => {
  if (bodyScrollLockCount === 0) {
    bodyOriginalOverflow = document.body.style.overflow;
    htmlOriginalOverflow = document.documentElement.style.overflow;
    htmlOriginalOverscroll = document.documentElement.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    // Prevent pull-to-refresh and iOS bounce on the page level
    document.documentElement.style.overscrollBehavior = "none";
  }
  bodyScrollLockCount += 1;
};

const unlockBodyScroll = () => {
  bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);
  if (bodyScrollLockCount === 0) {
    document.body.style.overflow = bodyOriginalOverflow ?? "";
    document.documentElement.style.overflow = htmlOriginalOverflow ?? "";
    document.documentElement.style.overscrollBehavior =
      htmlOriginalOverscroll ?? "";
    bodyOriginalOverflow = null;
    htmlOriginalOverflow = null;
    htmlOriginalOverscroll = null;
  }
};

/**
 * Returns true if `el` or any ancestor up to `boundary` is a scroll container
 * that can still scroll in the requested direction (i.e. not at its boundary).
 * This prevents pull-to-refresh / page scroll when Virtuoso or other inner
 * scroll containers are already at their top/bottom/left/right limit.
 */
const canScrollInAncestor = (
  el: HTMLElement,
  boundary: HTMLElement,
  deltaX = 0,
  deltaY = 0,
): boolean => {
  const scrollable = (v: string) => v === "auto" || v === "scroll";
  let current: HTMLElement | null = el;
  while (current && current !== boundary) {
    const { overflowX, overflowY } = getComputedStyle(current);
    if (
      deltaY !== 0 &&
      scrollable(overflowY) &&
      current.scrollHeight > current.clientHeight
    ) {
      const atTop = current.scrollTop <= 0;
      const atBottom =
        current.scrollTop + current.clientHeight >= current.scrollHeight - 1;
      const scrollingDown = deltaY > 0;
      if ((scrollingDown && !atBottom) || (!scrollingDown && !atTop))
        return true;
    }
    if (
      deltaX !== 0 &&
      scrollable(overflowX) &&
      current.scrollWidth > current.clientWidth
    ) {
      const atLeft = current.scrollLeft <= 0;
      const atRight =
        current.scrollLeft + current.clientWidth >= current.scrollWidth - 1;
      const scrollingRight = deltaX > 0;
      if ((scrollingRight && !atRight) || (!scrollingRight && !atLeft))
        return true;
    }
    current = current.parentElement;
  }
  return false;
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
  const overlayRef = useRef<HTMLDivElement>(null);
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

    // Prevent wheel and touch scroll from reaching the page behind the overlay.
    // We only cancel the event when the scroll target has no scrollable ancestor
    // inside the overlay, so nested scroll areas (Virtuoso, horizontal cards) work.
    const el = overlayRef.current;

    const handleWheel = (e: WheelEvent) => {
      if (
        el &&
        canScrollInAncestor(e.target as HTMLElement, el, e.deltaX, e.deltaY)
      )
        return;
      e.preventDefault();
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0]?.clientX ?? 0;
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = touchStartX - (e.touches[0]?.clientX ?? 0);
      const deltaY = touchStartY - (e.touches[0]?.clientY ?? 0);
      if (
        el &&
        canScrollInAncestor(e.target as HTMLElement, el, deltaX, deltaY)
      )
        return;
      e.preventDefault();
    };

    el?.addEventListener("wheel", handleWheel, { passive: false });
    el?.addEventListener("touchstart", handleTouchStart, { passive: true });
    el?.addEventListener("touchmove", handleTouchMove, { passive: false });

    // iOS Safari sometimes scrolls window when keyboard opens, pushing overlay
    // content off-screen. Restore scroll position immediately when that happens.
    const handleWindowScroll = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });

    return () => {
      overlayStack = overlayStack.filter((id) => id !== overlayIdRef.current);
      overlaySubscribers.delete(syncOverlayState);
      notifyOverlaySubscribers();
      unlockBodyScroll();
      document.removeEventListener("keydown", handleEscapeKey);
      el?.removeEventListener("wheel", handleWheel);
      el?.removeEventListener("touchstart", handleTouchStart);
      el?.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleWindowScroll);
    };
    // Register once per mounted overlay instance.
  }, []);

  const overlayContent = (
    <div
      ref={overlayRef}
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
          "pt-[calc(env(safe-area-inset-top)+4rem)]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(overlayContent, document.body);
};
