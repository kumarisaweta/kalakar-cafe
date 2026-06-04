"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.progress})`;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-primary/20">
      <div
        ref={barRef}
        className="h-full w-full origin-left scroll-progress-bar will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
