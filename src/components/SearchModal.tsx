import React, { useState } from 'react';
import { Search, X, MapPin, ArrowRight, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Slide } from '../types';

interface SearchModalProps {
  slides: Slide[];
  isOpen: boolean;
  onClose: () => void;
  onSelectSlide: (slideId: string) => void;
  bookmarks: string[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  slides,
  isOpen,
  onClose,
  onSelectSlide,
  bookmarks,
}) => {
  const [query, setQuery] = useState('');
  const [filterBookmarksOnly, setFilterBookmarksOnly] = useState(false);

  const filtered = slides.filter((slide) => {
    if (filterBookmarksOnly && !bookmarks.includes(slide.id)) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      slide.title.toLowerCase().includes(q) ||
      slide.region.toLowerCase().includes(q) ||
      slide.highlight.toLowerCase().includes(q)
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-xl bg-[#141b22] border border-white/20 rounded-3xl p-5 shadow-2xl z-10 text-white"
          >
            {/* Search Input Box */}
            <div className="relative flex items-center border-b border-white/15 pb-4">
              <Search className="w-5 h-5 text-white/50 ml-1 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destination, region, or keyword..."
                autoFocus
                className="w-full bg-transparent border-none outline-none text-white placeholder-white/40 text-sm font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-white/40 hover:text-white mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 mt-4 text-xs">
              <button
                onClick={() => setFilterBookmarksOnly(false)}
                className={`px-3 py-1.5 rounded-full transition ${
                  !filterBookmarksOnly
                    ? 'bg-[#2563EB] text-white font-semibold'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                All Destinations ({slides.length})
              </button>
              <button
                onClick={() => setFilterBookmarksOnly(true)}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition ${
                  filterBookmarksOnly
                    ? 'bg-[#2563EB] text-white font-semibold'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                Saved Wishlist ({bookmarks.length})
              </button>
            </div>

            {/* Results List */}
            <div className="mt-4 max-h-80 overflow-y-auto space-y-2 no-scrollbar">
              {filtered.length === 0 ? (
                <div className="text-center py-10 text-white/40 text-xs">
                  {filterBookmarksOnly
                    ? 'No bookmarked destinations yet. Click the bookmark icon on any slide!'
                    : 'No destinations found matching your search.'}
                </div>
              ) : (
                filtered.map((slide) => (
                  <div
                    key={slide.id}
                    onClick={() => {
                      onSelectSlide(slide.id);
                      onClose();
                    }}
                    className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-white/10 cursor-pointer transition group"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-[#2563EB] font-medium tracking-wider uppercase">
                        {slide.region}
                      </div>
                      <div className="font-oswald text-base font-bold uppercase truncate text-white">
                        {slide.title.replace('\n', ' ')}
                      </div>
                      <div className="text-xs text-white/50 truncate">
                        {slide.highlight}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all mr-2" />
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
