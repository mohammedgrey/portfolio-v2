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
  },
  {
    icon: Sparkles,
    key: "skills" as const,
  },
  {
    icon: MessageSquare,
    key: "projects" as const,
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
    <div className="flex flex-1 h-full items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            {t("suggestions.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("suggestions.description")}
          </p>
        </div>

        {/* Mobile: swipeable suggestions */}
        <div className="md:hidden -mx-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-3 pb-1 px-4 after:content-[''] after:w-[1px] after:shrink-0">
            {suggestions.map(({ icon: Icon, key }) => (
              <Button
                key={key}
                variant="outline"
                disabled={disabled}
                onClick={() => handleSuggestionClick(key)}
                className={cn(
                  "h-auto w-[75vw] max-w-[280px] shrink-0 snap-center flex-col items-start gap-3 p-4 text-start relative isolate overflow-hidden rounded-2xl border border-border/60 bg-card group",
                  "transition-colors duration-200",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <div
                  className="pointer-events-none absolute inset-0 z-0 opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 20%, color-mix(in srgb, var(--color-background) 68%, transparent), transparent 60%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200 group-hover:opacity-70 dark:hidden"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 65%, color-mix(in oklch, var(--color-primary) 18%, white), transparent 70%)",
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 z-0 hidden opacity-0 transition-opacity duration-200 dark:block dark:group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 65%, color-mix(in srgb, var(--color-primary) 15%, transparent), transparent 70%)",
                  }}
                />

                <div className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="relative z-10 space-y-1 text-start">
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

        {/* Desktop: 3-column suggestions */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {suggestions.map(({ icon: Icon, key }) => (
            <Button
              key={key}
              variant="outline"
              disabled={disabled}
              onClick={() => handleSuggestionClick(key)}
              className={cn(
                "h-auto flex-col items-start gap-3 p-4 transition-colors duration-200 group relative isolate overflow-hidden rounded-2xl border border-border/60 bg-card",
                disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <div
                className="pointer-events-none absolute inset-0 z-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(circle at 50% 20%, color-mix(in srgb, var(--color-background) 68%, transparent), transparent 60%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200 group-hover:opacity-70 dark:hidden"
                style={{
                  background:
                    "radial-gradient(circle at 50% 65%, color-mix(in oklch, var(--color-primary) 18%, white), transparent 70%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 z-0 hidden opacity-0 transition-opacity duration-200 dark:block dark:group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 50% 65%, color-mix(in srgb, var(--color-primary) 15%, transparent), transparent 70%)",
                }}
              />

              <div className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>

              <div className="relative z-10 space-y-1 text-start">
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
