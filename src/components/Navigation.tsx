/**
 * NoorTools Responsive Navigation Architecture
 * Desktop Header with grouped navigation + Mobile Bottom Bar + Full Drawer Menu
 */

import React, { useState } from 'react';
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Clock,
  Compass,
  Building2,
  HeartHandshake,
  Sparkles,
  Calendar,
  CheckSquare,
  Bookmark,
  Settings,
  Search,
  Menu,
  X,
  Sun,
  Moon,
  Download,
  ShieldCheck,
  Info,
  Scale,
  GraduationCap,
  Droplets,
  Calculator,
  ChevronRight,
  Scroll,
  BookMarked,
} from 'lucide-react';
import { NavigationTab, ThemeMode, UserSettings } from '../types';
import { BRAND_CONFIG } from '../config/brand';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';

interface NavigationProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenSearch: () => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
  settings?: UserSettings;
  onUpdateSettings?: (newSettings: Partial<UserSettings>) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  theme: explicitTheme,
  onToggleTheme: explicitToggleTheme,
  settings,
  onUpdateSettings,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isInstallable, install } = usePWAInstall();
  const isOnline = useOnlineStatus();

  const theme: ThemeMode = explicitTheme || settings?.theme || 'light';

  const handleToggleTheme = () => {
    if (explicitToggleTheme) {
      explicitToggleTheme();
    } else if (onUpdateSettings && settings) {
      onUpdateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' });
    } else {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    }
  };

  const handleTabClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navGroups = [
    {
      label: 'Daily Essentials',
      items: [
        { id: 'home' as NavigationTab, label: 'Home', icon: Home, badge: '' },
        { id: 'dashboard' as NavigationTab, label: 'Daily Dashboard', icon: LayoutDashboard, badge: 'Live' },
        { id: 'prayer-times' as NavigationTab, label: 'Prayer Times', icon: Clock, badge: '' },
        { id: 'qibla' as NavigationTab, label: 'Qibla Finder', icon: Compass, badge: '' },
        { id: 'tasbih' as NavigationTab, label: 'Zikr / Tasbih', icon: Sparkles, badge: '' },
        { id: 'salah-tracker' as NavigationTab, label: 'Salah Tracker', icon: CheckSquare, badge: '' },
      ],
    },
    {
      label: 'Quran & Supplications',
      items: [
        { id: 'quran' as NavigationTab, label: 'Holy Quran', icon: BookOpen, badge: '114 Surahs' },
        { id: 'hadith' as NavigationTab, label: 'Hadith Library', icon: Scroll, badge: 'Authentic' },
        { id: 'stories' as NavigationTab, label: 'Islamic Stories', icon: BookMarked, badge: 'Prophets' },
        { id: 'duas' as NavigationTab, label: 'Dua Library', icon: HeartHandshake, badge: 'Authentic' },
        { id: 'names-of-allah' as NavigationTab, label: '99 Names of Allah', icon: Sparkles, badge: 'Asma ul Husna' },
      ],
    },
    {
      label: 'Community & Fasting',
      items: [
        { id: 'mosques' as NavigationTab, label: 'Mosque Finder', icon: Building2, badge: '' },
        { id: 'ramadan' as NavigationTab, label: 'Ramadan & Fasting', icon: Calendar, badge: 'Tracker' },
      ],
    },
    {
      label: 'Guides & Learning',
      items: [
        { id: 'salah-guide' as NavigationTab, label: 'Salah Guide', icon: CheckSquare, badge: 'Step-by-Step' },
        { id: 'wudu-guide' as NavigationTab, label: 'Wudu Guide', icon: Droplets, badge: 'Step-by-Step' },
        { id: 'learning' as NavigationTab, label: 'Islamic Learning', icon: GraduationCap, badge: '10 Topics' },
        { id: 'legal' as NavigationTab, label: 'Legal Resources', icon: Scale, badge: 'Academic' },
      ],
    },
    {
      label: 'Tools & Personal',
      items: [
        { id: 'tools' as NavigationTab, label: 'Calculators & Tools', icon: Calculator, badge: '' },
        { id: 'zakat' as NavigationTab, label: 'Zakat Calculator', icon: Calculator, badge: '2.5%' },
        { id: 'library' as NavigationTab, label: 'My Library', icon: Bookmark, badge: 'Saved' },
        { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings, badge: '' },
        { id: 'about' as NavigationTab, label: 'About NoorTools', icon: Info, badge: '' },
        { id: 'privacy' as NavigationTab, label: 'Privacy Policy', icon: ShieldCheck, badge: 'No Tracking' },
      ],
    },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
        {!isOnline && (
          <div className="bg-amber-600 text-white text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-1.5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            Offline Mode — Using cached data and local browser storage.
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-900 dark:bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shadow-sm group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 21.5L12 18L5.5 21.5L7 14.5L2 9.5L9 8.5L12 2Z" fill="currentColor" fillOpacity="0.2"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-emerald-950 dark:text-emerald-50 tracking-tight">
                  {BRAND_CONFIG.name}
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-semibold font-arabic">
                  {BRAND_CONFIG.arabicName}
                </span>
              </div>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 hidden sm:block truncate max-w-[240px]">
                {BRAND_CONFIG.tagline}
              </p>
            </div>
          </div>

          {/* Center Quick Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
              { id: 'quran' as NavigationTab, label: 'Quran', icon: BookOpen },
              { id: 'prayer-times' as NavigationTab, label: 'Prayers', icon: Clock },
              { id: 'duas' as NavigationTab, label: 'Duas', icon: HeartHandshake },
              { id: 'qibla' as NavigationTab, label: 'Qibla', icon: Compass },
              { id: 'tasbih' as NavigationTab, label: 'Tasbih', icon: Sparkles },
              { id: 'zakat' as NavigationTab, label: 'Zakat', icon: Calculator },
              { id: 'ramadan' as NavigationTab, label: 'Ramadan', icon: Calendar },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Header Action Controls */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            <button
              id="global-search-trigger"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 transition"
              title="Search all tools, Quran, and Duas"
            >
              <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Search NoorTools</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] rounded bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 text-stone-400">
                ⌘K
              </kbd>
            </button>

            {/* PWA Install Button (if browser supports install) */}
            {isInstallable && (
              <button
                id="header-pwa-install-btn"
                onClick={install}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition"
              >
                <Download className="w-3.5 h-3.5" />
                Install
              </button>
            )}

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-600" />
              )}
            </button>

            {/* All Tools Drawer Trigger */}
            <button
              id="all-tools-menu-btn"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
              aria-label="Open full tools menu"
            >
              <Menu className="w-5 h-5" />
              <span className="text-xs font-semibold hidden sm:inline">All Tools</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full Navigation Drawer Modal */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-stone-900 shadow-2xl border-l border-stone-200 dark:border-stone-800 flex flex-col">
              {/* Drawer Header */}
              <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-emerald-300 font-bold text-sm">
                    NT
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-stone-900 dark:text-white">
                      All NoorTools Modules
                    </h2>
                    <p className="text-xs text-stone-500">
                      Complete Islamic Toolkit (40+ features)
                    </p>
                  </div>
                </div>
                <button
                  id="close-drawer-btn"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {navGroups.map((group) => (
                  <div key={group.label} className="space-y-1.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 px-2">
                      {group.label}
                    </h3>
                    <div className="grid grid-cols-1 gap-1">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isSelected = currentTab === item.id;
                        return (
                          <button
                            key={item.id}
                            id={`drawer-link-${item.id}`}
                            onClick={() => handleTabClick(item.id)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-left transition ${
                              isSelected
                                ? 'bg-emerald-800 text-white font-semibold shadow-xs'
                                : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon
                                className={`w-4 h-4 ${
                                  isSelected
                                    ? 'text-emerald-300'
                                    : 'text-stone-400 dark:text-stone-500'
                                }`}
                              />
                              <span>{item.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.badge && (
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                    isSelected
                                      ? 'bg-emerald-900 text-emerald-200'
                                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                              <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 flex items-center justify-between text-xs text-stone-500">
                <span>NoorTools v{BRAND_CONFIG.version}</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  100% Ad-Free & Private
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {[
          { id: 'home' as NavigationTab, label: 'Home', icon: Home },
          { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
          { id: 'quran' as NavigationTab, label: 'Quran', icon: BookOpen },
          { id: 'prayer-times' as NavigationTab, label: 'Prayer', icon: Clock },
          { id: 'tasbih' as NavigationTab, label: 'Tasbih', icon: Sparkles },
        ].map((btn) => {
          const Icon = btn.icon;
          const isActive = currentTab === btn.id;
          return (
            <button
              key={btn.id}
              id={`mobile-tab-${btn.id}`}
              onClick={() => handleTabClick(btn.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[11px] font-medium transition ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="mt-0.5">{btn.label}</span>
            </button>
          );
        })}
        {/* Mobile More Drawer Button */}
        <button
          id="mobile-drawer-trigger"
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[11px] font-medium text-stone-500 dark:text-stone-400 hover:text-stone-800"
        >
          <Menu className="w-5 h-5 stroke-2" />
          <span className="mt-0.5">More</span>
        </button>
      </nav>
    </>
  );
};
