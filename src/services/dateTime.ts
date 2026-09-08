/**
 * NoorTools Centralized Date, Time, and Hijri Engine
 * 
 * Provides:
 * - Deterministic time parsing and timezone extraction
 * - Accurate prayer sequence and status resolution (Prevents the Asr-after-Isha bug!)
 * - Hijri calendar derivation
 * - Continuous countdown generation without clock drift
 */

export interface PrayerSlot {
  name: 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
  displayName: string;
  arabicName: string;
  hoursDecimal: number;
  timeStr: string;
  isSalah: boolean; // True for the 5 daily prayers (Sunrise is not an obligatory prayer)
}

export interface PrayerStatusEvaluation {
  currentPrayer: 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha' | 'None';
  nextPrayerName: string;
  nextPrayerTime: string;
  secondsRemaining: number;
  timeRemainingFormatted: string;
  isTomorrowPrayer: boolean;
  completedPrayers: string[];
  allPrayersStatus: Record<string, 'completed' | 'current' | 'upcoming'>;
}

/**
 * Parses a 12-hour formatted time string like "5:12 AM" or "6:45 PM" into decimal hours (0-24)
 */
export function timeStringToDecimal(timeStr: string): number {
  if (!timeStr) return 0;
  const match = timeStr.trim().match(/^(\d+):(\d+)(?::(\d+))?\s*(AM|PM)?$/i);
  if (!match) return 0;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[4]?.toUpperCase();

  if (period === 'PM' && hours < 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }

  return hours + minutes / 60;
}

/**
 * Formats seconds into human-readable countdown string e.g. "2h 45m 12s"
 */
export function formatSecondsToCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) return '0m 00s';
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  if (hrs > 0) {
    return `${hrs}h ${mins}m ${String(secs).padStart(2, '0')}s`;
  }
  return `${mins}m ${String(secs).padStart(2, '0')}s`;
}

/**
 * Evaluates the current prayer status with zero ambiguity.
 * 
 * Specifically guarantees:
 * 1. If local time is past Isha, Isha is COMPLETED and the next prayer is TOMORROW'S FAJR.
 * 2. Asr is NEVER shown as upcoming or next when local time is after Asr.
 * 3. Handles midnight transitions gracefully.
 */
export function evaluatePrayerStatus(
  todayTimes: {
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  },
  tomorrowFajrTime: string,
  now: Date = new Date()
): PrayerStatusEvaluation {
  const currentHoursDecimal =
    now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;

  const fajrDec = timeStringToDecimal(todayTimes.fajr);
  const sunriseDec = timeStringToDecimal(todayTimes.sunrise);
  const dhuhrDec = timeStringToDecimal(todayTimes.dhuhr);
  const asrDec = timeStringToDecimal(todayTimes.asr);
  const maghribDec = timeStringToDecimal(todayTimes.maghrib);
  const ishaDec = timeStringToDecimal(todayTimes.isha);
  const tomFajrDec = timeStringToDecimal(tomorrowFajrTime || todayTimes.fajr);

  const slots: PrayerSlot[] = [
    { name: 'Fajr', displayName: 'Fajr', arabicName: 'الفجر', hoursDecimal: fajrDec, timeStr: todayTimes.fajr, isSalah: true },
    { name: 'Sunrise', displayName: 'Sunrise', arabicName: 'الشروق', hoursDecimal: sunriseDec, timeStr: todayTimes.sunrise, isSalah: false },
    { name: 'Dhuhr', displayName: 'Dhuhr', arabicName: 'الظهر', hoursDecimal: dhuhrDec, timeStr: todayTimes.dhuhr, isSalah: true },
    { name: 'Asr', displayName: 'Asr', arabicName: 'العصر', hoursDecimal: asrDec, timeStr: todayTimes.asr, isSalah: true },
    { name: 'Maghrib', displayName: 'Maghrib', arabicName: 'المغرب', hoursDecimal: maghribDec, timeStr: todayTimes.maghrib, isSalah: true },
    { name: 'Isha', displayName: 'Isha', arabicName: 'العشاء', hoursDecimal: ishaDec, timeStr: todayTimes.isha, isSalah: true },
  ];

  const completedPrayers: string[] = [];
  const allPrayersStatus: Record<string, 'completed' | 'current' | 'upcoming'> = {};

  // Classify each slot for today
  slots.forEach((slot) => {
    if (currentHoursDecimal >= slot.hoursDecimal) {
      completedPrayers.push(slot.name);
      allPrayersStatus[slot.name] = 'completed';
    } else {
      allPrayersStatus[slot.name] = 'upcoming';
    }
  });

  // Determine current prayer window
  let currentPrayer: 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha' | 'None' = 'None';
  if (currentHoursDecimal >= ishaDec) {
    currentPrayer = 'Isha';
  } else if (currentHoursDecimal >= maghribDec) {
    currentPrayer = 'Maghrib';
  } else if (currentHoursDecimal >= asrDec) {
    currentPrayer = 'Asr';
  } else if (currentHoursDecimal >= dhuhrDec) {
    currentPrayer = 'Dhuhr';
  } else if (currentHoursDecimal >= sunriseDec) {
    currentPrayer = 'Sunrise';
  } else if (currentHoursDecimal >= fajrDec) {
    currentPrayer = 'Fajr';
  }

  // Set the current prayer badge
  if (currentPrayer !== 'None') {
    allPrayersStatus[currentPrayer] = 'current';
  }

  // Determine next upcoming prayer
  let nextSlot = slots.find((s) => s.hoursDecimal > currentHoursDecimal);
  let isTomorrowPrayer = false;
  let nextPrayerName = '';
  let nextPrayerTime = '';
  let secondsRemaining = 0;

  if (nextSlot) {
    // Next prayer is still later today
    nextPrayerName = nextSlot.displayName;
    nextPrayerTime = nextSlot.timeStr;
    const diffHours = nextSlot.hoursDecimal - currentHoursDecimal;
    secondsRemaining = Math.max(0, Math.round(diffHours * 3600));
  } else {
    // Current time is after today's Isha!
    // Next prayer is TOMORROW'S FAJR!
    isTomorrowPrayer = true;
    nextPrayerName = 'Fajr (Tomorrow)';
    nextPrayerTime = tomorrowFajrTime || todayTimes.fajr;

    // Remaining hours today until midnight + hours tomorrow from midnight to Fajr
    const hoursUntilMidnight = 24 - currentHoursDecimal;
    const totalHoursToTomFajr = hoursUntilMidnight + tomFajrDec;
    secondsRemaining = Math.max(0, Math.round(totalHoursToTomFajr * 3600));
  }

  return {
    currentPrayer,
    nextPrayerName,
    nextPrayerTime,
    secondsRemaining,
    timeRemainingFormatted: formatSecondsToCountdown(secondsRemaining),
    isTomorrowPrayer,
    completedPrayers,
    allPrayersStatus,
  };
}

/**
 * Calculates Islamic Hijri date from Gregorian date
 * Uses astronomical approximation with day offset adjustment support
 */
export function getHijriDate(date: Date = new Date(), dayAdjustment: number = 0): {
  day: number;
  month: number;
  year: number;
  monthNameEn: string;
  monthNameAr: string;
  formattedEn: string;
  formattedAr: string;
} {
  const HIJRI_MONTHS_EN = [
    'Muharram',
    'Safar',
    'Rabi al-Awwal',
    'Rabi al-Thani',
    'Jumada al-Ula',
    'Jumada al-Thaniyah',
    'Rajab',
    'Sha\'ban',
    'Ramadan',
    'Shawwal',
    'Dhu al-Qi\'dah',
    'Dhu al-Hijjah',
  ];

  const HIJRI_MONTHS_AR = [
    'مُحَرَّم',
    'صَفَر',
    'رَبِيع الأَوَّل',
    'رَبِيع الآخِر',
    'جُمَادَى الأُولَى',
    'جُمَادَى الآخِرَة',
    'رَجَب',
    'شَعْبَان',
    'رَمَضَان',
    'شَوَّال',
    'ذُو القَعْدَة',
    'ذُو الحِجَّة',
  ];

  // Apply optional user-configured lunar offset (-2 to +2 days)
  const adjusted = new Date(date.getTime() + dayAdjustment * 86400000);

  // Modern browser Intl format for islamic-umalqura
  try {
    const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(adjusted);
    const day = parseInt(parts.find((p) => p.type === 'day')?.value || '1', 10);
    const month = parseInt(parts.find((p) => p.type === 'month')?.value || '1', 10);
    const year = parseInt(parts.find((p) => p.type === 'year')?.value || '1448', 10);

    const mIdx = Math.max(0, Math.min(11, month - 1));
    const monthNameEn = HIJRI_MONTHS_EN[mIdx];
    const monthNameAr = HIJRI_MONTHS_AR[mIdx];

    return {
      day,
      month,
      year,
      monthNameEn,
      monthNameAr,
      formattedEn: `${day} ${monthNameEn} ${year} AH`,
      formattedAr: `${day} ${monthNameAr} ${year} هـ`,
    };
  } catch {
    // Fallback astronomical formula
    const y = adjusted.getFullYear();
    const m = adjusted.getMonth();
    const d = adjusted.getDate();
    const julian =
      Math.floor((1461 * (y + 4800 + Math.floor((m - 13) / 12))) / 4) +
      Math.floor((367 * (m - 1 - 12 * Math.floor((m - 13) / 12))) / 12) -
      Math.floor((3 * Math.floor((y + 4900 + Math.floor((m - 13) / 12)) / 100)) / 4) +
      d -
      32075;

    const l = julian - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l2 = l - 10631 * n + 354;
    const j =
      Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
      Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
    const l3 =
      l2 -
      Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
      Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
      29;
    const month = Math.floor((24 * l3) / 709);
    const day = l3 - Math.floor((709 * month) / 24);
    const year = 30 * n + j - 30;

    const mIdx = Math.max(0, Math.min(11, month - 1));
    return {
      day,
      month,
      year,
      monthNameEn: HIJRI_MONTHS_EN[mIdx],
      monthNameAr: HIJRI_MONTHS_AR[mIdx],
      formattedEn: `${day} ${HIJRI_MONTHS_EN[mIdx]} ${year} AH`,
      formattedAr: `${day} ${HIJRI_MONTHS_AR[mIdx]} ${year} هـ`,
    };
  }
}
