"use client";

const CARDS = [
  { image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80", label: "Gastronomy", location: "Paris", name: "Chef's Table — 3-Star Michelin", price: "$380" },
  { image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80", label: "Yacht & Sea", location: "Ibiza", name: "Private Sunset Yacht", price: "$280" },
  { image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80", label: "Exclusive", location: "Gstaad", name: "Alpine Chalet & Butler", price: "$12,000" },
  { image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80", label: "Nightlife", location: "Barcelona", name: "VIP Club Access & Table", price: "$200" },
  { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", label: "Adventure", location: "Dubai", name: "Skydive Over the Palm", price: "$599" },
  { image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80", label: "Private Travel", location: "Dubai", name: "Private Jet Charter", price: "$8,000" },
  { image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=500&q=80", label: "Wellness", location: "Mykonos", name: "Cliff Spa Retreat", price: "$450" },
  { image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&q=80", label: "Culture", location: "Paris", name: "Private Museum After Hours", price: "$1,200" },
];

const ROW1 = [...CARDS, ...CARDS, ...CARDS];
const ROW2 = [...CARDS].reverse().concat([...CARDS].reverse()).concat([...CARDS].reverse());

function ExperienceCard({ card }: { card: typeof CARDS[0] }) {
  return (
    <div style={{
      flexShrink: 0,
      width: "280px",
      background: "#161616",
      border: "0.5px solid rgba(255,255,255,0.07)",
      borderRadius: "12px",
      overflow: "hidden",
    }}>
      <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
        <img src={card.image} alt={card.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
        <span style={{
          position: "absolute", top: "12px", left: "12px",
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
          border: "0.5px solid rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.7)", fontSize: "9px",
          letterSpacing: "0.12em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: "100px",
        }}>{card.label}</span>
      </div>
      <div style={{ padding: "16px" }}>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{card.location}</p>
        <p style={{ fontFamily: "var(--font-cormorant)", color: "rgba(255,255,255,0.75)", fontSize: "16px", fontWeight: 300, lineHeight: 1.3, marginBottom: "10px" }}>{card.name}</p>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>From <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{card.price}</span></p>
      </div>
    </div>
  );
}

export default function DriftingCards() {
  return (
    <div style={{ background: "#050505", padding: "80px 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 32px" }}>
        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "16px" }}>What awaits you</p>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, color: "rgba(255,255,255,0.8)", fontSize: "clamp(36px,4vw,56px)", lineHeight: 1.1, margin: "0 auto", maxWidth: "600px" }}>
          Every experience, <em>curated</em>
        </h2>
      </div>

      {/* Row 1 — left */}
      <div style={{ overflow: "hidden", marginBottom: "16px", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}>
        <div className="drift-left" style={{ display: "flex", gap: "16px", width: "max-content" }}>
          {ROW1.map((card, i) => <ExperienceCard key={i} card={card} />)}
        </div>
      </div>

      {/* Row 2 — right */}
      <div style={{ overflow: "hidden", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}>
        <div className="drift-right" style={{ display: "flex", gap: "16px", width: "max-content" }}>
          {ROW2.map((card, i) => <ExperienceCard key={i} card={card} />)}
        </div>
      </div>
    </div>
  );
}
