import { MessageBubble } from "@/components/modules/chat/components/MessageBubble";
import useUpdateEffect from "@/hooks/common/useUpdateEffect";
import { useAppTranslations } from "@/i18n";
import { Message } from "@/types/common";
import { useRef } from "react";
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
  const dataUpdatedRef = useRef<boolean>(false);
  const virtuosoRef = useRef<VirtuosoHandle>(null);

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

  useUpdateEffect(() => {
    dataUpdatedRef.current = true;
  }, [data]);

  return (
    <Virtuoso
      style={{ scrollBehavior: "auto" }}
      ref={virtuosoRef}
      data={data}
      className="h-full"
      scrollIntoViewOnChange={() => {
        if (!dataUpdatedRef.current) return;
        dataUpdatedRef.current = false;
        return {
          index: data.length - 1,
          behavior: "smooth",
          align: "end",
        };
      }}
      initialTopMostItemIndex={data.length - 1}
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
