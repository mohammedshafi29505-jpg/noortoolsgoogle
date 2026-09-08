/**
 * NoorTools Comprehensive Zakat Calculator
 * 2.5% Hawl calculation on cash, precious metals, shares, and business inventory.
 * Dynamic Nisab thresholds (Gold/Silver) and Quranic recipient guidance.
 */

import React, { useState } from 'react';
import {
  Calculator,
  Coins,
  DollarSign,
  Info,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { ZakatInputs } from '../types';
import { calculateZakat, NISAB_WEIGHTS, DEFAULT_METAL_PRICES } from '../services/zakat';

export const ZakatCalculatorView: React.FC = () => {
  const [inputs, setInputs] = useState<ZakatInputs>({
    cashInHand: 2500,
    cashInBank: 8000,
    goldGrams: 20,
    goldPricePerGram: DEFAULT_METAL_PRICES.GOLD_PER_GRAM,
    silverGrams: 0,
    silverPricePerGram: DEFAULT_METAL_PRICES.SILVER_PER_GRAM,
    sharesAndInvestments: 1200,
    businessMerchandise: 0,
    debtsOwedToYou: 0,
    immediateLiabilities: 1500,
    nisabStandard: 'silver',
  });

  const result = calculateZakat(inputs);

  const handleInputChange = (field: keyof ZakatInputs, val: string | number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: typeof val === 'number' ? val : parseFloat(val) || 0,
    }));
  };

  const handleReset = () => {
    setInputs({
      cashInHand: 0,
      cashInBank: 0,
      goldGrams: 0,
      goldPricePerGram: DEFAULT_METAL_PRICES.GOLD_PER_GRAM,
      silverGrams: 0,
      silverPricePerGram: DEFAULT_METAL_PRICES.SILVER_PER_GRAM,
      sharesAndInvestments: 0,
      businessMerchandise: 0,
      debtsOwedToYou: 0,
      immediateLiabilities: 0,
      nisabStandard: 'silver',
    });
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Calculator className="w-4 h-4" />
            <span>Third Pillar of Islam • حساب الزكاة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
            Zakat Calculator
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Calculate your obligatory 2.5% Zakat on qualifying surplus wealth held for one lunar year (Hawl).
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-xs font-semibold text-stone-600 dark:text-stone-300 flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Values
        </button>
      </div>

      {/* Main Results Card */}
      <div
        className={`p-6 rounded-3xl border shadow-md transition ${
          result.isEligible
            ? 'bg-linear-to-br from-emerald-950 to-stone-950 text-white border-emerald-800'
            : 'bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-white border-stone-300 dark:border-stone-800'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-2">
            <div className="flex items-center gap-2">
              {result.isEligible ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-stone-950">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Wealth Exceeds Nisab Threshold
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Below Nisab (No Zakat Due)
                </span>
              )}
            </div>

            <div className="text-xs opacity-75">
              Net Zakatable Wealth: <strong>${result.netWealth.toLocaleString()}</strong> • Nisab Threshold:{' '}
              <strong>${result.nisabThreshold.toLocaleString()}</strong> ({inputs.nisabStandard} standard)
            </div>

            <p className="text-xs opacity-70">
              {result.isEligible
                ? 'Your net qualifying surplus has met or exceeded the Nisab threshold. If held for one lunar year, 2.5% is obligatory.'
                : 'Your net assets are below the Nisab threshold. Zakat is not mandatory for you, though voluntary charity (Sadaqah) is always encouraged.'}
            </p>
          </div>

          <div className="md:col-span-5 text-right bg-white/5 p-4 rounded-2xl border border-white/10">
            <span className="text-xs uppercase font-bold tracking-wider opacity-70">
              Total Zakat Due (2.5%)
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 mt-1">
              ${result.zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] opacity-60">Payable to eligible recipients</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Inputs on Left, Nisab Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Asset Breakdown Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Cash & Liquid Assets */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              1. Cash &amp; Liquid Funds
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Cash in Hand ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.cashInHand}
                  onChange={(e) => handleInputChange('cashInHand', e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Cash in Bank Accounts ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.cashInBank}
                  onChange={(e) => handleInputChange('cashInBank', e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Gold & Silver Assets */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-500" />
              2. Gold &amp; Silver Bullion / Jewelry
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Gold Weight (Grams)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.goldGrams}
                  onChange={(e) => handleInputChange('goldGrams', e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Gold Price / Gram ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.goldPricePerGram}
                  onChange={(e) => handleInputChange('goldPricePerGram', e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Silver Weight (Grams)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.silverGrams}
                  onChange={(e) => handleInputChange('silverGrams', e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Silver Price / Gram ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.silverPricePerGram}
                  onChange={(e) => handleInputChange('silverPricePerGram', e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Investments, Business Goods & Debts */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-600" />
              3. Investments &amp; Business Assets
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Stocks &amp; Mutual Funds ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.sharesAndInvestments}
                  onChange={(e) => handleInputChange('sharesAndInvestments', e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Business Merchandise for Sale ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.businessMerchandise}
                  onChange={(e) => handleInputChange('businessMerchandise', e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                  Good Debts Owed to You ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inputs.debtsOwedToYou}
                  onChange={(e) => handleInputChange('debtsOwedToYou', e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Deductible Immediate Liabilities */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2 text-rose-700 dark:text-rose-400">
              <AlertCircle className="w-4 h-4" />
              4. Deductible Immediate Liabilities
            </h3>
            <p className="text-xs text-stone-500">
              Only bills, rent, and loan payments due right now may be subtracted from gross assets.
            </p>

            <div>
              <label className="text-xs font-semibold text-stone-600 dark:text-stone-300 block mb-1">
                Immediate Debts &amp; Overdue Bills ($)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.immediateLiabilities}
                onChange={(e) => handleInputChange('immediateLiabilities', e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Nisab Standards & Eight Recipients */}
        <div className="lg:col-span-5 space-y-6">
          {/* Nisab Benchmark Selector */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-600" />
              Nisab Standard Selection
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Many contemporary scholars recommend using the <strong>Silver standard</strong> because it allows earlier eligibility and benefits more impoverished families.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleInputChange('nisabStandard', 'silver')}
                className={`p-3 rounded-xl border text-center transition ${
                  inputs.nisabStandard === 'silver'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                    : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                <div className="text-xs">Silver Standard</div>
                <div className="text-[10px] opacity-75">595g = ${(595 * inputs.silverPricePerGram).toFixed(0)}</div>
              </button>

              <button
                onClick={() => handleInputChange('nisabStandard', 'gold')}
                className={`p-3 rounded-xl border text-center transition ${
                  inputs.nisabStandard === 'gold'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold'
                    : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                <div className="text-xs">Gold Standard</div>
                <div className="text-[10px] opacity-75">85g = ${(85 * inputs.goldPricePerGram).toFixed(0)}</div>
              </button>
            </div>
          </div>

          {/* The 8 Eligible Recipients in the Quran (Surah At-Tawbah 9:60) */}
          <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              The 8 Quranic Categories (Asnaf)
            </h3>
            <p className="text-xs text-stone-500">
              Surah At-Tawbah (9:60) designates strictly who can receive Zakat funds:
            </p>

            <ol className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li><strong>Al-Fuqara:</strong> The ultra-poor who possess virtually nothing.</li>
              <li><strong>Al-Masakeen:</strong> The destitute whose income falls short of basic needs.</li>
              <li><strong>Al-Amilina Alayha:</strong> Appointed Zakat administrators.</li>
              <li><strong>Al-Mu'allafatu Qulubuhum:</strong> Those whose hearts are being reconciled.</li>
              <li><strong>Fir-Riqaab:</strong> Freeing captives and helping indentured workers.</li>
              <li><strong>Al-Gharimeen:</strong> Those burdened by overwhelming debt.</li>
              <li><strong>Fi Sabeelillah:</strong> In the cause of Allah.</li>
              <li><strong>Ibnus-Sabeel:</strong> Stranded travelers in need of assistance.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
