export enum GeminiApiErrorCode {
  MISSING_FIELDS = "MISSING_FIELDS",
  API_KEY_NOT_CONFIGURED = "API_KEY_NOT_CONFIGURED",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
  GEMINI_QUOTA_EXCEEDED = "GEMINI_QUOTA_EXCEEDED",
  EMPTY_RESPONSE = "EMPTY_RESPONSE",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface RequestBody {
  context: string;
  question: string;
  chatHistory?: ChatMessage[];
}

export interface GeminiApiError {
  errorCode: GeminiApiErrorCode;
  resetTime?: string;
  remaining?: number;
  error?: string;
}
