/**
 * Structured Islamic Learning Modules across Core Curricula
 * Verified authentic content designed for students, families, and new learners.
 */

import { LearningLesson } from '../types';

export interface CurriculumLesson {
  id: string;
  title: string;
  content: string;
  keyTakeaway: string;
  reference?: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  level: 'Foundations' | 'Intermediate' | 'Advanced';
  description: string;
  lessons: CurriculumLesson[];
}

export const ISLAMIC_MODULES: CurriculumModule[] = [
  {
    id: 'mod_foundations_tawheed',
    title: 'Pillars of Faith & Monotheism (Aqeedah & Tawheed)',
    level: 'Foundations',
    description: 'The essence of Islamic belief: understanding the Oneness of Allah (Tawheed), the Six Articles of Faith, and avoiding spiritual compromise.',
    lessons: [
      {
        id: 'less_tawheed_1',
        title: 'The Meaning of La Ilaha Illallah',
        content: 'The Kalimah comprises two indispensable pillars: Negation (Nafy) of all false deities and worthy recipients of worship, followed by Affirmation (Ithbat) that all servitude, hope, fear, and devotion belong exclusively to Allah.',
        keyTakeaway: 'True monotheism requires both rejecting all idols/false deities and worshipping Allah alone.',
        reference: 'Surah Muhammad 47:19',
      },
      {
        id: 'less_tawheed_2',
        title: 'The Three Categories of Tawheed',
        content: 'Classical scholars categorized Tawheed into three interconnected dimensions: 1) Tawheed ar-Rububiyyah (Oneness of Lordship - that Allah alone is the Creator, Sustainer, and Sovereign); 2) Tawheed al-Uluhiyyah (Oneness of Worship - directing all acts of prayer, sacrifice, and oaths to Him alone); and 3) Tawheed al-Asma was-Sifat (Affirming Allah’s Divine Names and Attributes without distortion or comparison to creation).',
        keyTakeaway: 'Monotheism encompasses recognizing Allah as Sovereign, worshipping Him exclusively, and exalting His attributes.',
        reference: 'Surah Maryam 19:65',
      },
      {
        id: 'less_tawheed_3',
        title: 'The Six Pillars of Iman',
        content: 'As delineated in the famous Hadith of Jibreel, faith comprises belief in: 1) Allah, 2) His Angels, 3) His Revealed Books, 4) His Messengers, 5) The Last Day (Day of Judgment), and 6) Divine Decree (Qadar), both its pleasant and challenging aspects.',
        keyTakeaway: 'Belief must encompass all six articles without rejecting any part.',
        reference: 'Sahih Muslim 8',
      },
    ],
  },
  {
    id: 'mod_quran_sciences',
    title: 'The Holy Quran: Revelation & Preservation',
    level: 'Foundations',
    description: 'How the final revelation was received, transcribed, and memorized across generations without corruption.',
    lessons: [
      {
        id: 'less_quran_1',
        title: 'The Manner of Revelation (Wahy)',
        content: 'The Quran was revealed verbatim over a period of 23 years, addressing the evolving needs of the prophetic mission in Makkah and the burgeoning society in Madinah. The Prophet ﷺ experienced the descent of revelation through the Angel Jibreel with absolute clarity.',
        keyTakeaway: 'The revelation responded to real human circumstance while remaining timeless divine law.',
        reference: 'Surah Ash-Shu\'ara 26:192-195',
      },
      {
        id: 'less_quran_2',
        title: 'Compilation and Master Codices',
        content: 'During the lifetime of the Prophet ﷺ, verses were immediately memorized by hundreds of companions and written on parchment, leather, and shoulder blades. Under Caliph Abu Bakr (RA), it was gathered into one central volume, and Caliph Uthman (RA) distributed authenticated standard copies to prevent dialectical discrepancies.',
        keyTakeaway: 'Unbroken dual transmission - mass oral memorization (Tawatur) alongside rigorous written copies.',
        reference: 'Sahih al-Bukhari 4987',
      },
    ],
  },
  {
    id: 'mod_purification_salah',
    title: 'Deepening Prayer & Khushu\' (Spiritual Presence)',
    level: 'Intermediate',
    description: 'Elevating the five daily prayers from mechanical bodily movements to a profound spiritual conversation with the Creator.',
    lessons: [
      {
        id: 'less_salah_1',
        title: 'Attaining Khushu\' (Reverence & Focus)',
        content: 'Khushu\' is the stillness of the heart manifesting in stillness of the limbs. It is achieved by recognizing before Whom one stands, understanding the meanings of the Arabic verses recited, pausing between verses, and clearing the mind of worldly distractions prior to Takbir.',
        keyTakeaway: 'Salah without contemplation is like a body without a soul; reflect deeply on every verse.',
        reference: 'Surah Al-Mu\'minun 23:1-2',
      },
      {
        id: 'less_salah_2',
        title: 'The Sunan Rawatib (Voluntary Prayers Attached to Fard)',
        content: 'The Prophet ﷺ highly encouraged the 12 voluntary units (Rak\'ahs) attached to daily obligatory prayers: 2 before Fajr, 4 before Dhuhr and 2 after, 2 after Maghrib, and 2 after Isha. He informed that Allah builds a palace in Paradise for whoever safeguards them.',
        keyTakeaway: 'Voluntary prayers make up for shortcomings in our obligatory prayers on the Day of Judgment.',
        reference: 'Sunan at-Tirmidhi 414',
      },
    ],
  },
  {
    id: 'mod_financial_ethics',
    title: 'Islamic Financial Ethics & Zakat Principles',
    level: 'Intermediate',
    description: 'The spiritual economy: wealth as a divine trust, calculating obligations accurately, and avoiding usury (Riba) and exploitation.',
    lessons: [
      {
        id: 'less_zakat_1',
        title: 'The Philosophy of Zakat in Islam',
        content: 'Zakat literally signifies purification and growth. It is not an act of discretionary benevolence or state tax, but the legitimate right of the impoverished in the surplus wealth of the solvent. It purifies the soul from greed and circulates capital through society.',
        keyTakeaway: 'Zakat balances socioeconomic inequality and purifies accumulated wealth.',
        reference: 'Surah At-Tawbah 9:103',
      },
      {
        id: 'less_zakat_2',
        title: 'The Eight Categories of Zakat Recipients',
        content: 'The Quran explicitly restricted Zakat distribution to eight categories in Surah At-Tawbah (9:60): the poor (Fuqara), the needy (Masakin), administrators of Zakat, those whose hearts are to be reconciled, freeing captives/slaves, those overburdened with debt, in the cause of Allah, and the stranded traveler.',
        keyTakeaway: 'Zakat cannot be diverted to general infrastructure like buildings unless directly benefiting these categories.',
        reference: 'Surah At-Tawbah 9:60',
      },
    ],
  },
];

export const LEARNING_LESSONS: LearningLesson[] = [
  {
    id: 'learn_quran_1',
    category: 'Quran Basics',
    title: 'The Divine Preservation and Nature of the Holy Quran',
    difficulty: 'Beginner',
    readTimeMinutes: 4,
    summary: 'An exploration of the revelation, transmission, and unbroken oral and written preservation of the Quran from the Prophet ﷺ to today.',
    sections: [
      {
        heading: 'The Direct Word of Allah',
        content: 'The Quran is the verbatim word of Allah revealed to the Prophet Muhammad ﷺ through the Archangel Jibreel over 23 years. Unlike previous scriptures which were entrusted to human keepers, Allah Himself undertook the divine promise to safeguard the Quran from alteration.',
      },
      {
        heading: 'Oral Transmission and Written Compilation',
        content: 'The primary method of Quranic preservation is the memorization (Hifz) of its text by millions of Muslims across every era, reinforced by rigorous cross-verification with official master codices finalized under the Caliph Uthman ibn Affan (RA).',
      },
    ],
    keyTakeaways: [
      'The Quran is the literal speech of God, unchanged for over 1,400 years.',
      'Oral transmission through millions of Huffaz guarantees universal preservation.',
      'Composed of 114 Surahs and over 6,200 verses.',
    ],
    authenticReferences: ['Surah Al-Hijr 15:9', 'Sahih al-Bukhari 4987'],
  },
];
