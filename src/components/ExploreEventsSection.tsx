import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plane, FileText, Palmtree, ChevronDown, X, CheckCircle2, ShieldCheck, Clock, ArrowRight, ListFilter } from 'lucide-react';

interface VisaCardItem {
  id: string;
  title: string;
  flagCode: string;
  type: string;
  valid: string;
  fees: string | null;
  date: string;
  image: string;
  fallbackImage?: string;
  documents: string;
  description?: string;
}

function getFeeForTitle(title: string): string {
  const t = title.toUpperCase();
  // US, UK, AUS, Canada, Germany, Italy, France
  if (
    t.includes('UNITED STATES') ||
    t.includes('USA') ||
    t.includes('UNITED KINGDOM') ||
    t.includes('UK') ||
    t.includes('AUSTRALIA') ||
    t.includes('CANADA') ||
    t.includes('GERMANY') ||
    t.includes('FRANKFURT') ||
    t.includes('ITALY') ||
    t.includes('FRANCE')
  ) {
    return 'PKR 75,000';
  }
  return 'Price on call';
}

const APPOINTMENTS_DATA: VisaCardItem[] = [
  {
    id: 'apt-visit',
    title: 'VISIT APPOINTMENT',
    flagCode: '',
    type: 'VISIT APPOINTMENT',
    valid: '',
    fees: null,
    date: 'Priority Slot Booking',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    documents: 'Original Passport, Appointment Confirmation Letter, DS-160 / Visa Checklist, CNIC',
    description: 'Guaranteed priority biometric slot booking across VFS Global, Gerry\'s, BLS, and TLScontact centers nationwide.',
  },
  {
    id: 'apt-business',
    title: 'BUSINESS APPOINTMENT',
    flagCode: '',
    type: 'BUSINESS APPOINTMENT',
    valid: '',
    fees: null,
    date: 'VIP Fast-Track Access',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport, Host Company Letter of Invitation, Chamber of Commerce Certificate, NTN / Tax Returns',
    description: 'Corporate and investor VIP biometric appointment booking with consular interview prep and urgent submission handling.',
  },
];

const EXPLORE_DATA: VisaCardItem[] = [
  {
    id: 'exp-us',
    title: 'UNITED STATES',
    flagCode: 'us',
    type: 'TOURIST / VISIT',
    valid: '5 YEARS',
    fees: 'PKR 75,000',
    date: '18 Dec 2026, 2:30 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/US.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    documents: 'Valid Passport, DS-160 Form Confirmation, Mock Interview Review, Financial Proof',
    description: 'B1/B2 Visitor Visa with appointment slot monitoring, DS-160 guidance, and embassy interview prep.',
  },
  {
    id: 'exp-gb',
    title: 'UNITED KINGDOM',
    flagCode: 'gb',
    type: 'TOURIST / VISIT',
    valid: '180 DAYS',
    fees: 'PKR 75,000',
    date: '17 Nov 2026, 5:40 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/GB.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    documents: 'Bank Statement, Employment Verification, Travel Itinerary, Valid Passport',
    description: 'UK Standard Visitor Visa with priority biometric submission and digital consular status.',
  },
  {
    id: 'exp-7',
    title: 'AUSTRALIA',
    flagCode: 'au',
    type: 'TOURIST / VISIT',
    valid: '6 MONTHS',
    fees: 'PKR 75,000',
    date: '12 Nov 2026, 5:31 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/AU.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    documents: '6 Months Bank Statements, Tax Returns, Employment Letter, Passport Scan',
    description: 'Australian Subclass 600 Visitor visa submitted directly to the Department of Home Affairs.',
  },
  {
    id: 'exp-4',
    title: 'CANADA',
    flagCode: 'ca',
    type: 'TOURIST / VISIT',
    valid: '10 YEARS',
    fees: 'PKR 75,000',
    date: '22 Dec 2026, 5:33 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/CA.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=800&q=80',
    documents: 'Bank Statement, Proof of Funds, Ties to Home Country, Passport, Biometrics',
    description: 'Multiple-entry Canadian Temporary Resident Visa (TRV) valid up to passport validity.',
  },
  {
    id: 'exp-de',
    title: 'GERMANY',
    flagCode: 'de',
    type: 'TOURIST / VISIT',
    valid: '180 DAYS',
    fees: 'PKR 75,000',
    date: '8 Nov 2026, 4:15 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/DE.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    documents: 'Bank Statement, Employment Letter, Travel Insurance, Confirmed Itinerary, Passport',
    description: 'Schengen Type C tourist visa processed at VFS Germany centers in Islamabad and Lahore.',
  },
  {
    id: 'exp-fr',
    title: 'FRANCE',
    flagCode: 'fr',
    type: 'TOURIST / VISIT',
    valid: '180 DAYS',
    fees: 'PKR 75,000',
    date: '14 Nov 2026, 3:00 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/FR.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    documents: 'Bank Statement, 2 Years Tax Returns, Cover Letter, Hotel Bookings, Passport',
    description: 'French Schengen visa enabling travel across all 29 Schengen states, processed via VFS France.',
  },
  {
    id: 'exp-it',
    title: 'ITALY',
    flagCode: 'it',
    type: 'TOURIST / VISIT',
    valid: '180 DAYS',
    fees: 'PKR 75,000',
    date: '20 Nov 2026, 2:00 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/IT.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport, Bank Statement, Travel Insurance, Hotel Voucher, Return Flight Ticket',
    description: 'Italian Schengen visa with Rome and Milan consular biometric submission via BLS International.',
  },
  {
    id: 'exp-jp',
    title: 'JAPAN',
    flagCode: 'jp',
    type: 'TOURIST',
    valid: '90 DAYS',
    fees: 'Price on call',
    date: '20 Nov 2026, 3:00 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/JP.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport, Keirekisho (Schedule), Bank Statement, Hotel & Flight Vouchers',
    description: 'Japan short-term tourist visa with detailed itinerary preparation and consular submission.',
  },
  {
    id: 'exp-10',
    title: 'TÜRKIYE',
    flagCode: 'tr',
    type: 'TOURIST',
    valid: '180 DAYS',
    fees: 'Price on call',
    date: '21 Oct 2026, 9:05 AM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/TR.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80',
    documents: 'Valid Passport, Supporting Visa / Residence Permit (if applicable), Return Ticket',
    description: 'Republic of Türkiye official eVisa portal instant approval with multi-entry privileges.',
  },
  {
    id: 'exp-8',
    title: 'INDONESIA',
    flagCode: 'id',
    type: 'TOURIST',
    valid: '90 DAYS',
    fees: 'Price on call',
    date: '2 Nov 2026, 5:44 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/ID.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport (min 6 mos validity), Return Flight Ticket, Digital Photo Scan',
    description: 'Official electronic visa (e-VOA / B211A) for Bali and all Indonesian provinces.',
  },
  {
    id: 'exp-3',
    title: 'IRELAND',
    flagCode: 'ie',
    type: 'VISIT FAMILY',
    valid: '180 DAYS',
    fees: 'Price on call',
    date: '2 Dec 2026, 5:44 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/IE.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=800&q=80',
    documents: 'Income Tax Returns, 6 Months Bank Statement, Employment Letter, Passport',
    description: 'Standard Irish short stay "C" visitor visa processed through VFS Global and Dublin Consular.',
  },
  {
    id: 'exp-ch',
    title: 'SWITZERLAND',
    flagCode: 'ch',
    type: 'TOURIST / VISIT',
    valid: '180 DAYS',
    fees: 'Price on call',
    date: '15 Nov 2026, 4:00 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/CH.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport, Bank Statement, Travel Insurance, Hotel Bookings, Return Flight',
    description: 'Swiss Schengen Type C visa granting unrestricted travel across all European Schengen states.',
  },
  {
    id: 'exp-nl',
    title: 'NETHERLANDS',
    flagCode: 'nl',
    type: 'TOURIST / VISIT',
    valid: '180 DAYS',
    fees: 'Price on call',
    date: '10 Nov 2026, 3:30 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/NL.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1584003564911-6e2ee44b77e9?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport, Bank Statement, Travel Insurance, Confirmed Itinerary, Employment Proof',
    description: 'Netherlands Schengen visa processed at VFS Netherlands allowing free movement across Europe.',
  },
  {
    id: 'exp-es',
    title: 'SPAIN',
    flagCode: 'es',
    type: 'TOURIST / VISIT',
    valid: '180 DAYS',
    fees: 'Price on call',
    date: '26 Nov 2026, 5:00 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/ES.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport, Bank Statement, Travel Insurance (EUR 30K), Round-Trip Flight, Hotel',
    description: 'Spanish Schengen short-stay visa with BLS submission centers in Islamabad and Lahore.',
  },
  {
    id: 'exp-nz',
    title: 'NEW ZEALAND',
    flagCode: 'nz',
    type: 'TOURIST / VISIT',
    valid: '9 MONTHS',
    fees: 'Price on call',
    date: '5 Dec 2026, 2:00 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/NZ.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport, Bank Statement, Employment Letter, Travel Insurance, Return Flight',
    description: 'New Zealand visitor visa with Immigration New Zealand online portal processing.',
  },
  {
    id: 'exp-2',
    title: 'MALAYSIA',
    flagCode: 'my',
    type: 'TOURIST / FAMILY',
    valid: '6 MONTHS',
    fees: 'Price on call',
    date: '30 Oct 2026, 5:52 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/MY.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport Bio Page, Digital Photo, Return Air Ticket, Proof of Accommodation',
    description: 'Official single/multiple entry tourist eVisa issued directly via the Malaysian Immigration Department.',
  },
  {
    id: 'exp-1',
    title: 'MALDIVES',
    flagCode: 'mv',
    type: 'TOURIST',
    valid: '30 DAYS',
    fees: 'Price on call',
    date: '20 Oct 2026, 8:52 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/MV.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport Scan, Confirmed Hotel Booking, Return Flight Ticket, IMUGA Declaration',
    description: 'Direct tourist arrival endorsement with fast-track immigration clearance across Male Atoll.',
  },
  {
    id: 'exp-6',
    title: 'MOROCCO',
    flagCode: 'ma',
    type: 'TOURIST',
    valid: '180 DAYS',
    fees: 'Price on call',
    date: '25 Oct 2026, 5:51 AM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/MA.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport Copy, Hotel Voucher, Round-trip Flight Reservation, Bank Letter',
    description: 'Kingdom of Morocco express tourist eVisa for tourism and commercial travel.',
  },
];

const EVENTS_DATA: VisaCardItem[] = [
  {
    id: 'ev-8',
    title: 'LONDON FASHION WEEK',
    flagCode: 'gb',
    type: 'VISIT / TOURIST',
    valid: '180 DAYS',
    fees: 'PKR 75,000',
    date: '14 Nov 2026, 7:10 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/GB.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    documents: 'Accreditation Letter, Proof of Accommodation, UK Visa Form, Passport Scan',
    description: 'British fashion council guest visa arrangement with Heathrow fast-track arrival and concierge.',
  },
  {
    id: 'ev-2',
    title: 'FIFA WORLD CUP - USA',
    flagCode: 'us',
    type: 'TOURIST / VISIT',
    valid: '5 YEARS',
    fees: 'PKR 75,000',
    date: '18 Dec 2026, 2:30 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/US.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    documents: 'Valid Passport, DS-160 Confirmation, Match Ticket Voucher, Financial Proof',
    description: 'Consular express sports appointment with match ticket verification and multi-state travel clearance.',
  },
  {
    id: 'ev-1',
    title: 'RAMADAN UMRAH 2027',
    flagCode: 'sa',
    type: 'TOURIST / VISIT',
    valid: '30 DAYS',
    fees: 'Price on call',
    date: '15 Jan 2027, 4:00 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/SA.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport Bio Scan, White Background Photo, Nusuk Permit Application, Return Flight',
    description: 'Complete pilgrimage bundle with priority flights, 5-star hotel transfers and confirmed Nusuk permits.',
  },
  {
    id: 'ev-3',
    title: 'GITEX GLOBAL - DUBAI',
    flagCode: 'ae',
    type: 'BUSINESS',
    valid: '60 DAYS',
    fees: 'Price on call',
    date: '24 Oct 2026, 11:00 AM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/AE.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport Copy, Delegate Pass Confirmation, Passport Photo, Hotel Booking',
    description: 'Dubai World Trade Centre official delegate visa with exhibition badges and airport VIP welcome.',
  },
  {
    id: 'ev-4',
    title: 'CANTON FAIR - CHINA',
    flagCode: 'cn',
    type: 'BUSINESS',
    valid: '90 DAYS',
    fees: 'Price on call',
    date: '28 Oct 2026, 6:15 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/CN.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80',
    documents: 'Official Invitation (TE), Passport Bio Page, Business Registration, Flight Itinerary',
    description: 'Official invitation letter (TE) support with expedited consular fingerprint biometric submission.',
  },
  {
    id: 'ev-5',
    title: 'WEB SUMMIT - LISBON',
    flagCode: 'pt',
    type: 'BUSINESS',
    valid: '90 DAYS',
    fees: 'Price on call',
    date: '3 Nov 2026, 1:20 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/PT.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    documents: 'Summit Attendee Ticket, 3 Months Bank Statement, Travel Insurance, Passport',
    description: 'Short stay Schengen business visa with European tech summit certification and hotel confirmations.',
  },
  {
    id: 'ev-6',
    title: 'HAJJ 2027 VIP PACKAGE',
    flagCode: 'sa',
    type: 'TOURIST / VISIT',
    valid: '40 DAYS',
    fees: 'Price on call',
    date: '10 Feb 2027, 9:00 AM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/SA.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80',
    documents: 'Nusuk Hajj Profile, Passport Copy, Meningitis Certificate, 4 Passport Photos',
    description: 'Turnkey authorized Hajj mission package with private air-conditioned tents in Mina and direct flights.',
  },
  {
    id: 'ev-7',
    title: 'TORONTO TECH EXPO',
    flagCode: 'ca',
    type: 'BUSINESS',
    valid: '10 YEARS',
    fees: 'PKR 75,000',
    date: '19 Dec 2026, 3:45 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/CA.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    documents: 'Conference Badge, Corporate Letter, Bank Statement, Passport Scan',
    description: 'Canadian business visitor status for tech founders, corporate delegates, and trade exhibitors.',
  },
  {
    id: 'ev-9',
    title: 'RIYADH SEASON PASS',
    flagCode: 'sa',
    type: 'TOURIST',
    valid: '1 YEAR',
    fees: 'Price on call',
    date: '22 Oct 2026, 10:30 AM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/SA.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80',
    documents: 'Passport Bio Page, Festival Ticket Confirmation, Digital Passport Photo',
    description: 'Multiple-entry tourism visa bundled with entertainment zone VIP access and festival bookings.',
  },
  {
    id: 'ev-10',
    title: 'FRANKFURT TRADE FAIR',
    flagCode: 'de',
    type: 'BUSINESS',
    valid: '180 DAYS',
    fees: 'PKR 75,000',
    date: '8 Nov 2026, 4:15 PM',
    image: 'https://media.atlys.com/f_auto,w_800/b2c/Home%20page/version-3/images/DE.avif?tr=orig&v=1',
    fallbackImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    documents: 'Messe Frankfurt Exhibitor Voucher, Company Chamber Registration, Passport',
    description: 'German consular business Schengen clearance with official Messe Frankfurt exhibitor registration.',
  },
];

function getCleanCountryName(title: string): string {
  const upper = title.toUpperCase();
  if (upper.includes('MALAYSIA')) return 'Malaysia';
  if (upper.includes('MALDIVES')) return 'Maldives';
  if (upper.includes('IRELAND')) return 'Ireland';
  if (upper.includes('CANADA') || upper.includes('TORONTO')) return 'Canada';
  if (upper.includes('UNITED KINGDOM') || upper.includes('LONDON') || upper.includes('UK')) return 'United Kingdom';
  if (upper.includes('MOROCCO')) return 'Morocco';
  if (upper.includes('AUSTRALIA')) return 'Australia';
  if (upper.includes('INDONESIA') || upper.includes('BALI')) return 'Indonesia';
  if (upper.includes('SAUDI') || upper.includes('UMRAH') || upper.includes('HAJJ') || upper.includes('RIYADH')) return 'Saudi Arabia';
  if (upper.includes('TÜRKIYE') || upper.includes('TURKEY') || upper.includes('ISTANBUL')) return 'Türkiye';
  if (upper.includes('USA') || upper.includes('UNITED STATES') || upper.includes('AMERICA')) return 'United States';
  if (upper.includes('DUBAI') || upper.includes('UAE') || upper.includes('GITEX')) return 'United Arab Emirates';
  if (upper.includes('CHINA') || upper.includes('CANTON') || upper.includes('BEIJING')) return 'China';
  if (upper.includes('LISBON') || upper.includes('PORTUGAL')) return 'Portugal';
  if (upper.includes('FRANKFURT') || upper.includes('GERMANY')) return 'Germany';
  if (upper.includes('SWITZERLAND') || upper.includes('SWISS')) return 'Switzerland';
  if (upper.includes('JAPAN') || upper.includes('TOKYO')) return 'Japan';
  if (upper.includes('SPAIN') || upper.includes('MADRID') || upper.includes('BARCELONA')) return 'Spain';
  if (upper.includes('FRANCE') || upper.includes('PARIS')) return 'France';
  if (upper.includes('ITALY') || upper.includes('ROME') || upper.includes('MILAN')) return 'Italy';
  if (upper.includes('NETHERLANDS') || upper.includes('AMSTERDAM') || upper.includes('DUTCH')) return 'Netherlands';
  if (upper.includes('NEW ZEALAND') || upper.includes('AUCKLAND')) return 'New Zealand';
  return title;
}

interface ExploreEventsSectionProps {
  onSelectCountry?: (country: string) => void;
  onSelectAppointment?: (type: 'visit' | 'business') => void;
  initialFilter?: string;
}

export const ExploreEventsSection: React.FC<ExploreEventsSectionProps> = ({ onSelectCountry, onSelectAppointment, initialFilter }) => {
  const [activeTab, setActiveTab] = useState<'explore' | 'events' | 'appointments'>('explore');
  const [searchQuery, setSearchQuery] = useState(initialFilter || '');
  const [typeFilter, setTypeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  useEffect(() => {
    if (initialFilter !== undefined) {
      if (initialFilter.toLowerCase().includes('hajj')) {
        setCategoryFilter('Hajj & Umrah');
        setSearchQuery('');
      } else {
        setSearchQuery(initialFilter);
      }
    }
  }, [initialFilter]);
  
  // Interactive Filter dropdown states for desktop
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter items
  const activeDataset = activeTab === 'explore' ? EXPLORE_DATA : activeTab === 'events' ? EVENTS_DATA : APPOINTMENTS_DATA;

  const filteredCards = useMemo(() => {
    if (activeTab === 'appointments') {
      return APPOINTMENTS_DATA.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase().trim());
        return matchesSearch;
      });
    }
    return activeDataset.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const itemType = item.type.toUpperCase();
      let matchesType = true;
      if (typeFilter === 'Visit') {
        matchesType = itemType.includes('VISIT');
      } else if (typeFilter === 'Family') {
        matchesType = itemType.includes('FAMILY') || itemType.includes('VISIT');
      } else if (typeFilter === 'Tourist') {
        matchesType = itemType.includes('TOURIST') || itemType.includes('VISIT') || itemType.includes('E-VISA');
      } else if (typeFilter === 'Business') {
        matchesType = itemType.includes('BUSINESS');
      }
      const matchesCategory =
        categoryFilter === 'All Categories' ||
        (categoryFilter === 'Hajj & Umrah' && (item.title.toLowerCase().includes('hajj') || item.title.toLowerCase().includes('saudi') || item.description?.toLowerCase().includes('hajj') || item.description?.toLowerCase().includes('nusuk')));
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [activeDataset, activeTab, searchQuery, typeFilter, categoryFilter]);

  // Check whether the featured horizontally long Kaaba card should be shown
  const showWideCard = useMemo(() => {
    if (activeTab !== 'explore') return false;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 'saudi arabia umrah qaba kaaba makkah mecca nusuk'.includes(q);
    const matchesType = typeFilter === 'All' || typeFilter === 'Tourist' || typeFilter === 'Visit';
    const matchesCategory = categoryFilter === 'All Categories' || categoryFilter === 'Hajj & Umrah';
    return matchesSearch && matchesType && matchesCategory;
  }, [activeTab, searchQuery, typeFilter, categoryFilter]);

  const toggleDropdown = (key: string) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  // Video refs for interactive WebM tab animations
  const exploreVideoRef = useRef<HTMLVideoElement>(null);
  const eventsVideoRef = useRef<HTMLVideoElement>(null);

  // Play explore tab animation on initial load
  useEffect(() => {
    if (exploreVideoRef.current) {
      exploreVideoRef.current.currentTime = 0;
      exploreVideoRef.current.play().catch(() => {});
    }
  }, []);

  // Handle switching or clicking tab: resets to 0 and plays smoothly to final frame
  const handleSelectTab = (tab: 'explore' | 'events' | 'appointments') => {
    setActiveTab(tab);
    if (tab === 'explore') {
      if (exploreVideoRef.current) {
        exploreVideoRef.current.currentTime = 0;
        exploreVideoRef.current.play().catch(() => {});
      }
    } else if (tab === 'events') {
      if (eventsVideoRef.current) {
        eventsVideoRef.current.currentTime = 0;
        eventsVideoRef.current.play().catch(() => {});
      }
    }
  };

  // Horizontally long card (spans 2 columns on mobile, 2 columns on desktop) with sharp Kaaba on the left and blurred panel on the right
  const renderWideKaabaCard = () => (
    <div
      key="wide-kaaba-card"
      onClick={() => {
        if (onSelectCountry) {
          onSelectCountry('Saudi Arabia');
        }
      }}
      className="col-span-2 md:col-span-2 lg:col-span-2 flex flex-col group select-none cursor-pointer"
    >
      {/* Upper Image Card with responsive height matching other cards */}
      <div className="relative h-[235px] sm:h-[310px] lg:h-[350px] w-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300 cursor-pointer bg-neutral-900 flex transform-gpu">
        {/* Background Photo: Main Kaaba (Qaba) on the left, continuing behind the blurred right panel (mirrored horizontally) */}
        <img
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1400&q=85"
          alt="Kaaba Makkah - Saudi Arabia"
          className="absolute inset-0 w-full h-full object-cover object-center -scale-x-100 group-hover:-scale-x-105 group-hover:scale-y-105 transition-transform duration-700 ease-out transform-gpu"
          loading="lazy"
          decoding="async"
        />

        {/* Subtle shadow gradient on left edge */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

        {/* 
          Right Blurred Panel:
          - Frosted glass overlay fading in HORIZONTALLY from left to right (feathered mask, no harsh vertical border)
          - Contains Flag, Destination Name, and Metadata Row (TYPE, VALID, FEES) only
        */}
        <div className="absolute right-0 inset-y-0 w-[55%] sm:w-[50%] lg:w-[48%] flex flex-col justify-end p-3 sm:p-4 text-white overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          {/* Layer 1: Frosted Blur Mask with crisp 4px blur radius fading in horizontally from left to right */}
          <div
            className="absolute inset-0 backdrop-blur-[4px] bg-gradient-to-r from-transparent via-black/40 to-black/80 pointer-events-none"
            style={{
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 15%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,1) 45%)',
              maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 15%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,1) 45%)',
            }}
          />

          {/* Layer 2: Content inside blurred zone: Flag, Country, Type, Valid, Fees details only */}
          <div className="relative z-10 flex flex-col items-center w-full justify-end">
            {/* Country Flag Circle */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-white/20 shadow-sm mb-1.5 sm:mb-2 flex items-center justify-center shrink-0 bg-white/10">
              <img
                src="https://flagcdn.com/w80/sa.png"
                alt="Saudi Arabia flag"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Destination Name */}
            <h4 className="font-['Playfair_Display',serif] text-[12px] sm:text-[14px] font-semibold uppercase tracking-[0.04em] text-white text-center leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] px-1">
              SAUDI ARABIA (HAJJ &amp; UMRAH)
            </h4>

            {/* Horizontal Divider with width matching other cards */}
            <div className="w-full max-w-[170px] sm:max-w-[195px] h-[1px] bg-white/25 my-2 sm:my-2.5" />

            {/* 
              Bottom Metadata Row:
              - In exact same manner and equal distance as other cards
              - On mobile: TYPE is left-aligned, VALID is right-aligned
              - On tablet/desktop (md:): 3 columns (TYPE left, VALID center, FEES right)
            */}
            <div className="w-full max-w-[170px] sm:max-w-[195px] flex items-end justify-between text-white">
              {/* TYPE */}
              <div className="text-left flex flex-col">
                <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider text-white/80 mb-0.5 leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  TYPE
                </span>
                <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-tight text-white leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  HAJJ &amp; UMRAH
                </span>
              </div>

              {/* VALID: text-right on mobile (<768px), text-center on md+ with equal distance */}
              <div className="text-right md:text-center flex flex-col">
                <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider text-white/80 mb-0.5 leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  VALID
                </span>
                <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-tight text-white leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  90 DAYS
                </span>
              </div>

              {/* FEES: Hidden on mobile, shown on tablet/desktop */}
              <div className="hidden md:flex text-right flex-col">
                <span className="text-[8.5px] uppercase tracking-wider text-white/55 mb-0.5 leading-none">
                  FEES
                </span>
                <span className="text-[10.5px] font-bold tracking-tight text-white leading-tight">
                  Price on call
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* External Text Below Card (identical to other cards) */}
      <div className="mt-2 sm:mt-2.5 px-0.5 flex flex-col gap-0.5">
        <p className="text-[11.5px] sm:text-xs font-semibold text-neutral-800 leading-tight">
          Saudi Arabia (Hajj &amp; Umrah)
        </p>
        <p className="text-[10.5px] text-neutral-500 leading-tight">
          Official Nusuk and consular pilgrimage permit issued directly for pilgrimage.
        </p>
        <p className="md:hidden text-[11px] font-medium text-neutral-500 mt-0.5 leading-tight">
          Fees: Price on call
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white">
      <section id="explore-events" className="w-full bg-white py-8 sm:py-12 px-3.5 sm:px-8 xl:px-14 max-w-[1440px] mx-auto font-sans select-none scroll-mt-20">
      {/* 
        Top Interactive Switcher (Explore vs Events) & Desktop Search Input
        Strictly omitting top-left logo and top-right flags/user profiles
      */}
      <div className="relative flex flex-col md:flex-row items-center justify-center mb-5 md:mb-8 gap-4">
        {/* Center Tab Switcher */}
        <div className="flex items-center gap-8 sm:gap-10">
          {/* 1. Explore Button */}
          <button
            onClick={() => handleSelectTab('explore')}
            className="group flex flex-col items-center cursor-pointer select-none"
            aria-label="Switch to Explore Tab"
          >
            <div
              className={`w-[76px] h-[76px] sm:w-[86px] sm:h-[86px] rounded-full overflow-hidden flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.04] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 relative ${
                activeTab === 'explore'
                  ? 'bg-[#F4F6F9] ring-2 ring-[#1D4ED8]/30 shadow-[0_8px_24px_rgba(29,78,216,0.18)]'
                  : 'bg-[#F4F6F9] hover:bg-[#EAEFF5] hover:shadow-md'
              }`}
            >
              <video
                ref={exploreVideoRef}
                src="https://media.atlys.com/b2c/Home%20page/Animated%20Icons/global-doc-icon.webm?tr=orig-true"
                poster="https://res.cloudinary.com/dacyy7rkn/image/upload/v1792509228/c456ccf6-31de-428c-b252-08563c88c953.png"
                muted
                playsInline
                preload="auto"
                loop={false}
                className="w-full h-full object-contain pointer-events-none p-0.5 sm:p-1 scale-[1.28] sm:scale-[1.32] transition-transform duration-300 group-hover:scale-[1.36]"
              />
            </div>
            <span
              className={`text-[13.5px] sm:text-[14px] mt-2.5 transition-colors ${
                activeTab === 'explore'
                  ? 'font-bold text-neutral-900'
                  : 'font-medium text-neutral-400 group-hover:text-neutral-700'
              }`}
            >
              Explore
            </span>
            {activeTab === 'explore' ? (
              <motion.div
                layoutId="activeTabLine"
                className="w-5 h-[2.5px] bg-neutral-900 rounded-full mt-1.5 transform-gpu"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="w-5 h-[2.5px] mt-1.5 opacity-0" />
            )}
          </button>

          {/* 2. Events Button */}
          <button
            onClick={() => handleSelectTab('events')}
            className="group flex flex-col items-center cursor-pointer select-none"
            aria-label="Switch to Events Tab"
          >
            <div
              className={`w-[76px] h-[76px] sm:w-[86px] sm:h-[86px] rounded-full overflow-hidden flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.04] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 relative ${
                activeTab === 'events'
                  ? 'bg-[#FBF7F2] ring-2 ring-[#D97706]/35 shadow-[0_8px_24px_rgba(217,119,6,0.18)]'
                  : 'bg-[#FBF7F2] hover:bg-[#F7EFE4] hover:shadow-md'
              }`}
            >
              <video
                ref={eventsVideoRef}
                src="https://media.atlys.com/b2c/Home%20page/Animated%20Icons/events_icon_alpha.webm?tr=orig-true"
                poster="https://res.cloudinary.com/dacyy7rkn/image/upload/v1792509228/c456ccf6-31de-428c-b252-08563c88c953.png"
                muted
                playsInline
                preload="auto"
                loop={false}
                className="w-full h-full object-contain pointer-events-none p-1 sm:p-1.5 scale-110 transition-transform duration-300 group-hover:scale-115"
              />
            </div>
            <span
              className={`text-[13.5px] sm:text-[14px] mt-2.5 transition-colors ${
                activeTab === 'events'
                  ? 'font-bold text-neutral-900'
                  : 'font-medium text-neutral-400 group-hover:text-neutral-700'
              }`}
            >
              Events
            </span>
            {activeTab === 'events' ? (
              <motion.div
                layoutId="activeTabLine"
                className="w-5 h-[2.5px] bg-neutral-900 rounded-full mt-1.5 transform-gpu"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="w-5 h-[2.5px] mt-1.5 opacity-0" />
            )}
          </button>

          {/* 3. Appointments Button */}
          <button
            onClick={() => handleSelectTab('appointments')}
            className="group flex flex-col items-center cursor-pointer select-none"
            aria-label="Switch to Appointments Tab"
          >
            <div
              className={`w-[76px] h-[76px] sm:w-[86px] sm:h-[86px] rounded-full overflow-hidden flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.04] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 relative ${
                activeTab === 'appointments'
                  ? 'bg-[#F0FDF4] ring-2 ring-[#16A34A]/35 shadow-[0_8px_24px_rgba(22,163,74,0.18)]'
                  : 'bg-[#F0FDF4] hover:bg-[#DCFCE7] hover:shadow-md'
              }`}
            >
              <div className="w-full h-full flex items-center justify-center p-0.5 sm:p-1">
                <img
                  src="https://res.cloudinary.com/rpphjsst/image/upload/v1794938247/Gemini_Generated_Image_n5307xn5307xn530-removebg-preview.avif"
                  alt="Appointments"
                  className="w-full h-full object-contain scale-[1.28] sm:scale-[1.32] transition-transform duration-300 group-hover:scale-[1.38]"
                />
              </div>
            </div>
            <span
              className={`text-[13.5px] sm:text-[14px] mt-2.5 transition-colors ${
                activeTab === 'appointments'
                  ? 'font-bold text-neutral-900'
                  : 'font-medium text-neutral-400 group-hover:text-neutral-700'
              }`}
            >
              Appointments
            </span>
            {activeTab === 'appointments' ? (
              <motion.div
                layoutId="activeTabLine"
                className="w-5 h-[2.5px] bg-neutral-900 rounded-full mt-1.5 transform-gpu"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="w-5 h-[2.5px] mt-1.5 opacity-0" />
            )}
          </button>
        </div>

        {/* Desktop-Only Right Search Input (Hidden on mobile) */}
        <div className="hidden md:flex md:w-[210px] md:absolute md:right-0">
          <div className="w-full h-10 px-4 rounded-full border border-neutral-400/80 bg-white flex items-center gap-2.5 focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900/10 transition shadow-xs">
            <Search className="w-4 h-4 text-neutral-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Country"
              className="text-[13px] text-neutral-800 placeholder:text-neutral-500 bg-transparent outline-none w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-0.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 
        Mobile Search & Filter Row (< 768px)
        Contains Search Pill (centered content) + Circular Filter Button
      */}
      {activeTab !== 'appointments' && (
        <div className="flex md:hidden items-center gap-2.5 w-full mb-6">
          {/* 1. Search Pill */}
          <div className="flex-1 h-11 rounded-full border border-neutral-200/90 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-center px-4">
            <Search className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search Country"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-[13.5px] font-medium text-neutral-700 placeholder:text-neutral-500 bg-transparent outline-none w-[115px] focus:w-full transition-all text-left"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-neutral-400 hover:text-neutral-700 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 2. Circular Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            aria-label="Filter Options"
            className="w-11 h-11 rounded-full border border-neutral-200/90 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-center shrink-0 text-neutral-800 active:scale-95 transition cursor-pointer"
          >
            <ListFilter className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      )}

      {/* 
        Floating 2-Column Filter Pill Bar (Hajj & Umrah, Type)
      */}
      {activeTab !== 'appointments' && (
        <div className="hidden md:grid max-w-[500px] mx-auto mb-10 bg-white rounded-[22px] shadow-[0_10px_35px_rgba(0,0,0,0.07)] border border-neutral-100 px-3 py-2.5 grid-cols-2 items-center divide-x divide-neutral-200/70">
          {/* Segment 1: Hajj & Umrah Filter */}
          <div className="relative py-2 sm:py-0 px-3 flex items-center gap-2.5 cursor-pointer group" onClick={() => toggleDropdown('category')}>
            <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Palmtree className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[11px] text-neutral-400 leading-tight">Category:</span>
              <span className="text-[12.5px] font-semibold text-neutral-900 flex items-center justify-between gap-1 leading-tight mt-0.5">
                <span className="truncate">{categoryFilter}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${activeDropdown === 'category' ? 'rotate-180' : ''}`} />
              </span>
            </div>

            {/* Dropdown Menu */}
            {activeDropdown === 'category' && (
              <div className="absolute top-full left-0 mt-3 w-48 bg-white border border-neutral-100 rounded-2xl shadow-xl p-1.5 z-40 text-xs">
                {['All Categories', 'Hajj & Umrah'].map((opt) => (
                  <div
                    key={opt}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCategoryFilter(opt);
                      setActiveDropdown(null);
                    }}
                    className={`px-3 py-2 rounded-xl cursor-pointer hover:bg-neutral-50 transition ${
                      categoryFilter === opt ? 'font-bold text-[#1D4ED8] bg-blue-50/60' : 'text-neutral-700'
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Segment 2: Type */}
          <div className="relative py-2 sm:py-0 px-3 flex items-center gap-2.5 cursor-pointer group" onClick={() => toggleDropdown('type')}>
            <div className="w-7 h-7 rounded-full bg-[#3B82F6] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Plane className="w-3.5 h-3.5 fill-current" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[11px] text-neutral-400 leading-tight">Type:</span>
              <span className="text-[12.5px] font-semibold text-neutral-900 flex items-center justify-between gap-1 leading-tight mt-0.5">
                <span className="truncate">{typeFilter === 'All' ? 'All Types' : typeFilter}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${activeDropdown === 'type' ? 'rotate-180' : ''}`} />
              </span>
            </div>

            {/* Dropdown Menu */}
            {activeDropdown === 'type' && (
              <div className="absolute top-full right-0 mt-3 w-48 bg-white border border-neutral-100 rounded-2xl shadow-xl p-1.5 z-40 text-xs">
                {['All', 'Visit', 'Family', 'Tourist', 'Business'].map((opt) => (
                  <div
                    key={opt}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTypeFilter(opt);
                      setActiveDropdown(null);
                    }}
                    className={`px-3 py-2 rounded-xl cursor-pointer hover:bg-neutral-50 transition ${
                      typeFilter === opt ? 'font-bold text-[#1D4ED8] bg-blue-50/60' : 'text-neutral-700'
                    }`}
                  >
                    {opt === 'All' ? 'All Types' : opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 
        Card Grid: 2-Column on Mobile, 3-Column on Tablet, 5-Column on Desktop
        Animated crossfade when switching between Explore & Events
      */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'opacity, transform' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3.5 sm:gap-x-5 gap-y-6 sm:gap-y-9 transform-gpu"
        >
          {filteredCards.length > 0 || showWideCard ? (
            <>
              {filteredCards.map((card, index) => (
                <React.Fragment key={card.id}>
                  <div
                onClick={() => {
                  if (activeTab === 'appointments') {
                    if (onSelectAppointment) {
                      onSelectAppointment(card.id.includes('business') ? 'business' : 'visit');
                    }
                  } else if (onSelectCountry) {
                    onSelectCountry(getCleanCountryName(card.title));
                  }
                }}
                className="flex flex-col group select-none cursor-pointer"
              >
                {/* Upper Image Card with responsive mobile height */}
                <div className="relative h-[235px] sm:h-[310px] lg:h-[350px] w-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300 cursor-pointer bg-neutral-100 transform-gpu">
                  {/* Background Photo */}
                  <img
                    src={card.image}
                    alt={card.title}
                    onError={(e) => {
                      if (card.fallbackImage && e.currentTarget.src !== card.fallbackImage) {
                        e.currentTarget.src = card.fallbackImage;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out transform-gpu"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* 
                    Progressive Bottom Blur with lightened translucent gradient
                    Smooth desktop upward-slide reveal:
                    - Expands height from h-[52%] to lg:group-hover:h-[82%]
                    - Lightened gradient to eliminate heavy darkness while maintaining blur aesthetic
                  */}
                  <div className="absolute inset-x-0 bottom-0 h-[48%] lg:group-hover:h-[80%] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-end p-3 sm:p-4">
                    {/* Layer 1: Frosted Blur Mask with reduced 4px blur radius and clean gradient */}
                    <div
                      className="absolute inset-0 backdrop-blur-[4px] bg-gradient-to-t from-black/40 via-black/15 to-transparent pointer-events-none"
                      style={{
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
                        maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
                      }}
                    />

                    {/* Layer 2: Content inside blurred zone (Anchored to bottom justify-end) */}
                    <div className="relative z-10 flex flex-col items-center w-full justify-end">
                      {/* Country Flag Circle - Hidden for Appointments */}
                      {activeTab !== 'appointments' && card.flagCode && (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-white/20 shadow-sm mb-1.5 sm:mb-2 flex items-center justify-center shrink-0 bg-white/10">
                          <img
                            src={`https://flagcdn.com/w80/${card.flagCode.toLowerCase()}.png`}
                            alt={`${card.title} flag`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Destination Name */}
                      <h4 className="font-['Playfair_Display',serif] text-[13px] sm:text-[15px] font-semibold uppercase tracking-[0.04em] text-white text-center leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                        {card.title}
                      </h4>

                      {/* Horizontal Divider */}
                      <div className="w-full h-[1px] bg-white/25 my-2 sm:my-2.5" />

                      {/* 
                        Bottom Metadata Row:
                        - When activeTab === 'appointments': Only write TYPE (No VALID, No FEES)
                        - For Explore/Events: TYPE, VALID, FEES
                      */}
                      {activeTab === 'appointments' ? (
                        <div className="w-full flex items-center justify-center text-white py-0.5">
                          <div className="text-center flex flex-col items-center">
                            <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider text-white/80 mb-0.5 leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                              TYPE
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight text-white leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                              {card.type}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex items-end justify-between text-white">
                          {/* TYPE */}
                          <div className="text-left flex flex-col">
                            <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider text-white/80 mb-0.5 leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                              TYPE
                            </span>
                            <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-tight text-white leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                              {card.type}
                            </span>
                          </div>

                          {/* VALID: text-right on mobile (<768px), text-center on md+ */}
                          <div className="text-right md:text-center flex flex-col">
                            <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-wider text-white/80 mb-0.5 leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                              VALID
                            </span>
                            <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-tight text-white leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                              {card.valid}
                            </span>
                          </div>

                          {/* FEES: Hidden on mobile, shown on tablet/desktop */}
                          {card.fees ? (
                            <div className="hidden md:flex text-right flex-col">
                              <span className="text-[8.5px] uppercase tracking-wider text-white/55 mb-0.5 leading-none">
                                FEES
                              </span>
                              <span className="text-[10.5px] font-bold tracking-tight text-white leading-tight">
                                {card.fees}
                              </span>
                            </div>
                          ) : (
                            <div className="hidden md:block w-1" />
                          )}
                        </div>
                      )}

                      {/* 
                        Expandable Upward-Pushing Content Container (Desktop only)
                        CSS grid row transition: grid-rows-[0fr] -> lg:group-hover:grid-rows-[1fr]
                      */}
                      <div className="w-full grid grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] opacity-0 lg:group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        <div className="overflow-hidden min-h-0 w-full flex flex-col">
                          {/* 1. Top Divider */}
                          <div className="w-full h-[1px] bg-white/15 my-3" />

                          {/* 2. Documents Label */}
                          <span className="text-[9.5px] font-semibold uppercase tracking-[0.08em] text-white/50 text-left mb-1 leading-none">
                            DOCUMENTS NEEDED:
                          </span>

                          {/* 3. Documents List */}
                          <p className="text-[11.5px] font-semibold text-white leading-[1.35] text-left line-clamp-2">
                            {card.documents}
                          </p>

                          {/* 4. Bottom Divider */}
                          <div className="w-full h-[1px] bg-white/15 my-3" />

                          {/* 5. Emergency Assistance Pill Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (activeTab === 'appointments') {
                                if (onSelectAppointment) {
                                  onSelectAppointment(card.id.includes('business') ? 'business' : 'visit');
                                }
                              } else if (onSelectCountry) {
                                onSelectCountry(getCleanCountryName(card.title));
                              }
                            }}
                            className="w-full py-1.5 px-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 shadow-xs"
                          >
                            {/* Small dashed-circle clock/timer SVG */}
                            <svg className="w-3.5 h-3.5 text-white/80 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
                              <polyline points="12 7 12 12 15 14" />
                            </svg>
                            <span className="text-[11px] font-medium tracking-tight whitespace-nowrap">
                              <span className="text-white">{activeTab === 'appointments' ? 'Book ' : 'Get '}</span>
                              <span className="bg-gradient-to-r from-white via-[#86EFAC] to-white bg-clip-text text-transparent font-medium">
                                {activeTab === 'appointments' ? 'priority slot' : 'emergency assistance'}
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 
                  External Text Below Each Card:
                  - Mobile only: Fees: {card.fees} (hidden for appointments)
                */}
                {activeTab !== 'appointments' && card.fees && (
                  <div className="mt-2 sm:mt-2.5 px-0.5 md:hidden">
                    <p className="text-[11px] font-medium text-neutral-500 mt-0.5 leading-tight">
                      Fees: {card.fees}
                    </p>
                  </div>
                )}
              </div>

              {/* Horizontally Long Kaaba Card: Placed directly after the first two cards */}
              {index === 1 && showWideCard && renderWideKaabaCard()}
            </React.Fragment>
          ))}

          {/* If fewer than 2 regular cards matched (e.g. searching specifically for "Saudi"), still render the wide card */}
          {filteredCards.length < 2 && showWideCard && renderWideKaabaCard()}
        </>
      ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
              <Search className="w-10 h-10 text-neutral-300 mb-3" />
              <p className="text-neutral-800 font-semibold text-base">No destinations match "{searchQuery}"</p>
              <p className="text-neutral-500 text-xs mt-1">Try searching another country or reset your filter query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('All Visa Types');
                }}
                className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded-full text-xs font-medium hover:bg-neutral-800 transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Mobile Filter Drawer / Bottom Sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: 'transform' }}
              className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto transform-gpu"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <ListFilter className="w-4 h-4 text-neutral-800" />
                  <h3 className="font-sans font-bold text-base text-neutral-900">Filter Visas</h3>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter categories */}
              <div className="py-4 space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-500 uppercase tracking-wider text-[10px] block mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {['All Categories', 'Hajj & Umrah'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategoryFilter(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                          categoryFilter === c
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-500 uppercase tracking-wider text-[10px] block mb-2">Visa Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Visit', 'Family', 'Tourist', 'Business'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTypeFilter(t)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                          typeFilter === t
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                        }`}
                      >
                        {t === 'All' ? 'All Types' : t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-neutral-900 text-white text-xs font-bold uppercase rounded-xl tracking-wider mt-2 active:scale-95 transition cursor-pointer"
              >
                Apply Filters ({filteredCards.length} Results)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* End of Filter Drawer */}
    </section>
  </div>
  );
};
