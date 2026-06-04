"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  parallax?: number;
  stagger?: boolean;
}

export default function ScrollSection({
  children,
  className = "",
  delay = 0,
  parallax = 0,
  stagger = false,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (stagger) {
        const children = Array.from(el.children);
        if (children.length === 0) return;

        gsap.fromTo(
          children,
          {
            opacity: 0,
            y: 80,
            scale: 0.92,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            delay,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
        return;
      }

      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 80,
          scale: 0.92,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (parallax) {
        gsap.to(el, {
          y: parallax,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [delay, parallax, stagger]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

interface ScrollStaggerProps {
  children: ReactNode;
  className?: string;
}

function getStaggerTargets(el: HTMLElement): Element[] {
  return Array.from(el.children);
}

export function ScrollStagger({
  children,
  className = "",
}: ScrollStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = getStaggerTargets(el);
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export { ScrollTrigger };
