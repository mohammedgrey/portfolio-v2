"use client";

import { FullscreenOverlay } from "@/components/common/FullScreenOverlay";
import { ChatInterface } from "@/components/modules/chat/components/ChatInterface";
import { Input } from "@/components/ui/input";
import { WhenHydrated } from "@/components/wrappers/WhenHydrated";
import { useAppTranslations } from "@/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { type FC, useRef, useState } from "react";

const AiInput: FC = () => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => setFocused(true);
  const t = useAppTranslations("HomePage");

  return (
    <WhenHydrated>
      <div className="relative w-full">
        <AnimatePresence initial={false}>
          {!focused && (
            <motion.div layoutId="ai-input" className="z-20" key="input-alone">
              <Input
                className="h-10!"
                ref={inputRef}
                onFocus={handleFocus}
                placeholder={t("hero.inputPlaceholder")}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {focused && (
            <motion.div>
              <FullscreenOverlay
                onClose={() => setFocused(false)}
                contentClassName="h-screen py-4 mx-auto max-w-2xl"
              >
                <ChatInterface inputLayoutId="ai-input" />
              </FullscreenOverlay>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WhenHydrated>
  );
};

export default AiInput;
