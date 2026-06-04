"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  const [splashKey, setSplashKey] = useState(0);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      gsap.fromTo(
        container,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );
      return;
    }

    setSplashKey((k) => k + 1);
    setShowSplash(true);

    gsap.fromTo(
      container,
      { opacity: 0, y: 40, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
      }
    );

    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <div ref={containerRef} className="will-change-[opacity,transform,filter]">
        {children}
      </div>

      {showSplash && (
        <div
          key={splashKey}
          className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden"
        >
          {/* Top right coffee splash */}
          <div
            className="absolute top-0 right-0"
            style={{
              width: "500px",
              height: "500px",
              animation: "splashTopRight 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
          >
            <svg viewBox="0 0 500 500" width="500" height="500">
              <defs>
                <radialGradient id="cg1" cx="70%" cy="30%">
                  <stop offset="0%" stopColor="#5C3D2E" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#3E2723" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#1A0E08" stopOpacity="0.3" />
                </radialGradient>
                <radialGradient id="cm1" cx="60%" cy="40%">
                  <stop offset="0%" stopColor="#E8D5B7" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path
                d="M 500,0 Q 500,220 400,300 Q 300,360 220,310 Q 120,250 170,150 Q 240,50 400,50 Q 500,50 500,0 Z"
                fill="url(#cg1)"
              />
              <path
                d="M 500,50 Q 430,130 360,140 Q 300,150 310,100 Q 350,60 420,55 Q 500,50 500,50 Z"
                fill="url(#cm1)"
              />
            </svg>
          </div>

          {/* Bottom left coffee splash */}
          <div
            className="absolute bottom-0 left-0"
            style={{
              width: "350px",
              height: "350px",
              animation: "splashBottomLeft 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              animationDelay: "0.1s",
            }}
          >
            <svg viewBox="0 0 350 350" width="350" height="350">
              <defs>
                <radialGradient id="cg2" cx="30%" cy="70%">
                  <stop offset="0%" stopColor="#5C3D2E" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#1A0E08" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path
                d="M 0,350 Q 0,170 100,120 Q 200,80 250,170 Q 290,250 230,300 Q 130,350 0,350 Z"
                fill="url(#cg2)"
              />
            </svg>
          </div>

          {/* Floating droplets */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${15 + (i * 6) % 70}%`,
                top: `${15 + (i * 7) % 65}%`,
                width: `${8 + (i % 4) * 5}px`,
                height: `${8 + (i % 4) * 5}px`,
                background: "radial-gradient(circle, #3E2723 0%, #1A0E08 60%, transparent 100%)",
                animation: `dropletFly 1s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                animationDelay: `${0.1 + i * 0.04}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes splashTopRight {
          0% {
            transform: translate(60%, -60%) scale(0.2) rotate(-30deg);
            opacity: 0;
          }
          30% {
            transform: translate(10%, -10%) scale(1) rotate(0deg);
            opacity: 1;
          }
          60% {
            transform: translate(0%, 0%) scale(1.05) rotate(5deg);
            opacity: 1;
          }
          100% {
            transform: translate(70%, -70%) scale(0.3) rotate(30deg);
            opacity: 0;
          }
        }

        @keyframes splashBottomLeft {
          0% {
            transform: translate(-60%, 60%) scale(0.2) rotate(30deg);
            opacity: 0;
          }
          30% {
            transform: translate(-10%, 10%) scale(1) rotate(0deg);
            opacity: 1;
          }
          60% {
            transform: translate(0%, 0%) scale(1.05) rotate(-5deg);
            opacity: 1;
          }
          100% {
            transform: translate(-70%, 70%) scale(0.3) rotate(-30deg);
            opacity: 0;
          }
        }

        @keyframes dropletFly {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          30% {
            opacity: 0.9;
            transform: translate(30px, -20px) scale(1.3);
          }
          70% {
            opacity: 0.5;
            transform: translate(80px, -60px) scale(0.7);
          }
          100% {
            transform: translate(150px, -120px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}