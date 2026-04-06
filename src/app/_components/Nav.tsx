"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";
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
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-20">
      <nav className="flex items-center justify-between px-10 py-8">
        {/* Wordmark */}
        <span className="font-serif text-stone/90 text-xs tracking-[0.5em] uppercase">
          AURVEIL
        </span>

        {/* Nav items */}
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

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/account"
                className="text-stone/40 text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 hover:text-gold"
              >
                My Account
              </Link>
              <button
                onClick={handleSignOut}
                className="text-stone/25 text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 hover:text-stone/50"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="text-stone/40 text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 hover:text-gold"
            >
              Enter
            </Link>
          )}
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
