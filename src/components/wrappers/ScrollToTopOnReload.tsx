"use client";

import { useEffect, type FC, type PropsWithChildren } from "react";

const ScrollToTopOnReload: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const navigationEntry = performance.getEntriesByType("navigation").at(0) as
      | PerformanceNavigationTiming
      | undefined;
    const isReload = navigationEntry?.type === "reload";

    if (isReload) {
      const scrollToTop = () => window.scrollTo(0, 0);
      scrollToTop();
      requestAnimationFrame(scrollToTop);
      setTimeout(scrollToTop, 150);
      setTimeout(scrollToTop, 700);
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return <>{children}</>;
};

export default ScrollToTopOnReload;
