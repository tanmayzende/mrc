import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : null

    // Try ip-api.com first (no key needed, generous free tier)
    const url = ip && ip !== '127.0.0.1' && ip !== '::1'
      ? `http://ip-api.com/json/${ip}?fields=countryCode,country,lat,lon`
      : `http://ip-api.com/json/?fields=countryCode,country,lat,lon`

    const res = await fetch(url, { next: { revalidate: 3600 } })
    const data = await res.json()

    if (data.status === 'fail' || !data.countryCode) {
      return NextResponse.json({
        country_code: 'US',
        country_name: 'United States',
        latitude: 37.0902,
        longitude: -95.7129,
      })
    }

    return NextResponse.json({
      country_code: data.countryCode,
      country_name: data.country,
      latitude: data.lat,
      longitude: data.lon,
    })
  } catch (error) {
    console.error('Geo detection failed:', error)
    return NextResponse.json({
      country_code: 'US',
      country_name: 'United States',
      latitude: 37.0902,
      longitude: -95.7129,
    })
  }
}
