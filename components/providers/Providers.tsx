"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import LenisProvider from "./LenisProvider";
import { CartProvider } from "@/app/context/CartContext";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Loader from "@/components/Loader";
import CartSidebar from "@/components/CartSidebar";

const LOADER_KEY = "cafe-kalakar-loaded";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(LOADER_KEY);
    if (seen) {
      setShowLoader(false);
      setReady(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem(LOADER_KEY, "1");
    setShowLoader(false);
    setReady(true);
  };

  return (
    <CartProvider>
      <LenisProvider>
        <AnimatePresence mode="wait">
          {showLoader && !ready && (
            <Loader key="loader" onComplete={handleLoaderComplete} />
          )}
        </AnimatePresence>
        {ready && (
          <>
            <CustomCursor />
            <ScrollProgress />
            <CartSidebar />
            <Toaster position="bottom-center" />
            {children}
          </>
        )}
      </LenisProvider>
    </CartProvider>
  );
}
