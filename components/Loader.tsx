"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { gsap } from "@/lib/gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Swirling Coffee Beans - converge to center
function SwirlingBeans({ phase }: { phase: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const beans = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    angle: (i / 80) * Math.PI * 2,
    radius: 2.5 + Math.random() * 3,
    speed: 0.3 + Math.random() * 0.4,
    yOffset: (Math.random() - 0.5) * 2.5,
    scale: 0.8 + Math.random() * 0.5,
  }));

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((bean, i) => {
      const b = beans[i];
      if (phase === 0) {
        const angle = b.angle + time * b.speed;
        bean.position.x = Math.cos(angle) * b.radius;
        bean.position.z = Math.sin(angle) * b.radius;
        bean.position.y = b.yOffset + Math.sin(time + i) * 0.4;
        bean.rotation.x = time * b.speed;
        bean.rotation.y = time * b.speed * 0.8;
      } else {
        bean.position.x *= 0.93;
        bean.position.y *= 0.93;
        bean.position.z *= 0.93;
        bean.rotation.y += 0.12;
      }
    });

    groupRef.current.rotation.y = time * 0.15;
  });

  return (
    <group ref={groupRef}>
      {beans.map((b) => (
        <mesh key={b.id} scale={b.scale}>
          <sphereGeometry args={[0.13, 16, 16]} />
          <meshStandardMaterial
            color="#2A1A12"
            roughness={0.4}
            metalness={0.2}
            emissive="#5C3D2E"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Golden particles floating up
function GoldenParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 150;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.012;
      pos[i * 3] += Math.sin(Date.now() * 0.001 + i) * 0.004;
      if (pos[i * 3 + 1] > 7.5) pos[i * 3 + 1] = -7.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#D4A574"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Central glowing orb (cup essence)
function CentralOrb({ show }: { show: boolean }) {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.y += 0.005;
      const targetScale = show ? 1 : 0;
      orbRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.04
      );
      if (show) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        orbRef.current.scale.multiplyScalar(pulse);
      }
    }
  });

  return (
    <mesh ref={orbRef} scale={0}>
      <sphereGeometry args={[0.5, 64, 64]} />
      <meshStandardMaterial
        color="#D4A574"
        emissive="#8B6F47"
        emissiveIntensity={1.2}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0);
  const [showOrb, setShowOrb] = useState(false);

  const letters = "CAFE KALAKAR".split("");

  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    const spotlight = spotlightRef.current;
    const progress = progressRef.current;
    const percent = percentRef.current;
    const line = lineRef.current;

    if (!overlay || !text || !spotlight || !progress || !percent || !line) return;

    const spans = text.querySelectorAll(".loader-letter");

    const counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 4,
      ease: "power1.inOut",
      onUpdate: () => {
        if (percent) percent.textContent = `${Math.floor(counter.value).toString().padStart(3, "0")}`;
      },
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    tl.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    )
      // Top line draws
      .fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.out" },
        "-=0.2"
      )
      // Beans swirl phase
      .call(() => setPhase(1), [], "+=1.5")
      // Orb appears with spotlight
      .call(() => setShowOrb(true), [], "+=0.4")
      .to(
        spotlight,
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        "<"
      )
      // CAFE KALAKAR dramatic reveal
      .fromTo(
        spans,
        {
          opacity: 0,
          scale: 0.4,
          filter: "blur(25px)",
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.07,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      )
      // Glow pulse
      .to(
        text,
        {
          textShadow:
            "0 0 80px rgba(212, 165, 116, 0.6), 0 0 160px rgba(139, 111, 71, 0.3)",
          duration: 1.2,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
        }
      )
      // Exit - elegant fade
      .to(
        overlay,
        {
          opacity: 0,
          scale: 1.08,
          filter: "blur(15px)",
          duration: 0.9,
          ease: "power3.inOut",
        },
        "+=0.2"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10001] overflow-hidden opacity-0"
      style={{
        background: `
          radial-gradient(ellipse at center, #1F1611 0%, #14100C 35%, #0A0806 70%, #000000 100%)
        `,
      }}
    >
      {/* Top decorative line */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        <div
          ref={lineRef}
          className="h-[1px] w-64 origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #D4A574 50%, transparent 100%)",
          }}
        />
      </div>

      {/* "EST. 2024" top label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-[0.6em] uppercase text-[#D4A574]/60">
        Est. 2024
      </div>

      {/* Spotlight - GIANT */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50"
        style={{
          width: "1000px",
          height: "1000px",
          background:
            "radial-gradient(circle, rgba(212,165,116,0.25) 0%, rgba(184,134,93,0.12) 30%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Ambient color glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-[#D4A574]/8 blur-3xl animate-pulse" />
        <div
          className="absolute right-1/4 bottom-1/3 h-[500px] w-[500px] rounded-full bg-[#8B6F47]/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#D4A574" />
          <pointLight position={[-5, -3, 3]} intensity={1.5} color="#8B6F47" />
          <spotLight
            position={[0, 8, 5]}
            angle={0.5}
            penumbra={1}
            intensity={2.5}
            color="#E8D5B7"
          />
          <Suspense fallback={null}>
            <GoldenParticles />
            <SwirlingBeans phase={phase} />
            <CentralOrb show={showOrb} />
          </Suspense>
        </Canvas>
      </div>

      {/* CAFE KALAKAR - The hero text */}
      <div
        ref={textRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[0.05em] whitespace-nowrap"
        style={{
          color: "#F5E6D3",
          textShadow: "0 4px 30px rgba(0,0,0,0.6)",
        }}
      >
        {letters.map((letter, i) => (
          <span
            key={`letter-${i}`}
            className="loader-letter inline-block opacity-0 will-change-transform"
            style={{ whiteSpace: letter === " " ? "pre" : undefined }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>

      {/* Bottom — Minimal loading indicator */}
      <div className="absolute bottom-12 left-0 right-0 z-10 flex justify-between items-center px-8 sm:px-16">
        {/* Left — Number counter */}
        <div className="flex items-center gap-3">
          <div
            ref={percentRef}
            className="font-mono text-xs tracking-[0.3em] text-[#D4A574]/70"
          >
            000
          </div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-[#D4A574]/40">
            Loading
          </div>
        </div>

        {/* Center — Progress line */}
        <div className="flex-1 mx-8 h-[1px] bg-[#D4A574]/10 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full origin-left"
            style={{
              background:
                "linear-gradient(90deg, transparent, #D4A574, #E8D5B7, transparent)",
              animation: "loaderProgress 4s ease-in-out forwards",
            }}
          />
        </div>

        {/* Right — Tagline */}
        <div className="text-[10px] tracking-[0.4em] uppercase text-[#D4A574]/40 hidden sm:block">
          Cinematic Experience
        </div>
      </div>

      <style jsx>{`
        @keyframes loaderProgress {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}