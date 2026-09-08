/**
 * NoorTools My Saved Library / Bookmarks View
 * Consolidated personal spiritual hub for bookmarked Surahs, Ayahs, Duas, and Divine Names.
 */

import React, { useState } from 'react';
import {
  Bookmark,
  BookOpen,
  HeartHandshake,
  Sparkles,
  Trash2,
  ExternalLink,
  Search,
} from 'lucide-react';
import { BookmarkItem, NavigationTab } from '../types';
import { storageService } from '../services/storage';

interface FavoritesViewProps {
  onNavigate: (tab: NavigationTab, params?: { surahId?: number; duaId?: string; nameNumber?: number }) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({ onNavigate }) => {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => storageService.getBookmarks());
  const [filterType, setFilterType] = useState<'all' | 'quran' | 'dua' | 'name'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRemove = (id: string) => {
    storageService.removeBookmark(id);
    setBookmarks(storageService.getBookmarks());
  };

  const filtered = bookmarks.filter((b) => {
    const matchesType = filterType === 'all' || b.type === filterType;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      b.title.toLowerCase().includes(q) ||
      (b.subtitle && b.subtitle.toLowerCase().includes(q));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Bookmark className="w-4 h-4" />
            <span>Personal Spiritual Library • المحفوظات</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
            My Saved Library
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Instant access to your bookmarked verses, supplications, and divine attributes.
          </p>
        </div>

        {/* Search */}
        <div className="w-full sm:w-64 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter saved items..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: `All Items (${bookmarks.length})` },
          { id: 'quran', label: 'Quran Verses' },
          { id: 'dua', label: 'Duas & Adhkar' },
          { id: 'name', label: '99 Names' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              filterType === tab.id
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-stone-900 p-12 text-center rounded-2xl border border-stone-200 dark:border-stone-800 text-stone-400 space-y-2">
            <Bookmark className="w-8 h-8 mx-auto opacity-30" />
            <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
              No saved items in this category
            </p>
            <p className="text-xs">
              Tap the bookmark icon on any Quran Ayah, Dua, or Name of Allah to save it here.
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const icon =
              item.type === 'quran' ? (
                <BookOpen className="w-4 h-4 text-emerald-600" />
              ) : item.type === 'dua' ? (
                <HeartHandshake className="w-4 h-4 text-rose-600" />
              ) : (
                <Sparkles className="w-4 h-4 text-amber-500" />
              );

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-emerald-400/60 shadow-xs transition flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs text-stone-500 line-clamp-1">{item.subtitle}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      if (item.type === 'quran') {
                        onNavigate('quran', { surahId: item.surahId });
                      } else if (item.type === 'dua') {
                        onNavigate('duas', { duaId: item.duaId });
                      } else if (item.type === 'name') {
                        onNavigate('names', { nameNumber: item.nameNumber });
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-600 hover:text-white text-xs font-bold text-stone-700 dark:text-stone-300 transition flex items-center gap-1"
                  >
                    <span>Open</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </button>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
