import { Text, useGLTF } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Group } from "three";

export function MiddleSign() {
  const { scene } = useGLTF("/assets/models/sign.glb");
  const groupRef = useRef<Group>(null);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  // Create glassy, transparent material
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#999999", // Blue tint
        roughness: 0.05,
        metalness: 0,
        transparent: true,
        opacity: 0.2,
        transmission: 0.98,
        thickness: 0.5,
        ior: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 1,
      }),
    []
  );

  // Apply material & shadows to the CLONE
  useMemo(() => {
    scene.traverse(
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
  }, [scene, material]);

  return (
    <>
      <group rotation={[Math.PI / 2, -Math.PI / 2, 0]} position={[-0.5, 1, 0]}>
        <primitive ref={groupRef} object={scene} />
      </group>
      <Text
        position={[0, 1, 0.1]} // Adjust to center on sign
        fontSize={0.3}
        color={isDarkMode ? "#ffffff" : "#000000"}
        anchorX="center"
        anchorY="middle"
      >
        Tech Stack
      </Text>
    </>
  );
}
