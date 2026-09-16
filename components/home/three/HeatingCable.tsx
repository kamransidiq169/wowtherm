"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

interface HeatingCableProps {
  width?: number;
  length?: number;
  spacing?: number;
  turnRadius?: number;
  radius?: number;
  /** External ref to control material emissive directly */
  materialRef?: React.RefObject<THREE.MeshStandardMaterial | null>;
}

/**
 * Creates a serpentine path for the heating cable.
 */
function createSerpentinePath(
  width: number,
  length: number,
  spacing: number,
  turnRadius: number,
): THREE.Vector3[][] {
  const paths: THREE.Vector3[][] = [];
  const halfWidth = width / 2;
  const halfLength = length / 2;
  const numRuns = Math.floor(width / spacing);

  for (let i = 0; i < numRuns; i++) {
    const x = -halfWidth + spacing * (i + 0.5);
    const points: THREE.Vector3[] = [];
    const goingRight = i % 2 === 0;

    if (goingRight) {
      points.push(new THREE.Vector3(x, 0.01, -halfLength + turnRadius));
      points.push(new THREE.Vector3(x, 0.01, halfLength - turnRadius));
    } else {
      points.push(new THREE.Vector3(x, 0.01, halfLength - turnRadius));
      points.push(new THREE.Vector3(x, 0.01, -halfLength + turnRadius));
    }

    paths.push(points);

    if (i < numRuns - 1) {
      const nextX = -halfWidth + spacing * (i + 1.5);
      const connectPoints: THREE.Vector3[] = [];

      if (goingRight) {
        const startZ = halfLength - turnRadius;
        connectPoints.push(new THREE.Vector3(x, 0.01, startZ));
        connectPoints.push(
          new THREE.Vector3(x + spacing * 0.25, 0.02, startZ + turnRadius * 0.8),
        );
        connectPoints.push(
          new THREE.Vector3((x + nextX) / 2, 0.02, startZ + turnRadius),
        );
        connectPoints.push(
          new THREE.Vector3(nextX - spacing * 0.25, 0.02, startZ + turnRadius * 0.8),
        );
        connectPoints.push(new THREE.Vector3(nextX, 0.01, startZ));
      } else {
        const startZ = -halfLength + turnRadius;
        connectPoints.push(new THREE.Vector3(x, 0.01, startZ));
        connectPoints.push(
          new THREE.Vector3(x - spacing * 0.25, 0.02, startZ - turnRadius * 0.8),
        );
        connectPoints.push(
          new THREE.Vector3((x + nextX) / 2, 0.02, startZ - turnRadius),
        );
        connectPoints.push(
          new THREE.Vector3(nextX + spacing * 0.25, 0.02, startZ - turnRadius * 0.8),
        );
        connectPoints.push(new THREE.Vector3(nextX, 0.01, startZ));
      }

      paths.push(connectPoints);
    }
  }

  return paths;
}

/**
 * Creates a smooth curve from path points.
 */
function createSmoothCurve(points: THREE.Vector3[]): THREE.CatmullRomCurve3 {
  const subdivided: THREE.Vector3[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    subdivided.push(points[i]);
    const mid = points[i].clone().lerp(points[i + 1], 0.5);
    mid.y = Math.max(mid.y, points[i].y);
    subdivided.push(mid);
  }
  subdivided.push(points[points.length - 1]);
  return new THREE.CatmullRomCurve3(subdivided, false, "catmullrom", 0.3);
}

/**
 * Procedural heating cable following a serpentine pattern.
 */
export function HeatingCable({
  width = 4,
  length = 6,
  spacing = 0.45,
  turnRadius = 0.3,
  radius = 0.008,
  materialRef,
}: HeatingCableProps) {
  const geometries = useMemo(() => {
    const paths = createSerpentinePath(width, length, spacing, turnRadius);
    return paths.map((points) => {
      const curve = createSmoothCurve(points);
      const tubeSegments = Math.max(points.length * 8, 32);
      return new THREE.TubeGeometry(curve, tubeSegments, radius, 8, false);
    });
  }, [width, length, spacing, turnRadius, radius]);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#3a3530"),
        roughness: 0.6,
        metalness: 0.7,
        emissive: new THREE.Color("#000000"),
        emissiveIntensity: 0,
      }),
    [],
  );

  // Connect external ref to our material in an effect (not during render)
  useEffect(() => {
    if (materialRef) {
      materialRef.current = material;
    }
  }, [materialRef, material]);

  return (
    <group>
      {geometries.map((geo, i) => (
        <mesh key={i} geometry={geo} material={material} />
      ))}
    </group>
  );
}
