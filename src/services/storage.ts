/**
 * Local-First Versioned Storage Service
 * NoorTools respects complete user privacy. All personal logs, bookmarks,
 * and prayer trackers remain securely on the user's device.
 */

import {
  UserSettings,
  DailySalahLog,
  QuranBookmark,
  ContinueReadingState,
  TasbihHistoryLog,
  RamadanDayLog,
  MissedFastLog,
  BookmarkItem,
  PrayerName,
  SalahStatus,
} from '../types';
import { BRAND_CONFIG } from '../config/brand';

const SCHEMA_VERSION = '1.0';
const PREFIX = 'noortools_v1_';

const KEYS = {
  SETTINGS: `${PREFIX}settings`,
  SALAH_LOGS: `${PREFIX}salah_logs`,
  SALAH_DETAILED_LOGS: `${PREFIX}salah_detailed_logs`,
  TASBIH_CURRENT: `${PREFIX}tasbih_current`,
  TASBIH_HISTORY: `${PREFIX}tasbih_history`,
  BOOKMARKS_CENTRAL: `${PREFIX}bookmarks_central`,
  BOOKMARKS_QURAN: `${PREFIX}bookmarks_quran`,
  BOOKMARKS_DUA: `${PREFIX}bookmarks_dua`,
  BOOKMARKS_NAMES: `${PREFIX}bookmarks_names`,
  BOOKMARKS_LEARNING: `${PREFIX}bookmarks_learning`,
  CONTINUE_READING: `${PREFIX}continue_reading`,
  FASTING_LOGS: `${PREFIX}fasting_logs`,
  MISSED_FASTS: `${PREFIX}missed_fasts`,
  LEARNING_PROGRESS: `${PREFIX}learning_progress`,
  STREAKS: `${PREFIX}streaks`,
};

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[NoorTools Storage] Error reading ${key}:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[NoorTools Storage] Error writing ${key}:`, err);
  }
}

export interface DetailedSalahRecord {
  date: string;
  prayers: Record<PrayerName, SalahStatus>;
  notes?: string;
}

export const storageService = {
  getSchemaVersion(): string {
    return SCHEMA_VERSION;
  },

  // User Settings
  getSettings(): UserSettings {
    const saved = safeGet<UserSettings>(KEYS.SETTINGS, BRAND_CONFIG.defaultSettings);
    // Ensure all required fields exist
    return {
      ...BRAND_CONFIG.defaultSettings,
      ...saved,
    };
  },

  saveSettings(newSettings: Partial<UserSettings>): UserSettings {
    const current = this.getSettings();
    const updated: UserSettings = {
      ...current,
      ...newSettings,
    };
    safeSet(KEYS.SETTINGS, updated);
    return updated;
  },

  // Date Key Utility
  getTodayDateKey(): string {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  // Salah Tracking
  getSalahLogs(): Record<string, DailySalahLog> {
    return safeGet<Record<string, DailySalahLog>>(KEYS.SALAH_LOGS, {});
  },

  getTodaySalahLog(): DailySalahLog {
    const today = this.getTodayDateKey();
    const all = this.getSalahLogs();
    if (all[today]) return all[today];
    return {
      date: today,
      fajr: false,
      dhuhr: false,
      asr: false,
      maghrib: false,
      isha: false,
    };
  },

  toggleSalah(prayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'): DailySalahLog {
    const today = this.getTodayDateKey();
    const all = this.getSalahLogs();
    const current = all[today] || {
      date: today,
      fajr: false,
      dhuhr: false,
      asr: false,
      maghrib: false,
      isha: false,
    };

    const updated: DailySalahLog = {
      ...current,
      [prayer]: !current[prayer],
    };

    all[today] = updated;
    safeSet(KEYS.SALAH_LOGS, all);
    return updated;
  },

  getSalahLog(dateKey: string): DetailedSalahRecord {
    const detailed = safeGet<Record<string, DetailedSalahRecord>>(KEYS.SALAH_DETAILED_LOGS, {});
    if (detailed[dateKey]) {
      return detailed[dateKey];
    }
    return {
      date: dateKey,
      prayers: {
        Fajr: 'pending',
        Sunrise: 'pending',
        Dhuhr: 'pending',
        Asr: 'pending',
        Maghrib: 'pending',
        Isha: 'pending',
      },
    };
  },

  saveSalahLog(dateKey: string, prayer: PrayerName, status: SalahStatus): DetailedSalahRecord {
    const detailed = safeGet<Record<string, DetailedSalahRecord>>(KEYS.SALAH_DETAILED_LOGS, {});
    const current = this.getSalahLog(dateKey);
    const updated: DetailedSalahRecord = {
      ...current,
      prayers: {
        ...current.prayers,
        [prayer]: status,
      },
    };
    detailed[dateKey] = updated;
    safeSet(KEYS.SALAH_DETAILED_LOGS, detailed);
    return updated;
  },

  // Streaks
  getStreaks(): { salahStreak: number; tasbihStreak: number; quranStreak: number; totalDays: number } {
    return safeGet(KEYS.STREAKS, {
      salahStreak: 7,
      tasbihStreak: 12,
      quranStreak: 5,
      totalDays: 24,
    });
  },

  // Central Bookmarks (Unified for Quran, Duas, Names of Allah)
  getBookmarks(): BookmarkItem[] {
    return safeGet<BookmarkItem[]>(KEYS.BOOKMARKS_CENTRAL, [
      {
        id: 'init_fatihah',
        type: 'quran',
        title: 'Surah Al-Fatihah (1:1-7)',
        subtitle: 'The Opening • 7 Verses',
        surahId: 1,
        dateAdded: new Date().toISOString(),
      },
      {
        id: 'init_dua_morning',
        type: 'dua',
        title: 'Sayyidul Istighfar (Master Supplication for Forgiveness)',
        subtitle: 'Forgiveness • Sahih al-Bukhari 6306',
        duaId: 'dua_istighfar_1',
        dateAdded: new Date().toISOString(),
      },
      {
        id: 'init_name_1',
        type: 'name',
        title: '1. Ar-Rahman (الرَّحْمَٰنُ)',
        subtitle: 'The Entirely Merciful',
        nameNumber: 1,
        dateAdded: new Date().toISOString(),
      },
    ]);
  },

  addBookmark(item: BookmarkItem): void {
    const list = this.getBookmarks();
    if (!list.some((b) => b.id === item.id)) {
      list.unshift(item);
      safeSet(KEYS.BOOKMARKS_CENTRAL, list);
    }
  },

  removeBookmark(id: string): void {
    const list = this.getBookmarks();
    const updated = list.filter((b) => b.id !== id);
    safeSet(KEYS.BOOKMARKS_CENTRAL, updated);
  },

  // Quran Specific Bookmarks & Last Read
  getQuranBookmarks(): QuranBookmark[] {
    return safeGet<QuranBookmark[]>(KEYS.BOOKMARKS_QURAN, []);
  },

  toggleQuranBookmark(bookmark: Omit<QuranBookmark, 'id' | 'createdAt'>): boolean {
    const list = this.getQuranBookmarks();
    const existingIndex = list.findIndex(
      (b) => b.surahNumber === bookmark.surahNumber && b.ayahNumber === bookmark.ayahNumber
    );

    if (existingIndex >= 0) {
      list.splice(existingIndex, 1);
      safeSet(KEYS.BOOKMARKS_QURAN, list);
      return false;
    } else {
      list.unshift({
        ...bookmark,
        id: `qb_${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
      safeSet(KEYS.BOOKMARKS_QURAN, list);
      return true;
    }
  },

  getLastRead(): { surahNumber: number; ayahNumber: number; surahName: string; timestamp: string } {
    return safeGet(KEYS.CONTINUE_READING, {
      surahNumber: 1,
      ayahNumber: 1,
      surahName: 'Al-Fatihah',
      timestamp: new Date().toISOString(),
    });
  },

  saveLastRead(data: { surahNumber: number; ayahNumber: number; surahName: string }): void {
    safeSet(KEYS.CONTINUE_READING, {
      ...data,
      timestamp: new Date().toISOString(),
    });
  },

  // Tasbih
  getTasbihState(): { count: number; activeZikrIndex: number; target: number } {
    return safeGet(KEYS.TASBIH_CURRENT, { count: 0, activeZikrIndex: 0, target: 33 });
  },

  saveTasbihState(state: { count: number; activeZikrIndex: number; target: number }): void {
    safeSet(KEYS.TASBIH_CURRENT, state);
  },

  getTasbihHistory(): { id: string; phraseId: string; count: number; timestamp: string }[] {
    return safeGet(KEYS.TASBIH_HISTORY, [
      {
        id: 't_init_1',
        phraseId: 'subhanallah',
        count: 33,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 't_init_2',
        phraseId: 'alhamdulillah',
        count: 33,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
    ]);
  },

  incrementTasbih(phraseId: string, amount: number = 1): void {
    const history = this.getTasbihHistory();
    const todayEntry = history[0];
    if (todayEntry && todayEntry.phraseId === phraseId && Date.now() - new Date(todayEntry.timestamp).getTime() < 300000) {
      todayEntry.count += amount;
      safeSet(KEYS.TASBIH_HISTORY, [...history]);
    } else {
      const newEntry = {
        id: `tasbih_${Date.now()}`,
        phraseId,
        count: amount,
        timestamp: new Date().toISOString(),
      };
      safeSet(KEYS.TASBIH_HISTORY, [newEntry, ...history].slice(0, 50));
    }
  },

  // Learning Progress
  getCompletedLessons(): string[] {
    return safeGet<string[]>(KEYS.LEARNING_PROGRESS, ['learn_quran_1']);
  },

  toggleLessonComplete(lessonId: string, completed?: boolean): boolean {
    const list = this.getCompletedLessons();
    const idx = list.indexOf(lessonId);
    let isNowDone = false;

    if (completed !== undefined) {
      if (completed && idx === -1) {
        list.push(lessonId);
        isNowDone = true;
      } else if (!completed && idx >= 0) {
        list.splice(idx, 1);
        isNowDone = false;
      }
    } else {
      if (idx >= 0) {
        list.splice(idx, 1);
        isNowDone = false;
      } else {
        list.push(lessonId);
        isNowDone = true;
      }
    }

    safeSet(KEYS.LEARNING_PROGRESS, list);
    return isNowDone;
  },

  // Data Export, Import & Reset
  exportAllData(): string {
    const exportObject: Record<string, any> = {};
    Object.entries(KEYS).forEach(([key, storageKey]) => {
      const val = localStorage.getItem(storageKey);
      if (val) {
        try {
          exportObject[key] = JSON.parse(val);
        } catch {
          exportObject[key] = val;
        }
      }
    });
    return JSON.stringify(exportObject, null, 2);
  },

  importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      Object.entries(KEYS).forEach(([key, storageKey]) => {
        if (parsed[key] !== undefined) {
          localStorage.setItem(storageKey, JSON.stringify(parsed[key]));
        }
      });
      return true;
    } catch (err) {
      console.error('Import failed:', err);
      return false;
    }
  },

  clearAll(): void {
    this.clearAllUserData();
  },

  clearAllUserData(): void {
    Object.values(KEYS).forEach((k) => {
      localStorage.removeItem(k);
    });
  },
};
