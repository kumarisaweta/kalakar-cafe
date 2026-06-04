"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 60, filter: "blur(8px)" }
      }
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
