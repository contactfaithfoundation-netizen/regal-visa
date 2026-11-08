import React, { useState, useEffect } from 'react';
import { Search, X, ShieldCheck } from 'lucide-react';
import { BLOGS_DATABASE, BlogPostData } from '../data/blogs';
import { PillHeader } from './PillHeader';
import { FaqSection } from './FaqSection';
import { SecondaryCtaBanner } from './SecondaryCtaBanner';

interface AllBlogsPageProps {
  onBackToHome: () => void;
  onSelectBlog: (slug: string) => void;
  onOpenVisaModal: () => void;
  onNavigateToVisas?: () => void;
}

export const AllBlogsPage: React.FC<AllBlogsPageProps> = ({
  onBackToHome,
  onSelectBlog,
  onOpenVisaModal,
  onNavigateToVisas,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const filteredBlogs = BLOGS_DATABASE.filter((post) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900 select-none">
      {/* Top Floating PillHeader */}
      <PillHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={setIsMenuOpen}
        isCallOpen={isCallOpen}
        onToggleCall={setIsCallOpen}
        onResetToHero={onBackToHome}
        onOpenVisaModal={onOpenVisaModal}
        onNavigateToVisas={onNavigateToVisas}
        onNavigateToExplore={onNavigateToVisas}
      />

      {/* Main Container */}
      <main className="pt-28 sm:pt-36 pb-12 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          {/* Sculpted Our Blogs Heading matching About US style */}
          <div className="relative flex flex-col items-center justify-center mb-6 sm:mb-8 text-center select-none">
          {/* Subtle atmospheric blue glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-24 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />

          {/* Faint sculptural backdrop silhouette for architectural depth */}
          <span className="absolute -top-4 sm:-top-7 text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase">
            OUR BLOGS
          </span>

          {/* Primary Heading: Our Blogs */}
          <h1 className="relative font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-[#0F172A] leading-none select-none">
            Our <span className="text-[#2563EB]">Blogs</span>
          </h1>

          {/* Minimalist brand accent bar */}
          <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-3.5 sm:mt-4" />
        </div>

          <p className="font-sans text-neutral-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Consular intelligence, embassy verification standards, and forensic legal guides for Pakistani passport holders.
          </p>

          {/* Search Bar for Blogs */}
          <div className="w-full max-w-md relative">
            <div className="w-full h-11 px-4 rounded-full border border-neutral-300 bg-neutral-50/70 focus-within:bg-white focus-within:border-neutral-900 focus-within:ring-2 focus-within:ring-neutral-900/10 transition-all flex items-center gap-2.5 shadow-xs">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Pakistan visa topics..."
                className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 outline-none font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700 transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Blog Cards Grid (Exact same sleek card style: sans only, no tags, closer image, vertically compact) */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {filteredBlogs.map((post) => (
              <article
                key={post.slug}
                onClick={() => onSelectBlog(post.slug)}
                className="bg-white rounded-[26px] border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_30px_rgba(37,99,235,0.09)] hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
              >
                {/* Top Text Content Area */}
                <div className="p-4 sm:p-5 pb-2.5 sm:pb-3 flex flex-col justify-start">
                  <div className="font-sans text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center justify-between">
                    <span>{post.date}</span>
                    <span className="text-[10px] text-neutral-400">{post.readTime}</span>
                  </div>

                  <h3 className="font-sans text-[17px] sm:text-[18px] lg:text-[19px] font-bold text-neutral-900 group-hover:text-[#2563EB] transition-colors duration-200 leading-[1.3] mb-1.5 tracking-tight line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="font-sans text-neutral-500 text-xs sm:text-[12.5px] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {/* Bottom Image Container */}
                <div className="p-2 sm:p-2.5 pt-0 w-full">
                  <div className="w-full rounded-[20px] overflow-hidden aspect-[16/10] bg-neutral-100 relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <Search className="w-10 h-10 text-neutral-300 mb-3" />
            <h3 className="font-sans text-lg font-bold text-neutral-800">
              No articles match "{searchQuery}"
            </h3>
            <p className="font-sans text-xs text-neutral-500 mt-1">
              Try searching for "bank statement", "dummy ticket", "214(b)", or "passport".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>

      {/* FAQs Section Under All Blogs ("with faqs under it faq of home page") */}
      <section className="border-t border-neutral-100 mt-12 sm:mt-16 bg-white">
        <FaqSection />
      </section>

      {/* Footer & CTA */}
      <SecondaryCtaBanner
        onOpenVisaModal={onOpenVisaModal}
        onNavigateHome={onBackToHome}
        onNavigateToVisas={onNavigateToVisas}
      />
    </div>
  );
};
