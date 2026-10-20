import React, { useState } from 'react';
import { Globe, Search, User, Menu, X, Sparkles, MapPin, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenBookmarks?: () => void;
  bookmarkCount?: number;
}

const NAV_LINKS = ['HOME', 'HOLIDAYS', 'DESTINATIONS', 'FLIGHTS', 'OFFERS', 'CONTACTS'];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenBookmarks,
  bookmarkCount = 0,
}) => {
  const [activeLink, setActiveLink] = useState('HOME');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full px-6 md:px-14 py-6 z-40 flex justify-between items-center transition-all duration-300">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer group select-none">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:border-[#2563EB]/60 group-hover:bg-[#2563EB]/10 transition-all duration-300">
            <Globe className="w-4 h-4 text-white group-hover:text-[#2563EB] transition-colors duration-300" />
          </div>
          <span className="font-sans font-bold tracking-[0.15em] text-xs text-white uppercase group-hover:text-white/90 transition-colors">
            GLOBE EXPRESS
          </span>
        </div>

        {/* Right (Desktop Navigation) */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          <nav className="flex items-center gap-7 xl:gap-9">
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link;
              return (
                <button
                  key={link}
                  onClick={() => setActiveLink(link)}
                  className="relative group py-1 text-[11px] font-medium tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors duration-200"
                >
                  <span>{link}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.7)] mt-1"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1.5px] bg-white/40 transition-all duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4 pl-3 border-l border-white/20">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              title="Search destinations"
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User Profile Popover Button */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                title="Account & Pass"
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer relative"
              >
                <User className="w-4 h-4" />
                {bookmarkCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2563EB] ring-2 ring-[#0f1419]" />
                )}
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 mt-3 w-64 bg-[#141b22]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl z-50 text-white"
                  >
                    <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                      <div className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center font-bold text-white text-xs font-oswald">
                        GE
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold truncate">Explorer Member</div>
                        <div className="text-[10px] text-white/60 truncate flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#2563EB]" /> Premier VIP Tier
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-white/80">
                      <div className="flex justify-between py-1 px-2 rounded-lg hover:bg-white/5 transition">
                        <span className="text-white/60">Saved Bookmarks</span>
                        <span className="font-medium text-[#2563EB]">{bookmarkCount} items</span>
                      </div>
                      <div className="flex justify-between py-1 px-2 rounded-lg hover:bg-white/5 transition">
                        <span className="text-white/60">Passport Status</span>
                        <span className="text-emerald-400 font-medium">Active</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenBookmarks?.();
                      }}
                      className="mt-3 w-full py-2 bg-white/10 hover:bg-[#2563EB] hover:text-white rounded-xl text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 text-center"
                    >
                      View Saved Places
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right (Mobile Navigation Bar) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition relative"
            aria-label="User Account"
          >
            <User className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#2563EB]" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-full transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden fixed top-[72px] left-0 w-full bg-[#0f1419]/95 backdrop-blur-2xl border-b border-white/10 z-40 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
                Navigation
              </span>
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      setActiveLink(link);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left py-2.5 px-3 rounded-lg text-xs font-semibold tracking-wider transition ${
                      activeLink === link
                        ? 'bg-[#2563EB] text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {link}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                <span>Total Bookmarks: {bookmarkCount}</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="text-[#2563EB] font-medium hover:underline flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" /> Explore All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
