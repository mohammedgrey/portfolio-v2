import { StackItem } from "@/types/common";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group } from "three";

export type UseStackOrbitControllerInput = {
  isHoveringCanvas: boolean;
};
const useStackOrbitController = ({
  isHoveringCanvas,
}: UseStackOrbitControllerInput) => {
  // track drag state
  const groupRef = useRef<Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<StackItem | null>(null);
  const autoRotationOffset = useRef(0);
  const lastAutoRotationTime = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;

    if (!isHoveringCanvas && !isDragging) {
      // auto rotation around Y-axis
      const deltaTime = state.clock.elapsedTime - lastAutoRotationTime.current;
      groupRef.current.rotation.y += deltaTime * 0.1;
      autoRotationOffset.current = groupRef.current.rotation.y;
    }

    // always update last time
    lastAutoRotationTime.current = state.clock.elapsedTime;
  });

  // mouse drag handlers
  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (!groupRef.current) return;

    setIsDragging(true);
    // save current rotation as offset so auto-rotation continues from here
    autoRotationOffset.current = groupRef.current.rotation.y;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    if (!groupRef.current) return;

    setIsDragging(false);
    // update offset to current rotation so auto-rotation continues smoothly
    autoRotationOffset.current = groupRef.current.rotation.y;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging || !groupRef.current) return;

    // apply rotation directly to the group
    const deltaY = e.movementX * 0.01;
    groupRef.current.rotation.y += deltaY;
  };

  return {
    groupRef,
    isDragging,
    hoveredItem,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    setHoveredItem,
  };
};

export default useStackOrbitController;

export type UseStackOrbitControllerReturn = ReturnType<
  typeof useStackOrbitController
>;
