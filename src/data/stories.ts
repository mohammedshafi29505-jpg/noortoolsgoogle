/**
 * NoorTools Verified Islamic Stories & History
 * 
 * Authentic historical accounts from the Quran and verified Seerah/historical works.
 * Strictly anchored to Quranic verses, Tafsir Ibn Kathir (Qisas al-Anbiya), and Ibn Hisham's Seerah.
 * Zero fabricated legends or uncorroborated myths.
 */

import { IslamicStoryItem } from '../types';

export const VERIFIED_ISLAMIC_STORIES: IslamicStoryItem[] = [
  {
    id: 'story-ibrahim-tawheed',
    title: 'Prophet Ibrahim: The Search for Truth and Uncompromising Monotheism',
    category: 'prophets',
    era: 'Pre-Islamic Antiquity (Mesopotamia / Hejaz)',
    quranReferences: [
      { surah: 'Al-An\'am', ayah: '74-79' },
      { surah: 'Al-Baqarah', ayah: '124-129' },
      { surah: 'Al-Anbiya', ayah: '51-71' },
    ],
    primarySource: 'Al-Quran & Ibn Kathir, Stories of the Prophets (Qisas al-Anbiya)',
    summary: 'Prophet Ibrahim (\'Alayhis-salam) observed the celestial bodies—stars, moon, and sun—and demonstrated that created things that rise and set cannot be divine, dedicating his entire being solely to the Creator of the heavens and the earth.',
    narrative: [
      'Born in an era immersed in idol worship and celestial astrology, Ibrahim (\'Alayhis-salam) was blessed from early youth with acute discernment and sound innate faith (fitrah). Looking upon the idols carved by his father and community, he questioned how inanimate stone carved by human hands could ever provide sustenance, hear supplications, or decree destiny.',
      'In an eloquent debate recorded in Surah Al-An\'am, Ibrahim guided his people through deductive reasoning: When night fell, he saw a radiant star and said: "This is my lord?" But when it set, he concluded: "I do not love that which fades." When he saw the luminous moon rising, he remarked: "This is my lord?" Yet when it set, he turned inward in prayer: "Unless my Lord guides me, I will surely be among the lost." Finally, when he saw the sun ablaze across the horizon, he said: "This is greater!" But as dusk enveloped the sky, he proclaimed unequivocally: "O my people, I am free of what you associate with Allah. Indeed, I have turned my face toward He who created the heavens and the earth, upright, and I am not of the polytheists."',
      'His uncompromising conviction led him to debate King Nimrod on life and death, boldly stating: "Indeed, Allah brings the sun from the east; so bring it from the west." The tyrant was confounded. Even when cast into a roaring inferno by his adversaries, Ibrahim uttered the eternal words: "Hasbunallahu wa ni\'mal wakeel" (Allah is sufficient for us, and He is the best Disposer of affairs). Allah commanded the fire: "O fire, be coolness and peace upon Ibrahim."',
      'Later in his blessed life, alongside his righteous son Ismail (\'Alayhis-salam), Ibrahim raised the foundations of the Holy Kaaba in the barren valley of Makkah, praying for a Messenger to arise from their progeny who would recite divine verses, purify mankind, and impart wisdom—a prayer fulfilled in the advent of the Prophet Muhammad ﷺ.'
    ],
    keyLessons: [
      'Genuine faith is built on rational reflection, sincerity of heart, and moral courage.',
      'Reliance upon Allah (Tawakkul) brings peace and divine intervention in the most terrifying trials.',
      'Sincere legacy and parenthood: Raising children with spiritual vision leaves eternal blessings across generations.',
      'The Kaaba represents pure monotheism, devoid of racial, tribal, or geographical favoritism.'
    ]
  },
  {
    id: 'story-yusuf-patience',
    title: 'Prophet Yusuf: From the Darkness of the Well to the Throne of Honor',
    category: 'prophets',
    era: 'Bronze Age Egypt / Canaan',
    quranReferences: [
      { surah: 'Yusuf', ayah: '1-111' }
    ],
    primarySource: 'Surah Yusuf (Ahsan al-Qasas - The Best of Stories) & Tafsir Ibn Kathir',
    summary: 'The comprehensive journey of Prophet Yusuf (\'Alayhis-salam): overcoming fraternal jealousy, resisting moral temptation in the minister\'s palace, enduring wrongful imprisonment, and ultimately demonstrating breathtaking mercy and forgiveness.',
    narrative: [
      'Described in the Holy Quran as "Ahsan al-Qasas" (the Best of Stories), the account of Yusuf (\'Alayhis-salam) unfolds like an epic tapestry of human emotions: dreams, jealousy, betrayal, temptation, patience, wisdom, and divine providence.',
      'As a beloved young boy in Canaan, Yusuf experienced a prophetic dream of eleven stars, the sun, and the moon prostrating to him. Recognizing its grandeur, his father Ya\'qub (\'Alayhis-salam) cautioned him against sharing it with his brothers, whose simmering jealousy soon culminated in a conspiracy. They cast young Yusuf into the bottom of a desolate desert well, returning to their father with a blood-stained shirt claiming a wolf had devoured him.',
      'Rescued by a passing caravan and sold for a meager price into the household of the Aziz of Egypt, Yusuf grew into extraordinary maturity, beauty, and wisdom. When confronted with persistent temptation from the minister’s wife, Yusuf chose moral integrity over worldly comfort, fleeing the chamber and choosing imprisonment over disobedience to Allah: "My Lord, prison is dearer to me than that to which they invite me."',
      'Years later, his interpretation of the Egyptian King\'s dream of seven lean cows devouring seven fat ones rescued an entire civilization from starvation. Appointed as trusted administrator of Egypt’s granaries, Yusuf eventually welcomed his remorseful brothers. Rather than seeking vengeance, he uttered words immortalized in divine revelation: "No blame will there be upon you today. May Allah forgive you; and He is the most merciful of the merciful."'
    ],
    keyLessons: [
      'Sabr Jameel (Beautiful Patience): Trusting Allah’s silent decree even when circumstances appear overwhelmingly dark.',
      'Guarding chastity and personal honor under intense social pressure is the true mark of divine nobility.',
      'Spite and jealousy destroy the perpetrator before harming the intended victim.',
      'Forgiveness heals family fractures and restores dignity to both the wronged and the repentant.'
    ]
  },
  {
    id: 'story-musa-sea',
    title: 'Prophet Musa: Confronting Tyranny and the Parting of the Red Sea',
    category: 'prophets',
    era: 'Pharaonic Egypt (New Kingdom Era)',
    quranReferences: [
      { surah: 'Al-Qasas', ayah: '3-42' },
      { surah: 'Ash-Shu\'ara', ayah: '10-68' },
      { surah: 'Ta-Ha', ayah: '9-98' },
    ],
    primarySource: 'Al-Quran & Authentic Seerah Collections',
    summary: 'Prophet Musa (\'Alayhis-salam) was raised in the palace of his sworn enemy, received revelation in the sacred valley of Tuwa, challenged Pharaoh to release the oppressed, and led his people through the miraculously parted waters of the Red Sea.',
    narrative: [
      'When Pharaoh instituted an atrocious decree slaughtering newborn male Israelites to safeguard his throne, the mother of Musa received a divine inspiration: place the suckling infant into a chest and cast it into the Nile. Drawn to the palace steps by Pharaoh’s queen Asiya—a woman of profound secret faith—Musa was raised beneath the very roof of the oppressor.',
      'After years of exile in Madyan, Musa was called to prophethood at the burning bush on Mount Sinai. Armed with the divine message and accompanied by his brother Harun (\'Alayhis-salam), Musa stood before Pharaoh demanding justice, liberation for the enslaved children of Israel, and acknowledgment of the Lord of the worlds.',
      'Pharaoh responded with arrogance, sorcery, and relentless persecution. When the believers finally set forth toward the Sinai wilderness, Pharaoh’s cavalry trapped them between military spears and the roaring depths of the sea. Terror gripped the people, who cried: "Indeed, we are overtaken!" Musa replied with ironclad conviction: "Nay! Indeed, with me is my Lord; He will guide me."',
      'Allah commanded Musa to strike the sea with his staff. The waters cleaved into twelve soaring walls of crystal liquid like towering mountains, allowing the believers to cross safely upon dry seabed. When Pharaoh’s army rushed into the path in reckless hubris, the waters collapsed, drowning the tyrant and proving forever that ultimate victory belongs to righteousness.'
    ],
    keyLessons: [
      'No tyrant is too powerful for divine justice, and no oppressed believer is forgotten by Allah.',
      'Unshakable conviction in divine promises transforms seemingly impossible dead ends into paths of miraculous escape.',
      'Standing up for human liberty and against systemic oppression is at the very heart of prophetic missions.',
      'Humility in leadership: Musa constantly turned to Allah for eloquence, patience, and guidance.'
    ]
  },
  {
    id: 'story-cave-hira',
    title: 'The First Revelation: In the Solitude of Cave Hira',
    category: 'seerah',
    era: '610 CE (Jabal an-Nur, Makkah)',
    quranReferences: [
      { surah: 'Al-\'Alaq', ayah: '1-5' },
      { surah: 'Al-Muddaththir', ayah: '1-7' },
      { surah: 'Al-Qadr', ayah: '1-5' },
    ],
    primarySource: 'Sahih al-Bukhari (Book of Revelation) & Ibn Hisham\'s Seerah',
    summary: 'In the tranquil seclusion of Jabal an-Nur, the Angel Jibril descended with the opening divine command: "Iqra!" (Read!), inaugurating the final universal revelation to humanity.',
    narrative: [
      'Distressed by the rampant injustice, idol worship, female infanticide, and tribal warfare consuming pre-Islamic Arabian society, Muhammad ibn Abdullah ﷺ sought solitude for contemplative worship in the rugged cave atop Jabal an-Nur, the Mountain of Light.',
      'During the blessed month of Ramadan, in the solitude of the night, the Angel Jibril appeared in majestic splendor. The Angel embraced him firmly and commanded: "Iqra!" (Read!). The Prophet ﷺ replied humbly: "I am not one who reads." Jibril embraced him a second and third time until all energy was spent, then recited the opening verses of Surah Al-\'Alaq: "Read in the name of your Lord who created! Created man from a clinging substance. Read, and your Lord is the most Generous, who taught by the pen, taught man that which he knew not."',
      'Trembling with spiritual awe, the Prophet ﷺ rushed down the mountain to his beloved wife Khadijah (may Allah be pleased with her), saying: "Zammilooni, zammilooni!" (Cover me, wrap me in garments!). With unmatched wisdom, comfort, and loyalty, Khadijah assured him: "Never! By Allah, Allah will never disgrace you. You uphold family ties, you bear burdens for the weak, you assist the destitute, you honor the guest, and you stand by those stricken by calamity."',
      'She accompanied him to her venerable cousin Waraqah ibn Nawfal, a Christian scholar well-versed in the scriptures, who confirmed: "This is the same Archangel Namus that descended upon Musa. Would that I were young and alive when your people expel you!" Thus commenced twenty-three years of transformative guidance that elevated human consciousness forever.'
    ],
    keyLessons: [
      'Knowledge and literacy: The very first command of Islam was "Read!", underscoring that faith must be grounded in understanding.',
      'The irreplaceable role of Khadijah: Her steadfast emotional intelligence and belief provided the bedrock for the fledgling message.',
      'High moral character precedes spiritual leadership; before receiving revelation, the Prophet ﷺ was known as Al-Amin (the Trustworthy).',
      'Solitude and reflection are vital spiritual practices for clearing mental clutter and seeking divine truth.'
    ]
  },
  {
    id: 'story-abu-bakr-loyalty',
    title: 'Abu Bakr as-Siddiq: The Truthful Companion of the Cave',
    category: 'sahaba',
    era: '622–634 CE (Makkah, Madinah)',
    quranReferences: [
      { surah: 'At-Tawbah', ayah: '40' },
      { surah: 'Al-Layl', ayah: '17-21' },
    ],
    primarySource: 'Sahih al-Bukhari & Tarikh at-Tabari',
    summary: 'The life of the closest friend of the Prophet ﷺ, who sacrificed his entire fortune for the liberation of the enslaved, accompanied him on the perilous Hijrah journey, and stabilized the Ummah in its most fragile moments.',
    narrative: [
      'Abu Bakr as-Siddiq (may Allah be pleased with him) was a man of pristine honesty, aristocratic gentleness, and profound generosity. When the Prophet ﷺ announced his mission, Abu Bakr embraced Islam without an instant of hesitation or doubt, earning the honorific title "As-Siddiq" (the Steadfast Affirmer of Truth).',
      'He utilized his vast commercial wealth to purchase the freedom of brutally tortured slaves in Makkah, including Bilal ibn Rabah and Amir ibn Fuhayrah, asking nothing in return except the pleasure of his Lord. Surah Al-Layl testified to his devotion: "And the most righteous will be kept away from it—he who gives his wealth to purify himself, and not for any favor owed to him, but only seeking the countenance of his Lord, Most High."',
      'During the perilous migration (Hijrah) from Makkah to Madinah, Abu Bakr accompanied the Messenger of Allah ﷺ into the Cave of Thawr. When their trackers stood just inches above the cave mouth, Abu Bakr whispered in anxious concern for the Prophet: "O Messenger of Allah, if one of them merely looks beneath his feet, he will see us!" The Prophet ﷺ smiled calmly and said: "O Abu Bakr, what think you of two companions whose third is Allah?" Divine reassurance descended upon them, immortalized in Surah At-Tawbah.',
      'Upon the passing of the Messenger of Allah ﷺ, when shock paralyzed the community, Abu Bakr delivered his historic oration that anchored Islamic monotheism for all time: "Whoever among you worshipped Muhammad, know that Muhammad has passed away. But whoever worshipped Allah, know that Allah is Ever-Living and does not die."'
    ],
    keyLessons: [
      'Unconditional loyalty to moral truth even when public opinion is fiercely hostile.',
      'Wealth is a sacred trust to be expended for human dignity, freeing the oppressed, and community elevation.',
      'Emotional composure in leadership during existential crises preserves nations from collapse.',
      'True friendship is founded on shared spiritual values and mutual sacrifice.'
    ]
  }
];
