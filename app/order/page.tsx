"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CinematicText from "@/components/ui/CinematicText";
import MagneticButton from "@/components/ui/MagneticButton";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function OrderPage() {
  const { items, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="cinematic-bg flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl"
        >
          <span className="text-5xl">✨</span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-text-primary">
            Order Confirmed!
          </h2>
          <p className="mt-3 text-text-secondary">
            Thank you, {form.name}! Your order is being prepared with care.
          </p>
          <Link
            href="/menu"
            className="link-underline mt-6 inline-block text-sm font-medium text-primary"
          >
            Back to Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cinematic-bg min-h-screen">
      <section className="relative px-6 pt-28 pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <CinematicText
            text="CHECKOUT"
            className="font-serif text-4xl font-bold text-text-primary glow-text sm:text-5xl"
          />
          <p className="mt-4 text-text-secondary">Complete your order details</p>
        </div>
      </section>

      <section className="relative px-6 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
            <h2 className="font-serif text-xl font-bold text-text-primary">
              Order Summary
            </h2>
            {items.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-text-secondary">Your cart is empty</p>
                <Link href="/menu" className="link-underline mt-4 inline-block text-primary">
                  Browse Menu
                </Link>
              </div>
            ) : (
              <ul className="mt-6 space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 border-b border-primary/5 pb-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-text-primary">{item.name}</h3>
                        <span className="text-secondary">₹{item.price * item.quantity}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/20 text-xs">−</button>
                        <span className="text-sm">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/20 text-xs">+</button>
                        <button type="button" onClick={() => removeFromCart(item.id)} className="ml-auto text-xs text-text-secondary hover:text-primary">Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
                <li className="flex justify-between pt-2 font-serif text-xl font-bold text-text-primary">
                  <span>Total</span>
                  <span className="text-secondary">₹{totalPrice}</span>
                </li>
              </ul>
            )}
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
            <h2 className="font-serif text-xl font-bold text-text-primary">
              Delivery Details
            </h2>
            <div className="mt-6 space-y-4">
              {[
                { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                { key: "phone", label: "Phone", type: "tel", placeholder: "+91 98765 43210" },
                { key: "address", label: "Address", type: "text", placeholder: "Delivery address" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs tracking-widest uppercase text-text-secondary">
                    {field.label}
                  </label>
                  <input
                    required
                    type={field.type}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="mt-2 w-full rounded-xl border border-primary/10 bg-bg-main px-4 py-3 text-sm text-text-primary outline-none transition-all duration-[400ms] focus:border-primary/40 focus:shadow-[0_0_16px_rgba(210,105,30,0.1)]"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs tracking-widest uppercase text-text-secondary">
                  Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  placeholder="Special instructions..."
                  className="mt-2 w-full resize-none rounded-xl border border-primary/10 bg-bg-main px-4 py-3 text-sm text-text-primary outline-none transition-all duration-[400ms] focus:border-primary/40"
                />
              </div>
            </div>
            <MagneticButton
              type="submit"
              variant="primary"
              className="mt-8 w-full"
              disabled={items.length === 0}
            >
              Place Order — ₹{totalPrice}
            </MagneticButton>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
