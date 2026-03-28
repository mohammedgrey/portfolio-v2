import CopyMessageButton from "@/components/modules/chat/components/CopyMessageButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Message } from "@/types/common";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import React from "react";
import { getErrorConfig } from "../utils/errorConfig";
import AssistantMessageBubleContent from "./AssistantMessageBubleContent";
import { GeminiErrorMessage } from "./GeminiErrorMessage";

interface MessageBubbleProps {
  message: Message;
  onRetryLastMessage?: () => void;
  isLastMessage?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onRetryLastMessage,
  isLastMessage,
}) => {
  return (
    <div className="pb-6 first:pt-4 max-w-[700px] px-4 mx-auto">
      <div
        className={cn("flex flex-col gap-2", {
          "ms-auto max-w-[80%]": message.role === "user",
          "me-auto": message.role === "assistant",
        })}
      >
        {message.role === "loading" && (
          <div className="flex gap-2 items-center">
            <Loader2 className="animate-spin text-muted-foreground w-4 h-4" />
            <div className="text-sm text-muted-foreground">
              {message.content}
            </div>
          </div>
        )}

        {message.role === "error" && (
          <div className="max-w-[700px] w-full">
            {message.errorCode ? (
              <GeminiErrorMessage
                errorDetails={{
                  errorCode: message.errorCode,
                  config: getErrorConfig(message.errorCode),
                  resetTime: message.resetTime,
                  remaining: message.remaining,
                }}
                onRetry={isLastMessage ? onRetryLastMessage : undefined}
                showRetryButton={isLastMessage}
              />
            ) : (
              <div
                className={cn(
                  "wrap-break-word flex gap-2 self-start justify-between items-center max-w-none rounded-md px-4 py-2 bg-destructive/5 text-destructive",
                )}
              >
                <div className="flex-1 items-center gap-2 flex">
                  <AlertTriangle className="w-4! h-4! shrink-0" />
                  <span className="text-sm py-1">{message.content}</span>
                </div>
                {onRetryLastMessage && isLastMessage && (
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                    onClick={onRetryLastMessage}
                  >
                    <RefreshCw className="w-4! h-4!" />
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {message.role === "user" && (
          <pre
            style={{ fontFamily: "inherit" }}
            className={cn(
              "wrap-break-word text-wrap max-w-none bg-gray-100 dark:bg-gray-800 rounded-lg px-4 rounded-br-sm rounded-bl-lg rtl:rounded-bl-sm rtl:rounded-br-lg py-2",
            )}
          >
            {message.content}
          </pre>
        )}

        {message.role === "assistant" && (
          <div className={cn("wrap-break-word max-w-none bg-transparent")}>
            <AssistantMessageBubleContent message={message} />
          </div>
        )}

        <div
          className={cn("flex gap-2 items-center", {
            "justify-end": message.role === "user",
            "justify-start": message.role === "assistant",
          })}
        >
          {(message.role === "assistant" || message.role === "user") && (
            <CopyMessageButton content={message.content} />
          )}
        </div>
      </div>
    </div>
  );
};
