"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import CinematicText from "@/components/ui/CinematicText";
import ScrollSection from "@/components/ui/ScrollSection";
import WordReveal from "@/components/ui/WordReveal";
import CountUp from "@/components/ui/CountUp";
import Footer from "@/components/layout/Footer";

const storySections = [
  {
    year: "2019",
    title: "The Spark",
    content:
      "Born from a love of filter coffee and contemporary Indian art, Cafe Kalakar began as a tiny studio cafe in Bandra — a place where baristas and painters shared the same counter.",
    align: "left" as const,
  },
  {
    year: "2021",
    title: "The Canvas Expands",
    content:
      "We reimagined the space as a living gallery. Walls became projection screens, menus became holographic art pieces, and every drink was choreographed like a scene.",
    align: "right" as const,
  },
  {
    year: "2024",
    title: "Cinematic Coffee",
    content:
      "Today, Kalakar is a destination — premium roasts, fusion flavors, and an atmosphere that feels like stepping into a warm, slow-motion film about the beauty of everyday rituals.",
    align: "left" as const,
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      container.querySelectorAll(".story-block").forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, x: block.classList.contains("story-right") ? 80 : -80, filter: "blur(8px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="cinematic-bg min-h-screen">
      <section className="relative overflow-hidden px-6 pt-28 pb-16 lg:px-8">
        <div
          ref={orb1Ref}
          className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full bg-primary/10 blur-[100px] will-change-transform"
        />
        <div
          ref={orb2Ref}
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-[80px] will-change-transform"
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <CinematicText
            text="OUR STORY"
            className="font-serif text-4xl font-bold text-text-primary glow-text sm:text-5xl lg:text-6xl"
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-primary/50">
            Where the warmth of Indian hospitality meets the drama of cinematic
            design — every chapter steeped in art and aroma.
          </p>
        </div>
      </section>

      <section ref={containerRef} className="relative px-6 pb-24 lg:px-8">
        <div className="mx-auto mb-16 flex justify-center gap-16 text-center">
          <div>
            <CountUp end={6} suffix="+" className="font-serif text-3xl font-bold text-primary" />
            <p className="mt-1 text-xs tracking-widest uppercase text-text-primary/40">Years</p>
          </div>
          <div>
            <CountUp end={100} suffix="+" className="font-serif text-3xl font-bold text-primary" />
            <p className="mt-1 text-xs tracking-widest uppercase text-text-primary/40">Artists</p>
          </div>
          <div>
            <CountUp end={25} suffix="K" className="font-serif text-3xl font-bold text-primary" />
            <p className="mt-1 text-xs tracking-widest uppercase text-text-primary/40">Guests</p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          {storySections.map((section) => (
            <div
              key={section.year}
              className={`story-block relative mb-24 flex flex-col ${
                section.align === "right"
                  ? "story-right items-end text-right"
                  : "items-start text-left"
              }`}
            >
              <span className="font-serif text-6xl font-bold text-primary/20 sm:text-8xl">
                {section.year}
              </span>
              <div
                className={`glass-card mt-[-2rem] max-w-lg rounded-2xl p-8 sm:mt-[-3rem] ${
                  section.align === "right" ? "ml-auto" : ""
                }`}
              >
                <WordReveal
                  text={section.title}
                  className="font-serif text-2xl font-bold text-text-primary"
                />
                <p className="mt-4 text-sm leading-relaxed text-text-primary/50">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-24 lg:px-8">
        <ScrollSection>
          <div className="mx-auto max-w-5xl text-center">
            <blockquote className="font-serif text-2xl italic leading-relaxed text-text-primary/80 sm:text-3xl lg:text-4xl glow-text">
              &ldquo;We don&apos;t just serve coffee — we compose moments.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm tracking-widest uppercase text-primary">
              — The Kalakar Team
            </p>
          </div>
        </ScrollSection>
      </section>

      <Footer />
    </div>
  );
}
