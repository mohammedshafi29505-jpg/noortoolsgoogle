/**
 * NoorTools Ramadan & Fasting Tracker
 * 
 * Suhoor & Iftar live countdowns, 30-day Ramadan fasting log,
 * Sunnah fasting days (White Days, Mondays & Thursdays), and Qada make-up tracker.
 * Fully powered by centralized PrayerLocationContext.
 */

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Moon,
  Sun,
  CheckCircle2,
  Circle,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';
import { usePrayerLocation } from '../context/PrayerLocationContext';
import { getRamadanCountdown } from '../services/hijri';

export const RamadanView: React.FC = () => {
  const { prayerTimes, currentTime, hijriDate } = usePrayerLocation();
  const [qadaFastsOwed, setQadaFastsOwed] = useState(2);
  const [qadaFastsCompleted, setQadaFastsCompleted] = useState(1);

  // 30 Days Fasting Status
  const [fastingLogs, setFastingLogs] = useState<Record<number, 'fasted' | 'missed' | 'pending'>>({
    1: 'fasted',
    2: 'fasted',
    3: 'fasted',
    4: 'fasted',
    5: 'fasted',
  });

  const ramadanCountdown = getRamadanCountdown();

  const toggleDayStatus = (day: number) => {
    setFastingLogs((prev) => {
      const curr = prev[day] || 'pending';
      const next = curr === 'fasted' ? 'missed' : curr === 'missed' ? 'pending' : 'fasted';
      return { ...prev, [day]: next };
    });
  };

  const fastedCount = Object.values(fastingLogs).filter((s) => s === 'fasted').length;

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Top Hero Banner */}
      <div className="bg-linear-to-br from-purple-950 via-indigo-950 to-stone-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-800/40 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/80 border border-purple-700/60 text-purple-300 text-xs font-semibold">
            <Moon className="w-3.5 h-3.5 text-purple-400" />
            <span>Fasting &amp; Ramadan • الصيام وشهر رمضان</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ramadan &amp; Fasting Hub
          </h1>

          <p className="text-purple-200/80 text-xs sm:text-sm max-w-xl">
            {ramadanCountdown.isRamadanNow
              ? `The sacred month of Ramadan is active (${hijriDate.formattedEn})! May Allah accept our fasting and prayers.`
              : `Approximately ${ramadanCountdown.daysRemaining} days remaining until Ramadan ${ramadanCountdown.upcomingHijriYear} AH.`}
          </p>
        </div>

        {/* Live Suhoor & Iftar Timings Card */}
        <div className="w-full lg:w-auto bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 grid grid-cols-2 gap-4">
          <div className="border-r border-white/10 pr-4">
            <div className="flex items-center gap-1.5 text-xs text-purple-300 font-medium">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Suhoor Ends (Fajr)</span>
            </div>
            <div className="text-2xl font-black font-mono text-white mt-1">
              {prayerTimes.fajr}
            </div>
            <span className="text-[10px] text-purple-200">Start of Fast</span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-purple-300 font-medium">
              <Moon className="w-4 h-4 text-purple-300" />
              <span>Iftar Time (Maghrib)</span>
            </div>
            <div className="text-2xl font-black font-mono text-amber-300 mt-1">
              {prayerTimes.maghrib}
            </div>
            <span className="text-[10px] text-purple-200">Break your Fast</span>
          </div>
        </div>
      </div>

      {/* Verified Iftar & Fasting Supplications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Iftar Dua Card */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Supplication Upon Breaking Fast (Iftar)
            </span>
            <span className="text-[10px] text-stone-400">Abu Dawud 2357 (Sahih)</span>
          </div>

          <div className="font-arabic text-xl text-right text-emerald-950 dark:text-emerald-100 font-bold leading-loose">
            ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ
          </div>

          <div className="text-xs text-stone-500 italic font-mono">
            Dhahaba aẓ-ẓama'u wabtallat al-'urūqu wa-thabata al-ajru inshā' Allāh
          </div>

          <p className="text-xs text-stone-700 dark:text-stone-300 font-serif">
            "The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills."
          </p>
        </div>

        {/* Voluntary Fasting Reminders */}
        <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Emphasized Sunnah Fasting Days
          </h3>

          <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
              <span>
                <strong>Mondays &amp; Thursdays:</strong> Days when deeds are presented to Allah.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
              <span>
                <strong>The White Days (Ayyam al-Beed):</strong> 13th, 14th, and 15th of each Hijri month.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
              <span>
                <strong>Six Days of Shawwal:</strong> Equivalent in reward to fasting the entire year.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 30-Day Fast Tracker Grid */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">
              30-Day Ramadan Fasting Log
            </h3>
            <p className="text-xs text-stone-500">
              Tap any day: Fasted (Green) → Missed (Red) → Pending
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
            {fastedCount} / 30 Fasted
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const status = fastingLogs[day] || 'pending';
            return (
              <button
                key={day}
                id={`ramadan-day-${day}`}
                onClick={() => toggleDayStatus(day)}
                className={`h-12 rounded-xl border flex flex-col items-center justify-center transition font-mono ${
                  status === 'fasted'
                    ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                    : status === 'missed'
                    ? 'bg-rose-600 text-white border-rose-500 font-bold'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
              >
                <span className="text-xs">{day}</span>
                <span className="text-[9px] uppercase tracking-tighter opacity-80">
                  {status === 'fasted' ? 'Fast' : status === 'missed' ? 'Miss' : 'Day'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Qada (Make-up Fasts) Tracker */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-stone-900 dark:text-white">
          Qada (Missed Fasts Make-up Tracker)
        </h3>
        <p className="text-xs text-stone-500">
          Track fasts missed due to illness, travel, or other valid dispensations before next Ramadan.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Fasts to Make Up (Owed)
              </span>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
                {qadaFastsOwed}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setQadaFastsOwed((c) => Math.max(0, c - 1))}
                className="w-8 h-8 rounded-lg bg-white dark:bg-stone-700 flex items-center justify-center border text-stone-700 dark:text-stone-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setQadaFastsOwed((c) => c + 1)}
                className="w-8 h-8 rounded-lg bg-white dark:bg-stone-700 flex items-center justify-center border text-stone-700 dark:text-stone-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Fasts Completed
              </span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {qadaFastsCompleted}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setQadaFastsCompleted((c) => Math.max(0, c - 1))}
                className="w-8 h-8 rounded-lg bg-white dark:bg-stone-700 flex items-center justify-center border text-stone-700 dark:text-stone-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setQadaFastsCompleted((c) => c + 1);
                  setQadaFastsOwed((o) => Math.max(0, o - 1));
                }}
                className="w-8 h-8 rounded-lg bg-white dark:bg-stone-700 flex items-center justify-center border text-stone-700 dark:text-stone-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
