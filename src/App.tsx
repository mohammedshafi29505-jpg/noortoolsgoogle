/**
 * NoorTools — Main Application Root & Router
 * Single-pass full build of a comprehensive Islamic web platform.
 * Ad-free, tracking-free, offline-ready with 40+ authentic tools and features.
 */

import React, { useState, useEffect } from 'react';
import {
  NavigationTab,
  UserSettings,
} from './types';
import { BRAND } from './config/brand';
import { storageService } from './services/storage';
import { usePWAInstall, useOnlineStatus } from './hooks/usePWAInstall';
import { PrayerLocationProvider } from './context/PrayerLocationContext';

// Components
import { Navigation } from './components/Navigation';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Views
import { HomeView } from './views/HomeView';
import { DashboardView } from './views/DashboardView';
import { PrayerTimesView } from './views/PrayerTimesView';
import { QuranView } from './views/QuranView';
import { HadithView } from './views/HadithView';
import { StoriesView } from './views/StoriesView';
import { DuasView } from './views/DuasView';
import { QiblaView } from './views/QiblaView';
import { MosqueFinderView } from './views/MosqueFinderView';
import { TasbihView } from './views/TasbihView';
import { SalahTrackerView } from './views/SalahTrackerView';
import { ZakatCalculatorView } from './views/ZakatCalculatorView';
import { RamadanView } from './views/RamadanView';
import { NamesOfAllahView } from './views/NamesOfAllahView';
import { GuidesView } from './views/GuidesView';
import { FavoritesView } from './views/FavoritesView';
import { SettingsView } from './views/SettingsView';
import { LegalView } from './views/LegalView';

import {
  WifiOff,
  Download,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [navParams, setNavParams] = useState<{
    surahId?: number;
    duaId?: string;
    nameNumber?: number;
    initialCategory?: any;
  }>({});

  const [settings, setSettings] = useState<UserSettings>(() =>
    storageService.getSettings()
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // PWA & Online Hook
  const { isInstallable, install } = usePWAInstall();
  const isOnline = useOnlineStatus();

  // Apply dark mode class to HTML root
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Keyboard shortcut for Global Search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = storageService.saveSettings(newSettings);
    setSettings(updated);
  };

  const handleNavigate = (
    tab: NavigationTab,
    params?: { surahId?: number; duaId?: string; nameNumber?: number; initialCategory?: any }
  ) => {
    setCurrentTab(tab);
    if (params) {
      setNavParams(params);
    }
    // Scroll smoothly to top on tab transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PrayerLocationProvider settings={settings} onUpdateSettings={handleUpdateSettings}>
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs font-semibold px-4 py-1.5 flex items-center justify-center gap-2 shadow-sm">
          <WifiOff className="w-3.5 h-3.5" />
          <span>You are currently offline. NoorTools local calculations and saved content remain fully accessible.</span>
        </div>
      )}

      {/* Global Navigation Bar */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={(tab) => handleNavigate(tab)}
        onOpenSearch={() => setIsSearchOpen(true)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {(currentTab === 'home' || currentTab === 'tools') && (
          <HomeView
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardView
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'prayer-times' && (
          <PrayerTimesView
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onNavigateQibla={() => handleNavigate('qibla')}
          />
        )}

        {currentTab === 'qibla' && (
          <QiblaView settings={settings} />
        )}

        {currentTab === 'quran' && (
          <QuranView
            initialSurahId={navParams.surahId}
            settings={settings}
          />
        )}

        {currentTab === 'hadith' && (
          <HadithView />
        )}

        {currentTab === 'stories' && (
          <StoriesView />
        )}

        {currentTab === 'duas' && (
          <DuasView
            initialCategory={navParams.initialCategory}
            initialDuaId={navParams.duaId}
          />
        )}

        {currentTab === 'tasbih' && (
          <TasbihView settings={settings} />
        )}

        {currentTab === 'salah-tracker' && (
          <SalahTrackerView />
        )}

        {currentTab === 'zakat' && (
          <ZakatCalculatorView />
        )}

        {currentTab === 'ramadan' && (
          <RamadanView settings={settings} />
        )}

        {(currentTab === 'names' || currentTab === 'names-of-allah') && (
          <NamesOfAllahView initialNameNumber={navParams.nameNumber} />
        )}

        {(currentTab === 'guides' || currentTab === 'salah-guide' || currentTab === 'wudu-guide' || currentTab === 'learning') && (
          <GuidesView />
        )}

        {currentTab === 'mosques' && (
          <MosqueFinderView settings={settings} />
        )}

        {(currentTab === 'favorites' || currentTab === 'library') && (
          <FavoritesView onNavigate={handleNavigate} />
        )}

        {currentTab === 'settings' && (
          <SettingsView
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        )}

        {(currentTab === 'legal' || currentTab === 'about' || currentTab === 'privacy') && (
          <LegalView />
        )}
      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Footer */}
      <footer className="bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 py-10 mt-12 mb-16 sm:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  ن
                </div>
                <span className="font-extrabold text-xl tracking-tight text-emerald-950 dark:text-white">
                  {BRAND.name}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {BRAND.tagline}
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-stone-600 dark:text-stone-300">
              <button
                onClick={() => handleNavigate('prayer-times')}
                className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
              >
                Prayer Times
              </button>
              <button
                onClick={() => handleNavigate('qibla')}
                className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
              >
                Qibla Finder
              </button>
              <button
                onClick={() => handleNavigate('quran')}
                className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
              >
                Holy Quran
              </button>
              <button
                onClick={() => handleNavigate('duas')}
                className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
              >
                Authentic Duas
              </button>
              <button
                onClick={() => handleNavigate('tasbih')}
                className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
              >
                Digital Tasbih
              </button>
              <button
                onClick={() => handleNavigate('zakat')}
                className="hover:text-emerald-700 dark:hover:text-emerald-400 transition"
              >
                Zakat Calculator
              </button>
              <button
                onClick={() => handleNavigate('legal')}
                className="hover:text-emerald-700 dark:hover:text-emerald-400 transition flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Privacy &amp; Scholarly Ethics
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Free Forever • Ad-Free • Zero Trackers • Respects User Privacy</span>
            </div>

            {isInstallable && (
              <button
                onClick={install}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold flex items-center gap-1.5 hover:bg-emerald-100 transition"
              >
                <Download className="w-3.5 h-3.5" />
                Install Web App (PWA)
              </button>
            )}

            <div className="text-center sm:text-right text-[11px]">
              &copy; {new Date().getFullYear()} NoorTools. Dedicated to the Muslim Ummah worldwide.
            </div>
          </div>
        </div>
      </footer>
    </div>
    </PrayerLocationProvider>
  );
}
