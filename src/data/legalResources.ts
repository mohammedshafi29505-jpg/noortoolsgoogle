/**
 * Verified Islamic Legal Resources & Scholarly Research Directory
 * NoorTools DOES NOT issue fatwas. We provide a curated, attribution-verified
 * directory of accredited international research academies and councils.
 */

import { LegalResource } from '../types';

export const ISLAMIC_LEGAL_DISCLAIMER =
  'NoorTools does not issue fatwas. For personal religious rulings, consult a qualified local scholar or an accredited Islamic legal council.';

export interface ScholarlyBody {
  id: string;
  name: string;
  location: string;
  description: string;
  specialty: string;
  website: string;
}

export const VERIFIED_SCHOLARLY_BODIES: ScholarlyBody[] = [
  {
    id: 'res_al_azhar',
    name: 'Al-Azhar Islamic Research Academy (Majma\' al-Buhuth al-Islamiyyah)',
    location: 'Cairo, Egypt (Global Sunni Authority)',
    description: 'The historic seat of Sunni Islamic scholarship and jurisprudence, producing verified academic papers, contemporary resolutions, and fatwas grounded in the four traditional schools.',
    specialty: 'Comparative Jurisprudence, Bioethics, Family Law',
    website: 'https://www.azhar.eg',
  },
  {
    id: 'res_oic_fiqh',
    name: 'International Islamic Fiqh Academy (IIFA / Majma\' al-Fiqh al-Islami)',
    location: 'Jeddah, Saudi Arabia (OIC Member States)',
    description: 'The highest collective juridical council representing jurists and scientists from 57 member states, specializing in contemporary economic, financial, medical, and technological rulings.',
    specialty: 'Islamic Economics, Sukuk, Biomedical Ethics, Modern Contracts',
    website: 'https://iifa-aifi.org',
  },
  {
    id: 'res_ecfr',
    name: 'European Council for Fatwa and Research (ECFR)',
    location: 'Dublin, Ireland / European Union',
    description: 'A specialized juridical body founded to provide contextualized jurisprudence (Fiqh al-Aqalliyyat) addressing the religious, legal, and civic realities of Muslim minorities living in Europe.',
    specialty: 'Minority Jurisprudence, Civic Engagement, European Prayer Calculations',
    website: 'https://www.e-cfr.org',
  },
  {
    id: 'res_amja',
    name: 'Assembly of Muslim Jurists of America (AMJA)',
    location: 'North America / United States',
    description: 'A coalition of Islamic scholars providing guidance and research papers regarding Islamic law in American and Western legal environments.',
    specialty: 'Contemporary American Jurisprudence, Mortgages, Corporate Ethics',
    website: 'https://www.amjaonline.org',
  },
  {
    id: 'res_mufti_singapore',
    name: 'Office of the Mufti & Islamic Religious Council of Singapore (MUIS)',
    location: 'Singapore (Southeast Asia)',
    description: 'A statutory board producing fatwas addressing modern multiracial urban societies, digital ethics, halal standards, and modern medical practices.',
    specialty: 'Halal Standards, Urban Governance, Organ Donation Rulings',
    website: 'https://www.muis.gov.sg',
  },
  {
    id: 'res_dar_al_ifta_jordan',
    name: 'General Iftaa\' Department of Jordan (Da’irat al-Ifta’ al-’Aam)',
    location: 'Amman, Jordan',
    description: 'Accredited national scholarly body issuing research papers and responses across commercial law, inheritance mathematics, and social affairs.',
    specialty: 'Inheritance Calculation, Commercial Transactions, Family Arbitration',
    website: 'https://www.aliftaa.jo',
  },
];

export const VERIFIED_LEGAL_RESOURCES: LegalResource[] = VERIFIED_SCHOLARLY_BODIES.map((b) => ({
  id: b.id,
  title: b.name,
  institution: b.name,
  country: b.location,
  description: b.description,
  specialty: b.specialty,
  url: b.website,
  verifiedOfficial: true,
}));
