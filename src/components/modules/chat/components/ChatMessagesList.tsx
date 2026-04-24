import { MessageBubble } from "@/components/modules/chat/components/MessageBubble";
import { useAppTranslations } from "@/i18n";
import { Message } from "@/types/common";
import { useEffect, useRef } from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";

export interface ChatMessageListProps {
  messages: Message[];
  loadingNewMessage?: boolean;
  onRetryLastMessage: () => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  loadingNewMessage,
  onRetryLastMessage,
}) => {
  const t = useAppTranslations("Chat");
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const prevDataLengthRef = useRef(0);

  const data = [
    ...messages,
    ...(loadingNewMessage
      ? [
          {
            id: "loading",
            role: "loading",
            content: t("placeholders.loading"),
          } as const,
        ]
      : []),
  ];

  // Scroll to bottom whenever data grows (new user message or loading indicator appears).
  // setTimeout defers until after Virtuoso has measured and positioned the new item,
  // so "LAST" resolves to the actual newest item instead of the pre-update last one.
  useEffect(() => {
    if (data.length > prevDataLengthRef.current) {
      prevDataLengthRef.current = data.length;
      setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({
          index: "LAST",
          align: "end",
          behavior: "smooth",
        });
      }, 0);
    } else {
      prevDataLengthRef.current = data.length;
    }
  }, [data.length]);

  return (
    <Virtuoso
      style={{ scrollBehavior: "auto", overscrollBehavior: "contain" }}
      ref={virtuosoRef}
      data={data}
      className="h-full"
      alignToBottom
      followOutput={(isAtBottom) => (isAtBottom ? "smooth" : false)}
      initialTopMostItemIndex={{ index: data.length - 1, align: "end" }}
      itemContent={(index, message) => (
        <MessageBubble
          key={message.id}
          message={message}
          onRetryLastMessage={onRetryLastMessage}
          isLastMessage={index === messages.length - 1}
        />
      )}
    />
  );
};
