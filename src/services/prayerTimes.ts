/**
 * Astronomical Islamic Prayer Times Calculation Engine
 * Implements standard solar algorithms used by Muslim World League, ISNA,
 * Umm al-Qura, Egyptian General Authority of Survey, Karachi, Tehran, and Gulf.
 * 
 * Supports:
 * - High latitude adjustments (Middle of the Night, 1/7th of Night, Angle-based)
 * - Shafi'i / Standard vs Hanafi Asr calculation
 * - Deterministic pure functions with externalized time references
 */

import { CalculationMethod, AsrMadhhab, HighLatitudeRule, PrayerTimesData } from '../types';
import { evaluatePrayerStatus, PrayerStatusEvaluation } from './dateTime';

export interface CalculationParams {
  latitude: number;
  longitude: number;
  date: Date;
  method: CalculationMethod;
  madhhab: AsrMadhhab;
  highLatitudeRule?: HighLatitudeRule;
  referenceTime?: Date; // Optional reference time for status evaluation
}

// Angles configuration for calculation methods
export const METHOD_CONFIGS: Record<
  CalculationMethod,
  { name: string; fajrAngle: number; ishaAngle: number; ishaMinutes?: number }
> = {
  MWL: { name: 'Muslim World League (Fajr 18°, Isha 17°)', fajrAngle: 18.0, ishaAngle: 17.0 },
  ISNA: { name: 'ISNA - North America (Fajr 15°, Isha 15°)', fajrAngle: 15.0, ishaAngle: 15.0 },
  Egypt: { name: 'Egyptian General Authority (Fajr 19.5°, Isha 17.5°)', fajrAngle: 19.5, ishaAngle: 17.5 },
  Makkah: { name: 'Umm al-Qura, Makkah (Fajr 18.5°, Isha +90 min)', fajrAngle: 18.5, ishaAngle: 0, ishaMinutes: 90 },
  Karachi: { name: 'Univ. of Islamic Sciences Karachi (Fajr 18°, Isha 18°)', fajrAngle: 18.0, ishaAngle: 18.0 },
  Tehran: { name: 'Institute of Geophysics, Tehran (Fajr 17.7°, Isha 14°)', fajrAngle: 17.7, ishaAngle: 14.0 },
  Gulf: { name: 'Gulf Region (Fajr 19.5°, Isha +90 min)', fajrAngle: 19.5, ishaAngle: 0, ishaMinutes: 90 },
};

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180.0;
}

function toDegrees(rad: number): number {
  return (rad * 180.0) / Math.PI;
}

// Astronomical Julian Day
function getJulianDate(date: Date): number {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();
  let y = year;
  let m = month;
  if (month <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
}

// Solar Sun coordinates
function getSunCoordinates(jd: number) {
  const d = jd - 2451545.0;
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  const l = (q + 1.915 * Math.sin(toRadians(g)) + 0.020 * Math.sin(toRadians(2 * g))) % 360;
  const e = 23.439 - 0.00000036 * d;

  const sinL = Math.sin(toRadians(l));
  const cosL = Math.cos(toRadians(l));
  const cosE = Math.cos(toRadians(e));

  const ra = (toDegrees(Math.atan2(cosE * sinL, cosL)) / 15 + 24) % 24;
  const declination = toDegrees(Math.asin(Math.sin(toRadians(e)) * sinL));
  let equationOfTime = (q / 15 - ra + 24) % 24;
  if (equationOfTime > 12) equationOfTime -= 24;

  return { declination, equationOfTime };
}

// Sun hour angle calculation for given solar altitude
function getHourAngle(
  altitudeAngle: number,
  latitude: number,
  declination: number
): number | null {
  const latRad = toRadians(latitude);
  const decRad = toRadians(declination);
  const sinAlt = Math.sin(toRadians(altitudeAngle));
  const cosH =
    (sinAlt - Math.sin(latRad) * Math.sin(decRad)) /
    (Math.cos(latRad) * Math.cos(decRad));

  if (cosH > 1 || cosH < -1) {
    return null; // Sun never reaches this altitude (polar day/night)
  }

  return toDegrees(Math.acos(cosH)) / 15.0;
}

export function formatHoursTo12h(hours: number): string {
  let normalized = hours % 24;
  if (normalized < 0) normalized += 24;
  const h = Math.floor(normalized);
  const m = Math.floor((normalized - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const displayM = m.toString().padStart(2, '0');
  return `${displayH}:${displayM} ${period}`;
}

export interface RawPrayerHours {
  fajr: number;
  sunrise: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
}

/**
 * Calculates decimal prayer hours for a given day and coordinates
 */
export function calculateRawPrayerHours(
  latitude: number,
  longitude: number,
  date: Date,
  method: CalculationMethod,
  madhhab: AsrMadhhab,
  highLatitudeRule: HighLatitudeRule = 'none'
): RawPrayerHours {
  const config = METHOD_CONFIGS[method] || METHOD_CONFIGS.MWL;
  const jd = getJulianDate(date);
  const { declination, equationOfTime } = getSunCoordinates(jd);

  // Timezone offset in hours for this specific date
  const timezoneOffsetHours = -date.getTimezoneOffset() / 60;

  // Solar noon transit (local standard time)
  const noon = 12 + timezoneOffsetHours - longitude / 15 - equationOfTime;

  // Solar noon buffer +2 minutes for Dhuhr
  const dhuhr = noon + 2 / 60;

  // Sunrise and Sunset: center of solar disk at -0.833° (34' refraction + 16' semidiameter)
  const hSun = getHourAngle(-0.833, latitude, declination) ?? 6.0;
  const sunrise = noon - hSun;
  const sunset = noon + hSun;
  const maghrib = sunset + 2 / 60;

  // Asr altitude calculation
  const asrFactor = madhhab === 'hanafi' ? 2 : 1;
  const asrAltitude = toDegrees(
    Math.atan(1 / (asrFactor + Math.tan(toRadians(Math.abs(latitude - declination)))))
  );
  const hAsr = getHourAngle(asrAltitude, latitude, declination) ?? 3.0;
  const asr = noon + hAsr;

  // Night duration between sunset and next sunrise (approx 2 * (12 - hSun))
  const nightDuration = 24 - 2 * hSun;

  // Fajr calculation
  let hFajr = getHourAngle(-config.fajrAngle, latitude, declination);
  let fajr: number;

  if (hFajr !== null) {
    fajr = noon - hFajr;
  } else {
    // High latitude adjustment for Fajr
    if (highLatitudeRule === 'middleOfTheNight') {
      fajr = sunrise - nightDuration / 2;
    } else if (highLatitudeRule === 'oneSeventh') {
      fajr = sunrise - nightDuration / 7;
    } else {
      // Angle based
      fajr = sunrise - (config.fajrAngle / 60) * nightDuration;
    }
  }

  // Isha calculation
  let isha: number;
  if (config.ishaMinutes) {
    isha = maghrib + config.ishaMinutes / 60;
  } else {
    const hIsha = getHourAngle(-config.ishaAngle, latitude, declination);
    if (hIsha !== null) {
      isha = noon + hIsha;
    } else {
      // High latitude adjustment for Isha
      if (highLatitudeRule === 'middleOfTheNight') {
        isha = maghrib + nightDuration / 2;
      } else if (highLatitudeRule === 'oneSeventh') {
        isha = maghrib + nightDuration / 7;
      } else {
        // Angle based
        isha = maghrib + (config.ishaAngle / 60) * nightDuration;
      }
    }
  }

  return {
    fajr,
    sunrise,
    dhuhr,
    asr,
    maghrib,
    isha,
  };
}

/**
 * Calculates complete, validated prayer times for today and next prayer evaluation
 */
export function calculatePrayerTimes(params: CalculationParams): PrayerTimesData & {
  evaluation: PrayerStatusEvaluation;
} {
  const { latitude, longitude, date, method, madhhab, highLatitudeRule = 'none', referenceTime = new Date() } = params;

  // Calculate today's raw hours
  const todayRaw = calculateRawPrayerHours(
    latitude,
    longitude,
    date,
    method,
    madhhab,
    highLatitudeRule
  );

  // Calculate tomorrow's Fajr for midnight rollover and post-Isha next-prayer calculation
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowRaw = calculateRawPrayerHours(
    latitude,
    longitude,
    tomorrow,
    method,
    madhhab,
    highLatitudeRule
  );

  const fajrStr = formatHoursTo12h(todayRaw.fajr);
  const sunriseStr = formatHoursTo12h(todayRaw.sunrise);
  const dhuhrStr = formatHoursTo12h(todayRaw.dhuhr);
  const asrStr = formatHoursTo12h(todayRaw.asr);
  const maghribStr = formatHoursTo12h(todayRaw.maghrib);
  const ishaStr = formatHoursTo12h(todayRaw.isha);
  const tomorrowFajrStr = formatHoursTo12h(tomorrowRaw.fajr);

  const todayTimes = {
    fajr: fajrStr,
    sunrise: sunriseStr,
    dhuhr: dhuhrStr,
    asr: asrStr,
    maghrib: maghribStr,
    isha: ishaStr,
  };

  // Evaluate status deterministically using referenceTime (usually current live time)
  const evaluation = evaluatePrayerStatus(todayTimes, tomorrowFajrStr, referenceTime);

  // Clean formatted date string
  const dateStr = date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    fajr: fajrStr,
    sunrise: sunriseStr,
    dhuhr: dhuhrStr,
    asr: asrStr,
    maghrib: maghribStr,
    isha: ishaStr,
    dateStr,
    nextPrayer: {
      name: evaluation.nextPrayerName as any,
      time: evaluation.nextPrayerTime,
      timeRemainingFormatted: evaluation.timeRemainingFormatted,
      secondsRemaining: evaluation.secondsRemaining,
    },
    currentPrayer: evaluation.currentPrayer,
    evaluation,
  };
}
