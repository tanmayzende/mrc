"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface PreferenceModalProps {
  onDismiss: () => void;
}

const TRAVEL_STYLES = [
  { value: 'adventure', label: 'ADVENTURE' },
  { value: 'wellness', label: 'WELLNESS' },
  { value: 'nightlife', label: 'NIGHTLIFE' },
  { value: 'culture', label: 'CULTURE' },
  { value: 'sports', label: 'SPORTS' },
  { value: 'maritime', label: 'MARITIME' },
];

const TRAVEL_FREQUENCIES = [
  { value: 'occasionally', label: 'OCCASIONALLY' },
  { value: 'regularly', label: 'REGULARLY' },
  { value: 'constantly', label: 'CONSTANTLY' },
];

export default function PreferenceModal({ onDismiss }: PreferenceModalProps) {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const toggleStyle = (value: string) => {
    setSelectedStyles(prev =>
      prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('user_preferences').upsert({
          user_id: user.id,
          travel_style: selectedStyles,
          travel_frequency: selectedFrequency || null,
        });
      }
    } catch {
      // Fail silently
    } finally {
      setSaving(false);
      onDismiss();
    }
  };

  const pillBase = "px-6 py-3 text-[10px] tracking-[0.3em] uppercase cursor-pointer transition-all duration-300 border";
  const pillActive = "border-gold/60 text-gold bg-gold/5";
  const pillInactive = "border-stone/20 text-stone/40 hover:border-stone/40 hover:text-stone/60";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-sm px-6">
      <div className="w-full max-w-lg bg-charcoal border border-stone/15 p-12">
        {/* Logo */}
        <p className="font-serif text-stone/60 text-xs tracking-[0.5em] uppercase text-center mb-8">
          AURVEIL
        </p>

        {/* Headline */}
        <h2 className="font-serif text-3xl font-light text-stone/90 text-center mb-2">
          Tell us how you travel
        </h2>
        <p className="text-stone/40 text-xs tracking-[0.2em] uppercase text-center mb-12">
          We&apos;ll curate your experience accordingly.
        </p>

        {/* Question 1 */}
        <p className="text-stone/50 text-[10px] tracking-[0.4em] uppercase mb-4">
          What kind of traveler are you?
        </p>
        <div className="flex flex-wrap gap-2 mb-10">
          {TRAVEL_STYLES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => toggleStyle(value)}
              className={`${pillBase} ${selectedStyles.includes(value) ? pillActive : pillInactive}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Question 2 */}
        <p className="text-stone/50 text-[10px] tracking-[0.4em] uppercase mb-4">
          How often do you travel?
        </p>
        <div className="flex flex-wrap gap-2 mb-12">
          {TRAVEL_FREQUENCIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedFrequency(value)}
              className={`${pillBase} ${selectedFrequency === value ? pillActive : pillInactive}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full border border-gold/50 text-gold text-[10px] tracking-[0.3em] uppercase py-4 hover:bg-gold hover:text-charcoal transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? '...' : 'BEGIN YOUR JOURNEY'}
        </button>

        {/* Skip */}
        <p
          onClick={onDismiss}
          className="text-stone/25 text-xs text-center mt-4 cursor-pointer hover:text-stone/40 transition-colors duration-300"
        >
          Skip for now
        </p>
      </div>
    </div>
  );
}
