import { ChatMessage } from "@/app/api/gemini/types";
import { useAppTranslations } from "@/i18n";
import { Message } from "@/types/common";
import { useCallback, useState } from "react";
import useAiContext from "./useAiContext";

export function useGeminiClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { context } = useAiContext();
  const t = useAppTranslations("Chat");

  const ask = useCallback(
    async (question: string, messages?: Message[]) => {
      setLoading(true);
      setError(null);

      try {
        // Filter and convert messages to ChatMessage format (only user and assistant roles)
        const chatHistory: ChatMessage[] | undefined = messages
          ?.filter((msg) => msg.role === "user" || msg.role === "assistant")
          .map((msg) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          }));

        const res = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ context, question, chatHistory }),
        });

        const data = await res.json();

        if (!res.ok) {
          // If response is not OK, throw the data so error handler can access errorCode
          setLoading(false);
          throw data;
        }

        setLoading(false);
        return data;
      } catch (err) {
        // Check if it's a fetch error or API error response
        const errorMessage =
          err && typeof err === "object" && "errorCode" in err
            ? t("errors.unexpectedError.message")
            : (err as Error).message || t("errors.unexpectedError.message");
        setError(errorMessage);
        setLoading(false);
        throw err;
      }
    },
    [context, t],
  );

  return { ask, loading, error };
}
