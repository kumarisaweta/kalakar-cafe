"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * speed * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * speed * 100;
      gsap.to(el, { x, y, duration: 0.8, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
