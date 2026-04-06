"use client";

import SearchBar from "./SearchBar";

export default function HomeSearch() {
  return (
    <div className="flex flex-col items-center w-full max-w-lg mt-10">
      <p className="text-stone/20 text-[9px] tracking-[0.4em] uppercase mb-4">
        OR SEARCH DIRECTLY
      </p>
      <SearchBar />
    </div>
  );
}
