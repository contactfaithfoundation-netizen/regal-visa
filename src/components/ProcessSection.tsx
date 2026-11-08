import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import {
  FileText,
  SearchCheck,
  Building2,
  PlaneTakeoff,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { PatternWaves } from './PatternWaves';

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
    icon: PlaneTakeoff,
  },
];

interface ProcessSectionProps {
  onOpenVisaModal?: () => void;
  onNavigateToExplore?: () => void;
}

// Single step component with individual scroll-triggered color illumination
const StepFlowItem: React.FC<{
  stepItem: ProcessStep;
  idx: number;
  isEven: boolean;
}> = ({ stepItem, isEven }) => {
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
      ref={itemRef}
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
};

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  onOpenVisaModal,
  onNavigateToExplore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Overall scroll progress through the timeline container to color the central spine
  const { scrollYProgress: spineProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  });

  const smoothSpine = useSpring(spineProgress, {
    stiffness: 220,
    damping: 28,
  });

  return (
    <section
      id="process-section"
      className="relative w-full bg-white text-neutral-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-100 select-none overflow-hidden"
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
                stepItem={stepItem}
                idx={idx}
                isEven={idx % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Bottom Fast-Track Assessment Callout Strip */}
        <div className="mt-14 p-6 sm:p-7 rounded-3xl bg-[#0F172A] text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg border border-[#1E293B]">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[10.5px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#60A5FA]" />
              <span>Consular Pre-Clearance Guarantee</span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white">
              Ready to begin your visa application?
            </h4>
            <p className="text-xs text-[#94A3B8]">
              Free initial document review with a 15-minute response time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            {/* WhatsApp Direct Inquiry */}
            <a
              href="https://wa.me/923246883359?text=Hi%20Globe%20Express%2C%20I%20want%20to%20start%20my%20visa%20process%20and%20get%20a%20free%20document%20assessment."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.37 7.35 9.1 7.41 8.88 7.65C8.65 7.89 8.02 8.48 8.02 9.71C8.02 10.93 8.91 12.11 9.03 12.27C9.15 12.44 10.74 14.9 13.21 15.96C15.26 16.84 15.68 16.66 16.12 16.63C16.57 16.59 17.55 16.05 17.76 15.48C17.96 14.9 17.96 14.41 17.9 14.31C17.84 14.21 17.68 14.15 17.44 14.03C17.2 13.91 16.01 13.33 15.79 13.25C15.57 13.17 15.41 13.13 15.25 13.37C15.09 13.61 14.62 14.15 14.48 14.31C14.34 14.47 14.2 14.49 13.96 14.37C13.72 14.25 12.95 14 12.03 13.18C11.31 12.54 10.83 11.76 10.69 11.52C10.55 11.28 10.67 11.14 10.79 11.02C10.9 10.91 11.04 10.73 11.16 10.59C11.28 10.45 11.32 10.35 11.4 10.19C11.48 10.03 11.44 9.89 11.38 9.77C11.32 9.65 10.85 8.5 10.65 8.03C10.46 7.57 10.26 7.63 10.11 7.63C9.97 7.62 9.81 7.35 9.53 7.35Z"/>
              </svg>
              <span>WhatsApp Assessment</span>
            </a>

            {/* Explore Visas CTA */}
            <button
              onClick={() => {
                if (onNavigateToExplore) {
                  onNavigateToExplore();
                } else if (onOpenVisaModal) {
                  onOpenVisaModal();
                } else {
                  const el = document.getElementById('explore-events');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Visas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
