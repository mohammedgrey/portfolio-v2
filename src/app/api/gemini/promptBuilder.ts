import { ChatMessage } from "./types";

export function buildPrompt(
  context: string,
  question: string,
  chatHistory: ChatMessage[],
): string {
  const previousUserMessage = [...chatHistory]
    .reverse()
    .find((msg) => msg.role === "user")?.content;
  const previousAssistantMessage = [...chatHistory]
    .reverse()
    .find((msg) => msg.role === "assistant")?.content;

  // Build prompt with chat history
  let prompt = `Context:
${context}

`;

  prompt += `Conversation Handling Rules:
- Treat the current question as part of an ongoing conversation, not as an isolated prompt.
- Use recent conversation history to resolve pronouns and references (e.g., "it", "that", "the previous one").
- If the user asks a follow-up, continue from the latest relevant message unless the user changes topic.
- If history and current question conflict, prioritize the current question.

`;

  // Include previous messages if available
  if (chatHistory.length > 0) {
    prompt += `Recent Conversation (oldest to newest):\n`;
    chatHistory.forEach((msg) => {
      const roleLabel = msg.role === "user" ? "User" : "Assistant";
      prompt += `${roleLabel}: ${msg.content}\n`;
    });
    prompt += "\n";

    if (previousUserMessage) {
      prompt += `Latest User Message:\n${previousUserMessage}\n\n`;
    }

    if (previousAssistantMessage) {
      prompt += `Latest Assistant Message:\n${previousAssistantMessage}\n\n`;
    }
  }

  prompt += `Current Question:\n${question}`;

  return prompt;
}
