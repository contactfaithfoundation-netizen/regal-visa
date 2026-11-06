import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BLOGS_DATABASE } from '../data/blogs';

interface BlogSectionProps {
  onSelectBlog: (slug: string) => void;
  onViewAllBlogs?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onSelectBlog,
  onViewAllBlogs,
}) => {
  // Show first 3 highlighted articles on home page
  const highlightedBlogs = BLOGS_DATABASE.slice(0, 3);

  return (
    <section
      id="blog-section"
      className="relative w-full bg-white text-neutral-900 py-16 sm:py-20 md:py-24 px-4 sm:px-8 lg:px-14 border-t border-neutral-100 select-none font-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Sculpted Our Blogs Heading matching About US style */}
        <div className="relative flex flex-col items-center justify-center mb-10 sm:mb-14 text-center select-none">
          {/* Subtle atmospheric blue glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-24 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />

          {/* Faint sculptural backdrop silhouette for architectural depth */}
          <span className="absolute -top-4 sm:-top-7 text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase">
            OUR BLOGS
          </span>

          {/* Primary Heading: Our Blogs */}
          <h2 className="relative font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-[#0F172A] leading-none select-none">
            Our <span className="text-[#2563EB]">Blogs</span>
          </h2>

          {/* Minimalist brand accent bar */}
          <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-3.5 sm:mt-4" />
        </div>

        {/* 3 Vertically Compact Blog Cards in Pure Sans Font */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {highlightedBlogs.map((post) => (
            <article
              key={post.slug}
              onClick={() => onSelectBlog(post.slug)}
              className="bg-white rounded-[26px] border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_30px_rgba(37,99,235,0.09)] hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
            >
              {/* Top Text Content Area (Vertically Compact, No Tags, Sans Font Only) */}
              <div className="p-4 sm:p-5 pb-2.5 sm:pb-3 flex flex-col justify-start">
                {/* Date */}
                <div className="font-sans text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center justify-between">
                  <span>{post.date}</span>
                  <span className="text-[10px] text-neutral-400">{post.readTime}</span>
                </div>

                {/* Title (Sans Font Only, High-Impact, 2 Lines) */}
                <h3 className="font-sans text-[17px] sm:text-[18px] lg:text-[19px] font-bold text-neutral-900 group-hover:text-[#2563EB] transition-colors duration-200 leading-[1.3] mb-1.5 tracking-tight line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt (Sans Font Only, Concise 2 Lines) */}
                <p className="font-sans text-neutral-500 text-xs sm:text-[12.5px] leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom Image Container (Tighter to card outline, slightly bigger, highly relevant) */}
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

        {/* View All Blogs Action */}
        {onViewAllBlogs && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <button
              onClick={onViewAllBlogs}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer active:scale-95 shadow-xs"
            >
              <span>Explore All Pakistan Visa Guides</span>
              <ArrowRight className="w-4 h-4 text-[#2563EB]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
