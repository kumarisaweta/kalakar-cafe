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
  const splashRef = useRef<HTMLDivElement>(null);
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

    // Trigger splash
    setSplashKey((k) => k + 1);
    setShowSplash(true);

    // Smooth page reveal (no harsh fade out)
    gsap.fromTo(
      container,
      {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
      }
    );

    // Hide splash after animation
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Generate random splash droplets
  const droplets = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 20 + Math.random() * 60, // 20% to 80% from left
    y: 20 + Math.random() * 60, // 20% to 80% from top
    size: 8 + Math.random() * 20,
    delay: Math.random() * 0.2,
    duration: 0.8 + Math.random() * 0.4,
  }));

  return (
    <>
      <div ref={containerRef} className="will-change-[opacity,transform,filter]">
        {children}
      </div>

      {/* Subtle Coffee Splash - top right corner */}
      {showSplash && (
        <div
          key={splashKey}
          ref={splashRef}
          className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden"
        >
          {/* Main splash blob - top right */}
          <div className="splash-main absolute top-0 right-0">
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className="opacity-90"
            >
              <defs>
                <radialGradient id="coffeeGrad" cx="70%" cy="30%">
                  <stop offset="0%" stopColor="#5C3D2E" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#3E2723" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1A0E08" stopOpacity="0.4" />
                </radialGradient>
                <radialGradient id="creamGrad" cx="60%" cy="40%">
                  <stop offset="0%" stopColor="#E8D5B7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Organic blob shape */}
              <path
                d="M 400,0 Q 400,180 320,240 Q 240,290 180,250 Q 100,200 140,120 Q 200,40 320,40 Q 400,40 400,0 Z"
                fill="url(#coffeeGrad)"
              />
              {/* Cream highlight */}
              <path
                d="M 400,40 Q 350,100 290,110 Q 240,120 250,80 Q 280,50 340,45 Q 400,40 400,40 Z"
                fill="url(#creamGrad)"
              />
            </svg>
          </div>

          {/* Bottom left small splash */}
          <div className="splash-secondary absolute bottom-0 left-0">
            <svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              className="opacity-70"
            >
              <defs>
                <radialGradient id="coffeeGrad2" cx="30%" cy="70%">
                  <stop offset="0%" stopColor="#5C3D2E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1A0E08" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path
                d="M 0,280 Q 0,140 80,100 Q 160,60 200,140 Q 230,200 180,240 Q 100,280 0,280 Z"
                fill="url(#coffeeGrad2)"
              />
            </svg>
          </div>

          {/* Flying droplets */}
          {droplets.map((d) => (
            <div
              key={d.id}
              className="absolute rounded-full"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                width: `${d.size}px`,
                height: `${d.size}px`,
                background:
                  "radial-gradient(circle, #3E2723 0%, #1A0E08 60%, transparent 100%)",
                animation: `dropletFly ${d.duration}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                animationDelay: `${d.delay}s`,
                opacity: 0,
              }}
            />
          ))}

          {/* Subtle warm glow flash */}
          <div
            className="splash-glow absolute inset-0 opacity-0"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(212,165,116,0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(139,111,71,0.1) 0%, transparent 40%)",
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes splashEnter {
          0% {
            transform: translate(40%, -40%) scale(0.3) rotate(-15deg);
            opacity: 0;
          }
          40% {
            transform: translate(0%, 0%) scale(1.1) rotate(5deg);
            opacity: 1;
          }
          60% {
            transform: translate(0%, 0%) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(50%, -50%) scale(0.4) rotate(20deg);
            opacity: 0;
          }
        }

        @keyframes splashEnterBottom {
          0% {
            transform: translate(-40%, 40%) scale(0.3) rotate(15deg);
            opacity: 0;
          }
          40% {
            transform: translate(0%, 0%) scale(1.1) rotate(-5deg);
            opacity: 1;
          }
          60% {
            transform: translate(0%, 0%) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, 50%) scale(0.4) rotate(-20deg);
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
            transform: translate(20px, -10px) scale(1.2);
          }
          70% {
            opacity: 0.6;
            transform: translate(60px, -40px) scale(0.8);
          }
          100% {
            transform: translate(120px, -80px) scale(0);
            opacity: 0;
          }
        }

        @keyframes glowFlash {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        .splash-main {
          animation: splashEnter 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          will-change: transform, opacity;
        }

        .splash-secondary {
          animation: splashEnterBottom 1.3s cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
          animation-delay: 0.1s;
          will-change: transform, opacity;
        }

        .splash-glow {
          animation: glowFlash 1.4s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}