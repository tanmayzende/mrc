"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CityCard from "./CityCard";
import { detectLocation, rankCitiesByLocation } from "@/lib/geolens";

interface Destination {
  city: string;
  country: string;
  tag: string | null;
  image: string;
}

const DESTINATIONS: Destination[] = [
  {
    city: "Santorini",
    country: "Greece",
    tag: "Hidden & Emerging",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=95",
  },
  {
    city: "Monte Carlo",
    country: "Monaco",
    tag: null,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=95",
  },
  {
    city: "Kyoto",
    country: "Japan",
    tag: null,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=95",
  },
  {
    city: "Amalfi Coast",
    country: "Italy",
    tag: null,
    image: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&q=95",
  },
  {
    city: "Dubai",
    country: "UAE",
    tag: null,
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=95",
  },
  {
    city: "St. Barts",
    country: "Caribbean",
    tag: null,
    image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=95",
  },
  {
    city: "Marrakech",
    country: "Morocco",
    tag: "Hidden & Emerging",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=95",
  },
  {
    city: "Maldives",
    country: "Indian Ocean",
    tag: null,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=95",
  },
];

function toSlug(city: string) {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function Collection() {
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS);
  const [geoLoaded, setGeoLoaded] = useState(false);

  useEffect(() => {
    detectLocation().then((geo) => {
      console.log('detectLocation result:', geo);
      if (geo && geo.latitude && geo.longitude) {
        const currentSlugs = DESTINATIONS.map((d) => toSlug(d.city));
        const rankedSlugs = rankCitiesByLocation(currentSlugs, geo.latitude, geo.longitude);
        console.log('rankCitiesByLocation result:', rankedSlugs);

        const reordered = rankedSlugs
          .map((slug) => DESTINATIONS.find((d) => toSlug(d.city) === slug))
          .filter(Boolean) as Destination[];

        const unranked = DESTINATIONS.filter((d) => !reordered.includes(d));
        setDestinations([...reordered, ...unranked]);
      }
      setGeoLoaded(true);
    });
  }, []);

  return (
    <section className="bg-charcoal py-28 px-16">
      {/* Section header */}
      <div className="mb-16 pl-4">
        <p className="text-stone/30 text-[10px] tracking-[0.5em] uppercase mb-6">
          CURATED DESTINATIONS
        </p>
        <h2 className="font-serif text-5xl font-light text-stone tracking-[0.06em]">
          The Collection
        </h2>
        <div className="w-8 border-t border-gold/40 mt-6" />
      </div>

      {/* Horizontal scroll rail */}
      <motion.div
        className="flex gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        animate={{ opacity: geoLoaded ? 1 : 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {destinations.map((dest) => (
          <CityCard key={dest.city} {...dest} />
        ))}
      </motion.div>
    </section>
  );
}
