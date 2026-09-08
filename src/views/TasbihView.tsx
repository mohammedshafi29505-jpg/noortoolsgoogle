/**
 * NoorTools Digital Tasbih & Zikr Counter
 * Interactive circular tap counter, preset sacred dhikr, cycle completion triggers,
 * haptic vibration, audio click sounds, and daily persistent remembrance logs.
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Vibrate,
  History,
  CheckCircle2,
  Plus,
  Flame,
  Award,
} from 'lucide-react';
import { UserSettings } from '../types';
import { storageService } from '../services/storage';

interface TasbihViewProps {
  settings: UserSettings;
}

interface DhikrPhrase {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  defaultTarget: number;
}

const PRESET_DHIKR: DhikrPhrase[] = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'Subḥān Allāh',
    translation: 'Glory be to Allah',
    defaultTarget: 33,
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Al-ḥamdu lillāh',
    translation: 'All praise is due to Allah',
    defaultTarget: 33,
  },
  {
    id: 'allahuakbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allāhu Akbar',
    translation: 'Allah is the Greatest',
    defaultTarget: 33,
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfiru llāh',
    translation: 'I seek forgiveness from Allah',
    defaultTarget: 100,
  },
  {
    id: 'tahlil',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    transliteration: 'Lā ilāha illa llāh',
    translation: 'There is no deity worthy of worship except Allah',
    defaultTarget: 100,
  },
  {
    id: 'hawqalah',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Lā ḥawla wa-lā quwwata illā billāh',
    translation: 'There is no power nor strength except through Allah',
    defaultTarget: 33,
  },
];

export const TasbihView: React.FC<TasbihViewProps> = ({ settings }) => {
  const [selectedDhikr, setSelectedDhikr] = useState<DhikrPhrase>(PRESET_DHIKR[0]);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState<number>(33);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(settings.vibrationEnabled);

  const [history, setHistory] = useState(() => storageService.getTasbihHistory());
  const streaks = storageService.getStreaks();

  // Synthetic click audio generator using Web Audio API (zero external network dependency)
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const handleTap = () => {
    playClickSound();

    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(25);
    }

    const nextCount = count + 1;
    setCount(nextCount);

    // Save to persistent storage service
    storageService.incrementTasbih(selectedDhikr.id, 1);

    // If target reached
    if (target > 0 && nextCount >= target) {
      if (vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate([60, 40, 60]); // celebratory buzz
      }
      setCyclesCompleted((c) => c + 1);
      setCount(0);
      setHistory(storageService.getTasbihHistory());
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const selectDhikr = (d: DhikrPhrase) => {
    setSelectedDhikr(d);
    setTarget(d.defaultTarget);
    setCount(0);
  };

  // Progress percentage
  const progressPercent = target > 0 ? Math.min(100, (count / target) * 100) : 100;
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>Remembrance of Allah • التسبيح والأذكار</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
            Digital Tasbih
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Count sacred phrases, complete sets, and track your spiritual habit.
          </p>
        </div>

        {/* Streaks Badge */}
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 px-3.5 py-2 rounded-xl border border-amber-200/60 dark:border-amber-900/60 shrink-0">
          <Flame className="w-5 h-5 text-amber-500" />
          <div>
            <div className="text-[10px] text-amber-800 dark:text-amber-400 font-medium">Daily Streak</div>
            <div className="text-xs font-bold text-amber-950 dark:text-amber-100">
              {streaks.tasbihStreak} Days
            </div>
          </div>
        </div>
      </div>

      {/* Preset Phrases Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {PRESET_DHIKR.map((d) => (
          <button
            key={d.id}
            id={`tasbih-select-${d.id}`}
            onClick={() => selectDhikr(d)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedDhikr.id === d.id
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-400'
            }`}
          >
            {d.transliteration}
          </button>
        ))}
      </div>

      {/* Main Circular Counter Interface */}
      <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col items-center justify-center space-y-6">
        {/* Active Phrase Display */}
        <div className="text-center space-y-1">
          <div className="font-arabic text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-emerald-200 leading-relaxed">
            {selectedDhikr.arabic}
          </div>
          <div className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            {selectedDhikr.transliteration}
          </div>
          <div className="text-xs italic text-stone-500 font-serif">
            "{selectedDhikr.translation}"
          </div>
        </div>

        {/* Big Circular Tap Zone with Progress SVG */}
        <div className="relative flex items-center justify-center select-none">
          {/* Circular Progress SVG */}
          <svg className="w-64 h-64 -rotate-90">
            {/* Track */}
            <circle
              cx="128"
              cy="128"
              r={radius}
              className="text-stone-100 dark:text-stone-800"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Progress Bar */}
            <circle
              cx="128"
              cy="128"
              r={radius}
              className="text-emerald-600 transition-all duration-150 ease-out"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Interactive Tap Button */}
          <button
            id="main-tasbih-tap-btn"
            onClick={handleTap}
            className="absolute inset-4 rounded-full bg-linear-to-b from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-850 hover:scale-[1.02] active:scale-95 transition flex flex-col items-center justify-center shadow-inner cursor-pointer"
          >
            <span className="text-6xl sm:text-7xl font-black font-mono text-emerald-950 dark:text-emerald-100 leading-none">
              {count}
            </span>
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider mt-2">
              Target: {target > 0 ? target : 'Free'}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-widest">
              TAP TO COUNT
            </span>
          </button>
        </div>

        {/* Cycles & Controls */}
        <div className="flex items-center justify-between w-full max-w-sm pt-2">
          {/* Target Selectors */}
          <div className="flex items-center gap-1.5">
            {[33, 99, 100, 0].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTarget(t);
                  setCount(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  target === t
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                {t === 0 ? 'Free' : t}
              </button>
            ))}
          </div>

          {/* Cycles Count */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Sets: <strong>{cyclesCompleted}</strong></span>
          </div>

          {/* Reset Button */}
          <button
            id="tasbih-reset-btn"
            onClick={handleReset}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            title="Reset current counter"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Sound & Haptic Toggles */}
        <div className="flex items-center gap-4 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500">
          <button
            onClick={() => setSoundEnabled((p) => !p)}
            className="flex items-center gap-1.5 hover:text-stone-800 dark:hover:text-stone-200 transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
            <span>Click Sound</span>
          </button>

          <span>•</span>

          <button
            onClick={() => setVibrationEnabled((p) => !p)}
            className="flex items-center gap-1.5 hover:text-stone-800 dark:hover:text-stone-200 transition"
          >
            <Vibrate className={`w-4 h-4 ${vibrationEnabled ? 'text-emerald-600' : 'opacity-50'}`} />
            <span>Vibration</span>
          </button>
        </div>
      </div>

      {/* History Log Card */}
      <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-1.5">
            <History className="w-4 h-4 text-emerald-600" />
            Recent Remembrance Sessions
          </h3>
          <span className="text-[11px] text-stone-400">Stored locally in browser</span>
        </div>

        <div className="divide-y divide-stone-100 dark:divide-stone-800">
          {history.slice(0, 5).map((item) => (
            <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-stone-900 dark:text-white capitalize">
                  {item.phraseId.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-stone-400 ml-2">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                +{item.count} counts
              </span>
            </div>
          ))}
          {history.length === 0 && (
            <div className="py-4 text-center text-xs text-stone-400">
              No sessions recorded yet. Tap the counter above to begin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
