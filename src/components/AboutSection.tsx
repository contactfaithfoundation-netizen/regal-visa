import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about-section"
      className="relative w-full bg-white text-neutral-900 pt-14 sm:pt-20 md:pt-24 pb-6 sm:pb-8 px-5 sm:px-8 border-t border-neutral-100 overflow-hidden select-none"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Sculpted About US Heading with refined visual depth */}
        <div className="relative flex flex-col items-center justify-center mb-8 sm:mb-11 select-none">
          {/* Subtle atmospheric blue glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-24 bg-[#2563EB]/[0.05] rounded-full blur-2xl pointer-events-none" />

          {/* Faint sculptural backdrop silhouette for architectural depth */}
          <span className="absolute -top-4 sm:-top-7 text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-black/[0.035] select-none pointer-events-none uppercase">
            ABOUT US
          </span>

          {/* Primary Heading: About US */}
          <h2 className="relative font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-[#0F172A] leading-none select-none">
            About <span className="text-[#2563EB]">US</span>
          </h2>

          {/* Minimalist brand accent bar */}
          <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-[#2563EB] to-[#60A5FA] rounded-full mt-3.5 sm:mt-4" />
        </div>

        {/* Short, lighter, less bold kinetic text with faster and earlier reveal timing */}
        <div className="w-full max-w-3xl mx-auto">
          <ScrollReveal
            highlightColor="#2563EB"
            mode="scrub"
            splitBy="words"
            effect="fade"
            stagger={0.035}
            duration={0.65}
            smoothing={0.15}
            baseOpacity={0.22}
            baseRotation={0}
            baseOffset={0}
            enableBlur={false}
            wordAnimationStart="top 78%"
            wordAnimationEnd="bottom 42%"
            containerClassName="w-full"
            textClassName="font-sans text-neutral-600 text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-normal sm:font-medium leading-relaxed tracking-normal text-center"
          >
            Visas fail on paperwork, not your profile. We turn Pakistani passports into trusted global gateways with verified consular filings.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
