"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

export default function SearchBar({ onSearch, defaultValue = "" }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      if (onSearch) {
        onSearch(value.trim());
      } else {
        router.push(`/search?q=${encodeURIComponent(value.trim())}`);
      }
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="Search destinations, experiences..."
      className={`w-full bg-transparent border-b px-0 py-4 outline-none font-serif text-sm tracking-wide text-stone/70 placeholder:text-stone/30 placeholder:text-xs placeholder:tracking-[0.3em] placeholder:uppercase transition-all duration-500 ${
        focused ? "border-stone/40" : "border-stone/20"
      }`}
    />
  );
}
