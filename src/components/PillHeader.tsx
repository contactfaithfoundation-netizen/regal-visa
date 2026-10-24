import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, X, ShieldCheck, CheckCircle2, Phone, PhoneCall, Copy, Check } from 'lucide-react';

interface PillHeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: (open: boolean | ((prev: boolean) => boolean)) => void;
  isCallOpen?: boolean;
  onToggleCall?: (open: boolean | ((prev: boolean) => boolean)) => void;
  onOpenVisaModal?: () => void;
  onResetToHero?: () => void;
  onNavigateToExplore?: () => void;
  currentCountry?: {
    name: string;
    flagCode: string;
  };
}

const SUPPORT_NUMBERS = [
  { number: '03246883359' },
  { number: '03224252883' },
  { number: '03490449109' },
  { number: '0302195335' },
];

export const PillHeader: React.FC<PillHeaderProps> = ({
  isMenuOpen,
  onToggleMenu,
  isCallOpen,
  onToggleCall,
  onOpenVisaModal,
  onResetToHero,
  onNavigateToExplore,
  currentCountry,
}) => {
  const [internalCallOpen, setInternalCallOpen] = useState(false);
  const isCallMenuOpen = isCallOpen !== undefined ? isCallOpen : internalCallOpen;
  const setCallMenuOpen = onToggleCall || setInternalCallOpen;

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [activeModal, setActiveModal] = useState<
    'flights' | 'contact' | 'services' | 'about' | 'blog' | 'residence' | 'citizenship' | null
  >(null);

  const handleCopyNumber = async (num: string, index: number) => {
    try {
      await navigator.clipboard.writeText(num);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = num;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onToggleMenu(false);
        setCallMenuOpen(false);
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleMenu, setCallMenuOpen]);

  const handleLinkClick = (item: 'services' | 'about' | 'blog' | 'contact') => {
    if (item === 'contact') {
      onToggleMenu(false);
      setCallMenuOpen(true);
      return;
    }
    setActiveModal(item);
  };

  const handleCategoryClick = (category: 'residence' | 'citizenship' | 'visa') => {
    if (category === 'visa') {
      onToggleMenu(false);
      if (onOpenVisaModal) {
        onOpenVisaModal();
      } else {
        setActiveModal('services');
      }
    } else {
      setActiveModal(category);
    }
  };

  return (
    <>
      {/* 1. Subtle click-outside overlay behind menu or call list (z-40) */}
      <AnimatePresence>
        {(isMenuOpen || isCallMenuOpen) && (
          <motion.div
            key="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={() => {
              onToggleMenu(false);
              setCallMenuOpen(false);
            }}
            className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Top Center Floating Sandwich Menu Container (z-50) */}
      <div className="fixed top-5 md:top-7 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center select-none pointer-events-auto">
        {/* Top Header Pill with Framer Motion layout morphing */}
        <motion.nav
          layout
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Main Navigation"
          className={`flex items-center p-1 rounded-[22px] bg-white/98 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.14)] border border-white transition-shadow ${
            isMenuOpen || isCallMenuOpen
              ? currentCountry
                ? 'w-[350px] sm:w-[410px]'
                : 'w-[320px] sm:w-[340px]'
              : currentCountry
              ? 'w-[340px] sm:w-[395px] md:w-[420px]'
              : 'w-[270px] sm:w-[290px]'
          }`}
        >
          {/* 1. Left Split Capsule (Menu / Logo) - Expands smoothly to fill width */}
          <div className="flex-1 h-11 rounded-[16px] bg-[#F1F4F8] flex items-center mr-1.5 overflow-hidden border border-black/[0.02]">
            {/* Hamburger Button (Left side of capsule) - ONLY this triggers the Sandwich Menu toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const nextState = !isMenuOpen;
                onToggleMenu(nextState);
                if (nextState) {
                  setCallMenuOpen(false);
                }
              }}
              aria-label="Toggle Navigation Menu"
              className="w-11 h-full flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all duration-150 cursor-pointer shrink-0"
            >
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                className="text-[#202530]"
              >
                <rect x="0" y="0.5" width="16" height="1.6" rx="0.8" fill="currentColor" />
                <rect x="0" y="5.2" width="16" height="1.6" rx="0.8" fill="currentColor" />
                <rect x="0" y="9.9" width="16" height="1.6" rx="0.8" fill="currentColor" />
              </svg>
            </button>

            {/* Vertical Divider */}
            <div className="w-[1px] h-full bg-[#DCE2EC] shrink-0" />

            {/* Logo Area (Right side of capsule) - Clicking logo gets user back to hero section */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isMenuOpen) {
                  onToggleMenu(false);
                }
                if (isCallMenuOpen) {
                  setCallMenuOpen(false);
                }
                if (onResetToHero) {
                  onResetToHero();
                }
              }}
              aria-label={isMenuOpen ? 'Back to Hero Section' : 'Globe Express - Back to Hero'}
              className="flex-1 px-1 sm:px-1.5 h-full flex items-center justify-start cursor-pointer hover:bg-black/4 active:scale-95 transition-all duration-150 overflow-hidden"
            >
              {/* Dynamic super-smooth crossfade between Logo image + Country and "Menu" title */}
              <div className="relative h-full flex-1 flex items-center justify-start overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  {!isMenuOpen ? (
                    <motion.div
                      key="logo-image"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center justify-start h-full min-w-0"
                    >
                      <img
                        src="https://res.cloudinary.com/dacyy7rkn/image/upload/v1792480449/image_tqqmok.avif"
                        alt="Globe Express"
                        className={`${
                          currentCountry ? 'h-[32px] sm:h-[35px]' : 'h-[44px] sm:h-[48px]'
                        } w-auto max-w-none object-contain shrink-0 drop-shadow-xs -ml-0.5 sm:-ml-1 transition-all duration-200`}
                        loading="eager"
                      />

                      {currentCountry && (
                        <div className="flex items-center gap-1.5 min-w-0 pl-1 sm:pl-1.5">
                          <div className="w-[1px] h-3.5 sm:h-4 bg-[#CBD5E1] shrink-0" />
                          <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-xs flex items-center justify-center bg-white">
                            <img
                              src={`https://flagcdn.com/w40/${currentCountry.flagCode.toLowerCase()}.png`}
                              alt={currentCountry.name}
                              className="w-full h-full object-cover"
                              loading="eager"
                            />
                          </div>
                          <span className="text-[12px] sm:text-[13px] font-bold text-[#141821] truncate max-w-[85px] sm:max-w-[125px] tracking-tight">
                            {currentCountry.name}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.span
                      key="menu-title"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="font-sans text-[14px] font-medium tracking-tight text-[#202530] pl-1.5"
                    >
                      Menu
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>

          {/* 2. Middle Squircle Button (Upward Airplane Icon) - Direct scroll to Explore & Events section */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isMenuOpen) onToggleMenu(false);
              if (isCallMenuOpen) setCallMenuOpen(false);
              if (onNavigateToExplore) {
                onNavigateToExplore();
              } else {
                const el = document.getElementById('explore-events');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            aria-label="Explore and Events"
            title="Explore Visas & Events"
            className="w-11 h-11 rounded-[16px] bg-[#F1F4F8] hover:bg-[#EAEFF6] mr-1.5 flex items-center justify-center active:scale-95 transition-all duration-150 cursor-pointer shrink-0 border border-black/[0.02]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[18px] h-[18px] text-[#7E889B] hover:text-[#1C232D] transition-colors"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </button>

          {/* 3. Right Squircle Button (Phone Handset Icon) - Shows 4 contact numbers with Call & WhatsApp buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const next = !isCallMenuOpen;
              if (next) {
                onToggleMenu(false);
              }
              setCallMenuOpen(next);
            }}
            aria-label="Contact Numbers"
            title="Show Phone Numbers"
            className={`w-11 h-11 rounded-[16px] flex items-center justify-center active:scale-95 transition-all duration-150 cursor-pointer shrink-0 border border-black/[0.02] ${
              isCallMenuOpen
                ? 'bg-[#1C232D] text-white shadow-sm'
                : 'bg-[#F1F4F8] hover:bg-[#EAEFF6] text-[#7E889B] hover:text-[#1C232D]'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[16px] h-[16px]"
            >
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
          </button>
        </motion.nav>

        {/* Detached Dropdown Sandwich Cards inside AnimatePresence (GPU optimized for slow mobiles, zero-filter lag) */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Detached Middle Card: Centered Navigation Links (5px gap) */}
              <motion.div
                key="sandwich-middle-card"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                  transition: { duration: 0.18, ease: 'easeIn' },
                }}
                style={{ willChange: 'transform, opacity' }}
                className={`mt-[5px] ${
                  currentCountry ? 'w-[350px] sm:w-[410px]' : 'w-[320px] sm:w-[340px]'
                } rounded-[24px] bg-[#EFF2F8]/98 backdrop-blur-md py-6 px-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] border border-white/80 flex flex-col items-center justify-center gap-3.5 transform-gpu`}
              >
                {[
                  { label: 'Services', key: 'services' as const },
                  { label: 'About', key: 'about' as const },
                  { label: 'Blog', key: 'blog' as const },
                  { label: 'Contacts', key: 'contact' as const },
                ].map((item) => (
                  <div
                    key={item.key}
                    onClick={() => handleLinkClick(item.key)}
                    className="font-sans text-[18px] font-medium text-[#151922] tracking-[-0.01em] hover:opacity-60 transition cursor-pointer select-none"
                  >
                    {item.label}
                  </div>
                ))}
              </motion.div>

              {/* Detached Bottom Card: 3 Photographic Category Pills (5px gap) */}
              <motion.div
                key="sandwich-bottom-card"
                initial={{ opacity: 0, y: -14, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.3, delay: 0.03, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.98,
                  transition: { duration: 0.16, ease: 'easeIn' },
                }}
                style={{ willChange: 'transform, opacity' }}
                className={`mt-[5px] ${
                  currentCountry ? 'w-[350px] sm:w-[410px]' : 'w-[320px] sm:w-[340px]'
                } rounded-[24px] bg-[#EFF2F8]/98 backdrop-blur-md p-1.5 shadow-[0_22px_45px_rgba(0,0,0,0.22)] border border-white/80 flex flex-col gap-1.5 transform-gpu`}
              >
                {/* Banner 1: Residence permit */}
                <div
                  onClick={() => handleCategoryClick('residence')}
                  className="relative h-[58px] w-full rounded-[17px] overflow-hidden flex items-center justify-between px-5 cursor-pointer group select-none shadow-sm bg-[#122649]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80"
                    alt="Residence permit"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/45 pointer-events-none" />
                  <span className="text-[14px] font-medium text-white tracking-[-0.01em] z-10">
                    Residence permit
                  </span>
                  <span className="text-[14px] font-medium text-white z-10">
                    3
                  </span>
                </div>

                {/* Banner 2: Citizenship */}
                <div
                  onClick={() => handleCategoryClick('citizenship')}
                  className="relative h-[58px] w-full rounded-[17px] overflow-hidden flex items-center justify-between px-5 cursor-pointer group select-none shadow-sm bg-[#1C1B18]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80"
                    alt="Citizenship"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/45 pointer-events-none" />
                  <span className="text-[14px] font-medium text-white tracking-[-0.01em] z-10">
                    Citizenship
                  </span>
                  <span className="text-[14px] font-medium text-white z-10">
                    3
                  </span>
                </div>

                {/* Banner 3: Visa */}
                <div
                  onClick={() => handleCategoryClick('visa')}
                  className="relative h-[58px] w-full rounded-[17px] overflow-hidden flex items-center justify-between px-5 cursor-pointer group select-none shadow-sm bg-[#3B6496]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=700&q=80"
                    alt="Visa"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/45 pointer-events-none" />
                  <span className="text-[14px] font-medium text-white tracking-[-0.01em] z-10">
                    Visa
                  </span>
                  <span className="text-[14px] font-medium text-white z-10">
                    5
                  </span>
                </div>
              </motion.div>
            </>
          )}

          {/* Call Menu Sandwich Card - GPU-optimized for slow mobiles */}
          {isCallMenuOpen && (
            <>
              <motion.div
                key="sandwich-call-card"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                  transition: { duration: 0.18, ease: 'easeIn' },
                }}
                style={{ willChange: 'transform, opacity' }}
                className={`mt-[5px] ${
                  currentCountry ? 'w-[350px] sm:w-[410px]' : 'w-[320px] sm:w-[340px]'
                } rounded-[24px] bg-white/98 backdrop-blur-md p-2.5 sm:p-3 shadow-[0_18px_40px_rgba(0,0,0,0.14)] border border-white flex flex-col gap-2 select-none transform-gpu`}
              >
                {/* 4 Numbers List - 4 buttons representing they have WhatsApp by using WhatsApp icon also with Call button, without extra clutter */}
                {SUPPORT_NUMBERS.map((item, idx) => {
                  const rawPhone = item.number.replace(/^0/, '');
                  const waUrl = `https://wa.me/92${rawPhone}`;
                  return (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: 0.04 + idx * 0.03,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-[18px] py-2.5 px-3.5 flex items-center justify-between transition-colors duration-150"
                    >
                      {/* Number Display */}
                      <span className="font-sans text-[15px] sm:text-[16px] font-semibold text-[#1C232D] tracking-tight">
                        {item.number}
                      </span>

                      {/* 2 Clear Action Buttons: WhatsApp Icon + Call Button */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* WhatsApp Button */}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Open WhatsApp"
                          aria-label={`WhatsApp ${item.number}`}
                          className="w-8 h-8 rounded-[12px] bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer shadow-xs"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.37 7.35 9.1 7.41 8.88 7.65C8.65 7.89 8.02 8.48 8.02 9.71C8.02 10.93 8.91 12.11 9.03 12.27C9.15 12.44 10.74 14.9 13.21 15.96C15.26 16.84 15.68 16.66 16.12 16.63C16.57 16.59 17.55 16.05 17.76 15.48C17.96 14.9 17.96 14.41 17.9 14.31C17.84 14.21 17.68 14.15 17.44 14.03C17.2 13.91 16.01 13.33 15.79 13.25C15.57 13.17 15.41 13.13 15.25 13.37C15.09 13.61 14.62 14.15 14.48 14.31C14.34 14.47 14.2 14.49 13.96 14.37C13.72 14.25 12.95 14 12.03 13.18C11.31 12.54 10.83 11.76 10.69 11.52C10.55 11.28 10.67 11.14 10.79 11.02C10.9 10.91 11.04 10.73 11.16 10.59C11.28 10.45 11.32 10.35 11.4 10.19C11.48 10.03 11.44 9.89 11.38 9.77C11.32 9.65 10.85 8.5 10.65 8.03C10.46 7.57 10.26 7.63 10.11 7.63C9.97 7.62 9.81 7.35 9.53 7.35Z"/>
                          </svg>
                        </a>

                        {/* Call Button */}
                        <a
                          href={`tel:${item.number}`}
                          onClick={(e) => e.stopPropagation()}
                          title="Call directly"
                          aria-label={`Call ${item.number}`}
                          className="w-8 h-8 rounded-[12px] bg-[#1C232D] hover:bg-[#141A22] text-white flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer shadow-xs"
                        >
                          <PhoneCall className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Micro-Modals for header and menu options */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/45 backdrop-blur-xs pointer-events-auto"
            />

            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-sm bg-[#161D26]/98 border border-white/20 rounded-2xl p-5 shadow-2xl pointer-events-auto text-white z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#3B82F6] flex items-center gap-1.5">
                  {activeModal === 'flights' && 'Flight Schedule'}
                  {activeModal === 'contact' && 'VIP Travel Concierge'}
                  {activeModal === 'services' && 'Express Services'}
                  {activeModal === 'about' && 'About Globe Express'}
                  {activeModal === 'blog' && 'Expedition Journal'}
                  {activeModal === 'residence' && 'Residence Permit Programs'}
                  {activeModal === 'citizenship' && 'Citizenship by Investment'}
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {activeModal === 'flights' && (
                <div className="mt-3.5 space-y-2 text-xs">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Direct Mountain Express</div>
                      <div className="text-[10.5px] text-white/60">Zurich &bull; Tokyo &bull; Marrakech &bull; San Francisco</div>
                    </div>
                    <Plane className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    Commercial and private charters depart daily to nearest destination airfields.
                  </p>
                </div>
              )}

              {activeModal === 'contact' && (
                <div className="mt-3.5 space-y-2.5 text-xs">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1">
                    <div className="text-white/60 text-[11px]">Direct Support Line:</div>
                    <div className="font-mono text-sm font-semibold text-[#3B82F6]">+1 (800) 555-GLOBE</div>
                    <div className="text-[10px] text-white/50">24/7 Multilingual Concierge Available</div>
                  </div>
                </div>
              )}

              {activeModal === 'services' && (
                <div className="mt-3.5 space-y-2 text-xs">
                  <p className="text-white/70 leading-relaxed">
                    Globe Express offers bespoke consular clearance, luxury alpine charters, and turnkey visa protocols with guaranteed issuance.
                  </p>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Global Schengen &amp; Worldwide Clearance Valid</span>
                  </div>
                </div>
              )}

              {activeModal === 'about' && (
                <div className="mt-3.5 space-y-2 text-xs text-white/70 leading-relaxed">
                  <p>
                    Globe Express has been pioneering luxury adventure travel and VIP migration consultancy since 2014, connecting explorers to the world&apos;s most breathtaking regions.
                  </p>
                </div>
              )}

              {activeModal === 'blog' && (
                <div className="mt-3.5 space-y-2 text-xs text-white/70 leading-relaxed">
                  <p>
                    Read stories from the high peaks of Rätikon, snow monkey sanctuaries in Nagano, and stargazing in Erg Chebbi dunes.
                  </p>
                </div>
              )}

              {activeModal === 'residence' && (
                <div className="mt-3.5 space-y-2.5 text-xs">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                    <div className="font-semibold text-white">3 Available Programs:</div>
                    <ul className="text-white/70 text-[11.5px] space-y-1 list-disc pl-4">
                      <li>Switzerland Cantonal Residence Permit (L/B)</li>
                      <li>EU Golden Visa &amp; Real Estate Residence</li>
                      <li>UAE 10-Year Golden Nomad Residency</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeModal === 'citizenship' && (
                <div className="mt-3.5 space-y-2.5 text-xs">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                    <div className="font-semibold text-white">3 Available Direct Pathways:</div>
                    <ul className="text-white/70 text-[11.5px] space-y-1 list-disc pl-4">
                      <li>Malta Exceptional Direct Citizenship by Investment</li>
                      <li>Caribbean Commonwealth Dual Passports (St. Kitts &amp; Nevis)</li>
                      <li>Vanuatu Fast-Track Honorary Citizenship</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
