"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
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
  "11:00 AM",
  "12:30 PM",
  "2:00 PM",
  "4:00 PM",
  "6:30 PM",
  "8:00 PM",
  "9:30 PM",
];

export default function ReservationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="cinematic-bg min-h-screen">
      <section className="relative px-6 pt-28 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <CinematicText
              text="RESERVE"
              className="font-serif text-4xl font-bold text-text-primary glow-text sm:text-5xl lg:text-6xl"
            />
            <p className="mt-4 text-text-primary/50">
              Secure your seat in our cinematic dining experience
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <ScrollSection>
              <GlassCard className="relative overflow-hidden !p-0">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
                    <span className="text-4xl">✨</span>
                    <h3 className="mt-4 font-serif text-2xl font-bold text-text-primary">
                      Reservation Confirmed
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-text-primary/50">
                      We&apos;ve reserved your table for {form.guests} on{" "}
                      {form.date} at {form.time}. See you soon, {form.name}!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="text-xs tracking-widest uppercase text-text-primary/40">
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="mt-2 w-full rounded-xl border border-primary/10 bg-bg-main px-4 py-3 text-sm text-text-primary outline-none transition-all duration-[400ms] focus:border-primary/50 focus:shadow-[0_0_20px_rgba(200,80,42,0.15)]"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs tracking-widest uppercase text-text-primary/40">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className="mt-2 w-full rounded-xl border border-primary/10 bg-bg-main px-4 py-3 text-sm text-text-primary outline-none transition-all duration-[400ms] focus:border-primary/50 focus:shadow-[0_0_20px_rgba(200,80,42,0.15)]"
                          placeholder="you@email.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs tracking-widest uppercase text-text-primary/40">
                          Date
                        </label>
                        <input
                          required
                          type="date"
                          value={form.date}
                          onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                          }
                          className="mt-2 w-full rounded-xl border border-primary/10 bg-bg-main px-4 py-3 text-sm text-text-primary outline-none transition-all duration-[400ms] focus:border-primary/50 [color-scheme:dark]"
                        />
                      </div>
                      <div>
                        <label className="text-xs tracking-widest uppercase text-text-primary/40">
                          Guests
                        </label>
                        <select
                          value={form.guests}
                          onChange={(e) =>
                            setForm({ ...form, guests: e.target.value })
                          }
                          className="mt-2 w-full rounded-xl border border-primary/10 bg-bg-main px-4 py-3 text-sm text-text-primary outline-none transition-all duration-[400ms] focus:border-primary/50"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="text-xs tracking-widest uppercase text-text-primary/40">
                        Time Slot
                      </label>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            data-cursor
                            onClick={() => setForm({ ...form, time: slot })}
                            className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-[400ms] ease-out ${
                              form.time === slot
                                ? "bg-primary text-text-primary shadow-[0_0_20px_rgba(200,80,42,0.4)]"
                                : "border border-primary/10 text-text-primary/50 hover:border-primary/30 hover:shadow-[0_0_15px_rgba(200,80,42,0.15)]"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="text-xs tracking-widest uppercase text-text-primary/40">
                        Special Requests
                      </label>
                      <textarea
                        value={form.notes}
                        onChange={(e) =>
                          setForm({ ...form, notes: e.target.value })
                        }
                        rows={3}
                        className="mt-2 w-full resize-none rounded-xl border border-primary/10 bg-bg-main px-4 py-3 text-sm text-text-primary outline-none transition-all duration-[400ms] focus:border-primary/50"
                        placeholder="Allergies, celebrations, seating preferences..."
                      />
                    </div>

                    <MagneticButton
                      type="submit"
                      variant="primary"
                      className="mt-8 w-full"
                      disabled={!form.time}
                    >
                      Confirm Reservation
                    </MagneticButton>
                  </form>
                )}
              </GlassCard>
            </ScrollSection>

            <ScrollSection delay={0.2} parallax={-30}>
              <div className="relative h-full min-h-[400px] overflow-hidden rounded-2xl">
                <div className="absolute inset-0">
                  <AmbientScene />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-8">
                  <p className="text-xs font-medium tracking-[0.4em] uppercase text-primary">
                    The Ambience
                  </p>
                  <WordReveal
                    text="An Evening to Remember"
                    className="mt-2 font-serif text-2xl font-bold text-text-primary"
                    scrollTrigger={false}
                  />
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-text-primary/50">
                    Warm terracotta glow, floating holographic menus, and the
                    gentle rise of steam — every reservation is an invitation
                    to a cinematic moment.
                  </p>
                  <div className="mt-6 flex gap-6 text-xs text-text-primary/40">
                    <div>
                      <p className="text-primary">Hours</p>
                      <p className="mt-1">7am – 11pm daily</p>
                    </div>
                    <div>
                      <p className="text-primary">Location</p>
                      <p className="mt-1">Bandra West, Mumbai</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
