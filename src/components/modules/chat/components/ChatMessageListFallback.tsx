import { Button } from "@/components/ui/button";
import { useAppTranslations } from "@/i18n";
import { cn } from "@/lib/utils";
import { MessageSquare, Sparkles, User } from "lucide-react";
import { type FC } from "react";
import { UseChatControllerReturn } from "../hooks/useChatController";

export type ChatMessageListFallbackProps = Readonly<{
  onSendMessage: UseChatControllerReturn["onSendMessage"];
  disabled: boolean;
}>;

const suggestions = [
  {
    icon: User,
    key: "experience" as const,
    gradient: "from-primary to-primary/50",
  },
  {
    icon: Sparkles,
    key: "skills" as const,
    gradient: "from-primary to-primary/50",
  },
  {
    icon: MessageSquare,
    key: "projects" as const,
    gradient: "from-primary to-primary/50",
  },
];

const ChatMessageListFallback: FC<ChatMessageListFallbackProps> = ({
  onSendMessage,
  disabled,
}) => {
  const t = useAppTranslations("Chat");

  const handleSuggestionClick = (
    suggestionKey: (typeof suggestions)[number]["key"],
  ) => {
    if (disabled) return;
    const message = t(`suggestions.${suggestionKey}.message`);
    onSendMessage(message);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            {t("suggestions.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("suggestions.description")}
          </p>
        </div>

        {/* Suggestions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestions.map(({ icon: Icon, key, gradient }) => (
            <Button
              key={key}
              variant="outline"
              disabled={disabled}
              onClick={() => handleSuggestionClick(key)}
              className={cn(
                "h-auto flex-col items-start gap-3 p-4 hover:border-primary/50 transition-all group relative overflow-hidden",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              {/* Gradient Background on Hover */}
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-5 transition-opacity",
                  gradient,
                )}
              />

              {/* Icon */}
              <div
                className={cn(
                  "w-10 h-10 rounded-lg bg-linear-to-br flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-all duration-500",
                  gradient,
                )}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="space-y-1 text-start">
                <h3 className="font-semibold text-sm">
                  {t(`suggestions.${key}.title`)}
                </h3>
                <p className="text-xs whitespace-pre-wrap text-muted-foreground line-clamp-2">
                  {t(`suggestions.${key}.description`)}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageListFallback;
