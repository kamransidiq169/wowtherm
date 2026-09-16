// "use client";

// import { useEffect, useMemo, useRef } from "react";
// import * as THREE from "three";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { Environment, Html, Lightformer } from "@react-three/drei";
// import type { Milestone } from "./spiral-timeline";

// export interface SpiralSceneProps {
//   milestones: Milestone[];
//   /** Scroll progress 0–1, written by the pinned ScrollTrigger. */
//   progressRef: React.RefObject<number>;
//   /** Hands the parent this canvas's on-demand render trigger. */
//   registerInvalidate: (fn: (() => void) | null) => void;
// }
// // hi this is kamran
// // Helix proportions, loosely after a spiral staircase: a dark central pole,
// // wood-toned steps winding upward, a thin rail running through the nodes.
// const RADIUS = 2.1;
// const V_STEP = 0.78;
// /** World-space height the active (front-facing) milestone is held at. */
// const LIFT = 0.55;

// const GOLD = "#e8b64c";
// const MIDNIGHT = "#2e3350";
// const STEEL = "#3a4160";
// const PEARL = "#eef1f8";
// const CREAM = "#faf7f2";

// class HelixCurve extends THREE.Curve<THREE.Vector3> {
//   constructor(
//     private totalAngle: number,
//     private totalRise: number,
//   ) {
//     super();
//   }

//   getPoint(t: number, target = new THREE.Vector3()) {
//     // Slight overhang past both ends so the rail doesn't stop dead on the
//     // first and last steps.
//     const u = t * 1.08 - 0.04;
//     const a = u * this.totalAngle;
//     return target.set(
//       RADIUS * Math.cos(a),
//       u * this.totalRise,
//       RADIUS * Math.sin(a),
//     );
//   }
// }

// const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
// const smooth = (v: number) => v * v * (3 - 2 * v);

// function Spiral({ milestones, progressRef, registerInvalidate }: SpiralSceneProps) {
//   const groupRef = useRef<THREE.Group>(null);
//   const nodeMatRefs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const invalidate = useThree((s) => s.invalidate);
//   const width = useThree((s) => s.size.width);

//   const count = milestones.length;
//   const angleStep = (Math.PI * 2) / Math.max(1, count - 1);
//   const totalAngle = angleStep * (count - 1);
//   const totalRise = V_STEP * (count - 1);

//   useEffect(() => {
//     registerInvalidate(invalidate);
//     return () => registerInvalidate(null);
//   }, [invalidate, registerInvalidate]);

//   const curve = useMemo(
//     () => new HelixCurve(totalAngle, totalRise),
//     [totalAngle, totalRise],
//   );

//   const steps = useMemo(
//     () =>
//       milestones.map((_, i) => {
//         const a = angleStep * i;
//         return {
//           angle: a,
//           node: new THREE.Vector3(
//             RADIUS * Math.cos(a),
//             V_STEP * i,
//             RADIUS * Math.sin(a),
//           ),
//           card: new THREE.Vector3(
//             (RADIUS + 0.6) * Math.cos(a),
//             V_STEP * i + 0.02,
//             (RADIUS + 0.6) * Math.sin(a),
//           ),
//         };
//       }),
//     [milestones, angleStep],
//   );

//   useFrame(() => {
//     const group = groupRef.current;
//     if (!group) return;

//     // Continuous milestone index: 0 at the top of the section, count-1 at the
//     // bottom. Rotating by (angleStep * t − 90°) puts milestone t at the front
//     // (+Z, facing the camera); sinking by V_STEP * t holds it at eye height —
//     // the spiral "climbs" past a static camera.
//     const t = clamp01(progressRef.current ?? 0) * (count - 1);
//     group.rotation.y = angleStep * t - Math.PI / 2;
//     group.position.y = LIFT - V_STEP * t;

//     // How directly each milestone faces the camera, 1 at front. Neighbouring
//     // milestones sit at cos(angleStep), which maps to 0 activity.
//     const edge = Math.cos(angleStep);
//     for (let i = 0; i < count; i++) {
//       const front = Math.cos(angleStep * (i - t));
//       const s = smooth(clamp01((front - edge) / (1 - edge)));

//       const mat = nodeMatRefs.current[i];
//       if (mat) mat.emissiveIntensity = s * 0.9;

//       const card = cardRefs.current[i];
//       if (card) {
//         card.style.opacity = String(0.16 + 0.84 * s);
//         card.style.filter = s < 0.98 ? `blur(${(1 - s) * 2.5}px)` : "none";
//       }
//     }
//   });

//   const scale = width < 640 ? 0.78 : 1;

//   return (
//     <group ref={groupRef} scale={scale}>
//       {/* Central pole: tapered brushed-steel shaft, gold collar under each
//           step, a weighted foot below and a gold finial above. */}
//       <group>
//         <mesh position={[0, totalRise / 2, 0]}>
//           <cylinderGeometry args={[0.05, 0.08, totalRise + 2.6, 28]} />
//           <meshStandardMaterial color={STEEL} metalness={0.92} roughness={0.22} />
//         </mesh>
//         {steps.map((step) => (
//           <mesh key={step.angle} position={[0, step.node.y - 0.09, 0]}>
//             <cylinderGeometry args={[0.092, 0.092, 0.05, 24]} />
//             <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.25} />
//           </mesh>
//         ))}
//         <mesh position={[0, -1.26, 0]}>
//           <cylinderGeometry args={[0.1, 0.16, 0.1, 28]} />
//           <meshStandardMaterial color={STEEL} metalness={0.9} roughness={0.3} />
//         </mesh>
//         <mesh position={[0, totalRise + 1.32, 0]}>
//           <sphereGeometry args={[0.075, 24, 24]} />
//           <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.2} />
//         </mesh>
//       </group>

//       {/* Rail: a thin tube swept along the helix. */}
//       <mesh>
//         <tubeGeometry args={[curve, 160, 0.028, 10, false]} />
//         <meshStandardMaterial color={MIDNIGHT} metalness={0.75} roughness={0.25} />
//       </mesh>

//       {steps.map((step, i) => (
//         <group key={milestones[i].year}>
//           {/* Pearl step from the pole out to the rail. */}
//           <mesh
//             position={[step.node.x / 2, step.node.y - 0.09, step.node.z / 2]}
//             rotation={[0, -step.angle, 0]}
//           >
//             <boxGeometry args={[RADIUS, 0.06, 0.38]} />
//             <meshStandardMaterial color={PEARL} metalness={0.15} roughness={0.5} />
//           </mesh>

//           {/* Milestone node on the rail; glows gold when facing the camera. */}
//           <mesh position={step.node}>
//             <sphereGeometry args={[0.09, 20, 20]} />
//             <meshStandardMaterial
//               ref={(m) => {
//                 nodeMatRefs.current[i] = m;
//               }}
//               color={GOLD}
//               emissive={GOLD}
//               emissiveIntensity={0}
//               roughness={0.35}
//             />
//           </mesh>

//           {/* Milestone copy as crisp DOM, anchored just outside its node.
//               distanceFactor keeps the perspective scale of the 3D scene. */}
//           <Html
//             position={step.card}
//             center
//             distanceFactor={7}
//             wrapperClass="pointer-events-none select-none"
//           >
//             <div
//               ref={(el) => {
//                 cardRefs.current[i] = el;
//               }}
//               className="w-52 rounded-xl bg-cream-50/80 px-4 py-3 text-center shadow-sm backdrop-blur-sm"
//               style={{ opacity: i === 0 ? 1 : 0.16 }}
//             >
//               <p className="font-display text-2xl text-copper-600">
//                 {milestones[i].year}
//               </p>
//               <p className="mt-1 text-[13px] leading-relaxed text-charcoal-600">
//                 {milestones[i].text}
//               </p>
//             </div>
//           </Html>
//         </group>
//       ))}
//     </group>
//   );
// }

// export default function SpiralScene(props: SpiralSceneProps) {
//   return (
//     <Canvas
//       // On-demand frames only: the ScrollTrigger invalidates per scroll tick,
//       // so nothing renders while the user isn't scrolling.
//       frameloop="demand"
//       dpr={[1, 2]}
//       gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
//       camera={{ position: [0, 1.7, 8.2], fov: 36 }}
//       onCreated={({ camera, gl }) => {
//         camera.lookAt(0, 0.9, 0);
//         // R3F sets touch-action: none for its pointer events; this scene has
//         // no interactions, and on touch devices that traps page scrolling on
//         // a full-viewport pinned canvas.
//         gl.domElement.style.touchAction = "pan-y";
//       }}
//       className="absolute inset-0"
//     >
//       {/* Fog matches the page's cream background, fading the far side of the
//           spiral the way distant steps recede on a real staircase. */}
//       <fog attach="fog" args={[CREAM, 7.5, 12.5]} />
//       <ambientLight intensity={0.85} />
//       <directionalLight position={[4, 7, 5]} intensity={1.35} />
//       <directionalLight position={[-5, 2, -2]} intensity={0.4} />

//       {/* Local studio reflections (rendered once, no network fetch) — without
//           an environment the metallic pole and rail read as flat plastic. */}
//       <Environment resolution={64} frames={1}>
//         <Lightformer
//           intensity={2.2}
//           position={[0, 4, 6]}
//           scale={[9, 4, 1]}
//           color="#fff4e2"
//         />
//         <Lightformer
//           intensity={1.1}
//           position={[-6, 2, -2]}
//           rotation-y={Math.PI / 2}
//           scale={[6, 3, 1]}
//           color="#dde6ff"
//         />
//         <Lightformer
//           intensity={0.9}
//           position={[6, 1, 2]}
//           rotation-y={-Math.PI / 2}
//           scale={[5, 2, 1]}
//           color="#ffe3b4"
//         />
//       </Environment>
//       <Spiral {...props} />
//     </Canvas>
//   );
// }



"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer } from "@react-three/drei";
import type { Milestone } from "./spiral-timeline";

export interface SpiralSceneProps {
  milestones: Milestone[];
  /** Scroll progress 0–1, written by the pinned ScrollTrigger. */
  progressRef: React.RefObject<number>;
  /** Hands the parent this canvas's on-demand render trigger. */
  registerInvalidate: (fn: (() => void) | null) => void;
}

// Helix proportions, loosely after a spiral staircase: a dark central pole,
// wood-toned steps winding upward, a thin rail running through the nodes.
const RADIUS = 2.1;
const V_STEP = 0.78;
/** World-space height the active (front-facing) milestone is held at. */
const LIFT = 0.55;

const GOLD = "#e8b64c";
const MIDNIGHT = "#2e3350";
const STEEL = "#3a4160";
const PEARL = "#eef1f8";
const CREAM = "#faf7f2";

class HelixCurve extends THREE.Curve<THREE.Vector3> {
  constructor(
    private totalAngle: number,
    private totalRise: number,
  ) {
    super();
  }

  getPoint(t: number, target = new THREE.Vector3()) {
    // Slight overhang past both ends so the rail doesn't stop dead on the
    // first and last steps.
    const u = t * 1.08 - 0.04;
    const a = u * this.totalAngle;
    return target.set(
      RADIUS * Math.cos(a),
      u * this.totalRise,
      RADIUS * Math.sin(a),
    );
  }
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

function Spiral({ milestones, progressRef, registerInvalidate }: SpiralSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeMatRefs = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const invalidate = useThree((s) => s.invalidate);
  const width = useThree((s) => s.size.width);
  const clock = useThree((s) => s.clock);

  const count = milestones.length;
  const angleStep = (Math.PI * 2) / Math.max(1, count - 1);
  const totalAngle = angleStep * (count - 1);
  const totalRise = V_STEP * (count - 1);

  useEffect(() => {
    registerInvalidate(invalidate);
    return () => registerInvalidate(null);
  }, [invalidate, registerInvalidate]);

  const curve = useMemo(
    () => new HelixCurve(totalAngle, totalRise),
    [totalAngle, totalRise],
  );

  const steps = useMemo(
    () =>
      milestones.map((_, i) => {
        const a = angleStep * i;
        return {
          angle: a,
          node: new THREE.Vector3(
            RADIUS * Math.cos(a),
            V_STEP * i,
            RADIUS * Math.sin(a),
          ),
          card: new THREE.Vector3(
            (RADIUS + 0.6) * Math.cos(a),
            V_STEP * i + 0.02,
            (RADIUS + 0.6) * Math.sin(a),
          ),
        };
      }),
    [milestones, angleStep],
  );

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    // Continuous milestone index: 0 at the top of the section, count-1 at the
    // bottom. Rotating by (angleStep * t − 90°) puts milestone t at the front
    // (+Z, facing the camera); sinking by V_STEP * t holds it at eye height —
    // the spiral "climbs" past a static camera.
    const t = clamp01(progressRef.current ?? 0) * (count - 1);
    group.rotation.y = angleStep * t - Math.PI / 2;
    group.position.y = LIFT - V_STEP * t;

    // How directly each milestone faces the camera, 1 at front. Neighbouring
    // milestones sit at cos(angleStep), which maps to 0 activity.
    const edge = Math.cos(angleStep);
    for (let i = 0; i < count; i++) {
      const front = Math.cos(angleStep * (i - t));
      const s = smooth(clamp01((front - edge) / (1 - edge)));

      const mat = nodeMatRefs.current[i];
      if (mat) mat.emissiveIntensity = 0.3 + s * 1.1;

      const card = cardRefs.current[i];
      if (card) {
        card.style.opacity = String(0.14 + 0.86 * s);
        card.style.filter = s < 0.98 ? `blur(${(1 - s) * 2.5}px)` : "none";
        card.style.transform = `translateY(${(1 - s) * 6}px)`;
      }
    }
  });

  // Idle breathing drift — a couple of degrees, always-on, independent of
  // scroll. Reads as a considered cinematic touch rather than a static
  // render, without ever competing with the scroll-driven rotation.
  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    const drift = Math.sin(clock.elapsedTime * 0.18) * 0.035;
    group.rotation.z = drift;
  });

  const scale = width < 640 ? 0.78 : 1;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Central pole: tapered brushed-steel shaft, gold collar under each
          step, a weighted foot below and a gold finial above. */}
      <group>
        <mesh position={[0, totalRise / 2, 0]}>
          <cylinderGeometry args={[0.05, 0.08, totalRise + 2.6, 28]} />
          <meshPhysicalMaterial
            color={STEEL}
            metalness={0.95}
            roughness={0.32}
            clearcoat={0.6}
            clearcoatRoughness={0.25}
            anisotropy={1}
          />
        </mesh>
        {steps.map((step) => (
          <mesh key={step.angle} position={[0, step.node.y - 0.09, 0]}>
            <cylinderGeometry args={[0.092, 0.092, 0.05, 24]} />
            <meshPhysicalMaterial
              color={GOLD}
              metalness={0.9}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.12}
              reflectivity={0.7}
            />
          </mesh>
        ))}
        <mesh position={[0, -1.26, 0]}>
          <cylinderGeometry args={[0.1, 0.16, 0.1, 28]} />
          <meshPhysicalMaterial color={STEEL} metalness={0.92} roughness={0.35} clearcoat={0.4} />
        </mesh>
        <mesh position={[0, totalRise + 1.32, 0]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshPhysicalMaterial color={GOLD} metalness={0.9} roughness={0.15} clearcoat={1} />
        </mesh>
      </group>

      {/* Rail: a thin tube swept along the helix. */}
      <mesh>
        <tubeGeometry args={[curve, 160, 0.028, 10, false]} />
        <meshPhysicalMaterial color={MIDNIGHT} metalness={0.8} roughness={0.28} clearcoat={0.5} />
      </mesh>

      {steps.map((step, i) => (
        <group key={milestones[i].year}>
          {/* Pearl step from the pole out to the rail. */}
          <mesh
            position={[step.node.x / 2, step.node.y - 0.09, step.node.z / 2]}
            rotation={[0, -step.angle, 0]}
          >
            <boxGeometry args={[RADIUS, 0.06, 0.38]} />
            <meshPhysicalMaterial
              color={PEARL}
              metalness={0.1}
              roughness={0.4}
              clearcoat={0.3}
              clearcoatRoughness={0.4}
            />
          </mesh>

          {/* Milestone node on the rail; glows gold when facing the camera. */}
          <mesh position={step.node}>
            <sphereGeometry args={[0.09, 20, 20]} />
            <meshPhysicalMaterial
              ref={(m) => {
                nodeMatRefs.current[i] = m;
              }}
              color={GOLD}
              emissive={GOLD}
              emissiveIntensity={0.3}
              roughness={0.3}
              clearcoat={1}
              clearcoatRoughness={0.15}
            />
          </mesh>

          {/* Milestone copy as crisp DOM, anchored just outside its node.
              distanceFactor keeps the perspective scale of the 3D scene. */}
          <Html
            position={step.card}
            center
            distanceFactor={7}
            wrapperClass="pointer-events-none select-none"
          >
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="w-52 rounded-sm border-t border-copper-500/60 bg-cream-50/85 px-4 py-3.5 text-center shadow-[0_12px_28px_-8px_rgba(46,51,80,0.28)] backdrop-blur-sm transition-transform duration-300"
              style={{ opacity: i === 0 ? 1 : 0.14 }}
            >
              <p className="font-display text-2xl tracking-tight text-copper-600 tabular-nums">
                {milestones[i].year}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-600">
                {milestones[i].text}
              </p>
            </div>
          </Html>
        </group>
      ))}

      {/* Grounding shadow — without this the whole spiral reads as pasted
          onto the background rather than standing in the space. */}
      <ContactShadows
        position={[0, -1.34, 0]}
        opacity={0.35}
        scale={9}
        blur={2.4}
        far={2}
        color={MIDNIGHT}
        frames={1}
      />
    </group>
  );
}

export default function SpiralScene(props: SpiralSceneProps) {
  return (
    <Canvas
      // On-demand frames only: the ScrollTrigger invalidates per scroll tick,
      // plus a light always-on tick for the idle camera/pole drift.
      frameloop="always"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.7, 8.2], fov: 36 }}
      onCreated={({ camera, gl }) => {
        camera.lookAt(0, 0.9, 0);
        // R3F sets touch-action: none for its pointer events; this scene has
        // no interactions, and on touch devices that traps page scrolling on
        // a full-viewport pinned canvas.
        gl.domElement.style.touchAction = "pan-y";
      }}
      className="absolute inset-0"
    >
      {/* Fog matches the page's cream background, fading the far side of the
          spiral the way distant steps recede on a real staircase. */}
      <fog attach="fog" args={[CREAM, 7.5, 12.5]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 7, 5]} intensity={1.4} />
      <directionalLight position={[-5, 2, -2]} intensity={0.45} />
      <pointLight position={[0, 0.5, 3]} intensity={0.3} color={GOLD} />

      {/* Local studio reflections (rendered once, no network fetch) — without
          an environment the metallic pole and rail read as flat plastic. */}
      <Environment resolution={64} frames={1}>
        <Lightformer
          intensity={2.4}
          position={[0, 4, 6]}
          scale={[9, 4, 1]}
          color="#fff4e2"
        />
        <Lightformer
          intensity={1.1}
          position={[-6, 2, -2]}
          rotation-y={Math.PI / 2}
          scale={[6, 3, 1]}
          color="#dde6ff"
        />
        <Lightformer
          intensity={0.95}
          position={[6, 1, 2]}
          rotation-y={-Math.PI / 2}
          scale={[5, 2, 1]}
          color="#ffe3b4"
        />
      </Environment>
      <Spiral {...props} />
    </Canvas>
  );
}