"use client";
import { ChatMessageList } from "@/components/modules/chat/components/ChatMessagesList";
import useChatController from "@/components/modules/chat/hooks/useChatController";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChatInput } from "./ChatInput";
import ChatMessageListFallback from "./ChatMessageListFallback";
import { RateLimitBanner } from "./RateLimitBanner";

type ChatInterfaceProps = {
  inputLayoutId?: string;
};

const getKeyboardInset = () => {
  if (typeof window === "undefined") return 0;
  const viewport = window.visualViewport;
  if (!viewport) return 0;

  return Math.max(
    0,
    window.innerHeight - (viewport.height + viewport.offsetTop),
  );
};

export const ChatInterface = ({ inputLayoutId }: ChatInterfaceProps) => {
  const [keyboardInset, setKeyboardInset] = useState(0);
  const controlsContainerClass = "mx-auto w-full max-w-[700px] px-4";

  const {
    messages,
    loadingNewMessage,
    onRetryLastMessage,
    chatInputProps,
    isRateLimited,
    resetTime,
    hasMessages,
    onSendMessage,
  } = useChatController();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateKeyboardInset = () => {
      setKeyboardInset(getKeyboardInset());
    };

    updateKeyboardInset();
    const viewport = window.visualViewport;
    if (!viewport) return;

    viewport.addEventListener("resize", updateKeyboardInset);
    viewport.addEventListener("scroll", updateKeyboardInset);

    return () => {
      viewport.removeEventListener("resize", updateKeyboardInset);
      viewport.removeEventListener("scroll", updateKeyboardInset);
    };
  }, []);

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <div className="min-h-0 flex-1">
        {hasMessages ? (
          <ChatMessageList
            messages={messages}
            loadingNewMessage={loadingNewMessage}
            onRetryLastMessage={onRetryLastMessage}
          />
        ) : (
          <ChatMessageListFallback
            onSendMessage={onSendMessage}
            disabled={isRateLimited}
          />
        )}
      </div>
      <div className={controlsContainerClass}>
        {isRateLimited && <RateLimitBanner resetTime={resetTime} />}
      </div>
      <div
        className={controlsContainerClass}
        style={{
          paddingBottom: `calc(max(env(safe-area-inset-bottom), 0.5rem) + ${isRateLimited ? 0 : keyboardInset}px)`,
        }}
      >
        <motion.div
          layoutId={inputLayoutId}
          layout="position"
          className="w-full"
        >
          <ChatInput {...chatInputProps} />
        </motion.div>
      </div>
    </div>
  );
};
