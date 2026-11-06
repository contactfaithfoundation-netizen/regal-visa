import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about-section"
      className="relative w-full bg-white text-neutral-900 pt-14 sm:pt-20 md:pt-24 pb-6 sm:pb-8 px-5 sm:px-8 border-t border-neutral-100 overflow-hidden select-none"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Big ABOUT Heading */}
        <h2 className="font-sans text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-[#0F172A] mb-6 sm:mb-9">
          ABOUT
        </h2>

        {/* Short, lighter, less bold kinetic text with faster and earlier reveal timing */}
        <div className="w-full max-w-3xl mx-auto">
          <ScrollReveal
            highlightColor=""
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
