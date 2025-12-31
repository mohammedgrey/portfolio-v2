import { FullscreenOverlay } from "@/components/common/FullScreenOverlay";
import { StackItem } from "@/types/common";
import { Canvas } from "@react-three/fiber";
import { StackIcon3D } from "./StackIcon3D";

interface StackOverlayProps {
  item: StackItem;
  onClose: () => void;
}

export function StackOverlay({ item, onClose }: StackOverlayProps) {
  return (
    <FullscreenOverlay onClose={onClose}>
      <div className="flex flex-col max-w-2xl mx-auto items-center pt-24 text-white">
        <div className="h-[300px] w-[300px]">
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <group scale={0.015}>
              <StackIcon3D model={item.model} color={item.color} rotate />
            </group>
          </Canvas>
        </div>

        <div className="mt-6 text-center max-w-md">
          <h3 className="text-2xl font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-muted">{item.description}</p>
        </div>
      </div>
    </FullscreenOverlay>
  );
}
