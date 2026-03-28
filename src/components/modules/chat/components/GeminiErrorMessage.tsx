import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { personalInfo } from "@/data/personalInfo";
import { useAppTranslations } from "@/i18n";
import { cn } from "@/lib/utils";
import { AlertTriangle, RefreshCw } from "lucide-react";
import React from "react";
import { ErrorCategory, GeminiErrorDetails } from "../utils/errorConfig";
import InMessageContactInfo from "./InMessageContactInfo";

interface GeminiErrorMessageProps {
  errorDetails: GeminiErrorDetails;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

export const GeminiErrorMessage: React.FC<GeminiErrorMessageProps> = ({
  errorDetails,
  onRetry,
  showRetryButton = true,
}) => {
  const t = useAppTranslations();
  const tChat = useAppTranslations("Chat");
  const { config } = errorDetails;

  const title = tChat(config.titleKey);
  const message = tChat(config.messageKey, { name: personalInfo.firstName });

  const getCategoryColor = () => {
    switch (config.category) {
      case ErrorCategory.RateLimit:
        return "border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10";
      default:
        return "border-destructive/20 bg-destructive/5 dark:bg-destructive/10";
    }
  };

  const getTextColor = () => {
    switch (config.category) {
      case ErrorCategory.RateLimit:
        return "text-amber-700 dark:text-amber-400";
      default:
        return "text-destructive";
    }
  };

  return (
    <Card
      className={cn(
        "p-3 border-2 flex flex-col gap-2.5",
        getCategoryColor(),
        "animate-in fade-in slide-in-from-bottom-2 duration-300",
      )}
    >
      {/* Header with Icon and Title */}
      <div className="flex items-start gap-2.5">
        <AlertTriangle
          className={cn("w-5 h-5 shrink-0 mt-0.5", getTextColor())}
        />
        <div className="flex flex-col gap-1 flex-1">
          <h3 className={cn("font-semibold text-base", getTextColor())}>
            {title}
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      {config.showContactInfo && <InMessageContactInfo />}

      {/* Retry Button */}
      {config.showRetry && showRetryButton && onRetry && (
        <div className="flex flex-col border-t border-border/50 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2"
            onClick={onRetry}
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t("Chat.actions.tryAgain")}</span>
          </Button>
        </div>
      )}
    </Card>
  );
};
