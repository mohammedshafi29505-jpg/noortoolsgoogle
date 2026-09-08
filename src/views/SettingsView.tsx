/**
 * NoorTools Settings View
 * Calculation methods, Asr juristic school, Quran reciter preferences,
 * audio/vibration toggles, and data export/import/backup.
 */

import React, { useState } from 'react';
import {
  Settings,
  MapPin,
  Moon,
  Volume2,
  Vibrate,
  Download,
  Upload,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Info,
} from 'lucide-react';
import { UserSettings, CalculationMethod, AsrMadhhab } from '../types';
import { storageService } from '../services/storage';

interface SettingsViewProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [clearConfirmed, setClearConfirmed] = useState(false);

  const handleExportData = () => {
    const backupJson = storageService.exportAllData();
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noortools-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportMessage('Backup downloaded successfully!');
    setTimeout(() => setExportMessage(null), 3000);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storageService.importData(content);
      if (success) {
        setExportMessage('Data restored successfully! Please refresh.');
        window.location.reload();
      } else {
        setExportMessage('Failed to import backup file. Ensure valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearAll = () => {
    if (!clearConfirmed) {
      setClearConfirmed(true);
      return;
    }
    storageService.clearAll();
    window.location.reload();
  };

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          <Settings className="w-4 h-4" />
          <span>Application Settings • الإعدادات والتفضيلات</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
          Preferences &amp; Configuration
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Customize prayer calculation methods, Quran defaults, and manage your private offline data.
        </p>
      </div>

      {/* Prayer & Geographic Calculations */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-600" />
          Prayer Times &amp; Astronomical Calculations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
              Calculation Method
            </label>
            <select
              value={settings.calculationMethod}
              onChange={(e) =>
                onUpdateSettings({ calculationMethod: e.target.value as CalculationMethod })
              }
              className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
            >
              <option value="MWL">Muslim World League (MWL - 18°/17°)</option>
              <option value="ISNA">ISNA (North America - 15°/15°)</option>
              <option value="Egypt">Egyptian General Authority (19.5°/17.5°)</option>
              <option value="Makkah">Umm al-Qura University, Makkah</option>
              <option value="Karachi">University of Islamic Sciences, Karachi (18°/18°)</option>
              <option value="Gulf">Gulf Region (19.5° + 90 min)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
              Asr Juristic Madhhab
            </label>
            <select
              value={settings.madhhab}
              onChange={(e) =>
                onUpdateSettings({ madhhab: e.target.value as AsrMadhhab })
              }
              className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
            >
              <option value="shafii">Standard / Shafi'i, Maliki, Hanbali (1x Shadow)</option>
              <option value="hanafi">Hanafi (2x Shadow Length)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
              City / Display Name
            </label>
            <input
              type="text"
              value={settings.city}
              onChange={(e) => onUpdateSettings({ city: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
              Coordinates (Latitude, Longitude)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                value={settings.latitude}
                onChange={(e) =>
                  onUpdateSettings({ latitude: parseFloat(e.target.value) || 0 })
                }
                placeholder="Lat"
                className="w-1/2 text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
              />
              <input
                type="number"
                step="0.01"
                value={settings.longitude}
                onChange={(e) =>
                  onUpdateSettings({ longitude: parseFloat(e.target.value) || 0 })
                }
                placeholder="Long"
                className="w-1/2 text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interface & Notifications */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-emerald-600" />
          Feedback &amp; Theme
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-800">
            <div>
              <div className="font-semibold text-xs text-stone-900 dark:text-white">
                Dark Mode Theme
              </div>
              <div className="text-[11px] text-stone-400">
                Switch between warm desert night and light aesthetics
              </div>
            </div>
            <button
              onClick={() =>
                onUpdateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                settings.theme === 'dark'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-200 text-stone-800'
              }`}
            >
              {settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-800">
            <div>
              <div className="font-semibold text-xs text-stone-900 dark:text-white">
                Haptic Vibration
              </div>
              <div className="text-[11px] text-stone-400">
                Tactile feedback when counting Tasbih on mobile devices
              </div>
            </div>
            <button
              onClick={() =>
                onUpdateSettings({ vibrationEnabled: !settings.vibrationEnabled })
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                settings.vibrationEnabled
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-200 text-stone-800'
              }`}
            >
              {settings.vibrationEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </div>

      {/* Data Privacy & Backup */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
          <Download className="w-4 h-4 text-emerald-600" />
          Offline Privacy &amp; Data Backup
        </h3>
        <p className="text-xs text-stone-500">
          NoorTools respects user privacy: zero trackers, zero advertisements, and zero remote data harvesting. All your bookmarks, reading progress, and prayer logs reside solely inside your local browser.
        </p>

        {exportMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {exportMessage}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleExportData}
            className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4" />
            Export Backup (JSON)
          </button>

          <label className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5 transition cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Restore Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </label>

          <button
            onClick={handleClearAll}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              clearConfirmed
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            {clearConfirmed ? 'Click Again to Confirm Reset' : 'Clear All Local Data'}
          </button>
        </div>
      </div>
    </div>
  );
};
