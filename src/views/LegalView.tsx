/**
 * NoorTools Legal, Privacy Policy & Verified Scholarly Directory
 * Clear zero-tracking policies, authentic scholarship attribution, and terms of service.
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  ExternalLink,
  Lock,
  HeartHandshake,
  BookCheck,
  CheckCircle2,
} from 'lucide-react';
import { VERIFIED_SCHOLARLY_BODIES } from '../data/legalResources';

export const LegalView: React.FC = () => {
  const [activeSubtab, setActiveSubtab] = useState<'privacy' | 'scholarship' | 'disclaimer'>('privacy');

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Trust, Ethics &amp; Transparency • الشفافية والأمانة</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
          Privacy &amp; Scholarly Standards
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Our sacred commitment to absolute user privacy, zero ad-tracking, and verified Islamic sources.
        </p>

        {/* Subtabs */}
        <div className="flex gap-2 pt-4">
          <button
            onClick={() => setActiveSubtab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubtab === 'privacy'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            Privacy &amp; No-Tracking
          </button>
          <button
            onClick={() => setActiveSubtab('scholarship')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubtab === 'scholarship'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            Scholarly Directory ({VERIFIED_SCHOLARLY_BODIES.length})
          </button>
          <button
            onClick={() => setActiveSubtab('disclaimer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubtab === 'disclaimer'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            Terms &amp; Calculations
          </button>
        </div>
      </div>

      {/* PRIVACY POLICY */}
      {activeSubtab === 'privacy' && (
        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-5 leading-relaxed text-xs sm:text-sm text-stone-600 dark:text-stone-300">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <strong>Core Promise:</strong> NoorTools does not sell user data, does not serve advertising trackers, and stores all spiritual logs locally on your device.
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base text-stone-900 dark:text-white">
              1. Zero Commercialization &amp; No Advertising
            </h3>
            <p>
              Worship and remembrance are sacred. NoorTools is completely non-commercial, free of third-party advertisements, behavioral ad networks, tracking cookies, and telemetry trackers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base text-stone-900 dark:text-white">
              2. Geographic Location Usage
            </h3>
            <p>
              Your geographic coordinates (latitude and longitude) are accessed strictly within your browser via the standard W3C Geolocation API or manual input solely to calculate solar angles for prayer times and the Great Circle Qibla direction. Your location is never sent to external servers or logged in any remote database.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base text-stone-900 dark:text-white">
              3. Offline Data Sovereignty
            </h3>
            <p>
              All bookmarks, Quran reading positions, daily Salah checklists, and Tasbih counters are saved in your browser's local HTML5 storage (`localStorage`). You retain 100% control to export or permanently erase your data at any time via the Settings view.
            </p>
          </div>
        </div>
      )}

      {/* SCHOLARLY DIRECTORY */}
      {activeSubtab === 'scholarship' && (
        <div className="space-y-4">
          <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-xl text-xs text-stone-600 dark:text-stone-300 flex items-center gap-2">
            <BookCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              For specific legal rulings (Fatwas) or personalized marital/financial disputes, please consult verified scholarly bodies directly:
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VERIFIED_SCHOLARLY_BODIES.map((body) => (
              <div
                key={body.id}
                className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                      {body.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 shrink-0">
                      {body.location}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                    {body.description}
                  </p>

                  <div className="text-[11px] text-emerald-800 dark:text-emerald-400 font-medium mt-2">
                    Specialty: {body.specialty}
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex justify-end">
                  <a
                    href={body.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    Official Portal
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TERMS & DISCLAIMERS */}
      {activeSubtab === 'disclaimer' && (
        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-base text-stone-900 dark:text-white">
              Astronomical Timetable Disclaimer
            </h3>
            <p>
              Prayer times calculated by NoorTools utilize established mathematical formulas derived from solar declination and local horizon angles. While highly accurate, atmospheric factors, local terrain elevation, and regional convention variations can produce minute differences. When praying in congregation, always follow the local masjid timetable.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-base text-stone-900 dark:text-white">
              Zakat Calculation Guidance
            </h3>
            <p>
              The Zakat calculator is an educational planning utility based on the consensus 2.5% rate on qualifying surplus wealth. For intricate business assets, mixed partnership portfolios, or complex inheritance scenarios, consult a qualified Islamic financial scholar or mufti.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
