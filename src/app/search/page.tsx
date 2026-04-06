"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import CityCard from "@/app/_components/CityCard";
import ExperienceCard from "@/app/_components/ExperienceCard";
import type { ExperienceCardProps } from "@/app/_components/ExperienceCard";

interface CityRow {
  slug: string;
  name: string;
  country: string;
  hero_image: string | null;
  tag: string | null;
}

interface ExperienceRow {
  title: string;
  category: string;
  location: string;
  description: string | null;
  price: string | null;
  image: string | null;
  referral_url: string | null;
  featured: boolean;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [cities, setCities] = useState<CityRow[]>([]);
  const [experiences, setExperiences] = useState<ExperienceCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }

    const run = async () => {
      setLoading(true);

      const [{ data: cityResults }, { data: expResults }] = await Promise.all([
        supabase
          .from("cities")
          .select("*")
          .or(
            `name.ilike.%${query}%,country.ilike.%${query}%,region.ilike.%${query}%`
          )
          .limit(6),
        supabase
          .from("experiences")
          .select("*")
          .or(
            `title.ilike.%${query}%,category.ilike.%${query}%,location.ilike.%${query}%,description.ilike.%${query}%`
          )
          .limit(12),
      ]);

      setCities((cityResults ?? []) as CityRow[]);
      setExperiences(
        ((expResults ?? []) as ExperienceRow[]).map((r) => ({
          title: r.title,
          category: r.category,
          location: r.location,
          description: r.description ?? "",
          price: r.price ?? "",
          image: r.image ?? "",
          referralUrl: r.referral_url ?? "",
          featured: false,
        }))
      );
      setLoading(false);
    };

    run();
  }, [query]);

  const hasResults = cities.length > 0 || experiences.length > 0;

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header */}
      <div className="px-16 pt-16 pb-12 border-b border-stone/10">
        <Link
          href="/"
          className="text-stone/30 text-[10px] tracking-[0.3em] uppercase hover:text-stone/60 transition-colors duration-500"
        >
          ← Collection
        </Link>
        <div className="mt-8">
          <p className="text-stone/30 text-[10px] tracking-[0.5em] uppercase mb-3">
            SEARCH
          </p>
          <p className="font-serif text-4xl font-light text-stone/80 tracking-[0.04em]">
            {query ? (
              <>
                Results for{" "}
                <span className="text-stone/90 italic">{query}</span>
              </>
            ) : (
              "What are you looking for?"
            )}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="h-12 w-[1px] bg-gold/30 animate-pulse" />
            <p className="text-stone/30 text-[10px] tracking-[0.4em] uppercase">
              Searching
            </p>
          </div>
        </div>
      ) : !query.trim() || !hasResults ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <p className="font-serif text-3xl font-light text-stone/40 tracking-[0.04em]">
            {query ? `No results for "${query}"` : "Enter a search above"}
          </p>
          {query && (
            <p className="text-stone/30 text-[10px] tracking-[0.3em] uppercase">
              Try searching for a city, country or experience type
            </p>
          )}
        </div>
      ) : (
        <div className="px-16 py-12 flex flex-col gap-16">
          {/* Destinations */}
          {cities.length > 0 && (
            <section>
              <p className="text-stone/30 text-[10px] tracking-[0.5em] uppercase mb-8">
                DESTINATIONS
              </p>
              <motion.div
                className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {cities.map((c) => (
                  <motion.div key={c.slug} variants={itemVariants} className="shrink-0">
                    <CityCard
                      city={c.name}
                      country={c.country}
                      image={c.hero_image ?? ""}
                      tag={c.tag}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}

          {/* Experiences */}
          {experiences.length > 0 && (
            <section>
              <p className="text-stone/30 text-[10px] tracking-[0.5em] uppercase mb-8">
                EXPERIENCES
              </p>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {experiences.map((exp) => (
                  <motion.div key={exp.title} variants={itemVariants}>
                    <ExperienceCard {...exp} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-charcoal">
          <div className="flex flex-col items-center gap-6">
            <div className="h-12 w-[1px] bg-gold/30 animate-pulse" />
            <p className="text-stone/30 text-[10px] tracking-[0.4em] uppercase">
              Loading
            </p>
          </div>
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
