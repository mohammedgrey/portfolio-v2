import { GoogleGenerativeAI } from "@google/generative-ai";
import { after } from "next/server";
import { buildPrompt } from "./promptBuilder";
import { checkRateLimit, getUserIdentifier } from "./rateLimit";
import { logChatToTelegram } from "./telegramLogger";
import { GeminiApiErrorCode, RequestBody } from "./types";

export async function POST(request: Request) {
  try {
    // Check rate limit
    const userId = getUserIdentifier(request);
    const rateLimit = checkRateLimit(userId);

    if (!rateLimit.allowed) {
      const resetDate = new Date(rateLimit.resetTime).toISOString();
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          errorCode: GeminiApiErrorCode.RATE_LIMIT_EXCEEDED,
          resetTime: resetDate,
          remaining: 0,
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const body: RequestBody = await request.json();
    const { context, question, chatHistory = [] } = body;

    if (!context || !question) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: context and question",
          errorCode: GeminiApiErrorCode.MISSING_FIELDS,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const apiKeys = [
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_API_KEY_BACK_UP,
    ].filter(Boolean) as string[];

    if (!apiKeys?.length) {
      return new Response(
        JSON.stringify({
          error: "API key not configured",
          errorCode: GeminiApiErrorCode.API_KEY_NOT_CONFIGURED,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const prompt = buildPrompt(context, question, chatHistory);

    // Try primary API key first
    let text: string | null = null;
    let lastError: Error | null = null;

    for (const apiKey of apiKeys) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash-lite",
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();

        if (text) {
          // Success! Break out of the loop
          break;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";

        // Check if it's a quota error
        if (errorMessage.includes("429") || errorMessage.includes("quota")) {
          lastError = err instanceof Error ? err : new Error(errorMessage);
          // Continue to try the next API key
          continue;
        }

        // For other errors, throw immediately
        throw err;
      }
    }

    // If we still don't have text after trying all keys
    if (!text) {
      if (lastError) {
        // All keys exceeded quota
        return new Response(
          JSON.stringify({
            error: "Gemini API quota exceeded. Please try again later.",
            errorCode: GeminiApiErrorCode.GEMINI_QUOTA_EXCEEDED,
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({
          error: "Empty response from Gemini",
          errorCode: GeminiApiErrorCode.EMPTY_RESPONSE,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    after(() => logChatToTelegram(question, text));

    return new Response(
      JSON.stringify({
        answer: text,
        remaining: rateLimit.remaining,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    if (errorMessage.includes("429") || errorMessage.includes("quota")) {
      return new Response(
        JSON.stringify({
          error: "Gemini API quota exceeded. Please try again later.",
          errorCode: GeminiApiErrorCode.GEMINI_QUOTA_EXCEEDED,
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        error: errorMessage,
        errorCode: GeminiApiErrorCode.INTERNAL_ERROR,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
