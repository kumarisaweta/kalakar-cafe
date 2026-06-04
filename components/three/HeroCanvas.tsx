"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-transparent animate-pulse" />
  ),
});

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => setScrollProgress(self.progress),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const animate = () => {
      setMouse((prev) => ({
        x: prev.x + (mouseTarget.current.x - prev.x) * 0.08,
        y: prev.y + (mouseTarget.current.y - prev.y) * 0.08,
      }));
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="canvas-container">
      <HeroScene scrollProgress={scrollProgress} mouse={mouse} />
    </div>
  );
}
