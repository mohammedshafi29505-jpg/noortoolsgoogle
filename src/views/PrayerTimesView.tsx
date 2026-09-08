/**
 * NoorTools Prayer Times View
 * 
 * Solar calculation engine, synchronized real-time countdown,
 * monthly timetable calendar, juristic Madhhab & method customizer, and Adhan audio preview.
 * Fully powered by centralized PrayerLocationContext.
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Clock,
  Calendar,
  Settings,
  MapPin,
  Volume2,
  VolumeX,
  Compass,
  ChevronDown,
  Info,
  Globe,
  Sliders,
} from 'lucide-react';
import { CalculationMethod, AsrMadhhab, HighLatitudeRule, PrayerName } from '../types';
import { usePrayerLocation, MAJOR_WORLD_CITIES } from '../context/PrayerLocationContext';
import { calculatePrayerTimes, METHOD_CONFIGS } from '../services/prayerTimes';
import { getHijriDate } from '../services/dateTime';

interface PrayerTimesViewProps {
  onNavigateQibla: () => void;
}

export const PrayerTimesView: React.FC<PrayerTimesViewProps> = ({ onNavigateQibla }) => {
  const {
    location,
    requestGpsLocation,
    setManualLocation,
    currentTime,
    hijriDate,
    prayerTimes,
    evaluation,
    method,
    madhhab,
    highLatitudeRule,
    updateCalculationSettings,
  } = usePrayerLocation();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<'today' | 'monthly'>('today');
  const [isAdhanPlaying, setIsAdhanPlaying] = useState(false);
  const [adhanAudio] = useState(
    () => new Audio('https://media.blubrry.com/muslim_central/podcasts.qurancentral.com/adhan/makkah-adhan.mp3')
  );

  const toggleAdhanAudio = () => {
    if (isAdhanPlaying) {
      adhanAudio.pause();
      adhanAudio.currentTime = 0;
      setIsAdhanPlaying(false);
    } else {
      adhanAudio
        .play()
        .then(() => setIsAdhanPlaying(true))
        .catch(() => setIsAdhanPlaying(false));
    }
  };

  useEffect(() => {
    const handleEnded = () => setIsAdhanPlaying(false);
    adhanAudio.addEventListener('ended', handleEnded);
    return () => adhanAudio.removeEventListener('ended', handleEnded);
  }, [adhanAudio]);

  const prayersList: { name: PrayerName; time: string; arabic: string }[] = [
    { name: 'Fajr', time: prayerTimes.fajr, arabic: 'الفَجْر' },
    { name: 'Sunrise', time: prayerTimes.sunrise, arabic: 'الشُّرُوق' },
    { name: 'Dhuhr', time: prayerTimes.dhuhr, arabic: 'الظُّهْر' },
    { name: 'Asr', time: prayerTimes.asr, arabic: 'العَصْر' },
    { name: 'Maghrib', time: prayerTimes.maghrib, arabic: 'المَغْرِب' },
    { name: 'Isha', time: prayerTimes.isha, arabic: 'العِشَاء' },
  ];

  // Compute 30-day monthly schedule for selected month
  const monthlySchedule = useMemo(() => {
    const days = [];
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const data = calculatePrayerTimes({
        latitude: location.latitude,
        longitude: location.longitude,
        date,
        method,
        madhhab,
        highLatitudeRule,
      });
      const hij = getHijriDate(date);

      days.push({
        day: d,
        dateStr: date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' }),
        hijriStr: `${hij.day} ${hij.monthNameEn}`,
        fajr: data.fajr,
        sunrise: data.sunrise,
        dhuhr: data.dhuhr,
        asr: data.asr,
        maghrib: data.maghrib,
        isha: data.isha,
        isToday: d === currentTime.getDate() && month === currentTime.getMonth(),
      });
    }
    return days;
  }, [selectedDate, location.latitude, location.longitude, method, madhhab, highLatitudeRule, currentTime]);

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-linear-to-br from-emerald-950 via-emerald-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800/50 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {location.city} ({location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Prayer Times &amp; Timetable
            </h1>

            <p className="text-emerald-100/80 text-xs sm:text-sm max-w-xl">
              Solar astronomical calculations • {hijriDate.formattedEn} ({hijriDate.formattedAr})
            </p>
          </div>

          {/* Next Prayer Big Card */}
          <div className="w-full lg:w-auto bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-center justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                Next Prayer
              </span>
              <div className="text-3xl font-extrabold text-white mt-0.5">
                {evaluation.nextPrayerName}
              </div>
              <div className="text-emerald-200 text-sm font-mono mt-0.5">
                {evaluation.nextPrayerTime}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-emerald-300 font-medium">Time Remaining</span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-300 mt-0.5">
                {evaluation.timeRemainingFormatted}
              </div>
              <button
                onClick={toggleAdhanAudio}
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs transition"
              >
                {isAdhanPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                {isAdhanPlaying ? 'Stop Adhan' : 'Test Adhan'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Control Tabs: Today vs Monthly Timetable */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'today'
                ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Today's Schedule
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'monthly'
                ? 'bg-white dark:bg-stone-900 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Monthly Calendar
          </button>
        </div>

        <button
          onClick={onNavigateQibla}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          <Compass className="w-4 h-4" />
          Find Qibla Direction →
        </button>
      </div>

      {/* TODAY'S VIEW */}
      {activeTab === 'today' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {prayersList.map((prayer) => {
              const status = evaluation.allPrayersStatus[prayer.name];
              const isCurrent = evaluation.currentPrayer === prayer.name;
              const isNext = evaluation.nextPrayerName === prayer.name;

              return (
                <div
                  key={prayer.name}
                  id={`prayer-card-${prayer.name.toLowerCase()}`}
                  className={`p-4 rounded-2xl border text-center transition flex flex-col justify-between ${
                    isNext
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : isCurrent
                      ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-400'
                      : status === 'completed'
                      ? 'bg-stone-50/70 dark:bg-stone-900/50 border-stone-200 dark:border-stone-800 opacity-75'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="font-arabic font-bold text-stone-500">{prayer.arabic}</span>
                    {isNext ? (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                        Next
                      </span>
                    ) : isCurrent ? (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-600 text-white">
                        Active
                      </span>
                    ) : status === 'completed' ? (
                      <span className="text-[10px] font-medium text-stone-400">Passed</span>
                    ) : null}
                  </div>

                  <div className="font-bold text-base text-stone-900 dark:text-white">
                    {prayer.name}
                  </div>

                  <div className="text-lg font-extrabold font-mono text-emerald-800 dark:text-emerald-300 my-2">
                    {prayer.time}
                  </div>

                  <div className="text-[11px] text-stone-400">
                    {prayer.name === 'Sunrise' ? 'Prohibited prayer' : 'Obligatory prayer'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick City Presets */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Quick City Selection</span>
              </h3>
              <button
                onClick={requestGpsLocation}
                className="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
              >
                Use GPS Coordinates
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {MAJOR_WORLD_CITIES.map((c) => (
                <button
                  key={c.city}
                  onClick={() => setManualLocation(c.city, c.country, c.latitude, c.longitude)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                    location.city === c.city
                      ? 'bg-emerald-800 text-white font-bold'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {c.city}
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Parameters & Methodology Settings */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-emerald-600" />
              Calculation Methodology &amp; Juristic Adjustments
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Calculation Method
                </label>
                <select
                  value={method}
                  onChange={(e) =>
                    updateCalculationSettings({ method: e.target.value as CalculationMethod })
                  }
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="MWL">Muslim World League (Fajr 18°, Isha 17°)</option>
                  <option value="ISNA">ISNA - North America (Fajr 15°, Isha 15°)</option>
                  <option value="Egypt">Egyptian General Authority (Fajr 19.5°, Isha 17.5°)</option>
                  <option value="Makkah">Umm al-Qura University, Makkah (Fajr 18.5°, Isha +90m)</option>
                  <option value="Karachi">Univ. of Islamic Sciences Karachi (Fajr 18°, Isha 18°)</option>
                  <option value="Tehran">Institute of Geophysics, Tehran (Fajr 17.7°, Isha 14°)</option>
                  <option value="Gulf">Gulf Region (Fajr 19.5°, Isha +90 min)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Asr Juristic Madhhab
                </label>
                <select
                  value={madhhab}
                  onChange={(e) =>
                    updateCalculationSettings({ madhhab: e.target.value as AsrMadhhab })
                  }
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="standard">Standard / Shafi'i, Maliki, Hanbali (1x Shadow)</option>
                  <option value="hanafi">Hanafi (2x Shadow Length)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  High Latitude Adjustment
                </label>
                <select
                  value={highLatitudeRule}
                  onChange={(e) =>
                    updateCalculationSettings({ highLatitudeRule: e.target.value as HighLatitudeRule })
                  }
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="none">Standard Astronomical Angles</option>
                  <option value="middleOfTheNight">Middle of the Night</option>
                  <option value="oneSeventh">One-Seventh of the Night</option>
                  <option value="angleBased">Angle-Based Ratio</option>
                </select>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-stone-500 text-xs">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-stone-400" />
              <span>
                Calculations dynamically adjust for your local timezone and seasonal shifts. In polar or high latitudes (&gt;48°N/S), the chosen High Latitude rule prevents missing twilight windows.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MONTHLY CALENDAR VIEW */}
      {activeTab === 'monthly' && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                Monthly Prayer Schedule ({selectedDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })})
              </h3>
              <p className="text-xs text-stone-500">
                Calculated for {location.city} ({method}, {madhhab === 'hanafi' ? 'Hanafi' : 'Standard'})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
                }
                className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-semibold hover:bg-stone-50 dark:hover:bg-stone-800"
              >
                ← Prev Month
              </button>
              <button
                onClick={() => setSelectedDate(new Date())}
                className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-semibold hover:bg-stone-50 dark:hover:bg-stone-800"
              >
                Today
              </button>
              <button
                onClick={() =>
                  setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))
                }
                className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-semibold hover:bg-stone-50 dark:hover:bg-stone-800"
              >
                Next Month →
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 font-semibold border-b border-stone-200 dark:border-stone-800">
                  <th className="p-3">Day</th>
                  <th className="p-3">Hijri</th>
                  <th className="p-3">Fajr</th>
                  <th className="p-3">Sunrise</th>
                  <th className="p-3">Dhuhr</th>
                  <th className="p-3">Asr</th>
                  <th className="p-3">Maghrib</th>
                  <th className="p-3">Isha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-mono">
                {monthlySchedule.map((row) => (
                  <tr
                    key={row.day}
                    className={`transition ${
                      row.isToday
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 font-bold text-emerald-900 dark:text-emerald-200'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-800/40 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <td className="p-3 font-sans font-medium whitespace-nowrap">
                      {row.dateStr}
                      {row.isToday && (
                        <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold font-sans">
                          Today
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-sans text-stone-500 whitespace-nowrap">{row.hijriStr}</td>
                    <td className="p-3">{row.fajr}</td>
                    <td className="p-3 text-stone-400">{row.sunrise}</td>
                    <td className="p-3">{row.dhuhr}</td>
                    <td className="p-3">{row.asr}</td>
                    <td className="p-3 font-semibold text-emerald-700 dark:text-emerald-400">{row.maghrib}</td>
                    <td className="p-3">{row.isha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
