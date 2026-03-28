import { GeminiApiError } from "@/app/api/gemini/types";
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
import { useRateLimit } from "./useRateLimit";

const useChatController = () => {
  const t = useAppTranslations("Chat");
  const { ask } = useGeminiClient();
  const { isRateLimited, resetTime, handleRateLimitError } = useRateLimit();

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
      const response = await ask(message, messages);
      // response is now a simple object with just an answer property
      return response.answer || "No response from AI.";
    } catch (err) {
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
      // Check if error has Gemini API error details
      const hasErrorCode =
        error && typeof error === "object" && "errorCode" in error;
      const apiError = hasErrorCode ? (error as GeminiApiError) : null;

      // Handle rate limit
      if (apiError) {
        handleRateLimitError(apiError.errorCode, apiError.resetTime);
      }

      addMessage({
        id: `error-${(Date.now() + 1).toString()}`,
        role: "error",
        content: hasErrorCode ? "" : t("errors.noAnswer"),
        errorCode: apiError?.errorCode,
        resetTime: apiError?.resetTime,
        remaining: apiError?.remaining,
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
    disabled: isRateLimited || loadingNewMessage,
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
    isRateLimited,
    resetTime,
  };
};

export default useChatController;

export type UseChatControllerReturn = ReturnType<typeof useChatController>;
