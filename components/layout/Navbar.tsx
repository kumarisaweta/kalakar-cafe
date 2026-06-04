"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useCart } from "@/app/context/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order" },
  { href: "/reservation", label: "Reserve" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalQuantity, openCart, toggleCart } = useCart();
  const [badgeBounce, setBadgeBounce] = useState(false);
  const prevQtyRef = useRef(totalQuantity);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (totalQuantity > prevQtyRef.current) {
      setBadgeBounce(true);
      const t = setTimeout(() => setBadgeBounce(false), 600);
      prevQtyRef.current = totalQuantity;
      return () => clearTimeout(t);
    }
    prevQtyRef.current = totalQuantity;
  }, [totalQuantity]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_30px_rgba(160,82,45,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-serif text-xl font-bold tracking-wide text-text-primary transition-colors group-hover:text-primary lg:text-2xl">
            Cafe{" "}
            <span className="text-primary group-hover:text-secondary transition-colors">
              Kalakar
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`link-underline relative text-sm font-medium tracking-widest uppercase transition-colors duration-[400ms] hover:text-primary ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-text-secondary"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-px w-full bg-primary"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={openCart}
            data-cursor
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 text-text-primary transition-all duration-[400ms] hover:border-primary/40 hover:shadow-[0_0_20px_rgba(210,105,30,0.2)]"
            aria-label="Open cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6h15l-1.5 9h-12z" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
              <path d="M6 6L5 3H2" />
            </svg>
            {totalQuantity > 0 && (
              <motion.span
                animate={badgeBounce ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white"
              >
                {totalQuantity}
              </motion.span>
            )}
          </button>
          <MagneticButton href="/reservation" variant="primary" className="!px-5 !py-2">
            Book a Table
          </MagneticButton>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleCart}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-primary/15"
            aria-label="Cart"
          >
            🛒
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-white">
                {totalQuantity}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            className="flex flex-col gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`block h-0.5 w-6 bg-text-primary transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-text-primary transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-text-primary transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-primary/10 bg-white/95 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-4 px-6 py-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-sm font-medium tracking-widest uppercase ${
                    pathname === link.href ? "text-primary" : "text-text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
