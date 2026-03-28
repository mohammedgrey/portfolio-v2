import { GeminiApiErrorCode } from "@/app/api/gemini/types";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "gemini_rate_limit";

export function useRateLimit() {
  const [cookies, setCookie, removeCookie] = useCookies([COOKIE_NAME]);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [resetTime, setResetTime] = useState<string | undefined>();

  const clearRateLimit = useCallback(() => {
    removeCookie(COOKIE_NAME, { path: "/" });
    setIsRateLimited(false);
    setResetTime(undefined);
  }, [removeCookie]);

  const setupAutoClearTimer = useCallback(
    (resetTimeStr: string) => {
      const resetDate = new Date(resetTimeStr);
      const now = new Date();
      const timeUntilReset = resetDate.getTime() - now.getTime();

      if (timeUntilReset > 0) {
        const timer = setTimeout(() => {
          clearRateLimit();
        }, timeUntilReset);

        return () => clearTimeout(timer);
      }
    },
    [clearRateLimit],
  );

  // Check rate limit status on mount and set up auto-clear timer
  useEffect(() => {
    const storedResetTime = cookies[COOKIE_NAME];

    if (storedResetTime) {
      const resetDate = new Date(storedResetTime);
      const now = new Date();

      if (resetDate > now) {
        setIsRateLimited(true);
        setResetTime(storedResetTime);
        setupAutoClearTimer(storedResetTime);
      } else {
        // Cookie expired, clean it up
        removeCookie(COOKIE_NAME, { path: "/" });
      }
    }
  }, [cookies, removeCookie, setupAutoClearTimer]);

  const handleRateLimitError = useCallback(
    (errorCode?: GeminiApiErrorCode, resetTimeStr?: string) => {
      if (
        errorCode === GeminiApiErrorCode.RATE_LIMIT_EXCEEDED &&
        resetTimeStr
      ) {
        const resetDate = new Date(resetTimeStr);
        setCookie(COOKIE_NAME, resetTimeStr, {
          path: "/",
          expires: resetDate,
          sameSite: "strict",
        });
        setIsRateLimited(true);
        setResetTime(resetTimeStr);
        setupAutoClearTimer(resetTimeStr);
      }
    },
    [setCookie, setupAutoClearTimer],
  );

  return {
    isRateLimited,
    resetTime,
    handleRateLimitError,
    clearRateLimit,
  };
}
