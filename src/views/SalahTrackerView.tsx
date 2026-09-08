/**
 * NoorTools Salah Tracker & Habit Builder
 * Log daily obligatory and voluntary prayers, view 7-day trends, calendar heatmaps, and streak badges.
 */

import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { PrayerName, SalahStatus } from '../types';
import { storageService } from '../services/storage';

export const SalahTrackerView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const dateKey = selectedDate.toISOString().split('T')[0];

  // Load log for current selected date
  const [currentLog, setCurrentLog] = useState(() => storageService.getSalahLog(dateKey));
  const streaks = storageService.getStreaks();

  const prayers: PrayerName[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  const handleStatusChange = (prayer: PrayerName, status: SalahStatus) => {
    const updated = storageService.saveSalahLog(dateKey, prayer, status);
    setCurrentLog({ ...updated });
  };

  const handleDateShift = (days: number) => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + days);
    setSelectedDate(next);
    const nextKey = next.toISOString().split('T')[0];
    setCurrentLog(storageService.getSalahLog(nextKey));
  };

  const isToday = dateKey === new Date().toISOString().split('T')[0];

  const statusOptions: { value: SalahStatus; label: string; color: string }[] = [
    { value: 'prayed_ontime', label: 'On Time', color: 'bg-emerald-600 text-white' },
    { value: 'prayed_late', label: 'Late', color: 'bg-amber-500 text-white' },
    { value: 'missed', label: 'Missed', color: 'bg-rose-600 text-white' },
    { value: 'excused', label: 'Excused', color: 'bg-stone-400 text-white' },
  ];

  // Calculate past 7 days logs for weekly visual
  const weeklyTrend = React.useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const log = storageService.getSalahLog(key);
      const count = Object.values(log.prayers).filter(
        (s) => s === 'prayed_ontime' || s === 'prayed_late'
      ).length;
      days.push({
        date: d,
        dayName: d.toLocaleDateString(undefined, { weekday: 'narrow' }),
        count,
        percent: (count / 5) * 100,
      });
    }
    return days;
  }, [currentLog]);

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <CheckSquare className="w-4 h-4" />
            <span>Spiritual Habit Builder • سجل الصلوات</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
            Salah Tracker
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Monitor your 5 daily prayers, track streaks, and maintain spiritual consistency.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/40 px-4 py-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/60 shrink-0">
          <Flame className="w-6 h-6 text-amber-500" />
          <div>
            <div className="text-[10px] text-amber-800 dark:text-amber-400 font-semibold uppercase">
              Current Streak
            </div>
            <div className="text-lg font-black text-amber-950 dark:text-amber-100">
              {streaks.salahStreak} Days
            </div>
          </div>
        </div>
      </div>

      {/* Date Navigator Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <button
          onClick={() => handleDateShift(-1)}
          className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <span className="text-sm font-bold text-stone-900 dark:text-white">
            {selectedDate.toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          {isToday && (
            <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Today
            </span>
          )}
        </div>

        <button
          onClick={() => handleDateShift(1)}
          className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 5 Prayers Interactive Cards */}
      <div className="space-y-3">
        {prayers.map((prayer) => {
          const currentStatus = currentLog.prayers[prayer];

          return (
            <div
              key={prayer}
              id={`salah-card-${prayer.toLowerCase()}`}
              className="bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    currentStatus === 'prayed_ontime'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  }`}
                >
                  {prayer[0]}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                    {prayer}
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Status: <strong className="capitalize">{currentStatus.replace('_', ' ')}</strong>
                  </p>
                </div>
              </div>

              {/* Status Selector Buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                {statusOptions.map((opt) => {
                  const isSelected = currentStatus === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleStatusChange(prayer, opt.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        isSelected
                          ? opt.color
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 7-Day Performance Trend Chart */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            7-Day Completion Rate
          </h3>
          <span className="text-xs text-stone-400">5 Prayers / Day</span>
        </div>

        <div className="grid grid-cols-7 gap-2 items-end pt-4">
          {weeklyTrend.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-stone-400">{day.count}/5</span>
              <div className="w-full bg-stone-100 dark:bg-stone-800 h-24 rounded-lg overflow-hidden flex flex-col justify-end">
                <div
                  className="w-full bg-emerald-600 rounded-lg transition-all duration-300"
                  style={{ height: `${day.percent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-stone-600 dark:text-stone-300">
                {day.dayName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
