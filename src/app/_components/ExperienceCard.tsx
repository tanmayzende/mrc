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
  experienceId?: string;
  isSaved?: boolean;
  onSaveToggle?: (id: string, saved: boolean) => void;
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
  experienceId,
  isSaved = false,
  onSaveToggle,
}: ExperienceCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSaveToggle && experienceId) {
      onSaveToggle(experienceId, isSaved);
    }
  };

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
        className={`absolute inset-0 bg-gradient-to-t ${
          featured
            ? "from-black/95 via-black/60 to-black/20"
            : "from-black/95 via-black/50 to-transparent"
        }`}
      />

      {/* Save button — rendered after image/gradient so it sits above them in stacking order */}
      <button
        onClick={handleSave}
        aria-label={isSaved ? "Unsave experience" : "Save experience"}
        className={`absolute top-3 right-3 z-10 p-1.5 bg-charcoal/80 border transition-all duration-500 ${
          isSaved
            ? "border-gold/60 text-gold bg-gold/10"
            : "border-stone/50 text-stone/70 hover:border-gold/50 hover:text-gold"
        }`}
      >
        {isSaved ? (
          <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1h10v14l-5-3.5L1 15V1z"/>
          </svg>
        ) : (
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1h10v14l-5-3.5L1 15V1z"/>
          </svg>
        )}
      </button>

      {/* Content */}
      <div className={`absolute bottom-0 left-0 right-0 pt-24 pb-8 ${featured ? "px-4 md:px-8" : "px-4 md:px-6"}`}>
        <p className="text-gold/80 text-[9px] tracking-[0.4em] uppercase mb-3">
          {category}
        </p>
        <p className="font-serif text-xl md:text-2xl font-light text-white tracking-wide mb-2 line-clamp-2">
          {title}
        </p>
        <p className="text-white/60 text-[10px] tracking-[0.25em] uppercase mb-4">
          {location}
        </p>
        <p className="text-white/70 text-xs tracking-[0.2em] mb-6">{price}</p>
        <p className="hidden md:block text-stone/40 text-xs leading-relaxed tracking-wide mb-8 max-w-lg">
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
                <div className="flex flex-row flex-wrap gap-1.5">
                  {partners.map((key) => (
                    <button
                      key={key}
                      onClick={() => window.open(referralLinks![key], "_blank")}
                      className="border border-stone/20 text-stone/50 text-[8px] tracking-[0.25em] uppercase px-2 py-1.5 hover:border-gold/50 hover:text-gold transition-all duration-500"
                    >
                      {PARTNER_LABELS[key]}
                    </button>
                  ))}
                </div>
              );
            }
            if (fallbackUrl) {
              return (
                <div className="flex flex-row flex-wrap gap-1.5">
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
            className="text-stone/30 text-[10px] tracking-[0.15em] uppercase px-6 py-3 hover:text-stone/50 transition-all duration-500 self-start whitespace-nowrap"
          >
            AI Generated Trip
          </button>
        </div>
      </div>
    </motion.article>
  );
}
