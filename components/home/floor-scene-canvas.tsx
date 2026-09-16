"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Tube } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * FloorSceneCanvas
 * A literal 3D cross-section of the WowTherm floor build-up:
 * subfloor -> insulation -> heating mat (glowing coil) -> finish surface.
 *
 * `progress` (0-1) drives a single orchestrated moment: stacked -> exploded,
 * and the coil's glow ramping up. It is meant to be driven by scroll
 * position from the parent section, not by an internal loop.
 */

const PALETTE = {
  subfloor: "#6B6153",
  insulation: "#D9CDBB",
  matBody: "#3A342C",
  finish: "#EADFCC",
  coil: "#C1652E",
  coilGlow: "#FF8A3D",
};

const LAYER_WIDTH = 3.6;
const LAYER_DEPTH = 2.2;

type LayerProps = {
  y: number;
  height: number;
  color: string;
  radius?: number;
  children?: React.ReactNode;
};

function Layer({ y, height, color, radius = 0.03, children }: LayerProps) {
  return (
    <group position={[0, y, 0]}>
      <RoundedBox
        args={[LAYER_WIDTH, height, LAYER_DEPTH]}
        radius={radius}
        smoothness={4}
      >
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.02} />
      </RoundedBox>
      {children}
    </group>
  );
}

function HeatingCoil({ glow }: { glow: number }) {
  // Sine-wave serpentine path across the mat, laid flat inside the heating layer.
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const turns = 5;
    const w = LAYER_WIDTH * 0.82;
    const d = LAYER_DEPTH * 0.78;
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = -w / 2 + t * w;
      const z = Math.sin(t * turns * Math.PI * 2) * (d / 2);
      points.push(new THREE.Vector3(x, 0, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.4 + glow * 3.2;
    }
  });

  return (
    <Tube args={[curve, 200, 0.035, 8, false]}>
      <meshStandardMaterial
        ref={matRef}
        color={PALETTE.coil}
        emissive={PALETTE.coilGlow}
        emissiveIntensity={0.4}
        roughness={0.4}
        metalness={0.3}
      />
    </Tube>
  );
}

function CrossSection({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);

  // Base stacked positions (touching), and exploded target offsets.
  const stacked = { subfloor: -0.6, insulation: -0.2, mat: 0.15, finish: 0.42 };
  const exploded = { subfloor: -1.35, insulation: -0.35, mat: 0.45, finish: 1.15 };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const y = {
    subfloor: lerp(stacked.subfloor, exploded.subfloor, progress),
    insulation: lerp(stacked.insulation, exploded.insulation, progress),
    mat: lerp(stacked.mat, exploded.mat, progress),
    finish: lerp(stacked.finish, exploded.finish, progress),
  };

  useFrame((_, delta) => {
    if (group.current) {
      // gentle idle settle, not a loop — just easing toward current target
      group.current.rotation.y += 0;
      void delta;
    }
  });

  return (
    <group ref={group} rotation={[0.18, -0.55, 0]}>
      <Layer y={y.subfloor} height={0.5} color={PALETTE.subfloor} />
      <Layer y={y.insulation} height={0.28} color={PALETTE.insulation} />
      <Layer y={y.mat} height={0.16} color={PALETTE.matBody}>
        <HeatingCoil glow={progress} />
      </Layer>
      <Layer y={y.finish} height={0.14} color={PALETTE.finish} radius={0.02} />
    </group>
  );
}

export default function FloorSceneCanvas({ progress = 0 }: { progress?: number }) {
  const clamped = Math.min(1, Math.max(0, progress));

  return (
    <Canvas
      camera={{ position: [3.4, 2.1, 4.6], fov: 32 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 3]} intensity={1.3} castShadow={false} />
        <directionalLight position={[-3, 2, -4]} intensity={0.25} color="#EADFCC" />
        <pointLight
          position={[0, 0.3, 0]}
          intensity={0.6 + clamped * 1.4}
          color="#FF8A3D"
          distance={3}
        />

        <CrossSection progress={clamped} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          rotateSpeed={0.4}
          enableDamping
          dampingFactor={0.08}
        />

        <EffectComposer>
          <Bloom
            intensity={0.9 + clamped * 0.6}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
