"use client";

import HeroCanvas from "@/components/three/HeroCanvas";
import CinematicText from "@/components/ui/CinematicText";
import WordReveal from "@/components/ui/WordReveal";
import ScrollSection, { ScrollStagger } from "@/components/ui/ScrollSection";
import MagneticButton from "@/components/ui/MagneticButton";
import ParallaxLayer from "@/components/ui/ParallaxLayer";
import CountUp from "@/components/ui/CountUp";
import Footer from "@/components/layout/Footer";
import { gsap } from "@/lib/gsap";
import { useEffect, useRef } from "react";

const features = [
  {
    title: "Artisan Roasts",
    description:
      "Single-origin beans from India's finest estates, roasted in small batches with intention.",
    icon: "☕",
    number: "01",
  },
  {
    title: "Cinematic Ambience",
    description:
      "Every corner designed like a film set — warm glow, layered depth, living art on every wall.",
    icon: "🎬",
    number: "02",
  },
  {
    title: "Indian Soul",
    description:
      "Where masala chai meets modern coffee culture. Fusion flavors rooted deep in tradition.",
    icon: "🪷",
    number: "03",
  },
];

export default function HomePage() {
  const topLabelRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const decorLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top label fade in
      if (topLabelRef.current) {
        gsap.fromTo(
          topLabelRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
        );
      }

      // Decorative line draws
      if (decorLineRef.current) {
        gsap.fromTo(
          decorLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4, delay: 0.4, ease: "power3.out" }
        );
      }

      // Tagline reveal
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, y: 20, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            delay: 1.8,
            ease: "power3.out",
          }
        );
      }

      // Subtitle reveal
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 25, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            delay: 2.2,
            ease: "power3.out",
          }
        );
      }

      // CTAs reveal
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 2.6,
            ease: "power3.out",
          }
        );
      }

      // Scroll hint
      if (scrollHintRef.current) {
        gsap.fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 3.2 }
        );
        gsap.to(scrollHintRef.current, {
          y: 8,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="cinematic-bg">
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <HeroCanvas />

        {/* Gradient overlays for depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />

        {/* Corner Decorative Brackets */}
        <div className="pointer-events-none absolute top-24 left-8 z-10 hidden md:block">
          <div className="h-12 w-12 border-l border-t border-primary/30" />
        </div>
        <div className="pointer-events-none absolute top-24 right-8 z-10 hidden md:block">
          <div className="h-12 w-12 border-r border-t border-primary/30" />
        </div>
        <div className="pointer-events-none absolute bottom-24 left-8 z-10 hidden md:block">
          <div className="h-12 w-12 border-l border-b border-primary/30" />
        </div>
        <div className="pointer-events-none absolute bottom-24 right-8 z-10 hidden md:block">
          <div className="h-12 w-12 border-r border-b border-primary/30" />
        </div>

        <ParallaxLayer
          speed={0.15}
          className="relative z-10 mx-auto max-w-7xl px-6 pt-24 text-center lg:px-8"
        >
          {/* Top Label with Decorative Lines */}
          <div
            ref={topLabelRef}
            className="mb-8 flex items-center justify-center gap-4 opacity-0"
          >
            <div
              ref={decorLineRef}
              className="h-[1px] w-16 origin-right bg-gradient-to-r from-transparent to-primary/60"
            />
            <p className="text-[10px] font-medium tracking-[0.6em] uppercase text-primary whitespace-nowrap">
              Est. 2024 · Premium Indian Cafe
            </p>
            <div className="h-[1px] w-16 origin-left bg-gradient-to-l from-transparent to-primary/60" />
          </div>

          {/* Main Hero Heading - ONE LINE */}
          <div className="overflow-visible">
            <CinematicText
              text="WHERE ART MEETS COFFEE"
              className="font-serif text-[clamp(2rem,7vw,5.5rem)] font-bold leading-[1.1] tracking-tight text-text-primary glow-text inline-block whitespace-nowrap"
              delay={0.5}
            />
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="mx-auto mt-6 max-w-2xl font-serif text-lg italic tracking-wide text-primary/80 sm:text-xl opacity-0"
          >
            &ldquo;Crafted in Cups, Served with Soul&rdquo;
          </p>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base opacity-0"
          >
            Aromatic. Artisanal. Unforgettable. Welcome to your new favorite ritual.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="pointer-events-auto mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row opacity-0"
          >
            <MagneticButton href="/menu" variant="primary">
              Explore Menu
            </MagneticButton>
            <MagneticButton href="/reservation" variant="outline">
              Reserve a Table
            </MagneticButton>
          </div>
        </ParallaxLayer>

        {/* Scroll Hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-text-secondary/40 opacity-0"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
          <div className="h-10 w-px bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          EXPERIENCE SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative px-6 py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-7xl">
          <ScrollSection className="text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-primary/40" />
              <p className="text-[10px] font-medium tracking-[0.5em] uppercase text-primary">
                The Experience
              </p>
              <div className="h-[1px] w-8 bg-primary/40" />
            </div>
            <WordReveal
              text="More Than a Cafe"
              className="mt-6 font-serif text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl xl:text-6xl"
            />
            <p className="mx-auto mt-6 max-w-xl text-base text-text-secondary">
              We don&apos;t serve coffee. We craft moments. Every detail, every sip,
              every conversation — designed to linger.
            </p>
          </ScrollSection>

          {/* Stats */}
          <div className="mt-16 flex justify-center gap-8 sm:gap-16 text-center">
            <ScrollSection delay={0.1}>
              <CountUp
                end={50}
                suffix="+"
                className="font-serif text-4xl font-bold text-primary sm:text-5xl"
              />
              <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-text-secondary/60">
                Menu Items
              </p>
            </ScrollSection>
            <div className="w-[1px] bg-primary/20" />
            <ScrollSection delay={0.2}>
              <CountUp
                end={12}
                suffix="K"
                className="font-serif text-4xl font-bold text-primary sm:text-5xl"
              />
              <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-text-secondary/60">
                Cups Served
              </p>
            </ScrollSection>
            <div className="w-[1px] bg-primary/20" />
            <ScrollSection delay={0.3}>
              <CountUp
                end={5}
                suffix="★"
                className="font-serif text-4xl font-bold text-primary sm:text-5xl"
              />
              <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-text-secondary/60">
                Avg Rating
              </p>
            </ScrollSection>
          </div>

          {/* Feature Cards */}
          <ScrollStagger className="mt-20 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                data-cursor
                className="glass-card group relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Number watermark */}
                <span className="absolute right-6 top-6 font-serif text-5xl font-bold text-primary/10">
                  {feature.number}
                </span>

                <span className="relative text-4xl">{feature.icon}</span>
                <h3 className="relative mt-6 font-serif text-2xl font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>

                {/* Animated underline */}
                <div className="mt-8 h-px w-12 bg-primary/50 transition-all duration-[600ms] ease-out group-hover:w-full group-hover:bg-primary" />
              </div>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          QUOTE / STORY SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative px-6 py-24 lg:px-8">
        <ScrollSection>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block">
              <span className="font-serif text-6xl text-primary/30">&ldquo;</span>
            </div>
            <p className="font-serif text-2xl italic leading-relaxed text-text-primary sm:text-3xl lg:text-4xl">
              Coffee is a language in itself.
              <br />
              <span className="text-primary">We just speak it fluently.</span>
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-[1px] w-12 bg-primary/40" />
              <p className="text-[10px] tracking-[0.4em] uppercase text-text-secondary/60">
                Our Philosophy
              </p>
              <div className="h-[1px] w-12 bg-primary/40" />
            </div>
          </div>
        </ScrollSection>
      </section>

      {/* ═══════════════════════════════════════════
          RESERVATION CTA SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative px-6 py-24 lg:px-8 lg:py-32">
        <ScrollSection parallax={-40}>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl">
            {/* Layered backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-bg-alt to-bg-main" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(210,105,30,0.15),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(160,82,45,0.12),transparent_60%)]" />

            <div className="glass-card relative rounded-3xl px-8 py-20 text-center sm:px-16 sm:py-24">
              {/* Top label */}
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-primary/40" />
                <p className="text-[10px] font-medium tracking-[0.5em] uppercase text-primary">
                  Limited Seating
                </p>
                <div className="h-[1px] w-8 bg-primary/40" />
              </div>

              <WordReveal
                text="Your Table Awaits"
                className="font-serif text-3xl font-bold text-text-primary glow-text sm:text-4xl lg:text-5xl xl:text-6xl"
              />
              <p className="mx-auto mt-6 max-w-md text-base text-text-secondary">
                Book an immersive dining experience. Reserved for those who
                appreciate slow moments and great coffee.
              </p>
              <div className="mt-10">
                <MagneticButton href="/reservation" variant="primary">
                  Make a Reservation
                </MagneticButton>
              </div>

              {/* Decorative dots */}
              <div className="mt-12 flex items-center justify-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary/40" />
                <div className="h-1 w-1 rounded-full bg-primary/60" />
                <div className="h-1 w-1 rounded-full bg-primary/40" />
              </div>
            </div>
          </div>
        </ScrollSection>
      </section>

      <Footer />
    </div>
  );
}