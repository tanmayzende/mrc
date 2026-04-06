"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth");
      } else {
        setUser(user);
        setLoading(false);
      }
    });
  }, [router]);

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

      <div className="px-16 py-16 max-w-2xl">
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
          <p className="text-stone/30 text-[10px] tracking-[0.5em] uppercase mb-6">
            SAVED EXPERIENCES
          </p>
          <div className="border border-stone/10 px-8 py-10 text-center">
            <p className="text-stone/30 text-xs tracking-[0.3em] uppercase">
              No saved experiences yet
            </p>
          </div>
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
