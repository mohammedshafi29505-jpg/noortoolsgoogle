/**
 * NoorTools Islamic Stories & History View
 * 
 * Authentic historical accounts of the Prophets, Seerah, and Sahaba.
 * Strictly anchored in Quranic verses and verified classical sources (Ibn Kathir & Ibn Hisham).
 * Includes an immersive "Story Mode" reader with key lessons and citations.
 */

import React, { useState, useMemo } from 'react';
import {
  BookMarked,
  Search,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { IslamicStoryItem } from '../types';
import { VERIFIED_ISLAMIC_STORIES } from '../data/stories';
import { storageService } from '../services/storage';

export const StoriesView: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<IslamicStoryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'prophets' | 'seerah' | 'sahaba'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNarrativeStep, setActiveNarrativeStep] = useState(0);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    const list = storageService.getBookmarks().filter((b) => b.type === 'story');
    return new Set(list.map((b) => b.id));
  });

  const filteredStories = useMemo(() => {
    return VERIFIED_ISLAMIC_STORIES.filter((s) => {
      const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.era.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleBookmark = (story: IslamicStoryItem) => {
    const newSet = new Set(bookmarkedIds);
    if (newSet.has(story.id)) {
      newSet.delete(story.id);
      storageService.removeBookmark(story.id);
    } else {
      newSet.add(story.id);
      storageService.addBookmark({
        id: story.id,
        type: 'story',
        title: story.title,
        subtitle: story.summary,
        dateAdded: new Date().toISOString(),
      });
    }
    setBookmarkedIds(newSet);
  };

  const openStory = (story: IslamicStoryItem) => {
    setSelectedStory(story);
    setActiveNarrativeStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-linear-to-br from-purple-950 via-stone-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-800/40 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/80 border border-purple-700/60 text-purple-300 text-xs font-semibold">
            <BookMarked className="w-3.5 h-3.5 text-purple-400" />
            <span>Islamic History &amp; Prophetic Lessons • قصص الأنبياء والتاريخ الإسلامي</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Stories of the Prophets &amp; Sahaba
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Authentic, Quranically grounded narratives from classical sources.
            Designed for thoughtful reflection, family learning, and moral fortitude.
          </p>
        </div>
      </div>

      {/* STORY DETAIL / READER VIEW */}
      {selectedStory ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedStory(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Stories Directory
            </button>

            <button
              onClick={() => toggleBookmark(selectedStory)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                bookmarkedIds.has(selectedStory.id)
                  ? 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
              }`}
            >
              {bookmarkedIds.has(selectedStory.id) ? (
                <BookmarkCheck className="w-4 h-4 text-purple-600" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              <span>{bookmarkedIds.has(selectedStory.id) ? 'Saved' : 'Bookmark Story'}</span>
            </button>
          </div>

          {/* Active Story Card */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                  {selectedStory.category}
                </span>
                <span className="text-xs text-stone-400">• {selectedStory.era}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white leading-tight">
                {selectedStory.title}
              </h2>

              <p className="text-xs text-stone-500 font-medium">
                Canonical Source: <span className="text-stone-700 dark:text-stone-300">{selectedStory.primarySource}</span>
              </p>
            </div>

            {/* Quranic References Badges */}
            <div className="bg-purple-50/60 dark:bg-purple-950/20 p-4 rounded-2xl border border-purple-200/50 dark:border-purple-900/30">
              <span className="text-xs font-bold text-purple-900 dark:text-purple-300 block mb-2">
                Quranic Foundation Verses:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedStory.quranReferences.map((ref, i) => (
                  <span
                    key={`quran-ref-${ref.surah}-${ref.ayah}-${i}`}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 font-mono text-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800"
                  >
                    Surah {ref.surah} ({ref.ayah})
                  </span>
                ))}
              </div>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-stone-800 dark:text-stone-200 leading-relaxed font-serif text-base sm:text-lg">
              {selectedStory.narrative.map((paragraph, index) => (
                <p key={`narrative-p-${index}`} className="first-letter:text-3xl first-letter:font-bold first-letter:font-sans first-letter:mr-1">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Lessons & Spiritual Takeaways */}
            <div className="bg-stone-50 dark:bg-stone-850 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3 font-sans">
              <h3 className="font-bold text-sm text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Spiritual Lessons &amp; Practical Applications</span>
              </h3>

              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                {selectedStory.keyLessons.map((lesson, idx) => (
                  <li key={`lesson-${idx}`} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* DIRECTORY VIEW */
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === 'all'
                    ? 'bg-white dark:bg-stone-900 text-purple-800 dark:text-purple-300 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                All Stories
              </button>
              <button
                onClick={() => setSelectedCategory('prophets')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === 'prophets'
                    ? 'bg-white dark:bg-stone-900 text-purple-800 dark:text-purple-300 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Prophets
              </button>
              <button
                onClick={() => setSelectedCategory('seerah')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === 'seerah'
                    ? 'bg-white dark:bg-stone-900 text-purple-800 dark:text-purple-300 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Seerah
              </button>
              <button
                onClick={() => setSelectedCategory('sahaba')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedCategory === 'sahaba'
                    ? 'bg-white dark:bg-stone-900 text-purple-800 dark:text-purple-300 shadow-xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                Sahaba
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs focus:outline-none focus:border-purple-600 text-stone-900 dark:text-white"
              />
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStories.map((story) => {
              const isSaved = bookmarkedIds.has(story.id);

              return (
                <div
                  key={story.id}
                  id={`story-card-${story.id}`}
                  onClick={() => openStory(story)}
                  className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 hover:border-purple-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                        {story.category}
                      </span>
                      <span className="text-[11px] text-stone-400">{story.era}</span>
                    </div>

                    <h3 className="font-bold text-base text-stone-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition">
                      {story.title}
                    </h3>

                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-3 leading-relaxed">
                      {story.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-purple-700 dark:text-purple-400 group-hover:underline">
                    <span>Read Story &amp; Lessons</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
