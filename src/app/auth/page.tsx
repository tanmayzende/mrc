"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Mode = "signin" | "signup";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Account created. You are now signed in.");
        setTimeout(() => router.push("/"), 800);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push("/");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
      {/* Back link */}
      <div className="px-10 pt-8">
        <Link
          href="/"
          className="text-stone/30 text-[10px] tracking-[0.3em] uppercase hover:text-stone/60 transition-colors duration-500"
        >
          ← Collection
        </Link>
      </div>

      {/* Centered card */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md border border-stone/10 px-10 py-12">
          {/* Logo */}
          <p className="font-serif text-stone/80 text-xs tracking-[0.5em] uppercase text-center mb-12">
            AURVEIL
          </p>

          {/* Mode toggle */}
          <div className="flex items-center gap-6 mb-10">
            <button
              onClick={() => switchMode("signin")}
              className={`text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 ${
                mode === "signin" ? "text-gold" : "text-stone/30 hover:text-stone/50"
              }`}
            >
              Sign In
            </button>
            <span className="text-stone/15 select-none">|</span>
            <button
              onClick={() => switchMode("signup")}
              className={`text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 ${
                mode === "signup" ? "text-gold" : "text-stone/30 hover:text-stone/50"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-stone/20 px-0 py-3 text-sm tracking-wide font-serif text-stone/70 placeholder:text-stone/25 outline-none focus:border-stone/40 transition-colors duration-500"
              />
            </div>
            <div>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-stone/20 px-0 py-3 text-sm tracking-wide font-serif text-stone/70 placeholder:text-stone/25 outline-none focus:border-stone/40 transition-colors duration-500"
              />
            </div>
            {mode === "signup" && (
              <div>
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-stone/20 px-0 py-3 text-sm tracking-wide font-serif text-stone/70 placeholder:text-stone/25 outline-none focus:border-stone/40 transition-colors duration-500"
                />
              </div>
            )}

            {error && (
              <p className="text-red-400 text-xs tracking-wide -mt-2">{error}</p>
            )}
            {success && (
              <p className="text-stone/50 text-xs tracking-wide -mt-2">{success}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-gold/50 text-gold text-xs tracking-[0.25em] uppercase py-4 hover:bg-gold hover:text-charcoal transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "..." : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
