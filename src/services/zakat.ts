/**
 * Zakat and Islamic Financial Calculations
 * Implements standard 2.5% Hawl calculation on net qualifying surplus wealth.
 */

import { ZakatInputs, ZakatCalculationResult } from '../types';

// Standard classical Nisab weight measures
export const NISAB_WEIGHTS = {
  GOLD_GRAMS: 85,    // 85 grams of 24k gold (approx 7.5 tola / 20 mithqal)
  SILVER_GRAMS: 595, // 595 grams of pure silver (approx 52.5 tola / 200 dirham)
};

// Default indicative baseline market prices (users can adjust or override live)
export const DEFAULT_METAL_PRICES = {
  GOLD_PER_GRAM: 75.0,   // USD
  SILVER_PER_GRAM: 0.95, // USD
};

export function calculateZakat(inputs: ZakatInputs): ZakatCalculationResult {
  const goldValue = inputs.goldGrams * inputs.goldPricePerGram;
  const silverValue = inputs.silverGrams * inputs.silverPricePerGram;

  const totalAssets =
    (inputs.cashInHand || 0) +
    (inputs.cashInBank || 0) +
    goldValue +
    silverValue +
    (inputs.sharesAndInvestments || 0) +
    (inputs.businessMerchandise || 0) +
    (inputs.debtsOwedToYou || 0);

  const totalLiabilities = inputs.immediateLiabilities || 0;
  const netWealth = Math.max(0, totalAssets - totalLiabilities);

  // Determine Nisab threshold based on selection
  let nisabThreshold = 0;
  if (inputs.customNisabThreshold && inputs.customNisabThreshold > 0) {
    nisabThreshold = inputs.customNisabThreshold;
  } else if (inputs.nisabStandard === 'gold') {
    nisabThreshold = NISAB_WEIGHTS.GOLD_GRAMS * inputs.goldPricePerGram;
  } else {
    nisabThreshold = NISAB_WEIGHTS.SILVER_GRAMS * inputs.silverPricePerGram;
  }

  const isEligible = netWealth >= nisabThreshold;
  const zakatDue = isEligible ? Math.round(netWealth * 0.025 * 100) / 100 : 0;

  return {
    totalAssets: Math.round(totalAssets * 100) / 100,
    totalLiabilities: Math.round(totalLiabilities * 100) / 100,
    netWealth: Math.round(netWealth * 100) / 100,
    nisabThreshold: Math.round(nisabThreshold * 100) / 100,
    isEligible,
    zakatDue,
  };
}

/**
 * Islamic Finance Percentage Helper (Profit-Sharing, Mudarabah/Musharakah splits, Charitable portions)
 */
export function calculatePercentage(total: number, percent: number): number {
  if (!total || !percent) return 0;
  return Math.round((total * (percent / 100)) * 100) / 100;
}

/**
 * Converts Solar (Gregorian) Age into Lunar (Hijri) Age.
 * A lunar year is approximately 354.36 days vs 365.24 days solar (approx 1.0307 ratio).
 */
export function convertAgeSolarToLunar(solarYears: number): {
  lunarYears: number;
  lunarMonths: number;
  differenceDays: number;
} {
  const solarDays = solarYears * 365.2425;
  const lunarYearsExact = solarDays / 354.367;
  const lunarYears = Math.floor(lunarYearsExact);
  const remainingFraction = lunarYearsExact - lunarYears;
  const lunarMonths = Math.floor(remainingFraction * 12);
  const differenceDays = Math.round(solarDays - (lunarYears * 354.367));

  return {
    lunarYears,
    lunarMonths,
    differenceDays,
  };
}
