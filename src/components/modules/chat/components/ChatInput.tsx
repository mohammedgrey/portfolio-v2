import { Button } from "@/components/ui/button";
import { useAppTranslations } from "@/i18n";
import { cn } from "@/lib/utils";
import { ArrowUp, Mic } from "lucide-react";
import React, { useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import TextareaAutosize from "react-textarea-autosize";

export interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder,
  disabled = false,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const t = useAppTranslations("Chat");

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (transcript) onChange(transcript);
  }, [transcript]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col rounded-md border border-input bg-transparent transition-[color,box-shadow] focus-within:border-ring  px-3 py-3 text-sm"
    >
      <div className="flex">
        <TextareaAutosize
          autoFocus
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          minRows={1}
          maxRows={4}
          disabled={disabled}
          placeholder={
            listening
              ? t("placeholders.listening")
              : placeholder || t("placeholders.text")
          }
          className={cn(
            "grow",
            "resize-none bg-transparent placeholder:text-muted-foreground text-foreground",
            "outline-none border-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
            "dark:bg-transparent",
          )}
        />

        <div className="flex justify-end items-center pt-2 gap-1.5 pl-2">
          {browserSupportsSpeechRecognition && (
            <Button
              onClick={() =>
                SpeechRecognition[
                  listening ? "stopListening" : "startListening"
                ]()
              }
              type="button"
              variant="ghost"
              disabled={disabled}
              className={cn("w-8! h-8!", {
                "animate-pulse text-primary!": listening,
              })}
            >
              <Mic className="w-4 h-4" />
            </Button>
          )}

          <Button
            type="submit"
            disabled={!value.trim() || disabled}
            className="w-8! h-8!"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};
