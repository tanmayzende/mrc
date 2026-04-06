"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";

const NAV_ITEMS = [
  "Gastronomy",
  "Nightlife",
  "Sports",
  "Wellness Retreats",
  "Adventure",
];

export default function Nav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 right-0 z-20">
      <nav className="flex items-center justify-between px-10 py-8">
        {/* Wordmark */}
        <span className="font-serif text-stone/90 text-xs tracking-[0.5em] uppercase">
          AURVEIL
        </span>

        {/* Experiences */}
        <ul className="hidden md:flex items-center gap-1 text-stone/40 text-[10px] tracking-[0.2em] uppercase">
          {NAV_ITEMS.map((item, i) => (
            <li key={item} className="flex items-center gap-1">
              {i > 0 && (
                <span className="text-stone/15 select-none mx-2">|</span>
              )}
              <a
                href="#"
                className="transition-colors duration-500 hover:text-stone/80 py-1"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="text-stone/40 text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 hover:text-stone/80"
            aria-label="Toggle search"
          >
            Search
          </button>
          <a
            href="#"
            className="text-stone/40 text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 hover:text-gold"
          >
            Enter
          </a>
        </div>
      </nav>

      {/* Inline search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="nav-search"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden px-10 pb-4 bg-charcoal/80 backdrop-blur-sm"
          >
            <SearchBar
                onSearch={(q) => {
                  setSearchOpen(false);
                  router.push(`/search?q=${encodeURIComponent(q)}`);
                }}
              />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
