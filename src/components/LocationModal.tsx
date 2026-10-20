import React from 'react';
import { X, MapPin, Mountain, Calendar, Sparkles, Compass, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Slide } from '../types';

interface LocationModalProps {
  slide: Slide | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  slide,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  if (!slide) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="relative w-full max-w-2xl bg-[#141b22]/95 border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-10 text-white my-8"
          >
            {/* Top Image Banner */}
            <div className="relative h-56 sm:h-72 w-full overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141b22] via-transparent to-black/50" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white transition-all cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Region on Image */}
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs uppercase tracking-[0.2em] text-[#3B82F6] font-semibold">
                  {slide.region}
                </span>
                <h2 className="font-oswald text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white whitespace-pre-line leading-none mt-1">
                  {slide.title}
                </h2>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                {slide.description} Discover pristine wilderness, bespoke cultural encounters, and extraordinary natural marvels tailored exclusively by Globe Express.
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                  <div className="flex items-center gap-1.5 text-white/50 text-[11px] mb-1">
                    <Compass className="w-3.5 h-3.5 text-[#3B82F6]" /> Coordinates
                  </div>
                  <div className="text-xs sm:text-sm font-semibold truncate">{slide.coordinates}</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                  <div className="flex items-center gap-1.5 text-white/50 text-[11px] mb-1">
                    <Mountain className="w-3.5 h-3.5 text-[#3B82F6]" /> Elevation
                  </div>
                  <div className="text-xs sm:text-sm font-semibold">{slide.altitude || 'Varied'}</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-white/50 text-[11px] mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#3B82F6]" /> Ideal Season
                  </div>
                  <div className="text-xs sm:text-sm font-semibold truncate">{slide.bestSeason}</div>
                </div>
              </div>

              {/* Highlight callout */}
              <div className="p-4 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-[#3B82F6] uppercase tracking-wider mb-0.5">
                    Signature Experience
                  </div>
                  <div className="text-xs sm:text-sm text-white/90">
                    {slide.highlight}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onToggleBookmark}
                  className={`w-full sm:w-auto px-5 py-3 rounded-full border text-xs font-semibold tracking-wider uppercase transition flex items-center justify-center gap-2 ${
                    isBookmarked
                      ? 'border-[#2563EB] bg-[#2563EB]/20 text-[#3B82F6]'
                      : 'border-white/30 hover:border-white text-white/90'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#2563EB]' : ''}`} />
                  {isBookmarked ? 'Bookmarked' : 'Add to Wishlist'}
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:flex-1 py-3 px-6 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-[0.15em] uppercase transition shadow-lg text-center"
                >
                  Book Expedition Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
