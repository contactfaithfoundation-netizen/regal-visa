import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Globe,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  MessageCircle,
  FileText,
  BadgeCheck,
  Zap,
  Lock,
} from 'lucide-react';

interface ServiceBullet {
  title: string;
  desc: string;
}

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tags: string[];
  bullets: ServiceBullet[];
  visual: {
    badge: string;
    badgeIcon: 'qr' | 'stamp' | 'audit' | 'globe' | 'shield';
    image: string;
    accentColor: string;
    caption: string;
  };
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'digital-evisa',
    number: '01',
    title: '100% Digital eVisa & Fast-Track Consular Processing',
    subtitle:
      'No embassy queues, no physical passport surrender, no biometric center visits for eVisa routes.',
    tags: ['Turnkey Digital Filing', 'Instant WhatsApp Dispatch', 'Consular Barcode Clearance'],
    bullets: [
      {
        title: 'Instant & Express eVisas',
        desc: 'Turnkey filing and dispatch for destinations including Saudi Arabia (Tourist & Umrah 1-Year Multiple Entry), Malaysia, Maldives (Free on-arrival & IMUGA pre-clearance), Türkiye (supporting visa route), Indonesia (Bali e-VOA / B211A), Morocco, and the UAE.',
      },
      {
        title: 'Instant Digital Delivery',
        desc: 'Official verified PDF grant documents equipped with machine-readable consular QR codes delivered directly via WhatsApp and email.',
      },
    ],
    visual: {
      badge: 'Digital Consular Portal',
      badgeIcon: 'qr',
      image:
        'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1000&q=85',
      accentColor: '#2563EB',
      caption: 'Smartphone eVisa PDF with cryptographic QR code verification',
    },
  },
  {
    id: 'tier1-embassy',
    number: '02',
    title: 'Tier-1 Embassy & Sticker Visa Facilitation',
    subtitle:
      'Complete legal dossier structuring, appointment procurement, and interview preparation for high-rejection jurisdictions.',
    tags: ['DS-160 Legal Brief', 'GTE Statement Drafting', 'VFS Appointment Tracking'],
    bullets: [
      {
        title: 'United Kingdom',
        desc: 'Standard 6-month & 2-year visitor visa preparation with funds origin auditing.',
      },
      {
        title: 'United States (B1/B2)',
        desc: 'DS-160 application submission, consular interview slot tracking at US Embassy Islamabad / Karachi Consulate, and mock interview coaching.',
      },
      {
        title: 'Canada (TRV 10-Year)',
        desc: 'IRCC portal dossier formulation, ties proof, and biometric scheduling at VFS.',
      },
      {
        title: 'Schengen Area (Switzerland, Spain, etc.)',
        desc: 'Cantonal compliance, EUR 30,000 Schengen-compliant travel medical insurance, and GDS hotel/flight vouchers.',
      },
      {
        title: 'Australia (Subclass 600)',
        desc: 'Genuine Temporary Entrant (GTE) statement authoring and ImmiAccount tracking.',
      },
      {
        title: 'Japan & Ireland',
        desc: 'Keirekisho daily itinerary drafting and Irish INIS submission dossiers.',
      },
    ],
    visual: {
      badge: 'Official Sticker Visas',
      badgeIcon: 'stamp',
      image:
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=85',
      accentColor: '#1D4ED8',
      caption: 'Open passport stamped with verified multi-entry consular endorsements',
    },
  },
  {
    id: 'document-auditing',
    number: '03',
    title: 'Consular Document Auditing & Pre-Clearance',
    subtitle:
      'Forensic cross-auditing to eliminate discrepancy triggers before file transmission to foreign missions.',
    tags: ['FBR Tax ATL Alignment', 'GDS Live PNR Holds', '120-Min Fast Audit'],
    bullets: [
      {
        title: 'Financial & FBR Forensic Review',
        desc: 'Cross-auditing applicant bank turnover against FBR Active Taxpayer List (ATL) declarations to prevent economic-ties refusals.',
      },
      {
        title: 'Rapid Document Verification',
        desc: 'Photo background checks, passport bio-data validation, and employer NOC compliance within 30 to 120 minutes of receipt.',
      },
      {
        title: 'Real Airline PNR & Hotel Verification',
        desc: 'Generating legitimate, verifiable GDS reservations that stay active through long consular review cycles.',
      },
    ],
    visual: {
      badge: 'Forensic Audit Passed',
      badgeIcon: 'audit',
      image:
        'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=85',
      accentColor: '#2563EB',
      caption: 'Consular audit seal and verified flight booking authentication',
    },
  },
  {
    id: 'residence-citizenship',
    number: '04',
    title: 'Global Residence & Citizenship Pathways',
    subtitle: 'Specialized migration programs accessible through our executive consular desk.',
    tags: ['Swiss Cantonal L/B', 'EU Golden Visa', 'Commonwealth Passports'],
    bullets: [
      {
        title: 'Residency Programs',
        desc: 'Switzerland Cantonal Residence (L/B), EU Golden Visa & Real Estate Residence, and UAE 10-Year Golden Nomad Residency.',
      },
      {
        title: 'Direct Citizenship by Investment',
        desc: 'Malta Exceptional Direct Citizenship, Caribbean Commonwealth Dual Passports (St. Kitts & Nevis), and Vanuatu Fast-Track Honorary Citizenship.',
      },
    ],
    visual: {
      badge: 'Global Mobility Desk',
      badgeIcon: 'globe',
      image:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
      accentColor: '#0284C7',
      caption: 'International dual passport sovereignty and golden residency pathways',
    },
  },
  {
    id: 'client-support',
    number: '05',
    title: 'Client Support & Re-Application Defense',
    subtitle: 'Dedicated consular officers defending your profile and handling urgent escalations.',
    tags: ['15-Min Fast Callback', '24/7 WhatsApp Concierge', 'Remonstrance Appeals'],
    bullets: [
      {
        title: 'Free Visa Profile Assessment',
        desc: 'Rapid-response lead assessment form promising a 15-minute response from a senior consular officer.',
      },
      {
        title: 'Direct WhatsApp Concierge',
        desc: 'Instant 1-on-1 assistance for emergency inquiries, flight updates, and document verification.',
      },
      {
        title: 'Refusal Defense & Re-Application',
        desc: 'Reviewing official embassy refusal notes, curing documentation deficiencies, and drafting administrative review (Remonstrance) appeals.',
      },
    ],
    visual: {
      badge: 'Consular Defense Shield',
      badgeIcon: 'shield',
      image:
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=85',
      accentColor: '#2563EB',
      caption: 'Turnkey legal appeal drafting and 15-minute consular defense consultation',
    },
  },
];

export const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isUserInteractingRef = useRef(false);

  // Scroll synchronization for Desktop 3-Column Sticky View
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isUserInteractingRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // When the top of section reaches top of viewport
      const totalDist = rect.height - windowH;
      if (totalDist <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalDist));
      const targetIndex = Math.min(4, Math.floor(progress * 5));

      setActiveIndex(targetIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectService = (index: number) => {
    setActiveIndex(index);
    isUserInteractingRef.current = true;

    // Smoothly scroll container track to the corresponding segment
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const sectionTop = currentScrollY + rect.top;
      const totalDist = rect.height - window.innerHeight;
      if (totalDist > 0) {
        const targetScrollY = sectionTop + (index / 4.8) * totalDist;
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth',
        });
      }
    }

    setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 600);
  };

  const activeService = SERVICES_DATA[activeIndex];

  // Rotary Dial Math for Desktop (Semi-circular curve on left edge)
  // Arc radius: 170px, centered slightly offscreen left (cx: -30, cy: 190)
  const dialRadius = 175;
  const dialCenterX = -20;
  const dialCenterY = 180;
  const stepAngleDeg = 32;

  return (
    <section
      id="services-section"
      ref={containerRef}
      className="relative w-full bg-[#FAFAFC] text-neutral-900 border-t border-neutral-100 select-none"
    >
      {/* 
        DESKTOP LAYOUT (>= 1024px): 
        Sticky Scroll-Jacking 3-Column Layout in a tall track
      */}
      <div className="hidden lg:block relative h-[380vh]">
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 px-6 xl:px-12 max-w-[1440px] mx-auto overflow-hidden">
          {/* 1. Header: Inherits exact typography from Blogs & About */}
          <div className="relative flex flex-col items-center justify-center shrink-0 mb-4 select-none">
            {/* Atmospheric soft blue glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-24 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />

            {/* Faint sculptural backdrop silhouette */}
            <span className="absolute -top-4 sm:-top-7 text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase">
              SERVICES
            </span>

            {/* Primary Heading */}
            <h2 className="relative font-sans text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-[#0F172A] leading-none select-none">
              Our <span className="text-[#2563EB]">Services</span>
            </h2>

            {/* Minimalist brand accent bar */}
            <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-3.5" />
          </div>

          {/* 2. Interactive 3-Column Core Workspace */}
          <div className="flex-1 grid grid-cols-12 gap-8 items-center min-h-0">
            {/* ========================================================
                LEFT COLUMN (25% width - Col Span 3): Vertical Rotary Counter Roller
                Large semi-circular dotted dial anchored to left edge
            ======================================================== */}
            <div className="col-span-3 relative h-[380px] flex items-center justify-start select-none">
              {/* Dotted Dial SVG Arc */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                viewBox="0 0 260 380"
              >
                {/* Semi-circular dashed dial track */}
                <path
                  d="M -20,10 A 175 175 0 0 1 -20,350"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="2.5"
                  strokeDasharray="4 8"
                  strokeLinecap="round"
                />
                {/* Active quadrant glow arc */}
                <path
                  d="M -20,135 A 175 175 0 0 1 -20,225"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="opacity-70"
                />
              </svg>

              {/* Numbers rotating along the semi-circular curve */}
              <div className="relative w-full h-full flex items-center">
                {SERVICES_DATA.map((srv, idx) => {
                  const diff = idx - activeIndex;
                  const angle = diff * stepAngleDeg;
                  const rad = (angle * Math.PI) / 180;
                  const x = dialCenterX + dialRadius * Math.cos(rad);
                  const y = dialCenterY + dialRadius * Math.sin(rad);
                  const isActive = idx === activeIndex;

                  return (
                    <motion.div
                      key={srv.id}
                      animate={{
                        x,
                        y: y - 24, // center alignment
                        rotate: angle * 0.75,
                        opacity: isActive ? 1 : Math.max(0.18, 0.65 - Math.abs(diff) * 0.22),
                        scale: isActive ? 1.05 : 0.88,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 26,
                      }}
                      onClick={() => handleSelectService(idx)}
                      className={`absolute left-0 top-0 flex items-center gap-3 cursor-pointer group select-none ${
                        isActive ? 'z-20' : 'z-10'
                      }`}
                    >
                      {/* Active Indicator: Brand Blue Dot */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="w-3 h-3 rounded-full bg-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.7)] shrink-0 ring-4 ring-[#2563EB]/15"
                          />
                        )}
                      </AnimatePresence>

                      {/* Number Label */}
                      <span
                        className={`font-sans tracking-tight transition-colors duration-200 ${
                          isActive
                            ? 'text-4xl font-black text-[#0F172A]'
                            : 'text-2xl font-bold text-[#94A3B8] group-hover:text-[#475569]'
                        }`}
                      >
                        {srv.number}
                      </span>

                      {/* Micro Title Tag for hovered or active item */}
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-0.5 rounded-full border border-[#2563EB]/20 hidden xl:inline-block"
                        >
                          Step {srv.number}
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ========================================================
                CENTER COLUMN (45% width - Col Span 5): Service Content
                Vertically centered container that transitions smoothly
            ======================================================== */}
            <div className="col-span-5 flex flex-col justify-center px-4 xl:px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  {/* Step identifier badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    <span className="text-[11px] font-bold text-[#0F172A] tracking-wider uppercase">
                      Service {activeService.number} of 05
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-sans text-2xl xl:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                    {activeService.title}
                  </h3>

                  {/* Subtitle Paragraph */}
                  <p className="text-sm xl:text-[15px] text-[#475569] font-normal leading-relaxed">
                    {activeService.subtitle}
                  </p>

                  {/* Sub-Service Pill Tags */}
                  <div className="flex flex-wrap gap-2 pt-1 pb-1">
                    {activeService.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold text-[#1E293B] bg-white px-3 py-1 rounded-full border border-[#E2E8F0] shadow-2xs hover:border-[#2563EB]/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Structured Bullets */}
                  <div className="space-y-3 pt-2">
                    {activeService.bullets.map((bullet, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex items-start gap-3 hover:border-[#2563EB]/30 transition-colors"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-xs leading-relaxed">
                          <strong className="text-[#0F172A] font-bold block mb-0.5">
                            {bullet.title}
                          </strong>
                          <span className="text-[#64748B] font-medium">{bullet.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ========================================================
                RIGHT COLUMN (30% width - Col Span 4): Dynamic Visual Container
                Crossfades and gently rotates matching graphic
            ======================================================== */}
            <div className="col-span-4 flex items-center justify-center pl-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, rotate: -4, scale: 0.94 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 4, scale: 0.94 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-[340px] aspect-[4/5] rounded-[28px] overflow-hidden bg-white p-2.5 border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.12)] group"
                >
                  {/* Inner Image Container with subtle atmospheric treatment */}
                  <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#0F172A]">
                    <img
                      src={activeService.visual.image}
                      alt={activeService.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay for contrast & lighting */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
                      <span>{activeService.visual.badge}</span>
                    </div>

                    {/* Floating Step Watermark */}
                    <span className="absolute top-2 right-3 text-5xl font-black text-white/10 pointer-events-none select-none">
                      {activeService.number}
                    </span>

                    {/* Bottom Caption Pill */}
                    <div className="absolute bottom-3.5 inset-x-3.5 z-10 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
                        <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#0F172A]">
                          Verified Consular Service
                        </span>
                      </div>
                      <p className="text-[11px] text-[#475569] leading-snug line-clamp-2">
                        {activeService.visual.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 3. Bottom Progress Bar & Jump Dots */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#64748B]">Scroll or select service</span>
              <div className="flex items-center gap-1.5 ml-2">
                {SERVICES_DATA.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectService(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeIndex ? 'w-8 bg-[#2563EB]' : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                    }`}
                    aria-label={`Jump to service ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelectService(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                aria-label="Previous Service"
                className="p-2 rounded-full bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer text-[#0F172A]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSelectService(Math.min(4, activeIndex + 1))}
                disabled={activeIndex === 4}
                aria-label="Next Service"
                className="p-2 rounded-full bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer text-[#0F172A]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 
        MOBILE LAYOUT (< 1024px): 
        Stacked Vertical View with Horizontal Counter Roller
      */}
      <div className="lg:hidden py-14 px-4 sm:px-6">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Header */}
          <div className="relative flex flex-col items-center justify-center mb-6 select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />
            <span className="absolute -top-3 text-5xl sm:text-7xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase">
              SERVICES
            </span>
            <h2 className="relative font-sans text-3xl sm:text-5xl font-black tracking-[-0.03em] text-[#0F172A] leading-none select-none">
              Our <span className="text-[#2563EB]">Services</span>
            </h2>
            <div className="w-10 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-3" />
          </div>

          {/* TOP: Horizontal Counter Roller Pin (`01` to `05`) */}
          <div className="sticky top-20 z-30 py-2.5 px-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-sm flex items-center justify-between gap-1 overflow-x-auto select-none">
            {SERVICES_DATA.map((srv, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB]/10 text-[#2563EB] font-black'
                      : 'text-[#94A3B8] font-bold hover:text-[#475569]'
                  }`}
                >
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.7)] shrink-0" />
                  )}
                  <span className="text-sm tracking-tight">{srv.number}</span>
                </button>
              );
            })}
          </div>

          {/* MIDDLE: Active Service Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-sm space-y-4"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-bold uppercase tracking-wider text-[#0F172A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>Service {activeService.number} of 05</span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                {activeService.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                {activeService.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {activeService.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10.5px] font-semibold text-[#1E293B] bg-[#F8FAFC] px-2.5 py-1 rounded-full border border-[#E2E8F0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bullets */}
              <div className="space-y-2.5 pt-2">
                {activeService.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <div className="text-[11.5px] leading-relaxed">
                      <strong className="text-[#0F172A] font-bold block mb-0.5">
                        {bullet.title}
                      </strong>
                      <span className="text-[#64748B]">{bullet.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTTOM: Specific Corresponding Image */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0F172A] mt-4 border border-[#E2E8F0]">
                <img
                  src={activeService.visual.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                  <Sparkles className="w-3 h-3 text-[#60A5FA]" />
                  <span>{activeService.visual.badge}</span>
                </div>
                <div className="absolute bottom-3 inset-x-3 z-10 p-2.5 rounded-xl bg-white/95 backdrop-blur-md text-[10.5px] text-[#475569] font-medium leading-snug">
                  {activeService.visual.caption}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Bottom Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] text-xs font-bold text-[#0F172A] disabled:opacity-40 transition cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <span className="text-xs font-bold text-[#64748B]">
              {activeIndex + 1} / 5
            </span>
            <button
              onClick={() => setActiveIndex((prev) => Math.min(4, prev + 1))}
              disabled={activeIndex === 4}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2563EB] text-white text-xs font-bold disabled:opacity-40 transition cursor-pointer shadow-xs"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
