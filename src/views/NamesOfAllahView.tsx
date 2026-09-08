/**
 * NoorTools 99 Names of Allah (Asmā' Allāh al-Ḥusnā)
 * Complete collection with authentic Arabic script, transliterations, meanings,
 * Quranic citations, and personal bookmarking.
 */

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  ChevronRight,
  X,
  Volume2,
} from 'lucide-react';
import { NameOfAllah } from '../types';
import { NAMES_OF_ALLAH } from '../data/namesOfAllah';
import { storageService } from '../services/storage';

interface NamesOfAllahViewProps {
  initialNameNumber?: number;
}

export const NamesOfAllahView: React.FC<NamesOfAllahViewProps> = ({ initialNameNumber }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedName, setSelectedName] = useState<NameOfAllah | null>(() => {
    if (initialNameNumber) {
      return NAMES_OF_ALLAH.find((n) => n.number === initialNameNumber) || null;
    }
    return null;
  });

  // Bookmarks
  const [bookmarkedNumbers, setBookmarkedNumbers] = useState<Set<number>>(() => {
    const list = storageService.getBookmarks().filter((b) => b.type === 'name');
    return new Set(list.map((b) => b.nameNumber || 0));
  });

  const filteredNames = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return NAMES_OF_ALLAH.filter(
      (n) =>
        n.transliteration.toLowerCase().includes(q) ||
        n.meaning.toLowerCase().includes(q) ||
        n.arabic.includes(searchQuery) ||
        n.number.toString() === searchQuery.trim()
    );
  }, [searchQuery]);

  const toggleBookmark = (name: NameOfAllah) => {
    const newSet = new Set(bookmarkedNumbers);
    if (newSet.has(name.number)) {
      newSet.delete(name.number);
      storageService.removeBookmark(`name_${name.number}`);
    } else {
      newSet.add(name.number);
      storageService.addBookmark({
        id: `name_${name.number}`,
        type: 'name',
        title: `${name.number}. ${name.transliteration} (${name.arabic})`,
        subtitle: `${name.meaning} • ${name.quranReference}`,
        nameNumber: name.number,
        dateAdded: new Date().toISOString(),
      });
    }
    setBookmarkedNumbers(newSet);
  };

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>The Divine Attributes • أسماء الله الحسنى</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
            99 Names of Allah
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            "And to Allah belong the best names, so invoke Him by them." (Surah Al-A'raf 7:180)
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, meaning, or number..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Names Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filteredNames.map((name) => {
          const isBookmarked = bookmarkedNumbers.has(name.number);

          return (
            <div
              key={name.number}
              id={`name-card-${name.number}`}
              onClick={() => setSelectedName(name)}
              className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-amber-400/80 hover:shadow-xs transition cursor-pointer flex flex-col justify-between group space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 font-mono font-bold text-xs flex items-center justify-center text-stone-600 dark:text-stone-300">
                  {name.number}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(name);
                  }}
                  className={`p-1.5 rounded-lg transition ${
                    isBookmarked
                      ? 'text-amber-500 bg-amber-50 dark:bg-amber-950'
                      : 'text-stone-300 hover:text-stone-600 dark:hover:text-stone-200'
                  }`}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Arabic Name */}
              <div className="text-center py-2">
                <div className="font-arabic text-3xl font-bold text-emerald-950 dark:text-emerald-100 group-hover:scale-105 transition-transform">
                  {name.arabic}
                </div>
                <div className="font-bold text-sm text-stone-900 dark:text-white mt-2">
                  {name.transliteration}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                  {name.meaning}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
                <span>{name.quranReference}</span>
                <span className="text-emerald-600 font-medium group-hover:underline">Details →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Name Details Modal Dialog */}
      {selectedName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Attribute #{selectedName.number} of 99
              </span>
              <button
                onClick={() => setSelectedName(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center py-4 border-b border-stone-100 dark:border-stone-800 space-y-2">
              <div className="font-arabic text-5xl font-extrabold text-emerald-950 dark:text-emerald-100">
                {selectedName.arabic}
              </div>
              <h2 className="text-2xl font-black text-stone-900 dark:text-white">
                {selectedName.transliteration}
              </h2>
              <div className="text-base font-serif italic text-emerald-800 dark:text-emerald-300">
                "{selectedName.meaning}"
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
                  Theological Meaning &amp; Contemplation
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                  {selectedName.explanation}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800 flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Quranic Citation: <strong>{selectedName.quranReference}</strong>
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedName(null)}
                className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
