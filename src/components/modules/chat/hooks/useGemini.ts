import { useCallback, useState } from "react";
import useAiContext from "./useAiContext";

export function useGeminiClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { context } = useAiContext();

  const ask = useCallback(async (question: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context, question }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError((err as Error).message || "Unknown error");
      setLoading(false);
      throw err;
    }
  }, []);

  return { ask, loading, error };
}
