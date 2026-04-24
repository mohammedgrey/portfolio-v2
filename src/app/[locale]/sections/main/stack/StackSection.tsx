"use client";

import AppSection from "@/components/common/AppSection";
import useStackItems from "@/hooks/data/useStackItems";
import { useAppTranslations } from "@/i18n";
import { StackItem } from "@/types/common";
import { Center } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type FC } from "react";
import { StackIcon3D } from "./StackIcon3D";
import { StackOverlay } from "./StackOverlay";
import { STACK_ICON_SCALE } from "./stackSceneConstants";

const StackSection: FC = () => {
  const t = useAppTranslations("HomePage");
  const { stackItems } = useStackItems();
  const [selectedItem, setSelectedItem] = useState<StackItem | null>(null);

  const getSceneLayoutId = (itemId: string) => `stack-scene-${itemId}`;

  return (
    <>
      <div className="text-center mb-8 px-4 sm:px-6">
        <AppSection.Title className="mb-4">{t("stack.title")}</AppSection.Title>
        <AppSection.Description className="text-lg max-w-2xl mx-auto">
          {t("stack.description")}
        </AppSection.Description>
      </div>
      <AppSection id="stack" className="rounded-md">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {stackItems.map((item) => {
            const sceneLayoutId = getSceneLayoutId(item.id);

            return (
              <motion.button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                whileTap={{ scale: 0.995 }}
                className="group relative isolate cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card transition-colors duration-200 focus-visible:outline-none"
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
                <motion.div
                  layoutId={sceneLayoutId}
                  className="relative z-10 h-32 sm:h-36 md:h-40"
                >
                  <Canvas
                    camera={{ position: [0, 0, 3], fov: 42 }}
                    dpr={[1, 1.25]}
                  >
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[3, 4, 5]} intensity={1.2} />
                    <Center>
                      <group scale={STACK_ICON_SCALE}>
                        <StackIcon3D
                          model={item.model}
                          color={item.color}
                          rotate
                        />
                      </group>
                    </Center>
                  </Canvas>
                </motion.div>
                <div className="relative z-10 px-3 pb-3 pt-2 sm:px-4">
                  <h3 className="text-center text-sm font-semibold text-foreground sm:text-base">
                    {item.title}
                  </h3>
                </div>
              </motion.button>
            );
          })}
        </div>
      </AppSection>
      <AnimatePresence>
        {selectedItem && (
          <StackOverlay
            item={selectedItem}
            layoutId={getSceneLayoutId(selectedItem.id)}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default StackSection;
