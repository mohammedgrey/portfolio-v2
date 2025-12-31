"use client";
import { ChatMessageList } from "@/components/modules/chat/components/ChatMessagesList";

import useChatController from "@/components/modules/chat/hooks/useChatController";
import { motion } from "framer-motion";
import { ChatInput } from "./ChatInput";

export const ChatInterface = ({
  inputLayoutId,
}: {
  inputLayoutId?: string;
}) => {
  const { messages, loadingNewMessage, onRetryLastMessage, chatInputProps } =
    useChatController();

  return (
    <div className={`flex flex-col h-full w-full`}>
      <div className="flex-1">
        <ChatMessageList
          messages={messages}
          loadingNewMessage={loadingNewMessage}
          onRetryLastMessage={onRetryLastMessage}
        />
      </div>
      <motion.div layoutId={inputLayoutId}>
        <ChatInput {...chatInputProps} />
      </motion.div>
    </div>
  );
};
