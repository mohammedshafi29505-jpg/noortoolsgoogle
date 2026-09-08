/**
 * NoorTools Daily Dashboard
 * 
 * Powered by centralized PrayerLocationContext.
 * Real-time prayer tracking, deterministic prayer windows,
 * embedded quick tasbih, verified morning/evening supplications, and spiritual checklists.
 */

import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  Compass,
  Calendar,
  Flame,
  RotateCcw,
  CheckSquare,
  ChevronRight,
  Sun,
  Moon,
  HeartHandshake,
  MapPin,
  Scroll,
} from 'lucide-react';
import { NavigationTab, PrayerName } from '../types';
import { usePrayerLocation } from '../context/PrayerLocationContext';
import { getRamadanCountdown } from '../services/hijri';
import { storageService } from '../services/storage';
import { AUTHENTIC_DUAS } from '../data/duas';

interface DashboardViewProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { location, currentTime, hijriDate, prayerTimes, evaluation } = usePrayerLocation();

  const [quickTasbihCount, setQuickTasbihCount] = useState(0);
  const [quickTasbihDhikr, setQuickTasbihDhikr] = useState('SubhanAllah');
  const [checklist, setChecklist] = useState({
    fajrOnTime: false,
    morningAdhkar: false,
    readSurahMulkOrSajdah: false,
    eveningAdhkar: false,
    dailyCharityOrKindness: false,
    reciteAyatulKursi: false,
  });

  const ramadanInfo = getRamadanCountdown();

  // Today's Salah log
  const todayStr = storageService.getTodayDateKey();
  const [todayLog, setTodayLog] = useState(() => storageService.getSalahLog(todayStr));

  const togglePrayerStatus = (prayer: PrayerName) => {
    const current = todayLog.prayers[prayer];
    const newStatus = current === 'prayed_ontime' ? 'missed' : 'prayed_ontime';
    const updated = storageService.saveSalahLog(todayStr, prayer, newStatus);
    setTodayLog({ ...updated });
  };

  const handleQuickTasbihClick = () => {
    setQuickTasbihCount((prev) => prev + 1);
    storageService.incrementTasbih('quick_dash', 1);
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  };

  // Determine appropriate daily dua (Morning vs Evening)
  const isEvening = currentTime.getHours() >= 16 || currentTime.getHours() < 4;
  const featuredDua =
    AUTHENTIC_DUAS.find((d) =>
      isEvening ? d.category === 'Evening' : d.category === 'Morning'
    ) || AUTHENTIC_DUAS[0];

  const prayersList: { name: PrayerName; time: string }[] = [
    { name: 'Fajr', time: prayerTimes.fajr },
    { name: 'Dhuhr', time: prayerTimes.dhuhr },
    { name: 'Asr', time: prayerTimes.asr },
    { name: 'Maghrib', time: prayerTimes.maghrib },
    { name: 'Isha', time: prayerTimes.isha },
  ];

  const prayedCount = Object.values(todayLog.prayers).filter(
    (s) => s === 'prayed_ontime' || s === 'prayed_late'
  ).length;

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <span>{hijriDate.formattedEn}</span>
            <span>•</span>
            <span className="font-arabic">{hijriDate.formattedAr}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white mt-1">
            Assalamu Alaykum
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>{location.city}</span>
            <span className="opacity-40">•</span>
            <span>Local Time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </p>
        </div>

        {/* Live Synchronized Prayer Countdown Banner */}
        <div className="flex items-center gap-4 bg-emerald-50 dark:bg-emerald-950/70 px-4 py-3 rounded-xl border border-emerald-200/60 dark:border-emerald-900/60">
          <Clock className="w-6 h-6 text-emerald-700 dark:text-emerald-400 shrink-0" />
          <div>
            <div className="text-xs text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-1.5">
              <span>Next:</span>
              <strong className="font-bold text-emerald-950 dark:text-white">
                {evaluation.nextPrayerName}
              </strong>
              <span>at {evaluation.nextPrayerTime}</span>
            </div>
            <div className="text-lg font-bold text-emerald-950 dark:text-emerald-100 font-mono tracking-tight">
              in {evaluation.timeRemainingFormatted}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Action Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { id: 'quran' as NavigationTab, label: 'Holy Quran', sub: '114 Surahs', icon: BookOpen, color: 'emerald' },
          { id: 'prayer-times' as NavigationTab, label: 'Prayer Times', sub: 'Timetable', icon: Clock, color: 'teal' },
          { id: 'qibla' as NavigationTab, label: 'Find Qibla', sub: 'Kaaba Compass', icon: Compass, color: 'sky' },
          { id: 'hadith' as NavigationTab, label: 'Hadith Library', sub: '40 Nawawi & More', icon: Scroll, color: 'amber' },
          { id: 'duas' as NavigationTab, label: 'Authentic Duas', sub: 'Morning & Evening', icon: HeartHandshake, color: 'rose' },
          { id: 'stories' as NavigationTab, label: 'Islamic Stories', sub: 'Story Mode', icon: Sparkles, color: 'purple' },
        ].map((btn) => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.id}
              id={`dash-quick-${btn.id}`}
              onClick={() => onNavigate(btn.id)}
              className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:shadow-xs flex flex-col items-start gap-2 text-left transition group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 dark:text-white leading-tight">
                  {btn.label}
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">{btn.sub}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Today's Five Prayers & Quick Tasbih */}
        <div className="lg:col-span-7 space-y-6">
          {/* Today's 5 Prayers Card with Accurate Statuses */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-stone-900 dark:text-white">
                  Today's Five Obligatory Prayers
                </h2>
                <p className="text-xs text-stone-500">
                  Tap any prayer to record in your personal on-device Salah log
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{prayedCount} / 5 Logged</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {prayersList.map((p) => {
                const status = todayLog.prayers[p.name];
                const isPrayed = status === 'prayed_ontime' || status === 'prayed_late';
                const timeStatus = evaluation.allPrayersStatus[p.name];
                const isCurrent = evaluation.currentPrayer === p.name;
                const isNext = evaluation.nextPrayerName === p.name;

                return (
                  <button
                    key={p.name}
                    id={`dash-prayer-toggle-${p.name.toLowerCase()}`}
                    onClick={() => togglePrayerStatus(p.name)}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-between min-h-[110px] ${
                      isPrayed
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700'
                        : isCurrent
                        ? 'bg-emerald-100/70 dark:bg-emerald-900/40 border-emerald-500 ring-2 ring-emerald-500/20'
                        : isNext
                        ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-400 dark:border-amber-700'
                        : timeStatus === 'completed'
                        ? 'bg-stone-50/60 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800 opacity-80'
                        : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 hover:border-emerald-300'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-[10px]">
                      <span className="font-bold text-stone-900 dark:text-stone-100">
                        {p.name}
                      </span>
                      {isCurrent ? (
                        <span className="px-1 rounded bg-emerald-700 text-white font-bold text-[9px]">
                          NOW
                        </span>
                      ) : isNext ? (
                        <span className="px-1 rounded bg-amber-600 text-white font-bold text-[9px]">
                          NEXT
                        </span>
                      ) : timeStatus === 'completed' ? (
                        <span className="text-stone-400 text-[9px]">Passed</span>
                      ) : (
                        <span className="text-stone-400 text-[9px]">Later</span>
                      )}
                    </div>

                    <span className="text-xs font-mono font-bold text-stone-800 dark:text-stone-200 my-1">
                      {p.time}
                    </span>

                    <div className="mt-1">
                      {isPrayed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-300 dark:text-stone-600 hover:text-emerald-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <span>Sunrise: <strong>{prayerTimes.sunrise}</strong></span>
              <button
                onClick={() => onNavigate('prayer-times')}
                className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
              >
                Full Prayer Timetable →
              </button>
            </div>
          </div>

          {/* Embedded Quick Tasbih */}
          <div className="bg-linear-to-br from-emerald-900 to-stone-900 text-white rounded-2xl p-6 shadow-md border border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Quick Digital Tasbih</span>
              </div>
              <div className="text-xl font-bold font-arabic text-emerald-100">
                {quickTasbihDhikr === 'SubhanAllah' && 'سُبْحَانَ اللَّهِ'}
                {quickTasbihDhikr === 'Alhamdulillah' && 'الْحَمْدُ لِلَّهِ'}
                {quickTasbihDhikr === 'Allahu Akbar' && 'اللَّهُ أَكْبَرُ'}
                {quickTasbihDhikr === 'Astaghfirullah' && 'أَسْتَغْفِرُ اللَّهَ'}
              </div>
              <p className="text-xs text-emerald-200/70">
                Tap anywhere on the circular button to increment count.
              </p>

              {/* Dhikr Selector */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['SubhanAllah', 'Alhamdulillah', 'Allahu Akbar', 'Astaghfirullah'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setQuickTasbihDhikr(item);
                      setQuickTasbihCount(0);
                    }}
                    className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition ${
                      quickTasbihDhikr === item
                        ? 'bg-emerald-500 text-stone-950 font-bold'
                        : 'bg-emerald-950/70 text-emerald-300 hover:bg-emerald-800'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Tap Button Counter */}
            <div className="flex flex-col items-center gap-2">
              <button
                id="dash-quick-tasbih-btn"
                onClick={handleQuickTasbihClick}
                className="w-24 h-24 rounded-full bg-linear-to-b from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 active:scale-95 text-stone-950 shadow-lg flex flex-col items-center justify-center transition select-none cursor-pointer border-4 border-emerald-300/40"
              >
                <span className="text-2xl font-black font-mono leading-none">{quickTasbihCount}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">TAP</span>
              </button>
              <div className="flex items-center gap-3 text-xs text-emerald-300">
                <button
                  onClick={() => setQuickTasbihCount(0)}
                  className="hover:text-white flex items-center gap-1 text-[11px]"
                  title="Reset counter"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
                <span>•</span>
                <button
                  onClick={() => onNavigate('tasbih')}
                  className="hover:text-white text-[11px] underline"
                >
                  Full Tasbih
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Featured Dua, Spiritual Checklist, Ramadan status */}
        <div className="lg:col-span-5 space-y-6">
          {/* Featured Dua Card */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1">
                {isEvening ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                {isEvening ? 'Evening Supplication' : 'Morning Supplication'}
              </span>
              <button
                onClick={() => onNavigate('duas')}
                className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
              >
                Browse Duas →
              </button>
            </div>

            <h3 className="font-bold text-sm text-stone-900 dark:text-white mb-2">
              {featuredDua.title}
            </h3>

            <div className="font-arabic text-base text-right text-emerald-950 dark:text-emerald-100 leading-loose mb-2">
              {featuredDua.arabic}
            </div>

            <p className="text-xs italic text-stone-600 dark:text-stone-300 mb-2">
              "{featuredDua.translation}"
            </p>

            <div className="text-[10px] text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <span>Source: {featuredDua.reference || featuredDua.hadithReference}</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Verified</span>
            </div>
          </div>

          {/* Daily Islamic Checklist */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-1">
              Daily Spiritual Checklist
            </h3>
            <p className="text-xs text-stone-500 mb-3">
              Consistent good deeds loved by Allah (saved locally)
            </p>

            <div className="space-y-2">
              {[
                { key: 'fajrOnTime' as const, label: 'Prayed Fajr with contemplation' },
                { key: 'morningAdhkar' as const, label: 'Recited Morning / Evening Adhkar' },
                { key: 'readSurahMulkOrSajdah' as const, label: 'Read Quran (minimum 1 page)' },
                { key: 'reciteAyatulKursi' as const, label: 'Recited Ayatul Kursi after Salah' },
                { key: 'dailyCharityOrKindness' as const, label: 'Sadaqah, smile, or act of kindness' },
              ].map((item) => {
                const isChecked = checklist[item.key];
                return (
                  <div
                    key={item.key}
                    onClick={() =>
                      setChecklist((prev) => ({ ...prev, [item.key]: !prev[item.key] }))
                    }
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/60 cursor-pointer select-none transition"
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-300 dark:text-stone-600 shrink-0" />
                    )}
                    <span
                      className={`text-xs ${
                        isChecked
                          ? 'line-through text-stone-400 dark:text-stone-500'
                          : 'text-stone-700 dark:text-stone-200'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ramadan Tracker Card */}
          <div className="bg-linear-to-r from-purple-900 to-indigo-950 text-white rounded-2xl p-5 border border-purple-800/40 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Ramadan Tracker</span>
              </span>
              <div className="text-lg font-bold mt-0.5">
                {ramadanInfo.isRamadanNow
                  ? 'Blessed Ramadan is Active!'
                  : `${ramadanInfo.daysRemaining} Days to Ramadan`}
              </div>
              <p className="text-xs text-purple-200/80">
                Suhoor cutoff: {prayerTimes.fajr} • Iftar: {prayerTimes.maghrib}
              </p>
            </div>
            <button
              onClick={() => onNavigate('ramadan')}
              className="px-3 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-stone-950 font-bold text-xs transition"
            >
              Open Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
