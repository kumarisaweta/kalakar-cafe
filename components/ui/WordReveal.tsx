"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface WordRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  scrollTrigger?: boolean;
}

export default function WordReveal({
  text,
  className = "",
  as: Tag = "h2",
  scrollTrigger = true,
}: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = el.querySelectorAll(".word-reveal");

    const ctx = gsap.context(() => {
      const anim = gsap.fromTo(
        spans,
        {
          opacity: 0,
          y: 40,
          rotateX: 45,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          ...(scrollTrigger
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            : {}),
        }
      );

      return () => anim.kill();
    }, el);

    return () => ctx.revert();
  }, [text, scrollTrigger]);

  return (
    <div ref={ref} className={className} style={{ perspective: "600px" }}>
      <Tag>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="word-reveal inline-block will-change-[transform,opacity,filter] mr-[0.25em]"
          >
            {word}
          </span>
        ))}
      </Tag>
    </div>
  );
}
