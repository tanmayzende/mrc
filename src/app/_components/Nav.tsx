const NAV_ITEMS = [
  "Gastronomy",
  "Nightlife",
  "Sports",
  "Wellness Retreats",
  "Adventure",
];

export default function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 py-8">
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

      {/* Enter */}
      <a
        href="#"
        className="text-stone/40 text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 hover:text-gold"
      >
        Enter
      </a>
    </nav>
  );
}
