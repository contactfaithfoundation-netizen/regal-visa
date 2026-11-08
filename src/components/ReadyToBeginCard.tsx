import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ReadyToBeginCardProps {
  onOpenVisaModal?: () => void;
  onNavigateToExplore?: () => void;
  className?: string;
}

export const ReadyToBeginCard: React.FC<ReadyToBeginCardProps> = ({
  onOpenVisaModal,
  onNavigateToExplore,
  className = '',
}) => {
  return (
    <div className={`w-full bg-white py-4 sm:py-6 px-4 sm:px-8 xl:px-14 max-w-[1440px] mx-auto font-sans ${className}`}>
      {/* Fast-Track Assessment Callout Strip in Pure White Color Fill with 3D Spheres Video */}
      <div className="relative w-full rounded-3xl bg-white text-[#0F172A] flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 gap-5 border border-[#E2E8F0] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.08)] overflow-hidden">
        {/* Right-Side Infinite Looping 3D Spheres Video */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] pointer-events-none z-0 flex items-center justify-end overflow-hidden">
          <video
            src="https://res.cloudinary.com/rpphjsst/video/upload/v1794002927/ezgif-8186224cab9b36c1.webm"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center opacity-85 md:opacity-100 scale-105"
          />
          {/* Soft white gradient mask blending into the white background */}
          <div className="bg-gradient-to-r from-white via-white/80 md:via-white/20 to-transparent absolute inset-0 z-10" />
        </div>

        {/* Content on the left */}
        <div className="relative z-20 space-y-1.5 text-center md:text-left max-w-[540px]">
          <h4 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">
            Ready to begin your visa application?
          </h4>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            Free initial document review with a 15-minute response time.
          </p>
        </div>

        {/* Action Buttons on the right */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          {/* WhatsApp Direct Inquiry */}
          <a
            href="https://wa.me/923246883359?text=Hi%20Globe%20Express%2C%20I%20want%20to%20start%20my%20visa%20process%20and%20get%20a%20free%20document%20assessment."
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_20px_-4px_rgba(37,211,102,0.35)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.37 7.35 9.1 7.41 8.88 7.65C8.65 7.89 8.02 8.48 8.02 9.71C8.02 10.93 8.91 12.11 9.03 12.27C9.15 12.44 10.74 14.9 13.21 15.96C15.26 16.84 15.68 16.66 16.12 16.63C16.57 16.59 17.55 16.05 17.76 15.48C17.96 14.9 17.96 14.41 17.9 14.31C17.84 14.21 17.68 14.15 17.44 14.03C17.2 13.91 16.01 13.33 15.79 13.25C15.57 13.17 15.41 13.13 15.25 13.37C15.09 13.61 14.62 14.15 14.48 14.31C14.34 14.47 14.2 14.49 13.96 14.37C13.72 14.25 12.95 14 12.03 13.18C11.31 12.54 10.83 11.76 10.69 11.52C10.55 11.28 10.67 11.14 10.79 11.02C10.9 10.91 11.04 10.73 11.16 10.59C11.28 10.45 11.32 10.35 11.4 10.19C11.48 10.03 11.44 9.89 11.38 9.77C11.32 9.65 10.85 8.5 10.65 8.03C10.46 7.57 10.26 7.63 10.11 7.63C9.97 7.62 9.81 7.35 9.53 7.35Z" />
            </svg>
            <span>WhatsApp Assessment</span>
          </a>

          {/* Explore Visas CTA */}
          <button
            type="button"
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
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs sm:text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_8px_20px_-4px_rgba(29,78,216,0.35)]"
          >
            <span>Explore Visas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadyToBeginCard;
