"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface CinematicTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  float?: boolean;
}

export default function CinematicText({
  text,
  className = "",
  delay = 0,
  as: Tag = "h1",
  float = true,
}: CinematicTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letters = text.split("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll(".cinema-letter");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        {
          opacity: 0,
          y: 50,
          scale: 1.3,
          filter: "blur(20px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.05,
          delay,
          ease: "power3.out",
          onComplete: () => {
            if (float) {
              gsap.to(spans, {
                y: -4,
                duration: 2 + Math.random(),
                stagger: { each: 0.08, from: "random" },
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            }
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [text, delay, float]);

  return (
    <div ref={containerRef} className={className} aria-label={text}>
      <Tag className="inline">
        {letters.map((letter, i) => (
          <span
            key={`${letter}-${i}`}
            className="cinema-letter inline-block will-change-[transform,opacity,filter]"
            style={{ whiteSpace: letter === " " ? "pre" : undefined }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </Tag>
    </div>
  );
}
