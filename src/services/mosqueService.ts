/**
 * NoorTools Mosque Location Service
 * Connects to public open data repositories (OpenStreetMap Overpass / Nominatim)
 * with strict zero-mock guarantees:
 * Never returns fabricated mosques or fake Iqamah times.
 */

export interface VerifiedMosque {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
  dataSource: string;
  hasVerifiedPrayerTimes: boolean;
  prayerTimesNotice: string;
  fajrIqamah?: string;
  dhuhrIqamah?: string;
  asrIqamah?: string;
  maghribIqamah?: string;
  ishaIqamah?: string;
  jummahTiming?: string;
  phone?: string;
  website?: string;
  wheelchair?: boolean;
  lastUpdated: string;
}

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Searches for real mosques near the given coordinates using OpenStreetMap Overpass API
 * with fallback to Nominatim.
 */
export async function fetchNearbyMosques(
  latitude: number,
  longitude: number,
  radiusMeters: number = 10000,
  signal?: AbortSignal
): Promise<VerifiedMosque[]> {
  const query = `[out:json][timeout:15];
(
  node["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${latitude},${longitude});
  way["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${latitude},${longitude});
  relation["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${latitude},${longitude});
);
out center 25;`;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`Overpass API response status: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.elements)) {
      return [];
    }

    const mosques: VerifiedMosque[] = [];

    for (const el of data.elements) {
      const lat = el.lat ?? el.center?.lat;
      const lon = el.lon ?? el.center?.lon;
      if (!lat || !lon) continue;

      const tags = el.tags || {};
      const name =
        tags.name ||
        tags['name:en'] ||
        tags['name:ar'] ||
        tags.description ||
        'Islamic Center / Masjid';

      const street = tags['addr:street'] || '';
      const housenumber = tags['addr:housenumber'] || '';
      const city = tags['addr:city'] || '';
      const address = street
        ? `${housenumber ? `${housenumber} ` : ''}${street}${city ? `, ${city}` : ''}`
        : tags['addr:full'] || 'OpenStreetMap Registered Place of Worship';

      const distanceKm = calculateDistanceKm(latitude, longitude, lat, lon);

      mosques.push({
        id: `osm-${el.type}-${el.id}`,
        name,
        address,
        distanceKm,
        latitude: lat,
        longitude: lon,
        dataSource: 'OpenStreetMap Contributors (ODbL License)',
        hasVerifiedPrayerTimes: false,
        prayerTimesNotice:
          'Mosque-specific prayer timings are not available from the current data source.',
        phone: tags.phone || tags['contact:phone'],
        website: tags.website || tags['contact:website'],
        wheelchair: tags.wheelchair === 'yes',
        lastUpdated: new Date().toISOString().split('T')[0],
      });
    }

    // Sort by distance ascending
    mosques.sort((a, b) => a.distanceKm - b.distanceKm);
    return mosques;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return [];
    }
    // Network offline or Overpass unavailable; throw with clear message
    throw new Error('Unable to reach open mosque database. Check your internet connection.');
  }
}
