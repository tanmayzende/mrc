import Nav from "./_components/Nav";
import Collection from "./_components/Collection";
import HomeSearch from "./_components/HomeSearch";
import PreferenceGate from "./_components/PreferenceGate";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=95";

export default function Home() {
  return (
    <>
      <PreferenceGate />
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-charcoal/40" aria-hidden />

        <Nav />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          {/* Headline */}
          <h1 className="font-serif font-light tracking-[0.08em] leading-tight">
            <span className="block text-6xl lg:text-8xl text-stone/90">
              The World&apos;s Most
            </span>
            <span className="block text-6xl lg:text-8xl text-gold/70">
              Extraordinary Places
            </span>
          </h1>

          {/* Thin rule */}
          <hr className="w-16 border-t border-gold/40 my-8" />

          {/* Subtext */}
          <p className="text-stone/50 text-xs tracking-[0.3em] uppercase">
            Private access to experiences the world doesn&apos;t advertise.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-10">
            <a
              href="#"
              className="border border-gold/60 text-gold text-xs tracking-[0.25em] uppercase px-8 py-3 transition-all duration-500 hover:bg-gold hover:text-charcoal"
            >
              Explore Destinations
            </a>
            <a
              href="#"
              className="text-stone/40 text-xs tracking-[0.25em] uppercase px-8 py-3 transition-all duration-500 hover:text-stone"
            >
              Create Account
            </a>
          </div>

          <HomeSearch />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="h-12 border-l border-stone/20 animate-pulse" />
        </div>
      </section>

      {/* ── The Collection ───────────────────────────────────────── */}
      <Collection />

      {/* ── Philosophy Strip ─────────────────────────────────────── */}
      <section className="bg-charcoal py-32 px-6">
        <p className="text-stone/30 text-[10px] tracking-[0.5em] uppercase text-center mb-16">
          THE AURVEIL PHILOSOPHY
        </p>
        <blockquote className="font-serif text-4xl lg:text-6xl font-light text-stone/80 tracking-[0.04em] max-w-4xl mx-auto text-center leading-relaxed">
          &ldquo;Not every destination is for everyone.
          <br />
          Ours never are.&rdquo;
        </blockquote>
        <hr className="w-8 border-t border-gold/40 mx-auto mt-10" />
        <p className="text-stone/35 text-xs tracking-[0.2em] uppercase text-center max-w-lg mx-auto mt-8">
          Aurveil curates the world&apos;s most extraordinary experiences for
          those who understand that true luxury is access, not price.
        </p>
      </section>
    </>
  );
}
