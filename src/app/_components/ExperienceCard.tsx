"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface ExperienceCardProps {
  title: string;
  category: string;
  location: string;
  description: string;
  price: string;
  image: string;
  referralUrl: string;
  featured?: boolean;
}

export default function ExperienceCard({
  title,
  category,
  location,
  description,
  price,
  image,
  referralUrl,
  featured = false,
}: ExperienceCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className={`relative overflow-hidden ${
        featured ? "w-full h-[480px]" : "h-[380px] w-full"
      }`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Ken Burns image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-t to-transparent ${
          featured
            ? "from-charcoal/98 via-charcoal/60"
            : "from-charcoal/95 via-charcoal/30"
        }`}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-8 py-8">
        <p className="text-gold/60 text-[9px] tracking-[0.4em] uppercase mb-3">
          {category}
        </p>
        <p className="font-serif text-2xl font-light text-stone/90 tracking-wide mb-2">
          {title}
        </p>
        <p className="text-stone/40 text-[10px] tracking-[0.25em] uppercase mb-4">
          {location}
        </p>
        <p className="text-stone/50 text-xs tracking-[0.2em] mb-6">{price}</p>
        <p className="text-stone/40 text-xs leading-relaxed tracking-wide mb-8 max-w-lg">
          {description}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => window.open(referralUrl, "_blank")}
            className="border border-gold/50 text-gold text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-gold hover:text-charcoal transition-all duration-500"
          >
            Book This Experience
          </button>
          <button
            title="Coming Soon"
            className="text-stone/30 text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:text-stone/50 transition-all duration-500"
          >
            AI Generated Trip
          </button>
        </div>
      </div>
    </motion.article>
  );
}
