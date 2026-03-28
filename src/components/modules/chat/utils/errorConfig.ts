import { GeminiApiErrorCode } from "@/app/api/gemini/types";
import { personalInfo } from "@/data/personalInfo";
import { socials } from "@/data/socials";
import { NestedTranslationKey } from "@/i18n/types";

export enum ErrorCategory {
  RateLimit = "rate-limit",
  ApiIssue = "api-issue",
  UserInput = "user-input",
}

export interface GeminiErrorDetails {
  errorCode?: GeminiApiErrorCode;
  config: GeminiErrorConfig;
  resetTime?: string;
  remaining?: number;
}

export interface GeminiErrorConfig {
  category: ErrorCategory;
  titleKey: NestedTranslationKey<"Chat">;
  messageKey: NestedTranslationKey<"Chat">;
  showContactInfo?: boolean;
  showRetry?: boolean;
  disableInput?: boolean;
}

export const geminiErrorConfigs: Record<GeminiApiErrorCode, GeminiErrorConfig> =
  {
    [GeminiApiErrorCode.RATE_LIMIT_EXCEEDED]: {
      category: ErrorCategory.RateLimit,
      titleKey: "errors.rateLimit.title",
      messageKey: "errors.rateLimit.message",
      showContactInfo: true,
      showRetry: false,
      disableInput: true,
    },

    [GeminiApiErrorCode.MISSING_FIELDS]: {
      category: ErrorCategory.UserInput,
      titleKey: "errors.missingFields.title",
      messageKey: "errors.missingFields.message",
      showContactInfo: false,
      showRetry: true,
      disableInput: false,
    },

    [GeminiApiErrorCode.API_KEY_NOT_CONFIGURED]: {
      category: ErrorCategory.ApiIssue,
      titleKey: "errors.apiKeyNotConfigured.title",
      messageKey: "errors.apiKeyNotConfigured.message",
      showContactInfo: true,
      showRetry: false,
      disableInput: true,
    },

    [GeminiApiErrorCode.GEMINI_QUOTA_EXCEEDED]: {
      category: ErrorCategory.ApiIssue,
      titleKey: "errors.geminiQuotaExceeded.title",
      messageKey: "errors.geminiQuotaExceeded.message",
      showContactInfo: true,
      showRetry: false,
      disableInput: true,
    },

    [GeminiApiErrorCode.EMPTY_RESPONSE]: {
      category: ErrorCategory.ApiIssue,
      titleKey: "errors.emptyResponse.title",
      messageKey: "errors.emptyResponse.message",
      showContactInfo: false,
      showRetry: true,
      disableInput: false,
    },

    [GeminiApiErrorCode.INTERNAL_ERROR]: {
      category: ErrorCategory.ApiIssue,
      titleKey: "errors.internalError.title",
      messageKey: "errors.internalError.message",
      showContactInfo: false,
      showRetry: true,
      disableInput: false,
    },
  };

export function getErrorConfig(
  errorCode?: GeminiApiErrorCode,
): GeminiErrorConfig {
  if (!errorCode) {
    return {
      category: ErrorCategory.ApiIssue,
      titleKey: "errors.unexpectedError.title",
      messageKey: "errors.unexpectedError.message",
      showContactInfo: false,
      showRetry: true,
      disableInput: false,
    };
  }

  return (
    geminiErrorConfigs[errorCode] ||
    geminiErrorConfigs[GeminiApiErrorCode.INTERNAL_ERROR]
  );
}

export function getContactInfo() {
  return {
    email: personalInfo.email,
    phone: personalInfo.phone,
    socials: socials,
    name: personalInfo.name,
  };
}
