"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import PreferenceModal from "./PreferenceModal";

export default function PreferenceGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem('aurveil_show_preferences');
    if (!flag) return;

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setShow(true);
    });
  }, []);

  if (!show) return null;

  return (
    <PreferenceModal
      onDismiss={() => {
        localStorage.removeItem('aurveil_show_preferences');
        setShow(false);
      }}
    />
  );
}
