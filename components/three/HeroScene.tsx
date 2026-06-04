"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Sphere, Torus } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";
import * as THREE from "three";

interface BeanData {
  angle: number;
  radius: number;
  yOffset: number;
  speed: number;
  tilt: number;
  scale: number;
}

function OrbitingCoffeeBeans() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const beans: BeanData[] = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        angle: (i / 20) * Math.PI * 2,
        radius: 2.2 + (i % 3) * 0.6,
        yOffset: -0.5 + (i % 5) * 0.35,
        speed: 0.15 + (i % 4) * 0.08,
        tilt: Math.random() * Math.PI,
        scale: 0.07 + (i % 3) * 0.04,
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    beans.forEach((bean, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      const angle = bean.angle + t * bean.speed;
      const wobble = Math.sin(t * 2 + i) * 0.15;

      mesh.position.x = Math.cos(angle) * (bean.radius + wobble * 0.3);
      mesh.position.z = Math.sin(angle) * (bean.radius + wobble * 0.3);
      mesh.position.y =
        bean.yOffset + Math.sin(t * 1.5 + i * 0.5) * 0.25;

      mesh.rotation.x = bean.tilt + t * 0.5;
      mesh.rotation.y = angle + Math.PI / 2;
      mesh.rotation.z = Math.sin(t + i) * 0.3;
    });

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {beans.map((bean, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          scale={bean.scale}
        >
          <capsuleGeometry args={[0.4, 0.8, 6, 12]} />
          <meshStandardMaterial
            color="#3d2314"
            roughness={0.55}
            metalness={0.15}
            emissive="#1a0f08"
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

function SteamParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 150;

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const offsets = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.8;
      positions[i * 3 + 1] = Math.random() * 0.5 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      speeds[i] = 0.008 + Math.random() * 0.012;
      phases[i] = Math.random() * Math.PI * 2;
      offsets[i] = Math.random();
    }
    return { positions, offsets, speeds, phases };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position
      .array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += data.speeds[i];

      const life = (pos[i * 3 + 1] + 0.5) / 4;
      const sway = Math.sin(t * 1.5 + data.phases[i]) * (0.003 + life * 0.008);
      const swayZ = Math.cos(t * 1.2 + data.phases[i]) * 0.002;
      pos[i * 3] += sway;
      pos[i * 3 + 2] += swayZ;

      if (pos[i * 3 + 1] > 3.5) {
        pos[i * 3 + 1] = -0.3;
        pos[i * 3] = (Math.random() - 0.5) * 0.6;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f5e6d3"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DustParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 60;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#c8502a"
        transparent
        opacity={0.12}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CoffeeCup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.75, 1.4, 32]} />
        <meshStandardMaterial
        color="#A0522D"
        roughness={0.25}
        metalness={0.45}
        emissive="#D2691E"
        emissiveIntensity={0.05}
        />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <torusGeometry args={[0.85, 0.06, 16, 32]} />
        <meshStandardMaterial
          color="#1a0f08"
          roughness={0.35}
          metalness={0.55}
        />
      </mesh>
      <mesh
        position={[1.05, 0.5, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <torusGeometry args={[0.35, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color="#2c1810"
          roughness={0.25}
          metalness={0.55}
        />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <circleGeometry args={[0.7, 32]} />
        <meshStandardMaterial
          color="#1a0f08"
          roughness={0.15}
          metalness={0.1}
          emissive="#c8502a"
          emissiveIntensity={0.2}
        />
      </mesh>
      <SteamParticles />
    </group>
  );
}

function AmbientOrbs() {
  const orb1 = useRef<THREE.Mesh>(null);
  const orb2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (orb1.current) {
      orb1.current.position.y = 2 + Math.sin(t * 0.5) * 0.3;
    }
    if (orb2.current) {
      orb2.current.position.x = 5 + Math.sin(t * 0.3) * 0.5;
    }
  });

  return (
    <>
      <Sphere ref={orb1} args={[0.5, 12, 12]} position={[-4, 2, -3]}>
        <meshBasicMaterial color="#c8502a" transparent opacity={0.07} />
      </Sphere>
      <Sphere ref={orb2} args={[0.8, 12, 12]} position={[5, -1, -4]}>
        <meshBasicMaterial color="#c8502a" transparent opacity={0.05} />
      </Sphere>
      <Torus
        args={[2.5, 0.015, 8, 64]}
        position={[0, 0, -5]}
        rotation={[Math.PI / 3, 0, 0]}
      >
        <meshBasicMaterial color="#c8502a" transparent opacity={0.06} />
      </Torus>
    </>
  );
}

function CameraRig({
  scrollProgress,
  mouse,
}: {
  scrollProgress: number;
  mouse: { x: number; y: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const smoothMouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    smoothMouse.current.x += (mouse.x - smoothMouse.current.x) * 0.05;
    smoothMouse.current.y += (mouse.y - smoothMouse.current.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.position.y = scrollProgress * 2.5;
      groupRef.current.position.z = scrollProgress * 3;
      groupRef.current.rotation.x = scrollProgress * 0.12;
    }

    camera.position.x = smoothMouse.current.x * 0.8;
    camera.position.y = smoothMouse.current.y * 0.4;
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <CoffeeCup />
      <OrbitingCoffeeBeans />
      <DustParticles />
      <AmbientOrbs />
    </group>
  );
}

function Scene({
  scrollProgress,
  mouse,
}: {
  scrollProgress: number;
  mouse: { x: number; y: number };
}) {
  return (
    <>
      <ambientLight intensity={0.6} color="#FFF4E6" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#FFF4E6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[3, 4, 3]} intensity={1.5} color="#D2691E" />
      <pointLight position={[-4, 2, -2]} intensity={0.8} color="#A0522D" />
      <spotLight
        position={[0, 10, 2]}
        angle={0.35}
        penumbra={0.9}
        intensity={1.2}
        color="#D2691E"
        castShadow
      />

      <CameraRig scrollProgress={scrollProgress} mouse={mouse} />

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.45}
        scale={12}
        blur={2.5}
        far={4}
        color="#FAEBD7"
      />

      <EffectComposer>
        <DepthOfField
          focusDistance={0.01}
          focalLength={0.025}
          bokehScale={3}
          height={720}
        />
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.4}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.08} darkness={0.85} />
      </EffectComposer>
    </>
  );
}

interface HeroSceneProps {
  scrollProgress?: number;
  mouse?: { x: number; y: number };
}

export default function HeroScene({
  scrollProgress = 0,
  mouse = { x: 0, y: 0 },
}: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} mouse={mouse} />
      </Suspense>
    </Canvas>
  );
}
