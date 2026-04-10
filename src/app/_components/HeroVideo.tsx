"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  { src: "/videos/v1_web.mp4", label: "Mediterranean, Spain" },
  { src: "/videos/v2_web.mp4", label: "Lifestyle & Nightlife" },
  { src: "/videos/v3_web.mp4", label: "Exclusive Access" },
  { src: "/videos/v4_web.mp4", label: "Alpine, Switzerland" },
];

export default function HeroVideo() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = (n: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(n);
      setTransitioning(false);
    }, 800);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {SLIDES.map((slide, i) => (
        <motion.video
          key={slide.src}
          src={slide.src}
          autoPlay
          muted
          loop
          playsInline
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Scene indicators */}
      <div className="absolute bottom-10 left-12 z-10 flex items-center gap-4">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="h-[2px] rounded-full transition-all duration-500 cursor-pointer"
              style={{
                width: i === current ? "40px" : "20px",
                background: i === current ? "#C9A84C" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="text-white/40 text-[10px] tracking-[0.2em] uppercase"
          >
            {SLIDES[current].label}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
