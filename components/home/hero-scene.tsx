"use client";

import { Suspense, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

// Dynamic import — Three.js is client-only
const HeroCanvas = dynamic(
  () => import("./hero-canvas").then((mod) => ({ default: mod.HeroCanvas })),
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
  progressRef: React.RefObject<number>;
}

/**
 * Wrapper that handles WebGL detection, reduced motion,
 * and progressive loading of the 3D scene.
 */
export function HeroScene({ progressRef }: HeroSceneProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [sceneReady, setSceneReady] = useState(false);

  // Compute WebGL availability on first render (client-only via "use client")
  const [webGLAvailable] = useState(() => {
    if (typeof window === "undefined") return false;
    return checkWebGL();
  });

  const handleSceneCreated = useCallback(() => {
    setSceneReady(true);
  }, []);

  const show3D = webGLAvailable && !reducedMotion;

  return (
    <>
      {show3D && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: sceneReady ? 1 : 0 }}
        >
          <Suspense fallback={null}>
            <HeroCanvas
              progressRef={progressRef}
              reducedMotion={reducedMotion}
              onCreated={handleSceneCreated}
            />
          </Suspense>
        </div>
      )}
    </>
  );
}
