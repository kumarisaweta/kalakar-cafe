"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const beanRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const [visible, setVisible] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const targetRotation = useRef(0);
  const isHovering = useRef(false);
  const isClicking = useRef(false);
  const rafId = useRef<number>(0);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setVisible(true);
    document.body.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Calculate rotation based on movement direction
      const dx = e.clientX - lastMouseX.current;
      const dy = e.clientY - lastMouseY.current;
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        targetRotation.current = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      }
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;

      const under = document.elementFromPoint(e.clientX, e.clientY);
      const hoverable = under?.closest("a, button, [data-cursor]");
      isHovering.current = !!hoverable;
      document.body.classList.toggle("cursor-hover", !!hoverable);
    };

    const onDown = () => {
      isClicking.current = true;
    };
    const onUp = () => {
      isClicking.current = false;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const animate = () => {
      // Smooth follow
      pos.current.x += (mouse.current.x - pos.current.x) * 0.22;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.22;
      glowPos.current.x += (mouse.current.x - glowPos.current.x) * 0.12;
      glowPos.current.y += (mouse.current.y - glowPos.current.y) * 0.12;

      // Smooth rotation
      let diff = targetRotation.current - rotation.current;
      // Take shortest path
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      rotation.current += diff * 0.15;

      // Scale based on state
      const scale = isClicking.current ? 0.7 : isHovering.current ? 1.8 : 1;

      if (beanRef.current) {
        beanRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) rotate(${rotation.current}deg) scale(${scale})`;
      }
      if (glowRef.current) {
        const glowScale = isHovering.current ? 2.2 : 1;
        glowRef.current.style.transform = `translate(${glowPos.current.x}px, ${glowPos.current.y}px) scale(${glowScale})`;
        glowRef.current.style.opacity = String(isHovering.current ? 0.6 : 0.35);
      }

      // Trail effect
      trailRefs.current.forEach((trail, i) => {
        if (!trail) return;
        const factor = 0.06 + i * 0.025;
        const tx =
          pos.current.x -
          (pos.current.x - mouse.current.x) * factor * (i + 2);
        const ty =
          pos.current.y -
          (pos.current.y - mouse.current.y) * factor * (i + 2);
        const trailScale = 1 - i * 0.2;
        trail.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotation.current}deg) scale(${trailScale})`;
        trail.style.opacity = String(0.25 - i * 0.07);
      });

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.body.classList.remove("custom-cursor", "cursor-hover");
    };
  }, []);

  if (!visible) return null;

  // SVG Coffee Bean Shape
  const CoffeeBean = ({ size = 24, color = "#3E2723", opacity = 1 }: { size?: number; color?: string; opacity?: number }) => (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 24 34"
      fill="none"
      style={{ opacity }}
    >
      {/* Bean body */}
      <ellipse
        cx="12"
        cy="17"
        rx="10"
        ry="15"
        fill={color}
      />
      {/* Highlight */}
      <ellipse
        cx="9"
        cy="12"
        rx="2.5"
        ry="4"
        fill="#D4A574"
        opacity="0.4"
      />
      {/* Center crease - signature coffee bean line */}
      <path
        d="M12 3 Q14 12 12 17 Q10 22 12 31"
        stroke="#1A0E08"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  return (
    <>
      {/* Glow effect behind cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle, rgba(212,165,116,0.5) 0%, rgba(139,111,71,0.2) 40%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* Trail beans (smaller, fading) */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{ opacity: 0 }}
        >
          <CoffeeBean size={18} opacity={0.6} />
        </div>
      ))}

      {/* Main Coffee Bean Cursor */}
      <div
        ref={beanRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
        }}
      >
        <CoffeeBean size={20} />
      </div>
    </>
  );
}