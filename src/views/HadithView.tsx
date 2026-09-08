/**
 * NoorTools Hadith Library View
 * 
 * Canonical Prophetic traditions featuring the 40 Hadith of Imam al-Nawawi,
 * selections from Sahih al-Bukhari & Sahih Muslim.
 * Provides Arabic vocalized script, English translation, narrator, scholarly grading,
 * category filters, commentary, and bookmarking.
 */

import React, { useState, useMemo } from 'react';
import {
  Scroll,
  Search,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  Filter,
  Info,
} from 'lucide-react';
import { HadithItem } from '../types';
import { VERIFIED_HADITHS } from '../data/hadith';
import { storageService } from '../services/storage';

export const HadithView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Bookmarks state
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const list = storageService.getBookmarks().filter((b) => b.type === 'hadith');
    return new Set(list.map((b) => b.id));
  });

  const categories = useMemo(() => {
    const set = new Set<string>();
    VERIFIED_HADITHS.forEach((h) => set.add(h.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredHadiths = useMemo(() => {
    return VERIFIED_HADITHS.filter((h) => {
      const matchesCat = selectedCategory === 'all' || h.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        h.englishTranslation.toLowerCase().includes(q) ||
        h.chapterName.toLowerCase().includes(q) ||
        h.narrator.toLowerCase().includes(q) ||
        h.arabicText.includes(q) ||
        h.reference.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleBookmark = (hadith: HadithItem) => {
    const newSet = new Set(bookmarkedIds);
    if (newSet.has(hadith.id)) {
      newSet.delete(hadith.id);
      storageService.removeBookmark(hadith.id);
    } else {
      newSet.add(hadith.id);
      storageService.addBookmark({
        id: hadith.id,
        type: 'hadith',
        title: `${hadith.collection} #${hadith.hadithNumber}: ${hadith.chapterName}`,
        subtitle: hadith.englishTranslation.slice(0, 100) + '...',
        dateAdded: new Date().toISOString(),
      });
    }
    setBookmarkedIds(newSet);
  };

  const copyHadith = (hadith: HadithItem) => {
    const text = `${hadith.arabicText}\n\n"${hadith.englishTranslation}"\n\n— Narrated by ${hadith.narrator}\n[${hadith.reference} - Grading: ${hadith.grading}]\nVia NoorTools`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(hadith.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Top Hero Banner */}
      <div className="bg-linear-to-br from-amber-950 via-stone-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl border border-amber-800/40 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/80 border border-amber-700/60 text-amber-300 text-xs font-semibold">
            <Scroll className="w-3.5 h-3.5 text-amber-400" />
            <span>The Prophetic Traditions • الحديث النبوي الشريف</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Canonical Hadith Library
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Strictly authentic narrations from Imam al-Nawawi's 40 Hadith and Sahih al-Bukhari &amp; Muslim.
            Verified chain transmitters, standard grading, and classical scholarly commentary.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hadiths by meaning, narrator, topic, Arabic keywords, or reference..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm focus:outline-none focus:border-amber-600 text-stone-900 dark:text-white shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {cat === 'all' ? 'All Collections' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hadith Cards Stream */}
      <div className="space-y-5">
        {filteredHadiths.map((hadith) => {
          const isBookmarked = bookmarkedIds.has(hadith.id);
          const isCopied = copiedId === hadith.id;

          return (
            <div
              key={hadith.id}
              id={`hadith-card-${hadith.id}`}
              className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4 hover:border-amber-500/50 transition"
            >
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-bold text-xs font-mono">
                    #{hadith.hadithNumber}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                      {hadith.chapterName}
                    </h3>
                    <span className="text-[11px] text-stone-400">{hadith.collection}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200/50 dark:border-emerald-800/40">
                    {hadith.grading}
                  </span>

                  <button
                    onClick={() => copyHadith(hadith)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                    title="Copy Hadith"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => toggleBookmark(hadith)}
                    className={`p-1.5 rounded-lg transition ${
                      isBookmarked
                        ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/60'
                        : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                    title={isBookmarked ? 'Remove Bookmark' : 'Save to Library'}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Narrator */}
              <div className="text-xs text-stone-500 font-medium">
                Narrated by: <span className="text-stone-800 dark:text-stone-200 font-semibold">{hadith.narrator}</span>
              </div>

              {/* Arabic Matn (Text) */}
              <div
                dir="rtl"
                className="font-arabic text-xl sm:text-2xl text-stone-950 dark:text-stone-100 font-bold leading-loose text-right py-2 select-text"
              >
                {hadith.arabicText}
              </div>

              {/* English Translation */}
              <blockquote className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-sans border-l-2 border-amber-600 pl-4 py-1 italic">
                "{hadith.englishTranslation}"
              </blockquote>

              {/* Scholarly Commentary & Canonical Citation */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                <div className="md:col-span-8 text-stone-500 dark:text-stone-400 leading-relaxed">
                  <strong className="text-stone-700 dark:text-stone-300">Scholarly Context: </strong>
                  {hadith.commentary}
                </div>
                <div className="md:col-span-4 text-right md:text-right text-stone-400 font-mono text-[11px] self-end">
                  Ref: {hadith.reference}
                </div>
              </div>
            </div>
          );
        })}

        {filteredHadiths.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
            <Info className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm text-stone-500">No Hadiths match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
