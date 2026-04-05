-- Cities table
CREATE TABLE cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL,
  hero_image TEXT,
  tag TEXT,
  visibility TEXT DEFAULT 'global',
  geo_servers TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experiences table
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  city_slug TEXT REFERENCES cities(slug) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  price TEXT,
  image TEXT,
  referral_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_experiences_city_slug ON experiences(city_slug);
CREATE INDEX idx_experiences_category ON experiences(category);
CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_cities_visibility ON cities(visibility);

-- Seed Santorini city
INSERT INTO cities (slug, name, country, region, hero_image, tag, visibility) VALUES (
  'santorini',
  'Santorini',
  'Greece',
  'Europe',
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=95',
  NULL,
  'global'
);

-- Seed Santorini experiences
INSERT INTO experiences (city_slug, title, category, location, description, price, image, referral_url, featured, sort_order) VALUES
(
  'santorini',
  'Private Caldera Sunset Dinner',
  'Gastronomy & Dining',
  'Oia, Santorini',
  'An exclusive table at the cliff''s edge overlooking the caldera. Private chef, curated wine selection, and the world''s most photographed sunset as your backdrop.',
  'From €450 per person',
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=95',
  'https://www.viator.com',
  TRUE,
  1
),
(
  'santorini',
  'Luxury Catamaran Charter',
  'Maritime Escapes',
  'Santorini, Aegean Sea',
  'Full day private catamaran with crew. Swim in volcanic hot springs, explore hidden sea caves, and dine on fresh seafood anchored off the coast.',
  'From €1,200 per day',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=95',
  'https://www.viator.com',
  FALSE,
  2
),
(
  'santorini',
  'Private Wine Cave Tasting',
  'Gastronomy & Dining',
  'Pyrgos, Santorini',
  'Descend into a centuries-old volcanic wine cave for a private tasting of Assyrtiko with the island''s most acclaimed sommelier.',
  'From €180 per person',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=95',
  'https://www.viator.com',
  FALSE,
  3
),
(
  'santorini',
  'Helicopter Island Tour',
  'Concierge',
  'Santorini & Cyclades',
  'Private helicopter circuit over Santorini, Mykonos and the Cyclades. Land on a private beach for champagne before returning at sunset.',
  'From €2,800 per flight',
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=95',
  'https://www.viator.com',
  FALSE,
  4
),
(
  'santorini',
  'Clifftop Spa Retreat',
  'Wellness Retreats',
  'Imerovigli, Santorini',
  'A full day of thermal treatments, volcanic stone massage and hydrotherapy overlooking the Aegean. Includes private infinity pool access.',
  'From €380 per person',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=95',
  'https://www.viator.com',
  TRUE,
  5
),
(
  'santorini',
  'Ancient Akrotiri After Hours',
  'Culture & Arts',
  'Akrotiri, Santorini',
  'Private after-hours access to the Bronze Age ruins of Akrotiri with a leading archaeologist as your personal guide.',
  'From €220 per person',
  'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=95',
  'https://www.viator.com',
  FALSE,
  6
),
(
  'santorini',
  'Volcanic Black Sand Yacht Day',
  'Maritime Escapes',
  'Perissa & Kamari, Santorini',
  'Private yacht to the volcanic black sand beaches of Perissa. Snorkelling, paddleboarding and a gourmet lunch served on deck.',
  'From €950 per day',
  'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=95',
  'https://www.viator.com',
  FALSE,
  7
);
