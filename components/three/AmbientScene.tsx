"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

function FloatingCards() {
  const groupRef = useRef<THREE.Group>(null);

  const cards = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6 - 3,
        ] as [number, number, number],
        rotation: [
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.2,
        ] as [number, number, number],
        scale: 0.6 + Math.random() * 0.4,
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {cards.map((card, i) => (
        <Float key={i} speed={1 + i * 0.2} floatIntensity={0.5}>
          <mesh position={card.position} rotation={card.rotation} scale={card.scale}>
            <boxGeometry args={[1.8, 2.4, 0.05]} />
            <meshStandardMaterial
              color="#2c1810"
              transparent
              opacity={0.35}
              roughness={0.1}
              metalness={0.3}
              emissive="#c8502a"
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const count = 60;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#c8502a" transparent opacity={0.12} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} color="#f5e6d3" />
      <pointLight position={[2, 3, 2]} intensity={1.5} color="#c8502a" />
      <FloatingCards />
      <Dust />
      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={0.8} mipmapBlur />
        <Vignette eskil={false} offset={0.15} darkness={0.85} />
      </EffectComposer>
    </>
  );
}

export default function AmbientScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
