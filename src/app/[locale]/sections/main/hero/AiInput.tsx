"use client";

import { AiIcon } from "@/assets/icons";
import { FullscreenOverlay } from "@/components/common/FullScreenOverlay";
import { ChatInterface } from "@/components/modules/chat/components/ChatInterface";
import { Input } from "@/components/ui/input";
import { WhenHydrated } from "@/components/wrappers/WhenHydrated";
import { useAppTranslations } from "@/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { type FC, useEffect, useRef, useState } from "react";
import { CookiesProvider } from "react-cookie";

const AiInput: FC = () => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => setFocused(true);
  const t = useAppTranslations("HomePage");

  useEffect(() => {
    const handleOpenAiAssistant = () => setFocused(true);

    window.addEventListener("open-ai-assistant", handleOpenAiAssistant);

    return () => {
      window.removeEventListener("open-ai-assistant", handleOpenAiAssistant);
    };
  }, []);

  return (
    <WhenHydrated>
      <div className="relative w-full">
        <AnimatePresence initial={false}>
          {!focused && (
            <motion.div
              layoutId="ai-input"
              layout="position"
              className="z-20"
              key="input-alone"
            >
              <Input
                className="h-10! border-input/80 bg-background/60 backdrop-blur-xl shadow-sm"
                ref={inputRef}
                onFocus={handleFocus}
                placeholder={t("hero.inputPlaceholder")}
                endAdornment={
                  <motion.div
                    animate={{
                      opacity: [0.7, 0.9, 0.7],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <AiIcon className="w-5 h-5 text-foreground" />
                  </motion.div>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {focused && (
            <motion.div>
              <FullscreenOverlay
                onClose={() => setFocused(false)}
                contentClassName="h-[100dvh] py-4"
              >
                <CookiesProvider>
                  <ChatInterface inputLayoutId="ai-input" />
                </CookiesProvider>
              </FullscreenOverlay>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WhenHydrated>
  );
};

export default AiInput;
