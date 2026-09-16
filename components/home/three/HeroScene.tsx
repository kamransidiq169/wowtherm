"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { heroAnimState } from "@/lib/hero-anim-state";
import { FloorLayers } from "./FloorLayers";
import { HeatingCable } from "./HeatingCable";
import { ThermalField } from "./ThermalField";
import { CameraController } from "./CameraController";
import { SceneLighting } from "./SceneLighting";

interface HeroSceneProps {
  /** Ref to scroll progress value (0–1) */
  progressRef: React.RefObject<number>;
  /** Whether reduced motion is active */
  reducedMotion?: boolean;
}

/**
 * Smoothly maps a progress value through a range, returning 0–1.
 */
function smoothProgress(progress: number, start: number, end: number): number {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  const t = (progress - start) / (end - start);
  return t * t * (3 - 2 * t);
}

/**
 * The complete 3D scene for the WowTherm cinematic hero experience.
 * Composes floor layers, heating cable, thermal field, and lighting.
 * All animations driven by scroll progress via shared heroAnimState.
 */
export function HeroScene({ progressRef, reducedMotion = false }: HeroSceneProps) {
  const timeRef = useRef(0);
  const cableMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    if (reducedMotion) return;

    const progress = progressRef.current;
    timeRef.current += delta;
    const s = heroAnimState;

    // Floor separation: 15%–40%
    s.separation = smoothProgress(progress, 0.15, 0.4);

    // Cable energy activation: 35%–60%
    s.cableIntensity = smoothProgress(progress, 0.35, 0.6);

    // Thermal field: 45%–70%
    s.thermalIntensity = smoothProgress(progress, 0.45, 0.7);

    // Warmth (lighting): 40%–80%
    s.warmth = smoothProgress(progress, 0.4, 0.8);

    // Thermal field disappears: 80%–90%
    if (progress > 0.8) {
      s.thermalIntensity *= 1 - smoothProgress(progress, 0.8, 0.9);
    }

    // Cable fades: 85%–95%
    if (progress > 0.85) {
      s.cableIntensity *= 1 - smoothProgress(progress, 0.85, 0.95);
    }

    // Floor layers come back together: 80%–95%
    if (progress > 0.8) {
      s.separation *= 1 - smoothProgress(progress, 0.8, 0.95);
    }

    s.time = timeRef.current;

    // Update cable material directly via ref
    if (cableMaterialRef.current) {
      const ci = s.cableIntensity;
      cableMaterialRef.current.emissiveIntensity = ci * 2.5;
      cableMaterialRef.current.emissive.setRGB(
        ci * 0.83,
        ci * 0.47 * 0.7,
        ci * 0.23 * 0.5,
      );
    }
  });

  return (
    <>
      <CameraController progressRef={progressRef} reducedMotion={reducedMotion} />
      <SceneLighting />

      <FloorLayers width={5} length={7} />

      <group position={[0, -0.09, 0]}>
        <HeatingCableInner materialRef={cableMaterialRef} />
      </group>

      <ThermalField width={5} length={7} />

      {/* Dark ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111110" roughness={0.95} />
      </mesh>
    </>
  );
}

/**
 * Inner wrapper to expose cable material ref.
 */
function HeatingCableInner({
  materialRef,
}: {
  materialRef: React.RefObject<THREE.MeshStandardMaterial | null>;
}) {
  return <HeatingCable materialRef={materialRef} />;
}
