import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { SLIDES } from './data/slides';
import { PillHeader } from './components/PillHeader';
import { ProgressBar } from './components/ProgressBar';
import { CountryVisaCard } from './components/CountryVisaCard';
import { LiveCounterStripe } from './components/LiveCounterStripe';
import { AboutSection } from './components/AboutSection';
import { ExploreEventsSection } from './components/ExploreEventsSection';
import { CountryVisaPage } from './components/CountryVisaPage';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { AllBlogsPage } from './components/AllBlogsPage';
import { BlogPostPage } from './components/BlogPostPage';
import { AllVisasPage } from './components/AllVisasPage';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { SecondaryCtaBanner } from './components/SecondaryCtaBanner';
import { parseCurrentRoute, countryToSlug } from './utils/router';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideTimerKey, setSlideTimerKey] = useState(0);
  const [isVisaOpen, setIsVisaOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Synchronized routing state
  const [currentView, setCurrentView] = useState<'home' | 'country-visa' | 'blogs' | 'blog-detail' | 'visas'>(() => {
    return parseCurrentRoute().view;
  });
  const [selectedCountry, setSelectedCountry] = useState<string>(() => {
    return parseCurrentRoute().country || 'United Kingdom';
  });
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>(() => {
    return parseCurrentRoute().blogSlug || 'bank-statement-rejections-pakistan';
  });

  // Viewport dimensions
  const [dimensions, setDimensions] = useState(() => ({
    vw: typeof window !== 'undefined' ? window.innerWidth : 1200,
    vh: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Track scroll position to hide top loading progress bar when scrolling down past the hero section
  useEffect(() => {
    const handleScroll = () => {
      const isPastHero = window.scrollY > dimensions.vh * 0.65;
      setIsHeroVisible(!isPastHero);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dimensions.vh]);

  const activeSlide = SLIDES[activeIndex];

  // Resize listener - guarded against mobile scroll URL bar collapse to keep hero image consistent
  useEffect(() => {
    let lastVw = typeof window !== 'undefined' ? window.innerWidth : 1200;
    let lastVh = typeof window !== 'undefined' ? window.innerHeight : 800;

    const handleResize = () => {
      const currentVw = window.innerWidth;
      const currentVh = window.innerHeight;

      // On mobile devices (< 1024px), vertical scrolling causes the browser address bar
      // to collapse or expand, firing a window resize with identical width and a height shift of ~40-120px.
      // We ignore these vertical-only URL bar shifts to keep the hero image completely consistent!
      const isMobile = currentVw < 1024;
      if (isMobile && currentVw === lastVw && Math.abs(currentVh - lastVh) < 140) {
        return;
      }

      lastVw = currentVw;
      lastVh = currentVh;
      setDimensions({
        vw: currentVw,
        vh: currentVh,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload and decode all photography in GPU memory
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {});
      }
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

  // Navigate to country visa page and synchronize browser history & URL
  const handleOpenCountryVisa = useCallback((country: string) => {
    const canonicalCountry = country || activeSlide.country;
    const slug = countryToSlug(canonicalCountry);
    const targetUrl = `/visa/${slug}`;

    // Ensure home state is recorded in history beneath the country page
    if (!window.history.state || window.history.state.view !== 'home') {
      window.history.replaceState({ view: 'home' }, 'Globe Express', '/');
    }

    window.history.pushState(
      { view: 'country-visa', country: canonicalCountry },
      `${canonicalCountry} Visa - Globe Express`,
      targetUrl
    );

    setSelectedCountry(canonicalCountry);
    setCurrentView('country-visa');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeSlide.country]);

  // Open a specific blog post in dedicated markdown page
  const handleOpenBlog = useCallback((slug: string) => {
    if (!window.history.state || window.history.state.view !== 'home') {
      window.history.replaceState({ view: 'home' }, 'Globe Express', '/');
    }
    window.history.pushState(
      { view: 'blog-detail', blogSlug: slug },
      'Visa Intelligence Blog - Globe Express',
      `/blog/${slug}`
    );
    setSelectedBlogSlug(slug);
    setCurrentView('blog-detail');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Navigate to All Blogs page
  const handleNavigateToBlogs = useCallback(() => {
    if (!window.history.state || window.history.state.view !== 'home') {
      window.history.replaceState({ view: 'home' }, 'Globe Express', '/');
    }
    window.history.pushState(
      { view: 'blogs' },
      'Pakistan Visa Blogs & Guides - Globe Express',
      '/blogs'
    );
    setCurrentView('blogs');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Navigate to All Visas page
  const handleNavigateToVisas = useCallback(() => {
    if (!window.history.state || window.history.state.view !== 'home') {
      window.history.replaceState({ view: 'home' }, 'Globe Express', '/');
    }
    window.history.pushState(
      { view: 'visas' },
      'Explore All Visas - Globe Express',
      '/visas'
    );
    setCurrentView('visas');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Navigate back to Home cleanly without closing the application
  const handleBackToHome = useCallback((options?: { section?: string }) => {
    // If the browser history has a sub-view entry, calling history.back()
    // pops the history stack back to home naturally!
    if (window.history.state?.view && window.history.state.view !== 'home' && window.history.length > 1) {
      window.history.back();
      if (options?.section) {
        setTimeout(() => {
          const el = document.getElementById(options.section!);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
      return;
    }

    // Direct land or standalone fallback: push home state
    const targetUrl = options?.section ? `/#${options.section}` : '/';
    window.history.pushState({ view: 'home' }, 'Globe Express', targetUrl);
    setCurrentView('home');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    if (options?.section) {
      setTimeout(() => {
        const el = document.getElementById(options.section!);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  }, []);

  // Reset user back to the initial hero section view
  const handleResetToHero = useCallback(() => {
    setIsMenuOpen(false);
    setIsCallOpen(false);
    setIsVisaOpen(false);
    if (currentView !== 'home') {
      handleBackToHome({ section: 'hero-section' });
      return;
    }
    if (activeIndex !== 0) {
      setPrevIndex(activeIndex);
      setActiveIndex(0);
      setSlideTimerKey((k) => k + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeIndex, currentView, handleBackToHome]);

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

  // Navigate to Explore & Events section smoothly from header plane button or country page
  const handleNavigateToExplore = useCallback(() => {
    if (currentView !== 'home') {
      handleBackToHome({ section: 'explore-events' });
    } else {
      const el = document.getElementById('explore-events');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentView, handleBackToHome]);

  // Synchronize document title with active route
  useEffect(() => {
    if (currentView === 'country-visa' && selectedCountry) {
      document.title = `${selectedCountry} Visa for Pakistanis - Requirements, Fees & Fast-Track Application`;
    } else if (currentView === 'blog-detail') {
      document.title = 'Pakistan Visa Intelligence Blog - Globe Express';
    } else if (currentView === 'blogs') {
      document.title = 'Pakistan Visa Blogs, Guides & Case Studies - Globe Express';
    } else if (currentView === 'visas') {
      document.title = 'Explore All Visas & Worldwide Approvals - Globe Express';
    } else {
      document.title = 'Globe Express - Official Visa Concierge & Worldwide Entry Approvals';
    }
  }, [currentView, selectedCountry]);

  // Handle browser back/forward buttons (popstate) & seed history on direct landing
  useEffect(() => {
    const initialRoute = parseCurrentRoute();

    if (initialRoute.view === 'country-visa' && initialRoute.country) {
      window.history.replaceState({ view: 'home' }, 'Globe Express', '/');
      window.history.pushState(
        { view: 'country-visa', country: initialRoute.country },
        `${initialRoute.country} Visa - Globe Express`,
        window.location.pathname + window.location.search + window.location.hash
      );
      setSelectedCountry(initialRoute.country);
      setCurrentView('country-visa');
    } else if (initialRoute.view === 'blog-detail' && initialRoute.blogSlug) {
      window.history.replaceState({ view: 'home' }, 'Globe Express', '/');
      window.history.pushState(
        { view: 'blog-detail', blogSlug: initialRoute.blogSlug },
        'Visa Intelligence Blog - Globe Express',
        window.location.pathname + window.location.search + window.location.hash
      );
      setSelectedBlogSlug(initialRoute.blogSlug);
      setCurrentView('blog-detail');
    } else if (initialRoute.view === 'blogs') {
      window.history.replaceState({ view: 'home' }, 'Globe Express', '/');
      window.history.pushState(
        { view: 'blogs' },
        'Pakistan Visa Blogs - Globe Express',
        window.location.pathname + window.location.search + window.location.hash
      );
      setCurrentView('blogs');
    } else if (initialRoute.view === 'visas') {
      window.history.replaceState({ view: 'home' }, 'Globe Express', '/');
      window.history.pushState(
        { view: 'visas' },
        'Explore All Visas - Globe Express',
        window.location.pathname + window.location.search + window.location.hash
      );
      setCurrentView('visas');
    } else {
      if (!window.history.state) {
        window.history.replaceState(
          { view: 'home' },
          'Globe Express',
          window.location.pathname + window.location.search + window.location.hash
        );
      }
      if (initialRoute.section) {
        setTimeout(() => {
          const el = document.getElementById(initialRoute.section!);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }

    const handlePopState = (e: PopStateEvent) => {
      // 1. Check event state if available
      if (e.state && typeof e.state === 'object' && 'view' in e.state) {
        if (e.state.view === 'country-visa' && e.state.country) {
          setSelectedCountry(e.state.country);
          setCurrentView('country-visa');
        } else if (e.state.view === 'blog-detail' && e.state.blogSlug) {
          setSelectedBlogSlug(e.state.blogSlug);
          setCurrentView('blog-detail');
        } else if (e.state.view === 'blogs') {
          setCurrentView('blogs');
        } else if (e.state.view === 'visas') {
          setCurrentView('visas');
        } else {
          setCurrentView('home');
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        return;
      }

      // 2. Fallback to parsing current window location
      const route = parseCurrentRoute();
      if (route.view === 'country-visa' && route.country) {
        setSelectedCountry(route.country);
        setCurrentView('country-visa');
      } else if (route.view === 'blog-detail' && route.blogSlug) {
        setSelectedBlogSlug(route.blogSlug);
        setCurrentView('blog-detail');
      } else if (route.view === 'blogs') {
        setCurrentView('blogs');
      } else if (route.view === 'visas') {
        setCurrentView('visas');
      } else {
        setCurrentView('home');
        if (route.section) {
          setTimeout(() => {
            const el = document.getElementById(route.section!);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 60);
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentView === 'country-visa') {
    return (
      <CountryVisaPage
        countryName={selectedCountry}
        onBackToHome={() => handleBackToHome()}
        onOpenVisaModal={() => setIsVisaOpen(true)}
        onNavigateToExplore={handleNavigateToExplore}
        onNavigateToBlogs={handleNavigateToBlogs}
        onNavigateToVisas={handleNavigateToVisas}
      />
    );
  }

  if (currentView === 'blog-detail') {
    return (
      <BlogPostPage
        slug={selectedBlogSlug}
        onBackToBlogs={handleNavigateToBlogs}
        onBackToHome={() => handleBackToHome()}
        onSelectBlog={handleOpenBlog}
        onOpenVisaModal={() => setIsVisaOpen(true)}
      />
    );
  }

  if (currentView === 'blogs') {
    return (
      <AllBlogsPage
        onBackToHome={() => handleBackToHome()}
        onSelectBlog={handleOpenBlog}
        onOpenVisaModal={() => setIsVisaOpen(true)}
        onNavigateToVisas={handleNavigateToVisas}
      />
    );
  }

  if (currentView === 'visas') {
    return (
      <AllVisasPage
        onBackToHome={() => handleBackToHome()}
        onSelectCountry={handleOpenCountryVisa}
        onOpenVisaModal={() => setIsVisaOpen(true)}
        onNavigateToBlogs={handleNavigateToBlogs}
      />
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#0f1419] font-sans">
      {/* 4px Auto-Play Progress Bar at very top edge (only visible while hero section is in view) */}
      <ProgressBar
        slideKey={slideTimerKey}
        isPaused={isVisaOpen || isMenuOpen || isCallOpen}
        isVisible={isHeroVisible}
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
        onNavigateToExplore={handleNavigateToExplore}
        onNavigateToBlogs={handleNavigateToBlogs}
        onNavigateToVisas={handleNavigateToVisas}
      />

      {/* HERO SECTION - Stable height on mobile so image never stretches or gets longer on scroll */}
      <section
        id="hero-section"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ height: dimensions.vh }}
        className="relative w-full h-[100svh] lg:h-[100dvh] overflow-hidden select-none"
      >
        {/* Expandable Country Visa Card widget positioned in header alignment, anchored directly above the floating cards */}
        <CountryVisaCard
          country={activeSlide.country}
          flagCode={activeSlide.flagCode}
          baseTop={baseTop}
          viewportHeight={dimensions.vh}
          isVisaOpen={isVisaOpen}
          onToggleVisa={setIsVisaOpen}
          onOpenVisaPage={handleOpenCountryVisa}
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
                willChange: isAnimating ? 'top, left, width, height, border-radius' : 'auto',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              whileHover={isClickable && !isAnimating ? { scale: 1.04 } : undefined}
              className={`overflow-hidden transform-gpu ${
                isClickable
                  ? 'cursor-pointer group'
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
                style={{
                  transformOrigin: 'center center',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                className="w-full h-full object-cover object-center pointer-events-none transform-gpu"
                loading="eager"
                decoding="async"
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

      {/* ABOUT SECTION: High-converting Pakistan context statement with kinetic ScrollReveal on pure white */}
      <AboutSection />

      {/* STATS STRIPE: Impact stripe in white background matching reference design */}
      <section
        id="consular-verification-section"
        className="relative w-full bg-white border-b border-neutral-100"
      >
        <LiveCounterStripe />
      </section>

      {/* EXPLORE & EVENTS VISA DISCOVERY SECTION (Pure White Background) */}
      <section className="w-full bg-white">
        <ExploreEventsSection
          onSelectCountry={handleOpenCountryVisa}
        />
      </section>

      {/* INTERACTIVE 3-COLUMN SCROLL SERVICES SECTION */}
      <ServicesSection />

      {/* 4-STEP CONSULAR CLEARANCE PROCESS SECTION */}
      <ProcessSection
        onOpenVisaModal={() => setIsVisaOpen(true)}
        onNavigateToExplore={handleNavigateToExplore}
      />

      {/* VISA INTELLIGENCE & BLOG SECTION (Brand Colors, Pure White Background, Reference Style) */}
      <BlogSection
        onSelectBlog={handleOpenBlog}
        onViewAllBlogs={handleNavigateToBlogs}
      />

      {/* FREQUENTLY ASKED QUESTIONS SECTION (Pure White Background & Brand Colors) */}
      <FaqSection className="border-t border-neutral-100" />

      {/* FOOTER & SECONDARY CTA BANNER (Logo, Page Navigation, 3D Spheres Video, Social Links) */}
      <SecondaryCtaBanner
        onOpenVisaModal={() => setIsVisaOpen(true)}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateToVisas={handleNavigateToVisas}
        onNavigateToBlogs={handleNavigateToBlogs}
      />
    </div>
  );
}
