import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import {
  FileText,
  SearchCheck,
  Building2,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { PatternWaves } from './PatternWaves';

// Pristine, perfectly symmetrical forward-flying airliner icon
const CommercialAirplaneIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  time: string;
  desc: string;
  points: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    phase: 'Document Intake',
    title: 'Submit Passport & Profile',
    time: '15-Min Response',
    desc: 'Share passport bio-data and travel details via WhatsApp or portal.',
    points: ['Free eligibility check', 'No upfront biometric visits'],
    icon: FileText,
  },
  {
    step: '02',
    phase: 'Forensic Audit',
    title: 'Tax & Document Pre-Clearance',
    time: '2 to 4 Hours',
    desc: 'Caseworkers audit bank statements against FBR Active Taxpayer records.',
    points: ['FBR tax list alignment', 'Verifiable flight & hotel PNRs'],
    icon: SearchCheck,
  },
  {
    step: '03',
    phase: 'Consular Lodging',
    title: 'Embassy & Portal Submission',
    time: 'Live Online Tracking',
    desc: 'Application lodged directly via government portals or VFS priority slots.',
    points: ['Direct consular filing', 'Automated status tracking'],
    icon: Building2,
  },
  {
    step: '04',
    phase: 'Approval & Departure',
    title: 'Visa Grant & Travel Clearance',
    time: 'Instant Dispatch',
    desc: 'Official visa grant with verified consular QR code delivered to you.',
    points: ['Verified consular QR grant', 'Airport pre-boarding advisory'],
    icon: CommercialAirplaneIcon,
  },
];

interface ProcessSectionProps {
  onOpenVisaModal?: () => void;
  onNavigateToExplore?: () => void;
}

// Single step component with individual scroll-triggered color illumination
const StepFlowItem = React.forwardRef<
  HTMLDivElement,
  {
    stepItem: ProcessStep;
    idx: number;
    isEven: boolean;
  }
>(({ stepItem, isEven }, ref) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  // Scroll tracking: begins fading in as it enters, fully illuminated when centered
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start 88%', 'start 45%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
  });

  const opacity = useTransform(smoothProgress, [0, 0.4, 1], [0.35, 0.7, 1]);
  const y = useTransform(smoothProgress, [0, 1], [36, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.96, 1]);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      // Step switches to vibrant colored state once user scrolls near it (>= 35%)
      setIsActive(latest >= 0.35);
    });
  }, [scrollYProgress]);

  const StepIcon = stepItem.icon;

  return (
    <motion.div
      ref={(el) => {
        itemRef.current = el;
        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          (ref as any).current = el;
        }
      }}
      style={{ opacity, y, scale }}
      className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 group select-none transition-colors duration-500"
    >
      {/* Central Node Icon (Mobile: aligned at left line; Desktop: centered on line) */}
      <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            isActive
              ? 'bg-[#2563EB] text-white border-2 border-[#2563EB] shadow-[0_0_24px_rgba(37,99,235,0.45)] ring-4 ring-[#2563EB]/20 scale-105'
              : 'bg-white text-slate-400 border-2 border-slate-200 shadow-xs'
          }`}
        >
          <StepIcon className="w-5 h-5 transition-transform duration-300" />
        </div>
      </div>

      {/* Card Container (Mobile: offset to right of spine; Desktop: Alternates Left & Right) */}
      <div
        className={`w-full pl-14 sm:pl-0 sm:w-[calc(50%-2.25rem)] ${
          isEven ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'
        }`}
      >
        <div
          className={`rounded-3xl p-5 sm:p-6 border transition-all duration-500 ${
            isActive
              ? 'bg-white border-[#2563EB] shadow-[0_12px_32px_rgba(37,99,235,0.09)] ring-1 ring-[#2563EB]/15'
              : 'bg-[#F8FAFC]/60 border-slate-200/80 shadow-xs'
          }`}
        >
          {/* Step Header */}
          <div
            className={`flex items-center gap-2 mb-2 ${
              isEven ? 'sm:justify-end' : 'sm:justify-start'
            }`}
          >
            <span
              className={`text-xs font-black font-sans tracking-wider uppercase transition-colors duration-500 ${
                isActive ? 'text-[#2563EB]' : 'text-slate-400'
              }`}
            >
              Step {stepItem.step}
            </span>
            <span className="text-slate-300">•</span>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold transition-colors duration-500 ${
                isActive ? 'text-[#0F172A]' : 'text-slate-400'
              }`}
            >
              <Clock
                className={`w-3 h-3 transition-colors duration-500 ${
                  isActive ? 'text-[#2563EB]' : 'text-slate-400'
                }`}
              />
              {stepItem.time}
            </span>
          </div>

          {/* Step Title */}
          <h3
            className={`text-lg sm:text-xl font-extrabold tracking-tight mb-2 transition-colors duration-500 ${
              isActive ? 'text-[#0F172A]' : 'text-slate-600'
            }`}
          >
            {stepItem.title}
          </h3>

          {/* Concise Description */}
          <p
            className={`text-xs sm:text-[13px] leading-relaxed mb-4 transition-colors duration-500 ${
              isActive ? 'text-[#475569]' : 'text-slate-400'
            }`}
          >
            {stepItem.desc}
          </p>

          {/* Minimal Points Checklist */}
          <div
            className={`space-y-1.5 pt-3 border-t transition-colors duration-500 flex flex-col ${
              isActive ? 'border-[#E2E8F0]' : 'border-slate-100'
            } ${isEven ? 'sm:items-end' : 'sm:items-start'}`}
          >
            {stepItem.points.map((pt, pIdx) => (
              <div
                key={pIdx}
                className={`flex items-center gap-2 text-xs font-medium transition-colors duration-500 ${
                  isActive ? 'text-[#1E293B]' : 'text-slate-400'
                } ${isEven ? 'sm:flex-row-reverse text-right' : 'text-left'}`}
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 shrink-0 transition-colors duration-500 ${
                    isActive ? 'text-[#2563EB]' : 'text-slate-300'
                  }`}
                />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
StepFlowItem.displayName = 'StepFlowItem';

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  onOpenVisaModal,
  onNavigateToExplore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  // Overall scroll progress through the timeline container to color the central spine
  const { scrollYProgress: spineProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  });

  const smoothSpine = useSpring(spineProgress, {
    stiffness: 220,
    damping: 28,
  });

  const handleScrollToStep = useCallback((idx: number) => {
    const el = stepRefs.current[idx];
    if (el) {
      const rect = el.getBoundingClientRect();
      const targetY = window.pageYOffset + rect.top - window.innerHeight * 0.32;
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
      setActiveStepIdx(idx);
    }
  }, []);

  // One-step-per-scroll wheel handler for premium stepped scroll experience
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isThrottled = false;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.6;
      if (!inView) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 25) return;

      if (isThrottled) {
        e.preventDefault();
        return;
      }

      if (delta > 0 && activeStepIdx < PROCESS_STEPS.length - 1) {
        // Move one step forward
        e.preventDefault();
        isThrottled = true;
        const nextIdx = activeStepIdx + 1;
        handleScrollToStep(nextIdx);
        setTimeout(() => {
          isThrottled = false;
        }, 700);
      } else if (delta < 0 && activeStepIdx > 0) {
        // Move one step backward
        e.preventDefault();
        isThrottled = true;
        const prevIdx = activeStepIdx - 1;
        handleScrollToStep(prevIdx);
        setTimeout(() => {
          isThrottled = false;
        }, 700);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeStepIdx, handleScrollToStep]);

  return (
    <section
      id="process-section"
      className="relative w-full bg-white text-neutral-900 pt-8 sm:pt-12 lg:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-100 select-none overflow-hidden"
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

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Sculpted Heading matching About, Blogs & Services */}
        <div className="relative flex flex-col items-center justify-center mb-14 sm:mb-20 select-none text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-24 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />

          <span className="absolute -top-4 sm:-top-7 text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase">
            HOW IT WORKS
          </span>

          <h2 className="relative font-sans text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-[#0F172A] leading-none select-none">
            Our <span className="text-[#2563EB]">Process</span>
          </h2>

          <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-3.5 sm:mt-4" />

          <p className="mt-4 text-xs sm:text-sm text-[#64748B] max-w-md mx-auto font-medium">
            Scroll down to explore our 4-step consular clearance workflow.
          </p>
        </div>

        {/* Vertical Flow Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Continuous Vertical Timeline Spine (Desktop centered, Mobile at left-6) */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-slate-200/80 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleY: smoothSpine }}
              className="w-full h-full bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-[#60A5FA] origin-top rounded-full"
            />
          </div>

          <div className="space-y-8 sm:space-y-12">
            {PROCESS_STEPS.map((stepItem, idx) => (
              <StepFlowItem
                key={stepItem.step}
                ref={(el) => {
                  stepRefs.current[idx] = el;
                }}
                stepItem={stepItem}
                idx={idx}
                isEven={idx % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
