"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem } from "@/app/data/menuData";
import { useCart } from "@/app/context/CartContext";
import MagneticButton from "@/components/ui/MagneticButton";
import toast from "react-hot-toast";

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function MenuItemModal({ item, onClose }: MenuItemModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (item) {
      setQuantity(1);
      document.body.classList.add("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [item]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleAdd = () => {
    if (!item) return;
    addToCart(item, quantity);
    toast.success(`${quantity}× ${item.name} added!`, {
      duration: 2000,
      style: {
        background: "#FFF4E6",
        color: "#3E2723",
        border: "1px solid rgba(160, 82, 45, 0.2)",
      },
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9990] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-text-primary/30 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:max-w-5xl md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              data-cursor
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-md transition-colors hover:bg-primary hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="relative h-64 w-full shrink-0 overflow-hidden bg-bg-alt md:h-auto md:w-[55%]">
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative h-full min-h-[280px] w-full"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority
                />
              </motion.div>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
              <span className="inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary">
                {item.category}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary">
                {item.name}
              </h2>
              <p className="mt-1 text-2xl font-semibold text-secondary">
                ₹{item.price}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {item.longDescription}
              </p>

              <div className="mt-5">
                <h4 className="text-xs font-medium tracking-widest uppercase text-text-secondary">
                  Ingredients
                </h4>
                <ul className="mt-2 space-y-1">
                  {item.ingredients.map((ing) => (
                    <li
                      key={ing}
                      className="flex items-center gap-2 text-sm text-text-primary"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-6 text-sm text-text-secondary">
                <span>⏱ {item.prepTime}</span>
                <span>🔥 {item.calories} cal</span>
              </div>

              <div className="mt-auto flex items-center gap-4 pt-6">
                <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-bg-main px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-primary/10"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-primary/10"
                  >
                    +
                  </button>
                </div>
                <MagneticButton
                  variant="primary"
                  className="flex-1"
                  onClick={handleAdd}
                >
                  Add to Cart — ₹{item.price * quantity}
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
