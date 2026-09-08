/**
 * Islamic Hijri Calendar & Date Converter
 * Tabular Islamic Calendar Algorithm with astronomical alignment.
 */

export const HIJRI_MONTHS = [
  { index: 1, name: 'Muharram', arabic: 'مُحَرَّم' },
  { index: 2, name: 'Safar', arabic: 'صَفَر' },
  { index: 3, name: 'Rabi\' al-Awwal', arabic: 'رَبِيع الأَوَّل' },
  { index: 4, name: 'Rabi\' al-Thani', arabic: 'رَبِيع الآخِر' },
  { index: 5, name: 'Jumada al-Awwal', arabic: 'جُمَادَى الأُولَى' },
  { index: 6, name: 'Jumada al-Thani', arabic: 'جُمَادَى الآخِرَة' },
  { index: 7, name: 'Rajab', arabic: 'رَجَب' },
  { index: 8, name: 'Sha\'ban', arabic: 'شَعْبَان' },
  { index: 9, name: 'Ramadan', arabic: 'رَمَضَان' },
  { index: 10, name: 'Shawwal', arabic: 'شَوَّال' },
  { index: 11, name: 'Dhu al-Qi\'dah', arabic: 'ذُو القَعْدَة' },
  { index: 12, name: 'Dhu al-Hijjah', arabic: 'ذُو الحِجَّة' },
];

export interface HijriDate {
  day: number;
  monthIndex: number;
  monthName: string;
  monthArabic: string;
  year: number;
  formatted: string;
  formattedArabic: string;
}

/**
 * Converts a Gregorian Date to an estimated Hijri Date using tabular computation.
 */
export function gregorianToHijri(date: Date = new Date()): HijriDate {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let m = month + 1;
  let y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    b -
    1524;

  const epoch = 1948439.5;
  const daysSinceEpoch = jd - epoch;
  const cycle = Math.floor(daysSinceEpoch / 10631);
  const remainingDays = daysSinceEpoch - cycle * 10631;

  const hijriYear = Math.floor((remainingDays * 30 + 10646) / 10631) + cycle * 30;
  const yearLength =
    hijriYear % 30 in [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29] ? 355 : 354;

  const dayOfYear =
    remainingDays -
    Math.floor(((hijriYear - cycle * 30 - 1) * 10631 + 14) / 30);

  let hijriMonth = Math.ceil((dayOfYear - 1) / 29.5);
  if (hijriMonth > 12) hijriMonth = 12;
  if (hijriMonth < 1) hijriMonth = 1;

  let hijriDay = Math.floor(dayOfYear - (hijriMonth - 1) * 29.5);
  if (hijriDay < 1) hijriDay = 1;
  if (hijriDay > 30) hijriDay = 30;

  const monthObj = HIJRI_MONTHS[hijriMonth - 1] || HIJRI_MONTHS[0];

  return {
    day: hijriDay,
    monthIndex: hijriMonth,
    monthName: monthObj.name,
    monthArabic: monthObj.arabic,
    year: hijriYear,
    formatted: `${hijriDay} ${monthObj.name} ${hijriYear} AH`,
    formattedArabic: `${hijriDay} ${monthObj.arabic} ${hijriYear} هـ`,
  };
}

/**
 * Calculates countdown to upcoming Ramadan (Month 9).
 */
export function getRamadanCountdown(): {
  isRamadanNow: boolean;
  daysRemaining: number;
  hoursRemaining: number;
  upcomingHijriYear: number;
} {
  const currentHijri = gregorianToHijri(new Date());
  if (currentHijri.monthIndex === 9) {
    return {
      isRamadanNow: true,
      daysRemaining: 0,
      hoursRemaining: 0,
      upcomingHijriYear: currentHijri.year,
    };
  }

  let monthsUntilRamadan = 9 - currentHijri.monthIndex;
  let targetYear = currentHijri.year;
  if (monthsUntilRamadan <= 0) {
    monthsUntilRamadan += 12;
    targetYear += 1;
  }

  const estimatedDaysRemaining = Math.max(
    1,
    Math.floor(monthsUntilRamadan * 29.5 - currentHijri.day + 1)
  );

  return {
    isRamadanNow: false,
    daysRemaining: estimatedDaysRemaining,
    hoursRemaining: estimatedDaysRemaining * 24,
    upcomingHijriYear: targetYear,
  };
}
