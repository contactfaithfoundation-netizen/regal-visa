import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { WifiOff, Home, RefreshCw, Compass, ArrowRight } from 'lucide-react';
import { PillHeader } from './PillHeader';
import { SecondaryCtaBanner } from './SecondaryCtaBanner';

interface ErrorScreenProps {
  type?: '404' | 'offline';
  onBackToHome: () => void;
  onNavigateToVisas?: () => void;
  onNavigateToBlogs?: () => void;
  onNavigateToServices?: () => void;
  onNavigateToProcess?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToContact?: () => void;
  onOpenVisaModal?: () => void;
}

export const CustomErrorScreen: React.FC<ErrorScreenProps> = ({
  type = '404',
  onBackToHome,
  onNavigateToVisas,
  onNavigateToBlogs,
  onNavigateToServices,
  onNavigateToProcess,
  onNavigateToAbout,
  onNavigateToContact,
  onOpenVisaModal,
}) => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isRetrying, setIsRetrying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);

  // Monitor network status dynamically
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isOfflineMode = type === 'offline' || !isOnline;

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        window.location.reload();
      } else {
        setIsRetrying(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-neutral-900 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* Header */}
      <PillHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={setIsMenuOpen}
        isCallOpen={isCallOpen}
        onToggleCall={setIsCallOpen}
        onResetToHero={onBackToHome}
        onOpenVisaModal={onOpenVisaModal}
        onNavigateToExplore={onNavigateToVisas}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToVisas={onNavigateToVisas}
        onNavigateToServices={onNavigateToServices}
        onNavigateToProcess={onNavigateToProcess}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToContact={onNavigateToContact}
      />

      {/* Main Hero Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-32 pb-16">
        <div className="max-w-xl w-full text-center flex flex-col items-center">
          {/* Animated Graphic Indicator */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6"
          >
            {/* Ambient Pulse Ring */}
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl transform scale-150" />

            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-center">
              {isOfflineMode ? (
                <WifiOff className="w-12 h-12 text-[#2563EB] stroke-[1.8]" />
              ) : (
                <Compass className="w-12 h-12 text-[#2563EB] stroke-[1.8] animate-[spin_14s_linear_infinite]" />
              )}
            </div>

            {/* Status Pill Badge */}
            <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-[#0F172A] text-white shadow-md">
              {isOfflineMode ? 'OFFLINE' : '404 ERROR'}
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight"
          >
            {isOfflineMode ? 'No Internet Connection' : 'Page Not Found'}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-3.5 text-sm sm:text-base text-slate-500 max-w-md leading-relaxed"
          >
            {isOfflineMode
              ? 'Your device appears to be offline. Please check your Wi-Fi or mobile data network to continue exploring consular visa services.'
              : 'The consular file, visa route, or article you are searching for does not exist or may have been relocated.'}
          </motion.p>

          {/* Interactive CTA Buttons */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            {isOfflineMode ? (
              <button
                type="button"
                onClick={handleRetry}
                disabled={isRetrying}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs sm:text-sm font-semibold tracking-tight shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`}
                />
                <span>{isRetrying ? 'Checking Network...' : 'Retry Connection'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onBackToHome}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs sm:text-sm font-semibold tracking-tight shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Home className="w-4 h-4" />
                <span>Return to Homepage</span>
              </button>
            )}

            {onNavigateToVisas && (
              <button
                type="button"
                onClick={onNavigateToVisas}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs sm:text-sm font-semibold tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
              >
                <span>Explore Visas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>

          {/* Emergency Direct Phone Helpline Support */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 w-full max-w-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>Need urgent consular assistance?</span>
            <a
              href="tel:03246883359"
              className="font-bold text-[#1D4ED8] hover:underline whitespace-nowrap"
            >
              Call 0324 6883359
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <SecondaryCtaBanner
        onOpenVisaModal={onOpenVisaModal}
        onNavigateHome={onBackToHome}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToVisas={onNavigateToVisas}
        onNavigateToServices={onNavigateToServices}
        onNavigateToProcess={onNavigateToProcess}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToContact={onNavigateToContact}
      />
    </div>
  );
};

export default CustomErrorScreen;
