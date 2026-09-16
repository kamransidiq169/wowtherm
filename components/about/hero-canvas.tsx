"use client";

import { Suspense, useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Tube, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";

/**
 * About hero cross-section scene.
 *
 * Assembles from a stacked state on load (GSAP timeline),
 * then idles with a very slow ambient rotation.
 * Uses frameloop="demand" — only re-renders when explicitly invalidated.
 *
 * Colors match WowTherm's cream/black/copper palette.
 */

/* ------------------------------------------------------------------ */
/* Palette                                                             */
/* ------------------------------------------------------------------ */

const PALETTE = {
  subfloor: "#6B6153",
  insulation: "#D9CDBB",
  matBody: "#3A342C",
  coil: "#C1652E",
  coilGlow: "#FF8A3D",
  finish: "#EADFCC",
};

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

const LAYER_W = 4.2;
const LAYER_D = 2.6;

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
      <RoundedBox args={[LAYER_W, height, LAYER_D]} radius={radius} smoothness={4}>
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.02} />
      </RoundedBox>
      {children}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Heating coil (serpentine path)                                      */
/* ------------------------------------------------------------------ */

function HeatingCoil({ intensityRef }: { intensityRef: React.RefObject<number> }) {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const turns = 6;
    const w = LAYER_W * 0.84;
    const d = LAYER_D * 0.76;
    const steps = 250;
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
      matRef.current.emissiveIntensity = 0.3 + intensityRef.current * 3.5;
    }
  });

  return (
    <Tube args={[curve, 250, 0.04, 8, false]}>
      <meshStandardMaterial
        ref={matRef}
        color={PALETTE.coil}
        emissive={PALETTE.coilGlow}
        emissiveIntensity={0.3}
        roughness={0.4}
        metalness={0.3}
      />
    </Tube>
  );
}

/* ------------------------------------------------------------------ */
/* Cross-section assembly                                              */
/* ------------------------------------------------------------------ */

function CrossSection({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const subfloorRef = useRef<THREE.Group>(null);
  const insulationRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.Group>(null);
  const finishRef = useRef<THREE.Group>(null);
  const coilIntensityRef = useRef(0);
  const { invalidate } = useThree();
  const assembledRef = useRef(false);

  // Stacked (start) → Assembled (target)
  const stacked = { subfloor: -1.6, insulation: -0.55, mat: 0.25, finish: 1.05 };
  const assembled = { subfloor: -0.6, insulation: -0.2, mat: 0.15, finish: 0.42 };

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const progressRef = useRef(0);

  // Assemble on mount with GSAP (or skip for reduced motion)
  useEffect(() => {
    if (assembledRef.current) return;
    assembledRef.current = true;

    if (reducedMotion) {
      // Skip animation — show assembled state immediately
      progressRef.current = 1;
      coilIntensityRef.current = 1;
      invalidate();
      return;
    }

    const tl = gsap.timeline({
      onUpdate: () => {
        invalidate();
      },
    });

    tl.to(progressRef, {
      current: 1,
      duration: 2.4,
      ease: "power3.out",
      delay: 0.3,
    });

    tl.to(
      coilIntensityRef,
      {
        current: 1,
        duration: 1.8,
        ease: "power2.out",
        delay: 0.8,
      },
      0,
    );

    return () => {
      tl.kill();
    };
  }, [invalidate, reducedMotion]);

  // Slow idle rotation + interpolate layer positions
  useFrame((_, delta) => {
    if (!group.current) return;
    const p = progressRef.current;

    // Interpolate layer positions
    if (subfloorRef.current)
      subfloorRef.current.position.y = lerp(stacked.subfloor, assembled.subfloor, p);
    if (insulationRef.current)
      insulationRef.current.position.y = lerp(stacked.insulation, assembled.insulation, p);
    if (matRef.current)
      matRef.current.position.y = lerp(stacked.mat, assembled.mat, p);
    if (finishRef.current)
      finishRef.current.position.y = lerp(stacked.finish, assembled.finish, p);

    // Very slow idle rotation
    group.current.rotation.y += delta * 0.04;
    invalidate();
  });

  return (
    <group ref={group} rotation={[0.22, -0.6, 0]}>
      <group ref={subfloorRef} position={[0, stacked.subfloor, 0]}>
        <Layer y={0} height={0.5} color={PALETTE.subfloor} />
      </group>
      <group ref={insulationRef} position={[0, stacked.insulation, 0]}>
        <Layer y={0} height={0.28} color={PALETTE.insulation} />
      </group>
      <group ref={matRef} position={[0, stacked.mat, 0]}>
        <Layer y={0} height={0.16} color={PALETTE.matBody}>
          <HeatingCoil intensityRef={coilIntensityRef} />
        </Layer>
      </group>
      <group ref={finishRef} position={[0, stacked.finish, 0]}>
        <Layer y={0} height={0.14} color={PALETTE.finish} radius={0.02} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Main export                                                          */
/* ------------------------------------------------------------------ */

interface HeroCanvasProps {
  onCreated?: () => void;
  reducedMotion?: boolean;
}

export default function HeroCanvas({ onCreated, reducedMotion = false }: HeroCanvasProps) {
  return (
    <Canvas
      camera={{ position: [4, 2.5, 5], fov: 30 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="demand"
      onCreated={onCreated}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        {/* Fog matching page background */}
        <fog attach="fog" args={["#111110", 8, 22]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 7, 4]} intensity={1.4} color="#faf7f2" />
        <directionalLight position={[-3, 2, -4]} intensity={0.2} color="#EADFCC" />
        <pointLight position={[0, 0.3, 0]} intensity={0.8} color="#FF8A3D" distance={4} />

        {/* Cross-section */}
        <CrossSection reducedMotion={reducedMotion} />

        {/* Environment for material reflections */}
        <Environment resolution={128}>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial color="#1a1a1a" side={THREE.DoubleSide} />
          </mesh>
        </Environment>

        {/* Post-processing */}
        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
