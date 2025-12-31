"use client";

import AppSection from "@/components/common/AppSection";
import { StackItem } from "@/types/common";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, type FC } from "react";
import StackOrbit from "./StackOrbit";
import { StackOverlay } from "./StackOverlay";

const StackSection: FC = () => {
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StackItem | null>(null);

  return (
    <>
      <AppSection
        id="stack"
        className="rounded-md"
        onMouseEnter={() => setIsHoveringCanvas(true)}
        onMouseLeave={() => setIsHoveringCanvas(false)}
        style={{
          height: "400px",
          width: "100%",
          maxWidth: "672px",
          cursor: "grab",
          marginInline: "auto",
        }}
      >
        <AppSection.Title className="">Tech Stack</AppSection.Title>
        <Canvas camera={{ position: [0, 1, 6], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          {isHoveringCanvas && <Environment preset="night" />}

          <Suspense fallback={null}>
            <StackOrbit
              isHoveringCanvas={isHoveringCanvas}
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
            />
          </Suspense>
        </Canvas>
      </AppSection>
      {selectedItem && (
        <StackOverlay
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};

export default StackSection;
