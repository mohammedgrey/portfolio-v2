import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Group } from "three";
import { SkeletonUtils } from "three-stdlib";

type Props = {
  model: string;
  color: string;
  rotate?: boolean;
};

export function StackIcon3D({ model, color, rotate }: Props) {
  const { scene } = useGLTF(model);
  const groupRef = useRef<Group>(null);

  // Clone the scene per usage (CRITICAL)
  const clonedScene = useMemo(() => {
    return SkeletonUtils.clone(scene);
  }, [scene]);

  // Create material per instance (cheap + safe)
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.4,
        metalness: 0.1,
      }),
    [color]
  );

  // Apply material & shadows to the CLONE
  useMemo(() => {
    clonedScene.traverse(
      (
        child: THREE.Object3D & { isMesh?: boolean; material?: THREE.Material }
      ) => {
        if (child.isMesh) {
          child.material = material;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }
    );
  }, [clonedScene, material]);

  // Optional rotation
  useFrame((_, delta) => {
    if (rotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive ref={groupRef} object={clonedScene} />;
}
