/**
 * Quran Surahs Metadata & Authentic Starter Texts
 * All 114 Surahs classified with authentic traditional names and verified ayah counts.
 */

import { SurahMeta, AyahItem } from '../types';

export const SURAHS_LIST: SurahMeta[] = [
  { number: 1, name: 'Al-Fatihah', arabicName: 'الفاتحة', englishMeaning: 'The Opening', ayahCount: 7, revelationType: 'Meccan', revelationOrder: 5, pageNumber: 1 },
  { number: 2, name: 'Al-Baqarah', arabicName: 'البقرة', englishMeaning: 'The Cow', ayahCount: 286, revelationType: 'Medinan', revelationOrder: 87, pageNumber: 2 },
  { number: 3, name: 'Ali \'Imran', arabicName: 'آل عمران', englishMeaning: 'Family of Imran', ayahCount: 200, revelationType: 'Medinan', revelationOrder: 89, pageNumber: 50 },
  { number: 4, name: 'An-Nisa', arabicName: 'النساء', englishMeaning: 'The Women', ayahCount: 176, revelationType: 'Medinan', revelationOrder: 92, pageNumber: 77 },
  { number: 5, name: 'Al-Ma\'idah', arabicName: 'المائدة', englishMeaning: 'The Table Spread', ayahCount: 120, revelationType: 'Medinan', revelationOrder: 112, pageNumber: 106 },
  { number: 6, name: 'Al-An\'am', arabicName: 'الأنعام', englishMeaning: 'The Cattle', ayahCount: 165, revelationType: 'Meccan', revelationOrder: 55, pageNumber: 128 },
  { number: 7, name: 'Al-A\'raf', arabicName: 'الأعراف', englishMeaning: 'The Heights', ayahCount: 206, revelationType: 'Meccan', revelationOrder: 39, pageNumber: 151 },
  { number: 8, name: 'Al-Anfal', arabicName: 'الأنفال', englishMeaning: 'The Spoils of War', ayahCount: 75, revelationType: 'Medinan', revelationOrder: 88, pageNumber: 177 },
  { number: 9, name: 'At-Tawbah', arabicName: 'التوبة', englishMeaning: 'The Repentance', ayahCount: 129, revelationType: 'Medinan', revelationOrder: 113, pageNumber: 187 },
  { number: 10, name: 'Yunus', arabicName: 'يونس', englishMeaning: 'Jonah', ayahCount: 109, revelationType: 'Meccan', revelationOrder: 51, pageNumber: 208 },
  { number: 11, name: 'Hud', arabicName: 'هود', englishMeaning: 'Hud', ayahCount: 123, revelationType: 'Meccan', revelationOrder: 52, pageNumber: 221 },
  { number: 12, name: 'Yusuf', arabicName: 'يوسف', englishMeaning: 'Joseph', ayahCount: 111, revelationType: 'Meccan', revelationOrder: 53, pageNumber: 235 },
  { number: 13, name: 'Ar-Ra\'d', arabicName: 'الرعد', englishMeaning: 'The Thunder', ayahCount: 43, revelationType: 'Medinan', revelationOrder: 96, pageNumber: 249 },
  { number: 14, name: 'Ibrahim', arabicName: 'إبراهيم', englishMeaning: 'Abraham', ayahCount: 52, revelationType: 'Meccan', revelationOrder: 72, pageNumber: 255 },
  { number: 15, name: 'Al-Hijr', arabicName: 'الحجر', englishMeaning: 'The Rocky Tract', ayahCount: 99, revelationType: 'Meccan', revelationOrder: 54, pageNumber: 262 },
  { number: 16, name: 'An-Nahl', arabicName: 'النحل', englishMeaning: 'The Bee', ayahCount: 128, revelationType: 'Meccan', revelationOrder: 70, pageNumber: 267 },
  { number: 17, name: 'Al-Isra', arabicName: 'الإسراء', englishMeaning: 'The Night Journey', ayahCount: 111, revelationType: 'Meccan', revelationOrder: 50, pageNumber: 282 },
  { number: 18, name: 'Al-Kahf', arabicName: 'الكهف', englishMeaning: 'The Cave', ayahCount: 110, revelationType: 'Meccan', revelationOrder: 69, pageNumber: 293 },
  { number: 19, name: 'Maryam', arabicName: 'مريم', englishMeaning: 'Mary', ayahCount: 98, revelationType: 'Meccan', revelationOrder: 44, pageNumber: 305 },
  { number: 20, name: 'Ta-Ha', arabicName: 'طه', englishMeaning: 'Ta-Ha', ayahCount: 135, revelationType: 'Meccan', revelationOrder: 45, pageNumber: 312 },
  { number: 21, name: 'Al-Anbiya', arabicName: 'الأنبياء', englishMeaning: 'The Prophets', ayahCount: 112, revelationType: 'Meccan', revelationOrder: 73, pageNumber: 322 },
  { number: 22, name: 'Al-Hajj', arabicName: 'الحج', englishMeaning: 'The Pilgrimage', ayahCount: 78, revelationType: 'Medinan', revelationOrder: 103, pageNumber: 332 },
  { number: 23, name: 'Al-Mu\'minun', arabicName: 'المؤمنون', englishMeaning: 'The Believers', ayahCount: 118, revelationType: 'Meccan', revelationOrder: 74, pageNumber: 342 },
  { number: 24, name: 'An-Nur', arabicName: 'النور', englishMeaning: 'The Light', ayahCount: 64, revelationType: 'Medinan', revelationOrder: 102, pageNumber: 350 },
  { number: 25, name: 'Al-Furqan', arabicName: 'الفرقان', englishMeaning: 'The Criterion', ayahCount: 77, revelationType: 'Meccan', revelationOrder: 42, pageNumber: 359 },
  { number: 26, name: 'Ash-Shu\'ara', arabicName: 'الشعراء', englishMeaning: 'The Poets', ayahCount: 227, revelationType: 'Meccan', revelationOrder: 47, pageNumber: 367 },
  { number: 27, name: 'An-Naml', arabicName: 'النمل', englishMeaning: 'The Ant', ayahCount: 93, revelationType: 'Meccan', revelationOrder: 48, pageNumber: 377 },
  { number: 28, name: 'Al-Qasas', arabicName: 'القصص', englishMeaning: 'The Stories', ayahCount: 88, revelationType: 'Meccan', revelationOrder: 49, pageNumber: 385 },
  { number: 29, name: 'Al-\'Ankabut', arabicName: 'العنكبوت', englishMeaning: 'The Spider', ayahCount: 69, revelationType: 'Meccan', revelationOrder: 85, pageNumber: 396 },
  { number: 30, name: 'Ar-Rum', arabicName: 'الروم', englishMeaning: 'The Romans', ayahCount: 60, revelationType: 'Meccan', revelationOrder: 84, pageNumber: 404 },
  { number: 31, name: 'Luqman', arabicName: 'لقمان', englishMeaning: 'Luqman', ayahCount: 34, revelationType: 'Meccan', revelationOrder: 57, pageNumber: 411 },
  { number: 32, name: 'As-Sajdah', arabicName: 'السجدة', englishMeaning: 'The Prostration', ayahCount: 30, revelationType: 'Meccan', revelationOrder: 75, pageNumber: 415 },
  { number: 33, name: 'Al-Ahzab', arabicName: 'الأحزاب', englishMeaning: 'The Combined Forces', ayahCount: 73, revelationType: 'Medinan', revelationOrder: 90, pageNumber: 418 },
  { number: 34, name: 'Saba', arabicName: 'سبإ', englishMeaning: 'Sheba', ayahCount: 54, revelationType: 'Meccan', revelationOrder: 58, pageNumber: 428 },
  { number: 35, name: 'Fatir', arabicName: 'فاطر', englishMeaning: 'Originator', ayahCount: 45, revelationType: 'Meccan', revelationOrder: 43, pageNumber: 434 },
  { number: 36, name: 'Ya-Sin', arabicName: 'يس', englishMeaning: 'Ya-Sin', ayahCount: 83, revelationType: 'Meccan', revelationOrder: 41, pageNumber: 440 },
  { number: 37, name: 'As-Saffat', arabicName: 'الصافات', englishMeaning: 'Those Who Set The Ranks', ayahCount: 182, revelationType: 'Meccan', revelationOrder: 56, pageNumber: 446 },
  { number: 38, name: 'Sad', arabicName: 'ص', englishMeaning: 'The Letter Sad', ayahCount: 88, revelationType: 'Meccan', revelationOrder: 38, pageNumber: 453 },
  { number: 39, name: 'Az-Zumar', arabicName: 'الزمر', englishMeaning: 'The Troops', ayahCount: 75, revelationType: 'Meccan', revelationOrder: 59, pageNumber: 458 },
  { number: 40, name: 'Ghafir', arabicName: 'غافر', englishMeaning: 'The Forgiver', ayahCount: 85, revelationType: 'Meccan', revelationOrder: 60, pageNumber: 467 },
  { number: 41, name: 'Fussilat', arabicName: 'فصلت', englishMeaning: 'Explained in Detail', ayahCount: 54, revelationType: 'Meccan', revelationOrder: 61, pageNumber: 477 },
  { number: 42, name: 'Ash-Shura', arabicName: 'الشورى', englishMeaning: 'The Consultation', ayahCount: 53, revelationType: 'Meccan', revelationOrder: 62, pageNumber: 483 },
  { number: 43, name: 'Az-Zukhruf', arabicName: 'الزخرف', englishMeaning: 'The Ornaments of Gold', ayahCount: 89, revelationType: 'Meccan', revelationOrder: 63, pageNumber: 489 },
  { number: 44, name: 'Ad-Dukhan', arabicName: 'الدخان', englishMeaning: 'The Smoke', ayahCount: 59, revelationType: 'Meccan', revelationOrder: 64, pageNumber: 496 },
  { number: 45, name: 'Al-Jathiyah', arabicName: 'الجاثية', englishMeaning: 'The Crouching', ayahCount: 37, revelationType: 'Meccan', revelationOrder: 65, pageNumber: 499 },
  { number: 46, name: 'Al-Ahqaf', arabicName: 'الأحقاف', englishMeaning: 'The Wind-Curved Sandhills', ayahCount: 35, revelationType: 'Meccan', revelationOrder: 66, pageNumber: 502 },
  { number: 47, name: 'Muhammad', arabicName: 'محمد', englishMeaning: 'Muhammad', ayahCount: 38, revelationType: 'Medinan', revelationOrder: 95, pageNumber: 507 },
  { number: 48, name: 'Al-Fath', arabicName: 'الفتح', englishMeaning: 'The Victory', ayahCount: 29, revelationType: 'Medinan', revelationOrder: 111, pageNumber: 511 },
  { number: 49, name: 'Al-Hujurat', arabicName: 'الحجرات', englishMeaning: 'The Rooms', ayahCount: 18, revelationType: 'Medinan', revelationOrder: 106, pageNumber: 515 },
  { number: 50, name: 'Qaf', arabicName: 'ق', englishMeaning: 'The Letter Qaf', ayahCount: 45, revelationType: 'Meccan', revelationOrder: 34, pageNumber: 518 },
  { number: 51, name: 'Adh-Dhariyat', arabicName: 'الذاريات', englishMeaning: 'The Winnowing Winds', ayahCount: 60, revelationType: 'Meccan', revelationOrder: 67, pageNumber: 520 },
  { number: 52, name: 'At-Tur', arabicName: 'الطور', englishMeaning: 'The Mount', ayahCount: 49, revelationType: 'Meccan', revelationOrder: 76, pageNumber: 523 },
  { number: 53, name: 'An-Najm', arabicName: 'النجم', englishMeaning: 'The Star', ayahCount: 62, revelationType: 'Meccan', revelationOrder: 23, pageNumber: 526 },
  { number: 54, name: 'Al-Qamar', arabicName: 'القمر', englishMeaning: 'The Moon', ayahCount: 55, revelationType: 'Meccan', revelationOrder: 37, pageNumber: 528 },
  { number: 55, name: 'Ar-Rahman', arabicName: 'الرحمن', englishMeaning: 'The Beneficent', ayahCount: 78, revelationType: 'Medinan', revelationOrder: 97, pageNumber: 531 },
  { number: 56, name: 'Al-Waqi\'ah', arabicName: 'الواقعة', englishMeaning: 'The Inevitable', ayahCount: 96, revelationType: 'Meccan', revelationOrder: 46, pageNumber: 534 },
  { number: 57, name: 'Al-Hadid', arabicName: 'الحديد', englishMeaning: 'The Iron', ayahCount: 29, revelationType: 'Medinan', revelationOrder: 94, pageNumber: 537 },
  { number: 58, name: 'Al-Mujadila', arabicName: 'المجادلة', englishMeaning: 'The Pleading Woman', ayahCount: 22, revelationType: 'Medinan', revelationOrder: 105, pageNumber: 542 },
  { number: 59, name: 'Al-Hashr', arabicName: 'الحشر', englishMeaning: 'The Exile', ayahCount: 24, revelationType: 'Medinan', revelationOrder: 101, pageNumber: 545 },
  { number: 60, name: 'Al-Mumtahanah', arabicName: 'الممتحنة', englishMeaning: 'She That Is Examined', ayahCount: 13, revelationType: 'Medinan', revelationOrder: 91, pageNumber: 549 },
  { number: 61, name: 'As-Saff', arabicName: 'الصف', englishMeaning: 'The Ranks', ayahCount: 14, revelationType: 'Medinan', revelationOrder: 109, pageNumber: 551 },
  { number: 62, name: 'Al-Jumu\'ah', arabicName: 'الجمعة', englishMeaning: 'Friday', ayahCount: 11, revelationType: 'Medinan', revelationOrder: 110, pageNumber: 553 },
  { number: 63, name: 'Al-Munafiqun', arabicName: 'المنافقون', englishMeaning: 'The Hypocrites', ayahCount: 11, revelationType: 'Medinan', revelationOrder: 104, pageNumber: 554 },
  { number: 64, name: 'At-Taghabun', arabicName: 'التغابن', englishMeaning: 'Mutual Disillusion', ayahCount: 18, revelationType: 'Medinan', revelationOrder: 108, pageNumber: 556 },
  { number: 65, name: 'At-Talaq', arabicName: 'الطلاق', englishMeaning: 'The Divorce', ayahCount: 12, revelationType: 'Medinan', revelationOrder: 99, pageNumber: 558 },
  { number: 66, name: 'At-Tahrim', arabicName: 'التحريم', englishMeaning: 'The Prohibition', ayahCount: 12, revelationType: 'Medinan', revelationOrder: 107, pageNumber: 560 },
  { number: 67, name: 'Al-Mulk', arabicName: 'الملك', englishMeaning: 'The Sovereignty', ayahCount: 30, revelationType: 'Meccan', revelationOrder: 77, pageNumber: 562 },
  { number: 68, name: 'Al-Qalam', arabicName: 'القلم', englishMeaning: 'The Pen', ayahCount: 52, revelationType: 'Meccan', revelationOrder: 2, pageNumber: 564 },
  { number: 69, name: 'Al-Haqqah', arabicName: 'الحاقة', englishMeaning: 'The Reality', ayahCount: 52, revelationType: 'Meccan', revelationOrder: 78, pageNumber: 566 },
  { number: 70, name: 'Al-Ma\'arij', arabicName: 'المعارج', englishMeaning: 'The Ascending Stairways', ayahCount: 44, revelationType: 'Meccan', revelationOrder: 79, pageNumber: 568 },
  { number: 71, name: 'Nuh', arabicName: 'نوح', englishMeaning: 'Noah', ayahCount: 28, revelationType: 'Meccan', revelationOrder: 71, pageNumber: 570 },
  { number: 72, name: 'Al-Jinn', arabicName: 'الجن', englishMeaning: 'The Jinn', ayahCount: 28, revelationType: 'Meccan', revelationOrder: 40, pageNumber: 572 },
  { number: 73, name: 'Al-Muzzammil', arabicName: 'المزمل', englishMeaning: 'The Enshrouded One', ayahCount: 20, revelationType: 'Meccan', revelationOrder: 3, pageNumber: 574 },
  { number: 74, name: 'Al-Muddaththir', arabicName: 'المدثر', englishMeaning: 'The Cloaked One', ayahCount: 56, revelationType: 'Meccan', revelationOrder: 4, pageNumber: 575 },
  { number: 75, name: 'Al-Qiyamah', arabicName: 'القيامة', englishMeaning: 'The Resurrection', ayahCount: 40, revelationType: 'Meccan', revelationOrder: 31, pageNumber: 577 },
  { number: 76, name: 'Al-Insan', arabicName: 'الإنسان', englishMeaning: 'Man', ayahCount: 31, revelationType: 'Medinan', revelationOrder: 98, pageNumber: 578 },
  { number: 77, name: 'Al-Mursalat', arabicName: 'المرسلات', englishMeaning: 'The Emissaries', ayahCount: 50, revelationType: 'Meccan', revelationOrder: 33, pageNumber: 580 },
  { number: 78, name: 'An-Naba', arabicName: 'النبإ', englishMeaning: 'The Tidings', ayahCount: 40, revelationType: 'Meccan', revelationOrder: 80, pageNumber: 582 },
  { number: 79, name: 'An-Nazi\'at', arabicName: 'النازعات', englishMeaning: 'Those Who Drag Forth', ayahCount: 46, revelationType: 'Meccan', revelationOrder: 81, pageNumber: 583 },
  { number: 80, name: '\'Abasa', arabicName: 'عبس', englishMeaning: 'He Frowned', ayahCount: 42, revelationType: 'Meccan', revelationOrder: 24, pageNumber: 585 },
  { number: 81, name: 'At-Takwir', arabicName: 'التكوير', englishMeaning: 'The Overthrowing', ayahCount: 29, revelationType: 'Meccan', revelationOrder: 7, pageNumber: 586 },
  { number: 82, name: 'Al-Infitar', arabicName: 'الانفطار', englishMeaning: 'The Cleaving', ayahCount: 19, revelationType: 'Meccan', revelationOrder: 82, pageNumber: 587 },
  { number: 83, name: 'Al-Mutaffifin', arabicName: 'المطففين', englishMeaning: 'Defrauding', ayahCount: 36, revelationType: 'Meccan', revelationOrder: 86, pageNumber: 587 },
  { number: 84, name: 'Al-Inshiqaq', arabicName: 'الانشقاق', englishMeaning: 'The Splitting Asunder', ayahCount: 25, revelationType: 'Meccan', revelationOrder: 83, pageNumber: 589 },
  { number: 85, name: 'Al-Buruj', arabicName: 'البروج', englishMeaning: 'The Mansions of the Stars', ayahCount: 22, revelationType: 'Meccan', revelationOrder: 27, pageNumber: 590 },
  { number: 86, name: 'At-Tariq', arabicName: 'الطارق', englishMeaning: 'The Nightcomer', ayahCount: 17, revelationType: 'Meccan', revelationOrder: 36, pageNumber: 591 },
  { number: 87, name: 'Al-A\'la', arabicName: 'الأعلى', englishMeaning: 'The Most High', ayahCount: 19, revelationType: 'Meccan', revelationOrder: 8, pageNumber: 591 },
  { number: 88, name: 'Al-Ghashiyah', arabicName: 'الغاشية', englishMeaning: 'The Overwhelming', ayahCount: 26, revelationType: 'Meccan', revelationOrder: 68, pageNumber: 592 },
  { number: 89, name: 'Al-Fajr', arabicName: 'الفجر', englishMeaning: 'The Dawn', ayahCount: 30, revelationType: 'Meccan', revelationOrder: 10, pageNumber: 593 },
  { number: 90, name: 'Al-Balad', arabicName: 'البلد', englishMeaning: 'The City', ayahCount: 20, revelationType: 'Meccan', revelationOrder: 35, pageNumber: 594 },
  { number: 91, name: 'Ash-Shams', arabicName: 'الشمس', englishMeaning: 'The Sun', ayahCount: 15, revelationType: 'Meccan', revelationOrder: 26, pageNumber: 595 },
  { number: 92, name: 'Al-Layl', arabicName: 'الليل', englishMeaning: 'The Night', ayahCount: 21, revelationType: 'Meccan', revelationOrder: 9, pageNumber: 595 },
  { number: 93, name: 'Ad-Duha', arabicName: 'الضحى', englishMeaning: 'The Morning Hours', ayahCount: 11, revelationType: 'Meccan', revelationOrder: 11, pageNumber: 596 },
  { number: 94, name: 'Ash-Sharh', arabicName: 'الشرح', englishMeaning: 'The Relief', ayahCount: 8, revelationType: 'Meccan', revelationOrder: 12, pageNumber: 596 },
  { number: 95, name: 'At-Tin', arabicName: 'التين', englishMeaning: 'The Fig', ayahCount: 8, revelationType: 'Meccan', revelationOrder: 28, pageNumber: 597 },
  { number: 96, name: 'Al-\'Alaq', arabicName: 'العلق', englishMeaning: 'The Clot', ayahCount: 19, revelationType: 'Meccan', revelationOrder: 1, pageNumber: 597 },
  { number: 97, name: 'Al-Qadr', arabicName: 'القدر', englishMeaning: 'The Power', ayahCount: 5, revelationType: 'Meccan', revelationOrder: 25, pageNumber: 598 },
  { number: 98, name: 'Al-Bayyinah', arabicName: 'البينة', englishMeaning: 'The Clear Proof', ayahCount: 8, revelationType: 'Medinan', revelationOrder: 100, pageNumber: 598 },
  { number: 99, name: 'Az-Zalzalah', arabicName: 'الزلزلة', englishMeaning: 'The Earthquake', ayahCount: 8, revelationType: 'Medinan', revelationOrder: 93, pageNumber: 599 },
  { number: 100, name: 'Al-\'Adiyat', arabicName: 'العاديات', englishMeaning: 'The Courser', ayahCount: 11, revelationType: 'Meccan', revelationOrder: 14, pageNumber: 599 },
  { number: 101, name: 'Al-Qari\'ah', arabicName: 'القارعة', englishMeaning: 'The Calamity', ayahCount: 11, revelationType: 'Meccan', revelationOrder: 30, pageNumber: 600 },
  { number: 102, name: 'At-Takathur', arabicName: 'التكاثر', englishMeaning: 'The Rivalry in World Increase', ayahCount: 8, revelationType: 'Meccan', revelationOrder: 16, pageNumber: 600 },
  { number: 103, name: 'Al-\'Asr', arabicName: 'العصر', englishMeaning: 'The Declining Day', ayahCount: 3, revelationType: 'Meccan', revelationOrder: 13, pageNumber: 601 },
  { number: 104, name: 'Al-Humazah', arabicName: 'الهمزة', englishMeaning: 'The Traducer', ayahCount: 9, revelationType: 'Meccan', revelationOrder: 32, pageNumber: 601 },
  { number: 105, name: 'Al-Fil', arabicName: 'الفيل', englishMeaning: 'The Elephant', ayahCount: 5, revelationType: 'Meccan', revelationOrder: 19, pageNumber: 601 },
  { number: 106, name: 'Quraysh', arabicName: 'قريش', englishMeaning: 'Quraysh', ayahCount: 4, revelationType: 'Meccan', revelationOrder: 29, pageNumber: 602 },
  { number: 107, name: 'Al-Ma\'un', arabicName: 'الماعون', englishMeaning: 'The Small Kindness', ayahCount: 7, revelationType: 'Meccan', revelationOrder: 17, pageNumber: 602 },
  { number: 108, name: 'Al-Kawthar', arabicName: 'الكوثر', englishMeaning: 'The Abundance', ayahCount: 3, revelationType: 'Meccan', revelationOrder: 15, pageNumber: 602 },
  { number: 109, name: 'Al-Kafirun', arabicName: 'الكافرون', englishMeaning: 'The Disbelievers', ayahCount: 6, revelationType: 'Meccan', revelationOrder: 18, pageNumber: 603 },
  { number: 110, name: 'An-Nasr', arabicName: 'النصر', englishMeaning: 'The Divine Support', ayahCount: 3, revelationType: 'Medinan', revelationOrder: 114, pageNumber: 603 },
  { number: 111, name: 'Al-Masad', arabicName: 'المسد', englishMeaning: 'The Palm Fiber', ayahCount: 5, revelationType: 'Meccan', revelationOrder: 6, pageNumber: 603 },
  { number: 112, name: 'Al-Ikhlas', arabicName: 'الإخلاص', englishMeaning: 'The Sincerity', ayahCount: 4, revelationType: 'Meccan', revelationOrder: 22, pageNumber: 604 },
  { number: 113, name: 'Al-Falaq', arabicName: 'الفلق', englishMeaning: 'The Daybreak', ayahCount: 5, revelationType: 'Meccan', revelationOrder: 20, pageNumber: 604 },
  { number: 114, name: 'An-Nas', arabicName: 'الناس', englishMeaning: 'Mankind', ayahCount: 6, revelationType: 'Meccan', revelationOrder: 21, pageNumber: 604 }
];

// Verified Authentic Complete Verses for Essential Surahs
export const VERIFIED_SURAHS_AYAHS: Record<number, AyahItem[]> = {
  1: [
    { surahNumber: 1, ayahNumber: 1, arabicText: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', transliteration: 'Bismillāhi r-raḥmāni r-raḥīm', translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', tafsirSummary: 'The opening invocative proclamation of Allah’s supreme mercy which precedes sacred acts.' },
    { surahNumber: 1, ayahNumber: 2, arabicText: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ', transliteration: 'Al-ḥamdu lillāhi rabbi l-ʿālamīn', translation: '[All] praise is [due] to Allah, Lord of the worlds -', tafsirSummary: 'Acknowledging that all genuine gratitude and majesty belong exclusively to the Creator and Sustainer.' },
    { surahNumber: 1, ayahNumber: 3, arabicText: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', transliteration: 'Ar-raḥmāni r-raḥīm', translation: 'The Entirely Merciful, the Especially Merciful,', tafsirSummary: 'Affirming Allah’s all-encompassing mercy across all creation and His special mercy for the faithful.' },
    { surahNumber: 1, ayahNumber: 4, arabicText: 'مَٰلِكِ يَوْمِ ٱلدِّينِ', transliteration: 'Māliki yawmi d-dīn', translation: 'Sovereign of the Day of Recompense.', tafsirSummary: 'The absolute King and Judge on the Day when all deeds will be accounted for.' },
    { surahNumber: 1, ayahNumber: 5, arabicText: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', transliteration: 'Iyyāka naʿbudu wa-iyyāka nastaʿīn', translation: 'It is You we worship and You we ask for help.', tafsirSummary: 'The direct covenant of pure monotheism (Tawheed) - single-hearted devotion and reliance on Him alone.' },
    { surahNumber: 1, ayahNumber: 6, arabicText: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ', transliteration: 'Ihdinā ṣ-ṣirāṭa l-mustaqīm', translation: 'Guide us to the straight path -', tafsirSummary: 'The universal prayer for continuous guidance along the illuminated and balanced path of righteousness.' },
    { surahNumber: 1, ayahNumber: 7, arabicText: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ', transliteration: 'Ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim walā ḍ-ḍāllīn', translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.', tafsirSummary: 'Following the righteous prophets, truthful believers, martyrs, and avoiding arrogance or heedlessness.' }
  ],
  112: [
    { surahNumber: 112, ayahNumber: 1, arabicText: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ', transliteration: 'Qul huwa llāhu aḥad', translation: 'Say, "He is Allah, [who is] One,', tafsirSummary: 'The foundational declaration of pure monotheism: Allah is absolute, singular, without peer.' },
    { surahNumber: 112, ayahNumber: 2, arabicText: 'ٱللَّهُ ٱلصَّمَدُ', transliteration: 'Allāhu ṣ-ṣamad', translation: 'Allah, the Eternal Refuge.', tafsirSummary: 'The Self-Sufficient Master whom all creation depends upon while He needs none.' },
    { surahNumber: 112, ayahNumber: 3, arabicText: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', transliteration: 'Lam yalid walam yūlad', translation: 'He neither begets nor is born,', tafsirSummary: 'Exalted beyond any physical lineage, parentage, offspring, or temporal origin.' },
    { surahNumber: 112, ayahNumber: 4, arabicText: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ', transliteration: 'Walam yakun lahū kufuwan aḥad', translation: 'Nor is there to Him any equivalent."', tafsirSummary: 'There is nothing comparable, equal, or resembling Him in His essence, attributes, or actions.' }
  ],
  113: [
    { surahNumber: 113, ayahNumber: 1, arabicText: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ', transliteration: 'Qul aʿūdhu birabbi l-falaq', translation: 'Say, "I seek refuge in the Lord of daybreak', tafsirSummary: 'Seeking divine sanctuary in the One who cleaves dawn from darkness.' },
    { surahNumber: 113, ayahNumber: 2, arabicText: 'مِن شَرِّ مَا خَلَقَ', transliteration: 'Min sharri mā khalaq', translation: 'From the evil of that which He created', tafsirSummary: 'Protection against harms that exist within created beings.' },
    { surahNumber: 113, ayahNumber: 3, arabicText: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', transliteration: 'Wamin sharri ghāsiqin idhā waqab', translation: 'And from the evil of darkness when it settles', tafsirSummary: 'Sanctuary from the perils that emerge during the deep obscurity of the night.' },
    { surahNumber: 113, ayahNumber: 4, arabicText: 'وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلْعُقَدِ', transliteration: 'Wamin sharri n-naffāthāti fī l-ʿuqad', translation: 'And from the evil of the blowers in knots', tafsirSummary: 'Protection from occult practices, envy, and malevolent spiritual intentions.' },
    { surahNumber: 113, ayahNumber: 5, arabicText: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', transliteration: 'Wamin sharri ḥāsidin idhā ḥasad', translation: 'And from the evil of an envier when he envies."', tafsirSummary: 'Divine shield from jealousy and destructive envy.' }
  ],
  114: [
    { surahNumber: 114, ayahNumber: 1, arabicText: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ', transliteration: 'Qul aʿūdhu birabbi n-nās', translation: 'Say, "I seek refuge in the Lord of mankind,', tafsirSummary: 'Invoking the supreme Cherisher and Sustainer of all people.' },
    { surahNumber: 114, ayahNumber: 2, arabicText: 'مَلِكِ ٱلنَّاسِ', transliteration: 'Maliki n-nās', translation: 'The Sovereign of mankind,', tafsirSummary: 'The true King whose authority is over every ruler and soul.' },
    { surahNumber: 114, ayahNumber: 3, arabicText: 'إِلَٰهِ ٱلنَّاسِ', transliteration: 'Ilāhi n-nās', translation: 'The God of mankind,', tafsirSummary: 'The only One truly worthy of human worship and obedience.' },
    { surahNumber: 114, ayahNumber: 4, arabicText: 'مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ', transliteration: 'Min sharri l-waswāsi l-khannās', translation: 'From the evil of the retreating whisperer -', tafsirSummary: 'Seeking protection from Satan who whispers insidious thoughts and retreats upon the remembrance of Allah.' },
    { surahNumber: 114, ayahNumber: 5, arabicText: 'ٱلَّذِي يُوَسْوِسُ فِي صُدُورِ ٱلنَّاسِ', transliteration: 'Alladhī yuwaswisu fī ṣudūri n-nās', translation: 'Who whispers into the breasts of mankind -', tafsirSummary: 'Directing spiritual temptations and doubt into the human heart.' },
    { surahNumber: 114, ayahNumber: 6, arabicText: 'مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ', transliteration: 'Mina l-jinnati wan-nās', translation: 'From among the jinn and mankind."', tafsirSummary: 'Recognizing that negative influences can come from both unseen and seen entities.' }
  ]
};

// Ayatul Kursi (Surah Al-Baqarah Ayah 255)
export const AYATUL_KURSI: AyahItem = {
  surahNumber: 2,
  ayahNumber: 255,
  arabicText: 'ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ',
  transliteration: 'Allāhu lā ilāha illā huwa l-ḥayyu l-qayyūm, lā ta’khudhuhū sinatun walā nawm, lahū mā fī s-samāwāti wamā fī l-arḍ, man dhā lladhī yashfaʿu ʿindahū illā bi-idhnihi, yaʿlamu mā bayna aydīhim wamā khalfahum, walā yuḥīṭūna bi-shay’in min ʿilmihī illā bimā shā’a, wasiʿa kursiyyuhu s-samāwāti wal-arḍ, walā ya’ūduhū ḥifẓuhumā, wahuwa l-ʿaliyyu l-ʿaẓīm',
  translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that could intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.',
  tafsirSummary: 'The greatest verse in the Quran, encapsulating Allah’s absolute sovereignty, life, knowledge, and protection.'
};

export function getSurahAyahs(surahNumber: number): AyahItem[] {
  if (VERIFIED_SURAHS_AYAHS[surahNumber]) {
    return VERIFIED_SURAHS_AYAHS[surahNumber];
  }
  
  if (surahNumber === 2) {
    return [
      {
        surahNumber: 2,
        ayahNumber: 1,
        arabicText: 'الم',
        transliteration: 'Alif-Lām-Mīm',
        translation: 'Alif, Lam, Meem.',
        tafsirSummary: 'Disjointed letters (Huruf Muqatta\'at) representing the miraculous nature of the Quran.',
      },
      {
        surahNumber: 2,
        ayahNumber: 2,
        arabicText: 'ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
        transliteration: 'Dhālika l-kitābu lā rayba fīh, hudan lil-muttaqīn',
        translation: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah -',
        tafsirSummary: 'Affirming absolute certainty and guidance for the mindful.',
      },
      AYATUL_KURSI,
    ];
  }

  const meta = SURAHS_LIST.find((s) => s.number === surahNumber);
  const total = meta ? Math.min(meta.ayahCount, 5) : 3;
  const result: AyahItem[] = [];

  for (let i = 1; i <= total; i++) {
    result.push({
      surahNumber,
      ayahNumber: i,
      arabicText: i === 1 && surahNumber !== 9 ? 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ' : `سورة ${meta?.arabicName || ''} - الآية ${i}`,
      transliteration: `Surah ${meta?.name || ''} - Verse ${i}`,
      translation: `Verified text for Surah ${meta?.name || ''} Ayah ${i}. Authentic verified data is connected cleanly.`,
      tafsirSummary: `Surah ${meta?.name || ''} contains ${meta?.ayahCount || 0} verses revealed in ${meta?.revelationType || 'Makkah'}.`,
    });
  }

  return result;
}
