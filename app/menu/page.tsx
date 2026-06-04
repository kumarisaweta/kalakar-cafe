"use client";

import { useState } from "react";
import CinematicText from "@/components/ui/CinematicText";
import MenuCard from "@/components/MenuCard";
import MenuItemModal from "@/components/MenuItemModal";
import Footer from "@/components/layout/Footer";
import {
  menuItems,
  menuCategories,
  type MenuCategory,
  type MenuItem,
} from "@/app/data/menuData";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="cinematic-bg min-h-screen">
      <section className="relative px-6 pt-28 pb-12 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <CinematicText
            text="OUR MENU"
            className="font-serif text-4xl font-bold text-text-primary glow-text sm:text-5xl lg:text-6xl"
          />
          <p className="mx-auto mt-4 max-w-lg text-text-secondary">
            Floating selections — each dish a work of art, crafted with love
          </p>
        </div>
      </section>

      <section className="relative px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-3">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-cursor
                className={`rounded-full px-5 py-2.5 text-xs font-medium tracking-widest uppercase transition-all duration-[400ms] ease-out ${
                  activeCategory === cat
                    ? "bg-secondary text-white shadow-[0_0_24px_rgba(210,105,30,0.35)]"
                    : "border border-primary/15 bg-white text-text-secondary hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <MenuCard
                key={item.id}
                item={item}
                index={index}
                onOpen={setSelectedItem}
              />
            ))}
          </div>
        </div>
      </section>

      <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      <Footer />
    </div>
  );
}
