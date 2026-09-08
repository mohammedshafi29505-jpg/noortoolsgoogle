/**
 * NoorTools Prayer & Worship Guides and Learning Modules
 * Illustrated step-by-step guides for Salah, Wudu, Janazah, and structured Islamic learning modules.
 */

import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Info,
  Sparkles,
  HelpCircle,
  GraduationCap,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { SALAH_GUIDE, WUDU_GUIDE } from '../data/guides';
import { ISLAMIC_MODULES } from '../data/learning';
import { storageService } from '../services/storage';

export const GuidesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'salah' | 'wudu' | 'modules'>('salah');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  // Lesson completions
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    return new Set(storageService.getCompletedLessons());
  });

  const toggleLesson = (lessonId: string) => {
    const isDone = completedLessons.has(lessonId);
    storageService.toggleLessonComplete(lessonId, !isDone);
    const updated = new Set(storageService.getCompletedLessons());
    setCompletedLessons(updated);
  };

  const selectedModule = ISLAMIC_MODULES.find((m) => m.id === selectedModuleId);

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          <GraduationCap className="w-4 h-4" />
          <span>Educational Curriculum &amp; Practice • دليل العبادات والتعلم</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
          Worship Guides &amp; Learning Hub
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Authentic step-by-step guidance for prayer, purification, and foundational Islamic knowledge.
        </p>

        {/* Navigation Subtabs */}
        <div className="flex gap-2 pt-4">
          <button
            onClick={() => {
              setActiveTab('salah');
              setSelectedModuleId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'salah'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            How to Pray (Salah)
          </button>
          <button
            onClick={() => {
              setActiveTab('wudu');
              setSelectedModuleId(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'wudu'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            Ablution (Wudu)
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'modules'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            Curriculum Modules ({ISLAMIC_MODULES.length})
          </button>
        </div>
      </div>

      {/* SALAH GUIDE TAB */}
      {activeTab === 'salah' && (
        <div className="space-y-6">
          {/* Prerequisites */}
          <div className="bg-amber-50 dark:bg-amber-950/40 p-5 rounded-2xl border border-amber-200/60 dark:border-amber-900/60 space-y-2">
            <h3 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              Conditions Prior to Beginning Salah (Shurut as-Salah)
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-950 dark:text-amber-200">
              {SALAH_GUIDE.prerequisites.map((p, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {SALAH_GUIDE.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <h3 className="font-bold text-base text-stone-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <span className="font-arabic text-lg text-emerald-800 dark:text-emerald-400 font-bold">
                    {step.arabicName}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {step.description}
                </p>

                {step.recitation && (
                  <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-xl space-y-2 border border-stone-100 dark:border-stone-700">
                    <div
                      dir="rtl"
                      className="font-arabic text-lg text-right text-emerald-950 dark:text-emerald-100 font-bold leading-loose"
                    >
                      {step.recitation.arabic}
                    </div>
                    <div className="text-xs text-stone-500 italic font-mono">
                      {step.recitation.transliteration}
                    </div>
                    <div className="text-xs text-stone-700 dark:text-stone-300 font-serif">
                      "{step.recitation.translation}"
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Common Mistakes */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Common Errors to Avoid in Prayer
            </h3>
            <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
              {SALAH_GUIDE.commonMistakes.map((m, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* WUDU GUIDE TAB */}
      {activeTab === 'wudu' && (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-950/40 p-5 rounded-2xl border border-blue-200/60 dark:border-blue-900/60 space-y-2">
            <h3 className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              Spiritual Significance of Purification (Taharah)
            </h3>
            <p className="text-xs text-blue-950 dark:text-blue-200 leading-relaxed">
              "Cleanliness is half of faith." (Sahih Muslim 223). Performing Wudu thoroughly washes away minor sins with every drop of water.
            </p>
          </div>

          <div className="space-y-3">
            {WUDU_GUIDE.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {step.stepNumber}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                      {step.title}
                    </h4>
                    <span className="font-arabic text-base text-blue-700 dark:text-blue-300 font-semibold">
                      {step.arabicName}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Nullifiers of Wudu */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider">
              Actions That Invalidate (Break) Wudu:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-300">
              {WUDU_GUIDE.nullifiers.map((n, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* CURRICULUM MODULES TAB */}
      {activeTab === 'modules' && (
        <div className="space-y-6">
          {!selectedModule ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ISLAMIC_MODULES.map((module) => {
                const totalLessons = module.lessons.length;
                const completedInModule = module.lessons.filter((l) =>
                  completedLessons.has(l.id)
                ).length;
                const percent = Math.round((completedInModule / totalLessons) * 100);

                return (
                  <div
                    key={module.id}
                    onClick={() => setSelectedModuleId(module.id)}
                    className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500 shadow-xs transition cursor-pointer flex flex-col justify-between space-y-4 group"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          {module.level}
                        </span>
                        <span className="text-xs text-stone-400 font-mono">
                          {completedInModule}/{totalLessons} Complete
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-stone-900 dark:text-white mt-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                        {module.title}
                      </h3>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                        {module.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        <span>Start Lessons</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedModuleId(null)}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                ← Back to All Curriculum Modules
              </button>

              <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {selectedModule.level}
                </span>
                <h2 className="text-2xl font-black text-stone-900 dark:text-white mt-2">
                  {selectedModule.title}
                </h2>
                <p className="text-xs text-stone-500 mt-1">{selectedModule.description}</p>
              </div>

              <div className="space-y-4">
                {selectedModule.lessons.map((lesson) => {
                  const isDone = completedLessons.has(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-base text-stone-900 dark:text-white">
                          {lesson.title}
                        </h4>

                        <button
                          onClick={() => toggleLesson(lesson.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {isDone ? 'Completed' : 'Mark Completed'}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                        {lesson.content}
                      </p>

                      <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-400">
                        <span>Key Takeaway: {lesson.keyTakeaway}</span>
                        {lesson.reference && (
                          <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                            {lesson.reference}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
