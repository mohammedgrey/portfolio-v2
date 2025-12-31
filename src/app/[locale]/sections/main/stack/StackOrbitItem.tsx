import { StackItem } from "@/types/common";
import { animated, useSpring } from "@react-spring/three";
import { FC } from "react";
import { StackIcon3D } from "./StackIcon3D";

const AnimatedGroup = animated.group;

interface StackOrbitItemProps {
  item: StackItem;
  orbitPos: [number, number, number];
  isSelected: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hover: boolean) => void;
  rotate?: boolean;
}

export const StackOrbitItem: FC<StackOrbitItemProps> = ({
  item,
  orbitPos,
  isHovered,
  onClick,
  onHover,
}) => {
  const { position, scale } = useSpring({
    position: orbitPos,
    scale: isHovered ? 0.01 : 0.008,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <AnimatedGroup
      position={position.to((x, y, z) => [x, y, z] as [number, number, number])}
      scale={scale}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
      onClick={onClick}
    >
      <StackIcon3D model={item.model} color={item.color} />
    </AnimatedGroup>
  );
};
