"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";
import ExperienceCard, {
  type ExperienceCardProps,
  type ReferralLinks,
} from "@/app/_components/ExperienceCard";

interface SavedExperienceRow {
  experience_id: string;
  city_slug: string;
  experiences: {
    id: string;
    title: string;
    category: string;
    location: string;
    description: string | null;
    price: string | null;
    image: string | null;
    referral_url: string | null;
    referral_links: ReferralLinks | null;
  } | null;
}

function mapSaved(row: SavedExperienceRow): (ExperienceCardProps & { id: string }) | null {
  const e = row.experiences;
  if (!e) return null;
  const hasLinks = e.referral_links && Object.values(e.referral_links).some(Boolean);
  return {
    id: row.experience_id,
    title: e.title,
    category: e.category,
    location: e.location,
    description: e.description ?? "",
    price: e.price ?? "",
    image: e.image ?? "",
    referralUrl: e.referral_url ?? "",
    referralLinks: hasLinks ? e.referral_links! : undefined,
    featured: false,
  };
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedExperiences, setSavedExperiences] = useState<(ExperienceCardProps & { id: string })[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.push("/auth");
        return;
      }
      setUser(user);

      const { data: saved } = await supabase
        .from("saved_experiences")
        .select("experience_id, city_slug, experiences(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const mapped = ((saved ?? []) as unknown as SavedExperienceRow[])
        .map(mapSaved)
        .filter((e): e is ExperienceCardProps & { id: string } => e !== null);

      setSavedExperiences(mapped);
      setSavedIds(new Set(mapped.map((e) => e.id)));
      setLoading(false);
    });
  }, [router]);

  async function handleUnsave(experienceId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase
      .from("saved_experiences")
      .delete()
      .eq("user_id", user.id)
      .eq("experience_id", experienceId);
    setSavedExperiences((prev) => prev.filter((e) => e.id !== experienceId));
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.delete(experienceId);
      return next;
    });
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-charcoal">
        <div className="h-12 w-[1px] bg-gold/30 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header */}
      <div className="px-16 pt-16 pb-12 border-b border-stone/10 flex items-center justify-between">
        <Link
          href="/"
          className="text-stone/30 text-[10px] tracking-[0.3em] uppercase hover:text-stone/60 transition-colors duration-500"
        >
          ← Collection
        </Link>
        <span className="font-serif text-stone/80 text-xs tracking-[0.5em] uppercase">
          AURVEIL
        </span>
      </div>

      <div className="px-16 py-16">
        {/* Account info */}
        <p className="text-stone/30 text-[10px] tracking-[0.5em] uppercase mb-4">
          MY ACCOUNT
        </p>
        <p className="font-serif text-3xl font-light text-stone/80 tracking-[0.04em] mb-2">
          Welcome back
        </p>
        <p className="text-stone/40 text-xs tracking-[0.2em] mb-12">{user?.email}</p>

        {/* Saved experiences */}
        <div className="mb-16">
          <p className="text-stone/30 text-[10px] tracking-[0.5em] uppercase mb-8">
            SAVED EXPERIENCES
          </p>

          {savedExperiences.length === 0 ? (
            <div className="border border-stone/10 px-8 py-10 text-center max-w-md">
              <p className="text-stone/30 text-xs tracking-[0.3em] uppercase">
                No saved experiences yet
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedExperiences.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  {...exp}
                  experienceId={exp.id}
                  isSaved={savedIds.has(exp.id)}
                  onSaveToggle={(_id, currentlySaved) => {
                    if (currentlySaved) handleUnsave(exp.id);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="border border-stone/20 text-stone/40 text-[10px] tracking-[0.25em] uppercase px-8 py-3 hover:border-stone/40 hover:text-stone/60 transition-all duration-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
