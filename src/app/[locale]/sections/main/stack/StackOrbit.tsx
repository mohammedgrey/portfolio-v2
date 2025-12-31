import useStackItems from "@/hooks/data/useStackItems";
import useStackOrbitController from "@/hooks/logic/useStackOrbitController";
import { getOrbitPosition } from "@/lib/orbitUtils";
import { StackItem } from "@/types/common";
import { FC } from "react";
import { StackOrbitItem } from "./StackOrbitItem";

const StackOrbit: FC<{
  isHoveringCanvas?: boolean;
  selectedItem: StackItem | null;
  onSelectItem: (item: StackItem) => void;
}> = ({ isHoveringCanvas = false, selectedItem, onSelectItem }) => {
  const { stackItems } = useStackItems();

  const {
    groupRef,
    hoveredItem,
    onPointerDown,
    onPointerUp,
    onPointerMove,
    setHoveredItem,
  } = useStackOrbitController({ isHoveringCanvas });

  return (
    <>
      {/* Invisible plane to capture pointer events across entire canvas */}
      <mesh
        position={[0, 0, 0]}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      {/* <MiddleSign /> */}

      <group ref={groupRef}>
        {stackItems.map((item, index) => {
          const orbitPos = getOrbitPosition(index, stackItems.length, 3);
          return (
            <StackOrbitItem
              key={item.id}
              item={item}
              orbitPos={orbitPos}
              isHovered={hoveredItem?.id === item.id}
              onHover={(isHovered) => setHoveredItem(isHovered ? item : null)}
              isSelected={selectedItem?.id === item.id}
              onClick={() => onSelectItem(item)}
            />
          );
        })}
      </group>
    </>
  );
};

export default StackOrbit;
