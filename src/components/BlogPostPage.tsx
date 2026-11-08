import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, UserCheck, ShieldCheck, Share2, Check, ArrowRight } from 'lucide-react';
import { getBlogPostBySlug, BLOGS_DATABASE, BlogPostData } from '../data/blogs';
import { MarkdownRenderer } from './MarkdownRenderer';
import { PillHeader } from './PillHeader';
import { SecondaryCtaBanner } from './SecondaryCtaBanner';

interface BlogPostPageProps {
  slug: string;
  onBackToBlogs: () => void;
  onBackToHome: () => void;
  onSelectBlog: (slug: string) => void;
  onOpenVisaModal: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  slug,
  onBackToBlogs,
  onBackToHome,
  onSelectBlog,
  onOpenVisaModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);

  const post = getBlogPostBySlug(slug) || BLOGS_DATABASE[0];

  // Scroll to top on mount or when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [slug]);

  // Track scroll read progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setReadProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Other blogs for "Related Articles"
  const otherPosts = BLOGS_DATABASE.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-100 z-50">
        <div
          className="h-full bg-[#2563EB] transition-all duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Floating PillHeader for consistent top navigation */}
      <PillHeader
        isMenuOpen={isMenuOpen}
        onToggleMenu={setIsMenuOpen}
        isCallOpen={isCallOpen}
        onToggleCall={setIsCallOpen}
        onResetToHero={onBackToHome}
        onOpenVisaModal={onOpenVisaModal}
        onNavigateToBlogs={onBackToBlogs}
      />

      {/* Main Article Container */}
      <main className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-100">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-500">
            <button
              onClick={onBackToHome}
              className="hover:text-neutral-900 transition cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={onBackToBlogs}
              className="hover:text-neutral-900 transition cursor-pointer"
            >
              Blogs
            </button>
            <span className="hidden sm:inline">/</span>
            <span className="hidden sm:inline text-neutral-400 truncate max-w-[240px]">
              {post.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Copy Article Link"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium transition cursor-pointer active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Article Meta Bar */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
          <span className="flex items-center gap-1 text-[#2563EB]">
            <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
            <span>Pakistan Consular Intelligence</span>
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>{post.date}</span>
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>{post.readTime}</span>
          </span>
        </div>

        {/* Big Bold Article Title (Pure Sans) */}
        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.2] mb-6">
          {post.title}
        </h1>

        {/* Author Bio Snippet */}
        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-neutral-50 border border-neutral-100 mb-8 sm:mb-10">
          <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold text-sm shrink-0">
            <UserCheck className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <div className="text-sm font-bold text-neutral-900 leading-tight">
              {post.author}
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">
              {post.authorRole} &bull; Foreign Consular Defense Specialist
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full rounded-[24px] sm:rounded-[28px] overflow-hidden aspect-[16/9] bg-neutral-100 mb-10 sm:mb-12 shadow-sm border border-neutral-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        {/* Markdown Content (Completely Rendered in Sans Font) */}
        <article className="prose prose-neutral max-w-none text-neutral-800 font-sans">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* Consular Consultation Callout Box */}
        <div className="mt-14 sm:mt-16 p-6 sm:p-8 rounded-[24px] bg-[#0B0F14] text-white border border-neutral-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#60A5FA]">
              Forensic Consular Clearance
            </span>
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-white">
              Worried about a past refusal or bank mismatch?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-xl">
              Our legal case officers review your FBR wealth statements, GDS itineraries, and consular briefs before you lodge.
            </p>
          </div>

          <button
            onClick={onOpenVisaModal}
            className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-md active:scale-95 shrink-0"
          >
            Assess My Case Free
          </button>
        </div>

        {/* Related Articles Section */}
        {otherPosts.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-12 border-t border-neutral-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                More Pakistan Visa Guides
              </h3>
              <button
                onClick={onBackToBlogs}
                className="text-xs sm:text-sm font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {otherPosts.map((other) => (
                <article
                  key={other.slug}
                  onClick={() => onSelectBlog(other.slug)}
                  className="bg-white rounded-[22px] border border-neutral-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(37,99,235,0.08)] hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                >
                  <div className="p-4 flex flex-col justify-start">
                    <span className="font-sans text-[10.5px] font-semibold uppercase text-neutral-400 mb-1">
                      {other.date}
                    </span>
                    <h4 className="font-sans text-[15px] font-bold text-neutral-900 group-hover:text-[#2563EB] transition-colors leading-[1.3] mb-1 line-clamp-2">
                      {other.title}
                    </h4>
                    <p className="font-sans text-neutral-500 text-xs leading-relaxed line-clamp-2">
                      {other.excerpt}
                    </p>
                  </div>

                  <div className="p-2 pt-0 w-full">
                    <div className="w-full rounded-[16px] overflow-hidden aspect-[16/10] bg-neutral-100">
                      <img
                        src={other.image}
                        alt={other.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Back to Top / Back to Blogs Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onBackToBlogs}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Blogs</span>
          </button>
        </div>
      </main>

      {/* Footer & CTA */}
      <SecondaryCtaBanner
        onOpenVisaModal={onOpenVisaModal}
        onNavigateHome={onBackToHome}
        onNavigateToBlogs={onBackToBlogs}
      />
    </div>
  );
};
