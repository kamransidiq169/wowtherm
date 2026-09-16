"use client";

import { Canvas } from "@react-three/fiber";
import { HeroAnimProvider } from "@/lib/hero-anim-state";
import { HeroScene } from "./three/HeroScene";

interface HeroCanvasProps {
  progressRef: React.RefObject<number>;
  reducedMotion: boolean;
  onCreated?: () => void;
}

/**
 * The actual Three.js Canvas. Separated for dynamic import.
 */
export function HeroCanvas({
  progressRef,
  reducedMotion,
  onCreated,
}: HeroCanvasProps) {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 50,
        position: [0, 3.5, 5],
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      frameloop="always"
      onCreated={onCreated}
    >
      <HeroAnimProvider>
        <HeroScene progressRef={progressRef} reducedMotion={reducedMotion} />
      </HeroAnimProvider>
    </Canvas>
  );
}
