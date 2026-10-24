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

  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;

  const currentFlagCode =
    flagCode || COUNTRY_FLAGS[country]?.code || 'ch';

  const handleOpenVisaPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenVisaPage) {
      onOpenVisaPage(country);
    } else {
      setVisaModalOpen(true);
    }
  };

  // Distance from bottom of viewport so the card sits comfortably above the small carousel cards
  const bottomOffset = Math.max(16, (viewportHeight - baseTop) + (isDesktop ? 30 : 24));

  return (
    <>
      {/* Expandable Visa Card Widget - Anchored by bottom position so it expands in the UP direction and never clips carousel cards */}
      <div
        style={{
          position: 'absolute',
          bottom: bottomOffset,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
        }}
        className="w-[280px] sm:w-[310px] max-w-[calc(100vw-32px)] select-none pointer-events-auto"
      >
        {/* Unified Card Container with stable upward expansion geometry */}
        <div className="bg-white/98 backdrop-blur-md border border-white/90 rounded-[22px] shadow-[0_12px_36px_rgba(0,0,0,0.22)] overflow-hidden transition-shadow duration-200">
          {/* Header Row: Always visible and anchored without shifting up/down */}
          <div
            onClick={() => onToggleVisa(!isVisaOpen)}
            className="px-4 py-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-neutral-50/60 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-[#8E96A6] uppercase tracking-wider leading-none mb-1">
                Visas
              </span>

              {/* Dynamic Animated Country Name and Flag */}
              <div className="relative h-[24px] min-w-[130px] overflow-hidden flex items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={country}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
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
                    <h4 className="font-sans text-[15px] sm:text-[16px] font-bold text-[#141821] leading-tight tracking-tight whitespace-nowrap">
                      {country}
                    </h4>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Trigger Button with clean state toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisa(!isVisaOpen);
              }}
              aria-label={isVisaOpen ? 'Collapse Visa Details' : 'Expand Visa Details'}
              className="h-7 px-3 rounded-full bg-[#1C232D] hover:bg-[#141A22] text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0 shadow-xs"
            >
              <span>{isVisaOpen ? 'Close' : 'Visa Details'}</span>
              {isVisaOpen ? (
                <X className="w-3.5 h-3.5 stroke-[2.2]" />
              ) : (
                <Plus className="w-3 h-3 text-white/90 stroke-[2.5]" />
              )}
            </button>
          </div>

          {/* Calm, Smooth Expandable Content (Zero layout bouncing or vertical jitter) */}
          <AnimatePresence initial={false}>
            {isVisaOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.32,
                  ease: [0.25, 1, 0.35, 1],
                }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-1 border-t border-neutral-100 space-y-3">
                  <p className="text-[11.5px] leading-[1.5] text-[#6C7484] font-normal pt-1">
                    Direct consular verification for{' '}
                    <span className="font-bold text-[#1C232D]">{country}</span>.
                    Fast-track e-visa approvals with guaranteed delivery time for Pakistani citizens.
                  </p>

                  <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
                    <span className="text-[11.5px] font-medium text-[#6C7484]">Official Package:</span>
                    <span className="font-sans text-[14px] font-extrabold text-[#1C232D]">
                      PKR 17,200
                    </span>
                  </div>

                  <button
                    onClick={handleOpenVisaPage}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#1C232D] hover:bg-[#141A22] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs active:scale-[0.98] cursor-pointer"
                  >
                    <span>Check Visa Requirements</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
                  <div className="text-[11px] font-semibold tracking-wider text-[#A0AEC0] uppercase mb-1">
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
                  className="px-5 py-2.5 rounded-xl bg-white text-[#1C232D] hover:bg-neutral-100 text-xs font-bold tracking-wide uppercase transition shadow-lg cursor-pointer"
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
