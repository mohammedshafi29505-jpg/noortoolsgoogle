/**
 * Step-by-Step Authentic Guides for Wudu and Salah
 * Grounded in the consensus of Islamic jurisprudence and prophetic tradition.
 */

export interface GuideStepDetail {
  stepNumber: number;
  title: string;
  arabicName: string;
  description: string;
  recitation?: {
    arabic: string;
    transliteration: string;
    translation: string;
  };
  note?: string;
}

export interface ComprehensiveGuide {
  prerequisites: string[];
  steps: GuideStepDetail[];
  nullifiers: string[];
  commonMistakes: string[];
}

export const WUDU_GUIDE: ComprehensiveGuide = {
  prerequisites: [
    'Pure, clean water (Tahur) that has not been altered in color, taste, or odor by impurities',
    'Removal of waterproof barriers on nails or skin (e.g. non-permeable polish or wax)',
    'Conscious intention (Niyyah) formed in the heart to purify for the sake of Allah',
    'Entering with the name of Allah (Bismillāh)',
  ],
  steps: [
    {
      stepNumber: 1,
      title: 'Intention (Niyyah) and Bismillah',
      arabicName: 'النية والتسمية',
      description: 'Form the sincere intention in your heart to perform ablution for the sake of Allah, then articulate "Bismillāh" (In the name of Allah).',
      recitation: {
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismillāhir-Raḥmānir-Raḥīm',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      },
      note: 'The intention resides in the heart and does not need to be said aloud.',
    },
    {
      stepNumber: 2,
      title: 'Washing the Hands to the Wrists (3 Times)',
      arabicName: 'غسل اليدين إلى الرسغين',
      description: 'Thoroughly wash both hands up to the wrists three times, ensuring water penetrates between all fingers.',
      note: 'Sunnah emphasizes washing the right hand first, then the left.',
    },
    {
      stepNumber: 3,
      title: 'Rinsing the Mouth (Madmadah - 3 Times)',
      arabicName: 'المضمضة',
      description: 'Take water with your right hand into your mouth, swirl it thoroughly to clean teeth and gums, and expel it three times.',
      note: 'Use of the Siwak (tooth-stick) is strongly encouraged prior to or during wudu.',
    },
    {
      stepNumber: 4,
      title: 'Sniffing Water into the Nostrils (Istinshaq - 3 Times)',
      arabicName: 'الاستنشاق والاستنثار',
      description: 'Gently sniff water into the nostrils with your right hand, then blow it out using your left hand to clear impurities, three times.',
      note: 'Do not sniff aggressively while fasting to prevent ingestion.',
    },
    {
      stepNumber: 5,
      title: 'Washing the Entire Face (3 Times)',
      arabicName: 'غسل الوجه كاملاً',
      description: 'Wash the entire face three times, from the standard hairline to the base of the chin, and from earlobe to earlobe.',
      note: 'Comb wet fingers through a thick beard so water reaches the underlying skin.',
    },
    {
      stepNumber: 6,
      title: 'Washing the Arms to and Including Elbows (3 Times)',
      arabicName: 'غسل اليدين إلى المرفقين',
      description: 'Wash the right arm from fingertips past the elbow three times, then wash the left arm in identical fashion three times.',
      note: 'Ensure the elbows are completely enveloped in water.',
    },
    {
      stepNumber: 7,
      title: 'Wiping Over the Head (Mas-h - Once)',
      arabicName: 'مسح الرأس',
      description: 'Moisten both hands and draw them from the front of the hairline back to the nape of the neck, and then bring them forward to where you began.',
      note: 'This is performed once according to the soundest prophetic sunnah.',
    },
    {
      stepNumber: 8,
      title: 'Wiping the Ears (Inside and Outside - Once)',
      arabicName: 'مسح الأذنين',
      description: 'Insert wet index fingers into the ear canals and wipe the crevices, while using the thumbs to wipe the back of the ears.',
      note: 'Performed with the residual water from wiping the head or fresh water.',
    },
    {
      stepNumber: 9,
      title: 'Washing the Feet to and Including Ankles (3 Times)',
      arabicName: 'غسل الرجلين إلى الكعبين',
      description: 'Wash the right foot up to and including the ankle bones three times, running the pinky finger between the toes. Then wash the left foot three times.',
      note: 'Take extra care to ensure water covers the Achilles tendon and heels.',
    },
    {
      stepNumber: 10,
      title: 'Closing Supplication of Wudu',
      arabicName: 'دعاء ختام الوضوء',
      description: 'Upon finishing wudu, recite the prophetic testimony and supplication for spiritual purity.',
      recitation: {
        arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
        transliteration: 'Ashhadu allā ilāha illallāh, waḥdahū lā sharīka lah, wa-ashhadu anna Muḥammadan ʿabduhū wa-rasūluh. Allāhumma jʿalnī minat-tawwābīn, wajʿalnī minal-mutaṭahhirīn.',
        translation: 'I bear witness that none has the right to be worshipped except Allah alone, without partner; and I bear witness that Muhammad is His servant and messenger. O Allah, make me of those who constantly repent and make me of those who purify themselves.',
      },
      note: 'The Prophet ﷺ taught that whoever says this, the eight gates of Paradise are opened for them (Sahih Muslim).',
    },
  ],
  nullifiers: [
    'Anything exiting the two passages (urine, stool, gas, prostatic fluid)',
    'Deep sleep wherein awareness of surroundings is completely lost',
    'Loss of consciousness through fainting, intoxication, or medication',
    'Direct bare-skin contact with the private parts without a barrier (according to the majority)',
    'Eating camel meat (according to the Hanbali school and authenticated hadith)',
  ],
  commonMistakes: [
    'Leaving the dry spots on the heels or back of the ankles ("Woe to the heels from the Fire")',
    'Neglecting to wash the elbows completely by stopping before the joint',
    'Excessive water wastage (Israaf) during washing',
    'Wiping the neck (not established in authentic Sunnah)',
  ],
};

export const SALAH_GUIDE: ComprehensiveGuide = {
  prerequisites: [
    'Ritual purity from minor impurity (wudu) and major impurity (ghusl)',
    'Cleanliness of the body, clothing, and place of prayer from tangible impurities (Najasah)',
    'Covering the Awrah (men: navel to knee; women: entire body except face and hands)',
    'Facing the exact direction of the Qibla (the Kaaba in Makkah)',
    'The commencement of the prayer\'s astronomical time window',
    'Forming the internal intention (Niyyah) for the specific obligatory or voluntary prayer',
  ],
  steps: [
    {
      stepNumber: 1,
      title: 'The Opening Takbir (Takbirat al-Ihram)',
      arabicName: 'تكبيرة الإحرام',
      description: 'Stand upright facing the Qibla, raise hands to the level of shoulders or earlobes with palms open facing forward, and articulate "Allāhu Akbar".',
      recitation: {
        arabic: 'اللَّهُ أَكْبَرُ',
        transliteration: 'Allāhu Akbar',
        translation: 'Allah is the Greatest.',
      },
      note: 'This formalizes entry into the sacred state of Salah.',
    },
    {
      stepNumber: 2,
      title: 'Opening Supplication (Du\'a al-Istiftah)',
      arabicName: 'دعاء الاستفتاح',
      description: 'Fold your right hand over your left hand across the chest and recite the opening glorification in silence.',
      recitation: {
        arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ',
        transliteration: 'Subḥānakallāhumma wa-biḥamdik, wa-tabārakasmuk, wa-taʿālā jadduk, walā ilāha ghayruk.',
        translation: 'Glory be to You, O Allah, and all praise. Blessed is Your Name, and exalted is Your Majesty, and there is no deity worthy of worship besides You.',
      },
      note: 'Recommended Sunnah before reciting the Quran.',
    },
    {
      stepNumber: 3,
      title: 'Recitation of Surah Al-Fatihah and an Additional Surah',
      arabicName: 'قراءة الفاتحة وسورة',
      description: 'Seek refuge in Allah from Satan, recite the Basmalah, and recite Surah Al-Fatihah completely in every single unit (Rak\'ah). In the first two units, follow with any additional passage of the Quran.',
      recitation: {
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...',
        transliteration: 'Bismillāhir-Raḥmānir-Raḥīm. Al-ḥamdu lillāhi Rabbil-ʿālamīn...',
        translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds...',
      },
      note: 'Reciting Al-Fatihah is a mandatory pillar without which the prayer is invalid.',
    },
    {
      stepNumber: 4,
      title: 'Bowing (Ruku\') and Glorification',
      arabicName: 'الركوع',
      description: 'Say "Allāhu Akbar" and bow with a flat back, placing palms securely on your knees with fingers spaced out. Recite the glorification at least three times.',
      recitation: {
        arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
        transliteration: 'Subḥāna Rabbiyal-ʿAẓīm (3x)',
        translation: 'Glory be to my Lord, the Magnificent.',
      },
      note: 'Ensure your back is straight and head is level with your spine.',
    },
    {
      stepNumber: 5,
      title: 'Rising from Bowing (I\'tidal) and Standing Calmly',
      arabicName: 'الرفع من الركوع والاعتدال',
      description: 'Rise up to a fully erect standing posture with arms relaxed or folded, articulating the divine recognition.',
      recitation: {
        arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ. رَبَّنَا وَلَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
        transliteration: 'Samiʿallāhu liman ḥamidah. Rabbanā wa-lakal-ḥamd, ḥamdan kathīran ṭayyiban mubārakan fīh.',
        translation: 'Allah hears whoever praises Him. Our Lord, to You belongs all praise - an abundant, good, and blessed praise.',
      },
      note: 'Pause calmly in this standing posture until every bone returns to place.',
    },
    {
      stepNumber: 6,
      title: 'First Prostration (Sujud)',
      arabicName: 'السجود الأول',
      description: 'Say "Allāhu Akbar" and descend to the ground, prostrating firmly upon seven limbs: forehead and nose, both palms, both knees, and toes curled forward toward the Qibla.',
      recitation: {
        arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
        transliteration: 'Subḥāna Rabbiyal-Aʿlā (3x)',
        translation: 'Glory be to my Lord, the Most High.',
      },
      note: 'A servant is closest to their Lord while in prostration; make heartfelt dua here.',
    },
    {
      stepNumber: 7,
      title: 'Sitting Between the Two Prostrations (Jalsah)',
      arabicName: 'الجلوس بين السجدتين',
      description: 'Say "Allāhu Akbar" and sit up with tranquility upon your left foot, keeping the right foot propped upright. Recite the petition for forgiveness.',
      recitation: {
        arabic: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَعَافِنِي، وَارْزُقْنِي',
        transliteration: 'Rabbighfir lī, Rabbighfir lī, warḥamnī, wahdinī, waʿāfinī, warzuqnī.',
        translation: 'My Lord, forgive me; my Lord, forgive me; have mercy on me, guide me, grant me well-being, and provide for me.',
      },
      note: 'Tranquility (Tuma\'ninah) in sitting is an essential pillar.',
    },
    {
      stepNumber: 8,
      title: 'Second Prostration (Sujud)',
      arabicName: 'السجود الثاني',
      description: 'Say "Allāhu Akbar" and prostrate again exactly as in the first sujud, reciting the glorification three times.',
      recitation: {
        arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
        transliteration: 'Subḥāna Rabbiyal-Aʿlā (3x)',
        translation: 'Glory be to my Lord, the Most High.',
      },
      note: 'Then rise saying "Allāhu Akbar" to begin the second unit.',
    },
    {
      stepNumber: 9,
      title: 'Tashahhud and Salawat upon the Prophet ﷺ',
      arabicName: 'التشهد والصلاة الإبراهيمية',
      description: 'Sit after the second unit (and after the final unit) and recite the testimony of faith, raising the right index finger when affirming Allah’s Oneness.',
      recitation: {
        arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ. أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        transliteration: 'At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt. As-salāmu ʿalayka ayyuhan-nabiyyu wa-raḥmatullāhi wa-barakātuh. As-salāmu ʿalaynā wa-ʿalā ʿibādillāhiṣ-ṣāliḥīn. Ashhadu allā ilāha illallāh, wa-ashhadu anna Muḥammadan ʿabduhū wa-rasūluh.',
        translation: 'All compliments, prayers, and pure words are due to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that none has the right to be worshipped except Allah, and I bear witness that Muhammad is His servant and messenger.',
      },
      note: 'Follow with the Abrahamic prayer (Salawat Ibrahimiyyah) in the final sitting.',
    },
    {
      stepNumber: 10,
      title: 'The Concluding Taslim',
      arabicName: 'التسليم',
      description: 'Conclude the prayer by turning your head to the right and saying the greeting of peace, then turning to the left and repeating.',
      recitation: {
        arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
        transliteration: 'As-Salāmu ʿalaykum wa-raḥmatullāh',
        translation: 'May peace and the mercy of Allah be upon you.',
      },
      note: 'This formally completes the prayer.',
    },
  ],
  nullifiers: [
    'Speaking intentional words not belonging to the prayer or Quran',
    'Eating or drinking anything intentionally while praying',
    'Major or excessive continuous bodily movement not of the prayer',
    'Nullification of ritual purity (loss of wudu)',
    'Exposing the Awrah intentionally or having it uncovered without immediate correction',
    'Turning significantly away from the Qibla direction',
    'Laughing audibly during prayer',
    'Omitting an essential pillar (Rukn) intentionally or without rectifying through Sujud as-Sahw',
  ],
  commonMistakes: [
    'Rushing through prayer without pausing for tranquility (Tuma\'ninah) in bowing, standing, and prostrating',
    'Looking up at the ceiling or sky during prayer instead of toward the place of prostration',
    'Preceding the Imam in congregational prayer during transitions',
    'Lifting the feet or nose off the ground during prostration',
    'Closing the eyes unnecessarily without a valid need',
  ],
};

export const WUDU_STEPS = WUDU_GUIDE.steps;
export const SALAH_STEPS = SALAH_GUIDE.steps;
