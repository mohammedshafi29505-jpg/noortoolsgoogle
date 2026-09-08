/**
 * Authentic Daily Islamic Reminders
 * Strictly based on authentic Quranic verses and verified prophetic wisdom.
 */

import { DailyReminder } from '../types';

export const DAILY_REMINDERS: DailyReminder[] = [
  {
    id: 'rem_1',
    dayOfYear: 1,
    theme: 'Gratitude & Abundance',
    arabicText: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    quote: 'If you are grateful, I will surely increase you [in favor].',
    source: 'Surah Ibrahim (14:7)',
    reflection:
      'Gratitude is not merely a polite gesture, but an active spiritual state that unlocks inner contentment and divine favor. Even in modest moments, acknowledging Allah’s gifts preserves blessings.'
  },
  {
    id: 'rem_2',
    dayOfYear: 2,
    theme: 'Patience & Steadfastness',
    arabicText: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    quote: 'Indeed, with hardship [will be] ease.',
    source: 'Surah Ash-Sharh (94:6)',
    reflection:
      'Difficulties do not precede relief by accident; ease is intrinsically interwoven within trials. Trusting Allah’s timing brings tranquility to the most testing trials.'
  },
  {
    id: 'rem_3',
    dayOfYear: 3,
    theme: 'Excellence in Conduct (Ihsan)',
    quote: 'Verily, Allah has prescribed excellence (Ihsan) in all things.',
    source: 'Sahih Muslim (1955)',
    reflection:
      'Whatever your responsibility today — prayer, family, work, or speech — approach it with deliberate care, knowing that Allah loves those who strive for conscientious excellence.'
  },
  {
    id: 'rem_4',
    dayOfYear: 4,
    theme: 'Remembrance of the Divine',
    arabicText: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    quote: 'Unquestionably, by the remembrance of Allah hearts are assured.',
    source: 'Surah Ar-Ra\'d (13:28)',
    reflection:
      'When anxious or overwhelmed by worldly noise, returning the tongue and mind to SubhanAllah, Alhamdulillah, and Allahu Akbar restores clarity and serenity to the heart.'
  },
  {
    id: 'rem_5',
    dayOfYear: 5,
    theme: 'Kindness and Forgiveness',
    quote: 'Whoever does not show mercy will not be shown mercy.',
    source: 'Sahih al-Bukhari (5997); Sahih Muslim (2318)',
    reflection:
      'Holding grudges harms the bearer before anyone else. Forgiving people for small trespasses opens the door for Allah’s supreme forgiveness over our own faults.'
  },
  {
    id: 'rem_6',
    dayOfYear: 6,
    theme: 'Truthfulness and Integrity',
    quote: 'Truthfulness leads to righteousness, and righteousness leads to Paradise.',
    source: 'Sahih al-Bukhari (6094); Sahih Muslim (2607)',
    reflection:
      'Honesty creates consistency between our inner reality and outward character, providing unmatched peace of conscience in daily interactions.'
  },
  {
    id: 'rem_7',
    dayOfYear: 7,
    theme: 'Humility and Good Character',
    quote: 'Nothing is weightier on the Scale of the believer on the Day of Resurrection than good character.',
    source: 'Jami` at-Tirmidhi (2002) - Hasan Sahih',
    reflection:
      'A warm smile, generous listening, and patience with others can weigh heavier than countless voluntary rituals done without sincere character.'
  }
];

export function getTodayReminder(): DailyReminder {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = (dayOfYear - 1) % DAILY_REMINDERS.length;
  return DAILY_REMINDERS[index >= 0 ? index : 0];
}
