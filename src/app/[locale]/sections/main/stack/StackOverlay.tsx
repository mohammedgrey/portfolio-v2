import { FullscreenOverlay } from "@/components/common/FullScreenOverlay";
import { useAppTranslations } from "@/i18n";
import { StackItem } from "@/types/common";
import { Center } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { StackIcon3D } from "./StackIcon3D";
import { STACK_ICON_SCALE } from "./stackSceneConstants";

interface StackOverlayProps {
  item: StackItem;
  layoutId: string;
  onClose: () => void;
}

export function StackOverlay({ item, layoutId, onClose }: StackOverlayProps) {
  const t = useAppTranslations("HomePage");

  const getExpertiseLabel = (level: number): string => {
    switch (level) {
      case 1:
        return t("stack.expertiseLabels.level1");
      case 2:
        return t("stack.expertiseLabels.level2");
      case 3:
        return t("stack.expertiseLabels.level3");
      case 4:
        return t("stack.expertiseLabels.level4");
      case 5:
        return t("stack.expertiseLabels.level5");
      default:
        return "";
    }
  };

  return (
    <FullscreenOverlay
      onClose={onClose}
      contentClassName="h-screen py-6 sm:py-10"
    >
      <div className="mx-auto flex h-full w-full max-w-3xl items-center px-4">
        <div className="w-full">
          <motion.div
            layoutId={layoutId}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="mx-auto aspect-square h-32 sm:h-36 md:h-40"
          >
            <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Center>
                <group scale={STACK_ICON_SCALE}>
                  <StackIcon3D model={item.model} color={item.color} rotate />
                </group>
              </Center>
            </Canvas>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.24, ease: "easeOut" }}
            className="mt-6 text-center space-y-4"
          >
            <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>

            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {t("stack.expertiseLevel")}
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Star
                    key={level}
                    className={`w-5 h-5 ${
                      level <= item.expertise
                        ? "fill-yellow-500 text-yellow-500 dark:fill-yellow-400 dark:text-yellow-400"
                        : "text-muted-foreground/30 dark:text-muted-foreground/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {item.expertise}/5 - {getExpertiseLabel(item.expertise)}
              </span>
            </div>

            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </motion.div>
        </div>
      </div>
    </FullscreenOverlay>
  );
}
