"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraKeyframe {
  progress: number;
  position: [number, number, number];
  lookAt: [number, number, number];
}

interface CameraControllerProps {
  /** Ref to the current scroll progress (0–1) */
  progressRef: React.RefObject<number>;
  /** Whether reduced motion is active */
  reducedMotion?: boolean;
}

/**
 * Keyframe definitions for the camera journey through the heating system.
 * Camera starts in architectural view, descends through the floor,
 * explores the heating system, then returns.
 */
const keyframes: CameraKeyframe[] = [
  // 0% — Architectural perspective
  {
    progress: 0,
    position: [0, 3.5, 5],
    lookAt: [0, 0, 0],
  },
  // 15% — Camera moves toward floor
  {
    progress: 0.15,
    position: [0, 2.5, 4],
    lookAt: [0, 0, -1],
  },
  // 25% — Floor becomes focus
  {
    progress: 0.25,
    position: [0, 1.5, 3],
    lookAt: [0, -0.2, -1.5],
  },
  // 35% — Descending through surface
  {
    progress: 0.35,
    position: [0, 0.8, 2.5],
    lookAt: [0, -0.5, -1],
  },
  // 45% — Below surface, viewing heating system
  {
    progress: 0.45,
    position: [1.5, 0.5, 2],
    lookAt: [0, -0.3, 0],
  },
  // 55% — System activation, slight orbit
  {
    progress: 0.55,
    position: [2, 0.6, 1.5],
    lookAt: [0, -0.2, 0],
  },
  // 65% — Thermal distribution view
  {
    progress: 0.65,
    position: [0.5, 0.8, 1],
    lookAt: [0, 0, 0],
  },
  // 75% — Smart control, closer view
  {
    progress: 0.75,
    position: [0, 1.0, 2],
    lookAt: [0, 0, 0],
  },
  // 85% — System disappears, camera rises
  {
    progress: 0.85,
    position: [0, 2.0, 3.5],
    lookAt: [0, 0, 0],
  },
  // 95% — Return to architectural perspective
  {
    progress: 0.95,
    position: [0, 3.5, 5],
    lookAt: [0, 0, 0],
  },
  // 100% — Final architectural view
  {
    progress: 1,
    position: [0, 3.5, 5],
    lookAt: [0, 0, 0],
  },
];

/**
 * Smoothly interpolates between keyframe values.
 * Uses CatmullRom-style interpolation for cinematic motion.
 */
function interpolateKeyframes(
  keyframes: CameraKeyframe[],
  progress: number,
  prop: "position" | "lookAt",
): THREE.Vector3 {
  // Find surrounding keyframes
  let i = 0;
  for (let j = 0; j < keyframes.length - 1; j++) {
    if (progress >= keyframes[j].progress && progress <= keyframes[j + 1].progress) {
      i = j;
      break;
    }
  }

  const kf0 = keyframes[i];
  const kf1 = keyframes[Math.min(i + 1, keyframes.length - 1)];

  // Normalize progress within this segment
  const segmentLength = kf1.progress - kf0.progress;
  const t = segmentLength > 0 ? (progress - kf0.progress) / segmentLength : 0;

  // Smooth easing (ease in-out cubic)
  const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const p0 = kf0[prop];
  const p1 = kf1[prop];

  return new THREE.Vector3(
    p0[0] + (p1[0] - p0[0]) * eased,
    p0[1] + (p1[1] - p0[1]) * eased,
    p0[2] + (p1[2] - p0[2]) * eased,
  );
}

/**
 * Controls the Three.js camera based on scroll progress.
 * Provides smooth, cinematic camera movement through the heating system journey.
 */
export function CameraController({
  progressRef,
  reducedMotion = false,
}: CameraControllerProps) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const initialPos = useRef(new THREE.Vector3());

  // Store initial camera position
  useEffect(() => {
    initialPos.current.copy(camera.position);
  }, [camera]);

  useFrame(() => {
    const progress = progressRef.current;

    if (reducedMotion) {
      // Static camera for reduced motion
      camera.position.copy(initialPos.current);
      camera.lookAt(0, 0, 0);
      return;
    }

    // Interpolate camera position
    targetPos.current = interpolateKeyframes(keyframes, progress, "position");
    targetLookAt.current = interpolateKeyframes(keyframes, progress, "lookAt");

    // Smooth follow (lerp)
    const lerpFactor = 0.08;
    camera.position.lerp(targetPos.current, lerpFactor);

    // Smooth lookAt
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
