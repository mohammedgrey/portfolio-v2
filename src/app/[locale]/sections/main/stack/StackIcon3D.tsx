import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Group } from "three";
import { SkeletonUtils } from "three-stdlib";

const normalizedModelTemplateCache = new Map<string, THREE.Object3D>();

type Props = {
  model: string;
  color: string;
  rotate?: boolean;
};

export function StackIcon3D({ model, color, rotate }: Props) {
  const { scene } = useGLTF(model);
  const groupRef = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  // Normalize each model once, then reuse that prepared template across all usages.
  const normalizedTemplate = useMemo(() => {
    const cachedTemplate = normalizedModelTemplateCache.get(model);
    if (cachedTemplate) {
      return cachedTemplate;
    }

    const centeredRoot = new THREE.Group();
    const normalizedClone = SkeletonUtils.clone(scene);
    normalizedClone.updateWorldMatrix(true, true);

    const bounds = new THREE.Box3().setFromObject(normalizedClone);
    const center = bounds.getCenter(new THREE.Vector3());
    normalizedClone.position.set(-center.x, -center.y, -center.z);

    centeredRoot.add(normalizedClone);
    normalizedModelTemplateCache.set(model, centeredRoot);
    return centeredRoot;
  }, [model, scene]);

  // Each render gets its own instance from the normalized template.
  const instanceScene = useMemo(
    () => SkeletonUtils.clone(normalizedTemplate),
    [normalizedTemplate],
  );

  // Create material per instance (cheap + safe)
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.4,
        metalness: 0.1,
      }),
    [color],
  );

  // Apply material & shadows to the CLONE
  useMemo(() => {
    instanceScene.traverse(
      (
        child: THREE.Object3D & { isMesh?: boolean; material?: THREE.Material },
      ) => {
        if (child.isMesh) {
          child.material = material;
        }
      },
    );
  }, [instanceScene, material]);

  // Ensure demand-driven canvases re-render after async model/material setup.
  useEffect(() => {
    invalidate();
  }, [instanceScene, material, invalidate]);

  // Optional rotation
  useFrame((_, delta) => {
    if (rotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive ref={groupRef} object={instanceScene} />;
}
