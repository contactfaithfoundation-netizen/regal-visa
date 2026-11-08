import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { PatternWaves } from './PatternWaves';

interface ServiceItem {
  id: string;
  number: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  pills: string[];
  visual: {
    image: string;
  };
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'digital-evisa',
    number: '01',
    titleLine1: 'Digital eVisa &',
    titleLine2: 'Fast-Track Processing',
    subtitle:
      'We manage turnkey consular lodging and instant verified digital grant dispatch for Saudi Umrah, Malaysia, Turkey, UAE, and GCC destinations without embassy queues.',
    pills: ['Instant eVisa', 'WhatsApp Dispatch', 'QR Verification'],
    visual: {
      image:
        'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1000&q=85',
    },
  },
  {
    id: 'tier1-embassy',
    number: '02',
    titleLine1: 'Tier-1 Embassy &',
    titleLine2: 'Sticker Visas',
    subtitle:
      'We structure complete legal dossiers, procure priority biometric appointments, and conduct mock interview coaching for high-rejection jurisdictions.',
    pills: ['UK & US B1/B2', 'Canada & Schengen', 'VFS Slot Procurement'],
    visual: {
      image:
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=85',
    },
  },
  {
    id: 'document-auditing',
    number: '03',
    titleLine1: 'Consular Auditing &',
    titleLine2: 'Document Pre-Clearance',
    subtitle:
      'We cross-audit applicant bank turnover against FBR Active Taxpayer declarations and issue verifiable flight and hotel PNR reservations that remain active.',
    pills: ['FBR Tax Forensics', 'GDS Flight PNRs', 'Employer NOC Vetting'],
    visual: {
      image:
        'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=85',
    },
  },
  {
    id: 'residence-citizenship',
    number: '04',
    titleLine1: 'Global Residence &',
    titleLine2: 'Citizenship Pathways',
    subtitle:
      'We guide clients through European Golden Visas, Swiss cantonal permits, UAE Golden Nomads, and Commonwealth citizenship by investment.',
    pills: ['Golden Residency', 'Dual Passports', 'Global Mobility'],
    visual: {
      image:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
    },
  },
  {
    id: 'client-support',
    number: '05',
    titleLine1: 'Consular Support &',
    titleLine2: 'Refusal Defense',
    subtitle:
      'We provide direct 1-on-1 caseworker guidance, 15-minute emergency responses, and author formal administrative Remonstrance appeals to overturn prior refusals.',
    pills: ['Remonstrance Appeals', '24/7 WhatsApp Desk', 'Case Deficiency Cure'],
    visual: {
      image:
        'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=85',
    },
  },
];

export const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Native desktop sticky-scroll tracking (NO wheel hijacking, completely smooth)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      // Map scroll progress 0.0 -> 1.0 smoothly to services 0 -> 4
      const clamped = Math.min(0.999, Math.max(0, v));
      const nextIndex = Math.floor(clamped * SERVICES_DATA.length);
      setActiveIndex(nextIndex);
    });
  }, [scrollYProgress]);

  // Touch Swipe for mobile: HORIZONTAL swipe only, NEVER hijack vertical scrolling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only respond to deliberate horizontal swipes, letting vertical page scrolling pass freely
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0 && activeIndex < SERVICES_DATA.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else if (deltaX > 0 && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const activeService = SERVICES_DATA[activeIndex];

  // Rotary Dial Math for Desktop (Arc centered on left)
  const dialRadius = 165;
  const dialCenterX = -25;
  const dialCenterY = 175;
  const stepAngleDeg = 32;

  return (
    <section
      id="services-section"
      ref={sectionRef}
      className="relative w-full lg:h-[280vh] bg-white text-neutral-900 border-t border-neutral-100 select-none overflow-visible"
    >
      {/* Background Pattern Waves */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <PatternWaves
          preset="pond"
          color="#2563eb"
          backgroundColor="#ffffff"
          fade="edges"
          interactive={false}
          cursorSize={50}
          cursorStrength={0.6}
          wave="ripple"
          spacing={10}
          markSize={0.9}
          depth={0.3}
          shine={2}
          contrast={0.75}
          speed={1.05}
          scale={1.7}
          direction={57}
        />
      </div>

      {/* Sticky Viewport Container on Desktop (h-screen), Normal Flow on Mobile */}
      <div className="relative z-10 w-full lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center py-14 sm:py-20 lg:py-0 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1240px] mx-auto w-full flex flex-col justify-center">
          {/* 1. Header: Sculpted typography matching Blogs, About, and Process */}
          <div className="relative flex flex-col items-center justify-center mb-8 sm:mb-12 select-none text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-24 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />

            <span className="absolute -top-4 sm:-top-7 text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase font-sans">
              SERVICES
            </span>

            <h2 className="relative font-sans text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-[#0F172A] leading-none select-none">
              Our <span className="text-[#2563EB]">Services</span>
            </h2>

            <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-3.5 sm:mt-4" />
          </div>

          {/* 2. DESKTOP 3-COLUMN LAYOUT (lg:grid) */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-center my-auto">
            {/* ========================================================
                LEFT COLUMN (26% width - Col Span 3): Vertical Rotary Counter Roller
            ======================================================== */}
            <div className="col-span-3 relative h-[350px] flex items-center justify-start select-none">
              {/* Dotted Dial SVG Arc */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                viewBox="0 0 240 350"
              >
                <path
                  d="M -25,10 A 165 165 0 0 1 -25,340"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="2.5"
                  strokeDasharray="4 8"
                  strokeLinecap="round"
                />
                <path
                  d="M -25,130 A 165 165 0 0 1 -25,220"
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
                        y: y - 22,
                        rotate: angle * 0.7,
                        opacity: isActive ? 1 : Math.max(0.18, 0.6 - Math.abs(diff) * 0.2),
                        scale: isActive ? 1.05 : 0.88,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 28,
                      }}
                      onClick={() => setActiveIndex(idx)}
                      className={`absolute left-0 top-0 flex items-center gap-3 cursor-pointer select-none ${
                        isActive ? 'z-20' : 'z-10'
                      }`}
                    >
                      {/* Active Brand Blue Dot Indicator */}
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

                      {/* Step Number in brand sans font */}
                      <span
                        className={`font-sans tracking-tight transition-colors duration-200 ${
                          isActive
                            ? 'text-4xl xl:text-5xl font-black text-[#0F172A]'
                            : 'text-2xl font-bold text-[#94A3B8] hover:text-[#475569]'
                        }`}
                      >
                        {srv.number}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ========================================================
                CENTER COLUMN (44% width - Col Span 5): Service Content
            ======================================================== */}
            <div className="col-span-5 flex flex-col justify-center px-4 xl:px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  {/* Brand Sans Heading */}
                  <h3 className="font-sans text-3xl sm:text-4xl xl:text-[44px] font-black tracking-tight text-[#0F172A] leading-[1.15]">
                    <span>{activeService.titleLine1}</span>
                    <br />
                    <span>{activeService.titleLine2}</span>
                  </h3>

                  {/* Clean Subtitle Paragraph in Brand Sans Font */}
                  <p className="font-sans text-sm xl:text-[15px] text-[#64748B] font-normal leading-relaxed max-w-lg">
                    {activeService.subtitle}
                  </p>

                  {/* 3 Rounded Pill Badges in Brand Colors */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    {activeService.pills.map((pill, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] shadow-xs text-xs sm:text-[13px] font-semibold text-[#1E293B] hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                        <span className="font-sans">{pill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ========================================================
                RIGHT COLUMN (30% width - Col Span 4): Dynamic Visual
            ======================================================== */}
            <div className="col-span-4 flex items-center justify-center pl-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, rotate: -4, scale: 0.94 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 4, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full max-w-[330px] aspect-[4/5] rounded-[28px] overflow-hidden bg-white p-2.5 border border-[#E2E8F0] shadow-[0_20px_45px_rgba(15,23,42,0.08)] group"
                >
                  <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-neutral-100">
                    <img
                      src={activeService.visual.image}
                      alt={`${activeService.titleLine1} ${activeService.titleLine2}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* 3. MOBILE VIEW (< 1024px) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="lg:hidden space-y-6"
          >
            {/* Top Horizontal Counter Roller (`01` to `05`) */}
            <div className="py-2 px-3 rounded-2xl bg-[#F8FAFC]/90 backdrop-blur-md border border-[#E2E8F0] flex items-center justify-between gap-1 overflow-x-auto select-none">
              {SERVICES_DATA.map((srv, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={srv.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#2563EB] font-black shadow-xs border border-[#2563EB]/20'
                        : 'text-[#94A3B8] font-bold hover:text-[#475569]'
                    }`}
                  >
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.7)] shrink-0" />
                    )}
                    <span className="text-sm font-sans">{srv.number}</span>
                  </button>
                );
              })}
            </div>

            {/* Service Content & Visual Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-[#E2E8F0] shadow-xs space-y-4"
              >
                {/* Mobile Heading in Brand Sans Font */}
                <h3 className="font-sans text-2xl font-black text-[#0F172A] leading-snug">
                  <span>{activeService.titleLine1}</span>
                  <br />
                  <span>{activeService.titleLine2}</span>
                </h3>

                <p className="font-sans text-xs text-[#64748B] font-normal leading-relaxed">
                  {activeService.subtitle}
                </p>

                {/* 3 Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {activeService.pills.map((pill, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#1E293B]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      <span className="font-sans">{pill}</span>
                    </div>
                  ))}
                </div>

                {/* Pure visual image container on mobile */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 mt-3 border border-[#E2E8F0]">
                  <img
                    src={activeService.visual.image}
                    alt={`${activeService.titleLine1} ${activeService.titleLine2}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
