"use client";

import Link from "next/link";
import { useRef, useCallback, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  href,
  className = "",
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn || disabled) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const btn = btnRef.current;
      if (!btn || disabled) return;

      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple-effect";
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      btn.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 0.5 },
        {
          scale: 4,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );

      onClick?.();
    },
    [disabled, onClick]
  );

  const baseClass = `magnetic-btn relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-[box-shadow,border-color,background-color,transform] duration-[400ms] ease-out will-change-transform hover:scale-105 ${
    variant === "primary"
      ? "bg-primary text-white hover:shadow-[0_0_40px_rgba(210,105,30,0.45)]"
      : "border border-primary/20 text-text-primary bg-white/60 backdrop-blur-sm hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(210,105,30,0.2)]"
  } ${disabled ? "pointer-events-none opacity-40" : ""} ${className}`;

  if (href) {
    return (
      <Link
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClass}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        data-cursor
      >
        <span ref={rippleRef} className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type={type}
      className={baseClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
      data-cursor
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
