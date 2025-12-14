"use client";

import { useIsHydrated } from "@/hooks/useIsHydrated";
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
