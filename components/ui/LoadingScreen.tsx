"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const cup = cupRef.current;
    const steam = steamRef.current;
    if (!overlay || !cup || !steam) return;

    const tl = gsap.timeline({
      onComplete: () => onComplete?.(),
    });

    const steamParts = steam.querySelectorAll("div");

    tl.fromTo(
      cup,
      { scale: 0.5, opacity: 0, rotation: -10 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }
    )
      .fromTo(
        steamParts,
        { opacity: 0, y: 10, scaleY: 0.5 },
        {
          opacity: 0.6,
          y: -20,
          scaleY: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          repeat: 1,
          yoyo: true,
        },
        "-=0.2"
      )
      .to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        delay: 0.2,
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center">
        <div ref={steamRef} className="absolute -top-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-6 w-1 rounded-full bg-cream/20"
              style={{ transform: `translateX(${(i - 1) * 4}px)` }}
            />
          ))}
        </div>
        <div ref={cupRef} className="relative">
          <div className="h-14 w-16 rounded-b-2xl bg-gradient-to-b from-accent to-accent/80 border border-cream/10 shadow-[0_0_40px_rgba(200,80,42,0.3)]" />
          <div className="absolute -right-3 top-4 h-6 w-4 rounded-r-full border-2 border-accent border-l-0" />
          <div className="absolute top-0 left-1 right-1 h-1.5 rounded-full bg-primary/40" />
        </div>
        <p className="mt-6 font-serif text-sm tracking-[0.3em] uppercase text-cream/40">
          Cafe Kalakar
        </p>
      </div>
    </div>
  );
}
