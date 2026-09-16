"use client";

import { createContext, useContext, type ReactNode } from "react";

interface HeroAnimatedState {
  /** Floor layer separation (0–1) */
  separation: number;
  /** Cable emissive intensity (0–1) */
  cableIntensity: number;
  /** Thermal field intensity (0–1) */
  thermalIntensity: number;
  /** Lighting warmth (0–1) */
  warmth: number;
  /** Elapsed time in seconds */
  time: number;
}

const HeroAnimContext = createContext<HeroAnimatedState>({
  separation: 0,
  cableIntensity: 0,
  thermalIntensity: 0,
  warmth: 0,
  time: 0,
});

/** Ref-based mutable state container shared across all scene components. */
export const heroAnimState = {
  separation: 0,
  cableIntensity: 0,
  thermalIntensity: 0,
  warmth: 0,
  time: 0,
};

export function useHeroAnimState() {
  return useContext(HeroAnimContext);
}

/**
 * Provider that exposes the mutable heroAnimState to the React tree.
 * Components read from heroAnimState directly in useFrame — no re-renders.
 */
export function HeroAnimProvider({ children }: { children: ReactNode }) {
  return (
    <HeroAnimContext.Provider value={heroAnimState}>
      {children}
    </HeroAnimContext.Provider>
  );
}
