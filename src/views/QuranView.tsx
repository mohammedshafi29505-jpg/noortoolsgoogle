/**
 * NoorTools Quran Browser & Reader
 * 
 * Complete 114 Surahs directory, complete 30-Juz Index, authentic Ayah viewer,
 * verified translations, font sizing, bookmarks, and continuous audio recitation player.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Filter,
  Type,
  ExternalLink,
  Share2,
  Layers,
} from 'lucide-react';
import { SurahMetadata, Ayah, UserSettings, JuzMeta } from '../types';
import { SURAHS_LIST, getSurahAyahs } from '../data/surahs';
import { JUZ_LIST } from '../data/juz';
import { storageService } from '../services/storage';

interface QuranViewProps {
  initialSurahNumber?: number;
  initialSurahId?: number;
  settings?: UserSettings;
}

export const QuranView: React.FC<QuranViewProps> = ({
  initialSurahNumber,
  initialSurahId,
}) => {
  const defaultSurahNum = initialSurahId || initialSurahNumber || 1;

  const [selectedSurah, setSelectedSurah] = useState<SurahMetadata>(() => {
    return SURAHS_LIST.find((s) => s.number === defaultSurahNum) || SURAHS_LIST[0];
  });
  const [viewMode, setViewMode] = useState<'surahList' | 'juzList' | 'reader'>('reader');
  const [searchQuery, setSearchQuery] = useState('');
  const [revelationFilter, setRevelationFilter] = useState<'all' | 'Meccan' | 'Medinan'>('all');

  // Reader Customization State
  const [arabicFontSize, setArabicFontSize] = useState(26);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [activeAyahNumber, setActiveAyahNumber] = useState<number | null>(null);

  // Audio Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentReciter, setCurrentReciter] = useState('Alafasy');
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Bookmarks from storage
  const [bookmarkedKeys, setBookmarkedKeys] = useState<Set<string>>(() => {
    const list = storageService.getBookmarks().filter((b) => b.type === 'quran');
    return new Set(list.map((b) => `${b.surahNumber || b.surahId}:${b.ayahNumber}`));
  });

  // Last read position
  const lastRead = storageService.getLastRead();

  // Load ayahs for currently selected Surah
  const ayahs = useMemo(() => {
    return getSurahAyahs(selectedSurah.number);
  }, [selectedSurah.number]);

  // Audio reciter streaming URL builders
  const reciterConfig: Record<string, { name: string; urlPrefix: string }> = {
    Alafasy: {
      name: 'Mishary Rashid Alafasy',
      urlPrefix: 'https://server8.mp3quran.net/afs/',
    },
    AbdulBasit: {
      name: 'Abdul Basit (Mujawwad)',
      urlPrefix: 'https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/',
    },
    AlSudais: {
      name: 'Abdur-Rahman As-Sudais',
      urlPrefix: 'https://server11.mp3quran.net/sds/',
    },
  };

  const getAudioUrl = (surahNumber: number) => {
    const padded = surahNumber.toString().padStart(3, '0');
    return `${reciterConfig[currentReciter].urlPrefix}${padded}.mp3`;
  };

  // Handle Play / Pause
  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Audio playback notice:', e));
    }
  };

  // Switch Surah
  const handleSelectSurah = (surah: SurahMetadata) => {
    setSelectedSurah(surah);
    setViewMode('reader');
    storageService.saveLastRead({
      surahNumber: surah.number,
      ayahNumber: 1,
      surahName: surah.name,
    });
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.src = getAudioUrl(surah.number);
      audioRef.current.load();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to Surah via Juz selection
  const handleSelectJuz = (juz: JuzMeta) => {
    const targetSurah = SURAHS_LIST.find((s) => s.number === juz.startSurahNumber);
    if (targetSurah) {
      handleSelectSurah(targetSurah);
      setActiveAyahNumber(juz.startAyah);
    }
  };

  // Bookmark Toggle
  const toggleBookmark = (ayah: Ayah) => {
    const ayahNum = ayah.numberInSurah ?? ayah.ayahNumber;
    const key = `${selectedSurah.number}:${ayahNum}`;
    const newSet = new Set(bookmarkedKeys);
    if (newSet.has(key)) {
      newSet.delete(key);
      storageService.removeBookmark(key);
    } else {
      newSet.add(key);
      storageService.addBookmark({
        id: key,
        type: 'quran',
        title: `Surah ${selectedSurah.name} (${selectedSurah.arabicName}) - Ayah ${ayahNum}`,
        subtitle: ayah.translation,
        surahId: selectedSurah.number,
        surahNumber: selectedSurah.number,
        ayahNumber: ayahNum,
        dateAdded: new Date().toISOString(),
      });
    }
    setBookmarkedKeys(newSet);
  };

  // Filter Surahs
  const filteredSurahs = useMemo(() => {
    return SURAHS_LIST.filter((s) => {
      const matchesQuery =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.englishMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.arabicName.includes(searchQuery) ||
        s.number.toString() === searchQuery.trim();
      const matchesRevelation =
        revelationFilter === 'all' || s.revelationType === revelationFilter;
      return matchesQuery && matchesRevelation;
    });
  }, [searchQuery, revelationFilter]);

  // Filter Juz
  const filteredJuz = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return JUZ_LIST;
    return JUZ_LIST.filter(
      (j) =>
        j.number.toString() === q ||
        j.name.toLowerCase().includes(q) ||
        j.arabicName.includes(q) ||
        j.startSurahName.toLowerCase().includes(q) ||
        j.endSurahName.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={getAudioUrl(selectedSurah.number)}
        onTimeUpdate={() => {
          if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration || 1;
            setAudioProgress((current / duration) * 100);
          }
        }}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              The Noble Quran • القرآن الكريم
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-stone-900 dark:text-white mt-1 flex items-center gap-2">
            {viewMode === 'reader' ? (
              <span key="reader-title-span">
                <span>
                  {selectedSurah.number}. Surah {selectedSurah.name}
                </span>{' '}
                <span className="font-arabic text-emerald-800 dark:text-emerald-300 font-semibold">
                  ({selectedSurah.arabicName})
                </span>
              </span>
            ) : viewMode === 'juzList' ? (
              <span key="juz-title-span">30 Ajza' Directory (الأجزاء)</span>
            ) : (
              <span key="surah-title-span">114 Surahs Directory</span>
            )}
          </h1>
          <p className="text-xs text-stone-500">
            {viewMode === 'reader'
              ? `${selectedSurah.englishMeaning} • ${selectedSurah.ayahCount} Verses • ${selectedSurah.revelationType} Revelation`
              : 'Verified recitation, clear translation, and ayah study'}
          </p>
        </div>

        {/* View Mode & Last Read Jump */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setViewMode('surahList')}
            className={`px-3 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition ${
              viewMode === 'surahList'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            114 Surahs
          </button>

          <button
            onClick={() => setViewMode('juzList')}
            className={`px-3 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition ${
              viewMode === 'juzList'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            30 Juz
          </button>

          {viewMode !== 'reader' && (
            <button
              onClick={() => setViewMode('reader')}
              className="px-3 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition"
            >
              Reader Mode
            </button>
          )}

          {lastRead && (
            <button
              onClick={() => {
                const target = SURAHS_LIST.find((s) => s.number === lastRead.surahNumber);
                if (target) handleSelectSurah(target);
              }}
              className="px-3 py-2 rounded-xl border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 font-medium text-xs flex items-center gap-1.5 transition"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              Last Read ({lastRead.surahNumber}:{lastRead.ayahNumber})
            </button>
          )}
        </div>
      </div>

      {/* VIEW: 30 JUZ INDEX */}
      {viewMode === 'juzList' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Juz by number (1-30), Arabic title, or Surah name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm focus:outline-none focus:border-emerald-500 text-stone-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredJuz.map((juz) => (
              <div
                key={`juz-card-${juz.number}`}
                id={`juz-card-${juz.number}`}
                onClick={() => handleSelectJuz(juz)}
                className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:shadow-xs transition cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-sm flex items-center justify-center font-mono group-hover:bg-emerald-600 group-hover:text-white transition">
                    {juz.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                      Juz {juz.number}: {juz.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Starts: {juz.startSurahName} ({juz.startAyah})
                    </p>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      Ends: {juz.endSurahName} ({juz.endAyah}) • Page {juz.pageNumber}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-arabic text-lg font-bold text-emerald-900 dark:text-emerald-200">
                    {juz.arabicName}
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                    Read Juz →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: SURAH LIST DIRECTORY */}
      {viewMode === 'surahList' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Surah by name, number, meaning, or Arabic (e.g. Al-Kahf, 18, Cave)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm focus:outline-none focus:border-emerald-500 text-stone-900 dark:text-white"
              />
            </div>

            <div className="sm:col-span-4 flex items-center gap-2">
              <button
                onClick={() => setRevelationFilter('all')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition ${
                  revelationFilter === 'all'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
                }`}
              >
                All (114)
              </button>
              <button
                onClick={() => setRevelationFilter('Meccan')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition ${
                  revelationFilter === 'Meccan'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
                }`}
              >
                Meccan (86)
              </button>
              <button
                onClick={() => setRevelationFilter('Medinan')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition ${
                  revelationFilter === 'Medinan'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
                }`}
              >
                Medinan (28)
              </button>
            </div>
          </div>

          {/* Surah Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSurahs.map((surah) => (
              <div
                key={`surah-card-${surah.number}`}
                id={`surah-card-${surah.number}`}
                onClick={() => handleSelectSurah(surah)}
                className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:shadow-xs transition cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center font-bold text-stone-700 dark:text-stone-300 text-sm group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 group-hover:text-emerald-700 transition">
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                      {surah.name}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {surah.englishMeaning}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-400 mt-0.5">
                      <span>{surah.ayahCount} Ayahs</span>
                      <span>•</span>
                      <span>{surah.revelationType}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-arabic text-lg font-bold text-emerald-900 dark:text-emerald-200">
                    {surah.arabicName}
                  </div>
                  <span className="text-[10px] text-stone-400">
                    Order #{surah.revelationOrder}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: ACTIVE SURAH READER */}
      {viewMode === 'reader' && (
        <div className="space-y-6">
          {/* Reader Top Controls & Audio Player Bar */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
            {/* Audio Reciter & Player */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                id="audio-play-toggle-btn"
                onClick={togglePlayAudio}
                className="w-11 h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-xs transition"
                title={isPlaying ? 'Pause Recitation' : 'Play Full Surah Recitation'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div>
                <div className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <span>Reciter:</span>
                  <select
                    value={currentReciter}
                    onChange={(e) => {
                      setCurrentReciter(e.target.value);
                      if (audioRef.current) {
                        audioRef.current.pause();
                        setIsPlaying(false);
                      }
                    }}
                    className="bg-stone-100 dark:bg-stone-800 border-none rounded-md px-2 py-0.5 text-xs text-stone-800 dark:text-stone-200 font-medium focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Alafasy">Mishary Rashid Alafasy</option>
                    <option value="AbdulBasit">Abdul Basit (Mujawwad)</option>
                    <option value="AlSudais">Abdur-Rahman As-Sudais</option>
                  </select>
                </div>
                <div className="w-36 sm:w-48 h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Typography & Display Toggles */}
            <div className="flex items-center gap-3">
              {/* Font Size Adjuster */}
              <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 gap-1">
                <button
                  onClick={() => setArabicFontSize((s) => Math.max(20, s - 2))}
                  className="px-2 py-1 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 rounded-lg"
                  title="Smaller Arabic font"
                >
                  A-
                </button>
                <span className="text-[11px] font-mono px-1 text-stone-500">{arabicFontSize}px</span>
                <button
                  onClick={() => setArabicFontSize((s) => Math.min(42, s + 2))}
                  className="px-2 py-1 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 rounded-lg"
                  title="Larger Arabic font"
                >
                  A+
                </button>
              </div>

              {/* Translation Toggle */}
              <button
                onClick={() => setShowTranslation((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  showTranslation
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                }`}
              >
                Translation
              </button>

              {/* Transliteration Toggle */}
              <button
                onClick={() => setShowTransliteration((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  showTransliteration
                    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                }`}
              >
                Transliteration
              </button>
            </div>
          </div>

          {/* Surah Bismillah Banner (Except Surah 9 At-Tawbah) */}
          {selectedSurah.number !== 9 && (
            <div className="text-center py-6 border-b border-stone-200 dark:border-stone-800">
              <div
                className="font-arabic text-emerald-950 dark:text-emerald-200 font-bold select-none"
                style={{ fontSize: `${arabicFontSize + 4}px` }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 italic font-serif">
                "In the name of Allah, the Entirely Merciful, the Especially Merciful."
              </p>
            </div>
          )}

          {/* Ayahs Display Stream */}
          <div className="space-y-4">
            {ayahs.map((ayah, index) => {
              const ayahNum = ayah.ayahNumber || ayah.numberInSurah || index + 1;
              const ayahKey = `ayah-${selectedSurah.number}-${ayahNum}-${index}`;
              const bookmarkKey = `${selectedSurah.number}:${ayahNum}`;
              const isBookmarked = bookmarkedKeys.has(bookmarkKey);
              const isActive = activeAyahNumber === ayahNum;
              const arabicContent = ayah.arabicText || (ayah as any).arabic || '';

              return (
                <div
                  key={ayahKey}
                  id={`ayah-card-${ayahNum}`}
                  onClick={() => setActiveAyahNumber(ayahNum)}
                  className={`p-5 rounded-2xl border transition ${
                    isActive
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/60 shadow-xs'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                  }`}
                >
                  {/* Ayah Header info & bookmark button */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 dark:border-stone-800 text-xs text-stone-400">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center font-mono">
                        {ayahNum}
                      </span>
                      <span className="font-semibold text-stone-600 dark:text-stone-400">
                        {selectedSurah.name} {selectedSurah.number}:{ayahNum}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(ayah);
                        }}
                        className={`p-1.5 rounded-lg transition ${
                          isBookmarked
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
                            : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Ayah'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text (Uthmanic Script, right-aligned) */}
                  <div
                    dir="rtl"
                    className="font-arabic text-stone-950 dark:text-stone-100 font-bold leading-loose text-right select-text py-2"
                    style={{ fontSize: `${arabicFontSize}px` }}
                  >
                    {arabicContent}
                    <span className="inline-flex items-center justify-center w-7 h-7 mx-2 rounded-full border border-emerald-400 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold align-middle select-none">
                      {ayahNum}
                    </span>
                  </div>

                  {/* Transliteration */}
                  {showTransliteration && ayah.transliteration && (
                    <div className="text-xs text-stone-500 dark:text-stone-400 italic font-mono pt-2">
                      {ayah.transliteration}
                    </div>
                  )}

                  {/* Verified English Translation */}
                  {showTranslation && ayah.translation && (
                    <div className="text-sm text-stone-800 dark:text-stone-200 pt-2 leading-relaxed font-sans">
                      {ayah.translation}
                    </div>
                  )}

                  {/* Tafsir / Reflection summary if present */}
                  {ayah.tafsirSummary && (
                    <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800/60 text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-semibold text-emerald-800 dark:text-emerald-400">Reflection: </span>
                      {ayah.tafsirSummary}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Surah Prev / Next Pagination Bar */}
          <div className="flex items-center justify-between p-4 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
            {selectedSurah.number > 1 ? (
              <button
                onClick={() => {
                  const prev = SURAHS_LIST.find((s) => s.number === selectedSurah.number - 1);
                  if (prev) handleSelectSurah(prev);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-xs font-bold text-stone-800 dark:text-stone-200 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Surah
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => setViewMode('surahList')}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Surah Index (114)
            </button>

            {selectedSurah.number < 114 ? (
              <button
                onClick={() => {
                  const next = SURAHS_LIST.find((s) => s.number === selectedSurah.number + 1);
                  if (next) handleSelectSurah(next);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-bold text-white shadow-xs transition"
              >
                Next Surah
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
