"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Image from "next/image";
import CinematicText from "@/components/ui/CinematicText";
import GlassCard from "@/components/ui/GlassCard";
import ScrollSection from "@/components/ui/ScrollSection";
import MagneticButton from "@/components/ui/MagneticButton";
import WordReveal from "@/components/ui/WordReveal";
import Footer from "@/components/layout/Footer";

const AmbientScene = dynamic(
  () => import("@/components/three/AmbientScene"),
  { ssr: false }
);

const timeSlots = [
  { time: "11:00 AM", period: "Brunch" },
  { time: "12:30 PM", period: "Lunch" },
  { time: "2:00 PM", period: "Lunch" },
  { time: "4:00 PM", period: "Tea" },
  { time: "6:30 PM", period: "Dinner" },
  { time: "8:00 PM", period: "Dinner" },
  { time: "9:30 PM", period: "Late" },
];

const occasions = [
  { value: "casual", label: "Casual", image: "/images/occasions/casual.png" },
  { value: "birthday", label: "Birthday", image: "/images/occasions/birthday.png" },
  { value: "anniversary", label: "Anniversary", image: "/images/occasions/anniversary.png" },
  { value: "business", label: "Business", image: "/images/occasions/business.png" },
  { value: "datenight", label: "Date Night", image: "/images/occasions/datenight.png" },
];

export default function ReservationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "casual",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const formProgress =
    [form.name, form.email, form.phone, form.date, form.time].filter(Boolean)
      .length;
  const progressPercent = (formProgress / 5) * 100;

  return (
    <div className="cinematic-bg min-h-screen">
      {/* HERO HEADER */}
      <section className="relative px-6 pt-28 pb-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-[1px] w-12 bg-primary/40" />
              <p className="text-[10px] font-medium tracking-[0.5em] uppercase text-primary whitespace-nowrap">
                Limited Seating · Book in Advance
              </p>
              <div className="h-[1px] w-12 bg-primary/40" />
            </div>

            <CinematicText
              text="RESERVE YOUR TABLE"
              className="font-serif text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-text-primary glow-text inline-block whitespace-nowrap"
            />

            <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic text-primary/80">
              &ldquo;Every reservation is a story waiting to unfold&rdquo;
            </p>

            <p className="mx-auto mt-4 max-w-lg text-sm text-text-secondary">
              Secure your seat in our cinematic dining experience. Tables fill
              up fast — especially weekends.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN RESERVATION SECTION */}
      <section className="relative px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
            {/* LEFT - FORM (3 columns) */}
            <ScrollSection className="lg:col-span-3">
              <GlassCard className="relative overflow-hidden !p-0">
                {submitted ? (
                  /* SUCCESS STATE */
                  <div className="relative px-8 py-16 text-center">
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${4 + Math.random() * 6}px`,
                            height: `${4 + Math.random() * 6}px`,
                            background: ["#A0522D", "#D2691E", "#E8D5B7"][i % 3],
                            opacity: 0.6,
                            animation: `confettiFall ${2 + Math.random() * 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
                        <span className="text-4xl">✓</span>
                      </div>

                      <h3 className="mt-6 font-serif text-3xl font-bold text-text-primary glow-text">
                        Reservation Confirmed
                      </h3>

                      <p className="mt-3 text-sm text-text-secondary">
                        Welcome to the Kalakar family, {form.name}!
                      </p>

                      <div className="mx-auto mt-8 max-w-md rounded-2xl border border-primary/20 bg-bg-alt/50 p-6 backdrop-blur">
                        <div className="grid grid-cols-2 gap-4 text-left text-sm">
                          <div>
                            <p className="text-[10px] tracking-widest uppercase text-text-secondary/60">
                              Date
                            </p>
                            <p className="mt-1 font-medium text-text-primary">
                              {form.date}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] tracking-widest uppercase text-text-secondary/60">
                              Time
                            </p>
                            <p className="mt-1 font-medium text-text-primary">
                              {form.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] tracking-widest uppercase text-text-secondary/60">
                              Guests
                            </p>
                            <p className="mt-1 font-medium text-text-primary">
                              {form.guests}{" "}
                              {form.guests === "1" ? "person" : "people"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] tracking-widest uppercase text-text-secondary/60">
                              Occasion
                            </p>
                            <p className="mt-1 font-medium text-text-primary capitalize">
                              {form.occasion}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="mt-6 text-xs text-text-secondary">
                        Confirmation sent to{" "}
                        <span className="text-primary">{form.email}</span>
                      </p>

                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm({
                            name: "",
                            email: "",
                            phone: "",
                            date: "",
                            time: "",
                            guests: "2",
                            occasion: "casual",
                            notes: "",
                          });
                        }}
                        className="mt-8 text-xs tracking-widest uppercase text-primary underline-offset-4 hover:underline"
                      >
                        Make Another Reservation
                      </button>
                    </div>
                  </div>
                ) : (
                  /* FORM STATE */
                  <form onSubmit={handleSubmit} className="p-8">
                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="mb-2 flex items-center justify-between text-[10px] tracking-widest uppercase text-text-secondary/60">
                        <span>Booking Progress</span>
                        <span>{formProgress}/5 fields</span>
                      </div>
                      <div className="h-[2px] w-full overflow-hidden rounded-full bg-primary/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div className="mb-8">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          1
                        </span>
                        <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-text-primary">
                          Your Details
                        </h4>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label className="text-[10px] tracking-widest uppercase text-text-secondary/60">
                            Full Name *
                          </label>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                            className="form-input"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-widest uppercase text-text-secondary/60">
                            Email *
                          </label>
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                            className="form-input"
                            placeholder="you@email.com"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-widest uppercase text-text-secondary/60">
                            Phone *
                          </label>
                          <input
                            required
                            type="tel"
                            value={form.phone}
                            onChange={(e) =>
                              setForm({ ...form, phone: e.target.value })
                            }
                            className="form-input"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Date, Time, Guests */}
                    <div className="mb-8">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          2
                        </span>
                        <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-text-primary">
                          When & Who
                        </h4>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-[10px] tracking-widest uppercase text-text-secondary/60">
                            Date *
                          </label>
                          <input
                            required
                            type="date"
                            min={today}
                            value={form.date}
                            onChange={(e) =>
                              setForm({ ...form, date: e.target.value })
                            }
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] tracking-widest uppercase text-text-secondary/60">
                            Guests *
                          </label>
                          <select
                            value={form.guests}
                            onChange={(e) =>
                              setForm({ ...form, guests: e.target.value })
                            }
                            className="form-input"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                              <option key={n} value={n}>
                                {n} {n === 1 ? "Guest" : "Guests"}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div className="mt-5">
                        <label className="text-[10px] tracking-widest uppercase text-text-secondary/60">
                          Select Time *
                        </label>
                        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.time}
                              type="button"
                              data-cursor
                              onClick={() =>
                                setForm({ ...form, time: slot.time })
                              }
                              className={`group relative overflow-hidden rounded-xl border px-3 py-3 text-left transition-all duration-300 ${
                                form.time === slot.time
                                  ? "border-primary bg-primary text-white shadow-[0_8px_24px_rgba(160,82,45,0.3)]"
                                  : "border-primary/15 bg-white/50 hover:border-primary/40 hover:bg-primary/5"
                              }`}
                            >
                              <div className="text-sm font-semibold">
                                {slot.time}
                              </div>
                              <div
                                className={`mt-0.5 text-[9px] tracking-widest uppercase ${
                                  form.time === slot.time
                                    ? "text-white/80"
                                    : "text-text-secondary/60"
                                }`}
                              >
                                {slot.period}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Occasion - NEW WITH IMAGES */}
                    <div className="mb-8">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          3
                        </span>
                        <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-text-primary">
                          The Occasion
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                        {occasions.map((occ, idx) => (
                          <button
                            key={occ.value}
                            type="button"
                            data-cursor
                            onClick={() => setForm({ ...form, occasion: occ.value })}
                            style={{
                              animation: `occasionFadeIn 0.5s ease-out ${idx * 0.08}s both`,
                            }}
                            className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${
                              form.occasion === occ.value
                                ? "border-primary shadow-[0_0_30px_rgba(160,82,45,0.4),0_0_60px_rgba(210,105,30,0.2)] scale-[1.05]"
                                : "border-primary/10 hover:border-primary/40 hover:shadow-[0_8px_24px_rgba(160,82,45,0.15)] hover:-translate-y-1"
                            }`}
                          >
                            {/* Image */}
                            <div className="relative aspect-square w-full overflow-hidden bg-bg-alt">
                              <Image
                                src={occ.image}
                                alt={occ.label}
                                fill
                                sizes="(max-width: 640px) 50vw, 20vw"
                                className={`object-cover transition-all duration-700 ${
                                  form.occasion === occ.value
                                    ? "scale-110 brightness-90"
                                    : "group-hover:scale-105"
                                }`}
                              />

                              {/* Dark gradient overlay always */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                              {/* Selected state - warm overlay + checkmark */}
                              {form.occasion === occ.value && (
                                <>
                                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/10 to-transparent" />
                                  <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary shadow-lg ring-2 ring-white">
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="white"
                                      strokeWidth="3"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  </div>
                                </>
                              )}

                              {/* Hover shine effect */}
                              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                            </div>

                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 pt-3">
                              <p
                                className={`text-center text-[11px] font-semibold tracking-wide transition-all duration-300 ${
                                  form.occasion === occ.value
                                    ? "text-white drop-shadow-lg"
                                    : "text-white drop-shadow-md group-hover:text-white"
                                }`}
                              >
                                {occ.label}
                              </p>
                            </div>

                            {/* Glow ring when selected */}
                            {form.occasion === occ.value && (
                              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-primary/60 ring-offset-2 ring-offset-bg-main" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="mb-8">
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                          4
                        </span>
                        <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-text-primary">
                          Special Requests
                        </h4>
                      </div>

                      <textarea
                        value={form.notes}
                        onChange={(e) =>
                          setForm({ ...form, notes: e.target.value })
                        }
                        rows={3}
                        className="form-input resize-none"
                        placeholder="Allergies, seating preferences, dietary requirements, surprises..."
                      />
                      <p className="mt-2 text-[10px] text-text-secondary/60">
                        Optional — but we love the details ☕
                      </p>
                    </div>

                    {/* Submit Button */}
                    <MagneticButton
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={!form.time || !form.date || !form.name || !form.email || !form.phone}
                    >
                      {!form.time || !form.date || !form.name || !form.email || !form.phone
                        ? "Fill all required fields"
                        : "Confirm Reservation →"}
                    </MagneticButton>

                    <p className="mt-4 text-center text-[10px] text-text-secondary/60">
                      🔒 Your information is safe with us
                    </p>
                  </form>
                )}
              </GlassCard>
            </ScrollSection>

            {/* RIGHT - AMBIENCE INFO (2 columns) */}
            <ScrollSection delay={0.2} parallax={-30} className="lg:col-span-2">
              <div className="sticky top-28 space-y-6">
                <div className="relative h-[300px] overflow-hidden rounded-2xl">
                  <div className="absolute inset-0">
                    <AmbientScene />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end p-6">
                    <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-primary">
                      The Ambience
                    </p>
                    <WordReveal
                      text="An Evening to Remember"
                      className="mt-2 font-serif text-xl font-bold text-text-primary"
                      scrollTrigger={false}
                    />
                  </div>
                </div>

                <GlassCard className="!p-6">
                  <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-primary">
                    Visit Us
                  </p>

                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-lg">📍</span>
                      <div>
                        <p className="text-xs tracking-wider uppercase text-text-secondary/60">
                          Location
                        </p>
                        <p className="mt-1 text-sm font-medium text-text-primary">
                          Bandra West, Mumbai
                        </p>
                        <p className="text-xs text-text-secondary">
                          Linking Road, Shop 42
                        </p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-primary/10" />

                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-lg">🕐</span>
                      <div>
                        <p className="text-xs tracking-wider uppercase text-text-secondary/60">
                          Hours
                        </p>
                        <p className="mt-1 text-sm font-medium text-text-primary">
                          7am – 11pm
                        </p>
                        <p className="text-xs text-text-secondary">
                          Open all 7 days
                        </p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-primary/10" />

                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-lg">📞</span>
                      <div>
                        <p className="text-xs tracking-wider uppercase text-text-secondary/60">
                          Contact
                        </p>
                        <p className="mt-1 text-sm font-medium text-text-primary">
                          +91 98765 43210
                        </p>
                        <p className="text-xs text-text-secondary">
                          hello@kalakar.cafe
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="!p-6">
                  <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-primary">
                    Good to Know
                  </p>

                  <ul className="mt-4 space-y-3 text-xs text-text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Tables held for 15 minutes past reservation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Free Wi-Fi & power outlets at every table</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Pet-friendly outdoor seating available</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Cancel anytime — no charges</span>
                    </li>
                  </ul>
                </GlassCard>
              </div>
            </ScrollSection>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .form-input {
          margin-top: 0.5rem;
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(160, 82, 45, 0.15);
          background-color: rgba(255, 255, 255, 0.6);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: var(--text-primary, #3e2723);
          outline: none;
          transition: all 0.4s ease;
        }

        .form-input:focus {
          border-color: rgba(160, 82, 45, 0.5);
          box-shadow: 0 0 20px rgba(200, 80, 42, 0.15);
          background-color: rgba(255, 255, 255, 0.9);
        }

        .form-input::placeholder {
          color: rgba(107, 68, 35, 0.4);
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(40px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes occasionFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}