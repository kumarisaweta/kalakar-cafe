"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";

export default function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalQuantity,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9980] bg-text-primary/20 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-[9985] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-primary/10 px-6 py-5">
              <div>
                <h2 className="font-serif text-xl font-bold text-text-primary">
                  Your Cart
                </h2>
                <p className="text-xs text-text-secondary">
                  {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                data-cursor
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-bg-main"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="text-5xl">☕</span>
                  <p className="mt-4 font-serif text-lg text-text-primary">
                    Your cart is empty
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Add something delicious from our menu!
                  </p>
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="link-underline mt-6 text-sm font-medium text-primary"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 rounded-2xl bg-bg-main p-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <h3 className="text-sm font-semibold text-text-primary">
                            {item.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-text-secondary hover:text-primary"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-secondary">₹{item.price}</p>
                        <div className="mt-auto flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/20 text-xs text-primary"
                          >
                            −
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-primary/20 text-xs text-primary"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-primary/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Total</span>
                  <span className="font-serif text-2xl font-bold text-text-primary">
                    ₹{totalPrice}
                  </span>
                </div>
                <Link
                  href="/order"
                  onClick={closeCart}
                  className="mt-4 block w-full rounded-full bg-primary py-3.5 text-center text-sm font-medium text-white transition-all hover:bg-secondary hover:shadow-[0_0_30px_rgba(210,105,30,0.3)]"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
