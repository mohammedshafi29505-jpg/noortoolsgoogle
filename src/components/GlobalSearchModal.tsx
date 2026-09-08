/**
 * Global Search Modal
 * Searches instantaneously across Tools, 114 Surahs, Duas, 99 Names, Lessons, and Guides.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  X,
  BookOpen,
  HeartHandshake,
  Clock,
  Compass,
  Building2,
  Sparkles,
  Calendar,
  CheckSquare,
  Calculator,
  Droplets,
  GraduationCap,
  Scale,
  Settings,
  ArrowRight,
  Scroll,
  BookMarked,
} from 'lucide-react';
import { NavigationTab } from '../types';
import { SURAHS_LIST } from '../data/surahs';
import { AUTHENTIC_DUAS } from '../data/duas';
import { NAMES_OF_ALLAH } from '../data/namesOfAllah';
import { LEARNING_LESSONS } from '../data/learning';
import { VERIFIED_HADITHS } from '../data/hadith';
import { VERIFIED_ISLAMIC_STORIES } from '../data/stories';

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Tool' | 'Surah' | 'Dua' | 'Name' | 'Lesson' | 'Guide' | 'Hadith' | 'Story';
  targetTab: NavigationTab;
  metadata?: Record<string, unknown>;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavigationTab, meta?: Record<string, unknown>) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // toggle happens in parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Comprehensive Search Index
  const searchIndex: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = [
      // Tools
      { id: 't_home', title: 'Home', subtitle: 'Platform overview and daily hub', category: 'Tool', targetTab: 'home' },
      { id: 't_dash', title: 'Daily Dashboard', subtitle: 'Prayer cards, streaks, reminders and Ramadan widgets', category: 'Tool', targetTab: 'dashboard' },
      { id: 't_quran', title: 'Quran Browser', subtitle: 'Browse 114 Surahs, Ayah viewer, reading progress', category: 'Tool', targetTab: 'quran' },
      { id: 't_duas', title: 'Dua Library', subtitle: 'Authentic morning, evening, protection & travel supplications', category: 'Tool', targetTab: 'duas' },
      { id: 't_prayers', title: 'Prayer Times', subtitle: 'Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha calculations and countdown', category: 'Tool', targetTab: 'prayer-times' },
      { id: 't_qibla', title: 'Qibla Finder', subtitle: 'Real-time Kaaba compass and GPS alignment', category: 'Tool', targetTab: 'qibla' },
      { id: 't_mosques', title: 'Mosque Finder', subtitle: 'Nearby masjids, facilities, Jummah timings & directions', category: 'Tool', targetTab: 'mosques' },
      { id: 't_tasbih', title: 'Digital Tasbih & Zikr', subtitle: 'Tap counter, daily targets, cycle counts & history log', category: 'Tool', targetTab: 'tasbih' },
      { id: 't_salah', title: 'Salah Tracker', subtitle: 'Log 5 daily prayers, check streaks, and view history', category: 'Tool', targetTab: 'salah-tracker' },
      { id: 't_zakat', title: 'Zakat Calculator', subtitle: 'Calculate 2.5% on cash, gold, silver, shares & business assets', category: 'Tool', targetTab: 'zakat' },
      { id: 't_ramadan', title: 'Ramadan & Fasting Tracker', subtitle: 'Suhoor/Iftar countdown, calendar & missed fasts manager', category: 'Tool', targetTab: 'ramadan' },
      { id: 't_names', title: '99 Names of Allah', subtitle: 'Asma ul Husna with meanings and Quranic verses', category: 'Tool', targetTab: 'names-of-allah' },
      { id: 't_sguide', title: 'Salah Step-by-Step Guide', subtitle: 'Fajr to Isha prayer steps, rak\'ah counts, and illustrations', category: 'Tool', targetTab: 'salah-guide' },
      { id: 't_wguide', title: 'Wudu Guide', subtitle: '10 authentic steps of ablution, nullifiers, and sunnahs', category: 'Tool', targetTab: 'wudu-guide' },
      { id: 't_learn', title: 'Islamic Learning Modules', subtitle: 'Curriculum across 10 foundational topics', category: 'Tool', targetTab: 'learning' },
      { id: 't_legal', title: 'Islamic Legal Resources', subtitle: 'Directory of academic institutions & fatwa councils', category: 'Tool', targetTab: 'legal' },
      { id: 't_tools', title: 'Calculators & Converters', subtitle: 'Percentage calculator, solar-to-lunar age, Hijri converter', category: 'Tool', targetTab: 'tools' },
      { id: 't_lib', title: 'My Saved Library', subtitle: 'Bookmarks for Quran, Duas, Names, and Lessons', category: 'Tool', targetTab: 'library' },
      { id: 't_settings', title: 'Settings', subtitle: 'Theme, calculation methods, madhhab, and privacy', category: 'Tool', targetTab: 'settings' },
    ];

    // Add 114 Surahs
    SURAHS_LIST.forEach((s) => {
      items.push({
        id: `surah_${s.number}`,
        title: `${s.number}. Surah ${s.name} (${s.arabicName})`,
        subtitle: `${s.englishMeaning} • ${s.ayahCount} Verses • ${s.revelationType}`,
        category: 'Surah',
        targetTab: 'quran',
        metadata: { surahNumber: s.number },
      });
    });

    // Add Duas
    AUTHENTIC_DUAS.forEach((d) => {
      items.push({
        id: `dua_${d.id}`,
        title: d.title,
        subtitle: `${d.category} Dua • ${d.translation.substring(0, 60)}...`,
        category: 'Dua',
        targetTab: 'duas',
        metadata: { duaId: d.id, category: d.category },
      });
    });

    // Add 99 Names
    NAMES_OF_ALLAH.forEach((n) => {
      items.push({
        id: `name_${n.number}`,
        title: `${n.number}. ${n.transliteration} (${n.arabic})`,
        subtitle: `${n.meaning} • ${n.quranReference}`,
        category: 'Name',
        targetTab: 'names-of-allah',
        metadata: { nameNumber: n.number },
      });
    });

    // Add Lessons
    LEARNING_LESSONS.forEach((l) => {
      items.push({
        id: `lesson_${l.id}`,
        title: l.title,
        subtitle: `${l.category} • ${l.difficulty} • ${l.readTimeMinutes} min read`,
        category: 'Lesson',
        targetTab: 'learning',
        metadata: { lessonId: l.id },
      });
    });

    // Add Hadiths
    VERIFIED_HADITHS.forEach((h) => {
      items.push({
        id: `hadith_${h.id}`,
        title: `${h.collection} #${h.hadithNumber}: ${h.chapterName}`,
        subtitle: `Narrated by ${h.narrator} • ${h.grading}`,
        category: 'Hadith',
        targetTab: 'hadith',
        metadata: { hadithId: h.id },
      });
    });

    // Add Stories
    VERIFIED_ISLAMIC_STORIES.forEach((s) => {
      items.push({
        id: `story_${s.id}`,
        title: s.title,
        subtitle: `${s.era} • ${s.primarySource}`,
        category: 'Story',
        targetTab: 'stories',
        metadata: { storyId: s.id },
      });
    });

    return items;
  }, []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      // Show top suggestions when empty
      return searchIndex.slice(0, 8);
    }
    const q = query.toLowerCase();
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 15);
  }, [query, searchIndex]);

  if (!isOpen) return null;

  const handleSelect = (item: SearchItem) => {
    onSelectTab(item.targetTab, item.metadata);
    onClose();
  };

  const getCategoryIcon = (category: SearchItem['category']) => {
    switch (category) {
      case 'Surah':
        return BookOpen;
      case 'Dua':
        return HeartHandshake;
      case 'Name':
        return Sparkles;
      case 'Lesson':
        return GraduationCap;
      case 'Guide':
        return CheckSquare;
      case 'Hadith':
        return Scroll;
      case 'Story':
        return BookMarked;
      default:
        return Compass;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-stone-200 dark:border-stone-800 gap-3">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 60+ tools, 114 Surahs, Duas, 99 Names..."
            className="w-full bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-700"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-stone-100 dark:divide-stone-800">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-stone-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1 text-stone-500">
                Try searching for "Prayer", "Al-Fatihah", "Morning Dua", "Zakat", or "Compass".
              </p>
            </div>
          ) : (
            filteredResults.map((item) => {
              const Icon = getCategoryIcon(item.category);
              return (
                <button
                  key={item.id}
                  id={`search-result-${item.id}`}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left transition group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-stone-900 dark:text-stone-100 truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-600 shrink-0 ml-2 transition-transform group-hover:translate-x-0.5" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
          <span>{filteredResults.length} quick results</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700">
              ↑↓
            </kbd>{' '}
            Navigate •{' '}
            <kbd className="px-1 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700">
              Enter
            </kbd>{' '}
            Select
          </span>
        </div>
      </div>
    </div>
  );
};
