"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from "./_components/Nav";
import HeroVideo from "./_components/HeroVideo";
import HeroSearch from "./_components/HeroSearch";
import PreferenceGate from "./_components/PreferenceGate";
import DriftingCards from "./_components/DriftingCards";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

const CATEGORIES = [
  { icon: "✦", label: "All" },
  { icon: "🌙", label: "Nightlife" },
  { icon: "🍽️", label: "Gastronomy" },
  { icon: "⚡", label: "Sports" },
  { icon: "🧘", label: "Wellness" },
  { icon: "🏔️", label: "Adventure" },
  { icon: "✈️", label: "Private Travel" },
  { icon: "🛥️", label: "Yacht & Sea" },
  { icon: "🎰", label: "Exclusive Access" },
];

const EXPERIENCES = [
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    badge: "Gastronomy", location: "Paris · Fine Dining",
    name: "Chef's Table — 3-Star Michelin",
    price: "From $380", per: "/ person", rating: "5.0",
  },
  {
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    badge: "Yacht & Sea", location: "Ibiza · Yacht Charter",
    name: "Private Sunset Yacht, Open Bar",
    price: "From $280", per: "/ person", rating: "4.8",
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    badge: "Adventure", location: "Dubai · Skydiving",
    name: "Skydive Over the Palm",
    price: "From $599", per: "/ person", rating: "4.9",
  },
  {
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
    badge: "Exclusive", location: "Gstaad · Private Chalet",
    name: "Alpine Chalet, Butler & Spa",
    price: "From $12,000", per: "/ night", rating: "5.0",
  },
];

const DESTINATIONS = [
  { name: "Barcelona", count: "142", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80" },
  { name: "Paris", count: "218", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80" },
  { name: "Dubai", count: "186", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" },
  { name: "Mykonos", count: "74", image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80" },
  { name: "Tokyo", count: "97", image: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80" },
];

export default function Home() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      <PreferenceGate />

      {/* ── HERO (dark, cinematic) ── */}
      <section className="relative h-screen min-h-[680px] overflow-hidden flex flex-col items-center justify-center text-center">
        <HeroVideo />
        <Nav />
        <div className="relative z-10 flex flex-col items-center px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/35 text-[10px] tracking-[0.3em] uppercase mb-8"
          >
            Private access to the world&apos;s finest experiences
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-serif font-light text-white leading-[0.92] mb-8"
            style={{ fontSize: "clamp(72px, 10vw, 120px)" }}
          >
            Live <em className="italic text-white/60">beyond</em>
            <br />the ordinary
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/40 text-[15px] font-light leading-relaxed tracking-wide mb-2"
          >
            From Ibiza nightlife to Gstaad chalets — every experience,
            <br />every budget, curated for those who demand more.
          </motion.p>
          <HeroSearch />
        </div>
      </section>

      {/* ── STATS (pure black, massive type) ── */}
      <Reveal>
        <section style={{ background: "#050505" }} className="py-20 px-6 border-y border-white/4">
          <div className="max-w-4xl mx-auto grid grid-cols-3 divide-x divide-white/6">
            {[
              { n: "50+", l: "Cities worldwide" },
              { n: "1,200+", l: "Curated experiences" },
              { n: "$2K–$200K", l: "Every budget" },
            ].map(({ n, l }) => (
              <div key={l} className="text-center px-8">
                <div className="font-serif font-light text-white leading-none mb-3"
                  style={{ fontSize: "clamp(44px, 6vw, 80px)" }}>{n}</div>
                <div className="text-white/20 text-[9px] tracking-[0.2em] uppercase">{l}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── DRIFTING CARDS ── */}
      <div style={{background:"#050505", padding:"4px 0"}}><DriftingCards /></div>

      {/* ── CATEGORIES ── */}
      <section style={{ background: "#0A0A0A" }} className="border-b border-white/5 py-5 px-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {CATEGORIES.map((c, i) => (
            <motion.button key={c.label}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs tracking-wide transition-all duration-300 whitespace-nowrap ${
                i === 0
                  ? "bg-white text-black border-transparent font-medium"
                  : "border-white/10 text-white/35 hover:border-white/25 hover:text-white/65"
              }`}
            >
              <span className="text-sm">{c.icon}</span> {c.label}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCES (dark) ── */}
      <section style={{ background: "#0A0A0A" }} className="py-24 px-6">
        <Reveal>
          <div className="max-w-7xl mx-auto mb-12">
            <p className="text-white/20 text-[9px] tracking-[0.25em] uppercase mb-4">Trending Now</p>
            <h2 className="font-serif font-light text-white/90 leading-tight"
              style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
              Experiences worth <em>every</em> penny
            </h2>
          </div>
        </Reveal>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.name} delay={i * 0.08}>
              <div className="group rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,0.6)] flex flex-col h-[340px]"
                style={{ background: "#141414" }}>
                <div className="relative h-[200px] flex-shrink-0 overflow-hidden">
                  <img src={exp.image} alt={exp.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white/70 text-[9px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border border-white/10">
                    {exp.badge}
                  </span>
                  <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-xs text-black/40">♡</span>
                </div>
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-white/20 text-[9px] tracking-[0.12em] uppercase mb-1.5">{exp.location}</p>
                    <h3 className="font-serif text-white/75 text-base font-light leading-snug line-clamp-2">{exp.name}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <span className="text-white/65 text-sm">
                      {exp.price} <span className="text-white/20 text-xs">{exp.per}</span>
                    </span>
                    <span className="text-white/25 text-xs"><b className="text-white/50">{exp.rating}</b> ★</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL (CREAM — contrast moment) ── */}
      <section style={{ background: "#F2EDE4" }} className="py-24 px-6">
        <Reveal>
          <div className="max-w-7xl mx-auto mb-12">
            <p className="text-black/30 text-[9px] tracking-[0.25em] uppercase mb-4">Madriche Collections</p>
            <h2 className="font-serif font-light text-black/80 leading-tight"
              style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
              Curated for <em>every</em> kind of traveller
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-7xl mx-auto">
            {[
              {
                img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1000&q=80",
                tag: "Ultra Niche",
                title: "Gstaad & St. Moritz — The Winter Ultra Guide",
                sub: "Private chalets · Helicopter arrivals · Members-only events",
              },
              {
                img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000&q=80",
                tag: "Nightlife",
                title: "Ibiza Uncovered — The Full Season Guide",
                sub: "Clubs · Beach parties · Private yachts · VIP tables",
              },
            ].map((card) => (
              <div key={card.title} className="group relative h-[480px] overflow-hidden cursor-pointer rounded-lg">
                <img src={card.img} alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white/40 text-[9px] tracking-[0.2em] uppercase mb-2">{card.tag}</p>
                  <h3 className="font-serif text-white text-2xl font-light leading-snug mb-2">{card.title}</h3>
                  <p className="text-white/45 text-sm font-light">{card.sub}</p>
                </div>
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/60 opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── PHILOSOPHY (pure black, huge type) ── */}
      <Reveal>
        <section style={{ background: "#050505" }} className="py-32 px-6">
          <p className="text-white/15 text-[9px] tracking-[0.5em] uppercase text-center mb-14">The Madriche Philosophy</p>
          <blockquote className="font-serif font-light text-white/75 max-w-5xl mx-auto text-center leading-[1.1]"
            style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}>
            &ldquo;Not every destination<br />is for everyone.
            <br />
            <em className="text-white/40">Ours never are.</em>&rdquo;
          </blockquote>
          <div className="w-6 border-t border-white/10 mx-auto mt-14" />
        </section>
      </Reveal>

      {/* ── DESTINATIONS (dark) ── */}
      <section style={{ background: "#0A0A0A" }} className="py-24 px-6">
        <Reveal>
          <div className="max-w-7xl mx-auto mb-12">
            <p className="text-white/20 text-[9px] tracking-[0.25em] uppercase mb-4">Top Destinations</p>
            <h2 className="font-serif font-light text-white/90 leading-tight"
              style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
              Where will you go <em>next?</em>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-1 max-w-7xl mx-auto">
            {DESTINATIONS.map((dest) => (
              <div key={dest.name} className="group relative overflow-hidden cursor-pointer" style={{ height: "240px" }}>
                <img src={dest.image} alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-serif text-white/90 font-light text-xl">{dest.name}</p>
                  <p className="text-white/35 text-[10px] tracking-wide">{dest.count} experiences</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── BUDGET TIERS (cream again — second contrast moment) ── */}
      <section style={{ background: "#F2EDE4" }} className="py-24 px-6">
        <Reveal>
          <div className="max-w-7xl mx-auto mb-14">
            <p className="text-black/25 text-[9px] tracking-[0.25em] uppercase mb-4">For Every Traveller</p>
            <h2 className="font-serif font-light text-black/80 leading-tight"
              style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
              Your budget, <em>maximised</em>
            </h2>
          </div>
        </Reveal>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              tier: "Explorer", range: "$500 – $3K",
              desc: "Group trips, city breaks, adventure sports, nightlife, hidden gems. Maximum fun, smart spend.",
              tags: ["Clubs & bars", "Adventure sports", "Food tours"],
              cls: "bg-white border border-black/8", text: "text-black/75", sub: "text-black/35", tag: "bg-black/5 text-black/40",
            },
            {
              tier: "Connoisseur", range: "$3K – $20K",
              desc: "Michelin dining, VIP event access, yacht days, private guides. The sweet spot of luxury.",
              tags: ["Fine dining", "VIP sports", "Yacht days"],
              cls: "bg-[#1A1A1A]", text: "text-white/85", sub: "text-white/40", tag: "bg-white/8 text-white/50",
            },
            {
              tier: "Ultra", range: "$20K+",
              desc: "Private jets, superyachts, Gstaad chalets, Aman resorts, invite-only events you can't Google.",
              tags: ["Private aviation", "Superyachts", "Bespoke"],
              cls: "bg-[#0A0A0A]", text: "text-white/90", sub: "text-white/40", tag: "bg-white/6 text-white/50",
            },
          ].map((bc, i) => (
            <Reveal key={bc.tier} delay={i * 0.1}>
              <div className={`rounded-xl p-9 h-full transition-all duration-300 hover:-translate-y-1 ${bc.cls}`}>
                <p className={`text-[9px] tracking-[0.2em] uppercase mb-3 ${bc.sub}`}>{bc.tier}</p>
                <p className={`font-serif text-[42px] font-light mb-4 leading-none ${bc.text}`}>{bc.range}</p>
                <p className={`text-sm leading-relaxed mb-7 ${bc.sub}`}>{bc.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {bc.tags.map((t) => <span key={t} className={`text-xs px-3 py-1 rounded-full ${bc.tag}`}>{t}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FOOTER (pure black) ── */}
      <footer style={{ background: "#050505" }} className="border-t border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div>
            <p className="font-serif text-white/50 text-lg tracking-[0.15em] mb-4">MADRICHE</p>
            <p className="text-white/20 text-xs leading-relaxed max-w-48">
              Private access to experiences the world doesn&apos;t advertise.
            </p>
          </div>
          {[
            { title: "Explore", links: ["Destinations", "Experiences", "Collections", "Editorial"] },
            { title: "Categories", links: ["Nightlife", "Gastronomy", "Adventure", "Wellness"] },
            { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white/18 text-[9px] tracking-[0.18em] uppercase mb-5">{col.title}</p>
              {col.links.map((l) => (
                <a key={l} href="#" className="block text-white/25 text-xs mb-2.5 hover:text-white/55 transition-colors duration-300">{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-6 flex justify-between text-white/15 text-xs">
          <span>© 2026 Madriche. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>
    </div>
  );
}
