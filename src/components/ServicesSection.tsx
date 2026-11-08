import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { PatternWaves } from './PatternWaves';

interface ServiceItem {
  id: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  pills: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'digital-evisa',
    titleLine1: 'Digital eVisa &',
    titleLine2: 'Fast-Track Processing',
    subtitle:
      'Turnkey consular lodging and instant verified digital grant dispatch for Umrah, GCC, Turkey, and Malaysia.',
    pills: ['Instant eVisa', 'WhatsApp Grant', 'QR Verified'],
  },
  {
    id: 'tier1-embassy',
    titleLine1: 'Tier-1 Embassy &',
    titleLine2: 'Sticker Visas',
    subtitle:
      'Complete legal dossiers, priority biometrics, and interview coaching for UK, USA, Canada, and Schengen.',
    pills: ['UK & US B1/B2', 'Canada & Schengen', 'VFS Priority'],
  },
  {
    id: 'document-auditing',
    titleLine1: 'Consular Auditing &',
    titleLine2: 'Document Pre-Clearance',
    subtitle:
      'Cross-audited bank turnover against FBR tax lists with live verifiable GDS flight reservations.',
    pills: ['FBR Tax Forensics', 'GDS Flight PNRs', 'Employer NOC'],
  },
  {
    id: 'residence-citizenship',
    titleLine1: 'Global Residence &',
    titleLine2: 'Citizenship Pathways',
    subtitle:
      'Strategic residency pathways for European Golden Visas, Swiss cantonal permits, and Caribbean passports.',
    pills: ['Golden Residency', 'Dual Passports', 'Global Mobility'],
  },
  {
    id: 'client-support',
    titleLine1: 'Consular Support &',
    titleLine2: 'Refusal Overturn',
    subtitle:
      'Direct 1-on-1 caseworker defense, 15-minute response times, and formal administrative Remonstrance appeals.',
    pills: ['Remonstrance Appeals', '24/7 WhatsApp Desk', 'Deficiency Cure'],
  },
];

const PLANE_IMAGE_URL =
  'https://res.cloudinary.com/rpphjsst/image/upload/v1794129938/image.webp';

// Service Item Card Component
const ServiceFlowCard: React.FC<{
  service: ServiceItem;
  idx: number;
  isActive: boolean;
  onSelect: (idx: number) => void;
}> = ({ service, idx, isActive, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(idx)}
      className={`relative select-none transition-all duration-500 py-6 sm:py-10 cursor-pointer rounded-2xl ${
        isActive
          ? 'opacity-100 scale-100'
          : 'opacity-35 hover:opacity-75 scale-[0.985]'
      }`}
    >
      {/* Active Stream Tag */}
      <div className="flex items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3">
        <span
          className={`w-2 h-2 rounded-full transition-all duration-500 ${
            isActive
              ? 'bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.9)] scale-125'
              : 'bg-slate-300'
          }`}
        />
        <span
          className={`font-sans text-[11px] sm:text-xs font-extrabold tracking-widest uppercase transition-colors duration-500 ${
            isActive ? 'text-[#2563EB]' : 'text-slate-400'
          }`}
        >
          {service.pills[0]}
        </span>
      </div>

      {/* Two-Line Title */}
      <h3 className="font-sans text-xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black tracking-[-0.03em] leading-[1.12] mb-3 sm:mb-4 transition-colors duration-500">
        <span
          className={`block transition-colors duration-500 ${
            isActive ? 'text-[#0F172A]' : 'text-slate-600'
          }`}
        >
          {service.titleLine1}
        </span>
        <span
          className={`block transition-colors duration-500 ${
            isActive ? 'text-[#2563EB]' : 'text-slate-400'
          }`}
        >
          {service.titleLine2}
        </span>
      </h3>

      {/* Subtitle */}
      <p
        className={`font-sans text-xs sm:text-base lg:text-[16px] leading-relaxed max-w-xl mb-4 sm:mb-6 transition-colors duration-500 ${
          isActive ? 'text-[#475569]' : 'text-slate-400'
        }`}
      >
        {service.subtitle}
      </p>

      {/* Pill Badges */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
        {service.pills.map((pill, pIdx) => (
          <span
            key={pIdx}
            className={`inline-flex items-center px-2.5 sm:px-4 py-1 sm:py-2 rounded-full border text-[11px] sm:text-[13px] font-medium transition-all duration-300 ${
              isActive
                ? 'bg-white border-slate-200 text-[#0F172A] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:border-[#2563EB] hover:text-[#2563EB]'
                : 'bg-white/60 border-slate-200/50 text-slate-400 shadow-none'
            }`}
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
};

export const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentActiveIdx, setCurrentActiveIdx] = useState(0);

  const progressVal = useMotionValue(0);

  const smoothProgress = useSpring(progressVal, {
    stiffness: 140,
    damping: 22,
    mass: 0.35,
  });

  const planeTop = useTransform(smoothProgress, [0, 1], ['8%', '92%']);

  const planeRotate = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 5, -5, 4, 0]
  );

  const calculateScrollProgress = useCallback(() => {
    const card0 = cardRefs.current[0];
    const card4 = cardRefs.current[4];
    if (!card0 || !card4) return;

    const rect0 = card0.getBoundingClientRect();
    const rect4 = card4.getBoundingClientRect();

    const planeTargetY = window.innerHeight * 0.38;

    const center0 = rect0.top + rect0.height / 2;
    const center4 = rect4.top + rect4.height / 2;

    const totalDist = center4 - center0;
    if (totalDist <= 0) return;

    const currentScrolled = planeTargetY - center0;
    const progress = Math.min(Math.max(currentScrolled / totalDist, 0), 1);

    progressVal.set(progress);

    let closestIdx = 0;
    let minDiff = Infinity;
    cardRefs.current.forEach((el, idx) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const c = r.top + r.height / 2;
      const diff = Math.abs(c - planeTargetY);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setCurrentActiveIdx(closestIdx);
  }, [progressVal]);

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    window.addEventListener('resize', calculateScrollProgress, { passive: true });
    calculateScrollProgress();

    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
      window.removeEventListener('resize', calculateScrollProgress);
    };
  }, [calculateScrollProgress]);

  const handleScrollToService = (idx: number) => {
    const el = cardRefs.current[idx];
    if (el) {
      const planeTargetY = window.innerHeight * 0.38;
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const targetY = window.pageYOffset + cardCenter - planeTargetY;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="services-section"
      className="relative w-full bg-white text-neutral-900 py-14 sm:py-20 lg:py-28 px-3 sm:px-6 lg:px-10 border-t border-neutral-100 select-none overflow-visible"
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
          speed={2.2}
          scale={1.7}
          direction={57}
        />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto">
        {/* Sculpted Heading */}
        <div className="relative flex flex-col items-center justify-center mb-10 sm:mb-18 select-none text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-28 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />

          <span className="absolute -top-5 sm:-top-8 text-5xl sm:text-8xl md:text-9xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase font-sans">
            SERVICES
          </span>

          <h2 className="relative font-sans text-3xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-[#0F172A] leading-none select-none">
            Our <span className="text-[#2563EB]">Services</span>
          </h2>

          <div className="w-12 sm:w-14 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-3 sm:mt-4" />

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#64748B] max-w-md mx-auto font-medium font-sans px-4">
            Explore our specialized consular, visa, and residency pathways.
          </p>
        </div>

        {/* Padded Container: Sticky Left Column stays pinned in viewport until all 5 services scroll past */}
        <div
          ref={containerRef}
          className="relative flex items-start gap-3 sm:gap-8 lg:gap-16 pt-2 pb-48 sm:pb-64 lg:pb-80"
        >
          {/* ========================================================
              STICKY LEFT PLANE COLUMN:
              Vertically longer flight corridor (h-460px to h-720px).
              Remains attached (pinned) in viewport.
              Text on the right moves up with scroll.
          ======================================================== */}
          <div
            style={{
              position: 'sticky',
              alignSelf: 'flex-start',
            }}
            className="sticky top-16 sm:top-20 lg:top-24 flex flex-col items-center justify-start w-28 sm:w-36 lg:w-80 xl:w-96 shrink-0 select-none z-20 self-start"
          >
            <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[660px] xl:h-[720px] flex items-center justify-center">
              {/* Vertically Extended Flight Path Spine Line - Shifted slightly left on mobile */}
              <div className="absolute left-[36%] sm:left-[42%] lg:left-1/2 -translate-x-1/2 top-6 bottom-6 w-1 sm:w-1.5 rounded-full bg-slate-200/90 overflow-hidden shadow-inner">
                <motion.div
                  style={{ scaleY: smoothProgress }}
                  className="w-full h-full bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-[#93C5FD] origin-top rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                />
              </div>

              {/* Waypoint Nodes along the extended rail - Clean, no ripples */}
              <div className="absolute inset-y-0 left-[36%] sm:left-[42%] lg:left-1/2 -translate-x-1/2 w-8 sm:w-10 flex flex-col justify-between items-center py-6 pointer-events-auto">
                {SERVICES_DATA.map((srv, idx) => {
                  const isCurrent = idx === currentActiveIdx;
                  const isPast = idx <= currentActiveIdx;

                  return (
                    <button
                      key={srv.id}
                      onClick={() => handleScrollToService(idx)}
                      title={`Jump to Service ${idx + 1}`}
                      aria-label={`Jump to Service ${idx + 1}`}
                      className="group relative flex items-center justify-center p-2.5 cursor-pointer focus:outline-none"
                    >
                      <div
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300 z-10 ${
                          isCurrent
                            ? 'bg-[#2563EB] border-white scale-110'
                            : isPast
                            ? 'bg-[#2563EB] border-white'
                            : 'bg-white border-slate-300 group-hover:border-[#2563EB]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* AIRPLANE GRAPHIC - Clean image with slight ripple behind it and shadows removed */}
              <motion.div
                style={{ top: planeTop, rotate: planeRotate }}
                className="absolute left-[36%] sm:left-[42%] lg:left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none transform-gpu"
              >
                <div className="relative flex items-center justify-center">
                  {/* Slight, gentle ripple rings directly behind the plane */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span
                      className="absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-44 rounded-full border border-blue-400/40 animate-ping opacity-60 pointer-events-none"
                      style={{ animationDuration: '2.8s' }}
                    />
                    <span
                      className="absolute w-16 h-16 sm:w-22 sm:h-22 lg:w-30 lg:h-30 rounded-full border border-blue-500/30 animate-ping opacity-75 pointer-events-none"
                      style={{ animationDuration: '2.8s', animationDelay: '0.9s' }}
                    />
                    <span className="absolute w-10 h-10 sm:w-14 sm:h-14 lg:w-18 lg:h-18 rounded-full bg-blue-500/10 pointer-events-none" />
                  </div>

                  <img
                    src={PLANE_IMAGE_URL}
                    alt="Flight Route Airplane"
                    className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 xl:w-64 xl:h-64 object-contain transition-transform duration-300"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Text on right moves up with scroll
              While the left plane element stays attached/pinned beside it.
          ======================================================== */}
          <div className="flex-1 min-w-0 space-y-16 sm:space-y-32 lg:space-y-48">
            {SERVICES_DATA.map((service, idx) => (
              <div
                key={service.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
              >
                <ServiceFlowCard
                  service={service}
                  idx={idx}
                  isActive={currentActiveIdx === idx}
                  onSelect={handleScrollToService}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
