"use client";

import { useIsHydrated } from "@/hooks/common/useIsHydrated";
import { ReactNode } from "react";

interface WhenHydratedProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function WhenHydrated({ children, fallback = null }: WhenHydratedProps) {
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
