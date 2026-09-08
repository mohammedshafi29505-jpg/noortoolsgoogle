/**
 * Qibla Calculation & Spherical Geometry Service
 * Calculates accurate great circle bearing and distance to the Kaaba in Makkah.
 */

// Coordinates of the Holy Kaaba in Makkah Al-Mukarramah
export const KAABA_COORDINATES = {
  latitude: 21.422487,
  longitude: 39.826206,
};

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Calculates the forward bearing (in degrees, 0-360) from user coordinates to the Kaaba.
 */
export function calculateQiblaBearing(userLat: number, userLng: number): number {
  const phi1 = toRadians(userLat);
  const phi2 = toRadians(KAABA_COORDINATES.latitude);
  const deltaLambda = toRadians(KAABA_COORDINATES.longitude - userLng);

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

  const qiblaRad = Math.atan2(y, x);
  let qiblaDegrees = toDegrees(qiblaRad);

  // Normalize to 0° - 360°
  qiblaDegrees = (qiblaDegrees + 360) % 360;

  return Math.round(qiblaDegrees * 10) / 10;
}

/**
 * Calculates Great Circle distance in kilometers using the Haversine formula.
 */
export function calculateDistanceToKaaba(userLat: number, userLng: number): number {
  const earthRadiusKm = 6371;
  const dLat = toRadians(KAABA_COORDINATES.latitude - userLat);
  const dLng = toRadians(KAABA_COORDINATES.longitude - userLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(userLat)) *
      Math.cos(toRadians(KAABA_COORDINATES.latitude)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c;

  return Math.round(distance);
}
