import { ChatMessage } from "./types";

export function buildPrompt(
  context: string,
  question: string,
  chatHistory: ChatMessage[],
): string {
  // Build prompt with chat history
  let prompt = `Context:
${context}

`;

  // Include previous messages if available
  if (chatHistory.length > 0) {
    prompt += `Previous Conversation:\n`;
    chatHistory.forEach((msg) => {
      const roleLabel = msg.role === "user" ? "User" : "Assistant";
      prompt += `${roleLabel}: ${msg.content}\n`;
    });
    prompt += "\n";
  }

  prompt += `Current Question:\n${question}`;

  return prompt;
}
