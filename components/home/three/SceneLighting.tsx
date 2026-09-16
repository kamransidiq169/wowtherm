"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { heroAnimState } from "@/lib/hero-anim-state";

/**
 * Premium architectural visualization lighting.
 * Transitions from cool neutral to warm as the heating system activates.
 * Reads warmth from shared heroAnimState.
 */
export function SceneLighting() {
  const warmLightRef = useRef<THREE.PointLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const warmth = heroAnimState.warmth;

    if (warmLightRef.current) {
      warmLightRef.current.intensity = 0.3 + warmth * 1.5;
      const r = 1.0;
      const g = 0.85 - warmth * 0.15;
      const b = 0.7 - warmth * 0.3;
      warmLightRef.current.color.setRGB(r, g, b);
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = 0.4 + warmth * 0.2;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.4} color="#e8e4e0" />

      <directionalLight
        position={[5, 8, 3]}
        intensity={0.8}
        color="#f5f0eb"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.001}
      />

      <directionalLight
        position={[-3, 4, -2]}
        intensity={0.3}
        color="#ddd8d0"
      />

      <pointLight
        ref={warmLightRef}
        position={[0, 0.5, 0]}
        intensity={0.3}
        color="#f0e0c8"
        distance={8}
        decay={2}
      />

      <pointLight
        position={[0, 5, -5]}
        intensity={0.2}
        color="#c8d0e0"
        distance={15}
        decay={2}
      />

      <fog attach="fog" args={["#1a1a1a", 5, 18]} />
    </>
  );
}
