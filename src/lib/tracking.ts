import { supabase } from './supabase'

export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server'
  let sessionId = sessionStorage.getItem('aurveil_session')
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36)
    sessionStorage.setItem('aurveil_session', sessionId)
  }
  return sessionId
}

export async function trackEvent(params: {
  event_type: string
  city_slug?: string
  category?: string
  search_query?: string
  duration_seconds?: number
  metadata?: Record<string, unknown>
}) {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    const sessionId = getSessionId()

    await supabase.from('user_behavior').insert({
      user_id: user?.id || null,
      session_id: sessionId,
      ...params
    })
  } catch {
    // Fail silently — tracking should never break the app
  }
}

const categoryToVibe: Record<string, string> = {
  'Nightlife': 'nightlife',
  'Sports': 'sports',
  'Maritime Escapes': 'maritime',
  'Wellness Retreats': 'wellness',
  'Adventure': 'adventure',
  'Culture & Arts': 'culture',
  'Gastronomy & Dining': 'culture',
  'Concierge': 'nightlife',
  'Stays': 'wellness',
}

export async function getUserInterests(userId: string): Promise<{
  topCategories: string[]
  topVibes: string[]
}> {
  try {
    const { data } = await supabase
      .from('user_behavior')
      .select('category, city_slug, event_type')
      .eq('user_id', userId)
      .in('event_type', ['category_click', 'experience_click', 'save'])
      .order('created_at', { ascending: false })
      .limit(50)

    if (!data?.length) return { topCategories: [], topVibes: [] }

    const categoryCounts: Record<string, number> = {}
    data.forEach(row => {
      if (row.category) {
        categoryCounts[row.category] = (categoryCounts[row.category] || 0) + 1
      }
    })

    const topCategories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat]) => cat)

    const topVibes = [...new Set(topCategories.map(cat => categoryToVibe[cat]).filter(Boolean))]

    return { topCategories, topVibes }
  } catch {
    return { topCategories: [], topVibes: [] }
  }
}
