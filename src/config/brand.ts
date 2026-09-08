/**
 * NoorTools Central Configuration & Brand Standards
 */

export const BRAND_CONFIG = {
  name: 'NoorTools',
  arabicName: 'نُور الأدوات',
  tagline: 'Quran, Islamic Tools & Helpful Resources — All in One Place',
  version: '1.0.0',
  description:
    'A comprehensive, mobile-first, privacy-focused Islamic utility platform. Featuring authentic Duas, daily prayer schedules, interactive Qibla finder, 114 Surahs, Zakat calculator, Ramadan fasting tracker, and verified educational resources.',
  contactEmail: 'contact@noortools.app',
  social: {
    github: 'https://github.com',
    web: 'https://noortools.app',
  },
  disclaimers: {
    general:
      'NoorTools is dedicated to authentic, verified Islamic tools and references. We never fabricate religious claims or generate unverified fatwas.',
    legalFatwa:
      'NoorTools does not issue fatwas. For personal religious rulings, consult a qualified scholar.',
    zakat:
      'Zakat calculations are based on standard mathematical ratios (2.5%). Verify applicable Nisab and local Zakat rules with a qualified scholar or local Islamic charity.',
    qibla:
      'Compass readings rely on device hardware sensors and magnetic declination. Calibrate your device by moving it in a figure-8 motion before taking a reading.',
    prayerTimes:
      'Prayer times are calculated using recognized astronomical algorithms. Local mosques may adjust timings by a few minutes based on local consensus or physical observation.',
    unverifiedDataNotice:
      'Authentic verified data will be connected here.',
  },
  // Monetization Architecture: Architected for future expansion, strictly turned OFF by default.
  // No advertisements, no tracking scripts, no analytics, no payment gateways.
  monetization: {
    adsEnabled: false,
    donationsEnabled: false,
    sponsorshipEnabled: false,
    premiumFeaturesEnabled: false,
  },
  // Default Settings
  defaultSettings: {
    theme: 'light' as const,
    textSize: 'base' as const,
    highContrast: false,
    reducedMotion: false,
    haptics: true,
    soundEffects: false,
    prayerMethod: 'MWL' as const,
    calculationMethod: 'MWL' as const,
    asrMadhhab: 'standard' as const,
    madhhab: 'standard' as const,
    highLatitudeRule: 'none' as const,
    city: 'Makkah',
    latitude: 21.4225,
    longitude: 39.8262,
    location: {
      useGps: true,
      city: 'Makkah',
      country: 'Saudi Arabia',
      latitude: 21.4225,
      longitude: 39.8262,
    },
    notificationsEnabled: false,
    vibrationEnabled: true,
  },
};

export const BRAND = BRAND_CONFIG;
