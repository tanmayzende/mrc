"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CATEGORIES = [
  "All experiences",
  "Nightlife",
  "Gastronomy",
  "Adventure",
  "Wellness",
  "Sports",
  "Private Travel",
];

export default function HeroSearch() {
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("All experiences");
  const router = useRouter();

  const handleSearch = () => {
    if (destination) {
      router.push(`/search?q=${encodeURIComponent(destination)}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-3xl mt-10"
    >
      <div className="flex items-center bg-white/95 backdrop-blur-xl rounded-full px-2 shadow-2xl">
        {/* Destination */}
        <div className="flex-1 flex flex-col px-6 py-3 border-r border-black/10">
          <label className="text-[10px] font-medium tracking-[0.12em] uppercase text-gray-400 mb-1">
            Destination
          </label>
          <input
            type="text"
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Category */}
        <div className="flex-1 flex flex-col px-6 py-3">
          <label className="text-[10px] font-medium tracking-[0.12em] uppercase text-gray-400 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-sm text-gray-800 bg-transparent outline-none cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Button */}
        <button
          onClick={handleSearch}
          className="bg-charcoal text-stone text-[11px] font-medium tracking-[0.1em] uppercase px-7 py-4 rounded-full transition-all duration-300 hover:bg-gold whitespace-nowrap"
        >
          Explore →
        </button>
      </div>
    </motion.div>
  );
}
