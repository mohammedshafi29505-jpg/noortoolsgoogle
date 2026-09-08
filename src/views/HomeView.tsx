/**
 * NoorTools Home View
 * 
 * High-craft, welcoming Islamic portal with quick daily cards, next prayer live status,
 * full categorized directory of 40+ Islamic tools, and authentic daily reminder.
 * Powered by centralized PrayerLocationContext.
 */

import React from 'react';
import {
  BookOpen,
  Clock,
  Compass,
  Building2,
  HeartHandshake,
  Sparkles,
  Calendar,
  CheckSquare,
  Calculator,
  Bookmark,
  Scale,
  GraduationCap,
  Droplets,
  ShieldCheck,
  ChevronRight,
  Sun,
  Flame,
  Scroll,
  Search,
  BookMarked,
  Share2,
} from 'lucide-react';
import { NavigationTab } from '../types';
import { usePrayerLocation } from '../context/PrayerLocationContext';
import { getRamadanCountdown } from '../services/hijri';
import { getTodayReminder } from '../data/reminders';
import { storageService } from '../services/storage';

interface HomeViewProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { location, currentTime, hijriDate, prayerTimes, evaluation } = usePrayerLocation();

  const ramadanInfo = getRamadanCountdown();
  const dailyReminder = getTodayReminder();
  const streaks = storageService.getStreaks();

  const toolCategories = [
    {
      category: 'Daily Worship & Essentials',
      description: 'Your fundamental everyday spiritual routine and tracking',
      tools: [
        {
          id: 'dashboard' as NavigationTab,
          title: 'Daily Dashboard',
          desc: 'Live prayer countdown, daily checklist, and spiritual summary',
          icon: Sun,
          badge: 'Active Hub',
          color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40',
        },
        {
          id: 'prayer-times' as NavigationTab,
          title: 'Prayer Times',
          desc: 'Calculations for Fajr, Dhuhr, Asr, Maghrib, and Isha with monthly schedule',
          icon: Clock,
          badge: evaluation.nextPrayerName,
          color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40',
        },
        {
          id: 'qibla' as NavigationTab,
          title: 'Qibla Finder',
          desc: 'Precise compass bearing and direct line toward the Holy Kaaba',
          icon: Compass,
          badge: 'Kaaba Compass',
          color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40',
        },
        {
          id: 'tasbih' as NavigationTab,
          title: 'Zikr & Digital Tasbih',
          desc: 'Custom target counter, cycle vibrations, and daily remembrance log',
          icon: Sparkles,
          badge: 'Counter',
          color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40',
        },
        {
          id: 'salah-tracker' as NavigationTab,
          title: 'Salah Tracker',
          desc: 'Log and monitor your 5 daily obligatory and Sunnah prayers',
          icon: CheckSquare,
          badge: `${streaks.salahStreak} Day Streak`,
          color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40',
        },
      ],
    },
    {
      category: 'The Holy Quran & Canonical Sunnah',
      description: 'Divine revelation, authentic Prophetic traditions, and sacred names',
      tools: [
        {
          id: 'quran' as NavigationTab,
          title: 'The Holy Quran',
          desc: 'Browse 114 Surahs, ayah-by-ayah reading with verified translations and tafsir references',
          icon: BookOpen,
          badge: '114 Surahs',
          color: 'text-emerald-800 bg-emerald-50 dark:bg-emerald-950/40',
        },
        {
          id: 'hadith' as NavigationTab,
          title: 'Hadith Library',
          desc: 'The 40 Hadith of Imam al-Nawawi and canonical traditions with Arabic and gradings',
          icon: Scroll,
          badge: 'Canonical',
          color: 'text-amber-800 bg-amber-50 dark:bg-amber-950/40',
        },
        {
          id: 'duas' as NavigationTab,
          title: 'Authentic Dua Library',
          desc: 'Morning, evening, food, protection & emotional well-being supplications',
          icon: HeartHandshake,
          badge: 'Hisn al-Muslim',
          color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40',
        },
        {
          id: 'names-of-allah' as NavigationTab,
          title: '99 Names of Allah',
          desc: 'Asma ul Husna with Arabic script, transliterations, meanings and Quranic verses',
          icon: Sparkles,
          badge: 'Asma ul Husna',
          color: 'text-amber-700 bg-amber-50 dark:bg-amber-950/40',
        },
        {
          id: 'stories' as NavigationTab,
          title: 'Islamic Stories & History',
          desc: 'Stories of the Prophets, Seerah, and Sahaba with verified takeaways and story mode',
          icon: BookMarked,
          badge: 'Story Mode',
          color: 'text-purple-700 bg-purple-50 dark:bg-purple-950/40',
        },
      ],
    },
    {
      category: 'Community & Fasting',
      description: 'Connecting with local masjids and observing the blessed fast',
      tools: [
        {
          id: 'mosques' as NavigationTab,
          title: 'Mosque Finder',
          desc: 'Query real registered places of worship via open geospatial data around your location',
          icon: Building2,
          badge: 'Open Directory',
          color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40',
        },
        {
          id: 'ramadan' as NavigationTab,
          title: 'Ramadan & Fasting Tracker',
          desc: 'Suhoor/Iftar countdown, 30-day fast log, and missed fast tracker',
          icon: Calendar,
          badge: ramadanInfo.isRamadanNow ? 'Ramadan Active' : `${ramadanInfo.daysRemaining}d to Ramadan`,
          color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40',
        },
      ],
    },
    {
      category: 'Guides & Islamic Learning',
      description: 'Step-by-step instructions and authenticated curriculum',
      tools: [
        {
          id: 'salah-guide' as NavigationTab,
          title: 'Salah Step-by-Step Guide',
          desc: 'Visual rak\'ah guides, postural rulings, and recited texts for beginners',
          icon: CheckSquare,
          badge: 'Guide',
          color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40',
        },
        {
          id: 'wudu-guide' as NavigationTab,
          title: 'Wudu Guide',
          desc: 'The 10 authentic steps of ablution, conditions, and invalidators',
          icon: Droplets,
          badge: 'Taharah',
          color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40',
        },
        {
          id: 'learning' as NavigationTab,
          title: 'Islamic Learning Modules',
          desc: 'Structured curriculum across 10 topics from Quran basics to Seerah and Adab',
          icon: GraduationCap,
          badge: '10 Modules',
          color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40',
        },
        {
          id: 'legal' as NavigationTab,
          title: 'Verified Legal Directory',
          desc: 'Accredited international fiqh councils and canonical hadith resources',
          icon: Scale,
          badge: 'Scholarly',
          color: 'text-stone-600 bg-stone-100 dark:bg-stone-800',
        },
      ],
    },
    {
      category: 'Financial Tools & Personal Utilities',
      description: 'Precise calculations for Zakat, calendar conversions, and private bookmarks',
      tools: [
        {
          id: 'zakat' as NavigationTab,
          title: 'Zakat Calculator',
          desc: '2.5% calculation on gold, silver, savings, shares, and business wealth',
          icon: Calculator,
          badge: 'Hawl & Nisab',
          color: 'text-emerald-800 bg-emerald-50 dark:bg-emerald-950/40',
        },
        {
          id: 'tools' as NavigationTab,
          title: 'Calculators & Converters',
          desc: 'Percentage calculator, solar-to-lunar age converter, and date conversions',
          icon: Calculator,
          badge: 'Calculators',
          color: 'text-stone-700 bg-stone-100 dark:bg-stone-800',
        },
        {
          id: 'library' as NavigationTab,
          title: 'My Saved Library',
          desc: 'Your private bookmarks: Quran verses, Duas, Divine Names, and notes',
          icon: Bookmark,
          badge: 'Private',
          color: 'text-amber-700 bg-amber-50 dark:bg-amber-950/40',
        },
      ],
    },
  ];

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-950 via-emerald-900 to-stone-950 text-white p-6 sm:p-8 md:p-10 border border-emerald-800/40 shadow-xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{hijriDate.formattedEn}</span>
              <span className="text-emerald-400 font-arabic font-bold">({hijriDate.formattedAr})</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Quran, Islamic Tools &amp; Helpful Resources
            </h1>

            <p className="text-emerald-100/80 text-sm sm:text-base max-w-xl">
              An all-in-one Islamic utility platform built for families, students, and seekers worldwide.
              Private by default, strictly authentic, and completely free.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                id="hero-jump-dashboard"
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm shadow-md transition flex items-center gap-1.5"
              >
                Open Daily Dashboard
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                id="hero-jump-quran"
                onClick={() => onNavigate('quran')}
                className="px-4 py-2 rounded-xl bg-emerald-900/70 hover:bg-emerald-800 text-emerald-100 font-medium text-sm border border-emerald-700/60 transition flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                Read Quran
              </button>
              <button
                id="hero-jump-hadith"
                onClick={() => onNavigate('hadith')}
                className="px-4 py-2 rounded-xl bg-emerald-900/70 hover:bg-emerald-800 text-emerald-100 font-medium text-sm border border-emerald-700/60 transition flex items-center gap-1.5"
              >
                <Scroll className="w-4 h-4" />
                Hadith Library
              </button>
              <button
                id="hero-jump-duas"
                onClick={() => onNavigate('duas')}
                className="px-4 py-2 rounded-xl bg-emerald-900/70 hover:bg-emerald-800 text-emerald-100 font-medium text-sm border border-emerald-700/60 transition flex items-center gap-1.5"
              >
                <HeartHandshake className="w-4 h-4" />
                Browse Duas
              </button>
            </div>
          </div>

          {/* Hero Live Widget Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Next Prayer in {location.city}</span>
                </div>
                <button
                  onClick={() => onNavigate('prayer-times')}
                  className="text-xs text-emerald-200 hover:text-white underline decoration-emerald-400 font-medium"
                >
                  Full Schedule
                </button>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                    Upcoming
                  </span>
                  <div className="text-3xl font-bold text-white tracking-tight">
                    {evaluation.nextPrayerName}
                  </div>
                  <div className="text-emerald-200 text-sm font-mono mt-0.5">
                    {evaluation.nextPrayerTime}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-emerald-300">Time Remaining</span>
                  <div className="text-xl font-bold text-amber-300 font-mono">
                    {evaluation.timeRemainingFormatted}
                  </div>
                </div>
              </div>

              {/* Mini Quick Streaks Bar */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                <div
                  onClick={() => onNavigate('salah-tracker')}
                  className="bg-black/20 hover:bg-black/30 p-2.5 rounded-xl cursor-pointer transition flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-[10px] text-stone-300">Salah Streak</div>
                    <div className="text-xs font-bold text-white">{streaks.salahStreak} Days</div>
                  </div>
                </div>
                <div
                  onClick={() => onNavigate('tasbih')}
                  className="bg-black/20 hover:bg-black/30 p-2.5 rounded-xl cursor-pointer transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <div>
                    <div className="text-[10px] text-stone-300">Tasbih Streak</div>
                    <div className="text-xs font-bold text-white">{streaks.tasbihStreak} Days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Reflection Card */}
      <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-stone-900 dark:to-stone-850 rounded-2xl p-5 border border-amber-200/80 dark:border-amber-950/50 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Daily Islamic Reminder • {dailyReminder.theme}</span>
          </div>
          <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
            Source: {dailyReminder.source}
          </span>
        </div>

        {dailyReminder.arabicText && (
          <div className="text-right font-arabic text-xl sm:text-2xl text-emerald-950 dark:text-emerald-100 font-semibold mb-2 leading-relaxed">
            {dailyReminder.arabicText}
          </div>
        )}

        <blockquote className="text-base sm:text-lg font-serif italic text-stone-800 dark:text-stone-200 mb-2">
          "{dailyReminder.quote}"
        </blockquote>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
          {dailyReminder.reflection}
        </p>
      </div>

      {/* Full Catalog of Tools (Categorized) */}
      <div className="space-y-10">
        {toolCategories.map((group) => (
          <div key={group.category} className="space-y-3">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-2">
              <h2 className="text-lg font-bold text-stone-900 dark:text-white tracking-tight">
                {group.category}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {group.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    id={`tool-card-${tool.id}`}
                    onClick={() => onNavigate(tool.id)}
                    className="group bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 hover:border-emerald-500 dark:hover:border-emerald-500/70 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {tool.badge && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                        {tool.title}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400 group-hover:underline">
                      <span>Launch Tool</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Transparency Banner */}
      <div className="rounded-2xl bg-stone-100 dark:bg-stone-900 p-6 border border-stone-200 dark:border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-700 dark:text-stone-300">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-white">Authentic &amp; Verified</h4>
            <p className="text-xs text-stone-500 mt-1">
              All Quranic text, authentic Duas, and Asma ul Husna are strictly sourced from verified canonical Islamic references.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-white">Zero Tracking or Ads</h4>
            <p className="text-xs text-stone-500 mt-1">
              Your prayer logs, reading history, and zakat inputs reside only on your local browser. No analytics or ads ever.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-stone-900 dark:text-white">Offline Ready PWA</h4>
            <p className="text-xs text-stone-500 mt-1">
              Install NoorTools directly on your device home screen for immediate offline calculation and reading anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
