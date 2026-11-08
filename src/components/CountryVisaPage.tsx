import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Landmark,
  Sparkles,
  Wallet,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Search,
  CheckCircle2,
  ShieldCheck,
  BookX,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  FileText,
  Check,
  X,
  MessageCircle,
  Calendar,
  Plane,
  FileCheck2,
  ArrowLeft,
  Send,
} from 'lucide-react';
import { PillHeader } from './PillHeader';
import { SecondaryCtaBanner } from './SecondaryCtaBanner';
import { DEFAULT_FAQ_CATEGORIES } from './FaqSection';

export interface CountryVisaPageProps {
  countryName?: string;
  onBackToHome?: () => void;
  onOpenVisaModal?: () => void;
  onNavigateToExplore?: () => void;
  onNavigateToBlogs?: () => void;
  onNavigateToVisas?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToProcess?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToContact?: () => void;
}

interface CountryVisaData {
  name: string;
  flagCode: string;
  heroImage: string;
  videoUrl?: string;
  authority: string;
  visaType: string;
  stayLength: string;
  validity: string;
  entryType: string;
  govtFee: number;
  procFee: number;
  readyDate: string;
  dispatchTime: string;
  documents: { title: string; desc: string }[];
  rejectionReasons: { title: string; desc: string }[];
  faqs: { category: string; items: { question: string; answer: string }[] }[];
  reviews: { name: string; date: string; country: string; rating: number; text: string }[];
}

const COUNTRIES_REGISTRY: Record<string, CountryVisaData> = {
  malaysia: {
    name: 'Malaysia',
    flagCode: 'my',
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=85',
    authority: 'Immigration Department of Malaysia Certified',
    visaType: 'e-visa',
    stayLength: '30 days',
    validity: '6 months',
    entryType: 'Single Entry',
    govtFee: 15200,
    procFee: 2518,
    readyDate: '30 Oct 2026',
    dispatchTime: '09:00 PM',
    documents: [
      { title: '1. Original Passport Bio-Data Scan', desc: 'Clear color scan of pages 1-3. Minimum 6 months validity required from departure date.' },
      { title: '2. Recent Passport-Sized Photograph', desc: 'White plain background, 35mm x 50mm, taken within 6 months, clear facial features.' },
      { title: '3. Confirmed Return Flight Ticket', desc: 'Verifiable airline booking with PNR showing confirmed departure and return from Malaysia.' },
      { title: '4. Hotel Accommodation Booking', desc: 'Confirmed hotel voucher or sponsor letter if staying with relatives in Malaysia.' },
      { title: '5. Bank Account Statement', desc: 'Last 3 to 6 months bank statement showing closing balance of at least PKR 300,000.' },
    ],
    rejectionReasons: [
      { title: 'Expired or Short-Validity Passport', desc: 'Applying with a passport that has expired or expires within 6 months of arrival.' },
      { title: 'Insufficient Account Balance', desc: 'Failing to demonstrate enough financial resources to support your tourist stay.' },
      { title: 'Unconfirmed Flight or Hotel Vouchers', desc: 'Submitting unverified or cancelled flight reservations without legitimate PNR codes.' },
      { title: 'Previous Immigration Violations', desc: 'Having overstayed or violated immigration terms in Malaysia or other ASEAN nations.' },
    ],
    faqs: [
      {
        category: 'General Information',
        items: [
          { question: 'What is a Malaysia e-visa for Pakistani citizens?', answer: 'The Malaysia e-visa is an official digital entry clearance issued by the Immigration Department of Malaysia allowing Pakistani passport holders to enter and travel within Malaysia for tourism, business meetings, or social visits for up to 30 consecutive days.' },
          { question: 'Is the e-visa valid across all Malaysian territories including Sabah and Sarawak?', answer: 'Yes, the eVisa is valid for entry into Peninsular Malaysia as well as Sabah and Sarawak, subject to the local state immigration checks upon arrival at international border checkpoints.' },
          { question: 'Do I need to visit the Malaysian High Commission in Islamabad or Karachi?', answer: 'No. The entire process is 100% online. You do not need to attend an in-person interview, surrender your physical passport, or visit any consulate or VFS center.' },
        ],
      },
      {
        category: 'Eligibility & Requirements',
        items: [
          { question: 'What are the mandatory documents needed for Pakistan passport holders?', answer: 'Valid Pakistani Passport (6+ months validity), recent digital photograph with white background, confirmed return flight with PNR, hotel reservation, and recent bank statement.' },
          { question: 'Can minors travel on their parent’s eVisa?', answer: 'No. Each applicant, including infants and children, must have their own valid individual passport and separate eVisa application.' },
        ],
      },
      {
        category: 'Processing & Delivery',
        items: [
          { question: 'How long does it take to process the Malaysia e-visa?', answer: 'Standard processing takes 2 to 3 business days from document clearance. Expedited processing can be completed within 24 to 36 hours.' },
          { question: 'How will I receive my approved eVisa?', answer: 'Your official e-visa is delivered directly to your registered email and WhatsApp as a high-resolution PDF document with cryptographic digital verification barcodes.' },
        ],
      },
    ],
    reviews: [
      { name: 'Syed Bilal Shah', date: '18 Oct 2026', country: 'Malaysia', rating: 5, text: 'Seamless experience applying from Lahore! The documents verification team called me within 30 minutes of submission to verify my passport bio-data and bank statement. Got the official Malaysian eVisa approved exactly on schedule without visiting any consulate.' },
      { name: 'Ahsanul Awan', date: '14 Oct 2026', country: 'Malaysia', rating: 5, text: 'Highly recommended for Pakistani travelers visiting Kuala Lumpur for business or holiday. Zero embassy visits needed, transparent government fee breakdown, and instantaneous WhatsApp updates throughout the entire process.' },
      { name: 'Kamran Khan', date: '9 Oct 2026', country: 'Malaysia', rating: 5, text: 'Applied for 4 family members together. The real-time consular tracking gave complete peace of mind. Every eVisa barcode was verified at Islamabad airport immigration with zero hassle.' },
    ],
  },
  maldives: {
    name: 'Maldives',
    flagCode: 'mv',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85',
    authority: 'Republic of Maldives Immigration Certified',
    visaType: 'e-visa / Entry Clearance',
    stayLength: '30 days',
    validity: '30 days',
    entryType: 'Tourist Entry',
    govtFee: 0,
    procFee: 8500,
    readyDate: '28 Oct 2026',
    dispatchTime: '06:00 PM',
    documents: [
      { title: '1. Machine-Readable Passport Scan', desc: 'Valid Pakistani passport with at least 1 month validity from arrival date.' },
      { title: '2. Pre-Paid Resort or Hotel Voucher', desc: 'Confirmed booking in an accredited tourist facility or guesthouse.' },
      { title: '3. Return Flight Itinerary', desc: 'Confirmed airline ticket with departure date within 30 days.' },
      { title: '4. IMUGA Health & Traveler Declaration', desc: 'Online self-declaration submitted within 96 hours prior to flight departure.' },
    ],
    rejectionReasons: [
      { title: 'Unconfirmed Island Resort Booking', desc: 'Lack of confirmed booking at an officially registered resort or hotel.' },
      { title: 'Missing IMUGA Declaration', desc: 'Failure to complete the mandatory IMUGA digital entry form prior to boarding.' },
    ],
    faqs: [
      {
        category: 'Entry Rules',
        items: [
          { question: 'Do Pakistani tourists receive on-arrival visa in Maldives?', answer: 'Yes! Tourist visas are issued free of government charge upon arrival in Malé for up to 30 days, provided you hold valid hotel booking, return flight, and IMUGA declaration.' },
          { question: 'Is a bank statement required for Maldives?', answer: 'A minimum of USD 100 plus USD 50 per day of stay in cash or verifiable card statement is recommended.' },
        ],
      },
    ],
    reviews: [
      { name: 'Tariq Mansoor', date: '19 Oct 2026', country: 'Maldives', rating: 5, text: 'Our honeymoon trip to Maafushi was smoothly arranged. The IMUGA filing and resort documentation were pre-cleared by the visa team before our Karachi departure.' },
      { name: 'Sana Qureshi', date: '12 Oct 2026', country: 'Maldives', rating: 5, text: 'Quickest service ever. Completed all entry permits in less than 24 hours.' },
      { name: 'Umar Farooq', date: '4 Oct 2026', country: 'Maldives', rating: 5, text: 'Clear instructions for Pakistani passport holders traveling through Colombo to Male.' },
    ],
  },
  ireland: {
    name: 'Ireland',
    flagCode: 'ie',
    heroImage: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1600&q=85',
    authority: 'Irish Naturalisation and Immigration Service (INIS)',
    visaType: 'Short Stay "C" Visa',
    stayLength: '90 days',
    validity: '180 days',
    entryType: 'Single / Multi Entry',
    govtFee: 24000,
    procFee: 3594,
    readyDate: '2 Dec 2026',
    dispatchTime: '05:44 PM',
    documents: [
      { title: '1. Original Passport & Previous Passports', desc: 'Passport with at least 6 months validity and 2 blank pages.' },
      { title: '2. 6 Months Detailed Bank Statements', desc: 'Signed and stamped original bank statement showing sustained financial stability.' },
      { title: '3. Employment & Leave Letter', desc: 'Official letter from Pakistani employer stating salary, role, and authorized leave.' },
      { title: '4. Detailed Day-by-Day Travel Plan', desc: 'Complete planned travel itinerary across Dublin and surrounding counties.' },
    ],
    rejectionReasons: [
      { title: 'Insufficient Proof of Return Ties', desc: 'Failure to show strong employment, property, or family ties to Pakistan.' },
      { title: 'Unexplained Lump-Sum Deposits', desc: 'Sudden large deposits into bank account without verifiable source documents.' },
    ],
    faqs: [
      {
        category: 'Visa Requirements',
        items: [
          { question: 'Can I travel to the UK on an Irish visa?', answer: 'Under the British-Irish Visa Scheme (BIVS), eligible Indian and Chinese nationals may travel between both, but Pakistani citizens generally require separate UK and Irish visas unless specific endorsements apply.' },
          { question: 'Where are biometrics submitted in Pakistan?', answer: 'Biometrics and physical passports are submitted at VFS Global centers in Islamabad, Lahore, Karachi, or Mirpur.' },
        ],
      },
    ],
    reviews: [
      { name: 'Adeel Bashir', date: '16 Oct 2026', country: 'Ireland', rating: 5, text: 'Secured my Dublin conference visa without a glitch. The dossier preparation was top tier.' },
      { name: 'Hina Rizvi', date: '8 Oct 2026', country: 'Ireland', rating: 5, text: 'Their document review caught two inconsistencies in my bank letter that would have caused a refusal. Approved in 3 weeks!' },
      { name: 'Daniyal Sheikh', date: '29 Sep 2026', country: 'Ireland', rating: 5, text: 'Professional support for family visit visa to Galway. Clear breakdown of VFS and consular steps.' },
    ],
  },
  canada: {
    name: 'Canada',
    flagCode: 'ca',
    heroImage: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1600&q=85',
    authority: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    visaType: 'Visitor Visa (TRV)',
    stayLength: 'Up to 6 months per visit',
    validity: 'Up to 10 years',
    entryType: 'Multiple Entry',
    govtFee: 45000,
    procFee: 20178,
    readyDate: '22 Dec 2026',
    dispatchTime: '05:33 PM',
    documents: [
      { title: '1. Passport Bio Scan & Travel History', desc: 'Scans of all stamps, visas, and biographical pages from current and expired passports.' },
      { title: '2. Financial Dossier & Proof of Funds', desc: 'Bank statements, property valuations, NTN returns for the past 2 years.' },
      { title: '3. Purpose of Travel & Invitation Letter', desc: 'Invitation letter from Canadian resident or detailed personal itinerary.' },
      { title: '4. Digital Biometrics Submission', desc: 'Biometric fingerprinting and photo scan at VFS Canada in Pakistan.' },
    ],
    rejectionReasons: [
      { title: 'Weak Economic Ties to Home Country', desc: 'Lack of substantial employment or financial roots tying the applicant to Pakistan.' },
      { title: 'Unclear Purpose of Visit', desc: 'Vague itinerary without concrete accommodation or local contacts.' },
    ],
    faqs: [
      {
        category: 'TRV Process',
        items: [
          { question: 'How long is the Canadian tourist visa valid for?', answer: 'Canadian multiple-entry visitor visas are typically granted for up to 10 years or until one month before your passport expires.' },
          { question: 'Do I need to submit paper forms?', answer: 'No, all applications are lodged digitally via IRCC Secure Portal with biometrics completed at VFS.' },
        ],
      },
    ],
    reviews: [
      { name: 'Shahid Mehmood', date: '15 Oct 2026', country: 'Canada', rating: 5, text: 'Got my 8-year multiple entry visa for Canada! The team structured my statement of purpose flawlessly.' },
      { name: 'Ayesha Siddiqua', date: '11 Oct 2026', country: 'Canada', rating: 5, text: 'Excellent guidance on Canadian biometrics and family invitation documentation.' },
      { name: 'Moazzam Ali', date: '1 Oct 2026', country: 'Canada', rating: 5, text: 'Very thorough case preparation. Approved in less time than estimated on IRCC.' },
    ],
  },
  'united kingdom': {
    name: 'United Kingdom',
    flagCode: 'gb',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=85',
    authority: 'UK Visas and Immigration (UKVI) Accredited',
    visaType: 'Standard Visitor Visa',
    stayLength: 'Up to 6 months',
    validity: '180 days / 2 Years',
    entryType: 'Multiple Entry',
    govtFee: 68000,
    procFee: 21497,
    readyDate: '17 Nov 2026',
    dispatchTime: '05:40 PM',
    documents: [
      { title: '1. Valid Passport with Blank Pages', desc: 'At least 6 months validity beyond intended departure from the UK.' },
      { title: '2. 6 Months Bank Statements & Pay Slips', desc: 'Demonstrating genuine income source matching income tax declarations.' },
      { title: '3. Employment & Tax Documents', desc: 'Salary slips, employment contract, and FBR tax returns.' },
      { title: '4. Accommodation & Travel Schedule', desc: 'Proof of hotel reservation or host accommodation declaration.' },
    ],
    rejectionReasons: [
      { title: 'Discrepancy Between Income and Bank Deposits', desc: 'Unexplained cash inflows that do not match regular disclosed earnings.' },
      { title: 'Doubt Over Genuine Visitor Intention', desc: 'Insufficient proof that you intend to return to Pakistan after your visit.' },
    ],
    faqs: [
      {
        category: 'UKVI Guidelines',
        items: [
          { question: 'Can I fast-track my UK visa application in Pakistan?', answer: 'Yes, UKVI offers Priority (5 working days) and Super Priority (next working day) processing at VFS centers in Pakistan for additional fees.' },
          { question: 'Can I do business activities on a Standard Visitor Visa?', answer: 'Yes, attending business meetings, conferences, signing contracts, and site visits are permitted.' },
        ],
      },
    ],
    reviews: [
      { name: 'Dr. Noman Malik', date: '20 Oct 2026', country: 'United Kingdom', rating: 5, text: 'Approved for London medical conference in 10 days using standard service. Top-class documentation.' },
      { name: 'Maria Zahoor', date: '13 Oct 2026', country: 'United Kingdom', rating: 5, text: 'Transparent guidance on funds declaration. No confusion, no unnecessary delays.' },
      { name: 'Haris Javed', date: '6 Oct 2026', country: 'United Kingdom', rating: 5, text: 'Applied with my parents. All 3 visas approved seamlessly at Islamabad VFS.' },
    ],
  },
  morocco: {
    name: 'Morocco',
    flagCode: 'ma',
    heroImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85',
    authority: 'Ministry of Foreign Affairs Kingdom of Morocco',
    visaType: 'Electronic Visa (AEVM)',
    stayLength: '30 days',
    validity: '180 days',
    entryType: 'Single Entry',
    govtFee: 32000,
    procFee: 9391,
    readyDate: '25 Oct 2026',
    dispatchTime: '05:51 AM',
    documents: [
      { title: '1. Passport Data Page Scan', desc: 'Valid Pakistani passport with minimum 6 months validity.' },
      { title: '2. Confirmed Return Flight Ticket', desc: 'Airline reservation showing entry and exit from Casablanca or Marrakech.' },
      { title: '3. Hotel Accommodation Voucher', desc: 'Confirmed riad or hotel reservation for duration of stay.' },
      { title: '4. Supporting Visa (US/UK/Schengen if applicable)', desc: 'Valid tourist or residence visa from OECD countries expedites instant approval.' },
    ],
    rejectionReasons: [
      { title: 'Unconfirmed Hotel Accommodation', desc: 'Submitting unverified or cancelled hotel bookings.' },
      { title: 'Blurry Passport Scan', desc: 'Submitting illegible document copies that cannot be read by Moroccan consular scanners.' },
    ],
    faqs: [
      {
        category: 'Morocco eVisa',
        items: [
          { question: 'How quickly is the Morocco eVisa issued?', answer: 'Express applications are approved in 24 to 48 hours, while standard applications take 3 business days.' },
          { question: 'Do Pakistani citizens need an interview for Morocco eVisa?', answer: 'No, the entire process is 100% digital with no consulate visit required.' },
        ],
      },
    ],
    reviews: [
      { name: 'Saad Ur Rehman', date: '17 Oct 2026', country: 'Morocco', rating: 5, text: 'Traveled to Casablanca and Marrakech. Got my eVisa in 36 hours directly on WhatsApp.' },
      { name: 'Khadija Bibi', date: '9 Oct 2026', country: 'Morocco', rating: 5, text: 'Very clear instructions for Pakistani travelers with US transit visas.' },
      { name: 'Waleed Akram', date: '28 Sep 2026', country: 'Morocco', rating: 5, text: 'Great support desk. They verified my flight PNR before final submission.' },
    ],
  },
  australia: {
    name: 'Australia',
    flagCode: 'au',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=85',
    authority: 'Department of Home Affairs Australia',
    visaType: 'Visitor Visa (Subclass 600)',
    stayLength: '3, 6, or 12 months',
    validity: 'Up to 1 Year',
    entryType: 'Multiple Entry',
    govtFee: 62000,
    procFee: 18846,
    readyDate: '12 Nov 2026',
    dispatchTime: '05:31 PM',
    documents: [
      { title: '1. Comprehensive Passport Dossier', desc: 'Color scan of current passport and previous international travel visas.' },
      { title: '2. Proof of Financial Capability', desc: '6 months bank statement showing closing balance of at least PKR 1,500,000.' },
      { title: '3. Employment & Income Proof', desc: 'Employment contract, salary slips, and FBR tax returns.' },
      { title: '4. Genuine Temporary Entrant (GTE) Statement', desc: 'Detailed personal statement justifying purpose and guaranteed departure.' },
    ],
    rejectionReasons: [
      { title: 'Insufficient GTE Statement', desc: 'Failing to satisfy the case officer that your stay in Australia is strictly temporary.' },
      { title: 'Unsubstantiated Financial Documents', desc: 'Submitting bank accounts without verifiable audit trail or transaction history.' },
    ],
    faqs: [
      {
        category: 'Subclass 600',
        items: [
          { question: 'Is health examination required for Australia tourist visa?', answer: 'Depending on the length of stay and applicant age, a panel physician health checkup may be requested via ImmiAccount.' },
          { question: 'Do I need to send my physical passport?', answer: 'No, Australia has a label-free electronic visa system linked directly to your passport number.' },
        ],
      },
    ],
    reviews: [
      { name: 'Irfan Qureshi', date: '18 Oct 2026', country: 'Australia', rating: 5, text: 'Received 1-year multiple entry visa for Melbourne. Outstanding support with GTE statement.' },
      { name: 'Zeeshan Haider', date: '10 Oct 2026', country: 'Australia', rating: 5, text: 'Biometrics arranged quickly at Lahore Gerrys center. Granted in 14 days!' },
      { name: 'Saima Bano', date: '3 Oct 2026', country: 'Australia', rating: 5, text: 'Helped prepare my mother’s family stream visa with complete medical scheduling.' },
    ],
  },
  indonesia: {
    name: 'Indonesia',
    flagCode: 'id',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85',
    authority: 'Directorate General of Immigration Indonesia',
    visaType: 'Electronic Visa (e-VOA / B211A)',
    stayLength: '30 to 60 days',
    validity: '90 days',
    entryType: 'Single Entry',
    govtFee: 22000,
    procFee: 6655,
    readyDate: '2 Nov 2026',
    dispatchTime: '05:44 PM',
    documents: [
      { title: '1. Passport Bio Scan', desc: 'Valid for at least 6 months beyond arrival date.' },
      { title: '2. Return or Onward Flight Ticket', desc: 'Confirmed booking leaving Indonesia within the visa validity period.' },
      { title: '3. Digital Passport Photo', desc: 'Color photo on plain light background.' },
      { title: '4. Hotel Accommodation Booking', desc: 'Proof of lodging in Bali, Jakarta, or other Indonesian destinations.' },
    ],
    rejectionReasons: [
      { title: 'Passport Validity Under 6 Months', desc: 'Strictly prohibited; Indonesian immigration requires 6+ months from entry date.' },
      { title: 'Missing Return Air Ticket', desc: 'Airlines will not allow boarding without verifiable outbound reservation.' },
    ],
    faqs: [
      {
        category: 'Indonesia eVisa',
        items: [
          { question: 'Can I extend my stay in Bali on this visa?', answer: 'Yes, the B211A or 60-day tourist eVisa can be extended domestically at local immigration offices.' },
          { question: 'Is this valid for business meetings in Jakarta?', answer: 'Yes, the B211A visit visa permits tourism, family visits, and exploratory business discussions.' },
        ],
      },
    ],
    reviews: [
      { name: 'Hamza Niaz', date: '19 Oct 2026', country: 'Indonesia', rating: 5, text: 'Traveled to Bali for vacation. The eVisa arrived in my email within 48 hours.' },
      { name: 'Rabia Anwar', date: '11 Oct 2026', country: 'Indonesia', rating: 5, text: 'Smooth customs QR and eVisa integration at Denpasar airport immigration.' },
      { name: 'Fahad Mustafa', date: '2 Oct 2026', country: 'Indonesia', rating: 5, text: 'Very cost-effective and prompt response on WhatsApp queries.' },
    ],
  },
  'saudi arabia': {
    name: 'Saudi Arabia',
    flagCode: 'sa',
    heroImage: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1600&q=85',
    authority: 'Ministry of Foreign Affairs Kingdom of Saudi Arabia & Nusuk Certified',
    visaType: 'Tourist & Umrah Electronic Visa',
    stayLength: '90 days per visit',
    validity: '1 Year Multiple Entry',
    entryType: 'Multiple Entry',
    govtFee: 69000,
    procFee: 15893,
    readyDate: '5 Nov 2026',
    dispatchTime: '06:02 PM',
    documents: [
      { title: '1. Valid Pakistani Passport Scan', desc: 'Minimum 6 months validity with clear bio page scan.' },
      { title: '2. Passport Sized Photograph', desc: 'Digital color photo with white background.' },
      { title: '3. Valid Supporting Visa / GCC Residency (if applicable)', desc: 'Valid US, UK, Schengen visa or GCC Iqama unlocks immediate instant eVisa dispatch.' },
      { title: '4. Confirmed Flight & Hotel Vouchers', desc: 'Hotel booking in Makkah, Madinah, Riyadh, or Jeddah.' },
    ],
    rejectionReasons: [
      { title: 'Overstay on Previous Umrah', desc: 'Any recorded overstay on prior pilgrimages results in automated system rejection.' },
      { title: 'Mismatched Name Details', desc: 'Name spelling not matching exactly with passport machine-readable zone.' },
    ],
    faqs: [
      {
        category: 'Umrah & Tourism',
        items: [
          { question: 'Can I perform Umrah on a Saudi tourist eVisa?', answer: 'Yes! The 1-Year Multiple Entry tourist eVisa permits performing Umrah and visiting Rawdah in Madinah via the Nusuk app.' },
          { question: 'Is medical insurance included in the fee?', answer: 'Yes, mandatory comprehensive medical emergency insurance is automatically included in the government fee.' },
        ],
      },
    ],
    reviews: [
      { name: 'Sheikh Munir', date: '21 Oct 2026', country: 'Saudi Arabia', rating: 5, text: 'Applied for Umrah with my wife. Visas and Nusuk slots confirmed within 3 hours!' },
      { name: 'Asma Farooq', date: '14 Oct 2026', country: 'Saudi Arabia', rating: 5, text: '1-Year multiple entry visa granted without hassle. Extremely blessed service.' },
      { name: 'Taimoor Alam', date: '5 Oct 2026', country: 'Saudi Arabia', rating: 5, text: 'Accurate pricing in PKR and instantaneous document delivery.' },
    ],
  },
  türkiye: {
    name: 'Türkiye',
    flagCode: 'tr',
    heroImage: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1600&q=85',
    authority: 'Republic of Türkiye Ministry of Foreign Affairs',
    visaType: 'Electronic Visa (e-Visa)',
    stayLength: '30 days',
    validity: '180 days',
    entryType: 'Single Entry',
    govtFee: 18000,
    procFee: 5052,
    readyDate: '21 Oct 2026',
    dispatchTime: '09:05 AM',
    documents: [
      { title: '1. Pakistani Passport Scan', desc: 'Valid for at least 6 months beyond the date of entry into Türkiye.' },
      { title: '2. Supporting Valid Visa or Residence Permit', desc: 'Valid tourist/business visa or residence permit from Schengen, USA, UK, or Ireland.' },
      { title: '3. Return Air Ticket on Turkish Airlines / Pegasus / PIA', desc: 'Confirmed flight reservation showing return trip.' },
      { title: '4. Hotel Reservation & Funds', desc: 'Confirmed hotel stay and at least USD 50 per day of stay.' },
    ],
    rejectionReasons: [
      { title: 'Invalid or Expired Supporting Visa', desc: 'The prerequisite US, UK, or Schengen visa must be valid at the time of entry into Türkiye.' },
      { title: 'E-visas from other countries used as supporting documents', desc: 'Supporting visas must be physical stickers or valid Schengen/UK/US permits.' },
    ],
    faqs: [
      {
        category: 'Türkiye eVisa Rules',
        items: [
          { question: 'Who is eligible for the Türkiye e-visa from Pakistan?', answer: 'Pakistani passport holders holding a valid visa or residence permit from Schengen countries, USA, UK, or Ireland can obtain an instant online e-visa.' },
          { question: 'What if I do not have a US/UK/Schengen visa?', answer: 'Applicants without supporting visas must apply for a standard sticker visa through the Gerrys Anatolia visa application center in Pakistan.' },
        ],
      },
    ],
    reviews: [
      { name: 'Omer Farooq', date: '19 Oct 2026', country: 'Türkiye', rating: 5, text: 'Used my US B1/B2 visa to get Turkish eVisa in 10 minutes. Travelled to Istanbul with complete ease.' },
      { name: 'Bushra Khalid', date: '12 Oct 2026', country: 'Türkiye', rating: 5, text: 'Instant download and verifiable QR code. Perfect experience.' },
      { name: 'Waqas Bhatti', date: '28 Sep 2026', country: 'Türkiye', rating: 5, text: 'Clear explanation of the supporting visa clause saved me from making a mistake.' },
    ],
  },
  'united states': {
    name: 'United States',
    flagCode: 'us',
    heroImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=85',
    authority: 'US Department of State Consular Affairs',
    visaType: 'B1/B2 Non-Immigrant Visitor',
    stayLength: 'Up to 6 months per visit',
    validity: '5 Years',
    entryType: 'Multiple Entry',
    govtFee: 44000,
    procFee: 8000,
    readyDate: '18 Dec 2026',
    dispatchTime: '02:30 PM',
    documents: [
      { title: '1. Machine-Readable Passport', desc: 'Valid for at least 6 months beyond intended period of stay in the US.' },
      { title: '2. DS-160 Non-Immigrant Visa Application Confirmation', desc: 'Completed online form with barcode confirmation page.' },
      { title: '3. MRV Fee Payment Receipt', desc: 'Official proof of fee payment generated via authorized consular bank.' },
      { title: '4. Interview Appointment Letter', desc: 'Confirmed appointment for biometrics and consular interview at US Embassy Islamabad or Consulate Karachi.' },
    ],
    rejectionReasons: [
      { title: 'Section 214(b) - Presumption of Immigrant Intent', desc: 'Failing to establish sufficiently strong ties outside the United States.' },
      { title: 'Inconsistent DS-160 Information', desc: 'Discrepancies between oral interview answers and written form records.' },
    ],
    faqs: [
      {
        category: 'B1/B2 Process',
        items: [
          { question: 'Can I expedite my US visa appointment in Pakistan?', answer: 'Emergency expedited appointments are available for urgent medical care, funerals, urgent business meetings, or students.' },
          { question: 'What is the standard validity for Pakistani citizens?', answer: 'Pakistani passport holders are typically issued 5-year multiple-entry B1/B2 visitor visas.' },
        ],
      },
    ],
    reviews: [
      { name: 'Shahmeer Khan', date: '17 Oct 2026', country: 'United States', rating: 5, text: 'DS-160 preparation and mock interview training gave me 100% confidence. Approved at US Embassy Islamabad!' },
      { name: 'Dr. Faisal Shah', date: '9 Oct 2026', country: 'United States', rating: 5, text: 'Professional appointment tracking and documentation review. Got my 5-year visa stamped.' },
      { name: 'Sadia Qadir', date: '30 Sep 2026', country: 'United States', rating: 5, text: 'Helped our family of four with coordinated appointment slots.' },
    ],
  },
  switzerland: {
    name: 'Switzerland',
    flagCode: 'ch',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    authority: 'State Secretariat for Migration SEM Switzerland',
    visaType: 'Schengen Tourist Visa (Type C)',
    stayLength: 'Up to 90 days',
    validity: '90 days / 180 days',
    entryType: 'Multiple Entry',
    govtFee: 35000,
    procFee: 10200,
    readyDate: '15 Nov 2026',
    dispatchTime: '04:00 PM',
    documents: [
      { title: '1. Original Passport & Previous Visas', desc: 'Valid for at least 3 months beyond departure from Schengen area.' },
      { title: '2. 6 Months Bank Statement with Sustained Balance', desc: 'Proof of at least CHF 100 per day of stay in Switzerland.' },
      { title: '3. Travel Health Insurance (EUR 30,000 Minimum Cover)', desc: 'Valid across all Schengen member states with emergency repatriation cover.' },
      { title: '4. Confirmed Mountain Express / Hotel Bookings', desc: 'Vouchers for alpine resorts in Zurich, Zermatt, or Lucerne.' },
    ],
    rejectionReasons: [
      { title: 'Insufficient Travel Insurance Coverage', desc: 'Insurance policy failing to meet mandatory EUR 30,000 threshold or COVID treatment clauses.' },
      { title: 'Unjustified Purpose of Stay', desc: 'Lack of coherent travel itinerary corresponding with hotel reservations.' },
    ],
    faqs: [
      {
        category: 'Schengen Rules',
        items: [
          { question: 'Does a Swiss visa allow travel to France and Italy?', answer: 'Yes, a Schengen Type C visa allows unrestricted travel throughout all 29 European Schengen member states.' },
          { question: 'Where is biometrics taken in Pakistan?', answer: 'At the VFS Switzerland centers in Islamabad, Lahore, and Karachi.' },
        ],
      },
    ],
    reviews: [
      { name: 'Mustafa Kamal', date: '18 Oct 2026', country: 'Switzerland', rating: 5, text: 'Alpine holiday visa approved in 12 days. Travel insurance and itinerary were completely turnkey.' },
      { name: 'Zoya Khan', date: '8 Oct 2026', country: 'Switzerland', rating: 5, text: 'The consular file prepared by their senior visa barristers was flawless.' },
      { name: 'Bilal Hayat', date: '27 Sep 2026', country: 'Switzerland', rating: 5, text: 'Clear guidance on Swiss cantonal requirements and flight reservation hold.' },
    ],
  },
  japan: {
    name: 'Japan',
    flagCode: 'jp',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
    authority: 'Ministry of Foreign Affairs of Japan',
    visaType: 'Short-Term Tourist Visa',
    stayLength: '15 to 30 days',
    validity: '90 days',
    entryType: 'Single Entry',
    govtFee: 16000,
    procFee: 6400,
    readyDate: '20 Nov 2026',
    dispatchTime: '03:00 PM',
    documents: [
      { title: '1. Passport Bio-Data Scan', desc: 'Minimum 6 months validity with 2 blank facing pages.' },
      { title: '2. Daily Schedule of Stay (Keirekisho)', desc: 'Detailed day-by-day activity plan in Tokyo, Kyoto, Osaka.' },
      { title: '3. 6 Months Bank Statement & Tax Certificate', desc: 'Showing adequate funds for Tokyo accommodation and transit.' },
      { title: '4. Confirmed Flight & Hotel Vouchers', desc: 'Round-trip airline reservations and verifiable Japanese hotel bookings.' },
    ],
    rejectionReasons: [
      { title: 'Incomplete Schedule of Stay', desc: 'Failing to list specific dates, tourist sites, and accommodation contact numbers.' },
      { title: 'Weak Financial Stability', desc: 'Bank statements with low average balances.' },
    ],
    faqs: [
      {
        category: 'Japan Visa Guide',
        items: [
          { question: 'Is Japan eVisa available for Pakistan passport holders?', answer: 'Individual tourist eVisas are available for Pakistani nationals residing in eligible jurisdictions or through accredited travel agencies.' },
          { question: 'Do I need a guarantor in Japan?', answer: 'For self-financed tourism, a local guarantor is not mandatory if sufficient financial means are demonstrated.' },
        ],
      },
    ],
    reviews: [
      { name: 'Arsalan Tariq', date: '20 Oct 2026', country: 'Japan', rating: 5, text: 'Tokyo cherry blossom visa approved without any interview. Keirekisho schedule was spot on.' },
      { name: 'Nadia Hassan', date: '11 Oct 2026', country: 'Japan', rating: 5, text: 'Fast and reliable service for Japanese short-term tourist endorsement.' },
      { name: 'Junaid Ahmed', date: '2 Oct 2026', country: 'Japan', rating: 5, text: 'Extremely polite consular desk assistance. Highly recommended!' },
    ],
  },
  spain: {
    name: 'Spain',
    flagCode: 'es',
    heroImage: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1600&q=85',
    authority: 'Ministry of Foreign Affairs European Union and Cooperation Spain',
    visaType: 'Schengen Short Stay Visa',
    stayLength: 'Up to 90 days',
    validity: '90 / 180 days',
    entryType: 'Multiple Entry',
    govtFee: 34000,
    procFee: 10500,
    readyDate: '26 Nov 2026',
    dispatchTime: '05:00 PM',
    documents: [
      { title: '1. Machine-Readable Passport', desc: 'Valid for at least 3 months beyond departure from Spain.' },
      { title: '2. 6 Months Bank Statements & Tax Returns', desc: 'Demonstrating sufficient daily means (minimum EUR 113 per day).' },
      { title: '3. Travel Insurance (EUR 30,000 Coverage)', desc: 'Valid throughout the entire Schengen territory.' },
      { title: '4. Confirmed Round-Trip Flight Itinerary', desc: 'Flight booking to Madrid or Barcelona.' },
    ],
    rejectionReasons: [
      { title: 'Insufficient Daily Funds', desc: 'Spanish law mandates at least 10% of gross minimum wage per day of stay.' },
      { title: 'Lack of Confirmed Accommodations', desc: 'Unverified hotel reservations.' },
    ],
    faqs: [
      {
        category: 'Spain Schengen',
        items: [
          { question: 'Where are BLS Spain centers located in Pakistan?', answer: 'BLS International operates dedicated submission centers in Islamabad and Lahore.' },
          { question: 'Can I visit other European countries with this visa?', answer: 'Yes, full free movement across the Schengen zone is permitted.' },
        ],
      },
    ],
    reviews: [
      { name: 'Faraz Rehman', date: '18 Oct 2026', country: 'Spain', rating: 5, text: 'Secured my Barcelona vacation visa with multiple entries in 16 days.' },
      { name: 'Sumera Naz', date: '10 Oct 2026', country: 'Spain', rating: 5, text: 'BLS appointment and travel insurance were arranged in one smooth package.' },
      { name: 'Ali Raza', date: '1 Oct 2026', country: 'Spain', rating: 5, text: 'Great team and honest advice. Zero hassle throughout.' },
    ],
  },
};

const COUNTRY_CODE_MAP: Record<string, string> = {
  malaysia: 'my',
  maldives: 'mv',
  ireland: 'ie',
  canada: 'ca',
  'united kingdom': 'gb',
  uk: 'gb',
  morocco: 'ma',
  australia: 'au',
  indonesia: 'id',
  'saudi arabia': 'sa',
  saudi: 'sa',
  türkiye: 'tr',
  turkey: 'tr',
  'united states': 'us',
  usa: 'us',
  switzerland: 'ch',
  japan: 'jp',
  spain: 'es',
  france: 'fr',
  germany: 'de',
  portugal: 'pt',
  china: 'cn',
  'united arab emirates': 'ae',
  uae: 'ae',
  dubai: 'ae',
  italy: 'it',
  netherlands: 'nl',
  thailand: 'th',
  singapore: 'sg',
  qatar: 'qa',
  egypt: 'eg',
  brazil: 'br',
  azerbaijan: 'az',
  afghanistan: 'af',
  algeria: 'dz',
  austria: 'at',
  belgium: 'be',
  denmark: 'dk',
  finland: 'fi',
  greece: 'gr',
  hungary: 'hu',
  iceland: 'is',
  newzealand: 'nz',
  norway: 'no',
  sweden: 'se',
  vietnam: 'vn',
};

// Clean country resolver
function getCountryData(rawCountryName: string): CountryVisaData {
  const normalized = rawCountryName.trim().toLowerCase();
  
  let baseData: CountryVisaData | null = null;

  // Direct match
  if (COUNTRIES_REGISTRY[normalized]) {
    baseData = COUNTRIES_REGISTRY[normalized];
  } else {
    // Substring match
    for (const key of Object.keys(COUNTRIES_REGISTRY)) {
      if (normalized.includes(key) || key.includes(normalized)) {
        baseData = COUNTRIES_REGISTRY[key];
        break;
      }
    }
  }

  if (baseData) {
    const code = baseData.flagCode.toUpperCase();
    return {
      ...baseData,
      videoUrl: baseData.videoUrl || `https://media.atlys.com/b2c/clp/country-landing-page-videos/${code}.mp4?tr=f-webm`,
    };
  }

  // Graceful fallback for any country
  const titleCase = rawCountryName.trim().charAt(0).toUpperCase() + rawCountryName.trim().slice(1);
  let resolvedFlag = 'my';
  for (const [nameKey, code] of Object.entries(COUNTRY_CODE_MAP)) {
    if (normalized.includes(nameKey) || nameKey.includes(normalized)) {
      resolvedFlag = code;
      break;
    }
  }

  const codeUpper = resolvedFlag.toUpperCase();
  return {
    name: titleCase,
    flagCode: resolvedFlag,
    videoUrl: `https://media.atlys.com/b2c/clp/country-landing-page-videos/${codeUpper}.mp4?tr=f-webm`,
    heroImage: `https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/${codeUpper}.avif?tr=orig&v=1`,
    authority: `${titleCase} Consular & Immigration Authority Certified`,
    visaType: 'Electronic Visa / Consular Protocol',
    stayLength: '30 to 90 days',
    validity: '6 months',
    entryType: 'Tourist / Business',
    govtFee: 26000,
    procFee: 7500,
    readyDate: '10 Nov 2026',
    dispatchTime: '06:00 PM',
    documents: [
      { title: '1. Machine-Readable Passport Scan', desc: 'Valid for at least 6 months beyond travel date.' },
      { title: '2. Recent Passport-Sized Photograph', desc: 'White background, 35mm x 50mm, taken within 6 months.' },
      { title: '3. Confirmed Return Flight Ticket', desc: 'Verifiable airline booking with confirmed PNR.' },
      { title: '4. Hotel Accommodation Booking', desc: 'Confirmed hotel voucher or host invitation letter.' },
      { title: '5. Bank Account Statement', desc: 'Last 3 to 6 months bank statement showing sufficient funds.' },
    ],
    rejectionReasons: [
      { title: 'Passport Validity Under 6 Months', desc: 'Passports with less than 6 months remaining validity are ineligible.' },
      { title: 'Insufficient Proof of Funds', desc: 'Failing to establish financial capability to cover stay expenses.' },
      { title: 'Incomplete Application Dossier', desc: 'Missing hotel vouchers or unconfirmed flight tickets.' },
    ],
    faqs: [
      {
        category: 'Visa Guidelines',
        items: [
          { question: `What is the entry requirement for ${titleCase}?`, answer: `Pakistani passport holders require a valid visa, valid passport, confirmed accommodation, and return ticket.` },
          { question: 'How long does processing take?', answer: 'Standard consular processing takes 3 to 7 business days from document submission.' },
        ],
      },
    ],
    reviews: [
      { name: 'Tariq Mehmood', date: '18 Oct 2026', country: titleCase, rating: 5, text: `Everything was verified quickly and clearly. Approved without needing an in-person interview.` },
      { name: 'Rabia Siddiqui', date: '12 Oct 2026', country: titleCase, rating: 5, text: `Prompt WhatsApp updates and 100% genuine consular guidance.` },
      { name: 'Usman Ghani', date: '3 Oct 2026', country: titleCase, rating: 5, text: `Transparent fees in PKR and verified barcodes upon arrival.` },
    ],
  };
}

export const CountryVisaPage: React.FC<CountryVisaPageProps> = ({
  countryName = 'Malaysia',
  onBackToHome,
  onOpenVisaModal,
  onNavigateToExplore,
  onNavigateToBlogs,
  onNavigateToVisas,
  onNavigateToServices,
  onNavigateToProcess,
  onNavigateToAbout,
  onNavigateToContact,
}) => {
  const data = useMemo(() => getCountryData(countryName), [countryName]);

  // Always open page cleanly from top without any laggy scrolling animation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [countryName]);

  // PillHeader state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);

  // Timeline toggle in Section A
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  // Reviews Carousel state
  const [reviewPage, setReviewPage] = useState(0);
  const reviewsPerPage = 3;
  const maxPages = Math.ceil(data.reviews.length / reviewsPerPage) || 1;

  // FAQ states - Unexpanded / collapsed as default as requested
  const [faqSearch, setFaqSearch] = useState('');
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('All');
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  // Interactive Checklist & Checkout Modals
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  // Simplified Lead Callback Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantCity, setApplicantCity] = useState('Lahore');
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);

  const totalFee = data.govtFee + data.procFee;

  const toggleAccordion = (cat: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const handleNextReview = () => {
    setReviewPage((prev) => (prev + 1) % maxPages);
  };

  const handlePrevReview = () => {
    setReviewPage((prev) => (prev - 1 + maxPages) % maxPages);
  };

  // Filter FAQ items - Consistent across all country pages
  const filteredFaqData = useMemo(() => {
    return DEFAULT_FAQ_CATEGORIES
      .map((catGroup) => {
        if (activeFaqCategory !== 'All' && catGroup.category !== activeFaqCategory) {
          return null;
        }
        const matchedItems = catGroup.items.filter((item) => {
          if (!faqSearch.trim()) return true;
          const q = faqSearch.toLowerCase();
          return (
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
          );
        });
        if (matchedItems.length === 0) return null;
        return {
          ...catGroup,
          items: matchedItems,
        };
      })
      .filter(Boolean) as { category: string; items: { question: string; answer: string }[] }[];
  }, [faqSearch, activeFaqCategory]);

  const waInquiryUrl = `https://wa.me/923246883359?text=Hi%20Globe%20Express%2C%20I%20want%20to%20apply%20or%20know%20more%20about%20the%20${encodeURIComponent(data.name)}%20visa%20for%20Pakistanis.`;

  const renderStartApplicationCard = (isMobileVariant = false) => (
    <div
      className={`rounded-[24px] bg-[#F8FAFC] p-1.5 border border-[#E2E8F0] shadow-[0_15px_40px_rgba(28,35,45,0.06)] ${
        isMobileVariant ? 'w-full' : ''
      }`}
    >
      {/* Top Banner */}
      <div className="px-4 py-2.5 flex items-center justify-between text-[#1C232D] text-xs font-semibold">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#1C232D]" />
          <span>Ready by {data.readyDate}, {data.dispatchTime}</span>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#059669] border border-[#10B981]/20">
          Fast-Track
        </span>
      </div>

      {/* Inner White Card */}
      <div className="bg-white rounded-[20px] p-4 sm:p-5 shadow-sm border border-[#E2E8F0]/60">
        {/* Government Fees */}
        <div className="flex justify-between items-center text-xs text-[#475569] mb-3">
          <div className="flex items-center gap-2">
            <Landmark className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Government Fees</span>
          </div>
          <span className="font-semibold text-[#0F172A]">
            {data.govtFee > 0 ? `PKR ${data.govtFee.toLocaleString()}` : 'Included / Nil'}
          </span>
        </div>

        {/* Processing Fees */}
        <div className="flex justify-between items-center text-xs text-[#475569] pb-3.5 border-b border-dashed border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#1C232D]" />
            <span>Processing &amp; Verification</span>
          </div>
          <span className="font-semibold text-[#0F172A]">PKR {data.procFee.toLocaleString()}</span>
        </div>

        {/* Total Amount Row */}
        <div className="flex justify-between items-center pt-3.5 mb-5">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#1C232D]" />
            <span className="text-sm font-bold text-[#0F172A]">Total Amount</span>
          </div>
          <span className="text-base sm:text-lg font-extrabold text-[#1C232D]">
            PKR {totalFee.toLocaleString()}
          </span>
        </div>

        {/* Dual High-Converting Action Buttons: Assessment CTA (Primary) + WhatsApp (Secondary) */}
        <div className="flex flex-col gap-2.5">
          {/* 1. Free Visa Assessment & Eligibility Lead Form CTA - Primary Hero Action */}
          <button
            onClick={() => setIsCheckoutModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-[13px] font-bold shadow-[0_4px_16px_rgba(37,99,235,0.28)] transition cursor-pointer active:scale-98 flex items-center justify-center gap-2 select-none group"
          >
            <FileCheck2 className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
            <span>Get Free Visa Assessment</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 2. WhatsApp Apply & Know More Button - Clean Branded Green */}
          <a
            href={waInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-[13px] font-bold shadow-[0_4px_14px_rgba(37,211,102,0.2)] transition cursor-pointer active:scale-98 flex items-center justify-center gap-2 select-none"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.37 7.35 9.1 7.41 8.88 7.65C8.65 7.89 8.02 8.48 8.02 9.71C8.02 10.93 8.91 12.11 9.03 12.27C9.15 12.44 10.74 14.9 13.21 15.96C15.26 16.84 15.68 16.66 16.12 16.63C16.57 16.59 17.55 16.05 17.76 15.48C17.96 14.9 17.96 14.41 17.9 14.31C17.84 14.21 17.68 14.15 17.44 14.03C17.2 13.91 16.01 13.33 15.79 13.25C15.57 13.17 15.41 13.13 15.25 13.37C15.09 13.61 14.62 14.15 14.48 14.31C14.34 14.47 14.2 14.49 13.96 14.37C13.72 14.25 12.95 14 12.03 13.18C11.31 12.54 10.83 11.76 10.69 11.52C10.55 11.28 10.67 11.14 10.79 11.02C10.9 10.91 11.04 10.73 11.16 10.59C11.28 10.45 11.32 10.35 11.4 10.19C11.48 10.03 11.44 9.89 11.38 9.77C11.32 9.65 10.85 8.5 10.65 8.03C10.46 7.57 10.26 7.63 10.11 7.63C9.97 7.62 9.81 7.35 9.53 7.35Z"/>
            </svg>
            <span>WhatsApp: Apply &amp; Know More</span>
          </a>
        </div>

        {/* Trust guarantee micro badges */}
        <div className="mt-4 pt-3.5 border-t border-[#F1F5F9] grid grid-cols-2 gap-2 text-center text-[10px] text-[#64748B]">
          <div className="flex items-center justify-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>100% Secure</span>
          </div>
          <div className="flex items-center justify-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Govt Accredited</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans pb-32 sm:pb-24 selection:bg-[#1C232D]/10 selection:text-[#1C232D]">
      {/* 
        Exact Main Page PillHeader with Sandwich Menu, Logo, Flights modal, and Call Directory Dropdown.
        Displays current country flag and name next to the logo.
      */}
      <PillHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={setIsMenuOpen}
        isCallOpen={isCallOpen}
        onToggleCall={setIsCallOpen}
        onOpenVisaModal={onOpenVisaModal}
        onResetToHero={onBackToHome}
        onNavigateToExplore={onNavigateToVisas || onNavigateToExplore || onBackToHome}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToVisas={onNavigateToVisas}
        onNavigateToServices={onNavigateToServices}
        onNavigateToProcess={onNavigateToProcess}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToContact={onNavigateToContact}
        currentCountry={{
          name: data.name,
          flagCode: data.flagCode,
        }}
      />

      {/* Main Page Container with top padding to clear floating header */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28">
        {/* Navigation Breadcrumb & Back to Home - Single line layout */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1 text-[#0F172A] hover:text-[#1C232D] transition cursor-pointer font-semibold shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>Home</span>
            </button>
            <span className="text-[#CBD5E1] shrink-0">/</span>
            <button
              onClick={onNavigateToVisas || onNavigateToExplore || onBackToHome}
              className="text-[#64748B] hover:text-[#0F172A] transition cursor-pointer shrink-0"
            >
              Explore
            </button>
            <span className="text-[#CBD5E1] shrink-0">/</span>
            <span className="text-[#1C232D] font-semibold truncate shrink-0">{data.name}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] shadow-xs shrink-0">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Consular Portal Operational</span>
          </div>
        </div>

        {/* 
          Section: Top Rounded Hero Banner with Looping Video
          - Mobile view: 2:3 aspect ratio with compact typography and thinner button
          - Desktop view: Vertically enlarged (sm:h-[480px] md:h-[520px] lg:h-[560px])
          - Reduced black overlay darkness for rich, vibrant destination visuals
        */}
        <div className="w-full aspect-[2/3] sm:aspect-auto sm:h-[480px] md:h-[520px] lg:h-[560px] rounded-[24px] sm:rounded-[32px] overflow-hidden relative shadow-[0_12px_35px_-8px_rgba(28,35,45,0.18)] mb-10 sm:mb-12 flex items-center justify-center text-center px-4 sm:px-6 border border-[#E2E8F0] bg-neutral-950">
          {/* Destination Hero Video with responsive aspect-fill and poster fallback */}
          {data.videoUrl ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={data.heroImage}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            >
              <source src={data.videoUrl} type="video/mp4" />
              <img
                src={data.heroImage}
                alt={data.name}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />
            </video>
          ) : (
            <img
              src={data.heroImage}
              alt={data.name}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
          )}

          {/* Lighter, translucent overlay to keep the video bright while maintaining text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/55 pointer-events-none" />

          {/* Centered Stack */}
          <div className="relative z-10 flex flex-col items-center max-w-xl px-2 sm:px-4">
            {/* H1 Title: 'Country Visa for Pakistanis' style */}
            <h1 className="text-2xl sm:text-4xl md:text-[44px] font-bold text-white tracking-tight mb-2 sm:mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] leading-tight">
              {data.name} Visa for Pakistanis
            </h1>

            {/* Delivery Subtitle */}
            <p className="text-xs sm:text-sm md:text-base font-medium text-white/95 mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80 shrink-0" />
              <span>e-visa on {data.readyDate}</span>
            </p>

            {/* Thinner, slightly smaller Primary CTA Button */}
            <button
              onClick={() => setIsChecklistModalOpen(true)}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#1C232D] hover:bg-[#141A22] text-white text-[11px] sm:text-xs font-semibold shadow-[0_6px_20px_rgba(28,35,45,0.35)] transition cursor-pointer active:scale-95 flex items-center gap-1.5 sm:gap-2 border border-white/20 backdrop-blur-xs"
            >
              <FileCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Check Required Documents</span>
            </button>
          </div>
        </div>

        {/* 
          Two-Column Main Layout on White Background
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* 
            LEFT CONTENT COLUMN (8 Cols)
          */}
          <div className="lg:col-span-8 flex flex-col gap-14">
            {/* ========================================================
                SECTION A: Visa Information & Delivery Timeline
            ======================================================== */}
            <section id="evisa-information" className="scroll-mt-24">
              {/* Heading with brand accent bar underneath */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#0F172A]">
                  Visa Information
                </h2>
                <div className="w-8 h-[3px] bg-[#1C232D] rounded-full mt-1.5" />
              </div>

              {/* 4-Item Spec Grid on White Background */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-8">
                {/* 1. Type */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] text-[#1C232D] flex items-center justify-center shrink-0 border border-[#CBD5E1]/60">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-[#64748B]">Type:</span>
                    <span className="text-xs font-bold text-[#0F172A] underline decoration-[#CBD5E1] underline-offset-2">
                      {data.visaType}
                    </span>
                  </div>
                </div>

                {/* 2. Length of Stay */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] text-[#1C232D] flex items-center justify-center shrink-0 border border-[#CBD5E1]/60">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-[#64748B]">Length of Stay:</span>
                    <span className="text-xs font-bold text-[#0F172A]">
                      {data.stayLength}
                    </span>
                  </div>
                </div>

                {/* 3. Validity */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 border border-[#A7F3D0]/60">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-[#64748B]">Validity:</span>
                    <span className="text-xs font-bold text-[#0F172A]">
                      {data.validity}
                    </span>
                  </div>
                </div>

                {/* 4. Entry */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] text-[#1C232D] flex items-center justify-center shrink-0 border border-[#CBD5E1]/60">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] text-[#64748B]">Entry:</span>
                    <span className="text-xs font-bold text-[#0F172A]">
                      {data.entryType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Timeline Box */}
              <div className="border-l-2 border-[#CBD5E1] pl-5 ml-2 relative mt-4">
                {/* Header Node: Glowing Dot in #1C232D */}
                <div className="w-3 h-3 rounded-full bg-[#1C232D] ring-4 ring-[#F1F5F9] -left-[7px] top-1 absolute shadow-sm" />

                <h3 className="text-sm font-bold text-[#0F172A] mb-3">
                  Get your visa by
                </h3>

                {/* Expandable Card in White */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-[0_8px_25px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1C232D] animate-pulse" />
                    <span className="text-xs sm:text-sm font-bold text-[#0F172A]">
                      {data.readyDate} at {data.dispatchTime}
                    </span>
                    <span className="text-[10px] font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]/60 ml-auto">
                      Guaranteed Dispatch
                    </span>
                  </div>

                  {/* Interactive Toggle Link */}
                  <button
                    onClick={() => setIsTimelineOpen(!isTimelineOpen)}
                    className="text-[11px] font-semibold text-[#1C232D] mt-2.5 flex items-center gap-1 hover:text-[#141A22] transition cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isTimelineOpen ? 'Hide Timeline' : 'View Timeline'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isTimelineOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded Timeline Stages */}
                  <AnimatePresence>
                    {isTimelineOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ willChange: 'height, opacity' }}
                        className="overflow-hidden pt-4 mt-3 border-t border-[#E2E8F0]/80 space-y-3 transform-gpu"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#F1F5F9] text-[#1C232D] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0F172A]">Document Pre-Check &amp; Quality Assessment</p>
                            <p className="text-[11px] text-[#64748B]">Immediate review of passport scan, photograph, and ticket booking within 2 hours.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#F1F5F9] text-[#1C232D] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0F172A]">Consular Immigration Dispatch</p>
                            <p className="text-[11px] text-[#64748B]">Formal transmission to the official {data.name} visa processing system.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
                            <Clock className="w-3 h-3" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#0F172A]">Visa Grant Issued</p>
                            <p className="text-[11px] text-[#64748B]">Delivered with encrypted security barcode ready for airport check-in.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* ========================================================
                MOBILE VIEW ONLY: Start Application Card placed directly above Reviews
            ======================================================== */}
            <div className="lg:hidden">
              <div className="mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  Fast-Track Consular Portal
                </span>
                <h3 className="text-lg font-bold text-[#0F172A]">
                  Apply for {data.name} Visa
                </h3>
              </div>
              {renderStartApplicationCard(true)}
            </div>

            {/* ========================================================
                SECTION B: Reviews
                (No laurel banner, no initials circle, no trustpilot link)
            ======================================================== */}
            <section id="reviews" className="scroll-mt-24">
              {/* Heading with brand accent bar underneath */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#0F172A]">
                  Reviews
                </h2>
                <div className="w-8 h-[3px] bg-[#1C232D] rounded-full mt-1.5" />
              </div>

              {/* 3-Card Review Carousel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {data.reviews
                  .slice(reviewPage * reviewsPerPage, reviewPage * reviewsPerPage + reviewsPerPage)
                  .map((review, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div>
                        {/* Reviewer Name and Date (no initials circle) */}
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="text-xs font-bold text-[#0F172A]">
                            {review.name}
                          </h4>
                          <span className="text-[10px] text-[#94A3B8]">{review.date}</span>
                        </div>

                        {/* Country Tag */}
                        <div className="bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] px-2 py-0.5 rounded-md inline-block w-fit mb-2 text-[#475569] font-medium">
                          {review.country}
                        </div>

                        {/* 5 Green Star Boxes */}
                        <div className="flex items-center gap-1 my-1">
                          {[...Array(review.rating || 5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-3.5 h-3.5 rounded-[2px] bg-[#00B67A] text-white flex items-center justify-center text-[9px] font-bold leading-none"
                            >
                              ★
                            </div>
                          ))}
                        </div>

                        {/* Body quote */}
                        <p className="text-[11.5px] text-[#475569] leading-relaxed my-2.5 line-clamp-4">
                          &ldquo;{review.text}&rdquo;
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Bottom Carousel Arrows */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handlePrevReview}
                  className="w-9 h-9 rounded-full border border-[#CBD5E1] text-[#0F172A] hover:border-[#1C232D] hover:text-[#1C232D] flex items-center justify-center transition cursor-pointer active:scale-95 shadow-xs"
                  aria-label="Previous Reviews"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5 px-2">
                  {[...Array(maxPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setReviewPage(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        reviewPage === idx
                          ? 'w-6 bg-[#1C232D]'
                          : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                      }`}
                      aria-label={`Go to review page ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextReview}
                  className="w-9 h-9 rounded-full border border-[#CBD5E1] text-[#0F172A] hover:border-[#1C232D] hover:text-[#1C232D] flex items-center justify-center transition cursor-pointer active:scale-95 shadow-xs"
                  aria-label="Next Reviews"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* ========================================================
                SECTION C: How Visa Process Works (4-Step Connected Stepper)
            ======================================================== */}
            <section id="how-it-works" className="scroll-mt-24">
              {/* Heading with brand accent bar underneath */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#0F172A]">
                  How Visa Process Works
                </h2>
                <div className="w-8 h-[3px] bg-[#1C232D] rounded-full mt-1.5" />
              </div>

              {/* Vertical Timeline Container */}
              <div className="relative pl-7 border-l-2 border-[#CBD5E1] ml-2 space-y-6">
                {/* Step 1 */}
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1C232D] ring-4 ring-[#F1F5F9] absolute -left-[34px] top-4 shadow-xs" />
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm">
                    <span className="text-[11px] font-bold text-[#1C232D] block mb-0.5">
                      Step 1
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] mb-1">
                      Apply Online
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Submit your documents online with dedicated consular verification.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1C232D] ring-4 ring-[#F1F5F9] absolute -left-[34px] top-4 shadow-xs" />
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm">
                    <span className="text-[11px] font-bold text-[#1C232D] block mb-0.5">
                      Step 2
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] mb-1">
                      Your Documents Are Verified
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Our visa specialists verify your documents and transmit to {data.name} immigration.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1C232D] ring-4 ring-[#F1F5F9] absolute -left-[34px] top-4 shadow-xs" />
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm">
                    <span className="text-[11px] font-bold text-[#1C232D] block mb-0.5">
                      Step 3
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] mb-1">
                      Your Visa Gets Processed
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      We work directly with consular authorities to guarantee timely issuance.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] ring-4 ring-[#ECFDF5] absolute -left-[34px] top-4 shadow-xs" />
                  <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm">
                    <span className="text-[11px] font-bold text-[#10B981] block mb-0.5">
                      Step 4
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0F172A]">
                      Get Your Verified Visa on{' '}
                      <span className="text-[#1C232D] font-extrabold underline decoration-[#CBD5E1]">
                        {data.readyDate}
                      </span>
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                      Download your official visa and travel with full peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================
                SECTION D: Rejection Reasons
            ======================================================== */}
            <section id="rejection-reasons" className="scroll-mt-24">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-[#0F172A]">
                  {data.name} Visa Rejection Reasons
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  Common factors leading to consular refusal that our team proactively resolves
                </p>
              </div>

              <div className="divide-y divide-[#F1F5F9] border-t border-b border-[#F1F5F9]">
                {data.rejectionReasons.map((reason, idx) => (
                  <div key={idx} className="py-4 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#F1F5F9] text-[#1C232D] flex items-center justify-center shrink-0 border border-[#CBD5E1]/60">
                      {idx === 0 ? <BookX className="w-4 h-4" /> : idx === 1 ? <Wallet className="w-4 h-4" /> : idx === 2 ? <ShieldAlert className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#0F172A]">
                        {reason.title}
                      </h3>
                      <p className="text-[11.5px] text-[#64748B] mt-0.5 leading-relaxed">
                        {reason.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================
                SECTION E: Frequently Asked Questions
                (Exact Reference Design: Brand Color #1C232D & White Fill)
            ======================================================== */}
            <section id="faqs" className="scroll-mt-24">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                  Frequently Asked Questions
                </h2>
                <div className="w-10 h-[3px] bg-[#1C232D] rounded-full mt-2" />
              </div>

              {/* Search Input matching screenshot: "Smart AI; Ask me anything..." */}
              <div className="w-full h-12 px-4 rounded-full bg-[#F4F6F9] border border-transparent focus-within:border-[#1C232D] focus-within:bg-white flex items-center gap-3 mb-5 transition shadow-xs">
                <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Smart AI; Ask me anything..."
                  className="text-xs sm:text-[13.5px] text-[#0F172A] placeholder:text-neutral-400 bg-transparent outline-none w-full font-normal"
                />
                {faqSearch && (
                  <button
                    onClick={() => setFaqSearch('')}
                    className="p-1 text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills - Horizontally scrollable with arrow on right as in user screenshot */}
              <div className="relative mb-6 flex items-center">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pr-10 py-1 w-full">
                  <button
                    onClick={() => setActiveFaqCategory('All')}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition cursor-pointer shrink-0 ${
                      activeFaqCategory === 'All'
                        ? 'bg-[#1C232D] text-white shadow-xs'
                        : 'bg-[#F4F6F9] text-[#1C232D] hover:bg-[#E2E8F0]'
                    }`}
                  >
                    All Topics
                  </button>
                  {['General Information', 'Eligibility & Requirements', 'Application Process', 'Entry & Exit Regulations', 'Refunds, Rejections & Reapplications', 'Visa Extension & Overstays'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFaqCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition cursor-pointer shrink-0 ${
                        activeFaqCategory === cat
                          ? 'bg-[#1C232D] text-white shadow-xs'
                          : 'bg-[#F4F6F9] text-[#1C232D] hover:bg-[#E2E8F0]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Right scroll indicator arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white via-white to-transparent pl-4 flex items-center pointer-events-none">
                  <div className="w-7 h-7 rounded-full bg-[#F4F6F9] border border-neutral-200/80 flex items-center justify-center shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 text-[#1C232D]" />
                  </div>
                </div>
              </div>

              {/* 
                Unexpanded Accordion Rows matching user image:
                - Brand color #1C232D text
                - White fill background
                - Thin plus (+) icon on the right
                - Subtle divider line border-b between items
                - Smooth animated expand showing answers with white fill
              */}
              <div className="bg-white border-t border-[#F1F5F9]">
                {filteredFaqData.length > 0 ? (
                  filteredFaqData.map((group) => {
                    const isOpen = Boolean(openAccordions[group.category]) || Boolean(faqSearch.trim());
                    return (
                      <div key={group.category} className="border-b border-[#F1F5F9]">
                        {/* Category Header Row */}
                        <button
                          type="button"
                          onClick={() => toggleAccordion(group.category)}
                          className="w-full py-4 sm:py-4.5 flex items-center justify-between text-left group cursor-pointer transition select-none bg-white hover:bg-neutral-50/60 px-1 rounded-lg"
                        >
                          <span className="text-[15px] sm:text-[16px] font-semibold text-[#1C232D] group-hover:opacity-85 transition tracking-tight">
                            {group.category}
                          </span>
                          <div className="w-6 h-6 flex items-center justify-center shrink-0 ml-3">
                            {isOpen ? (
                              <Minus className="w-5 h-5 text-[#1C232D] stroke-[2]" />
                            ) : (
                              <Plus className="w-5 h-5 text-[#1C232D] stroke-[2]" />
                            )}
                          </div>
                        </button>

                        {/* Expanded Items */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                              style={{ willChange: 'height, opacity' }}
                              className="overflow-hidden pb-4 pt-1 space-y-3 px-1 transform-gpu"
                            >
                              {group.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs space-y-1.5"
                                >
                                  <h4 className="text-xs sm:text-[13px] font-bold text-[#1C232D] flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C232D] shrink-0" />
                                    <span>{item.question}</span>
                                  </h4>
                                  <p className="text-[12px] sm:text-[12.5px] text-[#475569] leading-relaxed pl-3.5">
                                    {item.answer}
                                  </p>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-xs text-[#64748B]">
                    No questions found matching &ldquo;{faqSearch}&rdquo;. Try searching for requirements, fees, or documents.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* 
            RIGHT STICKY SIDEBAR COLUMN (4 Cols)
            Section: Pricing & Checkout Card on White Background (Desktop Only)
          */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28">
            {renderStartApplicationCard(false)}

            {/* WhatsApp Support Row */}
            <div className="mt-4 px-2 flex items-center justify-between bg-white rounded-2xl p-3 border border-[#E2E8F0] shadow-xs">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0F172A]">Have Queries?</span>
                <span className="text-[11px] text-[#64748B]">
                  Connect on WhatsApp with us
                </span>
              </div>
              <a
                href={waInquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0] flex items-center justify-center hover:scale-105 transition cursor-pointer shadow-xs active:scale-95"
                title="Open WhatsApp Support"
                aria-label="WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4 fill-[#10B981]" />
              </a>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer & CTA */}
      <SecondaryCtaBanner
        onOpenVisaModal={onOpenVisaModal}
        onNavigateHome={onBackToHome}
        onNavigateToVisas={onNavigateToVisas}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToServices={onNavigateToServices}
        onNavigateToProcess={onNavigateToProcess}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToContact={onNavigateToContact}
      />

      {/* ========================================================
          INTERACTIVE MODAL 1: Required Documents Checklist
          (Point-to-point, Brand Colors, Flag & Name with Required Documents)
      ======================================================== */}
      <AnimatePresence>
        {isChecklistModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChecklistModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] p-6 z-10 max-h-[90vh] overflow-y-auto transform-gpu"
            >
              {/* Header: Flag, Country Name & Required Documents ONLY */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E2E8F0] shadow-xs shrink-0 bg-neutral-100 flex items-center justify-center">
                    <img
                      src={`https://flagcdn.com/w80/${data.flagCode.toLowerCase()}.png`}
                      alt={`${data.name} Flag`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#0F172A] leading-tight">
                      {data.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wider">
                      Required Documents
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChecklistModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-[#64748B] hover:text-[#0F172A] transition cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* To-the-point Documents Checklist */}
              <div className="py-4 space-y-2.5">
                {data.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3 transition-colors hover:border-[#CBD5E1]"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-[#0F172A] block leading-snug">
                        {doc.title}
                      </span>
                      <span className="text-[11px] text-[#64748B] block mt-0.5 leading-relaxed">
                        {doc.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button: Book a Call Free */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsChecklistModalOpen(false);
                    setIsCheckoutModalOpen(true);
                  }}
                  className="w-full py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-tight shadow-[0_4px_14px_rgba(37,99,235,0.28)] active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book a Call Free</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================
          INTERACTIVE MODAL 2: Checkout & Application Workflow
      ======================================================== */}
      <AnimatePresence>
        {isCheckoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] p-6 z-10 transform-gpu"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                    Free {data.name} Visa Assessment
                  </h3>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Submit your details below. Our consular team will evaluate your eligibility and guide you step-by-step.
                  </p>
                </div>
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-[#64748B] transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {checkoutSubmitted ? (
                <div className="py-7 text-center space-y-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] mx-auto flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#0F172A]">
                    Assessment Request Received!
                  </h4>
                  <p className="text-xs text-[#475569] leading-relaxed max-w-xs mx-auto">
                    Thank you, <strong className="text-[#0F172A]">{applicantName || 'Applicant'}</strong>. Our senior {data.name} visa desk is reviewing your profile and will contact you via WhatsApp or call at <strong className="text-[#0F172A]">{applicantPhone}</strong> with your personalized eligibility assessment.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={waInquiryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.37 7.35 9.1 7.41 8.88 7.65C8.65 7.89 8.02 8.48 8.02 9.71C8.02 10.93 8.91 12.11 9.03 12.27C9.15 12.44 10.74 14.9 13.21 15.96C15.26 16.84 15.68 16.66 16.12 16.63C16.57 16.59 17.55 16.05 17.76 15.48C17.96 14.9 17.96 14.41 17.9 14.31C17.84 14.21 17.68 14.15 17.44 14.03C17.2 13.91 16.01 13.33 15.79 13.25C15.57 13.17 15.41 13.13 15.25 13.37C15.09 13.61 14.62 14.15 14.48 14.31C14.34 14.47 14.2 14.49 13.96 14.37C13.72 14.25 12.95 14 12.03 13.18C11.31 12.54 10.83 11.76 10.69 11.52C10.55 11.28 10.67 11.14 10.79 11.02C10.9 10.91 11.04 10.73 11.16 10.59C11.28 10.45 11.32 10.35 11.4 10.19C11.48 10.03 11.44 9.89 11.38 9.77C11.32 9.65 10.85 8.5 10.65 8.03C10.46 7.57 10.26 7.63 10.11 7.63C9.97 7.62 9.81 7.35 9.53 7.35Z"/>
                      </svg>
                      <span>Need Urgent Answer? Chat on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        setCheckoutSubmitted(false);
                        setIsCheckoutModalOpen(false);
                      }}
                      className="w-full py-2.5 rounded-full border border-[#CBD5E1] text-[#64748B] hover:bg-[#F8FAFC] text-xs font-semibold transition cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCheckoutSubmitted(true);
                  }}
                  className="py-4 space-y-3.5 text-xs"
                >
                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Usman"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] outline-none focus:border-[#1C232D] focus:ring-2 focus:ring-[#1C232D]/10 transition text-xs text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">
                      WhatsApp / Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] outline-none focus:border-[#1C232D] focus:ring-2 focus:ring-[#1C232D]/10 transition text-xs text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F172A] block mb-1">
                      Your City in Pakistan
                    </label>
                    <select
                      value={applicantCity}
                      onChange={(e) => setApplicantCity(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-[#CBD5E1] bg-white outline-none focus:border-[#1C232D] focus:ring-2 focus:ring-[#1C232D]/10 transition text-xs font-medium text-[#0F172A]"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Sialkot">Sialkot</option>
                      <option value="Gujranwala">Gujranwala</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>

                  <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1 text-[11px] text-[#64748B]">
                    <div className="flex items-center gap-1.5 font-semibold text-[#0F172A]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>100% Free Consultation &bull; No Payment Now</span>
                    </div>
                    <p className="text-[10.5px] text-[#64748B] leading-relaxed">
                      Our senior consular consultant will call to review your bank statement, ties, and documentation before lodging.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-[13px] font-bold shadow-[0_4px_16px_rgba(37,99,235,0.28)] transition cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                  >
                    <FileCheck2 className="w-4 h-4 text-white" />
                    <span>Submit Free Assessment</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================
          INTERACTIVE MODAL 3: WhatsApp Support Dialog
      ======================================================== */}
      <AnimatePresence>
        {isWhatsAppModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWhatsAppModalOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'transform, opacity' }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] p-6 z-10 text-center transform-gpu"
            >
              <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0] mx-auto flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6 fill-[#10B981]" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A]">
                {data.name} Visa WhatsApp Desk
              </h3>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Connect directly with our senior consular case officer for Pakistani citizens. Typical response time under 3 minutes.
              </p>
              <div className="my-4 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-left text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#10B981]">Dedicated Officer</span>
                <p className="font-bold text-[#0F172A]">Consular Officer Farhan ({data.name} Desk)</p>
                <p className="text-[11px] text-[#64748B]">+92 300 8472910</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsWhatsAppModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full border border-[#CBD5E1] text-xs font-semibold text-[#64748B] hover:bg-[#F8FAFC] transition cursor-pointer"
                >
                  Cancel
                </button>
                <a
                  href={`https://wa.me/923008472910?text=Hi%2C%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(data.name)}%20visa%20from%20Pakistan.`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsWhatsAppModalOpen(false)}
                  className="flex-1 py-2.5 rounded-full bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================
          MOBILE STICKY BOTTOM CARD (Mobile View Only)
          - Attached flush to bottom margin of screen (no gap/margin below)
          - Bottom corners NOT curved (square, attached to bottom margin of screen)
          - Only top corners curved (rounded-t-[22px] rounded-b-none)
          - Improved lead callback CTA button
          - White fill background
      ======================================================== */}
      <div className="fixed bottom-0 inset-x-0 sm:hidden z-40 bg-white rounded-t-[22px] rounded-b-none p-3 px-4 pb-[max(0.85rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.14)] border-t border-[#E2E8F0] border-x-0 border-b-0 flex items-center justify-between gap-3 select-none pointer-events-auto">
        {/* Left Side: Generous Price & Fees Display with no awkward cramping */}
        <div className="flex flex-col min-w-0 pr-1 justify-center">
          <div className="flex items-baseline gap-1.5 flex-nowrap">
            <span className="text-[17px] font-black text-[#0F172A] tracking-tight whitespace-nowrap">
              PKR {totalFee.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#64748B] font-medium whitespace-nowrap">
              all fees
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsChecklistModalOpen(true)}
            className="text-[10px] font-semibold text-[#2563EB] hover:underline transition cursor-pointer text-left w-fit mt-0.5 leading-none"
          >
            Requirements
          </button>
        </div>

        {/* Right Side: Perfectly sized, non-conflicting action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* WhatsApp Button: Compact circular 40px icon button saving horizontal space */}
          <a
            href={waInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-[0_2px_8px_rgba(37,211,102,0.3)] active:scale-95 transition cursor-pointer shrink-0"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.37 7.35 9.1 7.41 8.88 7.65C8.65 7.89 8.02 8.48 8.02 9.71C8.02 10.93 8.91 12.11 9.03 12.27C9.15 12.44 10.74 14.9 13.21 15.96C15.26 16.84 15.68 16.66 16.12 16.63C16.57 16.59 17.55 16.05 17.76 15.48C17.96 14.9 17.96 14.41 17.9 14.31C17.84 14.21 17.68 14.15 17.44 14.03C17.2 13.91 16.01 13.33 15.79 13.25C15.57 13.17 15.41 13.13 15.25 13.37C15.09 13.61 14.62 14.15 14.48 14.31C14.34 14.47 14.2 14.49 13.96 14.37C13.72 14.25 12.95 14 12.03 13.18C11.31 12.54 10.83 11.76 10.69 11.52C10.55 11.28 10.67 11.14 10.79 11.02C10.9 10.91 11.04 10.73 11.16 10.59C11.28 10.45 11.32 10.35 11.4 10.19C11.48 10.03 11.44 9.89 11.38 9.77C11.32 9.65 10.85 8.5 10.65 8.03C10.46 7.57 10.26 7.63 10.11 7.63C9.97 7.62 9.81 7.35 9.53 7.35Z"/>
            </svg>
          </a>

          {/* Free Assessment Primary Button: Vibrant Brand Blue */}
          <button
            type="button"
            onClick={() => setIsCheckoutModalOpen(true)}
            className="h-10 px-4 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11.5px] font-bold tracking-tight shadow-[0_4px_14px_rgba(37,99,235,0.28)] active:scale-95 transition cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-white" />
            <span>Free Assessment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
