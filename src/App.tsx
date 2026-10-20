import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { SLIDES } from './data/slides';
import { PillHeader } from './components/PillHeader';
import { ProgressBar } from './components/ProgressBar';
import { CountryVisaCard } from './components/CountryVisaCard';
import { LiveCounterStripe } from './components/LiveCounterStripe';
import { ExploreEventsSection } from './components/ExploreEventsSection';
import { MalaysiaVisaPage } from './components/MalaysiaVisaPage';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideTimerKey, setSlideTimerKey] = useState(0);
  const [isVisaOpen, setIsVisaOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'malaysia-visa'>('malaysia-visa');

  // Viewport dimensions
  const [dimensions, setDimensions] = useState(() => ({
    vw: typeof window !== 'undefined' ? window.innerWidth : 1200,
    vh: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const activeSlide = SLIDES[activeIndex];

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        vw: window.innerWidth,
        vh: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload all photography
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  // NEXT transition with 0.95s cooldown matching cinematic physics
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    setSlideTimerKey((k) => k + 1);

    setTimeout(() => {
      setIsAnimating(false);
    }, 950);
  }, [isAnimating, activeIndex]);

  // PREV transition
  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPrevIndex(activeIndex);
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setSlideTimerKey((k) => k + 1);

    setTimeout(() => {
      setIsAnimating(false);
    }, 950);
  }, [isAnimating, activeIndex]);

  // Jump to specific slide
  const handleSelectSlide = (targetIndex: number) => {
    if (targetIndex === activeIndex || isAnimating) return;
    setIsAnimating(true);
    setPrevIndex(activeIndex);
    setActiveIndex(targetIndex);
    setSlideTimerKey((k) => k + 1);

    setTimeout(() => {
      setIsAnimating(false);
    }, 950);
  };

  // Reset user back to the initial hero section view
  const handleResetToHero = useCallback(() => {
    setIsMenuOpen(false);
    setIsCallOpen(false);
    setIsVisaOpen(false);
    if (activeIndex !== 0) {
      setPrevIndex(activeIndex);
      setActiveIndex(0);
      setSlideTimerKey((k) => k + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeIndex]);

  // Auto-play timer (4.5s) - paused when Visa Card is expanded, Sandwich Menu is open, or Call Directory is open
  useEffect(() => {
    if (isVisaOpen || isMenuOpen || isCallOpen) {
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      return;
    }

    autoPlayTimeoutRef.current = setTimeout(() => {
      handleNext();
    }, 4500);

    return () => {
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
    };
  }, [slideTimerKey, isVisaOpen, isMenuOpen, isCallOpen, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVisaOpen || isMenuOpen || isCallOpen) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isVisaOpen, isMenuOpen, isCallOpen]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX < -50) {
      handleNext();
    } else if (deltaX > 50) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  // Refined smaller card dimensions & slot positioning (cards made extra compact in mobile view)
  const isDesktop = dimensions.vw >= 1024;
  const cardW = isDesktop ? 140 : 58;
  const cardH = isDesktop ? 205 : 88;
  const gap = isDesktop ? 16 : 6;
  const baseLeft = isDesktop ? dimensions.vw * 0.48 : dimensions.vw * 0.48;
  const baseTop = isDesktop ? dimensions.vh - cardH - 56 : dimensions.vh - cardH - 24;

  if (currentView === 'malaysia-visa') {
    return (
      <MalaysiaVisaPage
        onBackToHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVisaModal={() => setIsVisaOpen(true)}
      />
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#0f1419] font-sans">
      {/* 4px Gold Auto-Play Progress Bar at very top edge (paused while visa card, call directory, or sandwich menu is open) */}
      <ProgressBar
        slideKey={slideTimerKey}
        isPaused={isVisaOpen || isMenuOpen || isCallOpen}
        duration={4.5}
      />

      {/* Floating Frosted-Glass Pill Header with Sandwich Menu and Call Directory Dropdown */}
      <PillHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={setIsMenuOpen}
        isCallOpen={isCallOpen}
        onToggleCall={setIsCallOpen}
        onOpenVisaModal={() => setIsVisaOpen(true)}
        onResetToHero={handleResetToHero}
      />

      {/* HERO SECTION (100dvh) */}
      <section
        id="hero-section"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[100dvh] overflow-hidden select-none"
      >
        {/* Expandable Country Visa Card widget positioned in header alignment, anchored directly above the floating cards */}
        <CountryVisaCard
          country={activeSlide.country}
          flagCode={activeSlide.flagCode}
          baseTop={baseTop}
          viewportHeight={dimensions.vh}
          isVisaOpen={isVisaOpen}
          onToggleVisa={setIsVisaOpen}
          onOpenVisaPage={() => {
            setCurrentView('malaysia-visa');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* 1. Behind the array: ONE static image showing previous background */}
        <img
          src={SLIDES[prevIndex].image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
        />

        {/* 2. Persistent Single Array of all 6 slides (Absolute Positioned, Never Unmounted) */}
        {SLIDES.map((slide, index) => {
          const offset = (index - activeIndex + SLIDES.length) % SLIDES.length;

          let zIndex = 30;
          let animateProps = {};
          let transitionProps = {};
          let isClickable = false;

          if (offset === 0) {
            // The First Card Expanding to Full Screen with Slow-Start Fast-Finish curve and keyframe borderRadius
            zIndex = 10;
            animateProps = {
              top: 0,
              left: 0,
              width: dimensions.vw,
              height: dimensions.vh,
              borderRadius: isDesktop ? ['12px', '20px', '16px', '0px'] : ['8px', '14px', '10px', '0px'],
              boxShadow: '0 0px 0px 0px rgba(0, 0, 0, 0)',
              opacity: 1,
            };
            transitionProps = {
              default: {
                duration: 0.95,
                ease: [0.7, 0, 0.15, 1],
              },
              borderRadius: {
                duration: 0.95,
                times: [0, 0.35, 0.82, 1],
                ease: 'easeIn',
              },
              boxShadow: {
                duration: 0.95,
                ease: [0.7, 0, 0.15, 1],
              },
            };
            isClickable = false;
          } else if (offset >= 1 && offset <= 4) {
            // Floating Smaller Cards Sliding Smoothly Right-to-Left with deep shadow
            const slot = offset - 1; // 0, 1, 2, 3
            zIndex = 30;
            animateProps = {
              top: baseTop,
              left: baseLeft + slot * (cardW + gap),
              width: cardW,
              height: cardH,
              borderRadius: isDesktop ? '12px' : '8px',
              boxShadow: isDesktop ? '0 20px 40px -10px rgba(0, 0, 0, 0.65)' : '0 10px 24px -6px rgba(0, 0, 0, 0.7)',
              opacity: 1,
            };
            transitionProps = {
              duration: 0.95,
              ease: [0.7, 0, 0.15, 1],
            };
            isClickable = true;
          } else if (offset === 5) {
            // Off-Screen Waiting Card
            const slot = 4;
            zIndex = 5;
            animateProps = {
              top: baseTop,
              left: baseLeft + slot * (cardW + gap),
              width: cardW,
              height: cardH,
              borderRadius: isDesktop ? '12px' : '8px',
              boxShadow: '0 0px 0px 0px rgba(0, 0, 0, 0)',
              opacity: 0,
            };
            transitionProps = {
              duration: 0,
            };
            isClickable = false;
          }

          return (
            <motion.div
              key={slide.id}
              animate={animateProps}
              transition={transitionProps}
              onClick={() => {
                if (!isClickable || isAnimating) return;
                if (offset === 1) {
                  handleNext();
                } else {
                  handleSelectSlide(index);
                }
              }}
              style={{
                position: 'absolute',
                zIndex: zIndex,
                willChange: 'top, left, width, height, border-radius, transform',
              }}
              className={`overflow-hidden ${
                isClickable
                  ? 'cursor-pointer group hover:scale-[1.04] transition-transform duration-300'
                  : 'pointer-events-none'
              }`}
            >
              {/* Slide Image with subtle cinematic zoom-out settle on active expansion */}
              <motion.img
                src={slide.image}
                alt={slide.title.replace('\n', ' ')}
                animate={
                  offset === 0
                    ? { scale: [1.08, 1] }
                    : { scale: 1 }
                }
                transition={
                  offset === 0
                    ? { duration: 1.15, ease: [0.22, 1, 0.36, 1] }
                    : { duration: 0.6 }
                }
                className="w-full h-full object-cover object-center pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Glass Rim Border */}
              <div
                className={`absolute inset-0 border transition-colors pointer-events-none ${
                  offset === 0
                    ? 'border-transparent'
                    : isDesktop
                    ? 'rounded-xl border-white/20 group-hover:border-white/50'
                    : 'rounded-[8px] border-white/25 group-hover:border-white/50'
                }`}
              />

              {/* Bottom Gradient for Card Text (Desktop only) */}
              {isDesktop && (
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none transition-opacity duration-300 ${
                    offset === 0 ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              )}

              {/* Mobile View: Small circle flags on small cards just like Explore & Events */}
              {!isDesktop && (
                <motion.div
                  animate={{ opacity: offset === 0 ? 0 : 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute inset-x-0 bottom-0 pb-1.5 z-10 flex flex-col items-center justify-end pointer-events-none"
                >
                  <div className="absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
                  <div className="relative z-10 w-5 h-5 rounded-full overflow-hidden border border-white/60 shadow-[0_2px_6px_rgba(0,0,0,0.5)] bg-white/10 flex items-center justify-center shrink-0">
                    <img
                      src={`https://flagcdn.com/w80/${(slide.flagCode || 'ch').toLowerCase()}.png`}
                      alt={`${slide.country} flag`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              )}

              {/* Card Inner Text: Shown on desktop only (no text in small cards on mobile view) */}
              {isDesktop && (
                <motion.div
                  animate={{ opacity: offset === 0 ? 0 : 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute bottom-0 left-0 p-2.5 sm:p-3 w-full z-10 flex flex-col justify-end pointer-events-none"
                >
                  <div className="w-2.5 h-[1.5px] bg-white/80 mb-1 transition-all duration-300 group-hover:w-4 group-hover:bg-[#2563EB]" />
                  <div className="text-[9px] text-white/85 truncate font-medium tracking-wide mb-0.5">
                    {slide.region}
                  </div>
                  <h3 className="font-oswald text-xs sm:text-sm font-bold uppercase leading-[1.05] text-white whitespace-pre-line tracking-tight drop-shadow-md">
                    {slide.title}
                  </h3>
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* 3. z-[15]: Dark gradient overlay for text readability */}
        <div
          className="absolute inset-0 z-[15] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(15,20,25,0.72) 0%, rgba(15,20,25,0.30) 50%, rgba(15,20,25,0.45) 100%)',
          }}
        >
          <div className="absolute inset-0 bg-radial-[at_30%_50%] from-transparent via-transparent to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419]/80 via-transparent to-black/40" />
        </div>
      </section>

      {/* SECTION AFTER HERO: Squared impact stripe in #1C232D touching below hero */}
      <section
        id="consular-verification-section"
        className="relative w-full bg-[#1C232D]"
      >
        <LiveCounterStripe />
      </section>

      {/* EXPLORE & EVENTS VISA DISCOVERY SECTION */}
      <ExploreEventsSection
        onSelectCountry={(country) => {
          if (country.toUpperCase().includes('MALAYSIA')) {
            setCurrentView('malaysia-visa');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Floating View Switcher to quickly open the Malaysia Visa Detail Page */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => {
            setCurrentView('malaysia-visa');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold shadow-[0_8px_30px_rgba(29,78,216,0.5)] border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <img
            src="https://flagcdn.com/w40/my.png"
            alt="Malaysia"
            className="w-4 h-3 rounded-[2px] object-cover"
          />
          <span>Malaysia Visa from Pakistan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
