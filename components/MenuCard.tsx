"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MenuItem } from "@/app/data/menuData";
import { useCart } from "@/app/context/CartContext";
import toast from "react-hot-toast";

interface MenuCardProps {
  item: MenuItem;
  index: number;
  onOpen: (item: MenuItem) => void;
}

export default function MenuCard({ item, index, onOpen }: MenuCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const floatDuration = 4 + (index % 3);
  const floatDelay = (index % 5) * 0.4;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [isMobile, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="will-change-transform"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: (index % 6) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={
        isMobile
          ? undefined
          : { rotateX, rotateY, transformPerspective: 800 }
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(item)}
    >
      <motion.div
        className="menu-card-inner cursor-pointer overflow-hidden rounded-3xl bg-white"
        animate={
          isMobile
            ? undefined
            : { y: [0, -8, 0, 8, 0], rotate: [-0.5, 0.5, -0.5] }
        }
        transition={
          isMobile
            ? undefined
            : {
                y: {
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay,
                },
                rotate: {
                  duration: floatDuration + 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay,
                },
              }
        }
        whileHover={!isMobile ? { y: -15 } : undefined}
      >
        <div
          className="relative aspect-square overflow-hidden bg-bg-alt transition-shadow duration-[400ms]"
          style={
            isHovered
              ? { boxShadow: "0 24px 60px rgba(160, 82, 45, 0.18)" }
              : undefined
          }
        >
          <motion.div
            className="relative h-full w-full"
            animate={isHovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
          <span className="absolute right-3 top-3 rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-white shadow-md">
            ₹{item.price}
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-serif text-xl font-bold text-text-primary">
            {item.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {item.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs tracking-widest uppercase text-accent">
              {item.category}
            </span>
            <button
              type="button"
              onClick={handleAdd}
              data-cursor
              className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary transition-all duration-[400ms] hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(210,105,30,0.3)]"
            >
              + Add
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
