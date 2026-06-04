"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  className = "",
  duration = 2,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: end,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [end, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
