/**
 * NoorTools Authentic Dua Library
 * Searchable, categorized supplications from Quran and authentic Hadith.
 * Audio playback, copy text, bookmarks, and repetition targets.
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  HeartHandshake,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Volume2,
  Share2,
  Sparkles,
  Info,
  Filter,
} from 'lucide-react';
import { DuaCategory, DuaItem } from '../types';
import { AUTHENTIC_DUAS } from '../data/duas';
import { storageService } from '../services/storage';

interface DuasViewProps {
  initialCategory?: DuaCategory;
  initialDuaId?: string;
}

export const DuasView: React.FC<DuasViewProps> = ({
  initialCategory,
  initialDuaId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DuaCategory | 'All'>(
    initialCategory || 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const list = storageService.getBookmarks().filter((b) => b.type === 'dua');
    return new Set(list.map((b) => b.duaId || b.id));
  });

  const categories: (DuaCategory | 'All')[] = [
    'All',
    'Morning',
    'Evening',
    'After Prayer',
    'Fasting',
    'Forgiveness',
    'Anxiety & Relief',
    'Protection',
    'Travel',
    'Food & Drink',
    'Sleep',
  ];

  const filteredDuas = useMemo(() => {
    return AUTHENTIC_DUAS.filter((dua) => {
      const matchesCategory =
        selectedCategory === 'All' || dua.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        dua.title.toLowerCase().includes(q) ||
        dua.translation.toLowerCase().includes(q) ||
        dua.transliteration.toLowerCase().includes(q) ||
        dua.arabic.includes(searchQuery) ||
        dua.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = (dua: DuaItem) => {
    const textToCopy = `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n"${dua.translation}"\n\nSource: ${dua.reference || dua.hadithReference} (via NoorTools)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleBookmark = (dua: DuaItem) => {
    const newSet = new Set(bookmarkedIds);
    if (newSet.has(dua.id)) {
      newSet.delete(dua.id);
      storageService.removeBookmark(dua.id);
    } else {
      newSet.add(dua.id);
      storageService.addBookmark({
        id: dua.id,
        type: 'dua',
        title: dua.title,
        subtitle: `${dua.category} • ${dua.reference || dua.hadithReference}`,
        duaId: dua.id,
        dateAdded: new Date().toISOString(),
      });
    }
    setBookmarkedIds(newSet);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          <HeartHandshake className="w-4 h-4" />
          <span>Authentic Supplications • الأدعية المأثورة</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
          Dua &amp; Adhkar Library
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-2xl">
          Verified prayers from the Holy Quran and canonical Prophetic traditions (Bukhari, Muslim, Abu Dawud, and Tirmidhi).
        </p>

        {/* Search Bar */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search duas by keywords, emotion, need (e.g., anxiety, forgiveness, travel, fasting)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:border-emerald-500 text-stone-900 dark:text-white"
          />
        </div>

        {/* Category Scroll Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Duas List */}
      <div className="space-y-4">
        {filteredDuas.length === 0 ? (
          <div className="bg-white dark:bg-stone-900 p-12 text-center rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-400">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">No supplications found for "{searchQuery}"</p>
            <p className="text-xs mt-1">Try another search keyword or select 'All' categories.</p>
          </div>
        ) : (
          filteredDuas.map((dua) => {
            const isBookmarked = bookmarkedIds.has(dua.id);
            const isCopied = copiedId === dua.id;

            return (
              <div
                key={dua.id}
                id={`dua-card-${dua.id}`}
                className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-emerald-400/80 shadow-xs transition space-y-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 mb-1.5">
                      {dua.category}
                    </span>
                    <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                      {dua.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(dua)}
                      className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                      title="Copy Dua text"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => toggleBookmark(dua)}
                      className={`p-2 rounded-xl transition ${
                        isBookmarked
                          ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
                          : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Save to Library'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Script */}
                <div
                  dir="rtl"
                  className="font-arabic text-xl sm:text-2xl text-right text-emerald-950 dark:text-emerald-100 font-bold leading-loose py-2 select-text"
                >
                  {dua.arabic}
                </div>

                {/* Transliteration */}
                <div className="text-xs text-stone-500 dark:text-stone-400 italic font-mono bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl">
                  {dua.transliteration}
                </div>

                {/* Translation */}
                <div className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-serif">
                  "{dua.translation}"
                </div>

                {/* Context & Source Attribution */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-stone-400">
                  <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                    <Info className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{dua.context}</span>
                  </div>
                  <div className="font-medium text-emerald-800 dark:text-emerald-400">
                    Source: {dua.hadithReference}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
