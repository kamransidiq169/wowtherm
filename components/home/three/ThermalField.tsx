"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { heroAnimState } from "@/lib/hero-anim-state";

interface ThermalFieldProps {
  width?: number;
  length?: number;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uIntensity;
  uniform float uTime;
  uniform vec3 uWarmColor;
  uniform vec3 uCoolColor;

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float heat = 0.0;

    // Serpentine heat sources matching cable positions
    for (float i = 0.0; i < 8.0; i++) {
      float x = (i + 0.5) / 8.0;
      float dist = abs(uv.x - x);
      float spread = 0.08 + 0.02 * sin(uTime * 0.5 + i * 1.3);
      float source = smoothstep(spread + 0.1, spread, dist);
      float zMod = 0.7 + 0.3 * noise(vec2(i * 3.0, uv.y * 4.0 + uTime * 0.2));
      source *= zMod;
      heat += source;
    }

    float organicNoise = fbm(uv * 6.0 + uTime * 0.15) * 0.3;
    heat += organicNoise * heat;
    heat = smoothstep(0.0, 1.0, heat);

    float finalHeat = heat * uIntensity;
    vec3 color = mix(uCoolColor, uWarmColor, finalHeat);

    float pulse = 1.0 + 0.05 * sin(uTime * 2.0);
    color *= pulse;

    float alpha = finalHeat * 0.6 * uIntensity;
    gl_FragColor = vec4(color, alpha);
  }
`;

/**
 * Thermal field visualization showing heat radiating from the cable network.
 * Uses a custom shader for performant, organic heat distribution.
 * Reads intensity and time from shared heroAnimState.
 */
export function ThermalField({ width = 5, length = 7 }: ThermalFieldProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uIntensity: { value: 0 },
      uTime: { value: 0 },
      uWarmColor: { value: new THREE.Color("#d4763a") },
      uCoolColor: { value: new THREE.Color("#1a1a1a") },
    }),
    [],
  );

  useFrame(() => {
    if (matRef.current) {
      matRef.current.uniforms.uIntensity.value = heroAnimState.thermalIntensity;
      matRef.current.uniforms.uTime.value = heroAnimState.time;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
      <planeGeometry args={[width, length, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
