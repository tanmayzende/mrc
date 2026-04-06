"use client";

const CATEGORIES = [
  "All",
  "Stays",
  "Gastronomy & Dining",
  "Concierge",
  "Wellness Retreats",
  "Adventure",
  "Nightlife",
  "Sports",
  "Music & Festivals",
  "Maritime Escapes",
  "Wildlife & Nature",
  "Fashion",
  "Culture & Arts",
  "Pilgrimage",
];

interface CategoryPillsProps {
  active: string;
  onSelect: (category: string) => void;
}

export default function CategoryPills({ active, onSelect }: CategoryPillsProps) {
  return (
    <div className="relative">
      {/* Scroll rail */}
      <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`shrink-0 px-5 py-2 text-[10px] tracking-[0.3em] uppercase transition-all duration-500 ${
              active === cat
                ? "border border-gold/60 text-gold bg-gold/5"
                : "border border-stone/20 text-stone/40 hover:border-stone/40 hover:text-stone/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Right-edge fade hint */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-charcoal to-transparent" />
    </div>
  );
}
