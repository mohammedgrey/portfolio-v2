import { FullscreenOverlay } from "@/components/common/FullScreenOverlay";
import { StackItem } from "@/types/common";
import { Center } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { StackIcon3D } from "./StackIcon3D";
import { STACK_ICON_SCALE } from "./stackSceneConstants";

interface StackOverlayProps {
  item: StackItem;
  layoutId: string;
  onClose: () => void;
}

export function StackOverlay({ item, layoutId, onClose }: StackOverlayProps) {
  const descriptionLines = item.description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const introLine =
    descriptionLines.find((line) => !line.startsWith("- ")) || "";
  const descriptionPoints = descriptionLines
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());

  return (
    <FullscreenOverlay onClose={onClose}>
      <div className="w-full max-h-[calc(100dvh-env(safe-area-inset-top)-4rem)] overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 pt-0 pb-6 sm:pt-0 sm:pb-10">
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
              className="mt-4 text-center space-y-3"
            >
              <h3 className="text-2xl font-bold text-foreground">
                {item.title}
              </h3>

              {introLine && (
                <p className="mx-auto max-w-xl text-start text-sm leading-relaxed text-muted-foreground">
                  {introLine}
                </p>
              )}

              {descriptionPoints.length > 0 && (
                <ul className="mx-auto max-w-xl space-y-2 text-start text-sm leading-relaxed text-muted-foreground">
                  {descriptionPoints.map((point, index) => (
                    <li
                      key={`${item.id}-point-${index}`}
                      className="list-disc ms-5"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              {descriptionPoints.length > 0 && (
                <ul className="mx-auto max-w-xl space-y-2 text-start text-sm leading-relaxed text-muted-foreground">
                  {descriptionPoints.map((point, index) => (
                    <li
                      key={`${item.id}-point-${index}`}
                      className="list-disc ms-5"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </FullscreenOverlay>
  );
}
