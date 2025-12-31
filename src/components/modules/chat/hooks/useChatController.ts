import type { ChatInputProps } from "@/components/modules/chat/components/ChatInput";
import { useAppTranslations } from "@/i18n";
import {
  addMessage as addMessageAction,
  removeLastErrorMessage as removeLastErrorMessageAction,
  selectChatInput,
  selectChatLoading,
  selectChatMessages,
  selectLastUserMessage,
  selectSessionId,
  setInput as setInputAction,
  setLoading as setLoadingAction,
  setSessionId as setSessionIdAction,
} from "@/store/global/non-persisted/chatSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Message } from "@/types/common";
import { useGeminiClient } from "./useGemini";

const useChatController = () => {
  const t = useAppTranslations("Chat");
  const { ask } = useGeminiClient();

  const input = useAppSelector(selectChatInput);
  const sessionId = useAppSelector(selectSessionId);
  const messages = useAppSelector(selectChatMessages);
  const loadingNewMessage = useAppSelector(selectChatLoading);
  const lastUserMessage = useAppSelector(selectLastUserMessage);

  const dispatch = useAppDispatch();

  const setInput = (value: string) => {
    dispatch(setInputAction(value));
  };

  const setSessionId = (value: string | null) => {
    dispatch(setSessionIdAction(value));
  };

  const addMessage = (message: Message) => {
    dispatch(addMessageAction(message));
  };
  const removeLastErrorMessage = () => {
    dispatch(removeLastErrorMessageAction());
  };

  const setLoadingNewMessage = (value: boolean) => {
    dispatch(setLoadingAction(value));
  };

  const handleSendMessage = (msg: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
    };
    addMessage(newUserMessage);
    sendMessage(msg?.trim() || "");
  };

  const getApiResponse = async (message: string) => {
    // Call the Gemini API using the context from useGeminiClient
    try {
      const response = await ask(message);
      // response should match your GeminiResponseSchema
      if (response.type === "simple_answer") {
        return response.answer;
      } else if (response.type === "answer_with_action") {
        // You can format the action however you want for the chat
        return `${response.answer}\n\n[Action: ${response.action}]`;
      }
      return "No valid response from AI.";
    } catch (err) {
      console.error("Gemini API error:", err);
      throw err;
    }
  };

  const sendMessage = async (message: string) => {
    setLoadingNewMessage(true);
    try {
      const responseText = await getApiResponse(message);
      addMessage({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
      addMessage({
        id: `error-${(Date.now() + 1).toString()}`,
        role: "error",
        content: t("errors.noAnswer"),
      } as const);
    } finally {
      setLoadingNewMessage(false);
    }
  };

  const handleRetryLastMessage = async () => {
    removeLastErrorMessage();
    if (lastUserMessage) sendMessage(lastUserMessage.content);
  };

  const handleSendMessageFromInput = () => {
    if (!input.trim()) return;
    handleSendMessage(input);
    setInput("");
  };

  const hasMessages = messages.length > 0;

  const chatInputProps = {
    value: input,
    onChange: setInput,
    onSend: handleSendMessageFromInput,
  } satisfies ChatInputProps;

  return {
    messages,
    onSendMessage: handleSendMessage,
    loadingNewMessage,
    onRetryLastMessage: handleRetryLastMessage,
    chatInputProps,
    hasMessages,
    sessionId,
    setSessionId,
  };
};

export default useChatController;

export type UseChatControllerReturn = ReturnType<typeof useChatController>;
