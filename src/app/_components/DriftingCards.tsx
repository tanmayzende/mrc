"use client";

import { useRef, useEffect } from "react";

const CARDS = [
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
    label: "Gastronomy", location: "Paris",
    name: "Chef's Table — 3-Star Michelin",
    price: "$380",
  },
  {
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80",
    label: "Yacht & Sea", location: "Ibiza",
    name: "Private Sunset Yacht",
    price: "$280",
  },
  {
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80",
    label: "Exclusive", location: "Gstaad",
    name: "Alpine Chalet & Butler",
    price: "$12,000",
  },
  {
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80",
    label: "Nightlife", location: "Barcelona",
    name: "VIP Club Access & Table",
    price: "$200",
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80",
    label: "Adventure", location: "Dubai",
    name: "Skydive Over the Palm",
    price: "$599",
  },
  {
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80",
    label: "Private Travel", location: "Dubai",
    name: "Private Jet Charter",
    price: "$8,000",
  },
  {
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=500&q=80",
    label: "Wellness", location: "Mykonos",
    name: "Cliff Spa Retreat",
    price: "$450",
  },
  {
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&q=80",
    label: "Culture", location: "Paris",
    name: "Private Museum After Hours",
    price: "$1,200",
  },
];

// Duplicate for seamless loop
const ALL_CARDS = [...CARDS, ...CARDS];

export default function DriftingCards() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let pos1 = 0;
    let pos2 = -400; // offset second row

    const SPEED1 = 0.4;
    const SPEED2 = 0.28;

    const cardW = 280 + 16; // card width + gap
    const totalW = cardW * CARDS.length;

    function tick() {
      pos1 -= SPEED1;
      pos2 -= SPEED2;

      if (Math.abs(pos1) >= totalW) pos1 = 0;
      if (Math.abs(pos2) >= totalW) pos2 = 0;

      if (row1Ref.current) row1Ref.current.style.transform = `translateX(${pos1}px)`;
      if (row2Ref.current) row2Ref.current.style.transform = `translateX(${pos2}px)`;

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const Card = ({ card }: { card: typeof CARDS[0] }) => (
    <div
      className="flex-shrink-0 rounded-xl overflow-hidden cursor-pointer group"
      style={{ width: "280px", background: "#161616", border: "0.5px solid rgba(255,255,255,0.07)" }}
    >
      <div className="relative overflow-hidden" style={{ height: "180px" }}>
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
        <span
          className="absolute top-3 left-3 text-white/70 text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", border: "0.5px solid rgba(255,255,255,0.1)" }}
        >
          {card.label}
        </span>
      </div>
      <div className="p-4">
        <p className="text-white/25 text-[9px] tracking-[0.1em] uppercase mb-1">{card.location}</p>
        <p className="font-serif text-white/75 text-base font-light leading-snug mb-3">{card.name}</p>
        <p className="text-white/50 text-sm">From <span className="text-white/75 font-medium">{card.price}</span></p>
      </div>
    </div>
  );

  return (
    <div
      className="py-20 overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Label */}
      <div className="px-8 mb-12 text-center">
        <p className="text-white/15 text-[9px] tracking-[0.3em] uppercase mb-4">What awaits you</p>
        <h2
          className="font-serif font-light text-white/80 mx-auto"
          style={{ fontSize: "clamp(36px, 4vw, 56px)", maxWidth: "600px", lineHeight: 1.1 }}
        >
          Every experience, <em>curated</em>
        </h2>
      </div>

      {/* Row 1 — drifts left */}
      <div className="relative mb-4" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
        <div ref={row1Ref} className="flex gap-4" style={{ width: "max-content" }}>
          {ALL_CARDS.map((card, i) => <Card key={i} card={card} />)}
        </div>
      </div>

      {/* Row 2 — drifts left, slower and offset */}
      <div className="relative" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
        <div ref={row2Ref} className="flex gap-4" style={{ width: "max-content" }}>
          {[...ALL_CARDS].reverse().map((card, i) => <Card key={i} card={card} />)}
        </div>
      </div>
    </div>
  );
}
