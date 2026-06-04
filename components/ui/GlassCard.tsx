"use client";

import { useRef, useCallback, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      y: -10,
      scale: 1.02,
      boxShadow:
        "0 0 70px rgba(200, 80, 42, 0.35), 0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(245, 230, 211, 0.12)",
      borderColor: "rgba(200, 80, 42, 0.45)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      y: 0,
      scale: 1,
      boxShadow:
        "0 0 40px rgba(200, 80, 42, 0.12), inset 0 1px 0 rgba(245, 230, 211, 0.06)",
      borderColor: "rgba(245, 230, 211, 0.08)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`glass-card rounded-2xl p-6 will-change-[transform,box-shadow] ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
