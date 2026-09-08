/**
 * NoorTools Core Types & Domain Models
 */

export type NavigationTab =
  | 'home'
  | 'dashboard'
  | 'quran'
  | 'duas'
  | 'hadith'
  | 'stories'
  | 'prayer-times'
  | 'qibla'
  | 'mosques'
  | 'tools'
  | 'tasbih'
  | 'salah-tracker'
  | 'zakat'
  | 'ramadan'
  | 'names-of-allah'
  | 'names'
  | 'salah-guide'
  | 'wudu-guide'
  | 'guides'
  | 'learning'
  | 'legal'
  | 'library'
  | 'favorites'
  | 'settings'
  | 'about'
  | 'privacy'
  | 'monetization';

export type ThemeMode = 'light' | 'dark' | 'system';
export type TextSize = 'sm' | 'base' | 'lg';

export interface UserSettings {
  theme: ThemeMode;
  textSize: TextSize;
  highContrast: boolean;
  reducedMotion: boolean;
  haptics: boolean;
  soundEffects: boolean;
  prayerMethod?: CalculationMethod;
  calculationMethod: CalculationMethod;
  asrMadhhab?: AsrMadhhab;
  madhhab: AsrMadhhab;
  highLatitudeRule: HighLatitudeRule;
  city: string;
  latitude: number;
  longitude: number;
  location?: {
    useGps: boolean;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  notificationsEnabled: boolean;
  vibrationEnabled: boolean;
}

export type PrayerName = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
export type SalahStatus = 'prayed_ontime' | 'prayed_late' | 'missed' | 'excused' | 'pending';

export interface BookmarkItem {
  id: string;
  type: 'quran' | 'dua' | 'name' | 'learning' | 'hadith' | 'story';
  title: string;
  subtitle?: string;
  surahId?: number;
  surahNumber?: number;
  ayahNumber?: number;
  duaId?: string;
  nameNumber?: number;
  dateAdded: string;
}

export type SurahMetadata = SurahMeta;
export type Ayah = AyahItem;

export type CalculationMethod =
  | 'MWL'          // Muslim World League (18°, 17°)
  | 'ISNA'         // Islamic Society of North America (15°, 15°)
  | 'Egypt'        // Egyptian General Authority of Survey (19.5°, 17.5°)
  | 'Makkah'       // Umm al-Qura University, Makkah (18.5°, +90 min)
  | 'Karachi'      // University of Islamic Sciences, Karachi (18°, 18°)
  | 'Tehran'       // Institute of Geophysics, University of Tehran
  | 'Gulf';        // Gulf Region (19.5°, +90 min)

export type AsrMadhhab = 'standard' | 'hanafi'; // Standard (Shafi'i/Maliki/Hanbali) = factor 1, Hanafi = factor 2
export type HighLatitudeRule = 'none' | 'middleOfTheNight' | 'oneSeventh' | 'angleBased';

export interface PrayerTimesData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  dateStr: string;
  nextPrayer: {
    name: 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
    time: string;
    timeRemainingFormatted: string;
    secondsRemaining: number;
  };
  currentPrayer: 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha' | 'None';
}

export interface SurahMeta {
  number: number;
  name: string;
  arabicName: string;
  englishMeaning: string;
  ayahCount: number;
  revelationType: 'Meccan' | 'Medinan';
  revelationOrder: number;
  pageNumber: number;
}

export interface AyahItem {
  surahNumber: number;
  ayahNumber: number;
  numberInSurah?: number;
  arabicText: string;
  transliteration?: string;
  translation: string;
  tafsirSummary?: string;
  isBismillah?: boolean;
}

export interface QuranBookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber?: number;
  note?: string;
  createdAt: string;
}

export interface ContinueReadingState {
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestamp: string;
}

export interface DuaItem {
  id: string;
  category: DuaCategory;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  hadithReference?: string;
  repeatCount: number;
  benefit?: string;
  verifiedSource: boolean;
}

export type DuaCategory =
  | 'Morning'
  | 'Evening'
  | 'Sleep'
  | 'Travel'
  | 'Eating'
  | 'Protection'
  | 'Forgiveness'
  | 'Family'
  | 'Difficulty'
  | 'Worship'
  | 'General'
  | 'After Prayer'
  | 'Fasting'
  | 'Anxiety & Relief'
  | 'Food & Drink';

export interface DailySalahLog {
  date: string; // YYYY-MM-DD
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export interface TasbihPreset {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  targetCount: number;
}

export interface TasbihHistoryLog {
  id: string;
  date: string;
  timestamp: string;
  zikrTitle: string;
  count: number;
}

export interface NameOfAllah {
  number: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  quranReference: string;
  explanation: string;
}

export interface ZakatInputs {
  cashInHand: number;
  cashInBank: number;
  goldGrams: number;
  silverGrams: number;
  goldPricePerGram: number;
  silverPricePerGram: number;
  sharesAndInvestments: number;
  businessMerchandise: number;
  debtsOwedToYou: number;
  immediateLiabilities: number;
  nisabStandard: 'gold' | 'silver';
  customNisabThreshold?: number;
}

export interface ZakatCalculationResult {
  totalAssets: number;
  totalLiabilities: number;
  netWealth: number;
  nisabThreshold: number;
  isEligible: boolean;
  zakatDue: number;
}

export interface RamadanDayLog {
  dayNumber: number;
  gregorianDate: string;
  fasted: boolean;
  notes?: string;
}

export interface MissedFastLog {
  totalToMakeUp: number;
  completedSoFar: number;
  reasonNotes?: string;
}

export interface MosqueItem {
  id: string;
  name: string;
  city: string;
  address: string;
  distanceKm: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  fajrIqamah?: string;
  dhuhrIqamah?: string;
  asrIqamah?: string;
  maghribIqamah?: string;
  ishaIqamah?: string;
  jummahTiming: string;
  facilities: string[];
  verifiedStatus: 'community-submitted' | 'directory-verified' | 'integration-ready';
}

export interface LearningLesson {
  id: string;
  category: LearningCategory;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Comprehensive';
  readTimeMinutes: number;
  summary: string;
  sections: {
    heading: string;
    content: string;
    arabicReference?: string;
  }[];
  keyTakeaways: string[];
  authenticReferences: string[];
}

export type LearningCategory =
  | 'Quran Basics'
  | 'Salah'
  | 'Wudu'
  | 'Fasting'
  | 'Zakat'
  | 'Hajj'
  | 'Umrah'
  | 'Islamic History'
  | 'Islamic Manners'
  | 'Beginner Guide';

export interface LegalResource {
  id: string;
  title: string;
  institution: string;
  country: string;
  description: string;
  specialty: string;
  url: string;
  verifiedOfficial: boolean;
}

export interface HadithItem {
  id: string;
  collection: string;
  hadithNumber: number | string;
  chapter?: string;
  chapterName?: string;
  bookName?: string;
  arabic?: string;
  arabicText?: string;
  narrator: string;
  translation?: string;
  englishTranslation?: string;
  grading: string;
  reference: string;
  commentary?: string;
  scholarlyCommentary?: string;
  category: string;
  verificationSource?: string;
  verificationStatus?: 'verified_hadith_canonical' | 'integration_ready';
}

export interface IslamicStoryItem {
  id: string;
  category: 'Prophets' | 'Seerah' | 'Sahaba' | 'Islamic History' | 'Scholars' | 'Character & Manners' | 'prophets' | 'seerah' | 'sahaba';
  title: string;
  arabicTitle?: string;
  subtitle?: string;
  summary: string;
  era?: string;
  readTimeMinutes?: number;
  sourceReference?: string;
  primarySource?: string;
  scholarlyAttribution?: string;
  verificationStatus?: 'verified_scholarly_tradition';
  narrative?: string[];
  paragraphs?: string[];
  keyLessons?: string[];
  lessons?: string[];
  quranReferences?: { surah: string; ayah: string }[];
  keyQuranAyahs?: { surah: number; ayah: number; text: string }[];
}

export interface JuzMeta {
  number: number;
  arabicName: string;
  name?: string;
  englishName?: string;
  startSurah?: number;
  startSurahNumber?: number;
  startSurahName: string;
  startAyah: number;
  endSurahNumber?: number;
  endSurahName?: string;
  endAyah?: number;
  pageNumber: number;
}

export interface DailyReminder {
  id: string;
  dayOfYear: number;
  theme: string;
  arabicText?: string;
  quote: string;
  source: string;
  reflection: string;
}
