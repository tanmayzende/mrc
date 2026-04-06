"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface ReferralLinks {
  viator?: string;
  getyourguide?: string;
  booking?: string;
  klook?: string;
  seatgeek?: string;
  direct?: string;
}

export interface ExperienceCardProps {
  title: string;
  category: string;
  location: string;
  description: string;
  price: string;
  image: string;
  referralUrl: string;
  referralLinks?: ReferralLinks;
  featured?: boolean;
}

const PARTNER_LABELS: Record<keyof ReferralLinks, string> = {
  viator: "Viator",
  getyourguide: "GetYourGuide",
  booking: "Booking.com",
  klook: "Klook",
  seatgeek: "SeatGeek",
  direct: "Official Site",
};

export default function ExperienceCard({
  title,
  category,
  location,
  description,
  price,
  image,
  referralUrl,
  referralLinks,
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
        <div className="flex flex-col gap-3">
          {(() => {
            const partners = referralLinks
              ? (Object.keys(referralLinks) as (keyof ReferralLinks)[]).filter(
                  (k) => referralLinks[k]
                )
              : [];
            const fallbackUrl = referralUrl;
            if (partners.length > 0) {
              return (
                <div className="flex flex-wrap gap-2">
                  {partners.map((key) => (
                    <button
                      key={key}
                      onClick={() => window.open(referralLinks![key], "_blank")}
                      className="border border-stone/20 text-stone/50 text-[9px] tracking-[0.25em] uppercase px-4 py-2 hover:border-gold/50 hover:text-gold transition-all duration-500"
                    >
                      {PARTNER_LABELS[key]}
                    </button>
                  ))}
                </div>
              );
            }
            if (fallbackUrl) {
              return (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => window.open(fallbackUrl, "_blank")}
                    className="border border-gold/50 text-gold text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-gold hover:text-charcoal transition-all duration-500"
                  >
                    Book This Experience
                  </button>
                </div>
              );
            }
            return null;
          })()}
          <button
            title="Coming Soon"
            className="text-stone/30 text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:text-stone/50 transition-all duration-500 self-start"
          >
            AI Generated Trip
          </button>
        </div>
      </div>
    </motion.article>
  );
}
