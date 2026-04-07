export interface GeoData {
  country_code: string
  country_name: string
  latitude: number
  longitude: number
}

// City metadata for ContextLens scoring
const CITY_METADATA: Record<string, {
  lat: number
  lng: number
  climate: string[]
  categories: string[]
  vibe: string[]
  exotic: number
}> = {
  'santorini': {
    lat: 36.3932, lng: 25.4615,
    climate: ['may', 'jun', 'jul', 'aug', 'sep'],
    categories: ['Gastronomy & Dining', 'Maritime Escapes', 'Wellness Retreats'],
    vibe: ['wellness', 'culture', 'maritime'],
    exotic: 0.5
  },
  'mykonos': {
    lat: 37.4467, lng: 25.3289,
    climate: ['jun', 'jul', 'aug', 'sep'],
    categories: ['Nightlife', 'Maritime Escapes', 'Stays'],
    vibe: ['nightlife', 'maritime'],
    exotic: 0.5
  },
  'monte-carlo': {
    lat: 43.7384, lng: 7.4246,
    climate: ['apr', 'may', 'jun', 'sep', 'oct'],
    categories: ['Sports', 'Nightlife', 'Gastronomy & Dining'],
    vibe: ['sports', 'nightlife', 'culture'],
    exotic: 0.6
  },
  'amalfi-coast': {
    lat: 40.6340, lng: 14.6027,
    climate: ['may', 'jun', 'jul', 'aug', 'sep'],
    categories: ['Maritime Escapes', 'Gastronomy & Dining', 'Culture & Arts'],
    vibe: ['culture', 'maritime', 'wellness'],
    exotic: 0.5
  },
  'kyoto': {
    lat: 35.0116, lng: 135.7681,
    climate: ['mar', 'apr', 'may', 'oct', 'nov'],
    categories: ['Culture & Arts', 'Wellness Retreats', 'Gastronomy & Dining'],
    vibe: ['culture', 'wellness'],
    exotic: 0.8
  },
  'dubai': {
    lat: 25.2048, lng: 55.2708,
    climate: ['oct', 'nov', 'dec', 'jan', 'feb', 'mar'],
    categories: ['Concierge', 'Stays', 'Gastronomy & Dining'],
    vibe: ['nightlife', 'culture', 'sports'],
    exotic: 0.4
  },
  'maldives': {
    lat: 3.2028, lng: 73.2207,
    climate: ['dec', 'jan', 'feb', 'mar', 'apr'],
    categories: ['Maritime Escapes', 'Stays', 'Wellness Retreats'],
    vibe: ['wellness', 'maritime', 'adventure'],
    exotic: 0.7
  },
  'marrakech': {
    lat: 31.6295, lng: -7.9811,
    climate: ['mar', 'apr', 'may', 'sep', 'oct', 'nov'],
    categories: ['Culture & Arts', 'Wellness Retreats', 'Adventure'],
    vibe: ['culture', 'adventure', 'wellness'],
    exotic: 0.6
  },
  'st-barts': {
    lat: 17.9000, lng: -62.8333,
    climate: ['dec', 'jan', 'feb', 'mar', 'apr'],
    categories: ['Maritime Escapes', 'Nightlife', 'Stays'],
    vibe: ['nightlife', 'maritime', 'wellness'],
    exotic: 0.8
  },
}

// Haversine distance formula
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function getSeasonSignals(): { month: string; hour: number; isWeekend: boolean } {
  const now = new Date()
  const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
  return {
    month: months[now.getMonth()],
    hour: now.getHours(),
    isWeekend: now.getDay() === 0 || now.getDay() === 6
  }
}

export async function detectLocation(): Promise<GeoData | null> {
  try {
    const baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/geo`)
    if (!res.ok) return null
    const data = await res.json()
    return data
  } catch {
    return null
  }
}

export function contextLensRank(
  citySlugs: string[],
  userLat: number,
  userLng: number,
  preferences?: {
    travel_style?: string[]
    travel_frequency?: string
  },
  behavior?: {
    topCategories?: string[]
    topVibes?: string[]
    recentSearches?: string[]
  }
): string[] {
  const MAX_DISTANCE = 20000
  const season = getSeasonSignals()

  const scored = citySlugs.map(slug => {
    const meta = CITY_METADATA[slug]
    if (!meta) return { slug, score: 0.3 }

    // 1. PROXIMITY SCORE (20%)
    const distance = getDistance(userLat, userLng, meta.lat, meta.lng)
    const proximityScore = 1 - (distance / MAX_DISTANCE)

    // 2. TRAVEL STYLE MATCH (25%)
    let styleScore = 0.3
    if (preferences?.travel_style?.length) {
      const matches = meta.vibe.filter(v => preferences.travel_style!.includes(v))
      styleScore = matches.length / Math.max(meta.vibe.length, preferences.travel_style.length)
    }

    // 3. BEHAVIORAL INTEREST (25%)
    let behaviorScore = 0.3
    if (behavior?.topVibes?.length) {
      const matches = meta.vibe.filter(v => behavior.topVibes!.includes(v))
      behaviorScore = matches.length > 0 ? 0.5 + (matches.length * 0.25) : 0.2
    }

    // 4. SEASON RELEVANCE (15%)
    const inSeason = meta.climate.includes(season.month)
    const seasonScore = inSeason ? 1.0 : 0.4

    // 5. TIME OF DAY (5%)
    const isEvening = season.hour >= 18 || season.hour <= 2
    const isNightlifeCity = meta.vibe.includes('nightlife')
    const timeScore = isEvening && isNightlifeCity ? 1.0 : 0.5

    // 6. TRAVEL FREQUENCY (10%)
    let frequencyScore = 0.5
    if (preferences?.travel_frequency === 'constantly') {
      frequencyScore = meta.exotic
    } else if (preferences?.travel_frequency === 'occasionally') {
      frequencyScore = 1 - meta.exotic * 0.5
    }

    const finalScore =
      (proximityScore * 0.20) +
      (styleScore * 0.25) +
      (behaviorScore * 0.25) +
      (seasonScore * 0.15) +
      (timeScore * 0.05) +
      (frequencyScore * 0.10)

    return { slug, score: finalScore }
  })

  scored.sort((a, b) => b.score - a.score)
  return scored.map(s => s.slug)
}
