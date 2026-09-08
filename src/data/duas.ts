/**
 * Authentic Duas from Hisnul Muslim & Sahih Hadith Collections
 * Every dua includes authentic Arabic text, transliteration, verified reference, and recommended repetition.
 */

import { DuaItem } from '../types';

export const AUTHENTIC_DUAS: DuaItem[] = [
  // Morning Duas
  {
    id: 'dua_morning_1',
    category: 'Morning',
    title: 'Waking Up: Gratitude for Life after Sleep',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alḥamdu lillāhillaḏī aḥyānā baʿda mā amātanā wa-ilayhi n-nušūr',
    translation: 'All praise is for Allah who gave us life after having taken it from us, and unto Him is the resurrection.',
    reference: 'Sahih al-Bukhari 6312; Sahih Muslim 2711',
    repeatCount: 1,
    verifiedSource: true
  },
  {
    id: 'dua_morning_2',
    category: 'Morning',
    title: 'Morning Proclamation of Faith & Kingdom',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'Aṣbaḥnā wa-aṣbaḥa l-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illā llāhu waḥdahū lā šarīka lah, lahu l-mulku wa-lahu l-ḥamd, wa-huwa ʿalā kulli šay’in qadīr',
    translation: 'We have reached the morning and with it all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah alone, without partner. To Him belongs the dominion and to Him belongs all praise, and He is over all things capable.',
    reference: 'Sahih Muslim 2723',
    repeatCount: 1,
    verifiedSource: true
  },
  {
    id: 'dua_morning_3',
    category: 'Morning',
    title: 'Sayyid al-Istighfar (The Master Supplication for Forgiveness)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allāhumma anta rabbī lā ilāha illā ant, khalaqtanī wa-anā ʿabduk, wa-anā ʿalā ʿahdika wa-waʿdika mastaṭaʿt, aʿūdhu bika min šarri mā ṣanaʿt, abū’u laka bi-niʿmatika ʿalayy, wa-abū’u bi-ḏanbī fa-ġfir lī fa-innahū lā yaġfiru ḏ-ḏunūba illā ant',
    translation: 'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You.',
    reference: 'Sahih al-Bukhari 6306',
    repeatCount: 1,
    benefit: 'The Prophet ﷺ stated that whoever recites this with firm conviction in the morning and dies before evening will be among the people of Paradise.',
    verifiedSource: true
  },

  // Evening Duas
  {
    id: 'dua_evening_1',
    category: 'Evening',
    title: 'Entering the Evening',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'Amsaynā wa-amsā l-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illā llāhu waḥdahū lā šarīka lah, lahu l-mulku wa-lahu l-ḥamd, wa-huwa ʿalā kulli šay’in qadīr',
    translation: 'We have reached the evening and with it all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah alone, without partner.',
    reference: 'Sahih Muslim 2723',
    repeatCount: 1,
    verifiedSource: true
  },
  {
    id: 'dua_evening_2',
    category: 'Evening',
    title: 'Seeking Complete Protection by Allah’s Perfect Words',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: 'Aʿūḏu bi-kalimāti llāhi t-tāmmāti min šarri mā khalaq',
    translation: 'I seek refuge in the perfect words of Allah from the evil of that which He has created.',
    reference: 'Sahih Muslim 2709',
    repeatCount: 3,
    benefit: 'Recited three times in the evening protects against all harmful creatures and poisons until morning.',
    verifiedSource: true
  },

  // Sleep Duas
  {
    id: 'dua_sleep_1',
    category: 'Sleep',
    title: 'Before Sleeping: Placing Trust in Allah',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika llāhumma amūtu wa-aḥyā',
    translation: 'In Your Name, O Allah, I die and I live.',
    reference: 'Sahih al-Bukhari 6312',
    repeatCount: 1,
    verifiedSource: true
  },
  {
    id: 'dua_sleep_2',
    category: 'Sleep',
    title: 'Surrendering the Soul Before Rest',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    transliteration: 'Bismika rabbī waḍaʿtu janbī, wa-bika arfaʿuh, fa-in amsakta nafsī farḥamhā, wa-in arsaltahā faḥfaẓhā bimā taḥfaẓu bihī ʿibādaka ṣ-ṣāliḥīn',
    translation: 'In Your name my Lord, I lie down, and by You I arise. If You should take my soul, then have mercy upon it, and if You should return my soul, then protect it as You protect Your righteous servants.',
    reference: 'Sahih al-Bukhari 6320; Sahih Muslim 2714',
    repeatCount: 1,
    verifiedSource: true
  },

  // Protection Duas
  {
    id: 'dua_protection_1',
    category: 'Protection',
    title: 'Shield from All Harm (Morning & Evening)',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillāhillaḏī lā yaḍurru maʿa smihī šay’un fī l-arḍi walā fī s-samā’i wa-huwa s-samīʿu l-ʿalīm',
    translation: 'In the Name of Allah, with whose Name nothing on earth or in heaven can cause harm, and He is the All-Hearing, the All-Knowing.',
    reference: 'Sunan Abi Dawud 5088; Jami` at-Tirmidhi 3388 (Hasan Sahih)',
    repeatCount: 3,
    benefit: 'The Prophet ﷺ taught that whoever recites this thrice every morning and evening will not be harmed by anything.',
    verifiedSource: true
  },
  {
    id: 'dua_protection_2',
    category: 'Protection',
    title: 'Protection from Grief, Anxiety, Incapacity & Debt',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration: 'Allāhumma innī aʿūḏu bika mina l-hammi wal-ḥazan, wal-ʿajzi wal-kasal, wal-bukhli wal-jubn, wa-ḍalaʿi d-dayni wa-ġalabati r-rijāl',
    translation: 'O Allah, I seek refuge in You from grief and sadness, from weakness and laziness, from miserliness and cowardice, from the burden of debt and being overpowered by men.',
    reference: 'Sahih al-Bukhari 2893',
    repeatCount: 1,
    verifiedSource: true
  },

  // Travel Duas
  {
    id: 'dua_travel_1',
    category: 'Travel',
    title: 'Upon Embarking on a Journey',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: 'Subḥānallaḏī sakh-khara lanā hāḏā wa-mā kunnā lahū muqrinīn, wa-innā ilā rabbinā lamunqalibūn',
    translation: 'Glory to Him who has brought this under our control, though we were unable to subdue it by ourselves, and indeed to our Lord we will return.',
    reference: 'Surah Az-Zukhruf 43:13-14; Sahih Muslim 1342',
    repeatCount: 1,
    verifiedSource: true
  },

  // Eating Duas
  {
    id: 'dua_eating_1',
    category: 'Eating',
    title: 'Before Beginning a Meal',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillāh',
    translation: 'In the name of Allah.',
    reference: 'Sahih al-Bukhari 5376; Sahih Muslim 2017',
    repeatCount: 1,
    benefit: 'If forgotten at the start, say: "Bismillāhi fī awwalihi wa-ākhirih" (In the name of Allah at its beginning and end).',
    verifiedSource: true
  },
  {
    id: 'dua_eating_2',
    category: 'Eating',
    title: 'After Finishing Food',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration: 'Al-ḥamdu lillāhillaḏī aṭʿamanī hāḏā wa-razaqanīhi min ġayri ḥawlin minnī walā quwwah',
    translation: 'Praise be to Allah who has fed me this and provided it for me without any might or power on my part.',
    reference: 'Sunan Abi Dawud 4023; Jami` at-Tirmidhi 3458',
    repeatCount: 1,
    verifiedSource: true
  },

  // Forgiveness Duas
  {
    id: 'dua_forgive_1',
    category: 'Forgiveness',
    title: 'Daily Seeking of Pardon (Istighfar)',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfiru llāha wa-atūbu ilayh',
    translation: 'I ask Allah for forgiveness and I repent to Him.',
    reference: 'Sahih al-Bukhari 6307 (The Prophet ﷺ sought forgiveness over 70 times a day)',
    repeatCount: 100,
    verifiedSource: true
  },
  {
    id: 'dua_forgive_2',
    category: 'Forgiveness',
    title: 'Supplication of Prophet Yunus (Jonah) in Distress',
    arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    transliteration: 'Lā ilāha illā anta subḥānaka innī kuntu mina ẓ-ẓālimīn',
    translation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    reference: 'Surah Al-Anbiya 21:87; Jami` at-Tirmidhi 3505',
    repeatCount: 1,
    benefit: 'The Prophet ﷺ stated no Muslim supplicates with this in any distress except that Allah answers him.',
    verifiedSource: true
  },

  // Family Duas
  {
    id: 'dua_family_1',
    category: 'Family',
    title: 'Supplication for Righteous Spouse and Offspring',
    arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    transliteration: 'Rabbanā hab lanā min azwājinā wa-ḏurriyyātinā qurrata aʿyunin wajʿalnā lil-muttaqīna imāmā',
    translation: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us an example for the righteous.',
    reference: 'Surah Al-Furqan 25:74',
    repeatCount: 1,
    verifiedSource: true
  },
  {
    id: 'dua_family_2',
    category: 'Family',
    title: 'Supplication for Parents',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbi r-ḥamhumā kamā rabbayānī ṣaghīrā',
    translation: 'My Lord, have mercy upon them as they brought me up [when I was] small.',
    reference: 'Surah Al-Isra 17:24',
    repeatCount: 1,
    verifiedSource: true
  },

  // Difficulty & Hardship
  {
    id: 'dua_difficulty_1',
    category: 'Difficulty',
    title: 'When Facing Hardship or Tests',
    arabic: 'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
    transliteration: 'Allāhumma lā sahla illā mā jaʿaltahū sahlā, wa-anta tajʿalu l-ḥazna iḏā ši’ta sahlā',
    translation: 'O Allah, there is no ease except that which You have made easy, and You can make difficult matters easy if You will.',
    reference: 'Sahih Ibn Hibban 974; Al-Bayhaqi',
    repeatCount: 1,
    verifiedSource: true
  },

  // Worship & Post-Salah
  {
    id: 'dua_worship_1',
    category: 'Worship',
    title: 'Asking for Steadfastness in Worship',
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    transliteration: 'Allāhumma aʿinnī ʿalā ḏikrika wa-šukrika wa-ḥusni ʿibādatik',
    translation: 'O Allah, assist me in remembering You, expressing gratitude to You, and worshipping You with excellence.',
    reference: 'Sunan Abi Dawud 1522; Sunan an-Nasa\'i 1303',
    repeatCount: 1,
    benefit: 'Taught by the Prophet ﷺ to Mu’adh ibn Jabal (RA) to recite after every obligatory prayer.',
    verifiedSource: true
  },

  // General Duas
  {
    id: 'dua_general_1',
    category: 'General',
    title: 'Supplication for Good in this World and the Hereafter',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: 'Rabbanā ātinā fī d-dunyā ḥasanatan wa-fī l-ākhirati ḥasanatan wa-qinā ʿadhāba n-nār',
    translation: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
    reference: 'Surah Al-Baqarah 2:201; Sahih al-Bukhari 6389 (The most frequent supplication of the Prophet ﷺ)',
    repeatCount: 1,
    verifiedSource: true
  },
  {
    id: 'dua_general_2',
    category: 'General',
    title: 'Supplication for Steadfastness of the Heart',
    arabic: 'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ',
    transliteration: 'Yā muqalliba l-qulūbi thabbit qalbī ʿalā dīnik',
    translation: 'O Turner of the hearts, make my heart firm upon Your religion.',
    reference: 'Jami` at-Tirmidhi 2140',
    repeatCount: 1,
    verifiedSource: true
  }
];
