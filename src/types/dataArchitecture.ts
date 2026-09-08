/**
 * NoorTools Verified Data Architecture
 * 
 * Strict separation of:
 * 1. Verified Religious Content (Quran, Hadith, Duas, Azkar, 99 Names, Historical Narratives)
 * 2. Calculated Information (Astronomical prayer times, Qibla bearing, Zakat calculations)
 * 3. Location Data (Coordinates, timezone, city, detection method)
 * 4. User-Created / Local Data (Bookmarks, prayer trackers, tasbih counts, notes)
 * 5. Integration-Ready / Data Placeholder (Explicit unverified indicators)
 */

export type VerificationStatus =
  | 'verified_mushaf_canonical'    // Direct text from recognized Mushaf (e.g. King Fahd Complex / Tanzil)
  | 'verified_hadith_canonical'    // Canonical Hadith collections (Bukhari, Muslim, etc.)
  | 'verified_scholarly_tradition' // Classical consensus works (Ibn Kathir, Mubarakpuri, classical fiqh)
  | 'calculated_astronomical'      // Algorithmic calculations based on solar coordinates
  | 'integration_ready';           // Legitimate placeholder awaiting verified live connection

export interface VerifiedReligiousRecord<T> {
  id: string;
  content: T;
  source: string;              // Primary source document (e.g. "Sahih al-Bukhari 1", "Surah Al-Baqarah 2:255")
  referenceNumber?: string;    // Hadith #, Ayah #, or Page #
  attribution: string;         // Scholar, narrator, or editorial board
  verificationStatus: VerificationStatus;
  contentVersion: string;      // Version stamp for revision audits
  scholarlyNotes?: string;     // Notes explaining scholarly consensus or nuances
}

export interface CalculatedDataRecord<T> {
  calculatedAt: string;        // ISO timestamp
  formula: string;             // Method name (e.g. "Astronomical Great Circle", "Muslim World League 18°")
  inputs: Record<string, unknown>;
  output: T;
  disclaimer: string;
}

export interface LocationRecord {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  timezone: string;
  isGpsDetected: boolean;
  accuracyMeters?: number;
  lastUpdated: string;
}

export const VERIFIED_DATA_DISCLAIMERS = {
  unverifiedPlaceholder: 'Authentic verified data will be connected here.',
  fatwaNotice: 'NoorTools provides educational resources and astronomical utilities. It does not issue personal legal fatwas. Consult qualified local scholars for individual rulings.',
  prayerTimesNotice: 'Prayer times are calculated using established astronomical solar altitude algorithms. Always allow a 2-3 minute margin for local mosque adherence.',
  qiblaNotice: 'Qibla bearing is calculated via spherical trigonometry from your coordinates to the Kaaba (21.4225° N, 39.8262° E). Physical compass accuracy depends on your device hardware sensors.',
  zakatNotice: 'Zakat calculations use standard mathematical ratios (2.5% on wealth exceeding Nisab held for one lunar year). Please consult a certified Islamic charity or scholar for complex asset portfolios.',
  audioNarrationNotice: 'Audio narration is an educational spoken presentation of verified written historical texts. It is NOT the historical voice of any Prophet, Companion, or historical figure.',
};
