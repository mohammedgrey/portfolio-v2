import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMobileUserAgent(userAgent: string) {
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isTouchMac =
    /Macintosh/i.test(userAgent) &&
    typeof document !== "undefined" &&
    "ontouchend" in document;

  return mobileRegex.test(userAgent) || isTouchMac;
}
