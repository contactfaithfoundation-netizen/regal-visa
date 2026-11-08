import React from 'react';

export type PolicyTabType = 'terms' | 'privacy' | 'refund' | 'disclaimer';

interface SecondaryCtaBannerProps {
  onOpenVisaModal?: () => void;
  onNavigateHome?: () => void;
  onNavigateToVisas?: () => void;
  onNavigateToBlogs?: () => void;
  onNavigateToPolicies?: (tab?: PolicyTabType) => void;
  className?: string;
}

export const SecondaryCtaBanner: React.FC<SecondaryCtaBannerProps> = ({
  onOpenVisaModal,
  onNavigateHome,
  onNavigateToVisas,
  onNavigateToBlogs,
  onNavigateToPolicies,
  className = '',
}) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePolicyClick = (tab: PolicyTabType) => {
    if (onNavigateToPolicies) {
      onNavigateToPolicies(tab);
    } else {
      window.location.href = `/${tab === 'terms' ? 'terms' : tab === 'privacy' ? 'privacy' : 'refund-policy'}`;
    }
  };

  return (
    <footer className={`w-full bg-white border-t border-slate-100 ${className}`}>
      <div className="w-full py-12 px-4 sm:px-8 xl:px-14 max-w-[1440px] mx-auto font-sans">
        {/* White Rounded Card Container */}
        <div className="relative w-full rounded-[28px] sm:rounded-[36px] bg-white border border-[#E2E8F0] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] overflow-hidden px-6 sm:px-12 md:px-16 pt-12 sm:pt-16 pb-8 flex flex-col justify-between min-h-[440px]">
          {/* Right-Side Infinite Looping 3D Balls Video */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[58%] pointer-events-none z-0 flex items-center justify-end overflow-hidden">
            <video
              src="https://res.cloudinary.com/rpphjsst/video/upload/v1794002927/ezgif-8186224cab9b36c1.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center opacity-90 md:opacity-100 scale-105"
            />
            {/* Soft left-to-right white gradient mask blending seamlessly into white card surface */}
            <div className="bg-gradient-to-r from-white via-white/75 md:via-white/20 to-transparent absolute inset-0 z-10" />
          </div>

          {/* Left Content Column (Consultancy Copy in Brand font-sans) */}
          <div className="relative z-20 max-w-[580px] flex flex-col items-start my-auto py-4">
            {/* Top Eyebrow Tag */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#1D4ED8] ring-4 ring-[#EFF6FF]" />
              <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#1D4ED8]">
                APPLICATION -&gt; APPROVAL
              </span>
            </div>

            {/* Main Display Heading (Strictly font-sans, no serif) */}
            <h2 className="font-sans text-3xl sm:text-5xl md:text-[54px] font-bold text-[#0F172A] tracking-[-0.03em] leading-[1.08] mb-4">
              Ready to secure your visa or sacred journey?
            </h2>

            {/* Subtext */}
            <p className="font-sans text-xs sm:text-sm text-[#64748B] max-w-[460px] leading-relaxed mb-8">
              From urgent US, Canada & Schengen Visit/Business visas to 5-Star Hajj & Umrah packages—we handle your entire file from start to stamp.
            </p>

            {/* Primary Pill CTA Button */}
            <button
              type="button"
              onClick={onOpenVisaModal}
              className="px-7 py-3.5 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-sans text-xs sm:text-sm font-semibold tracking-tight shadow-[0_10px_25px_-5px_rgba(29,78,216,0.45)] hover:shadow-[0_15px_30px_-5px_rgba(29,78,216,0.55)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              Book a free consultation
            </button>
          </div>

          {/* Footer Navigation Section: Logo & 3 Columns Links (No line above logo, subtext removed, logo kept big) */}
          <div className="relative z-20 w-full mt-14 pt-2 flex flex-col lg:flex-row lg:items-start justify-between gap-10">
            {/* Big Brand Logo (Subtext removed, logo kept big) */}
            <div className="flex flex-col items-start shrink-0">
              <button
                type="button"
                onClick={handleHomeClick}
                className="group flex items-center cursor-pointer text-left focus:outline-none"
                aria-label="Regal Visa Solutions - Back to Top"
              >
                <img
                  src="https://res.cloudinary.com/dacyy7rkn/image/upload/v1792480449/image_tqqmok.avif"
                  alt="Regal Visa Solutions"
                  className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto object-contain transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </button>
            </div>

            {/* 3 Columns of Footer Links */}
            <nav className="flex-1 max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-10" aria-label="Footer Navigation">
              {/* Column 1: Navigation & Exploration */}
              <div className="flex flex-col space-y-2.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={handleHomeClick}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToVisas) {
                      onNavigateToVisas();
                    } else {
                      handleScrollTo('explore-events');
                    }
                  }}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Explore Visas
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo('services-section')}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Services
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo('process-section')}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Consular Process
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollTo('faqs')}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </div>

              {/* Column 2: Intelligence & Advisory */}
              <div className="flex flex-col space-y-2.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  Visa Intelligence
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToBlogs) {
                      onNavigateToBlogs();
                    } else {
                      handleScrollTo('blog-section');
                    }
                  }}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Latest Visa Articles
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToVisas) {
                      onNavigateToVisas();
                    } else {
                      handleScrollTo('explore-events');
                    }
                  }}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Schengen Compliance
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToVisas) {
                      onNavigateToVisas();
                    } else {
                      handleScrollTo('explore-events');
                    }
                  }}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  US & Canada Filings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToVisas) {
                      onNavigateToVisas();
                    } else {
                      handleScrollTo('explore-events');
                    }
                  }}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  5-Star Hajj & Umrah
                </button>
              </div>

              {/* Column 3: Policies & Legal Terms */}
              <div className="flex flex-col space-y-2.5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  Policies & Legal
                </span>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('terms')}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('privacy')}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('refund')}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Refund & Cancellation
                </button>
                <button
                  type="button"
                  onClick={() => handlePolicyClick('disclaimer')}
                  className="text-xs sm:text-[13px] text-left font-medium text-[#475569] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Consular Disclaimer
                </button>
              </div>
            </nav>
          </div>

          {/* Bottom Sub-Bar: Copyright & 3 Social Media Links */}
          <div className="relative z-20 w-full mt-10 pt-6 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-[11px] sm:text-xs text-[#94A3B8] font-normal">
              &copy; {new Date().getFullYear()} Regal Visa Solutions. All rights reserved.
            </p>

            {/* 3 Social Media Links (Instagram, Facebook, TikTok) - Compact on mobile to always fit in one row */}
            <div className="flex items-center justify-center sm:justify-end gap-2.5 xs:gap-3.5 sm:gap-6 flex-nowrap">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/regalvisasoloutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-[9.5px] xs:text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.05em] xs:tracking-[0.09em] sm:tracking-[0.14em] text-[#0F172A] hover:text-[#1D4ED8] transition-colors group shrink-0 whitespace-nowrap"
              >
                <svg
                  className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>INSTAGRAM</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/regalvisasolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-[9.5px] xs:text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.05em] xs:tracking-[0.09em] sm:tracking-[0.14em] text-[#0F172A] hover:text-[#1D4ED8] transition-colors group shrink-0 whitespace-nowrap"
              >
                <svg
                  className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>FACEBOOK</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@regalvisasolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-[9.5px] xs:text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.05em] xs:tracking-[0.09em] sm:tracking-[0.14em] text-[#0F172A] hover:text-[#1D4ED8] transition-colors group shrink-0 whitespace-nowrap"
              >
                <svg
                  className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-[#0F172A] group-hover:text-[#1D4ED8] transition-colors shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
                <span>TIKTOK</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SecondaryCtaBanner;
