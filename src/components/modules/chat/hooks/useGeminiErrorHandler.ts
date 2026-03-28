import { GeminiApiErrorCode } from "@/app/api/gemini/types";
import { useCallback, useState } from "react";
import { GeminiErrorDetails, getErrorConfig } from "../utils/errorConfig";

interface ApiErrorResponse {
  errorCode?: GeminiApiErrorCode;
  resetTime?: string;
  remaining?: number;
}

export function useGeminiErrorHandler() {
  const [errorDetails, setErrorDetails] = useState<GeminiErrorDetails | null>(
    null,
  );

  const handleApiError = useCallback((error: ApiErrorResponse | unknown) => {
    let errorCode: GeminiApiErrorCode | undefined;
    let resetTime: string | undefined;
    let remaining: number | undefined;

    // Check if error is from API response
    if (error && typeof error === "object" && "errorCode" in error) {
      const apiError = error as ApiErrorResponse;
      errorCode = apiError.errorCode;
      resetTime = apiError.resetTime;
      remaining = apiError.remaining;
    }

    const config = getErrorConfig(errorCode);

    setErrorDetails({
      errorCode,
      config,
      resetTime,
      remaining,
    });

    return config;
  }, []);

  const clearError = useCallback(() => {
    setErrorDetails(null);
  }, []);

  const shouldDisableInput = errorDetails?.config.disableInput ?? false;

  return {
    errorDetails,
    handleApiError,
    clearError,
    shouldDisableInput,
  };
}
