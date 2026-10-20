import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, ArrowUpRight, CheckCircle2, ShieldCheck, Clock, FileCheck } from 'lucide-react';

interface CountryVisaCardProps {
  country?: string;
  flagCode?: string;
  baseTop: number;
  viewportHeight: number;
  isVisaOpen: boolean;
  onToggleVisa: (open: boolean) => void;
  onOpenVisaPage?: (country: string) => void;
}

const COUNTRY_FLAGS: Record<string, { code: string; emoji: string }> = {
  Switzerland: { code: 'ch', emoji: '🇨🇭' },
  Japan: { code: 'jp', emoji: '🇯🇵' },
  Morocco: { code: 'ma', emoji: '🇲🇦' },
  'United States': { code: 'us', emoji: '🇺🇸' },
  Spain: { code: 'es', emoji: '🇪🇸' },
  Turkey: { code: 'tr', emoji: '🇹🇷' },
};

export const CountryVisaCard: React.FC<CountryVisaCardProps> = ({
  country = 'Switzerland',
  flagCode,
  baseTop,
  viewportHeight,
  isVisaOpen,
  onToggleVisa,
  onOpenVisaPage,
}) => {
  const [visaModalOpen, setVisaModalOpen] = useState(false);
  const [visaSubmitted, setVisaSubmitted] = useState(false);

  const currentFlagCode =
    flagCode || COUNTRY_FLAGS[country]?.code || 'ch';

  const handleOpenVisaPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenVisaPage) {
      onOpenVisaPage(country);
    }
    setVisaModalOpen(true);
  };

  return (
    <>
      {/* Expandable Visa Card Widget - Horizontally centered in header alignment, anchored directly 14px above floating cards */}
      <div
        style={{
          position: 'absolute',
          bottom: viewportHeight - baseTop + 14,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
        }}
        className="w-[270px] sm:w-[290px] max-w-[calc(100vw-32px)] select-none pointer-events-auto"
      >
        {/* Part A: Main Upper Card */}
        <div
          onClick={() => {
            // Clicking the card header or card collapses it when open, or opens it when closed
            onToggleVisa(!isVisaOpen);
          }}
          className="bg-white/95 backdrop-blur-md border border-white/80 rounded-[20px] shadow-[0_12px_32px_rgba(0,0,0,0.20)] overflow-hidden transition-colors duration-200 cursor-pointer hover:bg-white"
        >
          {/* Header Row: Always visible */}
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-[#8E96A6] leading-none mb-1">
                Visas
              </span>

              {/* Dynamic Animated Country Name and Flag with Ultra-Smooth Dissolve & Vertical Glide */}
              <div className="relative h-[24px] min-w-[130px] overflow-hidden flex items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={country}
                    initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-[20px] h-[14px] rounded-[3px] overflow-hidden shadow-xs border border-black/15 shrink-0 bg-slate-100 flex items-center justify-center">
                      <img
                        src={`https://flagcdn.com/w80/${currentFlagCode.toLowerCase()}.png`}
                        alt={`${country} flag`}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                    <h4 className="font-sans text-[16px] font-semibold text-[#141821] leading-tight tracking-tight whitespace-nowrap">
                      {country}
                    </h4>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Trigger Button with soft crossfade */}
            <div className="relative h-7 flex items-center justify-end">
              <AnimatePresence mode="wait" initial={false}>
                {!isVisaOpen ? (
                  <motion.button
                    key="open-btn"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleVisa(true);
                    }}
                    aria-label="Expand Visa Details"
                    className="h-7 px-3 rounded-full bg-[#0B0F17] hover:bg-[#1C2230] text-white text-[11px] font-medium flex items-center gap-1.5 transition-colors active:scale-95 cursor-pointer shrink-0 shadow-sm"
                  >
                    <span>Visa Details</span>
                    <Plus className="w-3 h-3 text-white/90 stroke-[2.5]" />
                  </motion.button>
                ) : (
                  <motion.button
                    key="close-btn"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleVisa(false);
                    }}
                    aria-label="Collapse Visa Details"
                    className="w-7 h-7 rounded-full bg-[#0B0F17] hover:bg-[#1E2433] text-white flex items-center justify-center transition-colors hover:scale-105 active:scale-95 cursor-pointer shrink-0 shadow-sm"
                  >
                    <X className="w-3.5 h-3.5 stroke-[2.2]" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Expandable Body Copy - Zero-stutter continuous height transition with overflow-hidden */}
          <motion.div
            initial={false}
            animate={{
              height: isVisaOpen ? 'auto' : 0,
              opacity: isVisaOpen ? 1 : 0,
            }}
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3.5 pt-0.5">
              <div className="w-full h-[1px] bg-black/6 mb-2.5" />
              <p className="text-[11.5px] leading-[1.48] text-[#6C7484] font-normal">
                We help you apply for urgent visas to{' '}
                <span className="font-semibold text-[#141821]">{country}</span>
                , the countries of the Schengen area, the USA, China, Japan, Australia, Canada,
                Great Britain and India. We guarantee that you will receive a visa, even if you have
                previously been refused.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Part B: Detached Bottom Price & CTA Card (Synchronized height collapse to prevent stutter) */}
        <motion.div
          initial={false}
          animate={{
            height: isVisaOpen ? 'auto' : 0,
            opacity: isVisaOpen ? 1 : 0,
            marginTop: isVisaOpen ? 5 : 0,
          }}
          transition={{
            duration: 0.38,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="overflow-hidden"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-[18px] px-4 py-3 shadow-[0_14px_32px_rgba(0,0,0,0.22)] border border-white/80 flex flex-col gap-2.5">
            {/* Price Row */}
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-[#6C7484]">Price from:</span>
              <span className="font-sans text-[15px] font-bold text-[#141821] tracking-tight">
                10.000$
              </span>
            </div>

            {/* Primary Action CTA */}
            <button
              onClick={handleOpenVisaPage}
              className="w-full h-8 px-3.5 rounded-[11px] bg-[#0B0F17] hover:bg-[#1D2434] text-white text-[11px] font-medium tracking-[0.01em] flex items-center justify-between transition group cursor-pointer shadow-sm active:scale-[0.99]"
            >
              <span>Check Visa Requirements</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Full Visa Requirements Page Modal */}
      <AnimatePresence>
        {visaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVisaModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-[#141821] border border-white/20 rounded-3xl p-6 shadow-2xl z-10 text-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="text-[11px] font-semibold tracking-wider text-[#3B82F6] uppercase mb-1">
                    Visa Concierge Protocol
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-[26px] h-[18px] rounded-[4px] overflow-hidden shadow-sm border border-white/20 shrink-0 bg-white/10 flex items-center justify-center">
                      <img
                        src={`https://flagcdn.com/w80/${currentFlagCode.toLowerCase()}.png`}
                        alt={`${country} flag`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-sans text-2xl font-bold tracking-tight text-white">
                      {country} Visa Requirements
                    </h3>
                  </div>
                  <p className="text-xs text-white/60 mt-0.5">
                    Official express clearance protocol &bull; {country} &amp; Schengen Partner States
                  </p>
                </div>
                <button
                  onClick={() => setVisaModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Requirements Checklist */}
              <div className="py-5 space-y-3.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Valid Passport with 6+ Months Remaining</div>
                    <div className="text-white/60 text-[11px] mt-0.5">
                      Must contain at least 2 blank pages. Scanned copy submitted digitally.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">100% Guaranteed Issuance Policy</div>
                    <div className="text-white/60 text-[11px] mt-0.5">
                      Our certified migration barristers guarantee acceptance for {country} even with previous refusals.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Expedited Processing: 3–5 Business Days</div>
                    <div className="text-white/60 text-[11px] mt-0.5">
                      Direct consular submission via diplomatic pouch with real-time SMS status updates.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Comprehensive Travel &amp; Health Insurance</div>
                    <div className="text-white/60 text-[11px] mt-0.5">
                      Included automatically with minimum €30,000 emergency medical coverage.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/50 uppercase tracking-wider">All-Inclusive Fee</span>
                  <span className="font-sans text-lg font-bold text-white">10.000$ USD</span>
                </div>
                <button
                  onClick={() => {
                    setVisaSubmitted(true);
                    setTimeout(() => {
                      setVisaSubmitted(false);
                      setVisaModalOpen(false);
                    }, 1800);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide uppercase transition shadow-lg cursor-pointer"
                >
                  {visaSubmitted ? 'Application Initiated ✓' : `Apply for ${country} Visa`}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
