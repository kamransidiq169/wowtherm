"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { heroAnimState } from "@/lib/hero-anim-state";

interface FloorLayersProps {
  width?: number;
  length?: number;
}

interface LayerConfig {
  name: string;
  y: number;
  thickness: number;
  color: string;
  roughness: number;
  metalness: number;
}

/**
 * Premium floor cross-section visualization.
 * Layers separate as the user scrolls to reveal the heating system.
 * Reads separation progress directly from shared heroAnimState.
 */
export function FloorLayers({ width = 5, length = 7 }: FloorLayersProps) {
  const layers: LayerConfig[] = useMemo(
    () => [
      {
        name: "finish",
        y: 0,
        thickness: 0.04,
        color: "#8a7560",
        roughness: 0.7,
        metalness: 0.1,
      },
      {
        name: "adhesive",
        y: -0.05,
        thickness: 0.03,
        color: "#5a5048",
        roughness: 0.9,
        metalness: 0,
      },
      {
        name: "heating",
        y: -0.1,
        thickness: 0.015,
        color: "#2a2520",
        roughness: 0.5,
        metalness: 0.3,
      },
      {
        name: "insulation",
        y: -0.14,
        thickness: 0.03,
        color: "#c4b89a",
        roughness: 0.95,
        metalness: 0,
      },
      {
        name: "structural",
        y: -0.2,
        thickness: 0.06,
        color: "#6b6560",
        roughness: 0.85,
        metalness: 0.05,
      },
    ],
    [],
  );

  const separationDistance = 0.25;

  // Refs to track current separation for animation
  const groupRefs = useMemo(
    () => layers.map(() => ({ current: new THREE.Group() })),
    [layers],
  );

  useFrame(() => {
    const separation = heroAnimState.separation;
    layers.forEach((layer, i) => {
      const targetY = layer.y + separation * separationDistance * (i - 2);
      // Smooth interpolation
      const group = groupRefs[i].current;
      group.position.y += (targetY - group.position.y) * 0.12;
    });
  });

  return (
    <group>
      {layers.map((layer, i) => (
        <group
          key={layer.name}
          ref={(el) => {
            if (el) groupRefs[i].current = el;
          }}
          position={[0, layer.y, 0]}
        >
          {/* Main layer volume */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <boxGeometry args={[width, length, layer.thickness]} />
            <meshStandardMaterial
              color={layer.color}
              roughness={layer.roughness}
              metalness={layer.metalness}
            />
          </mesh>

          {/* Subtle surface highlight */}
          <mesh
            position={[0, layer.thickness / 2 + 0.001, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[width, length]} />
            <meshStandardMaterial
              color={layer.color}
              roughness={layer.roughness + 0.1}
              metalness={layer.metalness}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
