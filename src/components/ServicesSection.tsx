import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { PatternWaves } from './PatternWaves';

interface ServiceItem {
  id: string;
  number: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  pills: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'digital-evisa',
    number: '01',
    titleLine1: 'Digital eVisa &',
    titleLine2: 'Fast-Track Processing',
    subtitle:
      'Turnkey consular lodging and instant verified digital grant dispatch for Umrah, GCC, Turkey, and Malaysia.',
    pills: ['Instant eVisa', 'WhatsApp Grant', 'QR Verified'],
  },
  {
    id: 'tier1-embassy',
    number: '02',
    titleLine1: 'Tier-1 Embassy &',
    titleLine2: 'Sticker Visas',
    subtitle:
      'Complete legal dossiers, priority biometrics, and interview coaching for UK, USA, Canada, and Schengen.',
    pills: ['UK & US B1/B2', 'Canada & Schengen', 'VFS Priority'],
  },
  {
    id: 'document-auditing',
    number: '03',
    titleLine1: 'Consular Auditing &',
    titleLine2: 'Document Pre-Clearance',
    subtitle:
      'Cross-audited bank turnover against FBR tax lists with live verifiable GDS flight reservations.',
    pills: ['FBR Tax Forensics', 'GDS Flight PNRs', 'Employer NOC'],
  },
  {
    id: 'residence-citizenship',
    number: '04',
    titleLine1: 'Global Residence &',
    titleLine2: 'Citizenship Pathways',
    subtitle:
      'Strategic residency pathways for European Golden Visas, Swiss cantonal permits, and Caribbean passports.',
    pills: ['Golden Residency', 'Dual Passports', 'Global Mobility'],
  },
  {
    id: 'client-support',
    number: '05',
    titleLine1: 'Consular Support &',
    titleLine2: 'Refusal Overturn',
    subtitle:
      'Direct 1-on-1 caseworker defense, 15-minute response times, and formal administrative Remonstrance appeals.',
    pills: ['Remonstrance Appeals', '24/7 WhatsApp Desk', 'Deficiency Cure'],
  },
];

const PLANE_IMAGE_URL =
  'https://res.cloudinary.com/rpphjsst/image/upload/v1794129938/image.webp';

// Waypoint percentage offsets along the flight rail
const WAYPOINT_POSITIONS = ['8%', '29%', '50%', '71%', '92%'];

// Clean Unboxed Service Item matching reference layout
const ServiceFlowCard: React.FC<{
  service: ServiceItem;
  idx: number;
  isActive: boolean;
  onSelect: (idx: number) => void;
}> = ({ service, idx, isActive, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(idx)}
      className={`relative select-none transition-all duration-500 py-6 sm:py-8 cursor-pointer rounded-2xl transition-opacity duration-300 ${
        isActive ? 'opacity-100 scale-100' : 'opacity-40 hover:opacity-75 scale-[0.99]'
      }`}
    >
      {/* Stream micro-tag indicator */}
      <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
        <span
          className={`w-2 h-2 rounded-full transition-all duration-500 ${
            isActive
              ? 'bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.9)] scale-125'
              : 'bg-slate-300'
          }`}
        />
        <span
          className={`font-sans text-xs sm:text-sm font-black tracking-widest uppercase transition-colors duration-500 ${
            isActive ? 'text-[#2563EB]' : 'text-slate-400'
          }`}
        >
          Service {service.number}
        </span>
      </div>

      {/* Two-Line Title matching user reference */}
      <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black tracking-[-0.03em] leading-[1.12] mb-3 sm:mb-4 transition-colors duration-500">
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

      {/* Concise Subtitle */}
      <p
        className={`font-sans text-sm sm:text-base lg:text-[16px] leading-relaxed max-w-xl mb-5 sm:mb-6 transition-colors duration-500 ${
          isActive ? 'text-[#475569]' : 'text-slate-400'
        }`}
      >
        {service.subtitle}
      </p>

      {/* Clean Pill Badges */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {service.pills.map((pill, pIdx) => (
          <span
            key={pIdx}
            className={`inline-flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-[13px] font-medium transition-all duration-300 ${
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

  // Scroll tracking on the services container: smoothly maps full scroll through all 5 items
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 35%', 'end 70%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 24,
    mass: 0.5,
  });

  // Vertical plane trajectory: safely bounded from 8% to 92% so it never cuts off or disappears
  const planeTop = useTransform(smoothProgress, [0, 1], ['8%', '92%']);

  // Dynamic banking/tilt angle during flight transition
  const planeRotate = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 4, -4, 3, 0]
  );

  // Active service updater based on scroll progress
  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      let active = 0;
      if (latest >= 0.8) active = 4;
      else if (latest >= 0.58) active = 3;
      else if (latest >= 0.38) active = 2;
      else if (latest >= 0.18) active = 1;
      else active = 0;

      setCurrentActiveIdx(active);
    });
  }, [smoothProgress]);

  // Smooth scroll to a specific service when clicking its waypoint or card
  const handleScrollToService = (idx: number) => {
    const el = cardRefs.current[idx];
    if (el) {
      const navOffset = 110;
      const targetY = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="services-section"
      className="relative w-full bg-white text-neutral-900 py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-10 border-t border-neutral-100 select-none overflow-visible"
    >
      {/* Background Pattern Waves - strictly contained in its own absolute overflow-hidden div */}
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
        {/* Sculpted Heading matching Blogs, About, and Process */}
        <div className="relative flex flex-col items-center justify-center mb-14 sm:mb-20 select-none text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-28 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />

          <span className="absolute -top-5 sm:-top-8 text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase font-sans">
            SERVICES
          </span>

          <h2 className="relative font-sans text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-[#0F172A] leading-none select-none">
            Our <span className="text-[#2563EB]">Services</span>
          </h2>

          <div className="w-12 sm:w-14 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-4" />

          <p className="mt-4 text-xs sm:text-sm text-[#64748B] max-w-md mx-auto font-medium font-sans">
            Explore our specialized consular, visa, and residency pathways.
          </p>
        </div>

        {/* Two-Column Flow Layout: Sticky Big Airplane on Left, Services on Right */}
        <div ref={containerRef} className="relative flex items-start gap-4 sm:gap-8 lg:gap-16">
          {/* ========================================================
              LEFT COLUMN (Sticky Flight Corridor):
              Sticks in viewport throughout all 5 services!
              Plane is BIGGER in desktop view (w-60 to w-72).
              Left-side 1, 2, 3 numbers and labels removed for max space!
          ======================================================== */}
          <div className="sticky top-24 sm:top-28 lg:top-32 flex flex-col items-center justify-start w-20 sm:w-28 lg:w-80 xl:w-96 shrink-0 select-none z-20 pt-2">
            <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[500px] xl:h-[540px] flex items-center justify-center">
              {/* Vertical Flight Trajectory Spine Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 sm:w-1.5 rounded-full bg-slate-200/90 overflow-hidden shadow-inner">
                <motion.div
                  style={{ scaleY: smoothProgress }}
                  className="w-full h-full bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-[#93C5FD] origin-top rounded-full shadow-[0_0_10px_rgba(37,99,235,0.7)]"
                />
              </div>

              {/* Minimalist Waypoint Nodes along the rail - NO 1, 2, 3 text clutter */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 flex flex-col justify-between items-center py-4 pointer-events-auto">
                {SERVICES_DATA.map((srv, idx) => {
                  const isCurrent = idx === currentActiveIdx;
                  const isPast = idx <= currentActiveIdx;

                  return (
                    <button
                      key={srv.id}
                      onClick={() => handleScrollToService(idx)}
                      title={`Jump to Service ${srv.number}: ${srv.titleLine1} ${srv.titleLine2}`}
                      aria-label={`Jump to Service ${srv.number}`}
                      className="group relative flex items-center justify-center p-2 cursor-pointer focus:outline-none"
                    >
                      {/* Pulse halo when current */}
                      {isCurrent && (
                        <div className="absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2563EB]/25 animate-ping pointer-events-none" />
                      )}

                      {/* Central Node Dot on spine */}
                      <div
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 transition-all duration-300 z-10 ${
                          isCurrent
                            ? 'bg-[#2563EB] border-white shadow-[0_0_12px_rgba(37,99,235,0.8)] scale-125'
                            : isPast
                            ? 'bg-[#2563EB] border-white'
                            : 'bg-white border-slate-300 group-hover:border-[#2563EB]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* ========================================================
                  BIG GLIDING AIRPLANE (Desktop Extra-Large, Heroic Size):
                  Smoothly glides down inside the flight track with tilt & contrails!
              ======================================================== */}
              <motion.div
                style={{ top: planeTop, rotate: planeRotate }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none transform-gpu"
              >
                <div className="relative flex items-center justify-center">
                  {/* Glowing Radar Halo & Jet Stream Contrails */}
                  <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-[#2563EB]/20 rounded-full blur-xl pointer-events-none" />

                  {/* Dual Jet Engine Contrail Ribbons */}
                  <div className="absolute -top-12 sm:-top-16 lg:-top-20 left-1/2 -translate-x-1/2 w-8 sm:w-12 lg:w-16 h-12 sm:h-16 lg:h-20 bg-gradient-to-t from-[#2563EB]/30 via-[#60A5FA]/15 to-transparent blur-xs pointer-events-none rounded-full" />

                  {/* High-Resolution Airplane Graphic - Prominent & Big in Desktop View! */}
                  <img
                    src={PLANE_IMAGE_URL}
                    alt="Flight Route Airplane"
                    className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-56 lg:h-56 xl:w-64 xl:h-64 object-contain drop-shadow-[0_12px_28px_rgba(37,99,235,0.4)] transition-transform duration-300"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </div>

            {/* Flight Route Status Badge - Clean & Elegant */}
            <div className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-sm text-[11px] sm:text-xs font-bold text-[#0F172A]">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              <span className="text-[#2563EB] font-mono">LEG {SERVICES_DATA[currentActiveIdx].number}</span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-slate-600 font-medium font-sans">05 Steps</span>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN (Scrolling Services List):
              Each service is in the same window/frame alongside the plane!
          ======================================================== */}
          <div className="flex-1 min-w-0 space-y-16 sm:space-y-24 lg:space-y-36 py-4 pb-20">
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
