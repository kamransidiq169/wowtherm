"use client";

import { Suspense, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

// Dynamic import — Three.js is client-only
const HeroCanvas = dynamic(
  () => import("./hero-canvas").then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => null,
  },
);

/**
 * Detects WebGL support. Safe to call only on client.
 */
function checkWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

interface HeroSceneProps {
  onCreated?: () => void;
}

/**
 * Wrapper that handles WebGL detection, reduced motion,
 * and progressive loading of the 3D cross-section scene.
 */
export function HeroScene({ onCreated }: HeroSceneProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [sceneReady, setSceneReady] = useState(false);

  const [webGLAvailable] = useState(() => {
    if (typeof window === "undefined") return false;
    return checkWebGL();
  });

  const handleSceneCreated = useCallback(() => {
    setSceneReady(true);
    onCreated?.();
  }, [onCreated]);

  const show3D = webGLAvailable && !reducedMotion;

  return (
    <>
      {show3D && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: sceneReady ? 1 : 0 }}
        >
          <Suspense fallback={null}>
            <HeroCanvas onCreated={handleSceneCreated} reducedMotion={reducedMotion} />
          </Suspense>
        </div>
      )}
    </>
  );
}
