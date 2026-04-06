export async function detectCountry(): Promise<string | null> {
  try {
    const res = await fetch('https://ipapi.co/json/')
    const data = await res.json()
    return data.country_code // "IN", "US", "GB" etc.
  } catch {
    return null
  }
}

// Returns city slugs in priority order based on country
export function getGeoRanking(countryCode: string): string[] {
  const rankings: Record<string, string[]> = {
    'IN': ['dubai', 'maldives', 'santorini', 'mykonos', 'monte-carlo', 'kyoto', 'marrakech', 'amalfi-coast', 'st-barts'],
    'US': ['st-barts', 'santorini', 'mykonos', 'amalfi-coast', 'monte-carlo', 'dubai', 'kyoto', 'marrakech', 'maldives'],
    'GB': ['monte-carlo', 'santorini', 'mykonos', 'marrakech', 'amalfi-coast', 'dubai', 'maldives', 'st-barts', 'kyoto'],
    'AU': ['maldives', 'kyoto', 'santorini', 'dubai', 'mykonos', 'amalfi-coast', 'monte-carlo', 'marrakech', 'st-barts'],
    'AE': ['santorini', 'mykonos', 'maldives', 'amalfi-coast', 'monte-carlo', 'marrakech', 'kyoto', 'st-barts', 'dubai'],
    'FR': ['monte-carlo', 'santorini', 'mykonos', 'marrakech', 'amalfi-coast', 'maldives', 'dubai', 'kyoto', 'st-barts'],
    'DE': ['monte-carlo', 'santorini', 'mykonos', 'amalfi-coast', 'marrakech', 'dubai', 'maldives', 'kyoto', 'st-barts'],
  }

  // Default global ranking for unlisted countries
  return rankings[countryCode] ?? [
    'santorini', 'monte-carlo', 'mykonos', 'amalfi-coast',
    'dubai', 'maldives', 'kyoto', 'marrakech', 'st-barts'
  ]
}
