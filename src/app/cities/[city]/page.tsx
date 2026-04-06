"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import CategoryPills from "@/app/_components/CategoryPills";
import ExperienceCard, {
  type ExperienceCardProps,
  type ReferralLinks,
} from "@/app/_components/ExperienceCard";

// ── DB row types ───────────────────────────────────────────────────────────
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
  referral_links: ReferralLinks | null;
  featured: boolean;
  sort_order: number;
}

// ── Layout helpers ─────────────────────────────────────────────────────────
type Row =
  | { type: "featured"; item: ExperienceCardProps }
  | { type: "portrait"; items: ExperienceCardProps[] };

function buildRows(experiences: ExperienceCardProps[]): Row[] {
  const rows: Row[] = [];
  let buffer: ExperienceCardProps[] = [];

  const flushBuffer = () => {
    for (let i = 0; i < buffer.length; i += 3) {
      rows.push({ type: "portrait", items: buffer.slice(i, i + 3) });
    }
    buffer = [];
  };

  for (const exp of experiences) {
    if (exp.featured) {
      flushBuffer();
      rows.push({ type: "featured", item: exp });
    } else {
      buffer.push(exp);
    }
  }
  flushBuffer();
  return rows;
}

function formatName(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function mapExperience(row: ExperienceRow): ExperienceCardProps {
  const hasLinks =
    row.referral_links &&
    Object.values(row.referral_links).some(Boolean);
  return {
    title: row.title,
    category: row.category,
    location: row.location,
    description: row.description ?? "",
    price: row.price ?? "",
    image: row.image ?? "",
    referralUrl: row.referral_url ?? "",
    referralLinks: hasLinks ? row.referral_links! : undefined,
    featured: row.featured,
  };
}

// ── Animation variants ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" as const },
  },
};

// ── Page ───────────────────────────────────────────────────────────────────
export default function CityPage() {
  const { city } = useParams<{ city: string }>();

  const [cityData, setCityData] = useState<CityRow | null>(null);
  const [experiences, setExperiences] = useState<ExperienceCardProps[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!city) return;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      const [{ data: cityRow, error: cityErr }, { data: expRows, error: expErr }] =
        await Promise.all([
          supabase.from("cities").select("*").eq("slug", city).single(),
          supabase
            .from("experiences")
            .select("*")
            .eq("city_slug", city)
            .order("sort_order"),
        ]);

      if (cityErr || !cityRow) {
        setError(true);
        setLoading(false);
        return;
      }

      setCityData(cityRow as CityRow);
      setExperiences((expRows ?? []).map((r) => mapExperience(r as ExperienceRow)));
      setLoading(false);
    };

    fetchData();
  }, [city]);

  // ── Loading state ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-charcoal">
        <div className="flex flex-col items-center gap-6">
          <div className="h-12 w-[1px] bg-gold/30 animate-pulse" />
          <p className="text-stone/30 text-[10px] tracking-[0.4em] uppercase">
            Loading
          </p>
        </div>
      </div>
    );
  }

  // ── Error / not found state ────────────────────────────────────────────
  if (error || !cityData) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-charcoal gap-6">
        <p className="font-serif text-4xl font-light text-stone/50 tracking-[0.06em]">
          Destination not found
        </p>
        <Link
          href="/"
          className="text-stone/30 text-[10px] tracking-[0.3em] uppercase hover:text-stone/60 transition-colors duration-500"
        >
          ← Return to Collection
        </Link>
      </div>
    );
  }

  const heroImage =
    cityData.hero_image ??
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=95";

  const filtered =
    activeCategory === "All"
      ? experiences
      : experiences.filter((e) => e.category === activeCategory);

  const rows = buildRows(filtered);

  return (
    <>
      {/* ── City Hero ──────────────────────────────────────────────── */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-charcoal/50" aria-hidden />

        {/* Back button */}
        <div className="absolute top-8 left-10 z-20">
          <Link
            href="/"
            className="text-stone/40 text-xs tracking-[0.3em] uppercase transition-colors duration-500 hover:text-stone/70"
          >
            ← Collection
          </Link>
        </div>

        {/* Hero text */}
        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
        >
          <h1 className="font-serif text-7xl font-light text-stone/90 tracking-[0.08em]">
            {cityData.name}
          </h1>
          <p className="text-stone/40 text-[10px] tracking-[0.4em] uppercase mt-3">
            {cityData.country}
          </p>
          <div className="w-8 border-t border-gold/40 mx-auto mt-6" />
        </motion.div>
      </section>

      {/* ── Sticky Category Pills ──────────────────────────────────── */}
      <motion.div
        className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm py-6 px-16 border-b border-stone/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
      >
        <CategoryPills active={activeCategory} onSelect={setActiveCategory} />
      </motion.div>

      {/* ── Experience Catalog ─────────────────────────────────────── */}
      <section className="bg-charcoal py-4 px-16">
        <p className="text-stone/30 text-[10px] tracking-[0.5em] uppercase mb-8">
          CURATED EXPERIENCES
        </p>

        {filtered.length === 0 ? (
          <p className="text-stone/30 text-xs tracking-[0.3em] uppercase">
            No experiences found for this category.
          </p>
        ) : (
          <motion.div
            className="flex flex-col gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {rows.map((row, rowIndex) =>
              row.type === "featured" ? (
                <motion.div key={`row-${rowIndex}`} variants={cardVariants}>
                  <ExperienceCard {...row.item} />
                </motion.div>
              ) : (
                <div key={`row-${rowIndex}`} className="flex gap-5">
                  {row.items.map((exp) => (
                    <motion.div
                      key={exp.title}
                      variants={cardVariants}
                      className="flex-1 min-w-0"
                      style={{
                        maxWidth:
                          row.items.length === 1
                            ? "100%"
                            : row.items.length === 2
                            ? "50%"
                            : "33.333%",
                      }}
                    >
                      <ExperienceCard {...exp} />
                    </motion.div>
                  ))}
                </div>
              )
            )}
          </motion.div>
        )}
      </section>
    </>
  );
}
