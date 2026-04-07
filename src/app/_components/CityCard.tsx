"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface CityCardProps {
  city: string;
  country: string;
  image: string;
  tag?: string | null;
}

function toSlug(city: string) {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function CityCard({ city, country, image, tag }: CityCardProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const slug = toSlug(city);

  console.log(`CityCard → /cities/${slug}`);

  const handleClick = () => {
    router.push(`/cities/${slug}`);
  };

  return (
    <motion.article
      className="relative shrink-0 w-64 md:w-80 h-[500px] overflow-hidden cursor-pointer select-none"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Image with Ken Burns zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-6">
        {tag && (
          <p className="text-gold/70 text-[9px] tracking-[0.4em] uppercase mb-2">
            {tag}
          </p>
        )}

        <motion.p
          className="font-serif text-3xl font-light tracking-wide"
          animate={{ color: hovered ? "#C9A84C" : "#E5E4E2" }}
          transition={{ duration: 0.6 }}
        >
          {city}
        </motion.p>

        <p className="text-stone/40 text-[10px] tracking-[0.3em] uppercase mt-1">
          {country}
        </p>
      </div>

      {/* Gold underline slides in on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gold"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.article>
  );
}
