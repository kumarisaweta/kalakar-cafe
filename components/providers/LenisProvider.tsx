"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      lerp: 0.1,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");

    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}