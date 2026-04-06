export interface GeoData {
  country_code: string
  country_name: string
  latitude: number
  longitude: number
}

// City coordinates
const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'santorini': { lat: 36.3932, lng: 25.4615 },
  'mykonos': { lat: 37.4467, lng: 25.3289 },
  'monte-carlo': { lat: 43.7384, lng: 7.4246 },
  'amalfi-coast': { lat: 40.6340, lng: 14.6027 },
  'kyoto': { lat: 35.0116, lng: 135.7681 },
  'dubai': { lat: 25.2048, lng: 55.2708 },
  'maldives': { lat: 3.2028, lng: 73.2207 },
  'marrakech': { lat: 31.6295, lng: -7.9811 },
  'st-barts': { lat: 17.9000, lng: -62.8333 },
}

// Haversine distance formula
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export async function detectLocation(): Promise<GeoData | null> {
  try {
    const res = await fetch('/api/geo')
    if (!res.ok) return null
    const data = await res.json()
    return data
  } catch {
    return null
  }
}

export function rankCitiesByLocation(
  citySlugs: string[],
  userLat: number,
  userLng: number
): string[] {
  const MAX_DISTANCE = 20000

  const ranked = citySlugs.map(slug => {
    const coords = CITY_COORDINATES[slug]
    if (!coords) return { slug, score: 0.5, distance: undefined }

    const distance = getDistance(userLat, userLng, coords.lat, coords.lng)
    const proximityScore = 1 - (distance / MAX_DISTANCE)
    const aspirationalScore = 0.5
    const finalScore = (proximityScore * 0.4) + (aspirationalScore * 0.6)

    return { slug, score: finalScore, distance: Math.round(distance) }
  })

  ranked.sort((a, b) => b.score - a.score)

  console.log('GeoLens ranking:', ranked.map(r => `${r.slug} (${r.distance ?? '?'}km)`))

  return ranked.map(r => r.slug)
}
