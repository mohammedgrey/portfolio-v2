"use client";
import { useDateFormat } from "@/hooks/common/useDateFormat";
import { useAppTranslations } from "@/i18n";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface RateLimitBannerProps {
  resetTime?: string;
}

export const RateLimitBanner: React.FC<RateLimitBannerProps> = ({
  resetTime,
}) => {
  const t = useAppTranslations("Chat");
  const { formatDayName, formatTime } = useDateFormat();

  const formattedTime = resetTime
    ? t("actions.resetsAt", {
        day: formatDayName(resetTime),
        time: formatTime(resetTime),
      })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="w-full bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2.5 mb-3"
    >
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="text-sm text-amber-900 dark:text-amber-100">
            {t("banners.rateLimitReached")}
          </p>
        </div>
        {!!formattedTime && (
          <p className="text-sm text-amber-700 dark:text-amber-300 font-medium whitespace-nowrap">
            {formattedTime}
          </p>
        )}
      </div>
    </motion.div>
  );
};
